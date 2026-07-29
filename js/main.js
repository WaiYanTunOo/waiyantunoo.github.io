(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersPointer = window.matchMedia('(pointer: fine)').matches;

  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const progress = document.getElementById('scroll-progress');
  const toTop = document.getElementById('to-top');
  const glow = document.getElementById('cursor-glow');

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }

  window.closeMenu = closeMenu;

  if (menuBtn && mobileMenu) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Scroll progress + nav + back-to-top ---------- */
  const sectionIds = ['about', 'projects', 'experience', 'education', 'skills', 'contact'];
  const navLinks = [...document.querySelectorAll('.nav-links a')];

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (y / docH) * 100 : 0;

    if (progress) progress.style.width = `${pct}%`;
    if (nav) nav.classList.toggle('scrolled', y > 20);
    if (toTop) toTop.classList.toggle('show', y > 520);

    // Active nav section
    let current = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= 120) current = id;
    }
    navLinks.forEach((a) => {
      const href = a.getAttribute('href') || '';
      a.classList.toggle('active', href === `#${current}`);
    });

    // Timeline progress
    document.querySelectorAll('.timeline').forEach((tl) => {
      const rect = tl.getBoundingClientRect();
      const view = window.innerHeight * 0.7;
      const start = window.innerHeight * 0.85;
      const raw = (start - rect.top) / (rect.height + view);
      const p = Math.min(1, Math.max(0, raw));
      tl.style.setProperty('--line-progress', p.toFixed(3));
    });
  }

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Cursor glow ---------- */
  if (glow && prefersPointer && !reduceMotion) {
    document.body.classList.add('has-pointer');
    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let tx = gx;
    let ty = gy;

    window.addEventListener(
      'pointermove',
      (e) => {
        tx = e.clientX;
        ty = e.clientY;
      },
      { passive: true }
    );

    (function follow() {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.left = `${gx}px`;
      glow.style.top = `${gy}px`;
      requestAnimationFrame(follow);
    })();
  }

  /* ---------- Reveal + hero entrance ---------- */
  if (!reduceMotion) {
    document.querySelectorAll('.hero-anim').forEach((el, i) => {
      el.style.transition = `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s`;
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          if (entry.target.classList.contains('signal')) {
            animateCount(entry.target.querySelector('[data-count]'));
          }
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .signal').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.hero-anim, .reveal, .signal').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('visible');
      const n = el.querySelector?.('[data-count]') || (el.matches?.('[data-count]') ? el : null);
      if (n) n.textContent = n.dataset.countSuffix
        ? `${n.dataset.count}${n.dataset.countSuffix}`
        : n.dataset.count;
    });
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    if (!el || el.dataset.done) return;
    el.dataset.done = '1';
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.countSuffix || '';
    const duration = 1100;
    const start = performance.now();

    if (reduceMotion) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Rotating role text ---------- */
  const rotator = document.getElementById('role-rotator');
  if (rotator) {
    const items = [...rotator.querySelectorAll('span')];
    let idx = 0;
    items[0]?.classList.add('is-active');

    if (!reduceMotion && items.length > 1) {
      setInterval(() => {
        items[idx].classList.remove('is-active');
        idx = (idx + 1) % items.length;
        items[idx].classList.add('is-active');
      }, 2800);
    }
  }

  /* ---------- Project language filter ---------- */
  const filterBar = document.getElementById('lang-filter');
  const codeGrid = document.getElementById('code-grid');

  if (filterBar && codeGrid) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      const filter = btn.dataset.filter;

      filterBar.querySelectorAll('button').forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });

      codeGrid.querySelectorAll('.code-card').forEach((card) => {
        const langs = (card.dataset.lang || '').split(/\s+/);
        const show = filter === 'all' || langs.includes(filter);

        if (show) {
          card.classList.remove('hidden', 'is-hiding');
          card.hidden = false;
        } else if (!reduceMotion) {
          card.classList.add('is-hiding');
          window.setTimeout(() => {
            if (card.classList.contains('is-hiding')) {
              card.classList.add('hidden');
              card.hidden = true;
            }
          }, 280);
        } else {
          card.classList.add('hidden');
          card.hidden = true;
        }
      });
    });
  }

  /* ---------- Subtle tilt on featured work (desktop) ---------- */
  if (prefersPointer && !reduceMotion) {
    document.querySelectorAll('.work-item, .code-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---------- Year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
