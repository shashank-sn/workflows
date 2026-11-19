# Example output (synthetic, abridged)

## pool.csv (3 of 212 rows)

| id | question (buyer's words) | source | voice | askers | grade | fit |
|---|---|---|---|---|---|---|
(the CSV also holds `quote` and `source_file`, left out here)
| Q014 | why does my bank deposit never match what the marketplace says it paid me | call 3, turn 41; call 5, turn 8; call 7, turn 22; forum thread 1 | buyer | 4 | confirmed | symptom |
| Q077 | do i need separate books once i sell on two marketplaces | call 6, turn 12 | buyer | 2 | confirmed | moment |
| Q131 | best payout reconciliation software | vendor blog | vendor | 0 | tool-only | generic |

Q131 stays in the pool with its reason. It is not a buyer question.

## gap-check.csv (excerpt)

| id | assistant | search | mark | carried by | note |
|---|---|---|---|---|---|
| Q014 | A | on | thin | marketplace help page | explains fees, not matching |
| Q014 | B | on | not for this buyer | large-company finance blog | assumes an ERP |
| Q077 | A | on | nobody | none | answers a tax question instead |

Q077 is open ground. Q014 is open ground for a small shop.

## review.md

The reviewer found 11 problems in 212 rows: 4 rows added detail the quotes did not say, 5 pairs were merged but ask different things, 2 rows named the company. All fixed.

## frozen-v1 and its tags

120 measured questions, 6 brand questions, 4 controls. Counts by segment showed no question from a shop above 10 staff. The README states that blind spot. The frozen file is never edited.

## coverage-map.md (excerpt)

| id | mark | who answers today | page | wave |
|---|---|---|---|---|
| Q014 | thin | marketplace help page | `/guides/payout-mismatch` | 1 |
| Q077 | nobody | none | missing | 2 |
