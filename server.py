import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Clean stdout
        pass

class ThreadingServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    with ThreadingServer(("", PORT), Handler) as httpd:
        print("=" * 64)
        print("  SAMADHAN SETU — SIH26043 Platform Running")
        print(f"  Local URL: http://localhost:{PORT}")
        print("  Connecting Doors to Doors for an Innovative Tomorrow.")
        print("=" * 64)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)
