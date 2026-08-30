// ==========================================================================
// SAMADHAN SETU — Navigation Bar Component (Phase 1, 2, 3)
// Enhanced with direct "Sign In" button, User Role Badge & Mobile Drawer
// ==========================================================================

function renderNavbar(activeRoute = "home", currentUser = null) {
  const navLinks = [
    { name: "Home", route: "home", icon: "home" },
    { name: "Explore Problems", route: "explore", icon: "compass" },
    { name: "Raise a Problem", route: "raise-problem", icon: "plus-circle" },
    { name: "Collaborate", route: "collaborate", icon: "users-2" },
    { name: "Track Solutions", route: "tracking", icon: "git-commit" },
    { name: "My Contributions", route: "my-contributions", icon: "bookmark" },
    { name: "About", route: "about", icon: "info" }
  ];

  return `
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EAE3D9] shadow-xs transition-all duration-200">
      <!-- Subtle top tribal motif border -->
      <div class="tribal-border-top h-1 w-full"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo & Identity -->
          <a href="#home" class="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C25E30] rounded-xl p-1">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C25E30] to-[#D97706] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200 relative overflow-hidden shrink-0">
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
                       ? 'text-[#C25E30] font-bold bg-[#FAF2ED]' 
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
              <div class="flex items-center gap-2.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl px-3 py-1.5 shadow-2xs">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#24543D] to-[#122E20] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  ${(currentUser.name || "U").split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                </div>
                <div class="text-left leading-tight hidden md:block">
                  <div class="text-xs font-bold text-[#1C2421] truncate max-w-[130px]">${currentUser.name}</div>
                  <div class="text-[10px] text-[#C25E30] font-semibold">${currentUser.roleLabel || currentUser.role || 'Member'}</div>
                </div>
                <button onclick="handleLogout()" title="Sign Out" class="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
                  <i data-lucide="log-out" class="w-4 h-4"></i>
                </button>
              </div>
            ` : `
              <!-- Guest Action Buttons: Sign In + Raise Problem -->
              <a href="#login" class="px-3.5 py-2 text-xs font-bold text-[#1C2421] hover:text-[#C25E30] bg-[#FAF8F5] hover:bg-[#FAF2ED] border border-[#E5DFD7] hover:border-[#E8D0C3] rounded-xl transition-all flex items-center gap-1.5 shadow-2xs">
                <i data-lucide="user" class="w-3.5 h-3.5 text-[#C25E30]"></i>
                <span>Sign In</span>
              </a>
              <a href="#raise-problem" class="btn-primary-setu px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i>
                <span>Raise a Problem</span>
              </a>
            `}
          </div>

          <!-- Mobile Hamburger Button -->
          <div class="flex lg:hidden items-center gap-2">
            ${currentUser ? `
              <div class="w-8 h-8 rounded-lg bg-[#24543D] text-white flex items-center justify-center text-xs font-bold">
                ${(currentUser.name || "U").split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
              </div>
            ` : `
              <a href="#login" class="p-2 text-xs font-bold text-[#C25E30] bg-[#FAF2ED] rounded-lg border border-[#E8D0C3]">
                Sign In
              </a>
            `}
            <button id="mobile-menu-btn" 
                    onclick="toggleMobileMenu()" 
                    class="p-2 rounded-xl text-[#334155] hover:bg-[#FAF2ED] hover:text-[#C25E30] focus:outline-none focus:ring-2 focus:ring-[#C25E30] border border-gray-200" 
                    aria-label="Toggle navigation menu"
                    aria-expanded="false">
              <i data-lucide="menu" id="menu-icon-open" class="w-6 h-6"></i>
              <i data-lucide="x" id="menu-icon-close" class="w-6 h-6 hidden"></i>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Dropdown Navigation Drawer -->
      <div id="mobile-menu-drawer" class="hidden lg:hidden bg-white border-b border-[#EAE3D9] px-4 pt-2 pb-6 space-y-2 shadow-lg">
        <div class="space-y-1">
          ${navLinks.map(link => {
            const isActive = activeRoute === link.route || (activeRoute === 'problem-details' && link.route === 'explore');
            return `
              <a href="#${link.route}" 
                 onclick="closeMobileMenu()"
                 class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                   isActive 
                     ? 'bg-[#FAF2ED] text-[#C25E30] font-bold' 
                     : 'text-[#334155] hover:bg-[#FAF8F5] hover:text-[#C25E30]'
                 }">
                <i data-lucide="${link.icon}" class="w-4 h-4 text-gray-500"></i>
                <span>${link.name}</span>
              </a>
            `;
          }).join('')}
        </div>

        <div class="pt-4 border-t border-gray-100 flex flex-col gap-2">
          ${currentUser ? `
            <div class="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] flex items-center justify-between">
              <div>
                <div class="text-xs font-bold text-[#1C2421]">${currentUser.name}</div>
                <div class="text-[10px] text-[#C25E30] font-semibold">${currentUser.roleLabel || currentUser.role}</div>
              </div>
              <button onclick="handleLogout(); closeMobileMenu();" class="text-xs text-red-600 font-bold px-2 py-1 bg-red-50 rounded-lg">
                Sign Out
              </button>
            </div>
          ` : `
            <a href="#login" onclick="closeMobileMenu()" class="w-full text-center py-2.5 text-xs font-bold text-[#1C2421] bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl">
              Sign In to Stakeholder Portal
            </a>
            <a href="#raise-problem" onclick="closeMobileMenu()" class="btn-primary-setu w-full text-center py-2.5 text-xs font-bold flex items-center justify-center gap-2">
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>Raise a Problem</span>
            </a>
          `}
        </div>
      </div>
    </header>
  `;
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-menu-drawer');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  if (!drawer) return;

  const isHidden = drawer.classList.contains('hidden');
  if (isHidden) {
    drawer.classList.remove('hidden');
    if (iconOpen) iconOpen.classList.add('hidden');
    if (iconClose) iconClose.classList.remove('hidden');
  } else {
    drawer.classList.add('hidden');
    if (iconOpen) iconOpen.classList.remove('hidden');
    if (iconClose) iconClose.classList.add('hidden');
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-menu-drawer');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  if (drawer) drawer.classList.add('hidden');
  if (iconOpen) iconOpen.classList.remove('hidden');
  if (iconClose) iconClose.classList.add('hidden');
}
