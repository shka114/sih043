// ==========================================================================
// SAMADHAN SETU — 10 Core Societal Challenge Categories
// ==========================================================================

const CATEGORIES_DATA = [
  {
    id: "education",
    name: "Education",
    icon: "book-open",
    count: 248,
    description: "Bridging foundational literacy, digital classrooms, tribal dialect learning & rural school resources.",
    color: "#C25E30",
    bgLight: "#FBF0EB",
    tags: ["Digital Classroom", "Rural Schools", "Tribal Dialects", "Vocational Training"]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "activity",
    count: 312,
    description: "Primary health center connectivity, maternal care in remote blocks & portable diagnostic devices.",
    color: "#E11D48",
    bgLight: "#FFE4E6",
    tags: ["Telemedicine", "Maternal Health", "Nutritional Tracking", "Emergency Response"]
  },
  {
    id: "environment",
    name: "Environment",
    icon: "trees",
    count: 195,
    description: "Forest conservation, groundwater rejuvenation, mining land restoration & eco-friendly waste systems.",
    color: "#16A34A",
    bgLight: "#DCFCE7",
    tags: ["Forest Conservation", "Mine Reclamation", "Clean Air", "River Health"]
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: "wheat",
    count: 284,
    description: "Climate-resilient crops, solar micro-cold storage for smallholders & real-time pest early warning.",
    color: "#D97706",
    bgLight: "#FEF3C7",
    tags: ["Micro-Irrigation", "Organic Farming", "Cold Storage", "Market Linkage"]
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: "building-2",
    count: 167,
    description: "All-weather village roads, eco-friendly public structures & solar mini-grids for off-grid hamlets.",
    color: "#0284C7",
    bgLight: "#E0F2FE",
    tags: ["Off-grid Solar", "Bridge Connectivity", "Clean Water Supply", "Drainage"]
  },
  {
    id: "employment",
    name: "Employment",
    icon: "briefcase",
    count: 215,
    description: "Local livelihood creation, artisan market access, youth upskilling & agro-processing clusters.",
    color: "#7C3AED",
    bgLight: "#EDE9FE",
    tags: ["Skill Development", "Handicrafts", "Agro-Enterprises", "Micro-Credit"]
  },
  {
    id: "women-child",
    name: "Women & Child Development",
    icon: "heart-handshake",
    count: 189,
    description: "Safe village transport, Anganwadi tech-enablement, nutritional security & self-help group digital tools.",
    color: "#DB2777",
    bgLight: "#FCE7F3",
    tags: ["SHG Digitization", "Nutrition", "Child Protection", "Maternal Care"]
  },
  {
    id: "rural-development",
    name: "Rural Development",
    icon: "map-pin",
    count: 230,
    description: "Gram Panchayat digital services, traditional water harvesting (Doba/Check dams) & village electrification.",
    color: "#24543D",
    bgLight: "#EBF3EE",
    tags: ["Panchayat Tech", "Doba Rejuvenation", "Rural Logistics", "Solar Pumping"]
  },
  {
    id: "public-services",
    name: "Public Services",
    icon: "landmark",
    count: 142,
    description: "Direct civic grievance tracking, simplified caste/income certificate access & ration supply transparency.",
    color: "#475569",
    bgLight: "#F1F5F9",
    tags: ["Civic Grievance", "Ration Transparency", "Certificate Portals", "Public Transit"]
  },
  {
    id: "digital-inclusion",
    name: "Digital Inclusion",
    icon: "wifi",
    count: 178,
    description: "Voice-assisted native language interfaces, offline-first digital literacy & low-cost village connectivity.",
    color: "#0D9488",
    bgLight: "#CCFBF1",
    tags: ["Voice Tech", "Local Dialect UI", "Offline Learning", "Community Kiosks"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CATEGORIES_DATA };
}
