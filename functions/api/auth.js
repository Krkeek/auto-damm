// Cloudflare Pages Function: starts the GitHub login for the admin page (/admin).
// Needs the environment variable GITHUB_CLIENT_ID of the GitHub OAuth app, see README "Owner admin page".
export function onRequestGet({ request, env }) {
  const { origin } = new URL(request.url);
  const state = crypto.randomUUID();

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorize.searchParams.set('redirect_uri', `${origin}/api/callback`);
  authorize.searchParams.set('scope', 'public_repo');
  authorize.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.href,
      'Set-Cookie': `cms_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
