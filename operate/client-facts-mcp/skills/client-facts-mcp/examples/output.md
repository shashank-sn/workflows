# Example output (synthetic, abridged)

## facts/sources.md

| source | owner | date |
|---|---|---|
| positioning page | founder | this month |
| 2024 deck | founder | 2024, stale |
| product page | head of engineering | last week |
| call note | head of engineering | last week |

## facts/facts.csv

| id | words | status | use | source | owner | date | meanwhile |
|---|---|---|---|---|---|---|---|
| F1 | Northwind Telemetry turns vehicle signals into one live fleet view. | approved | any piece | positioning page | founder | this month | |
| F2 | The pipeline handles 8 million events a minute on the standard plan. | settled | any piece that names the plan | product page, call note | head of engineering | last week | |
| F3 | 5 million events a minute | never-say | none, the deck is stale | 2024 deck | head of engineering | last week | |
| F4 | real-time | never-say | none, say "live" | founder rule | founder | this month | |
| F5 | Throughput on the premium plan | held | none | call note | head of engineering | last week | write "ask us" |

The deck and the product page conflicted. The owner ruled, so F2 is settled and F3 is never-say.

## test-report.md

Planted draft: "Northwind handles 5 million events a minute in real time."
`check_draft` flagged "5 million" against F2 and F3, and "real time" against F4. Pass.

## Writer loop

`get_brief` for a directory listing returned F1 and F2 and the house rules. The agent drafted, `check_draft` came back clean, and `add_asset` recorded the listing. A reviewer changed "fleet view" to "fleet dashboard" and sent that with `add_note`.
