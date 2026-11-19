# design

every image in this repo uses one look: the stupidpreneur look, the same as [shashank-sn/stupidpreneur-newsletter](https://github.com/shashank-sn/stupidpreneur-newsletter). this is the default for every new image. `scripts/check.py` fails a pull request with an image outside it.

## how images are made

- you never draw or edit an `.svg` by hand. you change its source and run `npm run figures`.
- a figure in a post comes from a Mermaid file: `<topic>/<workflow>/figures/<name>.mmd`.
- the header and the topic cards come from `scripts/assets.mjs` and `.claude-plugin/marketplace.json`. their counts and skill lists update themselves.
- `scripts/design.mjs` holds the look: colours, font, motion. change the look there, once, for every image.

## the look

- **font:** allo (`fonts/`, sil ofl 1.1), in 400, 500 and 800. each svg embeds a subset with only its own glyphs, because github shows svgs as images that cannot load web fonts.
- **ground:** `#f5f5f5`, with 14px round corners. it keeps the image readable in github's dark mode.
- **ink:** `#0a0a0a` for text and lines. `#5f5f5f` for quiet text.
- **cards and rows:** `#ffffff`, with a `#e6e6e6` hairline.
- **accent:** lime `#7cf542`, always with an ink outline or ink on top. use it once per image, on the one thing that matters.
- **highlighter:** mint `#d4f7c4`, behind one key phrase.
- **type:** lowercase. headings at 800 with tight letter spacing. no other fonts and no other colours.

## figures

- write the Mermaid in lowercase, with `<br/>` for line breaks.
- mark exactly one node as the key node, and put the `classDef` last:

```text
classDef key fill:#7cf542,color:#0a0a0a,stroke:#0a0a0a
class X key
```

- a long, thin chain reads badly at github's width. use `flowchart TB` for a chain of more than four steps.

## motion

motion is minimal and plays once.

- nodes fade in one after another. a card's parts rise into place. a highlighter wipes in under its phrase.
- every animation ends in its final state. a still frame of any image is the finished picture.
- every svg switches motion off for `prefers-reduced-motion`.
- motion is css only: no scripts, no loops that never stop, nothing that blinks.
- add motion only where it shows an order or points at the key part. when in doubt, leave it still.

## before a pull request

```text
npm run figures
npm run figures:check
python3 scripts/check.py
```
