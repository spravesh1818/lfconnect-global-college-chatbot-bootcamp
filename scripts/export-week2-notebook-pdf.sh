#!/usr/bin/env bash
# Export week2_agent_and_data.ipynb to PDF for distribution / email.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NOTEBOOK="$ROOT/week-2/notebooks/week2_agent_and_data.ipynb"
OUT_DIR="$ROOT/week-2/exports"
OUT_PDF="$OUT_DIR/week2_agent_and_data.pdf"

mkdir -p "$OUT_DIR"

if ! command -v jupyter >/dev/null 2>&1; then
  echo "Error: jupyter not found. Install: pip install jupyter nbconvert" >&2
  exit 1
fi

echo "Exporting $NOTEBOOK -> $OUT_PDF"

if jupyter nbconvert --to pdf "$NOTEBOOK" --output-dir "$OUT_DIR" --output "week2_agent_and_data" 2>/dev/null; then
  echo "Done: $OUT_PDF"
  exit 0
fi

echo "PDF via LaTeX failed; trying HTML export..." >&2
HTML_OUT="$OUT_DIR/week2_agent_and_data.html"
jupyter nbconvert --to html "$NOTEBOOK" --output-dir "$OUT_DIR" --output "week2_agent_and_data"
echo "Wrote $HTML_OUT"
echo "Open in a browser and use Print -> Save as PDF, or install pandoc + xelatex for nbconvert --to pdf."
echo "See docs/export-pdf.md for full instructions."
