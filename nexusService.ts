
import type { ReportParameters, SymbiosisContext, ChatMessage, LetterRequest, LiveOpportunityItem, LiveOpportunitiesResponse } from "../types";
import { MOCK_OPPORTUNITIES } from "../data/mockOpportunities";
import * as geminiService from './geminiService';

// --- API FUNCTIONS (Now calling geminiService directly) ---

export function generateStrategicReport(params: ReportParameters): AsyncGenerator<string, void, undefined> {
  return geminiService.streamStrategicReport(params);
}

export const generateAnalysisStream = (item: LiveOpportunityItem, region: string): AsyncGenerator<string, void, undefined> => {
    return geminiService.streamAnalysis(item, region);
};

export async function fetchSymbiosisResponse(context: SymbiosisContext, history: ChatMessage[]): Promise<string> {
    try {
        return await geminiService.getSymbiosisResponse(context, history);
    } catch (error: any) {
        console.error("Symbiosis response error:", error);
        throw new Error(error.message || "Failed to get response from Symbiosis AI.");
    }
}

export async function generateOutreachLetter(request: LetterRequest): Promise<string> {
    return await geminiService.getOutreachLetter(request);
}


// --- CACHED FUNCTIONS ---

const CITIES_CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchRegionalCities(country: string): Promise<string[]> {
    const cacheKey = `cities_cache_${country}`;

    try {
        const cachedDataString = localStorage.getItem(cacheKey);
        if (cachedDataString) {
            const cachedData = JSON.parse(cachedDataString);
            const cacheAge = new Date().getTime() - new Date(cachedData.timestamp).getTime();
            if (cachedData && Array.isArray(cachedData.cities) && cacheAge < CITIES_CACHE_DURATION_MS) {
                return cachedData.cities;
            }
        }
    } catch (e) {
        console.warn("Could not read city cache. Proceeding with API call.", e);
    }
    
    try {
        const cities = await geminiService.getRegionalCities(country);

        if (!Array.isArray(cities)) throw new Error("API returned non-array data for cities.");

        const dataToCache = { cities, timestamp: new Date().toISOString() };
        localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
        return cities;

    } catch (apiError) {
        console.warn(`API call failed for cities in ${country}. Attempting to load from fallback cache.`, apiError);
        
        try {
            const cachedDataString = localStorage.getItem(cacheKey);
            if (cachedDataString) {
                const cachedData = JSON.parse(cachedDataString);
                if (cachedData && Array.isArray(cachedData.cities)) {
                    return cachedData.cities;
                }
            }
        } catch (cacheError) {
            console.error("Failed to read from fallback city cache:", cacheError);
        }
        
        throw new Error(`Could not fetch cities for ${country}. The AI service may be unavailable or rate-limited.`);
    }
}


const OPPORTUNITIES_CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

export async function fetchLiveOpportunities(): Promise<LiveOpportunitiesResponse> {
    const cacheKey = `live_opportunities_cache`;

    try {
        const cachedDataString = localStorage.getItem(cacheKey);
        if (cachedDataString) {
            const cachedData = JSON.parse(cachedDataString);
            const cacheAge = new Date().getTime() - new Date(cachedData.timestamp).getTime();
            if (cachedData && cachedData.data && cacheAge < OPPORTUNITIES_CACHE_DURATION_MS) {
                return { ...cachedData.data, isMockData: false };
            }
        }
    } catch (cacheError) {
        console.warn("Could not read opportunities cache. Proceeding with API call.", cacheError);
    }
    
    try {
        const result = await geminiService.getLiveOpportunities();

        const dataToCache = {
            data: result,
            timestamp: new Date().toISOString()
        };
        try {
            localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
        } catch (cacheError) {
            console.warn("Could not write to localStorage", cacheError);
        }
        return { ...result, isMockData: false };

    } catch (apiError: any) {
        console.warn(`LIVE API FAILED: ${apiError.message}. Serving mock data as a fallback. Please ensure your API_KEY is correctly configured in your environment variables.`);
        return { ...MOCK_OPPORTUNITIES, isMockData: true };
    }
}
