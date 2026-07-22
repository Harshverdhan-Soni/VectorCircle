import React, { useMemo, useState } from 'react';
import { objToArr, submitApplication } from '../lib/store';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,19}$/;

/**
 * A visitor glances the curriculum, then asks to be enrolled. Minimal outline —
 * milestone summary and the course titles by week — so someone can decide
 * without an account. The form reaches the admin through a Cloud Function; it
 * grants nothing on its own.
 */
export default function CoursePreview({ milestone, onClose, existing = false, prefillName = '' }) {
  const [f, setF] = useState({ name: prefillName, email: '', phone: '' });
  const [state, setState] = useState('form'); // form | sending | done
  const [err, setErr] = useState('');

  // Week → titles, in the same order the students see on Track.
  const weeks = useMemo(() => {
    const tasks = objToArr(milestone.tasks).sort(
      (a, b) => (a.week || 0) - (b.week || 0) || (a.order || 0) - (b.order || 0)
    );
    const by = new Map();
    tasks.forEach((t) => {
      const w = t.week || 1;
      if (!by.has(w)) by.set(w, []);
      by.get(w).push(t);
    });
    return [...by.entries()];
  }, [milestone]);

  const courseCount = objToArr(milestone.tasks).length;

  const valid =
    f.name.trim().length > 0 &&
    EMAIL_RE.test(f.email.trim()) &&
    PHONE_RE.test(f.phone.trim());

  const submit = async () => {
    if (!valid) return;
    setState('sending');
    setErr('');
    try {
      await submitApplication(milestone.id, {
        name: f.name.trim(),
        email: f.email.trim(),
        phone: f.phone.trim()
      });
      setState('done');
    } catch (e) {
      // Firebase callable errors carry a readable message in .message.
      setErr(e?.message?.replace(/^.*?:\s*/, '') || 'Could not send your request. Try again.');
      setState('form');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="card w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto p-6 rounded-b-none sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{milestone.subtitle || 'Milestone'}</p>
            <h2 className="font-display text-2xl font-bold mt-1">{milestone.title}</h2>
          </div>
          <button onClick={onClose} className="btn-ghost !px-3 !py-1.5 text-sm shrink-0">Close</button>
        </div>

        {milestone.description && (
          <p className="text-mist text-sm leading-relaxed mt-3">{milestone.description}</p>
        )}

        <div className="flex items-center gap-4 mt-4 font-mono text-[11px] text-mist">
          <span>{courseCount} courses</span>
          <span>·</span>
          <span>{milestone.durationWeeks || '—'} weeks</span>
        </div>

        {/* Curriculum — minimal outline, titles by week */}
        <div className="mt-5">
          <p className="eyebrow mb-2.5">Curriculum</p>
          <div className="space-y-3">
            {weeks.map(([w, list]) => (
              <div key={w}>
                <p className="text-[11px] font-mono text-mist mb-1">Week {w}</p>
                <ul className="space-y-1">
                  {list.map((t) => (
                    <li key={t.id} className="text-sm flex gap-2">
                      <span className="text-line select-none">—</span>
                      <span>{t.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {!weeks.length && (
              <p className="text-mist text-sm">The course outline is being prepared.</p>
            )}
          </div>
        </div>

        {milestone.reward && (
          <p className="text-mist text-xs leading-relaxed mt-4 border-t border-line pt-4">
            <span className="text-beam">Reward · </span>{milestone.reward}
          </p>
        )}

        {/* Apply */}
        <div className="mt-6 border-t border-line pt-5">
          {state === 'done' ? (
            <div className="space-y-2">
              <p className="font-semibold text-mint">Your request is in.</p>
              <p className="text-mist text-sm leading-relaxed">
                {existing
                  ? 'The admin will review it and add this course to your account. It appears on your milestone picker once approved.'
                  : 'The admin will review it and set up your account. You will be given your name and a temporary PIN to sign in with.'}
              </p>
              <button className="btn-primary w-full mt-2" onClick={onClose}>Done</button>
            </div>
          ) : (
            <>
              <p className="eyebrow mb-3">Request to enrol</p>
              <div className="space-y-3">
                <input
                  className="field" placeholder="Full name" value={f.name}
                  onChange={(e) => setF({ ...f, name: e.target.value })}
                />
                <input
                  className="field" type="email" placeholder="Email" value={f.email}
                  inputMode="email" autoComplete="email"
                  onChange={(e) => setF({ ...f, email: e.target.value })}
                />
                <input
                  className="field" placeholder="Contact number" value={f.phone}
                  inputMode="tel" autoComplete="tel"
                  onChange={(e) => setF({ ...f, phone: e.target.value })}
                />
              </div>
              {err && <p className="text-rose text-xs mt-2">{err}</p>}
              <button
                className="btn-primary w-full mt-4"
                onClick={submit}
                disabled={!valid || state === 'sending'}
              >
                {state === 'sending' ? 'Sending…' : 'Send request to admin'}
              </button>
              <p className="text-mist text-[11px] leading-relaxed mt-3">
                Your details go to the admin only, to set up your enrolment. This does not sign you in.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
