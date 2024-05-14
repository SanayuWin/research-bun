const PORT: number = +(process.env.PORT || 8087);
import { generate, removeData, previewData } from "./controllers/generate";


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
    return response;
  },
  error(error) {
    let response = new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html"
      },
    });
    return response;
  },
});
