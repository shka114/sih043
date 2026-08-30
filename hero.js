// ==========================================================================
// SAMADHAN SETU — Upgraded Hero Section Component (SIH 2026)
// Features Personalized Persona Welcome Hub, Live Search, Trending Tags & 5-Stage Journey
// ==========================================================================

function renderHero() {
  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

  const journeySteps = [
    { label: "1. Community Problem", sub: "Citizen Voice", icon: "alert-circle", color: "text-[#C25E30]", bg: "bg-[#FAF2ED]" },
    { label: "2. AI Domain Triage", sub: "Gemini Auto-Sort", icon: "sparkles", color: "text-[#D97706]", bg: "bg-[#FEF3C7]" },
    { label: "3. HEI Multidisciplinary R&D", sub: "Student & Faculty", icon: "graduation-cap", color: "text-[#7C3AED]", bg: "bg-[#EDE9FE]" },
    { label: "4. Industry & CSR Co-Funding", sub: "Scale & Resources", icon: "building", color: "text-[#0284C7]", bg: "bg-[#E0F2FE]" },
    { label: "5. Ground Implementation", sub: "Last-Mile Impact", icon: "award", color: "text-[#24543D]", bg: "bg-[#EBF3EE]" }
  ];

  const popularTopics = [
    { name: "Fluoride Water (Chauparan)", query: "water" },
    { name: "Solar Pumps (Latehar)", query: "solar" },
    { name: "Digital School Box", query: "education" },
    { name: "Dokra Metal Craft (Khunti)", query: "craft" },
    { name: "Tomato Cold Storage (Bishunpur)", query: "storage" },
    { name: "Market Waste (Bundu)", query: "waste" }
  ];

  return `
    <section class="relative pt-6 pb-14 md:pt-10 md:pb-18 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6EEE5]/60 to-[#FAF8F5]">
      
      <!-- Subtle Background Watermarks & Glowing Ambient Patches -->
      <div class="absolute inset-0 bg-tribal-subtle opacity-35 pointer-events-none"></div>
      <div class="absolute top-6 left-1/4 w-[500px] h-[500px] bg-[#C25E30]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div class="absolute bottom-6 right-1/4 w-[500px] h-[500px] bg-[#24543D]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style="animation-delay: 2s;"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Top Status Bar: Announcement & Authenticated Role Banner -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div class="flex flex-wrap items-center gap-2">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF2ED] border border-[#E8D0C3] shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-[#C25E30] animate-ping"></span>
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#A1461D]">
                Smart India Hackathon • SIH26043
              </span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBF3EE] border border-[#C4DCCE] text-[11px] font-semibold text-[#24543D]">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#24543D]"></i>
              <span>Jharkhand Grassroots Innovation Grid (24 Districts)</span>
            </div>
          </div>

          ${user ? `
            <!-- Logged-In User Banner Pill -->
            <div class="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#E5DFD7] shadow-2xs text-xs">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span class="text-gray-500">Active Persona:</span>
              <strong class="text-[#1C2421]">${user.name}</strong>
              <span class="text-[10px] font-bold text-[#C25E30] bg-[#FAF2ED] px-2 py-0.5 rounded-full border border-[#E8D0C3]">
                ${user.roleLabel || user.role || 'Member'}
              </span>
            </div>
          ` : `
            <a href="#login" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C25E30] bg-white px-3.5 py-1.5 rounded-full border border-[#E5DFD7] hover:border-[#C25E30] shadow-2xs transition-colors">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-[#C25E30]"></i>
              <span>6 Stakeholder Roles Available • Sign In</span>
            </a>
          `}
        </div>

        <!-- Main Hero 2-Column Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <!-- Left Column: Copy, Search & Actions (7 Cols) -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <!-- Main Heading -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#1C2421] leading-[1.12] font-heading">
              Connecting Doors to Doors for an <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#C25E30] via-[#D97706] to-[#24543D]">Innovative Tomorrow.</span>
            </h1>

            <!-- Supporting Paragraph -->
            <p class="text-sm sm:text-base md:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              A public-impact digital platform bridging rural citizens facing grassroots challenges with universities, student innovators, CSR funds, and government nodal teams to crowdsource and deploy solutions.
            </p>

            <!-- Personalized Persona Quick-Action Hub if Logged In -->
            ${user ? `
              <div class="p-4 bg-gradient-to-r from-white via-[#FAF2ED]/60 to-white rounded-2xl border border-[#E8D0C3] shadow-xs text-left space-y-2.5">
                <div class="flex items-center justify-between text-xs">
                  <div class="font-bold text-[#1C2421] flex items-center gap-2">
                    <span>👋 Welcome back, <strong>${user.name}</strong></span>
                    <span class="text-[10px] text-gray-500 font-mono">(${user.org || 'Jharkhand Network'})</span>
                  </div>
                  <span class="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                    Live Session Active
                  </span>
                </div>
                <div class="flex flex-wrap gap-2 text-xs">
                  ${user.role === 'citizen' ? `
                    <a href="#raise-problem" class="btn-primary-setu px-4 py-2 text-xs font-bold flex items-center gap-1.5">
                      <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i>
                      <span>Submit New Problem</span>
                    </a>
                    <a href="#my-contributions" class="btn-secondary-setu px-3.5 py-2 text-xs font-semibold">
                      My Reported Issues
                    </a>
                    <a href="#tracking" class="px-3.5 py-2 text-xs font-semibold text-[#24543D] bg-[#EBF3EE] rounded-xl border border-[#C4DCCE] hover:bg-[#D5E6DC]">
                      Track Solutions
                    </a>
                  ` : user.role === 'student' ? `
                    <a href="#explore" class="btn-primary-setu px-4 py-2 text-xs font-bold flex items-center gap-1.5">
                      <i data-lucide="compass" class="w-3.5 h-3.5"></i>
                      <span>Browse Open Challenges</span>
                    </a>
                    <a href="#propose-solution?id=PRB-104" class="btn-secondary-setu px-3.5 py-2 text-xs font-semibold">
                      Propose Solution
                    </a>
                    <a href="#collaborate" class="px-3.5 py-2 text-xs font-semibold text-[#24543D] bg-[#EBF3EE] rounded-xl border border-[#C4DCCE]">
                      Join Multidisciplinary Team
                    </a>
                  ` : user.role === 'university' ? `
                    <a href="#collaborate" class="btn-primary-setu px-4 py-2 text-xs font-bold flex items-center gap-1.5">
                      <i data-lucide="users-2" class="w-3.5 h-3.5"></i>
                      <span>Adopt Challenge Track</span>
                    </a>
                    <a href="#explore" class="btn-secondary-setu px-3.5 py-2 text-xs font-semibold">
                      Review Problem Statements
                    </a>
                    <a href="#tracking" class="px-3.5 py-2 text-xs font-semibold text-[#24543D] bg-[#EBF3EE] rounded-xl border border-[#C4DCCE]">
                      Monitor Student Projects
                    </a>
                  ` : user.role === 'industry' ? `
                    <a href="#collaborate" class="btn-primary-setu px-4 py-2 text-xs font-bold flex items-center gap-1.5">
                      <i data-lucide="building" class="w-3.5 h-3.5"></i>
                      <span>Sponsor / CSR Co-Funding</span>
                    </a>
                    <a href="#explore" class="btn-secondary-setu px-3.5 py-2 text-xs font-semibold">
                      Explore Tested Prototypes
                    </a>
                  ` : `
                    <a href="#raise-problem" class="btn-primary-setu px-4 py-2 text-xs font-bold">
                      Raise a Problem
                    </a>
                    <a href="#explore" class="btn-secondary-setu px-3.5 py-2 text-xs font-semibold">
                      Explore Directory
                    </a>
                    <a href="#tracking" class="px-3.5 py-2 text-xs font-semibold text-[#24543D] bg-[#EBF3EE] rounded-xl border border-[#C4DCCE]">
                      Lifecycle Tracker
                    </a>
                  `}
                </div>
              </div>
            ` : ''}

            <!-- Interactive Live Search Bar in Hero -->
            <div class="pt-1 max-w-xl mx-auto lg:mx-0">
              <form onsubmit="handleHeroSearch(event)" class="relative flex items-center bg-white p-1.5 rounded-2xl border-2 border-[#E5DFD7] focus-within:border-[#C25E30] shadow-md transition-all">
                <i data-lucide="search" class="w-5 h-5 text-gray-400 ml-3 shrink-0"></i>
                <input type="text" 
                       id="hero-search-input" 
                       placeholder="Search problems (e.g. fluoride water, Latehar, solar, cold storage)..." 
                       class="w-full px-3 py-2 text-xs sm:text-sm text-[#1C2421] bg-transparent focus:outline-none placeholder:text-gray-400" />
                <button type="submit" class="btn-primary-setu px-5 py-2.5 text-xs font-bold shrink-0 flex items-center gap-1.5 cursor-pointer">
                  <span>Search</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </button>
              </form>

              <!-- Quick Topic Filter Pills -->
              <div class="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-2.5 text-[11px]">
                <span class="text-gray-500 font-medium">Trending Challenges:</span>
                ${popularTopics.map(t => `
                  <button type="button" 
                          onclick="triggerQuickSearch('${t.query}')"
                          class="px-2.5 py-0.5 bg-white/80 hover:bg-[#FAF2ED] text-[#475569] hover:text-[#C25E30] border border-[#E5DFD7] hover:border-[#E8D0C3] rounded-full transition-colors cursor-pointer text-[10.5px]">
                    ${t.name}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- General Action Buttons for Personas -->
            ${!user ? `
              <div class="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <a href="#raise-problem" class="btn-primary-setu w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 group shadow-md">
                  <i data-lucide="plus-circle" class="w-4 h-4 group-hover:rotate-90 transition-transform duration-300"></i>
                  <span>Raise a Problem (Citizen)</span>
                </a>
                <a href="#explore" class="btn-secondary-setu w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
                  <i data-lucide="compass" class="w-4 h-4"></i>
                  <span>Explore Challenges</span>
                </a>
                <a href="#login" class="px-5 py-3 text-xs font-bold text-[#24543D] hover:text-[#173828] bg-[#EBF3EE] hover:bg-[#D5E6DC] border border-[#C4DCCE] rounded-xl transition-all flex items-center justify-center gap-1.5">
                  <i data-lucide="users" class="w-4 h-4"></i>
                  <span>Stakeholder Sign In</span>
                </a>
              </div>
            ` : ''}

            <!-- Impact Footnote -->
            <div class="pt-1 flex items-center justify-center lg:justify-start gap-3">
              <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#24543D]">
                <span class="inline-block w-1.5 h-1.5 rotate-45 bg-[#C25E30]"></span>
                <span>Change Starts Within.</span>
                <span class="inline-block w-1.5 h-1.5 rotate-45 bg-[#24543D]"></span>
              </div>
              <span class="text-xs text-[#64748B] hidden sm:inline">•</span>
              <span class="text-xs text-[#64748B] hidden sm:inline">24 Districts • Multidisciplinary HEIs</span>
            </div>

          </div>

          <!-- Right Column: Visual Jharkhand Cultural Illustration (5 Cols) -->
          <div class="lg:col-span-5">
            ${renderHeroIllustration()}
          </div>

        </div>

        <!-- ================================================================= -->
        <!-- 5-Stage Societal Innovation Journey Track -->
        <!-- ================================================================= -->
        <div class="mt-12 pt-8 border-t border-[#EAE3D9]">
          <div class="text-center mb-4">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#64748B] bg-white px-3.5 py-1 rounded-full border border-[#EAE3D9] shadow-2xs">
              How Samadhan Setu Works • 5-Stage Public Impact Journey
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-5xl mx-auto">
            ${journeySteps.map((step, idx) => `
              <div class="bg-white border border-[#E5DFD7] p-3.5 rounded-2xl text-center shadow-xs card-hover-lift flex flex-col items-center justify-between">
                <div class="w-9 h-9 rounded-xl ${step.bg} border border-[#E5DFD7] flex items-center justify-center mb-2 ${step.color} shadow-2xs">
                  <i data-lucide="${step.icon}" class="w-4 h-4"></i>
                </div>
                <div class="space-y-0.5">
                  <div class="text-xs font-bold text-[#1C2421] leading-snug">${step.label}</div>
                  <div class="text-[10px] text-gray-500 font-medium">${step.sub}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </section>
  `;
}

function handleHeroSearch(e) {
  e.preventDefault();
  const query = document.getElementById('hero-search-input')?.value.trim() || '';
  if (query) {
    sessionStorage.setItem('samadhan_search_query', query);
  }
  window.location.hash = "#explore";
}

function triggerQuickSearch(term) {
  sessionStorage.setItem('samadhan_search_query', term);
  window.location.hash = "#explore";
}

