

import React, { useState, useEffect, useCallback } from 'react';
import { fetchLiveOpportunities } from '../services/nexusService';
import type { LiveOpportunityItem, SymbiosisContext } from '../types';
import { Card } from './common/Card';
import { ExternalLinkIcon, SymbiosisIcon, AnalyzeIcon, BriefcaseIcon } from './Icons';
import { Loader } from './common/Loader';

interface LiveOpportunitiesProps {
    onAnalyze: (item: LiveOpportunityItem) => void;
    onStartSymbiosis: (context: SymbiosisContext) => void;
}

const OpportunityCard: React.FC<{ 
    item: LiveOpportunityItem; 
    onAnalyze: LiveOpportunitiesProps['onAnalyze'];
    onStartSymbiosis: LiveOpportunitiesProps['onStartSymbiosis'];
}> = ({ item, onAnalyze, onStartSymbiosis }) => {
    
    const handleSymbiosisClick = (event: React.MouseEvent, topic: string, content: string) => {
        event.stopPropagation();
        onStartSymbiosis({ topic: topic, originalContent: content });
    };

    const getScoreColor = (score: number) => {
        if (score >= 75) return 'text-green-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <Card className="flex flex-col h-full group bg-slate-900/50 border border-slate-700 hover:border-purple-500/50 transition-colors duration-300">
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-3">
                 <h3 className="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition-colors">{item.project_name}</h3>
                 <div className="text-right flex-shrink-0 ml-4">
                    <div className={`text-2xl font-bold ${getScoreColor(item.ai_feasibility_score)}`}>{item.ai_feasibility_score}</div>
                    <div className="text-xs text-gray-400">Feasibility</div>
                 </div>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">{item.country}</span> | <span className="font-semibold text-gray-300">{item.sector}</span> | <span className="font-semibold text-gray-300">Value: {item.value}</span>
              </div>
              <p className="text-sm text-gray-400 mb-4 flex-grow">{item.summary}</p>
              
              <div className="relative mt-auto pt-4 border-t border-white/10">
                  <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider mb-1">AI Risk Assessment</p>
                  <p className="text-sm text-gray-300 pr-8">{item.ai_risk_assessment}</p>
                  <button onClick={(e) => handleSymbiosisClick(e, `AI Risk Assessment for: ${item.project_name}`, item.ai_risk_assessment)} className="absolute top-2 right-0 p-1 text-purple-400 hover:text-cyan-300 opacity-50 group-hover:opacity-100 transition-opacity" title="Start Symbiosis Chat"><SymbiosisIcon className="w-5 h-5"/></button>
              </div>
            </div>
            <div className="bg-slate-900/70 p-3 mt-auto border-t border-white/10 flex justify-between items-center">
                 <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-cyan-300 transition-colors">
                    Source <ExternalLinkIcon className="w-4 h-4" />
                 </a>
                 <button onClick={() => onAnalyze(item)} className="inline-flex items-center gap-2 text-xs font-semibold text-gray-200 bg-white/10 px-2 py-1 rounded-md hover:bg-purple-500/50 transition-colors">
                    Deep-Dive Analysis <AnalyzeIcon className="w-4 h-4"/>
                 </button>
            </div>
        </Card>
    );
};

const ConnectionGuide: React.FC = () => (
    <Card className="bg-amber-900/30 border-amber-500 p-6 text-amber-200 mb-8">
      <h3 className="text-xl font-bold text-white">Live AI Connection Required</h3>
      <p className="mt-2">You are currently viewing pre-loaded sample data because the application is not connected to the live Google AI service.</p>
      <p className="mt-1">This is usually caused by a missing API Key in your deployment environment.</p>
      
      <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
        <h4 className="font-semibold text-white">To see real-time opportunities, follow these steps:</h4>
        <ol className="list-decimal list-inside mt-2 space-y-2 text-sm">
          <li>Go to your project settings in Vercel (or your hosting provider).</li>
          <li>Navigate to the <strong>Environment Variables</strong> section.</li>
          <li>Add a new variable with the following details:
            <ul className="list-disc list-inside ml-6 mt-2 bg-slate-800 p-3 rounded-md font-mono text-amber-100">
              <li><strong>Key:</strong> <code className="bg-slate-700 text-white px-2 py-1 rounded">API_KEY</code></li>
              <li className="mt-1"><strong>Value:</strong> <code className="bg-slate-700 text-white px-2 py-1 rounded">[Your Google Gemini API Key]</code></li>
            </ul>
          </li>
          <li>Save the variable and redeploy your project. The application will automatically connect.</li>
        </ol>
      </div>
    </Card>
);

export const LiveOpportunities: React.FC<LiveOpportunitiesProps> = ({ onAnalyze, onStartSymbiosis }) => {
    const [opportunities, setOpportunities] = useState<LiveOpportunityItem[]>([]);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [isMockData, setIsMockData] = useState(false);

    const loadOpportunities = useCallback(async (forceRefresh = false) => {
        setStatus('loading');
        setError(null);
        try {
            const result = await fetchLiveOpportunities();
            if (result && Array.isArray(result.items)) {
                setOpportunities(result.items);
                setIsMockData(result.isMockData || false);
                setStatus('success');
            } else {
                throw new Error("Invalid data format received from the server.");
            }
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
            setError(errorMessage);
            setStatus('error');
            console.error("Failed to load live opportunities:", e);
        }
    }, []);

    useEffect(() => {
        loadOpportunities();
    }, [loadOpportunities]);

    return (
        <div className="p-4 md:p-8 h-full flex flex-col gap-6 text-gray-200 overflow-hidden">
            <header className="max-w-7xl w-full mx-auto px-1">
                <div className="flex flex-wrap gap-4 justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tighter">Live Opportunities Clearinghouse</h2>
                        <p className="text-gray-400 mt-2 max-w-4xl">A real-time feed of global development projects and tenders, pre-analyzed by the Nexus AI.</p>
                    </div>
                </div>
            </header>

            <main className="flex-grow overflow-y-auto max-w-7xl w-full mx-auto pb-8 pr-2 -mr-2">
                {isMockData && <ConnectionGuide />}
                
                {status === 'loading' && <Loader message="Scanning Global Development Sources..." />}
                {status === 'error' && !isMockData && (
                    <Card className="border-red-500/50 text-red-300 p-4 max-w-2xl mx-auto text-center">
                        <p className="font-semibold">Could not load live opportunities.</p>
                        <p className="text-sm mt-1">{error}</p>
                        <button onClick={() => loadOpportunities(true)} className="text-sm font-semibold mt-4 bg-red-800/50 px-4 py-2 rounded-lg hover:bg-red-700/50 transition-colors">
                            Retry Connection
                        </button>
                    </Card>
                )}
                {status === 'success' && (
                    opportunities.length > 0 ? (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {opportunities.map((item, index) => (
                                <OpportunityCard 
                                    key={`${item.project_name}-${index}`} 
                                    item={item} 
                                    onAnalyze={onAnalyze} 
                                    onStartSymbiosis={onStartSymbiosis} 
                                />
                            ))}
                        </div>
                    ) : (
                         !isMockData &&
                        <Card className="p-6 text-center text-gray-500">
                            No active opportunities found at this time.
                        </Card>
                    )
                )}
            </main>
        </div>
    );
};