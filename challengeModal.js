// ==========================================================================
// SAMADHAN SETU — Challenge Detail Modal Component
// ==========================================================================

function openChallengeModal(challengeId) {
  const challenge = ACTIVE_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  const isUpvoted = challenge.isSupportedByUser;

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 modal-backdrop overflow-y-auto" onclick="closeModal(event)">
      <div class="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-[#E6DED2] modal-content-animated relative overflow-hidden" onclick="event.stopPropagation()">
        
        <!-- Header Banner Image & Controls -->
        <div class="relative h-64 w-full bg-gray-900">
          <img src="${challenge.image}" alt="${challenge.title}" class="w-full h-full object-cover opacity-80" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#1C2421] via-black/40 to-transparent"></div>

          <!-- Close Button -->
          <button onclick="closeModal()" class="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition-colors" title="Close Modal">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <!-- Badges on Image -->
          <div class="absolute top-4 left-4 flex flex-wrap gap-2">
            <span class="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-white text-[#1C2421] shadow-md">
              ${challenge.categoryName}
            </span>
            <span class="inline-block text-xs font-bold px-3 py-1 rounded-md shadow-md ${challenge.statusColor}">
              ${challenge.status}
            </span>
          </div>

          <!-- Title & Location in Banner -->
          <div class="absolute bottom-4 left-4 right-4 text-white space-y-1">
            <div class="flex items-center gap-2 text-xs text-amber-300 font-medium">
              <i data-lucide="map-pin" class="w-4 h-4"></i>
              <span>${challenge.location}</span>
              <span>•</span>
              <span>Posted ${challenge.datePosted}</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-heading text-white leading-snug drop-shadow-md">
              ${challenge.title}
            </h2>
          </div>
        </div>

        <!-- Modal Body Content -->
        <div class="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
          <!-- Key Metrics Strip -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#FAF8F5] border border-[#E6DED2] rounded-2xl text-xs">
            <div>
              <span class="text-gray-400 font-mono block">URGENCY</span>
              <strong class="text-red-700 font-bold">${challenge.urgency} Priority</strong>
            </div>
            <div>
              <span class="text-gray-400 font-mono block">COMMUNITY SIZE</span>
              <strong class="text-[#1C2421]">${challenge.affectedPopulation}</strong>
            </div>
            <div>
              <span class="text-gray-400 font-mono block">SUBMITTED BY</span>
              <strong class="text-[#1C2421]">${challenge.authorName}</strong>
            </div>
            <div>
              <span class="text-gray-400 font-mono block">AI TAG ENGINE</span>
              <strong class="text-[#24543D]">${challenge.aiConfidence}</strong>
            </div>
          </div>

          <!-- Description Section -->
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-[#C25E30] mb-2 font-mono">Detailed Problem Statement</h3>
            <p class="text-sm text-[#334155] leading-relaxed whitespace-pre-line">
              ${challenge.fullDescription}
            </p>
          </div>

          <!-- Tags -->
          <div>
            <span class="text-xs font-bold text-[#64748B] block mb-2 font-mono uppercase">Key Problem Themes:</span>
            <div class="flex flex-wrap gap-2">
              ${challenge.tags.map(t => `
                <span class="px-3 py-1 rounded-lg bg-[#FAF2ED] text-[#C25E30] border border-[#E8D0C3] text-xs font-semibold">
                  #${t}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Active Solutions & Prototyping Section -->
          <div class="pt-6 border-t border-[#F1ECE6]">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-base font-bold text-[#1C2421] font-heading">Solutions & Prototyping Teams</h3>
                <p class="text-xs text-[#64748B]">${challenge.solutionsList.length} Proposed Solution(s)</p>
              </div>
              <button onclick="toggleSolutionForm()" class="btn-primary-setu px-3.5 py-1.5 text-xs font-bold flex items-center gap-1">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                <span>Submit Solution</span>
              </button>
            </div>

            <!-- Propose Solution Form (Toggleable) -->
            <div id="solution-form-container" class="hidden p-4 bg-[#FAF6F0] rounded-xl border border-[#E8D0C3] mb-4">
              <h4 class="text-xs font-bold text-[#1C2421] uppercase mb-2 font-mono">Submit Innovative Proposal / Prototype</h4>
              <form onsubmit="handleNewSolutionSubmit(event, '${challenge.id}')" class="space-y-3">
                <input type="text" id="sol-title" required placeholder="Solution Title (e.g. Low-cost IoT Sensor Box)" class="w-full px-3 py-2 bg-white border border-[#E5DFD7] rounded-lg text-xs" />
                <input type="text" id="sol-team" required placeholder="Team / University Name (e.g. Team Innovate, NIT Jamshedpur)" class="w-full px-3 py-2 bg-white border border-[#E5DFD7] rounded-lg text-xs" />
                <textarea id="sol-summary" required rows="3" placeholder="Technical approach, hardware/software specs, expected unit cost..." class="w-full px-3 py-2 bg-white border border-[#E5DFD7] rounded-lg text-xs"></textarea>
                <div class="flex justify-end gap-2">
                  <button type="button" onclick="toggleSolutionForm()" class="px-3 py-1.5 text-xs font-semibold text-gray-600">Cancel</button>
                  <button type="submit" class="btn-primary-setu px-4 py-1.5 text-xs font-bold">Submit to Evaluation Committee</button>
                </div>
              </form>
            </div>

            <!-- Solutions List -->
            ${challenge.solutionsList.length > 0 ? `
              <div class="space-y-3">
                ${challenge.solutionsList.map(sol => `
                  <div class="p-4 bg-white border border-[#E6DED2] rounded-xl shadow-2xs space-y-2">
                    <div class="flex items-center justify-between">
                      <h4 class="text-sm font-bold text-[#1C2421]">${sol.title}</h4>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">${sol.status}</span>
                    </div>
                    <p class="text-xs text-[#475569] leading-relaxed">${sol.summary}</p>
                    <div class="flex items-center justify-between text-xs text-[#64748B] pt-2 border-t border-gray-100">
                      <span class="font-medium text-[#24543D]">By: ${sol.submittedBy}</span>
                      <button onclick="showToast('Upvoted solution proposal!', 'success')" class="text-xs font-bold text-[#C25E30] flex items-center gap-1 hover:underline">
                        <i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i>
                        <span>${sol.upvotes} Upvotes</span>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] text-center">
                <p class="text-xs text-[#64748B]">No solutions have been proposed yet. Be the first innovator team to take on this challenge!</p>
              </div>
            `}
          </div>

          <!-- Community Discussion Section -->
          <div class="pt-6 border-t border-[#F1ECE6]">
            <h3 class="text-base font-bold text-[#1C2421] font-heading mb-3">Community & Expert Dialogue</h3>
            
            <div class="space-y-3 mb-4">
              ${challenge.discussionThread.map(disc => `
                <div class="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D9] text-xs">
                  <div class="flex items-center justify-between font-bold text-[#1C2421] mb-1">
                    <span>${disc.author}</span>
                    <span class="text-gray-400 font-mono font-normal">${disc.date}</span>
                  </div>
                  <p class="text-[#475569]">${disc.text}</p>
                </div>
              `).join('')}
            </div>

            <!-- Add Comment Input -->
            <form onsubmit="handleCommentSubmit(event, '${challenge.id}')" class="flex gap-2">
              <input type="text" id="comment-input" required placeholder="Add technical insight, local context, or mentor note..." class="flex-grow px-3.5 py-2 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs" />
              <button type="submit" class="btn-secondary-setu px-4 py-2 text-xs font-bold shrink-0">Post Note</button>
            </form>
          </div>

        </div>

        <!-- Modal Bottom Actions Bar -->
        <div class="p-4 sm:p-6 bg-[#FAF8F5] border-t border-[#EAE3D9] flex flex-wrap items-center justify-between gap-3">
          
          <div class="flex items-center gap-3">
            <button onclick="handleModalUpvote('${challenge.id}')" 
                    class="btn-primary-setu px-4 py-2 text-xs font-bold flex items-center gap-2">
              <i data-lucide="thumbs-up" class="w-4 h-4 ${isUpvoted ? 'fill-current' : ''}"></i>
              <span>${challenge.supportersCount} Supporters (${isUpvoted ? 'Upvoted' : 'Support'})</span>
            </button>

            <button onclick="handleShareChallenge('${challenge.title}')" class="btn-secondary-setu px-3 py-2 text-xs font-semibold flex items-center gap-1.5">
              <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
              <span>Share</span>
            </button>
          </div>

          <button onclick="closeModal()" class="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-800">
            Close
          </button>
        </div>

      </div>
    </div>
  `;

  lucide.createIcons();
}

function closeModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('button')) return;
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}

function handleModalUpvote(challengeId) {
  toggleChallengeUpvote(challengeId);
  openChallengeModal(challengeId);
  renderApp();
  showToast("Support vote updated!", "success");
}

function toggleSolutionForm() {
  const f = document.getElementById('solution-form-container');
  if (f) f.classList.toggle('hidden');
}

function handleNewSolutionSubmit(e, challengeId) {
  e.preventDefault();
  const challenge = ACTIVE_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return;

  const title = document.getElementById('sol-title').value;
  const team = document.getElementById('sol-team').value;
  const summary = document.getElementById('sol-summary').value;

  challenge.solutionsList.push({
    id: "SOL-" + (challenge.solutionsList.length + 1),
    title: title,
    submittedBy: team,
    status: "Under Review",
    upvotes: 1,
    summary: summary
  });
  
  if (challenge.status === "Open for Solutions") {
    challenge.status = "In Collaboration";
    challenge.statusColor = "badge-status-collab";
  }

  saveChallengesState();
  showToast("Solution proposal registered! Dispatched to evaluating institutions.", "success");
  openChallengeModal(challengeId);
  renderApp();
}

function handleCommentSubmit(e, challengeId) {
  e.preventDefault();
  const input = document.getElementById('comment-input');
  if (!input || !input.value.trim()) return;

  const challenge = ACTIVE_CHALLENGES.find(c => c.id === challengeId);
  if (challenge) {
    challenge.discussionThread.push({
      author: "Verified Innovator / Stakeholder",
      text: input.value.trim(),
      date: "Just Now"
    });
    saveChallengesState();
    input.value = '';
    openChallengeModal(challengeId);
    showToast("Comment posted to dialogue thread.", "success");
  }
}

function handleShareChallenge(title) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    showToast(`Link for "${title}" copied to clipboard!`, "info");
  } else {
    showToast("Shareable link ready!", "info");
  }
}
