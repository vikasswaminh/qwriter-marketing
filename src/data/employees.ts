export interface WorkflowStep {
  stepNumber: number;
  name: string;
  action: string;
  toolUsed: string;
  status: "completed" | "in_progress" | "pending";
  outputPreview?: string;
}

export interface SampleRun {
  prompt: string;
  executionTime: string;
  toolsInvoked: string[];
  humanApprovalRequired: boolean;
  resultSummary: string;
}

export interface AIEmployee {
  slug: string;
  name: string;
  role: string;
  category: "research" | "sales" | "marketing" | "support" | "operations" | "custom";
  categoryLabel: string;
  color: string;
  avatarIcon: string;
  badge: string;
  oneliner: string;
  purpose: string;
  capabilities: string[];
  inputs: string[];
  outputs: string[];
  tools: { name: string; category: string; description: string }[];
  targetUsers: string[];
  stats: {
    avgTimeSaved: string;
    successRate: string;
    tasksHandled: string;
  };
  sampleRun: SampleRun;
  workflowSteps: WorkflowStep[];
  approvalMode: "Autonomous with audit" | "Human approval for writes" | "Strict human-in-the-loop";
}

export const AI_EMPLOYEES: AIEmployee[] = [
  {
    slug: "research",
    name: "Research Employee",
    role: "Autonomous Market & Intelligence Analyst",
    category: "research",
    categoryLabel: "Market Intelligence",
    color: "#ff6b4a",
    avatarIcon: "🔍",
    badge: "Most Popular",
    oneliner: "Conducts deep market analysis, competitor intelligence, and synthesized executive dossiers.",
    purpose: "Automates multi-source web intelligence, competitive product audits, lead discovery, and data synthesis into structured reports.",
    capabilities: [
      "Deep web & regulatory scraping across 10,000+ public sources",
      "Real-time competitor pricing and product feature diff tracking",
      "Executive dossier generation with cited references",
      "B2B account discovery and firmographic enrichment",
      "Automated patent, funding, and hiring signal monitoring",
      "Cross-lingual intelligence synthesis across 40+ languages",
      "Unstructured data normalization into JSON/CSV schemas",
      "Semantic trend analysis of industry thought leadership"
    ],
    inputs: [
      "Target industry or competitor domain list",
      "Research brief or specific analytical hypothesis",
      "Output format specification (Markdown, PDF, Notion, CRM)"
    ],
    outputs: [
      "Comprehensive competitive audit document",
      "Structured CSV/JSON account dataset with verified metadata",
      "Executive summary slide outline & key takeaways"
    ],
    tools: [
      { name: "mcp_web_scrape", category: "Intelligence", description: "Headless deep DOM extraction with anti-bot resilience" },
      { name: "mcp_diff_engine", category: "Analysis", description: "Temporal webpage diffing for pricing & feature change logs" },
      { name: "mcp_notion_sync", category: "Output", description: "Direct export into corporate Notion databases" },
      { name: "mcp_sec_filings", category: "Finance", description: "Structured parsing of 10-K, 10-Q, and annual reports" },
      { name: "mcp_crunchbase", category: "Data Enrichment", description: "Firmographic data, funding rounds, and key personnel" },
      { name: "mcp_linkedin_graph", category: "Networking", description: "Organizational mapping and hiring trend extraction" },
      { name: "mcp_hubspot_crm", category: "Output", description: "Direct lead and account creation in HubSpot" }
    ],
    targetUsers: ["Strategy Teams", "Founders & Execs", "Product Managers", "Corporate Development"],
    stats: {
      avgTimeSaved: "18 hrs/week",
      successRate: "99.1%",
      tasksHandled: "4,820+"
    },
    sampleRun: {
      prompt: "Find 25 qualified commercial plumbing companies in Austin with over $2M revenue and map their digital presence.",
      executionTime: "42 seconds",
      toolsInvoked: ["mcp_web_scrape", "mcp_enrich_geo", "mcp_revenue_estimator"],
      humanApprovalRequired: false,
      resultSummary: "25 fully enriched commercial plumbing accounts identified with verified emails, owner names, and estimated revenue."
    },
    workflowSteps: [
      { stepNumber: 1, name: "Deconstruct Goal", action: "Parse constraints, target geography (Austin, TX), and revenue criteria", toolUsed: "Internal NLP Parser", status: "completed", outputPreview: "Parsed 4 criteria: Region: Austin TX | Industry: Commercial Plumbing | Min Rev: $2M | Output Count: 25" },
      { stepNumber: 2, name: "Source Aggregation", action: "Query Google Maps, state trade licensing boards, and local business registries", toolUsed: "mcp_web_scrape", status: "completed", outputPreview: "Fetched 118 raw entities matching industry criteria" },
      { stepNumber: 3, name: "Enrich & Filter", action: "Cross-reference employee count, public reviews, and commercial license records", toolUsed: "mcp_enrich_geo", status: "completed", outputPreview: "Filtered down to 31 high-confidence candidates" },
      { stepNumber: 4, name: "Synthesize Dossier", action: "Rank top 25, format contact data, and export clean structured spreadsheet", toolUsed: "mcp_notion_sync", status: "completed", outputPreview: "Delivered 25 verified accounts into CRM & Notion" }
    ],
    approvalMode: "Autonomous with audit"
  },
  {
    slug: "sales",
    name: "Sales Employee",
    role: "Autonomous Outbound SDR & Pipeline Specialist",
    category: "sales",
    categoryLabel: "Revenue Engine",
    color: "#16a34a",
    avatarIcon: "⚡",
    badge: "High ROI",
    oneliner: "Discovers target accounts, enriches buying committee contacts, and drafts high-converting bespoke outreach.",
    purpose: "Operates 24/7 outbound prospecting, hyper-personalized email sequencing, CRM pipeline hygiene, and inbound lead qualification.",
    capabilities: [
      "Prospect ICP qualification and account intent scoring",
      "Hyper-personalized 1:1 email drafting based on recent prospect news",
      "Two-way Salesforce and HubSpot contact synchronization",
      "Meeting scheduling coordination and objection pre-drafting",
      "Automated follow-up cadences with sentiment analysis"
    ],
    inputs: [
      "Target ICP definitions and buyer persona titles",
      "Value proposition and proof points",
      "CRM integration credentials or target CSV"
    ],
    outputs: [
      "Enriched CRM contacts with verified LinkedIn and email",
      "Personalized draft sequences awaiting approval",
      "Pipeline stage progression reports and response alerts"
    ],
    tools: [
      { name: "mcp_salesforce_crm", category: "CRM", description: "Direct read/write object sync with validation rules" },
      { name: "mcp_linkedin_search", category: "Prospecting", description: "Profile verification and recent post topic extraction" },
      { name: "mcp_email_draft", category: "Outreach", description: "Synthesizes contextual email bodies with anti-spam check" },
      { name: "mcp_slack_alert", category: "Notifications", description: "Instant alert to Account Executive when meeting requested" },
      { name: "mcp_gong_analysis", category: "Intelligence", description: "Analyzes call transcripts for prospect objections and sentiment" },
      { name: "mcp_zoominfo_enrich", category: "Data", description: "Pulls direct dial phone numbers and corporate hierarchies" }
    ],
    targetUsers: ["VP of Sales", "Head of Growth", "SDR Teams", "Account Executives"],
    stats: {
      avgTimeSaved: "26 hrs/week",
      successRate: "98.4%",
      tasksHandled: "12,400+"
    },
    sampleRun: {
      prompt: "Identify 10 Series-B Fintech heads of engineering, check if they hired recently, and draft tailored cold outreach referencing their open roles.",
      executionTime: "1m 15s",
      toolsInvoked: ["mcp_linkedin_search", "mcp_salesforce_crm", "mcp_email_draft"],
      humanApprovalRequired: true,
      resultSummary: "10 high-priority leads queued in HubSpot. 10 custom email drafts generated with job posting references awaiting 1-click approval."
    },
    workflowSteps: [
      { stepNumber: 1, name: "Prospect Discovery", action: "Search target accounts for Head of Engineering / VP Engineering titles", toolUsed: "mcp_linkedin_search", status: "completed", outputPreview: "Found 14 matching executives across 10 target companies" },
      { stepNumber: 2, name: "Signal Extraction", action: "Scrape company careers page for active infrastructure & AI engineering roles", toolUsed: "mcp_web_scrape", status: "completed", outputPreview: "Detected recent hiring surge in data engineering across 8 accounts" },
      { stepNumber: 3, name: "Contextual Drafting", action: "Draft personalized icebreakers referencing specific role requirements", toolUsed: "mcp_email_draft", status: "completed", outputPreview: "Generated 10 tailored emails with 0 hallucinated claims" },
      { stepNumber: 4, name: "Human Gate", action: "Present preview in OllaSuper dashboard for rep 1-click sign-off", toolUsed: "Human-in-the-Loop", status: "in_progress", outputPreview: "Awaiting approval: 10 emails ready to launch" }
    ],
    approvalMode: "Human approval for writes"
  },
  {
    slug: "marketing",
    name: "Marketing Employee",
    role: "Autonomous Content Strategist & Growth Operator",
    category: "marketing",
    categoryLabel: "Brand & Growth",
    color: "#ff83da",
    avatarIcon: "🎯",
    badge: "Creative & Fast",
    oneliner: "Generates high-ranking technical articles, repurposes omnichannel social posts, and audits SEO health.",
    purpose: "Transforms product updates and technical documentation into structured multi-channel marketing campaigns, newsletters, and rank-ready content.",
    capabilities: [
      "Long-form SEO blog post generation with authoritative citations",
      "Omnichannel content repurposing (X/Twitter threads, LinkedIn posts, newsletters)",
      "Search intent clustering and keyword gap auditing",
      "Automated weekly performance benchmarking and attribution reports",
      "Brand voice adherence checks using strict style guidelines"
    ],
    inputs: [
      "Product changelog or raw technical documentation",
      "Brand tone of voice profile and forbidden terms",
      "Target SEO keyword cluster"
    ],
    outputs: [
      "Ready-to-publish Markdown articles with optimized meta tags",
      "Complete social distribution campaign pack",
      "Search ranking and keyword visibility tracker"
    ],
    tools: [
      { name: "mcp_content_cms", category: "CMS", description: "Direct publish / draft insertion into Astro, Webflow, or Ghost" },
      { name: "mcp_seo_auditor", category: "SEO", description: "Analyzes heading hierarchy, keyword density, and internal links" },
      { name: "mcp_social_scheduler", category: "Social", description: "Schedules approved posts across X and LinkedIn" },
      { name: "mcp_google_analytics", category: "Analytics", description: "Pulls live traffic reports and conversion metrics for attribution tracking" },
      { name: "mcp_canva_generator", category: "Design", description: "Auto-generates branded social media graphics and featured images" }
    ],
    targetUsers: ["Content Marketers", "Growth Leads", "Founders", "SEO Directors"],
    stats: {
      avgTimeSaved: "22 hrs/week",
      successRate: "97.8%",
      tasksHandled: "6,300+"
    },
    sampleRun: {
      prompt: "Turn our v2.4 Release Notes on Model Context Protocol into a 1,200-word technical guide, 3 LinkedIn posts, and a 6-part X thread.",
      executionTime: "58 seconds",
      toolsInvoked: ["mcp_content_cms", "mcp_seo_auditor"],
      humanApprovalRequired: true,
      resultSummary: "Complete multi-channel asset pack created. Readability score 84/100. Staged in CMS drafts."
    },
    workflowSteps: [
      { stepNumber: 1, name: "Extract Key Claims", action: "Analyze v2.4 engineering changelog and identify top 3 customer benefits", toolUsed: "NLP Synthesizer", status: "completed", outputPreview: "Extracted: 10x lower latency, MCP compliance, zero-copy memory" },
      { stepNumber: 2, name: "Draft Technical Article", action: "Author 1,200-word longform guide structured for SEO keyword 'MCP Architecture'", toolUsed: "mcp_content_cms", status: "completed", outputPreview: "Article completed: 1,240 words, 4 code samples, 6 H2 headings" },
      { stepNumber: 3, name: "Repurpose Social Assets", action: "Deconstruct into 3 executive LinkedIn summaries and an X thread", toolUsed: "mcp_social_scheduler", status: "completed", outputPreview: "3 LinkedIn variants and 6-tweet thread queued" },
      { stepNumber: 4, name: "Brand Voice Verification", action: "Run automated rubric check against tone guidelines (No hype, crisp, developer-focused)", toolUsed: "Style Validator", status: "completed", outputPreview: "Passed 100% brand safety check" }
    ],
    approvalMode: "Human approval for writes"
  },
  {
    slug: "customer-support",
    name: "Customer Support Employee",
    role: "Autonomous Tier-1 & Tier-2 Support Specialist",
    category: "support",
    categoryLabel: "Customer Care",
    color: "#7c3aed",
    avatarIcon: "🛡️",
    badge: "24/7 Active",
    oneliner: "Resolves customer tickets, diagnoses API errors, and synchronizes live documentation in real-time.",
    purpose: "Handles complex technical inquiries, reproduces reported errors from log traces, drafts accurate resolutions, and escalates edge cases with context.",
    capabilities: [
      "Instant resolution of billing, account, and configuration questions",
      "Automated error log analysis and code snippet troubleshooting",
      "Ticket sentiment classification and VIP account routing",
      "Automatic documentation gap detection based on recurring user queries",
      "Multi-language resolution across 40+ locales"
    ],
    inputs: [
      "Inbound Zendesk, Intercom, or Freshdesk ticket stream",
      "Internal documentation, knowledge base, and API schemas",
      "System status and live service health endpoints"
    ],
    outputs: [
      "Accurate, empathetic customer resolution responses",
      "Automated ticket tags, priority classifications, and CRM sync",
      "Weekly support insights digest and documentation bug reports"
    ],
    tools: [
      { name: "mcp_zendesk_api", category: "Helpdesk", description: "Reads tickets, replies, tags, and manages status" },
      { name: "mcp_log_diagnostics", category: "Engineering", description: "Queries Datadog/Sentry logs to correlate user error timestamps" },
      { name: "mcp_kb_updater", category: "Knowledge", description: "Proposes new FAQ articles for unanswered queries" },
      { name: "mcp_linear_tracker", category: "Engineering", description: "Automatically files and links bug reports directly in Linear" },
      { name: "mcp_refund_processor", category: "Billing", description: "Securely processes partial or full Stripe refunds under strict policy gates" }
    ],
    targetUsers: ["Support Operations", "Customer Success", "Technical Support Engineers"],
    stats: {
      avgTimeSaved: "34 hrs/week",
      successRate: "99.4%",
      tasksHandled: "28,500+"
    },
    sampleRun: {
      prompt: "User reports '401 Invalid Token on Webhook Endpoint'. Diagnose against logs, verify their API key status, and provide copy-paste fix.",
      executionTime: "18 seconds",
      toolsInvoked: ["mcp_zendesk_api", "mcp_log_diagnostics"],
      humanApprovalRequired: false,
      resultSummary: "Diagnosed header misconfiguration in user request. Sent tailored snippet showing correct Authorization header format."
    },
    workflowSteps: [
      { stepNumber: 1, name: "Parse Inbound Ticket", action: "Extract user ID, endpoint URL, error code, and timestamp", toolUsed: "mcp_zendesk_api", status: "completed", outputPreview: "Parsed: User #88129 | Endpoint: /v1/webhooks | Error: 401 Unauthorized" },
      { stepNumber: 2, name: "Query Telemetry", action: "Check server logs for recent failed requests from user IP/Token ID", toolUsed: "mcp_log_diagnostics", status: "completed", outputPreview: "Found mismatch: Bearer prefix was omitted in Authorization header" },
      { stepNumber: 3, name: "Draft Solution", action: "Generate concise resolution with exact curl example and token rotation link", toolUsed: "Resolution Engine", status: "completed", outputPreview: "Generated verified solution with code sample" },
      { stepNumber: 4, name: "Send & Close", action: "Reply to customer ticket, apply 'resolved' tag, and record resolution time (18s)", toolUsed: "mcp_zendesk_api", status: "completed", outputPreview: "Ticket #41029 resolved. Customer rating: 5/5" }
    ],
    approvalMode: "Autonomous with audit"
  },
  {
    slug: "operations",
    name: "Operations Employee",
    role: "Autonomous Business Operations & Data Orchestrator",
    category: "operations",
    categoryLabel: "Operations & Finance",
    color: "#52525b",
    avatarIcon: "⚙️",
    badge: "Mission Critical",
    oneliner: "Reconciles billing anomalies, automates vendor onboarding, and audits cross-platform compliance.",
    purpose: "Executes repetitive multi-system business operations, audits data discrepancies between Stripe and ERP, and manages approval workflows.",
    capabilities: [
      "Automated Stripe, QuickBooks, and NetSuite payment reconciliation",
      "Vendor contract compliance auditing and renewal alerts",
      "Employee onboarding task provisioning across Google Workspace and Slack",
      "Database hygiene scans (duplicate records, broken foreign keys)",
      "Automated weekly operational metric aggregation"
    ],
    inputs: [
      "Stripe transactions, bank exports, and invoice PDFs",
      "Vendor contracts and service level agreements",
      "HR information system change events"
    ],
    outputs: [
      "Reconciled general ledger entries with matched receipts",
      "Compliance audit report with flagged exceptions",
      "Automated provisioning checklists and status notifications"
    ],
    tools: [
      { name: "mcp_stripe_billing", category: "Finance", description: "Fetches payouts, dispute statuses, and invoice line items" },
      { name: "mcp_sql_query", category: "Data", description: "Read-only SQL queries to verify production record consistency" },
      { name: "mcp_slack_approval", category: "Governance", description: "Dispatches interactive approval buttons to Finance Slack channel" },
      { name: "mcp_workday_hris", category: "HR", description: "Syncs employee status changes and automates offboarding protocols" },
      { name: "mcp_aws_billing", category: "Infrastructure", description: "Monitors cloud spend anomalies and flags orphaned infrastructure" }
    ],
    targetUsers: ["COO", "Finance Directors", "BizOps Managers", "IT Administrators"],
    stats: {
      avgTimeSaved: "30 hrs/week",
      successRate: "99.8%",
      tasksHandled: "15,200+"
    },
    sampleRun: {
      prompt: "Reconcile yesterday's 142 Stripe transactions against QuickBooks invoices and flag any missing receipts over $500.",
      executionTime: "35 seconds",
      toolsInvoked: ["mcp_stripe_billing", "mcp_sql_query", "mcp_slack_approval"],
      humanApprovalRequired: true,
      resultSummary: "140 transactions matched perfectly. 2 transactions flagged for missing receipts ($850 and $1,200). Slack approval card sent to #finance."
    },
    workflowSteps: [
      { stepNumber: 1, name: "Pull Ingest Feeds", action: "Fetch 142 payment events from Stripe API and 142 invoices from QuickBooks", toolUsed: "mcp_stripe_billing", status: "completed", outputPreview: "Retrieved 142 records total: $84,290.00 aggregate volume" },
      { stepNumber: 2, name: "Reconciliation Matrix", action: "Match by transaction ID, timestamp, and net amount", toolUsed: "mcp_sql_query", status: "completed", outputPreview: "140 matched with 100% confidence. 2 exceptions isolated." },
      { stepNumber: 3, name: "Exception Processing", action: "Extract vendor names for the 2 anomalies and check procurement records", toolUsed: "Internal Ledger Auditor", status: "completed", outputPreview: "Anomaly 1: AWS Overage ($850) | Anomaly 2: Figma Enterprise ($1,200)" },
      { stepNumber: 4, name: "Approval Request", action: "Dispatch interactive approval block to Finance controller in Slack", toolUsed: "mcp_slack_approval", status: "completed", outputPreview: "Slack block posted. Awaiting 1-click confirmation." }
    ],
    approvalMode: "Strict human-in-the-loop"
  },
  {
    slug: "custom",
    name: "Custom Employee",
    role: "User-Defined Autonomous Agent Architecture",
    category: "custom",
    categoryLabel: "Modular Intelligence",
    color: "#e8ff5b",
    avatarIcon: "✨",
    badge: "Extensible",
    oneliner: "Build bespoke AI employees tailored to your company's proprietary tools, APIs, and SOPs.",
    purpose: "Enables engineering and operations teams to define custom personas, attach private MCP tool servers, configure strict guardrails, and deploy on custom schedules.",
    capabilities: [
      "Zero-code or TypeScript/Python definition using Model Context Protocol",
      "Private VPC execution and custom database connector support",
      "Custom trigger modes: Cron schedules, Webhooks, or Human dispatch",
      "Granular permission scopes down to individual API methods",
      "Comprehensive unit testing and deterministic evaluation benchmarks"
    ],
    inputs: [
      "Custom system prompt & Standard Operating Procedures (SOP)",
      "MCP server endpoints or OpenAPI 3.0 specification",
      "Trigger schedule and approval gate policies"
    ],
    outputs: [
      "Automated business outcomes directly inside proprietary systems",
      "Full execution traces with token cost breakdowns",
      "Automated regression test scorecards"
    ],
    tools: [
      { name: "mcp_custom_server", category: "Bespoke", description: "Connects to any internal HTTP/gRPC/SSE tool server" },
      { name: "mcp_eval_suite", category: "Evaluation", description: "Runs 50+ deterministic golden tests before production deployment" },
      { name: "mcp_vault_secrets", category: "Security", description: "Zero-knowledge injection of API keys and database credentials" },
      { name: "mcp_docker_runner", category: "Compute", description: "Spins up ephemeral containers for untrusted script execution" },
      { name: "mcp_webhook_receiver", category: "Events", description: "Listens for custom payloads to trigger asynchronous workflows" }
    ],
    targetUsers: ["AI Engineers", "Enterprise Architects", "Technical Founders", "Systems Integrators"],
    stats: {
      avgTimeSaved: "Custom",
      successRate: "99.0%",
      tasksHandled: "Infinite"
    },
    sampleRun: {
      prompt: "Execute proprietary inventory re-balancing SOP across 4 European warehouse microservices every morning at 04:00 UTC.",
      executionTime: "Variable",
      toolsInvoked: ["mcp_custom_server", "mcp_eval_suite"],
      humanApprovalRequired: true,
      resultSummary: "Custom employee deployed to secure cluster. Passed all 48 test assertions."
    },
    workflowSteps: [
      { stepNumber: 1, name: "Schema Binding", action: "Load custom OpenAPI schema and register 12 proprietary tools", toolUsed: "mcp_custom_server", status: "completed", outputPreview: "Registered 12 tools across Inventory, Logistics, and ERP APIs" },
      { stepNumber: 2, name: "Golden Test Run", action: "Execute 48 benchmark prompts against test environment", toolUsed: "mcp_eval_suite", status: "completed", outputPreview: "100% pass rate. Average latency 340ms" },
      { stepNumber: 3, name: "Policy Enforcement", action: "Verify approval gates on warehouse inventory transfers > €10,000", toolUsed: "Policy Guard", status: "completed", outputPreview: "Guardrail active: Transits > €10k require Ops Lead sign-off" },
      { stepNumber: 4, name: "Deploy Fleet", action: "Schedule recurring cron at 04:00 UTC with automated trace capture", toolUsed: "Fleet Orchestrator", status: "completed", outputPreview: "Employee active and healthy in production" }
    ],
    approvalMode: "Strict human-in-the-loop"
  }
];

export function getEmployeeBySlug(slug: string): AIEmployee | undefined {
  return AI_EMPLOYEES.find((emp) => emp.slug === slug);
}
