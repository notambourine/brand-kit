# Voice and copy audit

Write concisely, warmly, then playfully, in that order. Make the client's outcome concrete.

## Positioning and offers

Position NoTambourine as senior operators working inside the client's organization to resolve technology constraints. Value creation is the deliverable; earn trust by shipping and improving how the organization works. AI at the keyboard explains small-team economics, not what the client buys.

Define fit by the business constraint and the responsibility taken on. Mention private-equity experience when relevant; keep general positioning open to any ownership structure. The name means no padding, not a market segment.

Help referred readers confirm fit and explain the agency to colleagues. Keep the signature beside a concrete explanation. Use this introduction:

> NoTambourine works inside your team to resolve technology constraints and leaves you equipped to own the result.

Give recognizable reasons to call: a commerce platform limits the business, vendor dependence makes changes costly or slow, or an important roadmap needs capacity the team cannot staff.

Use these offer names and lead with outcomes:

- **Assessment:** Identify the technology constraint and decide what to address first.
- **Embedded:** Work inside the client's team to lead and deliver the changes.

Invite a conversation before asking readers to choose an engagement.

## Register and evidence

- Address marketing readers as "you". In client deliverables, use "we" for the client's organization with us inside it. Name the parties in proposals and SOWs. Never use "I" as the author's voice.
- Do not sell in client deliverables: no logo wall, team slide, or methodology. Explain their system back to them.
- Show what was blocked, what changed, and what the client can now own. Use their numbers when available, otherwise a verifiable before and after. Include reduced operating burden and independence. Share client evidence only with permission.
- Name who joins and owns delivery. Express values as commitments: direct access to the responsible person, ownership of estimating mistakes within agreed scope, and work and operating knowledge that stay with the client.
- Name the mess without blaming the people who built it. Explain coordination without jokes about ceremony.

## Names and mechanics

Use `NoTambourine` in human-facing sentences. Reserve `notambourine` for technical slugs, paths, URLs, domains, GitHub organizations, npm names, and CSS classes. Use `NoTambourine LLC` only in contracts, at most twice: one Definitions anchor and the signature block. Reject `Notambourine` and `No Tambourine`. Cite the public `AGENTS.md` for disputed naming flags.

Preserve `Senior engineers. No tambourine.` as a standalone signature: tagline, slide, sign-off, or footer. The instrument is lowercase. This is the only permitted spaced form.

Use sentence case for headlines, buttons, navigation, and labels. Reserve uppercase for pink eyebrows; decks also use that treatment for sublabels. Follow deck guidance for lowercase display headlines. Aim for five to twelve words per sentence. No throat-clearing, superlatives, or exclamation marks in body copy.

Use ASCII punctuation: hyphens and straight quotes/apostrophes. No em/en dashes, curly quotes, or single-character ellipses. Permit the interpunct as a separator, as in `Tom Fuertes · Principal · NoTambourine`.

## Audit before shipping

Audit anything clients or strangers see: pages, email, decks, proposals, SOWs, READMEs, and release notes. Search for candidates, then judge them in context:

```sh
rg -n 'notambourine|Notambourine|No\s+Tambourine|NoTambourine LLC' <file>
rg -n '[\x{2014}\x{2013}\x{2018}\x{2019}\x{201C}\x{201D}\x{2026}]' <file>
rg -ni '\b(proven|world-class|battle-tested|results-driven|cutting-edge|best-in-class|seamless|robust|leverage|synergy|holistic|bespoke)\b' <file>
rg -ni ',\s+(ensuring|enabling|allowing|helping|driving|empowering|delivering|providing)\b' <file>
rg -ni "this matters|it's worth noting|it is worth noting|needless to say|at the end of the day|in today's" <file>
rg -n '!(\s|$)|\bI\b' <file>
```

Check legal-name occurrences against the contract limit. Ignore technical slugs and code when judging wordmark hits; searches do not understand Markdown fences or backticks. Ignore literal technical uses such as "a robust error path" and `I` in quotations, identifiers, or names.

Cut puffery and keep evidence. Replace importance-flagging with the consequence. Cut participle tails at the comma. Read manually for grandiose scope and three-item adjective lists; narrow claims to something a client can hold us to. If cutting words leaves the claim intact, remove them.

Preserve three fixtures even when they resemble padding: the signature, factual three-item lines such as "Two engineers, six weeks, one shipped feature", and a headline's single pink `<em>`. Typographic emphasis is not a boldface tic.
