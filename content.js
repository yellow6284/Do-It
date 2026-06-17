function initDoIt() {
  if (document.getElementById("doit-dot")) return;

  const STORAGE_KEY = "doit_note";
  const POSITION_KEY = "doit_position";

  function loadNote() {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      const textarea =
        document.getElementById("doit-textarea");
      
      if (textarea && result[STORAGE_KEY]) {
        textarea.value = result[STORAGE_KEY];
      }
    });
  }

  function saveNote(text) {
    chrome.storage.local.set({
      [STORAGE_KEY]: text
    });
  }
  
  function savePosition(left, top) {
  chrome.storage.local.set({
    [POSITION_KEY]: {
      left,
      top
    }
  });
}

function loadPosition() {
  chrome.storage.local.get(
    [POSITION_KEY],
    (result) => {

      const pos =
      result[POSITION_KEY];

      if (!pos) return;

      dot.style.left =
      pos.left;

      dot.style.top =
      pos.top;

      dot.style.right =
      "auto";

      dot.style.bottom =
      "auto";

      if (
      panel.classList.contains(
      "open"
      )) {
      positionPanel();
      }

    }
  );
}
  
  const dot = document.createElement("div");
  dot.id = "doit-dot";
  dot.innerText = "•";

  const panel = document.createElement("div");
  panel.id = "doit-panel";

  panel.innerHTML = `
    <div id="doit-header">Do It</div>
    <textarea
      id="doit-textarea"
      placeholder="Get your shit done">
    </textarea>
  `;

  document.body.appendChild(dot);
  document.body.appendChild(panel);
  loadPosition();

  // AUTOSAVE
  const textarea =
    panel.querySelector("#doit-textarea");

  loadNote();

  textarea.addEventListener("input", () => {
    saveNote(textarea.value);
  });

  function positionPanel() {
    const rect = dot.getBoundingClientRect();

    const gap = 3;

    panel.style.left =
      `${rect.left + (rect.width / 2) - 110}px`;

    panel.style.top =
      `${rect.top - panel.offsetHeight - gap}px`;
  }

  // open / close
  // open / close
dot.addEventListener("click", () => {

  if (moved) {
    moved = false;
    return;
  }

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

  const rect =
    dot.getBoundingClientRect();

  offsetX =
    e.clientX - rect.left;

  offsetY =
    e.clientY - rect.top;

});

document.addEventListener(
  "mousemove",
  (e) => {

    if (!dragging)
      return;

    moved = true;

    dot.style.left =
      `${e.clientX - offsetX}px`;

    dot.style.top =
      `${e.clientY - offsetY}px`;

    dot.style.right =
      "auto";

    dot.style.bottom =
      "auto";

    savePosition(
      dot.style.left,
      dot.style.top
    );

    if (
      panel.classList.contains(
        "open"
      )
    ) {
      positionPanel();
    }

});

document.addEventListener(
  "mouseup",
  () => {

    dragging = false;

});
  document.addEventListener("mouseup", () => {
    dragging = false;
  });
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initDoIt
  );
} else {
  initDoIt();
}