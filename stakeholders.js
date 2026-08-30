// ==========================================================================
// SAMADHAN SETU — 5 Key Stakeholder Personas & Collaboration Roles
// ==========================================================================

const STAKEHOLDERS_DATA = [
  {
    id: "citizens",
    roleTitle: "Citizens & Communities",
    tagline: "Raise the problems that matter to your community.",
    icon: "users",
    color: "#C25E30",
    bgClass: "bg-orange-50 border-orange-200",
    description: "Every problem has a voice. Citizens are the primary witnesses of grassroots challenges in schools, healthcare, water, farming, and roads.",
    responsibilities: [
      "Submit real-world problem statements with photos, location, and affected count",
      "Upvote and validate challenges raised by neighbors to elevate urgency",
      "Provide ground-level feedback during pilot testing of student & industry solutions",
      "Monitor public impact and ensure community ownership of implemented technologies"
    ],
    badgeText: "Problem Originators",
    actionText: "Raise a Problem Now",
    actionRoute: "#raise-problem"
  },
  {
    id: "students",
    roleTitle: "Students & Innovators",
    tagline: "Turn real-world problems into innovative projects.",
    icon: "lightbulb",
    color: "#D97706",
    bgClass: "bg-amber-50 border-amber-200",
    description: "Instead of building theoretical textbook projects, students tackle real SIH and community challenges that touch thousands of lives.",
    responsibilities: [
      "Browse crowdsourced challenges by domain, technical complexity, and geography",
      "Form interdisciplinary hacker teams with engineering, design, and domain peers",
      "Submit prototype proposals, CAD models, software codebases, and hardware schematics",
      "Gain direct mentorship from university faculty and industry R&D leaders"
    ],
    badgeText: "Solution Architects",
    actionText: "Browse Hackathon Challenges",
    actionRoute: "#explore"
  },
  {
    id: "universities",
    roleTitle: "Universities & Research Labs",
    tagline: "Connect academic knowledge with societal needs.",
    icon: "graduation-cap",
    color: "#24543D",
    bgClass: "bg-emerald-50 border-emerald-200",
    description: "Higher education institutions align academic research, final-year capstones, and institutional grants with pressing societal priorities.",
    responsibilities: [
      "Adopt verified district-level challenge clusters as departmental research themes",
      "Provide lab facilities, testing equipment, and faculty mentorship to student teams",
      "Issue academic credits, patent assistance, and seed grants for viable social tech",
      "Partner with district administration for ground trial validation"
    ],
    badgeText: "Knowledge Incubators",
    actionText: "Partner as an Institution",
    actionRoute: "#collaborate"
  },
  {
    id: "industry",
    roleTitle: "Industry & Enterprises",
    tagline: "Bring technology, expertise and resources to meaningful challenges.",
    icon: "building",
    color: "#0284C7",
    bgClass: "bg-sky-50 border-sky-200",
    description: "Corporates, startups, and MSMEs provide technological scaling, CSR funding, domain expertise, and manufacturing infrastructure.",
    responsibilities: [
      "Sponsor open innovation challenge tracks aligned with corporate social responsibility (CSR)",
      "Provide cloud compute, hardware kits, and professional engineering mentorship",
      "Scale validated student prototypes into commercial-grade deployments",
      "Hire top-performing innovator talent proven on real-world impact problems"
    ],
    badgeText: "Scale & Resource Enablers",
    actionText: "Sponsor / Mentor Projects",
    actionRoute: "#collaborate"
  },
  {
    id: "institutions-ngos",
    roleTitle: "Institutions & Grassroots NGOs",
    tagline: "Help transform ideas into implementation.",
    icon: "heart-handshake",
    color: "#7C3AED",
    bgClass: "bg-purple-50 border-purple-200",
    description: "Field NGOs, Self-Help Groups (SHGs), and district bodies bridge the last-mile gap between digital prototypes and community adoption.",
    responsibilities: [
      "Facilitate ground truth validation and village-level stakeholder meetings",
      "Train local communities, Asha workers, and farmers on using newly deployed tools",
      "Measure social ROI, operational longevity, and behavioral adoption metrics",
      "Advocate for policy integration and district-wide administrative scaling"
    ],
    badgeText: "Last-Mile Catalysts",
    actionText: "Join Field Network",
    actionRoute: "#collaborate"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STAKEHOLDERS_DATA };
}
