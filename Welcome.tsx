
import React from 'react';
import { Card } from './common/Card';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { NexusLogo } from './Icons';

interface WelcomeProps {
    onAccept: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onAccept }) => {
    useEscapeKey(onAccept);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
            <div className="bg-gradient-to-b from-nexus-bg-end to-nexus-bg-start border border-nexus-border rounded-xl shadow-2xl max-w-3xl w-full p-8">
                <div className="text-center">
                    <div className="flex items-center gap-4 justify-center mb-6">
                        <NexusLogo className="w-12 h-12 text-nexus-blue flex-shrink-0" />
                        <h1 id="welcome-title" className="text-3xl font-bold text-gray-100 tracking-tighter">BWGA NEXUS AI</h1>
                    </div>
                    <p className="text-xl text-gray-300 mb-2 font-medium">A New Standard for Global Regional Intelligence</p>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Welcome to the Nexus AI platform, an advanced strategic tool designed to bridge the "Global Understanding Gap" and unlock regional economic potential.
                    </p>
                </div>
                
                <div className="p-6 bg-purple-900/20 border border-purple-500/50 rounded-lg space-y-4 text-gray-300">
                    <h2 className="text-xl font-semibold text-cyan-300">Important Notice: Developmental Status</h2>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>This platform is in an active <strong className="text-cyan-400">Research & Development (R&D)</strong> phase. All features, AI engines, and methodologies are under ongoing development and may change without notice.</li>
                      <li>While pricing tiers are shown to illustrate commercial value, all reports generated during this R&D phase are provided <strong className="text-cyan-400">completely free of charge</strong>.</li>
                      <li>Your use of this platform and any feedback you provide are invaluable to its development.</li>
                    </ul>
                </div>

                <div className="mt-8 text-center">
                    <button 
                        onClick={onAccept}
                        className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-12 rounded-lg hover:opacity-90 transition-all text-lg shadow-lg shadow-cyan-500/30 focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
                    >
                        Agree & Proceed
                    </button>
                </div>
            </div>
        </div>
    );
};
