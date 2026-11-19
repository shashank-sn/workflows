---
name: bot-staff
description: >-
  Audits a set of scheduled agent routines and designs or redesigns them as a
  staff of single-job bots: a job sheet per bot, one shared record, an owner's
  yes before anything goes outside, direct handoffs, a chief-of-staff router,
  a weekly stand-up and build gates (scope cut, skeptic, QA, merge card).
  Use when asked to "audit my bots", "audit my routines", "design an agent
  team", "redesign my bot setup" or "write a bot job description".
license: MIT
metadata:
  author: Shashank SN
  version: "1.1.0"
  source: https://github.com/shashank-sn/workflows
---

# Bot staff

Many agent setups grow into a pile of routines that report to one chat window. This skill counts what the pile does, then designs a small staff with one job per bot.

## What you need

- The list of current bots, agents or scheduled routines (an export, a screenshot or a pasted list). If none exist, a list of the jobs you want done.
- Run history or logs, if they exist.
- The name of the shared workspace the work should live in. If none is named, ask for one before step 4.
- The held facts: what must never leave (for example prices). If the owner has none, write "none stated".
- "The owner" means the human who approves. Bots never approve for the owner.
- This skill designs. It never creates a bot, grants a connection or sends anything outside.

## The process

1. **Audit.** For every routine, record: what it does, how often it runs, what it touches (product, money, audience, other people's work, nothing owned), what it reports and when. Count, for one week: routines run, reports sent and changes shipped. Write the table to `staff/audit.md`.
   Stop if: you cannot list the routines. Ask for the list. Do not estimate counts.
   If the owner's count and the list differ, use the list, write the gap in `staff/audit.md` and ask for the missing routines. If the logs and the owner disagree, the logs win. If no routines exist, skip steps 1 and 2 and list the wanted jobs instead.
2. **Cut.** Mark each routine keep, merge or drop. Drop what touches "nothing owned" or "other people's work". Merge routines that share one job.
3. **Define the jobs.** One job per bot, owned end to end. Write a job sheet per bot from `reference/process.md`: every field in the template. A routine that does two jobs becomes two bots.
   Stop if: a job needs two owners, or two bots own the same output. Split or merge until each output has one owner.
4. **Pick the record.** One shared place where all work is written. Name what each bot logs there. Rule: if it is not in the record, it did not happen.
5. **Set the gates for going outside.** List what leaves the company: posts, emails, payments, deletes, deploys, price mentions. Every item needs the owner's yes. Add the never rules: never invent a fact, number or quote, never delete.
6. **Wire handoffs.** For each bot, name the bots it hands work to. Handoffs go bot to bot, not through the owner.
7. **Add a chief of staff.** One bot that routes each request to the owning bot, sets up new bots, passes new rules on and runs the stand-up. It does not do the other bots' jobs.
8. **Add build gates** if the staff builds software or other deliverables:
   - Scope cut: dated, with in, out and done-when. The owner approves before any build.
   - Skeptic: new features only. Up to 5 numbered objections, each with evidence and what would change its mind. At most 2 rounds, then the owner decides. Read-only.
   - QA: tests against the done-when checks before it reads the code. Every bug goes in the record with steps and evidence.
   - Merge card: the builder bot reads the full diff against the scope cut and sends the owner one card: merge, hand to a human reviewer, or hold.
9. **Write the stand-up.** Weekly, with the chief of staff. Use the agenda in `reference/process.md`: done, blocked and needs from the owner per bot, then a context cleanup pass listing what to cut from each bot's saved context. Every change needs the owner's yes.
10. **Write the correction rule.** A mistake is fixed in the record. Keep the old text and add a dated note.

## Outputs

```text
staff/
  audit.md        routine table, counts, keep / merge / drop
  jobs/<bot>.md   one job sheet per bot, chief of staff included
  routing.md      record name, handoffs, gates for going outside, held facts,
                  build gates, correction rule
  standup.md      agenda, cadence, cleanup pass
```

## Rules

- One job per bot. A bot with "and" in its job is two bots.
- Give a bot only the connections its job needs. Read-only unless the job needs a write.
- Nothing goes outside without the owner's yes. A rule written into a job sheet is not a permission.
- Quiet is a valid report. A bot with nothing new says nothing.
- Never invent counts. If a number is unknown, write "unknown" and say how to get it.

## Failure modes

- **Logs missing for some routines:** use logs where they exist and mark the rest "stated by owner".
- **No logs:** audit from the routine list only and mark every count as stated by the owner.
- **One bot does everything:** split by output owner, not by tool.
- **Owner wants full autonomy:** keep the outside gate for money, deletes, publishing and deploys. Offer a narrower gate only after a bot has a record of correct work.

## Changelog

- 1.1.0: closed gaps in audit categories, outputs and terms.
- 1.0.0: first version.
