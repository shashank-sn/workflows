---
name: video-script
description: >-
  Writes one product video as a complete package: a script told as one argument
  a listener can follow, the packaging (title, thumbnail, description, chapters,
  tags) and the shot notes for the builder. Flow-reads the script as heard,
  fact-checks it, and shows the approver a rough-cut video instead of a
  document. Use when asked for a video script, the next video in a playlist, a
  video description, or a handover for the person who builds the video.
license: MIT
metadata:
  author: Shashank SN
  version: "1.1.0"
  source: https://github.com/shashank-sn/workflows
---

# Video script

A script written to be read fails when it is heard. A listener cannot scroll back, sees no headings and knows only the title and the company. This skill writes the script to be heard, checks it as it will be heard, and hands the builder one complete package.

## When to use this

- "write the script for this video"
- "write the next video in the playlist"

## What you need

- The video's title, written as the question the viewer would type.
- The viewer, named by role. They know only the title and which company made the video.
- Your sources: a facts file or approved wording, plus the page or article the video draws from. Never write a fact from memory.
- The playlist plan, with every title in watch order. Build one first if none exists (`reference/playlist-standard.md`).
- One approved script from the same playlist, as a model. For the first video, a script you admire.
- Read access to the sources. A text-to-speech voice is optional but used for the rough cut.
- The approver: the person who says the video is good. The length range: the company's, else 3 to 6 minutes (say you used the default).

Stop if: there is no facts file or approved wording, or two sources disagree. See "Missing or conflicting sources" in `reference/process.md`.

## The process

1. **Write the brief on one page.** Put down the viewer, the one idea they should leave with, the short answer with an example for each condition, and the story. The story casts "you" in a role the viewer can step into, never a named person. State what the situation costs today.
   Stop if: the one idea is a topic ("AI does the work") rather than something the viewer has not thought of.
2. **Build the question chain.** Write the viewer's question at each point, what answers it, and the question that answer raises. Every chapter answers a question the previous one raised. Write each chapter question as a person would type it, so it makes sense alone on a card.
   Stop if: a chapter answers a question nobody has asked yet.
3. **Write each chapter as one paragraph, then cut it into rows.** Rows hold: id, picture, narration, the word the picture changes on, on-screen words, source. Open with the title question and the company as publisher. Name the parts in about thirty words. Ask each chapter's question aloud, never "first" or "second". Explain each trade term once and use that one word after.
4. **Close the same way every time.** Give the answer to the title, condition by condition. Then say the article line and "next in this playlist" with the next title (exact words in `reference/playlist-standard.md`). The last video names no next title.
5. **Run the checks in order, each with a fresh reader who did not write the script.** Flow read, then fact check, then missing-context read, then a cut of detours, then a second fact check on every changed row. Each reader is a separate subagent or a person. Run checks 1 to 6 in `reference/process.md`; checks 7 and 8 there are for a playlist's first video.
   Stop if: any check finds a line that is overstated, unsourced or contradicted.
6. **Write the packaging before anyone reviews.** Title (100 characters or fewer), description, chapters, tags (10 to 16), thumbnail idea, end screen. Description shape is in `reference/process.md`.
7. **Make the rough cut.** Voice the exact current script and put it in front of the approver as audio or video, with the packaging beside it. Rebuild it after any change to the words. With no voice, give the approver the text read-through instead, mark chapter times as estimates (150 words a minute), and say so.
   Stop if: the approver has not said the rough cut is good. Then send the rough cut and wait.
8. **Write the handover.** One file for the builder, in the 11 sections of `reference/playlist-standard.md`. Sections 8 to 11 (question chain, fact notes, check findings, history) are not given to the builder. List each hard word with its pronunciation; mark it unconfirmed if nobody confirmed it.
9. **Check the playlist.** When every video exists, have one fresh reader look for repeats, contradictions, two names for one thing, and the same scene or ending twice.

## Outputs

```text
video/
  brief.md          viewer, one idea, short answer, story
  chain.md          question chain and story beats
  script.md         the rows
  packaging.md      title, description, chapters, tags, thumbnail
  handover.md       what the builder gets
  checks/           one file per check, named <n>-<check>.md, one line per decision
  rough-cut/        the voiced script
```

## Rules

- Use a fresh reader for every check. The writer is the worst judge of the script.
- Never fix a flagged line by inserting a linking word. Rewrite the paragraph and cut it again.
- At most three numbers, each said with what it measured.
- Name another company's product only in words its own documents use, read on the day you write.
- Passing the checks is not the bar. The approver's watch of the rough cut is.
- Never send anything to the client unless the approver says so.

See `examples/` for a worked video and `reference/checklist.md` before you hand over.

## Changelog

- 1.1.0: source stops, default length, no-voice rough cut, handover sections.
- 1.0.0: first version.
