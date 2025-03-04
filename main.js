export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.slice(1); // 示例：Pantheryn/cloudflare-audio-proxy/main/selfusing.wav

    // 调整后的 GitHub Raw URL
    const ghRawUrl = `https://github.com/${path}/raw/refs/heads/main/selfusing.wav`;

    const response = await fetch(ghRawUrl, {
      cf: { cacheTtl: 86400 }
    });

    const newHeaders = new Headers(response.headers);
    newHeaders.set("Content-Type", "audio/wav");
    newHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, { headers: newHeaders });
  }
};
