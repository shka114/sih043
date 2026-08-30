// ==========================================================================
// SAMADHAN SETU — Main Application Router & Controller (Phase 1, 2, 3)
// SIH26043: Digital Platform to Crowdsource Societal Challenges
// ==========================================================================

let currentUser = JSON.parse(localStorage.getItem('samadhan_user')) || null;

function getCurrentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  const baseRoute = hash.split('?')[0];
  return baseRoute || 'home';
}

function getQueryParam(param) {
  const hash = window.location.hash;
  const match = hash.match(new RegExp('[?&]' + param + '=([^&]+)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function getCurrentUser() {
  currentUser = JSON.parse(localStorage.getItem('samadhan_user')) || null;
  return currentUser;
}

function handleLogout() {
  localStorage.removeItem('samadhan_user');
  currentUser = null;
  if (typeof showToast === 'function') {
    showToast("You have been signed out.", "info");
  }
  window.location.hash = "#home";
  renderApp();
}

function handleUpvote(challengeId, event) {
  if (event) {
    event.stopPropagation();
  }
  const updated = toggleChallengeUpvote(challengeId);
  if (updated) {
    if (updated.isSupportedByUser) {
      showToast(`Supported "${updated.title}"! (+1)`, "success");
    } else {
      showToast(`Removed support vote for "${updated.title}".`, "info");
    }
  }
  renderApp();
}

// Toast notification helper
function showToast(message, type = "info") {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';

  let iconName = 'info';

  if (type === 'success') {
    iconName = 'check-circle';
  } else if (type === 'error') {
    iconName = 'alert-triangle';
  }

  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-4 h-4 shrink-0 text-[#FDE68A]"></i>
    <div class="text-xs font-medium flex-grow leading-tight">${message}</div>
  `;

  container.appendChild(toast);
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

// Main Render Function
function renderApp() {
  const appRoot = document.getElementById('app-root');
  if (!appRoot) return;

  const route = getCurrentRoute();
  const problemIdParam = getQueryParam('id');
  const user = getCurrentUser();

  let pageContent = '';

  if (route === 'home') {
    pageContent = `
      ${renderNavbar('home', user)}
      <main id="main-content">
        ${renderHero()}
        ${renderProcessSection()}
        ${renderCategorySection()}
        ${renderFeaturedSection()}
        ${renderImpactStats()}
        ${renderStakeholderSection()}
        ${renderCtaSection()}
      </main>
      ${renderFooter()}
    `;
  } else if (route === 'explore') {
    pageContent = `
      ${renderNavbar('explore', user)}
      <main id="main-content">
        ${renderExplorePage()}
      </main>
      ${renderFooter()}
    `;
  } else if (route === 'problem-details') {
    pageContent = `
      ${renderNavbar('problem-details', user)}
      <main id="main-content">
        ${renderProblemDetailsPage(problemIdParam)}
      </main>
      ${renderFooter()}
    `;
  } else if (route === 'raise-problem') {
    pageContent = `
      ${renderNavbar('raise-problem', user)}
      <main id="main-content">
        ${renderRaiseProblemPage()}
      </main>
      ${renderFooter()}
    `;
  } else if (route === 'collaborate') {
    pageContent = `
      ${renderNavbar('collaborate', user)}
      <main id="main-content">
        ${renderCollaboratePage(problemIdParam)}
      </main>
      ${renderFooter()}
    `;
  } else if (route === 'propose-solution') {
    pageContent = `
      ${renderNavbar('propose-solution', user)}
      <main id="main-content">
        ${renderProposeSolutionPage(problemIdParam)}
      </main>
      ${renderFooter()}
    `;
  } else if (route === 'tracking') {
    pageContent = `
      ${renderNavbar('tracking', user)}
      <main id="main-content">
        ${renderTrackingPage()}
      </main>
      ${renderFooter()}
    `;
  } else if (route === 'my-contributions') {
    pageContent = `
      ${renderNavbar('my-contributions', user)}
      <main id="main-content">
        ${renderMyContributionsPage()}
      </main>
      ${renderFooter()}
    `;
  } else if (route === 'about') {
    pageContent = `
      ${renderNavbar('about', user)}
      <main id="main-content">
        ${renderAboutPage()}
      </main>
      ${renderFooter()}
    `;
  } else if (route === 'login') {
    pageContent = `
      ${renderNavbar('login', user)}
      <main id="main-content">
        ${renderLoginPage()}
      </main>
      ${renderFooter()}
    `;
  } else if (route === 'register') {
    pageContent = `
      ${renderNavbar('register', user)}
      <main id="main-content">
        ${renderRegisterPage()}
      </main>
      ${renderFooter()}
    `;
  } else {
    pageContent = `
      ${renderNavbar('home', user)}
      <main id="main-content">
        ${renderHero()}
        ${renderProcessSection()}
        ${renderCategorySection()}
        ${renderFeaturedSection()}
      </main>
      ${renderFooter()}
    `;
  }

  appRoot.innerHTML = pageContent;
  
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Router Event Listeners
window.addEventListener('hashchange', renderApp);

function initializeAppOnLoad() {
  renderApp();

  // Render & initialize animated splash screen if not seen in current session
  const splashRoot = document.getElementById('splash-root');
  if (splashRoot && typeof renderSplashScreen === 'function') {
    splashRoot.innerHTML = renderSplashScreen();
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
    if (typeof initSplashScreen === 'function') {
      initSplashScreen();
    }
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initializeAppOnLoad);
} else {
  initializeAppOnLoad();
}

