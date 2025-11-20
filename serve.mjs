import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { cwd, env } from "node:process";
import { extname, join, normalize } from "node:path";

const root = cwd();
const envPort = Number(env.PORT);
const port =
  Number.isFinite(envPort) && envPort >= 0
    ? envPort
    : 3000;
const host = env.HOST || "127.0.0.1";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".yaml": "application/yaml; charset=utf-8",
  ".yml": "application/yaml; charset=utf-8",
};

function resolvePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const candidate =
    decoded === "/" ? "index.html" : decoded.replace(/^\//, "");
  // Prevent traversal outside root.
  return join(root, normalize(candidate));
}

async function serveFile(path) {
  const info = await stat(path);

  if (info.isDirectory()) {
    return serveFile(join(path, "index.html"));
  }

  const body = await readFile(path);
  const type = mime[extname(path)] || "application/octet-stream";
  return { body, type };
}

const server = createServer(async (req, res) => {
  try {
    const path = resolvePath(req.url || "/");
    const { body, type } = await serveFile(path);
    res.writeHead(200, { "Content-Type": type });
    res.end(body);
  } catch (err) {
    const status = err.code === "ENOENT" ? 404 : 500;
    res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(status === 404 ? "Not found" : "Server error");
  }
});

server.on("error", (err) => {
  console.error(`Server error on ${host}:${port}:`, err.message);
  if (err.code === "EACCES" || err.code === "EPERM") {
    console.error("Try a different PORT (e.g., PORT=5173) or run with sufficient permissions.");
  }
});

server.listen(port, host, () => {
  console.log(`Serving ${root} on http://${host}:${port}`);
});
