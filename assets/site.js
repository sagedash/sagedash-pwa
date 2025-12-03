document.addEventListener('DOMContentLoaded', () => {
  // ----- HEADER -----
  const header = document.getElementById('header');
  if (header) {
    header.innerHTML = `
      <nav class="nav">
        <div class="nav-left">
          <a href="/index.html">
            <img src="/assets/logo.png" alt="SageDash logo" class="logo" />
          </a>
        </div>

        <!-- Mobile nav toggle -->
        <input type="checkbox" id="navToggle" class="nav-toggle-checkbox" />
        <label for="navToggle" class="nav-toggle" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <div class="nav-right">
          <a href="/index.html" class="nav-link">Home</a>
          <a href="/how-it-works.html" class="nav-link">How It Works</a>
          <a href="/pricing.html" class="nav-link">Pricing</a>
          <a href="/about.html" class="nav-link">About</a>
          <a href="/blog.html" class="nav-link">Blog</a>
          <a href="/demo.html" class="nav-link">Demo</a>
          <a href="/support.html" class="nav-link">Support</a>
          <a href="/affiliate.html" class="nav-link">Affiliate</a>
        </div>
      </nav>
    `;
  }

  // ----- FOOTER -----
  const footer = document.getElementById('footer');
  if (footer) {
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <footer class="footer">
        <div>
          <div>© ${year} SageDash.</div>
          <div class="footer-note">
            SageDash offers educational parenting guidance, not medical or therapy care.
            In an emergency, contact local services.
          </div>
        </div>
        <div>
          <a href="/support.html">Support</a>&nbsp;·&nbsp;
          <a href="/affiliate.html">Affiliate Program</a>&nbsp;·&nbsp;
          <a href="/privacy.html">Privacy</a>&nbsp;·&nbsp;
          <a href="/terms.html">Terms</a>
        </div>
      </footer>
    `;
  }

  // ----- ACTIVE NAV LINK -----
  const currentPath = (window.location.pathname || '/index.html')
    .replace(/\/+$/, '') || '/index.html';

  const navLinks = document.querySelectorAll('.nav-right .nav-link');
  navLinks.forEach(link => {
    const href = (link.getAttribute('href') || '').replace(/\/+$/, '');
    if (!href) return;

    // Match by filename at end, e.g., /pricing.html
    const hrefFile = href.replace(/^\//, '');
    const pathFile = currentPath.split('/').pop();

    if (hrefFile === pathFile) {
      link.classList.add('active');
    }

    // Special case: home
    if ((currentPath === '/' || currentPath === '/index.html') &&
        (href === '/' || href === '/index.html')) {
      link.classList.add('active');
    }
  });
});