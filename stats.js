// ==========================================================================
// SAMADHAN SETU — Platform Impact Statistics & Key Metrics
// ==========================================================================

const PLATFORM_STATS = {
  primary: [
    {
      id: "challenges-raised",
      label: "Challenges Raised",
      targetValue: 1250,
      suffix: "+",
      icon: "flag",
      change: "+18% this month",
      color: "text-terracotta",
      bgColor: "bg-orange-50",
      description: "Grassroots societal problems cataloged from villages and towns."
    },
    {
      id: "citizens-connected",
      label: "Citizens Connected",
      targetValue: 8500,
      suffix: "+",
      icon: "users",
      change: "+34% active growth",
      color: "text-sal",
      bgColor: "bg-emerald-50",
      description: "Community voices, panchayat reps & local advocates engaged."
    },
    {
      id: "active-collaborations",
      label: "Active Collaborations",
      targetValue: 320,
      suffix: "+",
      icon: "git-merge",
      change: "+24 new teams",
      color: "text-ochre",
      bgColor: "bg-amber-50",
      description: "Multi-disciplinary student, faculty & NGO joint initiatives."
    },
    {
      id: "solutions-in-progress",
      label: "Solutions in Progress",
      targetValue: 180,
      suffix: "+",
      icon: "award",
      change: "45 in field trials",
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      description: "Prototypes actively being engineered, tested, and deployed."
    }
  ],
  geography: {
    districtsCovered: 24,
    totalBlocks: 260,
    partnerUniversities: 48,
    participatingIndustries: 35,
    grassrootsNGOs: 62
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PLATFORM_STATS };
}
