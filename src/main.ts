import './styles.css';
import { initAdvisor } from './modules/advisor';
import { initCalculators } from './modules/calculators';
import { initChallenge } from './modules/challenge';
import { initFood } from './modules/food';
import { initTimer } from './modules/timer';
import { initWorkout } from './modules/workout';

/* ---------- Navigatsiya ---------- */
function initNav(): void {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');

  const onScroll = (): void => {
    nav?.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  burger?.addEventListener('click', () => {
    const open = links?.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(Boolean(open)));
  });

  links?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).tagName === 'A') {
      links.classList.remove('is-open');
      burger?.setAttribute('aria-expanded', 'false');
    }
  });

  // Faol bo'limni belgilash
  const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
  const navAnchors = [...document.querySelectorAll<HTMLAnchorElement>('.nav__links a')];
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navAnchors.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => spy.observe(s));
}

/* ---------- Bo'limlarni yumshoq ko'tarish ---------- */
function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('.section__head, .calc, .card, .stat, .plan__day, .challenge__panel, .challenge__chart, .timer, .advisor, .food-card');
  targets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'none';
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  targets.forEach((t) => io.observe(t));
}

function boot(): void {
  initNav();
  initCalculators();
  initFood();
  initWorkout();
  initChallenge();
  initTimer();
  initAdvisor();
  initReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
