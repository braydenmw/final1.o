
import React, { useState, useEffect, useCallback } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { CloseIcon, LetterIcon } from './Icons';
import Spinner from './Spinner';

interface LetterGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: () => Promise<string>;
}

export const LetterGeneratorModal: React.FC<LetterGeneratorModalProps> = ({ isOpen, onClose, onGenerate }) => {
  useEscapeKey(onClose);
  const [letterContent, setLetterContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleGenerate = useCallback(async () => {
      setIsGenerating(true);
      setError(null);
      setLetterContent('');
      setCopySuccess('');
      try {
        const content = await onGenerate();
        setLetterContent(content);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(`Failed to generate letter: ${errorMessage}`);
        console.error(e);
      } finally {
        setIsGenerating(false);
      }
  }, [onGenerate]);
  
  useEffect(() => {
    if (isOpen) {
      handleGenerate();
    }
  }, [isOpen, handleGenerate]);
  
  const handleCopyToClipboard = () => {
    if (!letterContent) return;
    navigator.clipboard.writeText(letterContent).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, (err) => {
      setCopySuccess('Failed to copy.');
      console.error('Could not copy text: ', err);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="bg-gradient-to-br from-nexus-bg-start to-nexus-bg-end border border-nexus-border rounded-xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 flex justify-between items-center border-b border-nexus-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <LetterIcon className="w-8 h-8 text-teal-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Outreach Letter Generator</h2>
              <p className="text-sm text-gray-400">AI-drafted introductory letter</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white"><CloseIcon className="w-6 h-6"/></button>
        </header>

        <main className="flex-grow p-6 overflow-y-auto">
          {isGenerating && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Spinner />
              <p className="mt-4">Drafting outreach letter...</p>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg">
                <p className="font-bold">An error occurred</p>
                <p className="text-sm">{error}</p>
            </div>
          )}
          {!isGenerating && !error && letterContent && (
            <textarea
                readOnly
                value={letterContent}
                className="w-full h-full p-4 bg-slate-900/50 border border-nexus-border rounded-lg text-gray-300 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-nexus-blue"
                placeholder="Letter content will appear here..."
            />
          )}
        </main>

        <footer className="p-4 border-t border-nexus-border flex-shrink-0 flex justify-end items-center gap-4">
            {copySuccess && <span className="text-sm text-green-400">{copySuccess}</span>}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Regenerate
            </button>
            <button
              onClick={handleCopyToClipboard}
              disabled={isGenerating || !!error || !letterContent}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Copy to Clipboard
            </button>
        </footer>
      </div>
    </div>
  );
};
