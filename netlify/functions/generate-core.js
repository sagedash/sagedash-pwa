// Serverless endpoint: injects secret prompt/rules on server; returns 3 mocked lines for now.
// Later we'll swap the "mock" block with a real AI call.
const { getSecrets } = require("./lib/versionedPrompts");
const { filterLeaks } = require("./lib/leakGuard");

// Small IP/uid throttle (very light — real limits added when Auth lands)
const WINDOW_MS = 60_000;
const MAX_PER_IP = 30;
let hits = {}; // ephemeral per function instance

function rateLimit(ip) {
  const now = Date.now();
  if (!hits[ip]) hits[ip] = [];
  hits[ip] = hits[ip].filter(ts => now - ts < WINDOW_MS);
  hits[ip].push(now);
  return hits[ip].length <= MAX_PER_IP;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const ip = event.headers["x-forwarded-for"] || "unknown";
  if (!rateLimit(ip)) {
    return { statusCode: 429, body: "Too Many Requests" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { parentProfile = {}, teenProfile = {}, moment = {}, promptVersion } = body;

    // Server-only secret fetch
    const secrets = getSecrets(promptVersion);

    // ---- MOCK OUTPUT (replace with real AI call later) ----
    const cozy = parentProfile?.cozyPhrase || "kiddo";
    const opener = `Oh ${cozy}, that really stings—thanks for telling me.`;
    const validate = "That makes total sense to feel that way—I’m on your side.";
    const choice = "Want a quiet hug or a quick walk while we think next steps?";
    const raw = [opener, validate, choice].join("\n");

    // Leak guard
    const filtered = filterLeaks(raw);
    const payload = {
      version: secrets.version,
      lines: filtered.text.split("\n"),
      meta: { leakedSanitized: filtered.leaked ? true : false }
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    };
  } catch (e) {
    return { statusCode: 400, body: "Bad Request" };
  }
};
