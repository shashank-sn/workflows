# Example output (synthetic, abridged)

## staff/audit.md

Counts are from the run history given. 22 routines listed, 61 runs in the week, 38 reports, 4 runs touched the product, 2 emails went out, 0 bugs fixed.

| routine | touches | keep / merge / drop | reason |
|---|---|---|---|
| studio-news | nothing owned | drop | no decision followed it |
| playlist-maker | Priya's classes, not the company | drop | outside the company |
| lead-scan | audience | keep, becomes leads bot | feeds outreach |
| cold-email | audience, sends as Priya | keep, becomes outreach bot, draft only | sends without a yes today |
| bug-triage | product | keep, becomes support bot | 0 fixes shipped, needs a handoff |
| invoice-watch | money | keep, becomes money bot, read-only | |
| release-notes | product | merge into the builder's done step | |

## staff/jobs/outreach.md

- **Job:** draft first emails and follow-ups to studios from the leads record.
- **Owns:** the outreach log.
- **Never does:** send, invent a studio fact, mention price.
- **Connections:** the shared record, a draft folder. No send access.
- **Memory:** its own notes file.
- **Hands off to:** the support bot when a studio asks a product question.
- **Speaks to Priya:** a daily batch of 5 drafts for yes or no.
- **Schedule:** daily.
- **Rules:** never invent a fact, number or quote. Never delete. Nothing goes outside without Priya's yes.

## staff/routing.md (excerpt)

Leads bot writes to the leads table. Outreach reads it. Support bot hands a confirmed bug to the builder with steps. The chief of staff routes anything else. Outside gate: emails, posts, payments, deletes and deploys wait for Priya.

## staff/standup.md (excerpt)

Saturday, 30 minutes. Each bot posts done, blocked and needs from Priya, plus one line on what it would cut from its own reports. Cleanup pass lists what to cut from each bot's saved context. Priya approves each change.
