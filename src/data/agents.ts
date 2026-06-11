// 6 openfang Agents. Single source of truth — home grid, /agents index,
// each /agents/[slug] detail page, all derive from this file.
//
// Agents are DIFFERENT from Experts (see src/data/experts.ts). Experts are
// 30 chat-driven personas that advise; they have no schedule, no tools beyond
// chat, and cannot take real-world actions. Agents have a recurring schedule,
// a tool surface (mcp_ollagraph_*), a workspace, approval gates, and run on
// the openfang sidecar at 172.16.70.25:4201 — they DO things.
//
// To add a 7th Agent: drop another entry here + matching agent.toml in
// `copyai_remote/openfang-agents/<slug>/agent.toml` on the dashboard repo,
// then deploy that agent.toml to /root/.openfang/agents/<slug>/ on the
// sidecar. The dashboard's `is_openfang_agent` allowlist must also be
// updated in `copyai_remote/src/integrations/openfang.rs`.

export type AgentCategory = "sales" | "marketing" | "ops" | "research";

export interface AgentScheduleSpec {
  type: "periodic" | "continuous";
  display: string;        // "Every 30 minutes" / "Continuous (manual)"
  cron?: string;          // raw openfang field, e.g. "every 30m"
  intervalSecs?: number;  // for continuous mode
}

export interface AgentToolSpec {
  name: string;           // "mcp_ollagraph_scrape" or "file_write"
  category: "ollagraph" | "memory" | "filesystem" | "web";
  description: string;    // 1 line
}

export interface AgentApprovalSpec {
  mode: "none" | "drafts" | "writes";
  display: string;        // "No approval required — read-only audits"
  details?: string;       // optional second line
}

export interface AgentChip {
  title: string;
  tagline: string;
  prompt: string;
}

export interface AgentSample {
  user: string;
  assistant: string;
}

export interface Agent {
  slug: string;
  name: string;
  short: string;
  category: AgentCategory;
  color: string;
  oneliner: string;
  workflow: string;       // 2-3 sentence paragraph: what the agent actually does
  schedule: AgentScheduleSpec;
  model: string;          // OpenRouter model id (no Anthropic — see feedback_no_anthropic.md)
  modelTier: "fast" | "smart" | "deep-research";
  tools: AgentToolSpec[];
  approval: AgentApprovalSpec;
  workspace: string[];    // paths the agent reads/writes under /var/lib/openfang/workspace/
  starters: AgentChip[];
  sample: AgentSample;
  pairs: string[];        // slugs of 1-3 related Agents OR Experts (Experts must have `experts/` prefix)
}

export const agentCategories: Record<AgentCategory, { label: string; color: string; icon: string }> = {
  sales:     { label: "Sales",     color: "#0066ff", icon: "↗" },
  marketing: { label: "Marketing", color: "#16a34a", icon: "◎" },
  ops:       { label: "Ops",       color: "#52525b", icon: "▤" },
  research:  { label: "Research",  color: "#7c3aed", icon: "✦" },
};

export const agents: Agent[] = [
  // ──────────────────────────────────────────────────────────────── SALES
  {
    slug: "outbound-sdr",
    name: "Outbound SDR Agent",
    short: "Outbound SDR",
    category: "sales",
    color: "#0066ff",
    oneliner: "Researches prospects, drafts personalized cold outreach with company-specific hooks, queues every draft for your approval before send.",
    workflow:
      "Every 30 minutes, scans for new prospect intake (a URL or company name). Runs a real recon via ollagraph: scrapes the homepage, checks WHOIS, pulls structured schema, extracts the language they actually use. Drafts a 90-word AIDA cold email referencing a real hook (a launch, a job posting, a public announcement) — never fabricated. Drops it in `outbox/` for your review. Nothing sends without you clicking approve.",
    schedule: { type: "periodic", display: "Every 30 minutes", cron: "every 30m" },
    model: "openrouter/openai/gpt-4o-mini",
    modelTier: "fast",
    tools: [
      { name: "mcp_ollagraph_scrape",             category: "ollagraph",  description: "Clean markdown of the prospect's homepage" },
      { name: "mcp_ollagraph_intel_whois",         category: "ollagraph",  description: "Domain ownership + registration date (filters fake/throwaway domains)" },
      { name: "mcp_ollagraph_extract_structured",  category: "ollagraph",  description: "Real legal entity name, location, schema.org data" },
      { name: "mcp_ollagraph_seo_keyword_extract", category: "ollagraph",  description: "The language they use about themselves — re-used in outreach" },
      { name: "file_write",                        category: "filesystem", description: "Drop drafts in outbox/" },
      { name: "memory_store",                      category: "memory",     description: "Track which prospects we've already targeted" },
    ],
    approval: {
      mode: "drafts",
      display: "Every draft requires your approval before send",
      details: "Outreach is queued in outbox/<domain>__<date>.md. You read, edit, click approve. Nothing leaves until then.",
    },
    workspace: ["outbox/", "shared.outbound.*"],
    starters: [
      { title: "Recon a prospect",     tagline: "URL → 2-line summary",           prompt: "Recon: https://example.com — who they are, when their domain was registered, one outreach hook based on real recent activity. No outreach draft yet." },
      { title: "Draft cold outreach",  tagline: "After recon — full AIDA email",  prompt: "Draft a 90-word cold outreach email to the COO of <company>. Use the hook from the prior recon. AIDA structure, soft CTA, single-line signature." },
      { title: "Multi-touch sequence", tagline: "Initial + 2 follow-ups",         prompt: "Plan a 3-touch outreach sequence (initial + follow-up 1 at +4d + follow-up 2 at +9d + breakup at +14d) for a prospect at Series B fintech. Each touch must add new value." },
      { title: "Disqualify a prospect", tagline: "Stop wasting energy on no-fits", prompt: "Quick disqualify check on https://example.com — is this prospect worth pursuing? Look at company stage, real product, current hiring signals. Recommend pursue / park / drop in 2 lines." },
    ],
    sample: {
      user: "Recon https://ollagraph.com and draft outreach to their founder.",
      assistant:
        "**Recon (3 lines):** Ollagraph provides a web-intelligence layer for AI agents (scrape + extract + audit). Domain registered May 24 2026 via BigRock, Cloudflare DNS. Their homepage emphasizes \"1,000 free credits on signup\" — that's the hook.\n\n**Draft (89 words):**\n\nSubject: 1,000 credits + the AEO-block problem\n\nHi <Founder>,\n\nNoticed Ollagraph's free-1000-credits offer — clever onboarding for AI-agent builders. We're shipping OllaSuper, an agent platform that hits 4-5 web tools per task. Our current bottleneck is exactly what Ollagraph fixes — fragmented scraping providers. Worth a 15-min chat next Tuesday or Thursday on whether we should be your power user (or one of the first to test the audit endpoints)?\n\nNo deck, no demo — just a real engineering chat.\n\n— <Name>\n*queued at outbox/ollagraph__2026-06-11.md; awaiting approval*",
    },
    pairs: ["pipeline-curator", "deep-research", "experts/sdr"],
  },

  {
    slug: "pipeline-curator",
    name: "Pipeline Curator Agent",
    short: "Pipeline Curator",
    category: "sales",
    color: "#3b82f6",
    oneliner: "Reads your sales pipeline every 4 hours, flags genuinely at-risk deals, suggests the next specific action — not generic 'follow up'.",
    workflow:
      "Every 4 hours, reads pipeline/deals.yaml. For each open deal computes days_in_stage, days_since_activity, age, and benchmarks against learned stage_norms. Flags real at-risk (over-flagging kills signal). Where useful, runs WHOIS or schema-extract on the company domain to catch red flags. Writes a daily digest of top actions; a Monday forecast splits Commit / Best-case / Pipe with probabilities derived from stage + age + activity, not from CRM fields you can't see.",
    schedule: { type: "periodic", display: "Every 4 hours", cron: "every 4h" },
    model: "openrouter/openai/gpt-4o-mini",
    modelTier: "fast",
    tools: [
      { name: "file_read",                         category: "filesystem", description: "Read pipeline/deals.yaml" },
      { name: "mcp_ollagraph_intel_whois",         category: "ollagraph",  description: "Stale WHOIS check on company domain" },
      { name: "mcp_ollagraph_extract_structured",  category: "ollagraph",  description: "Enrich sparse account notes from homepage" },
      { name: "file_write",                        category: "filesystem", description: "Daily digest + Monday forecast reports" },
      { name: "memory_store",                      category: "memory",     description: "Track per-deal assessments + learn stage_norms" },
    ],
    approval: {
      mode: "none",
      display: "Advisory only — no approval required",
      details: "Pipeline Curator never moves deals or notifies prospects. It writes reports for you and your reps to read.",
    },
    workspace: ["pipeline/", "reports/pipeline/", "shared.pipeline.*"],
    starters: [
      { title: "Today's digest",       tagline: "At-risk + recommended actions", prompt: "Run today's digest from pipeline/deals.yaml. Lead with: deals open, total $, at-risk count and $. Then top 3 actions. Then 1 win." },
      { title: "Monday forecast",      tagline: "Commit / Best / Pipe",          prompt: "Run the Monday weekly forecast. Buckets by your close-probability assessment — not by CRM stage field. Justify each bucket placement in 1 line." },
      { title: "Why is this stuck?",   tagline: "Per-deal coaching",             prompt: "Deal_id=42 has been in 'proposal' for 47 days. Run your stage health check, identify the real blocker, and recommend the next-action (specific — not 'follow up')." },
      { title: "Coach me on slip risk", tagline: "End-of-month gut check",        prompt: "It's the 24th of the month. Look at all deals targeted to close this month. Which are real-real, which are real-on-paper, which should I stop counting? Be brutal." },
    ],
    sample: {
      user: "Digest please.",
      assistant:
        "**14 deals open · $1.42M total · 4 at risk worth $380K**\n\n**Top 3 actions for today:**\n1. Deal_id=42 (CommBank, $120K) — 47d in 'proposal', 22d no activity. Their CFO asked for the SOC 2 report on June 2; we never sent. Send today.\n2. Deal_id=51 (Brex, $90K) — IT decision-maker (Priya, named in notes) never engaged. Schedule a focused 15-min discovery with her this week.\n3. Deal_id=37 (NorthHQ, $80K) — pull. Company filed for restructuring. WHOIS contacts changed June 5. Don't waste another touch.\n\n**Win:** Deal_id=58 (Verkada, $140K) advanced from 'demo' to 'proposal' yesterday — your custom-integration demo nailed it.",
    },
    pairs: ["outbound-sdr", "deep-research", "experts/sales"],
  },

  // ──────────────────────────────────────────────────────────────── MARKETING
  {
    slug: "seo-auditor",
    name: "SEO Auditor Agent",
    short: "SEO Auditor",
    category: "marketing",
    color: "#16a34a",
    oneliner: "Real AEO + SEO audits every 6 hours, with specific code-level fixes — not generic 'improve your meta tags' advice.",
    workflow:
      "Every 6 hours, audits each URL in audit_targets.yaml (default: ollasuper.com + app.ollasuper.com). Runs 5 ollagraph audits per URL in sequence: AEO page score, citation readiness for AI crawlers (GPTBot, ClaudeBot, PerplexityBot), structured-data presence (FAQPage, Article, BreadcrumbList), keyword extraction, content-drift hash. Compares to last run and flags regressions of more than 5 points. Reports include the exact code change to make and expected score lift. Powered by Tongyi DeepResearch — built for multi-tool chains.",
    schedule: { type: "periodic", display: "Every 6 hours", cron: "every 6h" },
    model: "openrouter/alibaba/tongyi-deepresearch-30b-a3b",
    modelTier: "deep-research",
    tools: [
      { name: "mcp_ollagraph_aeo_page_audit",         category: "ollagraph",  description: "0–100 AEO score + grade + recommendations" },
      { name: "mcp_ollagraph_aeo_citation_readiness", category: "ollagraph",  description: "Confirms AI crawlers can index the page" },
      { name: "mcp_ollagraph_extract_structured",     category: "ollagraph",  description: "Detects FAQPage / Article / BreadcrumbList schema" },
      { name: "mcp_ollagraph_seo_keyword_extract",    category: "ollagraph",  description: "Weighted keywords vs last run" },
      { name: "mcp_ollagraph_scrape",                 category: "ollagraph",  description: "Hash markdown for content-drift detection" },
      { name: "file_write",                           category: "filesystem", description: "Audit reports in reports/seo/" },
      { name: "memory_store",                         category: "memory",     description: "Per-URL last_score / last_grade / last_hash" },
    ],
    approval: {
      mode: "none",
      display: "Read-only audits — no approval required",
      details: "SEO Auditor only writes reports. It never modifies the audited sites.",
    },
    workspace: ["reports/seo/", "audit_targets/", "shared.seo.*"],
    starters: [
      { title: "Audit a URL",         tagline: "Score + grade + top fixes",        prompt: "Quick AEO audit on https://yoursite.com. Score, grade, top critical issue, top high issue, one specific code change." },
      { title: "Full report",         tagline: "All tracked URLs, structured",     prompt: "Run a full audit on all URLs in audit_targets.yaml. Use the markdown report format with TL;DR / Regressions / Wins / Per-URL Detail / Action Items." },
      { title: "Compare to last run", tagline: "Where did we slip?",                prompt: "What's changed since my last audit? Surface every URL whose score dropped 5+ points or letter-grade slid. Pinpoint the exact change you can see in the keyword / schema / scrape diff." },
      { title: "Pre-launch check",    tagline: "Block-list for a new page",         prompt: "I'm about to launch https://yoursite.com/new-feature. Run citation-readiness + schema check. Tell me exactly what to fix in the HTML before I ship." },
    ],
    sample: {
      user: "Audit https://ollasuper.com.",
      assistant:
        "**AEO Audit — ollasuper.com**\n\n- **Score:** 56.8\n- **Grade:** D\n- **Top Critical:** Server blocks 8 AI crawlers at the edge (403/429). robots.txt explicitly blocks GPTBot, ClaudeBot, Google-Extended, PerplexityBot.\n- **Top High:** No FAQPage / Article / BreadcrumbList schema. Cuts citation eligibility in half on question-shaped queries.\n- **Specific code change:** In `public/robots.txt`, remove the User-agent: GPTBot / ClaudeBot / Google-Extended blocks. In your homepage `<head>`, add a FAQPage JSON-LD block covering your top 5 product questions. Estimated lift: +18 points → mid-B grade.\n\nReport saved to reports/seo/2026-06-11__0830.md.",
    },
    pairs: ["content-publisher", "deep-research", "experts/seo", "experts/aeo"],
  },

  {
    slug: "content-publisher",
    name: "Content Publisher Agent",
    short: "Content Publisher",
    category: "marketing",
    color: "#10b981",
    oneliner: "Researches deeply, then drafts AEO-optimized blog posts, social copy, and newsletters that are queued for your approval.",
    workflow:
      "Receives a topic + format brief. Researches 3-5 top-ranking pages on the topic via ollagraph_scrape, extracts the language the niche actually uses, identifies a real gap, then drafts AEO-first content (H2s as question phrasings, bullet lists, citable numbers + sources). Every draft includes suggested FAQPage JSON-LD, meta description, and cross-post variants. Queues everything in drafts/ for your approval. Never publishes unilaterally.",
    schedule: { type: "continuous", display: "Continuous (manual trigger)", intervalSecs: 300 },
    model: "openrouter/openai/gpt-4o",
    modelTier: "smart",
    tools: [
      { name: "mcp_ollagraph_scrape",                  category: "ollagraph",  description: "Read top-ranking content on the topic" },
      { name: "mcp_ollagraph_seo_keyword_extract",     category: "ollagraph",  description: "Niche language + ranking keywords" },
      { name: "mcp_ollagraph_extract_structured",      category: "ollagraph",  description: "Competitor schema audit" },
      { name: "mcp_ollagraph_convert_html_to_markdown", category: "ollagraph", description: "Repurpose existing HTML cleanly" },
      { name: "web_fetch",                              category: "web",       description: "Fallback for ollagraph-blocked URLs" },
      { name: "file_write",                             category: "filesystem", description: "Drafts queue in drafts/<format>/" },
      { name: "memory_store",                           category: "memory",     description: "Cross-piece coherence + house style" },
    ],
    approval: {
      mode: "drafts",
      display: "Every draft requires your approval before publish",
      details: "Content lands in drafts/<format>/ with a sibling .meta.yaml. You review, edit, click approve. Nothing publishes until then.",
    },
    workspace: ["drafts/blog/", "drafts/twitter/", "drafts/linkedin/", "drafts/newsletter/", "shared.content.*"],
    starters: [
      { title: "Research a topic",  tagline: "Pre-draft research summary",        prompt: "Research the topic 'AEO for SaaS marketers' as if you were going to write a 1500-word blog post on it. Summarize: what's already covered, the gap, your proposed angle. Don't draft yet — wait for my go-ahead." },
      { title: "Draft a blog",      tagline: "AEO-first structure",                prompt: "Draft a 1500-word blog post: 'AEO for SaaS Marketers.' Use the AEO-first structure (H2s as questions, bullet lists, citable numbers). Add suggested FAQPage JSON-LD at the end." },
      { title: "Repurpose a piece", tagline: "Existing URL → social copy",         prompt: "Take https://yoursite.com/blog/some-post and produce: 1 LinkedIn post (250 words), 1 Twitter thread (5 tweets), 1 newsletter snippet (300 words). All cross-posted versions, voice-matched." },
      { title: "Outflank a competitor", tagline: "Their ranking page → better one", prompt: "Their best ranking page on this topic is https://competitor.com/whatever. Read it. Tell me what they got right, what's missing, and your proposed angle for a piece that wins on AEO citation." },
    ],
    sample: {
      user: "Research topic: AEO for SaaS marketers. Target: blog. Don't draft yet.",
      assistant:
        "**Research summary (what's already covered)**\n- Basic AEO definition vs SEO — every introductory post covers this\n- Schema markup (FAQ, How-To, Article) — well-trodden\n- Platform-specific tips (ChatGPT vs Gemini vs Perplexity preferences)\n- Citation-frequency as a metric — newer pattern\n\n**The gap**\nNobody is writing for SaaS marketers specifically. Everything is generic. SaaS marketers think in terms of buyer-journey, product-led growth, ROI — not 'citations' and 'engines.'\n\n**Proposed angle**\n*\"AEO for SaaS Marketers: How AI Search Is Reshaping B2B Buyer Research (And What to Do About It)\"*\n\n6-section structure: What AEO is (SaaS-framed) → why B2B buyers now research via ChatGPT first → comparison-table optimization → SaaS-specific schema → measuring AEO impact on pipeline → starter framework. Should I draft?",
    },
    pairs: ["seo-auditor", "deep-research", "experts/marketing", "experts/writer"],
  },

  // ──────────────────────────────────────────────────────────────── OPS
  {
    slug: "inbox-triage",
    name: "Inbox Triage Agent",
    short: "Inbox Triage",
    category: "ops",
    color: "#52525b",
    oneliner: "Every 15 minutes, classifies new inbound messages, drafts replies for routine ones, escalates the rest with full context.",
    workflow:
      "Every 15 minutes, scans inbox/unread/ for new YAML+markdown messages. Classifies each by intent (question / complaint / billing / sales / spam), urgency (P0_blocking → P3_whenever), sentiment, and requires_human flag. For routine messages, drafts a reply (capped at 200 words, matches sender's formality). For anything mentioning refund / lawyer / cancel / GDPR / breach, escalates instead of drafting — and prepends an ALERT line for angry P0s.",
    schedule: { type: "periodic", display: "Every 15 minutes", cron: "every 15m" },
    model: "openrouter/openai/gpt-4o-mini",
    modelTier: "fast",
    tools: [
      { name: "file_read",     category: "filesystem", description: "Read incoming messages from inbox/unread/" },
      { name: "file_list",     category: "filesystem", description: "Find new messages each run" },
      { name: "file_write",    category: "filesystem", description: "Draft replies in outbox/ or escalations" },
      { name: "memory_store",  category: "memory",     description: "Per-thread classification history" },
      { name: "memory_recall", category: "memory",     description: "Sender history before drafting" },
    ],
    approval: {
      mode: "drafts",
      display: "Drafted replies require your approval before send",
      details: "Replies land in outbox/drafts/<thread>__reply.md. Escalations bypass — they're informational only. Spam is moved to inbox/spam/ silently.",
    },
    workspace: ["inbox/unread/", "inbox/spam/", "outbox/drafts/", "escalations/", "reports/inbox/", "shared.inbox.*"],
    starters: [
      { title: "Triage now",            tagline: "Run the workflow once",            prompt: "Run your triage workflow now. Process every file in inbox/unread/. Report counts per intent and urgency, plus the top 3 items needing eyes." },
      { title: "Classify this message", tagline: "Paste an email, get classification", prompt: "Classify this inbound: From: [paste sender] / Subject: [paste subject] / Body: [paste body]. Apply your full classification tags. Do not draft a reply unless requires_human=false." },
      { title: "Today's digest",        tagline: "What hit the inbox today",          prompt: "Generate today's inbox digest: counts per intent + urgency, top 3 themes, aging items (no reply >48h), one suggested process improvement." },
      { title: "Spam discipline check", tagline: "Are we leaking real mail?",          prompt: "Look at the last 30 messages you marked as spam. Report on patterns: who's most-flagged sender, any false-positive risk, any patterns I should know about." },
    ],
    sample: {
      user: "Triage now.",
      assistant:
        "**1 message processed · 1 escalated · 0 drafts · 0 spam**\n\n**Escalation written:** escalations/P0_blocking__t_refund_test_001.md\n\nFrom angry-cto@example.com / Subject: Where is my refund??\n\nClassification: complaint · P0_blocking · angry · requires_human=true\n\nKey snippets:\n- \"I cancelled 30 days ago and you charged me again.\"\n- \"If not resolved by tomorrow I am calling my lawyer.\"\n\nRecommended owner: support_lead. ALERT prepended (P0 + angry).\n\n**Top items needing eyes:** the escalation above. No drafts pending.",
    },
    pairs: ["pipeline-curator", "experts/support", "experts/cs"],
  },

  // ──────────────────────────────────────────────────────────────── RESEARCH
  {
    slug: "deep-research",
    name: "Deep Research Agent",
    short: "Deep Research",
    category: "research",
    color: "#7c3aed",
    oneliner: "Multi-step research over the live web — structured briefs with citations. Powered by Tongyi DeepResearch, purpose-built for long horizons.",
    workflow:
      "Receives a research task. First restates the question + decomposes into 3-5 sub-questions. Builds an explicit plan, then iterates: ollagraph_scrape, intel_whois, extract_structured, intel_ssl, keyword_extract — cross-referencing every claim, flagging conflicts between sources, surfacing what couldn't be found. Returns a structured brief: TL;DR / Detailed findings (one section per sub-question) / Conflicts / Tried-but-failed / Numbered sources with timestamps. Every factual claim has a citation; no uncited claims allowed.",
    schedule: { type: "continuous", display: "Continuous (manual trigger)", intervalSecs: 600 },
    model: "openrouter/alibaba/tongyi-deepresearch-30b-a3b",
    modelTier: "deep-research",
    tools: [
      { name: "mcp_ollagraph_scrape",                   category: "ollagraph",  description: "Clean markdown of any URL" },
      { name: "mcp_ollagraph_extract_structured",       category: "ollagraph",  description: "JSON-LD / OpenGraph / schema markup" },
      { name: "mcp_ollagraph_intel_whois",              category: "ollagraph",  description: "Domain ownership + age + registrar" },
      { name: "mcp_ollagraph_intel_ssl",                category: "ollagraph",  description: "TLS cert details for security research" },
      { name: "mcp_ollagraph_seo_keyword_extract",      category: "ollagraph",  description: "What a page actually emphasizes" },
      { name: "mcp_ollagraph_convert_html_to_markdown", category: "ollagraph",  description: "Clean any HTML chunk" },
      { name: "web_fetch",                              category: "web",        description: "Fallback for ollagraph-blocked URLs" },
      { name: "file_write",                             category: "filesystem", description: "Briefs in research/ + handoffs/<agent>/" },
      { name: "memory_store",                           category: "memory",     description: "Cached source URLs + brief summaries for re-use" },
    ],
    approval: {
      mode: "none",
      display: "Read-only research — no approval required",
      details: "Deep Research only produces briefs. It never sends emails, modifies pipelines, or publishes content.",
    },
    workspace: ["research/", "handoffs/<agent>/", "shared.research.*"],
    starters: [
      { title: "Research a company",  tagline: "Domain → structured brief",   prompt: "Deep research request: <company.com>. Sub-questions: (1) What does the product actually do? (2) Who's behind it (founders, funding, size)? (3) What do users complain about most? (4) Top 3 substitutes. Cap at 12 tool calls. Structured brief." },
      { title: "Research a topic",    tagline: "Wide net, cited synthesis",    prompt: "Deep research: 'How do leading B2B SaaS companies measure AEO impact on pipeline?' Find 5-8 sources, cross-reference claims, surface conflicts. Cap at 20 tool calls." },
      { title: "Pre-call brief",      tagline: "Before a sales/partner call",  prompt: "I have a meeting with <company> tomorrow. Build a pre-call brief: company overview, recent news/triggers (last 90 days), likely pain points, discovery questions to ask, value propositions to lead with." },
      { title: "Verify a claim",      tagline: "Source-by-source check",       prompt: "Verify this claim: '<paste claim>'. Find 3 independent sources, rate each for credibility, return: verdict (true / partial / false), best supporting source, best refuting source." },
    ],
    sample: {
      user: "Deep research: ollagraph.com. (1) What does it do? (2) Domain age and owner? (3) Top 3 keywords on the homepage?",
      assistant:
        "### TL;DR\n- **Product:** Web-intelligence layer for AI agents — fetch, extract, audit, reason about the live web through a unified API\n- **Domain:** Registered 2026-05-24 via BigRock Solutions Ltd; Cloudflare DNS\n- **Top keywords:** \"string\" (6), \"ollagraph\" (5), \"extract\" (4) — technical, data-extraction focused\n\n### Detailed Findings\n#### 1. What does the product do?\nOllagraph positions itself as a single API for AI agents that need to interact with the live web. Capabilities include: scrape with stealth + residential proxies, structured extraction with JSON schemas, AEO audits, intelligence (WHOIS, SSL), observability for tool calls. Marketing emphasis on \"replaces fragmented stack of scrapers + parsers + auditors.\" [1]\n\n#### 2. Domain registration\nRegistrar: BigRock Solutions Ltd. Creation: 2026-05-24. Expiry: 2027-05-24. Nameservers: DAN.NS.CLOUDFLARE.COM, PAT.NS.CLOUDFLARE.COM. Very recent — high product-velocity stage. [2]\n\n#### 3. Homepage keyword emphasis\nWeighted keyword extract shows \"string\" (6), \"ollagraph\" (5), \"extract\" (4). The technical lean is intentional — this is an audience of agent builders, not marketers. [3]\n\n### Conflicts / Uncertainties\nNone — all three sources corroborated.\n\n### What we tried but couldn't find\nFounder names; funding info; user counts. Not on the homepage; would need adjacent sources (LinkedIn, Crunchbase) — not available via ollagraph tools.\n\n### Sources\n1. Ollagraph homepage markdown — retrieved 2026-06-11\n2. WHOIS ollagraph.com — retrieved 2026-06-11\n3. Keyword extract on ollagraph.com — retrieved 2026-06-11\n\nSaved to research/2026-06-11__ollagraph.md; 3 tool calls; cost $0.02.",
    },
    pairs: ["seo-auditor", "outbound-sdr", "content-publisher"],
  },
];
