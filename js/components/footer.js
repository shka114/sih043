// ==========================================================================
// SAMADHAN SETU — Footer Component
// ==========================================================================

function renderFooter() {
  return `
    <footer class="bg-[#1C2421] text-[#E2E8F0] pt-16 pb-12 border-t border-[#334155] relative overflow-hidden">
      
      <!-- Subtle tribal border accent at top of footer -->
      <div class="tribal-border-top h-1 w-full absolute top-0 left-0 right-0"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Top Footer Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#334155]/60">
          
          <!-- Column 1 & 2: Brand Identity -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C25E30] to-[#D97706] flex items-center justify-center text-white shadow-md">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M4 19V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10"></path>
                  <path d="M4 14c4-3 12-3 16 0"></path>
                  <circle cx="12" cy="7" r="1.5" fill="currentColor"></circle>
                </svg>
              </div>
              <div>
                <span class="font-extrabold text-2xl tracking-tight text-white font-heading">
                  SAMADHAN SETU
                </span>
                <div class="text-[11px] font-bold uppercase tracking-wider text-[#D97706]">
                  Societal Innovation Collaboration Portal
                </div>
              </div>
            </div>

            <p class="text-sm text-gray-300 font-medium leading-relaxed max-w-sm">
              Connecting Doors to Doors for an Innovative Tomorrow.
            </p>

            <p class="text-xs text-gray-400 leading-relaxed max-w-sm">
              Every problem has a voice. Every solution starts with someone who chooses to act. A problem raised by one person can become an opportunity for collective innovation.
            </p>

            <div class="pt-2 flex items-center gap-2 text-xs font-bold text-[#FDE68A]">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C25E30]"></span>
              <span>Change Starts Within.</span>
            </div>
          </div>

          <!-- Column 3: Quick Navigation -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-4 font-mono">
              Platform
            </h4>
            <ul class="space-y-2.5 text-xs text-gray-300">
              <li><a href="#home" class="hover:text-white transition-colors">Home</a></li>
              <li><a href="#explore" class="hover:text-white transition-colors">Explore Challenges</a></li>
              <li><a href="#raise-problem" class="hover:text-white transition-colors">Raise a Problem</a></li>
              <li><a href="#collaborate" class="hover:text-white transition-colors">Collaborate</a></li>
              <li><a href="#about" class="hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>

          <!-- Column 4: Stakeholders -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-4 font-mono">
              Stakeholders
            </h4>
            <ul class="space-y-2.5 text-xs text-gray-300">
              <li><a href="#register" class="hover:text-white transition-colors">Citizens & Wards</a></li>
              <li><a href="#register" class="hover:text-white transition-colors">Students & Innovators</a></li>
              <li><a href="#register" class="hover:text-white transition-colors">Universities & Colleges</a></li>
              <li><a href="#register" class="hover:text-white transition-colors">Industry & CSR</a></li>
              <li><a href="#register" class="hover:text-white transition-colors">Institutions & NGOs</a></li>
            </ul>
          </div>

          <!-- Column 5: SIH & Governance -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-4 font-mono">
              Hackathon Context
            </h4>
            <div class="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2 text-xs text-gray-300">
              <div class="font-bold text-white">Smart India Hackathon</div>
              <div class="text-[11px] text-[#FDE68A] font-mono font-semibold">SIH26043</div>
              <p class="text-[11px] text-gray-400 leading-tight">
                Digital Platform to Crowdsource Societal Challenges.
              </p>
            </div>
            <div class="mt-3 flex flex-wrap gap-2 text-[11px] text-gray-400">
              <a href="#about" class="hover:underline">About Us</a> • 
              <a href="#about" class="hover:underline">Contact</a> • 
              <a href="#about" class="hover:underline">Privacy Policy</a> • 
              <a href="#about" class="hover:underline">Terms</a>
            </div>
          </div>

        </div>

        <!-- Bottom Copyright & Tribute -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center sm:text-left">
          <div>
            © 2026 <strong>Samadhan Setu</strong>. Built for Social Innovation • Smart India Hackathon.
          </div>
          <div class="flex items-center gap-2">
            <span>Subtly inspired by Jharkhand's rich heritage, forests, and communities.</span>
          </div>
        </div>

      </div>
    </footer>
  `;
}
