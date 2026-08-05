/* ===================================================================
   ALGO HUB — Shared navbar (injected into <header id="site-navbar">)
   Active link is set via body[data-page] on each HTML file.
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('site-navbar');
  if (!target) return;

  const page = document.body.getAttribute('data-page') || '';
  const links = [
    { href: 'index.html', label: 'Home', key: 'home' },
    { href: 'about.html', label: 'About', key: 'about' },
    { href: 'services.html', label: 'Services', key: 'services' },
    { href: 'courses.html', label: 'Courses', key: 'courses' },
    { href: 'projects.html', label: 'Projects', key: 'projects' },
  ];

  const navItems = (extraClass = '') => links.map(l =>
    `<a href="${l.href}" class="nav-link${extraClass}${l.key === page ? ' active' : ''}">${l.label}</a>`
  ).join('\n');

  target.id = 'navbar';
  target.className = 'navbar';
  target.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="index.html" class="logo-text flex items-center gap-2">
          <img src="img/algohub-logo.png" alt="Algo Hub logo" class="logo-img">
          <span class="flex items-center gap-0.5"><span class="logo-algo">Algo</span><span class="logo-hub">Hub</span></span>
        </a>

        <nav class="hidden lg:flex items-center gap-8">
          ${navItems()}
        </nav>

       <div class="hidden lg:flex items-center gap-3">
  <button data-theme-toggle aria-label="Toggle dark mode" class="theme-toggle-btn">
    <i data-lucide="moon" class="w-[18px] h-[18px]"></i>
  </button>
  <a href="login.html" class="btn-ghost">Login</a>
  <a href="register.html" class="btn-ghost">Register</a>
  <a href="register.html" class="btn-primary">Get Started</a>
</div>

        <button id="menu-toggle" aria-label="Toggle menu" aria-expanded="false" class="lg:hidden text-[--text-primary]">
          <i data-icon-state data-lucide="menu" class="w-6 h-6"></i>
        </button>
      </div>

      <div id="mobile-menu" class="mobile-menu lg:hidden">
        <div class="flex flex-col gap-1 pb-5 pt-1">
          ${navItems(' py-2')}
          ${navItems(' py-2')}
<button data-theme-toggle aria-label="Toggle dark mode" class="nav-link py-2 flex items-center gap-2 w-full text-left bg-transparent border-0 cursor-pointer">
  <i data-lucide="moon" class="w-4 h-4"></i>
  <span>Dark Mode</span>
</button>
<div class="divider-fade my-2"></div>
          <div class="divider-fade my-2"></div>
          <a href="login.html" class="nav-link py-2">Login</a>
          <a href="register.html" class="nav-link py-2">Register</a>
          <a href="register.html" class="btn-primary justify-center mt-2">Get Started</a>
        </div>
      </div>
    </div>
  `;

  // Note: initNavbar()/initMobileMenu() run afterwards via script.js's own
  // DOMContentLoaded listener, which fires after this one (script order).
  if (window.lucide) lucide.createIcons();
});