# Example output (synthetic, abridged)

## channel-page.md

# Docker Hub

- **Why it matters:** Your install docs send readers to `brindle/brindle-runner`. An engineer who has decided to try Brindle lands there, and so does an assistant asked what the image does. No stored answers yet.
- **What's wrong today:** The runner has no description and no overview. A test image, `brindle/ci-scratch`, leads the list.
- **What we change:** Add two descriptions, one overview and two categories. One engineer decides about the test image.
- **What it takes:** About 15 minutes of an engineer's time. The rest waits on an invite to the namespace.
- **Places this page covers:** the `brindle` namespace on Docker Hub, `brindle/brindle-runner`, `brindle/brindle-scheduler`, `brindle/ci-scratch`.
- **State:** ready for review, 3 Nov 2026.

## Decisions

| Decision | Who decides | Our recommendation | What waits on it |
|---|---|---|---|
| Make `brindle/ci-scratch` private: it is the first image on your list and its description is empty | The CTO | We'd make it private, because your docs never mention it and it leads the page | Change 4 |

## To-dos

| What needs to be done | Done when |
|---|---|
| Brindle: send us an invite to the `brindle` namespace with the Editor role | The invite shows in your Docker Hub members list |
| Brindle: decide about `brindle/ci-scratch` | The Decisions table has an answer |
| We: make changes 1 to 3 | The runner shows a description and an overview signed out |

## Before and after

- **Brindle today:** two images with no overview, and a test image first.
- **After the changes:** the runner opens with what it does and one install command.
- **The best example:** a pipeline tool whose page opens with one sentence and a command.

## The changes

### Docker Hub, `brindle/brindle-runner`, repository settings

#### 1. Add the runner's description

Open [the runner's settings](https://hub.docker.com/repository/docker/brindle/brindle-runner/general). Replace the empty description with this text (86 of 100 characters).

```text paste=runner-description
Runs Brindle data pipelines in a container. Start here to try Brindle on your machine.
```

**Why:** The description is the line a search result and an assistant quote. It is empty today.

#### 2. Add the runner's overview

In the same screen, paste this into the overview.

````markdown paste=runner-overview
# Brindle runner

Brindle runs data pipelines for small teams. This image runs one pipeline on your machine.

```sh
docker run --rm brindle/brindle-runner run ./pipeline.yaml
```

Read the [install guide](https://docs.brindle.example/install) for the full setup.
````

**Why:** A reader who has pulled the image needs the command that runs it.

### Docker Hub, `brindle/brindle-scheduler`

#### 3. Replace the scheduler's description

```text paste=scheduler-description
Brindle pipeline scheduler. Runs on a schedule and sends run history to the Brindle API.
```

**Why:** "scheduler" alone does not say what it schedules.

### Docker Hub, `brindle/ci-scratch`

#### 4. Make the test image private

Type: Decision. Only after the choice is recorded in the Decisions table, and only that choice, set the repository to private.

**Why:** A test image first on the list makes the page look unmaintained.

## Strategy

**Verdict:** needed. Your docs pull from this namespace, and the runner has no description. Re-check after go-live, after two and four weeks, then each quarter.

## Who reads it

An engineer who chose Brindle and wants the command. A security reviewer who checks what the image is. An assistant asked what `brindle/brindle-runner` does.

## The best examples

- Three pipeline-tool pages, read 3 Nov. Each opens with one sentence and one command. (Links omitted in this example.)

## How we'll know it worked

| What is measured | Where and how it is read | Today (3 Nov) | Target | When | Who checks | Kind |
|---|---|---|---|---|---|---|
| Runner description | The runner's page, signed out | Empty | The text of change 1 | 2 weeks after go-live | We | Check |
| First image on the list | `hub.docker.com/u/brindle`, signed out | `brindle/ci-scratch` | The runner | After change 4 | We | Check |

## Other open items

- None.

## Sources

- Docker Hub description limit (100 characters), read 3 Nov 2026.

---

## changes.md (abridged)

# Changes for Docker Hub

**Your part.** The CTO: one decision, about 5 minutes. An engineer: send the invite and check the overview, about 5 minutes.

**Why it matters:** your docs send readers to this page. **What's wrong:** the runner has no description. **What changes:** two descriptions, one overview, one image made private. **What it takes:** about 10 minutes of your time.

### Docker Hub, `brindle/brindle-runner`, repository settings

#### 1. Add the runner's description (Paste, we do this once you send the invite)

Open the runner's settings. We replace the empty description with this text.

```text
Runs Brindle data pipelines in a container. Start here to try Brindle on your machine.
```

**Done when:** the runner's page shows this line signed out.

(Changes 2 to 4 follow the same card, each copied from the full page.)

### After the changes

| Device | Check | Done |
|---|---|---|
| Desktop | Open `hub.docker.com/u/brindle` signed out. The runner is first. | The runner leads, with its description |
| Phone | Open the runner's page. The overview shows the command. | The command is readable without zoom |

---

## appendix.md (abridged)

# Docker Hub: appendix

## Before and after

Today: an empty runner page, and a test image first. After: the runner first, with a description and a command.

## The best examples

- Three pipeline-tool pages: each opens with one sentence and one command.

## What AI assistants say today

No stored answers yet.

## What stays as it is

The scheduler's name and its tags are right. Leave them.
