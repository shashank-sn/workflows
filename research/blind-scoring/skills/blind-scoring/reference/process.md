# Process notes

## Why hide the label

A label such as "edited" or "version 2" tells a scorer what to expect. A human reads it as "better". A model may do the same. A tool does not read labels, but the people who run it choose the order and choose what to rerun. Neutral labels and a random order remove those choices.

## What to hide

- Real file names and folder names.
- Edit marks, comments, tracked changes and metadata.
- The test's purpose and the other versions.
- Earlier scores and other runs.

## Running the example script

```text
python3 scripts/shuffle.py blind r1 r2 r3
python3 scripts/shuffle.py reveal scores.json
```

Put `runs/<run>/<version>.md` beside the script (the script finds `runs/`, `blind/` and `key.json` in its own folder, so copy it into your test folder first). It allows two to six versions per run. `reveal scores.json [baseline]` compares against `original` unless you name another baseline. `blind` writes `blind/<run>/X.md` and so on, plus `key.json`. Give scorers only `blind/`. `scores.json` maps run, then label, to a score. `reveal` prints the per-run table and the mean.

## Choosing the sample

- Use separate source texts, not repeated samples of one text.
- Choose the runs before you score any of them.
- Five runs is enough to see a clear direction. It is not enough to claim a general effect. More runs shrink the doubt, they do not remove it.

## Reading small gaps

Find the rubric's own noise. Score one text twice with two fresh scorers. The gap between those two scores is a floor. A difference between versions near that floor is noise.

## Worked case

A writer tested a review loop on five drafts against a public writing detector. Each run had three versions. The mean score went from 67 (original) to 71 (edit A) and 75 (edit B). No run went down. The writer reported it as a consistent direction on five drafts and not as a general result. See the post in this folder.
