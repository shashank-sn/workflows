// The repo's one visual system, shared by every image: the stupidpreneur look
// (same as shashank-sn/stupidpreneur-newsletter). DESIGN.md explains the rules.
//
// Allo (SIL OFL 1.1, fonts/OFL.txt) in three weights, a light grey ground with
// round corners, near-black ink, one lime accent that always carries an ink
// outline, a mint highlighter, and short one-time motion that rests in its
// final state and switches off for reduced motion.
import { readFileSync } from "node:fs";
import opentype from "opentype.js";
import subsetFont from "subset-font";
import fontverter from "fontverter";

export const C = {
  ground: "#f5f5f5", // behind every image
  card: "#ffffff", // things that sit on the ground
  ink: "#0a0a0a",
  muted: "#5f5f5f",
  hairline: "#e6e6e6",
  lime: "#7cf542", // the accent, always with an ink outline or ink on it
  mint: "#d4f7c4", // the highlighter behind a key phrase
};
export const RADIUS = 14; // ground corners
export const FAMILY = "allo";
export const FONT = `'${FAMILY}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`;
export const WEIGHTS = { 400: "Allo-Regular.woff2", 500: "Allo-Medium.woff2", 800: "Allo-ExtraBold.woff2" };
export const EASE = "cubic-bezier(.2,.7,.2,1)";
export const REDUCED = "@media (prefers-reduced-motion:reduce){*{animation:none!important}}";

const FILES = Object.fromEntries(Object.entries(WEIGHTS).map(([w, f]) => [w, readFileSync(`fonts/${f}`)]));
const PARSED = {};
for (const [w, buf] of Object.entries(FILES)) {
  const sfnt = await fontverter.convert(buf, "sfnt");
  PARSED[w] = opentype.parse(sfnt.buffer.slice(sfnt.byteOffset, sfnt.byteOffset + sfnt.byteLength));
}

// Map any requested weight to the Allo weight a browser would pick.
export function allo(weight) {
  const w = Number(weight === "bold" ? 700 : weight || 400);
  return w >= 600 ? 800 : w >= 500 ? 500 : 400;
}

export function measure(text, size, weight = 400) {
  return PARSED[allo(weight)].getAdvanceWidth(text, size);
}

function decode(text) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");
}

// Embed a WOFF2 subset of each Allo weight the SVG uses, with only its glyphs.
export async function embedFont(svg) {
  svg = svg.replace(/<style id="embedded-font">[\s\S]*?<\/style>/, "");
  const body = svg.replace(/<title[\s\S]*?<\/title>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
  const chars = new Set();
  for (const [, inner] of body.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)) {
    for (const ch of decode(inner.replace(/<[^>]+>/g, ""))) chars.add(ch);
  }
  if (!chars.size) return svg;
  const text = [...chars].join("") + " ";
  const used = new Set([400]);
  for (const [, w] of svg.matchAll(/font-weight(?:="|:\s*)(bold|\d+)/g)) used.add(allo(w));
  let faces = "";
  for (const w of Object.keys(WEIGHTS).map(Number).filter((w) => used.has(w))) {
    const woff2 = await subsetFont(FILES[w], text, { targetFormat: "woff2" });
    faces += `@font-face{font-family:'${FAMILY}';font-weight:${w};font-style:normal;src:url(data:font/woff2;base64,${woff2.toString("base64")}) format('woff2')}`;
  }
  return svg.replace(/^(<svg[^>]*>)/, `$1<style id="embedded-font">${faces}</style>`);
}

// One-time motion: a group rises into place, or a highlighter wipes in.
// Every animated thing is already in its final place at rest.
export function rise(selector, delay, dist = 10, dur = 0.6) {
  const name = "u" + selector.replace(/\W/g, "");
  return (
    `@keyframes ${name}{from{opacity:0;transform:translateY(${dist}px)}to{opacity:1;transform:none}}` +
    `${selector}{animation:${name} ${dur}s ${delay.toFixed(2)}s both ${EASE}}`
  );
}
export function fade(selector, delay, dur = 0.5) {
  return `${selector}{animation:fade ${dur}s ${delay.toFixed(2)}s both ${EASE}}`;
}
export const FADE = "@keyframes fade{from{opacity:0}to{opacity:1}}";
export function wipe(selector, delay, dur = 0.6) {
  return (
    `@keyframes wipe{from{transform:scaleX(0)}to{transform:none}}` +
    `${selector}{transform-box:fill-box;transform-origin:left center;animation:wipe ${dur}s ${delay.toFixed(2)}s both ${EASE}}`
  );
}

export function esc(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
