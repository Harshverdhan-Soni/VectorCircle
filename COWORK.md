# Starting with Cowork on this project

## Point it at the right folder

Give Cowork the folder that contains `package.json`, `firebase.json` and `src/`.
With the current nesting that is:

```
D:\My Data backup\Harshverdhan\My Official\Web Projects\vector-circle\vector-circle\vector-circle
```

Not the parent, not `functions/`. Everything below assumes that root.

Worth flattening those three folders first — Cowork will read paths literally
and the duplication invites mistakes.

## What it reads automatically

- `CLAUDE.md` — architecture, traps, conventions, current state. The important one.
- `DECISIONS.md` — why things are the way they are.
- `README.md` — overview and data model.
- `SETUP.md` — first-run and deploy steps.

Between them there is no need to explain the project again in chat.

## Before the first session

**Confirm `.env` exists and is gitignored.** Cowork can read it; it must never
write it into a commit or paste it into chat.

**Have `npm run dev` running** in a terminal. Cowork can't see your browser, so
you are the one who checks whether a change actually looks right.

## Good first tasks

These are real, self-contained, and each has a verifiable outcome:

- *"Check all 22 course URLs in src/data/seed.js resolve, and list any that 404."*
  Open item 1, and the most valuable thing outstanding.
- *"Make pace() ignore locked courses, so students are measured against what's
  open. See open item 3 in CLAUDE.md."*
- *"Require 6-digit PINs everywhere — ChangePin.jsx and functions/index.js."*
- *"Add an unread indicator to the Circle tab."*
- *"Replace the native selects in Admin.jsx with PersonSelect where it fits."*

## Tasks to hand over carefully

- **Anything touching `database.rules.json`** — a wrong rule locks you out of
  your own app, and the failure mode is silent. Ask for the diff before deploy.
- **Anything touching `functions/index.js`** — it holds the auth model. Deploy
  functions before rules, always.
- **Re-theming** — say "change the CSS variables in src/index.css", not "change
  the colours". Otherwise you may get hexes sprayed through components, which
  destroys the property that makes re-theming cheap.

## Things to tell it once

- Don't add dependencies without asking.
- Don't add CI/CD.
- Don't loosen the rules to make a feature work.
- Deployment is manual: build, then drag `dist/` to Netlify.

## Verifying a change

There is no test suite, so the loop is:

```bash
npm run build            # must pass clean
```

then in the browser: sign in as admin, sign in as a student in a private window,
move a dot, reload, confirm it stuck. For anything touching rules, also confirm
a student **cannot** write another student's progress from the console.

## After a session

```bash
git status --short       # .env must NOT appear
git add . && git commit -m "..."
git push
```
