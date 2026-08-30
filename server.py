import http.server
import socketserver
import os
import sys
import json

import ai_service

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def _send_json_response(self, status_code, data):
        response_bytes = json.dumps(data, indent=2).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(response_bytes)))
        self.end_headers()
        self.wfile.write(response_bytes)

    def do_POST(self):
        normalized_path = self.path.split('?')[0].rstrip('/')
        
        if normalized_path == '/api/ai/analyze-problem':
            try:
                content_length = int(self.headers.get('Content-Length', 0))
            except (ValueError, TypeError):
                content_length = 0

            if content_length <= 0:
                self._send_json_response(400, {"error": "Missing or empty request body"})
                return

            raw_body = self.rfile.read(content_length)
            status_code, response_data = ai_service.handle_analyze_problem_request(raw_body)
            self._send_json_response(status_code, response_data)
        else:
            self._send_json_response(404, {"error": f"Endpoint not found: {self.path}"})

    def do_GET(self):
        normalized_path = self.path.split('?')[0].rstrip('/')
        if normalized_path.startswith('/api'):
            self._send_json_response(404, {"error": f"API endpoint not found: {self.path}"})
            return
        super().do_GET()

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 64)
        print("  SAMADHAN SETU — SIH26043 Platform Running")
        print(f"  Local URL: http://localhost:{PORT}")
        print("  AI Endpoint: http://localhost:8000/api/ai/analyze-problem")
        print("  Connecting Doors to Doors for an Innovative Tomorrow.")
        print("=" * 64)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)


