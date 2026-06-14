# Global Chatbot Bootcamp — Course Site

Static teaching site for **Building AI Chatbots with LLMs and RAG**. Week 1 and Week 2 slide decks are live; Weeks 3–4 are stubbed as “Coming soon.”

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

> Use a local server (not `file://`) so Reveal.js and assets load correctly.

## GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose your default branch (e.g. `main`) and folder **`/ (root)`**.
5. Save. The site will be available at:

   `https://spravesh1818.github.io/lfconnect-global-college-chatbot-bootcamp/`

The `.nojekyll` file ensures GitHub Pages serves all paths without Jekyll processing.

## Structure

```
index.html              # Course home
week-1/
  index.html            # Week 1 hub
  class-1.html          # Reveal.js slides
  class-2.html
  class-3.html
  notebooks/
    hello_chatbot_groq.ipynb   # Class 2 — Groq API + Hello Chatbot (Google Colab)
week-2/
  index.html            # Week 2 hub
  class-1.html          # Prompt engineering slides
  class-2.html          # LangChain + LangGraph slides
  class-3.html          # Scraping + PDF lab slides
  notebooks/
    week2_agent_and_data.ipynb # Class 2–3 — LangChain, LangGraph, scraping, chunking
  data/
    sample.pdf          # Sample photosynthesis PDF for in-class parsing
assets/
  css/                  # Design tokens + hub + slide themes
  js/site.js            # Shared navigation
docs/
  design.md             # Spotify-inspired design system reference
```

## Design

Visual styling follows [docs/design.md](docs/design.md): dark surfaces (`#121212`–`#1f1f1f`), Spotify Green (`#1ed760`) accents, pill buttons, and compact typography.

## Colab notebooks

Week 1 Class 2 includes a hands-on notebook aligned with the slides: **Python refresher (Sections 1–5)**, then **Groq API (6–15)**, then a **Gradio assignment (Section 16 — students write the code; no solution in the repo)**.

**Repository:** [github.com/spravesh1818/lfconnect-global-college-chatbot-bootcamp](https://github.com/spravesh1818/lfconnect-global-college-chatbot-bootcamp)

**Open in Google Colab:**

```
https://colab.research.google.com/github/spravesh1818/lfconnect-global-college-chatbot-bootcamp/blob/main/week-1/notebooks/hello_chatbot_groq.ipynb
```

**Local Jupyter:** open [week-1/notebooks/hello_chatbot_groq.ipynb](week-1/notebooks/hello_chatbot_groq.ipynb).

Students need a free API key from [console.groq.com](https://console.groq.com) before Section 7. The notebook uses `getpass` in Colab — never commit keys to Git.

**Class 2 homework:** implement the Gradio chat UI described in notebook **Section 16** (system prompt + `chat(messages)`).

**PDF export:** run `./scripts/export-notebook-pdf.sh` or see [docs/export-pdf.md](docs/export-pdf.md) (email the PDF manually, e.g. to spravesh1818@gmail.com).

## Week 2 content

| Class | Topic |
|-------|--------|
| 1 | Prompt engineering — zero-shot, few-shot, CoT, zero-shot CoT, CO-STAR/CRISP, exam-prep example |
| 2 | LangChain `ChatPromptTemplate`, roles deep dive, LangGraph agent — **notebook:** `week-2/notebooks/week2_agent_and_data.ipynb` (Sections 1–14) |
| 3 | Web scraping (quotes.toscrape.com), PDF parsing + chunking, lab deliverable (Sections 15–25) |

**Week 2 lab deliverable:** LangGraph agent (classify → chat / study) + chunked dataset (scraped JSON + PDF chunks) ready for Week 3 embeddings.

**Open Week 2 notebook in Colab:**

```
https://colab.research.google.com/github/spravesh1818/lfconnect-global-college-chatbot-bootcamp/blob/main/week-2/notebooks/week2_agent_and_data.ipynb
```

**Dependencies (installed in notebook):** `langchain`, `langchain-core`, `langchain-groq`, `langgraph`, `requests`, `beautifulsoup4`, `pymupdf`

**PDF export (Week 2):** `./scripts/export-week2-notebook-pdf.sh`

**QR codes:** add `week2-class-1.png`, `week2-class-2.png`, `week2-class-3.png` under `assets/images/qr-codes/` — see that folder's README.

## Week 1 content

| Class | Topic |
|-------|--------|
| 1 | Chatbot foundations, pipeline, tools, brainstorm activity |
| 2 | Python refresher, Groq API, Hello Chatbot, Gradio assignment — **notebook:** `week-1/notebooks/hello_chatbot_groq.ipynb` |
| 3 | System prompts, personalities, debugging, lab deliverable |

Slide controls: arrow keys to navigate, `F` for fullscreen, `S` for speaker notes (if enabled in browser).
