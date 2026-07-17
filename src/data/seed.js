// Seed content. Written to Realtime Database once, on first admin login.
// Everything here is editable from the Admin screen afterwards.

export const APP_NAME = 'Vector Circle';
export const APP_TAGLINE = 'Track the courses. Hold the streak. Climb the board.';

export const QUOTES = [
  { text: 'The expert in anything was once a beginner who refused to quit.', author: 'Helen Hayes' },
  { text: 'You do not rise to the level of your goals. You fall to the level of your systems.', author: 'James Clear' },
  { text: 'Amateurs sit and wait for inspiration. The rest of us just get up and go to work.', author: 'Stephen King' },
  { text: 'Skill is only developed by hours and hours of work.', author: 'Usain Bolt' },
  { text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese proverb' },
  { text: 'Arise, awake, and stop not till the goal is reached.', author: 'Swami Vivekananda' },
  { text: 'Success is the sum of small efforts repeated day in and day out.', author: 'Robert Collier' },
  { text: 'Do not wait to be hired to start doing the work. Do the work, then get hired for it.', author: 'Unattributed, career advice' },
  { text: 'Learning is not attained by chance. It must be sought for with ardour and attended to with diligence.', author: 'Abigail Adams' },
  { text: 'A ship in harbour is safe, but that is not what ships are built for.', author: 'John A. Shedd' },
  { text: 'If you are the smartest person in the room, you are in the wrong room.', author: 'Confucius (attributed)' },
  { text: 'Your degree gets you the interview. Your projects get you the offer.', author: 'Placement folklore' },
  { text: 'Depth beats breadth. Pick one thing and go embarrassingly deep.', author: 'Unattributed' },
  { text: 'Compound interest works on knowledge too. Show up daily.', author: 'Unattributed' },
  { text: 'Fall in love with the boredom of repetition.', author: 'James Clear' },
  { text: 'Dream is not that which you see while sleeping, it is something that does not let you sleep.', author: 'A. P. J. Abdul Kalam' },
  { text: 'Excellence is a continuous process and not an accident.', author: 'A. P. J. Abdul Kalam' },
  { text: 'What we know is a drop, what we do not know is an ocean.', author: 'Isaac Newton' },
  { text: 'Discipline equals freedom.', author: 'Jocko Willink' },
  { text: 'It always seems impossible until it is done.', author: 'Nelson Mandela' }
];

// ---------------------------------------------------------------------------
// MILESTONE: RAG Specialist in 8 weeks
// Every task links to free, well-regarded material. `dots` are always out of 10.
// ---------------------------------------------------------------------------

export const RAG_MILESTONE = {
  id: 'rag-specialist',
  title: 'RAG Specialist',
  subtitle: 'Zero to production-grade Retrieval-Augmented Generation',
  description:
    'Eight weeks, twenty-one steps. Start from what a large language model actually is, end with an evaluated, agentic, multimodal RAG system you can demo in an interview. Every course on this track is free to audit.',
  reward: 'First to fill all dots takes the Specialist badge, a pinned spot on the board, and presents their capstone to the circle.',
  durationWeeks: 8,
  startDate: '', // set by admin
  endDate: '',
  active: true,
  createdAt: 0
};

export const RAG_TASKS = [
  // ---- Week 1 — Ground floor -------------------------------------------------
  {
    order: 1, week: 1, stage: 'Foundations',
    title: 'Generative AI for Everyone',
    provider: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/courses/generative-ai-for-everyone/',
    hours: 5, type: 'course',
    outcome: 'Explain what an LLM can and cannot do, and where retrieval fits in the picture.'
  },
  {
    order: 2, week: 1, stage: 'Foundations',
    title: 'ChatGPT Prompt Engineering for Developers',
    provider: 'DeepLearning.AI · OpenAI',
    url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    hours: 2, type: 'course',
    outcome: 'Write prompts that are specific, testable, and iterable. This is the base skill under every RAG prompt template.'
  },
  {
    order: 3, week: 1, stage: 'Foundations',
    title: 'Hugging Face NLP Course — Chapters 1 & 2',
    provider: 'Hugging Face',
    url: 'https://huggingface.co/learn/nlp-course/chapter1/1',
    hours: 5, type: 'course',
    outcome: 'Transformers, tokenizers and the pipeline API, hands-on. Chapters 1–2 only; the rest is optional.'
  },

  // ---- Week 2 — Retrieval core ----------------------------------------------
  {
    order: 4, week: 2, stage: 'Retrieval core',
    title: 'Retrieval Augmented Generation (RAG)',
    provider: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/courses/retrieval-augmented-generation/',
    hours: 8, type: 'course',
    outcome: 'The spine of this milestone. Chunking, indexing, retrieval, generation, and the failure modes of each.'
  },
  {
    order: 5, week: 2, stage: 'Retrieval core',
    title: 'Read: Retrieval-Augmented Generation for Knowledge-Intensive NLP',
    provider: 'Lewis et al., 2020 (arXiv)',
    url: 'https://arxiv.org/abs/2005.11401',
    hours: 2, type: 'paper',
    outcome: 'The original RAG paper. Know it by name and by argument — interviewers ask.'
  },

  // ---- Week 3 — Embeddings & vector search -----------------------------------
  {
    order: 6, week: 3, stage: 'Embeddings & vector search',
    title: 'Embedding Models: From Architecture to Implementation',
    provider: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/short-courses/embedding-models-from-architecture-to-implementation/',
    hours: 2, type: 'course',
    outcome: 'Why dual-encoders work, and how to pick an embedding model instead of defaulting to one.'
  },
  {
    order: 7, week: 3, stage: 'Embeddings & vector search',
    title: 'Vector Databases: from Embeddings to Applications',
    provider: 'DeepLearning.AI · Weaviate',
    url: 'https://www.deeplearning.ai/short-courses/vector-databases-embeddings-applications/',
    hours: 2, type: 'course',
    outcome: 'HNSW, ANN trade-offs, hybrid search. Enough to defend your index choice.'
  },
  {
    order: 8, week: 3, stage: 'Embeddings & vector search',
    title: 'Large Language Models with Semantic Search',
    provider: 'DeepLearning.AI · Cohere',
    url: 'https://www.deeplearning.ai/short-courses/large-language-models-semantic-search/',
    hours: 2, type: 'course',
    outcome: 'Dense retrieval plus reranking — the single highest-leverage quality fix in most RAG stacks.'
  },

  // ---- Week 4 — Building it --------------------------------------------------
  {
    order: 9, week: 4, stage: 'Build',
    title: 'LangChain for LLM Application Development',
    provider: 'DeepLearning.AI · LangChain',
    url: 'https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/',
    hours: 2, type: 'course',
    outcome: 'Chains, memory, and structured output. The plumbing.'
  },
  {
    order: 10, week: 4, stage: 'Build',
    title: 'LangChain: Chat with Your Data',
    provider: 'DeepLearning.AI · LangChain',
    url: 'https://www.deeplearning.ai/short-courses/langchain-chat-with-your-data/',
    hours: 2, type: 'course',
    outcome: 'Your first end-to-end RAG app. Do not just watch it — ship it on your own documents.'
  },
  {
    order: 11, week: 4, stage: 'Build',
    title: 'Checkpoint: ship RAG v1 on your own corpus',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 8, type: 'project',
    outcome: 'Index 50+ pages you actually care about (course notes, a textbook, NIT-S circulars). Push to GitHub with a README. Dots = your own honest completion.'
  },

  // ---- Week 5 — Data quality & retrieval quality ------------------------------
  {
    order: 12, week: 5, stage: 'Quality',
    title: 'Preprocessing Unstructured Data for LLM Applications',
    provider: 'DeepLearning.AI · Unstructured',
    url: 'https://www.deeplearning.ai/short-courses/preprocessing-unstructured-data-for-llm-applications/',
    hours: 2, type: 'course',
    outcome: 'PDFs, tables, images. Most RAG systems fail here, not at the model.'
  },
  {
    order: 13, week: 5, stage: 'Quality',
    title: 'Advanced Retrieval for AI with Chroma',
    provider: 'DeepLearning.AI · Chroma',
    url: 'https://www.deeplearning.ai/short-courses/advanced-retrieval-for-ai/',
    hours: 2, type: 'course',
    outcome: 'Query expansion, HyDE, cross-encoder reranking. Where beginners stop and specialists start.'
  },
  {
    order: 14, week: 5, stage: 'Quality',
    title: 'Read: Lost in the Middle — How Language Models Use Long Contexts',
    provider: 'Liu et al., 2023 (arXiv)',
    url: 'https://arxiv.org/abs/2307.03172',
    hours: 1, type: 'paper',
    outcome: 'Why "just stuff more context in" is not a retrieval strategy. Directly relevant to context pruning.'
  },

  // ---- Week 6 — Evaluation ---------------------------------------------------
  {
    order: 15, week: 6, stage: 'Evaluation',
    title: 'Building and Evaluating Advanced RAG Applications',
    provider: 'DeepLearning.AI · LlamaIndex · TruEra',
    url: 'https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/',
    hours: 2, type: 'course',
    outcome: 'The RAG triad: context relevance, groundedness, answer relevance. Bring numbers to your interview, not vibes.'
  },
  {
    order: 16, week: 6, stage: 'Evaluation',
    title: 'Quality and Safety for LLM Applications',
    provider: 'DeepLearning.AI · WhyLabs',
    url: 'https://www.deeplearning.ai/short-courses/quality-safety-llm-applications/',
    hours: 2, type: 'course',
    outcome: 'Hallucination detection, prompt injection, PII leakage. The questions a hiring panel will actually probe.'
  },
  {
    order: 17, week: 6, stage: 'Evaluation',
    title: 'Checkpoint: add an eval harness to RAG v1',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 6, type: 'project',
    outcome: 'A 30-question golden set and a score you can quote. Commit the results table to your README.'
  },

  // ---- Week 7 — Beyond flat retrieval ----------------------------------------
  {
    order: 18, week: 7, stage: 'Specialist',
    title: 'Knowledge Graphs for RAG',
    provider: 'DeepLearning.AI · Neo4j',
    url: 'https://www.deeplearning.ai/short-courses/knowledge-graphs-rag/',
    hours: 2, type: 'course',
    outcome: 'Graph-structured retrieval. This is where GraphRAG and context pruning research lives.'
  },
  {
    order: 19, week: 7, stage: 'Specialist',
    title: 'Building Agentic RAG with LlamaIndex',
    provider: 'DeepLearning.AI · LlamaIndex',
    url: 'https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/',
    hours: 2, type: 'course',
    outcome: 'Routing, tool use, multi-step retrieval. Static top-k is not the ceiling.'
  },
  {
    order: 20, week: 7, stage: 'Specialist',
    title: 'Multimodal RAG: Chat with Videos',
    provider: 'DeepLearning.AI · Intel',
    url: 'https://www.deeplearning.ai/short-courses/multimodal-rag-chat-with-videos/',
    hours: 2, type: 'course',
    outcome: 'Retrieval over frames and transcripts, not just text chunks.'
  },

  // ---- Week 8 — Ship & defend -------------------------------------------------
  {
    order: 21, week: 8, stage: 'Capstone',
    title: 'LLMOps',
    provider: 'DeepLearning.AI · Google Cloud',
    url: 'https://www.deeplearning.ai/short-courses/llmops/',
    hours: 2, type: 'course',
    outcome: 'Versioning, pipelines, deployment. The difference between a notebook and a system.'
  },
  {
    order: 22, week: 8, stage: 'Capstone',
    title: 'Capstone: deploy a multilingual RAG assistant + write the case study',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 12, type: 'project',
    outcome:
      'Public URL, public repo, and a one-page case study: corpus, retrieval design, eval numbers, what broke and how you fixed it. Present to the circle. This is the artifact that gets you hired.'
  }
];

export const RAG_MATERIALS = [
  { title: 'RAG for LLMs: A Survey (Gao et al., 2024)', url: 'https://arxiv.org/abs/2312.10997', type: 'paper', note: 'The map of the whole field. Skim first, return often.' },
  { title: 'Precise Zero-Shot Dense Retrieval without Relevance Labels (HyDE)', url: 'https://arxiv.org/abs/2212.10496', type: 'paper', note: 'Hypothetical document embeddings.' },
  { title: 'ColBERT: Efficient and Effective Passage Search', url: 'https://arxiv.org/abs/2004.12832', type: 'paper', note: 'Late interaction retrieval.' },
  { title: 'Sentence-BERT', url: 'https://arxiv.org/abs/1908.10084', type: 'paper', note: 'Why sentence embeddings work at all.' },
  { title: 'Pinecone Learning Center', url: 'https://www.pinecone.io/learn/', type: 'reference', note: 'Best free written explainers on vector search.' },
  { title: 'Weaviate Academy', url: 'https://weaviate.io/developers/academy', type: 'reference', note: 'Hands-on, free, well structured.' },
  { title: 'LangChain documentation', url: 'https://python.langchain.com/docs/introduction/', type: 'reference', note: 'Read the concepts pages, not just the API.' },
  { title: 'LlamaIndex documentation', url: 'https://docs.llamaindex.ai/', type: 'reference', note: 'Strongest docs for retrieval strategies.' },
  { title: 'MTEB leaderboard', url: 'https://huggingface.co/spaces/mteb/leaderboard', type: 'reference', note: 'Pick embedding models with evidence.' },
  { title: 'Ragas — RAG evaluation toolkit', url: 'https://docs.ragas.io/', type: 'tool', note: 'Use this for the Week 6 checkpoint.' },
  { title: 'Full Stack Retrieval', url: 'https://community.fullstackretrieval.com/', type: 'reference', note: 'Chunking strategies, catalogued.' },
  { title: 'NIT Silchar placement prep — add your own links here', url: 'https://www.nits.ac.in/', type: 'reference', note: 'Admin: replace with the circle’s own resources.' }
];

// ---------------------------------------------------------------------------
// MILESTONE: Claude AI Mastery in 8 weeks
// Twelve steps, very basic to expert, across Claude's product surface:
// prompting, tool use, agents, MCP, Claude Code, Skills, Cowork, and the
// Agent SDK.
//
// Video-first: seven steps are free-to-audit video courses, most of them built
// by Anthropic with DeepLearning.AI (Elie Schoppik / Colt Steele) plus two of
// Andrew Ng's. Auditing gives full access to the video lectures and sandboxes.
// The remaining steps are hands-on checkpoints, and Cowork (no free video
// course exists yet) is a guided hands-on step. `dots` are always out of 10.
// URLs verified live July 2026; DeepLearning.AI occasionally moves paths, so
// admin should confirm each from Admin → Courses.
// ---------------------------------------------------------------------------

export const CLAUDE_MILESTONE = {
  // New id on purpose: the first cut seeded under 'claude-ai-expert', and
  // seedMilestoneIfMissing won't overwrite an existing milestone. A fresh id
  // lands the redesigned video-based syllabus cleanly. Delete the old
  // 'claude-ai-expert' milestone from Admin → Milestone once this is live.
  id: 'claude-ai-mastery',
  title: 'Claude AI Mastery',
  subtitle: 'From first prompt to shipping your own Claude agent',
  description:
    'Eight weeks, twelve steps, very basic to expert. Start from what a large language model is and how to work with Claude, then build through prompting, tool use, agents, MCP, Claude Code, Skills, Cowork, and the Agent SDK — and finish by shipping a Claude-powered agent or skill you can demo in an interview. Most steps are free-to-audit video courses, several built by Anthropic with DeepLearning.AI.',
  reward: 'First to fill all dots takes the Claude Expert badge, a pinned spot on the board, and demos their capstone to the circle.',
  durationWeeks: 8,
  startDate: '', // set by admin
  endDate: '',
  active: true,
  createdAt: 0
};

export const CLAUDE_TASKS = [
  // ---- Week 1 — Foundations (very basic) -------------------------------------
  {
    order: 1, week: 1, stage: 'Foundations',
    title: 'Generative AI for Everyone',
    provider: 'DeepLearning.AI · Andrew Ng',
    url: 'https://www.deeplearning.ai/courses/generative-ai-for-everyone/',
    hours: 5, type: 'course',
    outcome: 'The ground floor: what an LLM actually is and is not. No code. Free to audit — full video lectures.'
  },
  {
    order: 2, week: 1, stage: 'Foundations',
    title: 'AI Fluency: Framework and Foundations',
    provider: 'Anthropic',
    url: 'https://www.anthropic.com/learn/claude-for-you',
    hours: 4, type: 'course',
    outcome: 'Work with Claude deliberately — delegation, description, discernment — instead of poking at a chat box. Anthropic’s own free course.'
  },

  // ---- Week 2 — Prompting & the Claude API -----------------------------------
  {
    order: 3, week: 2, stage: 'Building with Claude',
    title: 'Building toward Computer Use with Anthropic',
    provider: 'DeepLearning.AI · Anthropic (Colt Steele)',
    url: 'https://www.deeplearning.ai/courses/building-toward-computer-use-with-anthropic/',
    hours: 4, type: 'course',
    outcome: 'The Claude API hands-on: multimodal prompts, prompt caching, tool use, and Claude driving a computer interface. The core builder’s course. Free to audit.'
  },
  {
    order: 4, week: 2, stage: 'Building with Claude',
    title: 'Checkpoint: a prompt + tool-use mini project',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 5, type: 'project',
    outcome: 'Build one small thing on the Claude API that uses a tool call and a structured prompt. Push it to GitHub with a README. Dots = your own honest completion.'
  },

  // ---- Week 3 — How agents work ----------------------------------------------
  {
    order: 5, week: 3, stage: 'Agents',
    title: 'Agentic AI',
    provider: 'DeepLearning.AI · Andrew Ng',
    url: 'https://www.deeplearning.ai/courses/agentic-ai/',
    hours: 6, type: 'course',
    outcome: 'The mental model for everything that follows: planning, tool use, reflection, and multi-step workflows. Free to audit.'
  },

  // ---- Week 4 — MCP ----------------------------------------------------------
  {
    order: 6, week: 4, stage: 'MCP',
    title: 'MCP: Build Rich-Context AI Apps with Anthropic',
    provider: 'DeepLearning.AI · Anthropic (Elie Schoppik)',
    url: 'https://www.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic',
    hours: 3, type: 'course',
    outcome: 'The Model Context Protocol end to end: build an MCP server and client, connect to reference servers, and deploy a remote one. This is how Claude reaches tools and data. Free to audit.'
  },

  // ---- Week 5 — Claude Code ---------------------------------------------------
  {
    order: 7, week: 5, stage: 'Claude Code',
    title: 'Claude Code: A Highly Agentic Coding Assistant',
    provider: 'DeepLearning.AI · Anthropic (Elie Schoppik)',
    url: 'https://www.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant',
    hours: 4, type: 'course',
    outcome: 'Agentic coding for real: subagents working in parallel, MCP servers (Playwright, Figma), autonomous pull requests, and turning a notebook into a dashboard. Free to audit.'
  },
  {
    order: 8, week: 5, stage: 'Claude Code',
    title: 'Checkpoint: drive Claude Code through a real repo',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 6, type: 'project',
    outcome: 'Point Claude Code at a project you care about, add a CLAUDE.md, and land a real change — a feature or a bug fix — as a pull request. Commit the transcript notes.'
  },

  // ---- Week 6 — Skills -------------------------------------------------------
  {
    order: 9, week: 6, stage: 'Skills',
    title: 'Agent Skills with Anthropic',
    provider: 'DeepLearning.AI · Anthropic (Elie Schoppik)',
    url: 'https://www.deeplearning.ai/courses/agent-skills-with-anthropic',
    hours: 3, type: 'course',
    outcome: 'SKILL.md, progressive disclosure, and skills in action across Claude.ai, Claude Code, the API and the Agent SDK, combined with MCP and subagents. Free to audit.'
  },
  {
    order: 10, week: 6, stage: 'Skills',
    title: 'Checkpoint: build and package a custom Skill',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 5, type: 'project',
    outcome: 'A skill that does one thing well, with a description that triggers reliably. Test it in Claude.ai and Claude Code. This is the first thing you can hand to someone else.'
  },

  // ---- Week 7 — Cowork & the Agent SDK (expert) ------------------------------
  {
    order: 11, week: 7, stage: 'Cowork & Agent SDK',
    title: 'Claude Cowork: automate files and tasks (hands-on)',
    provider: 'Anthropic docs · self-directed',
    url: 'https://docs.claude.com/',
    hours: 4, type: 'project',
    outcome: 'No free video course exists yet, so this is hands-on: use Cowork to automate a real file/task workflow, and see how plugins bundle skills, tools and MCPs. Admin: link the current Cowork docs page here.'
  },
  {
    order: 12, week: 8, stage: 'Capstone',
    title: 'Capstone: build a custom agent on the Agent SDK + case study',
    provider: 'Self-directed · Anthropic Agent SDK docs',
    url: 'https://docs.claude.com/',
    hours: 12, type: 'project',
    outcome:
      'Stand up your own agent on the Claude Agent SDK — the foundation under Claude Code and Cowork — wiring in a tool or MCP server and a skill. Public repo plus a one-page case study: what it does, how it is built, what broke, how you fixed it. Demo it to the circle. This is the artifact that gets you hired. Admin: link the current Agent SDK docs here.'
  }
];

export const CLAUDE_MATERIALS = [
  { title: 'Anthropic Academy — free Claude courses', url: 'https://anthropic.skilljar.com/', type: 'reference', note: 'Anthropic’s own free course catalogue. Fluency, product, and developer tracks.' },
  { title: 'Anthropic learning hub', url: 'https://www.anthropic.com/learn', type: 'reference', note: 'The map of official guides and courses, including AI Fluency.' },
  { title: 'Claude documentation', url: 'https://docs.claude.com/', type: 'reference', note: 'The primary reference. Admin: link specific pages from each step here.' },
  { title: 'Prompt engineering interactive tutorial', url: 'https://github.com/anthropics/courses', type: 'reference', note: 'Anthropic’s hands-on prompting tutorial. Do it alongside Week 2.' },
  { title: 'Anthropic Cookbook', url: 'https://github.com/anthropics/anthropic-cookbook', type: 'reference', note: 'Runnable code examples. Skim early, return per topic.' },
  { title: 'Model Context Protocol (MCP)', url: 'https://modelcontextprotocol.io/', type: 'reference', note: 'The open protocol behind tools and connectors. Reference for Week 4.' },
  { title: 'Vector Circle — add the circle’s own Claude links here', url: 'https://docs.claude.com/', type: 'reference', note: 'Admin: replace with resources the circle finds useful.' }
];
