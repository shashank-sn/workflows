# Example input (synthetic)

Company: Brindle, a made-up company. It sells a data pipeline runner for small teams. Its docs tell readers to install with `docker pull brindle/brindle-runner`.

Place: the Docker Hub namespace `brindle`. Run folder: `presence/pages/dockerhub/`.

## From the audit (`presence/audit/dockerhub.md`)

| Item | Result | Evidence |
|---|---|---|
| `brindle/brindle-runner` has a description | FAIL | Empty, read signed out on 3 Nov |
| `brindle/brindle-runner` has an overview | FAIL | "No overview available" |
| A test image leads the list | FAIL | `brindle/ci-scratch` is first, updated yesterday |
| `brindle/brindle-scheduler` description | WARN | Reads "scheduler" and nothing else |
| Categories | FAIL | None set on either image |

## From the drafts (`presence/drafts/dockerhub.md`)

- Descriptions, 100-character limit (from Docker's docs, read 3 Nov):
  - runner: "Runs Brindle data pipelines in a container. Start here to try Brindle on your machine." (86 characters, approved block `one_line`)
  - scheduler: "Brindle pipeline scheduler. Runs on a schedule and sends run history to the Brindle API." (88 characters)
- Overview for the runner: install command, one example, link to docs.
- Categories: Developer tools, Data science.

## Sources

- Approved blocks: `one_line` is "Brindle runs data pipelines for small teams."
- Cleared numbers: none for this place.
- Engineer answer needed: does `brindle/ci-scratch` need to stay public?
- Stored assistant answers: none yet.
