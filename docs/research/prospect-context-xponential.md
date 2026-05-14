---
version: "0.3-draft"
author: "@presailor"
date: "2026-05-12"
generator: "miriad"
skills:
  - sanity-presales (v2026-05-13)
  - sanity-messaging
  - miriad-conventions
sources:
  - "/.attachments/4d39104b-78dc-463e-8db9-0ac5f7c9d20d/Sanity & Xponential - (gong highlights) - 2026-05-11.md — Gong call highlights, Derek/Kevin intro"
  - "/.attachments/4d39104b-78dc-463e-8db9-0ac5f7c9d20d/Sanity & Xponential - full transcript - 2026-05-11.md — Full Zoom transcript, 30 min, 2026-05-11"
  - "/.attachments/4d39104b-78dc-463e-8db9-0ac5f7c9d20d/Sanity & Xponential - Introduction (gong overview) - 2026-05-11.md — Gong overview, pain points, current solutions"
  - "/.attachments/4d39104b-78dc-463e-8db9-0ac5f7c9d20d/Sanity & Xponential -AE Notes - 2026-05-11.md — Derek's AE notes"
  - "Web enrichment 2026-05-12 — Xponential corp (NYSE: XPOF), Kevin Cherdchaithamrong LinkedIn, recent news"
  - "Integration pattern survey 2026-05-12 — Salesforce, HR docs, ticketing"
  - "AE post-call update 2026-05-12 — multi-brand scope confirmed, intranet use cases (internal docs/press releases/legal), HubSpot for CRM signal, integration central"
  - "Dale Zhang 123Dentist demo notes (Sanetti env) — multi-brand exemplar reference"
  - "sanity-presales skill v2026-05-13 — integration scope cluster, Functions/Blueprints primitives, downstream-artifacts pattern, MEDDPICC mapping"
salesforce_opportunity: "https://sanityio3.lightning.force.com/lightning/r/Opportunity/006aV00000p4QoAQAU/view"
changelog:
  - "0.1-draft (2026-05-12) — Initial synthesis from Derek/Kevin 2026-05-11 intro call + corp/stakeholder enrichment + integration pattern survey."
  - "0.2-draft (2026-05-12) — Post-AE-update: multi-brand scope confirmed in-scope, intranet use cases nailed, HubSpot reframed as CRM/CMS split, non-dev authoring elevated, integration positioned as demo pillar, Sanetti env referenced."
  - "0.3-draft (2026-05-12) — Restructured to sanity-presales v2026-05-13 template: house section headings (Deal situation summary, Prospect requirements, Risks and considerations from the SE perspective), Functions/Blueprints integration primitives named (Document Function, Scheduled Function, Sync Tag Invalidate Function), Function execution/rate limits captured for scale-question reserve, Sanity angle section consolidated, integration discovery questions clustered with queryable-vs-referenced fork applied to each system, MEDDPICC coverage noted in buying-process gaps."
  - "0.4-draft (2026-05-13) — Rolled in podcast-intel derived implications from @dairim/@podracer Geisler/Sequel research (v5 appended section stays as the source record). Phase 1 reframed as institutional-memory infrastructure for a depleted exec bench (Sequel poaching list: President, COO, brand presidents, finance, real estate). Phase 2 scrubbed of unified-cross-brand-journey language since Geisler publicly buried XPASS in April 2026 — leaned harder into brand-by-brand microsites + campaign LP replacement + HubSpot CMS + custom landing-page tool TCO consolidation. Strategic-alternatives risk mitigation reframed: position Sanity as consolidation-friendly infra that survives org change, not net-new strategic spend. New risk added: thin brand-team headcount post-Sequel."
demo:
  date: "Thu 14 May 2026"
  exemplar_reference: "Sanity multi-brand demo environment (Sanetti). @allanwhite owns env access for the assigned SE."
---

# Prospect Context — Xponential Fitness, Inc.

## Company

```yaml
company: "Xponential Fitness, Inc."
industry: "Fitness / Health & Wellness"
sub_vertical: "Boutique fitness franchising (multi-brand holding co.)"
size:
  employees: "~340 corporate (franchise network significantly larger)"
  revenue: "Public company, NYSE: XPOF — Q1 2026 results filed 2026-05-06"
  footprint: "US-headquartered, global franchise footprint"
hq: "Irvine, CA"
ticker: "NYSE: XPOF"
ceo: "Mike Nuzzo (appointed August 2025)"
brands_in_portfolio:
  - "Club Pilates"
  - "Pure Barre"
  - "StretchLab"
  - "YogaSix"
  - "BFT"
recent_divestitures:
  - "Row House (divested 2024)"
```

**Strategic context.** Public franchise holding company in the middle of a leadership and strategic transition. New CEO (Aug 2025), CFO transition (March 2026), and the board initiated a **review of strategic alternatives to maximize shareholder value** in April 2026. That review can lead to sale, take-private, restructuring, or status quo; either way it freezes appetite for net-new platform commitments at the corporate level until the path is clearer. This is roughly six weeks old as of the AE call.

## Deal situation summary

```yaml
deal:
  stage: "Discovery"
  ae: "Derek McDonald"
  se: "TBD (Derek to request SE for next call)"
  meeting_type: "Demo (post-AE intro)"
  meeting_date: "2026-05-14 (Thu)"
  salesforce_opportunity: "https://sanityio3.lightning.force.com/lightning/r/Opportunity/006aV00000p4QoAQAU/view"
arr_signal:
  ae_quoted_range: "$80K–$100K annual"
  caveat: "Derek anchored this range unprompted before discovery on scale, integrations, or brand-side scope. See risks."
scope_position:
  phase_1: "Internal intranet — Q3 2026 stand-up target. Standard tier."
  phase_2: "Multi-brand corporate sites + campaign landing pages. High tier. Confirmed in-scope by Sanity per 2026-05-12 AE update."
  position_summary: "Phase 1 is the entry point; Phase 2 is where the platform fee earns the budget conversation."
```

Kevin Cherdchaithamrong, Sr. Director of Engineering and UX Lead, found Sanity through a colleague referral. He is evaluating Sanity for an internal intranet — Xponential has no intranet today — with a target to stand it up by the start of Q3 2026. Beneath that immediate project sits a larger consolidation opportunity. Xponential's brand sites run on HubSpot CMS in a page-based, non-component-reusable structure, augmented by a custom-built campaign landing-page tool that Kevin describes as inflexible and expensive. Kevin does not want to displace HubSpot CRM. He does want a better content layer, with the same platform serving the intranet now and the brand sites later. Derek quoted $80,000 to $100,000 ARR on the introductory call, before scope was qualified.

## Known pain points

Direct from Kevin on the 2026-05-11 call, supplemented by the AE "what we heard" notes (2026-05-12):

```yaml
pain_points:
  - "No intranet today — internal comms, newsletters, press releases, HR resources, internal docs, and ticketing are not consolidated; needs to integrate with HR and ticketing systems via API"
  - "HubSpot CMS is page-based, not component-based — no content reusability across the corporate marketing site (separate from HubSpot's CRM use, which is staying)"
  - "Campaign landing pages are generated by a custom-built tool inside HubSpot that Kevin describes as inflexible and 'paying for the tool' — friction is both technical and economic"
  - "Brand sites are fragmented across the portfolio (Club Pilates, Pure Barre, StretchLab, YogaSix, BFT) with no shared content model — corporate wants to consolidate"
  - "Franchisee communication is one-way from corporate but lacks a clean push channel today — 'we don't want too many cooks in the kitchen'"
  - "Non-developer authoring is constrained — marketing and HR teams need to create and publish content independently, with guardrails so they can't break layouts or page structure"
```

## Prospect requirements

```yaml
use_case_fit:
  portal:          true    # Internal intranet — Phase 1, immediate
  content_hub:     true    # Multi-brand sites + campaign landing pages — Phase 2, in-scope for the platform conversation
  consolidation:   true    # Long-term: replace HubSpot CMS + custom landing-page tool, consolidate brand stacks
tier:
  primary_use_case: "Internal intranet — Standard tier (lighter POC, fast to stand up by Q3)"
  secondary_use_case: "Multi-brand marketing + campaign landing pages — High tier (full content-ops story, where the deal lives)"
narrative_arc: |
  Land on intranet (low-stakes, fast time-to-value, Q3 2026 target).
  Show in the same demo that the same platform handles the brand-side at scale.
  The deal economics live in Phase 2; the trust-building lives in Phase 1.
```

**Phase 1 — internal intranet (immediate).** Greenfield. Consolidate internal communications, newsletters, press releases, internal documents, and legal content. Integrate with the HR system (vendor unconfirmed) to surface the employee handbook and HR documents through an API. Integrate with the ticketing platform (vendor unconfirmed). Target stand-up by the start of Q3 2026.

*An additional framing available to the SE if Kevin opens the door:* the intranet is institutional-memory infrastructure for a leadership and executive bench that lost significant tenure in 2025. Anthony Geisler (founder, departed early 2025) took his President, COO, multiple brand presidents, and senior finance/real-estate/retail staff with him to Sequel Brands. Where knowledge previously lived in people, it now needs to live in a system. This framing depends on Kevin or a teammate raising the leadership-transition theme; do not lead with it. See podcast-intelligence section for sourcing.

**Phase 2 — brand-by-brand corporate sites and campaign landing pages (Kevin's "long term" framing).** Replace HubSpot CMS for brand-site content, brand by brand. Replace the custom landing-page tool with a flexible, schema-driven pattern. Corporate-controlled communications pushed one-way to franchisees. A one-content-lake-many-studios model fits the brand-by-brand operational reality (Club Pilates, Pure Barre, StretchLab, YogaSix, BFT each operating distinctly) without forcing a unified-consumer-journey narrative the current leadership has publicly stepped away from. The story is TCO and engineering velocity across five brands, not a cross-brand consumer experience.

**Kevin's own framing on expansion** (transcript ~18:33): *"We're not worried about the brands right now… brands, we're not considering that right now, but it's just more long term that if we want to start consolidating technology, then the intranet would be at least a seed or the starting point."*

## Competitive context

```yaml
competition:
  incumbent_cms: "HubSpot CMS (brand marketing) + custom-built landing-page tool (campaigns) + no intranet (greenfield)"
  incumbent_crm: "HubSpot (CRM) — STAYING; we are not displacing"
  also_evaluating:
    - "HubSpot (status quo / expansion) — explicitly named by Kevin as a comparison point for pricing"
    - "WordPress, Sitecore — mentioned by Kevin as the kind of 'full-blown CMS' he wants to avoid"
  no_active_headless_competitor_named: true
positioning_stance:
  short: "Displace HubSpot CMS, integrate with HubSpot CRM."
  long: |
    HubSpot is good at CRM. We are not trying to take that away. The content
    side — page-based authoring, the inflexible campaign landing-page tool,
    no component reuse, no real intranet — is where Sanity is the better fit.
    Demonstrate the integration path so Kevin sees HubSpot CRM and Sanity
    coexisting, not Sanity replacing HubSpot wholesale.
```

Kevin came in with a developer background and conceptual familiarity with headless. The real competition is **status quo HubSpot + do-nothing on intranet** because the intranet has admitted low ROI and an unapproved budget. A separate competitive analysis lives at `/competitive-analysis-hubspot-vs-sanity-content.md`.

## Stakeholders

```yaml
stakeholders:
  - name: "Kevin Cherdchaithamrong"
    title: "Sr. Director of Engineering — UX Lead"
    role: "Technical champion (probable) / technical evaluator"
    notes: |
      Self-identified as a developer ("I'm also a developer before"). Conceptually
      sold on headless. Drove this evaluation — found Sanity via a colleague's
      referral. Cares about ease of adoption for non-developer marketers,
      integration breadth (Salesforce, HR, ticketing), and avoiding "full-blown CMS"
      patterns. Cost-conscious for the intranet phase specifically.
    email: ""
    linkedin: "https://www.linkedin.com/in/kevin-cherdchaithamrong-66057b33/"
    prior: "Amazon (per ContactOut, Dec 2024); UC Irvine"
    last_verified: "2026-05-12"
  - name: "Mike Nuzzo"
    title: "CEO"
    role: "Economic buyer (eventual / by reference)"
    notes: |
      Appointed August 2025. Board initiated strategic alternatives review April 2026.
      Not in this conversation, but his strategic agenda is the gating factor on
      anything corporate-wide.
    last_verified: "2026-05-12"
  - name: "(unnamed) Marketing leader"
    title: "TBD"
    role: "Potential influencer — Kevin floated bringing marketing into the next demo"
    notes: "Kevin: 'I might also bring in some of our, maybe just some [folks] from marketing.' Not yet identified."
    last_verified: "2026-05-12"
```

**Stakeholder gaps.** No economic buyer, no franchise/brand leader, no IT/security contact yet. Procurement, security review, and integration owners (Salesforce admin, HR admin, ticketing owner) all absent. Critical to surface in the demo and follow-up.

## Key people context

Light on this prospect. Kevin is not a public figure and Mike Nuzzo is too new in seat (Aug 2025) to have a public content trail on technology strategy. The strategic-alternatives review (April 2026) is the louder signal: shareholder-value language typically tightens discretionary spend and lengthens approval cycles for new vendor commitments, especially anything net-new like an intranet that Kevin himself flagged as "very low ROI." Worth tracking the 10-K and investor calls for any signal on platform consolidation.

## Sanity angle

Kevin's own words point the way. He said:

- *"It's just going to be so much leaner than to utilize something like a full blown CMS"* — already convinced on the headless model. Don't oversell architecture; show it working.
- *"How easy is it to maybe integrate with more of like maybe we have some custom features that we wanted to develop?"* — integration is central, not peripheral. The demo lands on Salesforce, HubSpot CRM, HR documents, and ticketing as real workflows; show examples and integration points, no need to build live.
- *"Easy to adopt… something to stand up and basically start testing by the beginning of Q3"* — time-to-first-value is the win condition. Show stand-up speed, Studio configurability, and the editor experience for non-developers.
- *"We don't want too many cooks in the kitchen"* on franchisee content — governance, roles, and a clean corporate-to-franchise content push model. The 123Dentist demo's network-visibility + custom-role + read-only-plus-comment patterns map directly.
- *"Guardrails"* — Kevin used the word twice. Schema-as-code + custom roles + AI instructions + approval workflows are all guardrails by another name.

What Sanity offers, in his terms: a content model defined as code so the schema *is* the guardrail; a Studio that gives marketing and HR teams a structured editor without the freedom to break layouts; an API-first content layer that connects to HR, ticketing, Salesforce, and HubSpot CRM through standard Document Function and webhook patterns; multi-brand support so the intranet and the brand sites share one content lake and one operational model. The Phase 1 intranet doubles as institutional-memory infrastructure for a leadership team rebuilt over the past year — that framing is available if Kevin raises the leadership-transition theme. The Phase 2 economics — replacing HubSpot CMS and the custom landing-page tool across five brands, brand by brand — are what make the platform commitment worth the budget conversation. The intranet is the entry point.

What we want Kevin to feel after the demo: *"I can stand this up by Q3 with the integrations I named, and when we're ready, the same platform handles the brands."*

## Sanity pillar alignment

| Pillar | Prospect alignment |
|--------|--------------------|
| **Model your business** | Xponential is a multi-brand franchise operator with distinct content needs across corporate, brand, and franchise audiences. Sanity lets one team build the content model once — for intranet pages, brand sites, and campaign landing pages — and reuse it everywhere. HubSpot's page-based structure is the explicit pain Kevin called out; modeled content is the direct answer. Guardrails for non-developer authoring come from the schema, not from policy. |
| **Automate everything** | The integration story (HR documents, ticketing, Salesforce data, HubSpot CRM events) and the campaign-landing-page workflow that today depends on a custom tool both reduce to the same question: how much of the content pipeline can be automated end-to-end? Document Functions on content events, Scheduled Functions for cron sync, content releases for campaign calendars, and Content Agent for variant generation turn the custom landing-page tool into a repeatable, governed pattern marketers can run without engineering. |
| **Power anything** | Today: an intranet for corporate employees, plus a controlled push to franchisees. Tomorrow: brand sites, campaign landing pages, newsletters, possibly mobile and signage in the studios. One content lake, every surface. Kevin already framed the intranet as "the seed or starting point" for consolidation. |

## What to demo on Thu 14 May — mapping 123Dentist to Xponential

The 123Dentist demo Dale Zhang has run (Sanetti environment) is the closest analog. The framing translates to Xponential as follows.

| 123Dentist demo section | Xponential mapping | Why it lands |
|---|---|---|
| **Content approval workflow + custom roles (legal team read-only + comment)** | Intranet legal/press-release/HR governance | Kevin's "too many cooks" line. Press releases and legal need explicit review chains. |
| **Comments + version history (Google Docs-like inline)** | HR and legal teams used to suggesting via comments, not direct edits | Ankit's "this should ease adoption" reaction is what the SE wants from Kevin's marketing colleague if one joins. |
| **Content Releases / scheduling (Invisalign Day pattern)** | Brand campaign calendar + Phase 2 multi-brand campaign push | Kevin's "campaigns running across studios… big campaigns updated 3-4 times a year" maps cleanly. |
| **Network-level visibility — filter by assignee/location** | Corporate visibility across brands and franchisees; one-way push model | Corporate-controlled franchise communications. Plants Phase 2 without leaving the intranet narrative. |
| **Content Agent (400-clinic variant generation with style-guide constraints)** | Per-brand campaign variants at scale across studios; brand-voice guardrails | Strongest Phase 2 anchor. Plant even if Kevin doesn't ask. |
| **AI knowledge docs / brand-voice guardrails** | Direct match to Kevin's word "guardrails" | Differentiates from standalone tools like Claude that don't know the schema. |
| **Field-level localization** | Optional — flag only if a brand has Spanish/regional needs | Not a primary fit. Mention briefly only if a discovery question surfaces it. |

**Demo sequence suggestion** (SE's call): start in intranet content (press release / legal doc) → approval workflow + custom roles → comments + version history → switch context to multi-brand environment to plant the Phase 2 story → network-level visibility filter → Content Releases (frame as campaign calendar) → Content Agent + AI guardrails → integration patterns walkthrough (no live build).

**Logistics flag for SE.** Sanity has a multi-brand demo environment (Sanetti) shown to other prospects. @allanwhite is arranging access for the assigned SE. The Phase 2 narrative holds either way.

## Integration story for Thu

Per the AE update: integration is now central, but technical proof is **examples, docs, and stories — not live builds.** The Sanity-side primitives to name are **Functions** (the code that runs on content or schedule events) and **Blueprints** (the configuration that describes when and where they trigger). Functions deploy via Blueprints; that is real implementation work and not slideware, so Thursday is about walking the pattern, not building it.

**Recommended elements for the SE's consideration:**

1. **Walk the architecture pattern.** Sanity sits as the content layer. Salesforce, HubSpot CRM, the HR system, and the ticketing platform each connect through APIs. The Sanity-side primitives to name:
   - **Document Functions** for content events (publish a press release, trigger a HubSpot workflow).
   - **Scheduled Functions** for cron-style sync (nightly pull of HR documents).
   - **Sync Tag Invalidate Functions** for cache and CDN refresh on the consuming front end.
   - **Media Library Asset Functions** for asset-related workflows.
   - External webhooks calling into Sanity, and on-demand GROQ queries from the consuming app, are also valid patterns. The question is which side initiates.

2. **Two concrete examples to keep ready:**
   - Salesforce → Sanity: a customer-story or doc reference showing data sync into a Sanity document type via a Scheduled Function or webhook-triggered Document Function.
   - Ticketing/HR → Sanity: the same sync-vs-reference fork applied (queryable in Sanity vs. referenced).

3. **Be transparent about plugin availability.** No Sanity-native plugin exists for Salesforce CRM, HubSpot CRM, HR systems (Rippling, Pebble, Workday, BambooHR), or ticketing platforms (Jira, Zendesk, ServiceNow). All four are standard custom integrations using Functions and Blueprints.

4. **The scoping fork (single most useful discovery question).** For each integration: queryable inside Sanity (synchronization pattern, richer but more infrastructure), or referenced by ID from source of truth (input plugin pattern, simpler but less queryable)? That single answer drives architecture for nearly any integration.

**A consideration for scale questions.** Functions have execution limits (10s default, 900s maximum), size limits (200MB), and rate limits (200/30s per document, 4000/30s per project). High-volume sync, long-running transforms, or burst patterns may need to be designed as batches, queues, or pulled from the consuming app rather than pushed from Sanity. Worth holding in reserve if Kevin asks scale questions, especially around the 36M (or 36B?) visitors number.

## Discovery gaps

Clustered to match the sanity-presales v2026-05-13 framework. The buying-process cluster covers the MEDDPICC items most at risk (economic buyer, decision process, paper process, competition).

```yaml
discovery_gaps:
  - category: "integration"
    question: "Salesforce. Vendor confirmed; shape unconfirmed. Data sync into Sanity, embed inside Experience Cloud, surface Sanity content in Salesforce UI, or contact/account ID reference only? Direction (read, write, both)? Expected volume?"
  - category: "integration"
    question: "HubSpot CRM. What flows Sanity → HubSpot (form submissions, lead attribution, content-event triggers via Document Function)? What flows HubSpot → Sanity (personalization signals, audience data)?"
  - category: "integration"
    question: "HR system vendor — Rippling, Pebble, Workday, BambooHR, or other? Once known, queryable inside Sanity (sync via Scheduled Function) vs. referenced from HR system (input plugin)?"
  - category: "integration"
    question: "Ticketing platform vendor — Jira, Zendesk, ServiceNow, or internal? Display ticket data inline (sync) or link out (reference)? Real-time or scheduled sync acceptable?"
  - category: "technical"
    question: "Traffic scale clarification. Kevin said '36,000,000,000 visitors' in the transcript and the Gong overview says '36 million.' Which is correct? Per brand or aggregate? Drives CDN sizing and pricing math; also drives Function-volume design."
  - category: "technical"
    question: "Front-end framework — Kevin said 'not at all' on hosting; what about framework? Next.js, Remix, Astro? Influences quickstart and onboarding."
  - category: "technical"
    question: "Campaign landing page tool — what is it actually? Built by whom, doing what, costing how much, outputs (page templates, form integrations, tracking)?"
  - category: "buying_process"
    question: "Economic buyer identification. Kevin's manager, VP Engineering, CTO, or CIO? Confirm name, title, decision authority. (MEDDPICC: E)"
  - category: "buying_process"
    question: "Budget approval path. Kevin said budget is 'not approved.' Who approves at $80–100K? Procurement / security review process and timeline? (MEDDPICC: D, paper process)"
  - category: "buying_process"
    question: "Strategic-alternatives review effect. How does the April 2026 review affect IT/platform spending authority? Freeze, slowdown, or guidance to defer net-new commitments? Material to deal velocity."
  - category: "buying_process"
    question: "Comparison process — is HubSpot expansion a real alternative being priced, or just a mental anchor? Anyone else being evaluated formally? (MEDDPICC: C, competition)"
  - category: "stakeholder"
    question: "Marketing stakeholder Kevin is considering bringing in — title, role in decision, content-ops maturity?"
  - category: "stakeholder"
    question: "Franchisee/brand leader — who owns franchisee communication today? They'll matter for Phase 2."
  - category: "stakeholder"
    question: "Security / IT — SSO/SAML, data residency, SOC 2 requirements? Is there a security review process for SaaS vendors?"
  - category: "timeline"
    question: "What does 'beginning of Q3' mean in their fiscal calendar? Stand-up = signed contract, kickoff, or live to users? What is the actual gate?"
  - category: "competitive"
    question: "Colleague referral — who, where they used Sanity, what was the experience? Proof point or watch-out."
```

## Risks and considerations from the SE perspective

```yaml
risks:
  - title: "Pricing anchor set before discovery"
    severity: "medium-high"
    detail: |
      Derek quoted $80K–$100K ARR on the intro call before scale, integrations,
      or brand-side scope were qualified. Kevin acknowledged ("annual basis. okay")
      without pushback but is comparing against HubSpot. If SE-led scoping
      surfaces volume or integration scope that pushes pricing above $100K,
      that's a re-anchor against a known number.
    mitigation: |
      A suggested approach for the Thu call: separate "intranet phase 1"
      pricing from "platform with brand expansion" pricing. Position the
      $80–100K as a Phase 1 number, not a ceiling. Use scale-clarifying
      questions early so the price/scope frame moves with the discovery.
  - title: "Strategic-alternatives review at Xponential (April 2026)"
    severity: "medium-high"
    detail: |
      Board review of strategic alternatives, recent CEO change, recent CFO
      separation. Net-new SaaS commitments in this window often slow or stall.
      Kevin himself is operating bottom-up; the gating question is what budget
      and approval authority survives the review.
    mitigation: |
      The SE may want to probe buying process directly. Confirm whether Kevin's
      department has signing authority at this ACV, or whether it needs CFO /
      CIO / CEO approval. If the latter, deal velocity is at risk and it's
      better to know now.
      Positioning that fits the moment: Sanity is consolidation-friendly
      infrastructure that survives org change and reduces TCO by replacing
      HubSpot CMS plus the custom landing-page tool. That story holds under
      most outcomes of the strategic review (sale, take-private, restructuring,
      status quo) because each scenario benefits from lower vendor count and
      operational leverage across brands. Avoid strategic-transformation framing.
  - title: "Integration discovery is shallow — and now central"
    severity: "medium"
    detail: |
      Four named integrations (Salesforce, HubSpot CRM, HR, ticketing), zero
      scoped. No Sanity-native plugin for any of them; all are standard custom
      integrations using Functions and Blueprints with the same queryable-vs-
      referenced fork. Integration is now a demo pillar, which raises the stakes
      for the SE's narrative.
    mitigation: |
      Bring the integration discovery questions into the Thu call. Walk the
      architecture pattern with concrete examples. Avoid promising specific
      plugins or live builds without scoping the direction and queryability
      of each.
  - title: "Low-ROI framing on the lead-in project"
    severity: "low-medium"
    detail: |
      Kevin himself called the intranet 'very low ROI' and budget 'kind of low.'
      That's the foot in the door, not the deal. If the conversation stays
      stuck on intranet economics it will be hard to justify the quoted ARR.
    mitigation: |
      Framing the intranet as Phase 1 of a platform consolidation play is one
      approach. The ROI sits in the eventual replacement of HubSpot CMS + the
      custom landing-page tool + brand fragmentation, not the intranet itself.
      The Sanetti multi-brand visual is the unlock for this conversation.
  - title: "Marketing voice absent"
    severity: "low"
    detail: |
      Kevin is an engineering leader. The marketer use case is central to the
      pitch, but no marketing stakeholder is in the conversation yet.
    mitigation: |
      Encouraging Kevin to bring a marketer to the demo, as he already offered,
      is one available move. If a marketer joins, recalibrating the opening to
      lead with the editor experience may serve the conversation better.
  - title: "Thin executive and brand-team bench post-Sequel"
    severity: "low-medium"
    detail: |
      Anthony Geisler's 2025 departure to Sequel Brands took the President, COO,
      multiple brand presidents, and senior finance/real-estate/retail staff
      with him. Brand-level teams may be thinner than the public org chart
      suggests. Implications: (1) the marketer Kevin offered to bring may be
      one of a small group, not part of a deep brand-marketing org; (2) ICs
      may be wearing more hats than their titles suggest; (3) institutional
      knowledge gaps are likely real, not hypothetical.
    mitigation: |
      Worth confirming brand-team headcount in discovery without naming Sequel.
      "How is the marketing function staffed across the brands today?" is a
      neutral question. The institutional-memory framing in Phase 1 lands
      better with a real headcount picture.
  - title: "HubSpot CRM/CMS mental model confusion"
    severity: "low-medium"
    detail: |
      Sanity's stance is "displace HubSpot CMS, integrate with HubSpot CRM."
      That distinction is clear inside the team. It may not be clear to Kevin
      or to a marketing colleague who thinks of HubSpot as one product.
      If the conversation blurs, the prospect may hear "you want to rip out
      our whole HubSpot stack."
    mitigation: |
      A direct statement early in the demo may help: "We're not replacing your
      CRM. We're replacing the page-based content side and connecting cleanly
      to HubSpot CRM for forms, lead routing, and marketing automation."
      The competitive analysis at /competitive-analysis-hubspot-vs-sanity-content.md
      is the SE's mental map; not for the prospect.
```

## Notes

- **Two numbers conflict.** Kevin's spoken "36,000,000,000 visitors" (transcript 28:50) vs. Gong overview's "36 million." 36B is implausible for a single brand; 36M is plausible peak traffic. Confirm live — drives CDN consumption modeling and Function-volume design.
- **Sanity awareness path.** Kevin found Sanity via a colleague referral. Worth asking who, where they used Sanity, and what their experience was. Becomes either a strong proof point or a watch-out depending on the answer.
- **Digital Stack.** Xponential uses Digital Stack for franchise digital marketing optimization. Not a CMS, not a Sanity competitor. Worth a brief acknowledgment to avoid talking past the existing relationship.
- **Time pressure is real but mild.** "Beginning of Q3" with a "not too long, not too short" framing — meaning Kevin is not under existential delivery pressure. The window is real but allows for a properly scoped POC.
- **Demo opening posture.** Kevin is a developer. Opening with Studio configurability and schema-as-code, then moving to the editor experience as the proof for non-developer marketers, is one available sequence. If a marketer joins, recalibrating live to open with their authoring experience for the first ten minutes is another.
- **Companion artifacts.** Human-readable brief at `/research/Prospect Context — Xponential (brief).md`. Competitive analysis at `/competitive-analysis-hubspot-vs-sanity-content.md`. AE pre-call brief at `/planning/ae-precall-brief-xponential.md`.

## Podcast intelligence (added 2026-05-13)

**Source:** Podcast discovery + transcription of two Anthony Geisler interviews (Future of Fitness 2026-02-20, Fitt Insider #336 2026-04-27). Generated in #podcast-discovery by @podracer. Full analyses + SE prep brief at `/research/xponential/` in #podcast-discovery (~14KB synthesized brief, ~58KB underlying analyses).
**Tagged sources:**
- `podcast-discovery/research/xponential/deliverables/se-prep-brief-geisler-sequel.md` (synthesized SE briefing, ~10 min read)
- `podcast-discovery/research/xponential/transcripts/geisler-sequel-fitt-insider-336.analysis.md`
- `podcast-discovery/research/xponential/transcripts/geisler-sequel-five-brands-future-of-fitness.analysis.md`

### High-level observations about the business

- **The founder Xponential lost is running a direct competitor.** Anthony Geisler (founder/CEO 2017 through his early-2025 suspension/resignation) now runs **Sequel Brands** — a private, debt-free, 100%-owned 5-brand boutique fitness + longevity platform (Pilates Addiction, iFlex, BEAM, Body20, Ultimate Longevity Center). He took his executive bench with him: President, COO, multiple brand presidents, finance, accounting, real estate, retail.
- **Implication for the team Kevin is selling Sanity into:** brand-level teams may be thinner than the public org chart suggests. Worth asking about brand-team headcount in discovery. Phase 1 intranet can be reframed as *institutional memory infrastructure for a depleted exec team*, not just HR docs and ticketing.
- **Geisler publicly buried XPASS / cross-brand-consumer strategy in April 2026.** Whatever Phase 2 looks like inside Xpo, the "unified cross-brand consumer journey" narrative is not where the energy is. Brand-by-brand microsites + campaign landing-page replacement is the safer demo flow.
- **The April 2026 strategic-alternatives review is consistent with Geisler's "public-market trap" thesis on tape.** Frame Sanity as **consolidation-friendly** infra that survives org change and replaces HubSpot CMS + the custom landing-page tool on TCO. Don't sell strategic transformation; sell engineering velocity + multi-brand operational leverage.
- **FTC-settlement / Capitol-Forum context is loud.** Geisler is on-tape defending Xpo's franchisee record ("92% of 6,000 happy"). Sanity's content-governance, approval workflows, audit trail, and version history are *more* valuable post-FTC — but **let Kevin raise compliance themes; don't lead with them**.
- **Boutique-fitness category is moving toward longevity/wellness.** Geisler cites UBS "$8T longevity market in 48 months," Equinox's $40K longevity membership as proof of demand. Xpo's current mix (Pilates, Barre, Stretch, Yoga, BFT) lacks the clinical/recovery layer. A platform built now is what lets Xpo launch a new modality fast — plant the seed once, don't push it.

### High-yield Geisler quotes (SE internal only — do not surface)

> **"Yeah, don't go public."** — Geisler when asked what he'd do differently at Xponential. *Future of Fitness, ~10:35.*
> *Sharpest line in either episode. Calibrates that the conversation is happening in the shadow of a founder rebuilding "the better version" privately.*

> **"There was some discussion there at [Xpo] — was it the arena, was it the jerseys, or was it the players? The players left, they have a new arena, they have a new jersey, and the scoreboard is the scoreboard, and the math is the math."** — Geisler. *Future of Fitness, ~07:21.*
> *His thesis on why he can replicate Xpo: the talent walked. Helps the SE understand why brand teams may feel thin.*

> **"We're not in the franchise sales business, we're not necessarily in the open-them business — we are in the royalty business."** — Geisler. *Fitt Insider #336, ~24:48.*
> *Implicit critique that Xpo became a franchise-sales business (the front-end sale became the product). Reinforces the "why is the strategic review happening" question.*

### Posture for Thursday if Sequel/Geisler comes up

If Kevin raises it: brief acknowledgment, pivot to institutional thesis — *"the operational problem Sanity solves is consistent multi-brand content governance, audit trails, headless flexibility for the marketing portal you're scoping. That's the opposite of what a five-brand founder-owned shop needs. Phase 2 is institutional. Sanity is built for that."* If no one raises it, don't bring it up. Intel is for SE calibration, not for the room.
