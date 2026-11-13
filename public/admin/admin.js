// Admin page for the owner: loads Decap CMS and points its GitHub login at this site's own /api/auth function.
window.CMS_MANUAL_INIT = true;

const script = document.createElement('script');
script.src = 'https://unpkg.com/decap-cms@3.17.3/dist/decap-cms.js';
script.onload = () => {
  window.CMS.init({
    config: {
      // On a developer machine, `npx decap-server` saves to the local checkout instead of GitHub.
      local_backend: ['localhost', '127.0.0.1'].includes(location.hostname),
      backend: { base_url: location.origin },
    },
  });
};
document.head.append(script);
