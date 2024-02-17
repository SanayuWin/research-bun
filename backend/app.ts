const PORT: number = +(process.env.PORT || 8087);
const NODE_ENV = process.env.NODE_ENV ?? "development";
import { generate, removeData, previewData } from "./controllers/generate";

const setCORSHeaders = (res: Response) => {
  if (!res.headers) {
    res.headers = new Headers();
  }
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
};


Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let response;
    if (url.pathname === "/api/generate"){
      response = generate(req);
    }else if (url.pathname === "/api/query"){
      response = previewData(req);
    }else if (url.pathname === "/api/remove"){
      response = removeData(req);
    } else {
      response = new Response("404!");
    }
    // response.headers.append("Access-Control-Allow-Origin", "*");
    return setCORSHeaders(response);
  },
  error(error) {
    const response = new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html"
      },
    });
    return setCORSHeaders(response);
  },
});
