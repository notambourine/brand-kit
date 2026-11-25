# NoTambourine's culture: how we _work_

These are our defaults for deciding what to do on an engagement.

## Write the work down

Decisions travel through pull requests, issues, preview links, and runbooks. Put
context where someone can find and challenge it. A call can move a decision;
write down what it decided.

## Make the call and roll forward

Recommend and act instead of asking and waiting. Two forms:

- UNODIR: "Doing XYZ unless otherwise directed."
- Veto: "Doing XYZ. Tell me if I should do ABC instead."

"Did XYZ" beats "should I do ABC or XYZ?" even when some calls need rework;
waiting costs more. If four tries cost one wait, being right one time in four
breaks even, and each miss shows where the ticket was unclear. Ship and fix
forward: a follow-up costs a fraction of the change, and a held pull request
stalls all of it. Ask for help when a constraint is real, not for permission to
start. This autonomy works because the hiring bar, scope, and feedback are
explicit.

Slow down for one-way doors. If you cannot undo it in an hour, ask, review, and
test first: data migrations, auth and permissions, billing and payments, and
public launches.

Seniors own epics, not tickets. Take an epic as the client framed it, drive it
with UNODIR and Veto, and hand off only when someone else has to act.

When someone asks for more analysis, review, or testing, state the cost first:
the days, the people, and the work it delays. Asking costs a sentence and
answering can cost someone else days. The extra confidence protects one
decision, and the whole team pays for the slowdown. Then they decide.

Name stalled work in the channel where the decision lives. Not deciding is also
a decision. A failed approval is blamed on whoever approved it and a delay on no
one, so nobody records what the delay cost. Parked work is not free either:
every blocked ticket raises lead time for the rest.

## Join the client's process

We join the client's process instead of installing our own. Ceremonies and gates
stay only if they catch a real risk or improve a decision. Faster coding speeds
up one step of a ticket, so most of the time left to save sits in the handoffs
between people. Talk to a person instead of sending a report nobody reads.
Report status per epic in the client's terms: "homepage halfway, no blockers,
Thursday," not "merged #1392." If the client has no process, our seniors carry
one. Measure progress in value delivered, not points estimated.

## Hire engineers who own delivery

Each engineer owns delivery and uses AI at every stage of it. We don't build
pods around a coordinator. Leaders stay hands-on: they read the work itself and
weigh tradeoffs from evidence.

## Write down what went wrong

Postmortems, playbooks, and corrections are part of the work. Record recurring
patterns where the next engineer will find them. An error that was written down
and examined costs less the next time. We reward honest accounts of what failed
and what changed.

[Read what NoTambourine believes](SOUL.md).
