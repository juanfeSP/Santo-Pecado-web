// ---------- Pantalla de entrada ("Desliza") ----------
(function () {
  const gate = document.getElementById('introGate');
  const root = document.documentElement;
  if (!gate || !root.classList.contains('intro-on')) return;

  let opened = false;
  let startY = null;

  function openGate() {
    if (opened) return;
    opened = true;
    gate.classList.add('open');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(function () {
      root.classList.remove('intro-on');
      window.scrollTo(0, 0);
      cleanup();
    }, reduce ? 0 : 1150);
  }

  function onWheel(e) { if (e.deltaY > 6) openGate(); }
  function onTouchStart(e) { startY = e.touches[0].clientY; }
  function onTouchMove(e) {
    if (startY !== null && startY - e.touches[0].clientY > 30) openGate();
  }
  function onKey(e) {
    if (['ArrowDown', 'PageDown', ' ', 'Enter'].indexOf(e.key) !== -1) {
      e.preventDefault();
      openGate();
    }
  }
  function cleanup() {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('keydown', onKey);
    gate.removeEventListener('touchstart', onTouchStart);
    gate.removeEventListener('touchmove', onTouchMove);
    gate.removeEventListener('click', openGate);
  }

  window.addEventListener('wheel', onWheel, { passive: true });
  window.addEventListener('keydown', onKey);
  gate.addEventListener('touchstart', onTouchStart, { passive: true });
  gate.addEventListener('touchmove', onTouchMove, { passive: true });
  gate.addEventListener('click', openGate);
})();

const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

function onScroll() {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
