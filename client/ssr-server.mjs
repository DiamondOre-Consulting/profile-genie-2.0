import { createReadStream, promises as fs } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "./dist/server/entry-server.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(root, "dist", "client");
const indexTemplate = await fs.readFile(path.join(clientDir, "index.html"), "utf8");
const port = Number(process.env.PORT ?? 3000);
const mimeTypes = {
  ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".gif": "image/gif", ".ico": "image/x-icon", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".mp4": "video/mp4", ".webm": "video/webm",
};

async function serveStatic(requestPath, response) {
  const relativePath = decodeURIComponent(requestPath).replace(/^\/+/, "");
  const filePath = path.resolve(clientDir, relativePath);
  if (!filePath.startsWith(`${clientDir}${path.sep}`)) return false;
  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) return false;
    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream",
      "Cache-Control": relativePath.startsWith("assets/") ? "public, max-age=31536000, immutable" : "public, max-age=3600",
    });
    createReadStream(filePath).pipe(response);
    return true;
  } catch {
    return false;
  }
}

http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? "/", "http://localhost");
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }
  if (requestUrl.pathname.includes(".")) {
    if (await serveStatic(requestUrl.pathname, response)) return;
  }
  try {
    const result = await render(requestUrl.pathname + requestUrl.search);
    const html = indexTemplate
      .replace("<title>Profile Genie</title>", result.head)
      .replace('<div id="root"></div>', `<div id="root">${result.app}</div><script>window.__SSR_RENDERED__=true;window.__SSR_PAGE_DATA__=${result.state}</script>`);
    response.writeHead(result.status, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": result.status === 200 ? "public, max-age=0, s-maxage=300, stale-while-revalidate=86400" : "no-store" });
    response.end(request.method === "HEAD" ? undefined : html);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Internal Server Error");
  }
}).listen(port, () => console.log(`Profile Genie SSR listening on port ${port}`));
