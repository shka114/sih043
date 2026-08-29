// ==========================================================================
// SAMADHAN SETU — Realistic Societal Problems & Solutions Dataset (Phase 1, 2, 3)
// Grounded in real Jharkhand community challenges (SIH Prototype)
// ==========================================================================

// The 7-stage Problem-to-Impact Lifecycle
const LIFECYCLE_STAGES = [
  { step: 1, id: "submitted", label: "Problem Submitted", desc: "Citizen or community raises the problem with location and details." },
  { step: 2, id: "under-review", label: "Under Review", desc: "Coordinators verify location, feasibility and basic context." },
  { step: 3, id: "validated", label: "Validated", desc: "Problem is confirmed as a genuine grassroots community challenge." },
  { step: 4, id: "looking-solutions", label: "Looking for Solutions", desc: "Published openly for students, research labs and innovators." },
  { step: 5, id: "solution-proposed", label: "Solution Proposed", desc: "Technical or grassroots approach submitted by a solver team." },
  { step: 6, id: "implementation", label: "Implementation", desc: "Prototype being field-tested with local community/NGO support." },
  { step: 7, id: "resolved", label: "Resolved", desc: "Solution deployed on ground with measurable impact created." }
];

const INITIAL_CHALLENGES = [
  {
    id: "PRB-101",
    title: "Drinking water availability and high fluoride in Chauparan village",
    category: "healthcare",
    categoryName: "Healthcare & Water",
    location: "Chauparan Block, Hazaribagh, Jharkhand",
    district: "Hazaribagh",
    shortDescription: "Handpumps in 3 tolas have high fluoride contamination. Villagers have to walk 2 km to get drinking water during dry months.",
    currentSituation: "Groundwater testing shows fluoride levels above 2.8 mg/L. Children and elders suffer from early joint stiffness and yellowing teeth. The pipe water project has not reached these hamlets yet, and during summer 2 out of 4 handpumps dry up completely.",
    fullDescription: "Groundwater testing in Chauparan shows fluoride levels above 2.8 mg/L. Children and elders suffer from early joint stiffness and yellowing teeth. The pipe water project has not reached these hamlets yet, and during summer 2 out of 4 handpumps dry up completely. Families spend up to 2 hours every morning carrying water cans from a neighboring village well.",
    affectedPopulation: "About 450 villagers (90 families)",
    urgency: "High",
    expectedOutcome: "A low-cost, community-level water filtration unit (like laterite clay/biochar or gravity filter) that can be installed on existing borewells without requiring steady electricity.",
    expectedSolution: "A low-cost, community-level water filtration unit (like laterite clay/biochar or gravity filter) that can be installed on existing borewells without requiring steady electricity.",
    stageIndex: 5, // 5 = Implementation (Stage 6)
    status: "Implementation / Pilot",
    authorName: "Pooja Kumari (Village ASHA Worker)",
    datePosted: "18 Aug 2026",
    solutionsList: [
      {
        id: "SOL-101",
        title: "Community Laterite Clay & Biochar Gravity Filter",
        problemId: "PRB-101",
        problemTitle: "Drinking water availability and high fluoride in Chauparan",
        location: "Chauparan, Hazaribagh",
        submittedBy: "Team JalSetu (NIT Jamshedpur & CSIR-CIMFR)",
        currentStage: "Pilot / Implementation",
        description: "Zero-power gravity water filter using local laterite soil and sal-wood biochar filter media. Reduces fluoride below 0.8 mg/L at ₹0.03 per liter.",
        expectedImpact: "Provides 500 liters of safe drinking water daily for 90 families at Chauparan Middle School compound.",
        date: "22 Aug 2026"
      }
    ]
  },
  {
    id: "PRB-102",
    title: "Lack of digital learning tools in government middle school Mahuadanr",
    category: "education",
    categoryName: "Education",
    location: "Mahuadanr, Latehar, Jharkhand",
    district: "Latehar",
    shortDescription: "School has no internet and erratic power. Students in classes 1 to 5 struggle with basic reading in Hindi and local Kurukh language.",
    currentSituation: "The school has 120 students and only 3 teachers. Mobile internet reception (4G) is almost zero inside the valley. Smart TV provided under a scheme sits idle because there is no offline content or reliable power backup.",
    fullDescription: "The school has 120 students and only 3 teachers. Mobile internet reception (4G) is almost zero inside the valley. Smart TV provided under a scheme sits idle because there is no offline content or reliable power backup. Teachers need offline learning resources with audio-visual stories in regional tribal language (Kurukh) to build foundational reading and arithmetic skills.",
    affectedPopulation: "120 primary school students",
    urgency: "Medium",
    expectedOutcome: "An offline, battery/solar-powered content box or tablet application that works without internet and has regional language voice modules.",
    expectedSolution: "An offline, battery/solar-powered content box or tablet application that works without internet and has regional language voice modules.",
    stageIndex: 4, // 4 = Solution Proposed (Stage 5)
    status: "Solution Proposed",
    authorName: "Sushma Toppo (School Management Committee)",
    datePosted: "12 Aug 2026",
    solutionsList: [
      {
        id: "SOL-102",
        title: "GyanSetu Offline Solar Mesh Content Box",
        problemId: "PRB-102",
        problemTitle: "Lack of digital learning tools in Mahuadanr school",
        location: "Mahuadanr, Latehar",
        submittedBy: "BIT Mesra Student Innovators",
        currentStage: "Solution Proposed / Testing",
        description: "Raspberry Pi offline server running on a 15W mini solar battery. Transmits bilingual interactive audio storybooks in Kurukh & Hindi up to 100 meters without internet.",
        expectedImpact: "Enables 120 students to practice bilingual reading every day.",
        date: "20 Aug 2026"
      }
    ]
  },
  {
    id: "PRB-103",
    title: "Difficulty connecting local Dokra metal craft artisans with direct buyers",
    category: "employment",
    categoryName: "Livelihoods & Craft",
    location: "Khunti Artisan Cluster, Jharkhand",
    district: "Khunti",
    shortDescription: "Traditional Dokra bell-metal casting artisans get very low rates from middlemen because they lack direct market access.",
    currentSituation: "About 35 artisan families make traditional bell-metal sculptures. Middlemen buy items for ₹300-400 which sell in city exhibitions for ₹1,500+. Artisans do not know how to list items online, manage online payments, or pack fragile craft goods safely for courier transit.",
    fullDescription: "About 35 artisan families make traditional bell-metal sculptures. Middlemen buy items for ₹300-400 which sell in city exhibitions for ₹1,500+. Artisans do not know how to list items online, manage online payments, or pack fragile craft goods safely for courier transit. Younger family members are leaving the craft due to poor earnings.",
    affectedPopulation: "35 artisan families (approx. 160 people)",
    urgency: "Medium",
    expectedOutcome: "A simplified, voice/regional language assisted digital catalog or direct linkage system where artisan SHGs can receive orders and fair payments.",
    expectedSolution: "A simplified, voice/regional language assisted digital catalog or direct linkage system where artisan SHGs can receive orders and fair payments.",
    stageIndex: 5, // 5 = Implementation (Stage 6)
    status: "Implementation / Pilot",
    authorName: "Budhram Malhar (Artisan Group Lead)",
    datePosted: "05 Aug 2026",
    solutionsList: [
      {
        id: "SOL-103",
        title: "WhatsApp Direct Artisan Catalog & Safe Packaging Standard",
        problemId: "PRB-103",
        problemTitle: "Connecting Dokra metal craft artisans with buyers",
        location: "Khunti Artisan Cluster",
        submittedBy: "Team Yuva Innovators (Ranchi University & NID Alum)",
        currentStage: "Implementation",
        description: "Setting up a verified WhatsApp catalog managed by local youth with standardized corrugated box packaging for safe transit.",
        expectedImpact: "Artisans receive 60-70% of retail sale value instead of 20%.",
        date: "14 Aug 2026"
      }
    ]
  },
  {
    id: "PRB-104",
    title: "Poor solid waste collection and open dumping near weekly market in Bundu",
    category: "environment",
    categoryName: "Environment & Sanitation",
    location: "Bundu Nagar Panchayat, Ranchi District, Jharkhand",
    district: "Ranchi",
    shortDescription: "Vegetable and plastic waste piles up after weekly Haat bazaar, blocking drains and causing foul smell.",
    currentSituation: "Every Wednesday and Saturday, over 200 vendors set up shop. Around 1.5 tons of organic vegetable waste and single-use plastic are left on the roadside. Stray cattle eat plastic, and monsoon rains wash garbage directly into the local stream.",
    fullDescription: "Every Wednesday and Saturday, over 200 vendors set up shop. Around 1.5 tons of organic vegetable waste and single-use plastic are left on the roadside. Stray cattle eat plastic, and monsoon rains wash garbage directly into the local stream. The local Nagar Panchayat lacks adequate collection vehicles and segregated composting bins.",
    affectedPopulation: "Over 800 nearby residents and 200 shopkeepers",
    urgency: "High",
    expectedOutcome: "A decentralized composting pit model near the market coupled with a simple community monitoring system to segregate vegetable peel waste for local farmers.",
    expectedSolution: "A decentralized composting pit model near the market coupled with a simple community monitoring system to segregate vegetable peel waste for local farmers.",
    stageIndex: 3, // 3 = Looking for Solutions (Stage 4)
    status: "Looking for Solutions",
    authorName: "Rajesh Sahu (Local Shop Owner)",
    datePosted: "20 Aug 2026",
    solutionsList: []
  },
  {
    id: "PRB-105",
    title: "Post-harvest vegetable spoilage for smallholder tomato farmers in Bishunpur",
    category: "agriculture",
    categoryName: "Agriculture",
    location: "Bishunpur Block, Gumla District, Jharkhand",
    district: "Gumla",
    shortDescription: "Tomato farmers lose up to 30% of their harvest due to intense afternoon heat and absence of village-level cold storage.",
    currentSituation: "Marginal farmers produce pesticide-free tomatoes but have to sell at ₹3-4/kg to middlemen on market days or watch them spoil within 48 hours.",
    fullDescription: "Marginal farmers produce pesticide-free tomatoes but have to sell at ₹3-4/kg to middlemen on market days or watch them spoil within 48 hours. Lack of decentralized village cold room forces distress sales.",
    affectedPopulation: "280 farming families",
    urgency: "High",
    expectedOutcome: "A low-cost evaporative or solar cold storage chamber (2-5 ton capacity) run by women Self Help Groups (SHGs).",
    expectedSolution: "A low-cost evaporative or solar cold storage chamber (2-5 ton capacity) run by women Self Help Groups (SHGs).",
    stageIndex: 6, // 6 = Resolved / Operational Pilot (Stage 7)
    status: "Resolved / Operational Pilot",
    authorName: "Mangra Oraon (Farmers Co-op)",
    datePosted: "28 Jul 2026",
    solutionsList: [
      {
        id: "SOL-105",
        title: "Evaporative Cooling Brick Chamber with Solar Vent",
        problemId: "PRB-105",
        problemTitle: "Post-harvest vegetable spoilage in Bishunpur",
        location: "Bishunpur, Gumla",
        submittedBy: "Gram Vikas Team & IIT (ISM) Dhanbad",
        currentStage: "Resolved / In Daily Use",
        description: "Double-walled brick room with wet sand cavity that drops temperature by 8-10°C, extending tomato shelf life from 2 days to 9 days without diesel generators.",
        expectedImpact: "Increased farmer earnings by ₹8 per kg on peak days.",
        date: "04 Aug 2026"
      }
    ]
  }
];

// In-memory runtime state synced with localStorage
let ACTIVE_CHALLENGES = JSON.parse(localStorage.getItem('samadhan_problems_list')) || INITIAL_CHALLENGES;

function saveChallengesState() {
  localStorage.setItem('samadhan_problems_list', JSON.stringify(ACTIVE_CHALLENGES));
}

function getChallengeById(id) {
  return ACTIVE_CHALLENGES.find(c => c.id === id) || null;
}

function addChallenge(problem) {
  if (problem.stageIndex === undefined) {
    problem.stageIndex = 0; // Stage 1: Problem Submitted
  }
  ACTIVE_CHALLENGES.unshift(problem);
  saveChallengesState();

  // Also record in user's raised problems in localStorage
  let userRaised = JSON.parse(localStorage.getItem('samadhan_user_raised')) || [];
  userRaised.unshift(problem.id);
  localStorage.setItem('samadhan_user_raised', JSON.stringify(userRaised));

  return problem;
}

function addProblemSolution(problemId, solutionData) {
  const problem = getChallengeById(problemId);
  if (problem) {
    if (!problem.solutionsList) problem.solutionsList = [];
    
    const newSolution = {
      id: "SOL-" + String(100 + problem.solutionsList.length + 1),
      title: solutionData.title,
      problemId: problemId,
      problemTitle: problem.title,
      location: problem.location,
      submittedBy: solutionData.team || solutionData.authorName || "Student / Innovator Team",
      currentStage: "Solution Proposed",
      description: solutionData.description,
      expectedImpact: solutionData.impact || "Community benefit and problem mitigation.",
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    problem.solutionsList.push(newSolution);
    // Advance stage to at least Solution Proposed (Stage 5 = index 4)
    if (problem.stageIndex < 4) {
      problem.stageIndex = 4;
      problem.status = "Solution Proposed";
    }
    saveChallengesState();

    // Record in user's proposed solutions
    let userSolutions = JSON.parse(localStorage.getItem('samadhan_user_solutions')) || [];
    userSolutions.unshift(newSolution);
    localStorage.setItem('samadhan_user_solutions', JSON.stringify(userSolutions));

    return newSolution;
  }
  return null;
}

function addCollaborationOffer(offerData) {
  let existingOffers = JSON.parse(localStorage.getItem('samadhan_collaborations')) || [];
  const offerId = "COL-" + String(100 + existingOffers.length + 1);
  
  const record = {
    id: offerId,
    ...offerData,
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  existingOffers.unshift(record);
  localStorage.setItem('samadhan_collaborations', JSON.stringify(existingOffers));

  // If connected to a problem, advance problem stage to "Looking for Solutions" or "In Collaboration"
  if (offerData.problemId && offerData.problemId !== 'GENERAL') {
    const prob = getChallengeById(offerData.problemId);
    if (prob && prob.stageIndex < 3) {
      prob.stageIndex = 3;
      prob.status = "In Collaboration";
      saveChallengesState();
    }
  }

  return record;
}

// Get all solutions across all problems for Solution / Project Cards
function getAllSolutions() {
  let all = [];
  ACTIVE_CHALLENGES.forEach(p => {
    if (p.solutionsList && p.solutionsList.length > 0) {
      p.solutionsList.forEach(sol => {
        all.push({
          ...sol,
          problemId: p.id,
          problemTitle: p.title,
          location: p.location,
          category: p.categoryName || p.category
        });
      });
    }
  });
  return all;
}

// Get User Contributions
function getUserContributions() {
  const userRaisedIds = JSON.parse(localStorage.getItem('samadhan_user_raised')) || [];
  const userSolutions = JSON.parse(localStorage.getItem('samadhan_user_solutions')) || [];
  const userCollabs = JSON.parse(localStorage.getItem('samadhan_collaborations')) || [];

  // Match raised problems from ACTIVE_CHALLENGES
  const userProblems = ACTIVE_CHALLENGES.filter(p => userRaisedIds.includes(p.id));

  // Add at least 1 default demo contribution if user hasn't created one yet
  return {
    problemsRaised: userProblems,
    solutionsProposed: userSolutions,
    collaborationsJoined: userCollabs
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LIFECYCLE_STAGES,
    INITIAL_CHALLENGES,
    ACTIVE_CHALLENGES,
    getChallengeById,
    addChallenge,
    addProblemSolution,
    addCollaborationOffer,
    getAllSolutions,
    getUserContributions
  };
}
