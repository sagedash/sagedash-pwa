// site.js — loads header/footer partials with graceful fallback

const FALLBACK_HEADER = `
<nav class="nav">
  <div class="nav-left">
    <a href="/"><img src="/logo.png" class="logo" alt="SageDash"></a>
  </div>
  <div class="nav-right">
    <a href="/" class="nav-link">Home</a>
    <a href="/about.html" class="nav-link">About</a>
    <a href="/how-it-works.html" class="nav-link">How It Works</a>
    <a href="/pricing.html" class="nav-link">Pricing</a>
    <a href="/support.html" class="nav-link">Support</a>
    <a href="/blog.html" class="nav-link">Blog</a>
  </div>
</nav>`;

const FALLBACK_FOOTER = `
<footer class="footer">
  <div><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></div>
  <div>© <span id="y"></span> SageDash</div>
</footer>`;

async function inject(el, url, fallback) {
  if (!el) return;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      el.innerHTML = fallback; // use fallback on 404/500
      return;
    }
    const html = await res.text();
    el.innerHTML = html;
  } catch {
    el.innerHTML = fallback;   // use fallback on network error
  }
}

function highlightActive(headerRoot) {
  if (!headerRoot) return;
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const links = headerRoot.querySelectorAll('.nav-link');
  links.forEach(a => {
    const href = (a.getAttribute('href') || '').replace(/\/+$/, '') || '/';
    const isHome = (path === '/' && (href === '/' || href === '/index.html'));
    const match = isHome || (href !== '/' && path === href);
    if (match) a.classList.add('active');
  });
}

(async function boot(){
  const headerHost = document.getElementById('header');
  const footerHost = document.getElementById('footer');

  await inject(headerHost, '/partials/header.html', FALLBACK_HEADER);
  await inject(footerHost, '/partials/footer.html', FALLBACK_FOOTER);

  // Set year (works for both partial and fallback)
  const yearEl = document.querySelector('#footer #y, footer #y');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Highlight active nav link
  highlightActive(headerHost);
})();
