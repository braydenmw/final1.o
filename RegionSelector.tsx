import React, { useState, useRef, useEffect } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { GlobeAltIcon } from './Icons';
import { GLOBAL_REGIONS } from '../constants';

interface RegionSelectorProps {
    selectedRegion: string;
    onRegionChange: (region: string) => void;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, onRegionChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelect = (region: string) => {
        onRegionChange(region);
        setIsOpen(false);
    };
    
    useEscapeKey(() => setIsOpen(false));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleToggle}
                className="flex items-center gap-2 text-sm font-medium text-gray-300 bg-nexus-surface border border-nexus-border rounded-lg px-4 py-2 hover:bg-slate-700 transition-colors"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <GlobeAltIcon className="w-5 h-5 text-cyan-400" />
                <span>{selectedRegion}</span>
                 <svg className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-nexus-border rounded-lg shadow-xl z-10 py-1">
                    {GLOBAL_REGIONS.map(region => (
                        <a
                            key={region}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelect(region);
                            }}
                            className={`block px-4 py-2 text-sm ${selectedRegion === region ? 'bg-nexus-blue text-white' : 'text-gray-300 hover:bg-nexus-surface'}`}
                        >
                            {region}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};
