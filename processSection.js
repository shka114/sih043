// ==========================================================================
// SAMADHAN SETU — 4-Step Process Section Component
// ==========================================================================

function renderProcessSection() {
  const steps = [
    {
      num: "01",
      title: "SPEAK",
      subtitle: "Identify & Raise",
      desc: "Citizens identify and raise real societal challenges from their villages, wards, and towns with photos, audio, and community verification.",
      icon: "megaphone",
      color: "from-[#C25E30] to-[#E67E22]",
      badgeColor: "bg-[#FAF2ED] text-[#C25E30] border-[#E8D0C3]"
    },
    {
      num: "02",
      title: "CONNECT",
      subtitle: "Discover & Match",
      desc: "Relevant students, universities, research labs, NGOs, and industries discover those challenges through domain-specific AI matching.",
      icon: "network",
      color: "from-[#D97706] to-[#F59E0B]",
      badgeColor: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]"
    },
    {
      num: "03",
      title: "COLLABORATE",
      subtitle: "Co-create & Build",
      desc: "Multi-disciplinary stakeholders work together, share open knowledge, test field prototypes, and refine scalable technical solutions.",
      icon: "users-2",
      color: "from-[#7C3AED] to-[#9333EA]",
      badgeColor: "bg-[#EDE9FE] text-[#6B21A8] border-[#DDD6FE]"
    },
    {
      num: "04",
      title: "IMPACT",
      subtitle: "Deploy & Transform",
      desc: "Successful, validated ideas move toward on-the-ground implementation, district administration scaling, and measurable public impact.",
      icon: "award",
      color: "from-[#24543D] to-[#10B981]",
      badgeColor: "bg-[#EBF3EE] text-[#173828] border-[#C4DCCE]"
    }
  ];

  return `
    <section class="py-20 bg-white border-y border-[#EAE3D9] relative overflow-hidden">
      
      <!-- Subtle Tribal Pattern Strip at top -->
      <div class="tribal-divider mb-8">
        <div class="tribal-divider-diamonds">
          <span class="tribal-diamond"></span>
          <span class="tribal-diamond sal"></span>
          <span class="tribal-diamond ochre"></span>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-[#C25E30] bg-[#FAF2ED] px-3.5 py-1 rounded-full border border-[#E8D0C3]">
            How Samadhan Setu Operates
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-[#1C2421] font-heading">
            Every Challenge Deserves a Chance to Become a Solution.
          </h2>
          <p class="text-base text-[#64748B] font-normal leading-relaxed">
            Our 4-stage public collaboration framework ensures problems don’t remain stranded as complaints — they evolve into structured, community-backed innovation projects.
          </p>
        </div>

        <!-- 4-Step Connected Process Flow Grid -->
        <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <!-- Background Connecting Arrow Line (Desktop) -->
          <div class="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-[#C25E30] via-[#D97706] via-[#7C3AED] to-[#24543D] -translate-y-12 z-0 opacity-40"></div>

          ${steps.map((s, idx) => `
            <div class="relative z-10 flex flex-col bg-[#FAF8F5] border border-[#E6DED2] rounded-2xl p-6 shadow-xs card-hover-lift group">
              
              <!-- Step Header: Number & Icon -->
              <div class="flex items-center justify-between mb-5">
                <span class="text-3xl font-extrabold font-mono text-[#1C2421]/30 group-hover:text-[#C25E30] transition-colors">
                  ${s.num}
                </span>
                <div class="w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                  <i data-lucide="${s.icon}" class="w-7 h-7"></i>
                </div>
              </div>

              <!-- Step Title -->
              <div class="mb-2">
                <span class="inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${s.badgeColor} mb-1 border">
                  ${s.subtitle}
                </span>
                <h3 class="text-xl font-bold text-[#1C2421] font-heading">
                  ${s.title}
                </h3>
              </div>

              <!-- Step Description -->
              <p class="text-sm text-[#64748B] leading-relaxed flex-grow">
                ${s.desc}
              </p>

              <!-- Step Action Link -->
              <div class="mt-6 pt-4 border-t border-[#EAE3D9] flex items-center justify-between text-xs font-bold text-[#24543D] group-hover:text-[#C25E30] transition-colors">
                <span>Phase ${idx + 1} Pathway</span>
                <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
              </div>

            </div>
          `).join('')}

        </div>

        <!-- Flow Summary Box -->
        <div class="mt-12 p-4 bg-[#FAF6F0] rounded-xl border border-[#E5DFD7] max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#24543D] text-white flex items-center justify-center shrink-0">
              <i data-lucide="sparkles" class="w-5 h-5"></i>
            </div>
            <div>
              <h4 class="text-sm font-bold text-[#1C2421]">A Problem Raised is Half the Solution</h4>
              <p class="text-xs text-[#64748B]">Bridging local knowledge with institutional R&D capacity.</p>
            </div>
          </div>
          <a href="#raise-problem" class="btn-primary-setu text-xs px-4 py-2 shrink-0">
            Submit Your Area's Challenge
          </a>
        </div>

      </div>
    </section>
  `;
}
