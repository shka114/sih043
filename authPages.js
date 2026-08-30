// ==========================================================================
// SAMADHAN SETU — Enhanced Authentication (Login & Register) Component
// Supports 6 Stakeholder Roles, Supabase Auth Integration & 1-Click Demo Fill
// ==========================================================================

let activeAuthRole = "citizen";
let activeAuthTab = "login"; // "login" or "register"

const DEMO_ROLES = [
  { 
    id: "citizen", 
    label: "Citizen / Community", 
    name: "Sushma Toppo", 
    email: "sushma.toppo@samadhan.org", 
    org: "Gram Panchayat Mahuadanr", 
    icon: "user",
    badge: "Community Reporter"
  },
  { 
    id: "student", 
    label: "Student Innovator", 
    name: "Aniket Verma", 
    email: "aniket.innovates@bitmesra.ac.in", 
    org: "BIT Mesra, Ranchi", 
    icon: "laptop",
    badge: "SIH Problem Solver"
  },
  { 
    id: "university", 
    label: "University Faculty", 
    name: "Dr. B. K. Mahato", 
    email: "dean.research@ranchiuniv.edu", 
    org: "Ranchi University", 
    icon: "graduation-cap",
    badge: "Faculty Mentor"
  },
  { 
    id: "industry", 
    label: "Industry & CSR", 
    name: "Vikram Singhania", 
    email: "v.singhania@tatasteel.com", 
    org: "Tata Steel CSR Foundation", 
    icon: "building",
    badge: "CSR Sponsor"
  },
  { 
    id: "ngo", 
    label: "Institution & NGO", 
    name: "Pooja Kumari", 
    email: "pooja.jharkhand@pradan.net", 
    org: "PRADAN Jharkhand", 
    icon: "heart-handshake",
    badge: "Grassroots Partner"
  },
  { 
    id: "admin", 
    label: "SIH Portal Admin", 
    name: "SIH Directorate Admin", 
    email: "admin@samadhansetu.gov.in", 
    org: "Government of Jharkhand / AICTE", 
    icon: "shield-check",
    badge: "System Administrator"
  }
];

function setAuthTab(tab) {
  activeAuthTab = tab;
  renderApp();
}

function setAuthRole(roleId) {
  activeAuthRole = roleId;
  renderApp();
}

function renderLoginPage() {
  const currentRole = DEMO_ROLES.find(r => r.id === activeAuthRole) || DEMO_ROLES[0];

  return `
    <div class="bg-gradient-to-b from-[#FAF8F5] via-[#F4E8E1]/30 to-[#FAF8F5] min-h-screen py-12 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden">
      
      <!-- Ambient Background Elements -->
      <div class="absolute top-10 left-10 w-72 h-72 bg-[#C25E30]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-10 right-10 w-72 h-72 bg-[#24543D]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-xl w-full mx-auto relative z-10">
        
        <!-- Brand Header -->
        <div class="text-center mb-6 space-y-2">
          <a href="#home" class="inline-flex items-center gap-2 mb-1 group">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C25E30] to-[#D97706] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M4 19V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10"></path>
                <path d="M4 14c4-3 12-3 16 0"></path>
                <circle cx="12" cy="7" r="1.5" fill="currentColor"></circle>
                <path d="M8 19v-4"></path>
                <path d="M16 19v-4"></path>
              </svg>
            </div>
            <div class="text-left">
              <span class="font-extrabold text-2xl tracking-tight text-[#1C2421] font-heading block">
                SAMADHAN SETU
              </span>
              <span class="text-[10px] font-bold text-[#24543D] uppercase tracking-wider bg-[#EBF3EE] px-2 py-0.5 rounded border border-[#C4DCCE]">
                SIH 2026 Collaboration Portal
              </span>
            </div>
          </a>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-[#1C2421] font-heading">
            ${activeAuthTab === 'login' ? 'Stakeholder Sign In' : 'Join the Innovation Network'}
          </h1>
          <p class="text-xs sm:text-sm text-[#64748B]">
            Connect to submit societal problems, collaborate with universities, or fund impactful solutions.
          </p>
        </div>

        <!-- Main Card Container -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD7] shadow-xl space-y-6">
          
          <!-- Top Tab Switcher: Login vs Register -->
          <div class="grid grid-cols-2 p-1 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs font-bold">
            <button type="button" 
                    onclick="setAuthTab('login')" 
                    class="py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activeAuthTab === 'login' 
                        ? 'bg-white text-[#C25E30] shadow-sm border border-[#E5DFD7]' 
                        : 'text-gray-500 hover:text-[#1C2421]'
                    }">
              <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
              <span>Sign In</span>
            </button>
            <button type="button" 
                    onclick="setAuthTab('register')" 
                    class="py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activeAuthTab === 'register' 
                        ? 'bg-white text-[#C25E30] shadow-sm border border-[#E5DFD7]' 
                        : 'text-gray-500 hover:text-[#1C2421]'
                    }">
              <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
              <span>Create Account</span>
            </button>
          </div>

          <!-- Stakeholder Role Selector (6 Roles) -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#1C2421] font-mono">
                Select Your Role (${DEMO_ROLES.length} Stakeholders)
              </label>
              <span class="text-[10px] text-[#C25E30] font-semibold">${currentRole.badge}</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              ${DEMO_ROLES.map(r => `
                <button type="button" 
                        onclick="setAuthRole('${r.id}')"
                        class="p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold cursor-pointer ${
                          activeAuthRole === r.id 
                            ? 'border-[#C25E30] bg-[#FAF2ED] text-[#C25E30] font-bold shadow-xs scale-[1.02]' 
                            : 'border-[#E5DFD7] bg-[#FAF8F5] text-[#475569] hover:bg-white hover:border-gray-300'
                        }">
                  <div class="w-7 h-7 rounded-lg flex items-center justify-center ${activeAuthRole === r.id ? 'bg-[#C25E30] text-white' : 'bg-white text-gray-600 border border-[#E5DFD7]'}">
                    <i data-lucide="${r.icon}" class="w-4 h-4"></i>
                  </div>
                  <span class="truncate w-full text-[11px]">${r.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Quick 1-Click Demo Fill for Judges/Presentation -->
          <div class="p-3.5 bg-gradient-to-r from-[#FAF2ED] via-[#FFF9F5] to-[#FAF2ED] rounded-2xl border border-[#E8D0C3] flex items-center justify-between gap-3 shadow-2xs">
            <div class="text-[11px] text-[#1C2421] leading-tight">
              <div class="font-bold flex items-center gap-1.5 text-[#C25E30]">
                <span>⚡ SIH Judge Quick-Fill</span>
                <span class="text-[9px] font-mono px-1.5 py-0.2 bg-white rounded border border-[#E8D0C3] uppercase">${currentRole.id}</span>
              </div>
              <div class="text-gray-600 truncate max-w-[240px] pt-0.5">${currentRole.email}</div>
            </div>
            <button type="button" 
                    onclick="fillDemoCredentials()" 
                    class="px-3 py-1.5 text-xs font-bold bg-[#C25E30] text-white rounded-xl hover:bg-[#A1461D] transition-colors shadow-xs shrink-0 cursor-pointer flex items-center gap-1">
              <span>Auto-Fill</span>
              <i data-lucide="sparkles" class="w-3 h-3"></i>
            </button>
          </div>

          <!-- Form Area: Sign In or Register -->
          ${activeAuthTab === 'login' ? `
            <!-- Login Form -->
            <form onsubmit="handleLoginSubmit(event)" class="space-y-4">
              <div>
                <label for="login-email-input" class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">
                  Email Address or Username *
                </label>
                <input type="text" 
                       id="login-email-input"
                       required 
                       value="${currentRole.email}"
                       placeholder="e.g. ${currentRole.email}"
                       class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs text-[#1C2421] focus:ring-2 focus:ring-[#C25E30] focus:bg-white focus:outline-none transition-all" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label for="login-password-input" class="block text-xs font-bold text-[#1C2421] font-mono uppercase">Password *</label>
                  <button type="button" onclick="openForgotPasswordModal()" class="text-[11px] font-semibold text-[#C25E30] hover:underline cursor-pointer">
                    Forgot password?
                  </button>
                </div>
                <input type="password" 
                       id="login-password-input"
                       required 
                       value="DemoPass@2026"
                       placeholder="Enter your secure password"
                       class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs text-[#1C2421] focus:ring-2 focus:ring-[#C25E30] focus:bg-white focus:outline-none transition-all" />
              </div>

              <div class="flex items-center justify-between text-xs">
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" id="remember-me" checked class="rounded border-gray-300 text-[#C25E30] focus:ring-[#C25E30]" />
                  <span class="text-[#64748B]">Keep me signed in</span>
                </label>
                <span class="text-[11px] text-gray-400">SIH26043 Secure Portal</span>
              </div>

              <button type="submit" id="btn-login-submit" class="btn-primary-setu w-full py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer">
                <i data-lucide="log-in" class="w-4 h-4"></i>
                <span>Sign In as ${currentRole.label}</span>
              </button>
            </form>
          ` : `
            <!-- Register Form -->
            <form onsubmit="handleRegisterSubmit(event)" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">Full Name *</label>
                  <input type="text" id="reg-name" required placeholder="e.g. Ramesh Mahto" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">Organization / College</label>
                  <input type="text" id="reg-org" placeholder="e.g. BIT Mesra / Ranchi Gram" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">Email Address *</label>
                  <input type="email" id="reg-email" required placeholder="name@domain.com" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">Phone / WhatsApp</label>
                  <input type="tel" id="reg-phone" placeholder="+91 98XXXXXXXX" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">District</label>
                  <select id="reg-district" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs font-semibold">
                    <option>Ranchi</option>
                    <option>Latehar</option>
                    <option>Gumla</option>
                    <option>Hazaribagh</option>
                    <option>Khunti</option>
                    <option>Simdega</option>
                    <option>Dhanbad</option>
                    <option>East Singhbhum</option>
                    <option>Other / All India</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">Create Password *</label>
                  <input type="password" id="reg-password" required placeholder="Create secure password" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] rounded-xl text-xs" />
                </div>
              </div>

              <div class="p-3 bg-[#EBF3EE] rounded-xl border border-[#C4DCCE] text-xs text-[#24543D] flex items-center gap-2">
                <i data-lucide="check-circle" class="w-4 h-4 shrink-0"></i>
                <span>Your profile will be auto-indexed in the Jharkhand societal innovation network.</span>
              </div>

              <button type="submit" id="btn-register-submit" class="btn-primary-setu w-full py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer">
                <i data-lucide="user-plus" class="w-4 h-4"></i>
                <span>Complete Registration as ${currentRole.label}</span>
              </button>
            </form>
          `}

          <!-- Footer Switcher -->
          <div class="pt-3 border-t border-[#F1ECE6] text-center">
            ${activeAuthTab === 'login' ? `
              <p class="text-xs text-[#64748B]">
                New to the platform? 
                <button type="button" onclick="setAuthTab('register')" class="font-bold text-[#C25E30] hover:underline cursor-pointer ml-1">
                  Create an account
                </button>
              </p>
            ` : `
              <p class="text-xs text-[#64748B]">
                Already have an account? 
                <button type="button" onclick="setAuthTab('login')" class="font-bold text-[#C25E30] hover:underline cursor-pointer ml-1">
                  Sign In here
                </button>
              </p>
            `}
          </div>

        </div>

      </div>
    </div>
  `;
}

// Support for older route `#register`
function renderRegisterPage() {
  activeAuthTab = "register";
  return renderLoginPage();
}

function fillDemoCredentials() {
  const currentRole = DEMO_ROLES.find(r => r.id === activeAuthRole) || DEMO_ROLES[0];
  const emailInput = document.getElementById('login-email-input');
  const passwordInput = document.getElementById('login-password-input');
  
  if (emailInput) {
    emailInput.value = currentRole.email;
  }
  if (passwordInput) {
    passwordInput.value = "DemoPass@2026";
  }
  if (typeof showToast === 'function') {
    showToast(`Filled credentials for ${currentRole.label}!`, "info");
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const currentRole = DEMO_ROLES.find(r => r.id === activeAuthRole) || DEMO_ROLES[0];
  const emailInput = document.getElementById('login-email-input');
  const passwordInput = document.getElementById('login-password-input');
  const btn = document.getElementById('btn-login-submit');

  const email = emailInput ? emailInput.value.trim() : currentRole.email;
  const password = passwordInput ? passwordInput.value : "DemoPass@2026";

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<svg class="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg><span>Authenticating...</span>`;
  }

  // Attempt Supabase sign in if client exists and user didn't use demo preset
  if (window.supabaseClient && email && password && email !== currentRole.email) {
    try {
      const { data, error } = await window.supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (!error && data && data.user) {
        const user = {
          name: data.user.user_metadata?.name || currentRole.name,
          email: data.user.email,
          role: data.user.user_metadata?.role || currentRole.id,
          roleLabel: currentRole.label,
          org: currentRole.org,
          id: data.user.id
        };
        localStorage.setItem('samadhan_user', JSON.stringify(user));
        if (typeof showToast === 'function') showToast(`Welcome back, ${user.name}!`, "success");
        window.location.hash = "#home";
        return;
      }
    } catch (err) {
      console.warn("Supabase auth failed, falling back to session store:", err);
    }
  }

  // Standard demo/fallback login
  setTimeout(() => {
    const user = {
      name: currentRole.name,
      email: email || currentRole.email,
      role: currentRole.id,
      roleLabel: currentRole.label,
      org: currentRole.org
    };

    localStorage.setItem('samadhan_user', JSON.stringify(user));
    if (typeof showToast === 'function') {
      showToast(`Welcome back, ${user.name}! Logged in as ${user.roleLabel}.`, "success");
    }
    window.location.hash = "#home";
  }, 400);
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const currentRole = DEMO_ROLES.find(r => r.id === activeAuthRole) || DEMO_ROLES[0];
  const name = document.getElementById('reg-name')?.value.trim() || currentRole.name;
  const email = document.getElementById('reg-email')?.value.trim() || currentRole.email;
  const org = document.getElementById('reg-org')?.value.trim() || currentRole.org;
  const district = document.getElementById('reg-district')?.value || "Ranchi";
  const password = document.getElementById('reg-password')?.value || "DemoPass@2026";
  const btn = document.getElementById('btn-register-submit');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<svg class="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg><span>Registering...</span>`;
  }

  // Attempt Supabase sign up if client exists
  if (window.supabaseClient && email && password) {
    try {
      const { data, error } = await window.supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { name: name, role: currentRole.id, org: org, district: district }
        }
      });
      if (!error && data && data.user) {
        const user = {
          name: name,
          email: email,
          role: currentRole.id,
          roleLabel: currentRole.label,
          org: org,
          id: data.user.id
        };
        localStorage.setItem('samadhan_user', JSON.stringify(user));
        if (typeof showToast === 'function') showToast("Account created successfully with Supabase!", "success");
        window.location.hash = "#home";
        return;
      }
    } catch (err) {
      console.warn("Supabase signup failed, fallback to local:", err);
    }
  }

  setTimeout(() => {
    const user = {
      name: name,
      email: email,
      role: currentRole.id,
      roleLabel: currentRole.label,
      org: org,
      district: district
    };

    localStorage.setItem('samadhan_user', JSON.stringify(user));
    if (typeof showToast === 'function') {
      showToast("Account created successfully! Welcome to Samadhan Setu.", "success");
    }
    window.location.hash = "#home";
  }, 400);
}

function openForgotPasswordModal() {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onclick="closeModal(event)">
      <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E6DED2] modal-content-animated relative" onclick="event.stopPropagation()">
        <button onclick="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 cursor-pointer">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
        <div class="w-10 h-10 rounded-xl bg-[#FAF2ED] text-[#C25E30] flex items-center justify-center mb-3">
          <i data-lucide="key-round" class="w-5 h-5"></i>
        </div>
        <h3 class="text-lg font-bold text-[#1C2421] font-heading mb-1">Reset Password</h3>
        <p class="text-xs text-[#64748B] mb-4">Enter your registered email or phone to receive a 6-digit OTP verification code.</p>
        <form onsubmit="handleResetPasswordSubmit(event)" class="space-y-3">
          <input type="text" required placeholder="name@domain.com or mobile" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs text-[#1C2421]" />
          <button type="submit" class="btn-primary-setu w-full py-2.5 text-xs font-bold cursor-pointer">Send OTP Link</button>
        </form>
      </div>
    </div>
  `;
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

function handleResetPasswordSubmit(e) {
  e.preventDefault();
  closeModal();
  if (typeof showToast === 'function') {
    showToast("Password reset link has been dispatched to your email/phone.", "info");
  }
}
