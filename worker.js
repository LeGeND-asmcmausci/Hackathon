// Cloudflare Worker: statik assetlarni beradi (API yo'q — SPA).
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
