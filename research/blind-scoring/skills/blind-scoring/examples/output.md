# Example output (synthetic)

## protocol.md

Rubric: Hollowpine 10-point clarity checklist, v2. Runs: 4. Scorers: one fresh model session per run, one pass per text. Versions per run: original, tighten.

## key.json (kept from scorers)

```json
{"d1": {"X": "tighten", "Y": "original"},
 "d2": {"X": "original", "Y": "tighten"},
 "d3": {"X": "original", "Y": "tighten"},
 "d4": {"X": "tighten", "Y": "original"}}
```

## report.md

| run | original | tighten | difference |
|---|---|---|---|
| d1 | 6 | 8 | +2 |
| d2 | 7 | 7 | 0 |
| d3 | 5 | 8 | +3 |
| d4 | 8 | 7 | -1 |
| mean | 6.5 | 7.5 | +1.0 |

Three of four runs went up or stayed level. One went down by one point.

Sample size: n = 4 drafts, one scorer pass each, one rubric.

What this shows: a modest lead for the tighten prompt on these four drafts.

What it cannot show: a general effect, an effect on other kinds of email, or that the prompt causes the gain. A one-point gap is within the checklist's likely variance, since one scorer decision moves one point. Run more drafts and repeat the scoring before you adopt the prompt.

Blinding note: the tighten outputs are shorter. A scorer may guess which file is the edit from length alone, so the blinding is partial.
