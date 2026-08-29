// ==========================================================================
// SAMADHAN SETU — About Page Component
// ==========================================================================

function renderAboutPage() {
  return `
    <div class="bg-[#FAF8F5] min-h-screen py-10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Breadcrumb & Header -->
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C25E30]">
            <a href="#home" class="hover:underline">Home</a>
            <span>/</span>
            <span>About</span>
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C2421] font-heading">
            About Samadhan Setu
          </h1>
          <p class="text-lg text-[#C25E30] font-semibold">
            “Connecting Doors to Doors for an Innovative Tomorrow.”
          </p>
        </div>

        <!-- Vision Hero Banner -->
        <div class="bg-gradient-to-br from-[#1C2421] via-[#243E31] to-[#172E23] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div class="absolute inset-0 bg-tribal-dark-subtle opacity-20 pointer-events-none"></div>
          
          <div class="relative z-10 max-w-3xl space-y-6">
            <span class="inline-block px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-[#FDE68A] border border-white/15">
              SIH Problem Statement SIH26043
            </span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight font-heading">
              A problem raised by one person can become an opportunity for collective innovation.
            </h2>
            <p class="text-base text-gray-300 leading-relaxed font-normal">
              Every problem has a voice. Every solution starts with someone who chooses to act. Samadhan Setu was conceptualized to eliminate the traditional disconnect between grassroots citizens experiencing daily hardships and the brilliant technological talent across universities and institutions.
            </p>
            <div class="pt-2 flex items-center gap-3 text-sm font-bold text-[#FDE68A]">
              <span class="w-2 h-2 rounded-full bg-[#C25E30]"></span>
              <span>Change Starts Within.</span>
            </div>
          </div>
        </div>

        <!-- The 3 Core Pillars -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-2xl p-6 border border-[#E6DED2] shadow-xs">
            <div class="w-12 h-12 rounded-xl bg-orange-100 text-[#C25E30] flex items-center justify-center mb-4">
              <i data-lucide="mic" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-bold text-[#1C2421] mb-2 font-heading">01. Citizen Voice</h3>
            <p class="text-xs text-[#64748B] leading-relaxed">
              Empowering every villager, ward member, teacher, and health worker to report societal challenges with authentic multimedia evidence without bureaucratic friction.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-[#E6DED2] shadow-xs">
            <div class="w-12 h-12 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center mb-4">
              <i data-lucide="git-pull-request" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-bold text-[#1C2421] mb-2 font-heading">02. Academic Alignment</h3>
            <p class="text-xs text-[#64748B] leading-relaxed">
              Replacing generic academic demo projects with verified societal challenges. Engineering, medical, and social science students build solutions with immediate real-world utility.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-[#E6DED2] shadow-xs">
            <div class="w-12 h-12 rounded-xl bg-emerald-100 text-[#24543D] flex items-center justify-center mb-4">
              <i data-lucide="award" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-bold text-[#1C2421] mb-2 font-heading">03. Last-Mile Deployment</h3>
            <p class="text-xs text-[#64748B] leading-relaxed">
              Connecting successful student prototypes with industry CSR resources, venture grants, and district administration pathways to ensure permanent ground deployment.
            </p>
          </div>
        </div>

        <!-- Jharkhand Inspiration Narrative -->
        <div class="bg-white rounded-3xl p-8 sm:p-10 border border-[#E6DED2] shadow-xs space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#24543D] text-white flex items-center justify-center">
              <i data-lucide="trees" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-[#24543D]">Cultural & Regional Foundation</span>
              <h3 class="text-2xl font-bold text-[#1C2421] font-heading">Inspired by the Spirit of Jharkhand</h3>
            </div>
          </div>

          <p class="text-sm text-[#475569] leading-relaxed">
            Jharkhand — the land of forests, hills, resilient indigenous communities, and mineral wealth — presents unique societal opportunities. From off-grid forest hamlets in Latehar and Gumla requiring decentralized solar innovations to artisan clusters in Khunti preserving Dokra and Sohrai heritage, Samadhan Setu honors this legacy by blending timeless community solidarity with next-generation digital collaboration.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F1ECE6] text-xs text-[#334155]">
            <div class="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <strong class="text-[#1C2421] block mb-1">Grassroots Problem Crowdsourcing</strong>
              Direct village-level reporting with voice translation in regional tribal dialects.
            </div>
            <div class="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <strong class="text-[#1C2421] block mb-1">Cross-Sector Resource Hub</strong>
              MoU-backed bridges connecting CSIR, NITs, IITs, state departments, and local SHGs.
            </div>
          </div>
        </div>

        <!-- Contact & Team Information -->
        <div class="bg-[#FAF6F0] rounded-2xl p-6 sm:p-8 border border-[#E8D0C3] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="space-y-1 text-center sm:text-left">
            <h4 class="text-base font-bold text-[#1C2421] font-heading">Developed for Smart India Hackathon 2026</h4>
            <p class="text-xs text-[#64748B]">Problem Statement ID: SIH26043 • Team Samadhan Setu</p>
          </div>
          <div class="flex items-center gap-3">
            <a href="#raise-problem" class="btn-primary-setu px-4 py-2 text-xs font-bold">Raise a Challenge</a>
            <a href="#explore" class="btn-secondary-setu px-4 py-2 text-xs font-bold">Explore Challenges</a>
          </div>
        </div>

      </div>
    </div>
  `;
}
