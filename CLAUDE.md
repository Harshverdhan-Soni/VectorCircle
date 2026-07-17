# Vector Circle — working notes for Claude

Read this before touching anything. It is the accumulated context of the build,
including several traps that cost hours to find.

---

## What this is

A PWA for NIT Silchar students preparing for placements. An admin defines a
**milestone** (a syllabus of free courses). Students enrol, work through it,
and mark progress as **ten dots per course**. A leaderboard ranks the circle.

Currently one milestone is live: **RAG Specialist**, 22 steps over 8 weeks.

Owner: Harshverdhan Soni — C-DAC Silchar, PhD scholar at NIT Silchar.

## Stack

Vite · React 18 · Tailwind v3 · Firebase Realtime Database · Firebase Cloud
Functions (gen 2, Node 22, `asia-south1`) · deployed by dragging `dist/` to
Netlify.

No CI/CD. No test suite. Deployment is manual and deliberate.

Database is in **asia-southeast1**; functions are in **asia-south1**. That
mismatch is intentional and fine.

---

## CRITICAL — read before running anything

**Project root.** The folder tree is nested (`vector-circle/vector-circle/vector-circle`).
The real root is the one containing `package.json`, `firebase.json` and `src/`.
Every command below runs from there. Running from `functions/` or a parent is a
recurring source of confusion.

**Never commit `.env`.** It is gitignored. Do not add it, do not print its
contents into chat, do not create `.env` files elsewhere. If asked to "fix env
problems", check format and location — never paste values.

**Never loosen the database rules to make something work.** If a write fails,
the rule is usually right and the code is wrong. Loosening rules to unblock a
feature re-opens a security hole that took real work to close. Fix the code, or
say the rule needs changing and explain why.

**Do not add dependencies without asking.** The bundle is intentionally small.
Drag-and-drop reordering, the theme system, and the select component were all
built without libraries on purpose.

---

## Commands

```bash
npm run dev                                    # local, port 5173
npm run build                                  # → dist/, then drag to Netlify
npx firebase deploy --only functions           # after editing functions/
npx firebase deploy --only database            # after editing database.rules.json
npx firebase functions:log --only login        # when a callable misbehaves
```

There is no `tsc` step. `build` is plain `vite build`.

---

## Architecture

### Identity — this is the unusual part

There is **no self-signup and no password provider**. Admins create accounts.
Students sign in with a name + PIN.

1. `Login.jsx` calls the `login` Cloud Function with `{memberId, pin}`.
2. The function checks the PIN against `/pins/{uid}` using the Admin SDK, which
   bypasses rules.
3. It returns a **custom token** with `uid = memberId` and claim `admin: bool`.
4. The client calls `signInWithCustomToken`.
5. Every database rule keys off `auth.uid` / `auth.token.admin`.

The client therefore cannot assert who it is. This is the whole basis of the
security model — do not route around it.

PINs live at `/pins`, readable only with an admin claim. They were once inside
`/members` (world-readable). `login` still migrates a legacy inline PIN on first
successful sign-in.

### Enrolment drives everything

`/enrollments/{mid}/{uid}` decides who appears on a milestone's login screen,
who is on its board, who is in its chat, and (`canChat`) whether they may post.

**Admins are not enrolled in anything.** They run milestones, they don't race in
them. Admins therefore cannot write progress — the rule requires enrolment. This
is intended; the Track tab shows admins a note instead of dots.

### The lock model

Courses are **locked by default**, and admins open them week by week.

`isLocked(t)` is `t.locked !== false` — **absence means locked**. This matters:
the 22 seeded courses predate the field, and treating undefined as unlocked
would spring the whole syllabus open. Keep that polarity.

Enforced in the rules, not just the UI: a locked course rejects dot writes.

### Themes

Two: **paper** (light) and **dusk** (dark), toggled from the header, defaulting
to the device setting and following it live until the user chooses.

Colours are **CSS variables** on `:root` / `.dark` in `src/index.css`. Tailwind
tokens resolve to them (`bg-panel` → `rgb(var(--panel))`).

**Components must name roles, never hexes.** Use `bg-panel`, `text-mist`,
`border-line`, `text-beam`. Never `bg-[#1B2431]`. This is why a full re-theme
touches ~8 files and zero components. Preserve that.

Palette is matched to the Bhanzu student app: **blue carries the interface,
orange marks the one primary action per screen**. Don't add a second orange
button to a screen.

Every colour is contrast-checked. Accents clear ~6.4:1 (light) / AAA (dark).
`btn-primary` uses `text-onflame`, never white — white on the orange is 3.37:1
and fails WCAG. If you change an accent, re-check the ratio.

---

## Data model

```
/members/{uid}              { name, role, branch, joinedAt }   public read, admin write
/pins/{uid}                 "123456"                           admin read+write only
/mustChange/{uid}           true                               self+admin read, admin write
/_loginGate/{uid}           { fails, until }                   server only (throttle)
/milestones/{mid}           { title, subtitle, description, reward, startDate, endDate, active }
/milestones/{mid}/tasks/{tid}      { title, provider, url, type, hours, week, stage, order, outcome, locked }
/milestones/{mid}/materials/{id}   { title, url, type, note }
/enrollments/{mid}/{uid}    { canChat, enrolledAt }
/progress/{mid}/{uid}/{tid} { dots: 0..10, updatedAt, completedAt }
/streaks/{uid}/{YYYY-MM-DD} { minutes, at }
/notes/{mid}/{tid}/{nid}    { uid, by, text, at }
/chat/{mid}/{msgId}         { uid, name, text, at, admin }
/quotes/{id}                { text, author }
/seeded                     timestamp
```

**Any new path needs a rule.** The root has `"$other": { ".read": false,
".write": false }`, so an unruled path is simply invisible. Add the rule in the
same change as the feature, and redeploy.

---

## File map

```
src/
  App.jsx                  shell: phases (splash→pick→login→app), auth state, tabs, header menu
  index.css                BOTH THEME PALETTES + component classes. The design system lives here.
  lib/
    firebase.js            init + env guard. Explicit databaseURL.
    auth.js                signIn / changePin / signOut / watchAuth
    store.js               every database read+write. Ranking, pace, seeding.
    useTheme.js            light/dark, follows device until chosen
  components/
    DotTrack.jsx           the ten dots + Fingerprint (a milestone as one strip)
    Logo.jsx               the mark: students as vectors converging on a knowledge core
    ThemeToggle.jsx
    ChangePin.jsx          forced (after reset) and voluntary modes
    PersonSelect.jsx       themed replacement for <select>, with type-ahead
    CourseList.jsx         admin drag-reorder + lock toggles
  pages/
    Splash.jsx             daily quote, same for everyone, keyed to the date
    Pick.jsx               choose milestone; admins take the separate button
    Login.jsx              roster scoped to the milestone
    Home.jsx               Track: pace line, streak, courses by week, dots
    Board.jsx              leaderboard + fingerprints
    Chat.jsx               per-milestone room, canChat enforced
    Library.jsx            papers/references, untracked
    Admin.jsx              students, courses, milestone, quotes
  data/seed.js             APP_NAME, quotes, the RAG Specialist syllabus
functions/index.js         login + changePin. The only server code.
database.rules.json        the security model
```

---

## Traps — every one of these actually happened

**`.env` must be `KEY=value`.** Pasting the Firebase config object (`apiKey:
"..."`) produces `undefined` everywhere and "Can't determine Firebase Database
URL". It is not JavaScript. Vite reads it once at startup — **restart after
editing**.

**Service workers must not register in dev.** `main.jsx` registers only when
`import.meta.env.PROD`, and in dev actively unregisters leftovers and clears
caches. A dev service worker serves stale modules forever: broken HMR
(`ws://localhost:undefined`), env vars that "won't update", edits that never
appear. Do not remove that guard.

**Auth-gated listeners must depend on `me`, not just `mid`.** `/progress`,
`/streaks`, `/chat`, `/notes`, `/pins`, `/mustChange` all require auth to read.
The milestone is chosen **before** login, so a listener keyed only on `[mid]`
attaches while signed out, gets denied, is torn down, and **never retries** —
writes then succeed into a view that cannot see them. Always pass `me` in the
dependency array. Always pass an error callback to `onValue` (`listen()` does).

**`createCustomToken` needs `roles/iam.serviceAccountTokenCreator`.** Gen-2
functions run as `263026157209-compute@developer.gserviceaccount.com`, which
cannot sign by default. Symptom: HTTP 500, `iam.serviceAccounts.signBlob denied`.
Already granted on this project; would need redoing on a fresh one.

**Firebase Authentication must be initialised once in the console** (click
"Get started"). No provider needs enabling — custom tokens work regardless — but
without it the client throws `auth/configuration-not-found`.

**`admin.initializeApp()` needs an explicit `databaseURL`** for a regional
database. Auto-resolution can point at `<project>.firebaseio.com`, which does
not exist for `asia-southeast1`. Then every read returns null and all logins
fail with "PIN does not match".

**`database.rules.json` cannot contain comments.** Any key not starting with `.`
is treated as a child path and must be an object. A `"_comment": "..."` string
is a syntax error. Explanations go in the docs.

**Native `<select>` cannot be themed.** The OS renders the option list. That is
why `PersonSelect.jsx` exists. Admin still uses native selects in places; the
same component drops in if that becomes annoying.

**HTML5 drag events do not fire on touch.** `CourseList.jsx` therefore has ▲▼
buttons alongside the drag handle. They are also the keyboard path. Keep both.

---

## Conventions

- **Match the existing voice.** UI copy is plain and direct, no exclamation
  marks, no "Oops!". Errors say what happened and what to do.
- **Comments explain *why*, not *what*.** Most existing comments record a
  decision or a trap. Don't add narration.
- **Empty states say why they're empty**, never just blank space.
- **Admin destructive actions confirm**, and the confirm text states the
  consequence ("their dots for it are removed too").
- **Any admin-set PIN is temporary** — it writes `mustChange`, and the student
  is gated until they choose their own. Don't add a path around that.
- Keep components in one file each. No barrel files.

---

## Current state

Working: auth, rules, enrolment, dots, board, streaks, chat, notes, library,
admin (students/courses/milestone/quotes), drag-reorder, lock/unlock, themes,
PWA install, PIN change + admin reset.

Deployed: functions live in `asia-south1`; rules live. One admin
(`firstadmin`), four test students, RAG Specialist seeded with 22 courses.

## Open items

1. **Verify all 22 course URLs.** They were written from knowledge, not checked.
   DeepLearning.AI moves short-course paths. Admin → Courses → open each.
2. **Set real milestone start/end dates.** They drive the pace line.
3. **Decide: should `pace()` ignore locked courses?** Right now locked courses
   count toward the total, so a cohort with only week 1 open reads as "behind"
   by design. May be demotivating.
4. **6-digit PINs.** `{4,6}` is accepted; 4 digits is 10,000 guesses (the
   throttle makes grinding impractical, but 6 is better). One regex change in
   `ChangePin.jsx` and `functions/index.js`.
5. Colour-blind check: `beam` (progress) and `mint` (complete) are
   distinguishable by text (`7/10` vs `10/10`) but close in hue.
6. Chat has no unread indicator.
7. Multi-milestone is built but untested — only one exists.

## Deliberately not done

- CI/CD. Deployment is manual by preference.
- Firestore. This is Realtime Database throughout.
- A component library. Everything is hand-rolled Tailwind.
- Real email. EmailJS/Formspree are used on the owner's other projects, not here.
