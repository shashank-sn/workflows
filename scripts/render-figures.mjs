// Renders every image in the repo in the stupidpreneur look (see DESIGN.md):
//
//   */*/figures/*.mmd   Mermaid sources, laid out by Pele, into .svg next to them
//   assets/header.svg   the home header, built from .claude-plugin/marketplace.json
//   assets/topic-*.svg  one card per topic, with its live count and skill list
//
//   npm install            (once)
//   npm run figures        render every image
//   npm run figures:check  fail if any .svg is out of date
//
// GitHub shows SVGs as images, which cannot load web fonts, page CSS or
// scripts, so each file carries its own Allo subset, its own colours and its
// own CSS motion. Never edit a generated .svg by hand. Change the source.
import { readFileSync, writeFileSync, globSync } from "node:fs";
import { render } from "pele";
import { C, RADIUS, FONT, REDUCED, FADE, EASE, measure, embedFont } from "./design.mjs";
import { TOPICS, header, topicCard } from "./assets.mjs";

const THEME = {
  bg: C.ground,
  fg: C.ink,
  muted: C.muted,
  line: C.ink,
  surface: C.card,
  "surface-alt": C.ground,
  border: C.ink,
  accent: C.lime,
  critical: C.ink,
  error: C.ink,
  radius: "10px",
};

// Pele lays out boxes from text widths, so measure with the real font.
// style bits: 1 bold, 2 italic, 4 monospace.
const measurer = {
  width(text, size, style) {
    if (style & 4) return text.length * size * 0.6;
    return measure(text, size, style & 1 ? 800 : 400);
  },
};

// Pele themes through CSS custom properties. Some SVG renderers (link previews,
// Apple's CoreSVG) ignore them, so resolve every var() to a literal value.
function resolveVars(svg) {
  svg = svg.replace(/var\(--pele-([a-z-]+),((?:[^()]|\([^()]*\))*)\)/g, (_, name, fallback) => THEME[name] ?? fallback.trim());
  const aliases = {};
  for (const [, name, value] of svg.matchAll(/(--_[a-z]+):([^;"]+)/g)) aliases[name] = value.trim();
  svg = svg.replace(/var\((--_[a-z]+)\)/g, (whole, name) => aliases[name] ?? whole);
  svg = svg.replace(/--_[a-z]+:[^;"]+;?/g, "");
  svg = svg.replace(/style="rx:([\d.]+)px"/g, 'rx="$1" ry="$1"');
  if (/var\(/.test(svg)) throw new Error("unresolved var() left in figure");
  return svg;
}

// One-time motion for a figure: nodes fade in one after another in source
// order, then the edges. Pele positions nodes with a transform attribute, so
// only opacity moves. Everything rests in place, and reduced motion skips it.
function figureMotion(svg) {
  const nodes = (svg.match(/class="pele-node\b/g) || []).length;
  const step = Math.min(0.09, 0.9 / Math.max(nodes, 1));
  let css = FADE + `.pele-nodes>g{animation:fade .45s both ${EASE}}`;
  for (let i = 1; i <= nodes; i++) css += `.pele-nodes>g:nth-child(${i}){animation-delay:${(0.1 + (i - 1) * step).toFixed(2)}s}`;
  css += `.pele-edges{animation:fade .5s ${(0.25 + nodes * step).toFixed(2)}s both ${EASE}}`;
  return `<style id="motion">${css}${REDUCED}</style>`;
}

async function renderFigure(source) {
  const { svg } = render(source, {
    fontFamily: FONT,
    fontSize: 15,
    padding: 28,
    responsive: false,
    autoDirection: false,
    measurer,
  });
  let themed = resolveVars(svg);
  themed = themed.replace(/font-weight="bold"/g, 'font-weight="800"');
  themed = themed.replace(
    /^(<svg[^>]*>)/,
    `$1${figureMotion(themed)}<rect class="paper" width="100%" height="100%" rx="${RADIUS}" fill="${C.ground}"/>`,
  );
  return (await embedFont(themed)) + "\n";
}

const check = process.argv.includes("--check");
const stale = [];
async function update(path, next) {
  let current = "";
  try {
    current = readFileSync(path, "utf8");
  } catch {}
  if (current === next) return;
  if (check) stale.push(path);
  else {
    writeFileSync(path, next);
    console.log("wrote", path);
  }
}

for (const mmd of globSync("*/*/figures/*.mmd").sort()) {
  await update(mmd.replace(/\.mmd$/, ".svg"), await renderFigure(readFileSync(mmd, "utf8")));
}
await update("assets/header.svg", (await embedFont(header())) + "\n");
for (const topic of TOPICS) {
  await update(`assets/topic-${topic.name}.svg`, (await embedFont(topicCard(topic))) + "\n");
}

if (check && stale.length) {
  console.error(`out of date (run npm run figures): ${stale.join(", ")}`);
  process.exit(1);
}
if (check) console.log("figures are up to date");
