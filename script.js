const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
  menu.querySelector('span').textContent = open ? '−' : '＋';
});
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
  menu.querySelector('span').textContent = '＋';
}
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); }
});
document.querySelectorAll('.dimension-card').forEach(card => {
  card.addEventListener('click', () => {
    const expanded = card.getAttribute('aria-expanded') !== 'true';
    card.setAttribute('aria-expanded', String(expanded));
    document.getElementById(card.getAttribute('aria-controls')).hidden = !expanded;
  });
});
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('pending'); observer.unobserve(entry.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(section => {
    if (section.getBoundingClientRect().top > window.innerHeight) { section.classList.add('pending'); observer.observe(section); }
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { document.querySelectorAll('.pending').forEach(section => section.classList.remove('pending')); observer.disconnect(); }
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
const flightToggle = document.querySelector('.flight-toggle');
const flightView = document.querySelector('.flight-animation');
flightToggle?.addEventListener('click', () => {
  const paused = flightToggle.getAttribute('aria-pressed') !== 'true';
  flightToggle.setAttribute('aria-pressed', String(paused));
  flightView.classList.toggle('paused', paused);
  flightToggle.innerHTML = paused ? 'Play view <span aria-hidden="true">▷</span>' : 'Pause view <span aria-hidden="true">Ⅱ</span>';
});
