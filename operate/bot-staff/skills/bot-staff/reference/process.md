# Process notes

## Audit table

| routine | schedule | touches | reports to | led to a shipped change | decision |
|---|---|---|---|---|---|

"Touches" is one of: product, money, audience, other people's work, nothing owned. Count three numbers for the week: routines run, reports sent, changes shipped.

## Job sheet template

```text
# <bot name>
Job: one sentence, no "and".
Owns: the outputs only this bot makes.
Never does: the actions it must not take.
Connections: the tools and records it may use, read or write.
Memory: where it keeps its own notes.
Schedule: when it runs, or "on request".
Hands off to: bot names, and what triggers each handoff.
Speaks to the owner when: a decision, a change in the world, or a measured result. Otherwise quiet.
Rules: never invent a fact, number or quote. Never delete. Nothing goes outside without the owner's yes.
```

## Rules every bot carries

- Nothing goes outside without the owner's yes.
- Never invent a fact, number or quote.
- Never delete anything.
- Held facts (for example prices) never go into anything that leaves.
- Report a finding only as strongly as the source states it. Order on a page is not a rank.

## Chief of staff

- Routes each request to the owning bot.
- Sets up new bots from a job sheet and passes new rules to the bots they affect.
- Reviews the staff on a fixed rhythm and runs the stand-up.
- Does not do any bot's job.

## Stand-up agenda

1. Each bot: done, blocked, needs from the owner.
2. Each bot: one thing it would cut from how it reports, and one way it would save the owner time.
3. Cleanup pass: a list of what to cut from each bot's saved context.
4. Check for new features in the agent platform.
5. The owner approves or rejects each change.

## Build gates

| gate | who | input | output |
|---|---|---|---|
| scope cut | builder bot | the idea | dated in, out and done-when, approved by the owner |
| skeptic | skeptic bot | the plan, new features only | up to 5 objections with evidence, 2 rounds at most |
| QA | QA bot | the done-when checks, then the code | findings with steps and evidence |
| merge card | builder bot | the full diff and the scope cut | merge, hand to a human reviewer, or hold |

## Correcting the record

Edit the row. Keep the old text. Add a note with the date and the reason. Pass the new rule to the bots that need it.
