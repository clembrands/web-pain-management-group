// Search and AI retrieval crawlers named in the build brief. Each gets an explicit allow so
// a future blanket rule can't silently block them.
export const allowedCrawlers = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Google-Extended",
  "Applebot-Extended",
];
