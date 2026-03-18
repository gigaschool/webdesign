/* ==========================================================================
   Multi-Demo Extra — 画面の基本の追加見本 (各用語に+2で計5個に)
   ========================================================================== */
(function () {
  let uid = 1000;
  function id() { return "be" + (++uid); }

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
    b.className = cls || "be-btn";
    b.textContent = text;
    return b;
  }

  const demos = window.multiDemos;
  if (!demos) return;

  /* ==============================
     ui — 追加2つ
     ============================== */
  demos["ui"].push(
    {
      title: "設定画面UI",
      desc: "トグルやスライダーを配置した設定画面。音量・通知・言語などセクション分けされたUI。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-settings { background:#f8fafc;border-radius:8px;padding:10px 14px;font-size:.7rem;max-height:150px;overflow:auto; }
          .${p}-section { margin-bottom:8px; }
          .${p}-section-title { font-weight:700;font-size:.65rem;color:#64748b;text-transform:uppercase;margin-bottom:4px;letter-spacing:.5px; }
          .${p}-row { display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid #e2e8f0; }
          .${p}-row:last-child { border-bottom:none; }
          .${p}-label { color:#334155; }
          .${p}-toggle { width:32px;height:18px;background:#cbd5e1;border-radius:9px;position:relative;cursor:pointer;border:none;padding:0; }
          .${p}-toggle.on { background:#3b82f6; }
          .${p}-toggle::after { content:"";position:absolute;width:14px;height:14px;background:#fff;border-radius:50%;top:2px;left:2px;transition:left .2s; }
          .${p}-toggle.on::after { left:16px; }
          .${p}-slider { width:60px;height:4px;-webkit-appearance:none;appearance:none;background:#cbd5e1;border-radius:2px;outline:none; }
          .${p}-slider::-webkit-slider-thumb { -webkit-appearance:none;width:12px;height:12px;background:#3b82f6;border-radius:50%;cursor:pointer; }
          .${p}-select { font-size:.65rem;padding:2px 4px;border:1px solid #cbd5e1;border-radius:4px;background:#fff; }
        `);
        const wrap = h("div", `${p}-settings`);

        // Sound section
        const s1 = h("div", `${p}-section`);
        s1.append(h("div", `${p}-section-title`, "🔊 サウンド"));
        const r1 = h("div", `${p}-row`);
        r1.append(h("span", `${p}-label`, "BGM音量"));
        const sl1 = document.createElement("input");
        sl1.type = "range"; sl1.className = `${p}-slider`; sl1.value = "70";
        r1.append(sl1);
        s1.append(r1);
        const r2 = h("div", `${p}-row`);
        r2.append(h("span", `${p}-label`, "効果音"));
        const t1 = document.createElement("button");
        t1.type = "button"; t1.className = `${p}-toggle on`;
        t1.addEventListener("click", () => t1.classList.toggle("on"));
        r2.append(t1);
        s1.append(r2);

        // Notification section
        const s2 = h("div", `${p}-section`);
        s2.append(h("div", `${p}-section-title`, "🔔 通知"));
        const r3 = h("div", `${p}-row`);
        r3.append(h("span", `${p}-label`, "プッシュ通知"));
        const t2 = document.createElement("button");
        t2.type = "button"; t2.className = `${p}-toggle on`;
        t2.addEventListener("click", () => t2.classList.toggle("on"));
        r3.append(t2);
        s2.append(r3);

        // Language section
        const s3 = h("div", `${p}-section`);
        s3.append(h("div", `${p}-section-title`, "🌐 言語"));
        const r4 = h("div", `${p}-row`);
        r4.append(h("span", `${p}-label`, "表示言語"));
        const sel = document.createElement("select");
        sel.className = `${p}-select`;
        ["日本語", "English", "中文"].forEach(lang => {
          const opt = document.createElement("option");
          opt.textContent = lang;
          sel.append(opt);
        });
        r4.append(sel);
        s3.append(r4);

        wrap.append(s1, s2, s3);
        c.append(wrap);
      },
      code: {
        css: `.settings { padding: 10px 14px; font-size: .7rem; }
.section-title {
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid #e2e8f0;
}
.toggle {
  width: 32px; height: 18px;
  background: #cbd5e1;
  border-radius: 9px;
  position: relative;
}
.toggle.on { background: #3b82f6; }`,
        html: `<div class="settings">
  <div class="section-title">🔊 サウンド</div>
  <div class="row">
    <span>BGM音量</span>
    <input type="range" class="slider">
  </div>
  <div class="row">
    <span>効果音</span>
    <button class="toggle on"></button>
  </div>
</div>`
      }
    },
    {
      title: "ミュージックプレイヤーUI",
      desc: "アルバムアート・再生ボタン・プログレスバーを配置した音楽プレイヤーUI。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-player { background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:10px;padding:12px;color:#fff;text-align:center;max-width:220px;margin:0 auto; }
          .${p}-art { width:80px;height:80px;background:linear-gradient(135deg,#7c3aed,#a78bfa);border-radius:8px;margin:0 auto 8px;display:flex;align-items:center;justify-content:center;font-size:2rem; }
          .${p}-title { font-size:.75rem;font-weight:700; }
          .${p}-artist { font-size:.6rem;color:#a5b4fc;margin-bottom:6px; }
          .${p}-progress { width:100%;height:4px;background:#4338ca;border-radius:2px;margin-bottom:8px;overflow:hidden; }
          .${p}-fill { width:35%;height:100%;background:#818cf8;border-radius:2px; }
          .${p}-controls { display:flex;justify-content:center;align-items:center;gap:16px;font-size:1.1rem; }
          .${p}-btn { background:none;border:none;color:#fff;cursor:pointer;font-size:inherit;padding:0; }
          .${p}-play { width:36px;height:36px;background:#6366f1;border-radius:50%;border:none;color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center; }
          .${p}-time { display:flex;justify-content:space-between;font-size:.55rem;color:#a5b4fc;margin-bottom:2px; }
        `);
        const player = h("div", `${p}-player`);
        const art = h("div", `${p}-art`, "🎵");
        const title = h("div", `${p}-title`, "夜のドライブ");
        const artist = h("div", `${p}-artist`, "Artist Name");
        const timeRow = h("div", `${p}-time`);
        timeRow.append(h("span", null, "1:23"), h("span", null, "3:45"));
        const prog = h("div", `${p}-progress`);
        prog.append(h("div", `${p}-fill`));
        const ctrl = h("div", `${p}-controls`);
        const btnPrev = h("button", `${p}-btn`, "⏮");
        const btnPlay = h("button", `${p}-play`, "▶");
        const btnNext = h("button", `${p}-btn`, "⏭");
        btnPlay.addEventListener("click", () => {
          btnPlay.textContent = btnPlay.textContent === "▶" ? "⏸" : "▶";
        });
        ctrl.append(btnPrev, btnPlay, btnNext);
        player.append(art, title, artist, timeRow, prog, ctrl);
        c.append(player);
      },
      code: {
        css: `.player {
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  border-radius: 10px;
  padding: 12px;
  color: #fff;
  text-align: center;
}
.album-art {
  width: 80px; height: 80px;
  background: linear-gradient(135deg, #7c3aed, #a78bfa);
  border-radius: 8px;
  margin: 0 auto 8px;
}
.progress {
  height: 4px;
  background: #4338ca;
  border-radius: 2px;
}
.controls {
  display: flex;
  justify-content: center;
  gap: 16px;
}`,
        html: `<div class="player">
  <div class="album-art">🎵</div>
  <div class="title">夜のドライブ</div>
  <div class="artist">Artist Name</div>
  <div class="progress"><div class="fill"></div></div>
  <div class="controls">
    <button>⏮</button>
    <button class="play-btn">▶</button>
    <button>⏭</button>
  </div>
</div>`
      }
    }
  );

  /* ==============================
     ux — 追加2つ
     ============================== */
  demos["ux"].push(
    {
      title: "ローディングスケルトン",
      desc: "コンテンツ読み込み中のスケルトン表示。シマー効果で読み込み中を伝え、ボタンで実データに切替。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { padding:8px; }
          .${p}-card { display:flex;gap:10px;padding:10px;background:#fff;border-radius:8px;border:1px solid #e2e8f0; }
          .${p}-skeleton { background:#e2e8f0;border-radius:4px;position:relative;overflow:hidden; }
          .${p}-skeleton::after { content:"";position:absolute;top:0;left:0;width:100%;height:100%;
            background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);
            animation:${p}-shimmer 1.5s infinite; }
          @keyframes ${p}-shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          .${p}-avatar { width:40px;height:40px;border-radius:50%;flex-shrink:0; }
          .${p}-lines { flex:1;display:flex;flex-direction:column;gap:6px; }
          .${p}-line { height:10px;border-radius:3px; }
          .${p}-line-short { width:60%; }
          .${p}-line-long { width:90%; }
          .${p}-line-med { width:40%; }
          .${p}-loaded .${p}-skeleton { background:none; }
          .${p}-loaded .${p}-skeleton::after { display:none; }
          .${p}-loaded .${p}-avatar { background:#6366f1;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.8rem; }
          .${p}-loaded .${p}-line { background:none!important;height:auto; }
          .${p}-loaded .${p}-line-short { font-weight:700;font-size:.75rem;color:#1e293b; }
          .${p}-loaded .${p}-line-long { font-size:.65rem;color:#64748b; }
          .${p}-loaded .${p}-line-med { font-size:.6rem;color:#94a3b8; }
          .${p}-toggle-btn { margin-top:8px;font-size:.65rem;padding:4px 10px;background:#6366f1;color:#fff;border:none;border-radius:4px;cursor:pointer; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const card = h("div", `${p}-card`);
        const avatar = h("div", `${p}-avatar ${p}-skeleton`);
        const lines = h("div", `${p}-lines`);
        const l1 = h("div", `${p}-line ${p}-line-short ${p}-skeleton`);
        const l2 = h("div", `${p}-line ${p}-line-long ${p}-skeleton`);
        const l3 = h("div", `${p}-line ${p}-line-med ${p}-skeleton`);
        lines.append(l1, l2, l3);
        card.append(avatar, lines);
        const btn = makeBtn("読み込み完了", `${p}-toggle-btn`);
        let loaded = false;
        btn.addEventListener("click", () => {
          loaded = !loaded;
          if (loaded) {
            card.classList.add(`${p}-loaded`);
            avatar.textContent = "🧑";
            l1.textContent = "田中太郎";
            l2.textContent = "今日の進捗を報告します。";
            l3.textContent = "2分前";
            btn.textContent = "スケルトンに戻す";
          } else {
            card.classList.remove(`${p}-loaded`);
            avatar.textContent = "";
            l1.textContent = "";
            l2.textContent = "";
            l3.textContent = "";
            btn.textContent = "読み込み完了";
          }
        });
        wrap.append(card, btn);
        c.append(wrap);
      },
      code: {
        css: `.skeleton {
  background: #e2e8f0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}
.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg, transparent,
    rgba(255,255,255,.6),
    transparent
  );
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}`,
        html: `<div class="card">
  <div class="avatar skeleton"></div>
  <div class="lines">
    <div class="line skeleton"></div>
    <div class="line skeleton"></div>
  </div>
</div>`
      }
    },
    {
      title: "ツールチップ",
      desc: "ボタンにホバーすると説明が表示されるツールチップ。操作を迷わせない良いUXの例。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:12px;justify-content:center;padding:24px 8px 8px;flex-wrap:wrap; }
          .${p}-tip-wrap { position:relative;display:inline-block; }
          .${p}-btn { padding:6px 14px;border-radius:6px;border:1px solid #d1d5db;background:#fff;font-size:.7rem;cursor:pointer;transition:background .2s; }
          .${p}-btn:hover { background:#f1f5f9; }
          .${p}-tooltip { position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);
            background:#1e293b;color:#fff;font-size:.6rem;padding:4px 8px;border-radius:4px;white-space:nowrap;
            opacity:0;pointer-events:none;transition:opacity .2s; }
          .${p}-tooltip::after { content:"";position:absolute;top:100%;left:50%;transform:translateX(-50%);
            border:4px solid transparent;border-top-color:#1e293b; }
          .${p}-tip-wrap:hover .${p}-tooltip { opacity:1; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const tips = [
          { label: "💾 保存", desc: "変更を保存します" },
          { label: "📋 コピー", desc: "クリップボードにコピー" },
          { label: "🗑 削除", desc: "この項目を削除します" },
          { label: "↩ 元に戻す", desc: "直前の操作を取消" }
        ];
        tips.forEach(t => {
          const tw = h("div", `${p}-tip-wrap`);
          const tooltip = h("div", `${p}-tooltip`, t.desc);
          const btn = h("button", `${p}-btn`, t.label);
          tw.append(tooltip, btn);
          wrap.append(tw);
        });
        c.append(wrap);
      },
      code: {
        css: `.tip-wrap { position: relative; }
.tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: #fff;
  font-size: .6rem;
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity .2s;
}
.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #1e293b;
}
.tip-wrap:hover .tooltip {
  opacity: 1;
}`,
        html: `<div class="tip-wrap">
  <div class="tooltip">変更を保存します</div>
  <button>💾 保存</button>
</div>`
      }
    }
  );

  /* ==============================
     layout — 追加2つ
     ============================== */
  demos["layout"].push(
    {
      title: "ホーリーグレイルレイアウト",
      desc: "CSS Gridで実現する聖杯レイアウト。ヘッダー・左右サイドバー・メイン・フッターの5領域構成。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-holy { display:grid;grid-template-areas:"hd hd hd" "ls mn rs" "ft ft ft";
            grid-template-columns:60px 1fr 60px;grid-template-rows:28px 1fr 24px;
            gap:4px;height:140px;font-size:.6rem;font-weight:600;color:#fff; }
          .${p}-hd { grid-area:hd;background:#6366f1;border-radius:4px;display:flex;align-items:center;padding:0 8px; }
          .${p}-ls { grid-area:ls;background:#8b5cf6;border-radius:4px;display:flex;align-items:center;justify-content:center; }
          .${p}-mn { grid-area:mn;background:#f1f5f9;border-radius:4px;color:#475569;display:flex;align-items:center;justify-content:center; }
          .${p}-rs { grid-area:rs;background:#a78bfa;border-radius:4px;display:flex;align-items:center;justify-content:center; }
          .${p}-ft { grid-area:ft;background:#4f46e5;border-radius:4px;display:flex;align-items:center;justify-content:center; }
        `);
        const grid = h("div", `${p}-holy`);
        grid.append(
          h("div", `${p}-hd`, "Header"),
          h("div", `${p}-ls`, "Left"),
          h("div", `${p}-mn`, "Main Content"),
          h("div", `${p}-rs`, "Right"),
          h("div", `${p}-ft`, "Footer")
        );
        c.append(grid);
      },
      code: {
        css: `.holy-grail {
  display: grid;
  grid-template-areas:
    "hd hd hd"
    "ls mn rs"
    "ft ft ft";
  grid-template-columns: 60px 1fr 60px;
  grid-template-rows: 28px 1fr 24px;
  gap: 4px;
  height: 140px;
}
.header  { grid-area: hd; }
.left    { grid-area: ls; }
.main    { grid-area: mn; }
.right   { grid-area: rs; }
.footer  { grid-area: ft; }`,
        html: `<div class="holy-grail">
  <div class="header">Header</div>
  <div class="left">Left</div>
  <div class="main">Main Content</div>
  <div class="right">Right</div>
  <div class="footer">Footer</div>
</div>`
      }
    },
    {
      title: "スタック（縦積み）レイアウト",
      desc: "LPのように全幅セクションを縦に積んだレイアウト。Hero・特徴・お客様の声・フッター。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stack { display:flex;flex-direction:column;gap:0;font-size:.6rem;font-weight:600;border-radius:8px;overflow:hidden; }
          .${p}-hero { background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:14px;text-align:center; }
          .${p}-hero-title { font-size:.85rem;margin-bottom:2px; }
          .${p}-features { background:#f8fafc;padding:8px;display:flex;gap:6px;justify-content:center; }
          .${p}-feat { background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:6px 8px;text-align:center;flex:1;font-size:.55rem; }
          .${p}-feat-icon { font-size:1rem;margin-bottom:2px; }
          .${p}-testi { background:#fff;padding:8px 12px;text-align:center;font-style:italic;color:#64748b;font-size:.6rem;border-top:1px solid #e2e8f0; }
          .${p}-ft { background:#1e293b;color:#94a3b8;padding:6px;text-align:center;font-size:.5rem; }
        `);
        const stack = h("div", `${p}-stack`);
        const hero = h("div", `${p}-hero`);
        hero.append(h("div", `${p}-hero-title`, "🚀 プロダクト名"), h("div", null, "素晴らしい体験を"));
        const features = h("div", `${p}-features`);
        [{ icon: "⚡", text: "高速" }, { icon: "🔒", text: "安全" }, { icon: "🎨", text: "美しい" }].forEach(f => {
          const feat = h("div", `${p}-feat`);
          feat.append(h("div", `${p}-feat-icon`, f.icon), h("div", null, f.text));
          features.append(feat);
        });
        const testi = h("div", `${p}-testi`, "「使いやすくて最高です！」— ユーザーの声");
        const ft = h("div", `${p}-ft`, "© 2025 Product Inc.");
        stack.append(hero, features, testi, ft);
        c.append(stack);
      },
      code: {
        css: `.stack {
  display: flex;
  flex-direction: column;
}
.hero {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  padding: 14px;
  text-align: center;
}
.features {
  display: flex;
  gap: 6px;
  padding: 8px;
}
.feature {
  flex: 1;
  text-align: center;
  padding: 6px;
}`,
        html: `<div class="stack">
  <div class="hero">🚀 プロダクト名</div>
  <div class="features">
    <div class="feature">⚡ 高速</div>
    <div class="feature">🔒 安全</div>
    <div class="feature">🎨 美しい</div>
  </div>
  <div class="testimonial">「使いやすい！」</div>
  <div class="footer">© 2025</div>
</div>`
      }
    }
  );

  /* ==============================
     centering — 追加2つ
     ============================== */
  demos["centering"].push(
    {
      title: "テキスト中央揃え",
      desc: "text-align:centerでインライン要素を中央に配置。テキスト・ボタン・バッジなど。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center;padding:10px;background:#f8fafc;border-radius:8px;border:2px dashed #cbd5e1; }
          .${p}-title { font-size:.85rem;font-weight:700;color:#1e293b;margin-bottom:4px; }
          .${p}-text { font-size:.65rem;color:#64748b;margin-bottom:8px; }
          .${p}-btns { display:inline-flex;gap:6px;margin-bottom:6px; }
          .${p}-btn { padding:4px 12px;border-radius:4px;border:none;font-size:.6rem;cursor:pointer;background:#6366f1;color:#fff; }
          .${p}-btn.outline { background:transparent;border:1px solid #6366f1;color:#6366f1; }
          .${p}-badges { display:inline-flex;gap:4px; }
          .${p}-badge { padding:2px 8px;border-radius:10px;font-size:.55rem;font-weight:600; }
          .${p}-badge:nth-child(1) { background:#dbeafe;color:#2563eb; }
          .${p}-badge:nth-child(2) { background:#dcfce7;color:#16a34a; }
          .${p}-badge:nth-child(3) { background:#fef3c7;color:#d97706; }
        `);
        const wrap = h("div", `${p}-wrap`);
        wrap.append(h("div", `${p}-title`, "Welcome!"));
        wrap.append(h("div", `${p}-text`, "すべてtext-align:centerで中央揃え"));
        const btns = h("div", `${p}-btns`);
        btns.append(h("button", `${p}-btn`, "Primary"), h("button", `${p}-btn outline`, "Outline"));
        wrap.append(btns);
        wrap.append(document.createElement("br"));
        const badges = h("div", `${p}-badges`);
        badges.append(h("span", `${p}-badge`, "HTML"), h("span", `${p}-badge`, "CSS"), h("span", `${p}-badge`, "JS"));
        wrap.append(badges);
        c.append(wrap);
      },
      code: {
        css: `.container {
  text-align: center;
  padding: 10px;
}
/* text-align: center は
   インライン要素・インラインブロックを
   中央に配置する */
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
}`,
        html: `<div class="container">
  <h2>Welcome!</h2>
  <p>テキストもボタンも中央揃え</p>
  <button>Primary</button>
  <span class="badge">HTML</span>
  <span class="badge">CSS</span>
</div>`
      }
    },
    {
      title: "複数要素の上下左右中央",
      desc: "ログインフォームをFlexboxで画面中央に配置。display:flex + align-items + justify-content。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-page { display:flex;align-items:center;justify-content:center;height:150px;background:linear-gradient(135deg,#ede9fe,#dbeafe); border-radius:8px; }
          .${p}-card { background:#fff;border-radius:8px;padding:12px 16px;box-shadow:0 2px 8px rgba(0,0,0,.1);width:160px; }
          .${p}-card-title { font-size:.75rem;font-weight:700;text-align:center;margin-bottom:8px;color:#1e293b; }
          .${p}-input { width:100%;padding:4px 6px;border:1px solid #d1d5db;border-radius:4px;font-size:.6rem;margin-bottom:6px;box-sizing:border-box; }
          .${p}-submit { width:100%;padding:5px;background:#6366f1;color:#fff;border:none;border-radius:4px;font-size:.65rem;cursor:pointer;font-weight:600; }
        `);
        const page = h("div", `${p}-page`);
        const card = h("div", `${p}-card`);
        card.append(h("div", `${p}-card-title`, "🔐 ログイン"));
        const inp1 = document.createElement("input");
        inp1.type = "text"; inp1.placeholder = "メールアドレス"; inp1.className = `${p}-input`;
        const inp2 = document.createElement("input");
        inp2.type = "password"; inp2.placeholder = "パスワード"; inp2.className = `${p}-input`;
        const submit = h("button", `${p}-submit`, "ログイン");
        card.append(inp1, inp2, submit);
        page.append(card);
        c.append(page);
      },
      code: {
        css: `.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #ede9fe, #dbeafe);
}
.login-card {
  background: #fff;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}`,
        html: `<div class="page">
  <div class="login-card">
    <h3>🔐 ログイン</h3>
    <input placeholder="メールアドレス">
    <input type="password" placeholder="パスワード">
    <button>ログイン</button>
  </div>
</div>`
      }
    }
  );

  /* ==============================
     margin — 追加2つ
     ============================== */
  demos["margin"].push(
    {
      title: "ネガティブマージン",
      desc: "負のマージンで要素を重ねるテクニック。カードを少しずつ重ねてスタック風のデザインに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { padding:16px 20px; }
          .${p}-stack { display:flex;justify-content:center; }
          .${p}-card { width:80px;height:100px;border-radius:8px;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.12);
            display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:700;color:#fff; }
          .${p}-card:nth-child(1) { background:#6366f1;z-index:3;transform:rotate(-4deg); }
          .${p}-card:nth-child(2) { background:#8b5cf6;margin-left:-24px;z-index:2;transform:rotate(0deg); }
          .${p}-card:nth-child(3) { background:#a78bfa;margin-left:-24px;z-index:1;transform:rotate(4deg); }
          .${p}-note { text-align:center;font-size:.55rem;color:#64748b;margin-top:6px; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const stack = h("div", `${p}-stack`);
        stack.append(
          h("div", `${p}-card`, "Card 1"),
          h("div", `${p}-card`, "Card 2"),
          h("div", `${p}-card`, "Card 3")
        );
        wrap.append(stack, h("div", `${p}-note`, "margin-left: -24px で重なり"));
        c.append(wrap);
      },
      code: {
        css: `.stack { display: flex; }
.card {
  width: 80px;
  height: 100px;
  border-radius: 8px;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.12);
}
/* 2枚目以降をネガティブマージンで重ねる */
.card:nth-child(2) { margin-left: -24px; }
.card:nth-child(3) { margin-left: -24px; }`,
        html: `<div class="stack">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>`
      }
    },
    {
      title: "マージンの相殺（collapse）",
      desc: "隣接するブロック要素のマージンが重なる現象。通常フローでは相殺が起き、Flexboxでは起きない。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:12px;padding:8px;font-size:.55rem; }
          .${p}-col { flex:1; }
          .${p}-label { font-weight:700;font-size:.6rem;color:#1e293b;margin-bottom:4px;text-align:center; }
          .${p}-box-wrap { background:#f1f5f9;border-radius:6px;padding:4px;position:relative; }
          .${p}-box { background:#6366f1;color:#fff;padding:6px 8px;border-radius:4px;text-align:center;font-weight:600; }
          .${p}-normal .${p}-box { margin:12px 0; }
          .${p}-flex-col .${p}-box-wrap { display:flex;flex-direction:column; }
          .${p}-flex-col .${p}-box { margin:12px 0; }
          .${p}-marker { background:#fbbf24;color:#92400e;font-size:.5rem;text-align:center;padding:1px 4px;border-radius:2px;font-weight:700; }
        `);
        const wrap = h("div", `${p}-wrap`);

        // Collapse column
        const col1 = h("div", `${p}-col`);
        col1.append(h("div", `${p}-label`, "通常フロー（相殺あり）"));
        const bw1 = h("div", `${p}-box-wrap ${p}-normal`);
        const b1 = h("div", `${p}-box`, "A (margin:12px)");
        const marker1 = h("div", `${p}-marker`, "↕ 12px（相殺）");
        const b2 = h("div", `${p}-box`, "B (margin:12px)");
        bw1.append(b1, marker1, b2);
        col1.append(bw1);

        // No collapse column
        const col2 = h("div", `${p}-col`);
        col2.append(h("div", `${p}-label`, "Flexbox（相殺なし）"));
        const bw2 = h("div", `${p}-box-wrap ${p}-flex-col`);
        const b3 = h("div", `${p}-box`, "A (margin:12px)");
        const marker2 = h("div", `${p}-marker`, "↕ 24px（加算）");
        const b4 = h("div", `${p}-box`, "B (margin:12px)");
        bw2.append(b3, marker2, b4);
        col2.append(bw2);

        wrap.append(col1, col2);
        c.append(wrap);
      },
      code: {
        css: `/* 通常フロー: margin が相殺される */
.normal .box { margin: 12px 0; }
/* 上12px + 下12px = 12px（相殺） */

/* Flexbox: margin は加算される */
.flex-column {
  display: flex;
  flex-direction: column;
}
.flex-column .box { margin: 12px 0; }
/* 上12px + 下12px = 24px（加算） */`,
        html: `<!-- 通常フロー -->
<div class="normal">
  <div class="box">A</div>
  <div class="box">B</div>
</div>

<!-- Flexbox -->
<div class="flex-column">
  <div class="box">A</div>
  <div class="box">B</div>
</div>`
      }
    }
  );

  /* ==============================
     padding — 追加2つ
     ============================== */
  demos["padding"].push(
    {
      title: "レスポンシブパディング",
      desc: "同じカードにパディング量を変えて表示。compact / normal / spacious でどう印象が変わるか。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:8px;padding:8px;align-items:flex-start; }
          .${p}-card { background:#fff;border:1px solid #e2e8f0;border-radius:6px;flex:1;min-width:0; }
          .${p}-compact { padding:4px 6px; }
          .${p}-normal { padding:10px 14px; }
          .${p}-spacious { padding:18px 22px; }
          .${p}-tag { font-size:.5rem;font-weight:700;color:#6366f1;text-transform:uppercase;margin-bottom:2px; }
          .${p}-card-title { font-size:.65rem;font-weight:700;color:#1e293b;margin-bottom:2px; }
          .${p}-card-text { font-size:.55rem;color:#64748b;line-height:1.3; }
        `);
        const wrap = h("div", `${p}-wrap`);
        ["compact|4px 6px", "normal|10px 14px", "spacious|18px 22px"].forEach(item => {
          const [type, padVal] = item.split("|");
          const card = h("div", `${p}-card ${p}-${type}`);
          card.append(
            h("div", `${p}-tag`, type),
            h("div", `${p}-card-title`, "カード"),
            h("div", `${p}-card-text`, "padding: " + padVal)
          );
          wrap.append(card);
        });
        c.append(wrap);
      },
      code: {
        css: `.card { background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; }
/* パディングで余裕が変わる */
.compact  { padding: 4px 6px; }
.normal   { padding: 10px 14px; }
.spacious { padding: 18px 22px; }`,
        html: `<div class="card compact">Compact</div>
<div class="card normal">Normal</div>
<div class="card spacious">Spacious</div>`
      }
    },
    {
      title: "パディングとbox-sizing",
      desc: "content-box vs border-box でパディングが全体サイズに与える影響を視覚的に比較。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:16px;padding:8px;align-items:flex-start;justify-content:center; }
          .${p}-col { text-align:center; }
          .${p}-label { font-size:.6rem;font-weight:700;color:#1e293b;margin-bottom:4px; }
          .${p}-outer { border:2px dashed #cbd5e1;border-radius:4px;display:inline-block;position:relative; }
          .${p}-box { width:100px;padding:12px;background:#6366f1;color:#fff;font-size:.6rem;font-weight:600;border-radius:4px;text-align:center; }
          .${p}-content-box { box-sizing:content-box; }
          .${p}-border-box { box-sizing:border-box; }
          .${p}-size { font-size:.5rem;color:#64748b;margin-top:4px; }
          .${p}-size strong { color:#dc2626; }
        `);
        const wrap = h("div", `${p}-wrap`);

        // content-box
        const col1 = h("div", `${p}-col`);
        col1.append(h("div", `${p}-label`, "content-box"));
        const outer1 = h("div", `${p}-outer`);
        outer1.append(h("div", `${p}-box ${p}-content-box`, "width:100px\npadding:12px"));
        col1.append(outer1);
        const size1 = h("div", `${p}-size`);
        size1.innerHTML = "実際の幅: <strong>124px</strong>";
        col1.append(size1);

        // border-box
        const col2 = h("div", `${p}-col`);
        col2.append(h("div", `${p}-label`, "border-box"));
        const outer2 = h("div", `${p}-outer`);
        outer2.append(h("div", `${p}-box ${p}-border-box`, "width:100px\npadding:12px"));
        col2.append(outer2);
        const size2 = h("div", `${p}-size`);
        size2.innerHTML = "実際の幅: <strong>100px</strong>";
        col2.append(size2);

        wrap.append(col1, col2);
        c.append(wrap);
      },
      code: {
        css: `/* content-box: padding が width に加算 */
.content-box {
  box-sizing: content-box;
  width: 100px;
  padding: 12px;
  /* 実際の幅 = 100 + 12*2 = 124px */
}

/* border-box: padding が width に含まれる */
.border-box {
  box-sizing: border-box;
  width: 100px;
  padding: 12px;
  /* 実際の幅 = 100px（中身は76px） */
}`,
        html: `<div class="content-box">content-box</div>
<div class="border-box">border-box</div>`
      }
    }
  );

  /* ==============================
     whitespace — 追加2つ
     ============================== */
  demos["whitespace"].push(
    {
      title: "カードの余白デザイン",
      desc: "同じ内容でも余白の取り方で印象が大きく変わる。窮屈 vs ゆとりを並べて比較。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:10px;padding:8px; }
          .${p}-card { flex:1;background:#fff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden; }
          .${p}-cramped .${p}-inner { padding:4px 6px; }
          .${p}-cramped .${p}-card-title { font-size:.7rem;font-weight:700;margin:0;line-height:1.1; }
          .${p}-cramped .${p}-card-text { font-size:.55rem;color:#64748b;margin:0;line-height:1.2; }
          .${p}-cramped .${p}-card-btn { margin-top:2px;padding:2px 6px;font-size:.5rem; }
          .${p}-spacious .${p}-inner { padding:12px 14px; }
          .${p}-spacious .${p}-card-title { font-size:.7rem;font-weight:700;margin:0 0 6px;line-height:1.3; }
          .${p}-spacious .${p}-card-text { font-size:.55rem;color:#64748b;margin:0 0 10px;line-height:1.5; }
          .${p}-spacious .${p}-card-btn { padding:4px 10px;font-size:.5rem; }
          .${p}-card-img { height:36px;background:linear-gradient(135deg,#6366f1,#8b5cf6); }
          .${p}-card-btn { background:#6366f1;color:#fff;border:none;border-radius:4px;cursor:pointer; }
          .${p}-tag { text-align:center;font-size:.5rem;font-weight:700;padding:2px;color:#64748b; }
        `);
        const wrap = h("div", `${p}-wrap`);
        function buildCard(cls, label) {
          const card = h("div", `${p}-card ${p}-${cls}`);
          card.append(h("div", `${p}-card-img`));
          const inner = h("div", `${p}-inner`);
          inner.append(
            h("div", `${p}-card-title`, "タイトル"),
            h("div", `${p}-card-text`, "説明テキストが入ります"),
            h("button", `${p}-card-btn`, "詳しく見る")
          );
          card.append(inner);
          card.append(h("div", `${p}-tag`, label));
          return card;
        }
        wrap.append(buildCard("cramped", "😰 窮屈"), buildCard("spacious", "😊 ゆとり"));
        c.append(wrap);
      },
      code: {
        css: `/* 窮屈なカード */
.cramped { padding: 4px 6px; }
.cramped .title { margin: 0; line-height: 1.1; }
.cramped .text  { margin: 0; line-height: 1.2; }

/* ゆとりのあるカード */
.spacious { padding: 12px 14px; }
.spacious .title { margin: 0 0 6px; line-height: 1.3; }
.spacious .text  { margin: 0 0 10px; line-height: 1.5; }`,
        html: `<div class="card cramped">...</div>
<div class="card spacious">...</div>`
      }
    },
    {
      title: "フォーム余白",
      desc: "ラベル・入力・ヘルパーテキスト・ボタン間に適切な余白を取ったフォーム。読みやすさを向上。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-form { background:#fff;border-radius:8px;padding:12px 16px;border:1px solid #e2e8f0;max-width:200px;margin:0 auto; }
          .${p}-group { margin-bottom:10px; }
          .${p}-label { display:block;font-size:.6rem;font-weight:700;color:#1e293b;margin-bottom:3px; }
          .${p}-input { width:100%;padding:5px 8px;border:1px solid #d1d5db;border-radius:4px;font-size:.6rem;box-sizing:border-box; }
          .${p}-input:focus { outline:2px solid #6366f1;border-color:transparent; }
          .${p}-helper { font-size:.5rem;color:#94a3b8;margin-top:2px; }
          .${p}-submit { width:100%;padding:6px;background:#6366f1;color:#fff;border:none;border-radius:4px;font-size:.65rem;font-weight:600;cursor:pointer;margin-top:4px; }
          .${p}-spacer { height:1px;background:#e2e8f0;margin:8px 0; }
        `);
        const form = h("div", `${p}-form`);

        const g1 = h("div", `${p}-group`);
        g1.append(h("label", `${p}-label`, "ユーザー名"));
        const inp1 = document.createElement("input");
        inp1.type = "text"; inp1.placeholder = "taro_yamada"; inp1.className = `${p}-input`;
        g1.append(inp1, h("div", `${p}-helper`, "半角英数字で入力"));

        const g2 = h("div", `${p}-group`);
        g2.append(h("label", `${p}-label`, "メール"));
        const inp2 = document.createElement("input");
        inp2.type = "email"; inp2.placeholder = "example@mail.com"; inp2.className = `${p}-input`;
        g2.append(inp2);

        form.append(g1, g2, h("div", `${p}-spacer`), h("button", `${p}-submit`, "送信"));
        c.append(form);
      },
      code: {
        css: `.form { padding: 12px 16px; }
.group { margin-bottom: 10px; }
.label {
  display: block;
  font-size: .6rem;
  font-weight: 700;
  margin-bottom: 3px;
}
.input {
  width: 100%;
  padding: 5px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}
.helper {
  font-size: .5rem;
  color: #94a3b8;
  margin-top: 2px;
}`,
        html: `<form class="form">
  <div class="group">
    <label class="label">ユーザー名</label>
    <input class="input" placeholder="taro_yamada">
    <div class="helper">半角英数字で入力</div>
  </div>
  <div class="group">
    <label class="label">メール</label>
    <input class="input" placeholder="example@mail.com">
  </div>
  <button class="submit">送信</button>
</form>`
      }
    }
  );

  /* ==============================
     grid — 追加2つ
     ============================== */
  demos["grid"].push(
    {
      title: "ダッシュボードグリッド",
      desc: "grid-column/grid-row の span で大小さまざまなカードを配置したダッシュボード。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-dash { display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:55px;gap:6px;padding:4px; }
          .${p}-item { background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:8px;font-size:.6rem;font-weight:600;display:flex;flex-direction:column;justify-content:center;align-items:center; }
          .${p}-item:nth-child(1) { grid-column:span 2;background:linear-gradient(135deg,#6366f1,#818cf8);color:#fff; }
          .${p}-item:nth-child(2) { grid-row:span 2;background:#f0fdf4;border-color:#bbf7d0; }
          .${p}-item:nth-child(3) { background:#fefce8;border-color:#fde68a; }
          .${p}-item:nth-child(4) { grid-column:span 2;background:#faf5ff;border-color:#e9d5ff; }
          .${p}-icon { font-size:1.1rem;margin-bottom:2px; }
          .${p}-val { font-size:.8rem;font-weight:800;color:#1e293b; }
          .${p}-item:nth-child(1) .${p}-val { color:#fff; }
        `);
        const grid = h("div", `${p}-dash`);
        const items = [
          { icon: "📊", label: "売上", val: "¥1.2M" },
          { icon: "👥", label: "ユーザー", val: "3,420" },
          { icon: "📦", label: "注文", val: "182" },
          { icon: "📈", label: "成長率 +12%", val: "" }
        ];
        items.forEach(it => {
          const item = h("div", `${p}-item`);
          item.append(h("span", `${p}-icon`, it.icon));
          if (it.val) item.append(h("span", `${p}-val`, it.val));
          item.append(h("span", null, it.label));
          grid.append(item);
        });
        c.append(grid);
      },
      code: {
        css: `.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 55px;
  gap: 6px;
}
/* 大きいカード */
.wide  { grid-column: span 2; }
.tall  { grid-row: span 2; }`,
        html: `<div class="dashboard">
  <div class="item wide">📊 売上</div>
  <div class="item tall">👥 ユーザー</div>
  <div class="item">📦 注文</div>
  <div class="item wide">📈 成長率</div>
</div>`
      }
    },
    {
      title: "画像ギャラリーグリッド",
      desc: "grid-row: span で高さの異なるアイテムを配置。Masonry風のフォトギャラリー。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-gallery { display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:28px;gap:4px;padding:4px; }
          .${p}-photo { border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:#fff;font-weight:700; }
          .${p}-photo:nth-child(1) { grid-row:span 3;background:linear-gradient(135deg,#6366f1,#818cf8); }
          .${p}-photo:nth-child(2) { grid-row:span 2;background:linear-gradient(135deg,#ec4899,#f472b6); }
          .${p}-photo:nth-child(3) { grid-row:span 2;background:linear-gradient(135deg,#f59e0b,#fbbf24); }
          .${p}-photo:nth-child(4) { grid-row:span 2;background:linear-gradient(135deg,#10b981,#34d399); }
          .${p}-photo:nth-child(5) { grid-row:span 3;background:linear-gradient(135deg,#3b82f6,#60a5fa); }
          .${p}-photo:nth-child(6) { grid-row:span 2;background:linear-gradient(135deg,#8b5cf6,#a78bfa); }
        `);
        const gallery = h("div", `${p}-gallery`);
        ["🏔", "🌸", "🌅", "🌿", "🏙", "🎨"].forEach(emoji => {
          gallery.append(h("div", `${p}-photo`, emoji));
        });
        c.append(gallery);
      },
      code: {
        css: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 28px;
  gap: 4px;
}
/* 高さの異なるアイテム */
.photo:nth-child(1) { grid-row: span 3; }
.photo:nth-child(2) { grid-row: span 2; }
.photo:nth-child(5) { grid-row: span 3; }`,
        html: `<div class="gallery">
  <div class="photo">🏔</div>
  <div class="photo">🌸</div>
  <div class="photo">🌅</div>
  <div class="photo">🌿</div>
  <div class="photo">🏙</div>
  <div class="photo">🎨</div>
</div>`
      }
    }
  );

  /* ==============================
     column — 追加2つ
     ============================== */
  demos["column"].push(
    {
      title: "レスポンシブカラム",
      desc: "幅に応じて3カラムから1カラムに切り替わるレイアウト。ボタンでコンテナ幅を変えてシミュレート。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { padding:4px; }
          .${p}-container { border:2px dashed #cbd5e1;border-radius:8px;padding:8px;transition:max-width .4s;max-width:100%;overflow:hidden; }
          .${p}-container.narrow { max-width:120px; }
          .${p}-grid { display:flex;flex-wrap:wrap;gap:6px; }
          .${p}-col { flex:1 1 60px;min-width:60px;background:#6366f1;color:#fff;padding:8px;border-radius:6px;text-align:center;font-size:.6rem;font-weight:600; }
          .${p}-narrow .${p}-col { flex:1 1 100%; }
          .${p}-toggle { margin-top:6px;font-size:.6rem;padding:3px 10px;background:#6366f1;color:#fff;border:none;border-radius:4px;cursor:pointer; }
          .${p}-indicator { font-size:.55rem;color:#64748b;margin-top:4px;text-align:center; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const container = h("div", `${p}-container`);
        const grid = h("div", `${p}-grid`);
        grid.append(
          h("div", `${p}-col`, "Col 1"),
          h("div", `${p}-col`, "Col 2"),
          h("div", `${p}-col`, "Col 3")
        );
        container.append(grid);
        const indicator = h("div", `${p}-indicator`, "📐 Wide (3カラム)");
        const btn = makeBtn("幅を切り替え", `${p}-toggle`);
        let narrow = false;
        btn.addEventListener("click", () => {
          narrow = !narrow;
          container.classList.toggle("narrow", narrow);
          container.classList.toggle(`${p}-narrow`, narrow);
          indicator.textContent = narrow ? "📐 Narrow (1カラム)" : "📐 Wide (3カラム)";
        });
        wrap.append(container, indicator, btn);
        c.append(wrap);
      },
      code: {
        css: `.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.col {
  flex: 1 1 60px;
  min-width: 60px;
}
/* 狭い画面では1カラムに */
@media (max-width: 400px) {
  .col { flex: 1 1 100%; }
}`,
        html: `<div class="grid">
  <div class="col">Col 1</div>
  <div class="col">Col 2</div>
  <div class="col">Col 3</div>
</div>`
      }
    },
    {
      title: "サイドバー固定+メイン可変",
      desc: "サイドバーは固定幅200px、メインはflex:1で残りを埋める実用的なレイアウト。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-layout { display:flex;gap:0;height:130px;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0; }
          .${p}-sidebar { width:80px;flex-shrink:0;background:#1e293b;color:#fff;padding:8px;font-size:.55rem; }
          .${p}-sidebar-title { font-weight:700;font-size:.6rem;margin-bottom:6px;color:#94a3b8; }
          .${p}-nav-item { padding:3px 6px;border-radius:4px;margin-bottom:2px;cursor:pointer;transition:background .2s; }
          .${p}-nav-item:hover { background:#334155; }
          .${p}-nav-item.active { background:#6366f1;color:#fff; }
          .${p}-main { flex:1;background:#f8fafc;padding:10px;font-size:.6rem;position:relative; }
          .${p}-main-title { font-weight:700;font-size:.7rem;color:#1e293b;margin-bottom:4px; }
          .${p}-main-text { color:#64748b;line-height:1.4; }
          .${p}-badge { position:absolute;top:8px;right:8px;background:#dbeafe;color:#2563eb;font-size:.45rem;padding:2px 6px;border-radius:3px;font-weight:600; }
        `);
        const layout = h("div", `${p}-layout`);
        const sidebar = h("div", `${p}-sidebar`);
        sidebar.append(h("div", `${p}-sidebar-title`, "📁 メニュー"));
        const navItems = ["🏠 ホーム", "📊 分析", "⚙ 設定", "📝 ログ"];
        navItems.forEach((item, i) => {
          const nav = h("div", `${p}-nav-item${i === 0 ? " active" : ""}`, item);
          sidebar.append(nav);
        });
        const main = h("div", `${p}-main`);
        main.append(
          h("div", `${p}-badge`, "flex: 1"),
          h("div", `${p}-main-title`, "ホーム"),
          h("div", `${p}-main-text`, "サイドバーは固定幅、メインエリアはflex:1で残りの幅を全て使います。")
        );
        layout.append(sidebar, main);
        c.append(layout);
      },
      code: {
        css: `.layout { display: flex; }
.sidebar {
  width: 200px;     /* 固定幅 */
  flex-shrink: 0;   /* 縮まない */
  background: #1e293b;
  color: #fff;
}
.main {
  flex: 1;          /* 残りを埋める */
  background: #f8fafc;
  padding: 10px;
}`,
        html: `<div class="layout">
  <div class="sidebar">
    <div class="nav-item active">🏠 ホーム</div>
    <div class="nav-item">📊 分析</div>
    <div class="nav-item">⚙ 設定</div>
  </div>
  <div class="main">
    <h2>ホーム</h2>
    <p>メインコンテンツ</p>
  </div>
</div>`
      }
    }
  );

  /* ==============================
     responsive — 追加2つ
     ============================== */
  demos["responsive"].push(
    {
      title: "レスポンシブナビゲーション",
      desc: "広い幅では横並びリンク、狭い幅ではハンバーガーメニューに切り替わるナビバー。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { padding:4px; }
          .${p}-nav { background:#1e293b;border-radius:8px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;transition:all .3s; }
          .${p}-logo { color:#fff;font-weight:700;font-size:.75rem; }
          .${p}-links { display:flex;gap:10px; }
          .${p}-link { color:#94a3b8;font-size:.6rem;text-decoration:none;cursor:pointer;transition:color .2s; }
          .${p}-link:hover { color:#fff; }
          .${p}-hamburger { display:none;background:none;border:none;color:#fff;font-size:1rem;cursor:pointer;padding:0; }
          .${p}-nav.mobile .${p}-links { display:none; }
          .${p}-nav.mobile .${p}-hamburger { display:block; }
          .${p}-nav.mobile.open .${p}-links { display:flex;flex-direction:column;position:absolute;top:36px;right:8px;background:#334155;border-radius:6px;padding:8px;gap:6px;z-index:10; }
          .${p}-nav.mobile { position:relative; }
          .${p}-toggle { margin-top:6px;font-size:.6rem;padding:3px 10px;background:#6366f1;color:#fff;border:none;border-radius:4px;cursor:pointer; }
          .${p}-indicator { font-size:.55rem;color:#64748b;margin-top:4px;text-align:center; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const nav = h("div", `${p}-nav`);
        nav.append(h("span", `${p}-logo`, "🎮 GameApp"));
        const links = h("div", `${p}-links`);
        ["ホーム", "ゲーム", "ランキング", "設定"].forEach(text => {
          links.append(h("span", `${p}-link`, text));
        });
        const hamburger = h("button", `${p}-hamburger`, "☰");
        hamburger.addEventListener("click", () => nav.classList.toggle("open"));
        nav.append(links, hamburger);

        const indicator = h("div", `${p}-indicator`, "💻 Desktop mode");
        const btn = makeBtn("モバイル切り替え", `${p}-toggle`);
        let mobile = false;
        btn.addEventListener("click", () => {
          mobile = !mobile;
          nav.classList.toggle("mobile", mobile);
          nav.classList.remove("open");
          indicator.textContent = mobile ? "📱 Mobile mode（☰をクリック）" : "💻 Desktop mode";
        });
        wrap.append(nav, indicator, btn);
        c.append(wrap);
      },
      code: {
        css: `.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.links { display: flex; gap: 10px; }
.hamburger { display: none; }

@media (max-width: 600px) {
  .links { display: none; }
  .hamburger { display: block; }
  .links.open {
    display: flex;
    flex-direction: column;
  }
}`,
        html: `<nav class="nav">
  <span class="logo">🎮 GameApp</span>
  <div class="links">
    <a>ホーム</a><a>ゲーム</a>
    <a>ランキング</a>
  </div>
  <button class="hamburger">☰</button>
</nav>`
      }
    },
    {
      title: "レスポンシブカード",
      desc: "広い幅では横並び（画像左+テキスト右）、狭い幅では縦並びに切り替わるカード。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { padding:4px; }
          .${p}-card { display:flex;gap:0;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;background:#fff;transition:all .3s; }
          .${p}-img { width:80px;min-height:70px;background:linear-gradient(135deg,#6366f1,#a78bfa);display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;transition:all .3s; }
          .${p}-body { padding:8px 10px;display:flex;flex-direction:column;justify-content:center; }
          .${p}-card-title { font-size:.7rem;font-weight:700;color:#1e293b;margin-bottom:2px; }
          .${p}-card-text { font-size:.55rem;color:#64748b;line-height:1.4; }
          .${p}-card.vertical { flex-direction:column; }
          .${p}-card.vertical .${p}-img { width:100%;min-height:50px; }
          .${p}-toggle { margin-top:6px;font-size:.6rem;padding:3px 10px;background:#6366f1;color:#fff;border:none;border-radius:4px;cursor:pointer; }
          .${p}-indicator { font-size:.55rem;color:#64748b;margin-top:4px;text-align:center; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const card = h("div", `${p}-card`);
        const img = h("div", `${p}-img`, "🎮");
        const body = h("div", `${p}-body`);
        body.append(
          h("div", `${p}-card-title`, "アクションRPG"),
          h("div", `${p}-card-text`, "壮大な冒険が待っている。仲間と共にダンジョンを攻略しよう。")
        );
        card.append(img, body);
        const indicator = h("div", `${p}-indicator`, "↔ 横並び（wide）");
        const btn = makeBtn("レイアウト切り替え", `${p}-toggle`);
        let vertical = false;
        btn.addEventListener("click", () => {
          vertical = !vertical;
          card.classList.toggle("vertical", vertical);
          indicator.textContent = vertical ? "↕ 縦並び（narrow）" : "↔ 横並び（wide）";
        });
        wrap.append(card, indicator, btn);
        c.append(wrap);
      },
      code: {
        css: `.card {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
}
.card-img {
  width: 80px;
  flex-shrink: 0;
}
/* 狭い画面では縦並びに */
@media (max-width: 500px) {
  .card { flex-direction: column; }
  .card-img { width: 100%; }
}`,
        html: `<div class="card">
  <div class="card-img">🎮</div>
  <div class="card-body">
    <h3>アクションRPG</h3>
    <p>壮大な冒険が待っている。</p>
  </div>
</div>`
      }
    }
  );

})();
