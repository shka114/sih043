// ==========================================================================
// SAMADHAN SETU — Raise a Problem Component
// Straightforward, single-page form with simple Problem ID generator
// ==========================================================================

let submissionSuccessProblem = null;

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
              <button onclick="resetSubmissionState()" class="text-xs text-gray-500 hover:text-gray-800 py-1">
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
              <button type="submit" class="btn-primary-setu px-6 py-2.5 text-xs font-bold shadow-sm">
                Submit Problem
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  `;
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
  showToast(`Problem ${newId} submitted successfully!`, "success");
  renderApp();
}

function resetSubmissionState() {
  submissionSuccessProblem = null;
  renderApp();
}
