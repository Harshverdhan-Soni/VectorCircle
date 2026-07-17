const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

// The default initializeApp() resolves databaseURL from FIREBASE_CONFIG, which
// can point at <project>.firebaseio.com — a URL that does not exist for a
// regional database like asia-southeast1. Every read then returns null and all
// logins fail with "PIN does not match". Be explicit.
admin.initializeApp({
  databaseURL: process.env.DB_URL ||
    'https://vector-circle-default-rtdb.asia-southeast1.firebasedatabase.app'
});
const db = admin.database();

const DEFAULT_PIN = '1234';
const PIN_SHAPE = /^\d{4,6}$/;

/**
 * The only server-side code in the app.
 *
 * PIN login gives Firebase no identity of its own, so rules had nothing to
 * check and the database had to stay world-writable. This closes that: the
 * PIN is verified here with the Admin SDK (which bypasses rules), and the
 * caller gets a real auth token carrying their member id as the uid and an
 * `admin` claim. Every rule then keys off auth.uid — the client can no longer
 * assert who it is.
 *
 * PINs live at /pins/{uid}, which no student can read. They never travel to a
 * browser except the admin's own.
 */
exports.login = onCall({ region: 'asia-south1', cors: true }, async (req) => {
  const memberId = String(req.data?.memberId || '').trim();
  const pin = String(req.data?.pin || '').trim();

  if (!memberId || !pin) {
    throw new HttpsError('invalid-argument', 'Pick your name and enter your PIN.');
  }

  // Throttle by member: 8 wrong PINs in 15 minutes and that account pauses.
  // A 4-digit PIN is 10,000 guesses — trivial to grind without this.
  const gateRef = db.ref(`_loginGate/${memberId}`);
  const gate = (await gateRef.get()).val() || { fails: 0, until: 0 };
  const now = Date.now();
  if (gate.until > now) {
    const mins = Math.ceil((gate.until - now) / 60000);
    throw new HttpsError('resource-exhausted', `Too many wrong PINs. Try again in ${mins} minute(s).`);
  }

  const [pinSnap, memberSnap] = await Promise.all([
    db.ref(`pins/${memberId}`).get(),
    db.ref(`members/${memberId}`).get()
  ]);

  const member = memberSnap.val();
  let stored = pinSnap.val();

  // Accounts created before PINs moved out of /members still carry one inline.
  // Accept it once, then migrate it, so nobody has to hand-move records.
  let legacy = false;
  if (stored === null && member && member.pin !== undefined && member.pin !== null) {
    stored = member.pin;
    legacy = true;
  }

  if (!member || stored === null || String(stored) !== String(pin)) {
    const fails = gate.fails + 1;
    await gateRef.set({
      fails: fails >= 8 ? 0 : fails,
      until: fails >= 8 ? now + 15 * 60 * 1000 : 0
    });
    // Same message whether the name or the PIN is wrong — don't confirm
    // which member ids are real.
    throw new HttpsError('permission-denied', 'That PIN does not match. Try again.');
  }

  await gateRef.remove();

  if (legacy) {
    // Move it to /pins and strip it from the public /members record — where it
    // was readable by anyone with the database URL.
    await db.ref().update({
      [`pins/${memberId}`]: String(stored),
      [`members/${memberId}/pin`]: null
    });
  }

  const token = await admin.auth().createCustomToken(memberId, {
    admin: member.role === 'admin'
  });
  return { token, name: member.name, role: member.role };
});

/**
 * Change your own PIN. Students and admins both land here.
 *
 * /pins is admin-only by the rules, so a student cannot write their own PIN
 * directly — and we would not want them to without proving they know the
 * current one. Both checks happen here, against auth.uid, which the client
 * cannot spoof.
 */
exports.changePin = onCall({ region: 'asia-south1', cors: true }, async (req) => {
  const uid = req.auth?.uid;
  if (!uid) throw new HttpsError('unauthenticated', 'Sign in first.');

  const current = String(req.data?.currentPin || '').trim();
  const next = String(req.data?.newPin || '').trim();

  if (!PIN_SHAPE.test(next)) {
    throw new HttpsError('invalid-argument', 'New PIN must be 4 to 6 digits.');
  }
  if (next === DEFAULT_PIN) {
    // Letting someone "change" back to the default would defeat the forced
    // reset entirely.
    throw new HttpsError('invalid-argument', 'Pick something other than the default 1234.');
  }

  // Same throttle as login — otherwise this endpoint is a way to guess a PIN
  // that skips the lockout on the other one.
  const gateRef = db.ref(`_loginGate/${uid}`);
  const gate = (await gateRef.get()).val() || { fails: 0, until: 0 };
  const now = Date.now();
  if (gate.until > now) {
    const mins = Math.ceil((gate.until - now) / 60000);
    throw new HttpsError('resource-exhausted', `Too many wrong attempts. Try again in ${mins} minute(s).`);
  }

  let stored = (await db.ref(`pins/${uid}`).get()).val();
  if (stored === null) {
    stored = (await db.ref(`members/${uid}/pin`).get()).val();   // legacy
  }
  if (stored === null || String(stored) !== String(current)) {
    const fails = gate.fails + 1;
    await gateRef.set({
      fails: fails >= 8 ? 0 : fails,
      until: fails >= 8 ? now + 15 * 60 * 1000 : 0
    });
    throw new HttpsError('permission-denied', 'Your current PIN is wrong.');
  }
  if (next === current) {
    throw new HttpsError('invalid-argument', 'That is already your PIN.');
  }

  await gateRef.remove();
  await db.ref().update({
    [`pins/${uid}`]: next,
    [`members/${uid}/pin`]: null,  // clear any legacy copy
    [`mustChange/${uid}`]: null    // the forced-change flag, cleared
  });

  return { ok: true };
});
