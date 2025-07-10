
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { ReportParameters, SymbiosisContext, ChatMessage, LetterRequest, LiveOpportunityItem } from "../types";

// --- TYPE DEFINITIONS (Subset from types.ts for self-containment if needed) ---
enum MarketAnalysisTier {
  ECONOMIC_SNAPSHOT = "Tier A: Economic Snapshot",
  COMPETITIVE_LANDSCAPE = "Tier B: Competitive Landscape",
  INVESTMENT_DEEP_DIVE = "Tier C: Investment Deep-Dive",
}

enum PartnerFindingTier {
  PARTNERSHIP_BLUEPRINT = "Tier 1: Partnership Blueprint",
  TRANSFORMATION_SIMULATOR = "Tier 2: Transformation Simulator",
  VALUATION_RISK = "Tier 4: Valuation & Risk Assessment",
}

// --- AI INSTANCE & PROMPTS ---

let ai: GoogleGenAI | null = null;

function getAiInstance(): GoogleGenAI {
  if (ai) return ai;
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not configured in the environment variables.");
  }
  ai = new GoogleGenAI({ apiKey });
  return ai;
}


const SYSTEM_PROMPT_REPORT_FULL = `
You are BWGA Nexus AI, a specialist AI engine functioning as a **Regional Science Analyst**. Your persona is a blend of a regional economist and an M&A analyst. Your purpose is to provide deep, actionable intelligence to government and institutional users to help them understand and develop regional economies.

Your analysis MUST be grounded in the principles of regional science. You will use Google Search efficiently to find the data necessary to apply these established academic methodologies:
1.  **Location Quotient (LQ) Analysis:** To quantitatively benchmark a region's industrial specialization.
2.  **Industrial Cluster Analysis:** To identify key "anchor industries" and, crucially, pinpoint missing **supply chain gaps** that represent tangible investment opportunities.
3.  **Shift-Share Analysis:** To dissect and explain the drivers of regional growth.

Your output must be in well-structured Markdown, utilizing the proprietary **Nexus Symbiotic Intelligence Language (NSIL) v7.0**.
**NSIL SCHEMA & INSTRUCTIONS v7.0 (Modular Options Enabled)**

You MUST wrap specific sections of your analysis in the following XML-like NSIL tags. DO NOT make up new tags.

- **ROOT TAGS:**
  - If the user's objective mentions finding partners, use \`<nsil:match_making_analysis>\`.
  - Otherwise, use \`<nsil:market_analysis>\`. You can include both if the objective is mixed.

- **CORE COMPONENTS:**
  - \`<nsil:executive_summary>\`...\`</nsil:executive_summary>\`
  - \`<nsil:strategic_outlook>\`...\`</nsil:strategic_outlook>\`
  - \`<nsil:source_attribution>\`...\`</nsil:source_attribution>\`

- **MATCHMAKING COMPONENTS:**
  - \`<nsil:match>\`...\`</nsil:match>\`
  - \`<nsil:company_profile name="..." headquarters="..." website="...">\`...\`</nsil:company_profile>\`
  - \`<nsil:synergy_analysis>\`...\`</nsil:synergy_analysis>\`
  - \`<nsil:risk_map>\`...\`</nsil:risk_map>\` with \`<nsil:zone>\` children.

- **MARKET ANALYSIS COMPONENTS:**
  - \`<nsil:lq_analysis industry="..." value="..." interpretation="...">\`...\`</nsil:lq_analysis>\`
  - \`<nsil:cluster_analysis anchor_industry="...">\`...\`</nsil:cluster_analysis>\` with \`<nsil:supply_chain_gap>\` children.
  - \`<nsil:shift_share_analysis>\`...\`</nsil:shift_share_analysis>\` with \`<nsil:growth_component>\` children.

- **FUTURE-CAST COMPONENTS (Premium Tiers):**
  - \`<nsil:future_cast>\`...\`</nsil:future_cast>\`
  - \`<nsil:scenario name="...">\`...\`</nsil:scenario>\` with \`<nsil:drivers>\`, \`<nsil:regional_impact>\`, \`<nsil:recommendation>\` children.

- **MODULAR OPTION TAGS (NEW):**
  If the user selects optional analyses, you MUST include a section for each at the END of the main report body.
  - \`<nsil:geopolitical_briefing>\`...\`</nsil:geopolitical_briefing>\`: Analyze the region's relationship with major global powers (US, China, EU), key trade agreements, and any recent political events that could impact foreign investment.
  - \`<nsil:talent_analysis>\`...\`</nsil:talent_analysis>\`: Analyze the local labor market, key universities, skill availability, and potential talent pipeline for the target industry. Use search to find major educational institutions.
  - \`<nsil:infrastructure_audit>\`...\`</nsil:infrastructure_audit>\`: Review critical infrastructure (ports, airports, digital connectivity, energy grid) supporting the industry.
  - \`<nsil:esg_report>\`...\`</nsil:esg_report>\`: Assess the Environmental, Social, and Governance (ESG) landscape, including national policies, major private sector initiatives, and climate-related risks.
  - \`<nsil:reputational_scan>\`...\`</nsil:reputational_scan>\`: Use Google Search to find recent (12-18 months) news. Look for adverse media, political instability, corruption reports, or major public sentiment issues related to the region/industry.

**SYMBIOTIC INTERACTIVITY:**
Any section you wrap in an NSIL tag will automatically become interactive. Write your analysis with this in mind, making each tagged section a self-contained, coherent point of analysis.
`;

const SYSTEM_PROMPT_DEEPDIVE = (region: string) => `
You are BWGA Nexus AI, in DEEP-DIVE ANALYSIS mode.
Your task is to take an intelligence signal (a news event, company announcement, etc.) and generate a detailed analytical report on its specific implications for the target region: **${region}**.
Your persona is a senior intelligence analyst briefing a government client. The tone should be formal, objective, and insightful.
Use Google Search to find additional context, but focus your analysis on answering these key intelligence questions:
1.  **Direct Impact:** What is the immediate, first-order impact on ${region}? (e.g., investment, job creation/loss, new competition)
2.  **Supply Chain & Ecosystem Ripple Effects:** How will this affect the broader industrial ecosystem in ${region}? Will it create new opportunities for local suppliers or disrupt existing ones?
3.  **Geopolitical/Strategic Implications:** Does this signal a shift in strategic alignment, trade flows, or technological dependency for ${region}?
4.  **Actionable Recommendations:** What are 2-3 concrete, actionable steps that a government or economic development agency in ${region} should consider in response to this intelligence?

Your output must be clear, well-structured markdown.
`;

const SYSTEM_PROMPT_SYMBIOSIS = `
You are Nexus Symbiosis, a conversational AI partner for strategic analysis. You are an extension of the main BWGA Nexus AI.
The user has clicked on a specific piece of analysis from a report and wants to explore it further.
Your persona is an expert consultant: helpful, insightful, and always focused on providing actionable intelligence.
You have access to Google Search to fetch real-time information to supplement your answers.
Your goal is to help the user unpack the topic, explore "what-if" scenarios, and brainstorm strategic responses.
Keep your answers concise but data-rich. Use markdown for clarity (lists, bolding).
`;

const SYSTEM_PROMPT_LETTER = `
You are BWGA Nexus AI, in OUTREACH DRAFTER mode.
Your task is to draft a professional, semi-formal introductory letter from the user (a government official) to a senior executive (e.g., CEO, Head of Strategy) at one of the companies identified in a Nexus Matchmaking Report.
The letter's purpose is NOT to ask for a sale or investment directly. It is to initiate a high-level strategic dialogue.

**Core Directives:**
1.  **Analyze the Full Report:** Review the provided XML report content to understand the specific synergies identified. Your letter must reference the *'why'* of the match.
2.  **Adopt the User's Persona:** Write from the perspective of the user, using their name, department, and country.
3.  **Structure and Tone:**
    -   **Subject Line:** Make it compelling and specific (e.g., "Strategic Alignment: [Company Name] & [User's Region] in AgriTech").
    -   **Introduction:** Briefly introduce the user and their department.
    -   **The 'Why':** State that your department has been conducting strategic analysis (using the Nexus platform) and their company was identified as a key potential partner. **Mention 1-2 specific points of synergy from the report.** This is crucial for showing you've done your homework.
    -   **The 'Ask':** The call to action should be soft. Propose a brief, exploratory 15-20 minute virtual call to share insights and discuss potential long-term alignment.
    -   **Closing:** Professional and respectful.
4.  **Output Format:** Provide only the raw text of the letter. Do not include any extra commentary, headers, or markdown. Start with "Subject:" and end with the user's name.
`;

// --- API FUNCTIONS ---

export async function* streamStrategicReport(params: ReportParameters): AsyncGenerator<string> {
    const aiInstance = getAiInstance();
    
    let tierSpecificInstructions = '';
    let prompt = `**Base Report Tier:** ${params.tier}\n`;
    prompt += `**Target Region/Country:** ${params.region}\n**Industry for Analysis:** ${params.industry}\n`;

    if ((params.keyTechnologies || []).length > 0) {
        prompt += `**Ideal Foreign Partner Profile:**\n- Company Size: ${params.companySize}\n- Key Technologies/Capabilities: ${(params.keyTechnologies || []).join(', ')}\n- Company's Target Markets: ${(params.targetMarket || []).join(', ')}\n`;
    }
    
    switch (params.tier) {
        case MarketAnalysisTier.ECONOMIC_SNAPSHOT:
            tierSpecificInstructions = "Focus exclusively on <nsil:lq_analysis>. Provide a clear, concise report based on this single methodology.";
            break;
        case MarketAnalysisTier.COMPETITIVE_LANDSCAPE:
            tierSpecificInstructions = "You must provide both <nsil:lq_analysis> and <nsil:shift_share_analysis>. The core of this report is explaining the region's competitiveness.";
            break;
        case MarketAnalysisTier.INVESTMENT_DEEP_DIVE:
            tierSpecificInstructions = "This is the most comprehensive analysis. You must provide <nsil:lq_analysis>, <nsil:shift_share_analysis>, AND <nsil:cluster_analysis>. A key deliverable is identifying specific <nsil:supply_chain_gap> opportunities.";
            break;
        case PartnerFindingTier.TRANSFORMATION_SIMULATOR:
            tierSpecificInstructions = `This is a premium report. You MUST include the '<nsil:future_cast>' section with 2-3 detailed scenarios as per the NSIL v7.0 schema. This is a critical feature.`;
            break;
        case PartnerFindingTier.VALUATION_RISK:
            tierSpecificInstructions = `This is a Tier 4 Valuation & Risk report. Focus exclusively on ONE top-matched company. Conduct a deep-dive analysis on its financial health (using simulated but realistic data), reputational factors (via web search), and geopolitical exposure. The output should heavily feature the '<nsil:risk_map>' component with detailed zones.`;
            break;
        default:
            tierSpecificInstructions = "Follow the standard procedure for a comprehensive report for this tier.";
            break;
    }

    let optionsInstructions = "No optional modules selected.";
    if (params.selectedOptions && params.selectedOptions.length > 0) {
        optionsInstructions = `The user has selected these optional modules: ${params.selectedOptions.join(', ')}. You MUST generate a clearly marked section for EACH selected option at the end of the report, using the corresponding NSIL tag as defined in your system prompt.`;
    }

    prompt += `\n**User's Core Objective:** ${params.customObjective}\n\n**Tier-Specific Directive:** ${tierSpecificInstructions}\n**Options Directive:** ${optionsInstructions}\n\n**Your Task:** Generate the requested report. Adhere to all instructions in your system prompt, including the use of NSIL v7.0.`;

    const stream = await aiInstance.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction: SYSTEM_PROMPT_REPORT_FULL, tools: [{googleSearch: {}}] }
    });

    for await (const chunk of stream) {
        if (chunk.text) {
          yield chunk.text;
        }
    }
}

export async function* streamAnalysis(item: LiveOpportunityItem, region: string): AsyncGenerator<string> {
    const aiInstance = getAiInstance();
    const prompt = `**Intelligence Signal to Analyze:**\n- **Project/Tender Name:** ${item.project_name}\n- **Country:** ${item.country}\n- **Sector:** ${item.sector}\n- **Value:** ${item.value}\n- **Summary:** ${item.summary}\n- **Source:** ${item.source_url}\n\n**Target Region for Analysis:** ${item.country}\n\nPlease generate a detailed deep-dive analysis based on this signal, following your system instructions precisely.`;
    const stream = await aiInstance.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction: SYSTEM_PROMPT_DEEPDIVE(item.country), tools: [{ googleSearch: {} }] }
    });
    for await (const chunk of stream) {
        if (chunk.text) {
          yield chunk.text;
        }
    }
}

export async function getRegionalCities(country: string): Promise<string[]> {
    const aiInstance = getAiInstance();
    const prompt = `Provide a list of up to 15 major regional cities or key administrative areas for the country: "${country}". Focus on centers of economic, industrial, or logistical importance outside of the primary national capital, if applicable. Your response MUST be a valid JSON array of strings, with no other text or markdown. Example for "Vietnam":\n["Ho Chi Minh City", "Da Nang", "Haiphong", "Can Tho"]`;
    const response = await aiInstance.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json", responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } } },
    });
    const jsonStr = response.text.trim();
    if (!jsonStr) {
        throw new Error("Received empty JSON response from API for regional cities.");
    }
    return JSON.parse(jsonStr);
}

export async function getLiveOpportunities(): Promise<any> {
    const aiInstance = getAiInstance();
    const prompt = `Generate a list of 5 diverse, realistic-looking global development projects or tenders. Use Google Search to find inspiration for project names and types, but you must invent the specific details. For each item, provide a project name, country, sector, value, a brief summary, a source URL (use a real, relevant government or development bank URL, e.g., worldbank.org), an AI feasibility score (between 40 and 95), and a concise AI risk assessment.\nYour output **MUST** be a valid JSON object. The JSON object must have a single key "items" which is an array of objects. Each object in the array must adhere to the specified schema: {project_name: string, country: string, sector: string, value: string, summary: string, source_url: string, ai_feasibility_score: integer, ai_risk_assessment: string}.`;
    const response = await aiInstance.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: prompt,
       config: { 
           tools: [{ googleSearch: {} }]
        }
   });
   const jsonStr = response.text.trim();
   if (!jsonStr) {
       throw new Error("Received empty JSON response from API for live opportunities.");
   }
   // The response might contain markdown like ```json ... ```, so we need to extract the JSON part.
   const jsonMatch = jsonStr.match(/```(json)?\n([\s\S]*?)\n```/);
   const parsableString = jsonMatch ? jsonMatch[2] : jsonStr;

   return JSON.parse(parsableString);
}

export async function getSymbiosisResponse(context: SymbiosisContext, history: ChatMessage[]): Promise<string> {
    const aiInstance = getAiInstance();
    let prompt = `**Initial Context:**\n- Topic: "${context.topic}"\n- Original Finding: "${context.originalContent}"\n`;
    if (context.reportParameters) prompt += `- From Report On: ${context.reportParameters.region} / ${context.reportParameters.industry}\n`;
    prompt += "\n**Conversation History:**\n";
    history.forEach(msg => { prompt += `- ${msg.sender === 'ai' ? 'Nexus AI' : 'User'}: ${msg.text}\n`; });
    prompt += "\nBased on this history, provide the next response as Nexus AI.";
    
    const response = await aiInstance.models.generateContent({
        model: 'gemini-2.5-flash', contents: prompt,
        config: { systemInstruction: SYSTEM_PROMPT_SYMBIOSIS, tools: [{googleSearch: {}}] }
    });
    return response.text;
}

export async function getOutreachLetter(request: LetterRequest): Promise<string> {
    const aiInstance = getAiInstance();
    const prompt = `**Letter Generation Request:**\n\n**User Details:**\n- Name: ${request.reportParameters.userName}\n- Department: ${request.reportParameters.userDepartment}\n- Country: ${request.reportParameters.userCountry}\n\n**Full Matchmaking Report Content:**\n\`\`\`xml\n${request.reportContent}\n\`\`\`\n\n**Your Task:**\nBased on the user's details and the full report provided above, draft the outreach letter according to your core directives.`;
    
    const response = await aiInstance.models.generateContent({
       model: 'gemini-2.5-flash', contents: prompt,
       config: { systemInstruction: SYSTEM_PROMPT_LETTER }
   });
   return response.text;
}
