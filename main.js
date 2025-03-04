export default {
  async fetch(request) {
    // 固定 GitHub 文件地址（无需动态路径）
    const ghRawUrl = "https://github.com/Pantheryn/cloudflare-audio-proxy/raw/refs/heads/main/selfusing.wav";

    try {
      const response = await fetch(ghRawUrl, {
        cf: { cacheTtl: 86400 }
      });

      // 修复 MIME 类型和跨域头
      const newHeaders = new Headers(response.headers);
      newHeaders.set("Content-Type", "audio/wav");
      newHeaders.set("Access-Control-Allow-Origin", "*");

      return new Response(response.body, { headers: newHeaders });
    } catch (error) {
      // 返回详细错误信息
      return new Response(`代理失败：${error.message}`, { status: 500 });
    }
  }
};
