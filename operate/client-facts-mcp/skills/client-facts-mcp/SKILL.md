---
name: client-facts-mcp
description: >-
  Builds one knowledge server per company that holds everything known about its
  marketing (approved messaging, a daily copy of its website, a facts file with
  settled, approved, held and never-say rows, house rules, the places it lives
  online, buyer questions, call notes) and sets one writer loop: get_brief,
  draft, check_draft, add_asset, with corrections returned through add_note.
  Use when asked to "set up a facts server for a company", "stop writers using
  facts from memory", "build a facts file", or make agents write from one source
  of truth.
license: MIT
metadata:
  author: Shashank SN
  version: "1.1.0"
  source: https://github.com/shashank-sn/workflows
---

# Client facts server

Writers who take facts from memory or old documents publish wrong numbers. This skill builds one server per company that holds what is known about its marketing, and sets one loop every writer follows. The facts file settles every conflict.

## When to use this

- "Set up a facts server for this company"
- "Stop our writers and agents using facts from memory"
- "Build a facts file from these documents"
- Before several people or agents start writing for the same company

## What you need

- The company's source material: messaging, website address, decks, call notes, house rules.
- A person who owns each fact and can rule on conflicts.
- Somewhere to run a server and a daily job. Any tool works. An MCP server is one example. A folder with a search script is another.
- Rule: one company per server. Never mix two companies' material.

## The process

1. **Gather the sources.** List every source with its owner and date. Write the list to `facts/sources.md`.
   Stop if: you cannot name an owner who can rule on conflicts. Ask the requester to name one. Until then build the files with every conflicting row `held`, and tell the requester the server is not ready for writers.
2. **Write the facts file first.** One row per fact: id, exact words, status, where it may be used, source, owner, date, and for `held` rows what to write meanwhile. Status is `settled`, `approved`, `held` or `never-say` (`reference/process.md`).
   Stop if: two sources conflict and nobody has ruled. Mark the row `held`, write what to say meanwhile, and ask the owner.
3. **Copy the website daily.** Put the address and the page list in `server/`. A scheduled job saves each page and a dated log of changes. Flag any fact row older than a change on the page it cites for the owner to review. Keep the last good copy if a run fails and state its age in answers.
4. **Load the rest.** House rules to `facts/rules.md`, places to `facts/places.md`, buyer questions to `facts/questions.md`, call notes to `server/notes/`.
   Stop if: the call notes contain emails or phone numbers. Replace them with placeholders before indexing.
5. **Expose four calls, plus search and fetch.** `get_brief`, `check_draft`, `add_asset` and `add_note`, with search and fetch for reading. `get_brief` takes the kind of piece. `check_draft` flags never-say phrases (also spelling variants), and any number or claim that comes from a `held` row or differs from a `settled` row. It returns a "To fix" list and never rewrites.
6. **Write the rule.** A writer takes no fact from memory or an old document. A writer calls the server. Put this rule at the top of `facts/rules.md` and in each writer's instructions.
7. **Test the loop.** Draft one real piece with a planted wrong number (or a never-say phrase if no row has a number). `check_draft` must catch it.
   Stop if: it does not. Fix the check before any writer uses the server. Write the result to `test-report.md`: the planted text, what flagged it, pass or fail.
8. **Route corrections.** Every correction goes in with `add_note`, in the person's words. Read the notes weekly. Promote the good ones into the rules or the facts file.
9. **Review conflicts weekly.** Ask owners to rule on `held` rows. Update the status and the date.

## Outputs

```text
facts/
  sources.md     every source, owner, date
  facts.csv      id, words, status, use, source, owner, date, meanwhile
  rules.md       the writer rule, readers by kind of piece, house rules
  places.md      each place online and what it says today
  questions.md   buyer questions
server/          the four calls, search and fetch, the daily site copy job, notes/
test-report.md   the planted wrong number and what caught it
```

## Rules

- Never invent a fact. A missing fact is a `held` row, not a guess.
- Use an `approved` row in its exact words.
- Never write a `held` or `never-say` row into a piece.
- Never mix two companies' material in one server.
- Never store a person's personal email or phone number.
- The facts file wins every conflict. Only the fact's owner changes a row.
- A passing `check_draft` proves facts match, not that the piece is good. A person still reads it.

## Failure modes

- **Owner unreachable:** keep the row `held` and say so in `get_brief` answers.
- **Site copy job fails:** serve the last copy and show its date.
- **Writers skip the loop:** the loop is a rule, not a hope. Ask for the recorded `add_asset` entry for each piece.

## Changelog

- 1.1.0: fixed the call count, added the owner stop action, the meanwhile column, file locations and the check_draft rule.
- 1.0.0: first version.
