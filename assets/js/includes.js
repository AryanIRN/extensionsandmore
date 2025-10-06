// Simpele HTML-partials loader
document.addEventListener('DOMContentLoaded', async () => {
  const includeTargets = document.querySelectorAll('[data-include]');

  for (const el of includeTargets) {
    const url = el.getAttribute('data-include');
    try {
      // no-store om caching te omzeilen tijdens development
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(url + ' ' + res.status + ' ' + res.statusText);

      const html = await res.text();
      // vervang placeholder node door de geladen content
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      el.replaceWith(...wrapper.childNodes);
    } catch (e) {
      // veilig fallback comment in DOM
      const comment = document.createComment('include failed: ' + e);
      el.replaceWith(comment);
      console.error('Include mislukt:', e);
    }
  }
});
