import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const config = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FB_DB_URL,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID
};

// Firebase's own error for a missing databaseURL is "Can't determine Firebase
// Database URL", which sends you looking at Firebase when the fault is almost
// always a .env that Vite never read. Say so plainly instead.
const missing = Object.entries(config).filter(([, v]) => !v).map(([k]) => k);

if (missing.length) {
  const msg =
    `Firebase config is missing: ${missing.join(', ')}.\n\n` +
    `Vite did not read your .env file. Check, in order:\n` +
    `  1. .env sits next to package.json — not in src/, not named .env.txt\n` +
    `  2. Lines are KEY=value — no quotes, no colons, no commas\n` +
    `  3. Every key starts with VITE_ (Vite ignores the rest)\n` +
    `  4. You restarted the dev server after editing it\n` +
    `  5. You ran npm run dev from the project root`;
  console.error(msg);

  // Fail loudly in the page, not just the console — a blank screen with a
  // stack trace teaches nobody anything.
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('root');
      if (el) {
        el.innerHTML =
          `<pre style="margin:2rem;padding:1.25rem;border-radius:12px;white-space:pre-wrap;` +
          `font:13px/1.6 ui-monospace,monospace;background:#1B2431;color:#F2909A;` +
          `border:1px solid #35404F">${msg}</pre>`;
      }
    });
  }
  throw new Error(`Missing env vars: ${missing.join(', ')}`);
}

export const app = initializeApp(config);
export const db = getDatabase(app);
export const auth = getAuth(app);
// Must match the region in functions/index.js or the call 404s.
export const fns = getFunctions(app, 'asia-south1');
