# Voice and copy audit

## Golden set

Pick and combine these lines; write new copy in their register. The site owns
where each one lives.

- `NoTambourine · a boutique AI-native engineering agency`, or under the
  wordmark the eyebrow `Boutique AI-native engineering agency`
- `Engineering you can see in the numbers.`
- `Improve the systems that run your business.`
- `Senior engineers inside your team to lead delivery.`
- `Platform migrations, redesigns, site speed, and ongoing engineering.`
- `We plan each project around the business result it should produce.`
- `After our most recent redesign launched, traffic rose 20% and conversion rate rose 20% on top of it.`
- `Start a conversation`, linked to https://notambourine.com/tom
- The headings in `doctrine/SOUL.md`

## Facts

- `Tom Fuertes · Principal · NoTambourine`: 20 years of organizational-change
  experience across more than 250 engagements.
- The [velocity board](https://notambourine.com/velocity) shows the pace.
- Never publish a client list, case studies, rates, margins, fixed offers, deal
  terms, or scope guarantees. References and terms come through a conversation.

## Positioning

- AI leads only in the category line. Elsewhere, name what it changes. No claims
  about transformation or intelligence.
- Senior engineers join the client's team and own the work from business goal to
  shipped system. Call it partnership, never staffing; `doctrine/SOUL.md` holds
  the stance.
- Add launching a product, automating routine work, or connecting systems and
  data when the reader's goal calls for it.
- Say "platform", not a vendor, except in that vendor's directory or for a
  reader who runs on it.
- Define fit by the result and the responsibility we take. Mention
  private-equity experience only when relevant.
- Credit speed to clear priorities, sound decisions, and close coordination,
  never to cutting roles, planning, documentation, or meetings.
- In proposals, tie each constraint to its business consequence and the work it
  requires.

## Register and evidence

- Site copy says "you". In a client deliverable, "we" means the client's
  organization with us inside it. A proposal or SOW names the parties. Never
  write "I".
- Write plainly and warmly. Use humor only when it makes the point clearer.
- Keep sales material out of client deliverables.
- Show the objective, what shipped, and what the client can now do, in daily
  terms. Back claims with client numbers, shared with permission. For an unnamed
  client, state the metric, the comparison, and the measurement window.
- Describe constraints without blaming whoever built the system.
- Sentence case everywhere. Uppercase only for pink eyebrows and deck sublabels.
- ASCII punctuation only. The interpunct separates name, role, and company.

## Names

- `NoTambourine` in every human-facing sentence; the name means no padding.
- `notambourine` only in a path, URL, domain, GitHub org, npm name, or CSS
  class.
- `NoTambourine LLC` at most twice per contract: the signature block and one
  Definitions anchor.
- Never `Notambourine`, `No Tambourine`, any split form, or wordplay on the
  instrument.

## Audit

Audit anything clients or strangers see, then judge each hit in context.

```sh
rg -n 'notambourine|Notambourine|[Nn]o\s+[Tt]ambourine|NoTambourine LLC' <file>
rg -n '[\x{2014}\x{2013}\x{2018}\x{2019}\x{201C}\x{201D}\x{2026}]' <file>
rg -ni '\b(proven|world-class|battle-tested|results-driven|cutting-edge|best-in-class|seamless|robust|leverage|synergy|holistic|bespoke)\b' <file>
rg -ni ',\s+(ensuring|enabling|allowing|helping|driving|empowering|delivering|providing)\b' <file>
rg -n '!(\s|$)|\bI\b' <file>
```

- Ignore slugs, code, technical uses like "a robust error path", and `I` in
  quotes or names.
- Keep factual fragments like "Two engineers, six weeks, one shipped feature"
  and one pink `<em>` in a headline.
