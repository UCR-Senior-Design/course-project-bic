# from http.server import SimpleHTTPRequestHandler, HTTPServer
# import os

# class CORSRequestHandler (SimpleHTTPRequestHandler):
#     def end_headers (self):
#         self.send_header('Access-Control-Allow-Origin', '*')
#         self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
#         self.send_header('Access-Control-Allow-Headers', 'Content-Type')
#         SimpleHTTPRequestHandler.end_headers(self)

# if __name__ == '__main__':
#     try:
#         PORT = 8000
#         os.chdir('/home/blore005/data/derivatives')  
#         server = HTTPServer(('0.0.0.0', PORT), CORSRequestHandler)
#         print(f'Server started on port {PORT}')
#         server.serve_forever()
#     except KeyboardInterrupt:
#         print('^C received, shutting down the web server')
#         server.socket.close()

from http.server import SimpleHTTPRequestHandler, HTTPServer
import os
import socket

class LocalhostHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    try:
        PORT = 8000
        os.chdir('/home/blore005/data/derivatives')  
        server = HTTPServer(('localhost', PORT), LocalhostHTTPRequestHandler)
        print(f'Server started on port {PORT}')
        server.serve_forever()
    except KeyboardInterrupt:
        print('^C received, shutting down the web server')
        server.socket.close()

