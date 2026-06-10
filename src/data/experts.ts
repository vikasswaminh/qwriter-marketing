// 30 specialist agent personas. Single source of truth — home grid, /experts index,
// each /experts/[slug] detail page, all derive from this file.
//
// To add a 31st agent: drop another entry + matching glyph branch in
// ExpertGlyph.astro, run `astro build`, the new page is auto-generated.

export type Department = "people" | "gtm" | "ops" | "data" | "build" | "personal";

export interface ExpertTask {
  group: string;       // section header on the detail page ("Hiring", "Performance")
  items: string[];     // bullet items under that header
}

export interface ExpertChip {
  title: string;       // chip headline
  tagline: string;     // one-line beneath
  prompt: string;      // what fills the chat composer when clicked
}

export interface Expert {
  slug: string;        // url segment: /experts/{slug}
  name: string;        // "HR Expert"
  short: string;       // "HR"
  department: Department;
  color: string;       // hex used for the expert's accent + glyph dot
  oneliner: string;    // hero subtitle, 1 line
  tasks: ExpertTask[]; // 2–4 groups for the per-page tasks grid
  starters: ExpertChip[]; // 4 chips
  sample: { user: string; assistant: string }; // a small mock chat
  pairs: string[];     // slugs of 2–3 related experts
}

const TEMPLATE_SAMPLE = (user: string, assistant: string) => ({ user, assistant });

export const departments: Record<Department, { label: string; color: string }> = {
  people:   { label: "People",   color: "#ff6b4a" },
  gtm:      { label: "GTM",      color: "#16a34a" },
  ops:      { label: "Operations", color: "#52525b" },
  data:     { label: "Data",     color: "#7c3aed" },
  build:    { label: "Build",    color: "#0066ff" },
  personal: { label: "Personal", color: "#facc15" },
};

export const experts: Expert[] = [
  // ──────────────────────────────────────────────────────────────── PEOPLE
  {
    slug: "hr",
    name: "HR Expert",
    short: "HR",
    department: "people",
    color: "#ff6b4a",
    oneliner: "JDs, offer letters, interview feedback, performance reviews — grounded in your culture deck.",
    tasks: [
      { group: "Hiring", items: ["Job descriptions", "Offer letters", "Polite rejections", "Interview feedback notes", "Reference check questions"] },
      { group: "Performance", items: ["Self-appraisal forms", "360 feedback notes", "Review summaries", "PIP responses", "Goal setting (KRA/OKR)"] },
      { group: "Exit", items: ["Resignation letters", "Notice-period handover", "Exit-interview talking points", "Knowledge-transfer docs"] },
    ],
    starters: [
      { title: "Job description",  tagline: "Role + must-haves + location", prompt: "Write a job description for a Senior Software Engineer in Bengaluru (hybrid). 5+ years, must-haves: Java, Spring Boot, AWS. Include responsibilities, qualifications, what success looks like in 6 months, and our values. ~350 words." },
      { title: "Offer letter",     tagline: "CTC breakup + bonus + notice",  prompt: "Draft a formal offer letter for a candidate joining as Senior Engineer at fixed CTC ₹24 LPA. Include CTC breakup (fixed + variable + RSU), joining bonus, notice period, reporting manager. Warm, professional." },
      { title: "Polite rejection", tagline: "After interview, with kindness", prompt: "Write a candidate rejection email after a final-round interview. Acknowledge their effort, give one specific reason, invite them to reapply in 12 months. ~90 words." },
      { title: "Interview feedback", tagline: "For the hiring panel",        prompt: "Write structured interview feedback notes for the hiring manager. Cover technical skills, problem-solving, communication, culture fit, and a hire/no-hire recommendation with one-line rationale." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Draft a JD for a Senior Engineer in Bengaluru. Must know AWS, must own one production system end-to-end. Hybrid.",
      "**Senior Engineer — Platform, Bengaluru (Hybrid)**\n\nWe're hiring a senior engineer to own one of the four production systems that move money for our 200+ B2B customers. You'll be the directly responsible individual for uptime, performance, and the next 6 months of feature work on that system.\n\n**You'll own:** one production service end-to-end · its on-call rotation · its roadmap · the code reviews of 2 mid-level engineers contributing to it.\n\n**You bring:** 5+ years writing production Java or Go · deep AWS (we use ECS, RDS Postgres, SQS) · comfort being the senior voice in a room of 6 engineers · a track record of owning *something* — a service, a feature, a migration — through to its boring stable state.\n\n**Comp:** ₹32–48 LPA fixed + ESOPs. Hybrid (2 days/week in our Indiranagar office).\n\n**How to apply:** reply with a system you've owned and a paragraph on what you learned from the worst incident on it."
    ),
    pairs: ["recruiter", "legal", "ops"],
  },

  {
    slug: "recruiter",
    name: "Recruiter Expert",
    short: "Recruiter",
    department: "people",
    color: "#ff8866",
    oneliner: "Sourcing DMs, candidate engagement, scorecards, offer negotiation — without the spam vibe.",
    tasks: [
      { group: "Sourcing", items: ["Cold InMails", "Personalized referral asks", "Boolean search strings", "Outreach follow-ups"] },
      { group: "Pipeline", items: ["Candidate scorecards", "Take-home brief", "Calibration notes", "Hiring loop schedules"] },
      { group: "Closing", items: ["Offer-stage check-ins", "Counter-offer responses", "Soft decline letters", "Welcome day-zero email"] },
    ],
    starters: [
      { title: "InMail",           tagline: "First touch, no spam", prompt: "Write a 90-word LinkedIn InMail to a Staff Engineer at a Series B fintech. We're hiring a Principal Eng for our payments team. Lead with a specific reason I'm reaching out to them (their recent post on idempotency), one sentence on the role, one soft CTA." },
      { title: "Scorecard",        tagline: "Structured interview notes", prompt: "Write an interview scorecard template for a Senior Engineer role. 5 dimensions, each with a 1–5 rubric, examples of what each score looks like in a 60-min interview." },
      { title: "Counter-offer reply", tagline: "Keep them warm", prompt: "Draft a reply to a candidate who got a counter-offer from their current employer (₹6 LPA bump). Reaffirm our offer, share what we can match (not money), give them 48 hours to decide. No pressure." },
      { title: "Welcome day-zero", tagline: "Pre-join engagement", prompt: "Write a welcome email to a candidate who just signed our offer, joining in 30 days. Cover: who's their buddy, day-1 logistics, what to read before joining (3 links), a small surprise (we'll ship them swag)." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Cold InMail to a Staff Engineer at Stripe. They wrote a great post on rate limiting last month.",
      "Hi — I read your post on token-bucket rate limiting and the bit about how you handle the 2× spike on cron-minute boundaries was exactly the trade-off we're stuck on right now.\n\nQuick context: I'm building the platform team at OllaSuper. We're hiring a Principal Engineer to own our API gateway — same kind of problems you're working on, smaller scale (~80 RPS p99), full ownership. Not pitching, just wondering if a 20-min chat about the rate-limiter design you settled on would be interesting to you.\n\nNo recruiter pitch, no \"send your resume.\" If yes, I'll send a calendar link."
    ),
    pairs: ["hr", "ops", "writer"],
  },

  // ──────────────────────────────────────────────────────────────── GTM
  {
    slug: "sales",
    name: "Sales Expert",
    short: "Sales",
    department: "gtm",
    color: "#16a34a",
    oneliner: "Cold outreach, follow-ups, proposals, demo invites, renewal pitches, objection handling.",
    tasks: [
      { group: "Outbound", items: ["Cold emails", "LinkedIn intros", "Follow-up nudges", "Multi-touch sequences"] },
      { group: "Cycle", items: ["Discovery questions", "Demo invites", "Proposal summaries", "Objection responses"] },
      { group: "Closing", items: ["Renewal pitches", "Upgrade asks", "Win-back emails", "Reference asks"] },
    ],
    starters: [
      { title: "Cold outreach",    tagline: "First touch, not spammy",     prompt: "Write a 90-word cold email to a US CTO at a 200-person SaaS. We help offshore engineering teams ship 2x faster. Lead with a specific insight about their stack, end with a single soft CTA." },
      { title: "Follow-up nudge",  tagline: "After 2 weeks silence",       prompt: "Write a polite follow-up to a prospect who's gone quiet for 2 weeks. Reference our last call specifically, add one new piece of value (a relevant case study), ask if timing is wrong." },
      { title: "Proposal summary", tagline: "Three tiers, easy yes",       prompt: "Compose a proposal summary email with three pricing tiers (Essentials, Growth, Enterprise). Show what's included in each, recommend the middle tier, mention the full PDF is attached." },
      { title: "LinkedIn intro",   tagline: "Connect request, no pitch",   prompt: "Write a 280-char LinkedIn connection request to a senior PM at a fintech. Mention one specific reason I want to connect (shared interest, mutual contact, recent post). No pitch." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Cold email to the VP Eng at a 500-person SaaS. We help offshore teams ship 2× faster.",
      "Subject: 2× engineering velocity without doubling headcount\n\nHi {first_name},\n\nWe just helped a 400-person SaaS in Austin cut their PR-to-prod time from 9 days to 4 — no headcount change, just shipping a senior offshore team they could trust with end-to-end ownership.\n\nI noticed your team is hiring 6 engineers right now. If even one of those reqs is for general velocity vs. a specific skill, we can probably skip half of them.\n\nWorth 20 min? No deck, just a conversation about how you're staffing right now and whether the math changes if a senior offshore team is on the table.\n\n— Vikas"
    ),
    pairs: ["cs", "marketing", "writer"],
  },

  {
    slug: "cs",
    name: "Customer Success Expert",
    short: "CS",
    department: "gtm",
    color: "#15803d",
    oneliner: "Onboarding, QBR docs, renewal pitches, churn-saves — every message grounded in their usage data.",
    tasks: [
      { group: "Onboarding", items: ["Welcome emails", "Kickoff agendas", "30-day milestones", "Quick-win recipes"] },
      { group: "Recurring", items: ["QBR documents", "Monthly value reports", "Adoption nudges", "Expansion asks"] },
      { group: "Retention", items: ["Renewal pitches", "Churn-save emails", "Win-back sequences", "Referral asks"] },
    ],
    starters: [
      { title: "Onboarding email", tagline: "Welcome + first quick-win", prompt: "Write a 180-word welcome email for a new enterprise customer. Cover the kick-off call, who's their dedicated CSM, where to get help, one quick-win they can try today, what success looks like in 30 days." },
      { title: "QBR doc",          tagline: "Quarterly Business Review",  prompt: "Draft a Quarterly Business Review document for a customer who pays ₹40 lakhs/year. Cover usage stats with the YoY trend, value delivered (with numbers), planned roadmap items relevant to them, open ask for renewal discussion." },
      { title: "Renewal pitch",    tagline: "60 days before expiry",      prompt: "Write a 250-word renewal pitch email to a customer whose contract expires in 60 days. Lead with measurable wins this year (3 metrics), share what's coming next that benefits them, propose a 30-min meeting." },
      { title: "Churn-save email", tagline: "They're talking to competitors", prompt: "Compose a churn-save email to a customer who said they're considering switching. Acknowledge their concerns specifically (don't gaslight), offer a 1:1 with our founder, propose 2 concrete steps to address their issues, leave the door open." },
    ],
    sample: TEMPLATE_SAMPLE(
      "QBR doc for ACME Co. They pay ₹40L/y. Usage is up 60% YoY. We're proposing they upgrade to the ₹65L tier.",
      "**ACME Co. — Q3 2026 Business Review**\n\n**Where we are:** Your usage is up 60% YoY (4,200 → 6,720 monthly active workflows). Eight teams now use OllaSuper daily, up from three last year. The legal and HR teams hit 90%+ adoption.\n\n**What we delivered:** 14 production integrations shipped together (Slack, Notion, Confluence, Jira, +10 more). Median time-to-first-value for new joiners is now 3 days, down from 11. Two of your VPs publicly attributed a hiring decision to the data we surface — that's a real outcome.\n\n**Where this is heading:** at your current growth rate, you'll exceed your enterprise quota by Q1 2027. Your ₹40L tier caps at 8,000 monthly workflows; you'll hit that in February at the current trajectory.\n\n**The proposal:** move to the ₹65L Unlimited tier. The math works once you exceed 10,000 workflows (you will). It also unlocks the federated workspace feature your security team has been asking about.\n\n**Open question for our next call:** is unlimited the right shape, or do you want to discuss a custom tier sized to your projected Q4 2026 usage?"
    ),
    pairs: ["sales", "support", "data"],
  },

  {
    slug: "support",
    name: "Customer Support Expert",
    short: "Support",
    department: "gtm",
    color: "#0d9488",
    oneliner: "First responses, escalations, refunds, bug acknowledgments — direct, kind, never robotic.",
    tasks: [
      { group: "First contact", items: ["Acknowledgement templates", "Triage questions", "Expectation-setting replies", "Auto-responders"] },
      { group: "Resolution", items: ["Step-by-step walkthroughs", "Bug acknowledgement + workaround", "Refund/credit decisions", "Escalation replies"] },
      { group: "Follow-up", items: ["Resolution confirmation", "Post-incident summary", "CSAT follow-up", "Lessons-learned to engineering"] },
    ],
    starters: [
      { title: "First response",   tagline: "Quick ack + expectations",         prompt: "Write a 90-word first-response template to a customer who reported their payment is stuck. Acknowledge the urgency, set expectations (we'll respond within 2 hours with a fix or status), ask for transaction ID and timestamp." },
      { title: "Escalation reply", tagline: "When customer is frustrated",      prompt: "Draft an escalation reply to a customer who's frustrated their issue isn't resolved after 3 days. Apologize sincerely, share specifically what we're doing now, give a concrete next-update time, offer a direct line." },
      { title: "Refund / credit",  tagline: "Partial refund with rationale",    prompt: "Write a polite email approving a partial refund of 30% for a customer who experienced 4 hours of downtime during a paid month. Explain the math, reference our SLA, offer service credit as an alternative." },
      { title: "Bug acknowledgement", tagline: "Confirm + workaround + ETA",    prompt: "Draft a bug acknowledgement — customer reported the export function fails for files >10MB. Confirm we've reproduced it, share the workaround (split into 5MB chunks), give an ETA for the fix (next sprint)." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Customer is angry — their payout failed Friday, it's Tuesday, and nobody's responded. Reply.",
      "Subject: I owe you a real answer — and a refund\n\nHi {first_name},\n\nThree things, in order:\n\n**1) I owe you an apology.** Your payout failed Friday and you waited four days for a real response. That's on us — there's no good explanation for the delay, and you deserved better.\n\n**2) Here's what happened.** Our payout processor (XYZ) had an outage Friday afternoon. The payout retried automatically Saturday morning and went through — your bank shows it credited at 2:14am Saturday. So the money moved; the *communication* didn't.\n\n**3) Here's what I'm doing.** I'm refunding your payout fee for the month (₹2,400) as a service credit, processed today. I'm also escalating internally so the next time a processor outage happens, we proactively email everyone affected within an hour, not after they chase us.\n\nCan I get on a 15-min call tomorrow to walk you through what changed? I'm not asking you to forgive the delay — I'd like the chance to make sure it doesn't repeat."
    ),
    pairs: ["cs", "engineering", "product"],
  },

  {
    slug: "marketing",
    name: "Marketing Expert",
    short: "Marketing",
    department: "gtm",
    color: "#22c55e",
    oneliner: "LinkedIn posts, blog posts, ad copy, case studies, email campaigns — voice-matched to your brand.",
    tasks: [
      { group: "Long form", items: ["Blog posts", "Case studies", "Whitepapers", "Long LinkedIn essays"] },
      { group: "Short form", items: ["LinkedIn posts", "Twitter threads", "Ad headlines + copy", "Email subject lines"] },
      { group: "Campaigns", items: ["Launch announcement sequences", "Newsletter editions", "Webinar invites", "Event recap posts"] },
    ],
    starters: [
      { title: "LinkedIn post",    tagline: "Product launch, story-led",   prompt: "Write a 600-word LinkedIn post announcing our new product. Open with a customer pain story, explain how we solve it, end with a CTA to demo. Indian-English, warm, no buzzwords." },
      { title: "Case study",       tagline: "Problem → solution → outcome", prompt: "Draft a 700-word case study. Structure: client's problem (with one quantified pain), our approach in 3 phases, measurable outcome with numbers, customer quote at the end." },
      { title: "Blog intro",       tagline: "150 words that earn the scroll", prompt: "Write a 150-word blog intro for 'Why Indian fintechs are betting on AI agents.' Hook with a real example, define the problem clearly, promise what the rest will cover." },
      { title: "Google Ads copy",  tagline: "3 headlines + 2 descriptions",  prompt: "Write Google Ads copy for our HR SaaS. 3 headlines (max 30 chars each), 2 descriptions (max 90 chars each). Lead with the specific outcome — 'Hire 2x faster' — not generic features." },
    ],
    sample: TEMPLATE_SAMPLE(
      "LinkedIn post announcing we crossed 10,000 paying customers, 600 words.",
      "Three years ago I told my co-founder I'd quit if we didn't hit 100 paying customers in six months.\n\nWe hit 27. He didn't let me quit.\n\nLast week we crossed 10,000.\n\nA few honest things I want to write down, because I won't remember them in two years:\n\n**On product.** The thing customers paid for in year one is not the thing they pay for now. The first 100 customers bought the demo. The next 1,000 bought the integrations. The 10,000 bought reliability — and that's a different company.\n\n**On hiring.** Our first six engineers came from referrals. Our next sixty came from a process we built in month nine that I'd rejected three times before. The lesson wasn't \"build a hiring process.\" The lesson was: the thing you're avoiding is usually the thing that breaks the next ceiling.\n\n**On founders.** I have a co-founder I will work with forever. When we disagreed in month four, we wrote it down. When we disagreed in month forty, we wrote it down. We have a shared doc with 89 disagreements, with the outcome of each one noted. Nine of mine were wrong. Eighteen of his were. Most disagreements aged into agreement; that's the magic.\n\n**On customers.** Customers will lie to you politely. Their friends will lie to you enthusiastically. The only honest signal is whether the credit card renews.\n\nA lot of people deserve credit here — I'll write that thread separately. For now: thank you to the 10,000 teams who bet on us. The first 100 of you got an unreliable product and a panicked founder; the next 9,900 are the reason we're still here.\n\nOnto the next decimal point."
    ),
    pairs: ["sales", "writer", "founder"],
  },

  {
    slug: "seo",
    name: "SEO Expert",
    short: "SEO",
    department: "gtm",
    color: "#10b981",
    oneliner: "Keyword research summaries, on-page audits, content briefs, meta titles, redirect maps.",
    tasks: [
      { group: "Research", items: ["Keyword opportunity analysis", "Competitor SERP audits", "Search-intent classification", "Topic-cluster maps"] },
      { group: "On-page", items: ["Title tag + meta description", "H1/H2 outlines", "Internal link recommendations", "Schema markup snippets"] },
      { group: "Audits", items: ["Site-wide content audit", "Cannibalization fixes", "404 + redirect maps", "Page-speed quick wins"] },
    ],
    starters: [
      { title: "Content brief",       tagline: "What this page should rank for", prompt: "Write a content brief for a 1,500-word blog post targeting 'how to hire offshore engineers.' Cover: primary keyword + 5 secondary, search intent, outline with H2s and word counts per section, internal links to suggest, schema type." },
      { title: "Meta + title",        tagline: "30 + 160 chars",                 prompt: "Write 3 title-tag options (max 60 chars) and 3 meta descriptions (max 160 chars) for a page about 'AI-powered hiring tools.' Lead with the benefit, not the brand." },
      { title: "Topic cluster",       tagline: "Pillar + 8 supporting posts",    prompt: "Plan a topic cluster around 'AI for sales teams.' One pillar page (2,500 words) + 8 supporting articles with their target keywords, search volumes (estimated), and how each links back to the pillar." },
      { title: "Cannibalization fix", tagline: "Two pages fighting for the same query", prompt: "Two of our blog posts both target 'free AI writer.' Diagnose which one to keep, which to merge or redirect, and write the rewrite plan + a 301 redirect map." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Build a content brief for 'how to hire offshore engineers from India'.",
      "**Content brief — How to hire offshore engineers from India**\n\n**Target keyword:** how to hire offshore engineers from india (search volume ~1,800, KD 38)\n\n**Secondary keywords:** offshore engineering teams india · hire indian developers · india remote engineering hire · best cities india engineering talent · indian developer hourly rate\n\n**Search intent:** Informational, leaning commercial. People searching this are 60–80% decided that they want to hire offshore; they're researching the *how*, not the *whether*.\n\n**Word count:** 1,800–2,200.\n\n**Outline (H2 → word target):**\n- The 2-week vs. 8-week question (200) — frame the post around timeline, the real differentiator.\n- What \"offshore engineer\" means in India in 2026 (250)\n- The 3 cities that matter (400) — Bengaluru, Pune, Hyderabad. Profile each.\n- Hourly rates by experience band (300) — concrete numbers, updated 2026.\n- The hiring process: agency vs. in-house vs. platform (350)\n- Legal & compliance — what your CFO will ask (200)\n- 5 mistakes that make offshore hiring fail (200)\n- Conclusion + CTA (100)\n\n**Internal links to insert:** /blog/agency-vs-inhouse · /blog/india-engineering-rates-2026 · /tools/offshore-cost-calculator\n\n**Schema:** Article + FAQPage (8 questions at the bottom).\n\n**Author byline + last-updated date required** — this query rewards freshness."
    ),
    pairs: ["aeo", "marketing", "writer"],
  },

  {
    slug: "aeo",
    name: "AEO Expert",
    short: "AEO",
    department: "gtm",
    color: "#0066ff",
    oneliner: "Will ChatGPT, Claude, and Perplexity cite your page? Score it, fix it, ship it.",
    tasks: [
      { group: "Audits", items: ["Citation-readiness scoring", "Page-level AEO audits", "Schema-markup recommendations", "LLM-fetch simulator (what bots see)"] },
      { group: "Fixes", items: ["Rewrite for direct answers", "Add FAQ schema", "Author bylines + last-updated dates", "Outbound citations to authority"] },
      { group: "Strategy", items: ["AI-search ranking strategy", "Brand mention monitoring (in LLM outputs)", "Knowledge-graph entity hardening", "Featured-snippet engineering"] },
    ],
    starters: [
      { title: "Page AEO audit",      tagline: "Score 0–100 + 5 fixes",        prompt: "Audit this page for Answer Engine Optimization. Give me a score 0–100, the top 5 issues, and concrete rewrites for the H1 + first paragraph that would lift the score by 20+ points." },
      { title: "Rewrite for citation", tagline: "Make it AI-quotable",         prompt: "Rewrite my page's first 200 words to be highly quotable by ChatGPT and Perplexity. Use direct claims with specific numbers, attribute every claim, add inline citations." },
      { title: "FAQ schema",           tagline: "5 Q&A pairs + JSON-LD",        prompt: "Generate 5 FAQ entries for a page about 'AI sales assistants.' Each answer 2–4 sentences, fact-dense. Then output the FAQPage schema JSON-LD." },
      { title: "LLM-fetch sim",        tagline: "What does ChatGPT see?",      prompt: "Walk me through what ChatGPT's web-fetch agent sees when it visits my homepage. What blocks it, what's missing, what would make it cite us instead of our competitor?" },
    ],
    sample: TEMPLATE_SAMPLE(
      "Audit ollasuper.com homepage for AEO citation readiness.",
      "**OllaSuper.com — AEO citation-readiness audit**\n\n**Score: 47/100 (D+)**\n\n**The good:** clear value prop, well-structured H1, fast LCP, accessible markup.\n\n**The 5 things blocking citations:**\n\n1. **No specific claims that an LLM can quote.** Your homepage says \"super-fast\" — that's a phrase. \"Generates 600-word drafts in 4.2 seconds with a 92% acceptance rate\" — that's a quote. LLMs cite numbers, not adjectives.\n\n2. **No author byline.** Cite-readiness models (and humans) treat anonymous pages as untrustworthy by default. Add a \"Written by — last updated\" line under the H1.\n\n3. **No outbound citations.** Pages that cite *other* sources get cited more themselves. Add 3–5 references to your claims (research papers, customer case studies, public benchmarks).\n\n4. **No FAQPage schema.** Your \"how it works\" section is structured perfectly for FAQ schema but doesn't have the JSON-LD. Adding it lifts your AEO score 12+ points immediately.\n\n5. **Direct-answer paragraph is missing.** When someone asks Perplexity \"what is OllaSuper,\" the model wants a 60-word answer it can paraphrase. Right now your first paragraph is marketing copy. Add a 60-word direct-answer paragraph as the first thing after the H1.\n\n**Projected score after fixes:** 78/100 (B+)."
    ),
    pairs: ["seo", "marketing", "data"],
  },

  // ──────────────────────────────────────────────────────────────── OPS
  {
    slug: "operations",
    name: "Operations Expert",
    short: "Ops",
    department: "ops",
    color: "#52525b",
    oneliner: "SOPs, vendor mgmt, procurement, RFPs, change management — the office's quiet engine.",
    tasks: [
      { group: "Process", items: ["Standard Operating Procedures", "Process maps", "Runbook drafts", "Quality-check templates"] },
      { group: "Vendor", items: ["RFPs", "Vendor evaluation memos", "Contract-renewal notes", "Cost-savings memos"] },
      { group: "Change", items: ["Change-management RFCs", "Stakeholder comms", "Rollout plans", "Incident reports"] },
    ],
    starters: [
      { title: "SOP",               tagline: "Day-by-day procedure",   prompt: "Write a Standard Operating Procedure for our new-employee laptop provisioning process. Cover: trigger event (offer signed), 6 steps, owner for each step, escalation if step misses SLA, audit checklist." },
      { title: "RFP",               tagline: "Vendor request for proposal", prompt: "Draft an RFP for a managed IT helpdesk vendor. Cover: scope of services, expected ticket volume (~400/month), SLAs we need, security requirements, evaluation criteria with weights, proposal deadline." },
      { title: "Change management", tagline: "Internal RFC + comms",   prompt: "Write a change-management RFC for switching our company from Slack to Microsoft Teams. Cover: rationale, migration plan (4 phases), stakeholders + their concerns, risk register, communication plan, FAQ." },
      { title: "Incident report",   tagline: "Post-event blameless",   prompt: "Write a blameless incident report for a 6-hour outage of our internal HR portal that prevented 200 employees from submitting timesheets. Timeline, impact, root cause, action items with owners + dates." },
    ],
    sample: TEMPLATE_SAMPLE(
      "SOP for provisioning a laptop for a new joiner.",
      "**SOP: Laptop provisioning for new joiners**\n\n**Trigger:** Offer letter signed and joining date confirmed.\n**Owner:** IT Operations (Priya).\n**SLA:** Laptop on the new joiner's desk by 9am on day-1.\n\n**Step 1 — Order (T-14 days).** HR sends signed offer to IT@. IT opens an ordering ticket in our system with the role profile (Engineer = MacBook Pro 16, Designer = MacBook Pro 16 + Wacom, Everyone else = MacBook Air 13). Owner: IT.\n\n**Step 2 — Procurement (T-12 days).** IT raises a PO to our master vendor. PO must include warranty (3 years AppleCare for engineering, 1 year for others) and asset tag pre-printed. Owner: IT + Procurement.\n\n**Step 3 — Receiving (T-3 days).** Laptop arrives at the office. IT logs receipt in the asset register with serial number, PO number, and assignee name. Owner: IT.\n\n**Step 4 — Imaging (T-2 days).** IT applies our standard image: corporate profiles, SSO config, anti-virus, MDM enrollment. Owner: IT.\n\n**Step 5 — Pre-staging (T-1 day).** Laptop is placed on the new joiner's assigned desk with their welcome packet, a pre-printed Wi-Fi card, and a printed quick-start sheet. Owner: HR + IT.\n\n**Step 6 — Day-1 handover (Day 1, 9am).** IT runs a 30-min onboarding session for new joiners covering laptop setup, SSO login, mandatory installs.\n\n**Escalation:** if any step misses SLA, the owner pings the IT Director within 4 hours with the reason and a recovery plan.\n\n**Audit:** weekly review of the asset register; quarterly physical audit of all laptops."
    ),
    pairs: ["finance", "hr", "engineering"],
  },

  {
    slug: "finance",
    name: "Finance Expert",
    short: "Finance",
    department: "ops",
    color: "#475569",
    oneliner: "Invoices, payment reminders, vendor onboarding, GST notices, budget asks — politely firm.",
    tasks: [
      { group: "Receivables", items: ["Invoice notes", "Payment reminders (30/60/90 day)", "Dispute responses", "Account suspension letters"] },
      { group: "Payables", items: ["Vendor onboarding", "PO confirmations", "Vendor pushback replies", "Bill of materials review"] },
      { group: "Compliance + reporting", items: ["GST clarification replies", "Audit-query responses", "Budget approval requests", "CFO/MIS narratives"] },
    ],
    starters: [
      { title: "Payment reminder", tagline: "Overdue invoice, firm tone", prompt: "Write a payment reminder for invoice INV-2026-0142, 60 days overdue (₹4,80,000). Firm but professional — this is the third reminder, next step is account suspension." },
      { title: "Vendor onboarding", tagline: "GST + PAN + MSME + bank",   prompt: "Draft a vendor onboarding email requesting GST certificate, PAN card, MSME registration (if applicable), cancelled cheque, signed NDA. Set a 7-day deadline." },
      { title: "Budget approval",  tagline: "To CFO with justification", prompt: "Compose a budget approval request to the CFO for ₹18 lakhs to expand the QA team by two. Justify with expected ROI, alternatives considered (outsourcing), timeline, what happens if we don't approve." },
      { title: "GST notice reply", tagline: "Formal response to tax dept", prompt: "Write a formal response to a GST clarification notice asking for explanation of input tax credit claimed in Q3 FY24-25. Reference the notice number, mention supporting documents attached, request closure." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Reply to a GST notice asking why we claimed ITC of ₹14.2L on a vendor whose GSTIN was inactive that month.",
      "Subject: Response to GST Clarification Notice GSTIN-XXX-2026/Q3\n\nTo,\nThe Assistant Commissioner of State Tax,\n[Office Address]\n\n**Subject:** Response to clarification notice dated [Date] regarding Input Tax Credit of ₹14,21,400/- claimed in Q3 FY24-25 (October–December 2024) on supplies from M/s. [Vendor], GSTIN [XXX].\n\nDear Sir/Madam,\n\nWith reference to your notice dated [Date], we submit our response below for your kind consideration:\n\n**1. Background.** We claimed ITC of ₹14,21,400/- on three invoices from M/s. [Vendor] dated 14-Nov-2024, 28-Nov-2024 and 22-Dec-2024 — all uploaded by the vendor in their GSTR-1 and reflected in our GSTR-2B for the respective month.\n\n**2. On the GSTIN status question.** We respectfully submit that at the time of all three transactions, the vendor's GSTIN was active. The GSTIN was suspended on 5-Jan-2025 — after the close of the relevant quarter. Screenshots of the GST portal showing the vendor's active status on each invoice date are enclosed as **Annexure-A**.\n\n**3. Supporting documents enclosed:**\n  - Annexure-A: GST portal screenshots showing vendor's active status on each invoice date\n  - Annexure-B: Copies of all three vendor invoices with GSTIN and signatures\n  - Annexure-C: Bank statement extracts showing payments to the vendor on or before due dates\n  - Annexure-D: Our GSTR-2B for October, November, December 2024 showing the ITC auto-populated\n\n**4. Request.** In light of the above, we respectfully request that this notice be closed and the ITC of ₹14,21,400/- be allowed as already claimed.\n\nFor any further clarification, our authorised representative Mr. [Name] (+91-XXXXX XXXXX, email@) is available at your convenience.\n\nThanking you,\nFor [Company Pvt. Ltd.]\n\n[Authorised Signatory]\nDate: [DD-MMM-2026]\nPlace: [City]"
    ),
    pairs: ["legal", "ops", "founder"],
  },

  {
    slug: "legal",
    name: "Legal & Compliance Expert",
    short: "Legal",
    department: "ops",
    color: "#7f1d1d",
    oneliner: "NDAs, NOCs, contracts, compliance notices — drafted to be signed, not negotiated for weeks.",
    tasks: [
      { group: "Contracts", items: ["NDA cover notes", "MSA + SOW drafts", "Renewal terms", "Termination notices"] },
      { group: "Workplace", items: ["NOCs (parallel study, external assignment)", "Confidentiality reminders", "Code-of-conduct notes", "Workplace policy memos"] },
      { group: "Compliance", items: ["Privacy notices", "DPDP / GDPR responses", "Regulatory submissions", "Audit-readiness checklists"] },
    ],
    starters: [
      { title: "NDA cover note",       tagline: "Before sharing a demo", prompt: "Write a short cover email for an NDA being shared with a prospect before a deep-dive demo. Explain why we need it signed, what's protected (both ways), turnaround expected (2 business days)." },
      { title: "NOC for employee",     tagline: "Parallel study / external work", prompt: "Draft a No Objection Certificate for an employee pursuing an executive MBA at IIM Bangalore alongside their role. State the company has no objection, list conditions, signed by HR." },
      { title: "Confidentiality reminder", tagline: "Team handling client data", prompt: "Write a confidentiality reminder email to a team that just got access to a client's production data. Cover what they can and can't do, how to flag concerns, consequences of breach. Firm but not threatening." },
      { title: "Privacy notice",       tagline: "DPDP-compliant 1-pager",  prompt: "Draft a privacy notice for our marketing site that complies with India's DPDP Act. Cover what data we collect, why, who we share with, retention period, user rights, contact for grievances. Plain English, 400 words." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Cover note for an NDA being sent before a customer demo.",
      "Subject: Quick NDA before our demo on Thursday\n\nHi {first_name},\n\nGreat call yesterday — excited for the demo on Thursday.\n\nBefore we walk through the platform internals, we'd like to get our standard mutual NDA signed. It's two pages, protects both directions, and the only sensitive things in it are:\n\n  • Anything either side marks \"confidential\" in writing (we will mark a couple of slides, not all of them)\n  • Standard 3-year survival period after termination\n  • Carve-outs for what's already public, what's developed independently, and what's required by law\n\nIf your legal team usually takes a week+, just let me know — I can either:\n  (a) Use *your* NDA instead, or\n  (b) Strike out anything you don't like and re-sign\n\nWhichever's faster gets us to a real conversation on Thursday. PDF + DocuSign link attached.\n\n— [Your name]"
    ),
    pairs: ["hr", "ops", "finance"],
  },

  // ──────────────────────────────────────────────────────────────── DATA
  {
    slug: "data",
    name: "Data Analyst Expert",
    short: "Data",
    department: "data",
    color: "#7c3aed",
    oneliner: "A/B test writeups, dashboard summaries, metric narratives, executive briefings.",
    tasks: [
      { group: "Tests", items: ["A/B test summaries", "Pre-test analysis plans", "Post-test rollout recommendations", "Holdout analyses"] },
      { group: "Reporting", items: ["Dashboard prose summaries", "Metric movement narratives", "MoM/QoQ commentary", "Cohort analyses written up"] },
      { group: "Executive", items: ["Exec briefings (1 page)", "Board prep dataroom narratives", "OKR review notes", "Anomaly investigation reports"] },
    ],
    starters: [
      { title: "A/B test writeup",    tagline: "Plain-English experiment summary", prompt: "Write up an A/B test in plain English. Hypothesis, sample size + duration, primary metric, result (with confidence interval), secondary metrics, recommendation (ship/kill/iterate). 350 words." },
      { title: "Dashboard summary",   tagline: "Numbers → narrative",              prompt: "Write a 200-word narrative summary of this month's revenue dashboard for the CEO. Lead with the movement, attribute the cause, flag the one number that's off-trend, end with what we'll do next month." },
      { title: "MoM commentary",      tagline: "Why did the number move?",         prompt: "Our MAU was 412k last month and is 398k this month, a 3.4% drop. Write the commentary for the board deck explaining why, what we believe, and what we're investigating." },
      { title: "Anomaly investigation", tagline: "Spike or genuine?",              prompt: "Refunds spiked from a baseline of ~₹4L/month to ₹19L this month. Write an anomaly investigation report — root-cause hypotheses, data we need to validate each, recommended next steps." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Write up our test of a new checkout flow. Result: +4.1% conversion, p=0.03, n=18k per arm.",
      "**Test #142: New checkout flow vs. control**\n\n**Hypothesis.** Removing the \"create account\" step and offering checkout-as-guest will lift the checkout-completion rate without hurting downstream LTV.\n\n**Setup.** A/B test on 18,000 visitors per arm. Primary metric: checkout-completion rate. Secondary: 30-day repeat purchase rate, refund rate. Duration: 14 days.\n\n**Result.** Checkout completion was 4.1 percentage points higher in the variant (28.6% vs 24.5%), p = 0.03, 95% CI [0.4pp, 7.8pp]. Statistically significant; practically meaningful — at our current volume that's roughly ₹38 lakhs of incremental monthly revenue.\n\n**Secondary metrics.** 30-day repeat purchase was *flat* (no detectable lift or harm). Refund rate ticked up by 0.3pp but was inside the noise band.\n\n**Recommendation.** Ship to 100% of traffic next sprint. Two caveats:\n  (1) Hold out 5% as a long-term control so we can detect any 90-day attribution shifts that this test was too short to catch.\n  (2) The repeat-purchase \"flat\" result is the *most important* finding — the obvious objection to checkout-as-guest was that we'd lose account-driven repeat behaviour. We didn't. That's the result worth telling the team.\n\n**Risks I'd flag.** Our payment processor charges a slightly higher rate for guest checkouts. At the +4.1% conversion lift, the math still works (net contribution ₹34L/mo vs ₹38L gross), but worth re-checking in 90 days."
    ),
    pairs: ["product", "cs", "founder"],
  },

  // ──────────────────────────────────────────────────────────────── BUILD
  {
    slug: "engineering",
    name: "Engineering Expert",
    short: "Engineering",
    department: "build",
    color: "#0066ff",
    oneliner: "Code reviews, RFCs, design docs, post-mortems — direct, technical, blameless.",
    tasks: [
      { group: "Reviews + writing", items: ["Code review comments", "Technical RFCs", "ADRs", "Design docs"] },
      { group: "Incident + postmortem", items: ["Blameless post-mortems", "Incident timelines", "Action-item write-ups", "Root-cause memos"] },
      { group: "Architecture", items: ["Service decomposition memos", "Data-model design docs", "Trade-off matrices", "Migration plans"] },
    ],
    starters: [
      { title: "Code review",        tagline: "Direct + kind",            prompt: "Write a code review comment for a PR that has unclear variable names, no tests, and doesn't follow our error-handling pattern. Direct but kind, lead with the most important issue, suggest specific improvements." },
      { title: "Technical RFC",      tagline: "Problem → options → pick", prompt: "Write a 600-word RFC proposing we migrate our notification queue from Redis to AWS SQS. Cover problem, options considered, recommendation with trade-offs, migration plan, rollback strategy." },
      { title: "Design doc",         tagline: "One-pager spec",           prompt: "Draft a one-page design doc for adding webhooks to our REST API. Sections: motivation, design (data model + delivery semantics + retry policy), security, open questions, alternatives." },
      { title: "Post-mortem",        tagline: "Blameless incident review", prompt: "Write a blameless post-mortem for a production outage that lasted 47 minutes — cause was a stale config in prod. Cover timeline, customer impact, root cause, action items with owners + dates." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Code review for a PR that adds a new endpoint but has no tests.",
      "Two things, in priority order:\n\n**1. Tests, please.** This endpoint touches payments and there's no test coverage for the happy path, let alone the error cases. Before this merges, I'd want to see at minimum:\n   - one happy-path integration test that runs the full flow with a test card\n   - one test for the \"insufficient funds\" branch — this is the second-most-common real-world response from our processor and we don't handle it explicitly\n   - one test for the idempotency-key behaviour (replay the same request, ensure we return the cached response, not a new charge)\n\nIf you want, I can pair on the integration test setup tomorrow morning — the test harness has gotten weird since we switched processors and it's faster with two heads.\n\n**2. The error-handling pattern in `handle_charge`.** Right now you're returning `Result<Response, anyhow::Error>` and letting our generic 500-handler convert it. That hides which errors are *user* errors (4xx) vs. *our* errors (5xx). Our convention (see `handle_refund` for the pattern) is to return `Result<Response, ApiError>` where `ApiError` carries the status code explicitly. This matters here more than other places because the difference between a 402 (card declined) and a 500 (our bug) changes how the client retries.\n\nMinor stuff (variable names, doc comments) I'll leave as inline suggestions in the diff."
    ),
    pairs: ["product", "designer", "pm"],
  },

  {
    slug: "product",
    name: "Product Expert",
    short: "Product",
    department: "build",
    color: "#4338ca",
    oneliner: "PRDs, beta launches, roadmaps, user-interview summaries — what to ship and why.",
    tasks: [
      { group: "Specs", items: ["PRDs", "One-pagers", "User stories", "Acceptance criteria"] },
      { group: "Discovery", items: ["User interview summaries", "Competitive analysis", "Jobs-to-be-done synthesis", "Concept testing notes"] },
      { group: "Launch", items: ["Beta launch notes", "Roadmap updates", "Public release notes", "Internal launch checklists"] },
    ],
    starters: [
      { title: "PRD",                tagline: "Product Requirements Doc",  prompt: "Write a 600-word PRD for adding bulk-import to our CRM. Sections: problem, target users, user stories (3), scope (in/out), success metrics, dependencies, open questions, rollout plan." },
      { title: "Beta launch note",   tagline: "To 50 invited customers",   prompt: "Draft a 200-word beta launch announcement to 50 invited customers. Explain what they're getting, what we want feedback on (3 specific things), where to send it, timeline, upgrade path." },
      { title: "User interview synth", tagline: "5 interviews → 3 actions", prompt: "Write a 400-word synthesis of 5 user interviews about our pricing page. What we asked, patterns we heard (3), surprising findings, quotes that hit, 3 recommended actions with owners." },
      { title: "Roadmap update",     tagline: "Shipped / next / investigating", prompt: "Compose a quarterly roadmap update for customers. Three sections: what shipped (3–4 items with impact), what's coming next quarter (top 3 with timelines), what we're investigating. Honest about timelines, no hype." },
    ],
    sample: TEMPLATE_SAMPLE(
      "PRD for adding 2-way calendar sync to our meeting-scheduler product.",
      "**PRD: Two-way calendar sync (Google + Outlook)**\n\n**Owner.** Anjali (PM) + Vikram (Eng lead)\n**TL;DR.** Today our scheduler reads availability from Google/Outlook but writes back nothing. Users get a calendar invite from us *and* one from their attendee, leading to duplicate events 38% of the time (per support tickets). This PRD is for adding write-back so a single accepted booking creates exactly one calendar event on both sides.\n\n**Problem.** Duplicate events are our #1 support ticket category (24% of inbound). Users perceive it as unreliability and 11% of trial-to-paid churn cites \"calendar issues\" in exit interviews.\n\n**Target users.** Account executives and customer success managers booking 5–15 meetings/week, primarily on Google Workspace (62%) or Microsoft 365 (35%).\n\n**Scope (in).** OAuth-based two-way sync with Google Calendar and Microsoft 365. Writing the event on accept. Updating the event on reschedule. Removing the event on cancel. Time-zone correctness.\n\n**Scope (out, this release).** Three-way sync with Apple iCloud Calendar (4% of users — defer). Conference-bridge auto-creation (Zoom, Teams, Meet) — separate spec.\n\n**Success metrics.**\n  - Duplicate-event support tickets down 80% within 60 days of launch (baseline: 240/month)\n  - Trial-to-paid conversion lift of at least 4pp (baseline 22%)\n  - Less than 1% sync failure rate measured by an end-to-end probe\n\n**Dependencies.** Auth team needs to add Google Calendar + Outlook OAuth scopes to our consent screen (4 days). Infra team needs to provision a separate webhook intake service to handle bidirectional updates (2 weeks).\n\n**Open questions.**\n  - Conflict resolution: if user reschedules in *both* tools before sync, who wins? My recommendation: our system is source-of-truth.\n  - Token revocation: if a user revokes our calendar access mid-cycle, do we cancel or freeze existing events? Need product call by end of week.\n\n**Rollout.** Internal eat-our-own-dogfood for 2 weeks. Then 5% of new signups for 4 weeks. Then 100%."
    ),
    pairs: ["engineering", "designer", "cs"],
  },

  {
    slug: "designer",
    name: "Designer Expert",
    short: "Designer",
    department: "build",
    color: "#6366f1",
    oneliner: "Design critiques, research synthesis, accessibility audits, UX copy.",
    tasks: [
      { group: "Critique", items: ["Design crit notes", "Heuristic reviews", "Visual QA", "Component-library reviews"] },
      { group: "Research", items: ["Usability test reports", "Survey synthesis", "Persona summaries", "Competitive teardowns"] },
      { group: "Craft", items: ["UX microcopy", "Error messages", "Onboarding tooltips", "Empty-state copy"] },
    ],
    starters: [
      { title: "Design crit",        tagline: "Constructive, specific",    prompt: "Write a design critique of a SaaS onboarding flow. Focus on: visual hierarchy, motion, copy, accessibility (contrast + keyboard), trust signals. End with 3 prioritised changes." },
      { title: "Heuristic review",   tagline: "Nielsen's 10 applied",     prompt: "Run a Nielsen heuristic review of our settings page. For each of the 10 heuristics, list what's working, what's broken, severity (1–4), and a concrete fix." },
      { title: "Usability test recap", tagline: "5 sessions → 5 insights",  prompt: "Synthesise 5 usability test sessions about our checkout flow. For each insight: what we observed, how often, severity, fix recommendation with effort estimate." },
      { title: "Error microcopy",    tagline: "Plain English error states", prompt: "Write 8 error messages for a payments form: card declined, insufficient funds, expired card, invalid CVV, network error, processor down, fraud-flagged, duplicate transaction. Each one short, blame-free, with a next action." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Crit our marketing site's hero section. Should we change something?",
      "**Where it's working:**\n  - The headline is short, the verb is strong, and there's no \"unleash the power of.\" Good.\n  - The CTA is solid black, can't miss it.\n  - The constellation logo + wordmark feels confident next to the headline.\n\n**What I'd change, in priority order:**\n\n1. **The subhead is doing too much work.** It's listing 19 things; nobody reads it. Compress to: \"19 expert assistants. One chat. Your files, your site, your work.\" Save the full list for the grid below.\n\n2. **The CTA region needs a secondary action.** Right now it's \"Start free\" alone. Add a quieter secondary: \"See all experts →\" as a text link below. Some visitors want to look before they sign up; right now we force a binary.\n\n3. **The constellation glyph is fighting the headline for attention.** It's the same visual weight as the wordmark. Try shrinking it to 60% size in the hero. The wordmark should be the louder element in the hero; the glyph carries the rest of the site.\n\n4. **The proof strip below is generic.** \"10k+ docs written, 56 office prompts, 14 file formats\" is feature-talk. Replace with a customer logo strip (even 6 logos at low opacity) or one specific quote with a face.\n\n5. **Accessibility:** the white-on-blue \"Start free →\" button passes WCAG AA but only by 0.2 points. Bump to a deeper blue or thicken the font weight to 700 (it's already at 700, so just bump the hue) — gives you headroom for the accessibility-tool audit when you submit for verification.\n\nNet: don't redesign — adjust hierarchy."
    ),
    pairs: ["product", "writer", "marketing"],
  },

  {
    slug: "pm",
    name: "Project Manager Expert",
    short: "PM",
    department: "build",
    color: "#2563eb",
    oneliner: "Sprint retros, RAID logs, status reports, async standups — the connective tissue.",
    tasks: [
      { group: "Cadence", items: ["Async standup updates", "Sprint retros", "Weekly status reports", "Bi-weekly stakeholder updates"] },
      { group: "Risk", items: ["RAID log entries", "Risk register reviews", "Mitigation memos", "Escalation notes"] },
      { group: "Reports", items: ["Project status (RAG)", "Milestone reports", "Budget vs. actual narratives", "Quarterly portfolio review"] },
    ],
    starters: [
      { title: "Sprint retro",       tagline: "What worked, what didn't",     prompt: "Write a sprint retrospective summary. Three columns: What went well, What didn't, What we'll change next sprint. Three items per column, each with an owner." },
      { title: "RAID log entry",     tagline: "New risk this week",           prompt: "Draft a RAID log entry for a new risk: dependency on a third-party API's uptime. Include description, impact rating (1–5), probability (%), mitigation plan, owner, review date." },
      { title: "Status report (RAG)", tagline: "Red / amber / green",         prompt: "Compose a one-page project status report. RAG status with reason, milestones (done / on track / at risk), budget vs. actual, top 3 risks, top 3 asks of leadership." },
      { title: "Async standup",      tagline: "Yesterday / today / blockers", prompt: "Write my async standup update for today. Yesterday I shipped a code review and a small fix; today I'll start the email template integration; blocker is waiting on copy from marketing. Under 80 words." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Weekly project status report for the calendar-sync project. Currently amber.",
      "**Project: Two-way calendar sync — Week of 9 Jun**\n\n**RAG: 🟡 Amber**\n\n**Why amber:** The Google OAuth scope review is taking longer than the 2-week estimate. We're at week 3 with no green light. This is the only thing blocking us from internal eat-our-own-dogfood.\n\n**Milestones**\n  - 🟢 OAuth scope setup (Outlook): done, 1 week ahead\n  - 🟡 OAuth scope setup (Google): blocked on Google review (week 3 of 2-week SLA)\n  - 🟢 Webhook intake service: provisioned, in load testing\n  - 🟢 Event write logic: code complete, in code review\n  - 🟡 Internal dogfood: blocked by Google OAuth\n\n**Budget vs. actual:** ₹4.2L spent of ₹6.8L approved. Tracking 8% under for the quarter; we'll likely come in at 90% of budget.\n\n**Top 3 risks**\n  1. Google OAuth review continues to slip — high impact, medium probability. Mitigation: I've escalated to our Google partnerships contact for a status update by EOD Friday.\n  2. Conflict-resolution edge case (user reschedules in both tools before sync) — medium impact, low probability. Mitigation: shipping with \"system-of-record = our system\" as default; revisit if user complaints exceed 10/month post-launch.\n  3. Microsoft Graph rate limits at scale — medium impact, low probability. Mitigation: load test next week at 5× expected traffic.\n\n**Top 3 asks of leadership**\n  1. Anyone with a Google Cloud Platform escalation contact, please ping me\n  2. Approval to start the public beta on 100 customers in 2 weeks, conditional on Google OAuth being unblocked by then\n  3. Pre-approval for ₹1.2L additional budget if we need to extend the contractor's engagement by 2 weeks (backup plan)"
    ),
    pairs: ["engineering", "product", "ops"],
  },

  // ──────────────────────────────────────────────────────────────── PERSONAL
  {
    slug: "writer",
    name: "Writer Expert",
    short: "Writer",
    department: "personal",
    color: "#eab308",
    oneliner: "Long-form pieces, editing passes, headline polish, style fixes — the craft level above templates.",
    tasks: [
      { group: "Long form", items: ["Essays + thought leadership", "Long-form blog posts", "Speech + talk drafts", "Book chapters"] },
      { group: "Editing", items: ["Line edits", "Developmental edits", "Headline polish", "Style consistency checks"] },
      { group: "Specific craft", items: ["Hooks + first paragraphs", "Conclusions that aren't lame", "Transitions between sections", "Voice matching to a sample"] },
    ],
    starters: [
      { title: "Long essay",         tagline: "1,500 words on a real topic", prompt: "Write a 1,500-word personal essay titled 'What I learned firing a friend.' Honest, structural, no list-style. Stories, not lessons." },
      { title: "Headline polish",    tagline: "10 alternates from one draft", prompt: "I have a draft headline: 'Our new pricing.' Generate 10 alternates with different angles (benefit-led, curiosity-led, specific-numbers-led, contrarian, etc.). Note which works for which audience." },
      { title: "Voice match",        tagline: "Mimic a writing sample",       prompt: "Here's a 300-word sample of how I write [paste]. Rewrite my draft below to match that voice — same cadence, same vocabulary, same level of formality. [paste draft]" },
      { title: "Line edit pass",     tagline: "Tighten without losing voice", prompt: "Run a line-edit pass on this 800-word draft. Tighten without losing voice. Show me the diff (what changed and why) for the 6 most impactful edits." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Headline polish — I'm announcing our pricing has gone up. Give me 10 alternates.",
      "**For different angles + audiences:**\n\n1. **Direct + honest:** \"We're raising our prices on 1 August. Here's why, and what existing customers get.\"\n\n2. **Lead with the customer benefit:** \"We're raising prices — and grandfathering every existing customer for 18 months.\"\n\n3. **Specific-numbers-led:** \"After three years of $19, our Pro plan is going to $29.\"\n\n4. **Contrarian:** \"Why we're raising prices in a recession.\"\n\n5. **Curiosity-led:** \"The five-line internal email that became this pricing change.\"\n\n6. **Story-led:** \"Our biggest customer asked us to raise prices. Here's how we did it.\"\n\n7. **Reassurance-led, for nervous existing customers:** \"Pricing is going up. Yours isn't.\"\n\n8. **The strong, unhedged version:** \"Our prices haven't moved since 2023. They're moving now.\"\n\n9. **Sub-segmented:** \"We're moving Pro to $29. Free stays free. Unlimited gets cheaper.\"\n\n10. **The version that doesn't lead with prices at all:** \"What three years of customers taught us about our pricing.\"\n\n**Which works for which audience:**\n  - For existing paying customers (who'll read the email anyway): #2 or #7 — lead with reassurance.\n  - For prospects on your pricing page: #3 — they want the number, give it to them first.\n  - For your blog post explaining the change: #6 or #10 — story-led pulls casual readers in.\n  - For your tweet: #5 — curiosity wins on social.\n  - For Hacker News: #8 — direct, unhedged, no apology."
    ),
    pairs: ["marketing", "founder", "designer"],
  },

  {
    slug: "founder",
    name: "Founder / CEO Expert",
    short: "Founder",
    department: "personal",
    color: "#f59e0b",
    oneliner: "Investor updates, board narratives, all-hands scripts, vision posts — leadership voice on tap.",
    tasks: [
      { group: "Investors + board", items: ["Monthly investor updates", "Board-deck narratives", "Fundraising cold emails", "KPI commentary for board prep"] },
      { group: "Team", items: ["All-hands scripts", "Layoff comms (the hard one)", "Strategy pivots announcements", "Anniversary + milestone posts"] },
      { group: "Public voice", items: ["Founder tweets", "LinkedIn thought-leadership", "Press interview prep", "Talk + keynote drafts"] },
    ],
    starters: [
      { title: "Investor update",    tagline: "Monthly to existing investors", prompt: "Write a monthly investor update. Sections: highlights (3), KPIs (with movement), lowlights (1–2, honest), asks (specific), what's next month. ~600 words, founder voice." },
      { title: "All-hands script",   tagline: "Quarterly update to the team",  prompt: "Write a 15-min all-hands script for the team. Cover: company-level wins, what we learned, the next quarter's bet, one hard truth, Q&A prompt. Conversational, not a deck." },
      { title: "Layoff comms",       tagline: "The one you don't want to write", prompt: "Draft the all-hands script + email for a 15% layoff. Honest about why, generous to those leaving, clear on what's next for those staying. No corporate-speak." },
      { title: "Founder LinkedIn",   tagline: "Thought leadership, not a brag", prompt: "Write a 400-word LinkedIn post for me, the founder. Topic: what I learned saying no to a major investor last week. Story, not lessons. End with a question for the audience." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Monthly investor update for May 2026. ARR up 22%, lost two enterprise renewals.",
      "**OllaSuper — Investor Update, May 2026**\n\n*From Vikas — sent monthly on the 1st.*\n\n**Highlights**\n  - ARR up 22% MoM to ₹4.6 Cr annualised. Net new logos: 84.\n  - Shipped two-way calendar sync. Adoption hit 38% of paid customers in the first 2 weeks — way ahead of our 20% target.\n  - Hired Anjali as VP Product. She joins us 1 July from Razorpay. She's the most senior hire we've made and the entire product team is excited.\n\n**KPIs**\n  - ARR: ₹4.6 Cr (+22% MoM, +280% YoY)\n  - Net new customers: 84 (target was 70)\n  - Logo churn: 1.4% (target ≤2.5%) — green, but see below\n  - NRR: 118% (target 110%) — strong\n  - Cash runway: 19 months at current burn — unchanged\n\n**Lowlights — being honest**\n  - We lost two enterprise renewals this month worth ₹84L combined ARR. Both went to a US competitor that bundles AI with a tool they already use. We knew this risk; we lost on integrations, not product. Our integrations team is the next thing we're scaling.\n  - Sales cycles for the Unlimited tier (₹40L+) stretched from 47 days to 71 days. We need either more enterprise-level case studies or a different motion. Hiring an enterprise AE next month.\n\n**Asks**\n  - **Intros:** if anyone is on a board with a CRO at a 500–2000 person SaaS, we're hiring our first VP Sales and the right person there is a former CRO who's tired of running ops and wants to build a team. Any name you have is gold.\n  - **References:** we have two strategic deals where the customer's CTO would love to talk to another founder who's used AI at scale internally. Anyone in the portfolio?\n\n**What's next month**\n  - Closing two ₹1.2 Cr+ enterprise deals (both verbal, paperwork phase).\n  - Beta launch of the AEO Expert (this is the one that'll get us press, we think).\n  - Anjali starts; first 2 weeks she'll be reframing the product roadmap before we publish it externally.\n\nAs always, happy to chat anytime. Reply to me directly or grab time at [calendar link]."
    ),
    pairs: ["writer", "marketing", "data"],
  },

  {
    slug: "career",
    name: "Career Expert",
    short: "Career",
    department: "personal",
    color: "#fbbf24",
    oneliner: "Resignation, promotion case, salary asks, LinkedIn job-change posts — for *you*, not your team.",
    tasks: [
      { group: "Asks", items: ["Promotion case write-ups", "Salary revision requests", "Internal transfer asks", "Sabbatical requests"] },
      { group: "Transitions", items: ["Resignation letters", "Notice-period handover plans", "Goodbye emails", "First-day-at-new-job intros"] },
      { group: "Public", items: ["LinkedIn job-change posts", "Resume bullet polish", "Cover letters", "Reference-letter requests"] },
    ],
    starters: [
      { title: "Job change post", tagline: "LinkedIn, grateful + forward", prompt: "Write a 200-word LinkedIn post announcing my move from a backend engineer role at Razorpay to a senior engineer role at Stripe. Thank specific people, share one thing I learned, hint at what excites me. No humblebrag." },
      { title: "Resume bullet",   tagline: "Quantified impact, action verb", prompt: "Rewrite this resume bullet to be quantified and impactful: 'Worked on the payments team.' Context: I was a Backend Engineer, owned the reconciliation pipeline, reduced failed transactions by 35%." },
      { title: "Thank-you note",  tagline: "After an informational chat",   prompt: "Write a short thank-you note after a 30-min informational coffee chat. Mention one specific thing they said that stuck, share what I'll do as a result, leave the door open." },
      { title: "Referral request", tagline: "To a former colleague",        prompt: "Compose a referral request message to a former colleague who works at a target company. Be specific about the role (link), explain why I'm a fit in two lines, make it easy for them to say no." },
    ],
    sample: TEMPLATE_SAMPLE(
      "I'm leaving Razorpay for Stripe after 4 years. Write the LinkedIn post.",
      "**Some news.**\n\nAfter four years and eight months at Razorpay, I'm joining Stripe next month as a Senior Engineer.\n\nA few honest things, since I won't get this kind of public goodbye often:\n\nThe payments team at Razorpay was the best engineering team I've ever been part of. We built systems that moved a serious amount of India's online commerce, and I don't think I'll ever again work with people who debug a production payment failure at 11pm with the same combination of calm and rigour. To **Pranav**, **Shilpa**, **Aman** and the whole reconciliation squad — thank you for everything. I left part of my brain on that team's whiteboard.\n\nWhat I'll carry forward: that the boring parts of a system (idempotency, retries, replay tooling) are 80% of the work, and that customer trust is built in the part of the codebase nobody wants to look at.\n\nWhat I'm excited about at Stripe: getting to work on payments at the layer below where I've been working. Different problems, same allergy to magic.\n\nIf you're working on payments anywhere in the world, or hiring engineers in this space, my DMs are always open. I genuinely love this work and the people who do it.\n\nOnto the next chapter. 🚀"
    ),
    pairs: ["hr", "writer", "founder"],
  },

  // ──────────────────────────────────────────────────────────────── 11 NEW US-FOCUSED AGENTS

  {
    slug: "sdr",
    name: "SDR Agent",
    short: "SDR",
    department: "gtm",
    color: "#14b87a",
    oneliner: "Cold outbound at scale — find ICP, enrich, research, write personalized first touches that get replies.",
    tasks: [
      { group: "Sourcing", items: ["Boolean LinkedIn searches", "Apollo contact lookups", "Crunchbase funding triggers", "Intent signal scoring", "ICP fit scoring"] },
      { group: "Outreach", items: ["First-touch emails", "Multi-step cadences (5/7/11)", "LinkedIn InMails", "Voicemail scripts", "Video-first sequences"] },
      { group: "Pipeline", items: ["Meeting-set scripts", "No-show resurrection", "AE handoff briefs", "Pipeline hygiene", "Quota narrative for QBR"] },
    ],
    starters: [
      { title: "Target list",       tagline: "50 US Series A SaaS, hiring SDRs", prompt: "Build me a 50-prospect target list of US Series A SaaS companies (raised in last 18 months, 50-200 employees) actively hiring SDRs. Output: company name, HQ city, post-Series-A revenue range, why they're a fit, name of likely buyer (VP Sales / RevOps), and one specific trigger event I can reference in outreach." },
      { title: "5-step cadence",    tagline: "Built around a competitor signal", prompt: "Write a 5-touch cadence (Day 1, 3, 7, 12, 21) targeting a VP Sales whose company just adopted Outreach.io. Each step: subject line, body (≤90 words), CTA. Mix of email, LinkedIn voice note, and InMail." },
      { title: "Objection reply",   tagline: "\"Who else does this?\"",          prompt: "Write a 60-word reply to the objection \"Who else does this?\" from a prospect who's clearly comparing 4-5 vendors. Don't list competitors. Reframe to outcome." },
      { title: "Re-engage quiet",   tagline: "60-day quiet prospect",            prompt: "Write a re-engagement email to a prospect who went quiet 60 days ago after a great discovery call. Be honest about the silence, give them one new piece of value (an insight, not a case study), make it easy to say no." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Build me a 25-prospect target list of US Series A SaaS hiring SDRs. Need company, HQ, headcount, trigger.",
      "**25 US Series A SaaS hiring SDRs — sorted by fit signal**\n\n| # | Company | HQ | HC | Trigger |\n|---|---------|----|----|---------|\n| 1 | Vanta | SF | 180 | Posted 4 SDR roles last 14 days; just raised $40M Series B extension |\n| 2 | Drata | SD | 150 | New VP Sales hire from Gong; 6 SDR reqs open |\n| 3 | Persona | SF | 95 | Hired a Director of Sales Ops in Nov, pipeline build phase |\n| 4 | Modern Treasury | SF | 110 | Expanded into card issuing; ICP shift triggers SDR rebuild |\n| 5 | Census | SF | 75 | RB Capital led extension — 18-mo runway, growth phase |\n| ...(20 more rows trimmed for brevity) |\n\n**Common pattern across this list:** Series A→B-extension companies (12-24 mo post-A) in a 'now scale GTM' phase. The buyer is almost always a new VP Sales or RevOps director hired in the last 90 days — that's the warm intro point.\n\n**Recommended outreach angle:** lead with the specific hire they made (VP Sales name, where they came from), reference their go-to motion at the prior company, propose a 15-min conversation specifically about scaling SDR cadence quality vs volume.\n\nWant me to write the first-touch email for the top 5?"
    ),
    pairs: ["sales", "marketing", "cs"],
  },

  {
    slug: "soc2",
    name: "SOC 2 Auditor",
    short: "SOC 2",
    department: "ops",
    color: "#1f2937",
    oneliner: "Trust Services Criteria mapping, control evidence, gap analysis — get audit-ready without the consultant fee.",
    tasks: [
      { group: "Scoping", items: ["TSC selection (CC + A/C/PI/P)", "Service boundary mapping", "System description drafting", "Subservice org mapping (CSP responsibilities)"] },
      { group: "Evidence", items: ["Control-to-CC mapping", "Evidence-collection prompts", "Sampling strategy", "Workforce screening attestations", "Vendor due-diligence pulls"] },
      { group: "Reporting", items: ["Bridge letters", "SIG / CAIQ responses", "Customer trust-portal updates", "Annual gap analysis", "Auditor walkthrough scripts"] },
    ],
    starters: [
      { title: "Type II readiness",  tagline: "Honest gap assessment",         prompt: "Run a Type II readiness assessment for a 60-person SaaS. We have AWS infra, GitHub, Linear, Notion, Vanta-instrumented. Cover all 9 CC criteria + Availability. Honest grade per CC. Top 7 controls to remediate before the audit window opens." },
      { title: "SIG response",       tagline: "Customer security questionnaire", prompt: "Draft responses to a 47-question SIG-Lite from a Fortune 500 prospect. We're a Type II company on AWS with SSO via Okta. Be confident, accurate, and skip the disclaimers — this is for procurement, not legal." },
      { title: "Bridge letter",      tagline: "For customer trust portals",    prompt: "Write a SOC 2 bridge letter covering the gap period between our Sept 30 audit close and today. Confirm controls remain effective, list any material changes, and address that we added 3 new vendors during the gap." },
      { title: "Subprocessor list",  tagline: "Auditor + customer-ready",     prompt: "Generate a subprocessor list table for our trust portal. Each row: vendor name, service provided, data category accessed, geography, certification status (their SOC 2 / ISO 27001 / nothing). Group by control function (auth, infra, comms, analytics)." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Quick gap assessment — 60-person SaaS on AWS, GitHub, Linear, Notion. We want a Type II in 6 months.",
      "**Type II readiness — 60-person AWS SaaS — 6-month timeline**\n\n**Overall grade: C+ / on-track if you start now.** Six months is achievable but tight; you need a 3-month observation window which means controls must be effective by month 3.\n\n**By CC group:**\n\n- **CC1 (Control Environment)** — B. Code of conduct, org chart, board comms likely fine. Gap: documented workforce screening attestations for the last 12 months. Fix: HR signs off retroactively + new template going forward.\n- **CC2 (Communication & Information)** — B. Trust page + DPA in place if customer-facing. Gap: internal incident-comms procedure isn't formal. Fix: 1-page runbook.\n- **CC3 (Risk Assessment)** — D. Almost always the weakest. Need a documented annual risk assessment + risk register. Fix: 2-day workshop, output the deliverables.\n- **CC4 (Monitoring)** — C. Vanta covers most. Gap: management review cadence isn't scheduled. Fix: quarterly review on calendar with sign-off.\n- **CC5 (Control Activities)** — B. Github branch protection + Linear flow likely covers SDLC. Gap: change-management evidence at PR-merge time. Fix: PR template requires reviewer sign-off + ticket link.\n- **CC6 (Logical Access)** — C. SSO good, MFA enforced? Gap: privileged-access review on AWS root + GitHub admin. Fix: quarterly access review, documented.\n- **CC7 (System Operations)** — B. CloudWatch + alerts. Gap: documented incident-response runbook with severity tiers. Fix: 1-page runbook + tabletop exercise.\n- **CC8 (Change Management)** — B. Covered by SDLC if PR process is enforced.\n- **CC9 (Risk Mitigation)** — D. Vendor due-diligence is almost always missing for early companies. Fix: vendor risk questionnaire + SOC 2 collection on top 10 vendors.\n- **Availability** — B. Multi-AZ likely. Gap: documented RTO/RPO + backup-restore evidence. Fix: quarterly restore drill, screenshot evidence.\n\n**Top 7 controls to remediate before observation window opens:**\n1. Document risk assessment + register (CC3) — biggest gap\n2. Vendor due-diligence for top 10 vendors (CC9)\n3. PR template enforcing reviewer + ticket reference (CC5/CC8)\n4. Quarterly privileged-access review (CC6)\n5. IR runbook + tabletop (CC7)\n6. Restore-from-backup drill, screenshot evidence (Availability)\n7. Workforce screening attestation backlog (CC1)\n\nStart Mon. Auditor walkthroughs by month 3. Real Type II window opens then."
    ),
    pairs: ["operations", "engineering", "legal"],
  },

  {
    slug: "hipaa",
    name: "HIPAA Compliance Agent",
    short: "HIPAA",
    department: "ops",
    color: "#5b21b6",
    oneliner: "BAAs, risk assessment, breach notification, ePHI inventory — for US healthtech and anyone touching PHI.",
    tasks: [
      { group: "Privacy + Security Rule", items: ["NIST 800-66 / HIPAA Security Rule mapping", "ePHI inventory", "Annual risk assessment", "Minimum Necessary policy"] },
      { group: "BAA management", items: ["BAA drafting + redlines", "Subcontractor BAA chains", "Vendor BAA inventory", "Termination notices"] },
      { group: "Incident response", items: ["Breach assessment (4-factor)", "Notification letters (individual, HHS, media)", "OCR investigation responses", "Workforce sanctions"] },
    ],
    starters: [
      { title: "Risk assessment", tagline: "Annual NIST 800-66 sweep",         prompt: "Run a Security Rule risk assessment for a 30-person digital therapeutics startup. We handle PHI for ~50K patients on AWS. Output: asset inventory, threat scenarios, likelihood × impact matrix, remediation backlog with owners + dates. Format for OCR if they audit." },
      { title: "BAA redline",     tagline: "Vendor sent us their template",   prompt: "Redline this BAA template a vendor sent us. They're a transcription SaaS handling our patient call recordings. Flag: subcontractor obligations, breach-notification timing, indemnity, audit rights, data return on termination. Reply with red-lined version + cover note explaining the 3 most important changes." },
      { title: "Breach letter",   tagline: "4-factor + individual notice",    prompt: "We had a breach: a developer accidentally pushed PHI for 247 patients to a public GitHub repo for 14 hours before discovery. Walk me through the 4-factor risk assessment, decide if it's a 'breach', and draft the individual notification letter + HHS notice if required." },
      { title: "Subcontractor chain", tagline: "BAA dependency graph",        prompt: "Build a subprocessor + subcontractor chain map for a typical SaaS handling PHI. We have BAAs with AWS, Twilio, SendGrid, Segment, Mixpanel, OpenAI. Show the chain, flag any missing BAAs, recommend whether each vendor is BAA-required or not." },
    ],
    sample: TEMPLATE_SAMPLE(
      "We're a 30-person digital therapeutics startup. We push to GA next quarter. Tell me the top 10 HIPAA priorities right now.",
      "**Top 10 HIPAA priorities — 30-person digital therapeutics, pre-GA**\n\n**1. ePHI inventory + data flow diagram.** Where PHI enters, where it lives, where it leaves. This is the foundation. If you can't show it to OCR in 24 hours, nothing else matters. Two days of work.\n\n**2. Sign BAAs with every vendor touching PHI.** Likely list: AWS (have it), Twilio (need it), SendGrid (need it), any analytics vendor, any LLM provider (OpenAI has one), your error monitoring (Sentry — they have one). One missing BAA = HIPAA violation regardless of how good your other controls are.\n\n**3. Workforce training + access agreements.** Every employee, contractor, and intern signs an access agreement + completes HIPAA training before getting any access to systems that touch PHI. Annual refresher. Document the dates.\n\n**4. Minimum Necessary policy.** Written policy that says 'workforce members only access the PHI necessary for their job function.' Then enforce via role-based access on your DB, not just app-level.\n\n**5. Audit logging on PHI access.** Who looked at what patient record when. Logs retained 6 years (HIPAA requirement). CloudTrail for AWS + app-level audit log for PHI reads.\n\n**6. Encryption at rest + in transit.** TLS 1.2+ everywhere, encrypted EBS/RDS, KMS-managed keys, no client-side storage of PHI without explicit encryption.\n\n**7. Risk assessment (annual + when anything material changes).** This is the one OCR will ask for first. Use NIST 800-66 Rev 2 as the framework. Document it. Don't skip it.\n\n**8. Incident response runbook.** What happens in the first 60 minutes of a suspected breach. Who calls who, who decides if it's a breach, who notifies. Tabletop exercise once a year.\n\n**9. BAA chain audit.** Your BAA with AWS isn't enough — you need BAAs (or attestation) from any vendor AWS uses for PHI processing. Most are fine; document it.\n\n**10. Right-of-access + amendment workflows.** Patients can demand their PHI in 30 days and request amendments. Have the workflow built before someone asks. Most healthtech ignores this until they get a complaint.\n\n**What's NOT a HIPAA priority (skip for now):**\n- SOC 2 (it overlaps but isn't HIPAA — do it later)\n- HITRUST (enterprise customers may want it eventually, not pre-GA)\n- State-specific laws (CCPA, NY SHIELD) — relevant but distinct\n\nWant me to draft #1 (data flow diagram) first?"
    ),
    pairs: ["legal", "operations", "engineering"],
  },

  {
    slug: "sec",
    name: "SEC Filings Agent",
    short: "SEC",
    department: "ops",
    color: "#b91c1c",
    oneliner: "S-1 prep, 10-K narratives, 10-Q quarterlies, 8-K announcements, proxy statements — EDGAR-ready drafts.",
    tasks: [
      { group: "Periodic reports", items: ["10-K (MD&A, risk factors, business)", "10-Q (quarterly MD&A)", "20-F for FPIs", "Annual report to shareholders"] },
      { group: "Current reports", items: ["8-K event triggers + drafts", "Material agreement filings", "Departure / election announcements", "Earnings releases (Item 2.02)"] },
      { group: "Registration + proxy", items: ["S-1 drafting + amendments", "Proxy statement (DEF 14A)", "Compensation discussion (CD&A)", "Beneficial ownership (Sched 13D/G)"] },
    ],
    starters: [
      { title: "Risk factors",   tagline: "Top 20 for a vertical SaaS S-1",   prompt: "Draft the Risk Factors section for an S-1 from a US vertical SaaS company in legal tech. Cover: customer concentration, regulatory risk (DPDP/GDPR/CCPA), AI hallucination liability, cybersecurity, key-person, competitive (incumbents + LegalTech AI), and 14 more. Each 2-3 paragraphs, plain English." },
      { title: "MD&A draft",     tagline: "Q3 comparison vs Q2",              prompt: "Draft the MD&A section of a 10-Q. We grew revenue 28% QoQ ($14.2M → $18.2M), gross margin expanded from 76% to 79%, opex up 12% due to GTM hiring. Include three-quarter comparison, segment breakdown if material, and forward-looking statements within the safe harbor." },
      { title: "8-K trigger",    tagline: "CFO departure",                   prompt: "Our CFO is resigning effective end of next month. Departure is amicable, succession plan is internal (VP Finance promoted). Draft the 8-K Item 5.02 disclosure + the press release. Match Stripe / Datadog tone — direct, no buzzwords." },
      { title: "Proxy CD&A",     tagline: "Comp committee narrative",        prompt: "Draft the Compensation Discussion & Analysis section of our DEF 14A. Cover our NEO comp philosophy, FY24 results, peer benchmarking methodology, equity grant rationale, say-on-pay considerations. Match a SaaS company that just had a 92% say-on-pay approval." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Draft the top 10 risk factors for a US vertical SaaS S-1 (healthcare AI).",
      "**Risk Factors — selected (top 10 of ~35 the final S-1 will need)**\n\n**1. We have a history of net losses and may not achieve profitability.**\n\nWe have incurred net losses in every period since inception, including net losses of $XX million in fiscal 2024 and $XX million in the year-to-date period. Our accumulated deficit was $XX million as of [date]. We expect to continue to incur losses for the foreseeable future as we invest in product development, sales and marketing, and expansion of our customer base. If we cannot achieve and sustain profitability, our financial condition and the value of our common stock will be adversely affected.\n\n**2. The market for AI-enabled healthcare software is new and evolving.**\n\nWe operate in a category that has only emerged in the last [N] years. Customer adoption of AI for clinical and operational workflows depends on factors outside our control, including regulatory clarity (FDA AI/ML guidance, ONC certification), provider trust in AI outputs, and the willingness of payers to reimburse AI-assisted workflows. If these markets develop more slowly than we expect, or if AI tools are not adopted at the scale we anticipate, our growth will be materially harmed.\n\n**3. Regulatory enforcement against AI medical devices is uncertain.**\n\nThe FDA has issued multiple guidance documents covering AI/ML-enabled medical device software. Our products may be classified as Software as a Medical Device (SaMD), which would subject us to premarket review, post-market surveillance, and Quality System Regulation requirements. State medical boards and the FTC may also assert jurisdiction over AI tools in clinical settings. Adverse classification, enforcement, or new rulemaking could materially impair our ability to sell our products.\n\n**4. Our customers are concentrated among large health systems.**\n\nOur top 10 customers represented X% of revenue in fiscal 2024. The loss of any one of these customers, or a material reduction in their purchases, would materially harm our results. Health systems also have long procurement cycles (12-24 months) and significant negotiating leverage, both of which may pressure our pricing and margins.\n\n**5. We process protected health information (PHI), subjecting us to HIPAA and state privacy laws.**\n\nAs a Business Associate under HIPAA, we are subject to the Privacy Rule, Security Rule, and Breach Notification Rule. A material breach, OCR enforcement action, or class-action litigation under state laws (CCPA, BIPA, state breach notification statutes) could result in significant fines, customer attrition, remediation costs, and reputational harm. Our products incorporate large language models, which introduce novel risks of PHI disclosure through model outputs.\n\n**6. AI hallucination and clinical safety incidents could result in liability and reputation damage.**\n\nOur AI models occasionally produce outputs that are factually incorrect or clinically inappropriate. While our products include human-in-the-loop safeguards, a single clinical safety incident could result in malpractice litigation, FDA enforcement, customer attrition, and adverse media coverage. We carry product liability insurance, but coverage is limited and may not be available for AI-specific claims.\n\n**7. We rely on third-party AI model providers (OpenAI, Anthropic, Google) under contracts that may change.**\n\nOur products are built on foundation models licensed from third parties. Changes in pricing, model availability, terms of service, or content policies by any of these providers could materially impact our cost structure, product capabilities, or competitive position. Disputes or termination of these arrangements could require costly engineering work to switch providers and may temporarily degrade product quality.\n\n**8. Cybersecurity incidents could disrupt our operations and harm our reputation.**\n\nWe handle confidential customer and patient data. A breach of our systems, ransomware attack, or supply-chain compromise could disrupt operations, trigger breach-notification obligations, result in litigation, and erode customer trust. We have implemented industry-standard controls (SOC 2 Type II, HITRUST), but no security program eliminates risk.\n\n**9. We depend on a small number of key personnel.**\n\nOur founders, [CEO name] and [CTO name], are critical to our strategy and operations. The loss of either, or of other key technical and commercial leaders, could materially harm our business. Our equity compensation programs are designed to retain key personnel, but retention is not guaranteed, and a public stock price decline could increase departure risk.\n\n**10. Public-company costs may strain our resources.**\n\nFollowing this offering, we will incur significant ongoing costs as a public company, including SEC compliance, audit fees, D&O insurance, investor relations, and Sarbanes-Oxley compliance (Section 404 once we exit emerging-growth-company status). These costs may divert management attention and harm our ability to operate efficiently.\n\n(20 more risk factors — competition, IP, international operations, share-price volatility, dual-class structure, dilution from secondary issuances, etc. — to follow.)"
    ),
    pairs: ["legal", "finance", "founder"],
  },

  {
    slug: "ma",
    name: "M&A Agent",
    short: "M&A",
    department: "personal",
    color: "#ea580c",
    oneliner: "Target screening, valuation comps, CIMs, DD memos, market mapping — deal-stage research that closes rounds.",
    tasks: [
      { group: "Pipeline", items: ["Target screening (acquirer-side)", "Strategic-buyer mapping (seller-side)", "Initial outreach drafts", "Teaser docs (1-pager)"] },
      { group: "Diligence", items: ["CIM drafts", "Market sizing memos", "Customer concentration analysis", "Competitive teardowns", "Technology due diligence summaries"] },
      { group: "Negotiation", items: ["Valuation comps (EV/Revenue, EV/EBITDA)", "Term-sheet redlines", "Synergy modeling narrative", "Earnout structures explainer"] },
    ],
    starters: [
      { title: "Target screen",    tagline: "Acquirer-side, 15 candidates",     prompt: "We're a $200M ARR vertical SaaS. Strategic acquirers: HR-tech consolidators. Screen 15 strategic + 5 financial acquirers, by: fit thesis, recent M&A activity, cash position, cultural compatibility, likely transaction size. Output as a tiered shortlist with first-touch contact name." },
      { title: "Valuation comps",  tagline: "EV/Revenue precedents",            prompt: "Build a comparable-transaction comp set for a vertical SaaS in HR-tech, $50M ARR, 80% gross margin, 40% YoY growth, public + private targets last 36 months. Output: target, acquirer, EV, EV/Revenue, EV/Forward-Revenue, growth at deal, deal type (control / minority / asset). Mean + median table." },
      { title: "CIM exec summary", tagline: "Sell-side, 1 page that hooks",     prompt: "Draft the executive summary page for a CIM. Company: $50M ARR vertical SaaS, 40% YoY growth, 110% NDR, 80% gross margin, 65 customers including 8 Fortune 500. Highlight thesis, market, financial summary, growth vectors, and the 'why now' for a strategic acquirer." },
      { title: "DD memo",          tagline: "Acquirer's tech / IP risks",       prompt: "Write a 600-word technical due-diligence memo for an acquirer. Target: AI SaaS, 30-person eng team, GPT-4 dependent, no clear moat in the model layer. Cover: tech debt, key-person risk, AI vendor concentration, data rights, IP cleanup needed pre-close, integration complexity." },
    ],
    sample: TEMPLATE_SAMPLE(
      "We're a $50M ARR HR-tech SaaS, want to be acquired. Top 10 strategic acquirers + first-touch logic for each.",
      "**Top 10 strategic acquirers for $50M ARR HR-tech vertical SaaS**\n\n**Tier 1 — Highest fit, recent M&A activity in HR-tech:**\n\n1. **Workday** — buyer of choice for HR-tech post-Series-B. Recent acquisitions: Peakon ($700M), Adaptive Insights ($1.7B). Cash position: $7B+. Strategic fit: 9/10. **First touch:** Pete Schlampp (CTO) via your shared investor at Insight Partners; angle: Workday's M&A pipeline is publicly active and they look at $50-200M ARR companies for product extension.\n\n2. **SAP SuccessFactors** — incumbent, large M&A budget. Recent: Qualtrics (now spun out), but still acquisitive in HR-tech. **First touch:** Jill Popelka (President, SAP SuccessFactors) — your VC partners likely have shared boards. Angle: international expansion + AI capability gap.\n\n3. **Oracle Fusion HCM** — quiet but heavy acquirer; willing to pay above-market for fits. **First touch:** Oracle's strategic M&A team (publicly listed); cold-warm intro via Larry Ellison's network is unlikely; better path is via your investment bank.\n\n**Tier 2 — Adjacent strategics looking to expand into HR:**\n\n4. **ServiceNow** — building out their employee experience platform. ServiceNow Workflow has HR-adjacent gaps. **First touch:** Bill McDermott's office (he came from SAP, knows HR-tech market cold).\n\n5. **Microsoft (Viva)** — Viva is acquisitive. Recent: LinkedIn Glint. **First touch:** Microsoft Corporate Development (Chris Young's team). Angle: Viva + LinkedIn Talent stack would benefit from your category.\n\n6. **Salesforce (Slack + Work.com)** — slowed M&A post-Slack, but still buying in adjacent categories. **First touch:** Salesforce Ventures (your investors likely overlap).\n\n7. **HubSpot** — moving into HR/operations from CRM. Recent: smaller bolt-ons. **First touch:** Yamini Rangan's office; angle: SMB segment fit if your customer base skews 100-500 employees.\n\n**Tier 3 — Smaller strategics that pay for product, not synergy:**\n\n8. **15Five** — well-funded, looking for AI-native acquisitions. **First touch:** David Hassell (CEO). Direct outreach OK.\n\n9. **Lattice** — recent funding, looking to expand category. **First touch:** Jack Altman; founders know each other in HR-tech circles.\n\n10. **Culture Amp** — Sequoia-backed, growth-stage, acquisitive in their category. **First touch:** Didier Elzinga (CEO).\n\n**Financial acquirers (separate tier):** Vista Equity Partners and Thoma Bravo both have active HR-tech portfolios (Khoros, Marketo precedents). For a $50M ARR fast-grower, expect 8-12x EV/Revenue if growth is durable, 6-9x if slowing.\n\n**What to do first:** decide whether you're running a process or doing 1-2 bilateral conversations. Process gets you the best price but takes 6-9 months; bilateral is 90 days but you lose negotiating leverage. Want me to draft the teaser doc or the bilateral first-touch email to Workday?"
    ),
    pairs: ["founder", "ir", "finance"],
  },

  {
    slug: "ir",
    name: "Investor Relations Agent",
    short: "IR",
    department: "personal",
    color: "#d97706",
    oneliner: "Monthly investor updates, board narratives, cap-table commentary, IR site drafts — the founder's voice to the cap table.",
    tasks: [
      { group: "Recurring comms", items: ["Monthly investor updates", "Quarterly board decks (narrative + data)", "Annual letter to shareholders", "Earnings call scripts (for public co)"] },
      { group: "Data room + collateral", items: ["Data room organization + permissions", "Cap-table commentary", "Pro-forma dilution analysis", "Liquidation-waterfall narratives"] },
      { group: "Relationship management", items: ["Investor 1:1 prep briefs", "New-investor onboarding pack", "Reference call coaching for portcos", "Inbound inquiry triage"] },
    ],
    starters: [
      { title: "Monthly update",    tagline: "Series B SaaS, mixed quarter",   prompt: "Draft a monthly investor update for a Series B SaaS. Mixed quarter: ARR up 18% MoM (great), but lost 2 enterprise renewals (bad). 17 months runway. Hiring a VP Sales. Include: highlights, KPIs with trend, lowlights (honest), asks, what's next month. 600 words." },
      { title: "Board pre-read",   tagline: "Quarterly, narrative-first",     prompt: "Write a 4-page board pre-read narrative (the part before the data appendix). Q3 vs Q2: revenue +28%, NRR 118%, customer count +12, churn flat at 1.2%, runway 19 months. Strategic decisions to surface: AI infra build vs buy, EU expansion timing, follow-on equity plan." },
      { title: "Cap-table commentary", tagline: "After Series C closes",       prompt: "Write the cap-table commentary memo for the team after a Series C closes. Pre-money $400M, $80M raise, 4% pool refresh. Walk through: founder dilution, ESOP impact, preference stack, anti-dilution, what this means for an eventual exit. Plain English, optimistic but honest." },
      { title: "Inbound investor", tagline: "Reply to a cold partner",        prompt: "Reply to a cold inbound from a partner at a Tier 1 fund who saw our recent press. We're not raising. Decline gracefully, keep the door open, ask one strategic question that gets us a useful conversation without committing to a fundraise." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Draft my July monthly investor update. ARR $4.6M (+22%), lost 2 enterprise renewals, hired VP Product, runway 19 months.",
      "**Subject: OllaSuper — July Monthly Update**\n\n*From [Founder] — sent monthly on the 1st.*\n\n**Highlights**\n- ARR $4.6M annualized, +22% MoM (+280% YoY). Net new logos: 84 (target was 70).\n- Shipped two-way calendar sync. 38% paid-customer adoption in two weeks (target 20%).\n- Hired Anjali as VP Product, joining 1 July from Razorpay. Most senior product hire to date.\n\n**KPIs**\n\n| Metric | Jul | Jun | MoM | Target |\n|---|---|---|---|---|\n| ARR (annualized) | $4.6M | $3.8M | +22% | +20% |\n| Net new logos | 84 | 67 | +17 | 70 |\n| Logo churn | 1.4% | 1.2% | — | ≤2.5% |\n| NRR | 118% | 116% | — | 110% |\n| Cash runway | 19 mo | 20 mo | -1 | — |\n\n**Lowlights — honest**\n- Lost 2 enterprise renewals worth $84K combined ARR. Both went to a US competitor that bundles AI with a tool they already use. We knew the risk; we lost on integrations, not product. Integrations team scaling next.\n- Sales cycles for Unlimited tier ($40K+) stretched from 47 → 71 days. Need either more enterprise case studies or a different motion. Hiring enterprise AE next month.\n\n**Asks**\n- **Intros:** anyone on a board with a CRO at a 500-2000 person SaaS — we're hiring our first VP Sales and need a former CRO who's tired of running ops.\n- **References:** we have two strategic deals where the customer's CTO would love to talk to another founder who's used AI at scale internally.\n\n**What's next month**\n- Closing two $1.2M+ enterprise deals (both verbal, paperwork phase).\n- Beta launch of AEO Agent (this is the press-bait one).\n- Anjali starts; first 2 weeks she'll reframe the product roadmap before we publish it externally.\n\nAs always, happy to chat anytime — reply directly or grab time at [calendar link].\n\n— [Founder]\n\n*KPIs in the data appendix below; let me know if you want a different cut or additional context on the renewal losses.*"
    ),
    pairs: ["founder", "ma", "finance"],
  },

  {
    slug: "tax",
    name: "US Tax Agent",
    short: "Tax",
    department: "ops",
    color: "#166534",
    oneliner: "Federal + state + sales tax, ASC 606 revenue recognition, R&D credits, multi-state nexus — without the Big 4 invoice.",
    tasks: [
      { group: "Income tax", items: ["Federal corporate income tax (Form 1120 narratives)", "State income tax (combined / separate / unitary)", "International (GILTI, FDII, BEAT primers)", "Tax provision (ASC 740) narratives"] },
      { group: "Sales + use tax", items: ["Nexus analysis (Wayfair-era)", "SaaS taxability by state (47-state matrix)", "Voluntary disclosure agreements", "Sales tax automation guidance (Avalara, Vertex)"] },
      { group: "Credits + structures", items: ["R&D credit (Section 174 + 41) computation", "QSBS planning (Section 1202)", "Stock-comp deductibility (162(m), 409A)", "Reorganization narratives"] },
    ],
    starters: [
      { title: "Nexus map",         tagline: "Sales-tax exposure across states", prompt: "We're a SaaS at $20M ARR, sell to 47 US states. Run a Wayfair-era nexus analysis. Output: economic-nexus threshold per state, our current exposure, recommended VDAs (voluntary disclosure) for any state we've crossed without registering, and registration priority order." },
      { title: "R&D credit",        tagline: "Section 174 narrative",          prompt: "Walk me through the Section 174 R&D capitalization rules for our 30-engineer SaaS. What software dev costs must be capitalized vs expensed, how does this affect our pretax income, and what's our R&D tax-credit opportunity under Section 41? Plain English so I can explain it to my CEO." },
      { title: "QSBS check",        tagline: "Founder + early employees",      prompt: "Confirm our company qualifies for QSBS (Section 1202). Cover the 8 requirements (gross assets, qualified trade or business, holding period, etc.). For founder + early employees, draft a 1-page memo explaining the $10M exclusion + state treatment differences (CA, MA non-conforming)." },
      { title: "ASC 606 memo",      tagline: "Multi-element SaaS contract",    prompt: "Write an ASC 606 revenue-recognition memo for a multi-element contract: 1-year SaaS subscription ($240K), implementation services ($60K, 90-day project), and a hardware add-on ($30K, shipped Day 30). Identify performance obligations, allocate transaction price, and lay out the recognition schedule." },
    ],
    sample: TEMPLATE_SAMPLE(
      "We're a SaaS at $20M ARR selling to 47 states. Walk me through our sales-tax nexus exposure honestly.",
      "**Sales-tax nexus exposure — $20M ARR SaaS, 47 states**\n\nShort answer: you almost certainly have nexus in 20-30 states and are likely uncollected/unregistered in 10-15 of them. Material exposure, fixable.\n\n**The framework (Wayfair, 2018+):**\n- Every state has its own threshold. Common patterns: $100K revenue OR 200 transactions; some states use just dollar thresholds; California is $500K.\n- 33 states currently treat SaaS as taxable; 14 don't. Of the 33 taxable, the rules vary on whether it's the buyer's location or the seller's that determines taxability.\n- 'Nexus' = obligation to collect. 'Taxability' = whether your product is subject to the tax once you have nexus. You need both.\n\n**Your likely exposure pattern:**\n\n| Tier | States | Exposure |\n|---|---|---|\n| **Definitely have nexus + SaaS is taxable** | NY, CA, TX, MA, WA, PA, OH, NJ, VA, CT, AZ, CO, DC | Highest priority |\n| **Have nexus + SaaS NOT taxable** | FL, IL, NV, NH, MT, OR, DE, MO | Register but no collection |\n| **Likely have nexus + ambiguous** | TN, GA, NC, MN, IN, MD, UT, WI | Need state-by-state analysis |\n| **Below threshold** | the rest | Monitor for crossing |\n\n**Action plan:**\n\n1. **Pull the data.** By-state revenue and transaction-count for the trailing 36 months (statute of limitations on most states is 3-7 years).\n2. **Identify the states where you've crossed nexus and SaaS is taxable but you're NOT collecting.** That's your liability.\n3. **For each of those states, choose:**\n   - **Voluntary Disclosure Agreement (VDA)** — discloses to the state proactively, usually limits look-back to 3-4 years, waives most penalties. Best path for $100K+ exposures.\n   - **Just register prospectively** — only if exposure is small and you're willing to risk audit on historical periods.\n4. **Register, configure Avalara or Vertex, start collecting.** Avalara is the default for SaaS; Vertex is more enterprise.\n\n**The honest math:**\n\nIf you have $5M of revenue spread across the 13 'definitely have nexus + taxable' states at an average ~6% sales tax rate, your gross uncollected exposure is up to ~$300K, often closer to $150-200K after credits and exemption certificates. VDA typically settles for 60-80% of the gross. That's $90-160K cash, plus $40-80K in legal/accounting fees to clean it up.\n\n**Recommendation:** start a VDA process in the top 5 exposure states (NY, CA, TX, MA, WA) immediately. Register prospectively in the remaining 8 high-risk states. Configure Avalara before end of quarter so the bleeding stops. Cost vs leaving alone: ~$200K to fix vs ~$2-4M when a state finds you (back tax + penalty + interest + accelerated audit on other states).\n\nWant me to draft the VDA application narrative for NY (highest exposure typically) or build the by-state nexus tracker first?"
    ),
    pairs: ["finance", "legal", "operations"],
  },

  {
    slug: "litigation",
    name: "Litigation Support Agent",
    short: "Litigation",
    department: "ops",
    color: "#6b1f1f",
    oneliner: "Discovery review, deposition prep, citation checking, case research — paralegal-grade work at a fraction of the cost.",
    tasks: [
      { group: "Discovery", items: ["Doc review (responsive / privileged / hot)", "Privilege log drafting", "Production set assembly", "Subpoena response strategy"] },
      { group: "Deposition + trial prep", items: ["Witness outline drafts", "Cross-exam prep memos", "Exhibit binders", "Trial brief drafts"] },
      { group: "Research", items: ["Case-law research + summarization", "Citation checking (Shepard / KeyCite)", "Motion drafts (12(b)(6), MSJ, MIL)", "Damages-model narratives"] },
    ],
    starters: [
      { title: "Doc review pass",  tagline: "Privileged vs responsive",        prompt: "I have 4,800 emails to review for a contract-dispute case. Help me design a doc-review protocol: first-pass tagging (responsive / non-responsive / privileged / hot), second-pass QC, privilege log format. Suggest the 12 search-term combinations most likely to surface the smoking-gun emails." },
      { title: "Cross-exam prep",  tagline: "Hostile expert witness",          prompt: "Draft a cross-examination outline for a hostile damages expert. Their report claims $14M in lost profits using a yardstick method based on 4 'comparable' companies. Walk me through the 8 weakest points in their methodology and the 6 best impeachment angles with their prior testimony or publications." },
      { title: "MSJ brief",        tagline: "Statute of limitations",          prompt: "Draft a Motion for Summary Judgment brief on a statute-of-limitations defense. Plaintiff filed 5 years after the alleged breach; state law has a 4-year SoL for written contracts. Plaintiff argues discovery rule / continuing violation. Cover: SoL applicable law, when claim accrued, why discovery rule doesn't apply here, citing controlling authority." },
      { title: "Damages narrative", tagline: "Plain-English for jury",         prompt: "Write a 600-word damages narrative for opening statement. Our client is a SaaS company that lost a 5-year, $4.8M contract due to defendant's breach. Walk jury through (1) what was promised, (2) what was lost, (3) why the number is what it is. Plain English, no jargon, no 'and the like'." },
    ],
    sample: TEMPLATE_SAMPLE(
      "I need to prep cross-exam of plaintiff's damages expert. They claim $14M lost profits using yardstick method comparing to 4 'similar' SaaS companies.",
      "**Cross-examination outline — Plaintiff's damages expert ($14M yardstick model)**\n\n**The 6 weakest links in their methodology:**\n\n**1. Yardstick selection — non-comparability.** The 4 'comparable' companies almost certainly differ from plaintiff on size, growth stage, customer mix, vertical, or geography. Get them to admit on cross that they did not run a quantitative similarity test (e.g., regression of revenue per employee or growth-adjusted multiples) — they picked the comparables by qualitative judgment. Establish: 'You chose these four because they felt similar, not because you ran a statistical test of similarity.'\n\n**2. The 'but-for' world is speculative.** Their model assumes the plaintiff would have achieved the yardstick companies' growth absent the breach. Walk through plaintiff's actual track record pre-breach — was plaintiff already underperforming the yardsticks? If yes (likely — that's why they're suing), the model overstates damages. Establish: 'Plaintiff's growth rate in the 24 months before the breach was X%. Three of your four yardsticks grew faster. How does your model account for that?'\n\n**3. No mitigation discount.** Damages must reflect plaintiff's mitigation efforts post-breach. Find what plaintiff did post-breach (replacement customers signed, alternative GTM, pivot). The model typically gives zero credit. Establish: 'Did you reduce your damages estimate to reflect that plaintiff signed [X new customer] in [year+1]? No? Why not?'\n\n**4. Discount rate (or absence).** Lost profits over 5 years must be discounted to present value at a defensible rate. Most yardstick models apply a too-low rate, or no rate at all. Ask: 'What discount rate did you apply to future damages? What's the basis for that rate vs the company's WACC or industry beta?' Many experts can't answer this credibly.\n\n**5. Tax effects ignored.** Lost-profits damages are typically taxable as ordinary income. Did the expert net out the tax effect? Most don't, which overstates the after-tax loss. Establish: 'Your $14M figure is pretax. Plaintiff would have paid roughly $X in federal and state income tax on those profits. The actual after-tax loss is closer to $Y, correct?'\n\n**6. Time period — why 5 years?** The damages period should be limited to a reasonable foreseeability horizon. Did the contract expressly contemplate a 5-year horizon, or is that the expert's choice? If it's the expert's choice, attack the duration. Establish: 'What in the contract or industry data supports your selection of a 5-year horizon rather than 3 or 7?'\n\n**Impeachment with their prior testimony / publications:**\n\nSearch their prior expert reports and academic work. Specifically look for:\n- Cases where they argued yardstick is unreliable (you'll find them — most experts have been on both sides at some point)\n- Articles they wrote endorsing more rigorous methods (Daubert criteria they didn't apply here)\n- Prior cases where their damages estimate was excluded or substantially reduced\n\nAsk for their CV; cross-reference to public court records via PACER. If they were excluded under Daubert in a prior case, that's a fact you can establish on cross even if you can't get the underlying order admitted.\n\n**Tactical note:** in this jurisdiction (assuming federal court), Daubert standards apply. You should consider filing a motion to exclude before trial. Even if you lose the motion, the briefing forces the expert to commit to a methodology you can then attack on cross. Want me to draft the Daubert motion or the cross-exam questions in deposition format?"
    ),
    pairs: ["legal", "operations", "founder"],
  },

  {
    slug: "devops",
    name: "DevOps / SRE Agent",
    short: "DevOps",
    department: "build",
    color: "#1d4ed8",
    oneliner: "Incident timelines, runbook generation, infra audits, post-mortems — keep the on-call rotation honest.",
    tasks: [
      { group: "Incident response", items: ["IR runbooks per severity tier", "Postmortem templates (blameless)", "Timeline reconstruction from logs", "Status-page comms drafts"] },
      { group: "Reliability", items: ["SLO/SLI definitions", "Error-budget policy drafts", "Chaos-engineering plans", "Capacity planning narratives"] },
      { group: "Audits + reviews", items: ["Infra security audits (cert / DNS / subdomain)", "AWS account audits", "Kubernetes security reviews", "Cost-optimization memos"] },
    ],
    starters: [
      { title: "P1 postmortem",   tagline: "Blameless, 4h outage",            prompt: "Write a blameless postmortem for a 4-hour P1 outage. Root cause: a database failover that didn't trigger because the health check was misconfigured during a recent deploy. Cover: timeline, customer impact, root cause + 5-whys, contributing factors, action items with owners + dates. Format like Stripe's published postmortems." },
      { title: "SLO design",      tagline: "Single-service SaaS",             prompt: "Design SLOs for a single-service B2B SaaS API. Cover: availability target (99.9 vs 99.95 — what's defensible), latency SLO (P95 < ???ms), error rate, freshness for any background processing. Include error-budget calculation and what the team should do when 50% / 75% / 100% of budget is burned." },
      { title: "AWS audit",       tagline: "Security + cost flags",           prompt: "Run a 1-page AWS security + cost audit for a small SaaS. Cover: IAM least-privilege red flags, public S3 buckets, security-group permissive rules, untagged resources, idle ELBs, oversized RDS, missing CloudWatch alarms. Output as a prioritized punch-list." },
      { title: "Status page",     tagline: "Mid-incident, user-facing",       prompt: "Draft the user-facing status-page update during an ongoing P2 incident. We've identified the issue (database connection-pool exhaustion), partial rollback is in progress, ETA 30 min. Tone: calm, specific, honest. No 'we are working on it'." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Write the postmortem for our 4-hour outage Tuesday. Root cause was a Postgres failover that didn't trigger because the health check was misconfigured.",
      "**Postmortem: Database failover failure — 4h customer-impacting outage**\n\n**Date:** Tuesday, [date]  \n**Duration:** 14:02 – 18:14 PT (4h 12m)  \n**Severity:** P1 (customer-facing, revenue-impacting)  \n**Author:** [SRE on-call] · **Reviewed by:** [Eng director, Customer team]\n\n## TL;DR\nOur primary Postgres instance experienced a hardware failure at 14:02 PT. The configured automatic failover to the standby did not trigger because the health check we relied on had been silently misconfigured during a deploy three weeks earlier. We manually promoted the standby at 18:09, restored writes at 18:14. Approximately 87% of write requests during the window failed; reads degraded but mostly succeeded due to read-replica caching. No customer data was lost. Estimated revenue impact: $42K in failed transactions, all of which were retried successfully by the upstream Stripe flow.\n\n## Timeline (PT)\n\n- **14:02** — Primary Postgres EC2 instance becomes unresponsive (hardware fault, confirmed by AWS event log)\n- **14:03** — RDS proxy starts returning connection errors. Datadog fires `db-primary-down` alert.\n- **14:04** — Expected failover does not occur (we discover later why)\n- **14:07** — On-call SRE acknowledges, begins triage. Sees primary is down, expects failover-in-progress.\n- **14:14** — On-call confirms standby is NOT being promoted. Pages secondary on-call + database lead.\n- **14:18** — Status page updated to 'investigating'. Customer-facing error message updated.\n- **14:31** — Team identifies that the health check controlling failover (`/internal/db-health`) is misconfigured (calls the wrong endpoint, never returns unhealthy)\n- **14:42** — Decision made to manually promote standby. Database lead pulled into incident.\n- **14:55** — Decision delayed pending review of latest read-replica lag (need to ensure no data loss). Read replica is 0 seconds behind. Cleared to promote.\n- **16:32** — Manual promotion blocked by an unrelated security-group rule preventing the standby from advertising itself. Team works through SG change.\n- **17:48** — Security group updated; standby promotion can proceed.\n- **18:09** — Standby promoted to primary. Writes resume.\n- **18:14** — Application fully healthy. Status page updated to 'monitoring'.\n- **19:01** — All systems normal. Incident closed.\n\n## Customer impact\n- **Affected customers:** approximately 4,200 (all writers on the platform between 14:02-18:14)\n- **Failed requests:** 87% of write requests in window (read traffic degraded 30% but mostly succeeded via read-replica)\n- **Revenue impact:** $42K in failed Stripe transactions; all subsequently retried successfully\n- **Data loss:** None — read-replica was 0 sec behind at the time of promotion\n- **CSAT impact:** 14 customer-support tickets filed; 6 high-value customers contacted by CSM proactively\n\n## Root cause\nThe automatic failover health check that triggers RDS standby promotion was misconfigured during a deploy on [date 3 weeks prior]. A refactor of the health-check endpoint caused the deployed `/internal/db-health` to always return 200 OK regardless of database state. Because the check never returned 'unhealthy,' the failover automation never triggered.\n\n## 5-whys\n1. Why did writes fail? Primary DB unresponsive.\n2. Why didn't we failover? Standby promotion didn't trigger.\n3. Why didn't promotion trigger? Health check never returned 'unhealthy.'\n4. Why was the health check broken? A refactor changed its behavior; no test caught it.\n5. Why was no test caught? We had no integration test that verified the health-check endpoint returned the right value for a *bad* DB state — only for a good one.\n\n## Contributing factors\n- The SG rule that delayed manual promotion was a separate latent issue we discovered only during incident response.\n- Our runbook for manual standby promotion was 18 months out of date.\n- The secondary on-call took 7 minutes to acknowledge — within SLA but at the high end.\n\n## What went well\n- Detection at 14:03 (within 1 min of failure)\n- Read replica had no lag, so promotion was data-safe\n- Communication via status page was honest and frequent (10 updates total)\n\n## Action items\n\n| # | Action | Owner | Due |\n|---|--------|-------|-----|\n| 1 | Add integration test: health endpoint must return 503 when DB is unreachable | [Eng lead] | 7 days |\n| 2 | Update standby-promotion runbook + dry-run once a quarter | [SRE lead] | 14 days |\n| 3 | Add monitoring on the health check itself ('check-the-checker') | [Platform] | 14 days |\n| 4 | Audit all health-check endpoints for the same flaw | [Eng lead] | 30 days |\n| 5 | Fix the SG rule that delayed promotion + add to disaster-recovery drill | [Platform] | 30 days |\n| 6 | Add a chaos test that kills the primary DB monthly | [SRE] | 60 days |\n| 7 | Customer follow-up: send $42K transaction list to finance; ensure all retried successfully | [Customer ops] | 7 days |\n\n## Lessons\n\n**For SREs:** any health check that drives critical automation must be tested in the failure direction, not just the happy path. We test 'returns 200 when healthy.' We didn't test 'returns 503 when unhealthy.'\n\n**For engineering:** any refactor of a controlling-automation endpoint should require manual review by the SRE on-call rotation before merge. We're adding a CODEOWNERS rule.\n\n**For incident commanders:** when an expected automation doesn't fire, treat that as a separate sub-incident. Investigate the automation in parallel with the original symptom. We lost ~15 minutes assuming failover was 'just slow.'"
    ),
    pairs: ["engineering", "operations", "product"],
  },

  {
    slug: "insurance",
    name: "Insurance Agent",
    short: "Insurance",
    department: "ops",
    color: "#0e7490",
    oneliner: "Policy review, claims analysis, benefits comparison, COBRA admin — US health, P&C, business insurance navigation.",
    tasks: [
      { group: "Health benefits", items: ["Plan comparisons (HMO/PPO/HDHP)", "COBRA notices + admin", "ACA reporting (1094/1095)", "FSA / HSA plan design"] },
      { group: "Business insurance", items: ["Cyber-liability policy review", "D&O coverage memos", "E&O / professional liability", "Workers' comp class-code audits"] },
      { group: "Claims + appeals", items: ["Denied-claim appeals (medical)", "Subrogation memos", "Coverage-dispute letters", "First-notice-of-loss drafts"] },
    ],
    starters: [
      { title: "Health renewal",    tagline: "Open-enrollment communication", prompt: "Draft an open-enrollment email to a 200-person workforce. We're keeping our medical (PPO/HDHP) carrier but the premium is up 14% and the deductible on the HDHP is up $500. Walk employees through the changes, the math, why we're keeping the carrier, and how to decide HMO vs PPO vs HDHP given their family situation." },
      { title: "Cyber-liability",  tagline: "Quote review, $20M ARR SaaS",    prompt: "Review this cyber-liability policy quote for a $20M ARR SaaS. Coverage: $5M limit, $50K retention. Look at: sub-limits (ransom, BI, regulatory defense), exclusions (war, prior acts, social engineering), claims-made vs occurrence, retroactive date. Flag the 5 things that would limit coverage in a real breach." },
      { title: "COBRA election",    tagline: "Departed employee, election period", prompt: "An employee was terminated last week. Draft the COBRA election notice that must go out within 14 days. Include: continuation period (18 vs 36 months by qualifying event), premium amount, election deadline, how to elect, what plans continue, dependents' rights. Match HHS Model Notice format." },
      { title: "Claim appeal",     tagline: "Denied medical claim",           prompt: "An employee's $40K surgery claim was denied as 'not medically necessary.' Draft the appeal letter. Cover: medical necessity citing AMA / specialty-society guidelines, prior auth issues, plan-language interpretation, ERISA timing rights, and a request for the case manager's contact for follow-up. Cite the plan SPD language." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Review this cyber-liability quote: $5M limit, $50K retention, claims-made, retroactive date matches policy inception. We're a $20M ARR SaaS handling US PHI.",
      "**Cyber-liability quote review — $5M / $50K — for a $20M ARR PHI-handling SaaS**\n\n**Overall: limit is light, structure is okay, 5 specific exclusions need attention.**\n\n## Limit sufficiency: light\n\nFor a SaaS handling PHI at your revenue scale, $5M limit is on the low end of the defensible range. Industry benchmark for healthtech at $20M ARR is $10-25M, depending on number of PHI records you hold. The math:\n- A typical PHI breach costs $400-700 per record (IBM/Ponemon benchmarks)\n- Notification + credit monitoring + legal: $50-100K minimum, regardless of breach size\n- HHS OCR fines: tiered ($141 to $71K per record, max $2.13M/year/category)\n- Regulatory defense (state AGs, FTC, OCR): $250K-$1M typical\n- Class-action settlement: increasingly common for PHI; $1-10M range\n\n**Recommendation:** push for $10M limit at the same retention if budget allows. If $5M is the cap, you're betting nothing major happens. Acceptable bet if your record count is <50K; risky above that.\n\n## Retention ($50K) — appropriate\n\nMatches your size. Bigger retention would lower the premium but $50K is well within your loss-absorption capacity.\n\n## Five exclusions that would limit coverage in a real breach\n\n**1. Prior acts exclusion (\"retroactive date\")**\n\nYou said the retroactive date matches policy inception. This is the single most dangerous structure for a SaaS. It means *any* incident with origin before the policy starts is excluded — including the unauthorized access that occurred 14 months ago and is discovered in month 3 of the policy. Common in industry. Push back: ask for a 2-year retroactive date, or 'full prior acts coverage' with a sub-limit. If the carrier won't budge, you must — must — disclose any known incident before binding.\n\n**2. Acts of war / nation-state attribution**\n\nMost cyber policies now exclude 'cyber acts attributed to a nation-state by competent authority.' Post-NotPetya, this is being aggressively litigated. If the FBI publicly attributes your breach to a Chinese or Russian APT, the carrier may invoke this. Push for affirmative coverage of nation-state acts when attribution is contested, or a sublimit on the war exclusion (some markets are doing $1-2M carve-outs).\n\n**3. Social engineering / fraudulent funds transfer**\n\nMost cyber policies sub-limit social engineering to $250K or exclude it entirely. If your CFO is phished into a wire transfer or your customer support team is duped into resetting a customer's auth, that's social engineering. Push for $1M+ sub-limit. Some carriers offer it as a separate crime endorsement.\n\n**4. Bring-your-own-device / unsecured endpoint**\n\nCheck if there's language excluding losses 'caused by use of unsecured personal devices.' This can become the carrier's escape if your incident traces to an employee's home laptop. Push for the exclusion to be limited to 'gross negligence' rather than 'any use.'\n\n**5. Regulatory defense sub-limit**\n\nMany policies sub-limit regulatory defense + fines to $1-2M, even within the overall $5M limit. For a HIPAA-regulated company, this is the most likely loss bucket. Ask: 'What's the sub-limit on regulatory defense and fines, including HHS OCR proceedings?' If it's under $3M, push harder.\n\n## What's missing from the quote you should ask about\n\n- **Notification expense sub-limit** — should be at least $1M\n- **PCI fines and assessments** (if you handle card data through Stripe or otherwise)\n- **Reputational harm / PR costs** — often a separate sub-limit\n- **BI (business interruption) waiting period** — should be ≤8 hours\n- **Ransom coverage** — including extortion that does NOT involve encryption (data theft + ransom)\n\n## Bottom line\n\nThe quote isn't bad — it's normal for a small SaaS quote. But for your record-count and regulatory exposure, you need to push for: (a) higher limit ($10M), (b) 2-year retroactive date, (c) social-engineering sub-limit, (d) regulatory defense $3M+ sub-limit, (e) clarification on nation-state exclusion. Reply asking for those 5 changes specifically; broker should be able to deliver 3 of 5 from the same carrier or shop to a different market.\n\nWant me to draft the email back to the broker, or build a side-by-side comparison if you have a competing quote?"
    ),
    pairs: ["legal", "finance", "operations"],
  },

  {
    slug: "cos",
    name: "Chief of Staff Agent",
    short: "CoS",
    department: "personal",
    color: "#c2410c",
    oneliner: "Exec briefings, OKR tracking, all-hands prep, meeting synthesis — the founder's force multiplier.",
    tasks: [
      { group: "Executive briefings", items: ["1:1 pre-reads + agendas", "Decision memos with options + tradeoffs", "Meeting synthesis (notes → decisions)", "Calendar audits + priority recommendations"] },
      { group: "Operating cadence", items: ["OKR review prep", "Weekly business review (WBR) decks", "Quarterly strategy memos", "Board meeting prep packages"] },
      { group: "Communications", items: ["All-hands scripts + Q&A prep", "Internal announcements", "Slack post-mortems for leadership decisions", "Crisis comms drafts"] },
    ],
    starters: [
      { title: "Decision memo",    tagline: "Build vs buy, with options",     prompt: "Write a 1-page decision memo for the CEO on whether to build our customer-facing search experience in-house or buy from Algolia/Typesense. Structure: situation, options (3), tradeoff matrix, recommendation, decision needed by [date]. CEO has 4 minutes to read." },
      { title: "All-hands script", tagline: "Q3 results, mixed quarter",      prompt: "Write a 15-min all-hands script for a CEO. Q3 was mixed: revenue +28% (great), but two enterprise renewals lost (bad), and the security incident we had in August is closed. Structure: open with hardest news, share what we learned, the Q4 bet, one hard truth, Q&A. Conversational." },
      { title: "Calendar audit",   tagline: "Where the CEO's time goes",      prompt: "Audit the CEO's last 4 weeks of calendar (200 meetings). Categorize each meeting by: type (1:1 / decision / external / recurring), priority (must-attend / could-delegate / could-decline), outcome (decision made / status / unclear). Output: time-allocation summary, top 10 meetings to push back to the team, and 3 patterns the CEO should change next month." },
      { title: "Board pre-read",   tagline: "Quarterly, focused on 3 asks",   prompt: "Write the cover memo for the quarterly board pre-read. Frame: 3 key asks of the board this quarter (intros for VP Sales, opinion on European expansion timing, approval for $5M growth equity). Use the rest of the pre-read to support these asks; don't bury them under metrics." },
    ],
    sample: TEMPLATE_SAMPLE(
      "Audit my calendar — I'm in 50 meetings/week and feel I'm losing the strategy thread. Help.",
      "**Calendar audit — pattern analysis from a 50-mtg/week founder**\n\n**The pattern (without seeing the actual calendar, this is what 90% of founders at this stage look like):**\n\n- **35-40% recurring 1:1s** with direct reports + skip-levels\n- **15-20% customer meetings** (founder-led sales / CS escalations)\n- **15% leadership team meetings** (Mon staff, exec offsite prep, board prep)\n- **10-15% external** (investor 1:1s, partner conversations, advisor calls)\n- **10-15% reactive** (incident response, support escalations, recruiting closing)\n- **5% strategy / thinking** time (usually first to get displaced)\n\nThis pattern destroys strategy capacity because the only category that's defended is the lowest-priority one (recurring 1:1s are protected; strategy thinking is what gets dropped).\n\n**The diagnosis without looking at the calendar:**\n\nYou're being treated by the org as the universal escalation path. Most of your meetings are scheduled by other people. You don't choose; you react.\n\n**Three changes that almost always work:**\n\n**1. Kill 30% of your recurring 1:1s.** If you have 1:1s with skip-levels, kill them. They burn 4 hours/week and produce mostly information you'll forget. Keep your direct-reports 1:1s, but make them 30 minutes not 60. Replace skip-level coverage with a quarterly skip-level dinner.\n\n**2. Implement an 'office hours' block of 2 hours / 2x a week for ad-hoc requests.** Anyone in the company can grab time. This consolidates the 17 'quick syncs' that get sprinkled across your calendar today. Net time saved: 4-6 hours/week.\n\n**3. Block 4 hours of 'strategy mode' on Monday morning before staff meeting.** No meetings allowed in that window. Use it to write — strategy clarity comes from writing, not from meetings. If you don't block it explicitly, someone will steal it.\n\n**The hard truth:**\n\nIf you can't protect 4 hours/week of strategy time, you're not operating as a CEO — you're operating as a senior IC + people manager. That's fine for 1-3 quarters in growth phases but is a 12-month problem. The way out is delegation, which requires you to trust someone enough to leave a meeting and not check. Pick the meeting category you can actually delegate (customer 1:1s? VP-of-X 1:1s? recruiting?) and stop attending for 4 weeks. See what breaks. Usually less than you feared.\n\n**One more thing:**\n\nThe top 10 meetings to push back to the team are almost always: (1) standing 1:1s with skip-levels, (2) customer Q&A calls where a VP could attend, (3) panel interviews for non-leadership roles, (4) investor 'update' calls where a quarterly investor update would suffice, (5) cross-functional 'syncs' that exist because nobody owns the decision they're trying to make, (6) status updates with vendors / partners, (7) team-level retros where you're observer not participant, (8) recruiter pipeline reviews, (9) tool / vendor demos, (10) post-hoc 'just to align' meetings about decisions already made.\n\nWant me to draft the email to your team explaining that you're going on 'office hours' mode for the next month, or the prioritization framework you'll use to evaluate which 1:1s to keep?"
    ),
    pairs: ["founder", "ir", "pm"],
  },
];
