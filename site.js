<script>
(async function loadPartials(){
  const headerHost = document.getElementById('header');
  const footerHost = document.getElementById('footer');

  // Inject header
  if(headerHost){
    const res = await fetch('/partials/header.html',{cache:'no-store'});
    headerHost.innerHTML = await res.text();

    // After header loads, highlight the active nav link
    const path = location.pathname.replace(/\/+$/,'') || '/';
    const navLinks = headerHost.querySelectorAll('.nav-link');
    navLinks.forEach(a => {
      try{
        const href = a.getAttribute('href') || '';
        const normalized = href.replace(/\/+$/,'') || '/';
        // Mark Home for "/" and "/index.html"
        const isHome = (path === '/' && (normalized === '/' || normalized === '/index.html'));
        const match = isHome || (normalized !== '/' && path === normalized);
        if(match){ a.classList.add('active'); }
      }catch(e){}
    });
  }

  // Inject footer and set year
  if(footerHost){
    const res = await fetch('/partials/footer.html',{cache:'no-store'});
    footerHost.innerHTML = await res.text();
    const y = footerHost.querySelector('#y');
    if(y) y.textContent = new Date().getFullYear();
  }
})();
</script>
