import React, { useState } from 'react';
import { changePin } from '../lib/auth';
import { Mark } from './Logo';

/**
 * Two jobs, one screen:
 *  - forced: shown as a gate after an admin reset or on a new account. There's
 *    no way past it and no sign-out shortcut round it.
 *  - voluntary: opened from the header, dismissible.
 */
export default function ChangePin({ me, forced = false, onDone, onCancel }) {
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [again, setAgain] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);

  const digits = (v) => v.replace(/\D/g, '');

  const submit = async () => {
    if (!/^\d{4,6}$/.test(next)) return setError('New PIN must be 4 to 6 digits.');
    if (next !== again) return setError('The two new PINs do not match.');
    setBusy(true); setError('');
    try {
      await changePin(cur, next);
      setOk(true);
      setTimeout(() => onDone?.(), 900);
    } catch (e) {
      setError(e?.message || 'Could not change your PIN.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-dvh grid place-items-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-start gap-3.5">
          <Mark size={38} className="text-chalk shrink-0 mt-0.5" />
          <div>
            <p className="eyebrow">{forced ? 'One step first' : 'Your account'}</p>
            <h1 className="font-display text-2xl font-bold mt-1">
              {forced ? 'Choose your own PIN' : 'Change PIN'}
            </h1>
          </div>
        </div>

        <div className="card p-6">
          {forced && (
            <p className="text-mist text-sm mb-5 leading-relaxed">
              Your PIN was set by an admin, so other people have seen it. Pick one
              only you know — it's what keeps someone else off your board.
            </p>
          )}

          {ok ? (
            <p className="text-mint text-sm font-semibold py-4 text-center">
              Done. Your new PIN is saved.
            </p>
          ) : (
            <>
              <label className="eyebrow block mb-2">Current PIN</label>
              <input
                className="field font-mono tracking-[0.4em] text-center mb-4"
                type="password" inputMode="numeric" maxLength={6} placeholder="••••••"
                value={cur} onChange={(e) => { setCur(digits(e.target.value)); setError(''); }}
              />

              <label className="eyebrow block mb-2">New PIN</label>
              <input
                className="field font-mono tracking-[0.4em] text-center mb-4"
                type="password" inputMode="numeric" maxLength={6} placeholder="••••••"
                value={next} onChange={(e) => { setNext(digits(e.target.value)); setError(''); }}
              />

              <label className="eyebrow block mb-2">New PIN again</label>
              <input
                className="field font-mono tracking-[0.4em] text-center mb-5"
                type="password" inputMode="numeric" maxLength={6} placeholder="••••••"
                value={again} onChange={(e) => { setAgain(digits(e.target.value)); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
              />

              {error && <p className="text-rose text-xs mb-4">{error}</p>}

              <button className="btn-primary w-full" onClick={submit} disabled={busy}>
                {busy ? 'Saving…' : 'Save new PIN'}
              </button>
              {!forced && (
                <button className="btn-ghost w-full mt-2" onClick={onCancel}>Cancel</button>
              )}
              <p className="text-mist text-[11px] mt-4 leading-relaxed">
                4 to 6 digits. Six is meaningfully harder to guess than four.
                It can't be 1234.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
