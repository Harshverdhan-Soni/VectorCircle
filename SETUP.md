# Setup — start to finish

Follow in order. Where order matters, it says so and why.

---

## Stage 1 — Firebase project

1. **Console → Add project** → `vector-circle`. Analytics optional.
2. **Build → Realtime Database → Create Database**
   - Location: **Singapore (asia-southeast1)**
   - Start in **test mode** (you'll replace the rules in Stage 5)
3. **Project settings → Your apps → web `</>`** → register → copy the config values.
4. **Authentication → Get started.** You don't need to enable any sign-in
   provider — custom tokens work regardless — but Authentication must be
   initialised once or `signInWithCustomToken` fails.
5. **Upgrade to Blaze.** Gear → Usage and billing → Details & settings →
   Modify plan. Cloud Functions require it.

   Your load — 40 students, a few hundred logins a month — sits inside the free
   allowance, which still applies on Blaze. Set a budget alert anyway:
   Billing → Budgets & alerts → ₹100.

---

## Stage 2 — Local

```bash
npm install
cd functions && npm install && cd ..
```

Create `.env` next to `package.json`:

```
VITE_FB_API_KEY=AIza...
VITE_FB_AUTH_DOMAIN=vector-circle.firebaseapp.com
VITE_FB_DB_URL=https://vector-circle-default-rtdb.asia-southeast1.firebasedatabase.app
VITE_FB_PROJECT_ID=vector-circle
VITE_FB_STORAGE_BUCKET=vector-circle.firebasestorage.app
VITE_FB_MESSAGING_SENDER_ID=263026157209
VITE_FB_APP_ID=1:263026157209:web:...
```

Plain `KEY=value`. No quotes, no colons, no trailing commas — it is not
JavaScript. `VITE_FB_DB_URL` is the `databaseURL` field and contains
`asia-southeast1`; without it Firebase throws "Can't determine Database URL".

Check `.firebaserc` says `"default": "vector-circle"`. If your project id
differs, change it there.

```bash
npm run dev
```

---

## Stage 3 — First admin

There is no self-signup, so the first admin is made by hand, once.

Console → Realtime Database → hover the root → **+**:

```
members
└── firstadmin
      ├── name:   "Harshverdhan Soni"
      ├── role:   "admin"
      └── branch: "Mentor"
```

Then, **at the root** (not inside `members`):

```
pins
└── firstadmin: "1234"
```

`members/{uid}` must contain only `name`, `role`, `branch`, `joinedAt`. If a
`pin` child is still sitting inside a member record from an earlier build,
delete it — the new rules reject it and the PIN belongs in `/pins`.

Open the app → **Sign in as admin** at the bottom of the picker → your name →
PIN. Seeding runs now (it needs an admin), writing `/quotes` and the
**RAG Specialist** milestone with its 22 courses. Confirm the tree appeared.

---

## Stage 4 — Deploy the function

```bash
npx firebase login          # or: npx firebase login --reauth
npx firebase deploy --only functions
```

Region is `asia-south1` (Mumbai) and must match `getFunctions(app, 'asia-south1')`
in `src/lib/firebase.js`. The database being in Singapore is fine — the
function reaches it through the Admin SDK.

**Deploy the function before the rules.** The rules require an admin claim,
which only the function can mint. Rules first = locked out of your own app.

---

## Stage 5 — Deploy the rules

```bash
npx firebase deploy --only database
```

Now test, in this order. Stop at the first failure:

1. Sign out, sign back in as admin. Everything depends on this.
2. Confirm the milestone and its 22 courses still load.
3. Add a test student. Sign in as them in a private window.
4. They should hit **"Choose your own PIN"** — that's the forced change.
5. Move some dots. Confirm they persist across a reload.
6. In the student's devtools console, try writing someone else's progress:

   ```js
   firebase.database().ref('progress/rag-specialist/SOMEONE_ELSE/t01').set({dots:10})
   ```

   It must fail with `PERMISSION_DENIED`. If it succeeds, the rules didn't
   publish — check the Rules tab.

---

## Stage 6 — Populate

**Admin → Students** — add each one: name, temporary PIN, branch. They're
enrolled into the milestone you're working on automatically. Every admin-set
PIN is temporary; the student is made to choose their own on first sign-in.

**Admin → Milestone** — set the real start and end dates. These drive the pace
line on everyone's Track screen. Wrong dates means the whole cohort shows as
"behind" on day one.

**Admin → Courses** — open all 22 links and confirm they resolve.
DeepLearning.AI moves short-course paths around, and I built the list from
knowledge rather than by checking each one. Fix any 404 with Edit. Do this
before students see it: a dead link on step 1 costs you the cohort's trust.

---

## Stage 7 — Ship

```bash
npm run build
```

Drag `dist/` onto [app.netlify.com/drop](https://app.netlify.com/drop). Rename
under Site settings → Change site name. `public/_redirects` handles SPA routing.

Send each student their name + PIN. They pick the milestone, pick their name,
type the PIN, choose a new one.

**Installing:** Chrome shows an **Install** button in the header. iOS Safari:
Share → Add to Home Screen (Apple allows no install prompt).

---

## Running it

| Task | Where |
|---|---|
| Add / remove a student | Admin → Students |
| Reset a forgotten PIN | Admin → Students → *reset to 1234* |
| Stop someone posting in chat | Admin → Students → the `can post` pill |
| Add, edit, reorder a course | Admin → Courses |
| Change dates or the reward | Admin → Milestone |
| Wipe the chat room | Admin → Milestone → Clear chat history |
| Change your own PIN | avatar menu → Change PIN |

---

## Known limits

- **A 4-digit PIN is 10,000 guesses.** Eight wrong attempts locks the account
  for 15 minutes, which makes grinding impractical — but 6 digits is
  meaningfully better. Both are accepted; require 6 by changing `{4,6}` to
  `{6}` in `src/components/ChangePin.jsx` and `functions/index.js`.
- **Admins can read every PIN.** Deliberate — you hand them out. It does mean
  an admin account is worth protecting.
- **Student names are public** (readable before login). They're on a shared
  leaderboard, so this is by design.
- **The service worker is production-only.** In dev it unregisters itself. If
  you ever see stale code in dev, that's why the guard exists.

## When something breaks

| Symptom | Cause |
|---|---|
| "Can't determine Firebase Database URL" | `.env` not read — wrong directory, wrong format, or server not restarted |
| `ws://localhost:undefined`, stale code | a leftover service worker — DevTools → Application → Service Workers → Unregister |
| `PERMISSION_DENIED` on admin actions | signed in as a student, or the function didn't deploy so there's no admin claim |
| Admin shows "0 courses" | no milestone selected — use the "Working on" dropdown at the top |
| Login says "PIN does not match" for everyone | PINs still inside `/members` instead of `/pins` |
