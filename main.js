export default {
  async fetch(request) {
    const url = new URL(request.url);
    const audioUrl = "https://github.com/Pantheryn/cloudflare-audio-proxy/raw/refs/heads/main/selfusing.wav";

    // 当访问根路径（/）时返回播放页面
    if (url.pathname === "/") {
      const html = `
<!DOCTYPE html>
<html>
<head>
  <title>音频在线播放</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #f0f2f5;
      font-family: Arial, sans-serif;
    }
    .player-box {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      width: 80%;
      max-width: 500px;
    }
    audio {
      width: 100%;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div class="player-box">
    <h1>自用</h1>
    <audio controls autoplay>
      <source src="/audio" type="audio/wav">
      您的浏览器不支持音频播放
    </audio>
  </div>
</body>
</html>
      `;
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    // 当访问 /audio 时返回音频流
    if (url.pathname === "/audio") {
      try {
        const response = await fetch(audioUrl, {
          cf: { cacheTtl: 86400 } // 缓存24小时
        });

        // 强制覆盖 Headers 确保浏览器播放而非下载
        const headers = new Headers(response.headers);
        headers.set("Content-Type", "audio/wav");
        headers.set("Access-Control-Allow-Origin", "*");
        headers.delete("Content-Disposition"); // 关键：禁止浏览器触发下载

        return new Response(response.body, {
          status: response.status,
          headers: headers
        });
      } catch (error) {
        return new Response("音频加载失败，请稍后重试", { status: 500 });
      }
    }

    // 其他路径返回404
    return new Response("页面不存在", { status: 404 });
  }
};
