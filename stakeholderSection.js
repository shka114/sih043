// ==========================================================================
// SAMADHAN SETU — Stakeholder Connection Component (Phase 3)
// Clean, simple cards explaining what each stakeholder can do
// ==========================================================================

const STAKEHOLDER_ROLES = [
  {
    role: "Citizens",
    action: "Report problems and share local knowledge.",
    desc: "Point out real daily challenges in drinking water, schools, roads or sanitation directly from your village or ward.",
    icon: "users"
  },
  {
    role: "Students & Innovators",
    action: "Build and test solutions.",
    desc: "Apply technical skills in engineering, mobile software, hardware and design to tackle verified community issues.",
    icon: "laptop"
  },
  {
    role: "Universities & Faculty",
    action: "Provide research and expertise.",
    desc: "Guide student final-year capstone projects, provide laboratory testing, and authenticate problem feasibility.",
    icon: "graduation-cap"
  },
  {
    role: "Grassroots NGOs",
    action: "Support field implementation.",
    desc: "Coordinate ground trials with Self Help Groups (SHGs) and facilitate community adoption.",
    icon: "heart-handshake"
  },
  {
    role: "Government & District Bodies",
    action: "Adopt verified solutions for district scaling.",
    desc: "Review validated low-cost models for Panchayat and block-level integration.",
    icon: "landmark"
  },
  {
    role: "Industry & Mentors",
    action: "Provide CSR funding, tools and technical mentorship.",
    desc: "Support high-impact prototypes with technical guidance and hardware resources.",
    icon: "building"
  },
  {
    role: "Local Communities",
    action: "Validate ground impact and maintain local ownership.",
    desc: "Ensure deployed tools are maintained and utilized for lasting public benefit.",
    icon: "home"
  }
];

function renderStakeholderSection() {
  return `
    <section class="py-16 bg-[#FAF8F5] border-t border-[#EAE3D9]" id="stakeholders-section">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        
        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span class="text-xs font-bold uppercase tracking-widest text-[#24543D] bg-[#EBF3EE] px-3 py-1 rounded-full border border-[#C4DCCE]">
            Who Can Participate
          </span>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#1C2421] font-heading">
            Stakeholder Connection
          </h2>
          <p class="text-xs sm:text-sm text-[#556987]">
            Samadhan Setu is designed as an open collaborative bridge where different groups contribute according to their strengths.
          </p>
        </div>

        <!-- Stakeholder Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${STAKEHOLDER_ROLES.map(st => `
            <div class="bg-white p-4 rounded-xl border border-[#E5DFD7] hover:border-[#C25E30] transition-colors shadow-2xs flex flex-col justify-between space-y-2.5">
              <div>
                <div class="w-8 h-8 rounded-lg bg-[#FAF2ED] text-[#C25E30] flex items-center justify-center mb-2">
                  <i data-lucide="${st.icon}" class="w-4 h-4"></i>
                </div>
                <h3 class="text-sm font-bold text-[#1C2421] font-heading">${st.role}</h3>
                <div class="text-xs font-semibold text-[#24543D] mt-0.5">"${st.action}"</div>
                <p class="text-[11px] text-[#64748B] mt-1.5 leading-relaxed">${st.desc}</p>
              </div>

              <div class="pt-2 border-t border-gray-100">
                <a href="#collaborate" class="text-[11px] font-semibold text-[#C25E30] hover:underline flex items-center gap-1">
                  <span>Join as ${st.role.split(' ')[0]}</span>
                  <i data-lucide="arrow-right" class="w-3 h-3"></i>
                </a>
              </div>
            </div>
          `).join('')}

          <!-- Quick Action Card -->
          <div class="bg-[#FAF2ED] p-4 rounded-xl border border-[#E8D0C3] flex flex-col justify-between text-center space-y-2">
            <div>
              <span class="text-xs font-bold text-[#C25E30] uppercase font-mono">Ready to Act?</span>
              <h4 class="text-sm font-bold text-[#1C2421] mt-1">Join the Network</h4>
              <p class="text-[11px] text-[#64748B] mt-1">Choose a community challenge and propose your ideas.</p>
            </div>
            <a href="#explore" class="btn-primary-setu py-1.5 text-xs font-semibold">
              Explore Problems
            </a>
          </div>

        </div>

      </div>
    </section>
  `;
}
