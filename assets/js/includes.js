// assets/js/includes.js
document.addEventListener('DOMContentLoaded', async () => {
  const includeTargets = document.querySelectorAll('[data-include]');

  // Scripts uit een HTML-string opnieuw laten uitvoeren
  const executeScripts = (wrapper) => {
    const scripts = [...wrapper.querySelectorAll('script')];
    scripts.forEach(s => s.parentNode.removeChild(s));
    for (const old of scripts) {
      const s = document.createElement('script');
      [...old.attributes].forEach(a => s.setAttribute(a.name, a.value));
      if (old.src) s.src = old.src;
      else s.textContent = old.textContent;
      document.body.appendChild(s);
    }
  };

  for (const el of includeTargets) {
    const url = (el.getAttribute('data-include') || '').trim();
    if (!url) continue;

    // Resolve t.o.v. document.baseURI (respecteert <base> op GitHub)
    const absUrl = new URL(url, document.baseURI).toString();

    try {
      const res = await fetch(absUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(absUrl + ' ' + res.status + ' ' + res.statusText);

      const html = await res.text();
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;

      el.replaceWith(...wrapper.childNodes);
      executeScripts(wrapper);
    } catch (e) {
      el.replaceWith(document.createComment('include failed: ' + e));
      console.error('Include mislukt:', e);
    }
  }

  document.dispatchEvent(new CustomEvent('includes:loaded'));
});
