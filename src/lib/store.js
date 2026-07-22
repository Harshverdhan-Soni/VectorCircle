import { ref, onValue, set, update, remove, push, get, serverTimestamp } from 'firebase/database';
import { httpsCallable } from 'firebase/functions';
import { db, fns } from './firebase';
import { QUOTES, RAG_MILESTONE, RAG_TASKS, RAG_MATERIALS } from '../data/seed';

export const DOTS = 10;
export const todayKey = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, local

/* ---------------------------------- subscriptions --------------------------- */

/**
 * onValue's third argument is an error callback. Without it, a denied read
 * fails silently: the callback simply never fires, the listener is torn down,
 * and Firebase does not retry. The UI then shows empty data forever and looks
 * like a write bug. Always log it.
 */
export const listen = (path, cb, onError) =>
  onValue(
    ref(db, path),
    (snap) => cb(snap.val()),
    (err) => {
      console.error(`[listen] ${path} failed: ${err.code || err.message}`);
      onError?.(err);
    }
  );

export const objToArr = (obj) =>
  obj ? Object.entries(obj).map(([id, v]) => ({ id, ...v })) : [];

/* ------------------------------------ members ------------------------------- */

// The PIN never sits beside the name any more. /members is public (the login
// screen has to list names); /pins is readable only with an admin claim.
export const addMember = async ({ pin, ...rest }) => {
  const r = push(ref(db, 'members'));
  await set(r, { ...rest, joinedAt: Date.now() });
  await update(ref(db), {
    [`pins/${r.key}`]: String(pin),
    [`mustChange/${r.key}`]: true   // they pick their own on first sign-in
  });
  return r;
};

export const updateMember = (uid, patch) => update(ref(db, `members/${uid}`), patch);

export const DEFAULT_PIN = '1234';

// Admin-set PINs are always temporary: the student is made to choose their own
// before they can reach the app. A shared default that sticks around is the
// same as no PIN at all.
export const setPin = (uid, pin) =>
  update(ref(db), {
    [`pins/${uid}`]: String(pin),
    [`mustChange/${uid}`]: true
  });

export const resetPinToDefault = (uid) => setPin(uid, DEFAULT_PIN);

export const removeMember = async (uid) => {
  await remove(ref(db, `members/${uid}`));
  await remove(ref(db, `pins/${uid}`));
  await remove(ref(db, `mustChange/${uid}`));
};

/* ---------------------------------- milestones ------------------------------ */

export const saveMilestone = (mid, data) => update(ref(db, `milestones/${mid}`), data);
export const createMilestone = (data) =>
  push(ref(db, 'milestones'), { ...data, createdAt: Date.now(), active: true });
export const deleteMilestone = async (mid) => {
  await remove(ref(db, `milestones/${mid}`));
  await remove(ref(db, `progress/${mid}`));
  // No `achievements` path exists — it has no rule, so removing it was rejected
  // by "$other" and threw after the milestone was already gone.
};

/* ------------------------------------- tasks -------------------------------- */

/**
 * Locked is the default, and absence means locked.
 *
 * `locked !== false` rather than `locked === true` on purpose: the 22 seeded
 * courses were written before this field existed, so an undefined value has to
 * mean locked. Otherwise the whole syllabus would spring open on deploy.
 */
export const isLocked = (t) => t?.locked !== false;

export const setTaskLocked = (mid, tid, locked) =>
  update(ref(db, `milestones/${mid}/tasks/${tid}`), { locked });

export const setTasksLocked = (mid, tasks, locked) => {
  const patch = {};
  tasks.forEach((t) => { patch[`milestones/${mid}/tasks/${t.id}/locked`] = locked; });
  return update(ref(db), patch);
};

export const addTask = (mid, task) =>
  push(ref(db, `milestones/${mid}/tasks`), { locked: true, ...task });
export const saveTask = (mid, tid, patch) => update(ref(db, `milestones/${mid}/tasks/${tid}`), patch);
/**
 * Rewrite the whole sequence in one atomic update. Renumbering everything from
 * 1 is what stops `order` drifting out of step with `week` — which is how the
 * admin list ends up in a different sequence from the students' Track screen.
 */
export const reorderTasks = (mid, list) => {
  const patch = {};
  list.forEach((t, i) => {
    patch[`milestones/${mid}/tasks/${t.id}/order`] = i + 1;
    patch[`milestones/${mid}/tasks/${t.id}/week`] = Number(t.week) || 1;
  });
  return update(ref(db), patch);
};

export const deleteTask = async (mid, tid) => {
  await remove(ref(db, `milestones/${mid}/tasks/${tid}`));
  const snap = await get(ref(db, `progress/${mid}`));
  const all = snap.val() || {};
  await Promise.all(Object.keys(all).map((uid) => remove(ref(db, `progress/${mid}/${uid}/${tid}`))));
};

/* ----------------------------------- materials ------------------------------ */

export const addMaterial = (mid, m) => push(ref(db, `milestones/${mid}/materials`), m);
export const saveMaterial = (mid, id, patch) => update(ref(db, `milestones/${mid}/materials/${id}`), patch);
export const deleteMaterial = (mid, id) => remove(ref(db, `milestones/${mid}/materials/${id}`));

/* ----------------------------------- progress ------------------------------- */

export const setDots = (mid, uid, tid, dots) =>
  update(ref(db, `progress/${mid}/${uid}/${tid}`), {
    dots,
    updatedAt: Date.now(),
    completedAt: dots >= DOTS ? Date.now() : null
  });

/* ------------------------------------ streaks ------------------------------- */

export const checkIn = (uid, minutes) =>
  set(ref(db, `streaks/${uid}/${todayKey()}`), { minutes: Number(minutes) || 0, at: Date.now() });

export const streakLength = (days) => {
  if (!days) return 0;
  let n = 0;
  const d = new Date();
  for (;;) {
    const k = d.toLocaleDateString('en-CA');
    if (days[k]) { n++; d.setDate(d.getDate() - 1); } else break;
    if (n > 400) break;
  }
  return n;
};

/* ------------------------------------- notes -------------------------------- */

export const postNote = (mid, tid, note) =>
  push(ref(db, `notes/${mid}/${tid}`), { ...note, at: Date.now() });
export const deleteNote = (mid, tid, nid) => remove(ref(db, `notes/${mid}/${tid}/${nid}`));

/* ------------------------------------ ranking ------------------------------- */

// Rank on dots filled. Ties broken by who got there first.
export function rank(members, tasks, progress) {
  const total = Math.max(tasks.length * DOTS, 1);
  const rows = members.map((m) => {
    const p = (progress && progress[m.id]) || {};
    let filled = 0, done = 0, last = 0;
    tasks.forEach((t) => {
      const d = Math.min(p[t.id]?.dots || 0, DOTS);
      filled += d;
      if (d >= DOTS) { done++; last = Math.max(last, p[t.id]?.completedAt || 0); }
    });
    return {
      ...m,
      filled,
      total,
      done,
      pct: Math.round((filled / total) * 100),
      finishedAt: done === tasks.length && tasks.length ? last : null
    };
  });
  rows.sort((a, b) => {
    if (b.filled !== a.filled) return b.filled - a.filled;
    if (a.finishedAt && b.finishedAt) return a.finishedAt - b.finishedAt;
    if (a.finishedAt) return -1;
    if (b.finishedAt) return 1;
    return (a.name || '').localeCompare(b.name || '');
  });
  let r = 0, prev = null;
  rows.forEach((row, i) => {
    if (prev === null || row.filled !== prev) r = i + 1;
    row.rank = r;
    prev = row.filled;
  });
  return rows;
}

// Are you ahead of, or behind, the schedule the milestone implies?
export function pace(milestone, myPct) {
  if (!milestone?.startDate || !milestone?.endDate) return null;
  const start = new Date(milestone.startDate).getTime();
  const end = new Date(milestone.endDate).getTime();
  const now = Date.now();
  if (!(end > start)) return null;
  const expected = Math.round(Math.min(Math.max((now - start) / (end - start), 0), 1) * 100);
  const daysLeft = Math.max(Math.ceil((end - now) / 86400000), 0);
  const delta = myPct - expected;
  return {
    expected,
    daysLeft,
    delta,
    state: delta >= 5 ? 'ahead' : delta <= -10 ? 'behind' : 'ontrack'
  };
}

/* ------------------------------------ seeding ------------------------------- */

// Writes to /quotes and /milestones now need an admin claim, so this can only
// run once an admin has signed in — not on first page load by a stranger.
export async function seedIfEmpty() {
  const snap = await get(ref(db, 'seeded'));
  if (snap.val()) return false;

  const quotes = {};
  QUOTES.forEach((q, i) => (quotes[`q${i}`] = q));

  const tasks = {};
  RAG_TASKS.forEach((t, i) => {
    // Everything starts shut. The admin opens the syllabus at the pace they want.
    tasks[`t${String(i + 1).padStart(2, '0')}`] = { ...t, locked: true };
  });

  const materials = {};
  RAG_MATERIALS.forEach((m, i) => (materials[`m${String(i + 1).padStart(2, '0')}`] = m));

  const start = new Date();
  const end = new Date(); end.setDate(end.getDate() + 56);

  await update(ref(db), {
    seeded: Date.now(),
    quotes,
    [`milestones/${RAG_MILESTONE.id}`]: {
      ...RAG_MILESTONE,
      startDate: start.toLocaleDateString('en-CA'),
      endDate: end.toLocaleDateString('en-CA'),
      createdAt: Date.now(),
      tasks,
      materials
    }
  });
  return true;
}

/**
 * Seed one milestone if it is not already there.
 *
 * Unlike seedIfEmpty, this keys on the milestone's own id rather than the global
 * /seeded flag — so a second milestone can be added to an already-seeded
 * database without touching the first, and without re-writing itself once an
 * admin has edited it. Existence is checked, so it is safe to call on every
 * admin sign-in. Admin-only by the rules (/milestones is admin-write), which is
 * why App only calls it for an admin.
 */
export async function seedMilestoneIfMissing(milestone, tasksList = [], materialsList = []) {
  const snap = await get(ref(db, `milestones/${milestone.id}`));
  if (snap.exists()) return false;

  const tasks = {};
  tasksList.forEach((t, i) => {
    // Everything starts shut. The admin opens the syllabus at the pace they want.
    tasks[`t${String(i + 1).padStart(2, '0')}`] = { ...t, locked: true };
  });

  const materials = {};
  materialsList.forEach((m, i) => (materials[`m${String(i + 1).padStart(2, '0')}`] = m));

  const start = new Date();
  const end = new Date(); end.setDate(end.getDate() + (milestone.durationWeeks || 8) * 7);

  await set(ref(db, `milestones/${milestone.id}`), {
    ...milestone,
    startDate: start.toLocaleDateString('en-CA'),
    endDate: end.toLocaleDateString('en-CA'),
    createdAt: Date.now(),
    tasks,
    materials
  });
  return true;
}

/* ---------------------------------- enrollment ------------------------------ */
// enrollments/{mid}/{uid} = { canChat, enrolledAt }
// A member can sit in several milestones. Chat rights are per milestone.

export const enroll = (mid, uid) =>
  set(ref(db, `enrollments/${mid}/${uid}`), { canChat: true, enrolledAt: Date.now() });

export const unenroll = async (mid, uid) => {
  await remove(ref(db, `enrollments/${mid}/${uid}`));
  await remove(ref(db, `progress/${mid}/${uid}`));
};

export const setChatRight = (mid, uid, canChat) =>
  update(ref(db, `enrollments/${mid}/${uid}`), { canChat });

export const rosterOf = (members, enrollments) => {
  const e = enrollments || {};
  return members
    .filter((m) => e[m.id])
    .map((m) => ({ ...m, canChat: e[m.id].canChat !== false, enrolledAt: e[m.id].enrolledAt }));
};

/* ------------------------------------- chat --------------------------------- */
// chat/{mid}/{msgId} = { uid, name, text, at }

export const sendMessage = (mid, msg) => push(ref(db, `chat/${mid}`), { ...msg, at: Date.now() });
export const deleteMessage = (mid, id) => remove(ref(db, `chat/${mid}/${id}`));
export const clearChat = (mid) => remove(ref(db, `chat/${mid}`));

/* --------------------------------- applications ----------------------------- */
// applications/{appId} = { mid, name, email, phone, course, status, at }
// A visitor is not signed in, so the write cannot come from the client —
// /applications is admin-only in the rules. submitApplication goes through a
// Cloud Function that writes with the Admin SDK; approve/reject are admin ops.

// Prospective student → admin. No account, no auth; the server does the write.
export const submitApplication = async (mid, { name, email, phone }) => {
  const fn = httpsCallable(fns, 'applyForEnrollment');
  await fn({ mid, name, email, phone });
};

// Approve = enrol into the milestone. Two cases:
//  - an existing student (app.uid set): just add the enrolment, one atomic
//    write, no new account and no PIN reset.
//  - a new applicant: create the account with the shared default PIN, marked
//    temporary so they must choose their own on first sign-in — the same
//    contract as any admin-created account.
export const approveApplication = async (appId, app) => {
  if (app.uid) {
    await update(ref(db), {
      [`enrollments/${app.mid}/${app.uid}`]: { canChat: true, enrolledAt: Date.now() },
      [`applications/${appId}/status`]: 'approved',
      [`applications/${appId}/memberId`]: app.uid,
      [`applications/${appId}/decidedAt`]: Date.now()
    });
    return app.uid;
  }

  const r = push(ref(db, 'members'));
  const uid = r.key;
  await set(r, { name: app.name, role: 'member', branch: '', joinedAt: Date.now() });
  await update(ref(db), {
    [`pins/${uid}`]: DEFAULT_PIN,
    [`mustChange/${uid}`]: true,
    [`enrollments/${app.mid}/${uid}`]: { canChat: true, enrolledAt: Date.now() },
    [`applications/${appId}/status`]: 'approved',
    [`applications/${appId}/memberId`]: uid,
    [`applications/${appId}/decidedAt`]: Date.now()
  });
  return uid;
};

export const rejectApplication = (appId) =>
  update(ref(db, `applications/${appId}`), { status: 'rejected', decidedAt: Date.now() });

export const deleteApplication = (appId) => remove(ref(db, `applications/${appId}`));
