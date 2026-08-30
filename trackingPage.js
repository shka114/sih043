// ==========================================================================
// SAMADHAN SETU — Solution Tracking Component (Phase 3)
// Visual 7-step Problem-to-Impact progression tracker
// ==========================================================================

let activeTrackingFilter = "all";

function renderTrackingPage() {
  const problems = ACTIVE_CHALLENGES.filter(p => {
    if (activeTrackingFilter === "all") return true;
    if (activeTrackingFilter === "looking" && (p.stageIndex === 3 || p.stageIndex === 2)) return true;
    if (activeTrackingFilter === "proposed" && p.stageIndex === 4) return true;
    if (activeTrackingFilter === "implementation" && p.stageIndex === 5) return true;
    if (activeTrackingFilter === "resolved" && p.stageIndex === 6) return true;
    return true;
  });

  return `
    <div class="bg-[#FAF8F5] min-h-screen py-8">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        <!-- Header -->
        <div class="space-y-1">
          <div class="text-xs text-[#C25E30] font-semibold">
            <a href="#home" class="hover:underline">Home</a> / Solution Tracking
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#1C2421] font-heading">
            Solution Tracking & Lifecycle
          </h1>
          <p class="text-sm text-[#556987]">
            Track how community problems progress from initial submission to field implementation and resolution.
          </p>
        </div>

        <!-- 7-Stage Reference Legend (Simple & Informative) -->
        <div class="bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-xs">
          <div class="text-xs font-bold text-[#1C2421] mb-2 font-mono uppercase">
            The 7-Stage Progression Flow:
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 text-center text-[11px]">
            ${LIFECYCLE_STAGES.map((st, idx) => `
              <div class="p-2 bg-[#FAF8F5] rounded-lg border border-[#EAE3D9] flex flex-col items-center justify-between">
                <span class="w-5 h-5 rounded-full bg-[#E5DFD7] text-[#1C2421] font-bold text-[10px] flex items-center justify-center mb-1">
                  ${idx + 1}
                </span>
                <span class="font-semibold text-[#1C2421] leading-tight">${st.label}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="bg-white p-3 rounded-xl border border-[#E5DFD7] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="text-gray-500 font-medium">Filter by Stage:</span>
            <button onclick="setTrackingFilter('all')" class="px-3 py-1 rounded-lg font-semibold transition-colors ${activeTrackingFilter === 'all' ? 'bg-[#C25E30] text-white' : 'bg-[#FAF8F5] text-[#1C2421] hover:bg-gray-100'}">
              All (${ACTIVE_CHALLENGES.length})
            </button>
            <button onclick="setTrackingFilter('looking')" class="px-3 py-1 rounded-lg font-semibold transition-colors ${activeTrackingFilter === 'looking' ? 'bg-[#C25E30] text-white' : 'bg-[#FAF8F5] text-[#1C2421] hover:bg-gray-100'}">
              Looking for Solutions
            </button>
            <button onclick="setTrackingFilter('proposed')" class="px-3 py-1 rounded-lg font-semibold transition-colors ${activeTrackingFilter === 'proposed' ? 'bg-[#C25E30] text-white' : 'bg-[#FAF8F5] text-[#1C2421] hover:bg-gray-100'}">
              Solution Proposed
            </button>
            <button onclick="setTrackingFilter('implementation')" class="px-3 py-1 rounded-lg font-semibold transition-colors ${activeTrackingFilter === 'implementation' ? 'bg-[#C25E30] text-white' : 'bg-[#FAF8F5] text-[#1C2421] hover:bg-gray-100'}">
              In Implementation
            </button>
            <button onclick="setTrackingFilter('resolved')" class="px-3 py-1 rounded-lg font-semibold transition-colors ${activeTrackingFilter === 'resolved' ? 'bg-[#C25E30] text-white' : 'bg-[#FAF8F5] text-[#1C2421] hover:bg-gray-100'}">
              Resolved
            </button>
          </div>
          <span class="text-gray-500 font-medium">${problems.length} problems shown</span>
        </div>

        <!-- Problems Timeline Cards List -->
        <div class="space-y-4">
          ${problems.map(p => renderTrackingProblemCard(p)).join('')}
        </div>

      </div>
    </div>
  `;
}

function renderTrackingProblemCard(p) {
  const currentStep = p.stageIndex !== undefined ? p.stageIndex : 0;
  const currentStageObj = LIFECYCLE_STAGES[currentStep] || LIFECYCLE_STAGES[0];
  const solutions = p.solutionsList || [];

  return `
    <div class="bg-white p-5 rounded-2xl border border-[#E5DFD7] shadow-xs space-y-4 hover:border-[#C25E30] transition-colors">
      
      <!-- Top Info -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div class="flex items-center gap-2 text-xs mb-1">
            <span class="font-mono font-bold text-[#C25E30] bg-[#FAF2ED] px-2 py-0.5 rounded border border-[#E8D0C3]">
              ${p.id}
            </span>
            <span class="font-semibold text-[#24543D] bg-[#EBF3EE] px-2 py-0.5 rounded">
              ${p.categoryName || p.category}
            </span>
            <span class="text-gray-500">• ${p.location}</span>
          </div>
          <h3 class="text-base sm:text-lg font-bold text-[#1C2421] font-heading">
            ${p.title}
          </h3>
        </div>

        <div class="shrink-0 text-left sm:text-right">
          <span class="inline-block text-xs font-bold px-3 py-1 rounded-full ${
            currentStep >= 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
          }">
            Current Stage: ${currentStageObj.label}
          </span>
        </div>
      </div>

      <!-- 7-Stage Horizontal Step Indicator -->
      <div class="py-2">
        <div class="grid grid-cols-2 sm:grid-cols-7 gap-1">
          ${LIFECYCLE_STAGES.map((st, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            return `
              <div class="p-2 rounded-lg text-center text-xs flex flex-col justify-between ${
                isCurrent 
                  ? 'bg-[#FAF2ED] border-2 border-[#C25E30] text-[#C25E30] font-bold shadow-2xs' 
                  : isCompleted 
                    ? 'bg-[#EBF3EE] border border-[#C4DCCE] text-[#24543D]' 
                    : 'bg-[#FAF8F5] border border-[#EAE3D9] text-gray-400'
              }">
                <div class="flex items-center justify-center gap-1 mb-0.5">
                  <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    isCurrent ? 'bg-[#C25E30] text-white' : isCompleted ? 'bg-[#24543D] text-white' : 'bg-gray-200 text-gray-600'
                  }">
                    ${isCompleted ? '✓' : idx + 1}
                  </span>
                </div>
                <span class="text-[10px] leading-tight block">${st.label}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Solution Summary Box if Available -->
      ${solutions.length > 0 ? `
        <div class="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] text-xs space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-[#1C2421]">Active Solution: "${solutions[0].title}"</span>
            <span class="text-[10px] font-semibold text-[#24543D] bg-emerald-50 px-2 py-0.5 rounded">${solutions[0].currentStage || 'In Progress'}</span>
          </div>
          <p class="text-gray-600">${solutions[0].description || solutions[0].summary}</p>
          <div class="text-gray-500 pt-1">
            Developed by: <strong class="text-gray-800">${solutions[0].submittedBy}</strong>
          </div>
        </div>
      ` : `
        <div class="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] text-xs text-gray-500 flex items-center justify-between">
          <span>No solution proposed yet for this challenge.</span>
          <a href="#propose-solution?id=${p.id}" class="text-xs font-semibold text-[#C25E30] hover:underline">+ Propose Solution</a>
        </div>
      `}

      <!-- Bottom Card Actions -->
      <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
        <span class="text-gray-500">Affects: <strong>${p.affectedPopulation || 'Local Community'}</strong></span>
        
        <div class="flex items-center gap-2">
          <a href="#collaborate?id=${p.id}" class="btn-secondary-setu px-3 py-1.5 text-xs font-semibold">
            I Want to Contribute
          </a>
          <a href="#problem-details?id=${p.id}" class="btn-primary-setu px-3 py-1.5 text-xs font-semibold">
            View Problem Details
          </a>
        </div>
      </div>

    </div>
  `;
}

function setTrackingFilter(filter) {
  activeTrackingFilter = filter;
  renderApp();
}
