export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.slice(1); // 示例路径：yourname/repo/main/selfusing.wav
    const ghRawUrl = `https://raw.githubusercontent.com/${path}`;

    const response = await fetch(ghRawUrl, {
      cf: { cacheTtl: 86400 } // 缓存24小时
    });

    const newHeaders = new Headers(response.headers);
    newHeaders.set("Content-Type", "audio/wav");
    newHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, { headers: newHeaders });
  }
};