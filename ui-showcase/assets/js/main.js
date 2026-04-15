const data = window.uiShowcaseData;
const renderDemo = window.createUiDemo;

const cardsEl = document.getElementById("cards");
const searchInput = document.getElementById("searchInput");
const categoryTabs = document.getElementById("categoryTabs");
const countLabel = document.getElementById("countLabel");
const viewToggle = document.getElementById("viewToggle");

if (
  !data ||
  !Array.isArray(data.terms) ||
  !Array.isArray(data.categories) ||
  typeof renderDemo !== "function"
) {
  console.error("UI Showcase data or renderer is not ready.");
  if (cardsEl) {
    cardsEl.innerHTML = "<p>見本データの読み込みに失敗しました。</p>";
  }
} else {
  const { terms, categories } = data;

  const categoryColors = {
    "画面の基本": {
      bg: "var(--cat-basics-bg)",
      text: "var(--cat-basics-text)",
      border: "var(--cat-basics-border)",
      accent: "var(--cat-basics)"
    },
    "動き・演出": {
      bg: "var(--cat-motion-bg)",
      text: "var(--cat-motion-text)",
      border: "var(--cat-motion-border)",
      accent: "var(--cat-motion)"
    },
    "見た目・スタイル": {
      bg: "var(--cat-style-bg)",
      text: "var(--cat-style-text)",
      border: "var(--cat-style-border)",
      accent: "var(--cat-style)"
    },
    "UIパーツ": {
      bg: "var(--cat-parts-bg)",
      text: "var(--cat-parts-text)",
      border: "var(--cat-parts-border)",
      accent: "var(--cat-parts)"
    }
  };

  let selectedCategory = "すべて";
  let viewMode = "cards";

  for (const category of categories) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cat-tab";
    btn.textContent = category;
    btn.setAttribute("aria-selected", category === "すべて" ? "true" : "false");
    btn.addEventListener("click", () => {
      selectedCategory = category;
      categoryTabs.querySelectorAll(".cat-tab").forEach(t =>
        t.setAttribute("aria-selected", "false")
      );
      btn.setAttribute("aria-selected", "true");
      render();
    });
    categoryTabs.appendChild(btn);
  }

  // View toggle
  viewToggle.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      viewToggle.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      viewMode = btn.dataset.view;
      render();
    });
  });

  function sampleUrl(slug) {
    return `ui-showcase/sample.html?slug=${encodeURIComponent(slug)}`;
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  function makeCopyBtn(text, cls) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = cls;
    btn.textContent = "コピー";
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const ok = await copyText(text);
      btn.textContent = ok ? "コピー済み ✓" : "失敗";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = "コピー";
        btn.classList.remove("copied");
      }, 1500);
    });
    return btn;
  }

  function cardTemplate(term, index) {
    const article = document.createElement("article");
    article.className = "card";
    article.id = term.slug;
    article.style.animationDelay = `${Math.min(index * 0.03, 0.6)}s`;

    const colors = categoryColors[term.category];
    if (colors) {
      article.style.setProperty("--card-accent", colors.accent);
    }

    const header = document.createElement("div");
    header.className = "card-header";

    const badge = document.createElement("span");
    badge.className = "card-badge";
    badge.textContent = term.category;
    if (colors) {
      badge.style.setProperty("--badge-bg", colors.bg);
      badge.style.setProperty("--badge-text", colors.text);
      badge.style.setProperty("--badge-border", colors.border);
    }

    const h3 = document.createElement("h3");
    h3.textContent = term.term;

    header.append(badge, h3);

    const demo = renderDemo(term, true);

    const content = document.createElement("div");
    content.className = "card-content";

    const desc = document.createElement("p");
    desc.textContent = term.description;

    content.append(desc);

    const promptText = term.prompt.split("\n")[0].trim();
    const promptWrap = document.createElement("div");
    promptWrap.className = "card-prompt";
    const promptP = document.createElement("p");
    promptP.className = "card-prompt-text";
    promptP.textContent = promptText;
    promptWrap.append(promptP, makeCopyBtn(promptText, "card-prompt-copy"));
    content.append(promptWrap);

    const links = document.createElement("div");
    links.className = "links card-footer";

    const openLink = document.createElement("a");
    openLink.href = sampleUrl(term.slug);
    openLink.textContent = "見本を開く →";

    const shareBtn = document.createElement("button");
    shareBtn.type = "button";
    shareBtn.textContent = "URLをコピー";
    shareBtn.addEventListener("click", async () => {
      const shareUrl = new URL(
        sampleUrl(term.slug),
        window.location.href
      ).href;
      const ok = await copyText(shareUrl);
      shareBtn.textContent = ok ? "コピーしました" : "失敗";
      setTimeout(() => {
        shareBtn.textContent = "URLをコピー";
      }, 1200);
    });

    links.append(openLink, shareBtn);
    article.append(header, demo, content, links);
    return article;
  }

  function promptRowTemplate(term, index) {
    const row = document.createElement("div");
    row.className = "prompt-row";
    row.style.animationDelay = `${Math.min(index * 0.02, 0.4)}s`;

    const colors = categoryColors[term.category];
    if (colors) {
      row.style.setProperty("--card-accent", colors.accent);
    }

    const header = document.createElement("div");
    header.className = "prompt-row-header";

    const badge = document.createElement("span");
    badge.className = "card-badge";
    badge.textContent = term.category;
    if (colors) {
      badge.style.setProperty("--badge-bg", colors.bg);
      badge.style.setProperty("--badge-text", colors.text);
      badge.style.setProperty("--badge-border", colors.border);
    }

    const title = document.createElement("h3");
    title.className = "prompt-row-title";
    title.textContent = term.term;

    const link = document.createElement("a");
    link.href = sampleUrl(term.slug);
    link.className = "prompt-row-link";
    link.textContent = "見本 →";

    header.append(badge, title, link);
    row.append(header);

    const prompts = term.prompt.split("\n").map(s => s.trim()).filter(s => s.length > 0);
    const list = document.createElement("div");
    list.className = "prompt-row-list";

    prompts.forEach(text => {
      const item = document.createElement("div");
      item.className = "prompt-row-item";
      const p = document.createElement("p");
      p.className = "prompt-row-text";
      p.textContent = text;
      item.append(p, makeCopyBtn(text, "prompt-copy-btn"));
      list.append(item);
    });

    row.append(list);
    return row;
  }

  function filterTerms() {
    const q = searchInput.value.trim().toLowerCase();

    return terms.filter((term) => {
      const matchCategory = selectedCategory === "すべて" || term.category === selectedCategory;
      const searchable = `${term.term} ${term.description} ${term.prompt}`.toLowerCase();
      const matchQuery = q.length === 0 || searchable.includes(q);
      return matchCategory && matchQuery;
    });
  }

  function render() {
    cardsEl.innerHTML = "";
    const filtered = filterTerms();

    if (viewMode === "prompts") {
      cardsEl.className = "prompt-list";
      filtered.forEach((term, i) => {
        cardsEl.appendChild(promptRowTemplate(term, i));
      });
    } else {
      cardsEl.className = "cards";
      filtered.forEach((term, i) => {
        cardsEl.appendChild(cardTemplate(term, i));
      });
    }

    countLabel.textContent = `${filtered.length}件`;
  }

  searchInput.addEventListener("input", render);
  render();

  const hash = decodeURIComponent(window.location.hash.replace("#", ""));
  if (hash) {
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }
}
