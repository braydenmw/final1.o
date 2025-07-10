import type { LiveOpportunitiesResponse } from '../types';

export const MOCK_OPPORTUNITIES: LiveOpportunitiesResponse = {
  items: [
    {
      project_name: "Mindanao Railway Project - Phase 1",
      country: "Philippines",
      sector: "Digital Infrastructure",
      value: "$1.5 Billion",
      summary: "Development of the first phase of the Mindanao Railway, focusing on a 102-kilometer segment to boost connectivity and trade in the region. Includes modernizing signaling and communication systems.",
      source_url: "https://www.mdapress.com.ph/press-release/article/p3-9b-mrp-tagum-davao-digos-segment-construction-eyed-in-q1-2025",
      ai_feasibility_score: 85,
      ai_risk_assessment: "High local government support and strategic national importance, but potential for land acquisition delays and security concerns in specific areas."
    },
    {
      project_name: "National Semiconductor Strategy Implementation",
      country: "United Kingdom",
      sector: "Advanced Manufacturing & Robotics",
      value: "£1 Billion Fund",
      summary: "Government-backed initiative to bolster the UK's domestic semiconductor industry, focusing on R&D in compound semiconductors and advanced packaging. Aims to attract private investment and build supply chain resilience.",
      source_url: "https://www.gov.uk/government/publications/national-semiconductor-strategy",
      ai_feasibility_score: 78,
      ai_risk_assessment: "Strong IP and research base. Faces intense global competition and requires significant private co-investment to achieve scale. Success is dependent on securing skilled talent."
    },
    {
      project_name: "Green Hydrogen Development Program",
      country: "Chile",
      sector: "Clean Technology & Renewable Energy",
      value: "$50 Million Initial Grant",
      summary: "A program to leverage Chile's exceptional solar resources for green hydrogen production. The initiative seeks partners for electrolysis technology, storage solutions, and establishing export corridors.",
      source_url: "https://www.investchile.gob.cl/key-industries/green-hydrogen/",
      ai_feasibility_score: 92,
      ai_risk_assessment: "Excellent renewable energy potential and supportive regulatory framework. Market development risk exists, as global hydrogen demand and infrastructure are still maturing."
    },
    {
      project_name: "Kenya National Digital Master Plan 2022-2032",
      country: "Kenya",
      sector: "Digital Infrastructure (Data Centers, 5G)",
      value: "$500 Million",
      summary: "Comprehensive plan to digitize government services, expand fiber optic networks to rural areas, and establish regional data centers. Seeking private partners for PPP projects.",
      source_url: "https://www.ict.go.ke/digital-master-plan-2022-2032/",
      ai_feasibility_score: 75,
      ai_risk_assessment: "Growing digital economy and high mobile penetration. Risks include regulatory hurdles for foreign investment and the need for significant cybersecurity capacity building."
    },
    {
      project_name: "Vietnam AgriTech Transformation Initiative",
      country: "Vietnam",
      sector: "Agriculture & Aquaculture Technology (AgriTech)",
      value: "$300 Million (World Bank Loan)",
      summary: "A national initiative to modernize Vietnam's agricultural sector through technology. Focus areas include precision farming, IoT sensors for water management, and supply chain traceability using blockchain.",
      source_url: "https://www.worldbank.org/en/country/vietnam/brief/powering-vietnams-agriculture-with-innovation-and-technology",
      ai_feasibility_score: 88,
      ai_risk_assessment: "Strong government backing and a large, established agricultural sector. Challenges include fragmented land ownership and the need for extensive farmer training and adoption programs."
    },
     {
      project_name: "Canadian Critical Minerals Infrastructure Fund (CMIF)",
      country: "Canada",
      sector: "Critical Minerals & Rare Earth Elements",
      value: "$1.5 Billion CAD",
      summary: "Fund to support clean energy and transportation infrastructure projects necessary to unlock Canada's critical mineral deposits, particularly in northern and remote regions. Open to proposals from mining companies and infrastructure developers.",
      source_url: "https://www.canada.ca/en/natural-resources-canada/news/2023/10/minister-wilkinson-launches-15-billion-critical-minerals-infrastructure-fund.html",
      ai_feasibility_score: 82,
      ai_risk_assessment: "Vast untapped resources and stable political environment. High operational costs and logistical challenges in remote areas are the primary risks. Indigenous consultation is critical."
    }
  ]
};
