import { config, parseBody, requireAdmin, requestOrigin, response } from './_admin-auth.mjs';

export async function handler(event) {
  const origin = requestOrigin(event);
  if (event.httpMethod === 'OPTIONS') {
    return origin
      ? { statusCode: 204, headers: { 'access-control-allow-origin': origin, 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'Authorization, Content-Type', 'access-control-max-age': '600', 'cache-control': 'no-store', vary: 'Origin' }, body: '' }
      : response(403, { error: 'origin_forbidden' });
  }
  if (event.httpMethod !== 'POST') return response(405, { error: 'method_not_allowed' }, origin);

  const auth = await requireAdmin(event);
  if (auth.error) return auth.error;
  let body;
  try { body = parseBody(event); } catch { return response(400, { error: 'invalid_request' }, auth.origin); }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  if (name.length < 2 || name.length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return response(400, { error: 'invalid_user_details' }, auth.origin);
  }

  try {
    const cfg = config();
    const invite = await fetch(`${cfg.url}/auth/v1/invite`, {
      method: 'POST',
      headers: {
        apikey: cfg.serviceKey,
        authorization: `Bearer ${cfg.serviceKey}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email, data: { full_name: name } })
    });
    if (!invite.ok) return response(400, { error: 'invite_failed' }, auth.origin);
    return response(200, { ok: true, message: 'invite_sent' }, auth.origin);
  } catch {
    return response(503, { error: 'upstream_unavailable' }, auth.origin);
  }
}
