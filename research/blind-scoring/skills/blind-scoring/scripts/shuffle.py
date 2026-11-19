"""Blind the versions of each run, then reveal scores after scoring.

Layout: runs/<run>/<version>.md  (for example original.md, edit-a.md, edit-b.md)

  python3 shuffle.py blind r1 r2 r3     writes blind/<run>/X.md, Y.md, Z.md and key.json
  python3 shuffle.py reveal scores.json joins scores to key.json and prints a table
                                        (baseline version "original" by default; add a name to change it)

Run from any folder. runs/, blind/ and key.json sit in the folder that holds this script.
`blind` stops if a run has fewer than two versions, more than six, identical versions,
a version name inside a text, or was blinded before (a second shuffle would void the first).

scores.json: {"r1": {"X": 61, "Y": 56, "Z": 66}, ...}

Give scorers only the blind/ folder. Never give them key.json or runs/.
"""
import json
import random
import shutil
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent
KEY = BASE / "key.json"
LABELS = "XYZWVU"


def blind(run_id: str, rng: random.SystemRandom) -> dict:
    src = BASE / "runs" / run_id
    versions = sorted(p.name for p in src.glob("*.md"))
    if len(versions) < 2:
        raise SystemExit(f"{run_id}: need at least two versions in {src}")
    if len(versions) > len(LABELS):
        raise SystemExit(f"{run_id}: {len(versions)} versions, but only {len(LABELS)} labels")
    texts = {n: (src / n).read_text() for n in versions}
    if len(set(texts.values())) < len(texts):
        raise SystemExit(f"{run_id}: two versions are identical. Fix the run, then retry.")
    for n, t in texts.items():
        for other in versions:
            if other.removesuffix(".md") in t.lower():
                print(f"WARNING {run_id}/{n}: text contains '{other.removesuffix('.md')}'. Check for a leak.")
    rng.shuffle(versions)
    dst = BASE / "blind" / run_id
    dst.mkdir(parents=True, exist_ok=True)
    mapping = {}
    for label, name in zip(LABELS, versions):
        shutil.copyfile(src / name, dst / f"{label}.md")
        mapping[label] = name.removesuffix(".md")
    return mapping


def reveal(scores_path: str, base: str = "original") -> None:
    key = json.loads(KEY.read_text())
    scores = json.loads(Path(scores_path).read_text())
    table, names = {}, set()
    for run_id, labelled in scores.items():
        if run_id not in key:
            raise SystemExit(f"{run_id} is in scores.json but not in key.json")
        table[run_id] = {key[run_id][label]: value for label, value in labelled.items()}
        names.update(table[run_id])
    names = sorted(names)
    print("run | " + " | ".join(names))
    for run_id, row in table.items():
        print(run_id + " | " + " | ".join(str(row.get(n, "")) for n in names))
    # a mean uses only the runs that have that version; the count shows how many
    means = {n: [r[n] for r in table.values() if n in r] for n in names}
    print("mean | " + " | ".join(f"{sum(v)/len(v):.1f} (n={len(v)})" for v in means.values()))
    for n in names:
        if n == base:
            continue
        diffs = [r[n] - r[base] for r in table.values() if n in r and base in r]
        if diffs:
            up, same, down = (sum(d > 0 for d in diffs), sum(d == 0 for d in diffs), sum(d < 0 for d in diffs))
            print(f"{n} minus {base}: mean {sum(diffs)/len(diffs):+.1f} over {len(diffs)} runs; up {up}, same {same}, down {down}")
    print(f"n = {len(table)} runs")


if __name__ == "__main__":
    if len(sys.argv) >= 3 and sys.argv[1] == "blind":
        rng = random.SystemRandom()
        key = json.loads(KEY.read_text()) if KEY.exists() else {}
        done = [r for r in sys.argv[2:] if r in key]
        if done:
            raise SystemExit(f"already blinded: {done}. Reshuffling would void the first blinding.")
        for run in sys.argv[2:]:
            key[run] = blind(run, rng)
            KEY.write_text(json.dumps(key, indent=2))  # saved per run, so a stop keeps earlier runs
        print(f"blinded {len(sys.argv) - 2} run(s). keep {KEY} away from scorers.")
    elif len(sys.argv) in (3, 4) and sys.argv[1] == "reveal":
        reveal(*sys.argv[2:])
    else:
        raise SystemExit(__doc__)
