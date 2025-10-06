// assets/js/nav-init.js
(function(){
  function initNav(){
    // active link (op bestandsnaam)
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar .nav-link').forEach(a => {
      const href = (a.getAttribute('href') || '').split('/').pop();
      if (href === path) a.classList.add('active');
    });

    // cart badge
    const LS_KEY = 'em-cart';
    function updateNavCart(){
      try {
        const cart = JSON.parse(localStorage.getItem(LS_KEY)) || {};
        const n = Object.values(cart).reduce((s,i)=> s + (i.qty || 0), 0);
        const el = document.getElementById('navCartCount');
        if (el) { el.textContent = n; el.style.display = n ? 'inline-block' : 'none'; }
      } catch {}
    }
    updateNavCart();
    window.addEventListener('storage', updateNavCart);
  }

  // Wacht tot includes klaar zijn
  document.addEventListener('includes:loaded', initNav);
})();
