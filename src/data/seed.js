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

// ---------------------------------------------------------------------------
// MILESTONE: Production LLM Engineer in 28 weeks
// A free-to-audit path that mirrors a paid 7-month "Production LLM Engineering:
// RAG, Agents & Fine-Tuning" program. Twenty-eight steps, basic to advanced,
// across the same three pillars — model internals & fine-tuning, advanced RAG,
// and agentic systems — on an evaluation / LLMOps backbone.
//
// Mostly free short video courses (DeepLearning.AI short courses audit for
// free; Hugging Face courses are free; one Karpathy deep-dive). Five checkpoints
// stand in for the program's five capstone projects.
//
// Honest limits of a free path: the fine-tuning, distillation and serving steps
// need a GPU — Google Colab / Kaggle free tiers carry the checkpoints. The
// paid program's managed AWS deployment (SageMaker, Bedrock AgentCore) is taught
// here as concepts plus the one free Bedrock course; reproducing it fully needs
// an AWS account. URLs verified live July 2026; providers move course paths, so
// admin should confirm each from Admin → Courses.
// ---------------------------------------------------------------------------

export const PLLM_MILESTONE = {
  id: 'production-llm-engineer',
  title: 'Production LLM Engineer',
  subtitle: 'RAG, agents & fine-tuning — the free-course path',
  description:
    'Twenty-eight weeks, twenty-eight steps, basic to advanced. A free-to-audit route to the skills of a paid production LLM-engineering program: transformer internals, fine-tuning (LoRA/QLoRA/SFT/DPO/RLHF), quantization and serving, distillation, multimodal and speech, advanced and graph RAG, tool-using and multi-agent systems, and evaluation with eval-gated CI/CD. Mostly short video courses; five build checkpoints stand in for the program’s capstone projects. The fine-tuning steps need a free GPU (Colab or Kaggle).',
  reward: 'First to fill all dots takes the Production LLM Engineer badge, a pinned spot on the board, and demos their capstone system to the circle.',
  durationWeeks: 28,
  startDate: '', // set by admin
  endDate: '',
  active: true,
  createdAt: 0
};

export const PLLM_TASKS = [
  // ---- Foundations: transformers & prompting (wk 1–4) ------------------------
  {
    order: 1, week: 1, stage: 'Foundations',
    title: 'Prompt Engineering for Developers',
    provider: 'DeepLearning.AI · OpenAI',
    url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    hours: 3, type: 'course',
    outcome: 'The base skill under every later step: instruction, context, few-shot, chain-of-thought, structured output. Free to audit.'
  },
  {
    order: 2, week: 2, stage: 'Foundations',
    title: 'How Transformer LLMs Work',
    provider: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/courses/how-transformer-llms-work',
    hours: 3, type: 'course',
    outcome: 'Embeddings, attention, and encoder/decoder architectures without the maths overload. Covers the brochure’s Module 1. Free to audit.'
  },
  {
    order: 3, week: 3, stage: 'Foundations',
    title: 'Attention in Transformers: Concepts and Code in PyTorch',
    provider: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/courses/attention-in-transformers-concepts-and-code-in-pytorch',
    hours: 3, type: 'course',
    outcome: 'Self, multi-head and masked attention, coded in PyTorch. The hands-on half of Module 2. Free to audit.'
  },
  {
    order: 4, week: 4, stage: 'Foundations',
    title: 'Neural Networks: Zero to Hero — build GPT from scratch',
    provider: 'Andrej Karpathy (YouTube)',
    url: 'https://karpathy.ai/zero-to-hero.html',
    hours: 10, type: 'course',
    outcome: 'The one heavy deep-dive: build a working GPT and tokenizer from nothing. Replaces Module 2/3 internals. Free, video, do it once and it sticks.'
  },

  // ---- Fine-tuning & alignment (wk 5–10) -------------------------------------
  {
    order: 5, week: 5, stage: 'Fine-tuning',
    title: 'Pretraining LLMs',
    provider: 'DeepLearning.AI · Upstage',
    url: 'https://www.deeplearning.ai/courses/pretraining-llms',
    hours: 3, type: 'course',
    outcome: 'The pre-train vs post-train lifecycle, data curation, and depth upscaling. Covers Module 4. Free to audit.'
  },
  {
    order: 6, week: 6, stage: 'Fine-tuning',
    title: 'Finetuning Large Language Models',
    provider: 'DeepLearning.AI · Lamini',
    url: 'https://www.deeplearning.ai/short-courses/finetuning-large-language-models/',
    hours: 2, type: 'course',
    outcome: 'When to fine-tune vs prompt, data prep, and a first SFT run. The on-ramp to Modules 5–6. Free to audit.'
  },
  {
    order: 7, week: 7, stage: 'Fine-tuning',
    title: 'Hugging Face LLM Course — fine-tuning with Transformers & TRL',
    provider: 'Hugging Face',
    url: 'https://huggingface.co/learn/llm-course',
    hours: 8, type: 'course',
    outcome: 'Datasets, chat templates, loss masking, and LoRA/SFT with the TRL stack the brochure names. Free. Needs a free GPU (Colab/Kaggle).'
  },
  {
    order: 8, week: 8, stage: 'Fine-tuning',
    title: 'Post-training of LLMs — SFT, RLHF, DPO, PPO/GRPO, LoRA',
    provider: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/courses/post-training-of-llms',
    hours: 3, type: 'course',
    outcome: 'The full post-training toolkit in one course, including DPO and PPO/GRPO. The spine of Module 6. Free to audit.'
  },
  {
    order: 9, week: 9, stage: 'Fine-tuning',
    title: 'Reinforcement Fine-Tuning LLMs with GRPO',
    provider: 'DeepLearning.AI · Predibase',
    url: 'https://www.deeplearning.ai/short-courses/reinforcement-fine-tuning-llms-grpo/',
    hours: 2, type: 'course',
    outcome: 'RL-only reasoning training (GRPO), the DeepSeek-R1 recipe from Module 9. Free to audit.'
  },
  {
    order: 10, week: 10, stage: 'Fine-tuning',
    title: 'Checkpoint: QLoRA SFT + DPO on a domain dataset',
    provider: 'Self-directed (Colab/Kaggle GPU)',
    url: 'https://github.com/',
    hours: 12, type: 'project',
    outcome: 'Stands in for Project 01 (MedScript). Run a two-stage QLoRA SFT then DPO on an open dataset, push both adapters to the Hub, and compare base vs SFT vs SFT+DPO. Dots = your own honest completion.'
  },

  // ---- Efficiency, serving & compression (wk 11–14) --------------------------
  {
    order: 11, week: 11, stage: 'Efficiency & serving',
    title: 'Quantization in Depth',
    provider: 'DeepLearning.AI · Hugging Face',
    url: 'https://www.deeplearning.ai/courses/quantization-in-depth',
    hours: 3, type: 'course',
    outcome: 'Build a linear quantizer from scratch; symmetric/asymmetric, per-tensor/channel/group. Covers Module 7 quantization. Free to audit.'
  },
  {
    order: 12, week: 12, stage: 'Efficiency & serving',
    title: 'Efficiently Serving LLMs — KV cache, batching, multi-LoRA',
    provider: 'DeepLearning.AI · Predibase',
    url: 'https://www.deeplearning.ai/courses/efficiently-serving-llms',
    hours: 3, type: 'course',
    outcome: 'KV caching, continuous batching, and serving many LoRA adapters from one base — the inference stack of Modules 3 and 7. Free to audit.'
  },
  {
    order: 13, week: 13, stage: 'Efficiency & serving',
    title: 'Checkpoint: distil a model, quantize to GGUF, run on CPU',
    provider: 'Self-directed (Colab/Kaggle GPU)',
    url: 'https://github.com/',
    hours: 10, type: 'project',
    outcome: 'Stands in for Project 02 (EdgeReason) and Module 10. Distil a teacher into a smaller student with KL loss, convert to GGUF, and serve on CPU with llama.cpp. Benchmark quality vs speed.'
  },
  {
    order: 14, week: 14, stage: 'Efficiency & serving',
    title: 'Mixture of Experts & scaling laws',
    provider: 'Hugging Face (guide) + Chinchilla paper',
    url: 'https://huggingface.co/blog/moe',
    hours: 2, type: 'reference',
    outcome: 'Why sparse MoE scales and how Chinchilla sizes a model compute-optimally. Covers Module 8 and the scaling half of Module 3. No dedicated free video course exists; this is reading.'
  },

  // ---- Multimodal & speech (wk 15–16) ----------------------------------------
  {
    order: 15, week: 15, stage: 'Multimodal & speech',
    title: 'Vision Transformers & VLMs — Hugging Face Computer Vision Course',
    provider: 'Hugging Face',
    url: 'https://huggingface.co/learn/computer-vision-course',
    hours: 6, type: 'course',
    outcome: 'ViT, CLIP/SigLIP/DINO, and how a projector wires vision into an LLM. Covers Modules 11–12. Free.'
  },
  {
    order: 16, week: 16, stage: 'Multimodal & speech',
    title: 'Fine-tune Whisper for speech-to-text — Hugging Face Audio Course',
    provider: 'Hugging Face',
    url: 'https://huggingface.co/learn/audio-course',
    hours: 6, type: 'course',
    outcome: 'Whisper architecture, STT pipelines, and fine-tuning on custom audio. Covers Module 13. Free.'
  },

  // ---- Retrieval & RAG (wk 17–21) --------------------------------------------
  {
    order: 17, week: 17, stage: 'RAG',
    title: 'Embedding Models: from Architecture to Implementation',
    provider: 'DeepLearning.AI · Vectara',
    url: 'https://www.deeplearning.ai/short-courses/embedding-models-from-architecture-to-implementation/',
    hours: 2, type: 'course',
    outcome: 'How embeddings are built and chosen, and how to fine-tune them for retrieval. Covers Module 14. Free to audit.'
  },
  {
    order: 18, week: 18, stage: 'RAG',
    title: 'RAG foundations — LangChain: Chat with Your Data',
    provider: 'DeepLearning.AI · LangChain',
    url: 'https://www.deeplearning.ai/short-courses/langchain-chat-with-your-data/',
    hours: 2, type: 'course',
    outcome: 'Loaders, chunking, vector stores, and a working baseline RAG app. Covers Modules 15–16. Free to audit.'
  },
  {
    order: 19, week: 19, stage: 'RAG',
    title: 'Advanced RAG — evaluation, query transforms & reranking',
    provider: 'DeepLearning.AI · LlamaIndex · TruEra',
    url: 'https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/',
    hours: 3, type: 'course',
    outcome: 'The RAG triad (context relevance, groundedness, answer relevance), rerankers, and query transforms — Module 17. Pair with Advanced Retrieval for AI with Chroma. Free to audit.'
  },
  {
    order: 20, week: 20, stage: 'RAG',
    title: 'Graph & multimodal RAG — Knowledge Graphs for RAG',
    provider: 'DeepLearning.AI · Neo4j',
    url: 'https://www.deeplearning.ai/short-courses/knowledge-graphs-rag/',
    hours: 3, type: 'course',
    outcome: 'Graph-structured retrieval with Neo4j; pair with Multimodal RAG: Chat with Videos for the ColPali-style visual path. Covers Module 18. Free to audit.'
  },
  {
    order: 21, week: 21, stage: 'RAG',
    title: 'Checkpoint: hybrid RAG with an eval gate and guardrails',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 12, type: 'project',
    outcome: 'Stands in for Project 03 (LexisGraph). Build hybrid retrieval (dense + BM25 + reranker), add a RAGAS-style faithfulness gate, and mask PII / add input-output guardrails. See Quality and Safety for LLM Applications in Library.'
  },

  // ---- Agents (wk 22–25) -----------------------------------------------------
  {
    order: 22, week: 22, stage: 'Agents',
    title: 'Function calling & tools — Functions, Tools and Agents with LangChain',
    provider: 'DeepLearning.AI · LangChain',
    url: 'https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/',
    hours: 3, type: 'course',
    outcome: 'Structured output, tool/function calling, and the tool-executor loop. Covers Module 19’s Pydantic + function-calling half. Free to audit.'
  },
  {
    order: 23, week: 23, stage: 'Agents',
    title: 'MCP: Build Rich-Context AI Apps with Anthropic',
    provider: 'DeepLearning.AI · Anthropic',
    url: 'https://www.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic',
    hours: 3, type: 'course',
    outcome: 'Build MCP servers and clients and connect them to an app — the tool-standardisation half of Module 19. Free to audit.'
  },
  {
    order: 24, week: 24, stage: 'Agents',
    title: 'AI Agents in LangGraph — stateful, HITL, multi-agent',
    provider: 'DeepLearning.AI · LangChain · Tavily',
    url: 'https://www.deeplearning.ai/courses/ai-agents-in-langgraph',
    hours: 3, type: 'course',
    outcome: 'Graph-based agents with state, persistence, human-in-the-loop, and multi-agent routing. Covers Module 20 and the context/memory of Module 23. Free to audit.'
  },
  {
    order: 25, week: 25, stage: 'Agents',
    title: 'Deploy agents — Serverless Agentic Workflows with Amazon Bedrock',
    provider: 'DeepLearning.AI · AWS',
    url: 'https://www.deeplearning.ai/short-courses/serverless-agentic-workflows-with-amazon-bedrock/',
    hours: 3, type: 'course',
    outcome: 'Tools, code execution, guardrails, and deploying an agent serverlessly on Bedrock. The free stand-in for Module 21’s AgentCore. Free to audit; a live deploy needs an AWS account.'
  },

  // ---- Evaluation, LLMOps & CI/CD (wk 26–27) ---------------------------------
  {
    order: 26, week: 26, stage: 'Eval & LLMOps',
    title: 'Evaluating AI Agents',
    provider: 'DeepLearning.AI · Arize AI',
    url: 'https://www.deeplearning.ai/courses/evaluating-ai-agents',
    hours: 3, type: 'course',
    outcome: 'Tracing, agent-native evals, and LLM-as-judge with calibration. Covers the eval half of Module 24. Free to audit.'
  },
  {
    order: 27, week: 27, stage: 'Eval & LLMOps',
    title: 'LLMOps CI/CD — Automated Testing for LLMOps',
    provider: 'DeepLearning.AI · CircleCI',
    url: 'https://www.deeplearning.ai/short-courses/automated-testing-llmops',
    hours: 3, type: 'course',
    outcome: 'Rules-based and model-graded evals wired into a CI pipeline that gates on every change. Pair with the LLMOps course. Covers Module 24’s CI/CD and Project 05. Free to audit.'
  },

  // ---- Capstone (wk 28) ------------------------------------------------------
  {
    order: 28, week: 28, stage: 'Capstone',
    title: 'Capstone: ship an eval-gated LLM system + case study',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 20, type: 'project',
    outcome:
      'Stands in for Projects 04 + 05. Ship one end-to-end system — a multi-agent app (LangGraph + MCP) or a fine-tuned-model RAG service — wrapped in an eval-gated CI pipeline with a public repo, a live demo, and a one-page case study: design, eval numbers, what broke, how you fixed it. This is the artifact that gets you hired.'
  }
];

export const PLLM_MATERIALS = [
  { title: 'Hugging Face LLM Course', url: 'https://huggingface.co/learn/llm-course', type: 'reference', note: 'The free spine for fine-tuning and the Transformers/TRL stack.' },
  { title: 'Hugging Face TRL (SFT, DPO, GRPO)', url: 'https://huggingface.co/docs/trl', type: 'tool', note: 'The library the brochure’s fine-tuning modules are built on.' },
  { title: 'Unsloth — consumer-GPU fine-tuning', url: 'https://github.com/unslothai/unsloth', type: 'tool', note: 'Makes QLoRA fit on a free Colab/Kaggle GPU. Use it for the Week 10 checkpoint.' },
  { title: 'vLLM documentation', url: 'https://docs.vllm.ai/', type: 'reference', note: 'Production inference: KV cache, continuous batching, multi-LoRA serving.' },
  { title: 'llama.cpp', url: 'https://github.com/ggerganov/llama.cpp', type: 'tool', note: 'GGUF conversion and CPU inference. For the Week 13 distillation checkpoint.' },
  { title: 'Ragas — RAG evaluation toolkit', url: 'https://docs.ragas.io/', type: 'tool', note: 'Faithfulness, answer relevancy, context precision/recall. For the Week 21 gate.' },
  { title: 'Promptfoo — prompt regression testing', url: 'https://www.promptfoo.dev/', type: 'tool', note: 'Golden snapshots and eval gating in CI, as in Module 24 / Project 05.' },
  { title: 'Inspect AI — agent-native evals', url: 'https://inspect.aisi.org.uk/', type: 'tool', note: 'Task / Solver / Scorer harness for multi-step agent traces.' },
  { title: 'Neo4j GraphAcademy (free)', url: 'https://graphacademy.neo4j.com/', type: 'reference', note: 'Free graph-database courses to back the Graph RAG step.' },
  { title: 'Key papers: Attention, LoRA, QLoRA, DPO, Chinchilla', url: 'https://arxiv.org/abs/1706.03762', type: 'paper', note: 'Attention Is All You Need. Also read LoRA (2106.09685), QLoRA (2305.14314), DPO (2305.18290), Chinchilla (2203.15556).' },
  { title: 'Vector Circle — add the circle’s own links here', url: 'https://www.deeplearning.ai/courses', type: 'reference', note: 'Admin: DeepLearning.AI’s full free short-course catalogue, plus your own picks.' }
];

// ---------------------------------------------------------------------------
// MILESTONE: AI Engineer Course in 16 weeks
// Built to the duties of a working Generative-AI / AI-Engineer role: design and
// ship GenAI apps (chat, agents, workflows), RAG over vector stores, reusable
// skills and guardrails, LLM fine-tuning and evaluation, and production MLOps /
// CI-CD with API integration.
//
// Mostly free short video courses (DeepLearning.AI short courses audit for
// free). Two build checkpoints turn the courses into a portfolio: a REST
// microservice and a production capstone. The fine-tuning step needs a free GPU
// (Colab/Kaggle). URLs verified live July 2026; providers move course paths, so
// admin should confirm each from Admin → Courses.
// ---------------------------------------------------------------------------

export const AIENG_MILESTONE = {
  id: 'ai-engineer',
  title: 'AI Engineer Course',
  subtitle: 'Build, ship and operate production GenAI systems',
  description:
    'Sixteen weeks, sixteen steps, mapped to the duties of a working AI / Generative-AI Engineer: build and deploy GenAI apps (chat, agents, automated workflows), RAG over vector stores (Pinecone, FAISS, Weaviate), reusable AI skills and guardrails, LLM fine-tuning and evaluation across GPT/LLaMA/Gemini families, and production pipelines with CI/CD, testing and monitoring — integrated through REST APIs. Mostly free-to-audit video courses, with two build checkpoints. The fine-tuning step needs a free GPU (Colab or Kaggle).',
  reward: 'First to fill all dots takes the AI Engineer badge, a pinned spot on the board, and demos their production capstone to the circle.',
  durationWeeks: 16,
  startDate: '', // set by admin
  endDate: '',
  active: true,
  createdAt: 0
};

export const AIENG_TASKS = [
  // ---- Foundations & building GenAI apps (wk 1–5) ----------------------------
  {
    order: 1, week: 1, stage: 'Foundations',
    title: 'Prompt Engineering for Developers',
    provider: 'DeepLearning.AI · OpenAI',
    url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    hours: 3, type: 'course',
    outcome: 'Prompt strategies, reusable templates, and iterative refinement — the reliability skill behind every duty below. Free to audit.'
  },
  {
    order: 2, week: 2, stage: 'Foundations',
    title: 'Building Systems with the ChatGPT API',
    provider: 'DeepLearning.AI · OpenAI',
    url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/',
    hours: 3, type: 'course',
    outcome: 'Chain LLM calls into a multi-step system with classification, moderation and evaluation — your first real chat/workflow pipeline. Free to audit.'
  },
  {
    order: 3, week: 3, stage: 'Foundations',
    title: 'LangChain for LLM Application Development',
    provider: 'DeepLearning.AI · LangChain',
    url: 'https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/',
    hours: 3, type: 'course',
    outcome: 'Chains, memory, prompt templates and output parsers — the reusable framework layer for standardising AI behaviour. Free to audit.'
  },
  {
    order: 4, week: 4, stage: 'Foundations',
    title: 'Building Generative AI Applications with Gradio',
    provider: 'DeepLearning.AI · Hugging Face',
    url: 'https://www.deeplearning.ai/short-courses/building-generative-ai-applications-with-gradio/',
    hours: 2, type: 'course',
    outcome: 'Wrap a model into a shareable app — chatbot, summariser, image tools — and demo it on Spaces. Design-and-ship in miniature. Free to audit.'
  },
  {
    order: 5, week: 5, stage: 'Foundations',
    title: 'Checkpoint: expose an LLM feature as a REST microservice',
    provider: 'Self-directed (FastAPI)',
    url: 'https://github.com/',
    hours: 8, type: 'project',
    outcome: 'The integration duty: wrap one LLM feature as a FastAPI microservice with typed request/response schemas, an API key, and error handling. Push to GitHub. Dots = your own honest completion.'
  },

  // ---- RAG over vector stores (wk 6–8) ---------------------------------------
  {
    order: 6, week: 6, stage: 'RAG & vector stores',
    title: 'Building Applications with Vector Databases',
    provider: 'DeepLearning.AI · Pinecone',
    url: 'https://www.deeplearning.ai/courses/building-applications-vector-databases',
    hours: 3, type: 'course',
    outcome: 'Semantic search, RAG, hybrid search and recommenders on Pinecone; enough to reason about FAISS and Weaviate trade-offs too. Free to audit.'
  },
  {
    order: 7, week: 7, stage: 'RAG & vector stores',
    title: 'LangChain: Chat with Your Data',
    provider: 'DeepLearning.AI · LangChain',
    url: 'https://www.deeplearning.ai/short-courses/langchain-chat-with-your-data/',
    hours: 2, type: 'course',
    outcome: 'End-to-end RAG: document loaders, chunking, embeddings, and retrieval with FAISS/Chroma. The core architecture you will maintain. Free to audit.'
  },
  {
    order: 8, week: 8, stage: 'RAG & vector stores',
    title: 'Building and Evaluating Advanced RAG',
    provider: 'DeepLearning.AI · LlamaIndex · TruEra',
    url: 'https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/',
    hours: 3, type: 'course',
    outcome: 'Rerankers, query transforms, and the RAG triad for measuring retrieval quality — production RAG, not a demo. Free to audit.'
  },

  // ---- Agents, skills & guardrails (wk 9–12) ---------------------------------
  {
    order: 9, week: 9, stage: 'Agents & guardrails',
    title: 'Functions, Tools and Agents with LangChain',
    provider: 'DeepLearning.AI · LangChain',
    url: 'https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/',
    hours: 3, type: 'course',
    outcome: 'Tool and function calling, structured output, and the tool-executor loop — the base of any AI agent. Free to audit.'
  },
  {
    order: 10, week: 10, stage: 'Agents & guardrails',
    title: 'AI Agents in LangGraph',
    provider: 'DeepLearning.AI · LangChain · Tavily',
    url: 'https://www.deeplearning.ai/courses/ai-agents-in-langgraph',
    hours: 3, type: 'course',
    outcome: 'Stateful, multi-step agent workflows with routing, persistence and human-in-the-loop — the automated-workflow duty. Free to audit.'
  },
  {
    order: 11, week: 11, stage: 'Agents & guardrails',
    title: 'Agent Skills with Anthropic',
    provider: 'DeepLearning.AI · Anthropic',
    url: 'https://www.deeplearning.ai/courses/agent-skills-with-anthropic',
    hours: 3, type: 'course',
    outcome: 'Package reusable skills, system rules and workflow instructions that standardise AI behaviour across systems — exactly the "reusable AI skills" duty. Free to audit.'
  },
  {
    order: 12, week: 12, stage: 'Agents & guardrails',
    title: 'Quality and Safety for LLM Applications',
    provider: 'DeepLearning.AI · WhyLabs',
    url: 'https://www.deeplearning.ai/short-courses/quality-safety-llm-applications/',
    hours: 2, type: 'course',
    outcome: 'Guardrails, PII detection, hallucination checks and prompt-injection defence — the reliability and safety layer for client-facing AI. Free to audit.'
  },

  // ---- Fine-tuning & evaluation (wk 13–14) -----------------------------------
  {
    order: 13, week: 13, stage: 'Fine-tuning & eval',
    title: 'Finetuning Large Language Models',
    provider: 'DeepLearning.AI · Lamini',
    url: 'https://www.deeplearning.ai/short-courses/finetuning-large-language-models/',
    hours: 2, type: 'course',
    outcome: 'When to fine-tune vs prompt or retrieve, data prep, and a real SFT run on an open model (LLaMA-family). Needs a free GPU. Free to audit.'
  },
  {
    order: 14, week: 14, stage: 'Fine-tuning & eval',
    title: 'Evaluating and Debugging Generative AI (Weights & Biases)',
    provider: 'DeepLearning.AI · Weights & Biases',
    url: 'https://www.deeplearning.ai/short-courses/evaluating-debugging-generative-ai/',
    hours: 2, type: 'course',
    outcome: 'Experiment tracking, evaluation, and dataset/model versioning — the internal tooling that accelerates experimentation and deployment. Free to audit.'
  },

  // ---- Production: MLOps & CI/CD (wk 15) -------------------------------------
  {
    order: 15, week: 15, stage: 'Production & MLOps',
    title: 'LLMOps + Automated Testing for LLMOps',
    provider: 'DeepLearning.AI · Google Cloud · CircleCI',
    url: 'https://www.deeplearning.ai/short-courses/automated-testing-llmops',
    hours: 4, type: 'course',
    outcome: 'A production pipeline plus rules-based and model-graded evals wired into CI that gates every change — the software-engineering-best-practices duty. Pair the LLMOps and Automated Testing courses. Free to audit.'
  },

  // ---- Capstone (wk 16) ------------------------------------------------------
  {
    order: 16, week: 16, stage: 'Capstone',
    title: 'Capstone: ship a production GenAI service + case study',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 20, type: 'project',
    outcome:
      'Bring it together: a RAG + tool-using agent with guardrails, served behind a REST API, with evals gating a CI pipeline and basic monitoring. Public repo, live demo, and a one-page case study: architecture, eval numbers, what broke, how you fixed it. This is the artifact that gets you the AI-engineer offer.'
  }
];

export const AIENG_MATERIALS = [
  { title: 'Google Gemini API / AI Studio (free tier)', url: 'https://ai.google.dev/', type: 'reference', note: 'Free Gemini access to cover the Gemini side of the "modern architectures" duty.' },
  { title: 'Pinecone Learn', url: 'https://www.pinecone.io/learn/', type: 'reference', note: 'The best free written explainers on vector search.' },
  { title: 'Weaviate docs', url: 'https://weaviate.io/developers/weaviate', type: 'reference', note: 'The second named vector store — hybrid search and modules.' },
  { title: 'FAISS', url: 'https://github.com/facebookresearch/faiss', type: 'tool', note: 'The in-process vector index; the free default for local RAG.' },
  { title: 'LangChain documentation', url: 'https://python.langchain.com/docs/introduction/', type: 'reference', note: 'Read the concept pages, not just the API.' },
  { title: 'Guardrails AI', url: 'https://www.guardrailsai.com/', type: 'tool', note: 'Validators and structured guardrails for the safety duty.' },
  { title: 'FastAPI', url: 'https://fastapi.tiangolo.com/', type: 'reference', note: 'For the Week 5 microservice checkpoint and the capstone API.' },
  { title: 'Weights & Biases', url: 'https://wandb.ai/site', type: 'tool', note: 'Experiment tracking and evaluation dashboards.' },
  { title: 'Vector Circle — add the circle’s own links here', url: 'https://www.deeplearning.ai/courses', type: 'reference', note: 'Admin: replace with the resources your circle finds useful.' }
];

// ---------------------------------------------------------------------------
// MILESTONE: Forward-Deployed AI Engineer in 16 weeks
// A builder path for the forward-deployed engineer who ships AI agents and
// document intelligence end to end, oriented to regulated domains like mortgage
// lending. Four build areas from the role: agents & autonomous workflows,
// document & data intelligence, evaluation & quality, and deployment.
//
// Heavier on checkpoints than the other tracks — this role is judged on shipped
// systems, not demos. Mostly free short video courses (DeepLearning.AI audit
// for free). No free course teaches mortgage data or FCRA/GLBA specifically, so
// the checkpoints use mock loan files and the materials cover PII tooling; the
// regulatory judgement is applied in the capstone. Fine-tuning needs a free GPU.
// URLs verified live July 2026; admin should confirm each from Admin → Courses.
// ---------------------------------------------------------------------------

export const FDE_MILESTONE = {
  id: 'forward-deployed-ai-engineer',
  title: 'Forward-Deployed AI Engineer',
  subtitle: 'Ship AI agents and document intelligence end to end',
  description:
    'Sixteen weeks, sixteen steps, built to a forward-deployed AI-engineer role: own the arc from business problem to production AI system. Four build areas — multi-step agents with tool use, memory and human-in-the-loop; document and data intelligence (extraction, RAG over complex files, correction feedback loops); evaluation and quality against ground truth; and deployment with monitoring. Oriented to regulated domains like mortgage lending. Mostly free-to-audit video courses, with four hands-on checkpoints that build a portfolio. The fine-tuning step needs a free GPU (Colab or Kaggle).',
  reward: 'First to fill all dots takes the Forward-Deployed Engineer badge, a pinned spot on the board, and demos their production capstone to the circle.',
  durationWeeks: 16,
  startDate: '', // set by admin
  endDate: '',
  active: true,
  createdAt: 0
};

export const FDE_TASKS = [
  // ---- Agents & autonomous workflows (wk 1–6) --------------------------------
  {
    order: 1, week: 1, stage: 'Agents & workflows',
    title: 'Prompt Engineering for Developers',
    provider: 'DeepLearning.AI · OpenAI',
    url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    hours: 3, type: 'course',
    outcome: 'Reliable, testable prompts and structured output — the primitive under every agent and extractor you will build. Free to audit.'
  },
  {
    order: 2, week: 2, stage: 'Agents & workflows',
    title: 'Building Systems with the ChatGPT API',
    provider: 'DeepLearning.AI · OpenAI',
    url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/',
    hours: 3, type: 'course',
    outcome: 'Chain LLM calls into a multi-step system with classification, moderation and evaluation. Thinking in systems, not one-shot prompts. Free to audit.'
  },
  {
    order: 3, week: 3, stage: 'Agents & workflows',
    title: 'Functions, Tools and Agents with LangChain',
    provider: 'DeepLearning.AI · LangChain',
    url: 'https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/',
    hours: 3, type: 'course',
    outcome: 'Tool and function calling, structured output, and the tool-executor loop — the mechanics of an agent that can act. Free to audit.'
  },
  {
    order: 4, week: 4, stage: 'Agents & workflows',
    title: 'AI Agents in LangGraph',
    provider: 'DeepLearning.AI · LangChain · Tavily',
    url: 'https://www.deeplearning.ai/courses/ai-agents-in-langgraph',
    hours: 3, type: 'course',
    outcome: 'Stateful multi-step agents with memory, routing and human-in-the-loop checkpoints — exactly the agentic workflows the role builds. Free to audit.'
  },
  {
    order: 5, week: 5, stage: 'Agents & workflows',
    title: 'MCP: Build Rich-Context AI Apps with Anthropic',
    provider: 'DeepLearning.AI · Anthropic',
    url: 'https://www.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic',
    hours: 3, type: 'course',
    outcome: 'Standardise how agents reach internal systems, external data and third-party APIs — the "close the loop between insight and action" duty. Free to audit.'
  },
  {
    order: 6, week: 6, stage: 'Agents & workflows',
    title: 'Checkpoint: ship a tool-using workflow agent with HITL',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 10, type: 'project',
    outcome: 'Build a multi-step agent over a mock loan file that navigates conditions, flags exceptions and surfaces recommendations, with tool use, memory and a human-approval checkpoint before any write. Push to GitHub. Dots = your own honest completion.'
  },

  // ---- Document & data intelligence (wk 7–10) --------------------------------
  {
    order: 7, week: 7, stage: 'Document intelligence',
    title: 'Preprocessing Unstructured Data for LLM Applications',
    provider: 'DeepLearning.AI · Unstructured',
    url: 'https://www.deeplearning.ai/short-courses/preprocessing-unstructured-data-for-llm-applications/',
    hours: 2, type: 'course',
    outcome: 'Turn PDFs, tables and images into machine-readable data — income docs, appraisals, title. The extraction layer of a document-intensive process. Free to audit.'
  },
  {
    order: 8, week: 8, stage: 'Document intelligence',
    title: 'LangChain: Chat with Your Data',
    provider: 'DeepLearning.AI · LangChain',
    url: 'https://www.deeplearning.ai/short-courses/langchain-chat-with-your-data/',
    hours: 2, type: 'course',
    outcome: 'Retrieval over complex files so underwriters and borrowers can query a loan file in natural language. The core RAG architecture. Free to audit.'
  },
  {
    order: 9, week: 9, stage: 'Document intelligence',
    title: 'Building and Evaluating Advanced RAG',
    provider: 'DeepLearning.AI · LlamaIndex · TruEra',
    url: 'https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/',
    hours: 3, type: 'course',
    outcome: 'Rerankers, query transforms and the RAG triad for measuring retrieval quality — production retrieval you can defend. Free to audit.'
  },
  {
    order: 10, week: 10, stage: 'Document intelligence',
    title: 'Checkpoint: extraction + RAG with a correction feedback loop',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 10, type: 'project',
    outcome: 'Extract structured fields from a set of documents, make them queryable, and capture reviewer corrections into a store that improves accuracy over time — the data-flywheel duty. Report accuracy before and after.'
  },

  // ---- Evaluation & quality (wk 11–13) ---------------------------------------
  {
    order: 11, week: 11, stage: 'Evaluation & quality',
    title: 'Evaluating AI Agents',
    provider: 'DeepLearning.AI · Arize AI',
    url: 'https://www.deeplearning.ai/courses/evaluating-ai-agents',
    hours: 3, type: 'course',
    outcome: 'Trace agents, score outputs against ground truth, and run LLM-as-judge with calibration — measuring whether the AI actually works, not just runs. Free to audit.'
  },
  {
    order: 12, week: 12, stage: 'Evaluation & quality',
    title: 'Quality and Safety for LLM Applications',
    provider: 'DeepLearning.AI · WhyLabs',
    url: 'https://www.deeplearning.ai/short-courses/quality-safety-llm-applications/',
    hours: 2, type: 'course',
    outcome: 'Guardrails, PII detection, hallucination and prompt-injection defence — the reliability layer a regulated, PII-heavy domain demands. Free to audit.'
  },
  {
    order: 13, week: 13, stage: 'Evaluation & quality',
    title: 'Automated Testing for LLMOps',
    provider: 'DeepLearning.AI · CircleCI',
    url: 'https://www.deeplearning.ai/short-courses/automated-testing-llmops',
    hours: 3, type: 'course',
    outcome: 'Prompt regression and model-graded evals wired into CI that gates every change — catch failure modes before production. Free to audit.'
  },

  // ---- Deployment & model adaptation (wk 14–15) ------------------------------
  {
    order: 14, week: 14, stage: 'Deploy & operate',
    title: 'Serverless Agentic Workflows with Amazon Bedrock',
    provider: 'DeepLearning.AI · AWS',
    url: 'https://www.deeplearning.ai/short-courses/serverless-agentic-workflows-with-amazon-bedrock/',
    hours: 3, type: 'course',
    outcome: 'Deploy an agent with tools, code execution and guardrails serverlessly on AWS — the containerise-and-operate preference. Free to audit; a live deploy needs an AWS account.'
  },
  {
    order: 15, week: 15, stage: 'Deploy & operate',
    title: 'Finetuning Large Language Models',
    provider: 'DeepLearning.AI · Lamini',
    url: 'https://www.deeplearning.ai/short-courses/finetuning-large-language-models/',
    hours: 2, type: 'course',
    outcome: 'When to adapt a model vs prompt or retrieve, and a real fine-tune run — the nice-to-have domain-adaptation skill. Needs a free GPU. Free to audit.'
  },

  // ---- Capstone (wk 16) ------------------------------------------------------
  {
    order: 16, week: 16, stage: 'Capstone',
    title: 'Capstone: an end-to-end mortgage AI system + case study',
    provider: 'Self-directed',
    url: 'https://github.com/',
    hours: 24, type: 'project',
    outcome:
      'Own the full arc: document extraction feeding a RAG + tool-using agent with human-in-the-loop, guardrails and PII masking, served behind a REST API, deployed in a container, with evals gating CI and basic production monitoring. Public repo, live demo, and a one-page case study covering design, eval numbers against ground truth, failure modes, and how you handle PII / regulatory constraints. This is the artifact that proves you can ship.'
  }
];

export const FDE_MATERIALS = [
  { title: 'LangGraph documentation', url: 'https://langchain-ai.github.io/langgraph/', type: 'reference', note: 'Stateful agents, checkpoints and human-in-the-loop — the agent backbone.' },
  { title: 'Unstructured — document extraction', url: 'https://unstructured.io/', type: 'tool', note: 'Parse PDFs, images and tables into structured data. Free open-source core.' },
  { title: 'LlamaParse', url: 'https://github.com/run-llama/llama_parse', type: 'tool', note: 'Strong document parsing for the extraction checkpoint.' },
  { title: 'Microsoft Presidio — PII detection & masking', url: 'https://github.com/microsoft/presidio', type: 'tool', note: 'For the FCRA/GLBA-style PII handling the role calls out.' },
  { title: 'FastAPI', url: 'https://fastapi.tiangolo.com/', type: 'reference', note: 'Async REST APIs and microservices — the integration and serving layer.' },
  { title: 'Streamlit — lightweight UIs', url: 'https://streamlit.io/', type: 'tool', note: 'For the full-stack preference: a quick internal tool or reviewer UI.' },
  { title: 'n8n — workflow automation', url: 'https://n8n.io/', type: 'tool', note: 'The nice-to-have automation tool named in the role.' },
  { title: 'Ragas — RAG evaluation', url: 'https://docs.ragas.io/', type: 'tool', note: 'Faithfulness and retrieval metrics for the document checkpoints.' },
  { title: 'AWS Free Tier', url: 'https://aws.amazon.com/free/', type: 'reference', note: 'For the deployment step and capstone. Watch the limits.' },
  { title: 'Vector Circle — add the circle’s own links here', url: 'https://www.deeplearning.ai/courses', type: 'reference', note: 'Admin: replace with mortgage/regulated-domain resources your circle finds useful.' }
];
