export default {
  async fetch(request) {
    const ghRawUrl = "https://github.com/Pantheryn/cloudflare-audio-proxy/raw/refs/heads/main/selfusing.wav";
    try {
      const response = await fetch(ghRawUrl, { cf: { cacheTtl: 86400 } });
      
      // 创建新 Headers 并删除可能导致下载的头
      const newHeaders = new Headers(response.headers);
      newHeaders.delete("Content-Disposition"); // 移除强制下载标记
      newHeaders.set("Content-Type", "audio/wav");
      newHeaders.set("Access-Control-Allow-Origin", "*");

      return new Response(response.body, { headers: newHeaders });
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }
};
