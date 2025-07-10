


import type { TierDetail, ReportOptionDetail } from './types';
import { MarketAnalysisTier, PartnerFindingTier } from './types';

export const INDUSTRIES = [
  "Advanced Manufacturing & Robotics",
  "Agriculture & Aquaculture Technology (AgriTech)",
  "Artificial Intelligence (AI) & Machine Learning",
  "Biotechnology & Life Sciences",
  "Clean Technology & Renewable Energy",
  "Critical Minerals & Rare Earth Elements",
  "Cybersecurity",
  "Digital Infrastructure (Data Centers, 5G)",
  "Financial Technology (FinTech)",
  "Logistics & Supply Chain Tech",
  "Medical Technology & Healthcare Innovation",
  "Space Technology & Exploration",
  "Sustainable Materials",
  "Water Technology & Management",
];

export const COUNTRIES = [
  "Australia", "Brazil", "Canada", "Chile", "Egypt", "Estonia",
  "Finland", "Germany", "Ghana", "India", "Indonesia", "Israel",
  "Japan", "Kenya", "Malaysia", "Mexico", "Morocco", "Netherlands",
  "New Zealand", "Nigeria", "Norway", "Oman", "Philippines", "Poland",
  "Portugal", "Qatar", "Rwanda", "Saudi Arabia", "Singapore",
  "South Africa", "South Korea", "Spain", "Sweden", "Switzerland",
  "Taiwan", "Tanzania", "Thailand", "Turkey", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Vietnam"
];

export const GOVERNMENT_DEPARTMENTS = [
    "Department of Trade & Industry",
    "Foreign Affairs / State Department",
    "Economic Development Agency",
    "Investment Promotion Agency",
    "Department of Agriculture",
    "Department of Science & Technology",
    "National Security Council",
    "Other"
];

export const NON_GOV_ORG_TYPES = [
    "Private Corporation",
    "Investment Firm / Venture Capital",
    "Industry Association / Chamber of Commerce",
    "Research Institute / Academia",
    "Consulting Firm",
    "Non-Profit / NGO",
    "Other"
];


export const COMPANY_SIZES = [
    "Startup (1-50 employees)",
    "Small-Medium Enterprise (51-500 employees)",
    "Large Corporation (501-5000 employees)",
    "Multinational (5000+ employees)"
];

export const KEY_TECHNOLOGIES = [
    "AI/ML Platforms",
    "IoT & Edge Computing",
    "Blockchain & DLT",
    "Advanced Materials",
    "Robotics & Automation",
    "Gene Editing/CRISPR",
    "Quantum Computing",
    "5G/6G Communications",
    "Battery & Energy Storage",
    "Carbon Capture, Utilization, and Storage (CCUS)",
    "Precision Agriculture",
    "Digital Twin Technology"
];

export const TARGET_MARKETS = [
    "Developed Economies (e.g., North America, Western Europe)",
    "Emerging Asia (e.g., Southeast Asia, India)",
    "Latin America",
    "Middle East & North Africa (MENA)",
    "Sub-Saharan Africa",
    "Global/Any",
];

export const GLOBAL_REGIONS = [
    "Global",
    "North America",
    "Europe",
    "Asia-Pacific",
    "Latin America",
    "Middle East & Africa",
];

export const DASHBOARD_CATEGORIES = [
  "Geopolitical Shifts",
  "Technology Breakthroughs",
  "Supply Chain Disruptions",
  "Market Entry Signals"
];


export const MARKET_ANALYSIS_TIER_DETAILS: TierDetail[] = [
    {
        tier: MarketAnalysisTier.ECONOMIC_SNAPSHOT,
        brief: "A high-level quantitative look at a region's core industrial strengths.",
        fullDescription: "Uses Location Quotient (LQ) analysis to measure an industry's concentration in your region compared to a national average. This report provides a quick, data-driven baseline of your region's key specializations.",
        cost: "R&D Phase: $150",
        pageCount: "Approx. 5 pages",
        keyDeliverables: [
            "Location Quotient (LQ) Analysis for chosen industry",
            "Interpretation of regional specialization",
            "Identification of core economic strengths",
            "Data visualization of LQ score",
        ],
        idealFor: "Initial discovery and quickly validating assumptions about a region's industrial base."
    },
    {
        tier: MarketAnalysisTier.COMPETITIVE_LANDSCAPE,
        brief: "Reveals if your region is winning or losing against its peers and why.",
        fullDescription: "Includes everything in the Economic Snapshot, plus a powerful Shift-Share Analysis. This dissects your region's employment growth to determine if it's being driven by national trends, industry mix, or true local competitive advantages.",
        cost: "R&D Phase: $400",
        pageCount: "Approx. 15 pages",
        keyDeliverables: [
            { subItem: "Everything in Snapshot, PLUS:" },
            "Shift-Share Analysis",
            "Decomposition of growth (National, Industry, Competitive)",
            "Analysis of regional outperformance/underperformance",
            "Strategic insights for policy focus",
        ],
        idealFor: "Formulating competitive strategy and understanding the 'why' behind regional economic performance."
    },
     {
        tier: MarketAnalysisTier.INVESTMENT_DEEP_DIVE,
        brief: "Pinpoints specific, actionable investment opportunities within a sector.",
        fullDescription: "The most comprehensive market analysis. This report includes all previous analyses and adds an Industrial Cluster Analysis to map the entire ecosystem, identifying critical supply chain gaps that represent prime investment targets.",
        cost: "R&D Phase: $700",
        pageCount: "Approx. 30 pages",
        keyDeliverables: [
            { subItem: "Everything in Landscape, PLUS:" },
            "Industrial Cluster & Ecosystem Mapping",
            "Identification of 'Anchor Industries'",
            "Pinpointed Supply Chain Gaps",
            "Actionable list of investment opportunities",
        ],
        idealFor: "Investment promotion agencies and strategic planners seeking specific, data-validated opportunities to present to investors."
    },
];

export const PARTNER_FINDING_TIER_DETAILS: TierDetail[] = [
    {
        tier: PartnerFindingTier.PARTNERSHIP_BLUEPRINT,
        brief: "A vetted shortlist of up to 3 potential private sector partners with deeper synergy analysis.",
        fullDescription: "The Partnership Blueprint builds a robust case for private sector engagement. It moves beyond a single match to provide a vetted shortlist of potential partners for your region, complete with strategic intelligence and risk analysis.",
        cost: "R&D Phase: $550",
        pageCount: "Approx. 20 pages",
        keyDeliverables: [
            "Vetted shortlist of up to 3 companies",
            "In-Depth Synergy Analysis for each",
            "Preliminary Risk Map (Opportunities, Cautions, Risks)",
            "Sector-Specific Ecosystem Analysis for your region",
            "NSIL Interactive Report",
        ],
        idealFor: "Economic development agencies needing a list of viable, pre-vetted private sector partners for a specific regional initiative."
    },
     {
        tier: PartnerFindingTier.TRANSFORMATION_SIMULATOR,
        brief: "A deep dive on the #1 matched partner, including economic impact modeling AND the new 'Nexus Future-Cast Scenarios'.",
        fullDescription: "The premium offering for major strategic decisions. This tier provides an exhaustive analysis of the top partner, including detailed economic impact modeling and the 'Nexus Future-Cast Scenarios'—a dynamic strategic playbook that models multiple plausible futures.",
        cost: "R&D Phase: $850",
        pageCount: "Approx. 40 pages",
        keyDeliverables: [
            { subItem: "Everything in Blueprint, PLUS:" },
            "Deep dive analysis on the #1 ranked partner",
            "Economic Impact Modeling for your region",
            "Nexus Future-Cast Scenarios™",
            "Advanced Infrastructure & Logistics Audit",
            "ESG & Climate Resilience Due Diligence",
        ],
        idealFor: "Government bodies planning significant, long-term strategic initiatives requiring a full-spectrum analysis of risks and opportunities under various future conditions."
    },
    {
        tier: PartnerFindingTier.VALUATION_RISK,
        brief: "Deep-dive due diligence on a top-matched company, focusing on valuation, risk, and reputational factors.",
        fullDescription: "The ultimate due diligence tool for de-risking a final decision. This report focuses on a single, top-tier matched company to provide a comprehensive valuation and risk assessment, analyzing financial health indicators, reputational risks, geopolitical exposure, and the overall viability of the proposed partnership.",
        cost: "R&D Phase: $1,200",
        pageCount: "Approx. 30 pages",
        keyDeliverables: [
            "In-depth Single-Company Financial Health Assessment",
            "Reputational & Media Risk Analysis (Adverse Media Scan)",
            "Geopolitical & Regulatory Exposure Mapping",
            "Final Partnership Viability Score & Recommendation"
        ],
        idealFor: "Final-stage due diligence, de-risking major investment decisions, and for board-level or investment committee presentations."
    }
];

export const REPORT_OPTIONS: ReportOptionDetail[] = [
    {
        id: 'geopolitical',
        title: 'Geopolitical Stability Briefing',
        description: 'A focused analysis on the geopolitical factors affecting the target region, including trade relationships, political stability, and security outlook.',
        cost: 'R&D Phase: $10'
    },
    {
        id: 'talent',
        title: 'Talent & Workforce Analysis',
        description: 'An overview of the local labor market, key universities, skill availability, and potential talent pipeline for the target industry.',
        cost: 'R&D Phase: $10'
    },
    {
        id: 'infrastructure',
        title: 'Infrastructure & Logistics Audit',
        description: 'A review of the critical infrastructure (ports, airports, digital connectivity, energy grid) supporting the target industry in the region.',
        cost: 'R&D Phase: $10'
    },
    {
        id: 'esg',
        title: 'ESG & Climate Resilience Report',
        description: 'An assessment of the Environmental, Social, and Governance (ESG) landscape and climate-related risks and opportunities in the region.',
        cost: 'R&D Phase: $10'
    },
    {
        id: 'reputation',
        title: 'Reputational & Media Risk Scan',
        description: 'A deep-dive into adverse media and public sentiment related to the target region or a top-matched company.',
        cost: 'R&D Phase: $10'
    },
];