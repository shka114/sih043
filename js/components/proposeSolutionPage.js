// ==========================================================================
// SAMADHAN SETU — Propose a Solution Component
// Simple form: Solution title, Solution description, Expected impact, Team/organization
// ==========================================================================

let solutionSuccessProblemId = null;

function renderProposeSolutionPage(targetProblemId) {
  if (!targetProblemId) {
    const hash = window.location.hash;
    const match = hash.match(/[?&]id=([^&]+)/);
    if (match) {
      targetProblemId = decodeURIComponent(match[1]);
    }
  }

  const problem = targetProblemId ? getChallengeById(targetProblemId) : ACTIVE_CHALLENGES[0];

  if (solutionSuccessProblemId) {
    return `
      <div class="bg-[#FAF8F5] min-h-screen py-12">
        <div class="max-w-md mx-auto px-4">
          <div class="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD7] shadow-xs text-center space-y-4">
            
            <div class="w-12 h-12 rounded-full bg-[#FAF2ED] text-[#C25E30] flex items-center justify-center mx-auto">
              <i data-lucide="lightbulb" class="w-6 h-6"></i>
            </div>

            <h2 class="text-xl font-bold text-[#1C2421] font-heading">
              Solution Submitted!
            </h2>
            
            <p class="text-xs text-[#556987]">
              Your proposed solution has been added to the problem statement.
            </p>

            <div class="flex items-center justify-center gap-3 pt-2">
              <a href="#problem-details?id=${solutionSuccessProblemId}" class="btn-primary-setu px-5 py-2 text-xs font-semibold">
                View in Problem Details
              </a>
              <a href="#explore" class="btn-secondary-setu px-4 py-2 text-xs font-semibold">
                Explore Problems
              </a>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="bg-[#FAF8F5] min-h-screen py-8">
      <div class="max-w-2xl mx-auto px-4 sm:px-6">
        
        <!-- Header -->
        <div class="mb-6 space-y-1">
          <div class="text-xs text-[#C25E30] font-semibold">
            <a href="#home" class="hover:underline">Home</a> / 
            <a href="#explore" class="hover:underline">Explore Problems</a> / Propose a Solution
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#1C2421] font-heading">
            Propose a Solution
          </h1>
          <p class="text-sm text-[#556987]">
            Submit a technological, engineering or practical approach to resolve this community problem.
          </p>
        </div>

        <!-- Target Problem Notice -->
        ${problem ? `
          <div class="mb-5 p-3.5 bg-[#FAF2ED] border border-[#E8D0C3] rounded-xl text-xs flex items-center justify-between">
            <div>
              <span class="text-gray-500">Submitting solution for:</span>
              <div class="font-bold text-[#1C2421]">${problem.id} — ${problem.title}</div>
            </div>
            <a href="#problem-details?id=${problem.id}" class="text-[#C25E30] font-semibold hover:underline shrink-0">View Problem</a>
          </div>
        ` : ''}

        <!-- Simple Form -->
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD7] shadow-xs">
          <form onsubmit="handleProposeSolutionFormSubmit(event)" class="space-y-4">
            
            <!-- Problem Selection (if needed) -->
            <div>
              <label for="sol-problem" class="block text-xs font-bold text-[#1C2421] mb-1">
                Target Problem *
              </label>
              <select id="sol-problem" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs font-medium text-[#1C2421] focus:outline-none focus:border-[#C25E30]">
                ${ACTIVE_CHALLENGES.map(p => `
                  <option value="${p.id}" ${problem && problem.id === p.id ? 'selected' : ''}>
                    ${p.id} — ${p.title}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Solution Title -->
            <div>
              <label for="sol-title" class="block text-xs font-bold text-[#1C2421] mb-1">
                Solution Title *
              </label>
              <input type="text" 
                     id="sol-title"
                     required
                     placeholder="e.g. Gravity-fed Biochar and Laterite Sand Filter Unit"
                     class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-sm text-[#1C2421] focus:outline-none focus:border-[#C25E30]" />
            </div>

            <!-- Team / Organization -->
            <div>
              <label for="sol-team" class="block text-xs font-bold text-[#1C2421] mb-1">
                Team / Organization *
              </label>
              <input type="text" 
                     id="sol-team"
                     required
                     placeholder="e.g. Team JalSetu (NIT Jamshedpur / BIT Mesra)"
                     class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30]" />
            </div>

            <!-- Solution Description -->
            <div>
              <label for="sol-desc" class="block text-xs font-bold text-[#1C2421] mb-1">
                Solution Description (How does your approach work?) *
              </label>
              <textarea id="sol-desc" 
                        required
                        rows="4"
                        placeholder="Explain the mechanism, materials, software/hardware needed and how it will be built or deployed..."
                        class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30]"></textarea>
            </div>

            <!-- Expected Impact -->
            <div>
              <label for="sol-impact" class="block text-xs font-bold text-[#1C2421] mb-1">
                Expected Impact *
              </label>
              <textarea id="sol-impact" 
                        required
                        rows="2"
                        placeholder="What specific difference will this make for the affected people? (e.g. Cleans 500 liters/day for 90 families at low cost)"
                        class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30]"></textarea>
            </div>

            <!-- Submit Button -->
            <div class="pt-3 border-t border-gray-100 flex items-center justify-end">
              <button type="submit" class="btn-primary-setu px-6 py-2.5 text-xs font-bold shadow-sm">
                Submit Solution
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  `;
}

async function handleProposeSolutionFormSubmit(e) {
  e.preventDefault();

  const problemId = document.getElementById('sol-problem').value;
  const title = document.getElementById('sol-title').value.trim();
  const team = document.getElementById('sol-team').value.trim();
  const desc = document.getElementById('sol-desc').value.trim();
  const impact = document.getElementById('sol-impact').value.trim();
  const submitBtn = e.target.querySelector('button[type="submit"]');

  if (!problemId || !title || !team || !desc || !impact) {
    showToast("Please fill in all required fields marked with *.", "error");
    return;
  }

  const authUser = await getCurrentAuthUser();
  if (!authUser) {
    showToast("Please sign in or register to submit a solution to the public database.", "error");
    window.location.hash = "#login";
    renderApp();
    return;
  }

  const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="w-4 h-4 animate-spin inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Submitting Solution...</span>
    `;
  }

  try {
    let dbSolution = null;
    // If the problemId is a valid UUID, insert to Supabase Solutions table
    if (problemId && problemId.length >= 30) {
      dbSolution = await insertSolutionToDB({
        problemId: problemId,
        title: title,
        team: team,
        description: desc,
        impact: impact
      });
    }

    addProblemSolution(problemId, {
      id: dbSolution ? dbSolution.solution_id : undefined,
      title: title,
      team: team,
      description: desc,
      impact: impact
    });

    solutionSuccessProblemId = problemId;
    showToast("Solution submitted and recorded successfully!", "success");
    renderApp();
  } catch (err) {
    console.error("Solution submission error:", err);
    showToast(err.message || "Failed to submit solution.", "error");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      lucide.createIcons();
    }
  }
}
