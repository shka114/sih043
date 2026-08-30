// ==========================================================================
// SAMADHAN SETU — Impact Section Component (Phase 3)
// Simple, realistic demo prototype metrics
// ==========================================================================

function renderImpactStats() {
  const demoStats = [
    { label: "Problems Raised", value: "24", desc: "Grassroots issues reported across Jharkhand blocks" },
    { label: "Solutions Proposed", value: "14", desc: "Student & researcher prototype designs submitted" },
    { label: "Active Collaborations", value: "18", desc: "Joint initiatives between colleges and local bodies" },
    { label: "Problems Resolved", value: "6", desc: "Implemented field trials delivering daily impact" }
  ];

  return `
    <section class="py-16 bg-white border-t border-[#EAE3D9]" id="impact-section">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        
        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span class="text-xs font-bold uppercase tracking-widest text-[#C25E30] bg-[#FAF2ED] px-3 py-1 rounded-full border border-[#E8D0C3]">
            Platform Goals & Progress
          </span>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#1C2421] font-heading">
            Platform Impact Overview
          </h2>
          <p class="text-xs sm:text-sm text-[#556987]">
            Sample metrics demonstrating how crowdsourced problems transition into tangible community solutions.
          </p>
          <div class="text-[11px] text-[#64748B] font-mono">
            (Note: Values below represent sample prototype demonstration data)
          </div>
        </div>

        <!-- 4 Simple Stat Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          ${demoStats.map(st => `
            <div class="bg-[#FAF8F5] p-4 sm:p-5 rounded-xl border border-[#E5DFD7] text-center space-y-1">
              <div class="text-2xl sm:text-3xl font-bold text-[#1C2421] font-heading">
                ${st.value}
              </div>
              <div class="text-xs font-bold text-[#C25E30] uppercase font-mono">
                ${st.label}
              </div>
              <p class="text-[11px] text-[#64748B] pt-1 leading-tight">
                ${st.desc}
              </p>
            </div>
          `).join('')}
        </div>

        <!-- Summary Note -->
        <div class="p-4 bg-[#EBF3EE] rounded-xl border border-[#C4DCCE] text-xs text-[#24543D] text-center max-w-2xl mx-auto">
          <strong>The Core Mission:</strong> Connecting problems raised by citizens with students and universities who can build practical, scalable technological solutions.
        </div>

      </div>
    </section>
  `;
}
