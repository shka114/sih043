// ==========================================================================
// SAMADHAN SETU — Navigation Bar Component (Phase 1, 2, 3)
// ==========================================================================

function renderNavbar(activeRoute = "home", currentUser = null) {
  const navLinks = [
    { name: "Home", route: "home" },
    { name: "Explore Problems", route: "explore" },
    { name: "Raise a Problem", route: "raise-problem" },
    { name: "Collaborate", route: "collaborate" },
    { name: "Track Solutions", route: "tracking" },
    { name: "My Contributions", route: "my-contributions" },
    { name: "About", route: "about" }
  ];

  return `
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EAE3D9] shadow-xs transition-all duration-200">
      <!-- Subtle top tribal motif border -->
      <div class="tribal-border-top h-1 w-full"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo & Identity -->
          <a href="#home" class="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C25E30] rounded-lg p-1">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C25E30] to-[#D97706] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200 relative overflow-hidden">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10"></path>
                <path d="M4 14c4-3 12-3 16 0"></path>
                <circle cx="12" cy="7" r="1.5" fill="currentColor"></circle>
                <path d="M8 19v-4"></path>
                <path d="M16 19v-4"></path>
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-xl sm:text-2xl tracking-tight text-[#1C2421] font-heading group-hover:text-[#C25E30] transition-colors">
                  SAMADHAN SETU
                </span>
                <span class="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#EBF3EE] text-[#24543D] rounded-full border border-[#C4DCCE]">
                  SIH 2026
                </span>
              </div>
              <p class="text-xs text-[#64748B] font-medium hidden md:block">
                Connecting Doors to Doors for an Innovative Tomorrow
              </p>
            </div>
          </a>

          <!-- Desktop Navigation Menu -->
          <nav class="hidden lg:flex items-center gap-1 font-medium text-xs sm:text-sm text-[#334155]" aria-label="Main Navigation">
            ${navLinks.map(link => {
              const isActive = activeRoute === link.route || (activeRoute === 'problem-details' && link.route === 'explore');
              return `
                <a href="#${link.route}" 
                   class="px-3 py-2 rounded-lg transition-colors duration-150 relative ${
                     isActive 
                       ? 'text-[#C25E30] font-semibold bg-[#FAF2ED]' 
                       : 'hover:text-[#C25E30] hover:bg-[#FAF8F5]'
                   }">
                  ${link.name}
                  ${isActive ? '<span class="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C25E30] rounded-full"></span>' : ''}
                </a>
              `;
            }).join('')}
          </nav>

          <!-- Right Action Buttons -->
          <div class="hidden sm:flex items-center gap-2.5">
            ${currentUser ? `
              <!-- Logged In User State -->
              <div class="flex items-center gap-2.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl px-3 py-1.5">
                <div class="w-7 h-7 rounded-full bg-[#24543D] text-white flex items-center justify-center text-xs font-bold">
                  ${currentUser.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div class="text-left leading-tight hidden md:block">
                  <div class="text-xs font-bold text-[#1C2421]">${currentUser.name}</div>
                  <div class="text-[10px] text-[#C25E30] font-semibold">${currentUser.roleLabel || currentUser.role}</div>
                </div>
                <button onclick="handleLogout()" title="Logout" class="text-gray-400 hover:text-red-600 p-1">
                  <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            ` : `
              <!-- Guest Action Buttons -->
              <a href="#raise-problem" class="btn-primary-setu px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i>
                <span>Raise a Problem</span>
              </a>
            `}
          </div>

          <!-- Mobile Hamburger Button -->
          <div class="flex lg:hidden items-center gap-2">
            <button id="mobile-menu-btn" 
                    onclick="toggleMobileMenu()" 
                    class="p-2 rounded-lg text-[#334155] hover:bg-[#FAF2ED] hover:text-[#C25E30] focus:outline-none focus:ring-2 focus:ring-[#C25E30]" 
                    aria-label="Toggle navigation menu"
                    aria-expanded="false">
              <i data-lucide="menu" id="menu-icon-open" class="w-6 h-6"></i>
              <i data-lucide="x" id="menu-icon-close" class="w-6 h-6 hidden"></i>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-menu-drawer" class="hidden lg:hidden border-t border-[#EAE3D9] bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-lg animate-fadeIn">
        ${navLinks.map(link => {
          const isActive = activeRoute === link.route || (activeRoute === 'problem-details' && link.route === 'explore');
          return `
            <a href="#${link.route}" 
               onclick="toggleMobileMenu(false)"
               class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                 isActive 
                   ? 'bg-[#FAF2ED] text-[#C25E30] font-bold border-l-4 border-[#C25E30]' 
                   : 'text-[#334155] hover:bg-[#FAF8F5]'
               }">
              <span>${link.name}</span>
              ${isActive ? '<i data-lucide="chevron-right" class="w-4 h-4 text-[#C25E30]"></i>' : ''}
            </a>
          `;
        }).join('')}

        <div class="pt-3 border-t border-gray-100 flex flex-col gap-2">
          <a href="#raise-problem" onclick="toggleMobileMenu(false)" class="btn-primary-setu w-full py-2.5 text-center text-xs font-semibold flex items-center justify-center gap-2">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Raise a Problem</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

function toggleMobileMenu(forceState) {
  const drawer = document.getElementById('mobile-menu-drawer');
  const openIcon = document.getElementById('menu-icon-open');
  const closeIcon = document.getElementById('menu-icon-close');
  const btn = document.getElementById('mobile-menu-btn');
  
  if (!drawer) return;
  const isHidden = drawer.classList.contains('hidden');
  const shouldOpen = forceState !== undefined ? forceState : isHidden;

  if (shouldOpen) {
    drawer.classList.remove('hidden');
    if (openIcon) openIcon.classList.add('hidden');
    if (closeIcon) closeIcon.classList.remove('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  } else {
    drawer.classList.add('hidden');
    if (openIcon) openIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
}
