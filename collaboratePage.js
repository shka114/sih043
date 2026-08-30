// ==========================================================================
// SAMADHAN SETU — Collaborate Component
// Simple form asking how someone wants to help (Technology, Research, Field Support, Mentorship, Funding, Other)
// ==========================================================================

let collabSuccessRecord = null;

function renderCollaboratePage(targetProblemId) {
  if (!targetProblemId) {
    const hash = window.location.hash;
    const match = hash.match(/[?&]id=([^&]+)/);
    if (match) {
      targetProblemId = decodeURIComponent(match[1]);
    }
  }

  const problem = targetProblemId ? getChallengeById(targetProblemId) : null;

  if (collabSuccessRecord) {
    return `
      <div class="bg-[#FAF8F5] min-h-screen py-12">
        <div class="max-w-md mx-auto px-4">
          <div class="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD7] shadow-xs text-center space-y-4">
            
            <div class="w-12 h-12 rounded-full bg-[#EBF3EE] text-[#24543D] flex items-center justify-center mx-auto">
              <i data-lucide="check" class="w-6 h-6"></i>
            </div>

            <h2 class="text-xl font-bold text-[#1C2421] font-heading">
              Collaboration Offer Submitted!
            </h2>
            
            <p class="text-xs text-[#556987]">
              Thank you for choosing to help. Your offer has been recorded.
            </p>

            <div class="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] text-left text-xs space-y-1">
              <div><strong>Your Help Area:</strong> ${collabSuccessRecord.helpTypes.join(', ')}</div>
              <div><strong>Target:</strong> ${collabSuccessRecord.targetTitle}</div>
              <div><strong>Name:</strong> ${collabSuccessRecord.name}</div>
            </div>

            <div class="flex items-center justify-center gap-3 pt-2">
              <a href="#explore" class="btn-primary-setu px-4 py-2 text-xs font-semibold">
                Explore More Problems
              </a>
              <button onclick="resetCollabState()" class="text-xs text-gray-500 hover:text-gray-800">
                Offer More Help
              </button>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  const helpCategories = ["Technology", "Research", "Field Support", "Mentorship", "Funding", "Other"];

  return `
    <div class="bg-[#FAF8F5] min-h-screen py-8">
      <div class="max-w-2xl mx-auto px-4 sm:px-6">
        
        <!-- Header -->
        <div class="mb-6 space-y-1">
          <div class="text-xs text-[#C25E30] font-semibold">
            <a href="#home" class="hover:underline">Home</a> / Collaborate
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#1C2421] font-heading">
            Offer Collaboration
          </h1>
          <p class="text-sm text-[#556987]">
            Connect your skills and resources with real community problems.
          </p>
        </div>

        <!-- Problem Notice if Preselected -->
        ${problem ? `
          <div class="mb-5 p-3.5 bg-[#FAF2ED] border border-[#E8D0C3] rounded-xl text-xs flex items-center justify-between">
            <div>
              <span class="text-gray-500">Contributing towards:</span>
              <div class="font-bold text-[#1C2421]">${problem.id} — ${problem.title}</div>
            </div>
            <a href="#problem-details?id=${problem.id}" class="text-[#C25E30] font-semibold hover:underline shrink-0">View Problem</a>
          </div>
        ` : ''}

        <!-- Simple Form -->
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD7] shadow-xs">
          <form onsubmit="handleSimpleCollabSubmit(event)" class="space-y-5">
            
            <!-- Problem Selection -->
            <div>
              <label for="c-problem" class="block text-xs font-bold text-[#1C2421] mb-1">
                Select Problem to Help *
              </label>
              <select id="c-problem" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs font-medium text-[#1C2421] focus:outline-none focus:border-[#C25E30]">
                ${problem ? `
                  <option value="${problem.id}" selected>${problem.id} — ${problem.title}</option>
                ` : `
                  <option value="GENERAL">General Support / Open Contributor</option>
                  ${ACTIVE_CHALLENGES.map(p => `
                    <option value="${p.id}">${p.id} — ${p.title}</option>
                  `).join('')}
                `}
              </select>
            </div>

            <!-- How would you like to help? (Required 6 choices) -->
            <div>
              <label class="block text-xs font-bold text-[#1C2421] mb-2">
                How would you like to help? *
              </label>
              
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                ${helpCategories.map(type => `
                  <label class="flex items-center gap-2 p-2.5 bg-[#FAF8F5] hover:bg-[#FAF2ED] border border-[#E5DFD7] rounded-lg cursor-pointer text-xs font-medium text-[#1C2421] transition-colors">
                    <input type="checkbox" name="help_category" value="${type}" class="rounded border-gray-300 text-[#C25E30] focus:ring-[#C25E30]" />
                    <span>${type}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Name and Contact -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="c-name" class="block text-xs font-bold text-[#1C2421] mb-1">
                  Your Name *
                </label>
                <input type="text" 
                       id="c-name"
                       required
                       placeholder="e.g. Priya Sharma"
                       class="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30]" />
              </div>

              <div>
                <label for="c-contact" class="block text-xs font-bold text-[#1C2421] mb-1">
                  Email or Phone *
                </label>
                <input type="text" 
                       id="c-contact"
                       required
                       placeholder="e.g. priya@college.edu or 98XXXXXXXX"
                       class="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30]" />
              </div>
            </div>

            <!-- Message Box -->
            <div>
              <label for="c-msg" class="block text-xs font-bold text-[#1C2421] mb-1">
                Message / How you can help *
              </label>
              <textarea id="c-msg" 
                        required
                        rows="3"
                        placeholder="Tell us what resources, equipment, skills, or assistance you or your team can offer..."
                        class="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs text-[#1C2421] focus:outline-none focus:border-[#C25E30]"></textarea>
            </div>

            <!-- Submit Button -->
            <div class="pt-2 border-t border-gray-100 flex items-center justify-end">
              <button type="submit" class="btn-primary-setu px-6 py-2 text-xs font-bold shadow-sm">
                Submit Collaboration
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  `;
}

function handleSimpleCollabSubmit(e) {
  e.preventDefault();

  const problemId = document.getElementById('c-problem').value;
  const name = document.getElementById('c-name').value.trim();
  const contact = document.getElementById('c-contact').value.trim();
  const msg = document.getElementById('c-msg').value.trim();

  const checkedBoxes = document.querySelectorAll('input[name="help_category"]:checked');
  const selectedTypes = Array.from(checkedBoxes).map(cb => cb.value);

  if (selectedTypes.length === 0) {
    showToast("Please select at least one way you would like to help.", "error");
    return;
  }

  const problem = getChallengeById(problemId);
  const targetTitle = problem ? problem.title : "General Support";

  const record = addCollaborationOffer({
    problemId: problemId,
    targetTitle: targetTitle,
    name: name,
    contact: contact,
    helpTypes: selectedTypes,
    message: msg
  });

  collabSuccessRecord = record;
  showToast("Collaboration submitted successfully!", "success");
  renderApp();
}

function resetCollabState() {
  collabSuccessRecord = null;
  renderApp();
}
