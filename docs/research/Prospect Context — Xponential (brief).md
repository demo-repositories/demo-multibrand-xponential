# Prospect Context — Xponential

**Date prepared:** 2026-05-12 by @presailor
**Deal stage:** Discovery
**AE:** Derek McDonald  **SE:** TBD
**Next meeting:** Demo, Thu 14 May 2026
**Salesforce opportunity:** [006aV00000p4QoAQAU](https://sanityio3.lightning.force.com/lightning/r/Opportunity/006aV00000p4QoAQAU/view)

## Company

Xponential Fitness, Inc. is a publicly traded boutique fitness franchise holding company (NYSE: XPOF), headquartered in Irvine, California. Corporate headcount is approximately 340; the franchise network is substantially larger. The portfolio brands as of 2026 are Club Pilates, Pure Barre, StretchLab, YogaSix, and BFT; Row House was divested in 2024. Mike Nuzzo was appointed CEO in August 2025.

The most material strategic context for this opportunity is Xponential's board-initiated review of strategic alternatives, announced in April 2026 with the stated goal of maximizing shareholder value. The review opened roughly six weeks before the first Sanity AE call. The CFO also departed in March 2026. Reviews of this kind tend to slow or freeze net-new platform commitments at the corporate level until the path forward becomes clearer. The effect on Kevin's signing authority for a Sanity contract is not yet known.

### Brands in portfolio

| Brand | Notes |
|---|---|
| Club Pilates | Largest brand by footprint |
| Pure Barre | |
| StretchLab | |
| YogaSix | |
| BFT | Strength-training format |
| Row House | Divested 2024, not in scope |

## Deal situation summary

Kevin Cherdchaithamrong, Sr. Director of Engineering and UX Lead, found Sanity through a colleague referral. He is evaluating Sanity for an internal intranet — Xponential has no intranet today — with a target to stand it up by the start of Q3 2026. Beneath that immediate project sits a larger consolidation opportunity. Xponential's brand sites currently run on HubSpot CMS in a page-based, non-component-reusable structure, augmented by a custom-built campaign landing-page tool that Kevin describes as inflexible and expensive. Kevin does not want to displace HubSpot CRM, which is doing its job. He does want a better content layer, and he wants the same platform serving the intranet now and the brand sites later. Derek McDonald quoted $80,000 to $100,000 ARR on the introductory call, before scope was qualified.

## Known pain points

- *"Everything's just per page"* — no content reusability in HubSpot CMS.
- *"We're paying for the tool"* — the inflexible custom landing-page tool, which is expensive without delivering the agility Kevin wants.
- *"How easy is it for them to kind of maintain the platform or let's say they want to spin up a new site on their own?"* — non-developer authoring is a real concern.
- *"Guardrails"* — Kevin used the word twice in the call. The concern is marketing and HR teams creating content without breaking layouts or page structure.
- *"We don't want too many cooks in the kitchen"* — governance over franchisee communications.
- *"It's just going to be so much leaner than to utilize something like a full blown CMS"* — Kevin is already convinced on the headless model.

## Prospect requirements

**Phase 1 — internal intranet (immediate).** Greenfield. Consolidate internal communications, newsletters, press releases, internal documents, and legal content. Integrate with the HR system (vendor unconfirmed) to surface the employee handbook and HR documents through an API. Integrate with the ticketing platform (vendor unconfirmed). Target stand-up by the start of Q3 2026.

An additional framing is available if Kevin opens the door: the intranet doubles as institutional-memory infrastructure for a leadership and executive bench that lost significant tenure in 2025, when founder Anthony Geisler departed and took his senior team with him to Sequel Brands. Where knowledge previously lived in people, it now needs to live in a system. The framing depends on Kevin or a teammate raising the leadership-transition theme; leading with it is not recommended.

**Phase 2 — brand-by-brand corporate sites and campaign landing pages (Kevin's "long term" framing).** Replace HubSpot CMS for brand-site content, brand by brand. Replace the custom landing-page tool with a flexible, schema-driven pattern. Corporate-controlled communications pushed one-way to franchisees. Kevin's framing: *"we don't want too many cooks in the kitchen."* A one-content-lake-many-studios model fits the brand-by-brand operational reality (Club Pilates, Pure Barre, StretchLab, YogaSix, BFT each operating distinctly). The Phase 2 story is TCO and engineering velocity across five brands, not a cross-brand consumer journey.

Kevin described the relationship between the two phases this way: *"the intranet would be at least a seed or the starting point"* for consolidating the rest of the technology. That sentence frames the opportunity.

## Competitive context

Kevin is not running a formal vendor evaluation. The functional competition is the status quo: HubSpot expansion plus inaction on the intranet. He named WordPress and Sitecore only as examples of the "full-blown CMS" pattern he wants to avoid.

The recommended Sanity stance for this opportunity is to **displace HubSpot CMS and integrate with HubSpot CRM**. HubSpot is strong at CRM, marketing automation, forms, and lead management. Sanity does none of those and is not positioned to. The content side (page-based authoring, the inflexible campaign tool, limited component reuse, no real intranet) is where Sanity fits. The integration story keeps forms posting to HubSpot, leads flowing into the CRM, marketing automation running, and content events triggering HubSpot workflows through webhooks. A deeper capability comparison lives in the separate competitive analysis file.

## Stakeholders

| Name | Title | Role in opportunity | Notes |
|---|---|---|---|
| Kevin Cherdchaithamrong | Sr. Director of Engineering — UX Lead | Technical champion and evaluator | Drove this evaluation. Self-identified developer background. Cost-conscious for Phase 1. Open to bringing marketing into the next call. [LinkedIn](https://www.linkedin.com/in/kevin-cherdchaithamrong-66057b33/) |
| Mike Nuzzo | CEO | Economic buyer by reference | Appointed August 2025. Owns the strategic-alternatives review. Not in the conversation yet. |
| Unnamed marketing leader | TBD | Potential influencer | Kevin offered to bring "some folks from marketing" to the next call. Identity not yet known. |

Stakeholder gaps: no confirmed economic buyer, no franchise or brand leader, no IT or security contact, no procurement contact, no integration owners on the Salesforce, HR, or ticketing systems.

## Sanity angle

Kevin's own language frames the opportunity. He wants something "leaner" than HubSpot CMS, with "guardrails" so marketing and HR teams can create content without breaking layouts. He wants integration with HR, ticketing, and Salesforce, and he wants to keep HubSpot CRM doing what it does well. He wants a Q3 stand-up and he wants the same platform to serve the brand sites later, when Xponential is ready.

What Sanity offers, in his terms: a content model defined as code so the schema *is* the guardrail; a Studio that gives marketing and HR teams a structured editor without the freedom to break layouts; an API-first content layer that pulls from HR, ticketing, and Salesforce through standard webhook-and-Function patterns; multi-brand support so the intranet and the brand sites share one content lake and one operational model. The Phase 1 intranet doubles as institutional-memory infrastructure for a leadership team rebuilt over the past year, if Kevin raises the leadership-transition theme. The Phase 2 economics — replacing HubSpot CMS and the custom landing-page tool across five brands, brand by brand — are what make the platform commitment worth the budget conversation. The intranet is the entry point.

## Demo recommendations for Thu 14 May

The 123Dentist demo Dale Zhang has run before is the closest available analog. Six sections of that demo align with Xponential's situation:

| 123Dentist demo section | Xponential mapping |
|---|---|
| Content approval workflow with custom roles (legal team granted read-only plus comment) | Intranet legal, press release, and HR governance |
| Inline comments and version history | Familiar Google Docs and Word patterns for legal and HR review |
| Content Releases (the Invisalign Day scheduling pattern) | Brand campaign calendar. National campaigns six to eight times per year, plus per-studio variants |
| Network-level visibility, filtered by location or property | Corporate visibility across franchise communications and brand sites |
| Content Agent generating per-brand variants | Per-brand campaign content at scale across studios, the strongest Phase 2 anchor |
| AI knowledge documents and brand-voice constraints | Direct match to Kevin's word "guardrails" |

Field-level localization, the seventh 123Dentist section, does not align with Xponential's US-centric footprint. A suggestion: include only if a discovery question surfaces a regional or bilingual need.

A possible demo sequence, for the SE's consideration: open in intranet content (a press release or legal document), move to the approval workflow and custom roles, then comments and version history, then plant the Phase 2 narrative by switching to a multi-brand environment, then network-level visibility, then Content Releases as the campaign calendar pattern, then Content Agent and AI guardrails, then close with an integration patterns walkthrough. If only Kevin is in the room, opening with the developer surface for the first ten minutes is a reasonable choice. If a marketer joins, recalibrating to open with the editor experience may serve the conversation better.

A logistics note on the demo environment: Sanity has a multi-brand demo environment (Sanetti) shown to other prospects. @allanwhite is arranging access for the assigned SE. The Phase 2 narrative holds either way.

## Integration story for the demo

Integration has moved from a discovery gap to a demo theme. The recommended approach for Thursday is to provide technical proof through examples, documentation, and architecture stories rather than live builds. The Sanity-side primitives are **Functions** (the code that runs on content or schedule events) and **Blueprints** (the configuration that describes when and where they trigger). Functions deploy via Blueprints; that is real implementation work and not slideware, so Thursday is about walking the pattern, not building it.

Three recommended elements for the SE's consideration:

1. **Walk the architecture pattern.** Sanity sits as the content layer. Salesforce, HubSpot CRM, the HR system, and the ticketing platform each connect through APIs. The Sanity-side primitives to name: **Document Functions** for content events (publish a press release, trigger a HubSpot workflow); **Scheduled Functions** for cron-style sync (nightly pull of HR documents); **Sync Tag Invalidate Functions** for cache and CDN refresh on the consuming front end. External webhooks calling into Sanity and on-demand GROQ queries from the consuming app are also valid patterns. The question is which side initiates.
2. **Be transparent about plugin availability.** No Sanity-native plugin exists for Salesforce CRM, HubSpot CRM, HR systems (Rippling, Pebble, Workday, BambooHR), or ticketing platforms (Jira, Zendesk, ServiceNow). All four are standard custom integrations. Showing the pattern is preferable to naming plugins that do not exist.
3. **The scoping fork.** For each integration, the central question is whether the data needs to be queryable inside Sanity (synchronization pattern, richer but more infrastructure) or referenced by ID from the source of truth (input plugin pattern, simpler but less queryable). That single answer drives the work for each system.

A consideration for the volume conversation: Functions have execution limits (10 second default, 900 second maximum), size limits (200MB), and rate limits (200 per 30 seconds per document, 4000 per 30 seconds per project). High-volume sync, long-running transforms, or burst patterns may need to be designed as batches, queues, or pulled from the consuming app rather than pushed from Sanity. Worth holding in reserve if Kevin asks scale questions.

## Desired prospect takeaways

The recommended outcome for Kevin after the demo: a clear sense that he can stand up the intranet by Q3 with the integrations he named; that the same platform handles the brand sites when Xponential is ready; that the integrations are standard Sanity work the team knows how to scope; and that Sanity's onboarding model protects his marketers from being stuck. The follow-on signal would be Kevin bringing a marketer and a budget owner to the next conversation.

## Discovery gaps to land on Thursday

Clustered by category for the SE's consideration. The buying-process cluster covers the MEDDPICC items most at risk right now (economic buyer, decision process, paper process, competition).

**Integration scope (queryable vs. referenced fork applies to each)**
- Salesforce. Vendor confirmed; shape unconfirmed. Data sync, Experience Cloud embed, content surfacing, or ID reference only? Direction? Volume?
- HubSpot CRM. What flows Sanity → HubSpot (form submissions, lead attribution, content-event triggers)? What flows HubSpot → Sanity (personalization signals, audience data)?
- HR system. Vendor unconfirmed (Rippling, Pebble, Workday, BambooHR, or other). Documents queryable inside Sanity, or referenced from the HR system?
- Ticketing platform. Vendor unconfirmed (Jira, Zendesk, ServiceNow, or internal). Ticket data displayed inline in the intranet, or linked out? Real-time, or scheduled sync?

**Technical (non-integration)**
- Traffic scale clarification. Kevin said "36,000,000,000 visitors" on the call; the Gong overview says "36 million." Per brand or aggregate? This drives CDN sizing and pricing math.
- Front-end framework choice. Next.js, Remix, Astro?
- The custom campaign landing-page tool. Built by whom, doing what, costing how much?

**Buying process**
- Who approves $80,000 to $100,000? Procurement and security review path.
- How does the April 2026 strategic-alternatives review affect platform spending authority?
- Is HubSpot expansion being priced as a formal alternative, or is it a mental anchor?

**Stakeholder**
- Confirm the economic buyer. Kevin's manager, VP Engineering, CTO, or CIO?
- Identify the marketing stakeholder Kevin is considering bringing in.
- Franchise or brand leader. Who owns franchisee communication today?
- Security and IT. SSO/SAML, data residency, SOC 2 requirements?

**Timeline and competitive**
- What does "beginning of Q3" mean in Xponential's fiscal calendar — contract, kickoff, or live to users?
- The colleague referral. Who, where, and what was the experience?

## Risks and considerations from the SE perspective

**Pricing anchor set before discovery.** Derek's $80,000 to $100,000 range was offered on the introductory call without scope qualification. Kevin acknowledged it without pushback and is comparing against HubSpot. If scope qualification raises the appropriate price above $100,000, the SE will be re-anchoring against a known number. A suggested approach: position the quoted range as a Phase 1 figure that scales with brand-side use cases, rather than as a ceiling.

**Strategic-alternatives review at Xponential.** A board-level review has been in progress since April 2026, alongside a new CEO and a departed CFO. Net-new SaaS commitments often slow in this window. Probing buying authority directly, without making it the headline of the call, is the SE's call to make. A positioning that fits the moment: Sanity is consolidation-friendly infrastructure that survives org change and reduces TCO by replacing HubSpot CMS plus the custom landing-page tool. That story holds under most outcomes of the strategic review (sale, take-private, restructuring, status quo). Strategic-transformation framing is the one to avoid.

**Low-ROI framing on the lead-in.** Kevin himself described the intranet as "very low ROI" with budget "kind of low." That is the entry point, not the deal. The economics of the opportunity sit in Phase 2. Framing the intranet as Phase 1 of a platform consolidation, rather than as a standalone purchase, is one available approach.

**Potential confusion between HubSpot CRM and HubSpot CMS.** Sanity's stance — displace HubSpot CMS, integrate with HubSpot CRM — is clear inside the team. It may not be clear to Kevin or to a marketing colleague who thinks of HubSpot as a single product. A direct statement early in the demo may help: forms continue to post to HubSpot, leads continue to flow into the CRM, marketing automation continues to run, and the change applies to the content layer and the campaign landing pages.

**Marketing voice absent.** Kevin is an engineering leader. The marketer use case is central to the pitch. Encouraging Kevin to bring a marketer to the demo, and tuning the opening accordingly if one arrives, are both available moves.

**Integration discovery is shallow and now central.** Four named integrations (Salesforce, HubSpot CRM, HR, ticketing), zero scoped. Integration has moved from a discovery gap to a demo theme, which raises the stakes for the SE's narrative.

## Notes

- **Sanity awareness path.** Kevin found Sanity through a colleague referral. Identifying the colleague and the use case at that company would be valuable, as either a proof point or a watch-out.
- **Digital Stack.** Xponential uses Digital Stack for franchise digital marketing optimization. Not a CMS and not a Sanity competitor. Worth a brief acknowledgment to avoid talking past the existing relationship.
- **Time pressure is real but mild.** "Beginning of Q3" with a "not too long, not too short" framing. A well-scoped POC is feasible from this position.
- **Demo opening posture.** Kevin self-identified as a developer. Opening with Studio configurability and schema-as-code, then moving to the editor experience as proof for non-developer marketers, is one available sequence. Recalibrating live if a marketer joins is another.

## Sources

- Sanity and Xponential AE introductory call, 2026-05-11 (Gong recording, full transcript, AE notes).
- AE post-call update, 2026-05-12 (multi-brand scope confirmed, HubSpot CRM identified, integration positioned as central, demo set for Thursday 14 May).
- 123Dentist demo notes from Dale Zhang (Sanetti environment), shared 2026-05-12.
- Web enrichment 2026-05-12 (Xponential corporate filings, leadership news, Kevin Cherdchaithamrong's LinkedIn).
- Sanity integration pattern survey 2026-05-12.
- `sanity-presales` skill v2026-05-13 (updated discovery framework, integration scope cluster, Functions/Blueprints primitives).
- Podcast intelligence 2026-05-13 — @podracer/@dairim analysis of two Anthony Geisler interviews (Future of Fitness, Fitt Insider #336). Source-tagged advisory section in `/research/prospect-context-xponential.md` v5+.
- Companion files: `/prospect-context-xponential.md` (structured), `/competitive-analysis-hubspot-vs-sanity-content.md`, `/ae-precall-brief-xponential.md`.
