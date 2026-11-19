#!/usr/bin/env python3
"""Check that every quote in pool.csv appears in its saved source file.

Usage: python3 check_quotes.py questions/pool.csv sources/
pool.csv needs columns: id, quote, source_file (path inside sources/).
Several files may be joined with ';'. Matching ignores case and whitespace.
Exit 1 and list the failing ids if any quote is not found.
"""
import csv, re, sys
from pathlib import Path

def norm(text):
    return re.sub(r"\s+", " ", text.lower()).strip()

if len(sys.argv) != 3:
    sys.exit(__doc__)
pool, src = Path(sys.argv[1]), Path(sys.argv[2])
if not pool.is_file() or not src.is_dir():
    sys.exit(f"need an existing pool file and sources folder, got {pool} and {src}")
bad = []
for row in csv.DictReader(pool.open(newline="", encoding="utf-8")):
    files = [f.strip() for f in row["source_file"].split(";") if f.strip()]
    found = False
    for f in files:
        p = src / f
        if p.is_file() and norm(row["quote"]) in norm(p.read_text(encoding="utf-8", errors="ignore")):
            found = True
    if not found:
        bad.append(row["id"])
print(f"{len(bad)} quote(s) not found" + (": " + ", ".join(bad) if bad else ""))
sys.exit(1 if bad else 0)
