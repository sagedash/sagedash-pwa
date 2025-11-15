// Server-only: read secrets from environment (never ship to client).
function getSecrets(requestedVersion) {
  const version = requestedVersion || process.env.SAGEDASH_ACTIVE_PROMPT_VERSION || "6.0";
  const prompt = process.env.SAGEDASH_PROMPT_V6 || "PROMPT_V6_PLACEHOLDER";
  const rules  = process.env.SAGEDASH_RULES_V6  || "RULES_V6_PLACEHOLDER";
  const mappings = process.env.SAGEDASH_MAPPINGS_V6 || '{"loveLanguage":{},"tone":{},"persona":{}}';
  return { version, prompt, rules, mappings };
}

module.exports = { getSecrets };
