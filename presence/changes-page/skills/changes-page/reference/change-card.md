# The change card

Every change on the full page uses this shape. The founders' page shows the same fields.

```text
#### <n>. <the change, in a few words>

type:       Paste | Setting | Code | Decision | Build | Check
where:      <the exact field, screen or file>
open:       <the page where the change is made, as a link>
who:        <one role at the company, or "we">
how:        <"We make this change once you send the invite", or who merges a Code change>
time:       <minutes, only where a source gives it. Else "time not known">
ask:        <only for a Check: the question>

<one or two sentences: where to go and what it replaces>

<the paste, in a fenced block with an id>

why:        <one to three sentences, in the reader's terms: cost, time, reach>
done when:  <something the doer can see, signed out>
```

## Types

| Type | Meaning |
|---|---|
| Paste | New text goes into one field |
| Setting | A value is chosen on a screen. Say where to click, the value, and how to confirm it took |
| Code | A change in a repo. Give the repo, the file and line, the pull request title and description (each as a paste), and who merges. Put the merger in `how` |
| Decision | A choice the founders make. It also has a row in the Decisions table |
| Build | Something is made, such as an image. Say who checks it and where it goes live |
| Check | A fact only one person knows. `who` names them. Put the question in the line after `where`, as `ask:`. It has no paste |

## Rules for a card

- One actor and one method. "You paste this" and "we do this once you invite us" are two cards.
- A card stands alone. It holds every file, image and second text it uses.
- A link opens the page where the change is made, not the home page. A sign-in page is fine.
- A placeholder is a bracket nobody can fill wrong: "[your company email]", not "[name]".
- Old text shown for context has no copy button. Only new text is a paste.
- A paste that carries out a decision starts with "after the choice is recorded in the Decisions table".
- A live claim that disagrees with a cleared source is not a decision. Paste the cleared figure.
- Write "you" throughout a card you do yourself. Name the role on a card we do.
