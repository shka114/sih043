// ==========================================================================
// SAMADHAN SETU — Problem Details Component (Phase 1, 2, 3)
// Clean, readable problem view with 7-step lifecycle timeline,
// Solution/Project Cards, and "I Want to Contribute" & "Propose a Solution"
// ==========================================================================

function renderProblemDetailsPage(problemId) {
  if (!problemId) {
    const hash = window.location.hash;
    const match = hash.match(/[?&]id=([^&]+)/);
    if (match) {
      problemId = decodeURIComponent(match[1]);
    }
  }

  const problem = (problemId && getChallengeById(problemId)) || ACTIVE_CHALLENGES[0];

  if (!problem) {
    return `
      <div class="bg-[#FAF8F5] min-h-screen py-12 text-center">
        <h2 class="text-xl font-bold text-[#1C2421]">Problem Not Found</h2>
        <p class="text-xs text-[#556987] mt-1 mb-4">The problem you are looking for does not exist.</p>
        <a href="#explore" class="btn-primary-setu px-4 py-2 text-xs font-semibold">Back to Explore Problems</a>
      </div>
    `;
  }

  const currentStep = problem.stageIndex !== undefined ? problem.stageIndex : 0;
  const currentStageObj = LIFECYCLE_STAGES[currentStep] || LIFECYCLE_STAGES[0];
  const solutions = problem.solutionsList || [];

  return `
    <div class="bg-[#FAF8F5] min-h-screen py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        <!-- Top Back Link -->
        <div class="flex items-center justify-between text-xs">
          <a href="#explore" class="text-[#24543D] hover:text-[#C25E30] font-semibold flex items-center gap-1">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>Back to Explore Problems</span>
          </a>
          <a href="#tracking" class="text-gray-500 hover:text-[#C25E30] flex items-center gap-1 font-mono">
            <span>Track in Lifecycle</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>

        <!-- Problem Main Card -->
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD7] shadow-xs space-y-6">
          
          <!-- Header Area -->
          <div class="space-y-2 pb-4 border-b border-gray-100">
            <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div class="flex items-center gap-2">
                <span class="font-mono font-bold text-[#C25E30] bg-[#FAF2ED] px-2 py-0.5 rounded border border-[#E8D0C3]">
                  ${problem.id}
                </span>
                <span class="font-semibold text-[#24543D] bg-[#EBF3EE] px-2.5 py-0.5 rounded">
                  ${problem.categoryName || problem.category}
                </span>
                <span class="font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  Urgency: ${problem.urgency}
                </span>
              </div>
              
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${
                currentStep >= 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
              }">
                Stage: ${currentStageObj.label}
              </span>
            </div>

            <h1 class="text-xl sm:text-2xl font-bold text-[#1C2421] font-heading leading-snug">
              ${problem.title}
            </h1>

            <div class="text-xs text-[#64748B] flex flex-wrap items-center gap-3 pt-1">
              <span><strong>Location:</strong> ${problem.location}</span>
              <span>•</span>
              <span><strong>Submitted by:</strong> ${problem.authorName || 'Community Citizen'}</span>
              <span>•</span>
              <span>${problem.datePosted}</span>
            </div>
          </div>

          <!-- 7-Stage Visual Lifecycle Progress Bar -->
          <div class="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-mono font-bold text-[#1C2421] uppercase">Progress Timeline:</span>
              <span class="text-xs text-[#C25E30] font-bold">Step ${currentStep + 1} of 7: ${currentStageObj.label}</span>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-7 gap-1 pt-1">
              ${LIFECYCLE_STAGES.map((st, idx) => {
                const isCompleted = idx < currentStep;
                const isCurrent = idx === currentStep;
                return `
                  <div class="p-1.5 rounded text-center text-[10px] ${
                    isCurrent 
                      ? 'bg-[#FAF2ED] border-2 border-[#C25E30] text-[#C25E30] font-bold' 
                      : isCompleted 
                        ? 'bg-[#EBF3EE] border border-[#C4DCCE] text-[#24543D]' 
                        : 'bg-white border border-gray-200 text-gray-400'
                  }">
                    <span class="block font-mono font-bold">${isCompleted ? '✓' : idx + 1}</span>
                    <span class="truncate block leading-tight mt-0.5">${st.label}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Quick Details Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <span class="text-gray-500 font-mono block mb-0.5 uppercase">People Affected</span>
              <strong class="text-[#1C2421] text-sm">${problem.affectedPopulation || 'Not specified'}</strong>
            </div>

            <div class="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <span class="text-gray-500 font-mono block mb-0.5 uppercase">Current Status</span>
              <strong class="text-[#24543D] text-sm">${problem.status || 'Open for Solutions'}</strong>
            </div>
          </div>

          <!-- Current Situation -->
          <div class="space-y-1.5">
            <h2 class="text-xs font-bold uppercase tracking-wider text-[#C25E30] font-mono">
              Current Situation / Background
            </h2>
            <div class="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] text-xs sm:text-sm text-[#334155] leading-relaxed whitespace-pre-line">
              ${problem.currentSituation || problem.fullDescription || problem.shortDescription}
            </div>
          </div>

          <!-- Expected Outcome -->
          <div class="space-y-1.5">
            <h2 class="text-xs font-bold uppercase tracking-wider text-[#24543D] font-mono">
              Expected Outcome / What is Needed
            </h2>
            <div class="p-4 bg-[#EBF3EE] rounded-xl border border-[#C4DCCE] text-xs sm:text-sm text-[#173828] leading-relaxed">
              ${problem.expectedOutcome || problem.expectedSolution || "Open for technical and community-backed solutions."}
            </div>
          </div>

          <!-- Two Main Action Buttons -->
          <div class="p-4 sm:p-5 bg-[#FAF2ED] rounded-xl border border-[#E8D0C3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 class="text-xs sm:text-sm font-bold text-[#1C2421]">Can you help with this problem?</h3>
              <p class="text-[11px] text-[#64748B]">Choose whether to propose a solution or offer skills/resources to collaborate.</p>
            </div>
            
            <div class="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              <a href="#collaborate?id=${problem.id}" class="btn-secondary-setu w-full sm:w-auto px-4 py-2 text-xs font-semibold text-center">
                I Want to Contribute
              </a>
              <a href="#propose-solution?id=${problem.id}" class="btn-primary-setu w-full sm:w-auto px-4 py-2 text-xs font-semibold text-center">
                Propose a Solution
              </a>
            </div>
          </div>

          <!-- Solution / Project Cards Section (Phase 3 Requirement) -->
          <div class="pt-4 border-t border-gray-100 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-[#1C2421] font-heading">
                Proposed Solutions & Projects (${solutions.length})
              </h3>
              <a href="#propose-solution?id=${problem.id}" class="text-xs text-[#C25E30] font-semibold hover:underline">
                + Propose Solution
              </a>
            </div>

            ${solutions.length > 0 ? `
              <div class="space-y-3">
                ${solutions.map(sol => `
                  <!-- Simple Solution Card Connected to Problem -->
                  <div class="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-2.5 text-xs">
                    <div class="flex items-center justify-between">
                      <h4 class="font-bold text-sm text-[#1C2421]">"${sol.title}"</h4>
                      <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Stage: ${sol.currentStage || 'Pilot / Implementation'}
                      </span>
                    </div>

                    <div class="text-gray-500 text-[11px]">
                      <strong>Problem Addressed:</strong> ${problem.title} (${problem.location})
                    </div>

                    <p class="text-[#475569] leading-relaxed">${sol.description || sol.summary}</p>
                    
                    ${sol.expectedImpact ? `
                      <div class="text-[#24543D] font-medium bg-white p-2 rounded border border-gray-100">
                        <strong>Expected Impact:</strong> ${sol.expectedImpact}
                      </div>
                    ` : ''}

                    <div class="pt-2 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2 text-gray-500">
                      <span>Team / Contributor: <strong class="text-gray-800">${sol.submittedBy}</strong></span>
                      <a href="#collaborate?id=${problem.id}" class="btn-secondary-setu px-3 py-1 text-[11px] font-semibold">
                        Join This Team
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] text-center text-xs text-gray-500">
                No solutions proposed yet. Click "Propose a Solution" above to share your approach.
              </div>
            `}
          </div>

        </div>

      </div>
    </div>
  `;
}
