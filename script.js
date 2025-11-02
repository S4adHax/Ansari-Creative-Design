
const API_URL = 'https://shareef-construction-api.onrender.com/api/contact';
// ===== UI Interactions =====

// Mobile nav toggle
const toggleBtn = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__menu');
toggleBtn?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggleBtn.setAttribute('aria-expanded', String(isOpen));
});

// Scrollspy: highlight current section in nav
const links = [...document.querySelectorAll('.nav__menu a[href^="#"]')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const onScroll = () => {
  const y = window.scrollY + 120;
  let active = null;
  for (const sec of sections) {
    if (sec.offsetTop <= y) active = sec.id;
  }
  links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + active));
};
document.addEventListener('scroll', onScroll); onScroll();

// Theme switcher (persist)
const root = document.documentElement;
const themeKey = 'sc-theme';
const saved = localStorage.getItem(themeKey);
if (saved === 'light') root.classList.add('light');
document.getElementById('themeSwitch')?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem(themeKey, root.classList.contains('light') ? 'light' : 'dark');
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Simple slider autoplay
const slider = document.querySelector('.slider');
if (slider) {
  const slides = [...slider.querySelectorAll('.slide')];
  let i = 0; const delay = Number(slider.dataset.autoplay || 5000);
  setInterval(() => {
    slides[i].classList.remove('is-active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-active');
  }, delay);
}

// Masonry gallery (placeholder images)
// const gallery = document.getElementById('galleryGrid');
// if (gallery) {
//   ...
// }
const gallery = document.getElementById('galleryGrid');
if (gallery) {
  const placeholders = [
    'assets/NewCons.jpg','assets/Dining.jpg','assets/Dining2.jpg',
    'assets/Mirror.jpg','assets/Balcony.jpg','assets/BedBalcony.jpg','assets/Lobby.jpg'
  ];
  const addImages = (n=6) => {
    for (let k=0;k<n;k++){
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.src = placeholders[Math.floor(Math.random()*placeholders.length)];
      img.alt = 'Project photo';
      gallery.appendChild(img);
    }
  };
  addImages(8);
  document.getElementById('loadMore')?.addEventListener('click', () => addImages(6));
}

// Contact form -> send to backend
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('formStatus');
  status.textContent = 'Sending...';

  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.ok) {
      status.textContent = '✅ Message sent successfully!';
      form.reset();
    } else {
      status.textContent = json.error || '❌ Failed to send. Please try again.';
    }
  } catch {
    status.textContent = '❌ Network error. Please try again.';
  }
});
