/* ==========================================================================
   Multi-Demo Definitions — Multiple examples per "画面の基本" term
   Each term has 3 realistic use-case demos with displayable code
   ========================================================================== */
(function () {
  let uid = 0;
  function id() { return "mb" + (++uid); }

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
    b.className = cls || "mb-btn";
    b.textContent = text;
    return b;
  }

  const demos = {};

  /* ==============================
     ui — UI（画面の見た目や操作部分）
     ============================== */
  demos["ui"] = [
    {
      title: "ゲーム画面のUI構成",
      desc: "スコア、HP、タイマーなどを配置したゲーム画面。UIは情報と操作の配置。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-screen { position:relative;width:100%;height:140px;background:#1e293b;border-radius:8px;overflow:hidden;color:#fff;font-size:.7rem;font-weight:600; }
          .${p}-top { display:flex;justify-content:space-between;padding:8px 12px; }
          .${p}-hp { display:flex;align-items:center;gap:4px; }
          .${p}-hpbar { width:80px;height:8px;background:#374151;border-radius:4px;overflow:hidden; }
          .${p}-hpfill { width:70%;height:100%;background:#22c55e;border-radius:4px; }
          .${p}-score { color:#fbbf24; }
          .${p}-timer { position:absolute;top:8px;left:50%;transform:translateX(-50%);color:#f87171; }
          .${p}-char { position:absolute;bottom:30px;left:50%;transform:translateX(-50%);font-size:1.6rem; }
          .${p}-bottom { position:absolute;bottom:8px;left:0;right:0;display:flex;justify-content:center;gap:6px;padding:0 12px; }
          .${p}-abtn { padding:4px 12px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:4px;color:#fff;font-size:.65rem; }
        `);
        const screen = h("div", `${p}-screen`);
        const top = h("div", `${p}-top`);
        const hpWrap = h("div", `${p}-hp`);
        const hpBar = h("div", `${p}-hpbar`);
        hpBar.append(h("div", `${p}-hpfill`));
        hpWrap.append(h("span", "", "HP"), hpBar);
        top.append(hpWrap, h("span", `${p}-score`, "SCORE: 12,450"));
        screen.append(top);
        screen.append(h("div", `${p}-timer`, "01:23"));
        screen.append(h("div", `${p}-char`, "🧙"));
        const bottom = h("div", `${p}-bottom`);
        ["A: 攻撃", "B: 防御", "X: スキル"].forEach(t => bottom.append(h("span", `${p}-abtn`, t)));
        screen.append(bottom);
        c.append(screen);
      },
      code: {
        css: `.game-screen {
  position: relative;
  width: 100%;
  height: 200px;
  background: #1e293b;
  color: #fff;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
}

.hp-bar {
  width: 80px;
  height: 8px;
  background: #374151;
  border-radius: 4px;
}

.hp-fill {
  width: 70%;
  height: 100%;
  background: #22c55e;
}

.bottom-actions {
  position: absolute;
  bottom: 8px;
  display: flex;
  gap: 6px;
  justify-content: center;
  width: 100%;
}`,
        html: `<div class="game-screen">
  <div class="top-bar">
    <div class="hp"><span>HP</span>
      <div class="hp-bar"><div class="hp-fill"></div></div>
    </div>
    <span class="score">SCORE: 12,450</span>
  </div>
  <div class="bottom-actions">
    <button>A: 攻撃</button>
    <button>B: 防御</button>
  </div>
</div>`
      }
    },
    {
      title: "ダッシュボードUI",
      desc: "統計カードとリスト表示を組み合わせた管理画面のUI。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { font-size:.7rem; }
          .${p}-cards { display:flex;gap:6px;margin-bottom:8px; }
          .${p}-card { flex:1;padding:8px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;text-align:center; }
          .${p}-num { font-size:1.1rem;font-weight:700;color:#1e40af; }
          .${p}-lbl { color:#6b7280;font-size:.6rem;margin-top:2px; }
          .${p}-list { list-style:none;padding:0;margin:0; }
          .${p}-item { display:flex;justify-content:space-between;padding:5px 8px;border-bottom:1px solid #f1f5f9;font-size:.65rem; }
          .${p}-item:last-child { border-bottom:none; }
          .${p}-tag { padding:2px 6px;border-radius:3px;font-size:.6rem;font-weight:600;color:#fff; }
          .${p}-ok { background:#22c55e; } .${p}-ng { background:#ef4444; }
        `);
        const w = h("div", `${p}-wrap`);
        const cards = h("div", `${p}-cards`);
        [["1,234","ユーザー数"],["89%","稼働率"],["56","注文数"]].forEach(([n,l]) => {
          const cd = h("div", `${p}-card`);
          cd.append(h("div", `${p}-num`, n), h("div", `${p}-lbl`, l));
          cards.append(cd);
        });
        const ul = h("ul", `${p}-list`);
        [["田中太郎","ok"],["佐藤花子","ok"],["鈴木一郎","ng"]].forEach(([name, st]) => {
          const li = h("li", `${p}-item`);
          const tag = h("span", `${p}-tag ${p}-${st}`, st === "ok" ? "完了" : "未完了");
          li.append(h("span", "", name), tag);
          ul.append(li);
        });
        w.append(cards, ul);
        c.append(w);
      },
      code: {
        css: `.stat-cards {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.stat-card {
  flex: 1;
  padding: 10px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  text-align: center;
}

.stat-num {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e40af;
}

.list-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 8px;
  border-bottom: 1px solid #f1f5f9;
}`,
        html: `<div class="stat-cards">
  <div class="stat-card">
    <div class="stat-num">1,234</div>
    <div>ユーザー数</div>
  </div>
  <div class="stat-card">
    <div class="stat-num">89%</div>
    <div>稼働率</div>
  </div>
</div>
<ul class="list">
  <li class="list-item">
    <span>田中太郎</span>
    <span class="tag ok">完了</span>
  </li>
</ul>`
      }
    },
    {
      title: "チャットUI",
      desc: "メッセージバブルと入力欄で構成されるチャット画面。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-chat { display:flex;flex-direction:column;height:140px;background:#f9fafb;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb; }
          .${p}-msgs { flex:1;padding:8px;overflow-y:auto;display:flex;flex-direction:column;gap:6px; }
          .${p}-msg { max-width:75%;padding:6px 10px;border-radius:10px;font-size:.7rem;line-height:1.4; }
          .${p}-them { background:#e5e7eb;color:#1f2937;align-self:flex-start;border-bottom-left-radius:2px; }
          .${p}-me { background:#3b82f6;color:#fff;align-self:flex-end;border-bottom-right-radius:2px; }
          .${p}-input { display:flex;border-top:1px solid #e5e7eb;padding:6px; gap:4px; }
          .${p}-field { flex:1;padding:5px 8px;border:1px solid #d1d5db;border-radius:14px;font-size:.7rem;outline:none; }
          .${p}-send { padding:5px 12px;background:#3b82f6;color:#fff;border:none;border-radius:14px;font-size:.7rem;font-weight:600;cursor:pointer; }
        `);
        const chat = h("div", `${p}-chat`);
        const msgs = h("div", `${p}-msgs`);
        const m1 = h("div", `${p}-msg ${p}-them`, "こんにちは！");
        const m2 = h("div", `${p}-msg ${p}-me`, "やあ！元気？");
        const m3 = h("div", `${p}-msg ${p}-them`, "元気だよ！今日は何する？");
        msgs.append(m1, m2, m3);
        const inputRow = h("div", `${p}-input`);
        const field = h("input", `${p}-field`);
        field.placeholder = "メッセージを入力...";
        const send = makeBtn("送信", `${p}-send`);
        send.addEventListener("click", () => {
          if (!field.value.trim()) return;
          const m = h("div", `${p}-msg ${p}-me`, field.value);
          msgs.append(m);
          field.value = "";
          msgs.scrollTop = msgs.scrollHeight;
        });
        inputRow.append(field, send);
        chat.append(msgs, inputRow);
        c.append(chat);
      },
      code: {
        css: `.chat { display: flex; flex-direction: column; height: 300px; }
.messages { flex: 1; padding: 8px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; }
.msg { max-width: 75%; padding: 8px 12px; border-radius: 12px; font-size: 0.85rem; }
.msg-them { background: #e5e7eb; align-self: flex-start; }
.msg-me { background: #3b82f6; color: #fff; align-self: flex-end; }
.input-row { display: flex; border-top: 1px solid #e5e7eb; padding: 8px; gap: 6px; }
.input-field { flex: 1; padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 16px; }`,
        html: `<div class="chat">
  <div class="messages">
    <div class="msg msg-them">こんにちは！</div>
    <div class="msg msg-me">やあ！元気？</div>
  </div>
  <div class="input-row">
    <input class="input-field" placeholder="メッセージを入力..." />
    <button class="send-btn">送信</button>
  </div>
</div>`
      }
    }
  ];

  /* ==============================
     ux — UX（使ったときの体験）
     ============================== */
  demos["ux"] = [
    {
      title: "良いUX vs 悪いUX",
      desc: "ボタン配置の比較。使いやすさがUXの違いを生む。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:12px; }
          .${p}-panel { flex:1;padding:10px;border-radius:8px;border:1px solid #e5e7eb;font-size:.65rem; }
          .${p}-bad { background:#fef2f2; }
          .${p}-good { background:#f0fdf4; }
          .${p}-title { font-weight:700;margin-bottom:6px;font-size:.7rem; }
          .${p}-badtitle { color:#ef4444; } .${p}-goodtitle { color:#22c55e; }
          .${p}-form { display:flex;flex-direction:column;gap:4px; }
          .${p}-lbl { color:#6b7280; }
          .${p}-inp { padding:4px 6px;border:1px solid #d1d5db;border-radius:4px;font-size:.65rem; }
          .${p}-btns { display:flex;gap:4px;margin-top:6px; }
          .${p}-bsub { padding:4px 10px;border:none;border-radius:4px;font-size:.6rem;font-weight:600;cursor:pointer; }
          .${p}-bcancel { padding:4px 10px;border:1px solid #d1d5db;border-radius:4px;background:#fff;font-size:.6rem;cursor:pointer; }
          .${p}-gbtn { background:#22c55e;color:#fff; }
          .${p}-bbtn { background:#d1d5db;color:#6b7280;font-size:.55rem; }
          .${p}-rev { flex-direction:row-reverse; }
        `);
        const w = h("div", `${p}-wrap`);
        // Bad UX
        const bad = h("div", `${p}-panel ${p}-bad`);
        bad.append(h("div", `${p}-title ${p}-badtitle`, "悪い例"));
        const bf = h("div", `${p}-form`);
        bf.append(h("span", `${p}-lbl`, "メール:"));
        const bi = h("input", `${p}-inp`); bi.placeholder="..."; bf.append(bi);
        const bb = h("div", `${p}-btns ${p}-rev`);
        bb.append(h("button", `${p}-bsub ${p}-bbtn`, "キャンセル  送信  リセット"));
        bf.append(bb);
        bad.append(bf);
        // Good UX
        const good = h("div", `${p}-panel ${p}-good`);
        good.append(h("div", `${p}-title ${p}-goodtitle`, "良い例"));
        const gf = h("div", `${p}-form`);
        gf.append(h("span", `${p}-lbl`, "メール:"));
        const gi = h("input", `${p}-inp`); gi.placeholder = "user@example.com"; gf.append(gi);
        const gb = h("div", `${p}-btns`);
        gb.append(h("button", `${p}-bsub ${p}-gbtn`, "送信する"));
        gb.append(h("button", `${p}-bcancel`, "キャンセル"));
        gf.append(gb);
        good.append(gf);
        w.append(bad, good);
        c.append(w);
      },
      code: {
        css: `/* 良いUX: 主要ボタンが目立ち、配置が自然 */
.good .primary-btn {
  background: #22c55e;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
}

.good .cancel-btn {
  background: #fff;
  border: 1px solid #d1d5db;
}

/* 悪いUX: ボタンの区別がつきにくい */
.bad .btn {
  background: #d1d5db;
  color: #6b7280;
}`,
        html: `<!-- 良いUX -->
<div class="good">
  <button class="primary-btn">送信する</button>
  <button class="cancel-btn">キャンセル</button>
</div>

<!-- 悪いUX -->
<div class="bad">
  <button class="btn">キャンセル 送信 リセット</button>
</div>`
      }
    },
    {
      title: "ステップ表示",
      desc: "段階的にユーザーを導くUI。現在のステップが明確に分かる。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-steps { display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:10px; }
          .${p}-step { display:flex;align-items:center;gap:0; }
          .${p}-circle { width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:700;border:2px solid #d1d5db;color:#9ca3af;background:#fff; }
          .${p}-done { background:#3b82f6;border-color:#3b82f6;color:#fff; }
          .${p}-current { border-color:#3b82f6;color:#3b82f6; }
          .${p}-line { width:30px;height:2px;background:#d1d5db; }
          .${p}-linedone { background:#3b82f6; }
          .${p}-label { font-size:.6rem;color:#6b7280;margin-top:4px; }
          .${p}-content { padding:8px;background:#f9fafb;border-radius:6px;font-size:.7rem;color:#374151; }
          .${p}-btns { display:flex;gap:6px;justify-content:center;margin-top:8px; }
          .${p}-nbtn { padding:4px 12px;font-size:.65rem;font-weight:600;border:none;border-radius:4px;cursor:pointer;color:#fff;background:#3b82f6; }
          .${p}-pbtn { padding:4px 12px;font-size:.65rem;font-weight:600;border:1px solid #d1d5db;border-radius:4px;cursor:pointer;background:#fff;color:#374151; }
        `);
        const stepNames = ["入力", "確認", "完了"];
        const stepContents = ["名前とメールを入力してください", "入力内容を確認してください", "登録が完了しました！"];
        let cur = 0;
        const w = h("div", `${p}-wrap`);
        const stepsRow = h("div", `${p}-steps`);
        const circles = [];
        const lines = [];
        stepNames.forEach((name, i) => {
          const step = h("div", `${p}-step`);
          const circle = h("div", `${p}-circle`, String(i + 1));
          circles.push(circle);
          step.append(circle);
          if (i < stepNames.length - 1) {
            const line = h("div", `${p}-line`);
            lines.push(line);
            step.append(line);
          }
          stepsRow.append(step);
        });
        const content = h("div", `${p}-content`, stepContents[0]);
        const btns = h("div", `${p}-btns`);
        const prev = makeBtn("戻る", `${p}-pbtn`);
        const next = makeBtn("次へ", `${p}-nbtn`);
        function update() {
          circles.forEach((ci, i) => {
            ci.className = `${p}-circle`;
            if (i < cur) ci.classList.add(`${p}-done`);
            else if (i === cur) ci.classList.add(`${p}-current`);
          });
          lines.forEach((ln, i) => {
            ln.className = `${p}-line`;
            if (i < cur) ln.classList.add(`${p}-linedone`);
          });
          content.textContent = stepContents[cur];
          prev.style.visibility = cur === 0 ? "hidden" : "visible";
          next.textContent = cur === stepNames.length - 1 ? "完了" : "次へ";
        }
        prev.addEventListener("click", () => { if (cur > 0) { cur--; update(); } });
        next.addEventListener("click", () => { if (cur < stepNames.length - 1) { cur++; update(); } else { cur = 0; update(); } });
        btns.append(prev, next);
        update();
        w.append(stepsRow, content, btns);
        c.append(w);
      },
      code: {
        css: `.steps { display: flex; align-items: center; justify-content: center; gap: 0; }
.circle {
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; color: #9ca3af;
}
.circle.done { background: #3b82f6; border-color: #3b82f6; color: #fff; }
.circle.current { border-color: #3b82f6; color: #3b82f6; }
.line { width: 40px; height: 2px; background: #d1d5db; }
.line.done { background: #3b82f6; }`,
        html: `<div class="steps">
  <div class="circle done">1</div>
  <div class="line done"></div>
  <div class="circle current">2</div>
  <div class="line"></div>
  <div class="circle">3</div>
</div>
<div class="content">確認画面です</div>
<button>戻る</button>
<button>次へ</button>`
      }
    },
    {
      title: "エラー時のフィードバック",
      desc: "エラー通知の良い例と悪い例。具体的なメッセージが大切。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;flex-direction:column;gap:8px; }
          .${p}-panel { padding:8px 10px;border-radius:6px;font-size:.7rem;display:flex;align-items:flex-start;gap:6px; }
          .${p}-bad { background:#fef2f2;border:1px solid #fecaca; }
          .${p}-good { background:#f0fdf4;border:1px solid #bbf7d0; }
          .${p}-icon { font-size:.9rem;flex-shrink:0; }
          .${p}-txt { line-height:1.4; }
          .${p}-title { font-weight:700;margin-bottom:2px; }
          .${p}-badtitle { color:#ef4444; } .${p}-goodtitle { color:#22c55e; }
          .${p}-sub { color:#6b7280;font-size:.65rem; }
          .${p}-link { color:#3b82f6;text-decoration:underline;cursor:pointer;font-size:.65rem; }
        `);
        const w = h("div", `${p}-wrap`);
        // Bad
        const bad = h("div", `${p}-panel ${p}-bad`);
        bad.append(h("span", `${p}-icon`, "X"));
        const bt = h("div", `${p}-txt`);
        bt.append(h("div", `${p}-title ${p}-badtitle`, "悪い例: エラーが発生しました"));
        bt.append(h("div", `${p}-sub`, "エラーコード: 0x80004005"));
        bad.append(bt);
        // Good
        const good = h("div", `${p}-panel ${p}-good`);
        good.append(h("span", `${p}-icon`, "!"));
        const gt = h("div", `${p}-txt`);
        gt.append(h("div", `${p}-title ${p}-goodtitle`, "良い例: メールアドレスの形式が正しくありません"));
        gt.append(h("div", `${p}-sub`, "例: user@example.com の形式で入力してください"));
        gt.append(h("span", `${p}-link`, "ヘルプを見る"));
        good.append(gt);
        w.append(bad, good);
        c.append(w);
      },
      code: {
        css: `/* 悪い例: 曖昧なエラー */
.error-bad {
  background: #fef2f2;
  border: 1px solid #fecaca;
  padding: 10px;
  border-radius: 6px;
}

/* 良い例: 具体的で解決策付き */
.error-good {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 10px;
  border-radius: 6px;
}

.error-title { font-weight: 700; }
.error-hint { color: #6b7280; font-size: 0.85rem; }
.error-link { color: #3b82f6; text-decoration: underline; }`,
        html: `<!-- 悪い例 -->
<div class="error-bad">
  <p class="error-title">エラーが発生しました</p>
  <p>エラーコード: 0x80004005</p>
</div>

<!-- 良い例 -->
<div class="error-good">
  <p class="error-title">メールアドレスの形式が正しくありません</p>
  <p class="error-hint">例: user@example.com</p>
  <a class="error-link">ヘルプを見る</a>
</div>`
      }
    }
  ];

  /* ==============================
     layout — レイアウト
     ============================== */
  demos["layout"] = [
    {
      title: "ヘッダー・メイン・フッター",
      desc: "基本3段レイアウト。Webページの最も基本的な構造。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-page { display:flex;flex-direction:column;height:140px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:.7rem;font-weight:600; }
          .${p}-header { background:#1e293b;color:#fff;padding:8px 12px;text-align:center; }
          .${p}-main { flex:1;background:#f9fafb;padding:12px;display:flex;align-items:center;justify-content:center;color:#6b7280; }
          .${p}-footer { background:#e5e7eb;color:#6b7280;padding:6px 12px;text-align:center;font-size:.6rem; }
        `);
        const page = h("div", `${p}-page`);
        page.append(h("header", `${p}-header`, "ヘッダー"));
        page.append(h("main", `${p}-main`, "メインコンテンツ（flex:1 で残り全部）"));
        page.append(h("footer", `${p}-footer`, "フッター"));
        c.append(page);
      },
      code: {
        css: `.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background: #1e293b;
  color: #fff;
  padding: 12px;
}

main {
  flex: 1;
  padding: 16px;
}

footer {
  background: #e5e7eb;
  padding: 8px;
  text-align: center;
}`,
        html: `<div class="page">
  <header>ヘッダー</header>
  <main>メインコンテンツ</main>
  <footer>フッター</footer>
</div>`
      }
    },
    {
      title: "サイドバー付きレイアウト",
      desc: "2カラム+ヘッダー+フッター。管理画面でよく使われる構成。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-page { display:flex;flex-direction:column;height:140px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:.65rem;font-weight:600; }
          .${p}-header { background:#1e293b;color:#fff;padding:6px 10px; }
          .${p}-body { display:flex;flex:1;overflow:hidden; }
          .${p}-side { width:70px;background:#f1f5f9;padding:8px 6px;display:flex;flex-direction:column;gap:4px;border-right:1px solid #e5e7eb; }
          .${p}-link { padding:3px 6px;border-radius:4px;color:#374151;font-size:.6rem;cursor:pointer; }
          .${p}-active { background:#3b82f6;color:#fff; }
          .${p}-main { flex:1;padding:10px;background:#fff;color:#6b7280; }
          .${p}-footer { background:#e5e7eb;color:#6b7280;padding:4px 10px;font-size:.55rem;text-align:center; }
        `);
        const page = h("div", `${p}-page`);
        page.append(h("div", `${p}-header`, "ダッシュボード"));
        const body = h("div", `${p}-body`);
        const side = h("div", `${p}-side`);
        ["ホーム", "設定", "ユーザー", "ログ"].forEach((t, i) => {
          side.append(h("div", `${p}-link ${i === 0 ? p + "-active" : ""}`, t));
        });
        body.append(side, h("div", `${p}-main`, "コンテンツエリア"));
        page.append(body);
        page.append(h("div", `${p}-footer`, "Copyright 2025"));
        c.append(page);
      },
      code: {
        css: `.page { display: flex; flex-direction: column; min-height: 100vh; }
header { background: #1e293b; color: #fff; padding: 8px 12px; }
.body { display: flex; flex: 1; }
.sidebar {
  width: 200px;
  background: #f1f5f9;
  padding: 12px;
  border-right: 1px solid #e5e7eb;
}
main { flex: 1; padding: 16px; }
footer { background: #e5e7eb; padding: 6px; text-align: center; }`,
        html: `<div class="page">
  <header>ダッシュボード</header>
  <div class="body">
    <nav class="sidebar">
      <a class="active">ホーム</a>
      <a>設定</a>
      <a>ユーザー</a>
    </nav>
    <main>コンテンツ</main>
  </div>
  <footer>Copyright 2025</footer>
</div>`
      }
    },
    {
      title: "カード型レイアウト",
      desc: "カードを並べた一覧表示。商品やコンテンツの表示に最適。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:8px; }
          .${p}-card { background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden; }
          .${p}-img { height:40px;display:flex;align-items:center;justify-content:center;font-size:1.2rem; }
          .${p}-body { padding:6px 8px; }
          .${p}-t { font-size:.7rem;font-weight:700;color:#1f2937; }
          .${p}-s { font-size:.6rem;color:#6b7280;margin-top:2px; }
        `);
        const grid = h("div", `${p}-grid`);
        const items = [
          ["#dbeafe","📘","CSS入門","基礎から学ぶ"],
          ["#fef3c7","📙","JS入門","実践で学ぶ"],
          ["#dcfce7","📗","HTML入門","構造を理解"]
        ];
        items.forEach(([bg, icon, title, sub]) => {
          const card = h("div", `${p}-card`);
          const img = h("div", `${p}-img`, icon);
          img.style.background = bg;
          const body = h("div", `${p}-body`);
          body.append(h("div", `${p}-t`, title), h("div", `${p}-s`, sub));
          card.append(img, body);
          grid.append(card);
        });
        c.append(grid);
      },
      code: {
        css: `.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.card-img {
  height: 80px;
  background: #dbeafe;
}

.card-body {
  padding: 8px 12px;
}`,
        html: `<div class="card-grid">
  <div class="card">
    <div class="card-img">📘</div>
    <div class="card-body">
      <h3>CSS入門</h3>
      <p>基礎から学ぶ</p>
    </div>
  </div>
  <!-- more cards... -->
</div>`
      }
    }
  ];

  /* ==============================
     centering — センタリング
     ============================== */
  demos["centering"] = [
    {
      title: "Flexboxで中央揃え",
      desc: "display:flex + justify-content + align-items で上下左右中央。最も一般的な方法。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-box { width:100%;height:120px;background:#eff6ff;border:2px dashed #93c5fd;border-radius:8px;
            display:flex;justify-content:center;align-items:center; }
          .${p}-inner { padding:10px 20px;background:#3b82f6;color:#fff;border-radius:6px;font-size:.75rem;font-weight:600; }
        `);
        const box = h("div", `${p}-box`);
        box.append(h("div", `${p}-inner`, "中央に配置！"));
        c.append(box);
      },
      code: {
        css: `.container {
  display: flex;
  justify-content: center;  /* 横方向の中央 */
  align-items: center;       /* 縦方向の中央 */
  height: 200px;
}

.item {
  padding: 12px 24px;
  background: #3b82f6;
  color: #fff;
  border-radius: 6px;
}`,
        html: `<div class="container">
  <div class="item">中央に配置！</div>
</div>`
      }
    },
    {
      title: "CSS Gridで中央揃え",
      desc: "display:grid + place-items:center で最も簡潔に中央揃え。たった2行のCSS。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-box { width:100%;height:120px;background:#faf5ff;border:2px dashed #c4b5fd;border-radius:8px;
            display:grid;place-items:center; }
          .${p}-inner { padding:10px 20px;background:#8b5cf6;color:#fff;border-radius:6px;font-size:.75rem;font-weight:600; }
        `);
        const box = h("div", `${p}-box`);
        box.append(h("div", `${p}-inner`, "Grid中央！"));
        c.append(box);
      },
      code: {
        css: `.container {
  display: grid;
  place-items: center;  /* たった1行で中央！ */
  height: 200px;
}

.item {
  padding: 12px 24px;
  background: #8b5cf6;
  color: #fff;
  border-radius: 6px;
}`,
        html: `<div class="container">
  <div class="item">Grid中央！</div>
</div>`
      }
    },
    {
      title: "position+transformで中央揃え",
      desc: "absolute positioning + transform:translate(-50%,-50%) による古典的な方法。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-box { position:relative;width:100%;height:120px;background:#fef3c7;border:2px dashed #fcd34d;border-radius:8px; }
          .${p}-inner { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
            padding:10px 20px;background:#f59e0b;color:#fff;border-radius:6px;font-size:.75rem;font-weight:600;white-space:nowrap; }
        `);
        const box = h("div", `${p}-box`);
        box.append(h("div", `${p}-inner`, "position中央！"));
        c.append(box);
      },
      code: {
        css: `.container {
  position: relative;
  height: 200px;
}

.item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 12px 24px;
  background: #f59e0b;
  color: #fff;
  border-radius: 6px;
}`,
        html: `<div class="container">
  <div class="item">position中央！</div>
</div>`
      }
    }
  ];

  /* ==============================
     margin — マージン
     ============================== */
  demos["margin"] = [
    {
      title: "要素間のマージン",
      desc: "カード間にスペースをあけて見やすくする。margin-bottomで均等な間隔を実現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { width:100%; }
          .${p}-card { background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:8px 12px;font-size:.7rem;font-weight:600;color:#374151; }
          .${p}-card + .${p}-card { margin-top:8px; }
          .${p}-anno { font-size:.55rem;color:#9ca3af;text-align:center;padding:2px 0;background:#f9fafb;border:1px dashed #d1d5db;border-radius:3px;margin-top:2px;margin-bottom:2px; }
          .${p}-hide { display:none; }
        `);
        const w = h("div", `${p}-wrap`);
        const c1 = h("div", `${p}-card`, "カード 1");
        const ann1 = h("div", `${p}-anno`, "margin-top: 8px");
        const c2 = h("div", `${p}-card`, "カード 2");
        const ann2 = h("div", `${p}-anno`, "margin-top: 8px");
        const c3 = h("div", `${p}-card`, "カード 3");
        w.append(c1, ann1, c2, ann2, c3);
        c.append(w);
      },
      code: {
        css: `.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px 14px;
}

/* 隣接するカード間にマージン */
.card + .card {
  margin-top: 12px;
}`,
        html: `<div class="card">カード 1</div>
<div class="card">カード 2</div>
<div class="card">カード 3</div>`
      }
    },
    {
      title: "margin:auto で中央揃え",
      desc: "ブロック要素の水平中央配置。幅を設定して左右にautoを指定。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-outer { background:#f1f5f9;border:2px dashed #94a3b8;border-radius:8px;padding:12px 8px; }
          .${p}-box { width:60%;margin:0 auto;background:#3b82f6;color:#fff;padding:10px;border-radius:6px;text-align:center;font-size:.75rem;font-weight:600; }
          .${p}-label { text-align:center;font-size:.6rem;color:#6b7280;margin-top:6px; }
        `);
        const outer = h("div", `${p}-outer`);
        outer.append(h("div", `${p}-box`, "width:60% + margin:0 auto"));
        c.append(outer);
        c.append(h("div", `${p}-label`, "左右のmarginがautoで均等に分配 = 中央"));
      },
      code: {
        css: `.container {
  background: #f1f5f9;
  padding: 16px;
}

.centered-box {
  width: 60%;
  margin: 0 auto;  /* 左右auto = 中央 */
  background: #3b82f6;
  color: #fff;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
}`,
        html: `<div class="container">
  <div class="centered-box">
    width:60% + margin:0 auto
  </div>
</div>`
      }
    },
    {
      title: "方向別マージン",
      desc: "上下左右個別にマージンを設定する。margin-top, right, bottom, leftの違い。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-outer { background:#f9fafb;border:2px dashed #d1d5db;border-radius:8px;padding:6px;position:relative; }
          .${p}-box { background:#8b5cf6;color:#fff;padding:8px;border-radius:4px;font-size:.6rem;font-weight:600;text-align:center;
            margin-top:20px;margin-right:40px;margin-bottom:10px;margin-left:15px; }
          .${p}-labels { font-size:.55rem;color:#6b7280;display:flex;flex-direction:column;gap:1px;margin-top:4px; }
          .${p}-l { display:flex;gap:4px;align-items:center; }
          .${p}-dot { width:8px;height:8px;border-radius:2px; }
          .${p}-mt { background:#ef4444; } .${p}-mr { background:#f59e0b; } .${p}-mb { background:#22c55e; } .${p}-ml { background:#3b82f6; }
        `);
        const outer = h("div", `${p}-outer`);
        outer.append(h("div", `${p}-box`, "margin: 20px 40px 10px 15px"));
        const labels = h("div", `${p}-labels`);
        [["mt","上:20px","#ef4444"],["mr","右:40px","#f59e0b"],["mb","下:10px","#22c55e"],["ml","左:15px","#3b82f6"]].forEach(([cls, text]) => {
          const l = h("div", `${p}-l`);
          l.append(h("span", `${p}-dot ${p}-${cls}`), h("span", "", text));
          labels.append(l);
        });
        c.append(outer, labels);
      },
      code: {
        css: `.box {
  /* 一括指定: 上 右 下 左 */
  margin: 20px 40px 10px 15px;

  /* 個別指定 */
  margin-top: 20px;
  margin-right: 40px;
  margin-bottom: 10px;
  margin-left: 15px;
}`,
        html: `<div class="container">
  <div class="box">
    margin: 20px 40px 10px 15px
  </div>
</div>`
      }
    }
  ];

  /* ==============================
     padding — パディング
     ============================== */
  demos["padding"] = [
    {
      title: "ボタンの内側余白",
      desc: "パディングでボタンサイズを調整。padding の大きさで印象が変わる。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center; }
          .${p}-btn { background:#3b82f6;color:#fff;border:none;border-radius:6px;font-size:.7rem;font-weight:600;cursor:pointer; }
          .${p}-sm { padding:4px 8px; }
          .${p}-md { padding:8px 16px; }
          .${p}-lg { padding:12px 28px; }
          .${p}-lbl { font-size:.55rem;color:#6b7280;text-align:center;margin-top:2px; }
          .${p}-col { display:flex;flex-direction:column;align-items:center; }
        `);
        const w = h("div", `${p}-wrap`);
        [["sm","4px 8px","小"],["md","8px 16px","中"],["lg","12px 28px","大"]].forEach(([sz, val, label]) => {
          const col = h("div", `${p}-col`);
          col.append(h("button", `${p}-btn ${p}-${sz}`, "ボタン"));
          col.append(h("div", `${p}-lbl`, `padding: ${val}`));
          w.append(col);
        });
        c.append(w);
      },
      code: {
        css: `/* パディングでボタンサイズが変わる */
.btn-sm { padding: 4px 8px; }
.btn-md { padding: 8px 16px; }
.btn-lg { padding: 12px 28px; }

.btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
}`,
        html: `<button class="btn btn-sm">小</button>
<button class="btn btn-md">中</button>
<button class="btn btn-lg">大</button>`
      }
    },
    {
      title: "カードの余白",
      desc: "内容を囲む余白。パディングがないと内容が端にくっつく。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:10px; }
          .${p}-card { flex:1;background:#fff;border:1px solid #e5e7eb;border-radius:8px;font-size:.65rem; }
          .${p}-nopad { padding:0; }
          .${p}-withpad { padding:12px; }
          .${p}-t { font-weight:700;color:#1f2937;margin-bottom:4px; }
          .${p}-sub { color:#6b7280;line-height:1.4; }
          .${p}-tag { display:block;text-align:center;font-size:.55rem;color:#9ca3af;background:#f9fafb;padding:3px;border-radius:0 0 7px 7px; }
          .${p}-tag2 { border-radius:7px 7px 0 0;margin-bottom:0; }
        `);
        const w = h("div", `${p}-wrap`);
        // No padding
        const c1 = h("div", `${p}-card ${p}-nopad`);
        c1.append(h("div", `${p}-tag ${p}-tag2`, "padding: 0"));
        const inner1 = h("div", "");
        inner1.style.padding = "0";
        inner1.append(h("div", `${p}-t`, "タイトル"), h("div", `${p}-sub`, "テキストが端にくっついて読みにくい"));
        c1.append(inner1);
        // With padding
        const c2 = h("div", `${p}-card ${p}-withpad`);
        c2.append(h("div", `${p}-t`, "タイトル"), h("div", `${p}-sub`, "余白があると読みやすい"));
        c2.append(h("div", `${p}-tag`, "padding: 12px"));
        w.append(c1, c2);
        c.append(w);
      },
      code: {
        css: `/* パディングなし = 窮屈 */
.card-no-padding {
  padding: 0;
}

/* パディングあり = 読みやすい */
.card-with-padding {
  padding: 16px;
}

.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}`,
        html: `<!-- パディングなし -->
<div class="card card-no-padding">
  <h3>タイトル</h3>
  <p>端にくっつく</p>
</div>

<!-- パディングあり -->
<div class="card card-with-padding">
  <h3>タイトル</h3>
  <p>余白で読みやすい</p>
</div>`
      }
    },
    {
      title: "パディングの方向別指定",
      desc: "上下左右個別にパディングを指定する方法と省略記法。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-outer { background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:8px; }
          .${p}-box { background:#8b5cf6;color:#fff;border-radius:4px;font-size:.65rem;font-weight:600;text-align:center;
            padding-top:20px;padding-right:10px;padding-bottom:8px;padding-left:30px; }
          .${p}-viz { margin-top:8px;display:grid;grid-template-columns:auto 1fr auto;grid-template-rows:auto 1fr auto;gap:2px;font-size:.55rem;font-weight:600;text-align:center; }
          .${p}-t { grid-column:2;color:#ef4444; } .${p}-b { grid-column:2;color:#22c55e; }
          .${p}-l { grid-row:2;color:#3b82f6; } .${p}-r { grid-row:2;grid-column:3;color:#f59e0b; }
          .${p}-center { grid-row:2;grid-column:2;background:#f3e8ff;border-radius:3px;padding:4px;color:#6b7280; }
        `);
        const outer = h("div", `${p}-outer`);
        outer.append(h("div", `${p}-box`, "padding: 20px 10px 8px 30px"));
        const viz = h("div", `${p}-viz`);
        viz.append(h("div", `${p}-t`, "上: 20px"));
        viz.append(h("div", `${p}-l`, "左: 30px"));
        viz.append(h("div", `${p}-center`, "内容"));
        viz.append(h("div", `${p}-r`, "右: 10px"));
        viz.append(h("div", `${p}-b`, "下: 8px"));
        c.append(outer, viz);
      },
      code: {
        css: `.box {
  /* 一括指定: 上 右 下 左（時計回り） */
  padding: 20px 10px 8px 30px;

  /* 個別指定 */
  padding-top: 20px;
  padding-right: 10px;
  padding-bottom: 8px;
  padding-left: 30px;

  /* 省略形 */
  /* padding: 上下 左右 */
  /* padding: 10px 20px; */
}`,
        html: `<div class="box">
  padding: 20px 10px 8px 30px
</div>`
      }
    }
  ];

  /* ==============================
     whitespace — 余白
     ============================== */
  demos["whitespace"] = [
    {
      title: "詰め込み vs ゆとり",
      desc: "同じ内容でも余白の有無で印象が大きく変わる。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:10px; }
          .${p}-panel { flex:1;border:1px solid #e5e7eb;border-radius:8px;background:#fff;font-size:.65rem; }
          .${p}-cramped { padding:2px 4px; }
          .${p}-spacious { padding:12px 14px; }
          .${p}-t { font-weight:700;color:#1f2937; }
          .${p}-p { color:#6b7280;line-height:1.3; }
          .${p}-spacious .${p}-t { margin-bottom:6px; }
          .${p}-spacious .${p}-p { line-height:1.6; }
          .${p}-cramped .${p}-t { margin-bottom:1px; }
          .${p}-label { text-align:center;font-size:.55rem;color:#9ca3af;margin-top:2px; }
        `);
        const w = h("div", `${p}-wrap`);
        [["cramped", "詰め込み"], ["spacious", "ゆとり"]].forEach(([cls, label]) => {
          const col = h("div", "");
          col.style.flex = "1";
          const panel = h("div", `${p}-panel ${p}-${cls}`);
          panel.append(h("div", `${p}-t`, "お知らせ"));
          panel.append(h("div", `${p}-p`, "本日はサーバーメンテナンスのため、一時的にサービスを停止します。"));
          col.append(panel, h("div", `${p}-label`, label));
          w.append(col);
        });
        c.append(w);
      },
      code: {
        css: `/* 余白なし = 窮屈で読みにくい */
.cramped {
  padding: 2px;
  line-height: 1.2;
}

/* 余白あり = 読みやすくプロフェッショナル */
.spacious {
  padding: 16px;
  line-height: 1.6;
}`,
        html: `<!-- 詰め込み -->
<div class="cramped">
  <h3>お知らせ</h3>
  <p>サーバーメンテナンスのお知らせ...</p>
</div>

<!-- ゆとり -->
<div class="spacious">
  <h3>お知らせ</h3>
  <p>サーバーメンテナンスのお知らせ...</p>
</div>`
      }
    },
    {
      title: "行間（line-height）",
      desc: "テキストの読みやすさは行間で決まる。line-heightの比較。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:10px; }
          .${p}-col { flex:1; }
          .${p}-text { font-size:.65rem;color:#374151;background:#fff;padding:8px;border:1px solid #e5e7eb;border-radius:6px; }
          .${p}-tight { line-height:1.1; }
          .${p}-normal { line-height:1.6; }
          .${p}-wide { line-height:2.2; }
          .${p}-lbl { text-align:center;font-size:.55rem;color:#9ca3af;margin-top:3px;font-weight:600; }
        `);
        const w = h("div", `${p}-wrap`);
        const txt = "Webデザインにおいて行間はとても重要です。適切な行間を設定すると文章が格段に読みやすくなります。";
        [["tight","line-height: 1.1"],["normal","line-height: 1.6"],["wide","line-height: 2.2"]].forEach(([cls, label]) => {
          const col = h("div", `${p}-col`);
          col.append(h("div", `${p}-text ${p}-${cls}`, txt));
          col.append(h("div", `${p}-lbl`, label));
          w.append(col);
        });
        c.append(w);
      },
      code: {
        css: `/* 狭い行間 */
.tight { line-height: 1.1; }

/* 標準的な行間（推奨） */
.normal { line-height: 1.6; }

/* 広い行間 */
.wide { line-height: 2.2; }

/*
 * 日本語テキストは 1.5〜1.8 が読みやすい
 * 英語テキストは 1.4〜1.6 が一般的
 */`,
        html: `<p class="tight">狭い行間のテキスト...</p>
<p class="normal">標準の行間のテキスト...</p>
<p class="wide">広い行間のテキスト...</p>`
      }
    },
    {
      title: "セクション間の余白",
      desc: "ページ全体のリズム。セクション間の余白でコンテンツにメリハリを付ける。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-page { background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:8px 12px;overflow-y:auto;height:130px; }
          .${p}-section { padding:10px 0; }
          .${p}-section + .${p}-section { border-top:1px solid #f1f5f9; }
          .${p}-st { font-size:.75rem;font-weight:700;color:#1f2937;margin-bottom:4px; }
          .${p}-sp { font-size:.6rem;color:#6b7280;line-height:1.5; }
          .${p}-anno { font-size:.5rem;color:#3b82f6;text-align:center;background:#eff6ff;padding:2px;border-radius:3px;margin:2px 0; }
        `);
        const page = h("div", `${p}-page`);
        const sections = [
          ["自己紹介", "こんにちは。Webデザイナーです。"],
          ["スキル", "HTML, CSS, JavaScriptが得意です。"],
          ["作品一覧", "ポートフォリオサイトやECサイトを制作しました。"]
        ];
        sections.forEach(([title, text], i) => {
          if (i > 0) page.append(h("div", `${p}-anno`, "padding: 10px 0（余白でリズムを作る）"));
          const sec = h("div", `${p}-section`);
          sec.append(h("div", `${p}-st`, title), h("div", `${p}-sp`, text));
          page.append(sec);
        });
        c.append(page);
      },
      code: {
        css: `.section {
  padding: 32px 0;
}

.section + .section {
  border-top: 1px solid #f1f5f9;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

/*
 * セクション間に余白を入れることで
 * コンテンツにリズムとメリハリが生まれる
 */`,
        html: `<section class="section">
  <h2 class="section-title">自己紹介</h2>
  <p>こんにちは。Webデザイナーです。</p>
</section>
<section class="section">
  <h2 class="section-title">スキル</h2>
  <p>HTML, CSS, JavaScript</p>
</section>`
      }
    }
  ];

  /* ==============================
     grid — グリッド
     ============================== */
  demos["grid"] = [
    {
      title: "基本グリッド",
      desc: "等分割のグリッド配置。grid-template-columnsで列数を指定する。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:6px; }
          .${p}-cell { background:#dbeafe;border:1px solid #93c5fd;border-radius:6px;padding:12px;text-align:center;font-size:.7rem;font-weight:600;color:#1e40af; }
        `);
        const grid = h("div", `${p}-grid`);
        for (let i = 1; i <= 6; i++) grid.append(h("div", `${p}-cell`, String(i)));
        c.append(grid);
      },
      code: {
        css: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.cell {
  background: #dbeafe;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  padding: 16px;
  text-align: center;
}`,
        html: `<div class="grid">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
  <div class="cell">5</div>
  <div class="cell">6</div>
</div>`
      }
    },
    {
      title: "span指定",
      desc: "一部のセルが複数マスにまたがるレイアウト。grid-columnとgrid-rowでspan指定。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-grid { display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:auto auto;gap:6px; }
          .${p}-cell { background:#e0e7ff;border:1px solid #a5b4fc;border-radius:6px;padding:10px;text-align:center;font-size:.65rem;font-weight:600;color:#3730a3; }
          .${p}-wide { grid-column:span 2;background:#c7d2fe; }
          .${p}-tall { grid-row:span 2;background:#a5b4fc;color:#fff; }
        `);
        const grid = h("div", `${p}-grid`);
        const c1 = h("div", `${p}-cell ${p}-wide`, "span 2列");
        const c2 = h("div", `${p}-cell`, "1x1");
        const c3 = h("div", `${p}-cell`, "1x1");
        const c4 = h("div", `${p}-cell`, "1x1");
        const c5 = h("div", `${p}-cell`, "1x1");
        grid.append(c1, c2, c3, c4, c5);
        c.append(grid);
      },
      code: {
        css: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.wide {
  grid-column: span 2;  /* 2列分に広がる */
}

.tall {
  grid-row: span 2;     /* 2行分に広がる */
}`,
        html: `<div class="grid">
  <div class="cell wide">2列分</div>
  <div class="cell">1x1</div>
  <div class="cell">1x1</div>
  <div class="cell">1x1</div>
  <div class="cell">1x1</div>
</div>`
      }
    },
    {
      title: "auto-fillで自動折り返し",
      desc: "レスポンシブなグリッド。画面幅に応じて列数が自動で変わる。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { width:100%; }
          .${p}-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(56px,1fr));gap:6px;width:100%; }
          .${p}-cell { background:#dcfce7;border:1px solid #86efac;border-radius:6px;padding:8px 4px;text-align:center;font-size:.6rem;font-weight:600;color:#166534; }
          .${p}-note { font-size:.55rem;color:#6b7280;margin-top:6px;text-align:center; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const grid = h("div", `${p}-grid`);
        for (let i = 1; i <= 8; i++) grid.append(h("div", `${p}-cell`, "Item " + i));
        wrap.append(grid);
        wrap.append(h("div", `${p}-note`, "auto-fill + minmax() で幅に応じて列数が変わる"));
        c.append(wrap);
      },
      code: {
        css: `.grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
}

/*
 * auto-fill: 空きスペースを列で埋める
 * minmax(120px, 1fr):
 *   最小120px、最大は均等分配
 * → 画面幅に応じて列数が自動変化！
 */

.cell {
  background: #dcfce7;
  border: 1px solid #86efac;
  border-radius: 6px;
  padding: 12px;
  text-align: center;
}`,
        html: `<div class="grid">
  <div class="cell">Item 1</div>
  <div class="cell">Item 2</div>
  <div class="cell">Item 3</div>
  <div class="cell">Item 4</div>
  <div class="cell">Item 5</div>
</div>`
      }
    }
  ];

  /* ==============================
     column — カラム
     ============================== */
  demos["column"] = [
    {
      title: "2カラム",
      desc: "左右に分割する基本的な2カラムレイアウト。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-row { display:flex;gap:8px;height:110px; }
          .${p}-col { flex:1;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:10px;font-size:.7rem;font-weight:600;color:#1e40af;display:flex;align-items:center;justify-content:center; }
        `);
        const row = h("div", `${p}-row`);
        row.append(h("div", `${p}-col`, "左カラム"));
        row.append(h("div", `${p}-col`, "右カラム"));
        c.append(row);
      },
      code: {
        css: `.row {
  display: flex;
  gap: 12px;
}

.col {
  flex: 1;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  padding: 16px;
}`,
        html: `<div class="row">
  <div class="col">左カラム</div>
  <div class="col">右カラム</div>
</div>`
      }
    },
    {
      title: "3カラム",
      desc: "均等3分割レイアウト。flex:1 で各カラムを同じ幅に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-row { display:flex;gap:6px;height:110px; }
          .${p}-col { flex:1;border-radius:6px;padding:8px;font-size:.65rem;font-weight:600;display:flex;align-items:center;justify-content:center; }
          .${p}-c1 { background:#dbeafe;color:#1e40af;border:1px solid #93c5fd; }
          .${p}-c2 { background:#fae8ff;color:#86198f;border:1px solid #e9d5ff; }
          .${p}-c3 { background:#dcfce7;color:#166534;border:1px solid #86efac; }
        `);
        const row = h("div", `${p}-row`);
        row.append(h("div", `${p}-col ${p}-c1`, "カラム 1"));
        row.append(h("div", `${p}-col ${p}-c2`, "カラム 2"));
        row.append(h("div", `${p}-col ${p}-c3`, "カラム 3"));
        c.append(row);
      },
      code: {
        css: `.row {
  display: flex;
  gap: 8px;
}

.col {
  flex: 1;  /* 均等に3分割 */
  padding: 12px;
  border-radius: 6px;
}

.col-1 { background: #dbeafe; }
.col-2 { background: #fae8ff; }
.col-3 { background: #dcfce7; }`,
        html: `<div class="row">
  <div class="col col-1">カラム 1</div>
  <div class="col col-2">カラム 2</div>
  <div class="col col-3">カラム 3</div>
</div>`
      }
    },
    {
      title: "カラム比率の調整",
      desc: "2:1 など非均等な比率のレイアウト。flex の値で比率を変える。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;flex-direction:column;gap:8px; }
          .${p}-row { display:flex;gap:6px;height:50px; }
          .${p}-col { border-radius:6px;padding:6px 10px;font-size:.6rem;font-weight:600;display:flex;align-items:center;justify-content:center; }
          .${p}-a { background:#dbeafe;color:#1e40af;border:1px solid #93c5fd; }
          .${p}-b { background:#fef3c7;color:#92400e;border:1px solid #fde68a; }
          .${p}-lbl { font-size:.55rem;color:#6b7280;text-align:center; }
        `);
        const w = h("div", `${p}-wrap`);
        // 2:1
        const r1 = h("div", `${p}-row`);
        const r1a = h("div", `${p}-col ${p}-a`, "flex: 2");
        r1a.style.flex = "2";
        const r1b = h("div", `${p}-col ${p}-b`, "flex: 1");
        r1b.style.flex = "1";
        r1.append(r1a, r1b);
        // 1:3
        const r2 = h("div", `${p}-row`);
        const r2a = h("div", `${p}-col ${p}-a`, "flex: 1");
        r2a.style.flex = "1";
        const r2b = h("div", `${p}-col ${p}-b`, "flex: 3");
        r2b.style.flex = "3";
        r2.append(r2a, r2b);
        w.append(r1, h("div", `${p}-lbl`, "flex: 2 | flex: 1 → 2:1の比率"), r2, h("div", `${p}-lbl`, "flex: 1 | flex: 3 → 1:3の比率"));
        c.append(w);
      },
      code: {
        css: `.row { display: flex; gap: 8px; }

/* 2:1の比率 */
.main   { flex: 2; }
.sidebar { flex: 1; }

/* 1:3の比率 */
.nav     { flex: 1; }
.content { flex: 3; }

/*
 * flex の数値が比率になる
 * flex:2 と flex:1 → 2:1
 */`,
        html: `<!-- 2:1 -->
<div class="row">
  <div class="main">メイン (flex:2)</div>
  <div class="sidebar">サイド (flex:1)</div>
</div>

<!-- 1:3 -->
<div class="row">
  <div class="nav">ナビ (flex:1)</div>
  <div class="content">コンテンツ (flex:3)</div>
</div>`
      }
    }
  ];

  /* ==============================
     responsive — レスポンシブ
     ============================== */
  demos["responsive"] = [
    {
      title: "メディアクエリ",
      desc: "画面幅で切り替え。ボタンで幅を変更してレイアウトの変化を確認。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-stage { border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;transition:width .4s ease;margin:0 auto; }
          .${p}-header { background:#1e293b;color:#fff;padding:6px 10px;font-size:.65rem;font-weight:600;display:flex;justify-content:space-between; }
          .${p}-body { display:flex;gap:6px;padding:8px;background:#f9fafb; }
          .${p}-side { width:60px;background:#e0e7ff;border-radius:4px;padding:6px;font-size:.55rem;color:#3730a3;font-weight:600;flex-shrink:0; }
          .${p}-main { flex:1;background:#fff;border-radius:4px;padding:6px;font-size:.55rem;color:#6b7280; }
          .${p}-stacked .${p}-body { flex-direction:column; }
          .${p}-stacked .${p}-side { width:auto; }
          .${p}-btns { display:flex;gap:6px;justify-content:center;margin-top:8px; }
          .${p}-btn { padding:4px 12px;font-size:.65rem;font-weight:600;border:1px solid #d1d5db;border-radius:4px;cursor:pointer;background:#fff; }
          .${p}-btn.active { background:#3b82f6;color:#fff;border-color:#3b82f6; }
          .${p}-width { font-size:.55rem;color:#9ca3af;text-align:center;margin-top:4px; }
        `);
        const stage = h("div", `${p}-stage`);
        stage.style.width = "100%";
        const header = h("div", `${p}-header`);
        header.append(h("span", "", "MySite"), h("span", "", "Menu"));
        const body = h("div", `${p}-body`);
        body.append(h("div", `${p}-side`, "サイドバー"));
        body.append(h("div", `${p}-main`, "メインコンテンツ"));
        stage.append(header, body);
        const btns = h("div", `${p}-btns`);
        const widthLabel = h("div", `${p}-width`, "PC表示");
        const sizes = [["PC", "100%", false], ["タブレット", "200px", false], ["スマホ", "140px", true]];
        sizes.forEach(([label, w, stack], i) => {
          const btn = makeBtn(label, `${p}-btn ${i === 0 ? "active" : ""}`);
          btn.addEventListener("click", () => {
            btns.querySelectorAll("button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            stage.style.width = w;
            stage.classList.toggle(`${p}-stacked`, stack);
            widthLabel.textContent = label + "表示";
          });
          btns.append(btn);
        });
        c.append(stage, btns, widthLabel);
      },
      code: {
        css: `.container {
  display: flex;
  gap: 8px;
}

.sidebar { width: 200px; }
.main { flex: 1; }

/* タブレット以下で縦積み */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .sidebar { width: 100%; }
}`,
        html: `<div class="container">
  <aside class="sidebar">サイドバー</aside>
  <main class="main">メインコンテンツ</main>
</div>`
      }
    },
    {
      title: "Flexbox wrap",
      desc: "自動折り返しでレスポンシブに。flex-wrapで収まらない要素を次の行へ。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;flex-wrap:wrap;gap:6px; }
          .${p}-item { flex:1 1 70px;min-width:60px;background:#fae8ff;border:1px solid #e9d5ff;border-radius:6px;padding:10px;text-align:center;font-size:.65rem;font-weight:600;color:#86198f; }
          .${p}-note { font-size:.55rem;color:#6b7280;margin-top:6px;text-align:center; }
        `);
        const wrap = h("div", `${p}-wrap`);
        for (let i = 1; i <= 6; i++) wrap.append(h("div", `${p}-item`, "Item " + i));
        c.append(wrap);
        c.append(h("div", `${p}-note`, "flex-wrap: wrap で収まらない要素は自動で次の行へ"));
      },
      code: {
        css: `.container {
  display: flex;
  flex-wrap: wrap;  /* 折り返しを許可 */
  gap: 8px;
}

.item {
  flex: 1 1 150px;
  /* flex-grow: 1   伸びる */
  /* flex-shrink: 1  縮む */
  /* flex-basis: 150px 基準幅 */
  min-width: 120px;
}`,
        html: `<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
  <div class="item">Item 5</div>
</div>`
      }
    },
    {
      title: "clamp()でフォントサイズ",
      desc: "画面サイズに追従するフォントサイズ。最小・推奨・最大を一度に指定。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center; }
          .${p}-title { font-size:clamp(0.7rem, 2.5vw, 1.2rem);font-weight:700;color:#1f2937;margin-bottom:4px; }
          .${p}-text { font-size:clamp(0.5rem, 1.5vw, 0.8rem);color:#6b7280;line-height:1.5;margin-bottom:8px; }
          .${p}-code { font-family:monospace;font-size:.6rem;background:#f1f5f9;padding:6px 10px;border-radius:4px;color:#8b5cf6;display:inline-block; }
          .${p}-note { font-size:.55rem;color:#9ca3af;margin-top:6px; }
        `);
        const w = h("div", `${p}-wrap`);
        w.append(h("div", `${p}-title`, "レスポンシブな見出し"));
        w.append(h("div", `${p}-text`, "このテキストは画面幅に応じてサイズが変化します。ブラウザの幅を変えてみてください。"));
        w.append(h("code", `${p}-code`, "font-size: clamp(14px, 2.5vw, 24px)"));
        w.append(h("div", `${p}-note`, "最小14px / 推奨2.5vw / 最大24px"));
        c.append(w);
      },
      code: {
        css: `h1 {
  /* clamp(最小, 推奨, 最大) */
  font-size: clamp(1rem, 2.5vw, 2rem);
}

p {
  font-size: clamp(0.8rem, 1.5vw, 1rem);
}

/*
 * clamp() は min() と max() の組み合わせ
 * 画面幅が小さい → 最小値
 * 画面幅が中間   → vw で可変
 * 画面幅が大きい → 最大値
 */`,
        html: `<h1>レスポンシブな見出し</h1>
<p>画面幅に応じてサイズが変化します</p>`
      }
    }
  ];

  window.multiDemos = Object.assign(window.multiDemos || {}, demos);
})();
