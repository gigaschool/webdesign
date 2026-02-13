/* ==========================================================================
   47 Demo Renderers — Realistic Scenarios
   Each demo shows the concept in a real game/app situation
   ========================================================================== */

function n(tag, cls, text) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text !== undefined) el.textContent = text;
  return el;
}

function btn(text, cls = "d-btn") {
  return n("button", cls, text);
}

function addMetric(label, value) {
  const chip = n("div", "d-metric");
  chip.append(n("span", "d-metric-label", label), n("strong", "d-metric-value", value));
  return chip;
}

function createRoot(term, compact) {
  const root = n("section", `demo-root${compact ? " compact" : ""}`);
  root.dataset.type = term.demo || term.slug;
  root.append(n("p", "demo-caption", term.term));
  root.append(n("div", "demo-canvas"));
  return root;
}

function canvas(root) {
  return root.querySelector(".demo-canvas");
}

/* ---------- 画面の基本 (1-10) ---------- */

function renderUI(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "画面のボタン・スコア・メニューなど、見えて触れる部分すべてがUI"));

  const phone = n("div", "d-ui-phone");

  // OS status bar
  const bar = n("div", "d-ui-bar");
  bar.append(n("span", "", "12:34"), n("span", "", "📶 🔋"));
  phone.append(bar);

  // App header
  const head = n("div", "d-ui-head");
  head.append(n("span", "", "☰"), n("strong", "", "⭐ STAR CLICK"), n("span", "", "⚙"));
  phone.append(head);

  // Game info row (HP / Score / Timer)
  const info = n("div", "d-ui-info");
  info.append(n("span", "d-ui-hp", "♥♥♥"), n("span", "d-ui-score", "⭐ 1,200"), n("span", "d-ui-timer", "⏱ 0:24"));
  phone.append(info);

  // Play area
  const play = n("div", "d-ui-play");
  play.append(n("div", "d-ui-bigstar", "★"), n("p", "", "タップで星を集めよう！"));
  phone.append(play);

  // Action button
  const act = n("div", "d-ui-act");
  act.append(btn("▶ スタート", "d-btn d-btn-primary"));
  phone.append(act);

  // Tab navigation bar
  const tabs = n("nav", "d-ui-tabs");
  [["🏠","ホーム"],["🎮","プレイ"],["🏆","ランク"],["⚙","設定"]].forEach(([ic, lb], i) => {
    const t = n("div", `d-ui-tab${i === 1 ? " active" : ""}`);
    t.append(n("span", "", ic), n("small", "", lb));
    tabs.append(t);
  });
  phone.append(tabs);

  c.append(phone);
}

function renderUX(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "UIは「見た目」、UXは「使ったときの体験や気持ち」— 同じ機能でも体験は大違い"));

  const compare = n("div", "d-ux-compare");

  // --- Bad UX phone ---
  const bad = n("div", "d-ux-phone bad");
  bad.append(n("div", "d-ux-label bad", "❌ 悪いUX"));
  bad.append(n("div", "d-ux-phead", "ゲーム v3.2.1"));

  const badBody = n("div", "d-ux-pbody");
  const grid = n("div", "d-ux-btn-grid");
  ["開始","設定","情報","履歴","規約","ヘルプ","戻る","次へ","閉じる"].forEach(t => {
    grid.append(n("span", "d-ux-tiny-btn", t));
  });
  badBody.append(grid);
  badBody.append(n("p", "d-ux-feel bad", "何を押せばいいの…？ 😟"));
  bad.append(badBody);

  // --- Good UX phone ---
  const good = n("div", "d-ux-phone good");
  good.append(n("div", "d-ux-label good", "✅ 良いUX"));
  good.append(n("div", "d-ux-phead", "⭐ ようこそ！"));

  const goodBody = n("div", "d-ux-pbody");
  goodBody.append(n("div", "d-ux-step-indicator", "ステップ 1 / 3"));
  goodBody.append(n("p", "d-ux-guide-msg", "まずは名前を教えてね"));
  const mockInput = n("div", "d-ux-mock-input", "なまえを入力…");
  goodBody.append(mockInput);
  goodBody.append(btn("次へ →", "d-btn d-btn-primary d-ux-cta"));
  goodBody.append(n("p", "d-ux-feel good", "かんたん！迷わない 😊"));
  good.append(goodBody);

  compare.append(bad, good);
  c.append(compare);
}

function renderLayout(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "画面をエリアごとに区切って配置する設計のこと"));
  const bp = n("div", "d-layout-bp");
  const zones = [
    ["🎮 ヘッダー（タイトル）", "d-lz d-lz-h"],
    ["body", "d-lz-body"],
    ["© フッター", "d-lz d-lz-f"],
  ];
  const header = n("div", "d-lz d-lz-h");
  header.append(n("small", "d-lz-tag", "ヘッダー"), n("span", "", "🎮 ゲームタイトル"));
  const body = n("div", "d-lz-body");
  const main = n("div", "d-lz d-lz-m");
  main.append(n("small", "d-lz-tag", "メイン"), n("span", "", "ゲーム画面"));
  const side = n("div", "d-lz d-lz-s");
  side.append(n("small", "d-lz-tag", "サイド"), n("span", "", "メニュー"));
  body.append(main, side);
  const footer = n("div", "d-lz d-lz-f");
  footer.append(n("small", "d-lz-tag", "フッター"), n("span", "", "© My Game"));
  bp.append(header, body, footer);
  c.append(bp);
}

function renderCentering(root) {
  const c = canvas(root);
  const frame = n("div", "d-centering-frame");
  frame.append(
    n("span", "d-axis x"),
    n("span", "d-axis y"),
    btn("▶ GAME START", "d-btn d-btn-primary d-center-btn large")
  );
  c.append(n("p", "d-tip", "タイトル画面のスタートボタンを画面の真ん中に配置"), frame);
}

function renderMargin(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "marginは要素の外側余白。点線の両矢印で各方向の余白幅を示している"));

  const wrap = n("div", "d-margin-wrap");
  const area = n("div", "d-margin-area");

  const target = n("div", "d-margin-target", "要素");
  area.append(target);

  const arrows = [
    ["top", "vertical"],
    ["right", "horizontal"],
    ["bottom", "vertical"],
    ["left", "horizontal"]
  ];

  arrows.forEach(([pos, axis]) => {
    const arrow = n("span", `d-margin-arrow ${pos} ${axis}`);
    area.append(arrow);
  });

  const labels = [
    ["top", "top 24px"],
    ["right", "right 48px"],
    ["bottom", "bottom 36px"],
    ["left", "left 30px"]
  ];

  labels.forEach(([pos, text]) => {
    const label = n("span", `d-margin-label ${pos}`, text);
    area.append(label);
  });

  const value = n("p", "d-margin-values", "margin: 24px 48px 36px 30px;");
  wrap.append(area, value);
  c.append(wrap);
}

function renderPadding(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "paddingは要素の内側余白。点線の両矢印で枠から内容までの距離を示している"));

  const wrap = n("div", "d-padding-wrap");
  const area = n("div", "d-padding-area");
  const shell = n("div", "d-padding-shell");
  const content = n("div", "d-padding-content", "内容");
  shell.append(content);

  const arrows = [
    ["top", "vertical"],
    ["right", "horizontal"],
    ["bottom", "vertical"],
    ["left", "horizontal"]
  ];

  arrows.forEach(([pos, axis]) => {
    const arrow = n("span", `d-padding-arrow ${pos} ${axis}`);
    shell.append(arrow);
  });

  const labels = [
    ["top", "top 24px"],
    ["right", "right 48px"],
    ["bottom", "bottom 36px"],
    ["left", "left 30px"]
  ];

  labels.forEach(([pos, text]) => {
    const label = n("span", `d-padding-label ${pos}`, text);
    shell.append(label);
  });

  area.append(shell);
  const value = n("p", "d-padding-values", "padding: 24px 48px 36px 30px;");
  wrap.append(area, value);
  c.append(wrap);
}

function renderWhitespace(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "要素の間にゆとりを入れて読みやすくする「余白」の力"));
  const cols = n("div", "d-space-cols");

  const dense = n("section", "d-space-card dense");
  dense.append(n("h5", "", "❌ 余白なし"), n("p", "", "HP:80スコア:1200タイム:30残機:3アイテム:5コイン:99"));

  const airy = n("section", "d-space-card airy");
  airy.append(n("h5", "", "✅ 余白あり"), n("p", "", "HP: 80\nスコア: 1,200\nタイム: 0:30"));

  cols.append(dense, airy);
  c.append(cols);
}

function renderGrid(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "ステージ選択画面 — グリッドで整列表示"));
  const grid = n("div", "d-grid");
  const stages = ["🌲 森", "🏔 山", "🏖 海", "🌋 火山", "❄ 氷", "🏜 砂漠", "🌙 夜空", "🏰 城", "👻 洞窟", "⚡ 雷", "🌈 虹", "🔥 溶岩"];
  stages.forEach((name, i) => {
    const item = n("button", "d-grid-item");
    item.textContent = name;
    grid.append(item);
  });
  c.append(grid);
}

function renderColumn(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "情報を縦の列（カラム）に分けて並べる基本レイアウト"));
  const cols = n("div", "d-columns");
  const data = [
    { title: "🧭 メニュー", players: ["ホーム", "サービス", "料金プラン"] },
    { title: "📌 お知らせ", players: ["メンテナンス情報", "アップデート", "イベント案内"] },
    { title: "🛠 サポート", players: ["よくある質問", "お問い合わせ", "利用ガイド"] }
  ];
  data.forEach(({ title, players }) => {
    const col = n("section", "d-col");
    const ul = n("ul", "");
    players.forEach(p => ul.append(n("li", "", p)));
    col.append(n("h5", "", title), ul);
    cols.append(col);
  });
  c.append(cols);
}

function renderResponsive(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "同じ内容でも画面サイズに合わせて配置を自動で変える"));
  const wrap = n("div", "d-rsp-wrap");

  // PC device
  const pc = n("div", "d-rsp-device");
  pc.append(n("small", "d-rsp-label", "💻 PC"));
  const pcScreen = n("div", "d-rsp-screen pc");
  const pcH = n("div", "d-rsp-zone zh", "ヘッダー");
  const pcBody = n("div", "d-rsp-body");
  pcBody.append(n("div", "d-rsp-zone zm", "メイン"), n("div", "d-rsp-zone zs", "サイド"));
  pcScreen.append(pcH, pcBody);
  pc.append(pcScreen);

  // Arrow
  wrap.append(pc, n("span", "d-rsp-arrow", "→"));

  // SP device
  const sp = n("div", "d-rsp-device");
  sp.append(n("small", "d-rsp-label", "📱 スマホ"));
  const spScreen = n("div", "d-rsp-screen sp");
  spScreen.append(n("div", "d-rsp-zone zh", "ヘッダー"), n("div", "d-rsp-zone zm", "メイン"), n("div", "d-rsp-zone zs", "サイド"));
  sp.append(spScreen);

  wrap.append(sp);
  c.append(wrap);
}

/* ---------- 動き・演出 (11-21) ---------- */

function renderAnimation(root) {
  const c = canvas(root);
  const stage = n("div", "d-motion-stage");
  const chara = n("div", "d-character", "★");
  const ring = n("div", "d-ring");
  stage.append(chara, ring);
  c.append(n("p", "d-tip", "キャラクターが浮遊しながら光のリングが回転"), stage);
}

function renderTransition(root) {
  const c = canvas(root);
  const stage = n("div", "d-transition-stage");
  const card = n("div", "d-transition-card");
  card.append(n("h5", "", "⚙ 設定パネル"), n("p", "", "音量 ● ● ● ○ ○\n難易度 ノーマル"));
  const t = btn("▶ 開閉アニメ", "d-btn d-btn-primary");
  t.addEventListener("click", () => card.classList.toggle("alt"));
  c.append(n("p", "d-tip", "ボタンを押すとカードが滑らかに変化"));
  stage.append(t, card);
  c.append(stage);
}

function renderFade(root) {
  const c = canvas(root);
  const stage = n("div", "d-fade-stage");
  const message = n("div", "d-fade-message", "🏆 STAGE CLEAR!");
  const show = btn("クリア演出を再生", "d-btn d-btn-primary");
  show.addEventListener("click", () => {
    message.classList.remove("on");
    void message.offsetWidth;
    message.classList.add("on");
  });
  stage.append(show, message);
  c.append(n("p", "d-tip", "ステージクリア時にメッセージがふわっと表示"), stage);
}

function renderSlide(root) {
  const c = canvas(root);
  const stage = n("div", "d-slide-stage");
  const drawer = n("aside", "d-drawer");
  ["🏠 ホーム", "🗺 マップ", "🛒 ショップ", "⚙ 設定"].forEach(t => drawer.append(n("a", "", t)));
  const toggle = btn("☰ メニュー", "d-btn d-btn-primary");
  toggle.addEventListener("click", () => stage.classList.toggle("open"));
  stage.append(toggle, drawer);
  c.append(n("p", "d-tip", "ハンバーガーメニューが左からスライドイン"), stage);
}

function renderPopup(root) {
  const c = canvas(root);
  const stage = n("div", "d-popup-stage");
  const toast = n("div", "d-toast", "⭐ +100 SCORE!");
  const fire = btn("星をゲット！", "d-btn d-btn-primary");
  fire.addEventListener("click", () => {
    toast.classList.remove("show");
    void toast.offsetWidth;
    toast.classList.add("show");
  });
  stage.append(fire, toast);
  c.append(n("p", "d-tip", "スコア獲得時に右上にポップアップ通知が出現"), stage);
}

function renderHover(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "マウスを乗せるとカードが浮き上がる（PCで確認）"));
  const cards = n("div", "d-hover-grid");
  [["▶ スタート", "ゲーム開始"], ["📋 ミッション", "今日の課題"], ["🛒 ショップ", "アイテム購入"]].forEach(([title, desc]) => {
    const card = n("div", "d-hover-card");
    card.append(n("h5", "", title), n("p", "", desc));
    cards.append(card);
  });
  c.append(cards);
}

function renderMicrointeraction(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "ボタンを押すと数字が増え、ハートが脈動する"));
  const wrap = n("div", "d-micro-wrap");
  let count = 12;
  const button = btn(`♥ いいね ${count}`, "d-btn d-like-btn");
  button.addEventListener("click", () => {
    count++;
    button.textContent = `♥ いいね ${count}`;
    button.classList.remove("pulse");
    void button.offsetWidth;
    button.classList.add("pulse");
  });
  wrap.append(button);
  c.append(wrap);
}

function renderParticle(root) {
  const c = canvas(root);
  const zone = n("div", "d-particle-zone", "💥 ここをクリックして敵を倒そう！");
  zone.addEventListener("click", ev => {
    const rect = zone.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    for (let i = 0; i < 18; i++) {
      const p = n("i", "d-particle");
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.setProperty("--tx", `${(Math.random() - 0.5) * 140}px`);
      p.style.setProperty("--ty", `${(Math.random() - 0.5) * 120}px`);
      p.style.setProperty("--h", `${Math.floor(Math.random() * 360)}deg`);
      zone.append(p);
      setTimeout(() => p.remove(), 700);
    }
  });
  c.append(n("p", "d-tip", "敵を倒した瞬間に粒子が飛び散るエフェクト"), zone);
}

function renderShake(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "空欄のまま送信するとエラーで入力欄がブルッと震える"));
  const wrap = n("form", "d-shake-form");
  const inputId = `shake-input-${root.dataset.type || "demo"}`;
  const label = n("label", "", "プレイヤー名");
  label.htmlFor = inputId;
  const input = n("input", "d-input");
  input.id = inputId;
  input.name = "player-name";
  input.placeholder = "プレイヤー名を入力...";
  const submit = btn("登録", "d-btn d-btn-primary");
  wrap.addEventListener("submit", ev => {
    ev.preventDefault();
    if (input.value.trim()) return;
    input.classList.remove("error");
    void input.offsetWidth;
    input.classList.add("error");
  });
  wrap.append(label, input, submit);
  c.append(wrap);
}

function renderFlash(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "無敵アイテム取得中 — キャラクターが点滅"));
  const wrap = n("div", "d-flash-wrap");
  const avatar = n("div", "d-avatar", "🛡");
  avatar.classList.add("blink");
  wrap.append(avatar, n("p", "", "無敵状態 あと3秒..."));
  c.append(wrap);
}

function renderEasing(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "同じ距離でも曲線の形で動きの印象が変わる — 再生して比べよう"));

  const easings = [
    { label: "ease-in", sub: "加速（だんだん速く）", x1: 0.7, y1: 0, x2: 1, y2: 0.5, color: "#3b82f6" },
    { label: "ease-out", sub: "減速（だんだん遅く）", x1: 0, y1: 0.5, x2: 0.3, y2: 1, color: "#8b5cf6" },
    { label: "ease-in-out", sub: "加速→減速（なめらか）", x1: 0.8, y1: 0, x2: 0.2, y2: 1, color: "#ec4899" },
  ];

  const svgNS = "http://www.w3.org/2000/svg";
  function svgEl(tag, attrs) {
    const el = document.createElementNS(svgNS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }

  // Cubic-bezier solver: given time (0-1), returns progress (0-1)
  function solve(x1, y1, x2, y2, time) {
    if (time <= 0) return 0;
    if (time >= 1) return 1;
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    let t = time;
    for (let i = 0; i < 8; i++) {
      const x = ((ax * t + bx) * t + cx) * t - time;
      if (Math.abs(x) < 0.001) break;
      const dx = (3 * ax * t + 2 * bx) * t + cx;
      if (Math.abs(dx) < 1e-6) break;
      t -= x / dx;
    }
    t = Math.max(0, Math.min(1, t));
    return ((ay * t + by) * t + cy) * t;
  }

  const grid = n("div", "d-easing-grid");
  const svgDots = [];
  const balls = [];

  easings.forEach(({ label, sub, x1, y1, x2, y2, color }) => {
    const card = n("div", "d-easing-card");

    // --- SVG curve graph ---
    const svg = svgEl("svg", { viewBox: "-4 -6 114 120", class: "d-easing-svg" });

    // Grid area background
    svg.append(svgEl("rect", { x: 0, y: 0, width: 100, height: 100, fill: "#f9fafb", rx: 3 }));

    // Light grid lines
    [25, 50, 75].forEach(v => {
      svg.append(svgEl("line", { x1: v, y1: 0, x2: v, y2: 100, stroke: "#f0f1f5", "stroke-width": 0.5 }));
      svg.append(svgEl("line", { x1: 0, y1: v, x2: 100, y2: v, stroke: "#f0f1f5", "stroke-width": 0.5 }));
    });

    // Axes
    svg.append(svgEl("line", { x1: 0, y1: 0, x2: 0, y2: 100, stroke: "#d1d5db", "stroke-width": 1 }));
    svg.append(svgEl("line", { x1: 0, y1: 100, x2: 100, y2: 100, stroke: "#d1d5db", "stroke-width": 1 }));

    // Linear reference (dashed diagonal)
    svg.append(svgEl("line", { x1: 0, y1: 100, x2: 100, y2: 0, stroke: "#e5e7eb", "stroke-width": 1, "stroke-dasharray": "4 3" }));

    // Bezier curve
    svg.append(svgEl("path", {
      d: `M 0 100 C ${x1 * 100} ${100 - y1 * 100} ${x2 * 100} ${100 - y2 * 100} 100 0`,
      fill: "none", stroke: color, "stroke-width": 2.5, "stroke-linecap": "round"
    }));

    // Animated dot on curve
    const dot = svgEl("circle", { cx: 0, cy: 100, r: 4.5, fill: color, opacity: 0.9 });
    svg.append(dot);
    svgDots.push(dot);

    // Axis labels
    const timeLabel = svgEl("text", { x: 98, y: 112, "text-anchor": "end", "font-size": 7, fill: "#9ca3af", "font-weight": 600 });
    timeLabel.textContent = "時間 →";
    svg.append(timeLabel);

    card.append(svg);

    // Name + description
    const nameEl = n("p", "d-easing-card-name");
    nameEl.style.color = color;
    nameEl.textContent = label;
    card.append(nameEl, n("p", "d-easing-card-sub", sub));

    // Animated track (horizontal lane)
    const track = n("div", "d-easing-track");
    const ball = n("div", "d-easing-ball");
    ball.style.background = color;
    track.append(ball);
    card.append(track);
    balls.push(ball);

    grid.append(card);
  });

  // Play button
  const playBtn = btn("▶ 再生", "d-btn d-btn-primary");
  let animId = null;

  function play() {
    if (animId) cancelAnimationFrame(animId);
    const dur = 1800, pause = 800, cycle = dur + pause;
    const start = performance.now();
    playBtn.textContent = "● 再生中...";

    (function step(now) {
      const phase = (now - start) % cycle;
      const time = Math.min(phase / dur, 1);

      easings.forEach(({ x1, y1, x2, y2 }, i) => {
        const progress = solve(x1, y1, x2, y2, time);
        svgDots[i].setAttribute("cx", time * 100);
        svgDots[i].setAttribute("cy", 100 - progress * 100);
        const pct = progress * 100;
        balls[i].style.left = `${pct}%`;
        balls[i].style.transform = `translateX(-${pct}%)`;
      });

      animId = requestAnimationFrame(step);
    })(performance.now());
  }

  playBtn.addEventListener("click", () => {
    if (animId) { cancelAnimationFrame(animId); animId = null; playBtn.textContent = "▶ 再生"; return; }
    play();
  });

  c.append(playBtn, grid);

  // Auto-start after render
  requestAnimationFrame(() => requestAnimationFrame(play));
}

/* ---------- 見た目・スタイル (22-32) ---------- */

/* --- Neon / Cyberpunk --- */
function renderNeonCyberpunk(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "暗い背景にネオンの光が映える近未来的なスタイル"));
  const screen = n("div", "d-neon-screen");
  screen.append(n("h4", "d-neon-title", "NEON RUNNER"));
  screen.append(n("p", "d-neon-sub", "// SYSTEM ONLINE"));
  const menu = n("div", "d-neon-menu");
  ["▶ START RACE", "⚙ CONFIG", "🏆 RANKING"].forEach(t => {
    menu.append(n("div", "d-neon-item", t));
  });
  screen.append(menu);
  screen.append(n("div", "d-neon-line"));
  c.append(screen);
}

/* --- Flat Design --- */
function renderFlatDesign(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "影やグラデーションを使わず、平らな色の面だけで作るスタイル"));
  const card = n("div", "d-flat-card");
  card.append(n("div", "d-flat-icon", "☀"));
  card.append(n("div", "d-flat-temp", "24°"));
  card.append(n("p", "d-flat-city", "東京 / 晴れ"));
  const days = n("div", "d-flat-days");
  [["月","20°"],["火","22°"],["水","19°"],["木","24°"],["金","23°"]].forEach(([d,t]) => {
    const day = n("div", "d-flat-day");
    day.append(n("small", "", d), n("span", "", t));
    days.append(day);
  });
  card.append(days);
  c.append(card);
}

/* --- Material Design --- */
function renderMaterialDesign(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "紙が重なったような影（エレベーション）で奥行きを表現するデザイン"));
  const stack = n("div", "d-mat-stack");
  [["影なし — ベースの面","flat"],["少しの影 — カード","low"],["強い影 — ポップアップ","high"]].forEach(([text, cls]) => {
    const card = n("div", `d-mat-card ${cls}`);
    card.append(n("p", "", text));
    stack.append(card);
  });
  stack.append(n("button", "d-mat-fab", "＋"));
  c.append(stack);
}

/* --- Minimal Design --- */
function renderMinimalDesign(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "必要最小限の要素だけで構成する、引き算のデザイン"));
  const card = n("div", "d-min-card");
  card.append(
    n("h4", "d-min-title", "Notes"),
    n("hr", "d-min-hr"),
    n("p", "d-min-item", "今日やること"),
    n("p", "d-min-sub", "買い物リストを作る"),
    n("hr", "d-min-hr"),
    n("p", "d-min-item", "メモ"),
    n("p", "d-min-sub", "打ち合わせは金曜日")
  );
  c.append(card);
}

/* --- Color Unity --- */
function renderColorUnity(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "同じ色の濃淡だけで統一感のある画面を作る手法"));
  const card = n("div", "d-unity-card");
  card.append(n("h4", "", "🌊 OCEAN WAVE"), n("p", "", "深海探検アドベンチャー"));
  card.append(btn("DIVE", "d-btn d-unity-btn"));
  const palette = n("div", "d-unity-palette");
  ["#1e3a8a","#1d4ed8","#3b82f6","#60a5fa","#bfdbfe"].forEach(color => {
    const chip = n("div", "d-unity-chip");
    chip.style.background = color;
    palette.append(chip);
  });
  card.append(palette);
  c.append(card);
}

/* --- Contrast --- */
function renderContrast(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "明暗の差を大きくして文字やボタンを見やすくするテクニック"));
  const row = n("div", "d-contrast-row");
  const low = n("div", "d-contrast-box low");
  low.append(n("small", "d-contrast-tag", "弱い"), n("p", "d-contrast-heading", "見出し"), n("p", "", "読みにくい文字"), n("div", "d-contrast-btn-fake", "ボタン"));
  const high = n("div", "d-contrast-box high");
  high.append(n("small", "d-contrast-tag", "強い"), n("p", "d-contrast-heading", "見出し"), n("p", "", "読みやすい文字"), n("div", "d-contrast-btn-fake", "ボタン"));
  row.append(low, high);
  c.append(row);
}

/* --- Dark Mode --- */
function renderDarkMode(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "背景を暗くして目の負担を減らす画面モード"));
  const row = n("div", "d-darkmode-row");
  [["☀ ライト","light"],["🌙 ダーク","dark"]].forEach(([label, cls]) => {
    const panel = n("div", `d-dm-panel ${cls}`);
    panel.append(n("div", "d-dm-tag", label));
    panel.append(n("strong", "", "設定"));
    panel.append(n("p", "", "🔊 音量: 80%"));
    panel.append(n("p", "", "🔔 通知: ON"));
    row.append(panel);
  });
  c.append(row);
}

/* --- Monotone --- */
function renderMonotone(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "白・黒・グレーだけで構成する、洗練されたスタイル"));
  const gallery = n("div", "d-mono-gallery");
  gallery.append(n("h4", "d-mono-title", "GALLERY"));
  const grid = n("div", "d-mono-grid");
  ["#1a1a1a","#333","#555","#777","#aaa","#ddd"].forEach(color => {
    const item = n("div", "d-mono-item");
    item.style.background = color;
    grid.append(item);
  });
  gallery.append(grid);
  c.append(gallery);
}

/* --- Typography --- */
function renderTypography(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "文字のサイズ・太さ・行間で情報に優先順位をつける"));
  const card = n("div", "d-typo-card");
  [["d-typo-h1","メインの見出し","24px"],["d-typo-h2","サブの見出し","18px"],["d-typo-body","本文テキスト。読みやすいサイズで行間もゆとりを持たせる。","15px"],["d-typo-cap","キャプション — 補足は控えめに","12px"]].forEach(([cls, text, size]) => {
    const row = n("div", "d-typo-row");
    row.append(n("span", cls, text), n("small", "d-typo-size", size));
    card.append(row);
  });
  c.append(card);
}

/* ---------- Retro 8-bit (dedicated renderer) ---------- */

function renderRetro8bit(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "少ない色・走査線（スキャンライン）・ブラウン管の質感が特徴のレトロゲーム風デザイン"));

  const monitor = n("div", "d-retro-monitor");
  const screen = n("div", "d-retro-screen");

  // Score HUD
  const hud = n("div", "d-retro-hud");
  hud.append(
    n("span", "d-retro-y", "1UP "),
    n("span", "", "00350"),
    n("span", "", "   "),
    n("span", "d-retro-r", "HI "),
    n("span", "", "12450")
  );
  screen.append(hud);

  // Game field — space invader style
  const field = n("div", "d-retro-field");

  const enemies = [
    { ch: "☆", count: 5, cls: "d-retro-y" },
    { ch: "◆", count: 6, cls: "d-retro-r" },
    { ch: "◇", count: 6, cls: "d-retro-c" },
  ];
  enemies.forEach(({ ch, count, cls }) => {
    const row = n("div", "d-retro-row");
    for (let i = 0; i < count; i++) {
      row.append(n("span", cls, ch));
    }
    field.append(row);
  });

  // Bullet
  field.append(n("div", "d-retro-bullet", "⋮"));

  // Player ship
  field.append(n("div", "d-retro-ship", "◢ ▲ ◣"));

  screen.append(field);

  // Footer — lives + blink text
  const foot = n("div", "d-retro-foot");
  foot.append(
    n("span", "d-retro-g", "♥ ♥ ♥"),
    n("span", "d-retro-blink", "PRESS START")
  );
  screen.append(foot);

  monitor.append(screen);
  c.append(monitor);
}

/* ---------- Pixel Art (dedicated renderer) ---------- */

function renderPixelArt(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "小さな四角（ドット）を並べてキャラやアイテムを描く、レトロゲームの伝統的な表現"));

  const compact = root.classList.contains("compact");
  const px = compact ? 8 : 12;
  const ipx = compact ? 6 : 9;

  const P = {
    H:"#3b82f6",h:"#1d4ed8",F:"#fbbf24",E:"#1e293b",
    A:"#94a3b8",a:"#64748b",R:"#ef4444",r:"#dc2626",
    L:"#6366f1",K:"#1e293b",Y:"#facc15",y:"#eab308",
    C:"#c084fc",p:"#a855f7",b:"#60a5fa",W:"#f1f5f9"
  };

  function grid(data, size) {
    const cols = data[0].length;
    const g = n("div", "d-pixel-grid");
    g.style.gridTemplateColumns = `repeat(${cols},${size}px)`;
    g.style.gridAutoRows = `${size}px`;
    data.forEach(row => [...row].forEach(ch => {
      const cell = n("div", "d-pixel-cell");
      if (ch !== "_" && P[ch]) cell.style.backgroundColor = P[ch];
      g.append(cell);
    }));
    return g;
  }

  // RPG Hero sprite (10x12)
  const hero = [
    "___hHh____",
    "__hHHHh___",
    "__FFFFF___",
    "__FEFEF___",
    "__FFFFF___",
    "___FFF____",
    "_aAARAAa__",
    "__AAAAA___",
    "___AAA____",
    "___L_L____",
    "___L_L____",
    "__KK_KK___"
  ];

  // Heart (7x6)
  const heart = [
    "_RR_RR_",
    "RrRRRrR",
    "RRRRRRR",
    "_RRRRR_",
    "__RRR__",
    "___R___"
  ];

  // Coin (7x7)
  const coin = [
    "___Y___",
    "__YYY__",
    "_YYYYY_",
    "YYyYyYY",
    "_YYYYY_",
    "__YYY__",
    "___Y___"
  ];

  // Potion (5x6)
  const potion = [
    "_bbb_",
    "__b__",
    "_pCp_",
    "pCCCp",
    "pCCCp",
    "_pCp_"
  ];

  const scene = n("div", "d-pixel-scene");

  const charWrap = n("div", "d-pixel-chara");
  charWrap.append(grid(hero, px), n("small", "d-pixel-label", "ゆうしゃ"));

  const items = n("div", "d-pixel-items");
  [[heart, "HP"], [coin, "コイン"], [potion, "くすり"]].forEach(([d, l]) => {
    const item = n("div", "d-pixel-item");
    item.append(grid(d, ipx), n("small", "d-pixel-label", l));
    items.append(item);
  });

  scene.append(charWrap, items);
  c.append(scene);
}

/* ---------- UIパーツ (33-47) ---------- */

function renderIcon(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "ゲームのナビゲーションバー — アイコンで直感的に操作"));
  const nav = n("div", "d-icon-nav");
  [["🏠", "ホーム"], ["🎒", "持ち物"], ["⚙", "設定"], ["🏆", "ランク"]].forEach(([ic, t]) => {
    const b = btn("", "d-icon-btn");
    b.append(n("span", "d-icon", ic), n("small", "", t));
    nav.append(b);
  });
  c.append(nav);
}

function renderProgressBar(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "バトル中のHPバー — 残りHPが視覚的にわかる"));
  const wrap = n("div", "d-progress-wrap");
  wrap.append(n("strong", "", "♥ HP 72 / 100"));
  const bar = n("div", "d-progress");
  bar.append(n("div", "d-progress-fill"));
  wrap.append(bar);
  c.append(wrap);
}

function renderCounter(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "ゲーム画面右上のスコア表示 — 星を取ると加算"));
  const wrap = n("div", "d-counter-wrap");
  const score = n("p", "d-counter", "000000");
  const add = btn("⭐ +100", "d-btn d-btn-primary");
  add.addEventListener("click", () => {
    const current = Number(score.textContent || "0");
    score.textContent = `${current + 100}`.padStart(6, "0");
  });
  wrap.append(score, add);
  c.append(wrap);
}

function renderBadge(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "未読の数を赤い丸で知らせるバッジ"));
  const wrap = n("div", "d-badge-wrap");
  [["📬 お知らせ", "3"], ["👥 フレンド申請", "1"], ["📋 新ミッション", "5"]].forEach(([name, count]) => {
    const row = n("div", "d-badge-row");
    row.append(n("span", "", name), n("span", "d-badge", count));
    wrap.append(row);
  });
  c.append(wrap);
}

function renderModal(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "画面全体を覆って操作を一時止める重要なウィンドウ"));
  const shell = n("div", "d-overlay-shell");
  shell.append(n("div", "d-overlay-layer"));
  const m = n("div", "d-modal-window");
  m.append(n("h4", "", "💀 GAME OVER"), n("p", "", "スコア: 8,350\nもう一度チャレンジする？"), btn("🔄 RETRY", "d-btn d-btn-primary"));
  shell.append(m);
  c.append(shell);
}

function renderDialog(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "ゲーム終了前の確認 — 誤操作を防ぐ"));
  const d = n("div", "d-dialog-window");
  d.append(n("p", "", "💾 セーブして終了しますか？"));
  const actions = n("div", "d-dialog-actions");
  actions.append(btn("キャンセル", "d-btn d-btn-ghost"), btn("OK", "d-btn d-btn-primary"));
  d.append(actions);
  c.append(d);
}

function renderOverlay(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "⏸を押すとオーバーレイが暗い幕でゲーム画面を覆う — もう一度押すと解除"));

  const shell = n("div", "d-overlay-shell");

  // Game scene behind overlay
  const scene = n("div", "d-overlay-game");
  const hud = n("div", "d-overlay-game-hud");
  hud.append(n("span", "", "♥♥♥"), n("span", "", "⭐ 2,400"), n("span", "", "⏱ 1:23"));
  scene.append(hud);
  const field = n("div", "d-overlay-game-field");
  field.append(n("div", "d-overlay-game-star", "★"), n("p", "d-overlay-game-msg", "タップで星を集めよう！"));
  scene.append(field);
  shell.append(scene);

  // Pause button (always visible, top-right)
  const pauseBtn = btn("⏸", "d-btn d-overlay-pause-btn");
  shell.append(pauseBtn);

  // Animated overlay layer
  shell.append(n("div", "d-overlay-layer-anim"));

  // Center content (PAUSED + resume)
  const center = n("div", "d-overlay-center");
  center.append(n("p", "d-overlay-pause-title", "⏸ PAUSED"));
  const resumeBtn = btn("▶ つづける", "d-btn d-btn-primary");
  center.append(resumeBtn);
  shell.append(center);

  // Toggle pause state
  const toggle = () => {
    const paused = shell.classList.toggle("paused");
    pauseBtn.textContent = paused ? "▶" : "⏸";
  };
  pauseBtn.addEventListener("click", toggle);
  resumeBtn.addEventListener("click", toggle);

  c.append(shell);
}

function renderSplash(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "アプリ起動時に最初に表示されるタイトル画面"));
  const splash = n("div", "d-splash");
  splash.append(n("h3", "", "⭐ STAR CLICK"), n("p", "", "Loading game data..."), n("div", "d-loader"));
  c.append(splash);
}

function renderPrimaryButton(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "「一番やってほしい操作」を色と影で目立たせるボタン — セカンダリとの違いが大事"));

  // Good vs Bad comparison
  const compare = n("div", "d-btn-compare");

  // Bad: all buttons look the same
  const bad = n("div", "d-btn-compare-panel bad");
  bad.append(n("div", "d-btn-compare-tag bad", "❌ 全部同じスタイル"));
  const badDialog = n("div", "d-btn-compare-dialog");
  badDialog.append(n("p", "", "💀 GAME OVER"));
  const badActions = n("div", "d-btn-compare-actions");
  badActions.append(btn("リトライ", "d-btn d-btn-ghost"), btn("タイトルへ", "d-btn d-btn-ghost"), btn("閉じる", "d-btn d-btn-ghost"));
  badDialog.append(badActions);
  bad.append(badDialog, n("p", "d-btn-compare-feel bad", "どれがメイン…？ 😟"));

  // Good: primary stands out
  const good = n("div", "d-btn-compare-panel good");
  good.append(n("div", "d-btn-compare-tag good", "✅ プライマリが目立つ"));
  const goodDialog = n("div", "d-btn-compare-dialog");
  goodDialog.append(n("p", "", "💀 GAME OVER"));
  const goodActions = n("div", "d-btn-compare-actions");
  goodActions.append(btn("🔄 RETRY", "d-btn d-btn-primary"), btn("タイトルへ", "d-btn d-btn-ghost"), btn("閉じる", "d-btn d-btn-ghost"));
  goodDialog.append(goodActions);
  good.append(goodDialog, n("p", "d-btn-compare-feel good", "迷わずRETRY！ 😊"));

  compare.append(bad, good);
  c.append(compare);

  // Real-world scenarios
  const scenarios = n("div", "d-btn-scenarios");
  [
    { title: "🎮 ゲーム開始", primary: "▶ START", secondary: "⚙ 設定" },
    { title: "🛒 購入確認", primary: "購入する", secondary: "キャンセル" },
    { title: "💾 保存", primary: "保存する", secondary: "← 戻る" }
  ].forEach(({ title, primary, secondary }) => {
    const scene = n("div", "d-btn-scenario");
    scene.append(n("p", "", title));
    const row = n("div", "d-btn-row");
    row.append(btn(primary, "d-btn d-btn-primary"), btn(secondary, "d-btn d-btn-ghost"));
    scene.append(row);
    scenarios.append(scene);
  });
  c.append(scenarios);
}

function renderSecondaryButton(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "メインを邪魔せず、サブの操作を控えめに見せるボタン — プライマリとの見た目の違いに注目"));

  // Anatomy comparison: Primary vs Secondary side by side
  const anatomy = n("div", "d-btn-anatomy");

  const pCard = n("div", "d-btn-anatomy-card");
  pCard.append(
    n("span", "d-btn-anatomy-label primary", "プライマリ"),
    btn("▶ START", "d-btn d-btn-primary large"),
    n("p", "d-btn-anatomy-props", "濃い背景色\n影（box-shadow）\n白い文字\n→ 目が行く！")
  );

  const sCard = n("div", "d-btn-anatomy-card");
  sCard.append(
    n("span", "d-btn-anatomy-label secondary", "セカンダリ"),
    btn("⚙ 設定", "d-btn d-btn-ghost large"),
    n("p", "d-btn-anatomy-props", "薄い背景色\n枠線（border）\n暗い文字\n→ 控えめ")
  );

  anatomy.append(pCard, sCard);
  c.append(anatomy);

  // Real-world scenarios
  const scenarios = n("div", "d-btn-scenarios");
  [
    { title: "⏸ ポーズ画面", primary: "つづける", secondary: "やめる" },
    { title: "📝 編集画面", primary: "保存する", secondary: "下書き" },
    { title: "⚙ 設定変更", primary: "適用", secondary: "リセット" }
  ].forEach(({ title, primary, secondary }) => {
    const scene = n("div", "d-btn-scenario");
    scene.append(n("p", "", title));
    const row = n("div", "d-btn-row");
    row.append(btn(primary, "d-btn d-btn-primary"), btn(secondary, "d-btn d-btn-ghost"));
    scene.append(row);
    scenarios.append(scene);
  });
  c.append(scenarios);
}

function renderToggle(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "設定画面のON/OFFスイッチ"));
  const wrap = n("div", "d-toggle-wrap");
  const label = n("strong", "", "🔊 BGM ON");
  const toggle = n("button", "d-toggle on");
  toggle.append(n("span", "d-toggle-knob"));
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("on");
    label.textContent = toggle.classList.contains("on") ? "🔊 BGM ON" : "🔇 BGM OFF";
  });
  wrap.append(label, toggle);
  c.append(wrap);
}

function renderTextbox(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "ゲーム開始時のプレイヤー名入力"));
  const form = n("div", "d-form");
  const inputId = `textbox-input-${root.dataset.type || "demo"}`;
  const labelText = n("label", "", "プレイヤー名");
  labelText.htmlFor = inputId;
  const input = n("input", "d-input");
  input.id = inputId;
  input.name = "player-name";
  input.placeholder = "例: Taro";
  form.append(labelText, input, n("small", "", "3〜12文字で入力してください"));
  c.append(form);
}

function renderPlaceholder(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "入力前に薄い文字でヒントを表示"));
  const form = n("div", "d-form");
  const inputId = `placeholder-input-${root.dataset.type || "demo"}`;
  const label = n("label", "", "ニックネーム");
  label.htmlFor = inputId;
  const input = n("input", "d-input");
  input.id = inputId;
  input.name = "nickname";
  input.placeholder = "ニックネームを入力（3文字以上）";
  form.append(label, input, n("small", "", "↑ この薄い文字が「プレースホルダー」 入力すると消える"));
  c.append(form);
}

function renderDropdown(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "難易度選択 — リストから1つ選ぶUI"));
  const wrap = n("div", "d-dropdown-wrap");
  const selectId = `difficulty-select-${root.dataset.type || "demo"}`;
  const label = n("label", "", "難易度を選択:");
  label.htmlFor = selectId;
  label.style.fontSize = "0.75rem";
  label.style.fontWeight = "600";
  const select = n("select", "d-select");
  select.id = selectId;
  select.name = "difficulty";
  ["🟢 Easy（かんたん）", "🟡 Normal（ふつう）", "🔴 Hard（むずかしい）"].forEach(v => {
    select.append(n("option", "", v));
  });
  const out = n("p", "");
  out.textContent = "→ 現在の選択: Easy";
  select.addEventListener("change", () => {
    const val = select.value.split("（")[0].replace(/[🟢🟡🔴]\s*/, "");
    out.textContent = `→ 現在の選択: ${val}`;
  });
  wrap.append(label, select, out);
  c.append(wrap);
}

function renderSlider(root) {
  const c = canvas(root);
  c.append(n("p", "d-tip", "設定画面の音量調整 — つまみをドラッグ"));
  const wrap = n("div", "d-slider-wrap");
  const rangeId = `volume-range-${root.dataset.type || "demo"}`;
  const range = n("input", "d-range");
  range.id = rangeId;
  range.name = "volume";
  range.type = "range";
  range.min = "0";
  range.max = "100";
  range.value = "60";
  const label = n("label", "", "音量");
  label.htmlFor = rangeId;
  const out = n("strong", "", "🔊 音量 60%");
  range.addEventListener("input", () => {
    const v = Number(range.value);
    const icon = v === 0 ? "🔇" : v < 30 ? "🔈" : v < 70 ? "🔉" : "🔊";
    out.textContent = `${icon} 音量 ${v}%`;
  });
  wrap.append(label, out, range);
  c.append(wrap);
}

/* ---------- Renderer Map ---------- */

const renderers = {
  ui: renderUI,
  ux: renderUX,
  layout: renderLayout,
  centering: renderCentering,
  margin: renderMargin,
  padding: renderPadding,
  whitespace: renderWhitespace,
  grid: renderGrid,
  column: renderColumn,
  responsive: renderResponsive,
  animation: renderAnimation,
  transition: renderTransition,
  fade: renderFade,
  slide: renderSlide,
  popup: renderPopup,
  hover: renderHover,
  microinteraction: renderMicrointeraction,
  particle: renderParticle,
  shake: renderShake,
  flash: renderFlash,
  easing: renderEasing,
  "pixel-art": renderPixelArt,
  "retro-8bit": renderRetro8bit,
  "neon-cyberpunk": renderNeonCyberpunk,
  "flat-design": renderFlatDesign,
  "material-design": renderMaterialDesign,
  "minimal-design": renderMinimalDesign,
  "color-unity": renderColorUnity,
  contrast: renderContrast,
  "dark-mode": renderDarkMode,
  monotone: renderMonotone,
  typography: renderTypography,
  icon: renderIcon,
  "progress-bar": renderProgressBar,
  counter: renderCounter,
  badge: renderBadge,
  modal: renderModal,
  dialog: renderDialog,
  overlay: renderOverlay,
  "splash-screen": renderSplash,
  "primary-button": renderPrimaryButton,
  "secondary-button": renderSecondaryButton,
  "toggle-button": renderToggle,
  textbox: renderTextbox,
  placeholder: renderPlaceholder,
  "dropdown-select": renderDropdown,
  slider: renderSlider
};

function fallback(root) {
  canvas(root).append(n("p", "d-tip", "デモ未定義"));
}

function createDemo(term, compact = false) {
  const root = createRoot(term, compact);
  (renderers[term.demo || term.slug] || fallback)(root);
  return root;
}

window.createUiDemo = createDemo;
