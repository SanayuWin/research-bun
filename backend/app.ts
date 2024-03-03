const PORT: number = +(process.env.PORT || 8087);
import { generate, removeData, previewData } from "./controllers/generate";

const setHeaders = (res: Response) => {

  if (!res.headers) {
    res.headers = new Headers();
  }
  res.headers.set("Connection", "keep-alive");
  res.headers.set("Content-Type", "application/json; charset=UTF-8");
  res.headers.set("Keep-Alive", "timeout=5");
  res.headers.set("X-Powered-By", "Bun");
  res.headers.set("Vary", "Accept-Encoding");
  return res;
};

Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let response;
    switch (url.pathname) {
      case "/api/generate":
        if (req.method === "POST") {
          response = generate(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      case "/api/query":
        if (req.method === "GET") {
          response = previewData(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      case "/api/remove":
        if (req.method === "DELETE") {
          response = removeData(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      default:
        response = new Response("Not Found", { status: 404 });
        break;
    }
    return setHeaders(response);
  },
  error(error) {
    let response = new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html"
      },
    });
    return setHeaders(response);
  },
});
