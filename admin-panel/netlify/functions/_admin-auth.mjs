const headersOf = event => Object.fromEntries(Object.entries(event.headers || {}).map(([key, value]) => [key.toLowerCase(), value]));

export function response(statusCode, body, origin = '') {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...(origin ? { 'access-control-allow-origin': origin, 'vary': 'Origin' } : {})
    },
    body: JSON.stringify(body)
  };
}

export function requestOrigin(event) {
  const h = headersOf(event);
  const origin = h.origin || '';
  const host = (h['x-forwarded-host'] || h.host || '').split(',')[0].trim();
  const proto = (h['x-forwarded-proto'] || 'https').split(',')[0].trim();
  const configured = process.env.ADMIN_ORIGIN;
  let expected = configured;
  if (!expected && host) expected = `${proto}://${host}`;
  try {
    const normalizedExpected = new URL(expected).origin;
    const normalizedOrigin = new URL(origin).origin;
    return normalizedOrigin === normalizedExpected ? normalizedExpected : '';
  } catch {
    return '';
  }
}

export function parseBody(event) {
  const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : (event.body || '');
  if (raw.length > 8192) throw new Error('payload_too_large');
  return JSON.parse(raw || '{}');
}

export function config() {
  const url = String(process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const anonKey = process.env.SUPABASE_ANON_KEY || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !anonKey || !serviceKey) throw new Error('server_configuration_missing');
  return { url, anonKey, serviceKey };
}

export async function requireAdmin(event) {
  const h = headersOf(event);
  const origin = requestOrigin(event);
  if (!origin) return { error: response(403, { error: 'origin_forbidden' }) };
  const authorization = h.authorization || '';
  const match = authorization.match(/^Bearer\s+([\w.\-]+)$/i);
  if (!match) return { error: response(401, { error: 'authentication_required' }, origin) };

  let cfg;
  try { cfg = config(); } catch { return { error: response(503, { error: 'server_configuration_missing' }, origin) }; }

  try {
    const userResponse = await fetch(`${cfg.url}/auth/v1/user`, {
      headers: { apikey: cfg.anonKey, authorization: `Bearer ${match[1]}` }
    });
    if (!userResponse.ok) return { error: response(401, { error: 'authentication_required' }, origin) };
    const user = await userResponse.json();
    if (!user?.id) return { error: response(401, { error: 'authentication_required' }, origin) };

    const profileUrl = new URL(`${cfg.url}/rest/v1/profiles`);
    profileUrl.searchParams.set('select', 'role');
    profileUrl.searchParams.set('id', `eq.${user.id}`);
    const profileResponse = await fetch(profileUrl, {
      headers: { apikey: cfg.anonKey, authorization: `Bearer ${match[1]}` }
    });
    if (!profileResponse.ok) return { error: response(403, { error: 'admin_required' }, origin) };
    const rows = await profileResponse.json();
    if (!Array.isArray(rows) || rows[0]?.role !== 'admin') {
      return { error: response(403, { error: 'admin_required' }, origin) };
    }
    return { cfg, user, accessToken: match[1], origin };
  } catch {
    return { error: response(503, { error: 'upstream_unavailable' }, origin) };
  }
}
