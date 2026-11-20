const menu = document.querySelector('#menu');
const toggle = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');
const mobileMenu = window.matchMedia('(max-width: 1080px)');

if (menu && toggle && header) {
  header.classList.add('enhanced');
  toggle.hidden = false;

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.hidden = mobileMenu.matches && !open;
  };

  setMenu(false);
  mobileMenu.addEventListener('change', () => setMenu(false));
  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') === 'false');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });

  const sectionLinks = [...menu.querySelectorAll('a[href^="#"]')];
  const updateCurrentSection = () => {
    for (const link of sectionLinks) {
      if (link.hash === window.location.hash) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  };
  menu.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !mobileMenu.matches) return;
    const section = document.getElementById(link.hash.slice(1));
    if (section) {
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }
    setMenu(false);
  });
  window.addEventListener('hashchange', updateCurrentSection);
  updateCurrentSection();
}

for (const carousel of document.querySelectorAll('[data-carousel]')) {
  const slides = [...carousel.querySelectorAll('[data-carousel-item]')];
  const controls = carousel.querySelector('.carousel-controls');
  if (!controls || slides.length < 2) continue;
  const dots = [...controls.querySelectorAll('[data-carousel-slide]')];
  const status = carousel.querySelector('.carousel-status');
  const swipeSurface = carousel.querySelector('[data-carousel-swipe]');
  let current = -1;

  function showSlide(index) {
    const next = (index + slides.length) % slides.length;
    if (next === current) return;
    const announce = current !== -1;
    current = next;
    slides.forEach((slide, position) => { slide.hidden = position !== current; });
    dots.forEach((dot, position) => { dot.setAttribute('aria-pressed', String(position === current)); });
    if (announce) status.textContent = slides[current].getAttribute('aria-label');
  }

  showSlide(0);
  carousel.setAttribute('data-carousel-ready', '');
  controls.hidden = false;
  controls.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !controls.contains(button)) return;
    showSlide(button.hasAttribute('data-carousel-slide') ? Number(button.dataset.carouselSlide) : current + Number(button.dataset.carouselStep));
  });
  controls.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showSlide(current + (event.key === 'ArrowLeft' ? -1 : 1));
  });

  if (swipeSurface) {
    let start;
    swipeSurface.addEventListener('touchstart', event => {
      start = event.touches.length === 1 ? event.touches[0] : undefined;
    }, { passive: true });
    swipeSurface.addEventListener('touchend', event => {
      const end = event.changedTouches[0];
      if (!start || !end || start.identifier !== end.identifier) return;
      const horizontal = end.clientX - start.clientX;
      const vertical = end.clientY - start.clientY;
      start = undefined;
      if (Math.abs(horizontal) < 48 || Math.abs(horizontal) < 1.4 * Math.abs(vertical)) return;
      showSlide(current + (horizontal < 0 ? 1 : -1));
    }, { passive: true });
    swipeSurface.addEventListener('touchcancel', () => { start = undefined; }, { passive: true });
  }
}
