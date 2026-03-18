/* ==========================================================================
   Multi-Demo Extra — UIパーツの追加見本 (各用語に+2で計5個に)
   ========================================================================== */
(function () {
  let uid = 3000;
  function id() { return "pe" + (++uid); }

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
    b.className = cls || "pe-btn";
    b.textContent = text;
    return b;
  }

  const demos = window.multiDemos;
  if (!demos) return;

  /* ==============================
     icon — 追加2つ
     ============================== */
  demos["icon"].push(
    {
      title: "アイコン付きリスト",
      desc: "リスト項目の先頭に絵文字アイコンを配置。ファイル一覧やメニューに使われるパターン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-list { list-style:none;padding:0;margin:0;font-size:.9rem; }
          .${p}-item { display:flex;align-items:center;padding:8px 12px;border-bottom:1px solid #eee;cursor:pointer;transition:background .15s; }
          .${p}-item:hover { background:#f5f5ff; }
          .${p}-item:last-child { border-bottom:none; }
          .${p}-icon { font-size:1.2rem;margin-right:10px;flex-shrink:0; }
          .${p}-text { flex:1;color:#333; }
          .${p}-chev { color:#bbb;font-size:.8rem; }
        `);
        const ul = h("ul", `${p}-list`);
        const items = [
          { icon: "\u{1F4C1}", label: "ドキュメント" },
          { icon: "\u{1F5BC}\uFE0F", label: "画像" },
          { icon: "\u{1F3B5}", label: "音楽" }
        ];
        items.forEach(it => {
          const li = h("li", `${p}-item`);
          li.append(h("span", `${p}-icon`, it.icon), h("span", `${p}-text`, it.label), h("span", `${p}-chev`, "\u203A"));
          ul.append(li);
        });
        c.append(ul);
      },
      code: {
        css: `.icon-list { list-style: none; padding: 0; margin: 0; }
.icon-list-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.15s;
}
.icon-list-item:hover { background: #f5f5ff; }
.icon { font-size: 1.2rem; margin-right: 10px; }
.text { flex: 1; color: #333; }
.chevron { color: #bbb; }`,
        html: `<ul class="icon-list">
  <li class="icon-list-item">
    <span class="icon">\u{1F4C1}</span>
    <span class="text">ドキュメント</span>
    <span class="chevron">\u203A</span>
  </li>
  <li class="icon-list-item">
    <span class="icon">\u{1F5BC}\uFE0F</span>
    <span class="text">画像</span>
    <span class="chevron">\u203A</span>
  </li>
  <li class="icon-list-item">
    <span class="icon">\u{1F3B5}</span>
    <span class="text">音楽</span>
    <span class="chevron">\u203A</span>
  </li>
</ul>`
      }
    },
    {
      title: "アイコンサイズバリエーション",
      desc: "同じアイコンを異なるサイズで表示。UIの階層やコンテキストに応じたサイズ選択の参考に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;align-items:flex-end;gap:20px;justify-content:center;padding:10px 0; }
          .${p}-item { display:flex;flex-direction:column;align-items:center;gap:4px; }
          .${p}-label { font-size:.7rem;color:#888; }
        `);
        const wrap = h("div", `${p}-wrap`);
        [16, 24, 32, 48].forEach(size => {
          const item = h("div", `${p}-item`);
          const icon = h("span", null, "\u2B50");
          icon.style.fontSize = size + "px";
          icon.style.lineHeight = "1";
          item.append(icon, h("span", `${p}-label`, size + "px"));
          wrap.append(item);
        });
        c.append(wrap);
      },
      code: {
        css: `.size-row {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  justify-content: center;
}
.size-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.size-label { font-size: 0.7rem; color: #888; }`,
        html: `<div class="size-row">
  <div class="size-item">
    <span style="font-size:16px">\u2B50</span>
    <span class="size-label">16px</span>
  </div>
  <div class="size-item">
    <span style="font-size:24px">\u2B50</span>
    <span class="size-label">24px</span>
  </div>
  <div class="size-item">
    <span style="font-size:32px">\u2B50</span>
    <span class="size-label">32px</span>
  </div>
  <div class="size-item">
    <span style="font-size:48px">\u2B50</span>
    <span class="size-label">48px</span>
  </div>
</div>`
      }
    }
  );

  /* ==============================
     progress-bar — 追加2つ
     ============================== */
  demos["progress-bar"].push(
    {
      title: "経験値バー",
      desc: "RPGの経験値バー。レベル表示とグラデーション、輝きアニメーションで臨場感を演出。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { padding:8px 0; }
          .${p}-label { font-size:.85rem;font-weight:700;color:#444;margin-bottom:4px; }
          .${p}-track { height:20px;background:#2a2a3a;border-radius:10px;overflow:hidden;position:relative; }
          .${p}-fill { height:100%;width:65%;background:linear-gradient(90deg,#4e54c8,#8f94fb);border-radius:10px;position:relative;overflow:hidden; }
          .${p}-shine { position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);animation:${p}-shimmer 2s infinite; }
          @keyframes ${p}-shimmer { to{left:140%} }
          .${p}-info { font-size:.75rem;color:#888;margin-top:3px;text-align:right; }
        `);
        const wrap = h("div", `${p}-wrap`);
        wrap.append(h("div", `${p}-label`, "Lv.5"));
        const track = h("div", `${p}-track`);
        const fill = h("div", `${p}-fill`);
        fill.append(h("div", `${p}-shine`));
        track.append(fill);
        wrap.append(track, h("div", `${p}-info`, "1300 / 2000 EXP"));
        c.append(wrap);
      },
      code: {
        css: `.exp-track {
  height: 20px;
  background: #2a2a3a;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.exp-fill {
  height: 100%;
  width: 65%;
  background: linear-gradient(90deg, #4e54c8, #8f94fb);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}
.exp-shine {
  position: absolute;
  top: 0; left: -60%;
  width: 40%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
  animation: shimmer 2s infinite;
}
@keyframes shimmer { to { left: 140%; } }`,
        html: `<div class="exp-label">Lv.5</div>
<div class="exp-track">
  <div class="exp-fill">
    <div class="exp-shine"></div>
  </div>
</div>
<div class="exp-info">1300 / 2000 EXP</div>`
      }
    },
    {
      title: "円形プログレス",
      desc: "conic-gradientで実現する円形プログレスインジケーター。ダッシュボードやスキル表示に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;justify-content:center;padding:8px 0; }
          .${p}-ring { width:90px;height:90px;border-radius:50%;background:conic-gradient(#6c5ce7 0% 72%,#e0e0e0 72% 100%);display:flex;align-items:center;justify-content:center;position:relative; }
          .${p}-inner { width:70px;height:70px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column; }
          .${p}-pct { font-size:1.3rem;font-weight:700;color:#6c5ce7;line-height:1; }
          .${p}-sub { font-size:.6rem;color:#999; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const ring = h("div", `${p}-ring`);
        const inner = h("div", `${p}-inner`);
        inner.append(h("span", `${p}-pct`, "72%"), h("span", `${p}-sub`, "完了"));
        ring.append(inner);
        wrap.append(ring);
        c.append(wrap);
      },
      code: {
        css: `.circle-wrap { display: flex; justify-content: center; }
.circle-ring {
  width: 90px; height: 90px;
  border-radius: 50%;
  background: conic-gradient(#6c5ce7 0% 72%, #e0e0e0 72% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle-inner {
  width: 70px; height: 70px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.circle-pct { font-size: 1.3rem; font-weight: 700; color: #6c5ce7; }`,
        html: `<div class="circle-wrap">
  <div class="circle-ring">
    <div class="circle-inner">
      <span class="circle-pct">72%</span>
      <span class="circle-sub">完了</span>
    </div>
  </div>
</div>`
      }
    }
  );

  /* ==============================
     counter — 追加2つ
     ============================== */
  demos["counter"].push(
    {
      title: "コンボカウンター",
      desc: "格闘ゲーム風のコンボカウンター。ボタンを連打するとコンボ数が増え、スケールアニメーションで表示。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center;padding:8px 0; }
          .${p}-num { font-size:2rem;font-weight:900;color:#e74c3c;transition:transform .1s; }
          .${p}-num.${p}-pop { transform:scale(1.4); }
          .${p}-label { font-size:.8rem;color:#e74c3c;font-weight:700;opacity:0;transition:opacity .15s; }
          .${p}-label.${p}-show { opacity:1; }
          .${p}-btn { margin-top:8px;padding:6px 20px;border:none;border-radius:6px;background:#e74c3c;color:#fff;font-weight:700;cursor:pointer;font-size:.85rem; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const num = h("div", `${p}-num`, "0");
        const label = h("div", `${p}-label`, "COMBO!");
        const btn = makeBtn("攻撃！", `${p}-btn`);
        let count = 0;
        btn.addEventListener("click", () => {
          count++;
          num.textContent = count;
          label.textContent = count + " COMBO!";
          label.classList.add(`${p}-show`);
          num.classList.add(`${p}-pop`);
          setTimeout(() => num.classList.remove(`${p}-pop`), 100);
        });
        wrap.append(num, label, btn);
        c.append(wrap);
      },
      code: {
        css: `.combo-num {
  font-size: 2rem;
  font-weight: 900;
  color: #e74c3c;
  transition: transform 0.1s;
}
.combo-num.pop { transform: scale(1.4); }
.combo-label {
  font-size: 0.8rem;
  color: #e74c3c;
  font-weight: 700;
  opacity: 0;
  transition: opacity 0.15s;
}
.combo-label.show { opacity: 1; }`,
        html: `<div class="combo-num">0</div>
<div class="combo-label">COMBO!</div>
<button class="combo-btn">攻撃！</button>`,
        js: `let count = 0;
btn.addEventListener("click", () => {
  count++;
  num.textContent = count;
  label.textContent = count + " COMBO!";
  label.classList.add("show");
  num.classList.add("pop");
  setTimeout(() => num.classList.remove("pop"), 100);
});`
      }
    },
    {
      title: "ライフカウンター",
      desc: "ハートアイコンで残機を表現。ダメージボタンでハートが一つずつ消えていくアニメーション。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center;padding:8px 0; }
          .${p}-hearts { font-size:1.8rem;display:flex;gap:6px;justify-content:center;margin-bottom:8px; }
          .${p}-heart { transition:transform .3s,opacity .3s; }
          .${p}-heart.${p}-lost { transform:scale(0) rotate(45deg);opacity:0; }
          .${p}-btn { padding:6px 16px;border:none;border-radius:6px;background:#e74c3c;color:#fff;font-weight:700;cursor:pointer;font-size:.85rem; }
          .${p}-btn:disabled { background:#ccc;cursor:default; }
          .${p}-reset { margin-left:8px;padding:6px 16px;border:1px solid #ccc;border-radius:6px;background:#fff;color:#555;cursor:pointer;font-size:.85rem; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const hearts = h("div", `${p}-hearts`);
        const heartEls = [];
        for (let i = 0; i < 3; i++) {
          const ht = h("span", `${p}-heart`, "\u2764\uFE0F");
          heartEls.push(ht);
          hearts.append(ht);
        }
        const btnRow = h("div");
        const dmgBtn = makeBtn("ダメージ", `${p}-btn`);
        const resetBtn = makeBtn("リセット", `${p}-reset`);
        let lives = 3;
        dmgBtn.addEventListener("click", () => {
          if (lives > 0) {
            lives--;
            heartEls[lives].classList.add(`${p}-lost`);
            if (lives === 0) dmgBtn.disabled = true;
          }
        });
        resetBtn.addEventListener("click", () => {
          lives = 3;
          heartEls.forEach(el => el.classList.remove(`${p}-lost`));
          dmgBtn.disabled = false;
        });
        btnRow.append(dmgBtn, resetBtn);
        wrap.append(hearts, btnRow);
        c.append(wrap);
      },
      code: {
        css: `.hearts { font-size: 1.8rem; display: flex; gap: 6px; justify-content: center; }
.heart { transition: transform 0.3s, opacity 0.3s; }
.heart.lost { transform: scale(0) rotate(45deg); opacity: 0; }`,
        html: `<div class="hearts">
  <span class="heart">\u2764\uFE0F</span>
  <span class="heart">\u2764\uFE0F</span>
  <span class="heart">\u2764\uFE0F</span>
</div>
<button class="dmg-btn">ダメージ</button>
<button class="reset-btn">リセット</button>`,
        js: `let lives = 3;
dmgBtn.addEventListener("click", () => {
  if (lives > 0) {
    lives--;
    hearts[lives].classList.add("lost");
    if (lives === 0) dmgBtn.disabled = true;
  }
});
resetBtn.addEventListener("click", () => {
  lives = 3;
  hearts.forEach(h => h.classList.remove("lost"));
  dmgBtn.disabled = false;
});`
      }
    }
  );

  /* ==============================
     badge — 追加2つ
     ============================== */
  demos["badge"].push(
    {
      title: "アチーブメントバッジ",
      desc: "ゲームの実績バッジ。解除済みはゴールド、未解除はグレーのロック状態で表示。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:12px;justify-content:center;padding:10px 0; }
          .${p}-badge { display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px;border-radius:10px;min-width:80px; }
          .${p}-unlocked { background:linear-gradient(135deg,#fff7e0,#ffe0a0);border:2px solid #f0c040; }
          .${p}-locked { background:#f0f0f0;border:2px solid #ddd;filter:grayscale(1);opacity:.5; }
          .${p}-icon { font-size:1.5rem; }
          .${p}-name { font-size:.7rem;font-weight:700;color:#555; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const badges = [
          { icon: "\u{1F3C6}", name: "初クリア", unlocked: true },
          { icon: "\u2B50", name: "コンプリート", unlocked: true },
          { icon: "\u{1F525}", name: "連勝", unlocked: false }
        ];
        badges.forEach(b => {
          const badge = h("div", `${p}-badge ${b.unlocked ? p + "-unlocked" : p + "-locked"}`);
          badge.append(h("span", `${p}-icon`, b.unlocked ? b.icon : "\u{1F512}"), h("span", `${p}-name`, b.name));
          wrap.append(badge);
        });
        c.append(wrap);
      },
      code: {
        css: `.badge-row { display: flex; gap: 12px; justify-content: center; }
.achieve-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px;
  border-radius: 10px;
  min-width: 80px;
}
.unlocked {
  background: linear-gradient(135deg, #fff7e0, #ffe0a0);
  border: 2px solid #f0c040;
}
.locked {
  background: #f0f0f0;
  border: 2px solid #ddd;
  filter: grayscale(1);
  opacity: 0.5;
}`,
        html: `<div class="badge-row">
  <div class="achieve-badge unlocked">
    <span>\u{1F3C6}</span><span>初クリア</span>
  </div>
  <div class="achieve-badge unlocked">
    <span>\u2B50</span><span>コンプリート</span>
  </div>
  <div class="achieve-badge locked">
    <span>\u{1F512}</span><span>連勝</span>
  </div>
</div>`
      }
    },
    {
      title: "ドットバッジ",
      desc: "アバター横の小さなドットインジケーター。オンライン/オフライン/取り込み中の状態を表現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:24px;justify-content:center;align-items:center;padding:12px 0; }
          .${p}-avatar { position:relative;width:44px;height:44px; }
          .${p}-circle { width:44px;height:44px;border-radius:50%;background:#c4c4c4;display:flex;align-items:center;justify-content:center;font-size:1.2rem; }
          .${p}-dot { position:absolute;bottom:1px;right:1px;width:12px;height:12px;border-radius:50%;border:2px solid #fff; }
          .${p}-online { background:#2ecc71; }
          .${p}-offline { background:#bbb; }
          .${p}-busy { background:#e74c3c; }
          .${p}-label { font-size:.7rem;color:#777;text-align:center;margin-top:4px; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const statuses = [
          { emoji: "\u{1F464}", status: "online", label: "オンライン" },
          { emoji: "\u{1F464}", status: "busy", label: "取り込み中" },
          { emoji: "\u{1F464}", status: "offline", label: "オフライン" }
        ];
        statuses.forEach(s => {
          const col = h("div");
          col.style.textAlign = "center";
          const av = h("div", `${p}-avatar`);
          av.append(h("div", `${p}-circle`, s.emoji));
          const dot = h("div", `${p}-dot ${p}-${s.status}`);
          av.append(dot);
          col.append(av, h("div", `${p}-label`, s.label));
          wrap.append(col);
        });
        c.append(wrap);
      },
      code: {
        css: `.avatar { position: relative; width: 44px; height: 44px; }
.avatar-circle {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: #c4c4c4;
}
.dot-badge {
  position: absolute;
  bottom: 1px; right: 1px;
  width: 12px; height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
}
.online { background: #2ecc71; }
.offline { background: #bbb; }
.busy { background: #e74c3c; }`,
        html: `<div class="avatar">
  <div class="avatar-circle">\u{1F464}</div>
  <div class="dot-badge online"></div>
</div>
<div class="avatar">
  <div class="avatar-circle">\u{1F464}</div>
  <div class="dot-badge busy"></div>
</div>
<div class="avatar">
  <div class="avatar-circle">\u{1F464}</div>
  <div class="dot-badge offline"></div>
</div>`
      }
    }
  );

  /* ==============================
     modal — 追加2つ
     ============================== */
  demos["modal"].push(
    {
      title: "画像プレビューモーダル",
      desc: "サムネイルクリックで拡大プレビューが開くモーダル。画像の代わりにカラーブロックを使用。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-thumbs { display:flex;gap:8px;justify-content:center;padding:10px 0; }
          .${p}-thumb { width:60px;height:60px;border-radius:8px;cursor:pointer;transition:transform .15s; }
          .${p}-thumb:hover { transform:scale(1.1); }
          .${p}-overlay { position:absolute;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;z-index:10;flex-direction:column; }
          .${p}-overlay.${p}-open { display:flex; }
          .${p}-preview { width:140px;height:140px;border-radius:10px;margin-bottom:10px; }
          .${p}-close { background:none;border:2px solid #fff;color:#fff;border-radius:50%;width:32px;height:32px;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center; }
        `);
        c.style.position = "relative";
        const thumbs = h("div", `${p}-thumbs`);
        const colors = ["#e74c3c", "#3498db", "#2ecc71"];
        const overlay = h("div", `${p}-overlay`);
        const preview = h("div", `${p}-preview`);
        const closeBtn = h("button", `${p}-close`, "\u2715");
        closeBtn.type = "button";
        overlay.append(preview, closeBtn);
        colors.forEach(col => {
          const t = h("div", `${p}-thumb`);
          t.style.background = col;
          t.addEventListener("click", () => {
            preview.style.background = col;
            overlay.classList.add(`${p}-open`);
          });
          thumbs.append(t);
        });
        closeBtn.addEventListener("click", () => overlay.classList.remove(`${p}-open`));
        overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove(`${p}-open`); });
        c.append(thumbs, overlay);
      },
      code: {
        css: `.thumbs { display: flex; gap: 8px; justify-content: center; }
.thumb {
  width: 60px; height: 60px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.15s;
}
.thumb:hover { transform: scale(1.1); }
.modal-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.7);
  display: none;
  align-items: center;
  justify-content: center;
}
.modal-overlay.open { display: flex; }
.preview { width: 140px; height: 140px; border-radius: 10px; }
.close-btn {
  background: none; border: 2px solid #fff;
  color: #fff; border-radius: 50%;
  width: 32px; height: 32px; cursor: pointer;
}`,
        html: `<div class="thumbs">
  <div class="thumb" style="background:#e74c3c"></div>
  <div class="thumb" style="background:#3498db"></div>
  <div class="thumb" style="background:#2ecc71"></div>
</div>
<div class="modal-overlay">
  <div class="preview"></div>
  <button class="close-btn">\u2715</button>
</div>`,
        js: `thumb.addEventListener("click", () => {
  preview.style.background = thumb.style.background;
  overlay.classList.add("open");
});
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("open");
});`
      }
    },
    {
      title: "モーダルスタック",
      desc: "モーダルの上にさらにモーダルを重ねるスタック表示。z-indexの管理を示すパターン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center;padding:16px 0; }
          .${p}-trigger { padding:8px 18px;border:none;border-radius:6px;background:#6c5ce7;color:#fff;font-weight:700;cursor:pointer;font-size:.85rem; }
          .${p}-modal { position:absolute;inset:0;display:none;align-items:center;justify-content:center; }
          .${p}-modal.${p}-open { display:flex; }
          .${p}-bg1 { background:rgba(0,0,0,.4);z-index:10; }
          .${p}-bg2 { background:rgba(0,0,0,.3);z-index:20; }
          .${p}-box { background:#fff;border-radius:10px;padding:16px;text-align:center;min-width:160px;box-shadow:0 4px 20px rgba(0,0,0,.2); }
          .${p}-box h4 { margin:0 0 8px;font-size:.9rem; }
          .${p}-btn { padding:6px 14px;border:none;border-radius:5px;cursor:pointer;font-size:.8rem;font-weight:600; }
          .${p}-btn1 { background:#6c5ce7;color:#fff; }
          .${p}-btn2 { background:#e74c3c;color:#fff; }
          .${p}-btnc { background:#eee;color:#555;margin-left:6px; }
        `);
        c.style.position = "relative";
        const wrap = h("div", `${p}-wrap`);
        const trigger = makeBtn("モーダルを開く", `${p}-trigger`);
        const modal1 = h("div", `${p}-modal ${p}-bg1`);
        const box1 = h("div", `${p}-box`);
        const title1 = h("h4", null, "第1モーダル");
        const btn2 = makeBtn("次のモーダル", `${p}-btn ${p}-btn1`);
        const close1 = makeBtn("閉じる", `${p}-btn ${p}-btnc`);
        box1.append(title1, btn2, close1);
        modal1.append(box1);

        const modal2 = h("div", `${p}-modal ${p}-bg2`);
        const box2 = h("div", `${p}-box`);
        const title2 = h("h4", null, "第2モーダル");
        const close2 = makeBtn("閉じる", `${p}-btn ${p}-btn2`);
        box2.append(title2, h("p", null, "スタックされたモーダル"), close2);
        box2.querySelector("p").style.fontSize = ".8rem";
        box2.querySelector("p").style.margin = "0 0 8px";
        modal2.append(box2);

        trigger.addEventListener("click", () => modal1.classList.add(`${p}-open`));
        btn2.addEventListener("click", () => modal2.classList.add(`${p}-open`));
        close2.addEventListener("click", () => modal2.classList.remove(`${p}-open`));
        close1.addEventListener("click", () => { modal1.classList.remove(`${p}-open`); modal2.classList.remove(`${p}-open`); });

        wrap.append(trigger);
        c.append(wrap, modal1, modal2);
      },
      code: {
        css: `.modal-overlay {
  position: absolute; inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
}
.modal-overlay.open { display: flex; }
.layer1 { background: rgba(0,0,0,.4); z-index: 10; }
.layer2 { background: rgba(0,0,0,.3); z-index: 20; }
.modal-box {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,.2);
}`,
        html: `<button class="open-btn">モーダルを開く</button>
<div class="modal-overlay layer1">
  <div class="modal-box">
    <h4>第1モーダル</h4>
    <button class="next-btn">次のモーダル</button>
    <button class="close-btn">閉じる</button>
  </div>
</div>
<div class="modal-overlay layer2">
  <div class="modal-box">
    <h4>第2モーダル</h4>
    <button class="close-btn">閉じる</button>
  </div>
</div>`,
        js: `openBtn.addEventListener("click", () => modal1.classList.add("open"));
nextBtn.addEventListener("click", () => modal2.classList.add("open"));
closeBtn2.addEventListener("click", () => modal2.classList.remove("open"));
closeBtn1.addEventListener("click", () => {
  modal1.classList.remove("open");
  modal2.classList.remove("open");
});`
      }
    }
  );

  /* ==============================
     dialog — 追加2つ
     ============================== */
  demos["dialog"].push(
    {
      title: "成功ダイアログ",
      desc: "処理完了時に表示される成功ダイアログ。チェックマークと祝福メッセージで達成感を演出。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-box { background:#fff;border-radius:12px;padding:20px;text-align:center;max-width:220px;margin:0 auto;box-shadow:0 2px 12px rgba(0,0,0,.1);border:1px solid #e0e0e0; }
          .${p}-check { font-size:2.2rem;margin-bottom:4px; }
          .${p}-title { font-size:1rem;font-weight:700;color:#27ae60;margin-bottom:4px; }
          .${p}-msg { font-size:.8rem;color:#666;margin-bottom:12px; }
          .${p}-btn { padding:7px 28px;border:none;border-radius:6px;background:#27ae60;color:#fff;font-weight:700;cursor:pointer;font-size:.85rem; }
        `);
        const box = h("div", `${p}-box`);
        box.append(
          h("div", `${p}-check`, "\u2705"),
          h("div", `${p}-title`, "成功！"),
          h("div", `${p}-msg`, "クエストが完了しました。\n報酬を獲得しました！"),
          makeBtn("OK", `${p}-btn`)
        );
        c.append(box);
      },
      code: {
        css: `.success-dialog {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  max-width: 220px;
  margin: 0 auto;
  box-shadow: 0 2px 12px rgba(0,0,0,.1);
  border: 1px solid #e0e0e0;
}
.check-icon { font-size: 2.2rem; }
.title { font-size: 1rem; font-weight: 700; color: #27ae60; }
.ok-btn {
  padding: 7px 28px;
  border: none;
  border-radius: 6px;
  background: #27ae60;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}`,
        html: `<div class="success-dialog">
  <div class="check-icon">\u2705</div>
  <div class="title">成功！</div>
  <p>クエストが完了しました。報酬を獲得しました！</p>
  <button class="ok-btn">OK</button>
</div>`
      }
    },
    {
      title: "選択肢ダイアログ",
      desc: "RPG風の選択肢ダイアログ。プレイヤーに質問を投げかけ、複数の選択肢を縦に並べて表示。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-box { background:#1a1a2e;border-radius:10px;padding:16px;max-width:220px;margin:0 auto;border:2px solid #4a4a6a; }
          .${p}-q { color:#e0e0e0;font-size:.9rem;font-weight:700;margin-bottom:10px;text-align:center; }
          .${p}-opt { display:block;width:100%;padding:8px 12px;margin-bottom:6px;border:1px solid #4a4a6a;border-radius:6px;background:#2a2a4a;color:#ddd;cursor:pointer;font-size:.85rem;text-align:left;transition:background .15s,border-color .15s; }
          .${p}-opt:last-child { margin-bottom:0; }
          .${p}-opt:hover { background:#3a3a6a;border-color:#8a8aba; }
          .${p}-opt.${p}-sel { background:#4a3a8a;border-color:#9a7aff;color:#fff; }
        `);
        const box = h("div", `${p}-box`);
        box.append(h("div", `${p}-q`, "どの武器を選ぶ？"));
        const options = ["\u2694\uFE0F 剣", "\u{1F3F9} 弓", "\u{1FA84} 杖"];
        const btns = [];
        options.forEach(text => {
          const btn = h("button", `${p}-opt`, text);
          btn.type = "button";
          btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove(`${p}-sel`));
            btn.classList.add(`${p}-sel`);
          });
          btns.push(btn);
          box.append(btn);
        });
        c.append(box);
      },
      code: {
        css: `.choice-dialog {
  background: #1a1a2e;
  border-radius: 10px;
  padding: 16px;
  max-width: 220px;
  margin: 0 auto;
  border: 2px solid #4a4a6a;
}
.question {
  color: #e0e0e0;
  font-size: 0.9rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
}
.option {
  display: block;
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 6px;
  border: 1px solid #4a4a6a;
  border-radius: 6px;
  background: #2a2a4a;
  color: #ddd;
  cursor: pointer;
  transition: background 0.15s;
}
.option:hover { background: #3a3a6a; }
.option.selected { background: #4a3a8a; border-color: #9a7aff; }`,
        html: `<div class="choice-dialog">
  <div class="question">どの武器を選ぶ？</div>
  <button class="option">\u2694\uFE0F 剣</button>
  <button class="option">\u{1F3F9} 弓</button>
  <button class="option">\u{1FA84} 杖</button>
</div>`,
        js: `options.forEach(opt => {
  opt.addEventListener("click", () => {
    options.forEach(o => o.classList.remove("selected"));
    opt.classList.add("selected");
  });
});`
      }
    }
  );

  /* ==============================
     overlay — 追加2つ
     ============================== */
  demos["overlay"].push(
    {
      title: "グラデーションオーバーレイ",
      desc: "カードヒーロー画像の下部にグラデーションを重ね、テキストを読みやすくする定番手法。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-card { position:relative;width:100%;height:140px;border-radius:10px;overflow:hidden;background:linear-gradient(135deg,#667eea,#764ba2); }
          .${p}-grad { position:absolute;bottom:0;left:0;right:0;height:60%;background:linear-gradient(to top,rgba(0,0,0,.75),transparent); }
          .${p}-text { position:absolute;bottom:10px;left:14px;color:#fff; }
          .${p}-title { font-size:1rem;font-weight:700;margin-bottom:2px; }
          .${p}-sub { font-size:.75rem;opacity:.8; }
        `);
        const card = h("div", `${p}-card`);
        const grad = h("div", `${p}-grad`);
        const textWrap = h("div", `${p}-text`);
        textWrap.append(h("div", `${p}-title`, "冒険の始まり"), h("div", `${p}-sub`, "Chapter 1 — 旅立ちの朝"));
        card.append(grad, textWrap);
        c.append(card);
      },
      code: {
        css: `.hero-card {
  position: relative;
  width: 100%; height: 140px;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea, #764ba2);
}
.gradient-overlay {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0,0,0,.75), transparent);
}
.card-text {
  position: absolute;
  bottom: 10px; left: 14px;
  color: #fff;
}`,
        html: `<div class="hero-card">
  <div class="gradient-overlay"></div>
  <div class="card-text">
    <div class="title">冒険の始まり</div>
    <div class="subtitle">Chapter 1 — 旅立ちの朝</div>
  </div>
</div>`
      }
    },
    {
      title: "ブラーオーバーレイ",
      desc: "backdrop-filterでブラー効果をかけたオーバーレイ。背景がぼんやり透けて見えるモダンな演出。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { position:relative;height:140px;border-radius:10px;overflow:hidden; }
          .${p}-bg { padding:14px;font-size:.8rem;line-height:1.6;color:#333; }
          .${p}-bg span { display:inline-block;margin:2px 4px;padding:2px 8px;border-radius:4px;font-size:.75rem; }
          .${p}-s1 { background:#ffeaa7; } .${p}-s2 { background:#dfe6e9; } .${p}-s3 { background:#fab1a0; }
          .${p}-blur { position:absolute;inset:0;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);background:rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center; }
          .${p}-modal { background:#fff;border-radius:10px;padding:14px 20px;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,.15); }
          .${p}-mt { font-weight:700;font-size:.9rem;margin-bottom:4px; }
          .${p}-ms { font-size:.75rem;color:#666; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const bg = h("div", `${p}-bg`);
        bg.innerHTML = `ステータス画面 <span class="${p}-s1">HP 120</span> <span class="${p}-s2">MP 45</span> <span class="${p}-s3">ATK 38</span><br>装備: 鉄の剣 / 旅人の服<br>所持金: 1,200G`;
        const blur = h("div", `${p}-blur`);
        const modal = h("div", `${p}-modal`);
        modal.append(h("div", `${p}-mt`, "セーブしますか？"), h("div", `${p}-ms`, "現在の進行状況を保存します"));
        blur.append(modal);
        wrap.append(bg, blur);
        c.append(wrap);
      },
      code: {
        css: `.blur-overlay {
  position: absolute; inset: 0;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(255,255,255,.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay-modal {
  background: #fff;
  border-radius: 10px;
  padding: 14px 20px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0,0,0,.15);
}`,
        html: `<!-- 背景コンテンツ -->
<div class="bg-content">ステータス画面 ...</div>
<!-- ブラーオーバーレイ -->
<div class="blur-overlay">
  <div class="overlay-modal">
    <div class="title">セーブしますか？</div>
    <p>現在の進行状況を保存します</p>
  </div>
</div>`
      }
    }
  );

  /* ==============================
     splash-screen — 追加2つ
     ============================== */
  demos["splash-screen"].push(
    {
      title: "スプラッシュ → メイン遷移",
      desc: "スプラッシュ画面をクリックするとフェードアウトし、メインコンテンツが表示される遷移デモ。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { position:relative;height:140px;border-radius:10px;overflow:hidden; }
          .${p}-main { height:100%;background:#f8f9fa;display:flex;align-items:center;justify-content:center;flex-direction:column; }
          .${p}-main-title { font-size:1rem;font-weight:700;color:#333; }
          .${p}-main-sub { font-size:.75rem;color:#888;margin-top:4px; }
          .${p}-splash { position:absolute;inset:0;background:linear-gradient(135deg,#0c0c1d,#1a1a3e);display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:pointer;transition:opacity .6s,visibility .6s; }
          .${p}-splash.${p}-hide { opacity:0;visibility:hidden; }
          .${p}-logo { font-size:2rem;margin-bottom:6px; }
          .${p}-name { color:#fff;font-size:1rem;font-weight:700; }
          .${p}-hint { color:rgba(255,255,255,.5);font-size:.7rem;margin-top:10px; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const main = h("div", `${p}-main`);
        main.append(h("div", `${p}-main-title`, "メインコンテンツ"), h("div", `${p}-main-sub`, "ゲーム画面がここに表示されます"));
        const splash = h("div", `${p}-splash`);
        splash.append(h("div", `${p}-logo`, "\u{1F3AE}"), h("div", `${p}-name`, "QUEST RPG"), h("div", `${p}-hint`, "クリックしてスタート"));
        splash.addEventListener("click", () => splash.classList.add(`${p}-hide`));
        wrap.append(main, splash);
        c.append(wrap);
      },
      code: {
        css: `.splash {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #0c0c1d, #1a1a3e);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  transition: opacity 0.6s, visibility 0.6s;
}
.splash.hide { opacity: 0; visibility: hidden; }
.main-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}`,
        html: `<div class="main-content">
  <p>メインコンテンツ</p>
</div>
<div class="splash">
  <div class="logo">\u{1F3AE}</div>
  <div class="title">QUEST RPG</div>
  <div class="hint">クリックしてスタート</div>
</div>`,
        js: `splash.addEventListener("click", () => {
  splash.classList.add("hide");
});`
      }
    },
    {
      title: "プログレス付きスプラッシュ",
      desc: "ローディングバーが下部で進行するスプラッシュ画面。アセット読み込みの待機演出として定番。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-splash { height:140px;border-radius:10px;background:linear-gradient(135deg,#141e30,#243b55);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden; }
          .${p}-logo { font-size:2rem;margin-bottom:4px; }
          .${p}-title { color:#fff;font-size:1rem;font-weight:700;margin-bottom:4px; }
          .${p}-status { color:rgba(255,255,255,.6);font-size:.7rem;margin-bottom:12px; }
          .${p}-track { position:absolute;bottom:16px;left:20px;right:20px;height:6px;background:rgba(255,255,255,.15);border-radius:3px;overflow:hidden; }
          .${p}-fill { height:100%;width:0;background:linear-gradient(90deg,#00b894,#00cec9);border-radius:3px;animation:${p}-load 3s ease-in-out forwards; }
          @keyframes ${p}-load { 0%{width:0} 30%{width:35%} 60%{width:60%} 80%{width:85%} 100%{width:100%} }
        `);
        const splash = h("div", `${p}-splash`);
        splash.append(
          h("div", `${p}-logo`, "\u{1F680}"),
          h("div", `${p}-title`, "SPACE ADVENTURE"),
          h("div", `${p}-status`, "Loading assets...")
        );
        const track = h("div", `${p}-track`);
        track.append(h("div", `${p}-fill`));
        splash.append(track);
        c.append(splash);
      },
      code: {
        css: `.splash {
  height: 140px;
  background: linear-gradient(135deg, #141e30, #243b55);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.loading-track {
  position: absolute;
  bottom: 16px; left: 20px; right: 20px;
  height: 6px;
  background: rgba(255,255,255,.15);
  border-radius: 3px;
  overflow: hidden;
}
.loading-fill {
  height: 100%; width: 0;
  background: linear-gradient(90deg, #00b894, #00cec9);
  border-radius: 3px;
  animation: load 3s ease-in-out forwards;
}
@keyframes load {
  0% { width: 0; } 30% { width: 35%; }
  60% { width: 60%; } 80% { width: 85%; }
  100% { width: 100%; }
}`,
        html: `<div class="splash">
  <div class="logo">\u{1F680}</div>
  <div class="title">SPACE ADVENTURE</div>
  <div class="status">Loading assets...</div>
  <div class="loading-track">
    <div class="loading-fill"></div>
  </div>
</div>`
      }
    }
  );

  /* ==============================
     primary-button — 追加2つ
     ============================== */
  demos["primary-button"].push(
    {
      title: "アイコン付きプライマリ",
      desc: "ボタンの先頭にアイコンを配置したプライマリボタン。操作の意味が視覚的に伝わりやすい。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:10px;flex-wrap:wrap;justify-content:center;padding:12px 0; }
          .${p}-btn { display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border:none;border-radius:8px;background:#4361ee;color:#fff;font-weight:700;cursor:pointer;font-size:.85rem;transition:background .15s; }
          .${p}-btn:hover { background:#3a56d4; }
          .${p}-icon { font-size:1rem; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const buttons = [
          { icon: "\u25B6", label: "スタート" },
          { icon: "\u{1F4BE}", label: "保存" },
          { icon: "\u{1F4E4}", label: "送信" }
        ];
        buttons.forEach(b => {
          const btn = h("button", `${p}-btn`);
          btn.type = "button";
          btn.append(h("span", `${p}-icon`, b.icon), h("span", null, b.label));
          wrap.append(btn);
        });
        c.append(wrap);
      },
      code: {
        css: `.icon-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border: none;
  border-radius: 8px;
  background: #4361ee;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}
.icon-btn:hover { background: #3a56d4; }`,
        html: `<button class="icon-btn">
  <span>\u25B6</span> スタート
</button>
<button class="icon-btn">
  <span>\u{1F4BE}</span> 保存
</button>
<button class="icon-btn">
  <span>\u{1F4E4}</span> 送信
</button>`
      }
    },
    {
      title: "ローディング状態",
      desc: "クリックでスピナーが表示され「処理中...」に変わるプライマリボタン。二重送信防止のパターン。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { text-align:center;padding:12px 0; }
          .${p}-btn { display:inline-flex;align-items:center;gap:8px;padding:10px 24px;border:none;border-radius:8px;background:#4361ee;color:#fff;font-weight:700;cursor:pointer;font-size:.9rem;transition:background .15s;min-width:140px;justify-content:center; }
          .${p}-btn:hover { background:#3a56d4; }
          .${p}-btn:disabled { background:#a0a0c0;cursor:default; }
          .${p}-spinner { display:none;width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:${p}-spin .6s linear infinite; }
          .${p}-btn.${p}-loading .${p}-spinner { display:block; }
          @keyframes ${p}-spin { to{transform:rotate(360deg)} }
        `);
        const wrap = h("div", `${p}-wrap`);
        const btn = h("button", `${p}-btn`);
        btn.type = "button";
        const spinner = h("span", `${p}-spinner`);
        const label = h("span", null, "送信する");
        btn.append(spinner, label);
        btn.addEventListener("click", () => {
          btn.classList.add(`${p}-loading`);
          btn.disabled = true;
          label.textContent = "処理中...";
          setTimeout(() => {
            btn.classList.remove(`${p}-loading`);
            btn.disabled = false;
            label.textContent = "送信する";
          }, 2000);
        });
        wrap.append(btn);
        c.append(wrap);
      },
      code: {
        css: `.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: #4361ee;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
.submit-btn:disabled { background: #a0a0c0; }
.spinner {
  display: none;
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
.submit-btn.loading .spinner { display: block; }
@keyframes spin { to { transform: rotate(360deg); } }`,
        html: `<button class="submit-btn">
  <span class="spinner"></span>
  <span class="label">送信する</span>
</button>`,
        js: `btn.addEventListener("click", () => {
  btn.classList.add("loading");
  btn.disabled = true;
  label.textContent = "処理中...";
  setTimeout(() => {
    btn.classList.remove("loading");
    btn.disabled = false;
    label.textContent = "送信する";
  }, 2000);
});`
      }
    }
  );

  /* ==============================
     secondary-button — 追加2つ
     ============================== */
  demos["secondary-button"].push(
    {
      title: "アウトラインセカンダリ",
      desc: "背景なしのアウトライン（ゴースト）ボタン。プライマリと並べた時に主張を抑えた補助的な操作に。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:10px;flex-wrap:wrap;justify-content:center;padding:12px 0; }
          .${p}-btn { padding:8px 18px;border:2px solid;border-radius:8px;background:none;cursor:pointer;font-weight:600;font-size:.85rem;transition:background .15s,color .15s; }
          .${p}-blue { border-color:#4361ee;color:#4361ee; }
          .${p}-blue:hover { background:#4361ee;color:#fff; }
          .${p}-gray { border-color:#888;color:#888; }
          .${p}-gray:hover { background:#888;color:#fff; }
          .${p}-red { border-color:#e74c3c;color:#e74c3c; }
          .${p}-red:hover { background:#e74c3c;color:#fff; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const variants = [
          { label: "編集", cls: "blue" },
          { label: "キャンセル", cls: "gray" },
          { label: "削除", cls: "red" }
        ];
        variants.forEach(v => {
          const btn = h("button", `${p}-btn ${p}-${v.cls}`, v.label);
          btn.type = "button";
          wrap.append(btn);
        });
        c.append(wrap);
      },
      code: {
        css: `.outline-btn {
  padding: 8px 18px;
  border: 2px solid;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.15s, color 0.15s;
}
.outline-blue { border-color: #4361ee; color: #4361ee; }
.outline-blue:hover { background: #4361ee; color: #fff; }
.outline-gray { border-color: #888; color: #888; }
.outline-gray:hover { background: #888; color: #fff; }
.outline-red { border-color: #e74c3c; color: #e74c3c; }
.outline-red:hover { background: #e74c3c; color: #fff; }`,
        html: `<button class="outline-btn outline-blue">編集</button>
<button class="outline-btn outline-gray">キャンセル</button>
<button class="outline-btn outline-red">削除</button>`
      }
    },
    {
      title: "テキストセカンダリ",
      desc: "ボーダーも背景もないテキストだけのボタン。ホバーで下線が表示される最もミニマルなスタイル。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:16px;justify-content:center;align-items:center;padding:16px 0; }
          .${p}-btn { padding:4px 2px;border:none;background:none;color:#4361ee;cursor:pointer;font-size:.85rem;font-weight:600;position:relative; }
          .${p}-btn::after { content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:#4361ee;transition:width .2s; }
          .${p}-btn:hover::after { width:100%; }
          .${p}-muted { color:#888; }
          .${p}-muted::after { background:#888; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const items = [
          { label: "詳細を見る", muted: false },
          { label: "スキップ", muted: true },
          { label: "ヘルプ", muted: true }
        ];
        items.forEach(it => {
          const btn = h("button", `${p}-btn` + (it.muted ? ` ${p}-muted` : ""), it.label);
          btn.type = "button";
          wrap.append(btn);
        });
        c.append(wrap);
      },
      code: {
        css: `.text-btn {
  padding: 4px 2px;
  border: none;
  background: none;
  color: #4361ee;
  cursor: pointer;
  font-weight: 600;
  position: relative;
}
.text-btn::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 2px;
  background: #4361ee;
  transition: width 0.2s;
}
.text-btn:hover::after { width: 100%; }
.text-btn.muted { color: #888; }
.text-btn.muted::after { background: #888; }`,
        html: `<button class="text-btn">詳細を見る</button>
<button class="text-btn muted">スキップ</button>
<button class="text-btn muted">ヘルプ</button>`
      }
    }
  );

  /* ==============================
     toggle-button — 追加2つ
     ============================== */
  demos["toggle-button"].push(
    {
      title: "アイコントグル",
      desc: "2つのアイコン間を切り替えるトグル。音声ON/OFFやテーマ切り替えなどに使用。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { display:flex;gap:20px;justify-content:center;padding:12px 0; }
          .${p}-toggle { width:52px;height:52px;border-radius:50%;border:2px solid #ddd;background:#fff;cursor:pointer;font-size:1.5rem;display:flex;align-items:center;justify-content:center;transition:background .2s,border-color .2s; }
          .${p}-toggle.${p}-active { background:#e8f5e9;border-color:#66bb6a; }
          .${p}-label { font-size:.7rem;color:#888;text-align:center;margin-top:4px; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const toggles = [
          { on: "\u{1F50A}", off: "\u{1F507}", label: "サウンド" },
          { on: "\u2600\uFE0F", off: "\u{1F319}", label: "テーマ" }
        ];
        toggles.forEach(t => {
          const col = h("div");
          col.style.textAlign = "center";
          const btn = h("button", `${p}-toggle ${p}-active`);
          btn.type = "button";
          btn.textContent = t.on;
          let isOn = true;
          btn.addEventListener("click", () => {
            isOn = !isOn;
            btn.textContent = isOn ? t.on : t.off;
            btn.classList.toggle(`${p}-active`, isOn);
          });
          col.append(btn, h("div", `${p}-label`, t.label));
          wrap.append(col);
        });
        c.append(wrap);
      },
      code: {
        css: `.icon-toggle {
  width: 52px; height: 52px;
  border-radius: 50%;
  border: 2px solid #ddd;
  background: #fff;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background 0.2s, border-color 0.2s;
}
.icon-toggle.active {
  background: #e8f5e9;
  border-color: #66bb6a;
}`,
        html: `<button class="icon-toggle active">\u{1F50A}</button>
<button class="icon-toggle active">\u2600\uFE0F</button>`,
        js: `let isOn = true;
toggle.addEventListener("click", () => {
  isOn = !isOn;
  toggle.textContent = isOn ? "\u{1F50A}" : "\u{1F507}";
  toggle.classList.toggle("active", isOn);
});`
      }
    },
    {
      title: "セグメントコントロール",
      desc: "iOS風セグメントコントロール。複数の選択肢からひとつを選ぶUI。スライドするアクティブ表示。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-seg { display:inline-flex;background:#eee;border-radius:8px;padding:3px;position:relative;margin:12px auto;display:flex;max-width:240px; }
          .${p}-opt { flex:1;padding:7px 0;text-align:center;font-size:.8rem;font-weight:600;color:#666;cursor:pointer;border:none;background:none;position:relative;z-index:1;transition:color .2s; }
          .${p}-opt.${p}-active { color:#333; }
          .${p}-slider { position:absolute;top:3px;left:3px;height:calc(100% - 6px);width:calc(33.333% - 2px);background:#fff;border-radius:6px;box-shadow:0 1px 4px rgba(0,0,0,.12);transition:transform .25s ease; }
        `);
        const wrap = h("div");
        wrap.style.textAlign = "center";
        const seg = h("div", `${p}-seg`);
        const slider = h("div", `${p}-slider`);
        seg.append(slider);
        const labels = ["日", "週", "月"];
        const btns = [];
        labels.forEach((label, i) => {
          const btn = h("button", `${p}-opt` + (i === 0 ? ` ${p}-active` : ""), label);
          btn.type = "button";
          btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove(`${p}-active`));
            btn.classList.add(`${p}-active`);
            slider.style.transform = `translateX(${i * 100}%)`;
          });
          btns.push(btn);
          seg.append(btn);
        });
        wrap.append(seg);
        c.append(wrap);
      },
      code: {
        css: `.segment {
  display: inline-flex;
  background: #eee;
  border-radius: 8px;
  padding: 3px;
  position: relative;
}
.seg-option {
  flex: 1;
  padding: 7px 16px;
  text-align: center;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  border: none;
  background: none;
  z-index: 1;
  transition: color 0.2s;
}
.seg-option.active { color: #333; }
.seg-slider {
  position: absolute;
  top: 3px; left: 3px;
  height: calc(100% - 6px);
  width: calc(33.333% - 2px);
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,.12);
  transition: transform 0.25s ease;
}`,
        html: `<div class="segment">
  <div class="seg-slider"></div>
  <button class="seg-option active">日</button>
  <button class="seg-option">週</button>
  <button class="seg-option">月</button>
</div>`,
        js: `options.forEach((opt, i) => {
  opt.addEventListener("click", () => {
    options.forEach(o => o.classList.remove("active"));
    opt.classList.add("active");
    slider.style.transform = \`translateX(\${i * 100}%)\`;
  });
});`
      }
    }
  );

  /* ==============================
     textbox — 追加2つ
     ============================== */
  demos["textbox"].push(
    {
      title: "パスワード入力",
      desc: "パスワード入力欄に表示/非表示トグルボタンを配置。目のアイコンで切り替え可能。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { max-width:260px;margin:12px auto;position:relative; }
          .${p}-input { width:100%;padding:10px 40px 10px 12px;border:2px solid #ddd;border-radius:8px;font-size:.9rem;outline:none;transition:border-color .2s;box-sizing:border-box; }
          .${p}-input:focus { border-color:#4361ee; }
          .${p}-eye { position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:1.1rem;padding:2px; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const input = document.createElement("input");
        input.type = "password";
        input.className = `${p}-input`;
        input.placeholder = "パスワードを入力";
        input.value = "secret123";
        const eye = h("button", `${p}-eye`, "\u{1F441}\uFE0F");
        eye.type = "button";
        eye.addEventListener("click", () => {
          const isPassword = input.type === "password";
          input.type = isPassword ? "text" : "password";
          eye.textContent = isPassword ? "\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F" : "\u{1F441}\uFE0F";
        });
        wrap.append(input, eye);
        c.append(wrap);
      },
      code: {
        css: `.password-wrap { position: relative; max-width: 260px; }
.password-input {
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.password-input:focus { border-color: #4361ee; }
.eye-toggle {
  position: absolute;
  right: 10px; top: 50%;
  transform: translateY(-50%);
  background: none; border: none;
  cursor: pointer; font-size: 1.1rem;
}`,
        html: `<div class="password-wrap">
  <input type="password" class="password-input"
         placeholder="パスワードを入力">
  <button class="eye-toggle">\u{1F441}\uFE0F</button>
</div>`,
        js: `eyeBtn.addEventListener("click", () => {
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
});`
      }
    },
    {
      title: "複数行テキストエリア",
      desc: "文字数カウント付きテキストエリア。制限に近づくとカウンターが赤くなる視覚フィードバック。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { max-width:280px;margin:8px auto; }
          .${p}-area { width:100%;height:70px;padding:10px;border:2px solid #ddd;border-radius:8px;font-size:.85rem;outline:none;resize:none;font-family:inherit;transition:border-color .2s;box-sizing:border-box; }
          .${p}-area:focus { border-color:#4361ee; }
          .${p}-count { text-align:right;font-size:.75rem;color:#888;margin-top:4px;transition:color .2s; }
          .${p}-count.${p}-warn { color:#e74c3c;font-weight:700; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const area = document.createElement("textarea");
        area.className = `${p}-area`;
        area.placeholder = "メッセージを入力してください...";
        area.maxLength = 140;
        const count = h("div", `${p}-count`, "0 / 140");
        area.addEventListener("input", () => {
          const len = area.value.length;
          count.textContent = len + " / 140";
          count.classList.toggle(`${p}-warn`, len >= 120);
        });
        wrap.append(area, count);
        c.append(wrap);
      },
      code: {
        css: `.textarea {
  width: 100%;
  height: 70px;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 0.85rem;
  outline: none;
  resize: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.textarea:focus { border-color: #4361ee; }
.char-count {
  text-align: right;
  font-size: 0.75rem;
  color: #888;
  transition: color 0.2s;
}
.char-count.warn { color: #e74c3c; font-weight: 700; }`,
        html: `<textarea class="textarea" maxlength="140"
  placeholder="メッセージを入力してください..."></textarea>
<div class="char-count">0 / 140</div>`,
        js: `textarea.addEventListener("input", () => {
  const len = textarea.value.length;
  counter.textContent = len + " / 140";
  counter.classList.toggle("warn", len >= 120);
});`
      }
    }
  );

  /* ==============================
     placeholder — 追加2つ
     ============================== */
  demos["placeholder"].push(
    {
      title: "プレースホルダーアニメーション",
      desc: "フォーカス時にプレースホルダーテキストがフェードアウトする滑らかな演出。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { max-width:260px;margin:16px auto;position:relative; }
          .${p}-input { width:100%;padding:10px 12px;border:2px solid #ddd;border-radius:8px;font-size:.9rem;outline:none;transition:border-color .2s;box-sizing:border-box; }
          .${p}-input:focus { border-color:#4361ee; }
          .${p}-ph { position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#aaa;font-size:.9rem;pointer-events:none;transition:opacity .3s,transform .3s; }
          .${p}-input:focus ~ .${p}-ph, .${p}-input:not(:placeholder-shown) ~ .${p}-ph { opacity:0;transform:translateY(-50%) translateX(10px); }
        `);
        const wrap = h("div", `${p}-wrap`);
        const input = document.createElement("input");
        input.type = "text";
        input.className = `${p}-input`;
        input.placeholder = " ";
        const ph = h("span", `${p}-ph`, "ユーザー名を入力...");
        wrap.append(input, ph);
        c.append(wrap);
      },
      code: {
        css: `.input-wrap { position: relative; }
.text-input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.text-input:focus { border-color: #4361ee; }
.fade-placeholder {
  position: absolute;
  left: 14px; top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  pointer-events: none;
  transition: opacity 0.3s, transform 0.3s;
}
.text-input:focus ~ .fade-placeholder,
.text-input:not(:placeholder-shown) ~ .fade-placeholder {
  opacity: 0;
  transform: translateY(-50%) translateX(10px);
}`,
        html: `<div class="input-wrap">
  <input type="text" class="text-input" placeholder=" ">
  <span class="fade-placeholder">ユーザー名を入力...</span>
</div>`
      }
    },
    {
      title: "検索サジェスト風",
      desc: "プレースホルダーテキストがローテーションで切り替わる検索ボックス。CSSアニメーションで実現。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { max-width:280px;margin:12px auto;position:relative; }
          .${p}-input { width:100%;padding:10px 12px 10px 36px;border:2px solid #ddd;border-radius:8px;font-size:.9rem;outline:none;transition:border-color .2s;box-sizing:border-box; }
          .${p}-input:focus { border-color:#4361ee; }
          .${p}-icon { position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#aaa;font-size:.9rem; }
          .${p}-texts { position:absolute;left:36px;top:50%;transform:translateY(-50%);pointer-events:none;overflow:hidden;height:1.2em; }
          .${p}-roll { animation:${p}-rotate 6s infinite; }
          .${p}-roll span { display:block;height:1.2em;line-height:1.2em;color:#aaa;font-size:.9rem; }
          .${p}-input:focus ~ .${p}-texts { opacity:0; }
          .${p}-input:not(:placeholder-shown) ~ .${p}-texts { opacity:0; }
          @keyframes ${p}-rotate { 0%,25%{transform:translateY(0)} 33%,58%{transform:translateY(-1.2em)} 66%,91%{transform:translateY(-2.4em)} 100%{transform:translateY(-3.6em)} }
        `);
        const wrap = h("div", `${p}-wrap`);
        const input = document.createElement("input");
        input.type = "text";
        input.className = `${p}-input`;
        input.placeholder = " ";
        const icon = h("span", `${p}-icon`, "\u{1F50D}");
        const texts = h("div", `${p}-texts`);
        const roll = h("div", `${p}-roll`);
        ["ゲーム名で検索...", "ジャンルで検索...", "タグで検索...", "ゲーム名で検索..."].forEach(t => {
          roll.append(h("span", null, t));
        });
        texts.append(roll);
        wrap.append(input, icon, texts);
        c.append(wrap);
      },
      code: {
        css: `.search-wrap { position: relative; }
.search-input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
}
.search-icon {
  position: absolute;
  left: 12px; top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}
.rotate-text {
  position: absolute;
  left: 36px; top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  overflow: hidden;
  height: 1.2em;
}
.rotate-text .roll {
  animation: rotate-placeholder 6s infinite;
}
.rotate-text span {
  display: block;
  height: 1.2em;
  color: #aaa;
}
@keyframes rotate-placeholder {
  0%, 25% { transform: translateY(0); }
  33%, 58% { transform: translateY(-1.2em); }
  66%, 91% { transform: translateY(-2.4em); }
  100% { transform: translateY(-3.6em); }
}`,
        html: `<div class="search-wrap">
  <input type="text" class="search-input" placeholder=" ">
  <span class="search-icon">\u{1F50D}</span>
  <div class="rotate-text">
    <div class="roll">
      <span>ゲーム名で検索...</span>
      <span>ジャンルで検索...</span>
      <span>タグで検索...</span>
      <span>ゲーム名で検索...</span>
    </div>
  </div>
</div>`
      }
    }
  );

  /* ==============================
     dropdown-select — 追加2つ
     ============================== */
  demos["dropdown-select"].push(
    {
      title: "アイコン付きドロップダウン",
      desc: "各選択肢にアイコンを含むカスタムドロップダウン。キャラクター選択のようなUIに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { max-width:220px;margin:12px auto;position:relative; }
          .${p}-selected { padding:10px 12px;border:2px solid #ddd;border-radius:8px;cursor:pointer;font-size:.9rem;display:flex;align-items:center;justify-content:space-between;background:#fff;transition:border-color .2s; }
          .${p}-selected:hover { border-color:#4361ee; }
          .${p}-arrow { font-size:.7rem;color:#888;transition:transform .2s; }
          .${p}-menu { position:absolute;top:100%;left:0;right:0;background:#fff;border:2px solid #ddd;border-radius:8px;margin-top:4px;display:none;z-index:5;overflow:hidden; }
          .${p}-menu.${p}-open { display:block; }
          .${p}-option { padding:9px 12px;cursor:pointer;font-size:.85rem;transition:background .1s;display:flex;align-items:center;gap:8px; }
          .${p}-option:hover { background:#f0f0ff; }
          .${p}-option.${p}-active { background:#e8e8ff;font-weight:700; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const selected = h("div", `${p}-selected`);
        const selText = h("span", null, "\u{1F5E1}\uFE0F 戦士");
        const arrow = h("span", `${p}-arrow`, "\u25BC");
        selected.append(selText, arrow);
        const menu = h("div", `${p}-menu`);
        const options = [
          { icon: "\u{1F5E1}\uFE0F", label: "戦士" },
          { icon: "\u{1F9D9}", label: "魔法使い" },
          { icon: "\u{1F3F9}", label: "弓使い" }
        ];
        options.forEach((opt, i) => {
          const item = h("div", `${p}-option` + (i === 0 ? ` ${p}-active` : ""));
          item.append(h("span", null, opt.icon), h("span", null, opt.label));
          item.addEventListener("click", () => {
            selText.textContent = opt.icon + " " + opt.label;
            menu.querySelectorAll("." + `${p}-option`).forEach(o => o.classList.remove(`${p}-active`));
            item.classList.add(`${p}-active`);
            menu.classList.remove(`${p}-open`);
          });
          menu.append(item);
        });
        selected.addEventListener("click", () => menu.classList.toggle(`${p}-open`));
        wrap.append(selected, menu);
        c.append(wrap);
      },
      code: {
        css: `.custom-select { position: relative; max-width: 220px; }
.selected-value {
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.dropdown-menu {
  position: absolute;
  top: 100%; left: 0; right: 0;
  background: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-top: 4px;
  display: none;
  z-index: 5;
}
.dropdown-menu.open { display: block; }
.dropdown-option {
  padding: 9px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}
.dropdown-option:hover { background: #f0f0ff; }`,
        html: `<div class="custom-select">
  <div class="selected-value">
    <span>\u{1F5E1}\uFE0F 戦士</span>
    <span>\u25BC</span>
  </div>
  <div class="dropdown-menu">
    <div class="dropdown-option">\u{1F5E1}\uFE0F 戦士</div>
    <div class="dropdown-option">\u{1F9D9} 魔法使い</div>
    <div class="dropdown-option">\u{1F3F9} 弓使い</div>
  </div>
</div>`,
        js: `selected.addEventListener("click", () => {
  menu.classList.toggle("open");
});
option.addEventListener("click", () => {
  selectedText.textContent = option.textContent;
  menu.classList.remove("open");
});`
      }
    },
    {
      title: "多段ドロップダウン",
      desc: "カスケードセレクト。最初のドロップダウンの選択に応じて、次のドロップダウンの選択肢が変化。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { max-width:280px;margin:8px auto; }
          .${p}-row { display:flex;gap:8px;align-items:center;margin-bottom:6px; }
          .${p}-label { font-size:.75rem;color:#888;min-width:50px; }
          .${p}-sel { flex:1;padding:8px 10px;border:2px solid #ddd;border-radius:6px;font-size:.85rem;outline:none;cursor:pointer;background:#fff;transition:border-color .2s; }
          .${p}-sel:focus { border-color:#4361ee; }
        `);
        const data = {
          "武器": ["\u{1F5E1}\uFE0F 鉄の剣", "\u{1F5E1}\uFE0F 炎の剣", "\u{1F5E1}\uFE0F 聖剣"],
          "防具": ["\u{1F6E1}\uFE0F 木の盾", "\u{1F6E1}\uFE0F 鉄の盾", "\u{1F6E1}\uFE0F 魔法の盾"],
          "道具": ["\u{1FA78} 回復薬", "\u{1FA78} 万能薬", "\u{1FA78} エリクサー"]
        };
        const wrap = h("div", `${p}-wrap`);
        const row1 = h("div", `${p}-row`);
        const label1 = h("span", `${p}-label`, "カテゴリ");
        const sel1 = document.createElement("select");
        sel1.className = `${p}-sel`;
        Object.keys(data).forEach(cat => {
          const opt = document.createElement("option");
          opt.value = cat;
          opt.textContent = cat;
          sel1.append(opt);
        });
        row1.append(label1, sel1);

        const row2 = h("div", `${p}-row`);
        const label2 = h("span", `${p}-label`, "アイテム");
        const sel2 = document.createElement("select");
        sel2.className = `${p}-sel`;

        function updateItems() {
          sel2.innerHTML = "";
          data[sel1.value].forEach(item => {
            const opt = document.createElement("option");
            opt.textContent = item;
            sel2.append(opt);
          });
        }
        updateItems();
        sel1.addEventListener("change", updateItems);

        row2.append(label2, sel2);
        wrap.append(row1, row2);
        c.append(wrap);
      },
      code: {
        css: `.cascade-row { display: flex; gap: 8px; align-items: center; }
.cascade-label { font-size: 0.75rem; color: #888; min-width: 50px; }
.cascade-select {
  flex: 1;
  padding: 8px 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 0.85rem;
  outline: none;
  background: #fff;
}
.cascade-select:focus { border-color: #4361ee; }`,
        html: `<div class="cascade-row">
  <span class="cascade-label">カテゴリ</span>
  <select class="cascade-select" id="category">
    <option>武器</option>
    <option>防具</option>
    <option>道具</option>
  </select>
</div>
<div class="cascade-row">
  <span class="cascade-label">アイテム</span>
  <select class="cascade-select" id="item"></select>
</div>`,
        js: `const data = {
  "武器": ["\u{1F5E1}\uFE0F 鉄の剣", "\u{1F5E1}\uFE0F 炎の剣", "\u{1F5E1}\uFE0F 聖剣"],
  "防具": ["\u{1F6E1}\uFE0F 木の盾", "\u{1F6E1}\uFE0F 鉄の盾"],
  "道具": ["\u{1FA78} 回復薬", "\u{1FA78} エリクサー"]
};
category.addEventListener("change", () => {
  item.innerHTML = "";
  data[category.value].forEach(name => {
    item.append(new Option(name));
  });
});`
      }
    }
  );

  /* ==============================
     slider — 追加2つ
     ============================== */
  demos["slider"].push(
    {
      title: "ステップスライダー",
      desc: "離散値にスナップするスライダー。難易度選択のように段階的な値を選ぶUIに。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { max-width:260px;margin:12px auto;padding:0 8px; }
          .${p}-input { width:100%;-webkit-appearance:none;appearance:none;height:6px;background:#ddd;border-radius:3px;outline:none;cursor:pointer; }
          .${p}-input::-webkit-slider-thumb { -webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:#4361ee;cursor:pointer;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.2); }
          .${p}-input::-moz-range-thumb { width:22px;height:22px;border-radius:50%;background:#4361ee;cursor:pointer;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.2); }
          .${p}-labels { display:flex;justify-content:space-between;margin-top:6px; }
          .${p}-step { font-size:.7rem;color:#888;text-align:center;width:40px; }
          .${p}-step.${p}-active { color:#4361ee;font-weight:700; }
          .${p}-val { text-align:center;margin-bottom:6px;font-size:.85rem;font-weight:700;color:#4361ee; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const val = h("div", `${p}-val`, "\u2B50\u2B50\u2B50");
        const input = document.createElement("input");
        input.type = "range";
        input.min = "1";
        input.max = "5";
        input.step = "1";
        input.value = "3";
        input.className = `${p}-input`;
        const labels = h("div", `${p}-labels`);
        const stepLabels = ["Very Easy", "Easy", "Normal", "Hard", "Extreme"];
        const stepEls = [];
        stepLabels.forEach((sl, i) => {
          const step = h("div", `${p}-step` + (i === 2 ? ` ${p}-active` : ""), sl);
          stepEls.push(step);
          labels.append(step);
        });
        input.addEventListener("input", () => {
          const v = parseInt(input.value);
          val.textContent = "\u2B50".repeat(v);
          stepEls.forEach((el, i) => el.classList.toggle(`${p}-active`, i === v - 1));
        });
        wrap.append(val, input, labels);
        c.append(wrap);
      },
      code: {
        css: `input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: #4361ee;
  border: 3px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
}
.step-labels { display: flex; justify-content: space-between; }
.step-label { font-size: 0.7rem; color: #888; }
.step-label.active { color: #4361ee; font-weight: 700; }`,
        html: `<div class="value">\u2B50\u2B50\u2B50</div>
<input type="range" min="1" max="5" step="1" value="3">
<div class="step-labels">
  <span class="step-label">Very Easy</span>
  <span class="step-label">Easy</span>
  <span class="step-label active">Normal</span>
  <span class="step-label">Hard</span>
  <span class="step-label">Extreme</span>
</div>`,
        js: `slider.addEventListener("input", () => {
  const v = parseInt(slider.value);
  value.textContent = "\u2B50".repeat(v);
  labels.forEach((el, i) =>
    el.classList.toggle("active", i === v - 1)
  );
});`
      }
    },
    {
      title: "ラベル付きスライダー",
      desc: "スライダーのつまみ上部に現在値がツールチップのように追従表示されるUI。",
      render(c) {
        const p = id();
        addStyle(c, `
          .${p}-wrap { max-width:260px;margin:20px auto 12px;padding:0 8px;position:relative; }
          .${p}-input { width:100%;-webkit-appearance:none;appearance:none;height:6px;background:#ddd;border-radius:3px;outline:none;cursor:pointer; }
          .${p}-input::-webkit-slider-thumb { -webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#6c5ce7;cursor:pointer;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.2); }
          .${p}-input::-moz-range-thumb { width:20px;height:20px;border-radius:50%;background:#6c5ce7;cursor:pointer;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.2); }
          .${p}-tip { position:absolute;top:-28px;background:#6c5ce7;color:#fff;font-size:.75rem;font-weight:700;padding:3px 8px;border-radius:4px;transform:translateX(-50%);pointer-events:none;white-space:nowrap; }
          .${p}-tip::after { content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:#6c5ce7; }
          .${p}-range { display:flex;justify-content:space-between;margin-top:6px;font-size:.7rem;color:#aaa; }
        `);
        const wrap = h("div", `${p}-wrap`);
        const tip = h("div", `${p}-tip`, "50");
        const input = document.createElement("input");
        input.type = "range";
        input.min = "0";
        input.max = "100";
        input.value = "50";
        input.className = `${p}-input`;
        const rangeLabels = h("div", `${p}-range`);
        rangeLabels.append(h("span", null, "0"), h("span", null, "100"));

        function updateTip() {
          const v = input.value;
          tip.textContent = v;
          const pct = (v - input.min) / (input.max - input.min);
          const thumbOffset = 10 - pct * 20;
          tip.style.left = `calc(${pct * 100}% + ${thumbOffset}px)`;
        }
        input.addEventListener("input", updateTip);
        wrap.append(tip, input, rangeLabels);
        c.append(wrap);
        requestAnimationFrame(updateTip);
      },
      code: {
        css: `.slider-wrap { position: relative; max-width: 260px; }
input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: #6c5ce7;
  border: 3px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
}
.tooltip {
  position: absolute;
  top: -28px;
  background: #6c5ce7;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  transform: translateX(-50%);
}
.tooltip::after {
  content: '';
  position: absolute;
  top: 100%; left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #6c5ce7;
}`,
        html: `<div class="slider-wrap">
  <div class="tooltip">50</div>
  <input type="range" min="0" max="100" value="50">
  <div class="range-labels">
    <span>0</span><span>100</span>
  </div>
</div>`,
        js: `slider.addEventListener("input", () => {
  const v = slider.value;
  tooltip.textContent = v;
  const pct = v / 100;
  tooltip.style.left = (pct * 100) + "%";
});`
      }
    }
  );

})();
