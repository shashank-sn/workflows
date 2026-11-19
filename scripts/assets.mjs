// Builds assets/header.svg and assets/topic-<name>.svg from data, so the counts
// and skill lists always match .claude-plugin/marketplace.json.
import { readFileSync } from "node:fs";
import { C, RADIUS, FONT, REDUCED, FADE, rise, wipe, measure, esc } from "./design.mjs";

// Topic order, the blurb on each card (also on the home README), and an icon
// drawn in ink, centred on (0, 0) inside a 76 by 52 box.
export const TOPICS = [
  {
    name: "build",
    blurb: ["shipping code with a coding agent,", "with a gate and evidence at every stage."],
    icon: '<path d="M-18 -20 L-38 0 L-18 20 M18 -20 L38 0 L18 20 M8 -26 L-8 26"/>',
  },
  {
    name: "write",
    blurb: ["writing with ai that still sounds like you,", "and gets checked before anyone reads it."],
    icon: '<path d="M-38 -16 H38 M-38 0 H22 M-38 16 H2"/><circle cx="34" cy="16" r="5" fill="INK" stroke="none"/>',
  },
  {
    name: "research",
    blurb: ["turning a noisy system into a number", "you can defend."],
    icon:
      '<path d="M-39 24 H39"/><path d="M-39 -4 H39" stroke-dasharray="4 4"/>' +
      '<rect x="-33" y="2" width="12" height="22" fill="INK" stroke="none"/>' +
      '<rect x="-13" y="-12" width="12" height="36"/>' +
      '<rect x="7" y="-24" width="12" height="48" fill="INK" stroke="none"/>',
  },
  {
    name: "operate",
    blurb: ["the unglamorous fixes that keep a", "small business running."],
    icon: '<path d="M-35 -15 h20 v20 h-20 z M-5 3 h20 v20 h-20 z M15 -23 h20 v20 h-20 z M-15 -5 L-5 13 M15 13 L25 -3"/>',
  },
  {
    name: "presence",
    blurb: ["getting a company's facts right on every", "place buyers and ai tools read."],
    icon: '<circle r="26"/><circle r="15"/><circle r="5" fill="INK" stroke="none"/>',
  },
];

function plugins() {
  return JSON.parse(readFileSync(".claude-plugin/marketplace.json", "utf8")).plugins;
}

function skillsOf(topic) {
  return plugins()
    .filter((p) => p.category === topic)
    .map((p) => p.name);
}

function svg(w, h, label, css, body) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" ` +
    `aria-label="${esc(label)}" font-family="${esc(FONT)}"><title>${esc(label)}</title>` +
    `<style>${FADE}${css}${REDUCED}</style>` +
    `<rect class="paper" width="${w}" height="${h}" rx="${RADIUS}" fill="${C.ground}"/>${body}</svg>`
  );
}

// The badge: an icon in ink on a lime disc with an offset ink shadow.
function badge(cx, cy, icon, r = 44) {
  return (
    `<circle cx="${cx + 5}" cy="${cy + 5}" r="${r}" fill="${C.ink}"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.lime}" stroke="${C.ink}" stroke-width="2.5"/>` +
    `<g transform="translate(${cx} ${cy}) scale(.62)" fill="none" stroke="${C.ink}" stroke-width="4" ` +
    `stroke-linecap="round" stroke-linejoin="round">${icon.replaceAll("INK", C.ink)}</g>`
  );
}

function check(width, limit, what) {
  if (width > limit) throw new Error(`${what} is ${Math.round(width)}px, over its ${limit}px slot`);
}

export function topicCard(topic) {
  const W = 620, H = 250, X = 36, R = W - 36;
  const skills = skillsOf(topic.name);
  const n = skills.length;
  const count = `${n} workflow${n === 1 ? "" : "s"} →`;
  const list = `skill${n === 1 ? "" : "s"}: ${skills.join(" · ")}`;
  const titleW = measure(topic.name, 44, 800) - topic.name.length * 0.88;
  topic.blurb.forEach((line) => check(measure(line, 19, 400), R - X - 110, `${topic.name} blurb`));
  check(measure(list, 15, 500), R - X, `${topic.name} skill list`);
  const css =
    wipe("#hl", 0.25) +
    rise("#tt", 0.05) +
    rise("#bl", 0.2) +
    rise("#ft", 0.35) +
    `#bd{animation:fade .5s .1s both}`;
  const body =
    `<rect id="hl" x="${X - 4}" y="50" width="${(titleW + 8).toFixed(1)}" height="24" rx="3" fill="${C.mint}"/>` +
    `<g id="tt"><text x="${X}" y="72" font-size="44" font-weight="800" letter-spacing="-0.88" fill="${C.ink}">${topic.name}</text></g>` +
    `<g id="bd">${badge(R - 46, 66, topic.icon)}</g>` +
    `<g id="bl">` +
    topic.blurb
      .map((line, i) => `<text x="${X}" y="${116 + i * 26}" font-size="19" fill="${C.ink}">${esc(line)}</text>`)
      .join("") +
    `</g>` +
    `<g id="ft"><rect x="${X}" y="174" width="${R - X}" height="1" fill="${C.hairline}"/>` +
    `<text x="${X}" y="204" font-size="17" font-weight="800" fill="${C.ink}">${count}</text>` +
    `<text x="${X}" y="228" font-size="15" font-weight="500" fill="${C.muted}">${esc(list)}</text></g>`;
  return svg(W, H, `${topic.name}: ${topic.blurb.join(" ")} ${count.replace(" →", "")}: ${skills.join(", ")}.`, css, body);
}

export function header() {
  const W = 880, H = 300, X = 40;
  const all = plugins();
  const rows = TOPICS.map((t, i) => ({ ...t, n: all.filter((p) => p.category === t.name).length, i }));
  const total = all.length;
  const lead = "real workflows, written down ";
  const key = "step by step.";
  const leadW = measure(lead, 18, 400);
  const keyW = measure(key, 18, 800);
  check(leadW + keyW, 440, "header line 1");
  check(measure("every one comes with an agent skill you can install.", 18, 400), 440, "header line 2");
  const rx = 520, rw = W - 40 - rx;
  const titleW = measure("workflows", 64, 800) - 9 * 1.28;
  const waves = Math.max(1, Math.round((titleW - 8) / 52));
  const squiggle = `M${X + 4} 124 q 26 9 52 0` + " t 52 0".repeat(waves - 1);
  let css = rise("#hd", 0.05) + rise("#sb", 0.2) + wipe("#hl", 0.45) + rise("#by", 0.35);
  let body =
    `<g id="hd"><text x="${X}" y="104" font-size="64" font-weight="800" letter-spacing="-1.28" fill="${C.ink}">workflows</text>` +
    `<path d="${squiggle}" fill="none" stroke="${C.ink}" stroke-width="2.6" stroke-linecap="round"/></g>` +
    `<rect id="hl" x="${(X + leadW - 3).toFixed(1)}" y="${158}" width="${(keyW + 6).toFixed(1)}" height="22" rx="3" fill="${C.mint}"/>` +
    `<g id="sb"><text x="${X}" y="175" font-size="18" fill="${C.ink}">${lead}<tspan font-weight="800">${key}</tspan></text>` +
    `<text x="${X}" y="201" font-size="18" fill="${C.ink}">every one comes with an agent skill you can install.</text></g>` +
    `<g id="by"><text x="${X}" y="258" font-size="14" font-weight="500" fill="${C.muted}">shashank sn · stupidpreneur · co-founder, ellora · ${total} skills</text></g>`;
  for (const t of rows) {
    const y = 40 + t.i * 46;
    const label = `${t.n} workflow${t.n === 1 ? "" : "s"}`;
    body +=
      `<g id="r${t.i}"><rect x="${rx}" y="${y}" width="${rw}" height="38" rx="10" fill="${C.card}" stroke="${C.hairline}"/>` +
      `<circle cx="${rx + 24}" cy="${y + 19}" r="12" fill="${C.lime}" stroke="${C.ink}" stroke-width="1.8"/>` +
      `<text x="${rx + 24}" y="${y + 23.5}" text-anchor="middle" font-size="12.5" font-weight="800" fill="${C.ink}">0${t.i + 1}</text>` +
      `<text x="${rx + 48}" y="${y + 24.5}" font-size="17" font-weight="500" fill="${C.ink}">${t.name}</text>` +
      `<text x="${rx + rw - 16}" y="${y + 24}" text-anchor="end" font-size="13" font-weight="500" fill="${C.muted}">${label}</text></g>`;
    css += rise(`#r${t.i}`, 0.3 + t.i * 0.08, 8, 0.5);
  }
  return svg(W, H, `workflows: real workflows, written down step by step. every one comes with an agent skill you can install. ${total} skills in ${TOPICS.length} topics.`, css, body);
}
