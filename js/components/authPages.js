// ==========================================================================
// SAMADHAN SETU — Authentication (Login & Register) Component
// ==========================================================================

let activeAuthRole = "citizen";

const DEMO_ROLES = [
  { id: "citizen", label: "Citizen / Community", name: "Sushma Toppo", email: "sushma.toppo@samadhan.org", icon: "user" },
  { id: "student", label: "Student Innovator", name: "Aniket Verma (BIT Mesra)", email: "aniket.innovates@bitmesra.ac.in", icon: "laptop" },
  { id: "university", label: "University Faculty", name: "Dr. B. K. Mahato", email: "dean.research@ranchiuniv.edu", icon: "graduation-cap" },
  { id: "industry", label: "Industry & CSR", name: "Vikram Singhania (Tata CSR)", email: "v.singhania@tatasteel.com", icon: "building" },
  { id: "ngo", label: "Institution & NGO", name: "Pooja Kumari (Pradan)", email: "pooja.jharkhand@pradan.net", icon: "heart-handshake" },
  { id: "admin", label: "SIH Portal Admin", name: "SIH Directorate Admin", email: "admin@samadhansetu.gov.in", icon: "shield-check" }
];

function renderLoginPage() {
  return `
    <div class="bg-[#FAF8F5] min-h-screen py-12 flex items-center justify-center">
      <div class="max-w-md w-full mx-4">
        
        <!-- Brand Header -->
        <div class="text-center mb-8 space-y-2">
          <a href="#home" class="inline-flex items-center gap-2 mb-2">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C25E30] to-[#D97706] flex items-center justify-center text-white shadow-md">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M4 19V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10"></path>
                <path d="M4 14c4-3 12-3 16 0"></path>
              </svg>
            </div>
            <span class="font-extrabold text-2xl tracking-tight text-[#1C2421] font-heading">
              SAMADHAN SETU
            </span>
          </a>
          <h1 class="text-2xl font-bold text-[#1C2421] font-heading">Portal Sign In</h1>
          <p class="text-xs text-[#64748B]">Access crowdsourced problems, active collaborations and solver tools</p>
        </div>

        <!-- Role Switcher Tabs -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6DED2] shadow-sm space-y-6">
          
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-[#1C2421] mb-2 font-mono">
              Select Your Stakeholder Role
            </label>
            <div class="grid grid-cols-3 gap-2">
              ${DEMO_ROLES.map(r => `
                <button type="button" 
                        onclick="setAuthRole('${r.id}')"
                        class="p-2 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all text-[11px] font-semibold ${
                          activeAuthRole === r.id 
                            ? 'border-[#C25E30] bg-[#FAF2ED] text-[#C25E30] font-bold shadow-xs' 
                            : 'border-[#E6DED2] bg-[#FAF8F5] text-[#475569] hover:bg-white'
                        }">
                  <i data-lucide="${r.icon}" class="w-4 h-4"></i>
                  <span class="truncate w-full">${r.label.split(' ')[0]}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Quick 1-Click Demo Fill Button for Judges/Presentation -->
          <div class="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8D0C3] flex items-center justify-between">
            <div class="text-[11px] text-[#1C2421]">
              <span class="font-bold">SIH Demo Quick-Fill:</span>
              <div class="text-gray-500 truncate max-w-[200px]">${DEMO_ROLES.find(r => r.id === activeAuthRole).email}</div>
            </div>
            <button type="button" onclick="fillDemoCredentials()" class="px-2.5 py-1 text-[11px] font-bold bg-[#C25E30] text-white rounded-md hover:bg-[#A1461D] transition-colors">
              Auto-Fill
            </button>
          </div>

          <!-- Login Form -->
          <form onsubmit="handleLoginSubmit(event)" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">Email or Mobile Number</label>
              <input type="text" 
                     id="login-email-input"
                     required 
                     placeholder="name@organization.org or 98XXXXXXXX"
                     class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs text-[#1C2421] focus:ring-2 focus:ring-[#C25E30] focus:bg-white focus:outline-none" />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="block text-xs font-bold text-[#1C2421] font-mono uppercase">Password</label>
                <button type="button" onclick="openForgotPasswordModal()" class="text-[11px] font-semibold text-[#C25E30] hover:underline">Forgot password?</button>
              </div>
              <input type="password" 
                     id="login-password-input"
                     required 
                     value="••••••••"
                     placeholder="Enter your secure password"
                     class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs text-[#1C2421] focus:ring-2 focus:ring-[#C25E30] focus:bg-white focus:outline-none" />
            </div>

            <div class="flex items-center gap-2">
              <input type="checkbox" id="remember-me" checked class="rounded border-gray-300 text-[#C25E30] focus:ring-[#C25E30]" />
              <label for="remember-me" class="text-xs text-[#64748B]">Keep me signed in on this device</label>
            </div>

            <button type="submit" class="btn-primary-setu w-full py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md">
              <i data-lucide="log-in" class="w-4 h-4"></i>
              <span>Sign In to Dashboard</span>
            </button>
          </form>

          <!-- Register Link -->
          <div class="pt-4 border-t border-[#F1ECE6] text-center">
            <p class="text-xs text-[#64748B]">
              Don't have an account yet? 
              <a href="#register" class="font-bold text-[#C25E30] hover:underline">Create an account</a>
            </p>
          </div>

        </div>

      </div>
    </div>
  `;
}

function renderRegisterPage() {
  return `
    <div class="bg-[#FAF8F5] min-h-screen py-12 flex items-center justify-center">
      <div class="max-w-xl w-full mx-4">
        
        <!-- Brand Header -->
        <div class="text-center mb-8 space-y-2">
          <a href="#home" class="inline-flex items-center gap-2 mb-2">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C25E30] to-[#D97706] flex items-center justify-center text-white shadow-md">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M4 19V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10"></path>
                <path d="M4 14c4-3 12-3 16 0"></path>
              </svg>
            </div>
            <span class="font-extrabold text-2xl tracking-tight text-[#1C2421] font-heading">
              SAMADHAN SETU
            </span>
          </a>
          <h1 class="text-2xl font-bold text-[#1C2421] font-heading">Join the Innovation Network</h1>
          <p class="text-xs text-[#64748B]">Register as a citizen, student solver, academic institution, or industry sponsor</p>
        </div>

        <div class="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6DED2] shadow-sm space-y-6">
          
          <!-- Role selector in register -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-[#1C2421] mb-2 font-mono">
              Registering As:
            </label>
            <div class="grid grid-cols-3 gap-2">
              ${DEMO_ROLES.map(r => `
                <button type="button" 
                        onclick="setAuthRole('${r.id}')"
                        class="p-2 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all text-[11px] font-semibold ${
                          activeAuthRole === r.id 
                            ? 'border-[#C25E30] bg-[#FAF2ED] text-[#C25E30] font-bold shadow-xs' 
                            : 'border-[#E6DED2] bg-[#FAF8F5] text-[#475569] hover:bg-white'
                        }">
                  <i data-lucide="${r.icon}" class="w-4 h-4"></i>
                  <span class="truncate w-full">${r.label.split(' ')[0]}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <form onsubmit="handleRegisterSubmit(event)" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">Full Name *</label>
                <input type="text" required placeholder="e.g. Ramesh Mahto" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs" />
              </div>
              <div>
                <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">Organization / College</label>
                <input type="text" placeholder="e.g. BIT Mesra / Gram Panchayat" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">Email Address *</label>
                <input type="email" required placeholder="name@domain.com" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs" />
              </div>
              <div>
                <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">Phone / WhatsApp *</label>
                <input type="tel" required placeholder="+91 98XXXXXXXX" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">District</label>
                <select class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs font-semibold">
                  <option>Ranchi</option>
                  <option>Latehar</option>
                  <option>Gumla</option>
                  <option>Hazaribagh</option>
                  <option>Khunti</option>
                  <option>Simdega</option>
                  <option>Dhanbad</option>
                  <option>Other / All India</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-[#1C2421] mb-1 font-mono uppercase">Set Password *</label>
                <input type="password" required placeholder="Create secure password" class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs" />
              </div>
            </div>

            <div class="p-3 bg-[#EBF3EE] rounded-xl border border-[#C4DCCE] text-xs text-[#24543D]">
              <i data-lucide="check-circle" class="w-3.5 h-3.5 inline mr-1"></i>
              <span>Your profile will be verified by Samadhan Setu nodal coordinators.</span>
            </div>

            <button type="submit" class="btn-primary-setu w-full py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md">
              <i data-lucide="user-plus" class="w-4 h-4"></i>
              <span>Complete Free Registration</span>
            </button>
          </form>

          <div class="pt-4 border-t border-[#F1ECE6] text-center">
            <p class="text-xs text-[#64748B]">
              Already have an account? 
              <a href="#login" class="font-bold text-[#C25E30] hover:underline">Sign In</a>
            </p>
          </div>

        </div>

      </div>
    </div>
  `;
}

function setAuthRole(roleId) {
  activeAuthRole = roleId;
  renderApp();
}

function fillDemoCredentials() {
  const currentRole = DEMO_ROLES.find(r => r.id === activeAuthRole);
  const emailInput = document.getElementById('login-email-input');
  const passwordInput = document.getElementById('login-password-input');
  
  if (emailInput && currentRole) {
    emailInput.value = currentRole.email;
  }
  if (passwordInput) {
    passwordInput.value = "DemoPass@2026";
  }
  showToast(`Filled credentials for ${currentRole.label}!`, "info");
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const currentRole = DEMO_ROLES.find(r => r.id === activeAuthRole);
  
  const user = {
    name: currentRole.name,
    email: currentRole.email,
    role: currentRole.id,
    roleLabel: currentRole.label
  };

  localStorage.setItem('samadhan_user', JSON.stringify(user));
  showToast(`Welcome, ${user.name}! Logged in as ${user.roleLabel}.`, "success");
  window.location.hash = "#home";
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const currentRole = DEMO_ROLES.find(r => r.id === activeAuthRole);
  
  const user = {
    name: "New Registered User",
    email: "user@samadhansetu.org",
    role: currentRole.id,
    roleLabel: currentRole.label
  };

  localStorage.setItem('samadhan_user', JSON.stringify(user));
  showToast("Account created successfully! Welcome to Samadhan Setu.", "success");
  window.location.hash = "#home";
}

function openForgotPasswordModal() {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onclick="closeModal(event)">
      <div class="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E6DED2] modal-content-animated relative" onclick="event.stopPropagation()">
        <button onclick="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"><i data-lucide="x" class="w-4 h-4"></i></button>
        <h3 class="text-lg font-bold text-[#1C2421] font-heading mb-1">Reset Password</h3>
        <p class="text-xs text-[#64748B] mb-4">Enter your registered email/phone to receive a secure OTP reset link.</p>
        <form onsubmit="handleResetPasswordSubmit(event)" class="space-y-3">
          <input type="text" required placeholder="name@email.com or phone" class="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs" />
          <button type="submit" class="btn-primary-setu w-full py-2 text-xs font-bold">Send OTP Link</button>
        </form>
      </div>
    </div>
  `;
  lucide.createIcons();
}

function handleResetPasswordSubmit(e) {
  e.preventDefault();
  closeModal();
  showToast("Password reset link sent to your contact details.", "info");
}
