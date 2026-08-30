// ==========================================================================
// SAMADHAN SETU — "What Can You Solve?" Category Grid Component
// ==========================================================================

function renderCategorySection() {
  return `
    <section class="py-20 bg-[#FAF8F5] relative overflow-hidden" id="categories-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div class="space-y-3 max-w-2xl">
            <span class="text-xs font-bold uppercase tracking-widest text-[#24543D] bg-[#EBF3EE] px-3.5 py-1 rounded-full border border-[#C4DCCE]">
              Grassroots Thematic Domains
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#1C2421] font-heading">
              What Can You Solve?
            </h2>
            <p class="text-base text-[#64748B] font-normal leading-relaxed">
              Explore 10 critical societal priority areas crowdsourced from rural blocks, tribal hamlets, urban wards, and public institutions across Jharkhand and India.
            </p>
          </div>

          <a href="#explore" class="btn-secondary-setu px-5 py-2.5 text-sm flex items-center gap-2 self-start md:self-auto shrink-0">
            <span>View All Categories</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>

        <!-- 10 Category Cards Grid (Responsive 1-2-3-5 Cols) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          ${CATEGORIES_DATA.map(cat => `
            <div onclick="navigateWithCategoryFilter('${cat.id}')"
                 tabindex="0"
                 role="button"
                 aria-label="Filter challenges by ${cat.name}"
                 onkeydown="if(event.key === 'Enter' || event.key === ' ') { navigateWithCategoryFilter('${cat.id}'); }"
                 class="group relative bg-white border border-[#E6DED2] rounded-2xl p-5 shadow-xs card-hover-lift cursor-pointer flex flex-col justify-between transition-all duration-200 hover:border-[#C25E30] focus:outline-none focus:ring-2 focus:ring-[#C25E30]">
              
              <!-- Card Top: Icon & Count Badge -->
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-xs"
                       style="background-color: ${cat.bgLight}; color: ${cat.color};">
                    <i data-lucide="${cat.icon}" class="w-6 h-6"></i>
                  </div>
                  <span class="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-[#FAF8F5] text-[#64748B] border border-[#EAE3D9] group-hover:bg-[#FAF2ED] group-hover:text-[#C25E30] group-hover:border-[#E8D0C3] transition-colors">
                    ${cat.count}+
                  </span>
                </div>

                <!-- Card Name & Description -->
                <h3 class="text-base font-bold text-[#1C2421] mb-2 font-heading group-hover:text-[#C25E30] transition-colors">
                  ${cat.name}
                </h3>
                <p class="text-xs text-[#64748B] leading-relaxed line-clamp-3 mb-4">
                  ${cat.description}
                </p>
              </div>

              <!-- Card Bottom Tags Preview -->
              <div class="pt-3 border-t border-[#F1ECE6] flex items-center justify-between text-[11px] font-semibold text-[#24543D] group-hover:text-[#C25E30]">
                <span>Explore Track</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
              </div>

            </div>
          `).join('')}
        </div>

      </div>
    </section>
  `;
}

function navigateWithCategoryFilter(categoryId) {
  sessionStorage.setItem('samadhan_active_filter_category', categoryId);
  window.location.hash = '#explore';
}
