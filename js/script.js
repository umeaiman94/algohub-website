/* ===================================================================
   ALGO HUB — Core Interactions
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initSplashScreen();
  initNavbar();
  initMobileMenu();
  initReveal();
  initCounters();
  initHeroNetwork();
  initModals();
  initPasswordToggles();
  initCardTilt();
  initThemeToggle();
});

/* Lucide icons */
function initIcons() {
  if (window.lucide) lucide.createIcons();
}

/* Splash screen — shows the logo briefly on every page load, then fades out */
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  const minShowTime = 700; // ms — always visible at least this long
  const start = performance.now();

  function hide() {
    const elapsed = performance.now() - start;
    const remaining = Math.max(0, minShowTime - elapsed);
    setTimeout(() => {
      splash.classList.add('hide');
      setTimeout(() => splash.remove(), 550); // matches CSS transition duration
    }, remaining);
  }

  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
}

/* Sticky navbar blur on scroll */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Mobile menu toggle */
function initMobileMenu() {
  const btn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    const icon = btn.querySelector('[data-icon-state]');
    const isOpen = menu.classList.contains('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (icon) icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    if (window.lucide) lucide.createIcons();
  });
}

/* Scroll-reveal via IntersectionObserver */
function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el, i) => {
    el.style.setProperty('--delay', `${(i % 4) * 90}ms`);
    io.observe(el);
  });
}

/* Animated counters for statistics */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => io.observe(el));
}

/* ===================================================================
   Hero network canvas — connected AI nodes (signature visual)
   =================================================================== */
function initHeroNetwork() {
  const canvas = document.getElementById('hero-network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, nodes, dpr;
  const NODE_COUNT = 34;
  const LINK_DIST = 130;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 1.2,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);

    // links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.35;
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
      grad.addColorStop(0, 'rgba(59, 130, 246, 0.9)');
      grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#2563EB';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(tick);
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  resize();
  makeNodes();
  if (!reduceMotion) requestAnimationFrame(tick);
  else tick();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); makeNodes(); }, 200);
  });
}

/* ===================================================================
   Modal system
   Usage: elements with [data-modal-open="key"] open modal filled from DATA
   Requires a <template id="modal-template"> and a container #modal-root
   =================================================================== */
function initModals() {
  const root = document.getElementById('modal-root');
  if (!root) return;

  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-open]');
    if (trigger) {
      const key = trigger.getAttribute('data-modal-open');
      openModal(key);
    }
    if (e.target.closest('[data-modal-close]') || e.target === root.querySelector('.modal-overlay')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(key) {
  const root = document.getElementById('modal-root');
  const data = window.ALGOHUB_MODAL_DATA ? window.ALGOHUB_MODAL_DATA[key] : null;
  if (!root || !data) return;

  root.innerHTML = `
    <div class="modal-overlay" role="dialog" aria-modal="true">
      <div class="modal-panel p-8">
        <div class="flex items-start justify-between gap-4 mb-5">
          <div class="card-icon-wrap" style="background:var(--brand-gradient); color:#fff;">
            <i data-lucide="${data.icon || 'sparkles'}" class="w-6 h-6"></i>
          </div>
          <button data-modal-close aria-label="Close" class="text-[--grey-1] hover:text-[--text-primary] transition-colors">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        ${data.badge ? `<span class="badge badge-blue mb-3">${data.badge}</span>` : ''}
        <h3 class="font-display text-2xl font-bold mb-3">${data.title}</h3>
        <p class="text-[--grey-1] leading-relaxed mb-5">${data.description}</p>
        ${data.points ? `<ul class="space-y-2.5 mb-6">${data.points.map(p => `
          <li class="flex items-start gap-2.5 text-sm text-[--text-primary]">
            <i data-lucide="check-circle-2" class="w-4 h-4 mt-0.5 shrink-0" style="color:var(--grad-1)"></i>
            <span>${p}</span>
          </li>`).join('')}</ul>` : ''}
        <div class="flex gap-3">
          <a href="${data.ctaHref || 'register.html'}" class="btn-primary flex-1">${data.ctaLabel || 'Get Started'}</a>
          <button data-modal-close class="btn-secondary">Close</button>
        </div>
      </div>
    </div>
  `;
  requestAnimationFrame(() => {
    root.querySelector('.modal-overlay').classList.add('open');
  });
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

function closeModal() {
  const root = document.getElementById('modal-root');
  if (!root) return;
  const overlay = root.querySelector('.modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { root.innerHTML = ''; }, 300);
}

/* Password visibility toggles on auth pages */
function initPasswordToggles() {
  document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-toggle-password');
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      const icon = btn.querySelector('i');
      if (icon) icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
      if (window.lucide) lucide.createIcons();
    });
  });
}
/* 3D tilt on cards — follows the cursor, snaps back smoothly on leave */
function initCardTilt() {
  const cards = document.querySelectorAll('.card');
  if (!cards.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return; // keep the plain CSS lift/shadow hover as the fallback

  const maxTilt = 7; // degrees — keep it subtle, not gimmicky

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transitionDuration = '0.1s'; // snappy while actively tracking the cursor
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;   // 0 → 1 across the card
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transitionDuration = '0.45s'; // smooth settle back to flat
      card.style.transform = '';
    });
  });
}
/* Light/dark theme toggle — persisted in localStorage, synced across
   the desktop and mobile toggle buttons */
function initThemeToggle() {
  const btns = document.querySelectorAll('[data-theme-toggle]');
  if (!btns.length) return;

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function applyIcon() {
    const dark = isDark();
    btns.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) icon.setAttribute('data-lucide', dark ? 'sun' : 'moon');
    });
    if (window.lucide) lucide.createIcons();
  }

  function setTheme(theme) {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('algohub-theme', theme); } catch (e) {}
    applyIcon();
  }

  btns.forEach((btn) => {
    btn.addEventListener('click', () => setTheme(isDark() ? 'light' : 'dark'));
  });

  applyIcon(); // reflect whatever theme the anti-flash script already applied
}

/* Simple front-end only form handling (UI demo, no backend) */
function handleDemoSubmit(e, message) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) {
    const original = btn.textContent;
    btn.textContent = message || 'Success';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 1800);
  }
  return false;
}