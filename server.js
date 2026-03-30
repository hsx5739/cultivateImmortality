"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const DEFAULT_PORT = Number(process.env.PORT || 3000);
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, "data");
const PROGRESS_FILE = path.join(DATA_DIR, "progress.json");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function ensureProgressFile() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(PROGRESS_FILE)) {
    const initialState = {
      score: 0,
      encouragementIndex: 0,
      completedTaskIds: [],
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(initialState, null, 2), "utf8");
  }
}

function readProgress() {
  ensureProgressFile();
  const raw = fs.readFileSync(PROGRESS_FILE, "utf8");
  return JSON.parse(raw);
}

function writeProgress(progress) {
  ensureProgressFile();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), "utf8");
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function collectRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body too large."));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function sanitizeProgress(input) {
  const score = Number.isFinite(input.score) ? Math.max(0, Math.floor(input.score)) : 0;
  const encouragementIndex = Number.isFinite(input.encouragementIndex)
    ? Math.max(0, Math.floor(input.encouragementIndex))
    : 0;
  const completedTaskIds = Array.isArray(input.completedTaskIds)
    ? Array.from(new Set(input.completedTaskIds.filter((value) => typeof value === "string")))
    : [];

  return {
    score,
    encouragementIndex,
    completedTaskIds,
    updatedAt: new Date().toISOString()
  };
}

async function handleProgressApi(request, response) {
  if (request.method === "GET") {
    return sendJson(response, 200, readProgress());
  }

  if (request.method === "POST") {
    try {
      const body = await collectRequestBody(request);
      const parsed = body ? JSON.parse(body) : {};
      const nextProgress = sanitizeProgress(parsed);
      writeProgress(nextProgress);
      return sendJson(response, 200, nextProgress);
    } catch (error) {
      return sendJson(response, 400, {
        error: error instanceof Error ? error.message : "Invalid progress payload."
      });
    }
  }

  return sendJson(response, 405, { error: "Method not allowed." });
}

function resolveFilePath(urlPathname) {
  const safePath = decodeURIComponent(urlPathname === "/" ? "/index.html" : urlPathname);
  const resolvedPath = path.normalize(path.join(ROOT_DIR, safePath));
  if (!resolvedPath.startsWith(ROOT_DIR)) {
    return null;
  }
  return resolvedPath;
}

function serveStaticFile(filePath, response) {
  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not Found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
      "Cache-Control": extension === ".html" ? "no-store" : "public, max-age=3600"
    });
    fs.createReadStream(filePath).pipe(response);
  });
}

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (requestUrl.pathname === "/api/progress") {
      await handleProgressApi(request, response);
      return;
    }

    const filePath = resolveFilePath(requestUrl.pathname);
    if (!filePath) {
      response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Forbidden");
      return;
    }

    serveStaticFile(filePath, response);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({
      error: error instanceof Error ? error.message : "Internal server error."
    }));
  }
});

ensureProgressFile();

function startServer(port) {
  server.listen(port, () => {
    console.log(`Cultivation demo server running at http://localhost:${port}`);
  });
}

server.on("error", (error) => {
  if (error && error.code === "EADDRINUSE") {
    const nextPort = Number(server.address()?.port || DEFAULT_PORT) + 1;
    console.warn(`Port ${nextPort - 1} is already in use, retrying on ${nextPort}...`);
    setTimeout(() => {
      startServer(nextPort);
    }, 150);
    return;
  }

  throw error;
});

startServer(DEFAULT_PORT);
