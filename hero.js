// ==========================================================================
// SAMADHAN SETU — Hero Section Component
// ==========================================================================

function renderHero() {
  const journeySteps = [
    { label: "Community Problem", icon: "alert-circle", color: "text-[#C25E30]" },
    { label: "Shared Knowledge", icon: "book-open", color: "text-[#D97706]" },
    { label: "Collaboration", icon: "users-2", color: "text-[#7C3AED]" },
    { label: "Innovation", icon: "cpu", color: "text-[#0284C7]" },
    { label: "Real-World Impact", icon: "award", color: "text-[#24543D]" }
  ];

  return `
    <section class="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#FAF8F5]">
      
      <!-- Background Subtle Tribal Geometric Watermark Grid -->
      <div class="absolute inset-0 bg-tribal-subtle opacity-40 pointer-events-none"></div>

      <!-- Glowing ambient blur patches -->
      <div class="absolute top-10 left-1/4 w-96 h-96 bg-[#C25E30]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-10 right-1/4 w-96 h-96 bg-[#24543D]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Hero Grid: Text & Visual Illustration -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Column: Copy & Actions (7 Cols) -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <!-- Public Impact Badges -->
            <div class="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF2ED] border border-[#E8D0C3] shadow-sm">
                <span class="w-2 h-2 rounded-full bg-[#C25E30] animate-ping"></span>
                <span class="text-xs font-bold uppercase tracking-wider text-[#A1461D]">
                  Smart India Hackathon • SIH26043
                </span>
              </div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBF3EE] border border-[#C4DCCE] text-xs font-semibold text-[#24543D]">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#24543D]"></i>
                <span>Grassroots Crowdsourcing Portal</span>
              </div>
            </div>

            <!-- Main Heading -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1C2421] leading-[1.12] font-heading">
              Connecting Doors to Doors for an <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#C25E30] via-[#D97706] to-[#24543D]">Innovative Tomorrow.</span>
            </h1>

            <!-- Supporting Description -->
            <p class="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              From a problem in your community to a solution on the ground — <strong class="text-[#1C2421] font-semibold">Samadhan Setu</strong> connects citizens, innovators, universities, institutions and industries to turn societal challenges into meaningful action.
            </p>

            <!-- Action Buttons (Phase 1 & 2 Connected) -->
            <div class="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#raise-problem" class="btn-primary-setu w-full sm:w-auto px-8 py-3.5 text-base flex items-center justify-center gap-2 group">
                <i data-lucide="plus-circle" class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"></i>
                <span>Raise a Problem</span>
              </a>
              <a href="#explore" class="btn-secondary-setu w-full sm:w-auto px-8 py-3.5 text-base flex items-center justify-center gap-2">
                <i data-lucide="compass" class="w-5 h-5"></i>
                <span>Explore Problems</span>
              </a>
            </div>

            <!-- Impact Statement Badge -->
            <div class="pt-1 flex items-center justify-center lg:justify-start gap-3">
              <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#24543D]">
                <span class="inline-block w-2 h-2 rotate-45 bg-[#C25E30]"></span>
                <span>Change Starts Within.</span>
                <span class="inline-block w-2 h-2 rotate-45 bg-[#24543D]"></span>
              </div>
              <span class="text-xs text-[#64748B] hidden sm:inline">•</span>
              <span class="text-xs text-[#64748B] hidden sm:inline">Every voice powers collective innovation</span>
            </div>

          </div>

          <!-- Right Column: Custom Jharkhand-Inspired Illustration (5 Cols) -->
          <div class="lg:col-span-5">
            ${renderHeroIllustration()}
          </div>

        </div>

        <!-- ================================================================= -->
        <!-- Subtle Animated Journey Timeline -->
        <!-- ================================================================= -->
        <div class="mt-14 pt-8 border-t border-[#EAE3D9]">
          <div class="text-center mb-5">
            <span class="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              The Lifecycle of Societal Innovation
            </span>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto">
            ${journeySteps.map((step, idx) => `
              <div class="journey-step-badge bg-white/80 border border-[#E5DFD7] p-3.5 rounded-xl text-center shadow-xs card-hover-lift flex flex-col items-center">
                <div class="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#EFE8DF] flex items-center justify-center mb-2">
                  <i data-lucide="${step.icon}" class="w-5 h-5 ${step.color}"></i>
                </div>
                <div class="text-[11px] font-mono text-[#94A3B8] font-semibold mb-0.5">STEP 0${idx + 1}</div>
                <div class="text-xs font-bold text-[#1C2421]">${step.label}</div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </section>
  `;
}
