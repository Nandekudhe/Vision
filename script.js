'use strict';
/* =====================================================================
   1. EDIT EVERYTHING HERE — product info, creatives, benefits, FAQ, reviews
   Image fields: paste a path (e.g. "img/creative-1.jpg"). Empty "" = placeholder.
   ===================================================================== */
const CONFIG = {
  brand: 'Vision',
  productName: 'Ultimate Creator Kit',                 // ← PRODUCT NAME
  tagline: 'Start your journey and get viral.',   // ← TAGLINE
  description: 'Force your audience to watch you till end.', // ← DESCRIPTION
  currency: '₹', price: 99, originalPrice: 499, discount: '',    // ← PRICE (discount '' = auto-calculated)
  highlights: ['Instant digital access', 'Easy to use', 'Works on mobile and desktop'],
  checkoutUrl: 'https://pages.razorpay.com/pl_TiFx5pqgoULf6u/view#view-1',                                   // ← PAYMENT LINK (optional, see startCheckout below)

  // ← CREATIVES (16:9 images). Add or remove lines to change the number of slides.
  slides: ['Preview 1.png', 'Preview 2.png', 'Preview 3.png', 'Preview 4.png', 'Preview 5.png'],
  autoSlideMs: 5000,

  // ← BENEFITS (4–6 works best)
  benefits: [
    { icon: '⚡', title: 'Benefit one', desc: 'Never Run Out of Content Ideas.' },
    { icon: '◎', title: 'Benefit two', desc: 'Create Better Hooks & Scripts.' },
    { icon: '✎', title: 'Benefit three', desc: 'Works for Face & Faceless Creators.' },
    { icon: '☺', title: 'Benefit four', desc: 'Know What to Show in Every Video.' },
    { icon: '⟳', title: 'Benefit five', desc: 'Create Faster With AI.' },
    { icon: '⬇', title: 'Benefit six', desc: 'Edit & Publish With a Simple System.' }
  ],

  // ← FAQ
  faq: [
    { q: 'What do I receive?', a: 'A mega creator bundle which make you go viral.' },
    { q: 'How do I access the product?', a: 'After payment you will get a direct download button.' },
    { q: 'Is this safe?', a: 'Yes.' },
    { q: 'Device compatibility?', a: 'You can access and manage from any device.' },
    { q: 'What happens after payment?', a: 'You can download your product and accessible from email too.' },
    { q: 'Refund policy?', a: 'coming soon.' }
  ],

  // ← REVIEWS: DEMO PLACEHOLDERS, NOT REAL CUSTOMERS. Replace with genuine ones, or set reviews: [] to hide the section.
  reviewsNote: 'Some genuine reviews of customers who already bought our product.',
  reviews: [
    { name: 'Deepika', role: 'Mumbai', stars: 5, avatar: '', text: 'Clear, well organised and quick to start using.' },
    { name: 'Kshitij', role: 'Delhi', stars: 5, avatar: '', text: 'Simple to customise, and the files were easy to find.' },
    { name: 'Jangir', role: 'New Delhi', stars: 4, avatar: '', text: 'Good starting point that saved me time on my projects.' }
  ],

  finalHeadline: 'Ready to get started?',
  finalText: 'Force your audience to follow you.',
  links: { instagram: 'coming-soon.html', youtube: 'coming-soon.html', contact: 'coming-soon.html', privacy: 'coming-soon.html', terms: 'coming-soon.html', refund: 'coming-soon.html' }
};

/* =====================================================================
   2. PAYMENT — connect your real gateway here
   Every "Get It Now" button calls this function.
   Option A: paste a public payment link into CONFIG.checkoutUrl above.
   Option B: call YOUR backend (uncomment below) which creates the session.
   NEVER put secret API keys in this file.
   ===================================================================== */
async function startCheckout() {
  if (CONFIG.checkoutUrl) { location.href = CONFIG.checkoutUrl; return; }
  /* ▼▼ EXAMPLE (uncomment after building a backend):
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product: CONFIG.productName })
  });
  const { url } = await res.json(); location.href = url; return;
  ▲▲ */
  toast('Checkout is not connected yet. See startCheckout() in product.js.');
}

/* =====================================================================
   3. APP (no need to edit below)
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HOVER = matchMedia('(hover:hover)').matches;
const C = CONFIG;
const money = n => C.currency + (n % 1 ? Number(n).toFixed(2) : n);
const media = (label, src) => src
  ? `<img src="${src}" alt="${label}" draggable="false" onerror="this.outerHTML='<div class=&quot;image-placeholder&quot;>[${label}]</div>'">`
  : `<div class="image-placeholder">[${label}]</div>`;
const put = (sel, arr, fn) => { $(sel).innerHTML = arr.map(fn).join(''); };
let toastT; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 3500); }

/* text, price, links */
document.title = `${C.productName} | ${C.brand}`;
$$('[data-cfg]').forEach(e => e.textContent = C[e.dataset.cfg]);
$$('[data-price]').forEach(e => e.textContent = money(C.price));
$$('[data-orig]').forEach(e => e.textContent = C.originalPrice > C.price ? money(C.originalPrice) : '');
$$('[data-off]').forEach(e => e.textContent = C.discount || (C.originalPrice > C.price ? Math.round((1 - C.price / C.originalPrice) * 100) + '% off' : ''));
$$('[data-link]').forEach(a => a.href = C.links[a.dataset.link] || '#');
$('#yr').textContent = new Date().getFullYear();
$$('[data-buy]').forEach(b => b.addEventListener('click', startCheckout));

/* lists */
put('#highlights', C.highlights, t => `<li>${t}</li>`);
put('#benefits', C.benefits, (b, i) => `<article class="tile reveal" style="--i:${i}"><span class="ico">${b.icon}</span><h3>${b.title}</h3><p>${b.desc}</p></article>`);
put('#faqList', C.faq, (f, i) => `<div class="qa reveal"><button aria-expanded="false" aria-controls="a${i}">${f.q}<i>+</i></button><div class="ans" id="a${i}"><div><p>${f.a}</p></div></div></div>`);
$('#faqList').addEventListener('click', e => {
  const b = e.target.closest('.qa>button'); if (!b) return;
  const q = b.parentElement, open = !q.classList.contains('open');
  $$('.qa.open').forEach(x => { x.classList.remove('open'); $('button', x).setAttribute('aria-expanded', 'false'); });
  q.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
});
if (C.reviews.length) {
  $('#reviewsNote').textContent = C.reviewsNote;
  put('#reviews', C.reviews, (r, i) => `<figure class="rev reveal" style="--i:${i}"><span class="stars" role="img" aria-label="${r.stars} out of 5 stars">${'★'.repeat(r.stars)}<span class="off-star">${'★'.repeat(5 - r.stars)}</span></span><p>${r.text}</p><figcaption class="who"><span class="av">${r.avatar ? media(r.name, r.avatar) : r.name.charAt(0)}</span><span>${r.name}<small>${r.role}</small></span></figcaption></figure>`);
} else $('#reviewsSection').remove();

/* ---------- creative showcase: slider, dots, auto-slide, swipe ---------- */
const reel = $('#reel'), track = $('#slides'), dotsEl = $('#dots'), S = C.slides;
let idx = 0, timer, hov = false, foc = false, drag = false;
track.innerHTML = S.map((s, i) => `<div class="slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${S.length}"><!-- REPLACE WITH CREATIVE ${i + 1}: CONFIG.slides[${i}] --><div class="frame">${media('CREATIVE ' + (i + 1), s)}</div></div>`).join('');
dotsEl.innerHTML = S.map((_, i) => `<button class="dot" aria-label="Go to creative ${i + 1}"></button>`).join('');
const dots = $$('.dot', dotsEl), slides = $$('.slide', track);
function go(n) {
  idx = (n + S.length) % S.length;
  track.style.setProperty('--i', idx);
  dots.forEach((d, j) => { d.classList.toggle('on', j === idx); j === idx ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current'); });
  slides.forEach((s, j) => s.setAttribute('aria-hidden', j !== idx));
}
const stop = () => clearInterval(timer);
const play = () => { stop(); if (!RM && S.length > 1) timer = setInterval(() => go(idx + 1), C.autoSlideMs); };
const sync = () => (hov || foc || drag || document.hidden) ? stop() : play();   // pause while interacting, resume afterwards
if (S.length < 2) { $('#prev').hidden = $('#next').hidden = dotsEl.hidden = true; }
$('#prev').onclick = () => { go(idx - 1); sync(); };
$('#next').onclick = () => { go(idx + 1); sync(); };
dotsEl.addEventListener('click', e => { const d = e.target.closest('.dot'); if (d) { go(dots.indexOf(d)); sync(); } });
reel.addEventListener('pointerenter', () => { hov = true; sync(); });
reel.addEventListener('pointerleave', () => { hov = false; sync(); });
reel.addEventListener('focusin', () => { foc = true; sync(); });
reel.addEventListener('focusout', () => { foc = false; sync(); });
reel.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(idx - 1); if (e.key === 'ArrowRight') go(idx + 1); });
document.addEventListener('visibilitychange', sync);
let sx = 0, dx = 0;
reel.addEventListener('pointerdown', e => {
  if (e.target.closest('button')) return;
  drag = true; sx = e.clientX; dx = 0; track.classList.add('drag'); reel.setPointerCapture(e.pointerId); sync();
});
reel.addEventListener('pointermove', e => { if (drag) { dx = e.clientX - sx; track.style.setProperty('--dx', dx + 'px'); } });
const endDrag = () => {
  if (!drag) return; drag = false; track.classList.remove('drag'); track.style.setProperty('--dx', '0px');
  if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
  dx = 0; sync();
};
reel.addEventListener('pointerup', endDrag); reel.addEventListener('pointercancel', endDrag);
go(0); sync();

/* nav state */
const nav = $('#nav'); let scrolled = false;
addEventListener('scroll', () => { const s = scrollY > 20; if (s !== scrolled) { scrolled = s; nav.classList.toggle('scrolled', s); } }, { passive: true });
nav.classList.toggle('scrolled', scrollY > 20);

/* scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
$$('.reveal').forEach(el => RM ? el.classList.add('in') : io.observe(el));

/* magnetic buttons (mouse devices only) */
if (!RM && HOVER) $$('.magnetic').forEach(b => {
  b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
  b.addEventListener('pointerleave', () => { b.style.transform = ''; });
});
/* 3-dots menu toggle */
const menuBtn = document.querySelector('#menuBtn');
const menuDropdown = document.querySelector('#menuDropdown');

if (menuBtn && menuDropdown) {
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menuBtn.classList.toggle('open');
    menuDropdown.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!menuDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
      menuBtn.classList.remove('open');
      menuDropdown.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  menuDropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      menuDropdown.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}
/* ---------- LIGHTBOX / ENLARGE POPUP ---------- */
const lbEl = $('#lb'), lbBox = $('#lbBox'), lbX = $('#lbX'), lbP = $('#lbP'), lbN = $('#lbN');

const openLightbox = (show) => {
  lbEl.classList.toggle('open', show);
  document.body.style.overflow = show ? 'hidden' : '';
  if (show) lbBox.innerHTML = `<div class="frame">${media('CREATIVE ' + (idx + 1), S[idx])}</div>`;
};

// Open lightbox on tap or click, but ignore when user was dragging/swiping
let isSwiping = false;

reel.addEventListener('pointerdown', () => { isSwiping = false; });
reel.addEventListener('pointermove', () => { isSwiping = true; });

reel.addEventListener('click', (e) => {
  // If the user tapped arrows or dots, don't open zoom
  if (e.target.closest('button')) return;
  
  // If the user actually swiped, don't open zoom
  if (isSwiping) return;

  // Otherwise, open the enlarged image
  openLightbox(true);
});


// Controls inside the enlarged view
if (lbX) lbX.onclick = () => openLightbox(false);
if (lbP) lbP.onclick = () => { go(idx - 1); openLightbox(true); };
if (lbN) lbN.onclick = () => { go(idx + 1); openLightbox(true); };

lbEl.addEventListener('click', (e) => {
  if (e.target === lbEl) openLightbox(false);
});

addEventListener('keydown', (e) => {
  if (!lbEl.classList.contains('open')) return;
  if (e.key === 'Escape') openLightbox(false);
  if (e.key === 'ArrowLeft') { go(idx - 1); openLightbox(true); }
  if (e.key === 'ArrowRight') { go(idx + 1); openLightbox(true); }
});

