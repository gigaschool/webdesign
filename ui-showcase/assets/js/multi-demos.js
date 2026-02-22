/* ==========================================================================
   Multi-Demo Definitions — Multiple examples per "動き・演出" term
   Each term has 3 realistic use-case demos with displayable code
   ========================================================================== */
(function () {
  let uid = 0;
  function id() { return "md" + (++uid); }

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
    b.className = cls || "md-btn";
    b.textContent = text;
    return b;
  }

  const demos = {};

  /* ==============================
     animation — アニメーション
     ============================== */
  demos["animation"] = [
    {
      title: "バウンス（bounce）",
      desc: "要素が弾むように上下に動くアニメーション。ボタンやアイコンの注目エフェクトに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-ball { width:56px;height:56px;background:#3b82f6;border-radius:50%;animation:${p}-b .7s ease infinite; }
          @keyframes ${p}-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-28px)} }
        `);
        c.append(h("div", `${p}-ball`));
      },
      code: {
        css: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-28px); }
}

.ball {
  width: 56px;
  height: 56px;
  background: #3b82f6;
  border-radius: 50%;
  animation: bounce 0.7s ease infinite;
}`,
        html: `<div class="ball"></div>`
      }
    },
    {
      title: "スピン（spin）— ローディング",
      desc: "くるくる回る回転アニメーション。読み込み中のインジケーターに最適。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-spinner { width:48px;height:48px;border:4px solid #e5e7eb;border-top-color:#8b5cf6;
            border-radius:50%;animation:${p}-s .8s linear infinite;margin:0 auto 12px; }
          @keyframes ${p}-s { to{transform:rotate(360deg)} }
          .${p}-text { font-size:.8rem;color:#6b7280; }
        `);
        const w = h("div", `${p}-wrap`);
        w.append(h("div", `${p}-spinner`), h("p", `${p}-text`, "読み込み中..."));
        c.append(w);
      },
      code: {
        css: `@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}`,
        html: `<div class="spinner"></div>
<p>読み込み中...</p>`
      }
    },
    {
      title: "パルス（pulse）— 通知ドット",
      desc: "脈打つように拡大縮小を繰り返す。通知バッジや注目させたい要素に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;align-items:center;gap:10px; }
          .${p}-dot { width:12px;height:12px;background:#ef4444;border-radius:50%;animation:${p}-p 1.2s ease-in-out infinite; }
          @keyframes ${p}-p { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.8);opacity:.4} }
          .${p}-text { font-size:.85rem;font-weight:600; }
        `);
        const w = h("div", `${p}-wrap`);
        w.append(h("span", `${p}-dot`), h("span", `${p}-text`, "新着メッセージ 3件"));
        c.append(w);
      },
      code: {
        css: `@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.8);
    opacity: 0.4;
  }
}

.notification-dot {
  width: 12px;
  height: 12px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 1.2s ease-in-out infinite;
}`,
        html: `<span class="notification-dot"></span>
<span>新着メッセージ 3件</span>`
      }
    }
  ];

  /* ==============================
     transition — トランジション
     ============================== */
  demos["transition"] = [
    {
      title: "ホバーで色が変わるボタン",
      desc: "マウスを乗せるとなめらかに背景色が変わる。最も基本的なトランジション。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-btn { padding:12px 28px;font-size:.9rem;font-weight:600;border:none;border-radius:8px;
            background:#3b82f6;color:#fff;cursor:pointer;transition:background-color .3s ease; }
          .${p}-btn:hover { background:#1d4ed8; }
        `);
        c.append(h("button", `${p}-btn`, "ホバーしてみて"));
      },
      code: {
        css: `.button {
  background: #3b82f6;
  color: #fff;
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background: #1d4ed8;
}`,
        html: `<button class="button">ホバーしてみて</button>`
      }
    },
    {
      title: "カードの展開（高さのトランジション）",
      desc: "クリックで詳細がスライドして開く。アコーディオン的なUI。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { width:100%;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;background:#fff; }
          .${p}-head { padding:12px 16px;font-weight:600;font-size:.85rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center; }
          .${p}-arrow { transition:transform .3s ease; }
          .${p}-body { max-height:0;overflow:hidden;transition:max-height .4s ease,padding .3s ease;padding:0 16px;font-size:.8rem;color:#4b5563;line-height:1.7; }
          .${p}-card.open .${p}-body { max-height:120px;padding:0 16px 14px; }
          .${p}-card.open .${p}-arrow { transform:rotate(180deg); }
        `);
        const card = h("div", `${p}-card`);
        const head = h("div", `${p}-head`);
        head.append(h("span", "", "詳細を表示"), h("span", `${p}-arrow`, "▼"));
        const body = h("div", `${p}-body`, "ここに詳細情報が入ります。高さのtransitionでなめらかに開閉します。max-heightを使うのがポイントです。");
        card.append(head, body);
        head.addEventListener("click", () => card.classList.toggle("open"));
        c.append(card);
      },
      code: {
        css: `.card-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
  padding: 0 16px;
}

.card.open .card-body {
  max-height: 120px;
  padding: 0 16px 14px;
}

.arrow {
  transition: transform 0.3s ease;
}

.card.open .arrow {
  transform: rotate(180deg);
}`,
        html: `<div class="card">
  <div class="card-head" onclick="toggle()">
    <span>詳細を表示</span>
    <span class="arrow">▼</span>
  </div>
  <div class="card-body">詳細情報...</div>
</div>`,
        js: `function toggle() {
  document.querySelector('.card')
    .classList.toggle('open');
}`
      }
    },
    {
      title: "複数プロパティの同時トランジション",
      desc: "色・サイズ・角丸が同時に変化。transition: all で一括指定。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-box { width:80px;height:80px;background:#8b5cf6;border-radius:8px;
            transition:all .5s ease;cursor:pointer;display:flex;align-items:center;justify-content:center;
            color:#fff;font-size:.7rem;font-weight:600; }
          .${p}-box:hover { background:#ec4899;border-radius:50%;transform:scale(1.3);box-shadow:0 8px 24px rgba(236,72,153,.3); }
        `);
        const box = h("div", `${p}-box`, "ホバー");
        c.append(box);
      },
      code: {
        css: `.box {
  width: 80px;
  height: 80px;
  background: #8b5cf6;
  border-radius: 8px;
  transition: all 0.5s ease;
}

.box:hover {
  background: #ec4899;
  border-radius: 50%;
  transform: scale(1.3);
  box-shadow: 0 8px 24px rgba(236,72,153,.3);
}`,
        html: `<div class="box">ホバー</div>`
      }
    }
  ];

  /* ==============================
     fade — フェードイン / フェードアウト
     ============================== */
  demos["fade"] = [
    {
      title: "ボタンでフェードイン表示",
      desc: "ボタンをクリックするとテキストがふわっと表示される。opacity + transition で実現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-msg { opacity:0;transition:opacity .6s ease;font-size:1.1rem;font-weight:700;color:#0f766e;margin-top:12px; }
          .${p}-msg.show { opacity:1; }
          .${p}-btn { padding:8px 20px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#0f766e;color:#fff;cursor:pointer; }
        `);
        const w = h("div", `${p}-wrap`);
        const msg = h("div", `${p}-msg`, "ステージクリア！おめでとう！");
        const btn = makeBtn("表示する", `${p}-btn`);
        btn.addEventListener("click", () => {
          msg.classList.remove("show");
          void msg.offsetWidth;
          msg.classList.add("show");
        });
        w.append(btn, msg);
        c.append(w);
      },
      code: {
        css: `.message {
  opacity: 0;
  transition: opacity 0.6s ease;
}

.message.show {
  opacity: 1;
}`,
        html: `<button onclick="fadeIn()">表示する</button>
<div class="message" id="msg">
  ステージクリア！
</div>`,
        js: `function fadeIn() {
  const el = document.getElementById('msg');
  el.classList.add('show');
}`
      }
    },
    {
      title: "フェードアウトで消える",
      desc: "要素が徐々に透明になって消える。消えた後にvisibility:hiddenで操作も無効に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-box { padding:16px 24px;background:#fef3c7;border:1px solid #fde68a;border-radius:8px;font-size:.85rem;font-weight:600;color:#92400e;
            transition:opacity .5s ease,visibility .5s ease;margin-bottom:12px; }
          .${p}-box.hidden { opacity:0;visibility:hidden; }
          .${p}-btn { padding:8px 20px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#f59e0b;color:#fff;cursor:pointer; }
        `);
        const w = h("div", `${p}-wrap`);
        const box = h("div", `${p}-box`, "⚠ この通知はフェードアウトで消えます");
        const btn = makeBtn("消す / 戻す", `${p}-btn`);
        btn.addEventListener("click", () => box.classList.toggle("hidden"));
        w.append(box, btn);
        c.append(w);
      },
      code: {
        css: `.notice {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s ease,
              visibility 0.5s ease;
}

.notice.hidden {
  opacity: 0;
  visibility: hidden;
}`,
        html: `<div class="notice" id="notice">
  ⚠ この通知はフェードアウトで消えます
</div>
<button onclick="toggle()">消す / 戻す</button>`,
        js: `function toggle() {
  document.getElementById('notice')
    .classList.toggle('hidden');
}`
      }
    },
    {
      title: "リストの順次フェードイン",
      desc: "リスト項目がanimation-delayを使って順番にふわっと表示される。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-list { list-style:none;padding:0;width:100%; }
          .${p}-item { padding:10px 14px;margin-bottom:6px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;font-size:.8rem;font-weight:500;color:#166534;
            opacity:0;animation:${p}-fi .5s ease forwards; }
          @keyframes ${p}-fi { to{opacity:1;transform:translateY(0)} from{opacity:0;transform:translateY(10px)} }
        `);
        const ul = h("ul", `${p}-list`);
        ["ステージ1 クリア", "ステージ2 クリア", "ステージ3 クリア", "ボーナス獲得！"].forEach((text, i) => {
          const li = h("li", `${p}-item`, text);
          li.style.animationDelay = `${i * 0.2}s`;
          ul.append(li);
        });
        c.append(ul);
      },
      code: {
        css: `@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.list-item {
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
}

/* 各項目にdelayを設定 */
.list-item:nth-child(1) { animation-delay: 0s; }
.list-item:nth-child(2) { animation-delay: 0.2s; }
.list-item:nth-child(3) { animation-delay: 0.4s; }`,
        html: `<ul>
  <li class="list-item">ステージ1 クリア</li>
  <li class="list-item">ステージ2 クリア</li>
  <li class="list-item">ステージ3 クリア</li>
</ul>`
      }
    }
  ];

  /* ==============================
     slide — スライドイン / スライドアウト
     ============================== */
  demos["slide"] = [
    {
      title: "左からサイドメニュー",
      desc: "ハンバーガーメニューのようにメニューが左からスライドして出てくる。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:160px;overflow:hidden;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb; }
          .${p}-menu { position:absolute;left:0;top:0;bottom:0;width:140px;background:#1e293b;color:#fff;padding:12px;
            transform:translateX(-100%);transition:transform .35s ease;display:flex;flex-direction:column;gap:8px;font-size:.75rem; }
          .${p}-stage.open .${p}-menu { transform:translateX(0); }
          .${p}-btn { position:absolute;top:8px;left:8px;padding:6px 12px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#3b82f6;color:#fff;cursor:pointer;z-index:1; }
          .${p}-stage.open .${p}-btn { left:150px; }
        `);
        const stage = h("div", `${p}-stage`);
        const menu = h("div", `${p}-menu`);
        ["🏠 ホーム", "🗺 マップ", "🛒 ショップ", "⚙ 設定"].forEach(t => menu.append(h("div", "", t)));
        const btn = makeBtn("☰ メニュー", `${p}-btn`);
        btn.addEventListener("click", () => stage.classList.toggle("open"));
        stage.append(btn, menu);
        c.append(stage);
      },
      code: {
        css: `.menu {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 200px;
  background: #1e293b;
  color: #fff;
  transform: translateX(-100%);
  transition: transform 0.35s ease;
}

.stage.open .menu {
  transform: translateX(0);
}`,
        html: `<div class="stage">
  <button onclick="toggle()">☰ メニュー</button>
  <nav class="menu">
    <a>🏠 ホーム</a>
    <a>🗺 マップ</a>
  </nav>
</div>`,
        js: `function toggle() {
  document.querySelector('.stage')
    .classList.toggle('open');
}`
      }
    },
    {
      title: "上から通知バナー",
      desc: "画面上部から通知がスルッと降りてくるスライドダウン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:140px;overflow:hidden;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb; }
          .${p}-banner { position:absolute;top:0;left:0;right:0;padding:10px 14px;background:#0f766e;color:#fff;font-size:.8rem;font-weight:600;text-align:center;
            transform:translateY(-100%);transition:transform .4s ease; }
          .${p}-stage.show .${p}-banner { transform:translateY(0); }
          .${p}-btn { position:absolute;bottom:10px;left:50%;transform:translateX(-50%);padding:6px 14px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#0f766e;color:#fff;cursor:pointer; }
        `);
        const stage = h("div", `${p}-stage`);
        const banner = h("div", `${p}-banner`, "🎉 レベルアップしました！");
        const btn = makeBtn("通知を表示", `${p}-btn`);
        btn.addEventListener("click", () => {
          stage.classList.remove("show");
          void stage.offsetWidth;
          stage.classList.add("show");
          setTimeout(() => stage.classList.remove("show"), 2000);
        });
        stage.append(banner, btn);
        c.append(stage);
      },
      code: {
        css: `.banner {
  position: absolute;
  top: 0; left: 0; right: 0;
  background: #0f766e;
  color: #fff;
  padding: 10px;
  text-align: center;
  transform: translateY(-100%);
  transition: transform 0.4s ease;
}

.stage.show .banner {
  transform: translateY(0);
}`,
        html: `<div class="stage">
  <div class="banner">
    🎉 レベルアップしました！
  </div>
  <button onclick="showBanner()">通知を表示</button>
</div>`,
        js: `function showBanner() {
  const stage = document.querySelector('.stage');
  stage.classList.add('show');
  setTimeout(() => {
    stage.classList.remove('show');
  }, 2000);
}`
      }
    },
    {
      title: "下からボトムシート",
      desc: "スマホアプリでよくある、下からせり上がるパネル。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:180px;overflow:hidden;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb; }
          .${p}-sheet { position:absolute;bottom:0;left:0;right:0;height:120px;background:#fff;border-top:1px solid #e5e7eb;
            border-radius:14px 14px 0 0;padding:14px;box-shadow:0 -4px 20px rgba(0,0,0,.08);
            transform:translateY(100%);transition:transform .35s cubic-bezier(.33,1,.68,1); }
          .${p}-stage.open .${p}-sheet { transform:translateY(0); }
          .${p}-handle { width:36px;height:4px;background:#d1d5db;border-radius:2px;margin:0 auto 10px; }
          .${p}-btn { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:8px 16px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#8b5cf6;color:#fff;cursor:pointer; }
          .${p}-row { display:flex;gap:10px;justify-content:center;margin-top:6px; }
          .${p}-opt { padding:8px 14px;font-size:.7rem;font-weight:600;border:1px solid #e5e7eb;border-radius:6px;background:#f9fafb;cursor:pointer; }
        `);
        const stage = h("div", `${p}-stage`);
        const sheet = h("div", `${p}-sheet`);
        sheet.append(h("div", `${p}-handle`));
        sheet.append(h("p", "", "共有方法を選択"));
        const row = h("div", `${p}-row`);
        ["📋 コピー", "📧 メール", "💬 LINE"].forEach(t => row.append(h("div", `${p}-opt`, t)));
        sheet.append(row);
        const btn = makeBtn("共有メニュー", `${p}-btn`);
        btn.addEventListener("click", () => stage.classList.toggle("open"));
        stage.append(btn, sheet);
        c.append(stage);
      },
      code: {
        css: `.bottom-sheet {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: #fff;
  border-radius: 14px 14px 0 0;
  box-shadow: 0 -4px 20px rgba(0,0,0,.08);
  transform: translateY(100%);
  transition: transform 0.35s
    cubic-bezier(.33, 1, .68, 1);
}

.stage.open .bottom-sheet {
  transform: translateY(0);
}`,
        html: `<div class="stage">
  <button onclick="toggle()">共有メニュー</button>
  <div class="bottom-sheet">
    <div class="handle"></div>
    <p>共有方法を選択</p>
    <div class="options">
      <span>📋 コピー</span>
      <span>📧 メール</span>
    </div>
  </div>
</div>`
      }
    }
  ];

  /* ==============================
     popup — ポップアップ
     ============================== */
  demos["popup"] = [
    {
      title: "トースト通知（右上）",
      desc: "操作完了時に一時的に表示され、自動で消える軽量な通知。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:140px;overflow:hidden;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb; }
          .${p}-toast { position:absolute;top:10px;right:10px;padding:10px 16px;background:#0f766e;color:#fff;border-radius:8px;font-size:.78rem;font-weight:600;
            box-shadow:0 4px 12px rgba(0,0,0,.15);opacity:0;transform:translateX(20px);transition:opacity .3s ease,transform .3s ease; }
          .${p}-toast.show { opacity:1;transform:translateX(0); }
          .${p}-btn { position:absolute;bottom:12px;left:50%;transform:translateX(-50%);padding:8px 16px;font-size:.78rem;font-weight:600;border:none;border-radius:6px;background:#0f766e;color:#fff;cursor:pointer; }
        `);
        const stage = h("div", `${p}-stage`);
        const toast = h("div", `${p}-toast`, "✅ 保存しました！");
        const btn = makeBtn("保存する", `${p}-btn`);
        btn.addEventListener("click", () => {
          toast.classList.remove("show");
          void toast.offsetWidth;
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 2000);
        });
        stage.append(toast, btn);
        c.append(stage);
      },
      code: {
        css: `.toast {
  position: fixed;
  top: 16px; right: 16px;
  padding: 10px 16px;
  background: #0f766e;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.3s, transform 0.3s;
}

.toast.show {
  opacity: 1;
  transform: translateX(0);
}`,
        html: `<div class="toast" id="toast">
  ✅ 保存しました！
</div>`,
        js: `function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => {
    t.classList.remove('show');
  }, 2000);
}`
      }
    },
    {
      title: "ツールチップ（ホバー）",
      desc: "要素にマウスを乗せると補足情報がふわっと表示される。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:16px;justify-content:center;flex-wrap:wrap; }
          .${p}-item { position:relative;padding:10px 18px;background:#1e293b;color:#fff;border-radius:6px;font-size:.8rem;font-weight:600;cursor:default; }
          .${p}-tip { position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%) scale(.9);
            padding:6px 12px;background:#374151;color:#e5e7eb;border-radius:4px;font-size:.7rem;font-weight:400;white-space:nowrap;
            opacity:0;transition:opacity .2s ease,transform .2s ease;pointer-events:none; }
          .${p}-item:hover .${p}-tip { opacity:1;transform:translateX(-50%) scale(1); }
          .${p}-tip::after { content:"";position:absolute;top:100%;left:50%;margin-left:-4px;border:4px solid transparent;border-top-color:#374151; }
        `);
        const w = h("div", `${p}-wrap`);
        [["💾 保存","Ctrl + S で保存"],["📋 コピー","テキストをクリップボードへ"],["🗑 削除","元に戻せません"]].forEach(([label, tip]) => {
          const item = h("div", `${p}-item`);
          item.append(h("span", `${p}-tip`, tip));
          item.append(document.createTextNode(label));
          w.append(item);
        });
        c.append(w);
      },
      code: {
        css: `.tooltip-trigger {
  position: relative;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) scale(0.9);
  padding: 6px 12px;
  background: #374151;
  color: #e5e7eb;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
  pointer-events: none;
}

.tooltip-trigger:hover .tooltip {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}`,
        html: `<div class="tooltip-trigger">
  💾 保存
  <span class="tooltip">Ctrl + S で保存</span>
</div>`
      }
    },
    {
      title: "スナックバー（下部）",
      desc: "画面下部に表示されるアクション付きの通知バー。Undoなどの操作を提供。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:140px;overflow:hidden;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb; }
          .${p}-bar { position:absolute;bottom:10px;left:10px;right:10px;padding:10px 14px;background:#1e293b;color:#fff;border-radius:8px;
            display:flex;justify-content:space-between;align-items:center;font-size:.78rem;
            transform:translateY(calc(100% + 20px));transition:transform .35s cubic-bezier(.33,1,.68,1); }
          .${p}-bar.show { transform:translateY(0); }
          .${p}-undo { background:none;border:none;color:#60a5fa;font-size:.78rem;font-weight:700;cursor:pointer; }
          .${p}-btn { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:8px 16px;font-size:.78rem;font-weight:600;border:none;border-radius:6px;background:#ef4444;color:#fff;cursor:pointer; }
        `);
        const stage = h("div", `${p}-stage`);
        const bar = h("div", `${p}-bar`);
        bar.append(h("span", "", "アイテムを削除しました"));
        const undo = makeBtn("元に戻す", `${p}-undo`);
        undo.addEventListener("click", () => bar.classList.remove("show"));
        bar.append(undo);
        const btn = makeBtn("🗑 削除する", `${p}-btn`);
        btn.addEventListener("click", () => {
          bar.classList.remove("show");
          void bar.offsetWidth;
          bar.classList.add("show");
          setTimeout(() => bar.classList.remove("show"), 3000);
        });
        stage.append(bar, btn);
        c.append(stage);
      },
      code: {
        css: `.snackbar {
  position: fixed;
  bottom: 16px; left: 16px; right: 16px;
  max-width: 400px;
  padding: 12px 16px;
  background: #1e293b;
  color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(calc(100% + 30px));
  transition: transform 0.35s
    cubic-bezier(.33, 1, .68, 1);
}

.snackbar.show {
  transform: translateY(0);
}`,
        html: `<div class="snackbar" id="snack">
  <span>アイテムを削除しました</span>
  <button class="undo">元に戻す</button>
</div>`,
        js: `function showSnackbar() {
  const s = document.getElementById('snack');
  s.classList.add('show');
  setTimeout(() => {
    s.classList.remove('show');
  }, 3000);
}`
      }
    }
  ];

  /* ==============================
     hover — ホバーエフェクト
     ============================== */
  demos["hover"] = [
    {
      title: "スケールアップ（拡大）",
      desc: "マウスを乗せると要素が少し大きくなる。ボタンやカードに最適。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-grid { display:flex;gap:12px;flex-wrap:wrap;justify-content:center; }
          .${p}-card { width:100px;height:80px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;
            display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:600;color:#1e40af;cursor:pointer;
            transition:transform .25s ease; }
          .${p}-card:hover { transform:scale(1.1); }
        `);
        const g = h("div", `${p}-grid`);
        ["🎮 プレイ", "🏆 ランク", "⚙ 設定"].forEach(t => g.append(h("div", `${p}-card`, t)));
        c.append(g);
      },
      code: {
        css: `.card {
  transition: transform 0.25s ease;
}

.card:hover {
  transform: scale(1.1);
}`,
        html: `<div class="card">🎮 プレイ</div>
<div class="card">🏆 ランク</div>
<div class="card">⚙ 設定</div>`
      }
    },
    {
      title: "影が深くなる（カードリフト）",
      desc: "ホバーで影が大きくなり、浮き上がるように見える立体感のある効果。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { padding:16px 20px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;
            box-shadow:0 1px 3px rgba(0,0,0,.06);cursor:pointer;max-width:200px;margin:0 auto;
            transition:transform .3s ease,box-shadow .3s ease; }
          .${p}-card:hover { transform:translateY(-4px);box-shadow:0 12px 28px rgba(0,0,0,.12); }
          .${p}-title { font-size:.9rem;font-weight:700;margin-bottom:4px; }
          .${p}-sub { font-size:.75rem;color:#6b7280; }
        `);
        const card = h("div", `${p}-card`);
        card.append(h("p", `${p}-title`, "📦 新アイテム入荷"), h("p", `${p}-sub`, "レアアイテムを確認しよう"));
        c.append(card);
      },
      code: {
        css: `.card {
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  transition: transform 0.3s ease,
              box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0,0,0,.12);
}`,
        html: `<div class="card">
  <p class="title">📦 新アイテム入荷</p>
  <p class="sub">レアアイテムを確認しよう</p>
</div>`
      }
    },
    {
      title: "下線スライドイン（ナビリンク）",
      desc: "ナビゲーションリンクにホバーすると下線が左からスライドして現れる。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-nav { display:flex;gap:20px;justify-content:center; }
          .${p}-link { position:relative;font-size:.85rem;font-weight:600;color:#374151;cursor:pointer;padding-bottom:4px; }
          .${p}-link::after { content:"";position:absolute;bottom:0;left:0;width:0;height:2px;background:#8b5cf6;transition:width .3s ease; }
          .${p}-link:hover::after { width:100%; }
        `);
        const nav = h("div", `${p}-nav`);
        ["ホーム", "機能", "料金", "お問い合わせ"].forEach(t => nav.append(h("span", `${p}-link`, t)));
        c.append(nav);
      },
      code: {
        css: `.nav-link {
  position: relative;
  padding-bottom: 4px;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #8b5cf6;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}`,
        html: `<nav>
  <a class="nav-link">ホーム</a>
  <a class="nav-link">機能</a>
  <a class="nav-link">料金</a>
</nav>`
      }
    }
  ];

  /* ==============================
     microinteraction — マイクロインタラクション
     ============================== */
  demos["microinteraction"] = [
    {
      title: "いいねボタン（ハートが弾む）",
      desc: "押すとハートが一瞬大きくなって弾む、SNSでおなじみのリアクション。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-btn { font-size:1.6rem;background:none;border:2px solid #e5e7eb;border-radius:50%;width:56px;height:56px;cursor:pointer;
            transition:border-color .2s; display:flex;align-items:center;justify-content:center;margin:0 auto; }
          .${p}-btn.liked { border-color:#ef4444; }
          .${p}-heart { display:inline-block;transition:transform .1s ease; }
          .${p}-btn.liked .${p}-heart { animation:${p}-pop .35s ease; }
          @keyframes ${p}-pop { 0%{transform:scale(1)} 40%{transform:scale(1.4)} 100%{transform:scale(1)} }
        `);
        let liked = false;
        const btn = h("button", `${p}-btn`);
        const heart = h("span", `${p}-heart`, "🤍");
        btn.append(heart);
        btn.addEventListener("click", () => {
          liked = !liked;
          heart.textContent = liked ? "❤️" : "🤍";
          btn.classList.toggle("liked", liked);
          if (liked) {
            heart.style.animation = "none";
            void heart.offsetWidth;
            heart.style.animation = "";
          }
        });
        c.append(btn);
      },
      code: {
        css: `@keyframes pop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.4); }
  100% { transform: scale(1); }
}

.like-btn.liked .heart {
  animation: pop 0.35s ease;
}`,
        html: `<button class="like-btn" id="likeBtn">
  <span class="heart">🤍</span>
</button>`,
        js: `const btn = document.getElementById('likeBtn');
let liked = false;
btn.addEventListener('click', () => {
  liked = !liked;
  btn.querySelector('.heart')
    .textContent = liked ? '❤️' : '🤍';
  btn.classList.toggle('liked', liked);
});`
      }
    },
    {
      title: "送信ボタン → 完了チェック",
      desc: "ボタンを押すと「送信中...」→「✓完了」に変わるフィードバック。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-btn { padding:10px 28px;font-size:.85rem;font-weight:600;border:none;border-radius:8px;background:#3b82f6;color:#fff;cursor:pointer;
            transition:background .3s ease,transform .1s ease;min-width:140px;margin:0 auto;display:block; }
          .${p}-btn:active { transform:scale(.96); }
          .${p}-btn.loading { background:#64748b;cursor:wait; }
          .${p}-btn.done { background:#22c55e; }
        `);
        const btn = makeBtn("送信する", `${p}-btn`);
        btn.addEventListener("click", () => {
          if (btn.classList.contains("loading")) return;
          btn.classList.add("loading");
          btn.textContent = "送信中...";
          setTimeout(() => {
            btn.classList.remove("loading");
            btn.classList.add("done");
            btn.textContent = "✓ 完了！";
            setTimeout(() => {
              btn.classList.remove("done");
              btn.textContent = "送信する";
            }, 1500);
          }, 1200);
        });
        c.append(btn);
      },
      code: {
        css: `.submit-btn {
  padding: 10px 28px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  transition: background 0.3s, transform 0.1s;
}

.submit-btn:active { transform: scale(0.96); }
.submit-btn.loading { background: #64748b; }
.submit-btn.done { background: #22c55e; }`,
        html: `<button class="submit-btn" id="submitBtn">
  送信する
</button>`,
        js: `const btn = document.getElementById('submitBtn');
btn.addEventListener('click', () => {
  btn.classList.add('loading');
  btn.textContent = '送信中...';
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.classList.add('done');
    btn.textContent = '✓ 完了！';
  }, 1200);
});`
      }
    },
    {
      title: "リップルエフェクト（波紋）",
      desc: "ボタンをクリックした位置から波紋が広がる、マテリアルデザイン風のフィードバック。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-btn { position:relative;overflow:hidden;padding:14px 32px;font-size:.85rem;font-weight:600;border:none;border-radius:8px;
            background:#8b5cf6;color:#fff;cursor:pointer;margin:0 auto;display:block; }
          .${p}-ripple { position:absolute;border-radius:50%;background:rgba(255,255,255,.4);
            transform:scale(0);animation:${p}-rp .5s ease-out forwards;pointer-events:none; }
          @keyframes ${p}-rp { to{transform:scale(4);opacity:0} }
        `);
        const btn = makeBtn("クリックしてみて", `${p}-btn`);
        btn.addEventListener("click", (e) => {
          const rect = btn.getBoundingClientRect();
          const ripple = h("span", `${p}-ripple`);
          const size = Math.max(rect.width, rect.height);
          ripple.style.width = ripple.style.height = size + "px";
          ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
          ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
          btn.append(ripple);
          setTimeout(() => ripple.remove(), 500);
        });
        c.append(btn);
      },
      code: {
        css: `.ripple-btn {
  position: relative;
  overflow: hidden;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  transform: scale(0);
  animation: ripple 0.5s ease-out forwards;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}`,
        html: `<button class="ripple-btn" id="btn">
  クリックしてみて
</button>`,
        js: `btn.addEventListener('click', (e) => {
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
  btn.append(ripple);
  setTimeout(() => ripple.remove(), 500);
});`
      }
    }
  ];

  /* ==============================
     particle — パーティクル
     ============================== */
  demos["particle"] = [
    {
      title: "クリック爆発エフェクト",
      desc: "クリックした場所から色とりどりの粒子が放射状に飛び散る。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-zone { width:100%;height:140px;background:#0f172a;border-radius:8px;cursor:crosshair;position:relative;overflow:hidden;
            display:flex;align-items:center;justify-content:center;color:#475569;font-size:.75rem; }
          .${p}-p { position:absolute;width:6px;height:6px;border-radius:50%;pointer-events:none;
            animation:${p}-fly .6s ease-out forwards; }
          @keyframes ${p}-fly { to{opacity:0;transform:translate(var(--tx),var(--ty)) scale(0)} }
        `);
        const zone = h("div", `${p}-zone`, "クリックで爆発！");
        zone.addEventListener("click", (e) => {
          const rect = zone.getBoundingClientRect();
          const x = e.clientX - rect.left, y = e.clientY - rect.top;
          for (let i = 0; i < 14; i++) {
            const dot = h("i", `${p}-p`);
            dot.style.left = x + "px";
            dot.style.top = y + "px";
            dot.style.setProperty("--tx", `${(Math.random() - .5) * 120}px`);
            dot.style.setProperty("--ty", `${(Math.random() - .5) * 100}px`);
            dot.style.background = `hsl(${Math.random() * 360},80%,60%)`;
            zone.append(dot);
            setTimeout(() => dot.remove(), 600);
          }
        });
        c.append(zone);
      },
      code: {
        css: `@keyframes fly {
  to {
    opacity: 0;
    transform: translate(var(--tx), var(--ty)) scale(0);
  }
}

.particle {
  position: absolute;
  width: 6px; height: 6px;
  border-radius: 50%;
  animation: fly 0.6s ease-out forwards;
}`,
        html: `<div class="zone" id="zone">
  クリックで爆発！
</div>`,
        js: `zone.addEventListener('click', (e) => {
  const rect = zone.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  for (let i = 0; i < 14; i++) {
    const dot = document.createElement('i');
    dot.className = 'particle';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    dot.style.setProperty('--tx',
      \`\${(Math.random()-.5)*120}px\`);
    dot.style.setProperty('--ty',
      \`\${(Math.random()-.5)*100}px\`);
    dot.style.background =
      \`hsl(\${Math.random()*360},80%,60%)\`;
    zone.append(dot);
    setTimeout(() => dot.remove(), 600);
  }
});`
      }
    },
    {
      title: "紙吹雪（confetti）",
      desc: "ボタンを押すと上から紙吹雪が降ってくるお祝い演出。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:160px;overflow:hidden;border:1px solid #e5e7eb;border-radius:8px;background:#fefce8; }
          .${p}-conf { position:absolute;width:8px;height:8px;top:-10px;pointer-events:none;
            animation:${p}-fall 1.5s ease-in forwards; }
          @keyframes ${p}-fall { to{top:170px;opacity:.3;transform:rotate(720deg)} }
          .${p}-btn { position:absolute;bottom:12px;left:50%;transform:translateX(-50%);padding:8px 18px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#eab308;color:#fff;cursor:pointer;z-index:1; }
        `);
        const stage = h("div", `${p}-stage`);
        const btn = makeBtn("🎉 お祝い！", `${p}-btn`);
        btn.addEventListener("click", () => {
          for (let i = 0; i < 30; i++) {
            const conf = h("div", `${p}-conf`);
            conf.style.left = Math.random() * 100 + "%";
            conf.style.animationDelay = Math.random() * 0.5 + "s";
            conf.style.animationDuration = (1 + Math.random()) + "s";
            conf.style.background = `hsl(${Math.random() * 360},85%,55%)`;
            conf.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
            stage.append(conf);
            setTimeout(() => conf.remove(), 2000);
          }
        });
        stage.append(btn);
        c.append(stage);
      },
      code: {
        css: `@keyframes fall {
  to {
    top: 100%;
    opacity: 0.3;
    transform: rotate(720deg);
  }
}

.confetti {
  position: absolute;
  width: 8px; height: 8px;
  top: -10px;
  animation: fall 1.5s ease-in forwards;
}`,
        html: `<div class="stage" id="stage">
  <button onclick="celebrate()">🎉 お祝い！</button>
</div>`,
        js: `function celebrate() {
  const stage = document.getElementById('stage');
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random()*100 + '%';
    c.style.animationDelay = Math.random()*0.5 + 's';
    c.style.background =
      \`hsl(\${Math.random()*360},85%,55%)\`;
    stage.append(c);
    setTimeout(() => c.remove(), 2000);
  }
}`
      }
    },
    {
      title: "上昇する泡（バブル）",
      desc: "下から泡がふわふわと浮かび上がる背景演出。水中や幻想的なシーンに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-tank { position:relative;width:100%;height:160px;overflow:hidden;border-radius:8px;
            background:linear-gradient(to top,#1e3a8a,#3b82f6); }
          .${p}-bubble { position:absolute;bottom:-20px;border-radius:50%;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);
            animation:${p}-rise 3s ease-in infinite;pointer-events:none; }
          @keyframes ${p}-rise { to{bottom:170px;opacity:0;transform:translateX(20px)} }
        `);
        const tank = h("div", `${p}-tank`);
        for (let i = 0; i < 8; i++) {
          const b = h("div", `${p}-bubble`);
          const size = 10 + Math.random() * 20;
          b.style.width = b.style.height = size + "px";
          b.style.left = Math.random() * 90 + "%";
          b.style.animationDelay = Math.random() * 3 + "s";
          b.style.animationDuration = (2 + Math.random() * 2) + "s";
          tank.append(b);
        }
        c.append(tank);
      },
      code: {
        css: `@keyframes rise {
  to {
    bottom: 100%;
    opacity: 0;
    transform: translateX(20px);
  }
}

.bubble {
  position: absolute;
  bottom: -20px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.2);
  animation: rise 3s ease-in infinite;
}

.tank {
  background: linear-gradient(to top, #1e3a8a, #3b82f6);
  overflow: hidden;
}`,
        html: `<div class="tank">
  <div class="bubble" style="width:15px;height:15px;left:20%;animation-delay:0s"></div>
  <div class="bubble" style="width:25px;height:25px;left:60%;animation-delay:1s"></div>
  <!-- ... more bubbles -->
</div>`
      }
    }
  ];

  /* ==============================
     shake — シェイク
     ============================== */
  demos["shake"] = [
    {
      title: "水平シェイク（エラー表示）",
      desc: "入力エラー時に入力欄が左右にブルッと震える定番エフェクト。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-input { padding:10px 14px;border:2px solid #e5e7eb;border-radius:6px;font-size:.85rem;width:200px;outline:none; }
          .${p}-input.error { border-color:#ef4444;animation:${p}-shake .4s ease; }
          @keyframes ${p}-shake { 10%,90%{transform:translateX(-2px)} 20%,80%{transform:translateX(3px)} 30%,50%,70%{transform:translateX(-4px)} 40%,60%{transform:translateX(4px)} }
          .${p}-btn { margin-top:10px;padding:8px 18px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#ef4444;color:#fff;cursor:pointer; }
          .${p}-msg { font-size:.75rem;color:#ef4444;margin-top:6px;min-height:1.2em; }
        `);
        const w = h("div", `${p}-wrap`);
        const input = h("input", `${p}-input`);
        input.placeholder = "名前を入力...";
        const msg = h("p", `${p}-msg`);
        const btn = makeBtn("送信", `${p}-btn`);
        btn.addEventListener("click", () => {
          if (!input.value.trim()) {
            input.classList.remove("error");
            void input.offsetWidth;
            input.classList.add("error");
            msg.textContent = "名前を入力してください！";
          } else {
            input.classList.remove("error");
            msg.textContent = "";
          }
        });
        w.append(input, h("br"), btn, msg);
        c.append(w);
      },
      code: {
        css: `@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(3px); }
  30%, 50%, 70% { transform: translateX(-4px); }
  40%, 60% { transform: translateX(4px); }
}

.input.error {
  border-color: #ef4444;
  animation: shake 0.4s ease;
}`,
        html: `<input class="input" id="nameInput"
       placeholder="名前を入力..." />
<button onclick="validate()">送信</button>`,
        js: `function validate() {
  const input = document.getElementById('nameInput');
  if (!input.value.trim()) {
    input.classList.remove('error');
    void input.offsetWidth; // リセット
    input.classList.add('error');
  }
}`
      }
    },
    {
      title: "画面全体の振動（衝撃）",
      desc: "ダメージを受けた時など、画面全体がガタガタ揺れる演出。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-screen { width:100%;height:140px;background:#1e293b;border-radius:8px;display:flex;align-items:center;justify-content:center;
            flex-direction:column;gap:8px;color:#fff;position:relative; }
          .${p}-screen.shake { animation:${p}-rumble .3s ease; }
          @keyframes ${p}-rumble { 0%{transform:translate(0)} 20%{transform:translate(-3px,2px)} 40%{transform:translate(3px,-2px)} 60%{transform:translate(-2px,3px)} 80%{transform:translate(2px,-1px)} 100%{transform:translate(0)} }
          .${p}-hp { font-size:.9rem;font-weight:600; }
          .${p}-btn { padding:8px 18px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#ef4444;color:#fff;cursor:pointer; }
        `);
        const screen = h("div", `${p}-screen`);
        const hp = h("p", `${p}-hp`, "♥♥♥ HP: 100");
        let hpVal = 100;
        const btn = makeBtn("💥 ダメージ！", `${p}-btn`);
        btn.addEventListener("click", () => {
          hpVal = Math.max(0, hpVal - 20);
          hp.textContent = "♥".repeat(Math.ceil(hpVal / 34)) + " HP: " + hpVal;
          screen.classList.remove("shake");
          void screen.offsetWidth;
          screen.classList.add("shake");
        });
        screen.append(hp, btn);
        c.append(screen);
      },
      code: {
        css: `@keyframes rumble {
  0%   { transform: translate(0); }
  20%  { transform: translate(-3px, 2px); }
  40%  { transform: translate(3px, -2px); }
  60%  { transform: translate(-2px, 3px); }
  80%  { transform: translate(2px, -1px); }
  100% { transform: translate(0); }
}

.screen.shake {
  animation: rumble 0.3s ease;
}`,
        html: `<div class="screen" id="screen">
  <p id="hp">♥♥♥ HP: 100</p>
  <button onclick="damage()">💥 ダメージ！</button>
</div>`,
        js: `function damage() {
  const screen = document.getElementById('screen');
  screen.classList.remove('shake');
  void screen.offsetWidth;
  screen.classList.add('shake');
}`
      }
    },
    {
      title: "回転ウォブル（揺れ）",
      desc: "要素が小さく左右に回転して揺れる。注意喚起のアイコンや警告に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-icon { font-size:2.5rem;display:inline-block;cursor:pointer; }
          .${p}-icon.wobble { animation:${p}-wobble .5s ease; }
          @keyframes ${p}-wobble { 0%{transform:rotate(0)} 15%{transform:rotate(12deg)} 30%{transform:rotate(-10deg)} 45%{transform:rotate(6deg)} 60%{transform:rotate(-4deg)} 75%{transform:rotate(2deg)} 100%{transform:rotate(0)} }
          .${p}-text { font-size:.8rem;color:#6b7280;margin-top:6px; }
        `);
        const w = h("div", `${p}-wrap`);
        const icon = h("span", `${p}-icon`, "🔔");
        icon.addEventListener("click", () => {
          icon.classList.remove("wobble");
          void icon.offsetWidth;
          icon.classList.add("wobble");
        });
        w.append(icon, h("p", `${p}-text`, "ベルをクリックで揺れる"));
        c.append(w);
      },
      code: {
        css: `@keyframes wobble {
  0%   { transform: rotate(0); }
  15%  { transform: rotate(12deg); }
  30%  { transform: rotate(-10deg); }
  45%  { transform: rotate(6deg); }
  60%  { transform: rotate(-4deg); }
  75%  { transform: rotate(2deg); }
  100% { transform: rotate(0); }
}

.bell.wobble {
  animation: wobble 0.5s ease;
}`,
        html: `<span class="bell" id="bell">🔔</span>`,
        js: `bell.addEventListener('click', () => {
  bell.classList.remove('wobble');
  void bell.offsetWidth; // リセット
  bell.classList.add('wobble');
});`
      }
    }
  ];

  /* ==============================
     flash — フラッシュ
     ============================== */
  demos["flash"] = [
    {
      title: "点滅（blink）",
      desc: "要素が明滅を繰り返す。ゲームの無敵状態やカーソルの表現に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;align-items:center;gap:16px;justify-content:center; }
          .${p}-char { font-size:2rem;animation:${p}-blink .6s step-end infinite; }
          @keyframes ${p}-blink { 0%,100%{opacity:1} 50%{opacity:0} }
          .${p}-label { font-size:.8rem;font-weight:600;color:#6b7280; }
        `);
        const w = h("div", `${p}-wrap`);
        w.append(h("span", `${p}-char`, "🛡"), h("span", `${p}-label`, "無敵状態 あと3秒..."));
        c.append(w);
      },
      code: {
        css: `@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.invincible {
  animation: blink 0.6s step-end infinite;
}`,
        html: `<span class="invincible">🛡</span>
<span>無敵状態 あと3秒...</span>`
      }
    },
    {
      title: "背景フラッシュ（更新ハイライト）",
      desc: "データが更新された行を一瞬黄色く光らせて変更を知らせる。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-table { width:100%;font-size:.8rem;border-collapse:collapse; }
          .${p}-table td { padding:8px 12px;border-bottom:1px solid #e5e7eb; }
          .${p}-row.flash { animation:${p}-highlight 1s ease; }
          @keyframes ${p}-highlight { 0%{background:#fef08a} 100%{background:transparent} }
          .${p}-btn { margin-top:10px;padding:6px 14px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#f59e0b;color:#fff;cursor:pointer; }
        `);
        const table = h("table", `${p}-table`);
        const rows = [["スコア", "12,450"], ["ランク", "A"], ["コンボ", "x15"]];
        const rowEls = rows.map(([k, v]) => {
          const tr = h("tr", `${p}-row`);
          tr.append(h("td", "", k), h("td", "", v));
          table.append(tr);
          return tr;
        });
        const btn = makeBtn("スコア更新！", `${p}-btn`);
        btn.addEventListener("click", () => {
          const row = rowEls[0];
          row.lastChild.textContent = (parseInt(row.lastChild.textContent.replace(/,/g, "")) + 100).toLocaleString();
          row.classList.remove("flash");
          void row.offsetWidth;
          row.classList.add("flash");
        });
        c.style.display = "block";
        c.append(table, btn);
      },
      code: {
        css: `@keyframes highlight {
  0%   { background: #fef08a; }
  100% { background: transparent; }
}

.row.flash {
  animation: highlight 1s ease;
}`,
        html: `<table>
  <tr class="row" id="scoreRow">
    <td>スコア</td>
    <td id="score">12,450</td>
  </tr>
</table>
<button onclick="update()">スコア更新！</button>`,
        js: `function update() {
  const row = document.getElementById('scoreRow');
  row.classList.remove('flash');
  void row.offsetWidth; // リセット
  row.classList.add('flash');
}`
      }
    },
    {
      title: "ボーダーグロー（フォーカス）",
      desc: "入力欄にフォーカスするとボーダーが光って脈動する。集中を促す演出。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-input { padding:12px 16px;font-size:.85rem;border:2px solid #e5e7eb;border-radius:8px;outline:none;width:220px;
            transition:border-color .2s; }
          .${p}-input:focus { border-color:#8b5cf6;animation:${p}-glow 1.5s ease-in-out infinite; }
          @keyframes ${p}-glow { 0%,100%{box-shadow:0 0 4px rgba(139,92,246,.2)} 50%{box-shadow:0 0 16px rgba(139,92,246,.5)} }
          .${p}-hint { font-size:.7rem;color:#9ca3af;margin-top:6px; }
        `);
        const w = h("div", `${p}-wrap`);
        const input = h("input", `${p}-input`);
        input.placeholder = "クリックしてフォーカス";
        w.append(input, h("p", `${p}-hint`, "フォーカス中にボーダーが脈動する"));
        c.append(w);
      },
      code: {
        css: `@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 4px rgba(139,92,246,.2);
  }
  50% {
    box-shadow: 0 0 16px rgba(139,92,246,.5);
  }
}

.input:focus {
  border-color: #8b5cf6;
  animation: glow 1.5s ease-in-out infinite;
}`,
        html: `<input class="input"
       placeholder="クリックしてフォーカス" />`
      }
    }
  ];

  /* ==============================
     easing — イージング
     ============================== */
  demos["easing"] = [
    {
      title: "基本4種の比較",
      desc: "linear / ease-in / ease-out / ease-in-out を同時に動かして違いを見る。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-lanes { display:flex;flex-direction:column;gap:6px;width:100%; }
          .${p}-lane { display:flex;align-items:center;gap:8px;font-size:.7rem;font-weight:600;color:#6b7280; }
          .${p}-label { width:80px;text-align:right;flex-shrink:0; }
          .${p}-track { flex:1;height:24px;background:#f1f5f9;border-radius:4px;position:relative;overflow:hidden; }
          .${p}-ball { width:24px;height:24px;border-radius:50%;position:absolute;left:0;top:0; }
          .${p}-btn { margin-top:10px;padding:6px 14px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#3b82f6;color:#fff;cursor:pointer;align-self:center; }
        `);
        const lanes = h("div", `${p}-lanes`);
        const easings = [
          ["linear", "#64748b"],
          ["ease-in", "#3b82f6"],
          ["ease-out", "#8b5cf6"],
          ["ease-in-out", "#ec4899"]
        ];
        const balls = [];
        easings.forEach(([name, color]) => {
          const lane = h("div", `${p}-lane`);
          const label = h("span", `${p}-label`, name);
          const track = h("div", `${p}-track`);
          const ball = h("div", `${p}-ball`);
          ball.style.background = color;
          track.append(ball);
          lane.append(label, track);
          lanes.append(lane);
          balls.push(ball);
        });
        const btn = makeBtn("▶ 再生", `${p}-btn`);
        btn.addEventListener("click", () => {
          balls.forEach((b, i) => {
            b.style.transition = "none";
            b.style.left = "0";
            void b.offsetWidth;
            b.style.transition = `left 1.5s ${easings[i][0]}`;
            b.style.left = "calc(100% - 24px)";
          });
        });
        c.style.display = "flex";
        c.style.flexDirection = "column";
        c.append(lanes, btn);
      },
      code: {
        css: `.ball-linear {
  transition: left 1.5s linear;
}
.ball-ease-in {
  transition: left 1.5s ease-in;
}
.ball-ease-out {
  transition: left 1.5s ease-out;
}
.ball-ease-in-out {
  transition: left 1.5s ease-in-out;
}`,
        html: `<div class="track">
  <div class="ball ball-linear"></div>
</div>
<div class="track">
  <div class="ball ball-ease-in"></div>
</div>
<!-- ... -->`,
        js: `function play() {
  document.querySelectorAll('.ball')
    .forEach(ball => {
      ball.style.left = '0';
      void ball.offsetWidth;
      ball.style.left = 'calc(100% - 24px)';
    });
}`
      }
    },
    {
      title: "バウンス風カスタムカーブ",
      desc: "cubic-bezierを使って跳ね返りのような動きを作る。オーバーシュート効果。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-box { width:70px;height:70px;background:#8b5cf6;border-radius:10px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;
            color:#fff;font-size:1.6rem;cursor:pointer;transition:transform .6s cubic-bezier(.34,1.56,.64,1); }
          .${p}-box:hover { transform:scale(1.3); }
          .${p}-code { font-size:.7rem;color:#8b5cf6;font-family:monospace;margin-top:4px; }
        `);
        const w = h("div", `${p}-wrap`);
        const box = h("div", `${p}-box`, "⭐");
        w.append(box, h("p", `${p}-code`, "cubic-bezier(.34, 1.56, .64, 1)"));
        c.append(w);
      },
      code: {
        css: `.bounce-box {
  transition: transform 0.6s
    cubic-bezier(.34, 1.56, .64, 1);
}

.bounce-box:hover {
  transform: scale(1.3);
}

/*
 * cubic-bezier(.34, 1.56, .64, 1)
 * → y > 1 で目標を超えてから戻る
 * → 跳ね返り・バウンスの動き
 */`,
        html: `<div class="bounce-box">⭐</div>`
      }
    },
    {
      title: "steps() でコマ送り",
      desc: "steps()を使うとなめらかでなくカクカクした段階的な動きになる。ドット絵アニメに最適。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:24px;align-items:flex-end;justify-content:center; }
          .${p}-col { text-align:center; }
          .${p}-bar { width:20px;background:#3b82f6;border-radius:4px 4px 0 0;animation:${p}-grow 2s infinite; }
          .${p}-bar.steps { animation-timing-function:steps(5);background:#ec4899; }
          .${p}-bar.smooth { animation-timing-function:ease-in-out; }
          @keyframes ${p}-grow { 0%,100%{height:20px} 50%{height:90px} }
          .${p}-label { font-size:.65rem;font-weight:600;color:#6b7280;margin-top:6px; }
        `);
        const w = h("div", `${p}-wrap`);
        [["smooth", "ease-in-out", "#3b82f6"], ["steps", "steps(5)", "#ec4899"]].forEach(([cls, label, bg]) => {
          const col = h("div", `${p}-col`);
          const bar = h("div", `${p}-bar ${cls}`);
          bar.style.background = bg;
          col.append(bar, h("p", `${p}-label`, label));
          w.append(col);
        });
        c.append(w);
      },
      code: {
        css: `@keyframes grow {
  0%, 100% { height: 20px; }
  50% { height: 90px; }
}

/* なめらか */
.bar-smooth {
  animation: grow 2s ease-in-out infinite;
}

/* コマ送り（5段階） */
.bar-steps {
  animation: grow 2s steps(5) infinite;
}

/*
 * steps(N) は N段階で切り替わる
 * スプライトアニメやドット絵に最適
 */`,
        html: `<div class="bar bar-smooth"></div>
<div class="bar bar-steps"></div>`
      }
    }
  ];

  window.multiDemos = Object.assign(window.multiDemos || {}, demos);
})();
