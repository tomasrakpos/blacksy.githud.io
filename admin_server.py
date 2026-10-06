"""Static Admin Panel preview server.

All admin data/auth is handled by Supabase with RLS (and narrowly scoped
Netlify Functions in production). This local server intentionally exposes no
anonymous JSON-file API.
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path('/home/user')
ADMIN_ROOT = ROOT / 'admin-panel'


class AdminHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ADMIN_ROOT), **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('X-Robots-Tag', 'noindex, nofollow, noarchive')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('X-Frame-Options', 'DENY')
        super().end_headers()

    def translate_path(self, path):
        clean = path.split('?', 1)[0]
        if clean == '/schema.sql':
            return str(ADMIN_ROOT / 'schema.sql')
        if clean.startswith('/assets/'):
            return str(ROOT / clean.lstrip('/'))
        return super().translate_path(path)

    def _not_found(self):
        self.send_error(404, 'Not found')

    def do_GET(self):
        clean = self.path.split('?', 1)[0]
        if clean.startswith('/api/') or clean.startswith('/.netlify/functions/'):
            return self._not_found()
        requested = Path(self.translate_path(clean))
        if not requested.exists() and not clean.startswith('/js/') and not clean.startswith('/assets/'):
            self.path = '/index.html'
        super().do_GET()

    def do_POST(self):
        return self._not_found()

    def do_PUT(self):
        return self._not_found()

    def do_DELETE(self):
        return self._not_found()


ThreadingHTTPServer(('0.0.0.0', 4174), AdminHandler).serve_forever()
