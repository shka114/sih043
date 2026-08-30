// ==========================================================================
// SAMADHAN SETU — My Contributions Component (Phase 3)
// Clean view of problems raised, solutions proposed, and collaborations joined
// ==========================================================================

let activeContributionsTab = "all";

function renderMyContributionsPage() {
  const contribs = getUserContributions();

  // Baseline demo counts if fresh visitor
  const raisedCount = contribs.problemsRaised.length > 0 ? contribs.problemsRaised.length : 1;
  const solutionsCount = contribs.solutionsProposed.length > 0 ? contribs.solutionsProposed.length : 1;
  const collabCount = contribs.collaborationsJoined.length > 0 ? contribs.collaborationsJoined.length : 2;

  return `
    <div class="bg-[#FAF8F5] min-h-screen py-8">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        <!-- Header -->
        <div class="space-y-1">
          <div class="text-xs text-[#C25E30] font-semibold">
            <a href="#home" class="hover:underline">Home</a> / My Contributions
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#1C2421] font-heading">
            My Contributions
          </h1>
          <p class="text-sm text-[#556987]">
            Overview of problems you have reported, solutions you have proposed, and collaborative initiatives you joined.
          </p>
        </div>

        <!-- 3 Simple Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div class="bg-white p-5 rounded-xl border border-[#E5DFD7] shadow-xs flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-[#64748B] uppercase font-mono">Problems Raised</span>
              <div class="text-3xl font-bold font-heading text-[#C25E30] mt-1">${raisedCount}</div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#FAF2ED] text-[#C25E30] flex items-center justify-center">
              <i data-lucide="alert-circle" class="w-5 h-5"></i>
            </div>
          </div>

          <div class="bg-white p-5 rounded-xl border border-[#E5DFD7] shadow-xs flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-[#64748B] uppercase font-mono">Solutions Proposed</span>
              <div class="text-3xl font-bold font-heading text-[#D97706] mt-1">${solutionsCount}</div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
              <i data-lucide="lightbulb" class="w-5 h-5"></i>
            </div>
          </div>

          <div class="bg-white p-5 rounded-xl border border-[#E5DFD7] shadow-xs flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-[#64748B] uppercase font-mono">Collaborations Joined</span>
              <div class="text-3xl font-bold font-heading text-[#24543D] mt-1">${collabCount}</div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#EBF3EE] text-[#24543D] flex items-center justify-center">
              <i data-lucide="handshake" class="w-5 h-5"></i>
            </div>
          </div>

        </div>

        <!-- Filter Tabs -->
        <div class="bg-white p-2 rounded-xl border border-[#E5DFD7] shadow-xs flex flex-wrap gap-2 text-xs">
          <button onclick="setContribTab('all')" class="px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${activeContributionsTab === 'all' ? 'bg-[#C25E30] text-white' : 'text-gray-600 hover:bg-gray-100'}">
            All Activity
          </button>
          <button onclick="setContribTab('raised')" class="px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${activeContributionsTab === 'raised' ? 'bg-[#C25E30] text-white' : 'text-gray-600 hover:bg-gray-100'}">
            Problems Raised (${raisedCount})
          </button>
          <button onclick="setContribTab('solutions')" class="px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${activeContributionsTab === 'solutions' ? 'bg-[#C25E30] text-white' : 'text-gray-600 hover:bg-gray-100'}">
            Solutions Proposed (${solutionsCount})
          </button>
          <button onclick="setContribTab('collabs')" class="px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${activeContributionsTab === 'collabs' ? 'bg-[#C25E30] text-white' : 'text-gray-600 hover:bg-gray-100'}">
            Collaborations (${collabCount})
          </button>
        </div>

        <!-- Contributions List Area -->
        <div class="space-y-4">
          
          <!-- 1. Raised Problems Section -->
          ${(activeContributionsTab === 'all' || activeContributionsTab === 'raised') ? `
            <div class="space-y-3">
              <h3 class="text-xs font-bold uppercase tracking-wider text-[#C25E30] font-mono">
                Problems You Raised
              </h3>

              ${contribs.problemsRaised.length > 0 ? contribs.problemsRaised.map(p => `
                <div class="bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-mono font-bold text-[#C25E30]">${p.id}</span>
                      <span class="font-semibold text-[#1C2421] text-sm">${p.title}</span>
                    </div>
                    <p class="text-gray-500">${p.location} • Status: <strong class="text-emerald-700">${p.status || 'Open for Solutions'}</strong></p>
                  </div>
                  <a href="#problem-details?id=${p.id}" class="btn-secondary-setu px-3 py-1.5 text-xs font-semibold shrink-0 text-center">
                    View Problem Details
                  </a>
                </div>
              `).join('') : `
                <!-- Demo fallback card if user hasn't submitted yet -->
                <div class="bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-mono font-bold text-[#C25E30]">PRB-101</span>
                      <span class="font-semibold text-[#1C2421] text-sm">Drinking water availability and high fluoride in Chauparan</span>
                    </div>
                    <p class="text-gray-500">Chauparan Block, Hazaribagh • Status: <strong class="text-emerald-700">Implementation / Pilot</strong></p>
                  </div>
                  <a href="#problem-details?id=PRB-101" class="btn-secondary-setu px-3 py-1.5 text-xs font-semibold shrink-0 text-center">
                    View Problem Details
                  </a>
                </div>
              `}
            </div>
          ` : ''}

          <!-- 2. Solutions Proposed Section -->
          ${(activeContributionsTab === 'all' || activeContributionsTab === 'solutions') ? `
            <div class="space-y-3 pt-2">
              <h3 class="text-xs font-bold uppercase tracking-wider text-[#D97706] font-mono">
                Solutions You Proposed
              </h3>

              ${contribs.solutionsProposed.length > 0 ? contribs.solutionsProposed.map(sol => `
                <div class="bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-mono font-bold text-[#D97706]">${sol.id}</span>
                      <span class="font-semibold text-[#1C2421] text-sm">"${sol.title}"</span>
                    </div>
                    <p class="text-gray-600">${sol.description}</p>
                    <p class="text-gray-400 mt-1">For Problem ID: <strong>${sol.problemId}</strong></p>
                  </div>
                  <a href="#problem-details?id=${sol.problemId}" class="btn-secondary-setu px-3 py-1.5 text-xs font-semibold shrink-0 text-center">
                    View Solution on Problem
                  </a>
                </div>
              `).join('') : `
                <!-- Demo fallback card if user hasn't submitted yet -->
                <div class="bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-mono font-bold text-[#D97706]">SOL-101</span>
                      <span class="font-semibold text-[#1C2421] text-sm">"Community Laterite Clay & Biochar Gravity Filter"</span>
                    </div>
                    <p class="text-gray-600">Zero-power gravity water filtration unit reducing fluoride below safe limits.</p>
                    <p class="text-gray-400 mt-1">For Problem: <strong>PRB-101 (Chauparan Drinking Water)</strong></p>
                  </div>
                  <a href="#problem-details?id=PRB-101" class="btn-secondary-setu px-3 py-1.5 text-xs font-semibold shrink-0 text-center">
                    View Solution on Problem
                  </a>
                </div>
              `}
            </div>
          ` : ''}

          <!-- 3. Collaborations Joined Section -->
          ${(activeContributionsTab === 'all' || activeContributionsTab === 'collabs') ? `
            <div class="space-y-3 pt-2">
              <h3 class="text-xs font-bold uppercase tracking-wider text-[#24543D] font-mono">
                Collaborations You Joined
              </h3>

              ${contribs.collaborationsJoined.length > 0 ? contribs.collaborationsJoined.map(col => `
                <div class="bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-mono font-bold text-[#24543D]">${col.id}</span>
                      <span class="font-semibold text-[#1C2421] text-sm">${col.targetTitle}</span>
                    </div>
                    <p class="text-gray-600">Ways Helping: <strong class="text-[#24543D]">${col.helpTypes ? col.helpTypes.join(', ') : 'Support'}</strong></p>
                    <p class="text-gray-400 mt-0.5">Note: "${col.notes || col.message || 'Ready to support'}"</p>
                  </div>
                  <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded shrink-0 self-start sm:self-center">
                    Active Participant
                  </span>
                </div>
              `).join('') : `
                <!-- Demo fallback cards -->
                <div class="space-y-2.5">
                  <div class="bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <span class="font-mono font-bold text-[#24543D]">COL-101</span>
                        <span class="font-semibold text-[#1C2421] text-sm">PRB-102 — Digital Learning in Mahuadanr School</span>
                      </div>
                      <p class="text-gray-600">Ways Helping: <strong class="text-[#24543D]">Technology, Research</strong></p>
                      <p class="text-gray-400 mt-0.5">Note: "Translating Kurukh elementary stories into offline audio modules."</p>
                    </div>
                    <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded shrink-0 self-start sm:self-center">
                      Active Participant
                    </span>
                  </div>

                  <div class="bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <span class="font-mono font-bold text-[#24543D]">COL-102</span>
                        <span class="font-semibold text-[#1C2421] text-sm">PRB-103 — Connecting Dokra Artisans with Direct Buyers</span>
                      </div>
                      <p class="text-gray-600">Ways Helping: <strong class="text-[#24543D]">Field Support, Mentorship</strong></p>
                      <p class="text-gray-400 mt-0.5">Note: "Assisting Khunti artisan cluster with safe packaging boxes."</p>
                    </div>
                    <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded shrink-0 self-start sm:self-center">
                      Active Participant
                    </span>
                  </div>
                </div>
              `}
            </div>
          ` : ''}

        </div>

      </div>
    </div>
  `;
}

function setContribTab(tab) {
  activeContributionsTab = tab;
  renderApp();
}
