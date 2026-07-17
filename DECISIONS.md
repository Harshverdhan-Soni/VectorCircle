# Decisions

Why things are the way they are. If a change would reverse one of these, that's
allowed — but do it knowingly, not by accident.

---

### Ten dots per course, not a checkbox

A checkbox says "done / not done". A five-hour course is neither for most of the
week. Ten dots make partial progress visible to the circle, which is the point
of a shared board — you can see someone is moving without them having finished.

### The leaderboard ranks dots, ties break on time

Ranking on completion alone would leave everyone at zero for two weeks. Ranking
on dots shows movement from day one. The first person to fill every dot takes
the reward, so the tie-break is who got there first.

### Locked by default

22 courses on day one is a wall. The admin opens them week by week, which gives
pacing control and makes Monday a small event.

Locked courses **stay visible** — dimmed, with the title, provider and outcome
still readable. Seeing the whole road is the motivation; hiding it would turn
the milestone into a mystery box.

`isLocked()` treats **undefined as locked** so that pre-existing data doesn't
spring open on deploy.

### Locked courses count toward the total

So a cohort with one week open reads as "behind pace". This is deliberate: the
denominator is the milestone, not today's slice. It may be worth reversing —
see open item 3 in CLAUDE.md.

### Admins are not enrolled

They run milestones; they don't compete in them. Consequences: admins can't
write dots (the rule requires enrolment), and they don't appear on the board.
The Track tab tells them so rather than showing dots that would fail to save.

### PINs, not passwords

The cohort is 40 students who need to be onboarded in a day, with no email
verification and no password resets to field. A PIN handed over in person is the
right friction for this. It is weaker than a password, which is why:

- the PIN is verified **server-side** and never readable by students
- 8 wrong attempts locks the account for 15 minutes
- any admin-set PIN is temporary and forces a change on first sign-in
- a new PIN cannot be `1234` — otherwise "change your PIN" is satisfiable by
  changing it back to the default

### Custom tokens rather than Firebase's own providers

PIN login gives Firebase no identity, so rules would have nothing to check and
the database would have to stay world-writable. The `login` function mints a
token with `uid = memberId`, and every rule keys off it. This is the only reason
the rules can be strict.

The cost is a Cloud Function and therefore the Blaze plan. Considered and
accepted.

### Names are public, PINs are not

`/members` is world-readable because the login screen must list names before
anyone is authenticated. Names are on a shared leaderboard anyway. PINs moved to
`/pins` (admin-only) precisely because they were not in that category.

`/mustChange` is deliberately **not** on the public member record: a public flag
would tell an attacker exactly which accounts are still on the default PIN.

### CSS variables for colour, not Tailwind hexes

The app has been re-themed three times (dusk → paper/dusk → Bhanzu palette).
Each time, components changed **zero lines**, because they name roles
(`bg-panel`) rather than colours. That property is worth protecting.

### Blue for the interface, orange for one action

Copied from the Bhanzu student app, which the students already use. Their login
page has exactly one orange button. Two orange buttons on a screen and the
hierarchy is gone.

### A deeper orange than Bhanzu's

Their `#F15A29` carries white text at 3.37:1 and fails WCAG AA. Ours is
`#CC4A17` — same family, reads the same at arm's length, 4.61:1. Students use
this on phones in sunlight.

### The mark: vectors converging on a core

Fourteen lines of **differing lengths** — nobody is at the same place — running
inward from dots on a ring to a shared centre. The core is drawn as held up by
the ring: remove the vectors and there is nothing in the middle. It reads as an
embedding cluster or as people sitting in a circle. Both are the same picture.

It keeps its own teal/sage colours and does **not** match the Bhanzu-derived UI
palette. That was an explicit choice by the owner.

### One quote per day, not random

Deterministic on the date, so everyone in the circle sees the same quote. It's a
shared reference point at 6am, not decoration.

### Notes on courses, separate from Circle chat

"Why does chunk overlap matter" belongs on the course card, where the next
person hits the same wall. "Anyone free Saturday" belongs in chat. Different
lifetimes, different audiences.

### Muted students still read the room

The composer is replaced with a plain message saying posting is off and to ask
an admin. Silently swallowing their messages would be worse — they'd assume the
app was broken.

### Three self-directed checkpoints in the RAG syllabus

Weeks 4, 6 and 8 are build/eval/capstone, not courses. A student who finishes 19
video courses and has no repo is not a specialist, and a placement panel finds
that out in four minutes.

### Manual deployment

The owner's established pattern across projects: local dev → build → drag `dist/`
to Netlify. No CI/CD anywhere. Don't add it uninvited.
