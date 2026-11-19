---
name: blind-scoring
description: >-
  Compares versions of a text (original against edited, or edit A against edit
  B) without letting the scorer know which version is which. Shuffles each run's
  versions to neutral labels, keeps the key in a separate file, uses a fresh
  scorer per run with one fixed rubric or tool, and reports per run and the mean
  with the sample size and its limits. Use when asked to "score these edits
  blind", "compare the original and the rewrite", "A/B two edits", or to check
  whether an edit really improved a text.
license: MIT
metadata:
  author: Shashank SN
  version: "1.1.0"
  source: https://github.com/shashank-sn/workflows
---

# Blind scoring

When a scorer knows which text is the edit, the score is not a score. This skill hides the label: neutral names, random order, a fresh scorer, one fixed rubric, and a key the scorer never sees.

## When to use this

- "compare the original and the rewrite" or "A/B edit A against edit B"
- before you claim that a prompt, tool or editing pass makes writing better

## What you need

- Several source texts, each with two or more versions (the original and each edit). One text is one run.
- One fixed rubric or scoring tool, with its version written down.
- A way to start a fresh scorer for each run (a new session or subagent). It may be a human or a model.
- A folder you control. `scripts/shuffle.py` works, or any tool that shuffles and keeps a key.

## The process

"Stop if" means: do not go on. Fix the input, or report the problem to the requester, then restart that step.

1. **Name the versions.** Give each version a stable file name per run, for example `original.md`, `edit-a.md`, `edit-b.md`, in `runs/<run>/`. Runs may have different numbers of versions. Use `original` for the baseline version.
   Stop if: any run lacks a version, or two versions are identical.
2. **Fix the rubric.** Write its name and version in `protocol.md` before you read any text. Do not change it after the first score.
   Stop if: the rubric asks the scorer to judge "which is the edit" or "which is better". Score each text on its own.
3. **Blind each run alone.** Copy each run's versions (`scripts/shuffle.py blind <run>...` does this and refuses a repeat shuffle of a run) to neutral labels (`X`, `Y`, `Z`) in a fresh random order. Write the label-to-version map to `key.json`. Never reuse an order across runs.
   Stop if: a file's name, metadata, tracked changes or first line shows its version.
4. **Brief a fresh scorer per run.** Give it only `blind/<run>/` (not the whole `blind/` folder) and the rubric. Do not give it `key.json`, `runs/`, the other runs, the earlier scores or the purpose of the test.
   Stop if: the scorer asks which version is which. Do not answer. Note it in the report.
5. **Collect scores as given.** Save each score file next to the labelled text. Record the scores in `scores.json`: `{"r1": {"X": 61, "Y": 56}}` (run, label, number). Do not rescore a text because the number looks wrong. If a score is invalid (the tool crashed), rerun that text with a new scorer and record the rerun.
6. **Reveal.** Only now join scores to the key. Build a table with one row per run and one column per version (`scripts/shuffle.py reveal scores.json` does this).
7. **Report per run and the mean.** Show every row, the mean per version and the difference from the original in each run. Show how many runs went up, stayed and went down. If a version exists in only some runs, give its mean over those runs and say how many.
8. **State n and its limits.** Write the sample size, the number of scorers per text, the rubric and its known variance. Say what the sample can show (a direction on these texts) and cannot show (a general effect, or a cause).

## Outputs

```text
protocol.md   rubric name and version, number of runs, scorer setup
key.json      label to version, per run (never shared with scorers)
blind/<run>/  X.md, Y.md, Z.md and their score files
report.md     per-run table, means, differences, n, limits
```

See `examples/input.md` and `examples/output.md` for a worked case with invented numbers.

## Rules

- The scorer never sees the key, the real file names or the purpose.
- One fresh scorer per run. A scorer that saw earlier runs may carry a standard from one run to the next.
- One rubric for every text. Changing it between runs gives you two measurements.
- Reveal after scoring, never before.
- Report every run, not only the mean.
- With a small n, say "a consistent direction on these texts". Do not say "it works".
- A gap smaller than the rubric's own variance is noise. If you do not know the variance, say so.
- Do not pick runs after seeing the scores.

## Failure modes

- **The label leaks anyway.** A version carries a tell, such as all lowercase, a different template or a tool's footer. The scorer can then guess. Note the tell in the report and say the blinding is partial.
- **Only one run.** Report it as an anecdote.
- **The scorer is a model with high variance.** Score each text more than once with fresh scorers and report the spread.
- **The edit changed the text so much that it is a different text.** The rubric may be scoring the topic, not the edit. Say so.

## Related

`measurement-protocol` covers changing the instrument between readings. Use both.

## Changelog

- 1.1.0: script checks runs and handles uneven versions; defined "Stop if", scores.json and the baseline.
- 1.0.0: first version.
