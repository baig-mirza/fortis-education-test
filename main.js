const burger = document.querySelector('.burger');
const nav = document.querySelector('#nav');

burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.classList.toggle('active'); // <- this makes the X appear
  burger.setAttribute('aria-expanded', String(open));
});


// Subjects dropdown (mobile tap; desktop = CSS hover)
const subjectsBtn = document.querySelector('.nav__link--button');
const submenu = document.querySelector('.submenu');

function closeOnOutside(e){
  const parent = subjectsBtn.closest('.has-submenu');
  if (parent && !parent.contains(e.target)) {
    submenu.classList.remove('open');
    subjectsBtn.setAttribute('aria-expanded','false');
    document.removeEventListener('click', closeOnOutside);
  }
}

subjectsBtn?.addEventListener('click', (e) => {
  // Detect touch interfaces rather than just width
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (!isTouch) return; // desktop handled by hover

  e.preventDefault();
  const open = submenu.classList.toggle('open');
  subjectsBtn.setAttribute('aria-expanded', String(open));

  if (open) {
    setTimeout(() => document.addEventListener('click', closeOnOutside), 0);
  }
});


// Footer year
document.getElementById('year')?.append(new Date().getFullYear());
