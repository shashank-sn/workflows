---
name: daily-posts
description: >-
  Runs a daily posting loop where the person's answers stay the post. Asks up
  to three questions about live debates with sources linked, saves the answers
  word for word, writes two drafts and a phrase list per answer, runs each
  draft through a voice-check editor, and schedules only drafts the person
  approves by letter. Use when asked to "post every day with AI", "run my daily
  posts", "draft from my answers", or to set up a morning-questions posting
  routine.
license: MIT
metadata:
  author: Shashank SN
  version: "1.1.0"
  source: https://github.com/shashank-sn/workflows
---

# Daily posts

AI can ask, draft and schedule. The thinking stays with the person. This skill turns their answers into drafts, checks them against their voice, and schedules only what they approve by letter.

## When to use this

- "run my daily posts", "send me this morning's questions" or "turn these answers into drafts"
- setting up a daily posting routine where the person answers and approves

## What you need

- A source of live debates in the person's field (feeds, saved posts, a topic list).
- A voice profile or writing brief, and a voice-check editor that can review a draft against it. If there is none, see step 4.
- A place to store questions, answers and drafts.
- A scheduler that accepts a post with a fixed time.
- The person's fixed daily slots and time zone.

## The process

1. **Ask.** Read the last two weeks of stored answers and the last 30 posts (none on a first run). Pick up to 3 live debates from the last day or two. For each, ask for the person's sharp opinion and the experience behind it, in one specific story, number or moment. Link the source under each question. Never ask "what do you think about X". Do not repeat an earlier angle. Store the questions.
   Stop if: no live debate has a source you can link. Ask nothing today and try again tomorrow.
2. **Save the answers.** The person may answer by voice, in any order. Save each answer word for word under its question. If the person pastes a finished post, use it as the only draft for that answer, with the next free letter. Skip steps 3 to 5 for it and go to step 6. It still needs a letter.
3. **Draft.** Write two drafts per answer. Draft a keeps the person's order and words. Draft b enters from a different point in the same answer. Then list every phrase in the drafts that is not from the answer, so the person can cut it. Do not add a take, fact or number the answer does not contain.
   Stop if: an answer holds no take, example or number. Ask the person for more instead of padding. Draft no post for that answer until they reply.
4. **Check the voice.** Run each draft through the voice-check editor before the person sees it. Rewrite from its findings and check again until it passes or reports no more gain. Do not show a draft before this ends.
   Stop if: no editor is available. Say so. Send the drafts in step 6 marked "not checked", and record that in the draft file. Do not claim a pass.
5. **Protect the words.** If a rewrite adds a claim or changes the meaning, put that part back in the person's words. Their words win over the score.
6. **Approve by letter.** Send the drafts labelled 1a, 1b, 2a and so on, with the phrase list. The person replies with letters. Move only those drafts.
   Stop if: a draft has no letter from the person. Do not schedule it.
7. **Fix typos only.** After approval, change only typos and name each fix as old to new. Keep the person's loose spellings. Mark the unapproved sibling drafts as dropped. Do not delete them.
8. **Schedule.** Find the next free fixed slot at least 15 minutes ahead. Create the scheduled post with the final text and the slot time in the person's time zone. Update the stored draft to scheduled. Reply with the slot and the link.
   Stop if: the scheduler fails. Report the error. Do not retry with a different mode such as post now.
9. **Check the result.** About 24 hours after a post goes live, read its numbers from the scheduler or the platform. Compare with the median of earlier posts from the same source. Record both.

See `examples/` for a worked case.

## Guardrails

- Nothing is scheduled without the person's letter for that exact draft.
- The answer is the spine. Never invent a take, fact or number.
- Replies, likes, follows and direct messages stay human. This skill does none of them.
- Never use a post-now mode. Use scheduled slots only.
- Never delete a stored draft or a scheduled post unless the person asks.
- Critique ideas and systems, not private people.
- A change to the voice profile or to this process needs the person's sign-off.

## Output format

```text
daily-posts/
  answers/YYYY-MM-DD.md   questions with sources, answers word for word
  drafts/YYYY-MM-DD.md    drafts 1a, 1b ... with phrase list, editor result, status
```

Status values: `draft`, `approved`, `scheduled`, `dropped`, `published`, `unanswered`.

## Failure modes

- **Person is silent:** do nothing. Ask again the next morning with fresh questions. Do not draft from old answers unasked.
- **Person answers only some questions:** draft only the answered ones. Mark the others `unanswered`. Do not ask them again.
- **Editor rewrite drifts from the answer:** revert to the answer. Report it in the draft file.
- **No free slot in the next three days:** tell the person. Do not stack two posts on one slot.

## Changelog

- 1.1.0: stop gates now name the next action.
- 1.0.0: first version.
