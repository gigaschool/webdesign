const data = window.uiShowcaseData;
const renderDemo = window.createUiDemo;

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

  demoMount.innerHTML = "";
  const demo = renderDemo(item, false);
  demo.querySelector(".demo-caption")?.remove();
  demo.querySelectorAll(".d-tip").forEach((el) => el.remove());
  demoMount.append(demo);
}
