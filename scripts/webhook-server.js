import { createServer } from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const PORT = 9002;
const HOST = "127.0.0.1";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
const DEPLOY_SCRIPT = path.join(path.dirname(fileURLToPath(import.meta.url)), "deploy.sh");

if (!WEBHOOK_SECRET) {
  console.error("WEBHOOK_SECRET is not set - refusing to start");
  process.exit(1);
}

function verifySignature(rawBody, signatureHeader) {
  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) return false;

  const expected = "sha256=" + createHmac("sha256", WEBHOOK_SECRET).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(signatureHeader);

  if (expectedBuffer.length !== providedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, providedBuffer);
}

function runDeploy() {
  console.log("Deploy triggered, running deploy.sh...");
  execFile("/bin/bash", [DEPLOY_SCRIPT], (error, stdout, stderr) => {
    if (error) {
      console.error("Deploy failed:", error.message);
      if (stderr) console.error(stderr);
      return;
    }
    console.log(stdout);
    console.log("Deploy finished successfully.");
  });
}

const server = createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(405);
    res.end("Method Not Allowed");
    return;
  }

  const chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", () => {
    const rawBody = Buffer.concat(chunks);
    const signature = req.headers["x-hub-signature-256"];

    if (!verifySignature(rawBody, signature)) {
      console.warn("Rejected webhook request: invalid signature");
      res.writeHead(401);
      res.end("Invalid signature");
      return;
    }

    const event = req.headers["x-github-event"];
    if (event !== "push") {
      res.writeHead(200);
      res.end("Ignored: not a push event");
      return;
    }

    res.writeHead(200);
    res.end("Deploy triggered");
    runDeploy();
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Webhook server listening on ${HOST}:${PORT}`);
});
