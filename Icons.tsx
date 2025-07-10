

import React from 'react';

type IconProps = {
  className?: string;
};

export const NexusLogo: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 2.5L95.5 26.25V73.75L50 97.5L4.5 73.75V26.25L50 2.5Z" stroke="currentColor" strokeWidth="5"/>
        <path d="M50 2.5V50L4.5 26.25" stroke="currentColor" strokeWidth="5"/>
        <path d="M4.5 73.75L50 50" stroke="currentColor" strokeWidth="5"/>
        <path d="M50 50L95.5 73.75" stroke="currentColor" strokeWidth="5"/>
        <path d="M95.5 26.25L50 50" stroke="currentColor" strokeWidth="5"/>
        <path d="M50 97.5V50" stroke="currentColor" strokeWidth="5"/>
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955a.75.75 0 01-.53 1.28H18v6a2.25 2.25 0 01-2.25 2.25H8.25A2.25 2.25 0 016 18.25V13.28H4.78a.75.75 0 01-.53-1.28z" />
    </svg>
);

export const InformationCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
      <path d="M9 12l2 2l4 -4"></path>
    </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
   <path d="M10 14l10 -10"></path>
   <path d="M15 4l5 0l0 5"></path>
  </svg>
);

export const SymbiosisIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
       <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
       <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z"></path>
       <path d="M12 21a9 9 0 1 0 0 -18a9 9 0 0 0 0 18z"></path>
       <path d="M12 3a4 4 0 0 0 0 8a4 4 0 0 0 0 -8z"></path>
       <path d="M12 13a4 4 0 0 1 0 8a4 4 0 0 1 0 -8z"></path>
    </svg>
);

export const AnalyzeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
       <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
       <path d="M9 12v-4"></path>
       <path d="M12 12v-1"></path>
       <path d="M15 12v-2"></path>
       <path d="M12 12v-1a2 2 0 1 1 4 0v1"></path>
       <path d="M12 12v-2a3 3 0 1 1 6 0v2"></path>
       <path d="M3 12h18"></path>
       <path d="M18 20l-4.5 -4.5"></path>
       <path d="M14.5 20l-1.5 -1.5"></path>
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const RocketLaunchIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.953 14.953 0 00-4.03-6.17m-5.84 7.38v-4.82m-2.56-5.84a14.953 14.953 0 00-6.17-4.03m14.95 4.03l-3.3-3.3m-3.3 3.3l3.3-3.3m-3.3 3.3l-3.3 3.3m3.3-3.3l3.3 3.3" />
    </svg>
);

export const PartnerIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.286 2.72a3 3 0 01-4.682-2.72 9.094 9.094 0 013.741-.479m7.286 2.72a3 3 0 00-7.286 0m7.286 0a9.094 9.094 0 00-3.642-.479m-3.642.479a9.094 9.094 0 01-3.642-.479m5.824 5.499a3 3 0 004.832 0l-4.832-4.832-4.832 4.832a3 3 0 004.832 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a3.375 3.375 0 100 6.75 3.375 3.375 0 000-6.75zM4.125 6.375a3.375 3.375 0 106.75 0 3.375 3.375 0 00-6.75 0zM19.875 6.375a3.375 3.375 0 10-6.75 0 3.375 3.375 0 006.75 0z" />
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

export const GlobeAltIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.5L4.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5L19.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v19.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5" />
    </svg>
);

export const BlueprintIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15M9 15l6-6m-6 0h6v6" />
    </svg>
);

export const LetterIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

export const ChartPieIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>
);

export const Cog6ToothIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.26.713.53.967l.82-.82a.75.75 0 011.06 0l1.838 1.838a.75.75 0 010 1.06l-.82.82c-.27.27-.467.633-.53.967l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 00-.53-.967l-.82.82a.75.75 0 01-1.06 0L4.293 9.353a.75.75 0 010-1.06l.82-.82c.27-.27.467-.633-.53-.967l.213-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.098a2.25 2.25 0 01-2.25 2.25h-13.5a2.25 2.25 0 01-2.25-2.25V14.15M16.5 18.75h-9M9.75 14.15V3.75a2.25 2.25 0 012.25-2.25h0a2.25 2.25 0 012.25 2.25v10.4m-4.5 0a2.25 2.25 0 002.25 2.25h0a2.25 2.25 0 002.25-2.25m-4.5 0V7.5A2.25 2.25 0 019.75 5.25h4.5a2.25 2.25 0 012.25 2.25v1.5" />
    </svg>
);