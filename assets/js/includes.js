// assets/js/includes.js
document.addEventListener('DOMContentLoaded', async () => {
  const includeTargets = document.querySelectorAll('[data-include]');

  // Bepaal site-root (GitHub Pages vs lokaal)
  const ROOT = location.hostname.endsWith('github.io') ? '/extensionsandmore/' : '/';

  for (const el of includeTargets) {
    const url = el.getAttribute('data-include');
    try {
      // Forceer fetch relatief aan site-root
      const absUrl = new URL(url, location.origin + ROOT).toString();
      const res = await fetch(absUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(absUrl + ' ' + res.status + ' ' + res.statusText);

      const html = await res.text();
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      el.replaceWith(...wrapper.childNodes);

    } catch (e) {
      el.replaceWith(document.createComment('include failed: ' + e));
      console.error('Include mislukt:', e);
    }
  }
});
