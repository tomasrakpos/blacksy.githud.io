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
  const userId = String(body.user_id || '');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(userId)) {
    return response(400, { error: 'invalid_user_id' }, auth.origin);
  }
  if (userId === auth.user.id) return response(400, { error: 'cannot_delete_current_admin' }, auth.origin);

  try {
    const cfg = config();
    const deletion = await fetch(`${cfg.url}/auth/v1/admin/users/${encodeURIComponent(userId)}`, {
      method: 'DELETE',
      headers: { apikey: cfg.serviceKey, authorization: `Bearer ${cfg.serviceKey}` }
    });
    if (!deletion.ok) return response(400, { error: 'delete_failed' }, auth.origin);
    return response(200, { ok: true }, auth.origin);
  } catch {
    return response(503, { error: 'upstream_unavailable' }, auth.origin);
  }
}
