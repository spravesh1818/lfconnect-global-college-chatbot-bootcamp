# Global Chatbot Bootcamp — Course Site

Static teaching site for **Building AI Chatbots with LLMs and RAG**. Weeks 1–3 slide decks are live; Week 4 is stubbed as “Coming soon.”

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

> Use a local server (not `file://`) so fonts and assets load correctly.

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
index.html              # Course home (editorial/paper theme)
week-1/
  index.html            # Week 1 hub (retro terminal theme)
  class-1.html          # Self-contained fixed-stage slide decks
  class-2.html          # (no build step, no shared JS/CSS — each file is standalone)
  class-3.html
  notebooks/
    hello_chatbot_groq.ipynb   # Class 2 — Groq API + Hello Chatbot (Google Colab)
week-2/
  index.html            # Week 2 hub (Electric Studio theme)
  class-1.html          # Prompt engineering slides
  class-2.html          # LangChain chains + tool agent slides
  class-3.html          # Building a LangGraph agent slides
  class-4.html          # Scraping + PDF + RAG lab slides
  notebooks/
    week2_langchain_fundamentals.ipynb  # Class 2 — chains, tools, standalone tool agent
    week2_langgraph_agent.ipynb         # Class 3 — LangGraph agent (chat/calculate/research/docs)
    week2_data_collection_rag.ipynb     # Class 4 — scraping, PDF chunking, wiring data into the agent
  data/
    sample.pdf          # Sample PDF for in-class parsing
week-3/
  index.html            # Week 3 hub (Latent Space theme)
  roadmap.html          # Animated canvas infographic: the course journey so far
  class-1.html          # Embeddings foundations slides
  class-2.html          # FAISS vector search slides
  class-3.html          # Qdrant + retrieval-enabled agent slides
  notebooks/
    week3_embeddings_foundations.ipynb  # Class 1 — cosine, semantic search, PCA, limitations
    week3_faiss_vector_search.ipynb     # Class 2 — Flat/IVF/HNSW, recall@k benchmarks, persistence
    week3_qdrant_retrieval_agent.ipynb  # Class 3 — Qdrant, filters, retrieval-backed docs node
assets/
  images/               # Logos, QR codes, diagrams
docs/
  design.md             # Design system reference
```

## Design

Every page is a self-contained HTML file — no shared CSS/JS, no build step, no external slide
framework. Each week has its own visual identity: the course home uses a warm editorial/paper
theme, Week 1 uses a retro phosphor-green terminal theme, Week 2 uses a white/black "Electric
Studio" split-panel theme, and Week 3 uses a dark "Latent Space" theme (violet + cyan on
near-black). See [docs/design.md](docs/design.md) for details.

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

## Week 3 content

| Class | Topic | Notebook |
|-------|--------|----------|
| 1 | Embeddings — meaning as numbers: cosine similarity by hand, sentence-transformers (`all-MiniLM-L6-v2`, 384-D), a NumPy semantic search engine over Week 2 chunks, PCA visualization, limitation lab (negation / exact IDs / numbers) | `week3_embeddings_foundations.ipynb` |
| 2 | Vector search at scale — exact vs ANN, FAISS `Flat` / `IVF` / `HNSW`, live benchmarks with recall@10, nprobe/efSearch tuning, index + chunk-store persistence | `week3_faiss_vector_search.ipynb` |
| 3 | Qdrant + retrieval agent — collections, points, payloads, filtered search, `retrieve()` with score threshold, grounded prompting with source citations, upgraded `docs` node in the Week 2 LangGraph agent | `week3_qdrant_retrieval_agent.ipynb` |

Week 3 also ships [week-3/roadmap.html](week-3/roadmap.html) — an animated HTML5-canvas
infographic of the course journey (basic chat → prompts/agents/data → embeddings → RAG),
embedded as slide 2 of Class 1 and linked from the Week 3 hub.

**Week 3 lab deliverable:** Retrieval-Enabled LangGraph Agent — the Week 2 agent with its `docs`
node backed by live top-k Qdrant retrieval over the student's own chunk dataset, with payload
filters, a score threshold for honest misses, and sources cited in answers.

**Open Week 3 notebooks in Colab:**

```
https://colab.research.google.com/github/spravesh1818/lfconnect-global-college-chatbot-bootcamp/blob/main/week-3/notebooks/week3_embeddings_foundations.ipynb
https://colab.research.google.com/github/spravesh1818/lfconnect-global-college-chatbot-bootcamp/blob/main/week-3/notebooks/week3_faiss_vector_search.ipynb
https://colab.research.google.com/github/spravesh1818/lfconnect-global-college-chatbot-bootcamp/blob/main/week-3/notebooks/week3_qdrant_retrieval_agent.ipynb
```

**Dependencies (installed in notebooks):** `sentence-transformers`, `faiss-cpu`, `qdrant-client`, `scikit-learn`, `langchain-core`, `langchain-groq`, `langgraph`, `langchain-community`, `duckduckgo-search`

Only Class 3 needs the Groq API key; Classes 1–2 run fully offline in Colab.

**PDF export (Week 3):** `./scripts/export-week3-notebook-pdf.sh` (exports all three notebooks)

**QR codes:** add `week3-class-1.png`, `week3-class-2.png`, `week3-class-3.png` under `assets/images/qr-codes/` — see that folder's README.

## Week 2 content

| Class | Topic | Notebook |
|-------|--------|----------|
| 1 | Prompt engineering — zero-shot, few-shot, CoT, zero-shot CoT, CO-STAR/CRISP, exam-prep example | — |
| 2 | LangChain `ChatPromptTemplate`, LCEL, sequential chains, standalone tool-calling agent | `week2_langchain_fundamentals.ipynb` |
| 3 | Building a LangGraph agent from scratch: shared state, classify router, `calculate` and `research` tool nodes, a context-aware `docs` node. Homework: design a 5th intent of your own. | `week2_langgraph_agent.ipynb` |
| 4 | Web scraping (quotes.toscrape.com), PDF parsing + chunking, wiring real data into the Class 3 agent's `docs` node, lab deliverable | `week2_data_collection_rag.ipynb` |

**Week 2 lab deliverable:** LangGraph agent (classify → chat / calculate / research / docs) + chunked dataset (scraped JSON + PDF chunks) wired into the `docs` node, ready for Week 3 embeddings.

**Open Week 2 notebooks in Colab:**

```
https://colab.research.google.com/github/spravesh1818/lfconnect-global-college-chatbot-bootcamp/blob/main/week-2/notebooks/week2_langchain_fundamentals.ipynb
https://colab.research.google.com/github/spravesh1818/lfconnect-global-college-chatbot-bootcamp/blob/main/week-2/notebooks/week2_langgraph_agent.ipynb
https://colab.research.google.com/github/spravesh1818/lfconnect-global-college-chatbot-bootcamp/blob/main/week-2/notebooks/week2_data_collection_rag.ipynb
```

**Dependencies (installed in notebooks):** `langchain`, `langchain-core`, `langchain-groq`, `langgraph`, `langchain-community`, `duckduckgo-search`, `requests`, `beautifulsoup4`, `pymupdf`

**PDF export (Week 2):** `./scripts/export-week2-notebook-pdf.sh` (exports the Class 3 and Class 4 notebooks)

**QR codes:** add `week2-class-1.png`, `week2-class-2.png`, `week2-class-3.png`, `week2-class-4.png` under `assets/images/qr-codes/` — see that folder's README.

## Week 1 content

| Class | Topic |
|-------|--------|
| 1 | Chatbot foundations, pipeline, tools, brainstorm activity |
| 2 | Python refresher, Groq API, Hello Chatbot, Gradio assignment — **notebook:** `week-1/notebooks/hello_chatbot_groq.ipynb` |
| 3 | System prompts, personalities, debugging, lab deliverable |

Slide controls: arrow keys to navigate, `F` for fullscreen, `S` for speaker notes (if enabled in browser).
