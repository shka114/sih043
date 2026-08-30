// ==========================================================================
// SAMADHAN SETU — Main Call-to-Action Section Component
// ==========================================================================

function renderCtaSection() {
  return `
    <section class="py-20 relative overflow-hidden bg-gradient-to-br from-[#24543D] via-[#1C3E2D] to-[#12281D] text-white">
      
      <!-- Subtle tribal geometric background elements -->
      <div class="absolute inset-0 bg-tribal-dark-subtle opacity-25 pointer-events-none"></div>
      
      <!-- Glowing warm orb -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C25E30]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 z-10">
        
        <!-- Small badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-[#FDE68A]">
          <span class="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
          <span>A National Innovation Movement</span>
        </div>

        <!-- Heading -->
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight font-heading max-w-3xl mx-auto">
          Your Problem Could Be Someone’s <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#FED7AA]">Next Innovation.</span>
        </h2>

        <!-- Supporting Text -->
        <p class="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
          Don't let a local challenge remain unheard. Raise it, connect with changemakers and become part of the solution.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a href="#raise-problem" class="btn-primary-setu w-full sm:w-auto px-8 py-4 text-base font-bold flex items-center justify-center gap-2 shadow-lg">
            <i data-lucide="plus-circle" class="w-5 h-5"></i>
            <span>Raise a Problem</span>
          </a>
          
          <a href="#register" class="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
            <i data-lucide="user-plus" class="w-5 h-5"></i>
            <span>Join the Community</span>
          </a>
        </div>

        <!-- Impact Tagline -->
        <div class="pt-6 border-t border-white/15 max-w-md mx-auto">
          <p class="text-xs uppercase tracking-widest text-emerald-200/80 font-bold">
            “Change Starts Within.”
          </p>
        </div>

      </div>
    </section>
  `;
}
