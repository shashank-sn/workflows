# Process notes

## Status of a fact row

| Status | Meaning | How a writer uses it |
|---|---|---|
| `settled` | A fact the owner confirmed | Use it. Wording may change, meaning may not |
| `approved` | A sentence the owner approved | Use it in its exact words |
| `held` | Not yet confirmed or in conflict | Do not use. Write what the row says to write meanwhile |
| `never-say` | A phrase or claim that stays out | Never use. `check_draft` flags it |

## The four calls, plus search and fetch

| Call | Input | Returns |
|---|---|---|
| `get_brief` | kind of piece, topic | facts, rules and approved lines that fit, who reads this kind of piece (from the "Readers" list in `rules.md`; if the kind is missing it says so), the `meanwhile` text of held rows |
| `check_draft` | the draft | a "To fix" list: never-say phrases and their spelling variants (real time, real-time), numbers from a `held` row, numbers that differ from a `settled` row. Never rewrites |
| `add_asset` | the finished piece, its status | records it so the next writer sees it |
| `add_note` | a correction, in the person's words | shows above the steps for the next writer |
| search and fetch | a query, an id | reads any stored document |

## Settling a conflict

1. Name both sources and their dates.
2. Ask the owner of the fact.
3. Write the ruling as a row. Keep the losing wording as `never-say` if writers might still use it.
4. If the owner is silent, the row stays `held`.

## Daily site copy

Save each page's text and a dated log of what changed. If a run fails, keep the last copy and show its age. Write the log so a writer can see whether a page changed since the facts file row was written.

## Privacy

Replace people's emails and phone numbers in call notes with placeholders before indexing. Keep the company's own public role addresses (for example sales@ the company domain).
