// chapters/syrup/chapter.js
// Group 1 — Syrup Bottle Scenes
// Exports createChapter() → { init, resize, onStepEnter }

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// ── Manifest (embedded — also used by main.js via manifest.json) ──────────────
export const MANIFEST = {
  id:        "chapter-syrup",
  title:     "The Syrup Bottle",
  order:     2,
  namespace: "syrup",
  dataFiles: [],
  steps: [
    {
      id:    "syrup-table",
      label: "To the Breakfast Table",
      text:  "Sap is collected, transported, and boiled down into maple syrup. Each step in this journey is a potential site of concentration, dilution, or filtration. What began in the environment may end up on your plate — possibly unseen and unmeasured.",
    },
    {
      id:    "syrup-reveal",
      label: "What's Inside?",
      text:  "A closer look at the syrup reveals something invisible to the naked eye. PFAS molecules and heavy metals, if present, would be suspended throughout — indistinguishable from the syrup itself.",
    },
    {
      id:    "syrup-pfas",
      label: "What Are PFAS?",
      text:  "PFAS — per- and polyfluoroalkyl substances — are a family of thousands of synthetic chemicals. Their presence in food systems is now under active scientific investigation. The question for maple syrup: are they there, and if so, at what concentrations?",
    },
    {
      id:    "syrup-zoom",
      label: "Too Small to See, Too Stable to Remove",
      text:  "Carbon–fluorine bonds are among the strongest in all of organic chemistry. PFAS are too small for conventional filters and too chemically stable for heat, water, or biology to break. That is why they earned the nickname: Forever Chemicals.",
    },
  ],
};

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  pfas:      "#4a9eff",
  metal:     "#b07fff",
  amber:     "#c97b0a",
  wood:      "#7a4520",
  woodLight: "#a0643a",
  ink:       "#1e232b",
  muted:     "#5b6675",
  light:     "#ccd4e0",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const lerp   = (a, b, t)  => a + (b - a) * t;

function fadeIn(sel, delay = 0) {
  sel.attr("opacity", 0)
    .transition().delay(delay).duration(650)
    .attr("opacity", 1);
  return sel; // always return the selection, not the transition
}

// ── Factory ───────────────────────────────────────────────────────────────────
export function createChapter() {
  let svg, w, h;
  let layers      = {};
  let particles   = [];
  let animTimer   = null;
  let currentStep = "syrup-table";

  // ── init ──────────────────────────────────────────────────────────────────
  function init(container) {
    w = container.clientWidth  || 960;
    h = container.clientHeight || 600;

    svg = d3.select(container)
      .append("svg")
      .attr("class", "syrup-svg")
      .attr("width",  w)
      .attr("height", h)
      .attr("viewBox", `0 0 ${w} ${h}`);

    _buildDefs();

    for (const name of ["bg", "scene", "particles", "labels"]) {
      layers[name] = svg.append("g").attr("class", `syrup-layer-${name}`);
    }

    layers.bg.append("rect")
      .attr("id", "syrup-bg-rect")
      .attr("width", w).attr("height", h)
      .attr("fill", "url(#sg-warm)");

    _spawnParticles();
    _renderParticles();
    showScene("syrup-table");
    animTimer = d3.timer(_tick);
  }

  // ── resize ────────────────────────────────────────────────────────────────
  function resize(newW, newH) {
    w = newW;
    h = newH;
    svg.attr("width", w).attr("height", h).attr("viewBox", `0 0 ${w} ${h}`);
    layers.bg.select("#syrup-bg-rect").attr("width", w).attr("height", h);
    if (currentStep) showScene(currentStep);
    particles.forEach(p => {
      p.x = clamp(p.x, 0, w);
      p.y = clamp(p.y, 0, h);
    });
  }

  // ── onStepEnter ───────────────────────────────────────────────────────────
  function onStepEnter(stepId /*, direction */) {
    currentStep = stepId;
    showScene(stepId);
  }

  // ── scene router ──────────────────────────────────────────────────────────
  function showScene(stepId) {
    _clearScene();
    switch (stepId) {
      case "syrup-table":  _showTable();  break;
      case "syrup-reveal": _showReveal(); break;
      case "syrup-pfas":   _showPfas();   break;
      case "syrup-zoom":   _showZoom();   break;
      default: _showTable();
    }
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  SCENES
  // ════════════════════════════════════════════════════════════════════════════

  function _showTable() {
    _setBg("sg-warm");

    // Table surface
    fadeIn(
      layers.scene.append("rect")
        .attr("x", 0).attr("y", h * 0.58)
        .attr("width", w).attr("height", h * 0.42)
        .attr("fill", "url(#sg-wood)"),
      0
    );
    layers.scene.append("rect")
      .attr("x", 0).attr("y", h * 0.58)
      .attr("width", w).attr("height", 6)
      .attr("fill", "#5e3518").attr("opacity", 0)
      .transition().delay(80).duration(400).attr("opacity", 1);

    // Plate
    layers.scene.append("ellipse")
      .attr("cx", w * 0.26).attr("cy", h * 0.695)
      .attr("rx", 68).attr("ry", 16)
      .attr("fill", "white").attr("stroke", "#ddd").attr("stroke-width", 1.5)
      .attr("opacity", 0).lower()
      .transition().delay(150).duration(500).attr("opacity", 0.9);

    // Pancake stack
    const pg = layers.scene.append("g")
      .attr("transform", `translate(${w * 0.26}, ${h * 0.68})`)
      .attr("opacity", 0);
    pg.transition().delay(200).duration(500).attr("opacity", 1);
    [0, -13, -26].forEach(dy => {
      pg.append("ellipse").attr("cy", dy).attr("rx", 52).attr("ry", 13)
        .attr("fill", "#c89540").attr("stroke", "#a06e28").attr("stroke-width", 1.2);
    });
    pg.append("ellipse").attr("cy", -32).attr("rx", 12).attr("ry", 5)
      .attr("fill", "#f5d060").attr("stroke", "#d4a800").attr("stroke-width", 1);
    pg.append("path")
      .attr("d", "M -18 -27 Q -6 -20 0 -24 Q 12 -18 20 -26 Q 28 -30 18 -34")
      .attr("fill", "none").attr("stroke", C.amber)
      .attr("stroke-width", 3.5).attr("stroke-linecap", "round").attr("opacity", 0.9);

    // Bottle
    _drawBottle(w * 0.55, h * 0.43, false, 200);

    // Labels
    fadeIn(
      layers.labels.append("text")
        .attr("x", w * 0.5).attr("y", h * 0.12)
        .attr("text-anchor", "middle")
        .attr("font-family", "Josefin Sans, sans-serif")
        .attr("font-size", clamp(w * 0.04, 20, 42))
        .attr("font-weight", 700)
        .attr("fill", C.ink)
        .attr("letter-spacing", "1px")
        .text("THE BREAKFAST TABLE"),
      300
    );
    fadeIn(
      layers.labels.append("text")
        .attr("x", w * 0.5).attr("y", h * 0.12 + clamp(w * 0.045, 26, 46))
        .attr("text-anchor", "middle")
        .attr("font-size", 13)
        .attr("font-family", "Josefin Sans")
        .attr("fill", C.muted)
        .text("The end of a long environmental journey"),
      500
    );
  }

  function _showReveal() {
    _setBg("sg-dark");

    _drawBottle(w * 0.5, h * 0.48, true, 100);

    // Magnifier ring
    const mR = clamp(Math.min(w, h) * 0.22, 80, 160);
    fadeIn(
      layers.scene.append("circle")
        .attr("cx", w * 0.5).attr("cy", h * 0.48)
        .attr("r", mR)
        .attr("fill", "none")
        .attr("stroke", "rgba(74,158,255,0.35)")
        .attr("stroke-width", 2.5)
        .attr("stroke-dasharray", "6,4"),
      500
    );

    fadeIn(
      layers.labels.append("text")
        .attr("x", w * 0.5).attr("y", h * 0.1)
        .attr("text-anchor", "middle")
        .attr("font-family", "Josefin Sans")
        .attr("font-size", clamp(w * 0.04, 20, 42))
        .attr("font-weight", 700)
        .attr("fill", "white")
        .text("WHAT'S INSIDE?"),
      200
    );
    _mkLegend(w - 130, h * 0.88);
  }

  function _showPfas() {
    _setBg("sg-dark");

    _drawBottle(w * 0.5, h * 0.48, true, 0);

    const bh = clamp(h * 0.55, 130, 250);
    const bw = bh * 0.46;
    const cx = w * 0.5, cy = h * 0.48;

    const anns = [
      { dx: -bw * 0.85, dy: -bh * 0.1,  color: C.pfas,  label: "PFAS",         sub: "Per- & polyfluoroalkyl substances" },
      { dx:  bw * 0.85, dy:  bh * 0.08, color: C.metal, label: "Heavy Metals", sub: "e.g. lead, copper, cadmium" },
      { dx: -bw * 0.8,  dy:  bh * 0.25, color: "#aaa",  label: "Maple Sap",    sub: "concentrated ×40 into syrup" },
    ];

    anns.forEach(({ dx, dy, color, label, sub }, i) => {
      const ax = cx + dx, ay = cy + dy;
      const left = dx < 0;
      const g = layers.scene.append("g").attr("opacity", 0);
      g.transition().delay(350 + i * 160).duration(500).attr("opacity", 1);

      g.append("circle").attr("cx", ax).attr("cy", ay).attr("r", 5)
        .attr("fill", color).attr("filter", "url(#sg-glow)");
      g.append("line")
        .attr("x1", ax).attr("y1", ay)
        .attr("x2", cx + (left ? -bw * 0.45 : bw * 0.45))
        .attr("y2", cy + dy * 0.4)
        .attr("stroke", color).attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,3").attr("opacity", 0.6);
      g.append("text")
        .attr("x", ax + (left ? -12 : 12)).attr("y", ay - 6)
        .attr("text-anchor", left ? "end" : "start")
        .attr("font-size", 13).attr("font-family", "Josefin Sans")
        .attr("font-weight", 700).attr("fill", color)
        .text(label);
      g.append("text")
        .attr("x", ax + (left ? -12 : 12)).attr("y", ay + 10)
        .attr("text-anchor", left ? "end" : "start")
        .attr("font-size", 10).attr("font-family", "Josefin Sans")
        .attr("fill", "#7a9ab8")
        .text(sub);
    });

    fadeIn(
      layers.labels.append("text")
        .attr("x", w * 0.5).attr("y", h * 0.1)
        .attr("text-anchor", "middle")
        .attr("font-family", "Josefin Sans")
        .attr("font-size", clamp(w * 0.04, 20, 42))
        .attr("font-weight", 700)
        .attr("fill", "white")
        .text("WHAT ARE PFAS?"),
      100
    );
    _mkLegend(w - 130, h * 0.88);
  }

  function _showZoom() {
    _setBg("sg-dark");

    // Ghost bottle behind chain
    _drawBottle(w * 0.5, h * 0.48, false, 0, 0.22);

    // C–F bond chain
    const chainY = h * 0.46;
    const atoms  = [
      { lbl: "C", color: "#4a4a4a", stroke: "#888" },
      { lbl: "C", color: "#4a4a4a", stroke: "#888" },
      { lbl: "C", color: "#4a4a4a", stroke: "#888" },
      { lbl: "C", color: "#4a4a4a", stroke: "#888" },
      { lbl: "F", color: "#1a6b35", stroke: "#27ae60" },
    ];
    const spc = 38, r = 15;
    const totalW = (atoms.length - 1) * spc;
    const startX = w * 0.5 - totalW / 2;

    const chainG = layers.scene.append("g").attr("opacity", 0);
    chainG.transition().delay(150).duration(600).attr("opacity", 1);

    atoms.forEach((a, i) => {
      const ax = startX + i * spc;
      if (i > 0) {
        const isCF = i === atoms.length - 1;
        chainG.append("line")
          .attr("x1", startX + (i - 1) * spc + r).attr("y1", chainY)
          .attr("x2", ax - r).attr("y2", chainY)
          .attr("stroke", isCF ? "#27ae60" : "#666")
          .attr("stroke-width", isCF ? 4 : 2.5);
      }
      chainG.append("circle").attr("cx", ax).attr("cy", chainY).attr("r", r)
        .attr("fill", a.color).attr("stroke", a.stroke).attr("stroke-width", 2);
      chainG.append("text").attr("x", ax).attr("y", chainY + 5)
        .attr("text-anchor", "middle").attr("font-size", 12).attr("font-weight", 700)
        .attr("fill", "white").text(a.lbl);
    });

    fadeIn(
      layers.scene.append("text")
        .attr("x", w * 0.5).attr("y", chainY - 28)
        .attr("text-anchor", "middle")
        .attr("font-size", 12).attr("font-family", "Josefin Sans")
        .attr("fill", "#27ae60")
        .text("C–F bond: one of the strongest in organic chemistry"),
      350
    );

    // Filter mesh
    const mw = 24, meshH = h * 0.28, rows = Math.ceil(meshH / mw);
    const meshX = w * 0.5 - mw * 1.5, meshY = chainY + 55;
    const meshG = layers.scene.append("g").attr("opacity", 0);
    meshG.transition().delay(500).duration(500).attr("opacity", 1);
    for (let row = 0; row <= rows; row++) {
      meshG.append("line")
        .attr("x1", meshX).attr("y1", meshY + row * mw)
        .attr("x2", meshX + mw * 3).attr("y2", meshY + row * mw)
        .attr("stroke", "#555").attr("stroke-width", 1.5);
    }
    for (let col = 0; col <= 3; col++) {
      meshG.append("line")
        .attr("x1", meshX + col * mw).attr("y1", meshY)
        .attr("x2", meshX + col * mw).attr("y2", meshY + meshH)
        .attr("stroke", "#555").attr("stroke-width", 1.5);
    }
    fadeIn(
      layers.labels.append("text")
        .attr("x", w * 0.5).attr("y", meshY - 12)
        .attr("text-anchor", "middle")
        .attr("font-size", 11).attr("font-family", "Josefin Sans")
        .attr("fill", "#666")
        .text("← too small to filter →"),
      600
    );

    // "Forever Chemicals" badge
    fadeIn(
      layers.labels.append("text")
        .attr("x", w * 0.5).attr("y", h * 0.14)
        .attr("text-anchor", "middle")
        .attr("font-family", "Josefin Sans")
        .attr("font-size", clamp(w * 0.038, 18, 40))
        .attr("font-weight", 700)
        .attr("fill", C.pfas)
        .text('"Forever Chemicals"'),
      0
    );
    fadeIn(
      layers.labels.append("text")
        .attr("x", w * 0.5).attr("y", h * 0.14 + 26)
        .attr("text-anchor", "middle")
        .attr("font-size", 12).attr("font-family", "Josefin Sans")
        .attr("fill", "#7a9ab8")
        .text("Resistant to heat · water · biology"),
      200
    );
    _mkLegend(w - 130, h * 0.88);
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  DRAWING HELPERS
  // ════════════════════════════════════════════════════════════════════════════

  function _drawBottle(cx, cy, showDots, delay = 0, opacity = 1) {
    const bh = clamp(h * 0.55, 130, 250);
    const bw = bh * 0.46;

    const g = layers.scene.append("g")
      .attr("transform", `translate(${cx}, ${cy})`)
      .attr("opacity", 0);
    g.transition().delay(delay).duration(600).attr("opacity", opacity);

    // Drop shadow
    g.append("ellipse")
      .attr("cx", 0).attr("cy", bh * 0.51)
      .attr("rx", bw * 0.55).attr("ry", 8)
      .attr("fill", "rgba(0,0,0,0.18)");

    const bodyPath = `
      M-${bw*.3},-${bh*.52}
      L-${bw*.3},-${bh*.36}
      L-${bw*.5},-${bh*.28}
      L-${bw*.5}, ${bh*.44}
      Q-${bw*.5}, ${bh*.5}  0,${bh*.5}
      Q ${bw*.5}, ${bh*.5}  ${bw*.5},${bh*.44}
      L ${bw*.5},-${bh*.28}
      L ${bw*.3},-${bh*.36}
      L ${bw*.3},-${bh*.52}Z
    `;

    // Syrup fill
    g.append("path").attr("d", bodyPath).attr("fill", "url(#sg-syrup2)");

    // Shine highlight
    g.append("path")
      .attr("d", `M-${bw*.38},-${bh*.44} L-${bw*.38},-${bh*.1} Q-${bw*.36},${bh*.14} -${bw*.28},${bh*.18}`)
      .attr("fill", "none")
      .attr("stroke", "rgba(255,255,255,0.28)")
      .attr("stroke-width", bw * 0.09)
      .attr("stroke-linecap", "round");

    // Outline
    g.append("path").attr("d", bodyPath)
      .attr("fill", "none").attr("stroke", "#6b3a00").attr("stroke-width", 2);

    // Cap
    g.append("rect")
      .attr("x", -bw * .3).attr("y", -bh * .58)
      .attr("width", bw * .6).attr("height", bh * .07)
      .attr("fill", "#cc1f00").attr("rx", 4);
    g.append("rect")
      .attr("x", -bw * .28).attr("y", -bh * .57)
      .attr("width", bw * .12).attr("height", bh * .05)
      .attr("fill", "rgba(255,255,255,0.2)").attr("rx", 2);

    // Handle
    g.append("path")
      .attr("d", `M${bw*.3},-${bh*.3} Q${bw*.74},-${bh*.18} ${bw*.3},-${bh*.04}`)
      .attr("fill", "none").attr("stroke", C.woodLight)
      .attr("stroke-width", bw * .14).attr("stroke-linecap", "round");
    g.append("path")
      .attr("d", `M${bw*.3},-${bh*.3} Q${bw*.74},-${bh*.18} ${bw*.3},-${bh*.04}`)
      .attr("fill", "none").attr("stroke", C.wood)
      .attr("stroke-width", bw * .06).attr("stroke-linecap", "round");

    // Label sticker
    g.append("ellipse")
      .attr("cx", 0).attr("cy", bh * 0.1)
      .attr("rx", bw * 0.3).attr("ry", bh * 0.12)
      .attr("fill", "#f0e0c0").attr("stroke", "#c89040").attr("stroke-width", 1.2);
    g.append("text")
      .attr("x", 0).attr("y", bh * 0.07)
      .attr("text-anchor", "middle").attr("font-size", bh * 0.045)
      .attr("font-family", "Josefin Sans").attr("font-weight", 700)
      .attr("fill", C.wood).text("MAPLE");
    g.append("text")
      .attr("x", 0).attr("y", bh * 0.07 + bh * 0.05)
      .attr("text-anchor", "middle").attr("font-size", bh * 0.036)
      .attr("font-family", "Josefin Sans")
      .attr("fill", "#a06030").text("SYRUP");

    // Dots (for reveal + pfas scenes)
    if (showDots) {
      d3.range(28).forEach(i => {
        g.append("circle")
          .attr("cx", (Math.random() - 0.5) * bw * 0.7)
          .attr("cy", (Math.random() - 0.46) * bh * 0.7 + bh * 0.08)
          .attr("r",  3.5 + Math.random() * 2.2)
          .attr("fill", i < 18 ? C.pfas : C.metal)
          .attr("filter", "url(#sg-glow)")
          .attr("opacity", 0.82);
      });
    }
  }

  function _mkLegend(x, y) {
    const lg = layers.labels.append("g")
      .attr("transform", `translate(${x},${y})`).attr("opacity", 0);
    lg.transition().delay(600).duration(500).attr("opacity", 1);

    lg.append("circle").attr("r", 6).attr("cx", 0).attr("cy",  0).attr("fill", C.pfas).attr("filter",  "url(#sg-glow)");
    lg.append("text").attr("x", 13).attr("y",  4).attr("font-size", 11).attr("font-family", "Josefin Sans").attr("fill", C.light).text("PFAS");
    lg.append("circle").attr("r", 6).attr("cx", 0).attr("cy", 22).attr("fill", C.metal).attr("filter", "url(#sg-glow)");
    lg.append("text").attr("x", 13).attr("y", 26).attr("font-size", 11).attr("font-family", "Josefin Sans").attr("fill", C.light).text("Heavy Metals");
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  SVG INTERNALS
  // ════════════════════════════════════════════════════════════════════════════

  function _buildDefs() {
    const defs = svg.append("defs");

    _mkGrad(defs, "sg-warm",   [[0, "#e8d4b0"], [100, "#c9a868"]], "v");
    _mkGrad(defs, "sg-dark",   [[0, "#0a1828"], [100, "#111820"]], "v");
    _mkGrad(defs, "sg-syrup",  [[0, "#d4840c"], [100, "#7a4500"]], "v");
    _mkGrad(defs, "sg-syrup2", [[0, "#e8940e"], [50, "#c07a0a"], [100, "#7a4500"]], "v");
    _mkGrad(defs, "sg-wood",   [[0, "#9b6030"], [100, "#5e3518"]], "v");

    const glow = defs.append("filter").attr("id", "sg-glow")
      .attr("x", "-80%").attr("y", "-80%").attr("width", "260%").attr("height", "260%");
    glow.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", "3").attr("result", "b");
    const m = glow.append("feMerge");
    m.append("feMergeNode").attr("in", "b");
    m.append("feMergeNode").attr("in", "SourceGraphic");

    const softGlow = defs.append("filter").attr("id", "sg-softglow")
      .attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    softGlow.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", "1.8").attr("result", "b2");
    const m2 = softGlow.append("feMerge");
    m2.append("feMergeNode").attr("in", "b2");
    m2.append("feMergeNode").attr("in", "SourceGraphic");
  }

  function _mkGrad(defs, id, stops, dir) {
    const g = defs.append("linearGradient").attr("id", id)
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", dir === "h" ? 1 : 0)
      .attr("y2", dir === "h" ? 0 : 1);
    stops.forEach(([pct, color]) =>
      g.append("stop").attr("offset", `${pct}%`).attr("stop-color", color)
    );
  }

  function _clearScene() {
    layers.scene.selectAll("*").interrupt().remove();
    layers.labels.selectAll("*").interrupt().remove();
  }

  function _setBg(gradId) {
    layers.bg.select("#syrup-bg-rect")
      .transition().duration(800)
      .attr("fill", `url(#${gradId})`);
  }

  // ── Particle system ────────────────────────────────────────────────────────

  function _spawnParticles() {
    particles = [
      ...d3.range(60).map(i =>      _mkPt(i,      "pfas")),
      ...d3.range(35).map(i =>      _mkPt(60 + i, "metal")),
    ];
  }

  function _mkPt(id, type) {
    return {
      id, type,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r:  2.2 + Math.random() * 2.5,
      alpha: 0,
      targetAlpha: 0,
      phase: Math.random() * Math.PI * 2,
      spd:   0.3 + Math.random() * 0.7,
    };
  }

  function _renderParticles() {
    layers.particles.selectAll("circle.sg-pt")
      .data(particles, d => d.id)
      .join("circle")
      .attr("class", "sg-pt")
      .attr("r",    d => d.r)
      .attr("fill", d => d.type === "pfas" ? C.pfas : C.metal)
      .attr("filter", "url(#sg-softglow)");
  }

  function _tick() {
    const s  = currentStep;
    const cx = w * 0.5;
    const cy = h * 0.48;
    const bh = clamp(h * 0.55, 130, 250);
    const bw = bh * 0.46;

    particles.forEach(p => {
      p.phase += 0.016;

      if (s === "syrup-table") {
        p.x += p.vx * 0.3;
        p.y += p.vy * 0.3;
        p.targetAlpha = 0;

      } else if (s === "syrup-reveal") {
        const tx = cx + (Math.random() - 0.5) * bw * 0.6;
        const ty = cy + (Math.random() - 0.5) * bh * 0.45;
        p.x = lerp(p.x, tx, 0.018);
        p.y = lerp(p.y, ty, 0.018);
        p.x += Math.sin(p.phase + p.id * 0.3) * 0.5;
        p.y += Math.cos(p.phase + p.id * 0.2) * 0.5;
        p.targetAlpha = 0.7 + Math.random() * 0.25;

      } else if (s === "syrup-pfas") {
        const orb = 12 + (p.id % 40) * 1.4;
        const ang = p.phase * 0.6 + p.id * 0.22;
        p.x = lerp(p.x, cx + Math.cos(ang) * orb, 0.04);
        p.y = lerp(p.y, cy + Math.sin(ang) * orb * 0.55 + bh * 0.04, 0.04);
        p.targetAlpha = 0.8;

      } else if (s === "syrup-zoom") {
        const ang2 = (p.id / particles.length) * Math.PI * 2 + p.phase * 0.01;
        const dist = 40 + (p.id % 50) * 3.2;
        p.x = lerp(p.x, cx + Math.cos(ang2) * dist, 0.03);
        p.y = lerp(p.y, cy + Math.sin(ang2) * dist * 0.7, 0.03);
        p.targetAlpha = 0.85;
      }

      p.alpha = lerp(p.alpha, p.targetAlpha, 0.06);

      if (p.x >  w + 20) p.x = -20;
      if (p.x < -20)     p.x =  w + 20;
      if (p.y >  h + 20) p.y = -20;
      if (p.y < -20)     p.y =  h + 20;
    });

    layers.particles.selectAll("circle.sg-pt")
      .attr("cx",      d => d.x)
      .attr("cy",      d => d.y)
      .attr("opacity", d => d.alpha);
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  return { init, resize, onStepEnter };
}
