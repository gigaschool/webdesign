/**
 * OGP画像生成スクリプト
 * 使い方: node _generate-ogp.js
 * .env の GEMINI_API_KEY と GEMINI_MODEL を使用します
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

// .env読み込み
const envPath = path.join(__dirname, ".env");
const envContent = fs.readFileSync(envPath, "utf-8");
const env = {};
envContent.replace(/\r/g, "").split("\n").forEach((line) => {
  const m = line.match(/^([^#=]+)=(.+)$/);
  if (m) env[m[1].trim()] = m[2].trim();
});

const API_KEY = env.GEMINI_API_KEY;
const MODEL = env.GEMINI_MODEL || "gemini-3.1-flash-image-preview";

if (!API_KEY) {
  console.error(".env に GEMINI_API_KEY が設定されていません");
  process.exit(1);
}

console.log(`Using model: ${MODEL}`);
console.log("Generating OGP image...");

const payload = JSON.stringify({
  contents: [{
    parts: [{
      text: `Generate a beautiful OGP social card image (1200x630 pixels) for an educational website called "デザイン・UI・演出の言葉47".

Design requirements:
- Clean, modern, minimal aesthetic with generous whitespace
- Dark navy/teal gradient background (#0f172a to #0f766e)
- The title "デザイン・UI・演出の言葉47" in large, bold white text centered
- Subtitle "Interactive Design Glossary" in smaller, lighter text below
- Subtle geometric decorations: small UI element icons (buttons, sliders, color swatches) scattered lightly around the edges
- Professional, polished look suitable for sharing on Twitter/X and other social media
- No photographs, illustration-style only
- The number "47" should stand out with a teal/cyan accent color (#14b8a6)`
    }]
  }],
  generationConfig: {
    responseModalities: ["TEXT", "IMAGE"]
  }
});

const url = new URL(
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`
);

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    try {
      const json = JSON.parse(data);
      if (json.error) {
        console.error("API Error:", json.error.message);
        process.exit(1);
      }
      const parts = json.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          const buf = Buffer.from(part.inlineData.data, "base64");
          const ext = part.inlineData.mimeType.includes("png") ? "png" : "jpg";
          const outPath = path.join(__dirname, "ui-showcase", "assets", "ogp." + ext);
          fs.writeFileSync(outPath, buf);
          console.log(`✓ 保存しました: ${outPath} (${(buf.length / 1024).toFixed(1)} KB)`);
          return;
        }
        if (part.text) {
          console.log("Response text:", part.text);
        }
      }
      console.error("画像が生成されませんでした");
      process.exit(1);
    } catch (e) {
      console.error("Parse error:", e.message);
      process.exit(1);
    }
  });
});

req.on("error", (e) => {
  console.error("Request error:", e.message);
  process.exit(1);
});
req.write(payload);
req.end();
