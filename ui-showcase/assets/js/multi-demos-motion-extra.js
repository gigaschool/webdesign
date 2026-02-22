/* ==========================================================================
   Multi-Demo Extra — 動き・演出の追加見本 (各用語に+2で計5個に)
   ========================================================================== */
(function () {
  let uid = 900;
  function id() { return "me" + (++uid); }

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
    b.className = cls || "me-btn";
    b.textContent = text;
    return b;
  }

  const demos = window.multiDemos;
  if (!demos) return;

  /* ==============================
     animation — 追加2つ
     ============================== */
  demos["animation"].push(
    {
      title: "タイプライター（typewriter）",
      desc: "文字が一文字ずつ表示される演出。タイトルや会話シーンに。steps()とwidth変化で実現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-text { font-family:monospace;font-size:1.1rem;font-weight:700;white-space:nowrap;overflow:hidden;
            border-right:2px solid #111;width:0;animation:${p}-type 2s steps(14) 0.5s forwards,${p}-blink .6s step-end infinite; }
          @keyframes ${p}-type { to{width:14ch} }
          @keyframes ${p}-blink { 50%{border-color:transparent} }
        `);
        c.append(h("p", `${p}-text`, "Hello, World!!"));
      },
      code: {
        css: `@keyframes typewriter {
  to { width: 14ch; }
}
@keyframes blink-caret {
  50% { border-color: transparent; }
}

.typewriter {
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid #111;
  width: 0;
  animation:
    typewriter 2s steps(14) 0.5s forwards,
    blink-caret 0.6s step-end infinite;
}`,
        html: `<p class="typewriter">Hello, World!!</p>`
      }
    },
    {
      title: "フローティング（浮遊）",
      desc: "要素がゆらゆらと浮かぶ演出。キャラクターやアイコンに夢のような雰囲気を与える。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-icon { font-size:2.4rem;display:inline-block;animation:${p}-float 2.5s ease-in-out infinite; }
          @keyframes ${p}-float { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-14px) rotate(2deg)} }
          .${p}-shadow { width:40px;height:8px;background:rgba(0,0,0,.1);border-radius:50%;margin:8px auto 0;
            animation:${p}-shrink 2.5s ease-in-out infinite; }
          @keyframes ${p}-shrink { 0%,100%{transform:scaleX(1);opacity:.3} 50%{transform:scaleX(.6);opacity:.15} }
        `);
        const w = h("div", `${p}-wrap`);
        w.append(h("div", `${p}-icon`, "👻"), h("div", `${p}-shadow`));
        c.append(w);
      },
      code: {
        css: `@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-14px) rotate(2deg);
  }
}

.ghost {
  animation: float 2.5s ease-in-out infinite;
}

/* 地面の影もアニメーション */
@keyframes shadow-shrink {
  0%, 100% { transform: scaleX(1); opacity: .3; }
  50% { transform: scaleX(.6); opacity: .15; }
}`,
        html: `<div class="ghost">👻</div>
<div class="shadow"></div>`
      }
    }
  );

  /* ==============================
     transition — 追加2つ
     ============================== */
  demos["transition"].push(
    {
      title: "カードフリップ（裏返し）",
      desc: "クリックでカードが裏返しになる3D演出。rotateYとbackface-visibilityで実現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-scene { perspective:400px;width:120px;height:80px;margin:0 auto;cursor:pointer; }
          .${p}-card { width:100%;height:100%;position:relative;transition:transform .6s ease;transform-style:preserve-3d; }
          .${p}-scene.flipped .${p}-card { transform:rotateY(180deg); }
          .${p}-face { position:absolute;inset:0;backface-visibility:hidden;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700; }
          .${p}-front { background:#3b82f6;color:#fff; }
          .${p}-back { background:#f59e0b;color:#fff;transform:rotateY(180deg); }
        `);
        const scene = h("div", `${p}-scene`);
        const card = h("div", `${p}-card`);
        const front = h("div", `${p}-face ${p}-front`, "🃏 おもて");
        const back = h("div", `${p}-face ${p}-back`, "⭐ うら");
        card.append(front, back);
        scene.append(card);
        scene.addEventListener("click", () => scene.classList.toggle("flipped"));
        c.append(scene);
      },
      code: {
        css: `.flip-scene {
  perspective: 400px;
  cursor: pointer;
}

.flip-card {
  position: relative;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
}

.flip-scene.flipped .flip-card {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}

.face-back {
  transform: rotateY(180deg);
}`,
        html: `<div class="flip-scene" onclick="this.classList.toggle('flipped')">
  <div class="flip-card">
    <div class="face face-front">おもて</div>
    <div class="face face-back">うら</div>
  </div>
</div>`
      }
    },
    {
      title: "検索バーの展開",
      desc: "フォーカスすると入力欄がスルッと広がる。widthのtransitionで自然なUI。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;justify-content:center; }
          .${p}-input { width:140px;padding:8px 12px 8px 32px;border:2px solid #e5e7eb;border-radius:20px;font-size:.8rem;outline:none;
            background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E") 10px center no-repeat;
            transition:width .4s cubic-bezier(.33,1,.68,1),border-color .2s; }
          .${p}-input:focus { width:260px;border-color:#3b82f6; }
        `);
        const w = h("div", `${p}-wrap`);
        const input = h("input", `${p}-input`);
        input.placeholder = "検索...";
        w.append(input);
        c.append(w);
      },
      code: {
        css: `.search-input {
  width: 140px;
  padding: 8px 12px 8px 32px;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  outline: none;
  transition: width 0.4s cubic-bezier(.33,1,.68,1),
              border-color 0.2s;
}

.search-input:focus {
  width: 260px;
  border-color: #3b82f6;
}`,
        html: `<input class="search-input"
       placeholder="検索..." />`
      }
    }
  );

  /* ==============================
     fade — 追加2つ
     ============================== */
  demos["fade"].push(
    {
      title: "クロスフェード（切り替え）",
      desc: "2つの要素がふわっと入れ替わる演出。画像スライドショーや情報切り替えに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-box { position:relative;width:180px;height:80px;margin:0 auto; }
          .${p}-item { position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:10px;font-size:.85rem;font-weight:700;
            transition:opacity .5s ease; }
          .${p}-a { background:#eff6ff;color:#1e40af;opacity:1; }
          .${p}-b { background:#fef3c7;color:#92400e;opacity:0; }
          .${p}-box.alt .${p}-a { opacity:0; }
          .${p}-box.alt .${p}-b { opacity:1; }
          .${p}-btn { display:block;margin:10px auto 0;padding:6px 16px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#3b82f6;color:#fff;cursor:pointer; }
        `);
        const box = h("div", `${p}-box`);
        box.append(h("div", `${p}-item ${p}-a`, "🌞 昼のステージ"), h("div", `${p}-item ${p}-b`, "🌙 夜のステージ"));
        const btn = makeBtn("切り替え", `${p}-btn`);
        btn.addEventListener("click", () => box.classList.toggle("alt"));
        c.style.display = "block";
        c.append(box, btn);
      },
      code: {
        css: `.stage { position: relative; }

.scene-a, .scene-b {
  position: absolute;
  inset: 0;
  transition: opacity 0.5s ease;
}

.scene-a { opacity: 1; }
.scene-b { opacity: 0; }

.stage.alt .scene-a { opacity: 0; }
.stage.alt .scene-b { opacity: 1; }`,
        html: `<div class="stage" id="stage">
  <div class="scene-a">🌞 昼のステージ</div>
  <div class="scene-b">🌙 夜のステージ</div>
</div>
<button onclick="toggle()">切り替え</button>`,
        js: `function toggle() {
  document.getElementById('stage')
    .classList.toggle('alt');
}`
      }
    },
    {
      title: "フェードイン+上昇（スクロール演出風）",
      desc: "ボタンで要素が下からふわっと浮き上がるように表示。スクロール演出の基本パターン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-items { display:flex;gap:10px;justify-content:center; }
          .${p}-card { width:80px;padding:12px 8px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;text-align:center;font-size:.75rem;font-weight:600;color:#166534;
            opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease; }
          .${p}-card.show { opacity:1;transform:translateY(0); }
          .${p}-btn { display:block;margin:10px auto 0;padding:6px 16px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#22c55e;color:#fff;cursor:pointer; }
        `);
        const items = h("div", `${p}-items`);
        const cards = ["⚔ 武器", "🛡 防具", "💊 回復"].map(t => {
          const card = h("div", `${p}-card`, t);
          items.append(card);
          return card;
        });
        const btn = makeBtn("表示する", `${p}-btn`);
        btn.addEventListener("click", () => {
          cards.forEach((card, i) => {
            card.classList.remove("show");
            void card.offsetWidth;
            setTimeout(() => card.classList.add("show"), i * 150);
          });
        });
        c.style.display = "block";
        c.append(items, btn);
      },
      code: {
        css: `.card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease,
              transform 0.5s ease;
}

.card.show {
  opacity: 1;
  transform: translateY(0);
}

/* JSで順番にdelayをつける */`,
        html: `<div class="card">⚔ 武器</div>
<div class="card">🛡 防具</div>
<div class="card">💊 回復</div>`,
        js: `const cards = document.querySelectorAll('.card');
cards.forEach((card, i) => {
  setTimeout(() => {
    card.classList.add('show');
  }, i * 150);  // 150ms ずつずらす
});`
      }
    }
  );

  /* ==============================
     slide — 追加2つ
     ============================== */
  demos["slide"].push(
    {
      title: "カルーセル風スライド",
      desc: "左右ボタンでコンテンツがスライド切り替え。商品一覧や画像ギャラリーに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { position:relative;width:100%;overflow:hidden;border:1px solid #e5e7eb;border-radius:8px; }
          .${p}-track { display:flex;transition:transform .4s ease; }
          .${p}-slide { min-width:100%;padding:20px;text-align:center;font-size:.9rem;font-weight:700; }
          .${p}-s0 { background:#eff6ff;color:#1e40af; }
          .${p}-s1 { background:#fef3c7;color:#92400e; }
          .${p}-s2 { background:#f0fdf4;color:#166534; }
          .${p}-nav { display:flex;justify-content:center;gap:8px;margin-top:8px; }
          .${p}-btn { padding:4px 14px;font-size:.75rem;font-weight:600;border:1px solid #e5e7eb;border-radius:4px;background:#fff;cursor:pointer; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const track = h("div", `${p}-track`);
        ["🌲 森ステージ", "🏔 山ステージ", "🏖 海ステージ"].forEach((t, i) => {
          track.append(h("div", `${p}-slide ${p}-s${i}`, t));
        });
        wrap.append(track);
        let idx = 0;
        const nav = h("div", `${p}-nav`);
        const prev = makeBtn("◀ 前", `${p}-btn`);
        const next = makeBtn("次 ▶", `${p}-btn`);
        prev.addEventListener("click", () => { idx = Math.max(0, idx - 1); track.style.transform = `translateX(-${idx * 100}%)`; });
        next.addEventListener("click", () => { idx = Math.min(2, idx + 1); track.style.transform = `translateX(-${idx * 100}%)`; });
        nav.append(prev, next);
        c.style.display = "block";
        c.append(wrap, nav);
      },
      code: {
        css: `.carousel {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.4s ease;
}

.slide {
  min-width: 100%;
}`,
        html: `<div class="carousel">
  <div class="carousel-track" id="track">
    <div class="slide">🌲 森</div>
    <div class="slide">🏔 山</div>
    <div class="slide">🏖 海</div>
  </div>
</div>
<button onclick="prev()">◀</button>
<button onclick="next()">▶</button>`,
        js: `let idx = 0;
const track = document.getElementById('track');

function prev() {
  idx = Math.max(0, idx - 1);
  track.style.transform =
    \`translateX(-\${idx * 100}%)\`;
}
function next() {
  idx = Math.min(2, idx + 1);
  track.style.transform =
    \`translateX(-\${idx * 100}%)\`;
}`
      }
    },
    {
      title: "アコーディオンメニュー",
      desc: "複数パネルの開閉。1つ開くと他が閉じる排他的な動き。FAQやメニューに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-acc { width:100%;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden; }
          .${p}-head { padding:10px 14px;font-size:.8rem;font-weight:600;cursor:pointer;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;background:#fff; }
          .${p}-head:hover { background:#f9fafb; }
          .${p}-body { max-height:0;overflow:hidden;transition:max-height .35s ease;font-size:.75rem;color:#4b5563;line-height:1.7; }
          .${p}-body.open { max-height:60px; }
          .${p}-inner { padding:8px 14px; }
          .${p}-arrow { transition:transform .3s; }
          .${p}-body.open + .${p}-head .${p}-arrow,
          .${p}-head.active .${p}-arrow { transform:rotate(180deg); }
        `);
        const acc = h("div", `${p}-acc`);
        const items = [
          ["Q. セーブ方法は？", "メニューから「セーブ」を選んでください。"],
          ["Q. 操作方法は？", "矢印キーで移動、スペースで攻撃です。"],
          ["Q. 難易度変更は？", "設定画面から変更できます。"]
        ];
        let openBody = null;
        items.forEach(([q, a]) => {
          const head = h("div", `${p}-head`);
          head.append(h("span", "", q), h("span", `${p}-arrow`, "▼"));
          const body = h("div", `${p}-body`);
          body.append(h("div", `${p}-inner`, a));
          head.addEventListener("click", () => {
            if (openBody && openBody !== body) openBody.classList.remove("open");
            body.classList.toggle("open");
            openBody = body.classList.contains("open") ? body : null;
          });
          acc.append(head, body);
        });
        c.append(acc);
      },
      code: {
        css: `.accordion-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease;
}

.accordion-body.open {
  max-height: 60px;
}`,
        html: `<div class="accordion">
  <div class="acc-head" onclick="toggle(0)">
    Q. セーブ方法は？ <span>▼</span>
  </div>
  <div class="accordion-body" id="a0">
    <p>メニューから「セーブ」を選んでください。</p>
  </div>
  <!-- 繰り返し... -->
</div>`,
        js: `let openIdx = null;
function toggle(idx) {
  const bodies = document.querySelectorAll('.accordion-body');
  bodies.forEach((b, i) => {
    if (i === idx) b.classList.toggle('open');
    else b.classList.remove('open');
  });
}`
      }
    }
  );

  /* ==============================
     popup — 追加2つ
     ============================== */
  demos["popup"].push(
    {
      title: "フローティングアクションメニュー（FAB展開）",
      desc: "+ボタンを押すと複数の小ボタンが扇状に展開するメニュー。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:140px; }
          .${p}-fab { position:absolute;bottom:12px;right:12px;width:44px;height:44px;border-radius:50%;border:none;background:#8b5cf6;color:#fff;font-size:1.4rem;cursor:pointer;
            box-shadow:0 4px 12px rgba(139,92,246,.3);transition:transform .3s ease;z-index:2; }
          .${p}-stage.open .${p}-fab { transform:rotate(45deg); }
          .${p}-mini { position:absolute;right:16px;width:36px;height:36px;border-radius:50%;border:none;background:#6366f1;color:#fff;font-size:.9rem;cursor:pointer;
            opacity:0;transform:scale(.5);transition:all .25s ease;box-shadow:0 2px 8px rgba(0,0,0,.15); }
          .${p}-stage.open .${p}-m1 { bottom:68px;opacity:1;transform:scale(1); }
          .${p}-stage.open .${p}-m2 { bottom:112px;opacity:1;transform:scale(1);transition-delay:.06s; }
          .${p}-stage.open .${p}-m3 { bottom:156px;opacity:1;transform:scale(1);transition-delay:.12s; }
        `);
        const stage = h("div", `${p}-stage`);
        ["📷", "✏", "📎"].forEach((icon, i) => {
          const mini = h("button", `${p}-mini ${p}-m${i + 1}`);
          mini.textContent = icon;
          stage.append(mini);
        });
        const fab = makeBtn("+", `${p}-fab`);
        fab.addEventListener("click", () => stage.classList.toggle("open"));
        stage.append(fab);
        c.append(stage);
      },
      code: {
        css: `.fab {
  position: fixed;
  bottom: 16px; right: 16px;
  width: 48px; height: 48px;
  border-radius: 50%;
  background: #8b5cf6;
  color: #fff;
  font-size: 1.4rem;
  transition: transform 0.3s;
}
.open .fab { transform: rotate(45deg); }

.mini-btn {
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.25s ease;
}

.open .mini-1 { bottom: 72px; opacity: 1; transform: scale(1); }
.open .mini-2 { bottom: 120px; opacity: 1; transform: scale(1); transition-delay: .06s; }`,
        html: `<div id="fabMenu">
  <button class="mini-btn mini-1">📷</button>
  <button class="mini-btn mini-2">✏</button>
  <button class="fab" onclick="toggle()">+</button>
</div>`,
        js: `function toggle() {
  document.getElementById('fabMenu')
    .classList.toggle('open');
}`
      }
    },
    {
      title: "バルーン通知（吹き出し）",
      desc: "吹き出し型のポップアップ。チュートリアルの補足説明やヘルプに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:16px;justify-content:center;flex-wrap:wrap; }
          .${p}-trigger { position:relative;padding:10px 18px;background:#1e293b;color:#fff;border-radius:6px;font-size:.8rem;font-weight:600;cursor:pointer; }
          .${p}-balloon { position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%) scale(.9);
            padding:8px 14px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.1);
            font-size:.7rem;color:#374151;white-space:nowrap;opacity:0;transition:opacity .25s ease,transform .25s ease;pointer-events:none; }
          .${p}-trigger:hover .${p}-balloon { opacity:1;transform:translateX(-50%) scale(1); }
          .${p}-balloon::after { content:"";position:absolute;top:100%;left:50%;margin-left:-6px;border:6px solid transparent;border-top-color:#fff; }
          .${p}-balloon::before { content:"";position:absolute;top:100%;left:50%;margin-left:-7px;border:7px solid transparent;border-top-color:#e5e7eb; }
        `);
        const w = h("div", `${p}-wrap`);
        [["❓ ヘルプ", "困ったらここをクリック！"], ["💡 ヒント", "スペースキーで攻撃できるよ"]].forEach(([label, tip]) => {
          const trigger = h("div", `${p}-trigger`);
          const balloon = h("div", `${p}-balloon`, tip);
          trigger.append(balloon, document.createTextNode(label));
          w.append(trigger);
        });
        c.append(w);
      },
      code: {
        css: `.balloon {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) scale(0.9);
  padding: 8px 14px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,.1);
  opacity: 0;
  transition: opacity 0.25s, transform 0.25s;
}

.trigger:hover .balloon {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

/* 三角の矢印 */
.balloon::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  border: 6px solid transparent;
  border-top-color: #fff;
}`,
        html: `<div class="trigger">
  <div class="balloon">ヒントテキスト</div>
  ❓ ヘルプ
</div>`
      }
    }
  );

  /* ==============================
     hover — 追加2つ
     ============================== */
  demos["hover"].push(
    {
      title: "背景スライド塗りつぶし",
      desc: "ホバーで背景色が左端からスライドして塗りつぶされる。ボタンやリンクに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-btns { display:flex;gap:10px;justify-content:center;flex-wrap:wrap; }
          .${p}-btn { position:relative;overflow:hidden;padding:10px 22px;font-size:.8rem;font-weight:600;border:2px solid #1e293b;border-radius:6px;
            background:transparent;color:#1e293b;cursor:pointer;z-index:0;transition:color .3s ease; }
          .${p}-btn::before { content:"";position:absolute;top:0;left:0;width:0;height:100%;background:#1e293b;z-index:-1;transition:width .3s ease; }
          .${p}-btn:hover { color:#fff; }
          .${p}-btn:hover::before { width:100%; }
        `);
        const btns = h("div", `${p}-btns`);
        ["プレイ", "設定", "ランキング"].forEach(t => btns.append(h("button", `${p}-btn`, t)));
        c.append(btns);
      },
      code: {
        css: `.btn {
  position: relative;
  overflow: hidden;
  border: 2px solid #1e293b;
  background: transparent;
  color: #1e293b;
  transition: color 0.3s ease;
}

.btn::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 0; height: 100%;
  background: #1e293b;
  z-index: -1;
  transition: width 0.3s ease;
}

.btn:hover { color: #fff; }
.btn:hover::before { width: 100%; }`,
        html: `<button class="btn">プレイ</button>
<button class="btn">設定</button>`
      }
    },
    {
      title: "画像オーバーレイ（テキスト表示）",
      desc: "画像にホバーすると暗いオーバーレイとテキストが現れる。ギャラリーやポートフォリオに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-grid { display:flex;gap:10px;justify-content:center; }
          .${p}-item { position:relative;width:100px;height:80px;border-radius:8px;overflow:hidden;cursor:pointer;
            background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:1.6rem; }
          .${p}-overlay { position:absolute;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;
            opacity:0;transition:opacity .3s ease; }
          .${p}-item:hover .${p}-overlay { opacity:1; }
          .${p}-label { color:#fff;font-size:.75rem;font-weight:700;transform:translateY(8px);transition:transform .3s ease; }
          .${p}-item:hover .${p}-label { transform:translateY(0); }
        `);
        const grid = h("div", `${p}-grid`);
        [["🌲", "森ステージ"], ["🏔", "山ステージ"], ["🌊", "海ステージ"]].forEach(([emoji, label]) => {
          const item = h("div", `${p}-item`);
          item.append(h("span", "", emoji));
          const ov = h("div", `${p}-overlay`);
          ov.append(h("span", `${p}-label`, label));
          item.append(ov);
          grid.append(item);
        });
        c.append(grid);
      },
      code: {
        css: `.card { position: relative; overflow: hidden; }

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-overlay { opacity: 1; }

.card-label {
  color: #fff;
  transform: translateY(8px);
  transition: transform 0.3s;
}

.card:hover .card-label {
  transform: translateY(0);
}`,
        html: `<div class="card">
  <img src="image.jpg" />
  <div class="card-overlay">
    <span class="card-label">詳細を見る</span>
  </div>
</div>`
      }
    }
  );

  /* ==============================
     microinteraction — 追加2つ
     ============================== */
  demos["microinteraction"].push(
    {
      title: "スイッチトグル（なめらか）",
      desc: "つまみが滑らかにスライドするON/OFFスイッチ。色も同時に変わる。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;align-items:center;gap:12px;justify-content:center; }
          .${p}-switch { width:52px;height:28px;border-radius:14px;background:#d1d5db;border:none;cursor:pointer;position:relative;transition:background .3s ease;padding:0; }
          .${p}-switch.on { background:#22c55e; }
          .${p}-knob { position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:left .3s cubic-bezier(.33,1,.68,1); }
          .${p}-switch.on .${p}-knob { left:27px; }
          .${p}-label { font-size:.8rem;font-weight:600;min-width:80px; }
        `);
        const w = h("div", `${p}-wrap`);
        const label = h("span", `${p}-label`, "🔇 BGM OFF");
        const sw = h("button", `${p}-switch`);
        sw.append(h("span", `${p}-knob`));
        sw.addEventListener("click", () => {
          sw.classList.toggle("on");
          label.textContent = sw.classList.contains("on") ? "🔊 BGM ON" : "🔇 BGM OFF";
        });
        w.append(sw, label);
        c.append(w);
      },
      code: {
        css: `.switch {
  width: 52px; height: 28px;
  border-radius: 14px;
  background: #d1d5db;
  position: relative;
  transition: background 0.3s ease;
}

.switch.on { background: #22c55e; }

.knob {
  position: absolute;
  top: 3px; left: 3px;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: #fff;
  transition: left 0.3s cubic-bezier(.33,1,.68,1);
}

.switch.on .knob { left: 27px; }`,
        html: `<button class="switch" id="sw">
  <span class="knob"></span>
</button>`,
        js: `document.getElementById('sw')
  .addEventListener('click', function() {
    this.classList.toggle('on');
  });`
      }
    },
    {
      title: "カウントアップアニメーション",
      desc: "数字が0から目標値までアニメーションで増えていく。統計やスコア表示に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-num { font-size:2rem;font-weight:800;color:#0f766e;font-variant-numeric:tabular-nums; }
          .${p}-label { font-size:.75rem;color:#6b7280;margin-top:2px; }
          .${p}-btn { margin-top:10px;padding:6px 16px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#0f766e;color:#fff;cursor:pointer; }
        `);
        const w = h("div", `${p}-wrap`);
        const num = h("div", `${p}-num`, "0");
        w.append(num, h("div", `${p}-label`, "ハイスコア"));
        const btn = makeBtn("▶ カウントアップ", `${p}-btn`);
        btn.addEventListener("click", () => {
          const target = 12450;
          const dur = 1200;
          const start = performance.now();
          (function step(now) {
            const t = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            num.textContent = Math.floor(ease * target).toLocaleString();
            if (t < 1) requestAnimationFrame(step);
          })(start);
        });
        w.append(btn);
        c.append(w);
      },
      code: {
        css: `.counter {
  font-size: 2rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}`,
        html: `<div class="counter" id="counter">0</div>
<button onclick="countUp()">カウントアップ</button>`,
        js: `function countUp() {
  const el = document.getElementById('counter');
  const target = 12450;
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3); // ease-out
    el.textContent = Math.floor(ease * target)
      .toLocaleString();
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}`
      }
    }
  );

  /* ==============================
     particle — 追加2つ
     ============================== */
  demos["particle"].push(
    {
      title: "火花（スパーク）",
      desc: "線状の細長いパーティクルが放射する火花エフェクト。攻撃ヒットや衝突時に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-zone { width:100%;height:140px;background:#1e293b;border-radius:8px;cursor:crosshair;position:relative;overflow:hidden;
            display:flex;align-items:center;justify-content:center;color:#64748b;font-size:.75rem; }
          .${p}-spark { position:absolute;width:2px;height:12px;pointer-events:none;
            animation:${p}-fly .4s ease-out forwards; }
          @keyframes ${p}-fly { to{opacity:0;transform:translate(var(--tx),var(--ty)) scaleY(0)} }
        `);
        const zone = h("div", `${p}-zone`, "クリックで火花！");
        zone.addEventListener("click", (e) => {
          const rect = zone.getBoundingClientRect();
          const x = e.clientX - rect.left, y = e.clientY - rect.top;
          for (let i = 0; i < 12; i++) {
            const s = h("i", `${p}-spark`);
            const angle = (Math.PI * 2 * i) / 12;
            const dist = 30 + Math.random() * 40;
            s.style.left = x + "px";
            s.style.top = y + "px";
            s.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
            s.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
            s.style.background = `hsl(${30 + Math.random() * 30},100%,${55 + Math.random() * 30}%)`;
            s.style.transform = `rotate(${angle}rad)`;
            zone.append(s);
            setTimeout(() => s.remove(), 400);
          }
        });
        c.append(zone);
      },
      code: {
        css: `@keyframes spark-fly {
  to {
    opacity: 0;
    transform: translate(var(--tx), var(--ty)) scaleY(0);
  }
}

.spark {
  position: absolute;
  width: 2px;
  height: 12px;
  animation: spark-fly 0.4s ease-out forwards;
}`,
        html: `<div class="zone" id="zone"></div>`,
        js: `zone.addEventListener('click', (e) => {
  const rect = zone.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  for (let i = 0; i < 12; i++) {
    const s = document.createElement('i');
    s.className = 'spark';
    const angle = (Math.PI * 2 * i) / 12;
    const dist = 30 + Math.random() * 40;
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.setProperty('--tx',
      Math.cos(angle) * dist + 'px');
    s.style.setProperty('--ty',
      Math.sin(angle) * dist + 'px');
    s.style.background =
      \`hsl(\${30+Math.random()*30},100%,60%)\`;
    zone.append(s);
    setTimeout(() => s.remove(), 400);
  }
});`
      }
    },
    {
      title: "雪が降るエフェクト",
      desc: "画面上部からゆっくり雪の結晶が降ってくる。冬のステージや季節演出に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-sky { position:relative;width:100%;height:150px;overflow:hidden;border-radius:8px;
            background:linear-gradient(to bottom,#1e3a5f,#2d4a7a); }
          .${p}-flake { position:absolute;top:-10px;color:rgba(255,255,255,.8);pointer-events:none;
            animation:${p}-snow linear infinite; }
          @keyframes ${p}-snow { to{top:160px;transform:translateX(20px) rotate(360deg)} }
        `);
        const sky = h("div", `${p}-sky`);
        const flakes = ["❄", "❅", "❆", "✦"];
        for (let i = 0; i < 15; i++) {
          const f = h("span", `${p}-flake`, flakes[Math.floor(Math.random() * flakes.length)]);
          f.style.left = Math.random() * 95 + "%";
          f.style.fontSize = (8 + Math.random() * 12) + "px";
          f.style.animationDuration = (3 + Math.random() * 4) + "s";
          f.style.animationDelay = Math.random() * 5 + "s";
          f.style.opacity = 0.4 + Math.random() * 0.6;
          sky.append(f);
        }
        c.append(sky);
      },
      code: {
        css: `@keyframes snow {
  to {
    top: 100%;
    transform: translateX(20px) rotate(360deg);
  }
}

.snowflake {
  position: absolute;
  top: -10px;
  color: rgba(255,255,255,0.8);
  animation: snow linear infinite;
}

.sky {
  background: linear-gradient(to bottom, #1e3a5f, #2d4a7a);
  overflow: hidden;
}`,
        html: `<div class="sky">
  <span class="snowflake" style="left:10%;animation-duration:4s">❄</span>
  <span class="snowflake" style="left:40%;animation-duration:6s;animation-delay:1s">❅</span>
  <span class="snowflake" style="left:70%;animation-duration:5s;animation-delay:2s">❆</span>
  <!-- more flakes... -->
</div>`
      }
    }
  );

  /* ==============================
     shake — 追加2つ
     ============================== */
  demos["shake"].push(
    {
      title: "バイブレーション（細かい振動）",
      desc: "高速で細かくブルブル震える。スマホの振動フィードバック的な表現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-icon { font-size:2rem;display:inline-block; }
          .${p}-icon.vib { animation:${p}-vib .1s linear 5; }
          @keyframes ${p}-vib { 0%{transform:translate(0)} 25%{transform:translate(-1px,1px)} 50%{transform:translate(1px,-1px)} 75%{transform:translate(-1px,-1px)} 100%{transform:translate(1px,1px)} }
          .${p}-btn { margin-top:8px;padding:6px 16px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#ef4444;color:#fff;cursor:pointer; }
        `);
        const w = h("div", `${p}-wrap`);
        const icon = h("span", `${p}-icon`, "📱");
        const btn = makeBtn("バイブレーション", `${p}-btn`);
        btn.addEventListener("click", () => {
          icon.classList.remove("vib");
          void icon.offsetWidth;
          icon.classList.add("vib");
        });
        w.append(icon, h("br"), btn);
        c.append(w);
      },
      code: {
        css: `@keyframes vibrate {
  0%   { transform: translate(0); }
  25%  { transform: translate(-1px, 1px); }
  50%  { transform: translate(1px, -1px); }
  75%  { transform: translate(-1px, -1px); }
  100% { transform: translate(1px, 1px); }
}

.phone.vibrate {
  animation: vibrate 0.1s linear 5;
  /* 0.1s × 5回 = 0.5秒間の振動 */
}`,
        html: `<span class="phone" id="phone">📱</span>
<button onclick="vib()">バイブレーション</button>`,
        js: `function vib() {
  const el = document.getElementById('phone');
  el.classList.remove('vibrate');
  void el.offsetWidth;
  el.classList.add('vibrate');
}`
      }
    },
    {
      title: "ジャンプ（弾む跳ね上がり）",
      desc: "要素がポンッと飛び跳ねる。達成感のあるフィードバックやゲームの動きに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-char { font-size:2.2rem;display:inline-block;cursor:pointer; }
          .${p}-char.jump { animation:${p}-jump .5s ease; }
          @keyframes ${p}-jump { 0%{transform:translateY(0)} 30%{transform:translateY(-30px) scaleX(.9) scaleY(1.1)} 50%{transform:translateY(-35px)} 70%{transform:translateY(0) scaleX(1.1) scaleY(.9)} 85%{transform:translateY(-8px)} 100%{transform:translateY(0)} }
          .${p}-hint { font-size:.7rem;color:#9ca3af;margin-top:4px; }
        `);
        const w = h("div", `${p}-wrap`);
        const ch = h("span", `${p}-char`, "🐸");
        ch.addEventListener("click", () => {
          ch.classList.remove("jump");
          void ch.offsetWidth;
          ch.classList.add("jump");
        });
        w.append(ch, h("p", `${p}-hint`, "カエルをクリックでジャンプ"));
        c.append(w);
      },
      code: {
        css: `@keyframes jump {
  0%   { transform: translateY(0); }
  30%  { transform: translateY(-30px)
         scaleX(.9) scaleY(1.1); }
  50%  { transform: translateY(-35px); }
  70%  { transform: translateY(0)
         scaleX(1.1) scaleY(.9); }
  85%  { transform: translateY(-8px); }
  100% { transform: translateY(0); }
}

.character.jump {
  animation: jump 0.5s ease;
}`,
        html: `<span class="character" id="frog">🐸</span>`,
        js: `frog.addEventListener('click', () => {
  frog.classList.remove('jump');
  void frog.offsetWidth;
  frog.classList.add('jump');
});`
      }
    }
  );

  /* ==============================
     flash — 追加2つ
     ============================== */
  demos["flash"].push(
    {
      title: "レインボーフラッシュ",
      desc: "文字色が虹色に循環して変わる。特別な達成時やレアアイテム獲得の演出に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-text { font-size:1.2rem;font-weight:800;text-align:center;
            animation:${p}-rainbow 1.5s linear infinite;background-size:200%;
            background-image:linear-gradient(90deg,#ef4444,#f59e0b,#22c55e,#3b82f6,#8b5cf6,#ec4899,#ef4444);
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          @keyframes ${p}-rainbow { to{background-position:200%} }
        `);
        c.append(h("p", `${p}-text`, "★ LEGENDARY ITEM GET! ★"));
      },
      code: {
        css: `@keyframes rainbow {
  to { background-position: 200%; }
}

.rainbow-text {
  font-weight: 800;
  background-image: linear-gradient(90deg,
    #ef4444, #f59e0b, #22c55e,
    #3b82f6, #8b5cf6, #ec4899,
    #ef4444);
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: rainbow 1.5s linear infinite;
}`,
        html: `<p class="rainbow-text">
  ★ LEGENDARY ITEM GET! ★
</p>`
      }
    },
    {
      title: "成功フラッシュ（緑に光る）",
      desc: "操作成功時に要素が一瞬緑色に光る。保存完了やチェック通過のフィードバック。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-card { display:inline-block;padding:14px 24px;border:2px solid #e5e7eb;border-radius:10px;font-size:.85rem;font-weight:600;
            transition:border-color .2s; }
          .${p}-card.success { animation:${p}-flash .6s ease; }
          @keyframes ${p}-flash { 0%{border-color:#22c55e;box-shadow:0 0 0 0 rgba(34,197,94,.4);background:#f0fdf4} 100%{border-color:#e5e7eb;box-shadow:0 0 0 12px rgba(34,197,94,0);background:#fff} }
          .${p}-btn { margin-top:10px;padding:6px 16px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#22c55e;color:#fff;cursor:pointer; }
        `);
        const w = h("div", `${p}-wrap`);
        const card = h("div", `${p}-card`, "💾 ファイルデータ");
        const btn = makeBtn("保存する", `${p}-btn`);
        btn.addEventListener("click", () => {
          card.classList.remove("success");
          void card.offsetWidth;
          card.classList.add("success");
          card.textContent = "✅ 保存しました！";
          setTimeout(() => { card.textContent = "💾 ファイルデータ"; }, 1500);
        });
        w.append(card, h("br"), btn);
        c.append(w);
      },
      code: {
        css: `@keyframes success-flash {
  0% {
    border-color: #22c55e;
    box-shadow: 0 0 0 0 rgba(34,197,94,.4);
    background: #f0fdf4;
  }
  100% {
    border-color: #e5e7eb;
    box-shadow: 0 0 0 12px rgba(34,197,94,0);
    background: #fff;
  }
}

.card.success {
  animation: success-flash 0.6s ease;
}`,
        html: `<div class="card" id="card">💾 ファイルデータ</div>
<button onclick="save()">保存する</button>`,
        js: `function save() {
  const card = document.getElementById('card');
  card.classList.remove('success');
  void card.offsetWidth;
  card.classList.add('success');
  card.textContent = '✅ 保存しました！';
}`
      }
    }
  );

  /* ==============================
     easing — 追加2つ
     ============================== */
  demos["easing"].push(
    {
      title: "バウンスイージング（着地で弾む）",
      desc: "落下後に何度かバウンドする動き。ドロップやゲームの着地演出に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center;height:110px;position:relative; }
          .${p}-ball { width:36px;height:36px;background:#ef4444;border-radius:50%;position:absolute;left:calc(50% - 18px);top:0; }
          .${p}-ball.drop { animation:${p}-bounce 1s forwards; }
          @keyframes ${p}-bounce { 0%{top:0} 30%{top:70px} 45%{top:40px} 58%{top:70px} 68%{top:55px} 76%{top:70px} 84%{top:64px} 100%{top:70px} }
          .${p}-floor { position:absolute;bottom:0;left:10%;right:10%;height:2px;background:#d1d5db; }
          .${p}-btn { position:absolute;bottom:4px;left:50%;transform:translateX(-50%);padding:4px 14px;font-size:.7rem;font-weight:600;border:none;border-radius:4px;background:#ef4444;color:#fff;cursor:pointer; }
        `);
        const w = h("div", `${p}-wrap`);
        const ball = h("div", `${p}-ball`);
        w.append(ball, h("div", `${p}-floor`));
        const btn = makeBtn("▶ ドロップ", `${p}-btn`);
        btn.addEventListener("click", () => {
          ball.classList.remove("drop");
          void ball.offsetWidth;
          ball.classList.add("drop");
        });
        w.append(btn);
        c.append(w);
      },
      code: {
        css: `@keyframes bounce-drop {
  0%   { top: 0; }
  30%  { top: 70px; }   /* 着地 */
  45%  { top: 40px; }   /* 1回目バウンス */
  58%  { top: 70px; }
  68%  { top: 55px; }   /* 2回目バウンス */
  76%  { top: 70px; }
  84%  { top: 64px; }   /* 3回目（小さく） */
  100% { top: 70px; }   /* 静止 */
}

.ball.drop {
  animation: bounce-drop 1s forwards;
}`,
        html: `<div class="stage">
  <div class="ball" id="ball"></div>
  <div class="floor"></div>
</div>
<button onclick="drop()">ドロップ</button>`,
        js: `function drop() {
  const ball = document.getElementById('ball');
  ball.classList.remove('drop');
  void ball.offsetWidth;
  ball.classList.add('drop');
}`
      }
    },
    {
      title: "スプリング（行き過ぎて戻る）",
      desc: "目標地点を一度越えてから戻る弾性的な動き。モーダルの出現やメニュー展開に自然な印象を与える。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-box { width:80px;height:80px;background:#8b5cf6;border-radius:12px;margin:0 auto;display:flex;align-items:center;justify-content:center;
            color:#fff;font-size:1.4rem;transform:scale(0); }
          .${p}-box.show { animation:${p}-spring .6s forwards; }
          @keyframes ${p}-spring { 0%{transform:scale(0)} 50%{transform:scale(1.15)} 70%{transform:scale(.95)} 85%{transform:scale(1.03)} 100%{transform:scale(1)} }
          .${p}-btn { margin-top:10px;padding:6px 16px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#8b5cf6;color:#fff;cursor:pointer; }
          .${p}-code { font-size:.65rem;color:#8b5cf6;font-family:monospace;margin-top:6px; }
        `);
        const w = h("div", `${p}-wrap`);
        const box = h("div", `${p}-box`, "⭐");
        const btn = makeBtn("▶ スプリング表示", `${p}-btn`);
        btn.addEventListener("click", () => {
          box.classList.remove("show");
          box.style.transform = "scale(0)";
          void box.offsetWidth;
          box.classList.add("show");
        });
        w.append(box, btn, h("p", `${p}-code`, "scale: 0 → 1.15 → .95 → 1.03 → 1"));
        c.append(w);
      },
      code: {
        css: `@keyframes spring {
  0%   { transform: scale(0); }
  50%  { transform: scale(1.15); }  /* 行き過ぎ */
  70%  { transform: scale(0.95); }  /* 戻り過ぎ */
  85%  { transform: scale(1.03); }  /* 微調整 */
  100% { transform: scale(1); }     /* 静止 */
}

.modal.show {
  animation: spring 0.6s forwards;
}

/*
 * 行き過ぎ→戻り の繰り返しで
 * バネのような自然な動きに
 */`,
        html: `<div class="modal" id="modal">⭐</div>
<button onclick="show()">表示</button>`,
        js: `function show() {
  const el = document.getElementById('modal');
  el.style.transform = 'scale(0)';
  void el.offsetWidth;
  el.classList.add('show');
}`
      }
    }
  );

})();
