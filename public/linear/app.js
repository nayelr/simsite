const DATA = [
  "/linear/data/chapter-1.json",
  "/linear/data/chapter-2.json",
  "/linear/data/chapter-3.json",
  "/linear/data/chapter-4.json",
  "/linear/data/chapter-5.json",
  "/linear/data/chapter-6.json",
  "/linear/data/chapter-7.json",
];

async function loadChapters() {
  const results = await Promise.all(
    DATA.map((url) => fetch(url).then((r) => {
      if (!r.ok) throw new Error(`Failed to load ${url}: ${r.status}`);
      return r.json();
    }))
  );
  return results;
}

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function renderChapter(ch, container) {
  container.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.className = "chapter-title";
  h2.textContent = ch.title;

  const meta = document.createElement("p");
  meta.className = "meta";
  if (ch.meta && ch.meta.pdfPage) {
    meta.textContent = `PDF p. ${ch.meta.pdfPage} · ${ch.items.length} parts`;
  } else {
    meta.textContent = `${ch.items.length} parts`;
  }

  container.append(h2, meta);

  // Build a lookup of preambles keyed by the item they appear before
  const preambleMap = {};
  if (ch.preambles) {
    ch.preambles.forEach((pr) => {
      preambleMap[pr.beforeItem] = pr.text;
    });
  }

  ch.items.forEach((item) => {
    // Render preamble callout if one starts at this item
    if (preambleMap[item.id]) {
      const note = document.createElement("div");
      note.className = "preamble";
      note.textContent = preambleMap[item.id];
      container.append(note);
    }

    const card = document.createElement("article");
    card.className = "card";
    card.dataset.answer = String(item.answer);

    const head = document.createElement("div");
    head.className = "card-head";

    const lab = document.createElement("span");
    lab.className = "label";
    lab.textContent = item.label;

    const p = document.createElement("p");
    p.className = "prompt";
    // Preserve newlines in JSON text by turning them into <br/> for math-like formatting.
    p.innerHTML = esc(item.text).replace(/\n/g, "<br/>");

    head.append(lab, p);

    const row = document.createElement("div");
    row.className = "controls";

    const grp = document.createElement("div");
    grp.className = "btn-group";
    grp.setAttribute("role", "group");
    grp.setAttribute("aria-label", `Answer for ${item.label}`);

    const fb = document.createElement("div");
    fb.className = "feedback empty";
    fb.dataset.forItem = item.id;

    ["True", "False"].forEach((label) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.dataset.value = label === "True" ? "true" : "false";
      b.addEventListener("click", () => {
        grp.querySelectorAll("button").forEach((x) => {
          x.classList.remove("selected-true", "selected-false");
        });
        b.classList.add(label === "True" ? "selected-true" : "selected-false");
        const chosen = b.dataset.value === "true";
        const correct = item.answer === chosen;
        fb.className = "feedback " + (correct ? "correct" : "incorrect");
        fb.textContent = correct
          ? "Correct."
          : `Incorrect — the statement is ${item.answer ? "true" : "false"}.`;
      });
      grp.append(b);
    });

    row.append(grp, fb);
    card.append(head, row);
    container.append(card);
  });
}

function setupTabs(chapters) {
  const tabs = document.getElementById("tabs");
  const main = document.getElementById("main");
  const panels = [];

  chapters.forEach((ch, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab";
    btn.textContent = `Chapter ${ch.id}`;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
    btn.id = `tab-${ch.id}`;

    const panel = document.createElement("div");
    panel.setAttribute("role", "tabpanel");
    panel.hidden = i !== 0;
    panel.id = `panel-${ch.id}`;
    panels.push(panel);

    btn.addEventListener("click", () => {
      panels.forEach((p, j) => {
        p.hidden = j !== i;
      });
      tabs.querySelectorAll(".tab").forEach((t, j) => {
        t.setAttribute("aria-selected", j === i ? "true" : "false");
      });
    });

    tabs.append(btn);
    main.append(panel);
    renderChapter(ch, panel);
  });
}

loadChapters()
  .then(setupTabs)
  .catch((e) => {
    document.getElementById("main").innerHTML =
      `<p class="err">Could not load data files. Run a local server from this folder, e.g. <code>python3 -m http.server 8765</code>, then open <code>http://localhost:8765</code>. (${esc(String(e.message))})</p>`;
  });
