// site.js — loads header/footer partials with graceful fallback

const LOGO_SRC = '/assets/logo.png'; // absolute path so it always works

const FALLBACK_HEADER = `
<nav class="nav">
  <div class="nav-left">
    <a href="/"><img src="${LOGO_SRC}" class="logo" alt="SageDash"></a>
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
    el.innerHTML = res.ok ? await res.text() : fallback;
  } catch {
    el.innerHTML = fallback;
  }
}

function highlightActive(headerRoot) {
  if (!headerRoot) return;
  const path = location.pathname.replace(/\/+$/, '') || '/';
  headerRoot.querySelectorAll('.nav-link').forEach(a => {
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

  const y = document.querySelector('#footer #y, footer #y');
  if (y) y.textContent = new Date().getFullYear();

  highlightActive(headerRoot = headerHost);
})();
