// ---------- Reveal on scroll (both directions) ----------
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

// ---------- Topbar background on scroll ----------
window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 60);
});
