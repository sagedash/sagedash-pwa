(async function loadPartials(){
  const headerHost = document.getElementById('header');
  const footerHost = document.getElementById('footer');

  // Inject header
  if (headerHost) {
    try {
      const res = await fetch('/partials/header.html', { cache: 'no-store' });
      headerHost.innerHTML = await res.text();

      // Highlight active nav link
      const path = location.pathname.replace(/\/+$/, '') || '/';
      const navLinks = headerHost.querySelectorAll('.nav-link');
      navLinks.forEach(a => {
        const href = (a.getAttribute('href') || '').replace(/\/+$/, '') || '/';
        const isHome = (path === '/' && (href === '/' || href === '/index.html'));
        const match = isHome || (href !== '/' && path === href);
        if (match) a.classList.add('active');
      });
    } catch (e) {
      console.error('Header load failed:', e);
    }
  }

  // Inject footer & set year
  if (footerHost) {
    try {
      const res = await fetch('/partials/footer.html', { cache: 'no-store' });
      footerHost.innerHTML = await res.text();
      const y = footerHost.querySelector('#y');
      if (y) y.textContent = new Date().getFullYear();
    } catch (e) {
      console.error('Footer load failed:', e);
    }
  }
})();
