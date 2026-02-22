/* ==========================================================================
   Multi-Demo Definitions — Multiple examples per "見た目・スタイル" term
   Each term has 3 realistic use-case demos with displayable code
   ========================================================================== */
(function () {
  let uid = 0;
  function id() { return "ms" + (++uid); }

  function h(tag, cls, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function addStyle(container, css) {
    const s = document.createElement("style");
    s.textContent = css;
    container.prepend(s);
  }

  function makeBtn(text, cls) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = cls || "ms-btn";
    b.textContent = text;
    return b;
  }

  const demos = {};

  /* ==============================
     pixel-art — ピクセルアート / ドット絵
     ============================== */
  demos["pixel-art"] = [
    {
      title: "RPGキャラクター",
      desc: "CSS gridで描くドット絵キャラ。box-shadowでピクセル単位に色を配置。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-char { width:1px;height:1px;margin:20px auto;transform:scale(6);
            box-shadow:
              2px 0 0 #4a3728, 3px 0 0 #4a3728, 4px 0 0 #4a3728,
              1px 1px 0 #4a3728, 2px 1px 0 #f5c542, 3px 1px 0 #f5c542, 4px 1px 0 #f5c542, 5px 1px 0 #4a3728,
              1px 2px 0 #f5c542, 2px 2px 0 #333, 3px 2px 0 #f5c542, 4px 2px 0 #333, 5px 2px 0 #f5c542,
              1px 3px 0 #f5c542, 2px 3px 0 #f5c542, 3px 3px 0 #f5c542, 4px 3px 0 #f5c542, 5px 3px 0 #f5c542,
              2px 4px 0 #e74c3c, 3px 4px 0 #e74c3c, 4px 4px 0 #e74c3c,
              1px 5px 0 #e74c3c, 2px 5px 0 #e74c3c, 3px 5px 0 #3498db, 4px 5px 0 #e74c3c, 5px 5px 0 #e74c3c,
              2px 6px 0 #e74c3c, 3px 6px 0 #3498db, 4px 6px 0 #e74c3c,
              1px 7px 0 #f5c542, 2px 7px 0 #f5c542, 4px 7px 0 #f5c542, 5px 7px 0 #f5c542,
              2px 8px 0 #8b6914, 3px 8px 0 #8b6914, 4px 8px 0 #8b6914,
              2px 9px 0 #4a3728, 3px 9px 0 #333, 4px 9px 0 #4a3728;
          }
          .${p}-label { font-size:.7rem;color:#6b7280;margin-top:40px; }
        `);
        const w = h("div", `${p}-wrap`);
        w.append(h("div", `${p}-char`), h("p", `${p}-label`, "box-shadow ピクセルアート"));
        c.append(w);
      },
      code: {
        css: `.pixel-char {
  width: 1px;
  height: 1px;
  transform: scale(6);
  box-shadow:
    /* 頭（髪） */
    2px 0 0 #4a3728, 3px 0 0 #4a3728,
    4px 0 0 #4a3728,
    /* 顔 */
    1px 2px 0 #f5c542, 2px 2px 0 #333,
    3px 2px 0 #f5c542, 4px 2px 0 #333,
    /* 体 */
    2px 4px 0 #e74c3c, 3px 4px 0 #e74c3c,
    4px 4px 0 #e74c3c;
    /* ... 各ピクセルを座標で指定 */
}`,
        html: `<div class="pixel-char"></div>`
      }
    },
    {
      title: "ハートアイテム",
      desc: "シンプルなドット絵アイテム。CSS gridでハート型を描画。",
      render(c) {
        const p = id();
        const grid = [
          [0,1,1,0,0,1,1,0],
          [1,1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1,1],
          [0,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,0,0],
          [0,0,0,1,1,0,0,0],
        ];
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-grid { display:inline-grid;grid-template-columns:repeat(8,12px);gap:1px; }
          .${p}-px { width:12px;height:12px;border-radius:1px; }
          .${p}-on { background:#ef4444; }
          .${p}-off { background:transparent; }
          .${p}-label { font-size:.7rem;color:#6b7280;margin-top:8px; }
        `);
        const w = h("div", `${p}-wrap`);
        const g = h("div", `${p}-grid`);
        grid.forEach(row => row.forEach(v => {
          g.append(h("div", `${p}-px ${v ? p+"-on" : p+"-off"}`));
        }));
        w.append(g, h("p", `${p}-label`, "CSS Grid ドット絵"));
        c.append(w);
      },
      code: {
        css: `.pixel-grid {
  display: inline-grid;
  grid-template-columns: repeat(8, 12px);
  gap: 1px;
}

.px {
  width: 12px;
  height: 12px;
  border-radius: 1px;
}

.px-on  { background: #ef4444; }
.px-off { background: transparent; }`,
        html: `<div class="pixel-grid">
  <!-- 0=off, 1=on で配置 -->
  <div class="px px-off"></div>
  <div class="px px-on"></div>
  <!-- ... 8x7 = 56 セル -->
</div>`
      }
    },
    {
      title: "風景（木と山）",
      desc: "ドット絵の背景表現。CSS gridで山と木のシーンを描画。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-scene { display:inline-grid;grid-template-columns:repeat(16,8px);gap:0;line-height:0; }
          .${p}-px { width:8px;height:8px;display:inline-block; }
          .${p}-wrap { text-align:center; }
          .${p}-label { font-size:.7rem;color:#6b7280;margin-top:8px; }
        `);
        const colors = { s:"#87CEEB", m:"#6b7280", w:"#f5f5f5", g:"#22c55e", t:"#4a3728", G:"#16a34a", d:"#15803d", e:"#92400e" };
        const rows = [
          "ssssssssssssssss",
          "ssssssmwsssssss",
          "sssssmwwmssssss",
          "ssssmwwwmssssss",
          "sssGGssssGGssss",
          "ssGGGGssGGGGsss",
          "ssdGGdssdGGdsss",
          "ssseessssseesss",
          "gggggggggggggggg",
          "gggggggggggggggg"
        ];
        const w = h("div", `${p}-wrap`);
        const scene = h("div", `${p}-scene`);
        rows.forEach(row => {
          for (let i = 0; i < 16; i++) {
            const ch = row[i] || "s";
            const px = h("div", `${p}-px`);
            px.style.background = colors[ch] || "#87CEEB";
            scene.append(px);
          }
        });
        w.append(scene, h("p", `${p}-label`, "ピクセル風景"));
        c.append(w);
      },
      code: {
        css: `.pixel-scene {
  display: inline-grid;
  grid-template-columns: repeat(16, 8px);
  gap: 0;
}

.px {
  width: 8px;
  height: 8px;
}

/* 色をクラスで管理 */
.sky    { background: #87CEEB; }
.mtn    { background: #6b7280; }
.snow   { background: #f5f5f5; }
.grass  { background: #22c55e; }
.tree   { background: #16a34a; }
.trunk  { background: #92400e; }`,
        html: `<div class="pixel-scene">
  <!-- 16x10 のピクセルマップ -->
  <div class="px sky"></div>
  <div class="px mtn"></div>
  <!-- ... 色を行ごとに配置 -->
</div>`
      }
    }
  ];

  /* ==============================
     retro-8bit — 8ビット風 / レトロゲーム風
     ============================== */
  demos["retro-8bit"] = [
    {
      title: "ゲーム画面",
      desc: "スキャンラインとレトロフォントで再現する8ビット風ゲーム画面。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-screen { background:#111;padding:14px;border-radius:8px;position:relative;overflow:hidden;font-family:'Courier New',monospace;color:#33ff33; }
          .${p}-screen::after { content:"";position:absolute;top:0;left:0;right:0;bottom:0;
            background:repeating-linear-gradient(0deg,rgba(0,0,0,.15) 0px,rgba(0,0,0,.15) 1px,transparent 1px,transparent 3px);pointer-events:none; }
          .${p}-hud { display:flex;justify-content:space-between;font-size:.65rem;margin-bottom:8px; }
          .${p}-field { text-align:center;font-size:.7rem;line-height:1.4;letter-spacing:2px; }
          .${p}-player { color:#ffff00; }
        `);
        const scr = h("div", `${p}-screen`);
        const hud = h("div", `${p}-hud`);
        hud.innerHTML = `<span>SCORE: 12450</span><span>STAGE: 03</span><span>LIVES: 3</span>`;
        const field = h("div", `${p}-field`);
        field.innerHTML = `
          <div>################</div>
          <div>#..............#</div>
          <div>#...<span class="${p}-player">@</span>..........#</div>
          <div>#.....***......#</div>
          <div>#..............#</div>
          <div>################</div>`;
        scr.append(hud, field);
        c.append(scr);
      },
      code: {
        css: `.retro-screen {
  background: #111;
  font-family: 'Courier New', monospace;
  color: #33ff33;
  position: relative;
  overflow: hidden;
}

/* スキャンライン */
.retro-screen::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0,0,0,.15) 0px,
    rgba(0,0,0,.15) 1px,
    transparent 1px,
    transparent 3px
  );
  pointer-events: none;
}`,
        html: `<div class="retro-screen">
  <div class="hud">
    <span>SCORE: 12450</span>
    <span>STAGE: 03</span>
  </div>
  <div class="field">
    ################
    #...<span class="player">@</span>..........#
    ################
  </div>
</div>`
      }
    },
    {
      title: "タイトル画面",
      desc: "PRESS STARTが点滅するレトロゲームのタイトルスクリーン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-title { background:#000;padding:20px;border-radius:8px;text-align:center;font-family:'Courier New',monospace; }
          .${p}-logo { color:#ff0;font-size:1.1rem;font-weight:bold;letter-spacing:4px;text-shadow:2px 2px 0 #c00;margin-bottom:6px; }
          .${p}-sub { color:#0ff;font-size:.6rem;letter-spacing:2px;margin-bottom:16px; }
          .${p}-start { color:#fff;font-size:.75rem;letter-spacing:3px;animation:${p}-blink 1s step-end infinite; }
          @keyframes ${p}-blink { 0%,100%{opacity:1} 50%{opacity:0} }
          .${p}-copy { color:#555;font-size:.55rem;margin-top:12px; }
        `);
        const t = h("div", `${p}-title`);
        t.append(
          h("div", `${p}-logo`, "PIXEL QUEST"),
          h("div", `${p}-sub`, "- THE ADVENTURE -"),
          h("div", `${p}-start`, "PRESS START"),
          h("div", `${p}-copy`, "(C) 2024 RETRO GAMES")
        );
        c.append(t);
      },
      code: {
        css: `.title-screen {
  background: #000;
  text-align: center;
  font-family: 'Courier New', monospace;
}

.logo {
  color: #ff0;
  font-size: 1.2rem;
  letter-spacing: 4px;
  text-shadow: 2px 2px 0 #c00;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.press-start {
  color: #fff;
  animation: blink 1s step-end infinite;
}`,
        html: `<div class="title-screen">
  <div class="logo">PIXEL QUEST</div>
  <div class="subtitle">- THE ADVENTURE -</div>
  <div class="press-start">PRESS START</div>
</div>`
      }
    },
    {
      title: "スコア表示",
      desc: "レトロ風HUD。等幅フォントとネオン色でゲームのステータスを表現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-hud { background:#1a1a2e;padding:12px;border-radius:8px;font-family:'Courier New',monospace;display:flex;flex-direction:column;gap:6px; }
          .${p}-row { display:flex;justify-content:space-between;align-items:center; }
          .${p}-lbl { color:#888;font-size:.65rem;letter-spacing:2px; }
          .${p}-val { color:#0f0;font-size:.8rem;font-weight:bold;letter-spacing:1px; }
          .${p}-bar-wrap { flex:1;height:8px;background:#333;border-radius:2px;margin-left:8px;overflow:hidden; }
          .${p}-bar-fill { height:100%;background:#e74c3c;border-radius:2px; }
          .${p}-sep { border:none;border-top:1px dashed #333;margin:2px 0; }
        `);
        const hud = h("div", `${p}-hud`);
        const r1 = h("div", `${p}-row`);
        r1.append(h("span", `${p}-lbl`, "SCORE"), h("span", `${p}-val`, "0024800"));
        const r2 = h("div", `${p}-row`);
        r2.append(h("span", `${p}-lbl`, "HI-SCORE"), h("span", `${p}-val`, "0099900"));
        const r3 = h("div", `${p}-row`);
        const hpLbl = h("span", `${p}-lbl`, "HP");
        const barW = h("div", `${p}-bar-wrap`);
        const barF = h("div", `${p}-bar-fill`);
        barF.style.width = "65%";
        barW.append(barF);
        r3.append(hpLbl, barW);
        const r4 = h("div", `${p}-row`);
        r4.append(h("span", `${p}-lbl`, "STAGE"), h("span", `${p}-val`, "03-2"));
        hud.append(r1, r2, h("hr", `${p}-sep`), r3, r4);
        c.append(hud);
      },
      code: {
        css: `.retro-hud {
  background: #1a1a2e;
  font-family: 'Courier New', monospace;
  padding: 12px;
}

.hud-label {
  color: #888;
  font-size: 0.65rem;
  letter-spacing: 2px;
}

.hud-value {
  color: #0f0;
  font-weight: bold;
}

.hp-bar {
  height: 8px;
  background: #333;
  border-radius: 2px;
}

.hp-fill {
  height: 100%;
  background: #e74c3c;
  width: 65%;
}`,
        html: `<div class="retro-hud">
  <div class="row">
    <span class="hud-label">SCORE</span>
    <span class="hud-value">0024800</span>
  </div>
  <div class="row">
    <span class="hud-label">HP</span>
    <div class="hp-bar"><div class="hp-fill"></div></div>
  </div>
</div>`
      }
    }
  ];

  /* ==============================
     neon-cyberpunk — ネオンカラー / サイバーパンク風
     ============================== */
  demos["neon-cyberpunk"] = [
    {
      title: "タイトルロゴ",
      desc: "光るネオンテキスト。text-shadowで多重グローを表現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { background:#0a0a0a;padding:24px;border-radius:8px;text-align:center; }
          .${p}-title { font-size:1.4rem;font-weight:900;color:#fff;letter-spacing:6px;
            text-shadow:0 0 7px #fff,0 0 10px #fff,0 0 21px #fff,0 0 42px #0fa,0 0 82px #0fa,0 0 92px #0fa;
            animation:${p}-flicker 3s infinite alternate; }
          @keyframes ${p}-flicker { 0%,19%,21%,23%,25%,54%,56%,100%{text-shadow:0 0 7px #fff,0 0 10px #fff,0 0 21px #fff,0 0 42px #0fa,0 0 82px #0fa}
            20%,24%,55%{text-shadow:none} }
          .${p}-sub { color:#0fa;font-size:.6rem;letter-spacing:4px;margin-top:8px;opacity:.7; }
        `);
        const w = h("div", `${p}-wrap`);
        w.append(h("div", `${p}-title`, "NEON"), h("div", `${p}-sub`, "CYBERPUNK 2077"));
        c.append(w);
      },
      code: {
        css: `.neon-title {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 6px;
  text-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #0fa,
    0 0 82px #0fa;
}

@keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 7px #fff, 0 0 42px #0fa;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}`,
        html: `<div class="neon-wrap">
  <h1 class="neon-title">NEON</h1>
  <p class="subtitle">CYBERPUNK 2077</p>
</div>`
      }
    },
    {
      title: "メニュー画面",
      desc: "ネオンボーダーのカード。枠線がグローするサイバーパンクUI。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { background:#0d0d0d;padding:12px;border-radius:8px;display:flex;gap:8px;justify-content:center; }
          .${p}-card { border:1px solid #0ff;border-radius:6px;padding:12px 14px;width:80px;text-align:center;
            box-shadow:0 0 8px rgba(0,255,255,.3),inset 0 0 8px rgba(0,255,255,.1);transition:box-shadow .3s,border-color .3s; }
          .${p}-card:hover { border-color:#f0f;box-shadow:0 0 16px rgba(255,0,255,.5),inset 0 0 12px rgba(255,0,255,.15); }
          .${p}-icon { font-size:1.2rem;margin-bottom:4px; }
          .${p}-name { color:#0ff;font-size:.65rem;font-weight:600;letter-spacing:1px; }
        `);
        const w = h("div", `${p}-wrap`);
        [["HACK","//"],["DATA","{}"],["NET","<>"]].forEach(([name, icon]) => {
          const card = h("div", `${p}-card`);
          const ic = h("div", `${p}-icon`);
          ic.style.color = "#0ff";
          ic.style.fontFamily = "monospace";
          ic.textContent = icon;
          card.append(ic, h("div", `${p}-name`, name));
          w.append(card);
        });
        c.append(w);
      },
      code: {
        css: `.cyber-card {
  border: 1px solid #0ff;
  border-radius: 6px;
  padding: 12px;
  box-shadow:
    0 0 8px rgba(0,255,255,.3),
    inset 0 0 8px rgba(0,255,255,.1);
  transition: box-shadow 0.3s, border-color 0.3s;
}

.cyber-card:hover {
  border-color: #f0f;
  box-shadow:
    0 0 16px rgba(255,0,255,.5),
    inset 0 0 12px rgba(255,0,255,.15);
}`,
        html: `<div class="cyber-menu">
  <div class="cyber-card">
    <div class="icon">//</div>
    <div class="name">HACK</div>
  </div>
  <!-- ... more cards -->
</div>`
      }
    },
    {
      title: "ボタン",
      desc: "ネオングローのホバーエフェクト。ホバーで光が強まるボタン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { background:#0a0a0a;padding:16px;border-radius:8px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap; }
          .${p}-btn { padding:10px 22px;font-size:.75rem;font-weight:700;letter-spacing:2px;border:2px solid;border-radius:4px;
            background:transparent;cursor:pointer;transition:all .3s ease;text-transform:uppercase; }
          .${p}-cyan { color:#0ff;border-color:#0ff;box-shadow:0 0 5px rgba(0,255,255,.3); }
          .${p}-cyan:hover { background:rgba(0,255,255,.1);box-shadow:0 0 20px rgba(0,255,255,.6),0 0 40px rgba(0,255,255,.3); }
          .${p}-pink { color:#f0f;border-color:#f0f;box-shadow:0 0 5px rgba(255,0,255,.3); }
          .${p}-pink:hover { background:rgba(255,0,255,.1);box-shadow:0 0 20px rgba(255,0,255,.6),0 0 40px rgba(255,0,255,.3); }
          .${p}-yellow { color:#ff0;border-color:#ff0;box-shadow:0 0 5px rgba(255,255,0,.3); }
          .${p}-yellow:hover { background:rgba(255,255,0,.1);box-shadow:0 0 20px rgba(255,255,0,.6),0 0 40px rgba(255,255,0,.3); }
        `);
        const w = h("div", `${p}-wrap`);
        w.append(
          makeBtn("ENTER", `${p}-btn ${p}-cyan`),
          makeBtn("HACK", `${p}-btn ${p}-pink`),
          makeBtn("EXIT", `${p}-btn ${p}-yellow`)
        );
        c.append(w);
      },
      code: {
        css: `.neon-btn {
  color: #0ff;
  border: 2px solid #0ff;
  background: transparent;
  padding: 10px 22px;
  letter-spacing: 2px;
  box-shadow: 0 0 5px rgba(0,255,255,.3);
  transition: all 0.3s ease;
}

.neon-btn:hover {
  background: rgba(0,255,255,.1);
  box-shadow:
    0 0 20px rgba(0,255,255,.6),
    0 0 40px rgba(0,255,255,.3);
}`,
        html: `<button class="neon-btn">ENTER</button>
<button class="neon-btn pink">HACK</button>
<button class="neon-btn yellow">EXIT</button>`
      }
    }
  ];

  /* ==============================
     flat-design — フラットデザイン
     ============================== */
  demos["flat-design"] = [
    {
      title: "天気カード",
      desc: "影なしフラットUI。ベタ塗りの背景と明瞭な色分けだけで情報を伝える。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { background:#3498db;color:#fff;border-radius:8px;padding:16px;max-width:180px;margin:0 auto; }
          .${p}-city { font-size:.7rem;font-weight:600;opacity:.85; }
          .${p}-temp { font-size:2rem;font-weight:300;margin:4px 0; }
          .${p}-icon { font-size:1.5rem; }
          .${p}-desc { font-size:.7rem;opacity:.8;margin-top:4px; }
          .${p}-row { display:flex;align-items:center;gap:10px; }
        `);
        const card = h("div", `${p}-card`);
        card.append(h("div", `${p}-city`, "TOKYO"));
        const row = h("div", `${p}-row`);
        row.append(h("span", `${p}-icon`, "☀"), h("span", `${p}-temp`, "24°"));
        card.append(row, h("div", `${p}-desc`, "晴れ / 湿度 45%"));
        c.append(card);
      },
      code: {
        css: `.weather-card {
  background: #3498db;
  color: #fff;
  border-radius: 8px;
  padding: 16px;
  /* 影なし・グラデーションなし */
}

.city { font-size: 0.7rem; opacity: 0.85; }
.temp { font-size: 2rem; font-weight: 300; }
.desc { font-size: 0.7rem; opacity: 0.8; }`,
        html: `<div class="weather-card">
  <div class="city">TOKYO</div>
  <span class="icon">☀</span>
  <span class="temp">24°</span>
  <div class="desc">晴れ / 湿度 45%</div>
</div>`
      }
    },
    {
      title: "ボタンセット",
      desc: "フラットカラーのボタン。影やグラデーションを使わないシンプルな配色。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:8px;flex-wrap:wrap;justify-content:center; }
          .${p}-btn { padding:10px 20px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;cursor:pointer;color:#fff;transition:opacity .2s; }
          .${p}-btn:hover { opacity:.85; }
          .${p}-primary { background:#2ecc71; }
          .${p}-danger { background:#e74c3c; }
          .${p}-info { background:#3498db; }
          .${p}-warn { background:#f39c12; }
          .${p}-dark { background:#34495e; }
        `);
        const w = h("div", `${p}-wrap`);
        [["確認","primary"],["削除","danger"],["情報","info"],["注意","warn"],["閉じる","dark"]].forEach(([text, cls]) => {
          w.append(makeBtn(text, `${p}-btn ${p}-${cls}`));
        });
        c.append(w);
      },
      code: {
        css: `.flat-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  /* 影なし・グラデーションなし */
}

.flat-btn:hover { opacity: 0.85; }

.primary { background: #2ecc71; }
.danger  { background: #e74c3c; }
.info    { background: #3498db; }
.warn    { background: #f39c12; }`,
        html: `<button class="flat-btn primary">確認</button>
<button class="flat-btn danger">削除</button>
<button class="flat-btn info">情報</button>
<button class="flat-btn warn">注意</button>`
      }
    },
    {
      title: "プロフィールカード",
      desc: "フラットなアバター+情報。影やボーダーを最小限にしたUI。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { background:#ecf0f1;border-radius:8px;padding:16px;max-width:200px;margin:0 auto;text-align:center; }
          .${p}-avatar { width:48px;height:48px;border-radius:50%;background:#9b59b6;color:#fff;display:flex;align-items:center;
            justify-content:center;font-size:1.2rem;font-weight:700;margin:0 auto 10px; }
          .${p}-name { font-size:.85rem;font-weight:700;color:#2c3e50; }
          .${p}-role { font-size:.65rem;color:#7f8c8d;margin-top:2px; }
          .${p}-stats { display:flex;justify-content:center;gap:16px;margin-top:10px; }
          .${p}-stat { text-align:center; }
          .${p}-num { font-size:.85rem;font-weight:700;color:#2c3e50; }
          .${p}-lbl { font-size:.55rem;color:#95a5a6; }
        `);
        const card = h("div", `${p}-card`);
        card.append(h("div", `${p}-avatar`, "T"));
        card.append(h("div", `${p}-name`, "Tanaka"));
        card.append(h("div", `${p}-role`, "UI Designer"));
        const stats = h("div", `${p}-stats`);
        [["128","Posts"],["1.2k","Likes"],["56","Projects"]].forEach(([num, lbl]) => {
          const s = h("div", `${p}-stat`);
          s.append(h("div", `${p}-num`, num), h("div", `${p}-lbl`, lbl));
          stats.append(s);
        });
        card.append(stats);
        c.append(card);
      },
      code: {
        css: `.flat-profile {
  background: #ecf0f1;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #9b59b6;
  color: #fff;
}

.name { font-weight: 700; color: #2c3e50; }
.role { font-size: 0.65rem; color: #7f8c8d; }`,
        html: `<div class="flat-profile">
  <div class="avatar">T</div>
  <div class="name">Tanaka</div>
  <div class="role">UI Designer</div>
  <div class="stats">
    <div><strong>128</strong><br>Posts</div>
    <div><strong>1.2k</strong><br>Likes</div>
  </div>
</div>`
      }
    }
  ];

  /* ==============================
     material-design — マテリアルデザイン
     ============================== */
  demos["material-design"] = [
    {
      title: "エレベーション比較",
      desc: "影の深さ3段階。マテリアルデザインの「高さ」の概念を視覚化。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:14px;justify-content:center;align-items:center;flex-wrap:wrap; }
          .${p}-card { width:80px;height:80px;background:#fff;border-radius:8px;display:flex;flex-direction:column;
            align-items:center;justify-content:center;font-size:.65rem;font-weight:600;color:#555; }
          .${p}-e1 { box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.08); }
          .${p}-e2 { box-shadow:0 3px 6px rgba(0,0,0,.15),0 2px 4px rgba(0,0,0,.12); }
          .${p}-e3 { box-shadow:0 10px 20px rgba(0,0,0,.15),0 3px 6px rgba(0,0,0,.10); }
          .${p}-dp { font-size:.55rem;color:#999;margin-top:4px; }
        `);
        const w = h("div", `${p}-wrap`);
        [[1,"e1","1dp"],[2,"e2","6dp"],[3,"e3","24dp"]].forEach(([lv, cls, dp]) => {
          const card = h("div", `${p}-card ${p}-${cls}`);
          card.append(h("span", "", `Lv.${lv}`), h("span", `${p}-dp`, dp));
          w.append(card);
        });
        c.append(w);
      },
      code: {
        css: `/* Elevation Level 1 (1dp) */
.elevation-1 {
  box-shadow:
    0 1px 3px rgba(0,0,0,.12),
    0 1px 2px rgba(0,0,0,.08);
}

/* Elevation Level 2 (6dp) */
.elevation-2 {
  box-shadow:
    0 3px 6px rgba(0,0,0,.15),
    0 2px 4px rgba(0,0,0,.12);
}

/* Elevation Level 3 (24dp) */
.elevation-3 {
  box-shadow:
    0 10px 20px rgba(0,0,0,.15),
    0 3px 6px rgba(0,0,0,.10);
}`,
        html: `<div class="elevation-1">Lv.1 (1dp)</div>
<div class="elevation-2">Lv.2 (6dp)</div>
<div class="elevation-3">Lv.3 (24dp)</div>`
      }
    },
    {
      title: "FABボタン",
      desc: "フローティングアクションボタン。丸い影付きのメインアクション。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;height:120px;background:#fafafa;border-radius:8px;border:1px solid #e0e0e0; }
          .${p}-fab { position:absolute;bottom:14px;right:14px;width:48px;height:48px;border-radius:50%;border:none;
            background:#6200ee;color:#fff;font-size:1.4rem;cursor:pointer;
            box-shadow:0 3px 5px rgba(0,0,0,.2),0 6px 10px rgba(0,0,0,.14);
            transition:box-shadow .2s,transform .2s;display:flex;align-items:center;justify-content:center; }
          .${p}-fab:hover { box-shadow:0 5px 8px rgba(0,0,0,.2),0 8px 16px rgba(0,0,0,.14);transform:scale(1.05); }
          .${p}-fab:active { transform:scale(.95); }
          .${p}-hint { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:.7rem;color:#999; }
        `);
        const stage = h("div", `${p}-stage`);
        stage.append(h("span", `${p}-hint`, "Material FAB"));
        const fab = h("button", `${p}-fab`);
        fab.textContent = "+";
        stage.append(fab);
        c.append(stage);
      },
      code: {
        css: `.fab {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: #6200ee;
  color: #fff;
  font-size: 1.4rem;
  cursor: pointer;
  box-shadow:
    0 3px 5px rgba(0,0,0,.2),
    0 6px 10px rgba(0,0,0,.14);
  transition: box-shadow 0.2s, transform 0.2s;
}

.fab:hover {
  box-shadow:
    0 5px 8px rgba(0,0,0,.2),
    0 8px 16px rgba(0,0,0,.14);
  transform: scale(1.05);
}`,
        html: `<button class="fab">+</button>`
      }
    },
    {
      title: "カードレイアウト",
      desc: "影付きカード。マテリアルデザインの典型的なカードコンポーネント。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { background:#fff;border-radius:8px;overflow:hidden;max-width:220px;margin:0 auto;
            box-shadow:0 2px 4px rgba(0,0,0,.1),0 4px 8px rgba(0,0,0,.06); }
          .${p}-img { height:60px;background:linear-gradient(135deg,#6200ee,#03dac6); }
          .${p}-body { padding:12px; }
          .${p}-title { font-size:.8rem;font-weight:600;color:#212121;margin-bottom:4px; }
          .${p}-text { font-size:.65rem;color:#757575;line-height:1.5; }
          .${p}-actions { display:flex;gap:8px;padding:8px 12px;border-top:1px solid #f0f0f0; }
          .${p}-act { padding:6px 12px;font-size:.65rem;font-weight:600;border:none;border-radius:4px;cursor:pointer;
            background:transparent;color:#6200ee;transition:background .2s; }
          .${p}-act:hover { background:rgba(98,0,238,.08); }
        `);
        const card = h("div", `${p}-card`);
        card.append(h("div", `${p}-img`));
        const body = h("div", `${p}-body`);
        body.append(h("div", `${p}-title`, "Material Card"), h("div", `${p}-text`, "影と角丸でカードに奥行きを持たせるデザインパターンです。"));
        const actions = h("div", `${p}-actions`);
        actions.append(makeBtn("詳細", `${p}-act`), makeBtn("共有", `${p}-act`));
        card.append(body, actions);
        c.append(card);
      },
      code: {
        css: `.material-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 2px 4px rgba(0,0,0,.1),
    0 4px 8px rgba(0,0,0,.06);
}

.card-actions .btn {
  background: transparent;
  color: #6200ee;
  border: none;
  font-weight: 600;
}

.card-actions .btn:hover {
  background: rgba(98,0,238,.08);
}`,
        html: `<div class="material-card">
  <div class="card-image"></div>
  <div class="card-body">
    <h3>Material Card</h3>
    <p>影と角丸でカードに奥行きを持たせる</p>
  </div>
  <div class="card-actions">
    <button class="btn">詳細</button>
    <button class="btn">共有</button>
  </div>
</div>`
      }
    }
  ];

  /* ==============================
     minimal-design — ミニマルデザイン
     ============================== */
  demos["minimal-design"] = [
    {
      title: "ノートUI",
      desc: "最小限の要素で構成。罫線とテキストだけのシンプルなノートUI。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-note { max-width:220px;margin:0 auto;padding:16px;font-family:Georgia,serif; }
          .${p}-date { font-size:.55rem;color:#bbb;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px; }
          .${p}-title { font-size:.95rem;font-weight:400;color:#222;border:none;border-bottom:1px solid #e5e5e5;padding-bottom:8px;margin-bottom:8px; }
          .${p}-body { font-size:.7rem;color:#666;line-height:1.8;border:none; }
          .${p}-sep { border:none;border-top:1px solid #f0f0f0;margin:8px 0; }
        `);
        const note = h("div", `${p}-note`);
        note.append(
          h("div", `${p}-date`, "2024.06.15"),
          h("div", `${p}-title`, "Design Principles"),
          h("hr", `${p}-sep`),
          h("div", `${p}-body`, "Less is more. 余計な装飾を排除し、コンテンツそのものに集中させるデザインを心がける。")
        );
        c.append(note);
      },
      code: {
        css: `.minimal-note {
  font-family: Georgia, serif;
  padding: 16px;
  max-width: 300px;
}

.note-date {
  font-size: 0.55rem;
  color: #bbb;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.note-title {
  font-size: 0.95rem;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 8px;
}

.note-body {
  font-size: 0.7rem;
  color: #666;
  line-height: 1.8;
}`,
        html: `<div class="minimal-note">
  <div class="note-date">2024.06.15</div>
  <h2 class="note-title">Design Principles</h2>
  <p class="note-body">Less is more...</p>
</div>`
      }
    },
    {
      title: "ナビゲーション",
      desc: "テキストのみ。装飾を排除した最小限のナビゲーション。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-nav { display:flex;flex-direction:column;gap:0;max-width:160px;margin:0 auto; }
          .${p}-link { font-size:.75rem;color:#333;padding:10px 0;border-bottom:1px solid #f0f0f0;cursor:pointer;
            transition:color .2s;text-decoration:none;letter-spacing:1px; }
          .${p}-link:hover { color:#000; }
          .${p}-active { font-weight:600;color:#000; }
          .${p}-brand { font-size:.6rem;color:#ccc;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #eee; }
        `);
        const nav = h("div", `${p}-nav`);
        nav.append(h("div", `${p}-brand`, "STUDIO"));
        ["Work", "About", "Journal", "Contact"].forEach((t, i) => {
          nav.append(h("a", `${p}-link ${i === 0 ? p+"-active" : ""}`, t));
        });
        c.append(nav);
      },
      code: {
        css: `.minimal-nav {
  display: flex;
  flex-direction: column;
}

.nav-brand {
  font-size: 0.6rem;
  color: #ccc;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.nav-link {
  font-size: 0.75rem;
  color: #333;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover { color: #000; }
.nav-link.active { font-weight: 600; }`,
        html: `<nav class="minimal-nav">
  <div class="nav-brand">STUDIO</div>
  <a class="nav-link active">Work</a>
  <a class="nav-link">About</a>
  <a class="nav-link">Journal</a>
  <a class="nav-link">Contact</a>
</nav>`
      }
    },
    {
      title: "プロフィール",
      desc: "余白多めのレイアウト。ホワイトスペースで上品さを演出。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-profile { text-align:center;padding:24px 16px;max-width:200px;margin:0 auto; }
          .${p}-avatar { width:40px;height:40px;border-radius:50%;background:#222;color:#fff;display:flex;align-items:center;
            justify-content:center;font-size:.8rem;margin:0 auto 16px;font-weight:300; }
          .${p}-name { font-size:.85rem;font-weight:300;color:#222;letter-spacing:2px;margin-bottom:4px; }
          .${p}-role { font-size:.6rem;color:#aaa;letter-spacing:1px; }
          .${p}-bio { font-size:.6rem;color:#888;line-height:1.6;margin-top:14px;font-style:italic; }
        `);
        const prof = h("div", `${p}-profile`);
        prof.append(
          h("div", `${p}-avatar`, "S"),
          h("div", `${p}-name`, "Sato Yuki"),
          h("div", `${p}-role`, "Architect"),
          h("p", `${p}-bio`, "Simplicity is the ultimate sophistication.")
        );
        c.append(prof);
      },
      code: {
        css: `.minimal-profile {
  text-align: center;
  padding: 24px;
  /* 余白を多くとる */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #222;
  color: #fff;
  margin: 0 auto 16px;
}

.name {
  font-weight: 300;
  letter-spacing: 2px;
}

.role {
  font-size: 0.6rem;
  color: #aaa;
}`,
        html: `<div class="minimal-profile">
  <div class="avatar">S</div>
  <div class="name">Sato Yuki</div>
  <div class="role">Architect</div>
  <p class="bio">Simplicity is the ultimate
    sophistication.</p>
</div>`
      }
    }
  ];

  /* ==============================
     color-unity — 配色統一
     ============================== */
  demos["color-unity"] = [
    {
      title: "青系テーマ",
      desc: "同一色の濃淡のみ。ブルー系の統一感あるUIコンポーネント。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { background:#eff6ff;padding:12px;border-radius:8px;display:flex;flex-direction:column;gap:8px; }
          .${p}-header { background:#1e40af;color:#fff;padding:8px 12px;border-radius:6px;font-size:.75rem;font-weight:600; }
          .${p}-card { background:#dbeafe;padding:10px 12px;border-radius:6px;border-left:3px solid #3b82f6; }
          .${p}-card-title { font-size:.7rem;font-weight:600;color:#1e3a8a; }
          .${p}-card-text { font-size:.6rem;color:#3b82f6;margin-top:2px; }
          .${p}-btn { padding:6px 16px;font-size:.7rem;font-weight:600;border:none;border-radius:4px;background:#3b82f6;color:#fff;cursor:pointer;align-self:flex-start; }
          .${p}-footer { font-size:.55rem;color:#93c5fd;text-align:right; }
        `);
        const w = h("div", `${p}-wrap`);
        w.append(h("div", `${p}-header`, "Dashboard"));
        const card = h("div", `${p}-card`);
        card.append(h("div", `${p}-card-title`, "Monthly Report"), h("div", `${p}-card-text`, "売上データが更新されました"));
        w.append(card, makeBtn("詳細を見る", `${p}-btn`), h("div", `${p}-footer`, "同一色の濃淡だけで構成"));
        c.append(w);
      },
      code: {
        css: `/* 青系パレット */
:root {
  --blue-50:  #eff6ff;
  --blue-200: #dbeafe;
  --blue-400: #60a5fa;
  --blue-600: #3b82f6;
  --blue-800: #1e40af;
  --blue-900: #1e3a8a;
}

.header  { background: var(--blue-800); }
.card    { background: var(--blue-200);
           border-left: 3px solid var(--blue-600); }
.btn     { background: var(--blue-600); }
.bg      { background: var(--blue-50); }`,
        html: `<div class="page">
  <div class="header">Dashboard</div>
  <div class="card">
    <h3>Monthly Report</h3>
    <p>売上データが更新されました</p>
  </div>
  <button class="btn">詳細を見る</button>
</div>`
      }
    },
    {
      title: "緑系テーマ",
      desc: "自然をイメージ。グリーン系の統一配色でオーガニックな雰囲気。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { background:#f0fdf4;padding:12px;border-radius:8px;display:flex;flex-direction:column;gap:8px; }
          .${p}-badge { display:inline-block;background:#166534;color:#fff;padding:3px 10px;border-radius:12px;font-size:.6rem;font-weight:600;align-self:flex-start; }
          .${p}-title { font-size:.8rem;font-weight:600;color:#14532d; }
          .${p}-text { font-size:.65rem;color:#15803d;line-height:1.5; }
          .${p}-bar-wrap { height:6px;background:#bbf7d0;border-radius:3px;overflow:hidden; }
          .${p}-bar-fill { height:100%;background:#22c55e;border-radius:3px;width:72%; }
          .${p}-status { display:flex;justify-content:space-between;font-size:.55rem;color:#16a34a; }
        `);
        const w = h("div", `${p}-wrap`);
        w.append(h("span", `${p}-badge`, "Eco Plan"));
        w.append(h("div", `${p}-title`, "環境スコア"));
        w.append(h("div", `${p}-text`, "今月のCO2削減量は目標の72%に到達"));
        const bar = h("div", `${p}-bar-wrap`);
        bar.append(h("div", `${p}-bar-fill`));
        w.append(bar);
        const st = h("div", `${p}-status`);
        st.append(h("span", "", "0%"), h("span", "", "72%"), h("span", "", "100%"));
        w.append(st);
        c.append(w);
      },
      code: {
        css: `/* 緑系パレット */
:root {
  --green-50:  #f0fdf4;
  --green-200: #bbf7d0;
  --green-500: #22c55e;
  --green-700: #15803d;
  --green-900: #14532d;
}

.badge { background: var(--green-900); }
.title { color: var(--green-900); }
.text  { color: var(--green-700); }
.bar   { background: var(--green-200); }
.fill  { background: var(--green-500); }`,
        html: `<div class="eco-panel">
  <span class="badge">Eco Plan</span>
  <h3 class="title">環境スコア</h3>
  <p class="text">目標の72%に到達</p>
  <div class="bar"><div class="fill"></div></div>
</div>`
      }
    },
    {
      title: "パレット表示",
      desc: "カラーチップ比較。配色の統一感を確認するためのパレット表示。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:12px;justify-content:center;flex-wrap:wrap; }
          .${p}-palette { display:flex;flex-direction:column;gap:2px;align-items:center; }
          .${p}-chip { width:50px;height:22px;border-radius:3px; }
          .${p}-hex { font-size:.5rem;color:#888;font-family:monospace;margin-top:1px; }
          .${p}-name { font-size:.55rem;font-weight:600;color:#555;margin-bottom:4px; }
        `);
        const w = h("div", `${p}-wrap`);
        const palettes = [
          { name:"Warm", colors:["#fef3c7","#fbbf24","#f59e0b","#d97706","#92400e"] },
          { name:"Cool", colors:["#e0f2fe","#7dd3fc","#38bdf8","#0284c7","#075985"] },
          { name:"Earth", colors:["#fef9ef","#d6b899","#a47e5b","#7c5c3e","#4a3728"] }
        ];
        palettes.forEach(pal => {
          const col = h("div", `${p}-palette`);
          col.append(h("div", `${p}-name`, pal.name));
          pal.colors.forEach(color => {
            const chip = h("div", `${p}-chip`);
            chip.style.background = color;
            col.append(chip);
          });
          col.append(h("div", `${p}-hex`, pal.colors[2]));
          w.append(col);
        });
        c.append(w);
      },
      code: {
        css: `.palette {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.color-chip {
  width: 50px;
  height: 22px;
  border-radius: 3px;
}

/* パレット例 */
.warm-1 { background: #fef3c7; }
.warm-2 { background: #fbbf24; }
.warm-3 { background: #f59e0b; }
.warm-4 { background: #d97706; }
.warm-5 { background: #92400e; }`,
        html: `<div class="palette-group">
  <div class="palette">
    <div class="label">Warm</div>
    <div class="color-chip warm-1"></div>
    <div class="color-chip warm-2"></div>
    <!-- ... 5段階 -->
  </div>
  <!-- Cool, Earth パレットも同様 -->
</div>`
      }
    }
  ];

  /* ==============================
     contrast — コントラスト
     ============================== */
  demos["contrast"] = [
    {
      title: "テキストコントラスト",
      desc: "弱い vs 強い。コントラスト比の違いによる可読性の差を比較。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:12px;justify-content:center;flex-wrap:wrap; }
          .${p}-box { padding:12px;border-radius:8px;width:120px;text-align:center; }
          .${p}-bad { background:#f8f8f8; }
          .${p}-bad-text { color:#ccc;font-size:.75rem;font-weight:600; }
          .${p}-bad-ratio { color:#ddd;font-size:.55rem;margin-top:4px; }
          .${p}-good { background:#f8f8f8; }
          .${p}-good-text { color:#222;font-size:.75rem;font-weight:600; }
          .${p}-good-ratio { color:#888;font-size:.55rem;margin-top:4px; }
          .${p}-label { font-size:.6rem;font-weight:600;margin-bottom:4px;text-align:center; }
          .${p}-ng { color:#ef4444; }
          .${p}-ok { color:#22c55e; }
        `);
        const w = h("div", `${p}-wrap`);
        const bad = h("div", `${p}-box ${p}-bad`);
        bad.append(h("div", `${p}-label ${p}-ng`, "NG - 低コントラスト"), h("div", `${p}-bad-text`, "読みにくいテキスト"), h("div", `${p}-bad-ratio`, "比率 1.3:1"));
        const good = h("div", `${p}-box ${p}-good`);
        good.append(h("div", `${p}-label ${p}-ok`, "OK - 高コントラスト"), h("div", `${p}-good-text`, "読みやすいテキスト"), h("div", `${p}-good-ratio`, "比率 15.4:1"));
        w.append(bad, good);
        c.append(w);
      },
      code: {
        css: `/* 低コントラスト (NG) */
.low-contrast {
  background: #f8f8f8;
  color: #ccc;
  /* 比率 1.3:1 — WCAG 不合格 */
}

/* 高コントラスト (OK) */
.high-contrast {
  background: #f8f8f8;
  color: #222;
  /* 比率 15.4:1 — WCAG AAA 合格 */
}

/* WCAG 2.0 基準:
   AA = 4.5:1 以上
   AAA = 7:1 以上 */`,
        html: `<div class="low-contrast">
  読みにくいテキスト (1.3:1)
</div>
<div class="high-contrast">
  読みやすいテキスト (15.4:1)
</div>`
      }
    },
    {
      title: "ボタンコントラスト",
      desc: "見えにくい vs 見やすい。ボタンの視認性比較。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;flex-direction:column;gap:10px;align-items:center; }
          .${p}-row { display:flex;gap:10px;align-items:center; }
          .${p}-bad-btn { padding:8px 20px;border:1px solid #eee;border-radius:6px;background:#f9f9f9;color:#ddd;font-size:.7rem;font-weight:600;cursor:pointer; }
          .${p}-good-btn { padding:8px 20px;border:2px solid #1e40af;border-radius:6px;background:#1e40af;color:#fff;font-size:.7rem;font-weight:600;cursor:pointer; }
          .${p}-label { font-size:.55rem;color:#888;width:40px; }
          .${p}-ng { color:#ef4444;font-weight:700; }
          .${p}-ok { color:#22c55e;font-weight:700; }
        `);
        const w = h("div", `${p}-wrap`);
        const r1 = h("div", `${p}-row`);
        r1.append(h("span", `${p}-label ${p}-ng`, "NG"), makeBtn("送信する", `${p}-bad-btn`));
        const r2 = h("div", `${p}-row`);
        r2.append(h("span", `${p}-label ${p}-ok`, "OK"), makeBtn("送信する", `${p}-good-btn`));
        w.append(r1, r2);
        c.append(w);
      },
      code: {
        css: `/* NG: ボタンが背景に溶ける */
.btn-low {
  background: #f9f9f9;
  color: #ddd;
  border: 1px solid #eee;
}

/* OK: 背景と明確に区別できる */
.btn-high {
  background: #1e40af;
  color: #fff;
  border: 2px solid #1e40af;
}`,
        html: `<button class="btn-low">送信する</button>
<button class="btn-high">送信する</button>`
      }
    },
    {
      title: "背景+前景の組み合わせ",
      desc: "様々な背景色と前景色の組み合わせでコントラスト比を視覚化。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:4px; }
          .${p}-cell { padding:8px 6px;border-radius:4px;text-align:center;font-size:.6rem;font-weight:600; }
          .${p}-ratio { font-size:.5rem;font-weight:400;margin-top:2px;opacity:.8; }
        `);
        const g = h("div", `${p}-grid`);
        const combos = [
          { bg:"#000", fg:"#fff", ratio:"21:1", ok:true },
          { bg:"#1e40af", fg:"#fff", ratio:"8.6:1", ok:true },
          { bg:"#fbbf24", fg:"#fff", ratio:"1.5:1", ok:false },
          { bg:"#f0fdf4", fg:"#166534", ratio:"7.2:1", ok:true },
          { bg:"#fef3c7", fg:"#f59e0b", ratio:"1.8:1", ok:false },
          { bg:"#1e293b", fg:"#94a3b8", ratio:"5.6:1", ok:true },
        ];
        combos.forEach(({ bg, fg, ratio, ok }) => {
          const cell = h("div", `${p}-cell`);
          cell.style.background = bg;
          cell.style.color = fg;
          cell.append(h("div", "", ok ? "OK" : "NG"));
          cell.append(h("div", `${p}-ratio`, ratio));
          g.append(cell);
        });
        c.append(g);
      },
      code: {
        css: `/* 各組み合わせのコントラスト比 */

/* OK: 21:1 */
.combo-1 { background: #000; color: #fff; }

/* OK: 8.6:1 */
.combo-2 { background: #1e40af; color: #fff; }

/* NG: 1.5:1 */
.combo-3 { background: #fbbf24; color: #fff; }

/* OK: 7.2:1 */
.combo-4 { background: #f0fdf4; color: #166534; }

/* NG: 1.8:1 */
.combo-5 { background: #fef3c7; color: #f59e0b; }`,
        html: `<div class="contrast-grid">
  <div class="combo-1">OK (21:1)</div>
  <div class="combo-2">OK (8.6:1)</div>
  <div class="combo-3">NG (1.5:1)</div>
  <div class="combo-4">OK (7.2:1)</div>
  <div class="combo-5">NG (1.8:1)</div>
</div>`
      }
    }
  ];

  /* ==============================
     dark-mode — ダークモード
     ============================== */
  demos["dark-mode"] = [
    {
      title: "ライト vs ダーク比較",
      desc: "同じ画面の2パターン。ライトモードとダークモードを並べて比較。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:8px;justify-content:center;flex-wrap:wrap; }
          .${p}-panel { width:120px;padding:10px;border-radius:8px;font-size:.65rem; }
          .${p}-light { background:#fff;color:#222;border:1px solid #e5e7eb; }
          .${p}-dark { background:#1e1e1e;color:#e5e5e5;border:1px solid #333; }
          .${p}-header { font-weight:700;font-size:.7rem;margin-bottom:6px;padding-bottom:4px; }
          .${p}-light .${p}-header { border-bottom:1px solid #eee; }
          .${p}-dark .${p}-header { border-bottom:1px solid #444; }
          .${p}-item { padding:3px 0;font-size:.6rem; }
          .${p}-light .${p}-item { color:#555; }
          .${p}-dark .${p}-item { color:#aaa; }
          .${p}-mode { font-size:.5rem;font-weight:600;text-align:center;margin-top:6px;opacity:.5; }
        `);
        const w = h("div", `${p}-wrap`);
        ["light", "dark"].forEach(mode => {
          const panel = h("div", `${p}-panel ${p}-${mode}`);
          panel.append(h("div", `${p}-header`, "Settings"));
          ["Profile", "Theme", "Language"].forEach(t => panel.append(h("div", `${p}-item`, t)));
          panel.append(h("div", `${p}-mode`, mode === "light" ? "Light Mode" : "Dark Mode"));
          w.append(panel);
        });
        c.append(w);
      },
      code: {
        css: `/* ライトモード */
.panel-light {
  background: #fff;
  color: #222;
  border: 1px solid #e5e7eb;
}

/* ダークモード */
.panel-dark {
  background: #1e1e1e;
  color: #e5e5e5;
  border: 1px solid #333;
}

/* prefers-color-scheme で自動切り替え */
@media (prefers-color-scheme: dark) {
  .panel {
    background: #1e1e1e;
    color: #e5e5e5;
  }
}`,
        html: `<div class="panel panel-light">
  <h3>Settings</h3>
  <div>Profile</div>
  <div>Theme</div>
</div>
<div class="panel panel-dark">
  <h3>Settings</h3>
  <div>Profile</div>
  <div>Theme</div>
</div>`
      }
    },
    {
      title: "カード切り替え",
      desc: "ボタンでモード切り替え。クリックでライト/ダークを動的に切り替え。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { padding:12px;border-radius:8px;transition:background .3s,color .3s; }
          .${p}-stage.light { background:#fff;color:#222;border:1px solid #e5e7eb; }
          .${p}-stage.dark { background:#1a1a2e;color:#e5e5e5;border:1px solid #333; }
          .${p}-card { padding:10px;border-radius:6px;margin-bottom:8px;transition:background .3s; }
          .${p}-stage.light .${p}-card { background:#f9fafb; }
          .${p}-stage.dark .${p}-card { background:#16213e; }
          .${p}-card-title { font-size:.75rem;font-weight:600; }
          .${p}-card-text { font-size:.6rem;opacity:.7;margin-top:2px; }
          .${p}-toggle { padding:6px 14px;font-size:.65rem;font-weight:600;border:none;border-radius:4px;cursor:pointer;transition:all .3s; }
          .${p}-stage.light .${p}-toggle { background:#1a1a2e;color:#fff; }
          .${p}-stage.dark .${p}-toggle { background:#fff;color:#1a1a2e; }
        `);
        const stage = h("div", `${p}-stage light`);
        stage.className = `${p}-stage light`;
        const card = h("div", `${p}-card`);
        card.append(h("div", `${p}-card-title`, "Notification"), h("div", `${p}-card-text`, "新しいメッセージが届きました"));
        const toggle = makeBtn("Dark Mode", `${p}-toggle`);
        let isDark = false;
        toggle.addEventListener("click", () => {
          isDark = !isDark;
          stage.className = `${p}-stage ${isDark ? "dark" : "light"}`;
          toggle.textContent = isDark ? "Light Mode" : "Dark Mode";
        });
        stage.append(card, toggle);
        c.append(stage);
      },
      code: {
        css: `.theme-light {
  background: #fff;
  color: #222;
}

.theme-dark {
  background: #1a1a2e;
  color: #e5e5e5;
}

.card {
  transition: background 0.3s;
}

.theme-light .card { background: #f9fafb; }
.theme-dark .card  { background: #16213e; }`,
        html: `<div class="theme-light" id="app">
  <div class="card">
    <h3>Notification</h3>
    <p>新しいメッセージが届きました</p>
  </div>
  <button onclick="toggleTheme()">Dark Mode</button>
</div>`,
        js: `let dark = false;
function toggleTheme() {
  dark = !dark;
  const app = document.getElementById('app');
  app.className = dark ? 'theme-dark' : 'theme-light';
}`
      }
    },
    {
      title: "テーマ変数",
      desc: "CSS変数でのテーマ管理。変数を切り替えるだけで全体のテーマが変わる。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:8px;justify-content:center;flex-wrap:wrap; }
          .${p}-code-block { padding:10px;border-radius:6px;font-family:monospace;font-size:.55rem;line-height:1.6;width:120px; }
          .${p}-light-code { background:#f8f9fa;color:#333;border:1px solid #e5e7eb; }
          .${p}-dark-code { background:#1e1e1e;color:#d4d4d4;border:1px solid #333; }
          .${p}-var { opacity:.6; }
          .${p}-val-light { color:#0f766e; }
          .${p}-val-dark { color:#5eead4; }
          .${p}-label { text-align:center;font-size:.5rem;font-weight:600;margin-top:4px;color:#888; }
        `);
        const w = h("div", `${p}-wrap`);
        const lightBlock = h("div", "");
        const lCode = h("div", `${p}-code-block ${p}-light-code`);
        lCode.innerHTML = `<span class="${p}-var">--bg:</span> <span class="${p}-val-light">#ffffff</span>;<br>` +
          `<span class="${p}-var">--fg:</span> <span class="${p}-val-light">#222222</span>;<br>` +
          `<span class="${p}-var">--card:</span> <span class="${p}-val-light">#f9fafb</span>;<br>` +
          `<span class="${p}-var">--border:</span> <span class="${p}-val-light">#e5e7eb</span>;`;
        lightBlock.append(lCode, h("div", `${p}-label`, ":root (light)"));

        const darkBlock = h("div", "");
        const dCode = h("div", `${p}-code-block ${p}-dark-code`);
        dCode.innerHTML = `<span class="${p}-var">--bg:</span> <span class="${p}-val-dark">#1e1e1e</span>;<br>` +
          `<span class="${p}-var">--fg:</span> <span class="${p}-val-dark">#e5e5e5</span>;<br>` +
          `<span class="${p}-var">--card:</span> <span class="${p}-val-dark">#2d2d2d</span>;<br>` +
          `<span class="${p}-var">--border:</span> <span class="${p}-val-dark">#444444</span>;`;
        darkBlock.append(dCode, h("div", `${p}-label`, ":root (dark)"));

        w.append(lightBlock, darkBlock);
        c.append(w);
      },
      code: {
        css: `/* Light Theme */
:root {
  --bg: #ffffff;
  --fg: #222222;
  --card: #f9fafb;
  --border: #e5e7eb;
}

/* Dark Theme */
:root[data-theme="dark"] {
  --bg: #1e1e1e;
  --fg: #e5e5e5;
  --card: #2d2d2d;
  --border: #444444;
}

body {
  background: var(--bg);
  color: var(--fg);
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
}`,
        html: `<html data-theme="light">
  <body>
    <div class="card">...</div>
    <button onclick="toggle()">Toggle</button>
  </body>
</html>`,
        js: `function toggle() {
  const html = document.documentElement;
  const current = html.dataset.theme;
  html.dataset.theme =
    current === 'dark' ? 'light' : 'dark';
}`
      }
    }
  ];

  /* ==============================
     monotone — モノトーン
     ============================== */
  demos["monotone"] = [
    {
      title: "ギャラリー",
      desc: "グレースケールのカード。白黒グレーだけで構成されたギャラリーUI。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:6px; }
          .${p}-card { border-radius:6px;overflow:hidden;border:1px solid #e5e5e5; }
          .${p}-img { height:40px; }
          .${p}-body { padding:6px 8px; }
          .${p}-title { font-size:.6rem;font-weight:600;color:#222; }
          .${p}-sub { font-size:.5rem;color:#999;margin-top:1px; }
        `);
        const g = h("div", `${p}-grid`);
        const grays = ["#333","#666","#999","#bbb","#555","#888"];
        ["Abstract","Texture","Pattern"].forEach((title, i) => {
          const card = h("div", `${p}-card`);
          const img = h("div", `${p}-img`);
          img.style.background = `linear-gradient(135deg, ${grays[i*2]}, ${grays[i*2+1]})`;
          const body = h("div", `${p}-body`);
          body.append(h("div", `${p}-title`, title), h("div", `${p}-sub`, `No.${i+1}`));
          card.append(img, body);
          g.append(card);
        });
        c.append(g);
      },
      code: {
        css: `.mono-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.mono-card {
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  overflow: hidden;
}

.mono-img {
  height: 60px;
  background: linear-gradient(135deg, #333, #666);
}

.mono-title { color: #222; }
.mono-sub   { color: #999; }`,
        html: `<div class="mono-gallery">
  <div class="mono-card">
    <div class="mono-img"></div>
    <div class="mono-body">
      <div class="mono-title">Abstract</div>
      <div class="mono-sub">No.1</div>
    </div>
  </div>
  <!-- ... more cards -->
</div>`
      }
    },
    {
      title: "UI要素",
      desc: "白黒グレーだけのフォーム。色を使わずに要素を区別するUI設計。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-form { max-width:200px;margin:0 auto;display:flex;flex-direction:column;gap:8px; }
          .${p}-label { font-size:.6rem;font-weight:600;color:#333; }
          .${p}-input { padding:7px 10px;border:1px solid #ccc;border-radius:4px;font-size:.7rem;color:#333;background:#fff;outline:none; }
          .${p}-input:focus { border-color:#555; }
          .${p}-select { padding:7px 10px;border:1px solid #ccc;border-radius:4px;font-size:.7rem;color:#333;background:#fff; }
          .${p}-row { display:flex;gap:6px; }
          .${p}-btn-primary { padding:7px 16px;border:none;border-radius:4px;font-size:.65rem;font-weight:600;background:#333;color:#fff;cursor:pointer; }
          .${p}-btn-secondary { padding:7px 16px;border:1px solid #999;border-radius:4px;font-size:.65rem;font-weight:600;background:#fff;color:#555;cursor:pointer; }
        `);
        const form = h("div", `${p}-form`);
        form.append(h("label", `${p}-label`, "Name"));
        const input = h("input", `${p}-input`);
        input.placeholder = "Enter name...";
        form.append(input);
        form.append(h("label", `${p}-label`, "Role"));
        const sel = h("select", `${p}-select`);
        ["Designer", "Developer", "Manager"].forEach(t => {
          const opt = h("option", "", t);
          sel.append(opt);
        });
        form.append(sel);
        const row = h("div", `${p}-row`);
        row.append(makeBtn("Submit", `${p}-btn-primary`), makeBtn("Cancel", `${p}-btn-secondary`));
        form.append(row);
        c.append(form);
      },
      code: {
        css: `/* モノトーンフォーム */
.mono-input {
  border: 1px solid #ccc;
  color: #333;
  background: #fff;
}

.mono-input:focus {
  border-color: #555;
}

.btn-primary {
  background: #333;
  color: #fff;
}

.btn-secondary {
  background: #fff;
  color: #555;
  border: 1px solid #999;
}`,
        html: `<form class="mono-form">
  <label>Name</label>
  <input class="mono-input" placeholder="Enter name...">
  <label>Role</label>
  <select class="mono-input">
    <option>Designer</option>
    <option>Developer</option>
  </select>
  <button class="btn-primary">Submit</button>
  <button class="btn-secondary">Cancel</button>
</form>`
      }
    },
    {
      title: "テキスト階層",
      desc: "色の濃淡で優先度を表現。グレーの段階で情報の重要度を示す。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { max-width:220px;margin:0 auto;padding:12px; }
          .${p}-h1 { font-size:1rem;font-weight:700;color:#111;margin-bottom:4px; }
          .${p}-h2 { font-size:.75rem;font-weight:600;color:#444;margin-bottom:4px; }
          .${p}-body { font-size:.65rem;color:#777;line-height:1.6;margin-bottom:6px; }
          .${p}-caption { font-size:.55rem;color:#bbb; }
          .${p}-bar { display:flex;gap:2px;margin-top:8px; }
          .${p}-swatch { flex:1;height:14px;border-radius:2px; }
          .${p}-bar-label { display:flex;justify-content:space-between;font-size:.45rem;color:#999;margin-top:2px; }
        `);
        const w = h("div", `${p}-wrap`);
        w.append(
          h("div", `${p}-h1`, "Heading 1"),
          h("div", `${p}-h2`, "Heading 2 — サブタイトル"),
          h("div", `${p}-body`, "本文テキスト。最も多く読まれる部分で、中間のグレーを使用して目に優しくします。"),
          h("div", `${p}-caption`, "Caption — 補足情報・注釈")
        );
        const bar = h("div", `${p}-bar`);
        ["#111","#444","#777","#aaa","#ccc","#eee"].forEach(color => {
          const sw = h("div", `${p}-swatch`);
          sw.style.background = color;
          bar.append(sw);
        });
        const labels = h("div", `${p}-bar-label`);
        labels.append(h("span", "", "重要"), h("span", "", "補助"));
        w.append(bar, labels);
        c.append(w);
      },
      code: {
        css: `/* テキスト階層 — グレーの濃淡 */
.heading-1 {
  color: #111; /* 最重要 */
  font-weight: 700;
}

.heading-2 {
  color: #444; /* 重要 */
  font-weight: 600;
}

.body-text {
  color: #777; /* 標準 */
}

.caption {
  color: #bbb; /* 補助 */
}

/* 濃い = 重要、薄い = 補助 */`,
        html: `<h1 class="heading-1">Heading 1</h1>
<h2 class="heading-2">Heading 2</h2>
<p class="body-text">本文テキスト...</p>
<small class="caption">Caption — 補足情報</small>`
      }
    }
  ];

  /* ==============================
     typography — タイポグラフィ
     ============================== */
  demos["typography"] = [
    {
      title: "サイズ階層",
      desc: "h1〜本文〜キャプション。フォントサイズで情報の階層を表現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { max-width:240px;margin:0 auto; }
          .${p}-h1 { font-size:1.3rem;font-weight:700;color:#111;margin-bottom:2px;line-height:1.2; }
          .${p}-h2 { font-size:.9rem;font-weight:600;color:#333;margin-bottom:2px; }
          .${p}-h3 { font-size:.75rem;font-weight:600;color:#555;margin-bottom:4px; }
          .${p}-body { font-size:.65rem;color:#666;line-height:1.6;margin-bottom:4px; }
          .${p}-caption { font-size:.5rem;color:#999; }
          .${p}-size { font-size:.45rem;color:#bbb;float:right;font-family:monospace; }
        `);
        const w = h("div", `${p}-wrap`);
        const items = [
          ["h1", "見出し1 — Heading", "1.3rem"],
          ["h2", "見出し2 — Subheading", "0.9rem"],
          ["h3", "見出し3 — Section", "0.75rem"],
          ["body", "本文テキスト。読みやすいサイズと行間を設定します。", "0.65rem"],
          ["caption", "キャプション — 補足情報や注釈に使用", "0.5rem"]
        ];
        items.forEach(([cls, text, size]) => {
          const line = h("div", `${p}-${cls}`);
          const sizeLabel = h("span", `${p}-size`, size);
          line.append(sizeLabel);
          line.append(document.createTextNode(text));
          w.append(line);
        });
        c.append(w);
      },
      code: {
        css: `.h1      { font-size: 2rem;    font-weight: 700; }
.h2      { font-size: 1.5rem;  font-weight: 600; }
.h3      { font-size: 1.17rem; font-weight: 600; }
.body    { font-size: 1rem;    font-weight: 400; }
.caption { font-size: 0.75rem; color: #999; }

/*
 * スケール比率: Major Third (1.25)
 *   2rem → 1.5rem → 1.17rem → 1rem → 0.75rem
 */`,
        html: `<h1 class="h1">見出し1</h1>
<h2 class="h2">見出し2</h2>
<h3 class="h3">見出し3</h3>
<p class="body">本文テキスト</p>
<small class="caption">キャプション</small>`
      }
    },
    {
      title: "ウェイト",
      desc: "thin/regular/bold比較。同じフォントのウェイト違いを並べて比較。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;flex-direction:column;gap:6px;max-width:240px;margin:0 auto; }
          .${p}-row { display:flex;align-items:baseline;gap:8px; }
          .${p}-weight-label { font-size:.5rem;color:#999;width:55px;text-align:right;font-family:monospace;flex-shrink:0; }
          .${p}-text { font-size:.85rem;color:#222; }
          .${p}-w100 { font-weight:100; }
          .${p}-w300 { font-weight:300; }
          .${p}-w400 { font-weight:400; }
          .${p}-w600 { font-weight:600; }
          .${p}-w700 { font-weight:700; }
          .${p}-w900 { font-weight:900; }
          .${p}-sep { border:none;border-top:1px solid #f0f0f0;margin:2px 0; }
        `);
        const w = h("div", `${p}-wrap`);
        const weights = [
          [100, "Thin"],
          [300, "Light"],
          [400, "Regular"],
          [600, "Semi Bold"],
          [700, "Bold"],
          [900, "Black"]
        ];
        weights.forEach(([weight, name]) => {
          const row = h("div", `${p}-row`);
          row.append(h("span", `${p}-weight-label`, `${weight}`));
          const text = h("span", `${p}-text ${p}-w${weight}`, `Typography — ${name}`);
          row.append(text);
          w.append(row);
        });
        c.append(w);
      },
      code: {
        css: `.thin    { font-weight: 100; }
.light   { font-weight: 300; }
.regular { font-weight: 400; }
.semi    { font-weight: 600; }
.bold    { font-weight: 700; }
.black   { font-weight: 900; }

/*
 * font-weight の数値指定:
 *   100=Thin 300=Light 400=Regular
 *   600=SemiBold 700=Bold 900=Black
 */`,
        html: `<p class="thin">Typography — Thin</p>
<p class="light">Typography — Light</p>
<p class="regular">Typography — Regular</p>
<p class="semi">Typography — Semi Bold</p>
<p class="bold">Typography — Bold</p>
<p class="black">Typography — Black</p>`
      }
    },
    {
      title: "行間と字間",
      desc: "letter-spacing & line-height。文字間と行間の調整による印象の違い。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:10px;justify-content:center;flex-wrap:wrap; }
          .${p}-box { width:120px;padding:8px;border:1px solid #eee;border-radius:6px; }
          .${p}-label { font-size:.5rem;font-weight:600;color:#999;margin-bottom:4px;letter-spacing:1px;text-transform:uppercase; }
          .${p}-tight { font-size:.6rem;color:#333;letter-spacing:-0.5px;line-height:1.2; }
          .${p}-normal { font-size:.6rem;color:#333;letter-spacing:0;line-height:1.6; }
          .${p}-wide { font-size:.6rem;color:#333;letter-spacing:2px;line-height:2; }
          .${p}-prop { font-size:.45rem;color:#aaa;font-family:monospace;margin-top:4px; }
        `);
        const w = h("div", `${p}-wrap`);
        const configs = [
          { label:"Tight", cls:"tight", desc:"タイポグラフィは文字の配置と選択によってテキストの見た目を決定します。", prop:"ls:-0.5px lh:1.2" },
          { label:"Normal", cls:"normal", desc:"タイポグラフィは文字の配置と選択によってテキストの見た目を決定します。", prop:"ls:0 lh:1.6" },
          { label:"Wide", cls:"wide", desc:"タイポグラフィは文字の配置と選択によってテキストの見た目を決定します。", prop:"ls:2px lh:2.0" }
        ];
        configs.forEach(({ label, cls, desc, prop }) => {
          const box = h("div", `${p}-box`);
          box.append(h("div", `${p}-label`, label), h("div", `${p}-${cls}`, desc), h("div", `${p}-prop`, prop));
          w.append(box);
        });
        c.append(w);
      },
      code: {
        css: `/* タイト */
.tight {
  letter-spacing: -0.5px;
  line-height: 1.2;
}

/* 標準 */
.normal {
  letter-spacing: 0;
  line-height: 1.6;
}

/* ワイド */
.wide {
  letter-spacing: 2px;
  line-height: 2.0;
}

/*
 * letter-spacing: 字間（文字同士の間隔）
 * line-height: 行間（行同士の間隔）
 * 用途に応じて使い分ける
 */`,
        html: `<p class="tight">
  タイポグラフィは文字の配置と選択...
</p>
<p class="normal">
  タイポグラフィは文字の配置と選択...
</p>
<p class="wide">
  タイポグラフィは文字の配置と選択...
</p>`
      }
    }
  ];

  window.multiDemos = Object.assign(window.multiDemos || {}, demos);
})();
