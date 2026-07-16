#!/usr/bin/env bash
# Export the Week 2 Class 3-4 notebooks (agent + data collection) to PDF for distribution / email.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/week-2/exports"
NOTEBOOKS=("week2_langgraph_agent" "week2_data_collection_rag")

mkdir -p "$OUT_DIR"

if ! command -v jupyter >/dev/null 2>&1; then
  echo "Error: jupyter not found. Install: pip install jupyter nbconvert" >&2
  exit 1
fi

for name in "${NOTEBOOKS[@]}"; do
  NOTEBOOK="$ROOT/week-2/notebooks/${name}.ipynb"
  OUT_PDF="$OUT_DIR/${name}.pdf"

  echo "Exporting $NOTEBOOK -> $OUT_PDF"

  if jupyter nbconvert --to pdf "$NOTEBOOK" --output-dir "$OUT_DIR" --output "$name" 2>/dev/null; then
    echo "Done: $OUT_PDF"
    continue
  fi

  echo "PDF via LaTeX failed for $name; trying HTML export..." >&2
  HTML_OUT="$OUT_DIR/${name}.html"
  jupyter nbconvert --to html "$NOTEBOOK" --output-dir "$OUT_DIR" --output "$name"
  echo "Wrote $HTML_OUT"
  echo "Open in a browser and use Print -> Save as PDF, or install pandoc + xelatex for nbconvert --to pdf."
done

echo "See docs/export-pdf.md for full instructions."
