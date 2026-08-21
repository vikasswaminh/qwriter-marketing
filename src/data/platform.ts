export interface PlatformModule {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  badge: string;
  features: string[];
  metrics: { label: string; value: string }[];
  codeSample?: string;
  previewType: "dashboard" | "trace" | "eval" | "cron" | "integrations";
}

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    slug: "workforce",
    title: "AI Workforce Orchestration",
    eyebrow: "Central Control Plane",
    tagline: "Deploy, coordinate, and scale teams of specialized AI employees.",
    description: "A unified operating system for your digital workforce. Assign goals, define cross-agent handoffs, manage unified context memory, and govern permissions from one intuitive pane.",
    badge: "Core OS",
    features: [
      "Dynamic multi-agent team assembly based on complex user goals",
      "Shared persistent memory graph across all enterprise employees",
      "Instant rollback and revision history for every agent action",
      "Role-based access control (RBAC) and team isolation"
    ],
    metrics: [
      { label: "Fleet Capacity", value: "10,000+ Agents" },
      { label: "P99 Execution Latency", value: "< 850ms" },
      { label: "Uptime SLA", value: "99.99%" }
    ],
    previewType: "dashboard"
  },
  {
    slug: "observe",
    title: "Deep Observability & Tracing",
    eyebrow: "Full Transparency",
    tagline: "Inspect every step, tool call, token, and decision in real-time.",
    description: "No black boxes. View high-fidelity execution trees for every task. Trace LLM prompts, tool inputs/outputs, model latency, and token costs with millisecond precision.",
    badge: "Observability",
    features: [
      "Interactive flamegraphs for multi-step agent reasoning chains",
      "Real-time token cost and model consumption telemetry",
      "Full payload recording with PII scrubbing before storage",
      "Live event streaming via Server-Sent Events (SSE)"
    ],
    metrics: [
      { label: "Trace Retention", value: "90 Days Full Fidelity" },
      { label: "Telemetry Overhead", value: "< 2ms" },
      { label: "PII Detection", value: "Real-Time Regex & NER" }
    ],

    previewType: "trace"
  },
  {
    slug: "evaluate",
    title: "Deterministic Evaluation",
    eyebrow: "Quality Assurance",
    tagline: "Ship autonomous agents with 100% confidence using automated test suites.",
    description: "Benchmark your AI employees before deploying them to production. Run golden datasets, test edge cases, score output accuracy with automated LLM judges, and detect regressions automatically.",
    badge: "Reliability",
    features: [
      "Automated golden dataset benchmark runner with 100+ assertions",
      "Deterministic output scoring against brand guidelines and schemas",
      "Cost vs accuracy tradeoff matrix for model switching",
      "Automated CI/CD integration for GitHub Actions"
    ],
    metrics: [
      { label: "Test Assertions", value: "250+ Built-in" },
      { label: "Benchmark Speed", value: "50 tests / min" },
      { label: "False Positive Rate", value: "< 0.01%" }
    ],
    previewType: "eval"
  },
  {
    slug: "automate",
    title: "Event-Driven Automation",
    eyebrow: "Continuous Operations",
    tagline: "Trigger AI employees on schedules, webhooks, or system signals.",
    description: "Move beyond manual chat prompts. Configure your workforce to execute autonomously on recurring cron schedules, incoming webhook payloads, or database change streams.",
    badge: "Automation",
    features: [
      "Cron expressions with second-level precision",
      "Inbound webhook ingestion with signature verification",
      "Kafka, RabbitMQ, and AWS SQS event stream adapters",
      "Dead-letter queues and exponential backoff retry policies"
    ],
    metrics: [
      { label: "Concurrent Jobs", value: "50,000+" },
      { label: "Trigger Jitter", value: "< 15ms" },
      { label: "Reliability", value: "At-least-once delivery" }
    ],
    previewType: "cron"
  },
  {
    slug: "integrations",
    title: "Model Context Protocol & Ecosystem",
    eyebrow: "Tool Connectivity",
    tagline: "Connect AI employees to 100+ SaaS tools, databases, and APIs.",
    description: "Built on the open Model Context Protocol (MCP) standard. Seamlessly attach CRM systems, databases, cloud providers, productivity tools, and custom internal microservices.",
    badge: "Ecosystem",
    features: [
      "Native Model Context Protocol (MCP) server & client support",
      "Out-of-the-box connectors: Slack, Salesforce, HubSpot, Stripe, GitHub, Postgres",
      "Secure zero-trust secret management with HashiCorp Vault integration",
      "Sandboxed Docker and WebAssembly execution runtimes"
    ],
    metrics: [
      { label: "Supported Connectors", value: "100+ MCP Servers" },
      { label: "Auth Standards", value: "OAuth 2.0, mTLS, JWT" },
      { label: "Security Sandbox", value: "gVisor Isolated" }
    ],
    previewType: "integrations"
  }
];
