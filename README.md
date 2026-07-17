# Vector Circle

Milestone-based placement prep for NIT Silchar. Ten dots per course, one board,
one circle.

Vite · React 18 · Tailwind v3 · Firebase (Realtime Database + Cloud Functions) · PWA

---

## Run it locally

```bash
npm install
cp .env.example .env        # then fill in from Firebase console
npm run dev
```

`.env` must sit next to `package.json`, be plain `KEY=value` lines (no quotes,
no colons, no commas), and every key must start with `VITE_`. Restart the dev
server after editing it — Vite reads it once at startup.

## Deploy

```bash
npm run build                                  # → dist/
npx firebase deploy --only functions,database  # backend
```

Then drag `dist/` onto Netlify. (`firebase.json` also has a hosting block if
you ever want `firebase deploy --only hosting` instead.)

---

## Architecture

**Identity.** There is no self-signup. Admins create accounts; students sign in
with a name and PIN. The PIN is checked by the `login` Cloud Function, which
mints a custom auth token carrying `uid = memberId` and an `admin` claim. Every
database rule keys off `auth.uid`. The client cannot assert who it is.

**Enrolment** decides everything downstream: who appears on a milestone's login
screen, who is on its board, who is in its chat room, and whether they may post.

**The unit of progress is a dot.** Ten per course, validated 0–10 server-side.
Rank is total dots; ties break on who finished first.

## Data model

```
/members/{uid}              { name, role, branch, joinedAt }   public read
/pins/{uid}                 "1234"                             admin read/write only
/mustChange/{uid}           true                               self + admin read
/_loginGate/{uid}           { fails, until }                   server only
/milestones/{mid}           { title, subtitle, description, reward, startDate, endDate, active }
/milestones/{mid}/tasks/{tid}      { title, provider, url, type, hours, week, stage, order, outcome }
/milestones/{mid}/materials/{id}   { title, url, type, note }
/enrollments/{mid}/{uid}    { canChat, enrolledAt }
/progress/{mid}/{uid}/{tid} { dots: 0..10, updatedAt, completedAt }
/streaks/{uid}/{YYYY-MM-DD} { minutes, at }
/notes/{mid}/{tid}/{nid}    { uid, by, text, at }
/chat/{mid}/{msgId}         { uid, name, text, at, admin }
/quotes/{id}                { text, author }
/seeded                     timestamp
```

## Screens

| | |
|---|---|
| **Splash** | the day's quote — same one for everyone, keyed to the date |
| **Pick** | choose your milestone; admins take the separate button |
| **Login** | roster scoped to that milestone |
| **Track** | pace line, streak check-in, courses by week, ten dots each |
| **Board** | leaderboard; each learner's milestone as a vector strip |
| **Circle** | per-milestone chat; posting rights set per student |
| **Library** | papers and references, untracked |
| **Admin** | students, courses, milestone, quotes |

## Themes

Paper (light) and dusk (dark), toggled from the header, defaulting to the
device setting and following it live until someone chooses. Colours are CSS
variables, so components name roles (`bg-panel`, `text-mist`) and never hexes.
Palette matches the Bhanzu student app: blue carries the interface, orange
marks the one primary action per screen.

## Seeded content

One milestone — **RAG Specialist**, 22 steps over 8 weeks, every course free to
audit, plus three self-directed checkpoints that produce a public repo. Seeding
runs once, on first admin sign-in, guarded by `/seeded`.

See `SETUP.md` for first-run instructions.
