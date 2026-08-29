// ==========================================================================
// SAMADHAN SETU — Custom Jharkhand-Inspired Problem-to-Solution Vector Illustration
// ==========================================================================

function renderHeroIllustration() {
  return `
    <div class="relative w-full aspect-[16/11] max-w-2xl mx-auto select-none rounded-2xl overflow-hidden shadow-2xl border border-[#E6DED2] bg-gradient-to-b from-[#FAF6F0] via-[#F4ECE1] to-[#EAE0D2] p-2">
      
      <!-- Subtle top decorative tribal geometric ribbon inside canvas -->
      <div class="absolute top-2 left-4 right-4 flex items-center justify-between opacity-30 pointer-events-none">
        <div class="flex gap-1.5">
          <span class="w-2 h-2 rotate-45 bg-[#C25E30]"></span>
          <span class="w-2 h-2 rotate-45 bg-[#24543D]"></span>
          <span class="w-2 h-2 rotate-45 bg-[#D97706]"></span>
        </div>
        <span class="text-[10px] uppercase font-mono tracking-widest text-[#24543D] font-bold">Bridging Grassroots To Innovation</span>
        <div class="flex gap-1.5">
          <span class="w-2 h-2 rotate-45 bg-[#D97706]"></span>
          <span class="w-2 h-2 rotate-45 bg-[#24543D]"></span>
          <span class="w-2 h-2 rotate-45 bg-[#C25E30]"></span>
        </div>
      </div>

      <!-- Main Vector Artwork -->
      <svg viewBox="0 0 800 550" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Gradients -->
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FBF8F3"/>
            <stop offset="60%" stop-color="#F2E8DC"/>
            <stop offset="100%" stop-color="#E5D9C8"/>
          </linearGradient>

          <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3D6E54" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#24543D" stop-opacity="0.6"/>
          </linearGradient>

          <linearGradient id="hillGrad2" x1="100%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#D97706" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#8F3C18" stop-opacity="0.5"/>
          </linearGradient>

          <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#C25E30"/>
            <stop offset="50%" stop-color="#D97706"/>
            <stop offset="100%" stop-color="#24543D"/>
          </linearGradient>

          <linearGradient id="pulseBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0D9488" stop-opacity="0"/>
            <stop offset="50%" stop-color="#14B8A6" stop-opacity="1"/>
            <stop offset="100%" stop-color="#22C55E" stop-opacity="0"/>
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Background Sky & Sun -->
        <rect width="800" height="550" fill="url(#skyGrad)"/>
        <circle cx="400" cy="140" r="70" fill="#FEF3C7" opacity="0.6" />
        <circle cx="400" cy="140" r="50" fill="#FDE68A" opacity="0.4" />

        <!-- Distant Chota Nagpur Hills Silhouettes (Left & Center) -->
        <path d="M-20 340 Q 120 220, 260 310 T 520 280 T 820 330 L 820 550 L -20 550 Z" fill="url(#hillGrad1)"/>
        <path d="M-20 370 Q 180 280, 360 360 T 780 340 L 820 550 L -20 550 Z" fill="#24543D" opacity="0.35"/>

        <!-- Sal Forest Trees Silhouette (Left & Far Left) -->
        <!-- Sal Tree 1 -->
        <path d="M 60 360 L 60 260 L 40 240 L 60 210 L 45 190 L 60 160 L 75 190 L 60 210 L 80 240 Z" fill="#1B422F" opacity="0.75"/>
        <path d="M 58 260 L 58 360 L 62 360 L 62 260 Z" fill="#8F3C18"/>
        <!-- Sal Tree 2 -->
        <path d="M 110 370 L 110 280 L 95 260 L 110 235 L 98 215 L 110 190 L 122 215 L 110 235 L 125 260 Z" fill="#24543D" opacity="0.85"/>
        <!-- Sal Tree 3 (Right edge background) -->
        <path d="M 740 370 L 740 270 L 720 250 L 740 220 L 728 200 L 740 175 L 752 200 L 740 220 L 760 250 Z" fill="#1B422F" opacity="0.5"/>

        <!-- ========================================== -->
        <!-- LEFT SIDE: RURAL COMMUNITY & CITIZENS -->
        <!-- ========================================== -->
        <g id="village-community">
          <!-- Village Ground & Path -->
          <path d="M-10 440 Q 120 400, 250 440 L 250 550 L -10 550 Z" fill="#E8D5C1"/>
          
          <!-- Traditional Village Hut 1 -->
          <polygon points="50,420 120,420 85,380" fill="#A1461D" />
          <rect x="58" y="420" width="54" height="40" fill="#D9A377" rx="2"/>
          <rect x="75" y="435" width="20" height="25" fill="#5A2E12" rx="1"/>
          <!-- Tribal Wall Motif on Hut -->
          <circle cx="68" cy="430" r="3" fill="#FAF8F5"/>
          <circle cx="102" cy="430" r="3" fill="#FAF8F5"/>

          <!-- Village Hut 2 -->
          <polygon points="135,430 190,430 162,395" fill="#8F3C18" />
          <rect x="142" y="430" width="42" height="35" fill="#CBB199" rx="2"/>
          <rect x="156" y="442" width="14" height="23" fill="#42200D" rx="1"/>

          <!-- Citizen 1 (Community Voice raising hand) -->
          <g transform="translate(180, 420)">
            <circle cx="15" cy="5" r="7" fill="#C25E30"/>
            <path d="M 15 12 L 15 35 M 8 20 L 22 20 M 15 35 L 8 50 M 15 35 L 22 50" stroke="#C25E30" stroke-width="3" stroke-linecap="round"/>
            <path d="M 22 18 L 30 5" stroke="#C25E30" stroke-width="3" stroke-linecap="round"/>
            <!-- Problem Bubble Indicator -->
            <g class="animate-float-slow" transform="translate(24, -28)">
              <rect x="0" y="0" width="60" height="24" rx="12" fill="#C25E30" filter="url(#glow)" />
              <text x="30" y="16" fill="#FFFFFF" font-size="9" font-weight="bold" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif">PROBLEM</text>
              <polygon points="10,24 16,30 20,24" fill="#C25E30"/>
            </g>
          </g>

          <!-- Citizen 2 & Child -->
          <g transform="translate(90, 440)">
            <circle cx="10" cy="8" r="6" fill="#4B5563"/>
            <path d="M 10 14 L 10 32 M 5 20 L 15 20 M 10 32 L 6 45 M 10 32 L 14 45" stroke="#4B5563" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Child -->
            <circle cx="26" cy="18" r="4.5" fill="#4B5563"/>
            <path d="M 26 23 L 26 36 M 22 28 L 30 28 M 26 36 L 23 45 M 26 36 L 29 45" stroke="#4B5563" stroke-width="2" stroke-linecap="round"/>
          </g>

          <!-- Left Side Label Badge -->
          <rect x="25" y="490" width="160" height="32" rx="16" fill="#FFFFFF" stroke="#C25E30" stroke-width="1.5" filter="url(#glow)"/>
          <circle cx="45" cy="506" r="6" fill="#C25E30"/>
          <text x="60" y="511" font-size="11" font-weight="700" fill="#1C2421" font-family="'Outfit', sans-serif">Grassroots Voice</text>
        </g>

        <!-- ======================================================= -->
        <!-- CENTER: THE DIGITAL COLLABORATION BRIDGE ("SETU") -->
        <!-- ======================================================= -->
        <g id="collaboration-bridge">
          <!-- Bridge Piers/Pylons -->
          <rect x="260" y="380" width="16" height="120" fill="#A1461D" rx="3"/>
          <rect x="392" y="350" width="18" height="150" fill="#7C3AED" rx="3"/>
          <rect x="524" y="380" width="16" height="120" fill="#24543D" rx="3"/>

          <!-- Bridge Deck Support Arches -->
          <path d="M 240 430 Q 325 410, 400 410 Q 475 410, 560 430" fill="none" stroke="#64748B" stroke-width="4" stroke-linecap="round"/>
          <path d="M 250 445 Q 400 425, 550 445" fill="none" stroke="#CBD5E1" stroke-width="2"/>

          <!-- Glowing Multi-color Main Deck -->
          <path d="M 230 425 Q 400 390, 570 425" fill="none" stroke="url(#bridgeGrad)" stroke-width="10" stroke-linecap="round"/>
          <path d="M 230 425 Q 400 390, 570 425" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="6,6"/>

          <!-- Animated Pulses Traveling across Bridge -->
          <path d="M 230 425 Q 400 390, 570 425" fill="none" stroke="url(#pulseBeam)" stroke-width="6" class="animate-bridge-flow"/>

          <!-- Suspension Cables with Geometric Nodes -->
          <line x1="400" y1="260" x2="260" y2="425" stroke="#C25E30" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.6"/>
          <line x1="400" y1="260" x2="330" y2="415" stroke="#D97706" stroke-width="1.5" opacity="0.7"/>
          <line x1="400" y1="260" x2="400" y2="405" stroke="#7C3AED" stroke-width="2"/>
          <line x1="400" y1="260" x2="470" y2="415" stroke="#0D9488" stroke-width="1.5" opacity="0.7"/>
          <line x1="400" y1="260" x2="540" y2="425" stroke="#24543D" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.6"/>

          <!-- Center Pylon Spire & Nexus Hub -->
          <polygon points="400,240 390,360 410,360" fill="#D97706"/>
          <circle cx="400" cy="245" r="14" fill="#FFFFFF" stroke="#C25E30" stroke-width="3" filter="url(#glow)"/>
          <!-- Tribal Diamond in center nexus -->
          <rect x="396" y="241" width="8" height="8" fill="#C25E30" transform="rotate(45 400 245)"/>

          <!-- Central Bridge Indicator Card -->
          <g transform="translate(330, 160)" class="animate-pulse-glow">
            <rect x="0" y="0" width="140" height="34" rx="17" fill="#1C2421" stroke="#D97706" stroke-width="1.5" filter="url(#glow)"/>
            <text x="70" y="21" fill="#FEF3C7" font-size="11" font-weight="bold" text-anchor="middle" font-family="'Outfit', sans-serif">SAMADHAN SETU</text>
          </g>
        </g>

        <!-- =============================================================== -->
        <!-- RIGHT SIDE: INNOVATION, UNIVERSITIES, INDUSTRY & IMPACT -->
        <!-- =============================================================== -->
        <g id="innovation-ecosystem">
          <!-- Modern Ground Plateau -->
          <path d="M 550 440 Q 680 400, 810 440 L 810 550 L 550 550 Z" fill="#DCEAE1"/>

          <!-- University & Innovation Lab Towers -->
          <rect x="680" y="320" width="55" height="120" fill="#24543D" rx="4"/>
          <!-- Windows -->
          <rect x="690" y="335" width="12" height="14" fill="#FEF3C7" rx="2"/>
          <rect x="712" y="335" width="12" height="14" fill="#FEF3C7" rx="2"/>
          <rect x="690" y="360" width="12" height="14" fill="#FEF3C7" rx="2"/>
          <rect x="712" y="360" width="12" height="14" fill="#FEF3C7" rx="2"/>
          <rect x="690" y="385" width="12" height="14" fill="#FEF3C7" rx="2"/>
          <rect x="712" y="385" width="12" height="14" fill="#FEF3C7" rx="2"/>

          <!-- Industry Tech Hub Tower 2 -->
          <rect x="620" y="350" width="48" height="90" fill="#1E3A8A" rx="4"/>
          <rect x="630" y="365" width="10" height="10" fill="#93C5FD" rx="1"/>
          <rect x="648" y="365" width="10" height="10" fill="#93C5FD" rx="1"/>
          <rect x="630" y="385" width="10" height="10" fill="#93C5FD" rx="1"/>
          <rect x="648" y="385" width="10" height="10" fill="#93C5FD" rx="1"/>

          <!-- Solar Panel Farm (Clean Energy Tech) -->
          <polygon points="565,445 610,435 605,420 560,428" fill="#0284C7" stroke="#38BDF8" stroke-width="1.5"/>
          <polygon points="575,443 602,437 598,425 571,430" fill="#0369A1"/>

          <!-- Student & Innovator Figure -->
          <g transform="translate(580, 420)">
            <circle cx="15" cy="5" r="7" fill="#24543D"/>
            <path d="M 15 12 L 15 35 M 8 20 L 22 20 M 15 35 L 8 50 M 15 35 L 22 50" stroke="#24543D" stroke-width="3" stroke-linecap="round"/>
            <!-- Laptop in hands -->
            <rect x="18" y="16" width="14" height="10" rx="1" fill="#0D9488"/>
            <!-- Solution Spark / Lightbulb Indicator -->
            <g class="animate-float-slow" transform="translate(24, -28)">
              <rect x="0" y="0" width="60" height="24" rx="12" fill="#24543D" filter="url(#glow)"/>
              <text x="30" y="16" fill="#FFFFFF" font-size="9" font-weight="bold" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif">SOLUTION</text>
              <polygon points="10,24 16,30 20,24" fill="#24543D"/>
            </g>
          </g>

          <!-- Right Side Label Badge -->
          <rect x="610" y="490" width="165" height="32" rx="16" fill="#FFFFFF" stroke="#24543D" stroke-width="1.5" filter="url(#glow)"/>
          <circle cx="630" cy="506" r="6" fill="#24543D"/>
          <text x="645" y="511" font-size="11" font-weight="700" fill="#1C2421" font-family="'Outfit', sans-serif">Collaborative Impact</text>
        </g>
      </svg>
    </div>
  `;
}
