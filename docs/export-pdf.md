# Export Class 2 notebook as PDF

The full notebook ([week-1/notebooks/hello_chatbot_groq.ipynb](../week-1/notebooks/hello_chatbot_groq.ipynb)) can be exported for printing or email. Section 16 is assignment text only (no Gradio solution code).

## Quick export (recommended)

From the repo root:

```bash
chmod +x scripts/export-notebook-pdf.sh
./scripts/export-notebook-pdf.sh
```

Output: [week-1/exports/hello_chatbot_groq.pdf](../week-1/exports/hello_chatbot_groq.pdf) (or `.html` if PDF tooling is missing).

### Prerequisites

```bash
pip install jupyter nbconvert
```

For direct PDF via `nbconvert --to pdf` you also need a LaTeX distribution (e.g. MacTeX, TeX Live) or:

```bash
pip install nbconvert[webpdf]
playwright install chromium
jupyter nbconvert --to webpdf week-1/notebooks/hello_chatbot_groq.ipynb --output-dir week-1/exports
```

## Colab fallback

1. Open the notebook in Google Colab.
2. **File → Print** (or download as PDF if your browser offers it from print preview).

## Email the PDF

Cursor and this repo **cannot send email automatically**.

After export:

1. Attach `week-1/exports/hello_chatbot_groq.pdf` (or the HTML printout).
2. Send to **spravesh1818@gmail.com** from your mail client.

Example (macOS Mail from Terminal, if configured):

```bash
# Only if you use mail(1) with a working setup
mail -s "Class 2 notebook PDF" -a week-1/exports/hello_chatbot_groq.pdf spravesh1818@gmail.com < /dev/null
```

## What is included

- Sections 1–5: Python refresher (runnable cells)
- Sections 6–15: Groq API, roles, REPL, error handling
- Section 16: Gradio assignment requirements (markdown only)
- Section 17: Homework checklist
