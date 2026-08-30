// ==========================================================================
// SAMADHAN SETU — Raise a Problem Component (Phase 1, 2, 3)
// Features Gemini AI Problem Assistant & GPS Location Auto-Detection
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
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DFD7] shadow-lg text-center space-y-5">
            
            <div class="w-14 h-14 rounded-full bg-[#EBF3EE] text-[#24543D] flex items-center justify-center mx-auto shadow-xs">
              <i data-lucide="check-circle-2" class="w-8 h-8"></i>
            </div>

            <div class="space-y-1">
              <h2 class="text-2xl font-bold text-[#1C2421] font-heading">
                Problem Submitted Successfully!
              </h2>
              <p class="text-xs sm:text-sm text-[#556987]">
                Your challenge has been registered in the Jharkhand Societal Innovation Network.
              </p>
            </div>

            <!-- Problem ID Certificate Box -->
            <div class="p-5 bg-gradient-to-br from-[#FAF8F5] to-[#FAF2ED] rounded-2xl border border-[#E8D0C3] space-y-1.5 text-left shadow-2xs">
              <div class="flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>OFFICIAL PROBLEM ID</span>
                <span class="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">LIVE IN CATALOG</span>
              </div>
              <div class="text-2xl font-bold font-mono text-[#C25E30]">${submissionSuccessProblem.id}</div>
              <div class="text-sm font-bold text-[#1C2421] pt-1">"${submissionSuccessProblem.title}"</div>
              <div class="text-xs text-[#64748B] flex items-center gap-1">
                <i data-lucide="map-pin" class="w-3 h-3 text-[#C25E30]"></i>
                <span>${submissionSuccessProblem.location}</span>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a href="#problem-details?id=${submissionSuccessProblem.id}" class="btn-primary-setu w-full sm:w-auto px-5 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                <span>View Problem Details</span>
              </a>
              <a href="#explore" class="btn-secondary-setu w-full sm:w-auto px-5 py-2.5 text-xs font-bold">
                Go to Explore Feed
              </a>
              <button onclick="resetSubmissionState()" class="text-xs text-gray-500 hover:text-gray-800 py-1.5 cursor-pointer underline">
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
          <h1 class="text-2xl sm:text-3xl font-extrabold text-[#1C2421] font-heading">
            Submit a Community Problem
          </h1>
          <p class="text-xs sm:text-sm text-[#556987]">
            Share a real community issue so student innovators, researchers and CSR partners can collaborate to solve it.
          </p>
        </div>

        <!-- Form Card -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DFD7] shadow-sm">
          <form onsubmit="handleProblemFormSubmit(event)" class="space-y-4">
            
            <!-- Problem Title -->
            <div>
              <label for="p-title" class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">
                Problem Title *
              </label>
              <input type="text" 
                     id="p-title"
                     required
                     placeholder="e.g. Broken solar water pump in Bishunpur village"
                     class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-sm text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white transition-all" />
            </div>

            <!-- Description -->
            <div>
              <label for="p-desc" class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">
                Description (What is happening?) *
              </label>
              <textarea id="p-desc" 
                        required
                        rows="3"
                        placeholder="Explain the background. Why is it a problem? How does it affect daily life and livelihoods?"
                        class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white transition-all"></textarea>
            </div>

            <!-- AI Problem Analysis Action Banner -->
            <div class="p-3.5 bg-gradient-to-r from-[#FAF2ED] via-[#FFF9F5] to-[#FAF2ED] border border-[#E8D0C3] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C25E30] to-[#D97706] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <i data-lucide="sparkles" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="text-xs font-bold text-[#1C2421] flex items-center gap-1.5">
                    <span>AI Problem Assistant</span>
                    <span class="text-[9px] font-bold text-[#C25E30] bg-[#FAF2ED] px-1.5 py-0.5 rounded border border-[#E8D0C3]">GEMINI</span>
                  </div>
                  <div class="text-[11px] text-[#64748B]">Auto-detect category, priority severity & practical solutions</div>
                </div>
              </div>

              <button type="button" 
                      id="btn-ai-analyze"
                      onclick="handleAnalyzeWithAI()" 
                      class="btn-primary-setu w-full sm:w-auto px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs">
                <span>🤖</span>
                <span>Analyze with AI</span>
              </button>
            </div>

            <!-- AI Analysis Dynamic Results Container -->
            <div id="ai-analysis-container" class="transition-all duration-300"></div>

            <!-- Location with GPS Auto-detect Button -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="p-location" class="block text-xs font-bold text-[#1C2421] font-mono uppercase">
                  Location (Village, Block, District) *
                </label>
                <button type="button" 
                        id="btn-gps-detect"
                        onclick="handleDetectGPSLocation()" 
                        class="text-[11px] font-bold text-[#24543D] hover:text-[#173828] bg-[#EBF3EE] hover:bg-[#D5E6DC] border border-[#C4DCCE] px-2.5 py-0.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                  <i data-lucide="map-pin" class="w-3 h-3 text-[#24543D]"></i>
                  <span>Auto-detect GPS</span>
                </button>
              </div>
              <input type="text" 
                     id="p-location"
                     required
                     placeholder="e.g. Mahuadanr, Latehar, Jharkhand"
                     class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white transition-all" />
            </div>

            <!-- Category & Urgency (2 Cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="p-category" class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">
                  Category *
                </label>
                <select id="p-category" required class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs font-medium text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white">
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

              <div>
                <label for="p-urgency" class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">
                  Urgency / Priority *
                </label>
                <select id="p-urgency" required class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs font-medium text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white">
                  <option value="High" selected>High (Major daily difficulty)</option>
                  <option value="Critical">Critical (Immediate health/safety issue)</option>
                  <option value="Medium">Medium (Moderate improvement needed)</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <!-- People Affected -->
            <div>
              <label for="p-affected" class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">
                Estimated People Affected *
              </label>
              <input type="text" 
                     id="p-affected"
                     required
                     placeholder="e.g. Around 300 villagers / 120 school kids / 45 tribal artisans"
                     class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white" />
            </div>

            <!-- What is needed / Expected Solution -->
            <div>
              <label for="p-expected" class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">
                What is needed / Expected Solution *
              </label>
              <textarea id="p-expected" 
                        required
                        rows="2"
                        placeholder="What kind of solution or tool could solve this? (e.g. solar micro-filter, mobile craft aggregation app...)"
                        class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white"></textarea>
            </div>

            <!-- Submitter Name (Optional) -->
            <div>
              <label for="p-author" class="block text-xs font-bold text-[#64748B] mb-1 font-mono uppercase">
                Your Name / Organization (Optional)
              </label>
              <input type="text" 
                     id="p-author"
                     placeholder="e.g. Sushma Toppo (Gram Panchayat Member)"
                     class="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs text-[#1C2421]" />
            </div>

            <!-- Submit Button -->
            <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span class="text-xs text-gray-500">Will be indexed in live directory</span>
              <button type="submit" class="btn-primary-setu px-7 py-3 text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5">
                <i data-lucide="send" class="w-3.5 h-3.5"></i>
                <span>Submit Problem</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  `;
}

// GPS Auto-Detection Handler
function handleDetectGPSLocation() {
  const locInput = document.getElementById('p-location');
  const gpsBtn = document.getElementById('btn-gps-detect');

  if (!navigator.geolocation) {
    if (typeof showToast === 'function') {
      showToast("GPS is not supported by your current browser.", "error");
    }
    return;
  }

  if (gpsBtn) {
    gpsBtn.disabled = true;
    gpsBtn.innerHTML = `
      <svg class="w-3 h-3 animate-spin text-[#24543D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Detecting GPS...</span>
    `;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude.toFixed(5);
      const lon = position.coords.longitude.toFixed(5);

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const geoData = await res.json();
        const address = geoData.address || {};
        const village = address.village || address.suburb || address.town || address.neighbourhood || address.city || "Block Area";
        const district = address.county || address.state_district || address.city || "Ranchi";
        const state = address.state || "Jharkhand";

        if (locInput) {
          locInput.value = `${village}, ${district}, ${state} (GPS: ${lat}, ${lon})`;
        }
        if (typeof showToast === 'function') {
          showToast(`📍 Location detected: ${district}, ${state}`, "success");
        }
      } catch (e) {
        if (locInput) {
          locInput.value = `Jharkhand (GPS Coordinates: ${lat}, ${lon})`;
        }
        if (typeof showToast === 'function') {
          showToast("📍 GPS coordinates captured!", "success");
        }
      }

      if (gpsBtn) {
        gpsBtn.disabled = false;
        gpsBtn.innerHTML = `
          <i data-lucide="check" class="w-3 h-3 text-[#24543D]"></i>
          <span>GPS Acquired ✓</span>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    },
    (err) => {
      if (typeof showToast === 'function') {
        showToast("GPS detection unavailable or permission denied. Please enter location manually.", "error");
      }
      if (gpsBtn) {
        gpsBtn.disabled = false;
        gpsBtn.innerHTML = `
          <i data-lucide="map-pin" class="w-3 h-3 text-[#24543D]"></i>
          <span>Auto-detect GPS</span>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    },
    { timeout: 8000, enableHighAccuracy: true }
  );
}

// AI Problem Assistant Handler
async function handleAnalyzeWithAI() {
  const titleEl = document.getElementById('p-title');
  const descEl = document.getElementById('p-desc');
  const locEl = document.getElementById('p-location');
  const btnEl = document.getElementById('btn-ai-analyze');
  const containerEl = document.getElementById('ai-analysis-container');

  const title = titleEl ? titleEl.value.trim() : '';
  const desc = descEl ? descEl.value.trim() : '';
  const loc = locEl ? locEl.value.trim() : '';

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

  if (btnEl) {
    btnEl.disabled = true;
    btnEl.classList.add('opacity-70', 'cursor-not-allowed');
    btnEl.innerHTML = `
      <svg class="w-3.5 h-3.5 animate-spin text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Analyzing with Gemini...</span>
    `;
  }

  if (containerEl) {
    containerEl.innerHTML = `
      <div class="p-4 bg-[#FAF2ED]/80 border border-[#E8D0C3] rounded-2xl flex items-center gap-3 text-xs text-[#C25E30] animate-pulse">
        <svg class="w-5 h-5 animate-spin text-[#C25E30] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <div>
          <div class="font-bold text-[#1C2421] text-xs">AI Problem Assistant Active...</div>
          <div class="text-[11px] text-[#64748B] mt-0.5">Evaluating thematic category, severity level, keywords, and practical solution paths.</div>
        </div>
      </div>
    `;
  }

  try {
    const analysis = await analyzeProblemWithAI({ title, description: desc, location: loc });
    currentAIAnalysisResult = analysis;
    renderAIAnalysisCard(analysis);

    // Auto-select category in dropdown
    const catSelect = document.getElementById('p-category');
    if (catSelect && analysis.category) {
      const catLower = analysis.category.toLowerCase();
      if (catLower.includes('health') || catLower.includes('water')) catSelect.value = 'healthcare';
      else if (catLower.includes('education') || catLower.includes('school')) catSelect.value = 'education';
      else if (catLower.includes('craft') || catLower.includes('livelihood') || catLower.includes('artisan')) catSelect.value = 'employment';
      else if (catLower.includes('environment') || catLower.includes('sanitation') || catLower.includes('waste')) catSelect.value = 'environment';
      else if (catLower.includes('agri') || catLower.includes('crop') || catLower.includes('farm')) catSelect.value = 'agriculture';
      else if (catLower.includes('infra') || catLower.includes('road') || catLower.includes('solar')) catSelect.value = 'infrastructure';
      else if (catLower.includes('public') || catLower.includes('service')) catSelect.value = 'public-services';
    }

    // Auto-select urgency in dropdown
    const urgSelect = document.getElementById('p-urgency');
    if (urgSelect && analysis.severity) {
      const validSeverities = ['Critical', 'High', 'Medium', 'Low'];
      if (validSeverities.includes(analysis.severity)) {
        urgSelect.value = analysis.severity;
      }
    }

    // Auto-fill expected outcome if empty
    const expTextarea = document.getElementById('p-expected');
    if (expTextarea && (!expTextarea.value.trim()) && analysis.solutions && analysis.solutions.length > 0) {
      expTextarea.value = analysis.solutions[0];
    }

    if (typeof showToast === 'function') {
      showToast("AI Problem Analysis generated & fields auto-populated!", "success");
    }
  } catch (err) {
    renderAIAnalysisError(err.message || "Failed to connect to AI service.");
    if (typeof showToast === 'function') {
      showToast(err.message || "AI Analysis unavailable.", "error");
    }
  } finally {
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
  const engineLabel = data.engine || "Gemini Flash AI";

  containerEl.innerHTML = `
    <div class="p-4 sm:p-5 bg-gradient-to-br from-[#FAF2ED] to-[#FFF9F5] border border-[#E8D0C3] rounded-2xl space-y-3.5 shadow-2xs">
      
      <div class="flex items-center justify-between border-b border-[#E8D0C3] pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-base">🤖</span>
          <h3 class="text-xs font-bold text-[#1C2421] font-heading tracking-wide">
            AI Problem Analysis Result
          </h3>
          <span class="text-[10px] font-semibold text-[#C25E30] bg-white px-2 py-0.5 rounded-full border border-[#E8D0C3]">
            ${escapeHtml(engineLabel)}
          </span>
        </div>
        <button type="button" 
                onclick="clearAIAnalysis()" 
                class="text-[#64748B] hover:text-[#1C2421] text-xs p-1 rounded hover:bg-white/50 transition-colors cursor-pointer" 
                title="Dismiss analysis">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div class="bg-white p-3 rounded-xl border border-[#E5DFD7] space-y-0.5">
          <span class="text-[10px] font-bold uppercase text-[#64748B] font-mono">Suggested Domain</span>
          <div class="font-bold text-[#1C2421] text-xs">${escapeHtml(data.category || 'General')}</div>
        </div>
        
        <div class="bg-white p-3 rounded-xl border border-[#E5DFD7] space-y-0.5">
          <span class="text-[10px] font-bold uppercase text-[#64748B] font-mono">Assessed Severity</span>
          <div>
            <span class="inline-block text-xs font-bold px-2.5 py-0.5 rounded border ${severityBadgeClass}">
              ${escapeHtml(severity)}
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-1">
        <span class="text-xs font-bold text-[#1C2421] block font-mono uppercase text-[10px] text-[#64748B]">Extracted Keywords:</span>
        <div class="text-xs text-[#475569] font-medium leading-relaxed bg-white px-3 py-2 rounded-xl border border-[#E5DFD7]">
          ${keywords.length > 0 ? keywords.map(k => escapeHtml(k)).join(' • ') : 'Grassroots societal challenge'}
        </div>
      </div>

      <div class="space-y-1.5">
        <span class="text-xs font-bold text-[#1C2421] block font-mono uppercase text-[10px] text-[#64748B]">AI Recommended Solution Concepts:</span>
        <ol class="list-decimal list-inside space-y-1.5 text-xs text-[#1C2421] bg-white p-3 rounded-xl border border-[#E5DFD7]">
          ${solutions.map(sol => `
            <li class="leading-relaxed pl-1 text-[#475569]">
              <span class="text-[#1C2421] font-medium">${escapeHtml(sol)}</span>
            </li>
          `).join('')}
        </ol>
      </div>

      <div class="pt-1 text-[11px] text-[#24543D] font-medium flex items-center gap-1.5">
        <i data-lucide="check-circle" class="w-3.5 h-3.5 text-[#24543D]"></i>
        <span>Form category, urgency, and solution concepts have been synchronized!</span>
      </div>

    </div>
  `;

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

function renderAIAnalysisError(errorMessage) {
  const containerEl = document.getElementById('ai-analysis-container');
  if (!containerEl) return;

  containerEl.innerHTML = `
    <div class="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs space-y-2">
      <div class="flex items-center justify-between text-red-900 font-bold">
        <div class="flex items-center gap-1.5">
          <i data-lucide="alert-circle" class="w-4 h-4 text-red-600 shrink-0"></i>
          <span>AI Analysis Notice</span>
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
