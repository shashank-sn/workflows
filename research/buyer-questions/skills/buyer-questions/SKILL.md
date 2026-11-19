---
name: buyer-questions
description: >-
  Builds the question set to measure before you measure whether AI assistants
  and search recommend a company. Starts from buyer calls and buyer phrasing,
  checks what assistants already answer, has an independent reviewer check the
  set, freezes it, and writes a coverage map of which page answers each
  question. Use when asked to "build a question set", "pick the prompts to
  track", "find what buyers ask", "plan AI answer coverage", or to prepare the
  input for a measurement.
license: MIT
metadata:
  author: Shashank SN
  version: "1.1.0"
  source: https://github.com/shashank-sn/workflows
---

# Buyer questions

Questions a team brainstorms in a room measure the team. This skill builds the set from what buyers say, checks what assistants already answer, freezes the set, and maps each question to the page that answers it. It comes before `measurement-protocol`, which measures the questions this picks.

## When to use this

- Before the first reading of any AI answer or search measurement.

## What you need

- The company, and the buyer it wants: role, company size, stage, what they use today.
- Buyer calls or transcripts if any exist (discovery, demo, lost deals). Without them, say so. Every question is then a hypothesis.
- Access to a few assistants and a search engine, signed out.

## The process

1. **Name the buyer and the moment.** Write who buys, what size, what they use today, and the situation that makes them start asking. Tag every later item `moment` (that situation), `symptom` (a pain that grows in it) or `generic` (true of any buyer in the category).
   Stop if: you cannot name the buyer. Ask for it.
2. **Read buyer calls first.** Split each transcript into numbered turns. Re-judge every speaker from what is said, because recorders mislabel. Keep quotes only from buyer turns.
   Stop if: there are no calls. Mark the set `hypothesis only` and go on to step 3.
3. **Pool the questions.** Add forums, reviews, search suggestions, "people also ask" and the company's own trigger moments. Save each source as a text file under `sources/`. Every row has an id, a source, a `source_file`, a voice (buyer, relayed buyer, vendor, press) and a verbatim quote. Run `python3 scripts/check_quotes.py questions/pool.csv sources/`. Vendors and the company's own people are never askers.
   Stop if: a quote does not match its source. Fix the quote from the source. If the source has no such words, drop the quote and set grade `tool-only`.
4. **Grade by independent askers.** `confirmed` is 2 or more askers outside the vendor side. `hypothesis` is 1. `tool-only` is none. Count one thread as one asker. List every asker's source in `source`, separated by `;`, and put the count in `askers`. Delete nothing.
5. **Rewrite in the buyer's words.** Keep the asker's register. Never name the company. Say no more than the quotes say.
6. **Check what assistants already answer.** Ask each question to several assistants, with search on and then off, and to a search engine. Never name the company. Mark every answer: `nobody`, `thin`, `not for this buyer`, or `exactly for this buyer`. Record who carries each answer.
   Stop if: an assistant failed to answer. Re-run it. If it fails twice, write `failed` in `mark` and name the gap in `review.md`. A missing engine is not a result.
7. **Check the set independently.** A reviewer who did not write the rows, with a fresh context, checks for invented detail, wrong register, over-merged questions and house-rule breaks. Fix what it finds. Write each finding and its fix in `review.md`. Fix a finding that spans two rows by hand.
8. **Freeze.** Tag every question with persona, role and segment, and read the counts before you freeze. Write the frozen set as one dated file, `frozen-v1.csv`, with a `group` column: `measured`, `brand` (questions that name the company, labelled) or `control` (questions with a known answer, to check the method). Write the rules in a README: the frozen file is never edited, any change is a new dated file, and more than 10% changed is a new baseline.
   Stop if: a segment or role has no questions. Collect more or state the blind spot.
9. **Write the answer map.** The measured set is a sample you read. The answer map is every question worth answering. A leftover question is any pool question not in the frozen set. Route each to `answer`, `pool` (measure later, in a dated batch) or `drop` (duplicate, or not a buyer or an influencer).
10. **Write the coverage map.** One row per question: its mark, who answers today, the page that answers it (or `missing` or `planned`), and the wave it ships in (1 ships first, higher numbers later). Mark a partly answered question `partial` in the page column, with the quote from the page. Never widen an existing page to fit one question. Name a new page that links to it.
    Columns: `id, question, route, reason`.
11. **Hand off.** Give `measurement-protocol` the frozen set, its tags and its README.

## Outputs

```text
questions/
  pool.csv          id, question, quote, source, source_file, voice, askers, grade, fit
  gap-check.csv     id, assistant, search (on/off), mark, carried by, note
  review.md         the independent check
  frozen-v1.csv     id, question, group; never edited
  frozen-v1-tags.csv id, persona, role, segment
  answer-map.csv    every question worth answering, with its route
  coverage-map.md   question, mark, page, wave
```

## Rules

- No quote without a source that a script can find.
- No question that names the company, except in the labelled brand group.
- Assistants never raise a question's grade. Askers do.
- The frozen set is never edited. Changes are new dated files.
- More than 10% changed is a new baseline, not a trend.

## Failure modes

- **Assistants answer your buyer's exact question already:** the pillar is stated. Use it as proof inside pages, not as the headline claim.

## Changelog

- 1.1.0: quote-check script, column formats, failed-engine action, group labels, route and wave defined.
- 1.0.0: first version.
