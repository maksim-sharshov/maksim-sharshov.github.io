// ---------- Mobile navigation menu ----------
(function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('menu-backdrop');
  const topbar = document.getElementById('topbar');
  if (!toggle || !menu || !backdrop) return;

  function setOpen(open) {
    toggle.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    if (topbar) topbar.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  backdrop.addEventListener('click', () => setOpen(false));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
