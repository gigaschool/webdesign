const data = window.uiShowcaseData;
const renderDemo = window.createUiDemo;

const cardsEl = document.getElementById("cards");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const countLabel = document.getElementById("countLabel");

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
      border: "var(--cat-basics-border)"
    },
    "動き・演出": {
      bg: "var(--cat-motion-bg)",
      text: "var(--cat-motion-text)",
      border: "var(--cat-motion-border)"
    },
    "見た目・スタイル": {
      bg: "var(--cat-style-bg)",
      text: "var(--cat-style-text)",
      border: "var(--cat-style-border)"
    },
    "UIパーツ": {
      bg: "var(--cat-parts-bg)",
      text: "var(--cat-parts-text)",
      border: "var(--cat-parts-border)"
    }
  };

  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  }

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

  function cardTemplate(term, index) {
    const article = document.createElement("article");
    article.className = "card";
    article.id = term.slug;
    article.style.animationDelay = `${Math.min(index * 0.03, 0.6)}s`;

    const colors = categoryColors[term.category];

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

    const promptLabel = document.createElement("p");
    promptLabel.className = "prompt-label";
    promptLabel.textContent = "AIへの相談例";

    const prompt = document.createElement("pre");
    prompt.textContent = term.prompt.split("\n")[0];

    content.append(desc, promptLabel, prompt);

    const links = document.createElement("div");
    links.className = "links card-footer";

    const openLink = document.createElement("a");
    openLink.href = sampleUrl(term.slug);
    openLink.textContent = "見本を開く";

    const shareBtn = document.createElement("button");
    shareBtn.type = "button";
    shareBtn.textContent = "URLをコピー";
    shareBtn.addEventListener("click", async () => {
      const shareUrl = new URL(
        `#${encodeURIComponent(term.slug)}`,
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

  function filterTerms() {
    const q = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;

    return terms.filter((term) => {
      const matchCategory = category === "すべて" || term.category === category;
      const searchable = `${term.term} ${term.description} ${term.prompt}`.toLowerCase();
      const matchQuery = q.length === 0 || searchable.includes(q);
      return matchCategory && matchQuery;
    });
  }

  function render() {
    cardsEl.innerHTML = "";
    const filtered = filterTerms();
    filtered.forEach((term, i) => {
      cardsEl.appendChild(cardTemplate(term, i));
    });
    countLabel.textContent = `${filtered.length}件表示`;
  }

  searchInput.addEventListener("input", render);
  categorySelect.addEventListener("change", render);
  render();

  const hash = decodeURIComponent(window.location.hash.replace("#", ""));
  if (hash) {
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }
}
