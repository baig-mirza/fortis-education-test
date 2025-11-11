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




// ---- Reveal on scroll (alternate left/right, slower) ----
(function(){
  // Ordered sections, top → bottom (continue pattern by adding more)
  const groups = [
    { sel: '.pillars .pillar__badge',  stagger: 250 }, // LEFT
    { sel: '.programs .program-card',  stagger: 200 }, // RIGHT
    { sel: '.testimonials .testi__card', stagger: 250 }, // LEFT
    { sel: '.why .reveal', stagger: 120 }, // this section => slides from RIGHT (per alternation)
    { sel: '.bio-struggles .reveal', stagger: 140 },
    { sel: '.bio-help .reveal', stagger: 120 },
    { sel: '.tutor .reveal', stagger: 140 },
    { sel: '.trust .reveal', stagger: 120 },

  ];

  // Observer (start a bit earlier in viewport)
  const io = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target); // animate once
          }
        });
      }, { rootMargin: '0px 0px -15%', threshold: 0.1 })
    : null;

  // Alternate direction per section: left → right → left → …
  let useLeft = true;
  groups.forEach(g => {
    const items = Array.from(document.querySelectorAll(g.sel));
    items.forEach((el, i) => {
      el.classList.add('reveal', useLeft ? 'reveal-left' : 'reveal-right');
      el.style.setProperty('--reveal-delay', `${i * (g.stagger ?? 250)}ms`);
      if (io) io.observe(el); else el.classList.add('is-visible');
    });
    useLeft = !useLeft;
  });
})();




// Biology subject page styling starts here: observe local reveals (keep explicit left/right classes)
(function(){
  const els = document.querySelectorAll('.subject-hero .reveal');
  if (!els.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible'); // your reveal CSS handles the motion
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -15%', threshold: 0.1 });

  els.forEach(el => io.observe(el));
})();
