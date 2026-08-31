// ==========================================================================
// SAMADHAN SETU — Upgraded Impact & District Innovation Explorer (SIH 2026)
// Features Live Platform Metrics, Interactive Jharkhand District GIS Selector
// ==========================================================================

let activeSelectedDistrict = "Hazaribagh";

const JHARKHAND_DISTRICTS_DATA = [
  {
    id: "Hazaribagh",
    name: "Hazaribagh",
    challengesCount: 142,
    activePilots: 18,
    partnerUniv: "NIT Jamshedpur / CSIR-CIMFR",
    topFocus: "Groundwater Fluoride & Forest Ecology",
    sampleIssue: "High fluoride handpumps in Chauparan (PRB-101)",
    status: "Active Pilot Deployed"
  },
  {
    id: "Latehar",
    name: "Latehar",
    challengesCount: 118,
    activePilots: 14,
    partnerUniv: "BIT Mesra (Ranchi)",
    topFocus: "Solar Power & Tribal Bilingual Education",
    sampleIssue: "Offline digital school box in Mahuadanr (PRB-102)",
    status: "Prototype Tested"
  },
  {
    id: "Khunti",
    name: "Khunti",
    challengesCount: 96,
    activePilots: 12,
    partnerUniv: "Ranchi University & NID Alum",
    topFocus: "Dokra Craft & Minor Forest Produce",
    sampleIssue: "Direct buyer linkage for metal artisans (PRB-103)",
    status: "Active Pilot Deployed"
  },
  {
    id: "Gumla",
    name: "Gumla",
    challengesCount: 135,
    activePilots: 21,
    partnerUniv: "IIT (ISM) Dhanbad & Gram Vikas",
    topFocus: "Decentralized Agro Cold Storage & Doba",
    sampleIssue: "Tomato post-harvest cold room in Bishunpur (PRB-105)",
    status: "Resolved / In Daily Use"
  },
  {
    id: "Ranchi",
    name: "Ranchi",
    challengesCount: 284,
    activePilots: 35,
    partnerUniv: "Ranchi Univ, BIT Lalpur, NIFFT",
    topFocus: "Peri-Urban Solid Waste & Telemedicine",
    sampleIssue: "Decentralized weekly market composting in Bundu (PRB-104)",
    status: "Looking for Solvers"
  },
  {
    id: "Dhanbad",
    name: "Dhanbad",
    challengesCount: 165,
    activePilots: 24,
    partnerUniv: "IIT (ISM) Dhanbad & BCCL CSR",
    topFocus: "Mine Water Treatment & Clean Air Tech",
    sampleIssue: "Water reclamation from abandoned open-cast pits",
    status: "R&D Proposed"
  },
  {
    id: "East-Singhbhum",
    name: "East Singhbhum (Jamshedpur)",
    challengesCount: 178,
    activePilots: 29,
    partnerUniv: "NIT Jamshedpur & Tata Steel Foundation",
    topFocus: "Tribal Youth Tech Upskilling & Maternal Health",
    sampleIssue: "Mobile health diagnostic vans for remote tolas",
    status: "Active Pilot Deployed"
  },
  {
    id: "Palamu",
    name: "Palamu",
    challengesCount: 110,
    activePilots: 11,
    partnerUniv: "Nilamber-Pitamber University",
    topFocus: "Drought-Resilient Millet Farming & Micro-Check Dams",
    sampleIssue: "Solar drip irrigation for smallholder pulse farmers",
    status: "Under Review"
  }
];

function selectDistrict(distId) {
  activeSelectedDistrict = distId;
  const distObj = JHARKHAND_DISTRICTS_DATA.find(d => d.id === distId) || JHARKHAND_DISTRICTS_DATA[0];
  const container = document.getElementById('district-details-display');
  if (container) {
    container.innerHTML = renderDistrictDetailContent(distObj);
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // Update button active state classes
  document.querySelectorAll('.district-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-dist') === distId) {
      btn.className = "district-tab-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-[#C25E30] text-white shadow-2xs transition-all";
    } else {
      btn.className = "district-tab-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF8F5] text-[#475569] hover:bg-[#FAF2ED] hover:text-[#C25E30] border border-[#E5DFD7] transition-all";
    }
  });
}

function renderDistrictDetailContent(dist) {
  return `
    <div class="bg-gradient-to-br from-white to-[#FAF8F5] p-5 rounded-2xl border border-[#E5DFD7] space-y-4 shadow-2xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE3D9] pb-3">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-xl font-bold text-[#1C2421] font-heading">${dist.name} District</h3>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              ${dist.status}
            </span>
          </div>
          <p class="text-xs text-[#64748B] pt-0.5">Priority Domain: <strong class="text-[#1C2421]">${dist.topFocus}</strong></p>
        </div>
        <button onclick="triggerDistrictExplore('${dist.name}')" class="btn-primary-setu px-4 py-1.5 text-xs font-bold flex items-center gap-1 self-start sm:self-auto cursor-pointer">
          <span>View ${dist.name} Challenges</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        <div class="bg-[#FAF8F5] p-3 rounded-xl border border-[#E5DFD7] space-y-0.5">
          <span class="text-[10px] uppercase font-mono text-gray-500">Challenges Cataloged</span>
          <div class="text-xl font-extrabold text-[#C25E30] font-heading">${dist.challengesCount}+</div>
        </div>
        <div class="bg-[#FAF8F5] p-3 rounded-xl border border-[#E5DFD7] space-y-0.5">
          <span class="text-[10px] uppercase font-mono text-gray-500">Active Field Pilots</span>
          <div class="text-xl font-extrabold text-[#24543D] font-heading">${dist.activePilots} Deployments</div>
        </div>
        <div class="bg-[#FAF8F5] p-3 rounded-xl border border-[#E5DFD7] space-y-0.5 col-span-2 sm:col-span-1">
          <span class="text-[10px] uppercase font-mono text-gray-500">Lead Academic / HEI Node</span>
          <div class="text-xs font-bold text-[#1C2421] truncate">${dist.partnerUniv}</div>
        </div>
      </div>

      <div class="p-3 bg-[#FAF2ED] rounded-xl border border-[#E8D0C3] flex items-center justify-between text-xs">
        <div class="flex items-center gap-2 text-[#1C2421]">
          <i data-lucide="compass" class="w-4 h-4 text-[#C25E30] shrink-0"></i>
          <span>Featured Grassroots Problem: <strong>"${dist.sampleIssue}"</strong></span>
        </div>
      </div>
    </div>
  `;
}

function triggerDistrictExplore(districtName) {
  sessionStorage.setItem('samadhan_search_query', districtName);
  window.location.hash = "#explore";
}

function renderImpactStats() {
  const currentDist = JHARKHAND_DISTRICTS_DATA.find(d => d.id === activeSelectedDistrict) || JHARKHAND_DISTRICTS_DATA[0];

  const primaryStats = [
    { label: "Challenges Cataloged", value: "1,250+", desc: "Real problems submitted from rural blocks & wards", icon: "flag", color: "text-[#C25E30]", bg: "bg-[#FAF2ED]" },
    { label: "Districts Verified", value: "24", desc: "100% Jharkhand geographic coverage", icon: "map", color: "text-[#24543D]", bg: "bg-[#EBF3EE]" },
    { label: "Partner Universities", value: "48+", desc: "HEIs, engineering colleges & research labs", icon: "graduation-cap", color: "text-[#D97706]", bg: "bg-[#FEF3C7]" },
    { label: "Solutions in Progress", value: "180+", desc: "Prototypes actively field-tested with CSR backing", icon: "award", color: "text-[#0284C7]", bg: "bg-[#E0F2FE]" }
  ];

  return `
    <section class="py-16 bg-white border-t border-[#EAE3D9] relative overflow-hidden" id="impact-section">
      
      <!-- Ambient Background Dots -->
      <div class="absolute inset-0 bg-tribal-subtle opacity-25 pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Top Section Header -->
        <div class="text-center max-w-3xl mx-auto space-y-2.5">
          <span class="text-xs font-bold uppercase tracking-widest text-[#C25E30] bg-[#FAF2ED] px-3.5 py-1 rounded-full border border-[#E8D0C3]">
            Measurable Societal Progress
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-[#1C2421] font-heading">
            Jharkhand Innovation Grid & Impact Metrics
          </h2>
          <p class="text-xs sm:text-sm text-[#556987]">
            Real-time tracking of crowdsourced challenges, academic partnerships, and verified grassroots field deployments.
          </p>
        </div>

        <!-- 4 Primary Stat Cards Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${primaryStats.map(st => `
            <div class="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E5DFD7] shadow-xs card-hover-lift flex flex-col justify-between space-y-3">
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-xl ${st.bg} ${st.color} flex items-center justify-center shadow-2xs">
                  <i data-lucide="${st.icon}" class="w-5 h-5"></i>
                </div>
                <span class="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-white text-[#24543D] border border-[#E5DFD7]">
                  LIVE DATA
                </span>
              </div>
              <div>
                <div class="text-2xl sm:text-3xl font-extrabold text-[#1C2421] font-heading">
                  ${st.value}
                </div>
                <div class="text-xs font-bold text-[#C25E30] uppercase font-mono pt-0.5">
                  ${st.label}
                </div>
                <p class="text-[11px] text-[#64748B] pt-1 leading-snug">
                  ${st.desc}
                </p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- ================================================================= -->
        <!-- Interactive Jharkhand District Innovation Explorer (GIS Visualizer) -->
        <!-- ================================================================= -->
        <div class="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#E5DFD7] space-y-6 shadow-sm">
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#EAE3D9] pb-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-base">📍</span>
                <h3 class="text-xl font-extrabold text-[#1C2421] font-heading">
                  Interactive District Innovation Directory
                </h3>
              </div>
              <p class="text-xs text-[#64748B] pt-0.5">
                Select a Jharkhand district to inspect active problems, assigned academic incubators, and deployed solutions.
              </p>
            </div>
            <div class="text-xs text-[#24543D] font-bold bg-[#EBF3EE] px-3 py-1 rounded-xl border border-[#C4DCCE] self-start md:self-auto">
              24 Districts Synchronized
            </div>
          </div>

          <!-- District Selector Tabs -->
          <div class="flex flex-wrap items-center gap-1.5">
            ${JHARKHAND_DISTRICTS_DATA.map(d => `
              <button type="button" 
                      data-dist="${d.id}"
                      onclick="selectDistrict('${d.id}')"
                      class="district-tab-btn px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                        activeSelectedDistrict === d.id 
                          ? 'font-bold bg-[#C25E30] text-white shadow-2xs' 
                          : 'font-semibold bg-white text-[#475569] hover:bg-[#FAF2ED] hover:text-[#C25E30] border border-[#E5DFD7]'
                      }">
                ${d.name}
              </button>
            `).join('')}
          </div>

          <!-- District Dynamic Details Container -->
          <div id="district-details-display">
            ${renderDistrictDetailContent(currentDist)}
          </div>

        </div>

        <!-- ================================================================= -->
        <!-- AI Problem Assistant Demo Showcase Card -->
        <!-- ================================================================= -->
        <div class="bg-gradient-to-br from-[#FAF2ED] via-[#FFF9F5] to-[#FAF2ED] p-6 sm:p-8 rounded-3xl border border-[#E8D0C3] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
          <div class="space-y-2 max-w-xl text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#C25E30] border border-[#E8D0C3]">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
              <span>Built-in Google Gemini Intelligence</span>
            </div>
            <h3 class="text-2xl font-extrabold text-[#1C2421] font-heading">
              Instant AI Problem Triage & Solution Synthesis
            </h3>
            <p class="text-xs text-[#64748B] leading-relaxed">
              When citizens submit raw unformatted problems, our Gemini AI engine automatically classifies the domain, assigns urgency severity, extracts keywords, and formulates 3–5 practical solution pathways for students.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <a href="#raise-problem" class="btn-primary-setu px-6 py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md">
              <i data-lucide="cpu" class="w-4 h-4"></i>
              <span>Test AI Assistant Live</span>
            </a>
            <a href="#explore" class="btn-secondary-setu px-6 py-3 text-xs font-bold flex items-center justify-center gap-2">
              <i data-lucide="compass" class="w-4 h-4"></i>
              <span>Explore AI Tagged Issues</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  `;
}
