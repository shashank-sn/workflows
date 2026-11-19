# Checklist

## Before the build

- [ ] Every source has an owner and a date.
- [ ] One company only.
- [ ] A person can rule on conflicts.

## Facts file

- [ ] Every row has id, exact words, status, use, source, owner.
- [ ] Every conflict has a ruling or a `held` row.
- [ ] Every `held` row says what to write meanwhile.
- [ ] No invented fact.

## Server

- [ ] The website copy runs daily and shows its date.
- [ ] Call notes carry no emails or phone numbers.
- [ ] The four calls work (brief, check, add asset, add note), and so do search and fetch.

## Test

- [ ] A planted wrong number was caught.
- [ ] `test-report.md` shows what caught it.

## Running it

- [ ] Every finished piece is recorded with `add_asset`.
- [ ] Corrections are sent with `add_note` and read weekly.
- [ ] `held` rows are reviewed weekly.
