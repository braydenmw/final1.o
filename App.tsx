
import React, { useState, useCallback, useEffect } from 'react';
import type { SymbiosisContext, ReportParameters, ChatMessage, LiveOpportunityItem, View } from './types';
import { PartnerFindingTier } from './types';
import Header from './components/Header';
import { BusinessProfile } from './components/BusinessProfile';
import { Compliance } from './components/Compliance';
import { Welcome } from './components/Welcome';
import { ReportGenerator } from './components/ReportGenerator';
import { ReportViewer } from './components/ReportViewer';
import { SymbiosisChatModal } from './components/SymbiosisChatModal';
import { LetterGeneratorModal } from './components/LetterGeneratorModal';
import { generateStrategicReport, fetchSymbiosisResponse, generateOutreachLetter } from './services/nexusService';
import { LiveOpportunities } from './components/LiveOpportunities';
import { AnalysisModal } from './components/AnalysisModal';
import { TechnicalManual } from './components/TechnicalManual';

interface AppProps {
  onReady: () => void;
}

const App: React.FC<AppProps> = ({ onReady }) => {
  const [currentView, setCurrentView] = useState<View>('profile');
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Report Generation State
  const [reportParams, setReportParams] = useState<ReportParameters | null>(null);
  const [reportContent, setReportContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Analysis Modal State
  const [analysisItem, setAnalysisItem] = useState<LiveOpportunityItem | null>(null);

  // Modal States
  const [symbiosisContext, setSymbiosisContext] = useState<SymbiosisContext | null>(null);
  const [isSymbiosisActive, setIsSymbiosisActive] = useState<boolean>(false);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Call onReady after a short delay to ensure initial render is complete.
    const timer = setTimeout(() => {
      onReady();
    }, 500);
    return () => clearTimeout(timer);
  }, [onReady]);


  const handleGenerateReport = useCallback(async (params: ReportParameters) => {
    setReportParams(params);
    setCurrentView('report');
    setIsGenerating(true);
    setReportContent(''); // Reset content for new report
    setError(null);

    try {
      const stream = generateStrategicReport(params);
      for await (const chunk of stream) {
        setReportContent(prev => prev + chunk);
      }
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred during report generation.";
      setError(errorMessage);
      setReportContent(prev => prev + `\n\n<div style="color:red; border:1px solid red; padding: 1rem; margin-top: 1rem;">**Error:** ${errorMessage}</div>`);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleResetReport = () => {
    setReportParams(null);
    setReportContent('');
    setError(null);
    setCurrentView('report');
  };

  const handleViewChange = (view: View) => {
    if (view === 'report' && reportParams) {
        handleResetReport();
    }
    setCurrentView(view);
  };
  
  const handleStartSymbiosis = useCallback((context: SymbiosisContext) => {
    setSymbiosisContext(context);
    setIsSymbiosisActive(true);
  }, []);
  
  const handleAnalyzeOpportunityItem = useCallback((item: LiveOpportunityItem) => {
    setAnalysisItem(item);
  }, []);

  const handleCloseSymbiosis = () => {
    setIsSymbiosisActive(false);
    setSymbiosisContext(null);
  };

  const handleSymbiosisChatSubmit = async (history: ChatMessage[]): Promise<string> => {
    if (!symbiosisContext) throw new Error("No Symbiosis context available.");
    try {
        return await fetchSymbiosisResponse(symbiosisContext, history);
    } catch (error: any) {
        setError(error.message || "Failed to get response from Symbiosis AI.");
        return "Sorry, I encountered an error. Please try again.";
    }
  };

  const handleGenerateLetter = useCallback(async (): Promise<string> => {
    if (!reportParams || !reportContent) {
      throw new Error("Report parameters or content is not available.");
    }
    const isPartnerFindingReport = Object.values(PartnerFindingTier).includes(reportParams.tier as PartnerFindingTier);
    if (!isPartnerFindingReport) {
      throw new Error("Letter generation is only available for 'Find a Partner' reports (Tiers 1, 2, and 4).");
    }
    return await generateOutreachLetter({
        reportParameters: reportParams,
        reportContent: reportContent,
    });
  }, [reportParams, reportContent]);


  if (showWelcome) {
    return <Welcome onAccept={() => setShowWelcome(false)} />;
  }
  
  const renderView = () => {
      switch (currentView) {
          case 'profile':
              return <BusinessProfile />;
          case 'manual':
              return <TechnicalManual onGetStarted={() => handleViewChange('report')} />;
          case 'opportunities':
              return <LiveOpportunities 
                        onAnalyze={handleAnalyzeOpportunityItem} 
                        onStartSymbiosis={handleStartSymbiosis} 
                     />;
          case 'compliance':
              return <Compliance />;
          case 'report':
              return (reportParams && reportContent) || (reportParams && isGenerating) ? 
                     <ReportViewer
                        content={reportContent}
                        parameters={reportParams}
                        isGenerating={isGenerating}
                        onReset={handleResetReport}
                        onStartSymbiosis={handleStartSymbiosis}
                        onGenerateLetter={() => setIsLetterModalOpen(true)}
                        error={error}
                     /> :
                     <ReportGenerator onGenerate={handleGenerateReport} isGenerating={isGenerating} />;
          default:
              return <BusinessProfile />;
      }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-nexus-bg-start to-nexus-bg-end text-gray-200 font-sans flex flex-col">
      <Header currentView={currentView} onViewChange={handleViewChange} />
      
      <main className="flex-grow overflow-hidden relative">
        {error && !reportParams && ( // Only show global error if not in report view
             <div className="absolute top-4 right-4 p-4 bg-red-900/50 border border-red-500 text-red-200 text-center font-semibold rounded-lg shadow-lg z-50 flex items-center gap-4" role="alert">
                <span>{error}</span>
                <button onClick={() => setError(null)} className="text-lg font-bold">&times;</button>
            </div>
        )}
        {renderView()}
      </main>

      <footer className="text-center p-4 text-gray-500 text-sm flex-shrink-0">
        <p>BWGA Nexus AI &copy; 2024 - The Global Operating System for Regional Economic Empowerment</p>
         <div className="mt-2">
            <button onClick={() => handleViewChange('compliance')} className="text-xs text-gray-500 hover:text-white hover:underline transition-colors">
                Compliance & Data Governance
            </button>
        </div>
      </footer>

      {isSymbiosisActive && symbiosisContext && (
          <SymbiosisChatModal
              context={symbiosisContext}
              isOpen={isSymbiosisActive}
              onClose={handleCloseSymbiosis}
              onSendMessage={handleSymbiosisChatSubmit}
          />
      )}
      {isLetterModalOpen && (
          <LetterGeneratorModal
              isOpen={isLetterModalOpen}
              onClose={() => setIsLetterModalOpen(false)}
              onGenerate={handleGenerateLetter}
          />
      )}
      {analysisItem && (
        <AnalysisModal 
          item={analysisItem}
          region={analysisItem.country} // Use the opportunity's country as the region context
          onClose={() => setAnalysisItem(null)}
        />
      )}
    </div>
  );
};

export default App;
