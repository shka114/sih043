// ==========================================================================
// SAMADHAN SETU — Raise a Problem Component with AI Problem Analysis
// Straightforward, single-page form with simple Problem ID generator
// ==========================================================================

let submissionSuccessProblem = null;
let currentAIAnalysisResult = null;

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderRaiseProblemPage() {
  if (submissionSuccessProblem) {
    return `
      <div class="bg-[#FAF8F5] min-h-screen py-12">
        <div class="max-w-xl mx-auto px-4">
          <div class="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD7] shadow-xs text-center space-y-5">
            
            <div class="w-12 h-12 rounded-full bg-[#EBF3EE] text-[#24543D] flex items-center justify-center mx-auto">
              <i data-lucide="check" class="w-6 h-6"></i>
            </div>

            <div class="space-y-1">
              <h2 class="text-xl font-bold text-[#1C2421] font-heading">
                Problem submitted successfully!
              </h2>
              <p class="text-xs text-[#556987]">
                Your problem has been registered and is now listed for innovators to review.
              </p>
            </div>

            <!-- Simple Generated Problem ID box -->
            <div class="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-1">
              <div class="text-xs text-gray-500 font-mono">YOUR PROBLEM ID:</div>
              <div class="text-xl font-bold font-mono text-[#C25E30]">${submissionSuccessProblem.id}</div>
              <div class="text-xs font-semibold text-[#1C2421] pt-1">"${submissionSuccessProblem.title}"</div>
              <div class="text-xs text-[#64748B]">Location: ${submissionSuccessProblem.location}</div>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a href="#problem-details?id=${submissionSuccessProblem.id}" class="btn-primary-setu w-full sm:w-auto px-5 py-2 text-xs font-semibold">
                View Problem Details
              </a>
              <a href="#explore" class="btn-secondary-setu w-full sm:w-auto px-5 py-2 text-xs font-semibold">
                Go to Explore Problems
              </a>
              <button onclick="resetSubmissionState()" class="text-xs text-gray-500 hover:text-gray-800 py-1 cursor-pointer">
                Raise Another Problem
              </button>
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
            <a href="#home" class="hover:underline">Home</a> / Raise a Problem
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#1C2421] font-heading">
            Raise a Problem
          </h1>
          <p class="text-sm text-[#556987]">
            Share a real community issue so students, researchers and NGOs can collaborate to solve it.
          </p>
        </div>

        <!-- Straightforward Form -->
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD7] shadow-xs">
          <form onsubmit="handleProblemFormSubmit(event)" class="space-y-4">
            
            <!-- Problem Title -->
            <div>
              <label for="p-title" class="block text-xs font-bold text-[#1C2421] mb-1">
                Problem Title *
              </label>
              <input type="text" 
                     id="p-title"
                     required
                     placeholder="e.g. Broken solar water pump in Bishunpur village"
                     class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-sm text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white" />
            </div>

            <!-- Description -->
            <div>
              <label for="p-desc" class="block text-xs font-bold text-[#1C2421] mb-1">
                Description (What is happening?) *
              </label>
              <textarea id="p-desc" 
                        required
                        rows="3"
                        placeholder="Explain the background. Why is it a problem? How does it affect daily life?"
                        class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white"></textarea>
            </div>

            <!-- Prominent AI Problem Analysis Action Banner -->
            <div class="p-3.5 bg-gradient-to-r from-[#FAF2ED] via-[#FFF8F3] to-[#FAF2ED] border-2 border-dashed border-[#E8D0C3] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C25E30] to-[#D97706] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span class="text-base">🤖</span>
                </div>
                <div>
                  <div class="text-xs font-bold text-[#1C2421] flex items-center gap-1.5">
                    <span>AI Problem Assistant</span>
                    <span class="text-[9px] font-bold text-[#C25E30] bg-[#FAF2ED] px-1.5 py-0.5 rounded border border-[#E8D0C3]">GEMINI</span>
                  </div>
                  <div class="text-[11px] text-[#64748B]">Auto-detect category, severity & practical solutions</div>
                </div>
              </div>

              <button type="button" 
                      id="btn-ai-analyze"
                      onclick="handleAnalyzeWithAI()" 
                      class="btn-primary-setu w-full sm:w-auto px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 shrink-0 cursor-pointer">
                <span>🤖</span>
                <span>Analyze with AI</span>
              </button>
            </div>

            <!-- AI Analysis Dynamic Results Container -->
            <div id="ai-analysis-container" class="transition-all duration-300"></div>

            <!-- Location & Category (2 Cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="p-location" class="block text-xs font-bold text-[#1C2421] mb-1">
                  Location (Village, Block, District) *
                </label>
                <input type="text" 
                       id="p-location"
                       required
                       placeholder="e.g. Mahuadanr, Latehar, Jharkhand"
                       class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white" />
              </div>

              <div>
                <label for="p-category" class="block text-xs font-bold text-[#1C2421] mb-1">
                  Category *
                </label>
                <select id="p-category" required class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs font-medium text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white">
                  <option value="" disabled selected>Select category...</option>
                  <option value="healthcare">Healthcare & Water</option>
                  <option value="education">Education</option>
                  <option value="employment">Livelihoods & Craft</option>
                  <option value="environment">Environment & Sanitation</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="public-services">Public Services</option>
                </select>
              </div>
            </div>

            <!-- People Affected & Urgency (2 Cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="p-affected" class="block text-xs font-bold text-[#1C2421] mb-1">
                  People Affected *
                </label>
                <input type="text" 
                       id="p-affected"
                       required
                       placeholder="e.g. Around 300 villagers / 120 school kids"
                       class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white" />
              </div>

              <div>
                <label for="p-urgency" class="block text-xs font-bold text-[#1C2421] mb-1">
                  Urgency *
                </label>
                <select id="p-urgency" required class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs font-medium text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white">
                  <option value="High" selected>High (Major daily difficulty)</option>
                  <option value="Critical">Critical (Immediate health/safety issue)</option>
                  <option value="Medium">Medium (Moderate improvement needed)</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <!-- What is needed / Expected Solution -->
            <div>
              <label for="p-expected" class="block text-xs font-bold text-[#1C2421] mb-1">
                What is needed / Expected Solution *
              </label>
              <textarea id="p-expected" 
                        required
                        rows="2"
                        placeholder="What kind of solution or tool could solve this? (e.g. low cost water filter, offline learning tablet, local composting pit...)"
                        class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white"></textarea>
            </div>

            <!-- Submitter Name (Optional) -->
            <div>
              <label for="p-author" class="block text-xs font-bold text-[#64748B] mb-1">
                Your Name / Role (Optional)
              </label>
              <input type="text" 
                     id="p-author"
                     placeholder="e.g. Ramesh Mahto (Gram Panchayat Member)"
                     class="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs text-[#1C2421]" />
            </div>

            <!-- Submit Button -->
            <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span class="text-xs text-gray-500">Will be saved to local catalog</span>
              <button type="submit" class="btn-primary-setu px-6 py-2.5 text-xs font-bold shadow-sm cursor-pointer">
                Submit Problem
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  `;
}

// Handler for "🤖 Analyze with AI"
async function handleAnalyzeWithAI() {
  const titleEl = document.getElementById('p-title');
  const descEl = document.getElementById('p-desc');
  const locEl = document.getElementById('p-location');
  const btnEl = document.getElementById('btn-ai-analyze');
  const containerEl = document.getElementById('ai-analysis-container');

  const title = titleEl ? titleEl.value.trim() : '';
  const desc = descEl ? descEl.value.trim() : '';
  const loc = locEl ? locEl.value.trim() : '';

  // 1. Validate required inputs
  if (!title) {
    if (typeof showToast === 'function') {
      showToast("Please enter a Problem Title before analyzing.", "error");
    }
    if (titleEl) titleEl.focus();
    return;
  }

  if (!desc) {
    if (typeof showToast === 'function') {
      showToast("Please enter a Problem Description before analyzing.", "error");
    }
    if (descEl) descEl.focus();
    return;
  }

  // 2. Set Loading State
  if (btnEl) {
    btnEl.disabled = true;
    btnEl.classList.add('opacity-70', 'cursor-not-allowed');
    btnEl.innerHTML = `
      <svg class="w-3.5 h-3.5 animate-spin text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Analyzing problem...</span>
    `;
  }

  if (containerEl) {
    containerEl.innerHTML = `
      <div class="p-4 bg-[#FAF2ED]/70 border border-[#E8D0C3] rounded-xl flex items-center gap-3 text-xs text-[#C25E30] animate-pulse">
        <svg class="w-5 h-5 animate-spin text-[#C25E30] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <div>
          <div class="font-bold text-[#1C2421] text-xs">Analyzing problem with AI...</div>
          <div class="text-[11px] text-[#64748B] mt-0.5">Evaluating category, severity, keywords, and practical solutions.</div>
        </div>
      </div>
    `;
  }

  // 3. Call AI API
  try {
    const analysis = await analyzeProblemWithAI({ title, description: desc, location: loc });
    currentAIAnalysisResult = analysis;
    renderAIAnalysisCard(analysis);
    if (typeof showToast === 'function') {
      showToast("AI Problem Analysis generated successfully!", "success");
    }
  } catch (err) {
    renderAIAnalysisError(err.message || "Failed to analyze problem.");
    if (typeof showToast === 'function') {
      showToast(err.message || "AI Analysis failed.", "error");
    }
  } finally {
    // Reset button state
    if (btnEl) {
      btnEl.disabled = false;
      btnEl.classList.remove('opacity-70', 'cursor-not-allowed');
      btnEl.innerHTML = `
        <span>🤖</span>
        <span>Re-Analyze with AI</span>
      `;
    }
  }
}

// Display AI Analysis Results Card
function renderAIAnalysisCard(data) {
  const containerEl = document.getElementById('ai-analysis-container');
  if (!containerEl) return;

  const severity = data.severity || "Medium";
  let severityBadgeClass = "bg-amber-50 text-amber-800 border-amber-200";
  if (severity === "Critical") {
    severityBadgeClass = "bg-red-100 text-red-800 border-red-300";
  } else if (severity === "High") {
    severityBadgeClass = "bg-orange-100 text-orange-800 border-orange-200";
  } else if (severity === "Low") {
    severityBadgeClass = "bg-emerald-50 text-emerald-800 border-emerald-200";
  }

  const keywords = Array.isArray(data.keywords) ? data.keywords : [];
  const solutions = Array.isArray(data.solutions) ? data.solutions : [];

  containerEl.innerHTML = `
    <div class="p-4 sm:p-5 bg-[#FAF2ED]/70 border border-[#E8D0C3] rounded-xl space-y-3.5 shadow-2xs">
      
      <!-- Card Header -->
      <div class="flex items-center justify-between border-b border-[#E8D0C3] pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-base">🤖</span>
          <h3 class="text-xs font-bold text-[#1C2421] font-heading tracking-wide">
            AI Problem Analysis
          </h3>
          <span class="text-[10px] font-semibold text-[#C25E30] bg-white px-2 py-0.5 rounded border border-[#E8D0C3]">
            Gemini Powered
          </span>
        </div>
        <button type="button" 
                onclick="clearAIAnalysis()" 
                class="text-[#64748B] hover:text-[#1C2421] text-xs p-1 rounded hover:bg-white/50 transition-colors cursor-pointer" 
                title="Dismiss analysis">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <!-- Category & Severity -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div class="bg-white p-3 rounded-lg border border-[#E5DFD7] space-y-0.5">
          <span class="text-[10px] font-bold uppercase text-[#64748B]">Category</span>
          <div class="font-bold text-[#1C2421] text-xs">${escapeHtml(data.category || 'General')}</div>
        </div>
        
        <div class="bg-white p-3 rounded-lg border border-[#E5DFD7] space-y-0.5">
          <span class="text-[10px] font-bold uppercase text-[#64748B]">Severity</span>
          <div>
            <span class="inline-block text-xs font-bold px-2.5 py-0.5 rounded border ${severityBadgeClass}">
              ${escapeHtml(severity)}
            </span>
          </div>
        </div>
      </div>

      <!-- Keywords -->
      <div class="space-y-1">
        <span class="text-xs font-bold text-[#1C2421] block">Keywords:</span>
        <div class="text-xs text-[#475569] font-medium leading-relaxed bg-white/70 px-3 py-2 rounded-lg border border-[#E5DFD7]">
          ${keywords.length > 0 ? keywords.map(k => escapeHtml(k)).join(' • ') : 'Community issue'}
        </div>
      </div>

      <!-- Suggested Solutions -->
      <div class="space-y-1.5">
        <span class="text-xs font-bold text-[#1C2421] block">Suggested Solutions:</span>
        <ol class="list-decimal list-inside space-y-1.5 text-xs text-[#1C2421] bg-white p-3 rounded-lg border border-[#E5DFD7]">
          ${solutions.map(sol => `
            <li class="leading-relaxed pl-1 text-[#475569]">
              <span class="text-[#1C2421] font-medium">${escapeHtml(sol)}</span>
            </li>
          `).join('')}
        </ol>
      </div>

    </div>
  `;

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// Display Friendly Error Card
function renderAIAnalysisError(errorMessage) {
  const containerEl = document.getElementById('ai-analysis-container');
  if (!containerEl) return;

  containerEl.innerHTML = `
    <div class="p-4 bg-red-50 border border-red-200 rounded-xl text-xs space-y-2">
      <div class="flex items-center justify-between text-red-900 font-bold">
        <div class="flex items-center gap-1.5">
          <i data-lucide="alert-circle" class="w-4 h-4 text-red-600 shrink-0"></i>
          <span>AI Analysis Unavailable</span>
        </div>
        <button type="button" onclick="clearAIAnalysis()" class="text-red-400 hover:text-red-600 p-0.5 cursor-pointer">
          <i data-lucide="x" class="w-3.5 h-3.5"></i>
        </button>
      </div>
      <p class="text-red-700 leading-relaxed text-xs pl-5">
        ${escapeHtml(errorMessage)}
      </p>
    </div>
  `;

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// Clear AI Analysis Card
function clearAIAnalysis() {
  const containerEl = document.getElementById('ai-analysis-container');
  if (containerEl) {
    containerEl.innerHTML = '';
  }
  currentAIAnalysisResult = null;
}

function handleProblemFormSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('p-title').value.trim();
  const desc = document.getElementById('p-desc').value.trim();
  const loc = document.getElementById('p-location').value.trim();
  const cat = document.getElementById('p-category').value;
  const affected = document.getElementById('p-affected').value.trim();
  const urgency = document.getElementById('p-urgency').value;
  const expected = document.getElementById('p-expected').value.trim();
  const author = document.getElementById('p-author').value.trim() || "Community Citizen";

  const catNames = {
    "healthcare": "Healthcare & Water",
    "education": "Education",
    "employment": "Livelihoods & Craft",
    "environment": "Environment & Sanitation",
    "agriculture": "Agriculture",
    "infrastructure": "Infrastructure",
    "public-services": "Public Services"
  };

  // Generate simple Problem ID like PRB-105
  const newNum = 100 + ACTIVE_CHALLENGES.length + 1;
  const newId = "PRB-" + newNum;

  const newProb = {
    id: newId,
    title: title,
    category: cat,
    categoryName: catNames[cat] || cat,
    location: loc,
    district: loc.split(',').pop().trim() || "Jharkhand",
    shortDescription: desc.length > 140 ? desc.substring(0, 140) + "..." : desc,
    fullDescription: desc,
    currentSituation: desc,
    affectedPopulation: affected,
    urgency: urgency,
    expectedOutcome: expected,
    expectedSolution: expected,
    status: "Open for Solutions",
    authorName: author,
    datePosted: "Just Now",
    solutionsList: []
  };

  addChallenge(newProb);
  submissionSuccessProblem = newProb;
  if (typeof showToast === 'function') {
    showToast(`Problem ${newId} submitted successfully!`, "success");
  }
  renderApp();
}

function resetSubmissionState() {
  submissionSuccessProblem = null;
  currentAIAnalysisResult = null;
  renderApp();
}
