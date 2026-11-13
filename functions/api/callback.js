// Cloudflare Pages Function: GitHub sends the visitor back here after the login. It swaps the one-time code for an
// access token and hands the token to the admin page that opened this popup. The token is never stored on the server.
// Needs GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET, see README "Owner admin page".
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expected = /(?:^|;\s*)cms_oauth_state=([^;]+)/.exec(request.headers.get('Cookie') ?? '')?.[1];

  if (!code || !state || state !== expected) {
    return popup(url.origin, 'error', { error: 'Die Anmeldung ist abgelaufen. Bitte erneut versuchen.' });
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'User-Agent': 'cms-login' },
    body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }),
  });
  const result = await response.json();

  return result.access_token
    ? popup(url.origin, 'success', { token: result.access_token, provider: 'github' })
    : popup(url.origin, 'error', { error: result.error_description ?? 'Die Anmeldung bei GitHub ist fehlgeschlagen.' });
}

/** The page shown in the login popup: it passes the result to the admin page on the same origin, which closes it. */
function popup(origin, status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const inline = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
  const html = `<!doctype html>
<meta charset="utf-8" />
<title>Anmeldung</title>
<script>
  const origin = ${inline(origin)};
  addEventListener('message', (event) => {
    if (event.origin === origin) window.opener.postMessage(${inline(message)}, origin);
  });
  window.opener.postMessage('authorizing:github', origin);
</script>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Set-Cookie': 'cms_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    },
  });
}
