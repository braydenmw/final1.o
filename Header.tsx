
import React from 'react';
import { NexusLogo, InformationCircleIcon, ShieldCheckIcon, BlueprintIcon, Cog6ToothIcon, BriefcaseIcon } from './Icons';
import type { View } from '../types';

interface HeaderProps {
    currentView: View;
    onViewChange: (view: View) => void;
}

const NavButton: React.FC<{
    onClick: () => void;
    isActive: boolean;
    title: string;
    children: React.ReactNode;
}> = ({ onClick, isActive, title, children }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            isActive ? 'bg-nexus-surface text-white' : 'text-gray-400 hover:text-white hover:bg-nexus-surface/50'
        }`}
        title={title}
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="p-4 md:px-8 border-b border-nexus-border sticky top-0 bg-nexus-bg-start/80 backdrop-blur-sm z-50 flex-shrink-0">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <NexusLogo className="w-10 h-10 text-nexus-blue" />
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                BWGA Nexus AI
                </h1>
                <p className="text-xs text-gray-400">Global Economic Empowerment OS</p>
            </div>
        </div>
        <nav className="flex items-center gap-1 md:gap-2">
            <NavButton
                onClick={() => onViewChange('profile')}
                isActive={currentView === 'profile'}
                title="Our Mission"
            >
                <InformationCircleIcon className="w-6 h-6"/>
                <span className="hidden md:inline font-semibold">Mission</span>
            </NavButton>
             <NavButton
                onClick={() => onViewChange('manual')}
                isActive={currentView === 'manual'}
                title="How The Nexus Engine Works"
            >
                <Cog6ToothIcon className="w-6 h-6"/>
                <span className="hidden md:inline font-semibold">The Engine</span>
            </NavButton>
            <NavButton
                onClick={() => onViewChange('opportunities')}
                isActive={currentView === 'opportunities'}
                title="Live Opportunities"
            >
                <BriefcaseIcon className="w-6 h-6"/>
                <span className="hidden md:inline font-semibold">Opportunities</span>
            </NavButton>
             <NavButton
                onClick={() => onViewChange('report')}
                isActive={currentView === 'report'}
                title="Generate Nexus Report"
            >
                <BlueprintIcon className="w-6 h-6"/>
                <span className="hidden md:inline font-semibold">Nexus Reports</span>
            </NavButton>
            <NavButton
                onClick={() => onViewChange('compliance')}
                isActive={currentView === 'compliance'}
                title="Compliance & Data Governance"
            >
                <ShieldCheckIcon className="w-6 h-6"/>
                <span className="hidden md:inline font-semibold">Compliance</span>
            </NavButton>
        </nav>
      </div>
    </header>
  );
};

export default Header;
