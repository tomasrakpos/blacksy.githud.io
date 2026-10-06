"""Static storefront preview server with SPA fallback.

Production data/auth lives in Supabase. This development server deliberately
provides no anonymous order, user, or support JSON-file endpoints.
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os

ROOT = Path('/home/user')


class SPAHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        request_path = self.path.split('?', 1)[0]
        if request_path == '/assets/registration-motion.html':
            self.send_header('Cache-Control', 'public, max-age=86400, immutable')
        else:
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        # Allow the first-party registration motion iframe while rejecting cross-origin framing.
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('Content-Security-Policy', "frame-ancestors 'self'")
        super().end_headers()

    def _not_found(self):
        self.send_error(404, 'Not found')

    def do_GET(self):
        clean_path = self.path.split('?', 1)[0]
        if clean_path.startswith('/api/') or clean_path.startswith('/.netlify/functions/'):
            return self._not_found()
        requested = Path(self.translate_path(clean_path))
        if not requested.exists() and not clean_path.startswith('/js/') and not clean_path.startswith('/assets/'):
            self.path = '/index.html'
        super().do_GET()

    def do_POST(self):
        return self._not_found()

    def do_PUT(self):
        return self._not_found()

    def do_DELETE(self):
        return self._not_found()


PORT = int(os.environ.get('PORT', '4173'))
ThreadingHTTPServer(('0.0.0.0', PORT), SPAHandler).serve_forever()
