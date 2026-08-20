export interface SolutionItem {
  slug: string;
  title: string;
  department: string;
  badge: string;
  tagline: string;
  heroText: string;
  recommendedSquad: { role: string; slug: string; duty: string }[];
  keyOutcomes: { metric: string; description: string }[];
  caseStudyHighlight: { company: string; logo: string; quote: string; author: string; role: string; stat: string };
  workflows: string[];
}

export const SOLUTIONS: SolutionItem[] = [
  {
    slug: "sales",
    title: "AI Workforce for Sales",
    department: "Revenue & Sales",
    badge: "3.8x Pipeline Growth",
    tagline: "Fill your pipeline with high-intent meetings without adding SDR headcount.",
    heroText: "Supercharge your sales organization with autonomous outbound prospecting, real-time CRM enrichment, automated follow-ups, and hyper-personalized pitch decks.",
    recommendedSquad: [
      { role: "Outbound SDR Employee", slug: "sales", duty: "Account discovery & 1:1 tailored email outreach" },
      { role: "Market Intelligence Employee", slug: "research", duty: "Buying committee profiling & competitor research" },
      { role: "Pipeline Ops Employee", slug: "operations", duty: "CRM stage hygiene & lead routing in Salesforce" }
    ],
    keyOutcomes: [
      { metric: "+320%", description: "Increase in qualified outbound accounts engaged per quarter" },
      { metric: "18 hrs/wk", description: "Saved per Account Executive on prospecting and CRM updates" },
      { metric: "4.2x", description: "Faster response time to high-value inbound requests" }
    ],
    caseStudyHighlight: {
      company: "Rampify Global",
      logo: "⚡",
      quote: "OllaSuper’s Sales and Research employees generate 45% of our qualified pipeline each month. Our AEs now spend 90% of their time on live customer calls rather than manual scraping.",
      author: "Elena Rostova",
      role: "VP of Global Revenue, Rampify",
      stat: "+$3.4M New Pipeline Generated"
    },
    workflows: [
      "Automated ICP Prospect Discovery & LinkedIn Signal Tracking",
      "Tailored First-Touch Email Drafting with Human Approval Gates",
      "Continuous Salesforce & HubSpot Two-Way Contact Hygiene",
      "Competitive Battlecard Synthesis Ahead of Scheduled Demos"
    ]
  },
  {
    slug: "marketing",
    title: "AI Workforce for Marketing",
    department: "Brand & Content",
    badge: "10x Content Velocity",
    tagline: "Scale technical content, SEO clusters, and omnichannel distribution seamlessly.",
    heroText: "Transform every product release, webinar, and case study into a multi-channel growth campaign across SEO articles, executive social threads, and targeted newsletters.",
    recommendedSquad: [
      { role: "Content & SEO Strategist", slug: "marketing", duty: "Longform guides, keyword clusters & meta tags" },
      { role: "Competitive Intelligence Analyst", slug: "research", duty: "Competitor positioning audits & feature diffs" },
      { role: "Distribution Operator", slug: "custom", duty: "Omnichannel social staging & newsletter formatting" }
    ],
    keyOutcomes: [
      { metric: "12x", description: "Increase in published high-ranking technical articles per month" },
      { metric: "+280%", description: "Organic search traffic growth within 90 days" },
      { metric: "0%", description: "Tone drift with strict deterministic brand voice validation" }
    ],
    caseStudyHighlight: {
      company: "CloudScale HQ",
      logo: "☁️",
      quote: "We scaled our technical content output from 2 posts a month to 25 rank-ready deep dives without hiring an agency. The quality and code sample accuracy blew us away.",
      author: "Marcus Vance",
      role: "Head of Marketing, CloudScale",
      stat: "Top 3 Ranking for 45 High-Intent Keywords"
    },
    workflows: [
      "Technical Changelog-to-Article Automated Authoring",
      "Real-Time Keyword Gap Auditing & Content Refresh",
      "Executive Ghostwriting & Thought Leadership Thread Drafting",
      "Multi-Channel Asset Formatting (Markdown, Webflow, Ghost, Social)"
    ]
  },
  {
    slug: "operations",
    title: "AI Workforce for Operations & Finance",
    department: "Operations & Finance",
    badge: "99.9% Audit Accuracy",
    tagline: "Eliminate manual reconciliation, invoice parsing, and cross-system data errors.",
    heroText: "Autonomous AI employees that monitor transactions, reconcile bank feeds against ERP ledgers, audit vendor contracts, and automate employee onboarding workflows.",
    recommendedSquad: [
      { role: "BizOps Orchestrator", slug: "operations", duty: "Stripe & NetSuite reconciliation, ledger verification" },
      { role: "Compliance & Risk Auditor", slug: "research", duty: "Vendor contract review & SOC2 evidence collection" },
      { role: "IT Provisioning Employee", slug: "custom", duty: "Google Workspace & Slack permission orchestrator" }
    ],
    keyOutcomes: [
      { metric: "$140k/yr", description: "Average administrative and manual data entry cost savings" },
      { metric: "99.98%", description: "Accuracy in multi-currency general ledger reconciliations" },
      { metric: "< 2 mins", description: "Time to complete end-of-month financial closing audits" }
    ],
    caseStudyHighlight: {
      company: "HyperFleet Logistics",
      logo: "📦",
      quote: "Month-end close used to take our accounting team 6 agonizing days. With OllaSuper’s Operations Employee, 98% of line items are pre-reconciled with exact audit trails.",
      author: "Sarah Chen, CPA",
      role: "Chief Financial Officer, HyperFleet",
      stat: "Month-End Close Reduced from 6 Days to 4 Hours"
    },
    workflows: [
      "Daily Multi-Gateway Payment Reconciliation & Anomaly Flagging",
      "Vendor Invoice Extraction & 3-Way Purchase Order Matching",
      "Contract Expiration & Auto-Renewal Notice Automation",
      "Cross-System User Access & RBAC Deprovisioning Scans"
    ]
  },
  {
    slug: "customer-experience",
    title: "AI Workforce for Customer Support",
    department: "Customer Experience",
    badge: "< 30s First Response",
    tagline: "Provide instant, context-aware 24/7 resolution for technical customer queries.",
    heroText: "Empower your support team with AI employees that diagnose logs, verify user permissions, draft verified code fixes, and resolve repetitive inquiries autonomously.",
    recommendedSquad: [
      { role: "Tier-1/2 Resolution Specialist", slug: "customer-support", duty: "Ticket diagnostics, log correlation, and reply drafting" },
      { role: "Knowledge Base Synchronizer", slug: "marketing", duty: "Auto-generates FAQ articles from solved support tickets" },
      { role: "VIP Escalation Router", slug: "operations", duty: "Identifies churn risk & routes to Customer Success" }
    ],
    keyOutcomes: [
      { metric: "68%", description: "Of tier-1 technical support inquiries resolved autonomously" },
      { metric: "24 seconds", description: "Average first response time across all global timezones" },
      { metric: "4.9 / 5.0", description: "Average customer satisfaction score (CSAT) across 50,000+ tickets" }
    ],
    caseStudyHighlight: {
      company: "DevSync Systems",
      logo: "⚡",
      quote: "Our engineers used to spend 25% of their sprint debugging support tickets. OllaSuper diagnoses the exact API header errors directly from Datadog logs and resolves them instantly.",
      author: "David Kim",
      role: "VP of Engineering, DevSync",
      stat: "CSAT Rose from 4.1 to 4.9 in 60 Days"
    },
    workflows: [
      "Real-Time Log Telemetry Diagnostic Correlation",
      "Self-Serve API Integration & Authentication Troubleshooting",
      "Automated VIP Sentiment Routing to Executive Slack Channels",
      "Continuous Help Center Gap Identification & Doc Sync"
    ]
  },
  {
    slug: "enterprise",
    title: "Enterprise AI Workforce Platform",
    department: "Enterprise Solutions",
    badge: "SOC2 Type II & VPC",
    tagline: "Deploy sovereign, isolated AI workforces with strict governance and human oversight.",
    heroText: "Built for enterprises requiring private VPC deployments, Model Context Protocol (MCP) tool security, zero-retention data policies, and comprehensive audit logs.",
    recommendedSquad: [
      { role: "Custom Enterprise Fleet", slug: "custom", duty: "Tailored to proprietary enterprise ERP and database schemas" },
      { role: "Compliance & Security Sentinel", slug: "operations", duty: "Continuous RBAC and PII leak monitoring" },
      { role: "Executive Intelligence Analyst", slug: "research", duty: "Synthesizes quarterly business reviews and investor reports" }
    ],
    keyOutcomes: [
      { metric: "100%", description: "Data sovereignty with optional Single-Tenant on-prem / VPC isolation" },
      { metric: "Zero", description: "Model retraining on customer proprietary data (Zero Data Retention)" },
      { metric: "24/7/365", description: "Dedicated Enterprise Support with 15-minute response SLA" }
    ],
    caseStudyHighlight: {
      company: "Nordic FinTech Group",
      logo: "🏦",
      quote: "OllaSuper met all of our banking compliance criteria: private VPC deployment, strict human-in-the-loop gates for financial movements, and immutable audit logs.",
      author: "Astrid Lindholm",
      role: "Chief Information Security Officer, Nordic FinTech",
      stat: "Deployed across 12 regulated business units"
    },
    workflows: [
      "Custom MCP Tool Server Orchestration with mTLS",
      "Strict Human Approval Gates for Sensitive Data Modifications",
      "Immutable Audit Logs Streamed to Splunk and Datadog",
      "Deterministic Test Suite Automation for Regulatory Audits"
    ]
  }
];
