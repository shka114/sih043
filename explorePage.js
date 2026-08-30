// ==========================================================================
// SAMADHAN SETU — Explore Problems Component (Phase 1, 2, 3)
// Includes Smart Suggestions, District/Keyword Search & Category Filter
// ==========================================================================

let exploreSearchText = "";
let exploreCategory = "all";

function renderExplorePage() {
  // Sync from hero search or category tile clicks
  if (sessionStorage.getItem('samadhan_search_query')) {
    exploreSearchText = sessionStorage.getItem('samadhan_search_query');
    sessionStorage.removeItem('samadhan_search_query');
  }
  if (sessionStorage.getItem('samadhan_active_filter_category')) {
    exploreCategory = sessionStorage.getItem('samadhan_active_filter_category');
    sessionStorage.removeItem('samadhan_active_filter_category');
  }

  const problems = ACTIVE_CHALLENGES.filter(p => {
    const q = exploreSearchText.trim().toLowerCase();
    const matchesSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
      (p.location && p.location.toLowerCase().includes(q)) ||
      (p.id && p.id.toLowerCase().includes(q)) ||
      (p.district && p.district.toLowerCase().includes(q));

    const matchesCat = exploreCategory === "all" || p.category === exploreCategory;
    return matchesSearch && matchesCat;
  });

  // Smart Suggestions
  let recommendedProblems = [];
  let recommendationContext = "";

  if (exploreCategory !== "all") {
    recommendedProblems = ACTIVE_CHALLENGES.filter(p => p.category === exploreCategory).slice(0, 2);
    const catName = recommendedProblems[0]?.categoryName || exploreCategory;
    recommendationContext = `Problems related to ${catName} across Jharkhand:`;
  } else if (exploreSearchText.trim()) {
    const q = exploreSearchText.trim().toLowerCase();
    recommendedProblems = ACTIVE_CHALLENGES.filter(p => 
      p.title.toLowerCase().includes(q) || (p.location && p.location.toLowerCase().includes(q))
    ).slice(0, 2);
    recommendationContext = `Problems matching "${exploreSearchText}":`;
  } else {
    recommendedProblems = ACTIVE_CHALLENGES.filter(p => p.urgency === 'High' || p.urgency === 'Critical').slice(0, 2);
    recommendationContext = "High priority problems needing immediate attention:";
  }

  return `
    <div class="bg-[#FAF8F5] min-h-screen py-8">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        <!-- Header -->
        <div class="space-y-1">
          <div class="text-xs text-[#C25E30] font-semibold">
            <a href="#home" class="hover:underline">Home</a> / Explore Problems
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#1C2421] font-heading">
            Explore Problems
          </h1>
          <p class="text-sm text-[#556987]">
            Real-world challenges submitted by local citizens and community representatives in Jharkhand.
          </p>
        </div>

        <!-- Search & Filter Bar -->
        <div class="bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          <!-- Search Bar -->
          <div class="w-full sm:flex-1 relative">
            <input type="text" 
                   id="explore-search-input"
                   value="${exploreSearchText}"
                   oninput="handleSearchChange(event)"
                   placeholder="Search by keyword, village or problem title..."
                   class="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-sm text-[#1C2421] focus:outline-none focus:border-[#C25E30] focus:bg-white" />
            <i data-lucide="search" class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
          </div>

          <!-- Category Filter -->
          <div class="w-full sm:w-auto flex items-center gap-2">
            <label class="text-xs font-semibold text-[#556987] shrink-0">Category:</label>
            <select onchange="handleCategoryChange(event)" class="w-full sm:w-auto px-3 py-2 bg-[#FAF8F5] border border-[#D9D2C7] rounded-lg text-xs font-medium text-[#1C2421] focus:outline-none focus:border-[#C25E30]">
              <option value="all" ${exploreCategory === 'all' ? 'selected' : ''}>All Categories</option>
              <option value="healthcare" ${exploreCategory === 'healthcare' ? 'selected' : ''}>Healthcare & Water</option>
              <option value="education" ${exploreCategory === 'education' ? 'selected' : ''}>Education</option>
              <option value="employment" ${exploreCategory === 'employment' ? 'selected' : ''}>Livelihoods & Craft</option>
              <option value="environment" ${exploreCategory === 'environment' ? 'selected' : ''}>Environment & Sanitation</option>
              <option value="agriculture" ${exploreCategory === 'agriculture' ? 'selected' : ''}>Agriculture</option>
              <option value="infrastructure" ${exploreCategory === 'infrastructure' ? 'selected' : ''}>Infrastructure</option>
            </select>
          </div>

          <a href="#raise-problem" class="btn-primary-setu px-4 py-2 text-xs font-semibold shrink-0 w-full sm:w-auto text-center">
            + Raise a Problem
          </a>

        </div>

        <!-- Smart Suggestions / Recommended Problems -->
        ${recommendedProblems.length > 0 ? `
          <div class="p-4 bg-[#FAF2ED] rounded-xl border border-[#E8D0C3] space-y-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 text-xs font-bold text-[#C25E30]">
                <i data-lucide="sparkles" class="w-4 h-4"></i>
                <span class="uppercase tracking-wider font-mono">Recommended Problems</span>
              </div>
              <span class="text-[11px] text-[#64748B]">${recommendationContext}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${recommendedProblems.map(rec => `
                <div class="bg-white p-3.5 rounded-lg border border-[#E5DFD7] flex flex-col justify-between space-y-2">
                  <div>
                    <div class="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                      <span class="font-mono font-bold text-[#C25E30]">${rec.id}</span>
                      <span>${rec.location}</span>
                    </div>
                    <h4 class="text-xs sm:text-sm font-bold text-[#1C2421] line-clamp-1">${rec.title}</h4>
                    <p class="text-[11px] text-gray-600 line-clamp-2 mt-1">${rec.shortDescription}</p>
                  </div>
                  <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span class="text-emerald-700 font-medium text-[11px]">${rec.status || 'Open for Solutions'}</span>
                    <a href="#problem-details?id=${rec.id}" class="text-[#C25E30] font-semibold hover:underline flex items-center gap-1">
                      <span>View</span>
                      <i data-lucide="arrow-right" class="w-3 h-3"></i>
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Problems List Grid -->
        <div class="space-y-4">
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>Showing <strong>${problems.length}</strong> problem${problems.length === 1 ? '' : 's'}</span>
            ${exploreSearchText || exploreCategory !== 'all' ? `
              <button onclick="resetSearchFilters()" class="text-[#C25E30] hover:underline font-semibold">
                Clear Filters
              </button>
            ` : ''}
          </div>

          ${problems.length > 0 ? `
            <div class="grid grid-cols-1 gap-4">
              ${problems.map(p => `
                <div class="bg-white p-5 rounded-2xl border border-[#E5DFD7] shadow-xs space-y-3.5 hover:border-[#C25E30] transition-colors">
                  
                  <!-- Top: ID, Category & Urgency -->
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <span class="font-mono font-bold text-xs text-[#C25E30] bg-[#FAF2ED] px-2 py-0.5 rounded border border-[#E8D0C3]">
                        ${p.id}
                      </span>
                      <span class="text-xs font-semibold text-[#24543D] bg-[#EBF3EE] px-2 py-0.5 rounded">
                        ${p.categoryName || p.category}
                      </span>
                      ${p.urgency ? `
                        <span class="text-[11px] font-semibold px-2 py-0.5 rounded ${
                          p.urgency === 'Critical' ? 'bg-red-50 text-red-700 border border-red-200' :
                          p.urgency === 'High' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                          'bg-gray-50 text-gray-700 border border-gray-200'
                        }">
                          ${p.urgency} Urgency
                        </span>
                      ` : ''}
                    </div>

                    <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      ${p.status || 'Open for Solutions'}
                    </span>
                  </div>

                  <!-- Title & Description -->
                  <div>
                    <h3 class="text-base sm:text-lg font-bold text-[#1C2421] font-heading hover:text-[#C25E30] transition-colors">
                      <a href="#problem-details?id=${p.id}">${p.title}</a>
                    </h3>
                    <p class="text-xs sm:text-sm text-[#556987] mt-1 leading-relaxed line-clamp-2">
                      ${p.shortDescription || p.fullDescription}
                    </p>
                  </div>

                  <!-- Footer: Location, Submitter & View Details -->
                  <div class="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#64748B]">
                    <div class="flex items-center gap-1.5">
                      <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#C25E30]"></i>
                      <span><strong>Location:</strong> ${p.location}</span>
                    </div>

                    <div class="flex items-center gap-3">
                      ${p.affectedPopulation ? `
                        <span class="text-gray-500 hidden md:inline">Impacts: ${p.affectedPopulation}</span>
                      ` : ''}
                      <a href="#problem-details?id=${p.id}" class="btn-secondary-setu px-4 py-1.5 text-xs font-semibold inline-flex items-center gap-1">
                        <span>View Details</span>
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                      </a>
                    </div>
                  </div>

                </div>
              `).join('')}
            </div>
          ` : `
            <div class="bg-white p-8 rounded-xl border border-[#E5DFD7] text-center space-y-3">
              <p class="text-sm font-semibold text-[#1C2421]">No problems match your search filter.</p>
              <p class="text-xs text-[#64748B]">Try searching for something else or submit a new problem.</p>
              <button onclick="resetSearchFilters()" class="btn-secondary-setu px-4 py-1.5 text-xs font-semibold cursor-pointer">
                Reset Filters
              </button>
            </div>
          `}
        </div>

      </div>
    </div>
  `;
}

function handleSearchChange(e) {
  exploreSearchText = e.target.value;
  renderApp();
}

function handleCategoryChange(e) {
  exploreCategory = e.target.value;
  renderApp();
}

function resetSearchFilters() {
  exploreSearchText = "";
  exploreCategory = "all";
  renderApp();
}
