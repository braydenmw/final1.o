


import React, { useState, useEffect, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { marked } from 'marked';
import { generateAnalysisStream } from '../services/nexusService';
import type { LiveOpportunityItem } from '../types';
import Spinner from './Spinner';
import { CloseIcon, DownloadIcon, NexusLogo } from './Icons';

interface AnalysisModalProps {
  item: LiveOpportunityItem;
  region: string;
  onClose: () => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ item, region, onClose }) => {
  const [report, setReport] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const generateReport = async () => {
      setIsLoading(true);
      setError(null);
      setReport('');
      try {
        const stream = await generateAnalysisStream(item, region);
        for await (const chunk of stream) {
          setReport((prev) => prev + chunk);
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(`Failed to generate analysis: ${errorMessage}`);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    generateReport();
  }, [item, region]);

  const handleDownloadPdf = async () => {
    const reportElement = document.getElementById('analysis-report-content');
    if (!reportElement) return;

    setIsDownloading(true);
    try {
        const canvas = await html2canvas(reportElement, {
            scale: 2,
            backgroundColor: '#03045E',
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: [canvas.width, canvas.height],
            hotfixes: ['px_scaling'],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`Nexus-Analysis-${item.project_name.replace(/\s+/g, '-')}.pdf`);
    } catch (e) {
        console.error("Failed to generate PDF", e);
    } finally {
        setIsDownloading(false);
    }
  };

  const formattedReportHtml = useMemo(() => {
    // Using { breaks: true } to respect newlines in the AI's output.
    return marked.parse(report, { breaks: true });
  }, [report]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-nexus-bg-end to-nexus-bg-start border border-nexus-border rounded-xl shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col">
        <header className="p-4 flex justify-between items-center border-b border-nexus-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <NexusLogo className="w-8 h-8 text-nexus-blue" />
            <div>
              <h2 className="text-xl font-bold text-white">Nexus Intelligence Deep-Dive</h2>
              <p className="text-sm text-gray-400 truncate max-w-md">Topic: {item.project_name} | Region: {region}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white"><CloseIcon className="w-6 h-6"/></button>
        </header>

        <main className="flex-grow p-1 overflow-y-auto">
            <div id="analysis-report-content" className="p-5">
              {isLoading && !report && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 min-h-[300px]">
                  <Spinner />
                  <p className="mt-2">Generating Analysis for {item.project_name} in {region}...</p>
                </div>
              )}
              {error && (
                <div className="text-red-400 text-center p-4">{error}</div>
              )}
              {/* Using a specific class for report content to scope CSS if needed */ }
              <div className="prose prose-invert max-w-none prose-h1:text-cyan-300 prose-h2:text-purple-300 prose-h3:text-gray-200" dangerouslySetInnerHTML={{ __html: formattedReportHtml }} />
              {isLoading && report && <div className="inline-block w-2 h-4 bg-nexus-blue animate-pulse ml-1" />}
            </div>
        </main>

        <footer className="p-4 flex justify-end items-center border-t border-nexus-border flex-shrink-0">
            <button
              onClick={handleDownloadPdf}
              disabled={isLoading || isDownloading || !report}
              className="bg-nexus-blue hover:bg-sky-400 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isDownloading ? <Spinner/> : <DownloadIcon className="w-5 h-5"/>}
              {isDownloading ? 'Saving...' : 'Download PDF'}
            </button>
        </footer>
      </div>
    </div>
  );
};