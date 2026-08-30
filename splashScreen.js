// ==========================================================================
// SAMADHAN SETU — Animated Splash Screen Component (SIH 2026)
// Provides a modern, culturally grounded animated portal introduction
// ==========================================================================

function renderSplashScreen() {
  // Check if splash already dismissed in this session
  if (sessionStorage.getItem('samadhan_splash_seen') === 'true') {
    return '';
  }

  return `
    <div id="samadhan-splash-screen" class="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[#1C2421] text-white p-6 transition-all duration-700 select-none overflow-hidden">
      
      <!-- Subtle Background Glows & Mesh -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-[#C25E30]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-[#24543D]/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style="animation-delay: 1.5s;"></div>
      <div class="absolute inset-0 bg-tribal-subtle opacity-10 pointer-events-none"></div>

      <!-- Top Header / Skip Button -->
      <div class="w-full max-w-4xl flex items-center justify-between z-10 pt-2">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#C25E30]/20 text-[#F59E0B] rounded-full border border-[#C25E30]/40">
            SIH 2026 • SIH26043
          </span>
          <span class="text-xs text-gray-400 hidden sm:inline">Societal Innovation Portal</span>
        </div>
        <button type="button" 
                onclick="dismissSplashScreen()" 
                class="px-4 py-1.5 text-xs font-semibold text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/15 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 group">
          <span>Enter Portal</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"></i>
        </button>
      </div>

      <!-- Center Animated Emblem & Identity -->
      <div class="my-auto flex flex-col items-center text-center max-w-md z-10 space-y-6">
        
        <!-- Animated Multi-layer Logo Emblem -->
        <div class="relative w-28 h-28 flex items-center justify-center">
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#C25E30] via-[#D97706] to-[#24543D] animate-spin opacity-50 blur-md" style="animation-duration: 9s;"></div>
          <div class="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[#C25E30] to-[#D97706] flex items-center justify-center text-white shadow-2xl border-2 border-white/20">
            <svg class="w-12 h-12 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10"></path>
              <path d="M4 14c4-3 12-3 16 0"></path>
              <circle cx="12" cy="7" r="1.5" fill="currentColor"></circle>
              <path d="M8 19v-4"></path>
              <path d="M16 19v-4"></path>
            </svg>
          </div>
        </div>

        <!-- Typography -->
        <div class="space-y-2">
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FAF2ED] to-[#FDE68A]">
            SAMADHAN SETU
          </h1>
          <div class="h-0.5 w-16 bg-gradient-to-r from-[#C25E30] via-[#D97706] to-[#24543D] mx-auto rounded-full"></div>
          <p class="text-xs sm:text-sm text-gray-300 font-medium tracking-wide">
            Connecting Doors to Doors for an Innovative Tomorrow
          </p>
          <p class="text-[11px] text-[#A1A1AA] pt-1">
            Jharkhand Societal Challenges • University Innovation • Industry Impact
          </p>
        </div>

        <!-- Animated Loading Bar -->
        <div class="w-64 sm:w-72 space-y-2">
          <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div id="splash-progress-bar" class="h-full bg-gradient-to-r from-[#C25E30] via-[#D97706] to-[#24543D] rounded-full transition-all duration-300 ease-out" style="width: 15%;"></div>
          </div>
          <div id="splash-status-text" class="text-[11px] font-mono text-[#E5DFD7]/80 text-center tracking-wider">
            Initializing Innovation Engine...
          </div>
        </div>

      </div>

      <!-- Bottom Credits / Pillars -->
      <div class="w-full max-w-3xl z-10 text-center border-t border-white/10 pt-4 flex flex-wrap items-center justify-between text-[11px] text-gray-400 gap-2">
        <span>Citizen Problems • Academic R&D • CSR Deployment</span>
        <span class="text-[#D97706] font-semibold">AI-Assisted • GPS Verified • 7-Stage Lifecycle</span>
      </div>

    </div>
  `;
}

function initSplashScreen() {
  if (sessionStorage.getItem('samadhan_splash_seen') === 'true') {
    return;
  }

  const progressBar = document.getElementById('splash-progress-bar');
  const statusText = document.getElementById('splash-status-text');
  
  if (!progressBar || !statusText) return;

  const steps = [
    { percent: 35, text: "Loading Jharkhand Grassroots Directory..." },
    { percent: 65, text: "Connecting AI Categorization Engine..." },
    { percent: 88, text: "Syncing University & Industry Nodes..." },
    { percent: 100, text: "Welcome to Samadhan Setu!" }
  ];

  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      progressBar.style.width = steps[currentStep].percent + '%';
      statusText.textContent = steps[currentStep].text;
      currentStep++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        dismissSplashScreen();
      }, 350);
    }
  }, 380);
}

function dismissSplashScreen() {
  const splash = document.getElementById('samadhan-splash-screen');
  if (splash) {
    splash.style.opacity = '0';
    splash.style.transform = 'scale(1.03)';
    splash.style.pointerEvents = 'none';
    setTimeout(() => {
      splash.remove();
    }, 700);
  }
  sessionStorage.setItem('samadhan_splash_seen', 'true');
}

function triggerSplashScreen() {
  sessionStorage.removeItem('samadhan_splash_seen');
  const existing = document.getElementById('samadhan-splash-screen');
  if (existing) existing.remove();
  
  const container = document.createElement('div');
  container.innerHTML = renderSplashScreen();
  document.body.appendChild(container.firstElementChild);
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
  initSplashScreen();
}
