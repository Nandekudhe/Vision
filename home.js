'use strict';
/* =====================================================================
   1. EDIT EVERYTHING HERE — product info, images, links, copy
   Image fields: paste a path/URL (e.g. "img/hero1.jpg"). Empty = placeholder.
   ===================================================================== */
const CONFIG = {
  brand: 'Vision',
  productName: 'Universal Creator Kit',
  badge: 'New digital download',
  headline: 'Your Vision decides your life.',
  description: 'Live sale for all products!',
  currency: '₹', price: 99, originalPrice: 499, discount: '',   // discount '' = auto-calculated; set text to override
  priceNote: 'Current hot product    .',
  checkoutUrl: '',            // optional public payment link (Stripe Payment Link, Gumroad, etc.)
  images: { hero1: 'P345.png', hero2: 'P1H3.png', hero3: 'hero11.png', creator: 'logo.png', final: 'Last.png' },
  gallery: ['UCP.png', 'AIRB.png', 'LS.png', 'LS.png', 'LS.png'],                                  // add more paths to add more previews
  
  trust: ['Made for creators', 'Instant digital access', 'Easy to use', 'Created for serious peoples'],
  features: [
    { icon: '▦', title: 'Template Pack', desc: '✅' },
    { icon: '◐', title: 'Presets', desc: '✅' },
    { icon: '✦', title: 'Resources', desc: '✅' },
    { icon: '★', title: 'Canva Design Templates', desc: '✅' },
    { icon: '☰', title: 'Guides', desc: '✅' },
    { icon: '⬇', title: 'Files & Extras', desc: '✅' }
  ],
  bonuses: ['Bonus item 1', 'Bonus item 2'],
  
  steps: [
    { t: 'Choose your product', d: 'Pick the pack and tap Buy Now.' },
    { t: 'Complete payment', d: 'Pay securely on the checkout page.' },
    { t: 'Get instant access', d: 'Download your files right away.' }
  ],
  creatorName: 'Vision',
  creatorBio: 'Vision, Vision is to make you earn your first 100k',
  // PLACEHOLDER testimonials — replace with genuine ones only
  testimonials: [
    { text: 'Thank you so much vision, finally I hit my 10k followers.', name: 'Tharun', role: 'India / Assam' },
    { text: 'Woo, you made me believe that online earning is real.', name: 'Himanshi', role: 'India / Banglore' },
    { text: 'Great work , like bro i can say its WORTH IT.', name: 'Maunu', role: 'India / Delhi' },
    { text: 'Love you vision, in just 100 you are giving that much value.', name: 'Ananya', role: 'India / Delhi' }
  ],
  faq: [
    { q: 'What do I receive?', a: 'You’ll receive all the files, resources, and bonuses included with the product.' },
    { q: 'How do I access the product?', a: 'You’ll get access to your digital product immediately after successful payment.' },
    { q: 'Is this a digital product?', a: 'Yes, this is a 100% digital product with no physical delivery.' },
    { q: 'Can I use it on mobile?', a: 'Yes, you can access and use the product on your mobile, tablet, or computer.' },
    { q: 'Who is this for?', a: 'This product is designed for anyone looking to learn, create, save time, or improve their results in this area.' },
    { q: 'What happens after payment?', a: 'After successful payment, you’ll be redirected to the download/access page.' },
    { q: 'Refund policy?', a: 'Our refund policy is coming soon.' }
  ],
  finalHeadline: 'Ready to get started?',
  finalText: 'A free item to get started (For Video Editors).',
  links: { instagram: 'coming-soon.html', youtube: 'coming-soon.html', contact: 'coming-soon.html', privacy: 'coming-soon.html', terms: 'coming-soon.html', refund: 'coming-soon.html' }
};

/* =====================================================================
   2. PAYMENT — connect your real gateway here
   NEVER put secret keys in this file. Call YOUR backend endpoint, which
   talks to Stripe / Razorpay / Lemon Squeezy / etc. and returns a checkout URL.
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
  toast('Checkout is not connected yet. See startCheckout() in script.js.');
}

/* =====================================================================
   3. APP (no need to edit below)
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HOVER = matchMedia('(hover:hover)').matches;
const C = CONFIG;
const money = n => C.currency + (n % 1 ? Number(n).toFixed(2) : n);
const media = (label, src) => src ? `<img src="${src}" alt="${label}" loading="lazy" draggable="false">` : `<div class="image-placeholder">[${label}]</div>`;
const put = (sel, arr, fn) => { $(sel).innerHTML = arr.map(fn).join(''); };
let toastT; const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 3500); };

/* text, price, links, images */
document.title = `${C.productName} | ${C.brand}`;
$$('[data-cfg]').forEach(e => e.textContent = C[e.dataset.cfg]);
$$('[data-price]').forEach(e => e.textContent = money(C.price));
const off = C.discount || (C.originalPrice > C.price ? Math.round((1 - C.price / C.originalPrice) * 100) + '% off' : '');
$$('[data-orig]').forEach(e => e.textContent = C.originalPrice > C.price ? money(C.originalPrice) : '');
$$('[data-off]').forEach(e => e.textContent = off);
$$('[data-link]').forEach(a => a.href = C.links[a.dataset.link] || '#');
$$('[data-img]').forEach(el => { const s = C.images[el.dataset.img]; if (s || !el.children.length) el.innerHTML = media(el.dataset.label, s); });
$('#yr').textContent = new Date().getFullYear();
$('#heroTitle').innerHTML = C.headline.split(' ').map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(' ');

/* lists */
put('#trust', C.trust, t => `<span>${t}</span>`);
put('#featureGrid', C.features, (f, i) => `<article class="tile reveal" style="--i:${i}"><span class="ico">${f.icon}</span><h3>${f.title}</h3><p>${f.desc}</p></article>`);
put('#steps', C.steps, (s, i) => `<div class="step reveal" style="--i:${i}"><div class="num">0${i + 1}</div><h3>${s.t}</h3><p>${s.d}</p></div>`);
put('#incl', C.features.map(f => f.title).concat(C.bonuses), t => `<li>${t}</li>`);
const tHTML = C.testimonials.map(t => `<figure class="quote"><p>“${t.text}”</p><small>${t.name} · ${t.role}</small></figure>`).join('');
$('#mq').innerHTML = tHTML + tHTML;
put('#faqList', C.faq, (f, i) => `<div class="qa reveal"><button aria-expanded="false" aria-controls="a${i}">${f.q}<i>+</i></button><div class="ans" id="a${i}"><div><p>${f.a}</p></div></div></div>`);
$('#faqList').addEventListener('click', e => {
  const b = e.target.closest('.qa>button'); if (!b) return;
  const q = b.parentElement, open = !q.classList.contains('open');
  $$('.qa.open').forEach(x => { x.classList.remove('open'); $('button', x).setAttribute('aria-expanded', 'false'); });
  q.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
});

/* gallery + lightbox */
const G = C.gallery, view = $('#viewer'), th = $('#thumbs'), L = $('#lb'), box = $('#lbBox');
let gi = 0;
const slide = i => `<div class="frame"><!-- REPLACE WITH TEMPLATE PREVIEW ${i + 1}: gallery[${i}] -->${media('TEMPLATE PREVIEW ' + (i + 1), G[i])}</div>`;
th.innerHTML = G.map((s, i) => `<button class="th" aria-label="Preview ${i + 1}"><div class="frame">${media('PREVIEW ' + (i + 1), s)}</div></button>`).join('');
function show(i) {
  gi = (i + G.length) % G.length;
  view.innerHTML = slide(gi);
  $$('.th').forEach((t, j) => t.classList.toggle('on', j === gi));
  const t = th.children[gi]; th.scrollTo({ left: t.offsetLeft - th.clientWidth / 2 + t.clientWidth / 2, behavior: RM ? 'auto' : 'smooth' });
  if (L.classList.contains('open')) box.innerHTML = slide(gi);
}
const lb = open => { L.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : ''; if (open) box.innerHTML = slide(gi); };
th.addEventListener('click', e => { const b = e.target.closest('.th'); if (b) show([...th.children].indexOf(b)); });
$('#prev').onclick = $('#lbP').onclick = () => show(gi - 1);
$('#next').onclick = $('#lbN').onclick = () => show(gi + 1);
// List of pages for your 5 previews in order:
const productPages = [
  'product.html',      // Preview 1
  'product2.html',  // Preview 2 (replace later with your new page)
  'coming-soon.html',  // Preview 3 (replace later with your new page)
  'coming-soon.html',  // Preview 4 (replace later with your new page)
  'coming-soon.html'   // Preview 5 (replace later with your new page)
];

view.onclick = () => {
  const targetUrl = productPages[gi];
  if (targetUrl) {
    window.location.href = targetUrl;
  } else {
    lb(true);
  }
};

view.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lb(true); } };
$('#lbX').onclick = () => lb(false);
L.addEventListener('click', e => { if (e.target === L) lb(false); });
addEventListener('keydown', e => { if (!L.classList.contains('open')) return; if (e.key === 'Escape') lb(false); if (e.key === 'ArrowLeft') show(gi - 1); if (e.key === 'ArrowRight') show(gi + 1); });
show(0);

/* buy buttons */
$$('[data-buy]').forEach(b => b.addEventListener('click', startCheckout));

/* mobile menu */
const bg = $('#burger'), lk = $('#links');
const menu = o => { lk.classList.toggle('open', o); bg.setAttribute('aria-expanded', o); };
bg.onclick = () => menu(!lk.classList.contains('open'));
lk.addEventListener('click', e => { if (e.target.closest('a')) menu(false); });

/* scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
$$('.reveal,.clip,.steps').forEach(el => RM ? el.classList.add('in') : io.observe(el));

/* nav state + parallax (one rAF-throttled scroll handler) */
const nav = $('#nav'), px = RM ? [] : $$('[data-speed]'); let tick = false;
function onScroll() {
  if (tick) return; tick = true;
  requestAnimationFrame(() => {
    tick = false; nav.classList.toggle('scrolled', scrollY > 20);
    px.forEach(e => {
      const r = e.parentElement.getBoundingClientRect(); if (r.bottom < -200 || r.top > innerHeight + 200) return;
      e.style.setProperty('--py', ((r.top + r.height / 2 - innerHeight / 2) * e.dataset.speed).toFixed(1) + 'px');
    });
  });
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();
$$('.stage').forEach(s => { s.style.transform = 'translate3d(0,var(--py,0px),0)'; });

/* pointer effects: tilt, magnetic buttons, cursor glow (mouse devices only) */
if (!RM && HOVER) {
  $$('.tilt').forEach(el => {
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 10 + 'deg'); el.style.setProperty('--rx', -((e.clientY - r.top) / r.height - .5) * 10 + 'deg'); });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--ry', '0deg'); el.style.setProperty('--rx', '0deg'); });
  });
  $$('.magnetic').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
  const cur = $('#cursor');
  addEventListener('pointermove', e => { cur.style.opacity = 1; cur.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`; }, { passive: true });
}
