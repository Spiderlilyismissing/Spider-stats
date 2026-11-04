"""Run Spider Stats locally for a browser preview. This is not a public web server."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser


HOST = "127.0.0.1"
PORT = 8000
ROOT = Path(__file__).resolve().parent


def main() -> None:
    handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT))
    server = ThreadingHTTPServer((HOST, PORT), handler)
    print(f"Spider Stats is ready at http://{HOST}:{PORT}")
    print("Keep this window open while using the app. Press Ctrl+C to stop it.")
    webbrowser.open(f"http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nSpider Stats preview stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()

