# LangChain Fundamentals Notebook — Design Spec

**Date:** 2026-06-25
**Replaces:** `week-2/notebooks/week2_agent_and_data.ipynb`
**Output file:** `week-2/notebooks/week2_langchain_fundamentals.ipynb`

---

## Context

Week 1 students arrive knowing: raw `groq` Python SDK, message dicts (`role`/`content`), a basic chatbot REPL, and introductory Python. The existing Week 2 notebook tries to teach prompt templates, LCEL, message roles, LangGraph, web scraping, PDF parsing, and tool agents in one file — overloading students and mixing unrelated concerns.

This spec defines a focused replacement: **LangChain fundamentals only**, taught project-style.

---

## Goals

- Students finish knowing *why* LangChain exists and when to reach for each abstraction
- Every concept is introduced only when the previous naive approach breaks down
- All exercise scaffolds run without modification — students fill in clearly marked TODOs that never break the cell
- No domain specificity (no biology); examples use general assistant tasks students find relatable
- No LangGraph, no web scraping, no PDF parsing — those belong in later notebooks

---

## Approach: Project-Driven

We build one thing: **a progressively smarter general-purpose assistant**. Each section adds one capability; each capability is motivated by a concrete limitation of the approach so far.

```
Raw groq pain
  → prompt templates (hardcoded strings break)
  → LCEL pipe + StrOutputParser (manual .content extraction is tedious)
  → sequential chains (one-shot answers are shallow)
  → @tool + custom tools (static model knowledge)
  → DuckDuckGo + AgentExecutor (model can't reach the internet)
  → full assistant (everything wired together)
  → assignment (students extend it)
```

---

## Section Breakdown

### Section 1 — Setup
- `!pip install langchain langchain-core langchain-groq langchain-community duckduckgo-search`
- API key via `getpass` / Colab Secrets
- Single `ChatGroq` instance and `MODEL` constant shared for the whole notebook

### Section 2 — The Hardcoded Prompt Problem
**Pain shown:** copy-paste the same prompt string with different variables; one typo breaks everything.

```python
# naive: hardcoded, not reusable
reply = client.chat.completions.create(
    model=MODEL,
    messages=[{"role": "user", "content": "Explain recursion in simple terms."}]
)
```

**Solution introduced:** `ChatPromptTemplate.from_messages()`
- Variables via `{variable_name}`
- `.format_messages()` to inspect the rendered list
- `.invoke()` on `prompt | llm`

**Mini-exercise (2 min):** Change the topic variable — students run the same template with two different topics.

### Section 3 — Prompt Techniques
Four techniques, each a short code cell + prose callout:

| Technique | Key idea | Code pattern |
|-----------|----------|--------------|
| Zero-shot | instruction only | `("system", ...), ("human", "{topic}")` |
| Few-shot | show one example via `("ai", ...)` turn | assistant turn as format demo |
| Chain-of-thought | explicit step reasoning | "Show your reasoning step by step" in system |
| Zero-shot CoT | trigger phrase | `"Let's think step by step.\n{question}"` |

No biology examples. Topics: explaining a concept, comparing two options, debugging advice.

**Mini-exercise (3 min):** Students pick one technique and write their own prompt for a topic of their choice.

### Section 4 — LCEL: The Pipe Operator
**Pain shown:** `response.content` extraction scattered everywhere; can't chain outputs.

```python
result = (prompt | llm).invoke({"topic": "recursion"})
print(result.content)        # AIMessage — annoying
```

**Solution introduced:** `StrOutputParser`
```python
chain = prompt | llm | StrOutputParser()
result = chain.invoke({"topic": "recursion"})
print(result)                # plain str — composable
```

- Show type difference explicitly: `type(result)` before and after parser
- Explain Runnable interface in a callout (one sentence: "anything you can pipe is a Runnable")
- `MessagesPlaceholder` for multi-turn history: show how to slot prior conversation in

**Mini-exercise (2 min):** Add `StrOutputParser` to their Section 3 chain.

### Section 5 — Sequential Chains (Two-Step Workflow)
**Pain shown:** the model can't produce a summary *and then* generate questions in a single call — you'd need one giant prompt and hope it does both well.

**Solution introduced:** chain output of one LCEL chain into input of another.

```python
step1 = summarize_prompt | llm | StrOutputParser()
step2 = quiz_prompt | llm | StrOutputParser()

summary   = step1.invoke({"topic": "binary search"})
questions = step2.invoke({"summary": summary})
```

- Explicitly show data flowing: `summary` is a plain `str`, passed directly to next chain's variable
- No magic — just Python calling two chains sequentially

**Mini-exercise (5 min, pairs):** Write a 2-step chain: first explain a concept, then produce 3 interview questions about it.

### Section 6 — Custom Tools
**Pain shown:** ask the assistant "what's today's date?" — it guesses or refuses.

**Solution introduced:** `@tool` decorator.

```python
from langchain.tools import tool
from datetime import date

@tool
def get_today(query: str = "") -> str:
    """Returns today's date. Use when asked about the current date."""
    return f"Today is {date.today().isoformat()}"
```

- Docstring controls when the LLM calls the tool — emphasize this
- Test tool directly: `get_today.invoke("")`
- Second example tool: `word_counter(text)` — counts words

**Mini-exercise (5 min):** Write one `@tool` of their own (ideas given: `celsius_to_fahrenheit`, `reverse_string`, `list_to_bullets`).

### Section 7 — DuckDuckGo Search Tool
**Pain shown:** ask about a recent event — model's knowledge cutoff means it can't answer.

**Solution introduced:** `DuckDuckGoSearchRun` — no API key needed.

```python
from langchain_community.tools import DuckDuckGoSearchRun
search = DuckDuckGoSearchRun()
print(search.run("latest Python release version"))
```

- Show raw output — it's just a string
- Explain: tools return strings; the agent decides when to call them

### Section 8 — The Full Tool Agent
**Solution introduced:** `create_tool_calling_agent` + `AgentExecutor` (ReAct loop).

```python
tools = [search, get_today, word_counter]
agent = create_tool_calling_agent(tool_llm, tools, agent_prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True, max_iterations=5)
```

- `verbose=True` so students see the ReAct loop in action (Thought → Tool call → Observation → Answer)
- Run 3 test queries: one date, one search, one combined
- Explain `max_iterations` — prevents infinite loops

**Mini-exercise (5 min):** Add their custom tool from Section 6 to the executor and trigger it with a query.

### Section 9 — Assignment: Build Your Own Assistant
No starter code provided for the deliverable. Students build from scratch using what they learned.

**Requirements:**
1. `ChatPromptTemplate` with at least one variable
2. LCEL chain with `StrOutputParser`
3. At least 2 custom `@tool` functions
4. `AgentExecutor` wired with search + custom tools
5. 3+ test queries that demonstrate each tool being called

**Deliverables:**
- Working notebook cells
- Screenshot of `verbose=True` output showing tool calls
- Optional: 2-step chain (summarize → quiz/rewrite)

---

## What This Notebook Explicitly Excludes

| Topic | Where it goes |
|-------|---------------|
| LangGraph | Week 3 (after students are comfortable with LCEL) |
| Web scraping | Week 2 Class 3 notebook (separate concern) |
| PDF parsing / chunking | Week 2 Class 3 notebook |
| Vector stores / embeddings | Week 3 |
| Memory / checkpointers | Week 3 |

---

## Technical Constraints

- **Runtime:** Google Colab (Python 3.10+)
- **LLM provider:** Groq (`llama-3.3-70b-versatile`) — free tier, no credit card
- **All exercises must run top-to-bottom** without error even before students fill in TODOs (TODOs only change behavior, never break imports or cell execution)
- **Single shared `llm` instance** throughout; no switching mid-notebook
- Sections 1–8 are in-class; Section 9 is homework

---

## Spec Self-Review

- No TBDs or incomplete sections remain
- Architecture matches feature descriptions (each section builds on the last)
- Scope is bounded: one notebook, one narrative thread, nine sections
- All requirements are unambiguous: each section has a pain, a solution, and an exercise
