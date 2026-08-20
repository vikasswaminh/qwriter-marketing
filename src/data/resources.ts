export interface ResourceItem {
  slug: string;
  category: "guide" | "case-study" | "docs" | "agentic-spec" | "blog";
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  badge: string;
  author: { name: string; title: string };
  keyPoints: string[];
}

export const RESOURCES: ResourceItem[] = [
  {
    slug: "agentic-web-readability-spec-2026",
    category: "agentic-spec",
    title: "The 2026 Agent-Readable Web Architecture Guide",
    excerpt: "How to design web applications and APIs that are equally intuitive for human visitors and autonomous AI agents through semantic HTML, JSON-LD, and llms.txt.",
    readTime: "7 min read",
    publishDate: "August 2026",
    badge: "Architecture Standard",
    author: { name: "Antigravity Research Team", title: "AI Systems Engineering" },
    keyPoints: [
      "Why dual-layer Human + Agent web design is the defining pattern of 2026",
      "Structuring machine-readable product metadata without bloating client bundles",
      "Using Model Context Protocol (MCP) as the universal tool connector",
      "Designing agent-actionable UI with explicit semantic triggers"
    ]
  },
  {
    slug: "evaluating-ai-employees-in-production",
    category: "guide",
    title: "Deterministic Evaluation for Autonomous AI Fleets",
    excerpt: "A practical framework for benchmarking AI employees with golden datasets, semantic diffing, and automated LLM judge scoring before pushing to production.",
    readTime: "9 min read",
    publishDate: "July 2026",
    badge: "Engineering Guide",
    author: { name: "Elena Rostova", title: "Staff Agent Engineer" },
    keyPoints: [
      "Building robust golden test suites for multi-step agent trajectories",
      "Quantifying tool-calling precision vs hallucination rates",
      "Integrating agent evaluation into GitHub Actions CI/CD pipelines",
      "Setting up automated rollback triggers on quality score degradation"
    ]
  },
  {
    slug: "human-in-the-loop-governance",
    category: "guide",
    title: "Human-in-the-Loop Governance: Balancing Autonomy and Safety",
    excerpt: "Designing approval workflows, risk classification tiers, and audit trails so your enterprise can deploy autonomous agents with absolute peace of mind.",
    readTime: "6 min read",
    publishDate: "July 2026",
    badge: "Governance & Security",
    author: { name: "Marcus Vance", title: "Enterprise Security Director" },
    keyPoints: [
      "Categorizing agent actions into Read-Only, Draft, and Write tiers",
      "Designing frictionless Slack and Dashboard 1-click approval cards",
      "Maintaining immutable cryptographic audit logs for compliance",
      "Handling agent timeout and escalation policies gracefully"
    ]
  },
  {
    slug: "rampify-global-case-study",
    category: "case-study",
    title: "How Rampify Scaled Outbound Pipeline by 3.8x with AI SDR Employees",
    excerpt: "Learn how a high-growth fintech company automated 12,000+ monthly prospecting workflows while increasing AE demo conversion rates by 42%.",
    readTime: "5 min read",
    publishDate: "June 2026",
    badge: "Case Study",
    author: { name: "OllaSuper Customer Success", title: "Growth Intelligence" },
    keyPoints: [
      "Challenge: AEs bogged down by 15 hours/week of manual research and CRM data entry",
      "Solution: Deployed OllaSuper Sales and Research Employees integrated with Salesforce",
      "Outcome: 3.8x outbound pipeline growth, $3.4M new ARR in first 6 months"
    ]
  },
  {
    slug: "model-context-protocol-deep-dive",
    category: "docs",
    title: "Connecting Custom Enterprise Tools via Model Context Protocol (MCP)",
    excerpt: "Complete technical reference for implementing, securing, and testing custom MCP tool servers for your OllaSuper AI employee fleet.",
    readTime: "12 min read",
    publishDate: "June 2026",
    badge: "Developer Reference",
    author: { name: "OllaSuper Platform Core", title: "Protocol Engineering" },
    keyPoints: [
      "Understanding the MCP Server/Client JSON-RPC 2.0 lifecycle",
      "Implementing tool schemas, resources, and prompt templates",
      "Securing internal endpoints with mTLS and ephemeral capability tokens",
      "Local testing with the OllaSuper MCP inspector CLI"
    ]
  }
];
