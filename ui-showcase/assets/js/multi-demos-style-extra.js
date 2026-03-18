/* ==========================================================================
   Multi-Demo Extra — 見た目・スタイルの追加見本 (各用語に+2で計5個に)
   ========================================================================== */
(function () {
  let uid = 2000;
  function id() { return "se" + (++uid); }

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
    b.className = cls || "se-btn";
    b.textContent = text;
    return b;
  }

  const demos = window.multiDemos;
  if (!demos) return;

  /* ==============================
     pixel-art — 追加2つ
     ============================== */
  demos["pixel-art"].push(
    {
      title: "ドット絵フォント",
      desc: "CSSグリッドで1ピクセルずつ配置し「GAME」の文字をドット絵風に表現。box-shadowでも実現可能。",
      render(c) {
        const p = id();
        const letters = {
          G: [1,2,3,5,10,15,17,18,20,23,25],
          A: [1,2,3,5,8,10,11,12,13,15,18,20,23],
          M: [0,4,5,9,10,12,14,15,19,20,24],
          E: [0,1,2,3,4,5,10,11,12,15,20,21,22,23,24]
        };
        addStyle(c, `
          .${p}-wrap { display:flex; gap:10px; justify-content:center; padding:10px 0; }
          .${p}-letter { display:grid; grid-template-columns:repeat(5,8px); grid-template-rows:repeat(5,8px); gap:1px; }
          .${p}-on { background:#e63946; border-radius:1px; }
          .${p}-off { background:#f1dede; border-radius:1px; }
        `);
        const wrap = h("div", `${p}-wrap`);
        for (const [, cells] of Object.entries(letters)) {
          const g = h("div", `${p}-letter`);
          for (let i = 0; i < 25; i++) {
            g.append(h("div", cells.includes(i) ? `${p}-on` : `${p}-off`));
          }
          wrap.append(g);
        }
        c.append(wrap);
      },
      code: {
        css: `.pixel-wrap {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.pixel-letter {
  display: grid;
  grid-template-columns: repeat(5, 8px);
  grid-template-rows: repeat(5, 8px);
  gap: 1px;
}

.on  { background: #e63946; }
.off { background: #f1dede; }`,
        html: `<div class="pixel-wrap">
  <div class="pixel-letter">
    <!-- 25マスで1文字を表現 -->
  </div>
</div>`
      }
    },
    {
      title: "ドット絵アニメーション",
      desc: "2フレームのスプライトをCSS animationで切り替え、ドット絵キャラが動いているように見せる。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; padding:8px 0; }
          .${p}-sprite { display:inline-grid; grid-template-columns:repeat(5,10px); grid-template-rows:repeat(5,10px); gap:1px;
            animation:${p}-bounce 0.6s ease-in-out infinite; }
          .${p}-g { background:#6bcb77; border-radius:1px; }
          .${p}-w { background:#fff; border-radius:1px; }
          .${p}-e { background:#222; border-radius:1px; }
          .${p}-sprite .${p}-f2 { display:none; }
          @keyframes ${p}-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          .${p}-label { font-size:0.7rem; color:#888; margin-top:6px; }
        `);
        // Slime character frame
        const frame = [
          0,1,1,1,0,
          1,1,1,1,1,
          1,0,1,0,1,
          1,1,1,1,1,
          0,1,1,1,0
        ]; // 0=bg, 1=green, 2=eye
        const eyePos = [11, 13];
        const wrap = h("div", `${p}-wrap`);
        const g = h("div", `${p}-sprite`);
        for (let i = 0; i < 25; i++) {
          if (eyePos.includes(i)) {
            g.append(h("div", `${p}-e`));
          } else {
            g.append(h("div", frame[i] ? `${p}-g` : `${p}-w`));
          }
        }
        wrap.append(g);
        wrap.append(h("div", `${p}-label`, "▲ スライムがぴょんぴょん"));
        c.append(wrap);
      },
      code: {
        css: `.slime {
  display: inline-grid;
  grid-template-columns: repeat(5, 10px);
  grid-template-rows: repeat(5, 10px);
  gap: 1px;
  animation: bounce 0.6s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

.green { background: #6bcb77; }
.eye   { background: #222; }`,
        html: `<div class="slime">
  <!-- 5×5 グリッドでスライムを表現 -->
</div>`
      }
    }
  );

  /* ==============================
     retro-8bit — 追加2つ
     ============================== */
  demos["retro-8bit"].push(
    {
      title: "8ビットボタン",
      desc: "チャンキーなボーダーとピクセル風フォントで、レトロゲームのUIボタンを再現。押すと3D効果で凹む。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex; gap:10px; justify-content:center; padding:10px 0; }
          .${p}-btn { font-family:monospace; font-size:0.85rem; font-weight:700; padding:8px 18px; cursor:pointer;
            background:#4cc9f0; color:#000; border:4px solid; border-color:#7de2f5 #1a8ab0 #1a8ab0 #7de2f5;
            box-shadow:2px 2px 0 #0a2a3a; position:relative; top:0; transition:none; }
          .${p}-btn:active { top:2px; box-shadow:none; border-color:#1a8ab0 #7de2f5 #7de2f5 #1a8ab0; }
          .${p}-btn--red { background:#ef476f; border-color:#f5899e #b0233f #b0233f #f5899e; box-shadow:2px 2px 0 #3a0a15; }
          .${p}-btn--red:active { border-color:#b0233f #f5899e #f5899e #b0233f; }
          .${p}-btn--grn { background:#06d6a0; border-color:#5cedc5 #04916b #04916b #5cedc5; box-shadow:2px 2px 0 #0a3a2a; }
          .${p}-btn--grn:active { border-color:#04916b #5cedc5 #5cedc5 #04916b; }
        `);
        const wrap = h("div", `${p}-wrap`);
        wrap.append(makeBtn("FIGHT", `${p}-btn ${p}-btn--red`));
        wrap.append(makeBtn("MAGIC", `${p}-btn`));
        wrap.append(makeBtn("HEAL", `${p}-btn ${p}-btn--grn`));
        c.append(wrap);
      },
      code: {
        css: `.retro-btn {
  font-family: monospace;
  font-weight: 700;
  padding: 8px 18px;
  background: #4cc9f0;
  color: #000;
  border: 4px solid;
  border-color: #7de2f5 #1a8ab0 #1a8ab0 #7de2f5;
  box-shadow: 2px 2px 0 #0a2a3a;
  cursor: pointer;
}

.retro-btn:active {
  box-shadow: none;
  border-color: #1a8ab0 #7de2f5 #7de2f5 #1a8ab0;
}`,
        html: `<button class="retro-btn">FIGHT</button>
<button class="retro-btn">MAGIC</button>`
      }
    },
    {
      title: "レトロダイアログ",
      desc: "RPG風ダイアログボックス。太いボーダーにキャラ名表示、テキストがタイプライターアニメーションで流れる。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-box { background:#1a1a2e; border:4px solid #e0e0e0; border-radius:4px; padding:12px 14px 10px; position:relative; max-width:320px; margin:6px auto; }
          .${p}-name { position:absolute; top:-12px; left:12px; background:#e63946; color:#fff; font-family:monospace; font-size:0.7rem; font-weight:700; padding:2px 10px; border:2px solid #e0e0e0; }
          .${p}-text { font-family:monospace; font-size:0.8rem; color:#e0e0e0; line-height:1.5; white-space:nowrap; overflow:hidden;
            width:0; animation:${p}-type 3s steps(22) 0.5s forwards; }
          @keyframes ${p}-type { to { width:22ch; } }
          .${p}-cursor { display:inline-block; font-size:0.9rem; color:#e0e0e0; animation:${p}-blink 0.8s step-end infinite; position:absolute; bottom:8px; right:12px; }
          @keyframes ${p}-blink { 50% { opacity:0; } }
        `);
        const box = h("div", `${p}-box`);
        box.append(h("span", `${p}-name`, "勇者"));
        box.append(h("div", `${p}-text`, "魔王を倒しに行こう！準備はいいか？"));
        box.append(h("span", `${p}-cursor`, "▼"));
        c.append(box);
      },
      code: {
        css: `.dialog-box {
  background: #1a1a2e;
  border: 4px solid #e0e0e0;
  border-radius: 4px;
  padding: 12px 14px;
  position: relative;
}

.dialog-name {
  position: absolute;
  top: -12px; left: 12px;
  background: #e63946;
  color: #fff;
  font-family: monospace;
  font-size: 0.7rem;
  padding: 2px 10px;
  border: 2px solid #e0e0e0;
}

.dialog-text {
  font-family: monospace;
  color: #e0e0e0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  animation: typewriter 3s steps(22) forwards;
}

@keyframes typewriter {
  to { width: 22ch; }
}`,
        html: `<div class="dialog-box">
  <span class="dialog-name">勇者</span>
  <div class="dialog-text">魔王を倒しに行こう！準備はいいか？</div>
  <span class="cursor">▼</span>
</div>`
      }
    }
  );

  /* ==============================
     neon-cyberpunk — 追加2つ
     ============================== */
  demos["neon-cyberpunk"].push(
    {
      title: "ネオンカード",
      desc: "暗い背景に複数レイヤーのbox-shadowでネオン発光するカード。スキャンライン効果もCSSで再現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { background:#0d0d1a; border:1px solid #0ff; border-radius:6px; padding:14px 16px; max-width:260px; margin:6px auto; position:relative; overflow:hidden;
            box-shadow:0 0 5px #0ff,0 0 15px rgba(0,255,255,.3),inset 0 0 10px rgba(0,255,255,.1); }
          .${p}-card::after { content:""; position:absolute; top:0; left:0; right:0; bottom:0; pointer-events:none;
            background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,255,.03) 2px,rgba(0,255,255,.03) 4px); }
          .${p}-title { font-family:monospace; font-size:1rem; font-weight:700; color:#0ff; text-shadow:0 0 8px #0ff; margin-bottom:6px; }
          .${p}-body { font-size:0.75rem; color:rgba(255,255,255,.7); line-height:1.5; }
          .${p}-tag { display:inline-block; font-size:0.65rem; color:#f0f; border:1px solid #f0f; padding:1px 6px; border-radius:3px; margin-top:8px; text-shadow:0 0 4px #f0f; }
        `);
        const card = h("div", `${p}-card`);
        card.append(h("div", `${p}-title`, "SYSTEM ONLINE"));
        card.append(h("div", `${p}-body`, "ネットワーク接続が確立されました。すべてのモジュールが正常に動作しています。"));
        card.append(h("span", `${p}-tag`, "CONNECTED"));
        c.append(card);
      },
      code: {
        css: `.neon-card {
  background: #0d0d1a;
  border: 1px solid #0ff;
  border-radius: 6px;
  padding: 14px 16px;
  box-shadow:
    0 0 5px #0ff,
    0 0 15px rgba(0,255,255,.3),
    inset 0 0 10px rgba(0,255,255,.1);
  position: relative;
  overflow: hidden;
}

/* スキャンライン */
.neon-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0,255,255,.03) 2px,
    rgba(0,255,255,.03) 4px
  );
  pointer-events: none;
}

.neon-title {
  color: #0ff;
  text-shadow: 0 0 8px #0ff;
}`,
        html: `<div class="neon-card">
  <div class="neon-title">SYSTEM ONLINE</div>
  <p>ネットワーク接続が確立されました。</p>
  <span class="neon-tag">CONNECTED</span>
</div>`
      }
    },
    {
      title: "サイバーパンクHUD",
      desc: "ネオンで光るHP/MPバー、ボーダーで作るレーダー風の照準、サイバーパンクなHUDを表現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-hud { background:#0a0a14; border:1px solid rgba(0,255,255,.3); border-radius:6px; padding:10px 14px; max-width:280px; margin:6px auto; font-family:monospace; }
          .${p}-row { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
          .${p}-label { font-size:0.7rem; color:#0ff; width:24px; text-shadow:0 0 4px #0ff; }
          .${p}-bar { flex:1; height:10px; background:#111; border:1px solid rgba(0,255,255,.2); border-radius:2px; overflow:hidden; }
          .${p}-fill-hp { height:100%; width:72%; background:linear-gradient(90deg,#e63946,#ff6b6b); box-shadow:0 0 6px #e63946; }
          .${p}-fill-mp { height:100%; width:45%; background:linear-gradient(90deg,#4361ee,#7b9ef7); box-shadow:0 0 6px #4361ee; }
          .${p}-val { font-size:0.65rem; color:rgba(255,255,255,.6); width:40px; text-align:right; }
          .${p}-radar { width:50px; height:50px; border:2px solid rgba(0,255,255,.4); border-radius:50%; margin:4px auto 0; position:relative; }
          .${p}-radar::before { content:""; position:absolute; top:50%; left:0; right:0; height:1px; background:rgba(0,255,255,.3); }
          .${p}-radar::after { content:""; position:absolute; left:50%; top:0; bottom:0; width:1px; background:rgba(0,255,255,.3); }
          .${p}-dot { position:absolute; width:4px; height:4px; background:#0ff; border-radius:50%; top:30%; left:60%; box-shadow:0 0 4px #0ff; }
          .${p}-foot { font-size:0.6rem; color:rgba(0,255,255,.5); text-align:center; margin-top:6px; }
        `);
        const hud = h("div", `${p}-hud`);

        const row1 = h("div", `${p}-row`);
        row1.append(h("span", `${p}-label`, "HP"));
        const bar1 = h("div", `${p}-bar`);
        bar1.append(h("div", `${p}-fill-hp`));
        row1.append(bar1);
        row1.append(h("span", `${p}-val`, "72/100"));
        hud.append(row1);

        const row2 = h("div", `${p}-row`);
        row2.append(h("span", `${p}-label`, "MP"));
        const bar2 = h("div", `${p}-bar`);
        bar2.append(h("div", `${p}-fill-mp`));
        row2.append(bar2);
        row2.append(h("span", `${p}-val`, "45/100"));
        hud.append(row2);

        const radar = h("div", `${p}-radar`);
        radar.append(h("div", `${p}-dot`));
        hud.append(radar);
        hud.append(h("div", `${p}-foot`, "SECTOR 7-G // SCANNING"));
        c.append(hud);
      },
      code: {
        css: `.hud {
  background: #0a0a14;
  border: 1px solid rgba(0,255,255,.3);
  font-family: monospace;
}

.bar-label { color: #0ff; text-shadow: 0 0 4px #0ff; }

.bar { background: #111; border: 1px solid rgba(0,255,255,.2); }
.bar-hp { background: linear-gradient(90deg, #e63946, #ff6b6b); box-shadow: 0 0 6px #e63946; }
.bar-mp { background: linear-gradient(90deg, #4361ee, #7b9ef7); box-shadow: 0 0 6px #4361ee; }

.radar {
  width: 50px; height: 50px;
  border: 2px solid rgba(0,255,255,.4);
  border-radius: 50%;
  position: relative;
}`,
        html: `<div class="hud">
  <div class="row"><span class="bar-label">HP</span>
    <div class="bar"><div class="bar-hp" style="width:72%"></div></div>
  </div>
  <div class="radar"><div class="dot"></div></div>
</div>`
      }
    }
  );

  /* ==============================
     flat-design — 追加2つ
     ============================== */
  demos["flat-design"].push(
    {
      title: "フラットアイコン",
      desc: "影やグラデーションを一切使わない、丸背景+記号/絵文字のアイコン群。フラットデザインの基本。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex; gap:12px; justify-content:center; padding:10px 0; flex-wrap:wrap; }
          .${p}-icon { width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.3rem; }
          .${p}-label { font-size:0.6rem; color:#555; text-align:center; margin-top:3px; }
          .${p}-item { text-align:center; }
        `);
        const icons = [
          { bg: "#4361ee", emoji: "📷", label: "カメラ" },
          { bg: "#e63946", emoji: "🎵", label: "ミュージック" },
          { bg: "#2a9d8f", emoji: "✉️", label: "メール" },
          { bg: "#f77f00", emoji: "⚙️", label: "設定" },
          { bg: "#6a4c93", emoji: "👤", label: "ユーザー" }
        ];
        const wrap = h("div", `${p}-wrap`);
        icons.forEach(ic => {
          const item = h("div", `${p}-item`);
          const circle = h("div", `${p}-icon`);
          circle.style.background = ic.bg;
          circle.textContent = ic.emoji;
          item.append(circle);
          item.append(h("div", `${p}-label`, ic.label));
          wrap.append(item);
        });
        c.append(wrap);
      },
      code: {
        css: `.flat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  /* 影・グラデーションは使わない */
}

.flat-icon.camera  { background: #4361ee; }
.flat-icon.music   { background: #e63946; }
.flat-icon.mail    { background: #2a9d8f; }`,
        html: `<div class="icon-grid">
  <div class="flat-icon camera">📷</div>
  <div class="flat-icon music">🎵</div>
  <div class="flat-icon mail">✉️</div>
</div>`
      }
    },
    {
      title: "フラットナビゲーション",
      desc: "グラデーションや影を使わず、太いアンダーラインでアクティブ状態を示すフラットスタイルのタブナビ。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-nav { display:flex; background:#4361ee; border-radius:6px; overflow:hidden; max-width:320px; margin:6px auto; }
          .${p}-tab { flex:1; text-align:center; padding:10px 4px; font-size:0.75rem; font-weight:700; color:rgba(255,255,255,.7); cursor:pointer; border-bottom:3px solid transparent; transition:color .2s,border-color .2s; }
          .${p}-tab:hover { color:#fff; }
          .${p}-tab--active { color:#fff; border-bottom-color:#fff; background:rgba(255,255,255,.1); }
        `);
        const nav = h("div", `${p}-nav`);
        ["ホーム", "検索", "通知", "設定"].forEach((label, i) => {
          const tab = h("div", `${p}-tab${i === 0 ? ` ${p}-tab--active` : ""}`, label);
          tab.addEventListener("click", () => {
            nav.querySelectorAll(`.${p}-tab`).forEach(t => t.classList.remove(`${p}-tab--active`));
            tab.classList.add(`${p}-tab--active`);
          });
          nav.append(tab);
        });
        c.append(nav);
      },
      code: {
        css: `.flat-nav {
  display: flex;
  background: #4361ee;
  border-radius: 6px;
  overflow: hidden;
}

.flat-tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  font-weight: 700;
  color: rgba(255,255,255,.7);
  border-bottom: 3px solid transparent;
}

.flat-tab:hover { color: #fff; }

.flat-tab--active {
  color: #fff;
  border-bottom-color: #fff;
  background: rgba(255,255,255,.1);
}`,
        html: `<nav class="flat-nav">
  <div class="flat-tab flat-tab--active">ホーム</div>
  <div class="flat-tab">検索</div>
  <div class="flat-tab">通知</div>
  <div class="flat-tab">設定</div>
</nav>`
      }
    }
  );

  /* ==============================
     material-design — 追加2つ
     ============================== */
  demos["material-design"].push(
    {
      title: "マテリアルフォーム",
      desc: "フォーカスでラベルが浮き上がり、下線がアクセントカラーに変わるマテリアルデザインの入力フィールド。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { padding:10px 16px; max-width:280px; margin:0 auto; }
          .${p}-field { position:relative; margin-bottom:14px; }
          .${p}-input { width:100%; border:none; border-bottom:2px solid #ccc; padding:12px 0 4px; font-size:0.85rem; background:transparent; outline:none; box-sizing:border-box; transition:border-color .3s; }
          .${p}-input:focus { border-bottom-color:#6200ee; }
          .${p}-lbl { position:absolute; top:12px; left:0; font-size:0.85rem; color:#888; pointer-events:none; transition:all .2s; }
          .${p}-input:focus ~ .${p}-lbl,
          .${p}-input:not(:placeholder-shown) ~ .${p}-lbl { top:-2px; font-size:0.65rem; color:#6200ee; }
          .${p}-line { position:absolute; bottom:0; left:50%; width:0; height:2px; background:#6200ee; transition:all .3s; }
          .${p}-input:focus ~ .${p}-line { left:0; width:100%; }
        `);
        const wrap = h("div", `${p}-wrap`);

        [["ユーザー名", "text"], ["メールアドレス", "email"]].forEach(([label, type]) => {
          const field = h("div", `${p}-field`);
          const input = document.createElement("input");
          input.type = type;
          input.className = `${p}-input`;
          input.placeholder = " ";
          const lbl = h("label", `${p}-lbl`, label);
          const line = h("div", `${p}-line`);
          field.append(input, lbl, line);
          wrap.append(field);
        });
        c.append(wrap);
      },
      code: {
        css: `.md-field { position: relative; }

.md-input {
  width: 100%;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 12px 0 4px;
  outline: none;
  transition: border-color 0.3s;
}

.md-input:focus { border-bottom-color: #6200ee; }

.md-label {
  position: absolute;
  top: 12px; left: 0;
  color: #888;
  pointer-events: none;
  transition: all 0.2s;
}

.md-input:focus ~ .md-label,
.md-input:not(:placeholder-shown) ~ .md-label {
  top: -2px;
  font-size: 0.65rem;
  color: #6200ee;
}`,
        html: `<div class="md-field">
  <input class="md-input" placeholder=" ">
  <label class="md-label">ユーザー名</label>
</div>`
      }
    },
    {
      title: "マテリアルリスト",
      desc: "アバター、プライマリ/セカンダリテキスト、ディバイダーを持つマテリアルスタイルのリスト。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-list { max-width:300px; margin:6px auto; background:#fff; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06); overflow:hidden; }
          .${p}-item { display:flex; align-items:center; gap:10px; padding:10px 14px; cursor:pointer; transition:background .2s; }
          .${p}-item:hover { background:rgba(98,0,238,.06); }
          .${p}-item + .${p}-item { border-top:1px solid #eee; }
          .${p}-avatar { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:0.8rem; font-weight:700; flex-shrink:0; }
          .${p}-text { flex:1; min-width:0; }
          .${p}-pri { font-size:0.8rem; font-weight:600; color:#222; }
          .${p}-sec { font-size:0.65rem; color:#888; margin-top:1px; }
        `);
        const list = h("div", `${p}-list`);
        const items = [
          { initials: "YT", bg: "#6200ee", name: "山田太郎", sub: "新しいメッセージがあります" },
          { initials: "SH", bg: "#03dac6", name: "鈴木花子", sub: "プロジェクトを更新しました" },
          { initials: "TK", bg: "#ff5722", name: "田中健", sub: "会議の予定を確認してください" }
        ];
        items.forEach(it => {
          const item = h("div", `${p}-item`);
          const av = h("div", `${p}-avatar`);
          av.style.background = it.bg;
          av.textContent = it.initials;
          const text = h("div", `${p}-text`);
          text.append(h("div", `${p}-pri`, it.name));
          text.append(h("div", `${p}-sec`, it.sub));
          item.append(av, text);
          list.append(item);
        });
        c.append(list);
      },
      code: {
        css: `.md-list { background: #fff; border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,.12); }

.md-item {
  display: flex; align-items: center;
  gap: 10px; padding: 10px 14px;
}
.md-item:hover { background: rgba(98,0,238,.06); }
.md-item + .md-item { border-top: 1px solid #eee; }

.md-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  display: flex; align-items: center;
  justify-content: center;
  color: #fff; font-weight: 700;
}`,
        html: `<div class="md-list">
  <div class="md-item">
    <div class="md-avatar" style="background:#6200ee">YT</div>
    <div>
      <div class="primary">山田太郎</div>
      <div class="secondary">新しいメッセージがあります</div>
    </div>
  </div>
</div>`
      }
    }
  );

  /* ==============================
     minimal-design — 追加2つ
     ============================== */
  demos["minimal-design"].push(
    {
      title: "ミニマルブログ",
      desc: "余白をたっぷり取り、細いセリフ書体と控えめなラインだけで構成するミニマルブログレイアウト。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-blog { max-width:300px; margin:6px auto; padding:14px 18px; }
          .${p}-date { font-size:0.6rem; color:#aaa; letter-spacing:1px; text-transform:uppercase; }
          .${p}-title { font-size:1.05rem; font-weight:300; color:#222; margin:6px 0 8px; line-height:1.4; }
          .${p}-sep { border:none; border-top:1px solid #e0e0e0; margin:8px 0; }
          .${p}-body { font-size:0.72rem; color:#666; line-height:1.7; }
          .${p}-more { font-size:0.7rem; color:#222; margin-top:10px; display:inline-block; border-bottom:1px solid #222; }
        `);
        const blog = h("div", `${p}-blog`);
        blog.append(h("div", `${p}-date`, "March 18, 2026"));
        blog.append(h("h3", `${p}-title`, "余白が生み出す静かな美しさ"));
        const sep = document.createElement("hr");
        sep.className = `${p}-sep`;
        blog.append(sep);
        blog.append(h("p", `${p}-body`, "ミニマルデザインでは要素を削ぎ落とし、残されたものだけで語る。余白こそが最大の表現力を持つ。"));
        blog.append(h("a", `${p}-more`, "続きを読む →"));
        c.append(blog);
      },
      code: {
        css: `.blog-post {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-date {
  font-size: 0.6rem;
  color: #aaa;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.blog-title {
  font-weight: 300;
  color: #222;
  line-height: 1.4;
}

.blog-body {
  color: #666;
  line-height: 1.7;
}`,
        html: `<article class="blog-post">
  <span class="blog-date">March 18, 2026</span>
  <h2 class="blog-title">余白が生み出す静かな美しさ</h2>
  <hr>
  <p class="blog-body">ミニマルデザインでは…</p>
  <a class="read-more">続きを読む →</a>
</article>`
      }
    },
    {
      title: "ミニマルプライシング",
      desc: "価格の数字と最低限のテキストだけで構成する、ミニマルなプライシングカード。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { max-width:200px; margin:6px auto; padding:16px 20px; text-align:center; border:1px solid #e0e0e0; border-radius:4px; }
          .${p}-plan { font-size:0.65rem; color:#aaa; letter-spacing:2px; text-transform:uppercase; margin-bottom:6px; }
          .${p}-price { font-size:2rem; font-weight:200; color:#222; }
          .${p}-unit { font-size:0.7rem; color:#aaa; }
          .${p}-sep { border:none; border-top:1px solid #eee; margin:10px 0; }
          .${p}-feat { font-size:0.7rem; color:#666; line-height:2; }
          .${p}-btn { display:block; width:100%; margin-top:10px; padding:7px 0; border:1px solid #222; background:transparent; color:#222;
            font-size:0.7rem; cursor:pointer; transition:all .2s; border-radius:3px; }
          .${p}-btn:hover { background:#222; color:#fff; }
        `);
        const card = h("div", `${p}-card`);
        card.append(h("div", `${p}-plan`, "Basic"));
        const price = h("div", `${p}-price`, "¥980");
        card.append(price);
        card.append(h("div", `${p}-unit`, "/月"));
        const sep = document.createElement("hr");
        sep.className = `${p}-sep`;
        card.append(sep);
        const feat = h("div", `${p}-feat`);
        feat.innerHTML = "5プロジェクト<br>1GBストレージ<br>メールサポート";
        card.append(feat);
        card.append(makeBtn("はじめる", `${p}-btn`));
        c.append(card);
      },
      code: {
        css: `.pricing-card {
  text-align: center;
  border: 1px solid #e0e0e0;
  padding: 1.5rem;
}

.plan-name {
  font-size: 0.65rem;
  color: #aaa;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.price { font-size: 2rem; font-weight: 200; color: #222; }

.pricing-btn {
  border: 1px solid #222;
  background: transparent;
  color: #222;
  padding: 7px 0;
  width: 100%;
}
.pricing-btn:hover { background: #222; color: #fff; }`,
        html: `<div class="pricing-card">
  <div class="plan-name">Basic</div>
  <div class="price">¥980</div>
  <div class="unit">/月</div>
  <hr>
  <div class="features">5プロジェクト / 1GB / メール</div>
  <button class="pricing-btn">はじめる</button>
</div>`
      }
    }
  );

  /* ==============================
     color-unity — 追加2つ
     ============================== */
  demos["color-unity"].push(
    {
      title: "暖色系テーマ",
      desc: "オレンジ・赤・黄色の暖色パレットで統一したカード。色相を揃えることで温かみと統一感を出す。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { max-width:280px; margin:6px auto; background:#fff8f0; border-radius:8px; overflow:hidden; border:1px solid #fde0c2; }
          .${p}-header { background:linear-gradient(135deg,#e63946,#f77f00); padding:10px 14px; }
          .${p}-h { color:#fff; font-size:0.9rem; font-weight:700; }
          .${p}-body { padding:10px 14px; }
          .${p}-text { font-size:0.72rem; color:#7a3e00; line-height:1.5; margin-bottom:8px; }
          .${p}-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:8px; }
          .${p}-tag { font-size:0.6rem; padding:2px 8px; border-radius:10px; color:#fff; }
          .${p}-tag--r { background:#e63946; }
          .${p}-tag--o { background:#f77f00; }
          .${p}-tag--y { background:#fcbf49; color:#7a3e00; }
          .${p}-btn { background:#e63946; color:#fff; border:none; padding:6px 16px; border-radius:4px; font-size:0.72rem; cursor:pointer; }
        `);
        const card = h("div", `${p}-card`);
        const header = h("div", `${p}-header`);
        header.append(h("div", `${p}-h`, "秋のキャンペーン"));
        card.append(header);
        const body = h("div", `${p}-body`);
        body.append(h("p", `${p}-text`, "暖色系で統一することで、温かく親しみやすい印象になります。"));
        const tags = h("div", `${p}-tags`);
        tags.append(h("span", `${p}-tag ${p}-tag--r`, "セール"));
        tags.append(h("span", `${p}-tag ${p}-tag--o`, "期間限定"));
        tags.append(h("span", `${p}-tag ${p}-tag--y`, "おすすめ"));
        body.append(tags);
        body.append(makeBtn("詳しく見る", `${p}-btn`));
        card.append(body);
        c.append(card);
      },
      code: {
        css: `.warm-card {
  background: #fff8f0;
  border: 1px solid #fde0c2;
}

.warm-header {
  background: linear-gradient(135deg, #e63946, #f77f00);
  color: #fff;
}

.tag-red    { background: #e63946; color: #fff; }
.tag-orange { background: #f77f00; color: #fff; }
.tag-yellow { background: #fcbf49; color: #7a3e00; }

.warm-btn {
  background: #e63946;
  color: #fff;
}`,
        html: `<div class="warm-card">
  <div class="warm-header">秋のキャンペーン</div>
  <div class="body">
    <span class="tag-red">セール</span>
    <span class="tag-orange">期間限定</span>
    <button class="warm-btn">詳しく見る</button>
  </div>
</div>`
      }
    },
    {
      title: "モノクロマティック",
      desc: "紫の単一色相を明度・彩度だけ変えて使ったUI。1つの色相だけで統一感と深みのあるデザインに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-ui { max-width:300px; margin:6px auto; display:grid; grid-template-columns:70px 1fr; border-radius:8px; overflow:hidden; min-height:120px; }
          .${p}-side { background:#4a148c; padding:10px 8px; }
          .${p}-nav-item { font-size:0.6rem; color:rgba(255,255,255,.7); padding:5px 4px; border-radius:3px; cursor:pointer; margin-bottom:3px; }
          .${p}-nav-item--active { background:rgba(255,255,255,.15); color:#fff; }
          .${p}-main { background:#f3e5f5; padding:10px 12px; }
          .${p}-mh { font-size:0.8rem; font-weight:700; color:#4a148c; margin-bottom:6px; }
          .${p}-mt { font-size:0.68rem; color:#6a1b9a; line-height:1.5; margin-bottom:8px; }
          .${p}-btns { display:flex; gap:6px; }
          .${p}-bpri { background:#7b1fa2; color:#fff; border:none; padding:5px 12px; border-radius:4px; font-size:0.65rem; cursor:pointer; }
          .${p}-bsec { background:transparent; color:#7b1fa2; border:1px solid #7b1fa2; padding:5px 12px; border-radius:4px; font-size:0.65rem; cursor:pointer; }
        `);
        const ui = h("div", `${p}-ui`);
        const side = h("div", `${p}-side`);
        ["ダッシュボード", "プロジェクト", "設定"].forEach((label, i) => {
          side.append(h("div", `${p}-nav-item${i === 0 ? ` ${p}-nav-item--active` : ""}`, label));
        });
        ui.append(side);
        const main = h("div", `${p}-main`);
        main.append(h("div", `${p}-mh`, "ダッシュボード"));
        main.append(h("p", `${p}-mt`, "紫の明度・彩度だけで構成したモノクロマティック配色です。"));
        const btns = h("div", `${p}-btns`);
        btns.append(makeBtn("作成", `${p}-bpri`));
        btns.append(makeBtn("キャンセル", `${p}-bsec`));
        main.append(btns);
        ui.append(main);
        c.append(ui);
      },
      code: {
        css: `/* 紫のモノクロマティック */
.sidebar { background: #4a148c; }
.nav-item { color: rgba(255,255,255,.7); }
.nav-item--active { background: rgba(255,255,255,.15); }

.main-area { background: #f3e5f5; }
.heading   { color: #4a148c; }
.body-text { color: #6a1b9a; }

.btn-primary   { background: #7b1fa2; color: #fff; }
.btn-secondary { border: 1px solid #7b1fa2; color: #7b1fa2; }`,
        html: `<div class="mono-ui">
  <aside class="sidebar">
    <div class="nav-item nav-item--active">ダッシュボード</div>
    <div class="nav-item">プロジェクト</div>
  </aside>
  <main class="main-area">
    <h3 class="heading">ダッシュボード</h3>
    <button class="btn-primary">作成</button>
  </main>
</div>`
      }
    }
  );

  /* ==============================
     contrast — 追加2つ
     ============================== */
  demos["contrast"].push(
    {
      title: "アクセシビリティ対比",
      desc: "WCAG基準を満たさない低コントラストと、AA/AAAを満たす高コントラストを並べて比較。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex; gap:12px; justify-content:center; padding:8px 0; }
          .${p}-box { flex:1; max-width:140px; padding:10px; border-radius:6px; text-align:center; }
          .${p}-fail { background:#fff; }
          .${p}-pass { background:#fff; }
          .${p}-fail-text { color:#ccc; font-size:0.85rem; font-weight:700; }
          .${p}-pass-text { color:#1a1a1a; font-size:0.85rem; font-weight:700; }
          .${p}-label { font-size:0.6rem; margin-top:6px; padding:2px 6px; border-radius:3px; display:inline-block; }
          .${p}-label--fail { background:#e63946; color:#fff; }
          .${p}-label--pass { background:#2a9d8f; color:#fff; }
          .${p}-ratio { font-size:0.55rem; color:#888; margin-top:3px; }
          .${p}-sample { font-size:0.7rem; margin-top:4px; }
        `);
        const wrap = h("div", `${p}-wrap`);

        const fail = h("div", `${p}-box ${p}-fail`);
        fail.style.border = "1px solid #eee";
        fail.append(h("div", `${p}-fail-text`, "読みにくい"));
        const failSample = h("div", `${p}-sample`);
        failSample.style.color = "#ccc";
        failSample.textContent = "テキスト例";
        fail.append(failSample);
        fail.append(h("div", `${p}-ratio`, "コントラスト比 1.6:1"));
        const fl = h("span", `${p}-label ${p}-label--fail`, "FAIL");
        const flWrap = h("div", "");
        flWrap.append(fl);
        fail.append(flWrap);
        wrap.append(fail);

        const pass = h("div", `${p}-box ${p}-pass`);
        pass.style.border = "1px solid #eee";
        pass.append(h("div", `${p}-pass-text`, "読みやすい"));
        const passSample = h("div", `${p}-sample`);
        passSample.style.color = "#1a1a1a";
        passSample.textContent = "テキスト例";
        pass.append(passSample);
        pass.append(h("div", `${p}-ratio`, "コントラスト比 17.4:1"));
        const pl = h("span", `${p}-label ${p}-label--pass`, "AAA ✓");
        const plWrap = h("div", "");
        plWrap.append(pl);
        pass.append(plWrap);
        wrap.append(pass);

        c.append(wrap);
      },
      code: {
        css: `/* WCAG失敗例: コントラスト比 1.6:1 */
.fail-text {
  color: #ccc;        /* 薄いグレー */
  background: #fff;   /* 白背景 */
}

/* WCAG AAA合格: コントラスト比 17.4:1 */
.pass-text {
  color: #1a1a1a;     /* ほぼ黒 */
  background: #fff;   /* 白背景 */
}`,
        html: `<div class="comparison">
  <div class="fail-text">読みにくい</div>
  <div class="pass-text">読みやすい</div>
</div>`
      }
    },
    {
      title: "コントラストで視線誘導",
      desc: "重要なCTAボタンを高コントラスト、補助要素を低コントラストにして視線を誘導するテクニック。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { max-width:280px; margin:6px auto; background:#fff; border-radius:8px; padding:14px 16px; box-shadow:0 1px 4px rgba(0,0,0,.1); }
          .${p}-h { font-size:0.85rem; font-weight:700; color:#111; margin-bottom:4px; }
          .${p}-sub { font-size:0.7rem; color:#aaa; margin-bottom:10px; }
          .${p}-body { font-size:0.72rem; color:#666; line-height:1.5; margin-bottom:12px; }
          .${p}-actions { display:flex; gap:8px; align-items:center; }
          .${p}-cta { background:#111; color:#fff; border:none; padding:8px 20px; border-radius:4px; font-size:0.75rem; font-weight:700; cursor:pointer; }
          .${p}-sec { background:transparent; color:#aaa; border:1px solid #ddd; padding:8px 14px; border-radius:4px; font-size:0.72rem; cursor:pointer; }
          .${p}-link { font-size:0.65rem; color:#ccc; margin-left:auto; }
          .${p}-note { font-size:0.6rem; color:#bbb; text-align:center; margin-top:8px; }
        `);
        const card = h("div", `${p}-card`);
        card.append(h("div", `${p}-h`, "プレミアムプラン"));
        card.append(h("div", `${p}-sub`, "もっと便利に使おう"));
        card.append(h("p", `${p}-body`, "高コントラストなボタンに視線が集まり、最も重要なアクションへ誘導します。"));
        const actions = h("div", `${p}-actions`);
        actions.append(makeBtn("今すぐ始める", `${p}-cta`));
        actions.append(makeBtn("比較する", `${p}-sec`));
        actions.append(h("span", `${p}-link`, "詳細"));
        card.append(actions);
        card.append(h("div", `${p}-note`, "↑ 高コントラスト → 中 → 低 の順に視線が流れる"));
        c.append(card);
      },
      code: {
        css: `/* 高コントラスト = 最も目立つ */
.cta-primary {
  background: #111;
  color: #fff;
  font-weight: 700;
}

/* 中コントラスト = 補助的 */
.cta-secondary {
  border: 1px solid #ddd;
  color: #aaa;
}

/* 低コントラスト = 最も控えめ */
.text-link {
  color: #ccc;
}`,
        html: `<div class="actions">
  <button class="cta-primary">今すぐ始める</button>
  <button class="cta-secondary">比較する</button>
  <span class="text-link">詳細</span>
</div>`
      }
    }
  );

  /* ==============================
     dark-mode — 追加2つ
     ============================== */
  demos["dark-mode"].push(
    {
      title: "ダークモード配色ルール",
      desc: "ダークモードの重要ルール：純黒→ダークグレー、白の透明度調整、アクセントカラーの彩度を落とす。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex; gap:8px; justify-content:center; padding:6px 0; flex-wrap:wrap; }
          .${p}-rule { width:135px; border-radius:6px; overflow:hidden; }
          .${p}-bad { background:#000; padding:8px; text-align:center; }
          .${p}-bad-label { font-size:0.55rem; color:#e63946; margin-bottom:3px; }
          .${p}-bad-text { font-size:0.75rem; color:#fff; font-weight:700; }
          .${p}-good { background:#1e1e2e; padding:8px; text-align:center; }
          .${p}-good-label { font-size:0.55rem; color:#2a9d8f; margin-bottom:3px; }
          .${p}-good-text { font-size:0.75rem; color:rgba(255,255,255,.87); font-weight:700; }
          .${p}-arrow { text-align:center; font-size:0.7rem; color:#888; padding:2px 0; background:#111; }
          .${p}-desc { font-size:0.55rem; color:#888; text-align:center; padding:3px 4px; background:#1e1e2e; border-bottom-left-radius:6px; border-bottom-right-radius:6px; }
          .${p}-accent-bad { color:#4361ee; }
          .${p}-accent-good { color:#7b9ef7; }
        `);
        const wrap = h("div", `${p}-wrap`);

        // Rule 1: pure black → dark gray
        const r1 = h("div", `${p}-rule`);
        const r1bad = h("div", `${p}-bad`);
        r1bad.append(h("div", `${p}-bad-label`, "✕ 避ける"));
        r1bad.append(h("div", `${p}-bad-text`, "#000000"));
        r1.append(r1bad);
        r1.append(h("div", `${p}-arrow`, "↓"));
        const r1good = h("div", `${p}-good`);
        r1good.append(h("div", `${p}-good-label`, "○ 推奨"));
        r1good.append(h("div", `${p}-good-text`, "#1e1e2e"));
        r1.append(r1good);
        r1.append(h("div", `${p}-desc`, "純黒→ダークグレー"));
        wrap.append(r1);

        // Rule 2: white → reduced opacity
        const r2 = h("div", `${p}-rule`);
        const r2bad = h("div", `${p}-bad`);
        r2bad.append(h("div", `${p}-bad-label`, "✕ 避ける"));
        const r2bt = h("div", `${p}-bad-text`, "#FFFFFF");
        r2bad.append(r2bt);
        r2.append(r2bad);
        r2.append(h("div", `${p}-arrow`, "↓"));
        const r2good = h("div", `${p}-good`);
        r2good.append(h("div", `${p}-good-label`, "○ 推奨"));
        const r2gt = h("div", `${p}-good-text`, "rgba(255,.87)");
        r2good.append(r2gt);
        r2.append(r2good);
        r2.append(h("div", `${p}-desc`, "白の透明度を下げる"));
        wrap.append(r2);

        c.append(wrap);
      },
      code: {
        css: `/* ダークモード配色ルール */

/* 1. 純黒を避ける */
.dark-bg {
  background: #1e1e2e;  /* #000 ではなく */
}

/* 2. テキストは不透明度で調整 */
.dark-text-primary {
  color: rgba(255,255,255, 0.87);
}
.dark-text-secondary {
  color: rgba(255,255,255, 0.60);
}

/* 3. アクセントカラーは彩度を下げる */
.accent-light { color: #4361ee; }
.accent-dark  { color: #7b9ef7; }`,
        html: `<div class="dark-bg">
  <p class="dark-text-primary">主要テキスト</p>
  <p class="dark-text-secondary">補助テキスト</p>
</div>`
      }
    },
    {
      title: "自動ダークモード",
      desc: "CSS変数でテーマを切り替え、prefers-color-schemeの概念をトグルボタンで体験できるデモ。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { max-width:280px; margin:6px auto; }
          .${p}-toggle { display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:8px; }
          .${p}-tgl-label { font-size:0.7rem; color:#888; }
          .${p}-tgl-btn { width:44px; height:22px; border-radius:11px; border:none; cursor:pointer; position:relative; transition:background .3s; background:#ddd; }
          .${p}-tgl-btn::after { content:""; position:absolute; top:2px; left:2px; width:18px; height:18px; border-radius:50%; background:#fff; transition:transform .3s; box-shadow:0 1px 2px rgba(0,0,0,.2); }
          .${p}-tgl-btn.${p}-on { background:#6200ee; }
          .${p}-tgl-btn.${p}-on::after { transform:translateX(22px); }
          .${p}-preview { padding:12px 14px; border-radius:8px; transition:all .3s; background:#fff; border:1px solid #e0e0e0; }
          .${p}-preview.${p}-dark { background:#1e1e2e; border-color:#333; }
          .${p}-ph { font-size:0.8rem; font-weight:700; transition:color .3s; color:#222; }
          .${p}-preview.${p}-dark .${p}-ph { color:rgba(255,255,255,.87); }
          .${p}-pt { font-size:0.7rem; transition:color .3s; color:#666; margin-top:4px; }
          .${p}-preview.${p}-dark .${p}-pt { color:rgba(255,255,255,.6); }
          .${p}-pbtn { margin-top:8px; padding:5px 14px; border-radius:4px; font-size:0.68rem; cursor:pointer; transition:all .3s; background:#6200ee; color:#fff; border:none; }
          .${p}-preview.${p}-dark .${p}-pbtn { background:#bb86fc; color:#1e1e2e; }
          .${p}-indicator { font-size:0.6rem; color:#aaa; text-align:center; margin-top:6px; }
        `);
        const wrap = h("div", `${p}-wrap`);

        const toggle = h("div", `${p}-toggle`);
        toggle.append(h("span", `${p}-tgl-label`, "☀️ ライト"));
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `${p}-tgl-btn`;
        toggle.append(btn);
        toggle.append(h("span", `${p}-tgl-label`, "ダーク 🌙"));
        wrap.append(toggle);

        const preview = h("div", `${p}-preview`);
        preview.append(h("div", `${p}-ph`, "テーマプレビュー"));
        preview.append(h("p", `${p}-pt`, "トグルで切り替えてみてください"));
        preview.append(makeBtn("アクション", `${p}-pbtn`));
        wrap.append(preview);

        const indicator = h("div", `${p}-indicator`, "現在: ライトモード");
        wrap.append(indicator);

        btn.addEventListener("click", () => {
          btn.classList.toggle(`${p}-on`);
          preview.classList.toggle(`${p}-dark`);
          indicator.textContent = btn.classList.contains(`${p}-on`) ? "現在: ダークモード" : "現在: ライトモード";
        });

        c.append(wrap);
      },
      code: {
        css: `:root {
  --bg: #fff;
  --text: #222;
  --accent: #6200ee;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1e1e2e;
    --text: rgba(255,255,255,.87);
    --accent: #bb86fc;
  }
}

.card {
  background: var(--bg);
  color: var(--text);
}

.btn { background: var(--accent); }`,
        html: `<div class="card">
  <h3>テーマプレビュー</h3>
  <p>OSの設定に応じて自動切り替え</p>
  <button class="btn">アクション</button>
</div>`,
        js: `// JSでの手動切り替え
document.documentElement.setAttribute(
  'data-theme',
  isDark ? 'dark' : 'light'
);`
      }
    }
  );

  /* ==============================
     monotone — 追加2つ
     ============================== */
  demos["monotone"].push(
    {
      title: "モノトーンカード",
      desc: "黒・白・グレーだけで構成されたクリーンなカード。写真もグレースケールにして統一感を保つ。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { max-width:240px; margin:6px auto; background:#fff; border-radius:8px; overflow:hidden; border:1px solid #e0e0e0; }
          .${p}-img { height:60px; background:linear-gradient(135deg,#bbb,#888,#aaa,#999); filter:grayscale(100%); display:flex; align-items:center; justify-content:center; }
          .${p}-img-label { font-size:1.2rem; color:rgba(255,255,255,.5); }
          .${p}-body { padding:10px 14px; }
          .${p}-h { font-size:0.8rem; font-weight:700; color:#111; margin-bottom:4px; }
          .${p}-text { font-size:0.68rem; color:#888; line-height:1.5; margin-bottom:8px; }
          .${p}-meta { display:flex; justify-content:space-between; align-items:center; }
          .${p}-date { font-size:0.6rem; color:#bbb; }
          .${p}-btn { background:#333; color:#fff; border:none; padding:5px 12px; border-radius:3px; font-size:0.65rem; cursor:pointer; }
        `);
        const card = h("div", `${p}-card`);
        const img = h("div", `${p}-img`);
        img.append(h("span", `${p}-img-label`, "🏔️"));
        card.append(img);
        const body = h("div", `${p}-body`);
        body.append(h("div", `${p}-h`, "モノトーンの世界"));
        body.append(h("p", `${p}-text`, "色彩を排除し、明暗のトーンだけで表現することで洗練された印象に。"));
        const meta = h("div", `${p}-meta`);
        meta.append(h("span", `${p}-date`, "2026.03.18"));
        meta.append(makeBtn("READ", `${p}-btn`));
        body.append(meta);
        card.append(body);
        c.append(card);
      },
      code: {
        css: `.mono-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.mono-image {
  filter: grayscale(100%);
}

.mono-title   { color: #111; }
.mono-text    { color: #888; }
.mono-date    { color: #bbb; }
.mono-btn     { background: #333; color: #fff; }`,
        html: `<div class="mono-card">
  <div class="mono-image">🏔️</div>
  <div class="body">
    <h3 class="mono-title">モノトーンの世界</h3>
    <p class="mono-text">明暗のトーンだけで表現…</p>
    <button class="mono-btn">READ</button>
  </div>
</div>`
      }
    },
    {
      title: "モノトーン+アクセントカラー",
      desc: "モノトーンをベースに、アクセントとして赤を1箇所だけ使用。差し色が強い視覚的フォーカスを生む。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { max-width:260px; margin:6px auto; background:#fafafa; border-radius:8px; padding:14px 16px; border:1px solid #e0e0e0; }
          .${p}-h { font-size:0.85rem; font-weight:700; color:#111; margin-bottom:3px; }
          .${p}-sub { font-size:0.65rem; color:#aaa; margin-bottom:8px; }
          .${p}-text { font-size:0.7rem; color:#666; line-height:1.5; margin-bottom:10px; }
          .${p}-tags { display:flex; gap:6px; margin-bottom:10px; }
          .${p}-tag { font-size:0.6rem; padding:2px 8px; border-radius:10px; background:#eee; color:#888; }
          .${p}-tag--accent { background:#e63946; color:#fff; }
          .${p}-actions { display:flex; gap:8px; }
          .${p}-cta { background:#e63946; color:#fff; border:none; padding:6px 16px; border-radius:4px; font-size:0.7rem; font-weight:700; cursor:pointer; }
          .${p}-sec { background:transparent; color:#888; border:1px solid #ddd; padding:6px 14px; border-radius:4px; font-size:0.7rem; cursor:pointer; }
        `);
        const card = h("div", `${p}-card`);
        card.append(h("div", `${p}-h`, "デザインシステム"));
        card.append(h("div", `${p}-sub`, "モノトーン + 赤のアクセント"));
        card.append(h("p", `${p}-text`, "ベースをモノトーンにし、注目させたい要素にだけアクセントカラーを使う手法。"));
        const tags = h("div", `${p}-tags`);
        tags.append(h("span", `${p}-tag`, "デザイン"));
        tags.append(h("span", `${p}-tag`, "UI"));
        tags.append(h("span", `${p}-tag ${p}-tag--accent`, "NEW"));
        card.append(tags);
        const actions = h("div", `${p}-actions`);
        actions.append(makeBtn("はじめる", `${p}-cta`));
        actions.append(makeBtn("詳細を見る", `${p}-sec`));
        card.append(actions);
        c.append(card);
      },
      code: {
        css: `/* ベースはモノトーン */
.card { background: #fafafa; border: 1px solid #e0e0e0; }
.title { color: #111; }
.text  { color: #666; }
.tag   { background: #eee; color: #888; }

/* アクセントカラーは1色だけ */
.tag--accent { background: #e63946; color: #fff; }
.cta-btn     { background: #e63946; color: #fff; }

/* 控えめなセカンダリ */
.sec-btn { border: 1px solid #ddd; color: #888; }`,
        html: `<div class="card">
  <h3 class="title">デザインシステム</h3>
  <div class="tags">
    <span class="tag">デザイン</span>
    <span class="tag tag--accent">NEW</span>
  </div>
  <button class="cta-btn">はじめる</button>
  <button class="sec-btn">詳細を見る</button>
</div>`
      }
    }
  );

  /* ==============================
     typography — 追加2つ
     ============================== */
  demos["typography"].push(
    {
      title: "見出しスタイル",
      desc: "下線、左ボーダー、背景ハイライト、グラデーションテキストなど、多彩な見出しの装飾パターン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { padding:6px 14px; display:flex; flex-direction:column; gap:10px; }
          .${p}-h1 { font-size:0.85rem; font-weight:700; color:#222; padding-bottom:4px; border-bottom:3px solid #4361ee; display:inline-block; }
          .${p}-h2 { font-size:0.85rem; font-weight:700; color:#222; padding-left:10px; border-left:4px solid #e63946; }
          .${p}-h3 { font-size:0.85rem; font-weight:700; color:#222; background:linear-gradient(transparent 60%,#fde68a 60%); display:inline; }
          .${p}-h4 { font-size:0.85rem; font-weight:700; background:linear-gradient(135deg,#4361ee,#e63946); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
          .${p}-label { font-size:0.55rem; color:#aaa; margin-bottom:1px; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const pairs = [
          ["下線スタイル", `${p}-h1`],
          ["左ボーダースタイル", `${p}-h2`],
          ["マーカー風ハイライト", `${p}-h3`],
          ["グラデーションテキスト", `${p}-h4`]
        ];
        pairs.forEach(([text, cls]) => {
          const group = h("div", "");
          group.append(h("div", `${p}-label`, cls.replace(p + "-", "")));
          group.append(h("div", cls, text));
          wrap.append(group);
        });
        c.append(wrap);
      },
      code: {
        css: `/* 下線 */
.heading-underline {
  border-bottom: 3px solid #4361ee;
  display: inline-block;
}

/* 左ボーダー */
.heading-border {
  padding-left: 10px;
  border-left: 4px solid #e63946;
}

/* マーカー風 */
.heading-marker {
  background: linear-gradient(
    transparent 60%, #fde68a 60%);
  display: inline;
}

/* グラデーション */
.heading-gradient {
  background: linear-gradient(135deg, #4361ee, #e63946);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`,
        html: `<h2 class="heading-underline">下線スタイル</h2>
<h2 class="heading-border">左ボーダースタイル</h2>
<h2 class="heading-marker">マーカー風ハイライト</h2>
<h2 class="heading-gradient">グラデーションテキスト</h2>`
      }
    },
    {
      title: "テキスト装飾",
      desc: "text-decoration、text-transform、ドロップキャップ、text-shadowなどテキスト装飾のショーケース。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { padding:6px 14px; display:flex; flex-direction:column; gap:8px; }
          .${p}-row { display:flex; align-items:baseline; gap:8px; }
          .${p}-label { font-size:0.55rem; color:#aaa; width:90px; flex-shrink:0; text-align:right; }
          .${p}-underline { font-size:0.8rem; text-decoration:underline; text-decoration-color:#e63946; text-underline-offset:3px; text-decoration-thickness:2px; }
          .${p}-line-through { font-size:0.8rem; text-decoration:line-through; text-decoration-color:#aaa; color:#aaa; }
          .${p}-upper { font-size:0.8rem; text-transform:uppercase; letter-spacing:2px; font-weight:700; }
          .${p}-dropcap { font-size:0.72rem; color:#555; line-height:1.5; }
          .${p}-dropcap::first-letter { font-size:1.8rem; font-weight:700; color:#4361ee; float:left; line-height:1; margin-right:4px; margin-top:2px; }
          .${p}-shadow { font-size:0.85rem; font-weight:700; color:#333; text-shadow:2px 2px 0 #ddd; }
        `);
        const wrap = h("div", `${p}-wrap`);

        const r1 = h("div", `${p}-row`);
        r1.append(h("span", `${p}-label`, "underline"));
        r1.append(h("span", `${p}-underline`, "テキスト装飾"));
        wrap.append(r1);

        const r2 = h("div", `${p}-row`);
        r2.append(h("span", `${p}-label`, "line-through"));
        r2.append(h("span", `${p}-line-through`, "¥5,000 → ¥3,800"));
        wrap.append(r2);

        const r3 = h("div", `${p}-row`);
        r3.append(h("span", `${p}-label`, "text-transform"));
        r3.append(h("span", `${p}-upper`, "hello world"));
        wrap.append(r3);

        const r4 = h("div", `${p}-row`);
        r4.append(h("span", `${p}-label`, "drop cap"));
        r4.append(h("p", `${p}-dropcap`, "デザインの世界では、最初の一文字を大きく表示するドロップキャップが伝統的に使われてきた。"));
        wrap.append(r4);

        const r5 = h("div", `${p}-row`);
        r5.append(h("span", `${p}-label`, "text-shadow"));
        r5.append(h("span", `${p}-shadow`, "シャドウ効果"));
        wrap.append(r5);

        c.append(wrap);
      },
      code: {
        css: `/* 装飾付き下線 */
.deco-underline {
  text-decoration: underline;
  text-decoration-color: #e63946;
  text-underline-offset: 3px;
  text-decoration-thickness: 2px;
}

/* 取り消し線 */
.deco-strike {
  text-decoration: line-through;
  color: #aaa;
}

/* 大文字変換 */
.deco-upper {
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* ドロップキャップ */
.drop-cap::first-letter {
  font-size: 2.5rem;
  font-weight: 700;
  color: #4361ee;
  float: left;
  line-height: 1;
  margin-right: 6px;
}

/* テキストシャドウ */
.text-shadow {
  text-shadow: 2px 2px 0 #ddd;
}`,
        html: `<p class="deco-underline">テキスト装飾</p>
<p class="deco-strike">¥5,000 → ¥3,800</p>
<p class="deco-upper">hello world</p>
<p class="drop-cap">デザインの世界では…</p>
<p class="text-shadow">シャドウ効果</p>`
      }
    }
  );

})();
