---
title: "Hello world — why we built qwriter"
description: "Most AI writing tools take a prompt and guess. We wanted one that starts from what's already true on your customer's site. This is the post that explains why."
author: "Vikas"
publishedAt: 2026-05-24
tags: ["product", "intro"]
---

We've used every AI copywriting tool out there. They all have the same shape:
type a prompt, get something generic, edit aggressively, ship.

The problem isn't the model — modern LLMs write fine prose. The problem is
**context**. They don't know what's already on the customer's site, what
claims have been made, what the existing brand voice sounds like.

So we built qwriter around a different default: **scan the customer's site
first, then write**. Every generation footed with which pages contributed.

## What's different

1. **Sub-second site scans** via our own crawler infrastructure (crawlcrawl.com).
2. **Source picker** per generation — check the pages this batch should reference.
3. **Variant grid** with attribution footer: "Grounded in studiobirch.com + 2 pages · 32 facts detected".
4. **No vendor lock-in on tokens** — bring your OpenAI key (Pro+) or use ours.

## Stack

- Rust + Loco + Tera (server-rendered HTML)
- Hotwire (Turbo + Stimulus) for interactivity
- Trix editor in the document surface
- Cloudflare Pages for the marketing site you're reading

It's an opinionated stack chosen for one reason: **less JavaScript, fewer
broken interactions, more time spent on the copy itself**.

Try it free — [start a workspace](/signup).
