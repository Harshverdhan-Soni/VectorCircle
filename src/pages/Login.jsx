import React, { useState } from 'react';
import { APP_NAME } from '../data/seed';
import { Mark } from '../components/Logo';
import { signIn } from '../lib/auth';
import PersonSelect from '../components/PersonSelect';

// Setup faults a student can't fix but an admin can — say which is which.
const SIGN_IN_ERRORS = {
  'auth/configuration-not-found':
    'Firebase Authentication is not enabled on this project. An admin needs to open Firebase Console → Authentication → Get started.',
  'auth/invalid-custom-token': 'The sign-in token was rejected. Tell an admin.',
  'auth/network-request-failed': 'No connection. Check your network and try again.',
  'functions/not-found': 'Login service not found — the Cloud Function may not be deployed, or is in a different region.',
  'functions/internal': 'The login service hit an error. Tell an admin to check the function logs.',
  'functions/unavailable': 'Cannot reach the login service. Check your connection and try again.',
  'functions/unauthenticated': 'The login service refused the request.'
};
import ThemeToggle from '../components/ThemeToggle';

/**
 * Two modes:
 *  - member: names enrolled in the chosen milestone
 *  - admin:  every admin account, no milestone needed
 */
export default function Login({ mode, milestone, roster, admins, onSignedIn, onBack }) {
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const isAdminMode = mode === 'admin';
  const pool = isAdminMode ? admins : roster;

  // The PIN is checked on the server. The browser never sees the real one.
  const submit = async () => {
    if (!id) return setError('Pick your name first.');
    if (pin.length < 4) return setError('Enter your PIN.');
    setBusy(true); setError('');
    try {
      const member = await signIn(id, pin);
      if (isAdminMode && member.role !== 'admin') {
        setError('This account is not an admin.');
      } else {
        onSignedIn(member);
      }
    } catch (e) {
      // Match codes exactly. A substring check on 'not-found' once turned
      // auth/configuration-not-found into "the function isn't deployed", which
      // sent us hunting in entirely the wrong place.
      const code = e?.code || '';
      console.error('[signIn]', code, e?.message);
      setError(SIGN_IN_ERRORS[code] || e?.message || 'Could not sign in. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-dvh grid place-items-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="eyebrow hover:text-chalk transition">← Back</button>
          <ThemeToggle />
        </div>

        <div className="mb-7 flex items-start gap-3.5">
          <Mark size={38} className="text-chalk shrink-0 mt-0.5" />
          <div className="min-w-0">
          <p className="eyebrow">{isAdminMode ? `${APP_NAME} · admin` : 'Signing in to'}</p>
          <h1 className="font-display text-2xl font-bold mt-1.5">
            {isAdminMode ? 'Run the circle' : milestone?.title}
          </h1>
          {!isAdminMode && (
            <p className="text-mist text-sm mt-1.5">
              {roster.length} student{roster.length === 1 ? '' : 's'} enrolled.
            </p>
          )}
          </div>
        </div>

        <div className="card p-6">
          <label className="eyebrow block mb-2">Your name</label>
          <div className="mb-4">
            <PersonSelect
              people={pool}
              value={id}
              onChange={(v) => { setId(v); setError(''); }}
              placeholder={isAdminMode ? 'Select an admin…' : 'Find your name…'}
            />
          </div>

          <label className="eyebrow block mb-2">PIN</label>
          <input
            className="field font-mono tracking-[0.4em] text-center mb-5"
            type="password" inputMode="numeric" maxLength={6} placeholder="••••••"
            value={pin}
            onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />

          {error && <p className="text-rose text-xs mb-4">{error}</p>}
          <button className="btn-signin w-full" onClick={submit} disabled={busy}>
            {busy ? 'Checking…' : 'Sign in'}
          </button>
        </div>

        {!pool.length && (
          <p className="text-mist text-xs text-center mt-5 leading-relaxed">
            {isAdminMode
              ? 'No admin account yet. Create one in the Realtime Database: members/<id> = {name, pin, role:"admin"}'
              : 'Nobody is enrolled in this milestone yet. An admin enrols students from Admin → Roster.'}
          </p>
        )}
      </div>
    </div>
  );
}
