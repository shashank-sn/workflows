# workflows repo

- Every image in this repo follows [DESIGN.md](DESIGN.md): the stupidpreneur look (Allo, the `#f5f5f5` ground, ink, one lime accent, the mint highlighter) with minimal one-time motion. This is the default for every new or changed image.
- Do not edit a generated `.svg`. Change its `.mmd` source, `scripts/assets.mjs` or `scripts/design.mjs`, then run `npm run figures`.
- Before a pull request, run `npm run figures:check` and `python3 scripts/check.py`. Both must pass.
