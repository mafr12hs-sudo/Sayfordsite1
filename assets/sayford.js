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
