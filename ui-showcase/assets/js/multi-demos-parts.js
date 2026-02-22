/* ==========================================================================
   Multi-Demo Definitions — Multiple examples per "UIパーツ" term
   Each term has 3 realistic use-case demos with displayable code
   ========================================================================== */
(function () {
  let uid = 0;
  function id() { return "mp" + (++uid); }

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
    b.className = cls || "mp-btn";
    b.textContent = text;
    return b;
  }

  const demos = {};

  /* ==============================
     icon — アイコン
     ============================== */
  demos["icon"] = [
    {
      title: "ナビゲーションバー",
      desc: "アイコン+テキストのタブ型ナビゲーション。アクティブ状態の切り替え付き。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-nav { display:flex;background:#1e293b;border-radius:8px;overflow:hidden;width:100%; }
          .${p}-tab { flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 4px;
            color:#94a3b8;font-size:.65rem;cursor:pointer;border:none;background:none;transition:color .2s,background .2s; }
          .${p}-tab.active { color:#3b82f6;background:#1e293b; }
          .${p}-tab:hover { color:#e2e8f0; }
          .${p}-ico { font-size:1.2rem; }
        `);
        const nav = h("div", `${p}-nav`);
        const tabs = [["🏠","ホーム"],["🔍","検索"],["❤️","お気に入り"],["👤","プロフィール"]];
        tabs.forEach(([ico, label], i) => {
          const tab = h("button", `${p}-tab${i === 0 ? " active" : ""}`);
          tab.append(h("span", `${p}-ico`, ico), h("span", "", label));
          tab.addEventListener("click", () => {
            nav.querySelectorAll(`.${p}-tab`).forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
          });
          nav.append(tab);
        });
        c.append(nav);
      },
      code: {
        css: `.nav { display:flex; background:#1e293b; border-radius:8px; }
.tab { flex:1; display:flex; flex-direction:column;
  align-items:center; gap:2px; padding:10px 4px;
  color:#94a3b8; font-size:.65rem; cursor:pointer;
  border:none; background:none; transition:color .2s; }
.tab.active { color:#3b82f6; }
.tab:hover { color:#e2e8f0; }
.ico { font-size:1.2rem; }`,
        html: `<nav class="nav">
  <button class="tab active">
    <span class="ico">🏠</span><span>ホーム</span>
  </button>
  <button class="tab">
    <span class="ico">🔍</span><span>検索</span>
  </button>
</nav>`
      }
    },
    {
      title: "アイコンボタン",
      desc: "アイコンだけのボタン群。ツールバーやアクションバーに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-bar { display:flex;gap:8px;justify-content:center; }
          .${p}-ib { width:44px;height:44px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;
            font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;
            transition:background .2s,transform .15s; }
          .${p}-ib:hover { background:#f1f5f9;transform:scale(1.1); }
          .${p}-ib:active { transform:scale(.95); }
        `);
        const bar = h("div", `${p}-bar`);
        ["✏️","📋","🗑️","⬇️","⭐"].forEach(ico => {
          const b = h("button", `${p}-ib`, ico);
          bar.append(b);
        });
        c.append(bar);
      },
      code: {
        css: `.icon-btn { width:44px; height:44px; border:1px solid #e5e7eb;
  border-radius:10px; background:#fff; font-size:1.2rem;
  cursor:pointer; display:flex; align-items:center;
  justify-content:center; transition:background .2s,transform .15s; }
.icon-btn:hover { background:#f1f5f9; transform:scale(1.1); }
.icon-btn:active { transform:scale(.95); }`,
        html: `<div class="toolbar">
  <button class="icon-btn">✏️</button>
  <button class="icon-btn">📋</button>
  <button class="icon-btn">🗑️</button>
  <button class="icon-btn">⬇️</button>
</div>`
      }
    },
    {
      title: "状態表示アイコン",
      desc: "オン/オフ/警告を色とアイコンで視覚的に表現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-list { display:flex;flex-direction:column;gap:8px;width:100%; }
          .${p}-row { display:flex;align-items:center;gap:10px;padding:8px 12px;background:#f9fafb;border-radius:6px;font-size:.8rem; }
          .${p}-dot { width:10px;height:10px;border-radius:50%;flex-shrink:0; }
          .${p}-on { background:#22c55e; }
          .${p}-off { background:#94a3b8; }
          .${p}-warn { background:#f59e0b; }
          .${p}-ico { font-size:1rem; }
        `);
        const list = h("div", `${p}-list`);
        const items = [
          ["🌐","サーバー接続","on"],["🔇","サウンド","off"],["⚠️","ストレージ残量","warn"]
        ];
        items.forEach(([ico, label, st]) => {
          const row = h("div", `${p}-row`);
          row.append(h("span", `${p}-ico`, ico), h("span", `${p}-dot ${p}-${st}`), h("span", "", label));
          list.append(row);
        });
        c.append(list);
      },
      code: {
        css: `.status-row { display:flex; align-items:center; gap:10px;
  padding:8px 12px; background:#f9fafb; border-radius:6px; }
.dot { width:10px; height:10px; border-radius:50%; }
.dot.on { background:#22c55e; }
.dot.off { background:#94a3b8; }
.dot.warn { background:#f59e0b; }`,
        html: `<div class="status-row">
  <span>🌐</span>
  <span class="dot on"></span>
  <span>サーバー接続</span>
</div>
<div class="status-row">
  <span>🔇</span>
  <span class="dot off"></span>
  <span>サウンド</span>
</div>`
      }
    }
  ];

  /* ==============================
     progress-bar — プログレスバー
     ============================== */
  demos["progress-bar"] = [
    {
      title: "HPバー",
      desc: "ゲームのHP表示。クリックでダメージを受けて減少する。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { width:100%; }
          .${p}-label { font-size:.75rem;font-weight:700;margin-bottom:4px;color:#1e293b; }
          .${p}-track { width:100%;height:22px;background:#374151;border-radius:4px;overflow:hidden;position:relative; }
          .${p}-fill { height:100%;background:#22c55e;transition:width .4s ease,background .3s;border-radius:4px; }
          .${p}-fill.mid { background:#f59e0b; }
          .${p}-fill.low { background:#ef4444; }
          .${p}-val { position:absolute;right:8px;top:50%;transform:translateY(-50%);font-size:.7rem;font-weight:700;color:#fff; }
          .${p}-btn { margin-top:10px;padding:6px 14px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#ef4444;color:#fff;cursor:pointer; }
        `);
        let hp = 100;
        const wrap = h("div", `${p}-wrap`);
        wrap.append(h("div", `${p}-label`, "HP"));
        const track = h("div", `${p}-track`);
        const fill = h("div", `${p}-fill`);
        fill.style.width = "100%";
        const val = h("span", `${p}-val`, "100 / 100");
        track.append(fill, val);
        const btn = makeBtn("💥 ダメージ (-20)", `${p}-btn`);
        btn.addEventListener("click", () => {
          hp = Math.max(0, hp - 20);
          fill.style.width = hp + "%";
          fill.className = `${p}-fill` + (hp <= 25 ? ` ${p}-low` : hp <= 50 ? ` ${p}-mid` : "");
          val.textContent = hp + " / 100";
          if (hp === 0) { btn.textContent = "回復"; }
          if (hp === 0) { hp = 100; fill.style.width = "100%"; fill.className = `${p}-fill`; val.textContent = "100 / 100"; btn.textContent = "💥 ダメージ (-20)"; }
        });
        wrap.append(track, btn);
        c.append(wrap);
      },
      code: {
        css: `.hp-track { width:100%; height:22px; background:#374151;
  border-radius:4px; overflow:hidden; }
.hp-fill { height:100%; background:#22c55e;
  transition:width .4s ease, background .3s; border-radius:4px; }
.hp-fill.mid { background:#f59e0b; }
.hp-fill.low { background:#ef4444; }`,
        html: `<div class="hp-track">
  <div class="hp-fill" id="hpBar" style="width:100%"></div>
</div>`,
        js: `let hp = 100;
function damage() {
  hp = Math.max(0, hp - 20);
  const bar = document.getElementById('hpBar');
  bar.style.width = hp + '%';
}`
      }
    },
    {
      title: "ダウンロード進捗",
      desc: "パーセント表示付きのダウンロード風プログレスバー。自動でアニメーション。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { width:100%; }
          .${p}-title { font-size:.8rem;font-weight:600;margin-bottom:6px; }
          .${p}-track { width:100%;height:18px;background:#e5e7eb;border-radius:9px;overflow:hidden; }
          .${p}-fill { height:100%;background:linear-gradient(90deg,#3b82f6,#8b5cf6);border-radius:9px;width:0;transition:width .3s; }
          .${p}-info { display:flex;justify-content:space-between;font-size:.7rem;color:#6b7280;margin-top:4px; }
          .${p}-btn { margin-top:8px;padding:6px 14px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#3b82f6;color:#fff;cursor:pointer; }
        `);
        const wrap = h("div", `${p}-wrap`);
        wrap.append(h("div", `${p}-title`, "📥 ダウンロード中..."));
        const track = h("div", `${p}-track`);
        const fill = h("div", `${p}-fill`);
        track.append(fill);
        const info = h("div", `${p}-info`);
        const pct = h("span", "", "0%");
        const size = h("span", "", "0 / 128 MB");
        info.append(pct, size);
        const btn = makeBtn("▶ 開始", `${p}-btn`);
        let running = false;
        btn.addEventListener("click", () => {
          if (running) return;
          running = true;
          let v = 0;
          const iv = setInterval(() => {
            v = Math.min(100, v + Math.floor(Math.random() * 8) + 2);
            fill.style.width = v + "%";
            pct.textContent = v + "%";
            size.textContent = Math.round(v * 1.28) + " / 128 MB";
            if (v >= 100) { clearInterval(iv); running = false; btn.textContent = "✓ 完了"; }
          }, 200);
        });
        wrap.append(track, info, btn);
        c.append(wrap);
      },
      code: {
        css: `.track { width:100%; height:18px; background:#e5e7eb;
  border-radius:9px; overflow:hidden; }
.fill { height:100%; border-radius:9px;
  background:linear-gradient(90deg,#3b82f6,#8b5cf6);
  transition:width .3s; }`,
        html: `<div class="track">
  <div class="fill" id="bar"></div>
</div>
<span id="pct">0%</span>`,
        js: `let v = 0;
const iv = setInterval(() => {
  v = Math.min(100, v + Math.floor(Math.random()*8)+2);
  document.getElementById('bar').style.width = v+'%';
  document.getElementById('pct').textContent = v+'%';
  if (v >= 100) clearInterval(iv);
}, 200);`
      }
    },
    {
      title: "ステップ進捗",
      desc: "1/2/3のステップ表示。現在のステップをハイライト。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-steps { display:flex;align-items:center;width:100%; }
          .${p}-step { display:flex;flex-direction:column;align-items:center;flex:1;position:relative; }
          .${p}-num { width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;
            font-size:.8rem;font-weight:700;color:#fff;background:#d1d5db;transition:background .3s;z-index:1; }
          .${p}-num.done { background:#22c55e; }
          .${p}-num.current { background:#3b82f6; }
          .${p}-lbl { font-size:.65rem;color:#6b7280;margin-top:4px; }
          .${p}-line { flex:1;height:3px;background:#d1d5db;margin:0 -4px;align-self:flex-start;margin-top:15px;transition:background .3s; }
          .${p}-line.done { background:#22c55e; }
          .${p}-btn { margin-top:12px;padding:6px 14px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#3b82f6;color:#fff;cursor:pointer; }
        `);
        const wrap = h("div", "");
        const bar = h("div", `${p}-steps`);
        const stepData = [["入力","1"],["確認","2"],["完了","3"]];
        const nums = [];
        const lines = [];
        let cur = 0;
        stepData.forEach(([lbl, n], i) => {
          const step = h("div", `${p}-step`);
          const num = h("div", `${p}-num${i === 0 ? " current" : ""}`, n);
          nums.push(num);
          step.append(num, h("span", `${p}-lbl`, lbl));
          bar.append(step);
          if (i < stepData.length - 1) {
            const line = h("div", `${p}-line`);
            lines.push(line);
            bar.append(line);
          }
        });
        const btn = makeBtn("次へ →", `${p}-btn`);
        btn.addEventListener("click", () => {
          if (cur < 2) {
            nums[cur].classList.remove("current"); nums[cur].classList.add("done");
            if (lines[cur]) lines[cur].classList.add("done");
            cur++;
            nums[cur].classList.add("current");
          } else {
            cur = 0;
            nums.forEach(n => { n.classList.remove("done","current"); });
            lines.forEach(l => l.classList.remove("done"));
            nums[0].classList.add("current");
          }
        });
        wrap.append(bar, btn);
        c.append(wrap);
      },
      code: {
        css: `.steps { display:flex; align-items:center; }
.step-num { width:32px; height:32px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-weight:700; color:#fff; background:#d1d5db; }
.step-num.done { background:#22c55e; }
.step-num.current { background:#3b82f6; }
.step-line { flex:1; height:3px; background:#d1d5db; }
.step-line.done { background:#22c55e; }`,
        html: `<div class="steps">
  <div class="step"><div class="step-num current">1</div><span>入力</span></div>
  <div class="step-line"></div>
  <div class="step"><div class="step-num">2</div><span>確認</span></div>
  <div class="step-line"></div>
  <div class="step"><div class="step-num">3</div><span>完了</span></div>
</div>`
      }
    }
  ];

  /* ==============================
     counter — カウンター
     ============================== */
  demos["counter"] = [
    {
      title: "スコアカウンター",
      desc: "クリックするたびにスコアが加算される。ゲームのスコア表示風。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-score { font-size:2.2rem;font-weight:800;color:#1e293b;font-variant-numeric:tabular-nums; }
          .${p}-lbl { font-size:.7rem;color:#6b7280;margin-bottom:4px; }
          .${p}-btn { margin-top:8px;padding:10px 24px;font-size:.85rem;font-weight:700;border:none;border-radius:8px;background:#f59e0b;color:#fff;cursor:pointer;transition:transform .1s; }
          .${p}-btn:active { transform:scale(.93); }
        `);
        let score = 0;
        const wrap = h("div", `${p}-wrap`);
        wrap.append(h("div", `${p}-lbl`, "SCORE"));
        const sc = h("div", `${p}-score`, "0");
        const btn = makeBtn("🎯 +100", `${p}-btn`);
        btn.addEventListener("click", () => { score += 100; sc.textContent = score.toLocaleString(); });
        wrap.append(sc, btn);
        c.append(wrap);
      },
      code: {
        css: `.score { font-size:2.2rem; font-weight:800;
  font-variant-numeric:tabular-nums; }
.score-btn { padding:10px 24px; background:#f59e0b;
  color:#fff; border:none; border-radius:8px;
  cursor:pointer; font-weight:700; }
.score-btn:active { transform:scale(.93); }`,
        html: `<div class="label">SCORE</div>
<div class="score" id="score">0</div>
<button class="score-btn" onclick="addScore()">🎯 +100</button>`,
        js: `let score = 0;
function addScore() {
  score += 100;
  document.getElementById('score')
    .textContent = score.toLocaleString();
}`
      }
    },
    {
      title: "カウントダウン",
      desc: "10から0への自動カウントダウンタイマー。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-num { font-size:3rem;font-weight:900;color:#3b82f6;font-variant-numeric:tabular-nums;transition:transform .15s; }
          .${p}-num.pulse { transform:scale(1.2); }
          .${p}-btn { margin-top:8px;padding:8px 20px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#3b82f6;color:#fff;cursor:pointer; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const num = h("div", `${p}-num`, "10");
        const btn = makeBtn("▶ スタート", `${p}-btn`);
        let running = false;
        btn.addEventListener("click", () => {
          if (running) return;
          running = true;
          let v = 10;
          num.textContent = v;
          const iv = setInterval(() => {
            v--;
            num.textContent = v;
            num.classList.add("pulse");
            setTimeout(() => num.classList.remove("pulse"), 150);
            if (v <= 3) num.style.color = "#ef4444";
            if (v <= 0) { clearInterval(iv); num.textContent = "🎉"; num.style.color = "#3b82f6"; running = false; }
          }, 1000);
        });
        wrap.append(num, btn);
        c.append(wrap);
      },
      code: {
        css: `.countdown { font-size:3rem; font-weight:900;
  color:#3b82f6; font-variant-numeric:tabular-nums; }`,
        html: `<div class="countdown" id="cd">10</div>
<button onclick="start()">▶ スタート</button>`,
        js: `function start() {
  let v = 10;
  const el = document.getElementById('cd');
  const iv = setInterval(() => {
    v--;
    el.textContent = v;
    if (v <= 0) {
      clearInterval(iv);
      el.textContent = '🎉';
    }
  }, 1000);
}`
      }
    },
    {
      title: "数値インクリメント",
      desc: "+/-ボタンで数値を増減。数量選択UIの定番パターン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;align-items:center;gap:0;justify-content:center; }
          .${p}-btn { width:40px;height:40px;border:1px solid #e5e7eb;background:#f9fafb;font-size:1.2rem;font-weight:700;cursor:pointer;transition:background .15s; }
          .${p}-btn:hover { background:#e5e7eb; }
          .${p}-btn:first-child { border-radius:8px 0 0 8px; }
          .${p}-btn:last-child { border-radius:0 8px 8px 0; }
          .${p}-val { width:60px;height:40px;display:flex;align-items:center;justify-content:center;
            font-size:1.1rem;font-weight:700;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;background:#fff; }
        `);
        let val = 1;
        const wrap = h("div", `${p}-wrap`);
        const minus = makeBtn("−", `${p}-btn`);
        const display = h("div", `${p}-val`, "1");
        const plus = makeBtn("+", `${p}-btn`);
        minus.addEventListener("click", () => { val = Math.max(0, val - 1); display.textContent = val; });
        plus.addEventListener("click", () => { val++; display.textContent = val; });
        wrap.append(minus, display, plus);
        c.append(wrap);
      },
      code: {
        css: `.counter { display:flex; align-items:center; }
.counter-btn { width:40px; height:40px; border:1px solid #e5e7eb;
  background:#f9fafb; font-size:1.2rem; font-weight:700; cursor:pointer; }
.counter-val { width:60px; height:40px; display:flex;
  align-items:center; justify-content:center;
  font-size:1.1rem; font-weight:700;
  border-top:1px solid #e5e7eb; border-bottom:1px solid #e5e7eb; }`,
        html: `<div class="counter">
  <button class="counter-btn" onclick="dec()">−</button>
  <div class="counter-val" id="val">1</div>
  <button class="counter-btn" onclick="inc()">+</button>
</div>`,
        js: `let val = 1;
function inc() { val++; update(); }
function dec() { val = Math.max(0, val-1); update(); }
function update() {
  document.getElementById('val').textContent = val;
}`
      }
    }
  ];

  /* ==============================
     badge — バッジ
     ============================== */
  demos["badge"] = [
    {
      title: "通知バッジ",
      desc: "アイコンの右上に赤い数字バッジ。未読数などの表示に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-row { display:flex;gap:24px;justify-content:center; }
          .${p}-item { position:relative;font-size:1.8rem;cursor:default; }
          .${p}-badge { position:absolute;top:-6px;right:-10px;min-width:20px;height:20px;padding:0 5px;
            background:#ef4444;color:#fff;font-size:.65rem;font-weight:700;border-radius:10px;
            display:flex;align-items:center;justify-content:center;line-height:1; }
        `);
        const row = h("div", `${p}-row`);
        [["🔔","3"],["✉️","12"],["🛒","1"]].forEach(([ico,n]) => {
          const item = h("span", `${p}-item`);
          item.append(document.createTextNode(ico));
          const badge = h("span", `${p}-badge`, n);
          item.append(badge);
          row.append(item);
        });
        c.append(row);
      },
      code: {
        css: `.icon-wrap { position:relative; font-size:1.8rem; }
.badge { position:absolute; top:-6px; right:-10px;
  min-width:20px; height:20px; padding:0 5px;
  background:#ef4444; color:#fff; font-size:.65rem;
  font-weight:700; border-radius:10px;
  display:flex; align-items:center; justify-content:center; }`,
        html: `<span class="icon-wrap">
  🔔
  <span class="badge">3</span>
</span>`
      }
    },
    {
      title: "ステータスバッジ",
      desc: "オンライン/オフライン/離席の状態をドット+テキストで表示。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-list { display:flex;flex-direction:column;gap:8px;width:100%; }
          .${p}-user { display:flex;align-items:center;gap:10px;padding:8px 12px;background:#fff;border:1px solid #e5e7eb;border-radius:8px; }
          .${p}-avatar { width:32px;height:32px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:.85rem; }
          .${p}-name { font-size:.8rem;font-weight:600;flex:1; }
          .${p}-st { display:flex;align-items:center;gap:4px;font-size:.7rem;color:#6b7280; }
          .${p}-dot { width:8px;height:8px;border-radius:50%; }
          .${p}-online { background:#22c55e; }
          .${p}-offline { background:#94a3b8; }
          .${p}-away { background:#f59e0b; }
        `);
        const list = h("div", `${p}-list`);
        const users = [["👩","田中","オンライン","online"],["👨","鈴木","オフライン","offline"],["🧑","佐藤","離席中","away"]];
        users.forEach(([av,name,stText,stCls]) => {
          const row = h("div", `${p}-user`);
          row.append(h("div", `${p}-avatar`, av));
          row.append(h("span", `${p}-name`, name));
          const st = h("span", `${p}-st`);
          st.append(h("span", `${p}-dot ${p}-${stCls}`), h("span","",stText));
          row.append(st);
          list.append(row);
        });
        c.append(list);
      },
      code: {
        css: `.status { display:flex; align-items:center; gap:4px; }
.dot { width:8px; height:8px; border-radius:50%; }
.dot.online { background:#22c55e; }
.dot.offline { background:#94a3b8; }
.dot.away { background:#f59e0b; }`,
        html: `<div class="user">
  <span class="avatar">👩</span>
  <span class="name">田中</span>
  <span class="status">
    <span class="dot online"></span>オンライン
  </span>
</div>`
      }
    },
    {
      title: "ラベルバッジ",
      desc: "NEW/SALE/人気などのタグ。商品カードやリストに添えるラベル。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-row { display:flex;gap:10px;flex-wrap:wrap;justify-content:center; }
          .${p}-tag { padding:4px 12px;border-radius:12px;font-size:.7rem;font-weight:700;display:inline-block; }
          .${p}-new { background:#dbeafe;color:#1d4ed8; }
          .${p}-sale { background:#fecaca;color:#dc2626; }
          .${p}-hot { background:#ffedd5;color:#ea580c; }
          .${p}-rec { background:#d1fae5;color:#059669; }
          .${p}-ltd { background:#f3e8ff;color:#7c3aed; }
        `);
        const row = h("div", `${p}-row`);
        [["NEW","new"],["SALE","sale"],["🔥 人気","hot"],["おすすめ","rec"],["期間限定","ltd"]].forEach(([t,cls]) => {
          row.append(h("span", `${p}-tag ${p}-${cls}`, t));
        });
        c.append(row);
      },
      code: {
        css: `.tag { padding:4px 12px; border-radius:12px;
  font-size:.7rem; font-weight:700; }
.tag-new { background:#dbeafe; color:#1d4ed8; }
.tag-sale { background:#fecaca; color:#dc2626; }
.tag-hot { background:#ffedd5; color:#ea580c; }`,
        html: `<span class="tag tag-new">NEW</span>
<span class="tag tag-sale">SALE</span>
<span class="tag tag-hot">🔥 人気</span>`
      }
    }
  ];

  /* ==============================
     modal — モーダル
     ============================== */
  demos["modal"] = [
    {
      title: "確認モーダル",
      desc: "OK/キャンセルの確認ダイアログ。DOM内で表示するインラインモーダル。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:150px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;overflow:hidden; }
          .${p}-ov { position:absolute;inset:0;background:rgba(0,0,0,.45);display:none;align-items:center;justify-content:center;z-index:2; }
          .${p}-ov.show { display:flex; }
          .${p}-box { background:#fff;border-radius:10px;padding:16px 20px;width:220px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.18); }
          .${p}-title { font-size:.85rem;font-weight:700;margin-bottom:6px; }
          .${p}-msg { font-size:.75rem;color:#6b7280;margin-bottom:12px; }
          .${p}-actions { display:flex;gap:8px;justify-content:center; }
          .${p}-ok { padding:6px 18px;border:none;border-radius:6px;background:#3b82f6;color:#fff;font-size:.75rem;font-weight:600;cursor:pointer; }
          .${p}-cancel { padding:6px 18px;border:1px solid #d1d5db;border-radius:6px;background:#fff;font-size:.75rem;font-weight:600;cursor:pointer;color:#374151; }
          .${p}-trigger { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:8px 18px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#ef4444;color:#fff;cursor:pointer; }
        `);
        const stage = h("div", `${p}-stage`);
        const ov = h("div", `${p}-ov`);
        const box = h("div", `${p}-box`);
        box.append(h("div", `${p}-title`, "確認"));
        box.append(h("div", `${p}-msg`, "本当に削除しますか？"));
        const actions = h("div", `${p}-actions`);
        const ok = makeBtn("OK", `${p}-ok`);
        const cancel = makeBtn("キャンセル", `${p}-cancel`);
        ok.addEventListener("click", () => ov.classList.remove("show"));
        cancel.addEventListener("click", () => ov.classList.remove("show"));
        actions.append(cancel, ok);
        box.append(actions);
        ov.append(box);
        const trigger = makeBtn("🗑 削除する", `${p}-trigger`);
        trigger.addEventListener("click", () => ov.classList.add("show"));
        stage.append(trigger, ov);
        c.append(stage);
      },
      code: {
        css: `.overlay { position:fixed; inset:0; background:rgba(0,0,0,.45);
  display:none; align-items:center; justify-content:center; }
.overlay.show { display:flex; }
.modal { background:#fff; border-radius:10px; padding:16px 20px;
  width:280px; text-align:center; box-shadow:0 8px 30px rgba(0,0,0,.18); }`,
        html: `<div class="overlay" id="ov">
  <div class="modal">
    <h3>確認</h3>
    <p>本当に削除しますか？</p>
    <button onclick="close()">キャンセル</button>
    <button onclick="close()">OK</button>
  </div>
</div>`,
        js: `function open() {
  document.getElementById('ov').classList.add('show');
}
function close() {
  document.getElementById('ov').classList.remove('show');
}`
      }
    },
    {
      title: "ゲームオーバー",
      desc: "ゲームオーバー画面。スコア表示とリトライボタン付き。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:150px;border-radius:8px;background:#0f172a;overflow:hidden;display:flex;align-items:center;justify-content:center; }
          .${p}-ov { position:absolute;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;flex-direction:column;gap:8px;z-index:2; }
          .${p}-ov.show { display:flex; }
          .${p}-go { font-size:1.4rem;font-weight:900;color:#ef4444;text-transform:uppercase; }
          .${p}-sc { font-size:.8rem;color:#94a3b8; }
          .${p}-retry { padding:8px 24px;border:2px solid #ef4444;background:none;color:#ef4444;border-radius:6px;font-size:.8rem;font-weight:700;cursor:pointer;transition:background .2s; }
          .${p}-retry:hover { background:#ef4444;color:#fff; }
          .${p}-play { padding:8px 18px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#22c55e;color:#fff;cursor:pointer; }
        `);
        const stage = h("div", `${p}-stage`);
        const ov = h("div", `${p}-ov`);
        ov.append(h("div", `${p}-go`, "GAME OVER"));
        ov.append(h("div", `${p}-sc`, "Score: 12,450"));
        const retry = makeBtn("🔄 リトライ", `${p}-retry`);
        retry.addEventListener("click", () => ov.classList.remove("show"));
        ov.append(retry);
        const play = makeBtn("▶ ゲーム開始", `${p}-play`);
        play.addEventListener("click", () => ov.classList.add("show"));
        stage.append(play, ov);
        c.append(stage);
      },
      code: {
        css: `.gameover-overlay { position:absolute; inset:0;
  background:rgba(0,0,0,.7); display:none;
  align-items:center; justify-content:center; flex-direction:column; }
.gameover-overlay.show { display:flex; }
.gameover-title { font-size:1.4rem; font-weight:900; color:#ef4444; }
.retry-btn { border:2px solid #ef4444; background:none;
  color:#ef4444; border-radius:6px; cursor:pointer; }
.retry-btn:hover { background:#ef4444; color:#fff; }`,
        html: `<div class="gameover-overlay" id="go">
  <div class="gameover-title">GAME OVER</div>
  <div>Score: 12,450</div>
  <button class="retry-btn" onclick="retry()">🔄 リトライ</button>
</div>`,
        js: `function showGameOver() {
  document.getElementById('go').classList.add('show');
}
function retry() {
  document.getElementById('go').classList.remove('show');
}`
      }
    },
    {
      title: "情報モーダル",
      desc: "お知らせ・情報表示用のモーダル。閉じるボタン付き。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:150px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;overflow:hidden; }
          .${p}-ov { position:absolute;inset:0;background:rgba(0,0,0,.4);display:none;align-items:center;justify-content:center;z-index:2; }
          .${p}-ov.show { display:flex; }
          .${p}-box { background:#fff;border-radius:12px;padding:16px;width:230px;box-shadow:0 8px 30px rgba(0,0,0,.18);position:relative; }
          .${p}-close { position:absolute;top:8px;right:10px;background:none;border:none;font-size:1rem;cursor:pointer;color:#6b7280; }
          .${p}-h { font-size:.85rem;font-weight:700;margin-bottom:6px;color:#1e293b; }
          .${p}-body { font-size:.75rem;color:#6b7280;line-height:1.6; }
          .${p}-trigger { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:8px 18px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#8b5cf6;color:#fff;cursor:pointer; }
        `);
        const stage = h("div", `${p}-stage`);
        const ov = h("div", `${p}-ov`);
        const box = h("div", `${p}-box`);
        const cls = makeBtn("✕", `${p}-close`);
        cls.addEventListener("click", () => ov.classList.remove("show"));
        box.append(cls);
        box.append(h("div", `${p}-h`, "📢 お知らせ"));
        box.append(h("div", `${p}-body`, "メンテナンスのため、明日10:00〜12:00はサービスを停止します。ご不便をおかけします。"));
        ov.append(box);
        ov.addEventListener("click", (e) => { if (e.target === ov) ov.classList.remove("show"); });
        const trigger = makeBtn("📢 お知らせを見る", `${p}-trigger`);
        trigger.addEventListener("click", () => ov.classList.add("show"));
        stage.append(trigger, ov);
        c.append(stage);
      },
      code: {
        css: `.overlay { position:fixed; inset:0; background:rgba(0,0,0,.4);
  display:none; align-items:center; justify-content:center; }
.overlay.show { display:flex; }
.info-modal { background:#fff; border-radius:12px; padding:16px;
  width:280px; position:relative; }
.close-btn { position:absolute; top:8px; right:10px;
  background:none; border:none; font-size:1rem; cursor:pointer; }`,
        html: `<div class="overlay" id="ov">
  <div class="info-modal">
    <button class="close-btn" onclick="close()">✕</button>
    <h3>📢 お知らせ</h3>
    <p>メンテナンスのため...</p>
  </div>
</div>`,
        js: `function open() {
  document.getElementById('ov').classList.add('show');
}
function close() {
  document.getElementById('ov').classList.remove('show');
}`
      }
    }
  ];

  /* ==============================
     dialog — ダイアログ
     ============================== */
  demos["dialog"] = [
    {
      title: "確認ダイアログ",
      desc: "セーブして終了？の確認ダイアログ。はい/いいえ選択。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:150px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;overflow:hidden; }
          .${p}-ov { position:absolute;inset:0;background:rgba(0,0,0,.4);display:none;align-items:center;justify-content:center;z-index:2; }
          .${p}-ov.show { display:flex; }
          .${p}-dlg { background:#fff;border-radius:10px;padding:16px 20px;width:230px;box-shadow:0 4px 20px rgba(0,0,0,.15); }
          .${p}-ico { font-size:1.5rem;text-align:center;margin-bottom:6px; }
          .${p}-msg { font-size:.8rem;text-align:center;margin-bottom:12px;color:#374151; }
          .${p}-btns { display:flex;gap:8px;justify-content:center; }
          .${p}-yes { padding:6px 18px;border:none;border-radius:6px;background:#3b82f6;color:#fff;font-size:.75rem;font-weight:600;cursor:pointer; }
          .${p}-no { padding:6px 18px;border:1px solid #d1d5db;border-radius:6px;background:#fff;font-size:.75rem;font-weight:600;cursor:pointer;color:#374151; }
          .${p}-trigger { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:8px 18px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#64748b;color:#fff;cursor:pointer; }
        `);
        const stage = h("div", `${p}-stage`);
        const ov = h("div", `${p}-ov`);
        const dlg = h("div", `${p}-dlg`);
        dlg.append(h("div", `${p}-ico`, "💾"));
        dlg.append(h("div", `${p}-msg`, "セーブして終了しますか？"));
        const btns = h("div", `${p}-btns`);
        const no = makeBtn("いいえ", `${p}-no`);
        const yes = makeBtn("はい", `${p}-yes`);
        no.addEventListener("click", () => ov.classList.remove("show"));
        yes.addEventListener("click", () => ov.classList.remove("show"));
        btns.append(no, yes);
        dlg.append(btns);
        ov.append(dlg);
        const trigger = makeBtn("⏹ 終了する", `${p}-trigger`);
        trigger.addEventListener("click", () => ov.classList.add("show"));
        stage.append(trigger, ov);
        c.append(stage);
      },
      code: {
        css: `.dialog-overlay { position:fixed; inset:0; background:rgba(0,0,0,.4);
  display:none; align-items:center; justify-content:center; }
.dialog-overlay.show { display:flex; }
.dialog { background:#fff; border-radius:10px; padding:16px 20px;
  width:260px; text-align:center; }`,
        html: `<div class="dialog-overlay" id="dlg">
  <div class="dialog">
    <div>💾</div>
    <p>セーブして終了しますか？</p>
    <button onclick="close()">いいえ</button>
    <button onclick="close()">はい</button>
  </div>
</div>`,
        js: `function open() {
  document.getElementById('dlg').classList.add('show');
}
function close() {
  document.getElementById('dlg').classList.remove('show');
}`
      }
    },
    {
      title: "警告ダイアログ",
      desc: "データが消えます！の警告表示。赤い強調デザイン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:150px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;overflow:hidden; }
          .${p}-ov { position:absolute;inset:0;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:2; }
          .${p}-ov.show { display:flex; }
          .${p}-dlg { background:#fff;border-radius:10px;padding:16px 20px;width:230px;border-top:4px solid #ef4444; }
          .${p}-ico { font-size:1.5rem;text-align:center;margin-bottom:4px; }
          .${p}-h { font-size:.85rem;font-weight:700;color:#dc2626;text-align:center;margin-bottom:4px; }
          .${p}-msg { font-size:.75rem;color:#6b7280;text-align:center;margin-bottom:12px; }
          .${p}-btns { display:flex;gap:8px;justify-content:center; }
          .${p}-del { padding:6px 18px;border:none;border-radius:6px;background:#ef4444;color:#fff;font-size:.75rem;font-weight:600;cursor:pointer; }
          .${p}-keep { padding:6px 18px;border:1px solid #d1d5db;border-radius:6px;background:#fff;font-size:.75rem;font-weight:600;cursor:pointer;color:#374151; }
          .${p}-trigger { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:8px 18px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#ef4444;color:#fff;cursor:pointer; }
        `);
        const stage = h("div", `${p}-stage`);
        const ov = h("div", `${p}-ov`);
        const dlg = h("div", `${p}-dlg`);
        dlg.append(h("div", `${p}-ico`, "⚠️"));
        dlg.append(h("div", `${p}-h`, "警告"));
        dlg.append(h("div", `${p}-msg`, "この操作を実行するとデータが完全に削除されます。元に戻せません。"));
        const btns = h("div", `${p}-btns`);
        const keep = makeBtn("キャンセル", `${p}-keep`);
        const del = makeBtn("削除する", `${p}-del`);
        keep.addEventListener("click", () => ov.classList.remove("show"));
        del.addEventListener("click", () => ov.classList.remove("show"));
        btns.append(keep, del);
        dlg.append(btns);
        ov.append(dlg);
        const trigger = makeBtn("⚠️ データ削除", `${p}-trigger`);
        trigger.addEventListener("click", () => ov.classList.add("show"));
        stage.append(trigger, ov);
        c.append(stage);
      },
      code: {
        css: `.warn-dialog { background:#fff; border-radius:10px;
  padding:16px 20px; border-top:4px solid #ef4444; }
.warn-title { color:#dc2626; font-weight:700; }
.del-btn { background:#ef4444; color:#fff; border:none;
  border-radius:6px; cursor:pointer; }`,
        html: `<div class="dialog-overlay" id="dlg">
  <div class="warn-dialog">
    <div>⚠️</div>
    <h3 class="warn-title">警告</h3>
    <p>データが完全に削除されます。</p>
    <button onclick="close()">キャンセル</button>
    <button class="del-btn" onclick="close()">削除する</button>
  </div>
</div>`
      }
    },
    {
      title: "入力ダイアログ",
      desc: "名前入力を求めるダイアログ。入力フィールド付き。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:150px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;overflow:hidden; }
          .${p}-ov { position:absolute;inset:0;background:rgba(0,0,0,.4);display:none;align-items:center;justify-content:center;z-index:2; }
          .${p}-ov.show { display:flex; }
          .${p}-dlg { background:#fff;border-radius:10px;padding:16px 20px;width:230px; }
          .${p}-h { font-size:.85rem;font-weight:700;margin-bottom:8px; }
          .${p}-input { width:100%;padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:.8rem;outline:none;box-sizing:border-box;margin-bottom:10px; }
          .${p}-input:focus { border-color:#3b82f6; }
          .${p}-btns { display:flex;gap:8px;justify-content:flex-end; }
          .${p}-ok { padding:6px 16px;border:none;border-radius:6px;background:#3b82f6;color:#fff;font-size:.75rem;font-weight:600;cursor:pointer; }
          .${p}-cancel { padding:6px 16px;border:1px solid #d1d5db;border-radius:6px;background:#fff;font-size:.75rem;cursor:pointer;color:#374151; }
          .${p}-trigger { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:8px 18px;font-size:.8rem;font-weight:600;border:none;border-radius:6px;background:#8b5cf6;color:#fff;cursor:pointer; }
          .${p}-result { position:absolute;bottom:8px;left:0;right:0;text-align:center;font-size:.75rem;color:#22c55e;font-weight:600; }
        `);
        const stage = h("div", `${p}-stage`);
        const ov = h("div", `${p}-ov`);
        const dlg = h("div", `${p}-dlg`);
        dlg.append(h("div", `${p}-h`, "名前を入力してください"));
        const input = h("input", `${p}-input`);
        input.placeholder = "プレイヤー名";
        const result = h("div", `${p}-result`);
        const btns = h("div", `${p}-btns`);
        const cancel = makeBtn("キャンセル", `${p}-cancel`);
        const ok = makeBtn("決定", `${p}-ok`);
        cancel.addEventListener("click", () => { ov.classList.remove("show"); });
        ok.addEventListener("click", () => {
          const v = input.value.trim();
          if (v) { result.textContent = "ようこそ、" + v + " さん！"; }
          ov.classList.remove("show");
        });
        btns.append(cancel, ok);
        dlg.append(input, btns);
        ov.append(dlg);
        const trigger = makeBtn("✏️ 名前を設定", `${p}-trigger`);
        trigger.addEventListener("click", () => { input.value = ""; ov.classList.add("show"); });
        stage.append(trigger, ov, result);
        c.append(stage);
      },
      code: {
        css: `.input-dialog { background:#fff; border-radius:10px; padding:16px 20px; }
.dialog-input { width:100%; padding:8px 10px; border:1px solid #d1d5db;
  border-radius:6px; font-size:.8rem; outline:none; box-sizing:border-box; }
.dialog-input:focus { border-color:#3b82f6; }`,
        html: `<div class="dialog-overlay" id="dlg">
  <div class="input-dialog">
    <h3>名前を入力してください</h3>
    <input class="dialog-input" id="nameInput" placeholder="プレイヤー名" />
    <button onclick="close()">キャンセル</button>
    <button onclick="submit()">決定</button>
  </div>
</div>`,
        js: `function submit() {
  const name = document.getElementById('nameInput').value;
  if (name) alert('ようこそ、' + name + 'さん！');
  close();
}`
      }
    }
  ];

  /* ==============================
     overlay — オーバーレイ
     ============================== */
  demos["overlay"] = [
    {
      title: "ポーズ画面",
      desc: "暗い幕+PAUSED表示。ゲームの一時停止画面。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:150px;border-radius:8px;background:#1e3a5f;overflow:hidden;display:flex;align-items:center;justify-content:center; }
          .${p}-game { font-size:.8rem;color:#94a3b8;text-align:center; }
          .${p}-ov { position:absolute;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;flex-direction:column;gap:10px;z-index:2; }
          .${p}-ov.show { display:flex; }
          .${p}-title { font-size:1.6rem;font-weight:900;color:#fff;letter-spacing:6px; }
          .${p}-sub { font-size:.75rem;color:#94a3b8; }
          .${p}-btn { padding:6px 18px;font-size:.75rem;font-weight:600;border:1px solid #94a3b8;border-radius:6px;background:none;color:#fff;cursor:pointer; }
          .${p}-btn:hover { background:rgba(255,255,255,.1); }
          .${p}-pbtn { position:absolute;top:8px;right:8px;padding:4px 10px;font-size:.75rem;border:none;border-radius:4px;background:rgba(255,255,255,.15);color:#fff;cursor:pointer;z-index:1; }
        `);
        const stage = h("div", `${p}-stage`);
        stage.append(h("div", `${p}-game`, "🎮 ゲーム画面"));
        const ov = h("div", `${p}-ov`);
        ov.append(h("div", `${p}-title`, "PAUSED"));
        ov.append(h("div", `${p}-sub`, "ESCキーまたはボタンで再開"));
        const resume = makeBtn("▶ 再開", `${p}-btn`);
        resume.addEventListener("click", () => ov.classList.remove("show"));
        ov.append(resume);
        const pbtn = makeBtn("⏸ 一時停止", `${p}-pbtn`);
        pbtn.addEventListener("click", () => ov.classList.add("show"));
        stage.append(pbtn, ov);
        c.append(stage);
      },
      code: {
        css: `.pause-overlay { position:absolute; inset:0;
  background:rgba(0,0,0,.7); display:none;
  align-items:center; justify-content:center; flex-direction:column; }
.pause-overlay.show { display:flex; }
.pause-title { font-size:1.6rem; font-weight:900;
  color:#fff; letter-spacing:6px; }`,
        html: `<div class="game-screen">
  <div class="pause-overlay" id="pause">
    <div class="pause-title">PAUSED</div>
    <button onclick="resume()">▶ 再開</button>
  </div>
</div>`,
        js: `function pause() {
  document.getElementById('pause').classList.add('show');
}
function resume() {
  document.getElementById('pause').classList.remove('show');
}`
      }
    },
    {
      title: "ローディング",
      desc: "半透明のオーバーレイ+スピナーで読み込み中を表現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:150px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;overflow:hidden;padding:12px; }
          .${p}-text { font-size:.8rem;color:#374151; }
          .${p}-ov { position:absolute;inset:0;background:rgba(255,255,255,.85);display:none;align-items:center;justify-content:center;flex-direction:column;gap:10px;z-index:2; }
          .${p}-ov.show { display:flex; }
          .${p}-spinner { width:36px;height:36px;border:3px solid #e5e7eb;border-top-color:#3b82f6;border-radius:50%;animation:${p}-spin .7s linear infinite; }
          @keyframes ${p}-spin { to{transform:rotate(360deg)} }
          .${p}-msg { font-size:.75rem;color:#6b7280; }
          .${p}-btn { margin-top:8px;padding:6px 14px;font-size:.75rem;font-weight:600;border:none;border-radius:4px;background:#3b82f6;color:#fff;cursor:pointer; }
        `);
        const stage = h("div", `${p}-stage`);
        stage.append(h("div", `${p}-text`, "ここにコンテンツがあります。ボタンを押すとローディングオーバーレイが表示されます。"));
        const ov = h("div", `${p}-ov`);
        ov.append(h("div", `${p}-spinner`));
        ov.append(h("div", `${p}-msg`, "読み込み中..."));
        const btn = makeBtn("読み込み開始", `${p}-btn`);
        btn.addEventListener("click", () => {
          ov.classList.add("show");
          setTimeout(() => ov.classList.remove("show"), 2000);
        });
        stage.append(btn, ov);
        c.append(stage);
      },
      code: {
        css: `.loading-overlay { position:absolute; inset:0;
  background:rgba(255,255,255,.85); display:none;
  align-items:center; justify-content:center; flex-direction:column; }
.loading-overlay.show { display:flex; }
.spinner { width:36px; height:36px; border:3px solid #e5e7eb;
  border-top-color:#3b82f6; border-radius:50%;
  animation:spin .7s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }`,
        html: `<div class="container">
  <div class="loading-overlay" id="loading">
    <div class="spinner"></div>
    <span>読み込み中...</span>
  </div>
</div>`,
        js: `function startLoading() {
  const ov = document.getElementById('loading');
  ov.classList.add('show');
  setTimeout(() => ov.classList.remove('show'), 2000);
}`
      }
    },
    {
      title: "画像プレビュー",
      desc: "暗い背景に拡大表示。ライトボックス風のオーバーレイ。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:150px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;overflow:hidden; }
          .${p}-thumbs { display:flex;gap:8px;padding:10px;justify-content:center; }
          .${p}-thumb { width:60px;height:44px;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.5rem;transition:transform .2s;border:2px solid #e5e7eb;background:#fff; }
          .${p}-thumb:hover { transform:scale(1.1); }
          .${p}-ov { position:absolute;inset:0;background:rgba(0,0,0,.85);display:none;align-items:center;justify-content:center;flex-direction:column;gap:8px;z-index:2;cursor:pointer; }
          .${p}-ov.show { display:flex; }
          .${p}-big { font-size:3.5rem; }
          .${p}-cap { font-size:.75rem;color:#d1d5db; }
        `);
        const stage = h("div", `${p}-stage`);
        const thumbs = h("div", `${p}-thumbs`);
        const ov = h("div", `${p}-ov`);
        const big = h("div", `${p}-big`);
        const cap = h("div", `${p}-cap`);
        ov.append(big, cap);
        ov.addEventListener("click", () => ov.classList.remove("show"));
        const imgs = [["🏔","山の風景"],["🌊","海の風景"],["🌆","街の風景"]];
        imgs.forEach(([emoji,label]) => {
          const thumb = h("div", `${p}-thumb`, emoji);
          thumb.addEventListener("click", () => {
            big.textContent = emoji;
            cap.textContent = label;
            ov.classList.add("show");
          });
          thumbs.append(thumb);
        });
        stage.append(thumbs, ov);
        c.append(stage);
      },
      code: {
        css: `.lightbox { position:fixed; inset:0; background:rgba(0,0,0,.85);
  display:none; align-items:center; justify-content:center;
  cursor:pointer; flex-direction:column; }
.lightbox.show { display:flex; }
.lightbox img { max-width:90%; max-height:80%; border-radius:8px; }
.thumbnail { cursor:pointer; transition:transform .2s; }
.thumbnail:hover { transform:scale(1.1); }`,
        html: `<div class="gallery">
  <img class="thumbnail" src="..." onclick="preview(this)" />
</div>
<div class="lightbox" id="lb" onclick="close()">
  <img id="lbImg" />
</div>`,
        js: `function preview(thumb) {
  document.getElementById('lbImg').src = thumb.src;
  document.getElementById('lb').classList.add('show');
}
function close() {
  document.getElementById('lb').classList.remove('show');
}`
      }
    }
  ];

  /* ==============================
     splash-screen — スプラッシュスクリーン
     ============================== */
  demos["splash-screen"] = [
    {
      title: "ゲーム起動",
      desc: "タイトル+ローディングバーのゲーム起動画面。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { position:relative;width:100%;height:150px;border-radius:8px;background:linear-gradient(135deg,#0f172a,#1e3a5f);
            display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;overflow:hidden; }
          .${p}-title { font-size:1.3rem;font-weight:900;color:#fff;letter-spacing:3px; }
          .${p}-sub { font-size:.65rem;color:#64748b; }
          .${p}-track { width:60%;height:6px;background:#334155;border-radius:3px;overflow:hidden; }
          .${p}-fill { height:100%;width:0;background:linear-gradient(90deg,#3b82f6,#8b5cf6);border-radius:3px;transition:width .3s; }
          .${p}-msg { font-size:.65rem;color:#64748b; }
        `);
        const stage = h("div", `${p}-stage`);
        stage.append(h("div", `${p}-title`, "QUEST SAGA"));
        stage.append(h("div", `${p}-sub`, "PRESS START"));
        const track = h("div", `${p}-track`);
        const fill = h("div", `${p}-fill`);
        track.append(fill);
        const msg = h("div", `${p}-msg`, "Now Loading...");
        stage.append(track, msg);
        let w = 0;
        const iv = setInterval(() => {
          w = Math.min(100, w + Math.floor(Math.random() * 12) + 3);
          fill.style.width = w + "%";
          if (w >= 100) { clearInterval(iv); msg.textContent = "Ready!"; }
        }, 300);
        c.append(stage);
      },
      code: {
        css: `.splash { background:linear-gradient(135deg,#0f172a,#1e3a5f);
  display:flex; align-items:center; justify-content:center;
  flex-direction:column; }
.splash-title { font-size:1.3rem; font-weight:900;
  color:#fff; letter-spacing:3px; }
.load-track { width:60%; height:6px; background:#334155;
  border-radius:3px; overflow:hidden; }
.load-fill { height:100%; background:linear-gradient(90deg,#3b82f6,#8b5cf6);
  border-radius:3px; transition:width .3s; }`,
        html: `<div class="splash">
  <div class="splash-title">QUEST SAGA</div>
  <div class="load-track">
    <div class="load-fill" id="bar"></div>
  </div>
  <span>Now Loading...</span>
</div>`
      }
    },
    {
      title: "アプリ起動",
      desc: "ロゴ+パルスアニメーションのスプラッシュ。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { width:100%;height:150px;border-radius:8px;background:#fff;
            display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px; }
          .${p}-logo { width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);
            display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:#fff;
            animation:${p}-pulse 1.5s ease-in-out infinite; }
          @keyframes ${p}-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
          .${p}-name { font-size:.9rem;font-weight:700;color:#1e293b; }
          .${p}-dots { display:flex;gap:4px; }
          .${p}-dot { width:6px;height:6px;border-radius:50%;background:#3b82f6;animation:${p}-bounce .8s ease-in-out infinite; }
          .${p}-dot:nth-child(2) { animation-delay:.15s; }
          .${p}-dot:nth-child(3) { animation-delay:.3s; }
          @keyframes ${p}-bounce { 0%,100%{opacity:.3} 50%{opacity:1} }
        `);
        const stage = h("div", `${p}-stage`);
        stage.append(h("div", `${p}-logo`, "📱"));
        stage.append(h("div", `${p}-name`, "MyApp"));
        const dots = h("div", `${p}-dots`);
        for (let i = 0; i < 3; i++) dots.append(h("div", `${p}-dot`));
        stage.append(dots);
        c.append(stage);
      },
      code: {
        css: `.splash { display:flex; align-items:center; justify-content:center;
  flex-direction:column; background:#fff; }
.logo { width:56px; height:56px; border-radius:16px;
  background:linear-gradient(135deg,#3b82f6,#8b5cf6);
  animation:pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
.dot { width:6px; height:6px; border-radius:50%; background:#3b82f6;
  animation:bounce .8s ease-in-out infinite; }`,
        html: `<div class="splash">
  <div class="logo">📱</div>
  <div class="app-name">MyApp</div>
  <div class="dots">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</div>`
      }
    },
    {
      title: "ブランド画面",
      desc: "ロゴがフェードインするブランド表示。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { width:100%;height:150px;border-radius:8px;background:#0f172a;
            display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px; }
          .${p}-logo { font-size:2.5rem;opacity:0;animation:${p}-fi 1.5s ease forwards; }
          .${p}-brand { font-size:1rem;font-weight:800;color:#fff;letter-spacing:4px;opacity:0;animation:${p}-fi 1.5s ease .5s forwards; }
          .${p}-sub { font-size:.65rem;color:#475569;opacity:0;animation:${p}-fi 1.5s ease 1s forwards; }
          @keyframes ${p}-fi { to{opacity:1} }
        `);
        const stage = h("div", `${p}-stage`);
        stage.append(h("div", `${p}-logo`, "💎"));
        stage.append(h("div", `${p}-brand`, "GEMSTONE"));
        stage.append(h("div", `${p}-sub`, "Crafted with passion"));
        c.append(stage);
      },
      code: {
        css: `.brand-splash { background:#0f172a; display:flex;
  align-items:center; justify-content:center; flex-direction:column; }
.brand-logo { font-size:2.5rem; opacity:0;
  animation:fadeIn 1.5s ease forwards; }
.brand-name { font-size:1rem; font-weight:800; color:#fff;
  letter-spacing:4px; opacity:0; animation:fadeIn 1.5s ease .5s forwards; }
@keyframes fadeIn { to { opacity:1; } }`,
        html: `<div class="brand-splash">
  <div class="brand-logo">💎</div>
  <div class="brand-name">GEMSTONE</div>
  <div class="brand-sub">Crafted with passion</div>
</div>`
      }
    }
  ];

  /* ==============================
     primary-button — プライマリボタン
     ============================== */
  demos["primary-button"] = [
    {
      title: "基本のプライマリボタン",
      desc: "目立つデザインの主要アクションボタン。ホバー・アクティブ状態付き。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-btn { padding:12px 32px;font-size:.9rem;font-weight:700;border:none;border-radius:8px;
            background:#3b82f6;color:#fff;cursor:pointer;transition:background .2s,transform .1s,box-shadow .2s;
            box-shadow:0 2px 8px rgba(59,130,246,.3); }
          .${p}-btn:hover { background:#2563eb;box-shadow:0 4px 16px rgba(59,130,246,.4); }
          .${p}-btn:active { transform:scale(.96); }
        `);
        const btn = makeBtn("プライマリボタン", `${p}-btn`);
        c.append(btn);
      },
      code: {
        css: `.primary-btn { padding:12px 32px; font-size:.9rem; font-weight:700;
  border:none; border-radius:8px; background:#3b82f6; color:#fff;
  cursor:pointer; transition:background .2s, transform .1s, box-shadow .2s;
  box-shadow:0 2px 8px rgba(59,130,246,.3); }
.primary-btn:hover { background:#2563eb;
  box-shadow:0 4px 16px rgba(59,130,246,.4); }
.primary-btn:active { transform:scale(.96); }`,
        html: `<button class="primary-btn">プライマリボタン</button>`
      }
    },
    {
      title: "サイズバリエーション",
      desc: "Small / Medium / Large のサイズ展開。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-row { display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center; }
          .${p}-sm { padding:6px 14px;font-size:.7rem;font-weight:600;border:none;border-radius:6px;background:#3b82f6;color:#fff;cursor:pointer; }
          .${p}-md { padding:10px 24px;font-size:.8rem;font-weight:600;border:none;border-radius:8px;background:#3b82f6;color:#fff;cursor:pointer; }
          .${p}-lg { padding:14px 32px;font-size:.95rem;font-weight:700;border:none;border-radius:10px;background:#3b82f6;color:#fff;cursor:pointer; }
        `);
        const row = h("div", `${p}-row`);
        row.append(makeBtn("Small", `${p}-sm`));
        row.append(makeBtn("Medium", `${p}-md`));
        row.append(makeBtn("Large", `${p}-lg`));
        c.append(row);
      },
      code: {
        css: `.btn-sm { padding:6px 14px; font-size:.7rem; }
.btn-md { padding:10px 24px; font-size:.8rem; }
.btn-lg { padding:14px 32px; font-size:.95rem; }
.btn { border:none; border-radius:8px; background:#3b82f6;
  color:#fff; font-weight:600; cursor:pointer; }`,
        html: `<button class="btn btn-sm">Small</button>
<button class="btn btn-md">Medium</button>
<button class="btn btn-lg">Large</button>`
      }
    },
    {
      title: "使い分けシーン",
      desc: "ゲーム開始・購入・保存の3つのシーンでの使用例。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-row { display:flex;gap:10px;flex-wrap:wrap;justify-content:center; }
          .${p}-btn { padding:10px 22px;font-size:.8rem;font-weight:700;border:none;border-radius:8px;color:#fff;cursor:pointer;transition:transform .1s; }
          .${p}-btn:active { transform:scale(.95); }
          .${p}-play { background:#22c55e; }
          .${p}-buy { background:#f59e0b; }
          .${p}-save { background:#3b82f6; }
        `);
        const row = h("div", `${p}-row`);
        row.append(makeBtn("▶ ゲーム開始", `${p}-btn ${p}-play`));
        row.append(makeBtn("🛒 購入する", `${p}-btn ${p}-buy`));
        row.append(makeBtn("💾 保存する", `${p}-btn ${p}-save`));
        c.append(row);
      },
      code: {
        css: `.primary-btn { padding:10px 22px; font-size:.8rem; font-weight:700;
  border:none; border-radius:8px; color:#fff; cursor:pointer; }
.btn-play { background:#22c55e; }
.btn-buy { background:#f59e0b; }
.btn-save { background:#3b82f6; }`,
        html: `<button class="primary-btn btn-play">▶ ゲーム開始</button>
<button class="primary-btn btn-buy">🛒 購入する</button>
<button class="primary-btn btn-save">💾 保存する</button>`
      }
    }
  ];

  /* ==============================
     secondary-button — セカンダリボタン
     ============================== */
  demos["secondary-button"] = [
    {
      title: "基本のセカンダリボタン",
      desc: "控えめなデザインのサブアクションボタン。枠線スタイル。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-btn { padding:10px 28px;font-size:.85rem;font-weight:600;border:2px solid #d1d5db;border-radius:8px;
            background:#fff;color:#374151;cursor:pointer;transition:background .2s,border-color .2s; }
          .${p}-btn:hover { background:#f3f4f6;border-color:#9ca3af; }
        `);
        c.append(makeBtn("セカンダリボタン", `${p}-btn`));
      },
      code: {
        css: `.secondary-btn { padding:10px 28px; font-size:.85rem; font-weight:600;
  border:2px solid #d1d5db; border-radius:8px;
  background:#fff; color:#374151; cursor:pointer;
  transition:background .2s, border-color .2s; }
.secondary-btn:hover { background:#f3f4f6; border-color:#9ca3af; }`,
        html: `<button class="secondary-btn">セカンダリボタン</button>`
      }
    },
    {
      title: "プライマリとの組み合わせ",
      desc: "プライマリ/セカンダリを並べた比較。メイン操作とサブ操作の使い分け。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-row { display:flex;gap:10px;justify-content:center;flex-wrap:wrap; }
          .${p}-pri { padding:10px 24px;font-size:.8rem;font-weight:700;border:none;border-radius:8px;background:#3b82f6;color:#fff;cursor:pointer; }
          .${p}-sec { padding:10px 24px;font-size:.8rem;font-weight:600;border:2px solid #d1d5db;border-radius:8px;background:#fff;color:#374151;cursor:pointer; }
          .${p}-lbl { font-size:.6rem;color:#9ca3af;text-align:center;margin-top:2px; }
        `);
        const row = h("div", `${p}-row`);
        const g1 = h("div",""); g1.append(makeBtn("保存する", `${p}-pri`)); g1.append(h("div",`${p}-lbl`,"Primary"));
        const g2 = h("div",""); g2.append(makeBtn("キャンセル", `${p}-sec`)); g2.append(h("div",`${p}-lbl`,"Secondary"));
        row.append(g2, g1);
        c.append(row);
      },
      code: {
        css: `.primary { padding:10px 24px; background:#3b82f6; color:#fff;
  border:none; border-radius:8px; font-weight:700; }
.secondary { padding:10px 24px; background:#fff; color:#374151;
  border:2px solid #d1d5db; border-radius:8px; font-weight:600; }`,
        html: `<button class="secondary">キャンセル</button>
<button class="primary">保存する</button>`
      }
    },
    {
      title: "使い分けシーン",
      desc: "キャンセル・戻る・リセットの3つのセカンダリボタン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-row { display:flex;gap:10px;flex-wrap:wrap;justify-content:center; }
          .${p}-btn { padding:8px 20px;font-size:.8rem;font-weight:600;border:2px solid #d1d5db;border-radius:8px;
            background:#fff;color:#374151;cursor:pointer;transition:background .2s; }
          .${p}-btn:hover { background:#f3f4f6; }
        `);
        const row = h("div", `${p}-row`);
        row.append(makeBtn("✕ キャンセル", `${p}-btn`));
        row.append(makeBtn("← 戻る", `${p}-btn`));
        row.append(makeBtn("🔄 リセット", `${p}-btn`));
        c.append(row);
      },
      code: {
        css: `.secondary-btn { padding:8px 20px; font-size:.8rem; font-weight:600;
  border:2px solid #d1d5db; border-radius:8px;
  background:#fff; color:#374151; cursor:pointer; }
.secondary-btn:hover { background:#f3f4f6; }`,
        html: `<button class="secondary-btn">✕ キャンセル</button>
<button class="secondary-btn">← 戻る</button>
<button class="secondary-btn">🔄 リセット</button>`
      }
    }
  ];

  /* ==============================
     toggle-button — トグルボタン
     ============================== */
  demos["toggle-button"] = [
    {
      title: "基本ON/OFF",
      desc: "BGMのON/OFFを切り替えるトグルスイッチ。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-row { display:flex;align-items:center;gap:12px;justify-content:center; }
          .${p}-label { font-size:.85rem;font-weight:600; }
          .${p}-track { width:48px;height:26px;border-radius:13px;background:#d1d5db;cursor:pointer;position:relative;transition:background .25s; }
          .${p}-track.on { background:#3b82f6; }
          .${p}-knob { width:22px;height:22px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;transition:left .25s;box-shadow:0 1px 3px rgba(0,0,0,.2); }
          .${p}-track.on .${p}-knob { left:24px; }
          .${p}-state { font-size:.75rem;color:#6b7280;min-width:30px; }
        `);
        const row = h("div", `${p}-row`);
        row.append(h("span", `${p}-label`, "🎵 BGM"));
        const track = h("div", `${p}-track on`);
        track.append(h("div", `${p}-knob`));
        const state = h("span", `${p}-state`, "ON");
        track.addEventListener("click", () => {
          track.classList.toggle("on");
          state.textContent = track.classList.contains("on") ? "ON" : "OFF";
        });
        row.append(track, state);
        c.append(row);
      },
      code: {
        css: `.toggle-track { width:48px; height:26px; border-radius:13px;
  background:#d1d5db; cursor:pointer; position:relative;
  transition:background .25s; }
.toggle-track.on { background:#3b82f6; }
.toggle-knob { width:22px; height:22px; border-radius:50%;
  background:#fff; position:absolute; top:2px; left:2px;
  transition:left .25s; box-shadow:0 1px 3px rgba(0,0,0,.2); }
.toggle-track.on .toggle-knob { left:24px; }`,
        html: `<span>🎵 BGM</span>
<div class="toggle-track on" id="toggle" onclick="toggle()">
  <div class="toggle-knob"></div>
</div>`,
        js: `function toggle() {
  document.getElementById('toggle').classList.toggle('on');
}`
      }
    },
    {
      title: "複数設定",
      desc: "設定項目リスト。各項目に独立したトグル。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-list { display:flex;flex-direction:column;gap:8px;width:100%; }
          .${p}-item { display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#f9fafb;border-radius:6px; }
          .${p}-lbl { font-size:.8rem;font-weight:600; }
          .${p}-sw { width:40px;height:22px;border-radius:11px;background:#d1d5db;cursor:pointer;position:relative;transition:background .25s;flex-shrink:0; }
          .${p}-sw.on { background:#22c55e; }
          .${p}-knob { width:18px;height:18px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;transition:left .25s;box-shadow:0 1px 2px rgba(0,0,0,.15); }
          .${p}-sw.on .${p}-knob { left:20px; }
        `);
        const list = h("div", `${p}-list`);
        const items = [["🔔 通知",true],["🎵 BGM",true],["🔊 効果音",false],["📳 振動",false]];
        items.forEach(([label, isOn]) => {
          const item = h("div", `${p}-item`);
          item.append(h("span", `${p}-lbl`, label));
          const sw = h("div", `${p}-sw${isOn ? " on" : ""}`);
          sw.append(h("div", `${p}-knob`));
          sw.addEventListener("click", () => sw.classList.toggle("on"));
          item.append(sw);
          list.append(item);
        });
        c.append(list);
      },
      code: {
        css: `.setting-item { display:flex; align-items:center;
  justify-content:space-between; padding:8px 12px; }
.toggle { width:40px; height:22px; border-radius:11px;
  background:#d1d5db; cursor:pointer; position:relative; }
.toggle.on { background:#22c55e; }
.toggle-knob { width:18px; height:18px; border-radius:50%;
  background:#fff; position:absolute; top:2px; left:2px;
  transition:left .25s; }
.toggle.on .toggle-knob { left:20px; }`,
        html: `<div class="setting-item">
  <span>🔔 通知</span>
  <div class="toggle on" onclick="this.classList.toggle('on')">
    <div class="toggle-knob"></div>
  </div>
</div>`
      }
    },
    {
      title: "テーマ切り替え",
      desc: "ライト/ダークテーマをトグルで切り替え。プレビュー付き。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-preview { width:100%;height:80px;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:10px;
            display:flex;align-items:center;justify-content:center;transition:background .3s,color .3s;
            font-size:.85rem;font-weight:600;background:#fff;color:#1e293b; }
          .${p}-preview.dark { background:#1e293b;color:#e2e8f0;border-color:#334155; }
          .${p}-row { display:flex;align-items:center;gap:8px;justify-content:center; }
          .${p}-icon { font-size:1rem; }
          .${p}-sw { width:48px;height:26px;border-radius:13px;background:#f59e0b;cursor:pointer;position:relative;transition:background .3s; }
          .${p}-sw.dark { background:#6366f1; }
          .${p}-knob { width:22px;height:22px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;transition:left .25s; }
          .${p}-sw.dark .${p}-knob { left:24px; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const preview = h("div", `${p}-preview`, "プレビュー領域");
        const row = h("div", `${p}-row`);
        row.append(h("span", `${p}-icon`, "☀️"));
        const sw = h("div", `${p}-sw`);
        sw.append(h("div", `${p}-knob`));
        row.append(sw);
        row.append(h("span", `${p}-icon`, "🌙"));
        sw.addEventListener("click", () => {
          sw.classList.toggle("dark");
          preview.classList.toggle("dark");
          preview.textContent = sw.classList.contains("dark") ? "ダークモード" : "ライトモード";
        });
        wrap.append(preview, row);
        c.append(wrap);
      },
      code: {
        css: `.preview { transition:background .3s, color .3s; }
.preview.dark { background:#1e293b; color:#e2e8f0; }
.theme-toggle { width:48px; height:26px; border-radius:13px;
  background:#f59e0b; cursor:pointer; position:relative;
  transition:background .3s; }
.theme-toggle.dark { background:#6366f1; }
.theme-knob { width:22px; height:22px; border-radius:50%;
  background:#fff; position:absolute; top:2px; left:2px;
  transition:left .25s; }
.theme-toggle.dark .theme-knob { left:24px; }`,
        html: `<div class="preview" id="preview">ライトモード</div>
<span>☀️</span>
<div class="theme-toggle" id="sw" onclick="toggleTheme()">
  <div class="theme-knob"></div>
</div>
<span>🌙</span>`,
        js: `function toggleTheme() {
  document.getElementById('sw').classList.toggle('dark');
  document.getElementById('preview').classList.toggle('dark');
}`
      }
    }
  ];

  /* ==============================
     textbox — テキストボックス
     ============================== */
  demos["textbox"] = [
    {
      title: "基本入力",
      desc: "ラベル付きの基本的なテキスト入力欄。フォーカス時にボーダーが変化。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-group { display:flex;flex-direction:column;gap:4px;width:100%; }
          .${p}-label { font-size:.75rem;font-weight:600;color:#374151; }
          .${p}-input { padding:10px 12px;border:2px solid #e5e7eb;border-radius:6px;font-size:.85rem;outline:none;
            transition:border-color .2s;width:100%;box-sizing:border-box; }
          .${p}-input:focus { border-color:#3b82f6; }
          .${p}-hint { font-size:.65rem;color:#9ca3af; }
        `);
        const g = h("div", `${p}-group`);
        g.append(h("label", `${p}-label`, "ユーザー名"));
        const input = h("input", `${p}-input`);
        input.type = "text";
        input.placeholder = "例: taro_yamada";
        g.append(input);
        g.append(h("span", `${p}-hint`, "半角英数字で入力してください"));
        c.append(g);
      },
      code: {
        css: `.form-group { display:flex; flex-direction:column; gap:4px; }
.form-label { font-size:.75rem; font-weight:600; color:#374151; }
.form-input { padding:10px 12px; border:2px solid #e5e7eb;
  border-radius:6px; font-size:.85rem; outline:none;
  transition:border-color .2s; }
.form-input:focus { border-color:#3b82f6; }`,
        html: `<div class="form-group">
  <label class="form-label">ユーザー名</label>
  <input class="form-input" placeholder="例: taro_yamada" />
  <span class="hint">半角英数字で入力してください</span>
</div>`
      }
    },
    {
      title: "バリデーション",
      desc: "正しい入力とエラー状態の表示。色とアイコンで状態を伝える。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-fields { display:flex;flex-direction:column;gap:10px;width:100%; }
          .${p}-group { position:relative; }
          .${p}-input { width:100%;padding:10px 36px 10px 12px;border:2px solid #e5e7eb;border-radius:6px;font-size:.8rem;outline:none;box-sizing:border-box; }
          .${p}-input.valid { border-color:#22c55e; }
          .${p}-input.error { border-color:#ef4444; }
          .${p}-icon { position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:.9rem; }
          .${p}-msg { font-size:.65rem;margin-top:2px; }
          .${p}-msg.ok { color:#22c55e; }
          .${p}-msg.err { color:#ef4444; }
        `);
        const fields = h("div", `${p}-fields`);
        const g1 = h("div", `${p}-group`);
        const i1 = h("input", `${p}-input valid`);
        i1.value = "taro@example.com";
        i1.readOnly = true;
        g1.append(i1, h("span", `${p}-icon`, "✓"));
        const m1 = h("div", `${p}-msg ok`, "有効なメールアドレスです");
        fields.append(g1, m1);
        const g2 = h("div", `${p}-group`);
        const i2 = h("input", `${p}-input error`);
        i2.value = "invalid-email";
        i2.readOnly = true;
        g2.append(i2, h("span", `${p}-icon`, "✕"));
        const m2 = h("div", `${p}-msg err`, "正しいメールアドレスを入力してください");
        fields.append(g2, m2);
        c.append(fields);
      },
      code: {
        css: `.input { padding:10px 36px 10px 12px; border:2px solid #e5e7eb;
  border-radius:6px; outline:none; }
.input.valid { border-color:#22c55e; }
.input.error { border-color:#ef4444; }
.msg.ok { color:#22c55e; font-size:.65rem; }
.msg.err { color:#ef4444; font-size:.65rem; }`,
        html: `<div class="group">
  <input class="input valid" value="taro@example.com" />
  <span class="icon">✓</span>
  <div class="msg ok">有効なメールアドレスです</div>
</div>
<div class="group">
  <input class="input error" value="invalid-email" />
  <span class="icon">✕</span>
  <div class="msg err">正しいメールアドレスを入力してください</div>
</div>`
      }
    },
    {
      title: "検索ボックス",
      desc: "アイコン付きの検索入力欄。左に虫眼鏡アイコン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { position:relative;width:100%; }
          .${p}-icon { position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:.9rem;color:#9ca3af;pointer-events:none; }
          .${p}-input { width:100%;padding:10px 12px 10px 38px;border:2px solid #e5e7eb;border-radius:20px;font-size:.85rem;outline:none;
            transition:border-color .2s,box-shadow .2s;box-sizing:border-box; }
          .${p}-input:focus { border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.15); }
        `);
        const wrap = h("div", `${p}-wrap`);
        wrap.append(h("span", `${p}-icon`, "🔍"));
        const input = h("input", `${p}-input`);
        input.type = "text";
        input.placeholder = "キーワードで検索...";
        wrap.append(input);
        c.append(wrap);
      },
      code: {
        css: `.search-wrap { position:relative; }
.search-icon { position:absolute; left:12px; top:50%;
  transform:translateY(-50%); color:#9ca3af; pointer-events:none; }
.search-input { width:100%; padding:10px 12px 10px 38px;
  border:2px solid #e5e7eb; border-radius:20px;
  outline:none; transition:border-color .2s, box-shadow .2s; }
.search-input:focus { border-color:#3b82f6;
  box-shadow:0 0 0 3px rgba(59,130,246,.15); }`,
        html: `<div class="search-wrap">
  <span class="search-icon">🔍</span>
  <input class="search-input" placeholder="キーワードで検索..." />
</div>`
      }
    }
  ];

  /* ==============================
     placeholder — プレースホルダー
     ============================== */
  demos["placeholder"] = [
    {
      title: "基本プレースホルダー",
      desc: "薄い文字のヒントテキスト。入力前に表示され、入力すると消える。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-fields { display:flex;flex-direction:column;gap:8px;width:100%; }
          .${p}-input { padding:10px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:.85rem;outline:none;width:100%;box-sizing:border-box; }
          .${p}-input::placeholder { color:#9ca3af;font-style:italic; }
          .${p}-input:focus { border-color:#3b82f6; }
        `);
        const fields = h("div", `${p}-fields`);
        [["名前を入力..."],["メールアドレスを入力..."],["パスワードを入力..."]].forEach(([ph]) => {
          const input = h("input", `${p}-input`);
          input.placeholder = ph;
          fields.append(input);
        });
        c.append(fields);
      },
      code: {
        css: `.input { padding:10px 12px; border:1px solid #d1d5db;
  border-radius:6px; font-size:.85rem; outline:none; }
.input::placeholder { color:#9ca3af; font-style:italic; }
.input:focus { border-color:#3b82f6; }`,
        html: `<input class="input" placeholder="名前を入力..." />
<input class="input" placeholder="メールアドレスを入力..." />
<input class="input" placeholder="パスワードを入力..." />`
      }
    },
    {
      title: "アイコン付きプレースホルダー",
      desc: "入力欄の中にアイコンとプレースホルダーを組み合わせた例。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-fields { display:flex;flex-direction:column;gap:8px;width:100%; }
          .${p}-wrap { position:relative; }
          .${p}-ico { position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:.85rem;pointer-events:none; }
          .${p}-input { width:100%;padding:10px 12px 10px 34px;border:1px solid #d1d5db;border-radius:6px;font-size:.82rem;outline:none;box-sizing:border-box; }
          .${p}-input::placeholder { color:#9ca3af; }
          .${p}-input:focus { border-color:#3b82f6; }
        `);
        const fields = h("div", `${p}-fields`);
        [["🔍","検索..."],["📧","メールアドレス"],["🔒","パスワード"]].forEach(([ico,ph]) => {
          const wrap = h("div", `${p}-wrap`);
          wrap.append(h("span", `${p}-ico`, ico));
          const input = h("input", `${p}-input`);
          input.placeholder = ph;
          if (ph === "パスワード") input.type = "password";
          wrap.append(input);
          fields.append(wrap);
        });
        c.append(fields);
      },
      code: {
        css: `.input-wrap { position:relative; }
.input-icon { position:absolute; left:10px; top:50%;
  transform:translateY(-50%); pointer-events:none; }
.icon-input { padding:10px 12px 10px 34px;
  border:1px solid #d1d5db; border-radius:6px; outline:none; }
.icon-input::placeholder { color:#9ca3af; }`,
        html: `<div class="input-wrap">
  <span class="input-icon">🔍</span>
  <input class="icon-input" placeholder="検索..." />
</div>
<div class="input-wrap">
  <span class="input-icon">📧</span>
  <input class="icon-input" placeholder="メールアドレス" />
</div>`
      }
    },
    {
      title: "フローティングラベル",
      desc: "フォーカスでプレースホルダーが上にスライドするフローティングラベル。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-fields { display:flex;flex-direction:column;gap:14px;width:100%; }
          .${p}-group { position:relative; }
          .${p}-input { width:100%;padding:16px 12px 6px;border:2px solid #d1d5db;border-radius:6px;font-size:.85rem;outline:none;
            background:transparent;box-sizing:border-box;transition:border-color .2s; }
          .${p}-input:focus { border-color:#3b82f6; }
          .${p}-lbl { position:absolute;left:12px;top:12px;font-size:.85rem;color:#9ca3af;pointer-events:none;
            transition:transform .2s ease,font-size .2s ease,color .2s; }
          .${p}-input:focus ~ .${p}-lbl,
          .${p}-input:not(:placeholder-shown) ~ .${p}-lbl {
            transform:translateY(-10px);font-size:.65rem;color:#3b82f6; }
        `);
        const fields = h("div", `${p}-fields`);
        ["ユーザー名","メールアドレス"].forEach(label => {
          const group = h("div", `${p}-group`);
          const input = h("input", `${p}-input`);
          input.placeholder = " ";
          const lbl = h("label", `${p}-lbl`, label);
          group.append(input, lbl);
          fields.append(group);
        });
        c.append(fields);
      },
      code: {
        css: `.float-group { position:relative; }
.float-input { padding:16px 12px 6px; border:2px solid #d1d5db;
  border-radius:6px; outline:none; background:transparent; }
.float-input:focus { border-color:#3b82f6; }
.float-label { position:absolute; left:12px; top:12px;
  color:#9ca3af; pointer-events:none;
  transition:transform .2s, font-size .2s, color .2s; }
.float-input:focus ~ .float-label,
.float-input:not(:placeholder-shown) ~ .float-label {
  transform:translateY(-10px); font-size:.65rem; color:#3b82f6; }`,
        html: `<div class="float-group">
  <input class="float-input" placeholder=" " />
  <label class="float-label">ユーザー名</label>
</div>`
      }
    }
  ];

  /* ==============================
     dropdown-select — ドロップダウン
     ============================== */
  demos["dropdown-select"] = [
    {
      title: "基本セレクト",
      desc: "難易度選択のネイティブselectボックス。CSSで少し装飾。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { width:100%; }
          .${p}-label { font-size:.75rem;font-weight:600;color:#374151;display:block;margin-bottom:4px; }
          .${p}-select { width:100%;padding:10px 36px 10px 12px;border:2px solid #e5e7eb;border-radius:6px;font-size:.85rem;
            background:#fff;outline:none;cursor:pointer;appearance:none;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
            background-repeat:no-repeat;background-position:right 12px center; }
          .${p}-select:focus { border-color:#3b82f6; }
        `);
        const wrap = h("div", `${p}-wrap`);
        wrap.append(h("label", `${p}-label`, "🎮 難易度を選択"));
        const sel = document.createElement("select");
        sel.className = `${p}-select`;
        ["-- 選択してください --","かんたん","ふつう","むずかしい","ベリーハード"].forEach((t, i) => {
          const opt = document.createElement("option");
          opt.textContent = t;
          if (i === 0) opt.value = "";
          sel.append(opt);
        });
        wrap.append(sel);
        c.append(wrap);
      },
      code: {
        css: `select { width:100%; padding:10px 36px 10px 12px;
  border:2px solid #e5e7eb; border-radius:6px;
  font-size:.85rem; background:#fff; outline:none;
  cursor:pointer; appearance:none;
  background-image:url("data:image/svg+xml,...");
  background-repeat:no-repeat;
  background-position:right 12px center; }
select:focus { border-color:#3b82f6; }`,
        html: `<label>🎮 難易度を選択</label>
<select>
  <option value="">-- 選択してください --</option>
  <option>かんたん</option>
  <option>ふつう</option>
  <option>むずかしい</option>
</select>`
      }
    },
    {
      title: "カスタムドロップダウン",
      desc: "CSSで装飾したカスタムドロップダウン。クリックで開閉。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-dd { position:relative;width:100%; }
          .${p}-trigger { width:100%;padding:10px 14px;border:2px solid #e5e7eb;border-radius:8px;background:#fff;font-size:.85rem;
            cursor:pointer;display:flex;justify-content:space-between;align-items:center;box-sizing:border-box; }
          .${p}-trigger:hover { border-color:#3b82f6; }
          .${p}-arrow { transition:transform .2s;font-size:.7rem; }
          .${p}-dd.open .${p}-arrow { transform:rotate(180deg); }
          .${p}-list { position:absolute;top:calc(100% + 4px);left:0;right:0;background:#fff;border:1px solid #e5e7eb;border-radius:8px;
            box-shadow:0 4px 16px rgba(0,0,0,.1);overflow:hidden;display:none;z-index:10; }
          .${p}-dd.open .${p}-list { display:block; }
          .${p}-opt { padding:10px 14px;font-size:.8rem;cursor:pointer;transition:background .15s; }
          .${p}-opt:hover { background:#eff6ff; }
          .${p}-opt.selected { background:#dbeafe;color:#1d4ed8;font-weight:600; }
        `);
        const dd = h("div", `${p}-dd`);
        const trigger = h("div", `${p}-trigger`);
        const label = h("span", "", "武器を選択...");
        trigger.append(label, h("span", `${p}-arrow`, "▼"));
        const list = h("div", `${p}-list`);
        ["⚔️ 剣","🏹 弓","🪄 杖","🛡 盾"].forEach(t => {
          const opt = h("div", `${p}-opt`, t);
          opt.addEventListener("click", () => {
            list.querySelectorAll(`.${p}-opt`).forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            label.textContent = t;
            dd.classList.remove("open");
          });
          list.append(opt);
        });
        trigger.addEventListener("click", () => dd.classList.toggle("open"));
        dd.append(trigger, list);
        c.append(dd);
      },
      code: {
        css: `.dropdown { position:relative; }
.dd-trigger { padding:10px 14px; border:2px solid #e5e7eb;
  border-radius:8px; cursor:pointer; display:flex;
  justify-content:space-between; }
.dd-list { position:absolute; top:calc(100%+4px);
  left:0; right:0; background:#fff; border:1px solid #e5e7eb;
  border-radius:8px; box-shadow:0 4px 16px rgba(0,0,0,.1);
  display:none; }
.dropdown.open .dd-list { display:block; }
.dd-opt { padding:10px 14px; cursor:pointer; }
.dd-opt:hover { background:#eff6ff; }`,
        html: `<div class="dropdown" id="dd">
  <div class="dd-trigger" onclick="toggle()">
    <span id="label">武器を選択...</span>
    <span>▼</span>
  </div>
  <div class="dd-list">
    <div class="dd-opt" onclick="select(this)">⚔️ 剣</div>
    <div class="dd-opt" onclick="select(this)">🏹 弓</div>
  </div>
</div>`,
        js: `function toggle() {
  document.getElementById('dd').classList.toggle('open');
}
function select(el) {
  document.getElementById('label').textContent = el.textContent;
  toggle();
}`
      }
    },
    {
      title: "グループ化セレクト",
      desc: "optgroupを使ったカテゴリ分類付きセレクト。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { width:100%; }
          .${p}-label { font-size:.75rem;font-weight:600;color:#374151;display:block;margin-bottom:4px; }
          .${p}-select { width:100%;padding:10px 36px 10px 12px;border:2px solid #e5e7eb;border-radius:6px;font-size:.82rem;
            background:#fff;outline:none;cursor:pointer;appearance:none;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
            background-repeat:no-repeat;background-position:right 12px center; }
          .${p}-select:focus { border-color:#3b82f6; }
        `);
        const wrap = h("div", `${p}-wrap`);
        wrap.append(h("label", `${p}-label`, "🎒 装備を選択"));
        const sel = document.createElement("select");
        sel.className = `${p}-select`;
        const def = document.createElement("option");
        def.textContent = "-- 選択してください --";
        def.value = "";
        sel.append(def);
        const groups = [["武器",["⚔️ 鉄の剣","🏹 銀の弓","🪄 炎の杖"]],["防具",["🛡 鉄の盾","🧥 革の鎧","👒 魔法の帽子"]]];
        groups.forEach(([label, opts]) => {
          const og = document.createElement("optgroup");
          og.label = label;
          opts.forEach(t => { const o = document.createElement("option"); o.textContent = t; og.append(o); });
          sel.append(og);
        });
        wrap.append(sel);
        c.append(wrap);
      },
      code: {
        css: `select { width:100%; padding:10px; border:2px solid #e5e7eb;
  border-radius:6px; font-size:.82rem; appearance:none; }
select:focus { border-color:#3b82f6; }
optgroup { font-weight:700; color:#374151; }`,
        html: `<label>🎒 装備を選択</label>
<select>
  <option value="">-- 選択してください --</option>
  <optgroup label="武器">
    <option>⚔️ 鉄の剣</option>
    <option>🏹 銀の弓</option>
  </optgroup>
  <optgroup label="防具">
    <option>🛡 鉄の盾</option>
    <option>🧥 革の鎧</option>
  </optgroup>
</select>`
      }
    }
  ];

  /* ==============================
     slider — スライダー
     ============================== */
  demos["slider"] = [
    {
      title: "音量スライダー",
      desc: "アイコン付きの音量調整スライダー。値をリアルタイム表示。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-row { display:flex;align-items:center;gap:10px;width:100%; }
          .${p}-ico { font-size:1.1rem;flex-shrink:0; }
          .${p}-range { flex:1;-webkit-appearance:none;appearance:none;height:6px;border-radius:3px;background:#e5e7eb;outline:none; }
          .${p}-range::-webkit-slider-thumb { -webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#3b82f6;cursor:pointer;
            box-shadow:0 1px 4px rgba(0,0,0,.2); }
          .${p}-val { font-size:.8rem;font-weight:700;min-width:30px;text-align:right;color:#374151; }
        `);
        const row = h("div", `${p}-row`);
        const ico = h("span", `${p}-ico`, "🔊");
        const range = document.createElement("input");
        range.type = "range";
        range.min = "0";
        range.max = "100";
        range.value = "70";
        range.className = `${p}-range`;
        const val = h("span", `${p}-val`, "70");
        range.addEventListener("input", () => {
          val.textContent = range.value;
          ico.textContent = Number(range.value) === 0 ? "🔇" : Number(range.value) < 50 ? "🔉" : "🔊";
        });
        row.append(ico, range, val);
        c.append(row);
      },
      code: {
        css: `input[type="range"] { -webkit-appearance:none; appearance:none;
  height:6px; border-radius:3px; background:#e5e7eb; outline:none; }
input[type="range"]::-webkit-slider-thumb { -webkit-appearance:none;
  width:18px; height:18px; border-radius:50%; background:#3b82f6;
  cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,.2); }`,
        html: `<span id="icon">🔊</span>
<input type="range" id="vol" min="0" max="100" value="70" />
<span id="val">70</span>`,
        js: `document.getElementById('vol')
  .addEventListener('input', function() {
    document.getElementById('val').textContent = this.value;
  });`
      }
    },
    {
      title: "範囲スライダー",
      desc: "最小値と最大値を表示するスライダー。現在値をバーの上に表示。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { width:100%; }
          .${p}-header { display:flex;justify-content:space-between;font-size:.7rem;color:#6b7280;margin-bottom:4px; }
          .${p}-val { text-align:center;font-size:1.2rem;font-weight:800;color:#8b5cf6;margin-bottom:6px; }
          .${p}-range { width:100%;-webkit-appearance:none;appearance:none;height:8px;border-radius:4px;
            background:linear-gradient(90deg,#8b5cf6 0%,#e5e7eb 0%);outline:none; }
          .${p}-range::-webkit-slider-thumb { -webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:#8b5cf6;cursor:pointer;
            box-shadow:0 2px 6px rgba(139,92,246,.4); }
          .${p}-labels { display:flex;justify-content:space-between;font-size:.65rem;color:#9ca3af;margin-top:2px; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const header = h("div", `${p}-header`);
        header.append(h("span","","明るさ調整"));
        wrap.append(header);
        const val = h("div", `${p}-val`, "50%");
        const range = document.createElement("input");
        range.type = "range";
        range.min = "0";
        range.max = "100";
        range.value = "50";
        range.className = `${p}-range`;
        range.addEventListener("input", () => {
          val.textContent = range.value + "%";
          range.style.background = `linear-gradient(90deg,#8b5cf6 ${range.value}%,#e5e7eb ${range.value}%)`;
        });
        range.style.background = `linear-gradient(90deg,#8b5cf6 50%,#e5e7eb 50%)`;
        const labels = h("div", `${p}-labels`);
        labels.append(h("span","","0"), h("span","","100"));
        wrap.append(val, range, labels);
        c.append(wrap);
      },
      code: {
        css: `input[type="range"] { width:100%; -webkit-appearance:none;
  height:8px; border-radius:4px;
  background:linear-gradient(90deg,#8b5cf6 50%,#e5e7eb 50%); }
input[type="range"]::-webkit-slider-thumb { -webkit-appearance:none;
  width:22px; height:22px; border-radius:50%; background:#8b5cf6;
  box-shadow:0 2px 6px rgba(139,92,246,.4); }`,
        html: `<div class="value" id="val">50%</div>
<input type="range" id="slider" min="0" max="100" value="50" />
<div class="labels"><span>0</span><span>100</span></div>`,
        js: `const s = document.getElementById('slider');
s.addEventListener('input', () => {
  document.getElementById('val').textContent = s.value + '%';
  s.style.background =
    \`linear-gradient(90deg,#8b5cf6 \${s.value}%,#e5e7eb \${s.value}%)\`;
});`
      }
    },
    {
      title: "色選択（hue）",
      desc: "Hueスライダーで色相を選択。プレビューがリアルタイムで変化。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { width:100%;text-align:center; }
          .${p}-preview { width:80px;height:80px;border-radius:50%;margin:0 auto 10px;transition:background .1s;
            border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.15); }
          .${p}-range { width:100%;-webkit-appearance:none;appearance:none;height:10px;border-radius:5px;outline:none;
            background:linear-gradient(to right,hsl(0,80%,55%),hsl(60,80%,55%),hsl(120,80%,55%),hsl(180,80%,55%),hsl(240,80%,55%),hsl(300,80%,55%),hsl(360,80%,55%)); }
          .${p}-range::-webkit-slider-thumb { -webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;cursor:pointer;
            box-shadow:0 1px 4px rgba(0,0,0,.3);border:2px solid #ddd; }
          .${p}-val { font-size:.75rem;color:#6b7280;margin-top:4px;font-family:monospace; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const preview = h("div", `${p}-preview`);
        preview.style.background = "hsl(180, 80%, 55%)";
        const range = document.createElement("input");
        range.type = "range";
        range.min = "0";
        range.max = "360";
        range.value = "180";
        range.className = `${p}-range`;
        const val = h("div", `${p}-val`, "hsl(180, 80%, 55%)");
        range.addEventListener("input", () => {
          const hue = range.value;
          preview.style.background = `hsl(${hue}, 80%, 55%)`;
          val.textContent = `hsl(${hue}, 80%, 55%)`;
        });
        wrap.append(preview, range, val);
        c.append(wrap);
      },
      code: {
        css: `.hue-slider { width:100%; -webkit-appearance:none; height:10px;
  border-radius:5px; outline:none;
  background:linear-gradient(to right,
    hsl(0,80%,55%),hsl(60,80%,55%),hsl(120,80%,55%),
    hsl(180,80%,55%),hsl(240,80%,55%),hsl(300,80%,55%),hsl(360,80%,55%)); }
.hue-slider::-webkit-slider-thumb { -webkit-appearance:none;
  width:20px; height:20px; border-radius:50%; background:#fff;
  box-shadow:0 1px 4px rgba(0,0,0,.3); }
.preview { width:80px; height:80px; border-radius:50%;
  transition:background .1s; }`,
        html: `<div class="preview" id="preview"></div>
<input type="range" class="hue-slider" id="hue"
  min="0" max="360" value="180" />`,
        js: `const hue = document.getElementById('hue');
const preview = document.getElementById('preview');
hue.addEventListener('input', () => {
  preview.style.background = \`hsl(\${hue.value}, 80%, 55%)\`;
});`
      }
    }
  ];

  window.multiDemos = Object.assign(window.multiDemos || {}, demos);
})();
