// Basic output leak guard: if the model output ever echoes prompt-like text, refuse it.
const DENY = [
  "You are Sage",
  "system prompt",
  "Hard Rules",
  "RULES_V",
  "SAGEDASH_PROMPT_",
  "SAGEDASH_RULES_",
  "SAGEDASH_MAPPINGS_"
];

function containsLeak(s) {
  const lower = (s || "").toLowerCase();
  return DENY.some(k => lower.includes(k.toLowerCase()));
}

function filterLeaks(text) {
  if (!text) return { text, leaked: false };
  if (containsLeak(text)) {
    return {
      text: "I can’t share my internal setup—but I’m here to help with your parent-teen moment. What’s happening?",
      leaked: true
    };
  }
  return { text, leaked: false };
}

module.exports = { filterLeaks };
