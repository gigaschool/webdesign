const data = window.uiShowcaseData;
const renderDemo = window.createUiDemo;
const multiDemos = window.multiDemos || {};

const demoMount = document.getElementById("demoMount");

if (
  !data ||
  !Array.isArray(data.terms) ||
  typeof renderDemo !== "function"
) {
  console.error("UI Showcase data or renderer is not ready.");
  demoMount.textContent = "見本データの読み込みに失敗しました。";
} else {
  const { terms } = data;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || "ui";
  const foundIndex = terms.findIndex((item) => item.slug === slug);
  const index = foundIndex >= 0 ? foundIndex : 0;
  const item = terms[index];

  document.title = `${item.term} | デザインUI演出 見本`;

  const examples = multiDemos[item.demo || item.slug];

  if (examples && examples.length > 0) {
    // Multi-demo mode
    document.body.classList.add("multi-demo-page");
    demoMount.classList.remove("sample-demo-only");
    demoMount.classList.add("multi-demo-mount");
    demoMount.innerHTML = "";

    // Header
    const header = document.createElement("div");
    header.className = "multi-header";
    const title = document.createElement("h1");
    title.className = "multi-title";
    title.textContent = item.term;
    const desc = document.createElement("p");
    desc.className = "multi-desc";
    desc.textContent = item.description;
    header.append(title, desc);
    demoMount.append(header);

    // Examples
    examples.forEach((ex, i) => {
      const section = document.createElement("section");
      section.className = "multi-example";

      const exTitle = document.createElement("h2");
      exTitle.className = "multi-ex-title";
      exTitle.textContent = `${i + 1}. ${ex.title}`;
      section.append(exTitle);

      if (ex.desc) {
        const exDesc = document.createElement("p");
        exDesc.className = "multi-ex-desc";
        exDesc.textContent = ex.desc;
        section.append(exDesc);
      }

      const body = document.createElement("div");
      body.className = "multi-ex-body";

      // Live demo area
      const demoArea = document.createElement("div");
      demoArea.className = "multi-ex-demo";
      const demoLabel = document.createElement("div");
      demoLabel.className = "multi-area-label";
      demoLabel.textContent = "プレビュー";
      const demoContent = document.createElement("div");
      demoContent.className = "multi-ex-demo-content";
      ex.render(demoContent);
      demoArea.append(demoLabel, demoContent);

      // Code area
      const codeArea = document.createElement("div");
      codeArea.className = "multi-ex-codes";
      const codeLabel = document.createElement("div");
      codeLabel.className = "multi-area-label";
      codeLabel.textContent = "コード";

      if (ex.code) {
        const blocks = [];
        if (ex.code.css) blocks.push(["CSS", ex.code.css]);
        if (ex.code.html) blocks.push(["HTML", ex.code.html]);
        if (ex.code.js) blocks.push(["JavaScript", ex.code.js]);

        blocks.forEach(([lang, code]) => {
          const block = document.createElement("div");
          block.className = "code-block";
          const blockHeader = document.createElement("div");
          blockHeader.className = "code-block-header";
          const langLabel = document.createElement("span");
          langLabel.textContent = lang;
          const copyBtn = document.createElement("button");
          copyBtn.type = "button";
          copyBtn.className = "code-copy-btn";
          copyBtn.textContent = "コピー";
          copyBtn.addEventListener("click", async () => {
            try {
              await navigator.clipboard.writeText(code);
              copyBtn.textContent = "コピー済み";
            } catch {
              copyBtn.textContent = "失敗";
            }
            setTimeout(() => { copyBtn.textContent = "コピー"; }, 1200);
          });
          blockHeader.append(langLabel, copyBtn);
          const pre = document.createElement("pre");
          const codeEl = document.createElement("code");
          codeEl.textContent = code;
          pre.append(codeEl);
          block.append(blockHeader, pre);
          codeArea.append(block);
        });
      }

      codeArea.prepend(codeLabel);
      body.append(demoArea, codeArea);
      section.append(body);
      demoMount.append(section);
    });

  } else {
    // Single demo mode (original behavior)
    demoMount.innerHTML = "";
    const demo = renderDemo(item, false);
    demo.querySelector(".demo-caption")?.remove();
    demo.querySelectorAll(".d-tip").forEach((el) => el.remove());
    demoMount.append(demo);
  }

  // QR code at the bottom
  if (typeof qrcode === "function") {
    const qrSection = document.createElement("div");
    qrSection.className = "qr-section";
    const qrLabel = document.createElement("p");
    qrLabel.className = "qr-label";
    qrLabel.textContent = "このページのQRコード";
    const qrWrap = document.createElement("div");
    qrWrap.className = "qr-wrap";
    const qr = qrcode(0, "M");
    const qrUrl = "https://gigaschool.github.io/webdesign/ui-showcase/sample.html?slug=" + encodeURIComponent(slug);
    qr.addData(qrUrl);
    qr.make();
    qrWrap.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0 });
    qrSection.append(qrLabel, qrWrap);
    demoMount.append(qrSection);
  }
}
