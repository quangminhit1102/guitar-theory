(function () {
  const NS = "http://www.w3.org/2000/svg";
  const TUNING = { 1: "E", 2: "B", 3: "G", 4: "D", 5: "A", 6: "E" };
  const CHROMATIC = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const STRING_NAMES = { 1: "e", 2: "B", 3: "G", 4: "D", 5: "A", 6: "E" };

  function el(tag, attrs, parent) {
    const node = document.createElementNS(NS, tag);
    if (attrs) {
      for (const key in attrs) node.setAttribute(key, attrs[key]);
    }
    if (parent) parent.appendChild(node);
    return node;
  }

  function text(parent, x, y, str, cls) {
    const node = el("text", { x, y }, parent);
    if (cls) node.setAttribute("class", cls);
    node.textContent = str;
    return node;
  }

  function noteAt(string, fret) {
    const open = CHROMATIC.indexOf(TUNING[string]);
    return CHROMATIC[(open + fret) % 12];
  }

  function isNatural(name) {
    return name.indexOf("#") === -1;
  }

  function fretboardGrid(target, opts) {
    opts = opts || {};
    const frets = opts.frets || 12;
    const cellW = opts.cellW || 52;
    const cellH = opts.cellH || 26;
    const padL = 48;
    const padT = 30;
    const padB = 30;
    const width = padL + frets * cellW + 16;
    const height = padT + 5 * cellH + padB;
    const svg = el("svg", { width, height, viewBox: `0 0 ${width} ${height}`, role: "img" });
    svg.setAttribute("aria-label", "Sơ đồ cần đàn với tên nốt");

    for (let s = 1; s <= 6; s += 1) {
      const y = padT + (s - 1) * cellH;
      el("line", { x1: padL, y1: y, x2: padL + frets * cellW, y2: y, class: "fb-string" }, svg);
    }

    for (let f = 0; f <= frets; f += 1) {
      const x = padL + f * cellW;
      el("line", { x1: x, y1: padT, x2: x, y2: padT + 5 * cellH, class: f === 0 ? "fb-nut" : "fb-line" }, svg);
    }

    for (let s = 1; s <= 6; s += 1) {
      const y = padT + (s - 1) * cellH;
      const openNote = noteAt(s, 0);
      text(svg, padL - 20, y + 4, openNote, "fb-open");
      for (let f = 1; f <= frets; f += 1) {
        const name = noteAt(s, f);
        const x = padL + (f - 0.5) * cellW;
        text(svg, x, y + 3.5, name, isNatural(name) ? "fb-note" : "fb-note acc");
      }
    }

    const markerFrets = [3, 5, 7, 9, 12];
    markerFrets.forEach((f) => {
      if (f > frets) return;
      const x = padL + (f - 0.5) * cellW;
      el("circle", { cx: x, cy: padT - 12, r: 1.8, class: "fb-inlay" }, svg);
      text(svg, x, padT + 5 * cellH + 20, String(f), "fb-fretnum");
    });

    target.appendChild(svg);
    return svg;
  }

  function noteStrip(target, opts) {
    opts = opts || {};
    const string = opts.string || 6;
    const frets = opts.frets || 12;
    const step = 46;
    const padL = 26;
    const width = padL + frets * step + 20;
    const height = 108;
    const baseY = 58;
    const svg = el("svg", { width, height, viewBox: `0 0 ${width} ${height}`, role: "img" });
    svg.setAttribute("aria-label", `Nốt trên dây ${string} từ phím 0 đến ${frets}`);

    el("line", { x1: padL, y1: baseY, x2: padL + frets * step, y2: baseY, class: "fb-string" }, svg);
    el("line", { x1: padL, y1: baseY - 10, x2: padL, y2: baseY + 10, class: "fb-nut" }, svg);

    for (let f = 0; f <= frets; f += 1) {
      const x = padL + f * step;
      const name = noteAt(string, f);
      el("line", { x1: x, y1: baseY - 7, x2: x, y2: baseY + 7, class: "fb-line" }, svg);
      if (f > 0) {
        text(svg, x, baseY + 24, String(f), "fb-fretnum");
      }
      const label = el("text", { x, y: baseY - 18, class: isNatural(name) ? "fb-open" : "fb-note acc" }, svg);
      label.setAttribute("text-anchor", "middle");
      label.textContent = name;
      const semi = el("text", { x, y: baseY + 40, class: "fb-fretnum" }, svg);
      semi.setAttribute("text-anchor", "middle");
      semi.textContent = f === 0 ? "" : `+${f}`;
    }

    target.appendChild(svg);
    return svg;
  }

  function chordBox(target, opts) {
    const frets = opts.frets;
    const fingers = opts.fingers || [];
    const baseFret = opts.baseFret || 1;
    const width = 132;
    const height = 168;
    const left = 24;
    const top = 42;
    const gapX = 16;
    const gapY = 20;
    const svg = el("svg", { width, height, viewBox: `0 0 ${width} ${height}`, role: "img" });
    svg.setAttribute("aria-label", `Thế bấm hợp âm ${opts.name}`);

    text(svg, width / 2, 18, opts.name, "fb-open").setAttribute("text-anchor", "middle");
    text(svg, width / 2, 32, baseFret > 1 ? `${baseFret}fr` : "", "fb-fretnum").setAttribute("text-anchor", "middle");

    for (let f = 0; f <= 4; f += 1) {
      el("line", {
        x1: left, y1: top + f * gapY, x2: left + 5 * gapX, y2: top + f * gapY,
        class: f === 0 ? "fb-nut" : "fb-line"
      }, svg);
    }
    for (let s = 0; s <= 5; s += 1) {
      el("line", { x1: left + s * gapX, y1: top, x2: left + s * gapX, y2: top + 4 * gapY, class: "fb-line" }, svg);
    }

    frets.forEach((fret, index) => {
      const x = left + index * gapX;
      if (fret === null || fret === undefined) {
        text(svg, x, top - 6, "x", "fb-open");
        return;
      }
      if (fret === 0) {
        el("circle", { cx: x, cy: top - 12, r: 4.4, fill: "none", stroke: "var(--muted)", "stroke-width": 1.2 }, svg);
        return;
      }
      const rel = fret - baseFret + 1;
      const y = top + (rel - 0.5) * gapY;
      el("circle", { cx: x, cy: y, r: 6, class: "fb-dot" }, svg);
      if (fingers[index]) {
        text(svg, x, y + 3.4, fingers[index], "fb-fretnum").setAttribute("fill", "var(--accent-ink)");
      }
    });

    target.appendChild(svg);
    return svg;
  }

  function staff(target, opts) {
    opts = opts || {};
    const width = 760;
    const height = 190;
    const gap = 18;
    const top = 42;
    const groupW = 300;
    const svg = el("svg", { width, height, viewBox: `0 0 ${width} ${height}`, role: "img" });
    svg.setAttribute("aria-label", "Khuông nhạc khóa Sol với tên dòng và khoảng");

    function drawStaff(gx, label) {
      for (let i = 0; i < 5; i += 1) {
        el("line", { x1: gx, y1: top + i * gap, x2: gx + groupW, y2: top + i * gap, class: "staff-line" }, svg);
      }
      const clef = el("text", { x: gx - 4, y: top + 4 * gap + 6, class: "staff-clef" }, svg);
      clef.textContent = "\uD834\uDD1E";
      const cap = el("text", { x: gx + groupW / 2, y: height - 16, class: "fb-fretnum" }, svg);
      cap.setAttribute("text-anchor", "middle");
      cap.textContent = label;
    }

    function note(x, y, name, muted) {
      el("circle", { cx: x, cy: y, r: 6, class: "staff-note" }, svg);
      const t = el("text", { x, y: y + 24, class: muted ? "staff-label muted" : "staff-label" }, svg);
      t.setAttribute("text-anchor", "middle");
      t.textContent = name;
    }

    const leftX = 46;
    drawStaff(leftX, "Dòng: từ dưới lên");
    const lineNames = ["E", "G", "B", "D", "F"];
    lineNames.forEach((name, i) => {
      note(leftX + 78 + i * 50, top + (4 - i) * gap, name, false);
    });

    const rightX = 410;
    drawStaff(rightX, "Khoảng: từ dưới lên");
    const spaceNames = ["F", "A", "C", "E"];
    spaceNames.forEach((name, i) => {
      note(rightX + 78 + i * 50, top + (3 - i) * gap + gap / 2, name, true);
    });

    target.appendChild(svg);
    return svg;
  }

  function interactiveFretboard(target, opts) {
    opts = opts || {};
    const frets = opts.frets || 12;
    const cellW = 44;
    const cellH = 26;
    const padL = 54;
    const padT = 26;
    const width = padL + frets * cellW + 12;
    const height = padT + 5 * cellH + 26;
    const svg = el("svg", { width, height, viewBox: `0 0 ${width} ${height}`, role: "group" });
    svg.setAttribute("aria-label", "Cần đàn bấm thử: chọn dây và phím");

    for (let s = 1; s <= 6; s += 1) {
      const y = padT + (s - 1) * cellH;
      el("line", { x1: padL, y1: y, x2: padL + frets * cellW, y2: y, class: "fb-string" }, svg);
      text(svg, padL - 34, y + 4, STRING_NAMES[s], "fb-open");
    }
    for (let f = 0; f <= frets; f += 1) {
      const x = padL + f * cellW;
      el("line", { x1: x, y1: padT, x2: x, y2: padT + 5 * cellH, class: f === 0 ? "fb-nut" : "fb-line" }, svg);
    }
    for (let f = 1; f <= frets; f += 1) {
      text(svg, padL + (f - 0.5) * cellW, padT + 5 * cellH + 18, String(f), "fb-fretnum");
    }

    const marks = new Map();
    const cells = el("g", null, svg);

    for (let s = 1; s <= 6; s += 1) {
      for (let f = 0; f <= frets; f += 1) {
        const cell = el("rect", {
          x: f === 0 ? padL - 14 : padL + (f - 1) * cellW,
          y: padT + (s - 1) * cellH - cellH / 2,
          width: f === 0 ? cellW : cellW,
          height: cellH,
          class: "fb-cell"
        }, cells);
        cell.addEventListener("click", () => {
          const key = s + ":" + f;
          if (marks.has(key)) {
            marks.get(key).remove();
            marks.delete(key);
          } else {
            const cx = f === 0 ? padL - 12 : padL + (f - 0.5) * cellW;
            const cy = padT + (s - 1) * cellH;
            const dot = el("circle", { cx, cy, r: 8, class: "fb-dot" }, svg);
            marks.set(key, dot);
          }
          if (opts.onChange) opts.onChange(getMarks());
        });
      }
    }

    function getMarks() {
      return Array.from(marks.keys()).map((key) => {
        const parts = key.split(":").map(Number);
        return [parts[0], parts[1]];
      });
    }

    function clear() {
      marks.forEach((dot) => dot.remove());
      marks.clear();
      if (opts.onChange) opts.onChange(getMarks());
    }

    function set(next) {
      clear();
      (next || []).forEach(([s, f]) => {
        const key = s + ":" + f;
        const cx = f === 0 ? padL - 12 : padL + (f - 0.5) * cellW;
        const cy = padT + (s - 1) * cellH;
        marks.set(key, el("circle", { cx, cy, r: 8, class: "fb-dot" }, svg));
      });
      if (opts.onChange) opts.onChange(getMarks());
    }

    target.appendChild(svg);
    return { getMarks, clear, set };
  }

  function fretboardPattern(target, opts) {
    opts = opts || {};
    const frets = opts.frets || 12;
    const startFret = opts.startFret || 0;
    const cellW = opts.cellW || 46;
    const cellH = opts.cellH || 26;
    const padL = 64;
    const padT = 28;
    const padB = 28;
    const width = padL + frets * cellW + 14;
    const height = padT + 5 * cellH + padB;
    const svg = el("svg", { width, height, viewBox: `0 0 ${width} ${height}`, role: "img" });
    svg.setAttribute("aria-label", opts.label || "Thế bấm trên cần đàn");

    for (let s = 1; s <= 6; s += 1) {
      const y = padT + (s - 1) * cellH;
      el("line", { x1: padL, y1: y, x2: padL + frets * cellW, y2: y, class: "fb-string" }, svg);
      text(svg, padL - 34, y + 4, STRING_NAMES[s], "fb-open");
    }
    for (let i = 0; i <= frets; i += 1) {
      const x = padL + i * cellW;
      el("line", { x1: x, y1: padT, x2: x, y2: padT + 5 * cellH, class: i === 0 && startFret === 0 ? "fb-nut" : "fb-line" }, svg);
    }

    const markerFrets = [3, 5, 7, 9, 12, 15];
    markerFrets.forEach((f) => {
      if (f <= startFret || f > startFret + frets) return;
      text(svg, padL + (f - startFret - 0.5) * cellW, padT + 5 * cellH + 18, String(f), "fb-fretnum");
    });
    if (startFret > 0) {
      text(svg, padL - 38, padT + 5 * cellH + 18, `${startFret + 1}fr`, "fb-fretnum");
    }

    (opts.marks || []).forEach((mark) => {
      const f = mark.fret;
      if (f < startFret || f > startFret + frets) return;
      const x = f === 0 ? padL - 14 : padL + (f - startFret - 0.5) * cellW;
      const y = padT + (mark.string - 1) * cellH;
      el("circle", { cx: x, cy: y, r: 9, class: mark.root ? "fb-dot root" : "fb-dot other" }, svg);
      if (mark.label) {
        const t = el("text", { x, y: y + 3.4 }, svg);
        t.setAttribute("text-anchor", "middle");
        t.setAttribute("fill", "var(--accent-ink)");
        t.setAttribute("font-size", "9");
        t.setAttribute("font-weight", "700");
        t.setAttribute("font-family", "ui-sans-serif, system-ui, sans-serif");
        t.textContent = mark.label;
      }
    });

    target.appendChild(svg);
    return svg;
  }

  function circleOfFifths(target, opts) {
    opts = opts || {};
    const size = 360;
    const cx = size / 2;
    const cy = size / 2;
    const rOuter = 132;
    const rInner = 86;
    const svg = el("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, role: "img" });
    svg.setAttribute("aria-label", "Vòng quãng 5");
    const keys = [
      ["C", "Am"], ["G", "Em"], ["D", "Bm"], ["A", "F#m"], ["E", "C#m"], ["B", "G#m"],
      ["F#", "D#m"], ["Db", "Bbm"], ["Ab", "Fm"], ["Eb", "Cm"], ["Bb", "Gm"], ["F", "Dm"]
    ];
    const highlight = (opts.highlight || []).map((k) => k.toLowerCase());

    keys.forEach((pair, i) => {
      const angle = (i / keys.length) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * rOuter;
      const y = cy + Math.sin(angle) * rOuter;
      const xi = cx + Math.cos(angle) * rInner;
      const yi = cy + Math.sin(angle) * rInner;
      const active = highlight.includes(pair[0].toLowerCase());
      const major = el("text", { x, y: y + 5, "text-anchor": "middle" }, svg);
      major.setAttribute("font-size", "15");
      major.setAttribute("font-weight", "700");
      major.setAttribute("fill", active ? "var(--accent)" : "var(--text)");
      major.setAttribute("font-family", "ui-sans-serif, system-ui, sans-serif");
      major.textContent = pair[0];
      const minor = el("text", { x: xi, y: yi + 4, "text-anchor": "middle" }, svg);
      minor.setAttribute("font-size", "11");
      minor.setAttribute("fill", "var(--muted)");
      minor.setAttribute("font-family", "ui-sans-serif, system-ui, sans-serif");
      minor.textContent = pair[1];
    });

    const center = el("text", { x: cx, y: cy + 4, "text-anchor": "middle" }, svg);
    center.setAttribute("font-size", "11");
    center.setAttribute("fill", "var(--muted)");
    center.setAttribute("font-family", "ui-sans-serif, system-ui, sans-serif");
    center.textContent = opts.caption || "quãng 5 ↑";

    target.appendChild(svg);
    return svg;
  }

  window.Diagrams = {
    noteAt,
    isNatural,
    fretboardGrid,
    noteStrip,
    chordBox,
    staff,
    fretboardPattern,
    circleOfFifths,
    interactiveFretboard,
    tuning: TUNING
  };
})();
