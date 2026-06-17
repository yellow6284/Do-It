function initDoIt() {
  if (document.getElementById("doit-dot")) return;

  const dot = document.createElement("div");
  dot.id = "doit-dot";
  dot.innerText = "•";

  const panel = document.createElement("div");
  panel.id = "doit-panel";

  panel.innerHTML = `
    <div id="doit-header">Do It</div>
    <textarea id="doit-textarea"
    placeholder="Get your shit done"></textarea>
  `;

  document.body.appendChild(dot);
  document.body.appendChild(panel);

  function positionPanel() {
     const rect = dot.getBoundingClientRect();

  const gap = 3;

  panel.style.left =
    `${rect.left + (rect.width / 2) - 110}px`;

  panel.style.top =
    `${rect.top - panel.offsetHeight - gap}px`;
  }

  // open / close
  dot.addEventListener("click", () => {
    panel.classList.toggle("open");

    if (panel.classList.contains("open")) {
      positionPanel();
    }
  });

  // DRAG DOT
  let dragging = false;
  let moved = false;

  let offsetX = 0;
  let offsetY = 0;

  dot.addEventListener("mousedown", (e) => {
    dragging = true;
    moved = false;

    const rect = dot.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    moved = true;

    dot.style.left = `${e.clientX - offsetX}px`;
    dot.style.top = `${e.clientY - offsetY}px`;

    dot.style.right = "auto";
    dot.style.bottom = "auto";

    if (panel.classList.contains("open")) {
      positionPanel();
    }
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDoIt);
} else {
  initDoIt();
}