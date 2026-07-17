import React, { useEffect, useMemo, useState } from 'react';
import DotTrack from '../components/DotTrack';
import {
  DOTS, setDots, pace, listen, streakLength, checkIn, todayKey,
  objToArr, postNote, isLocked
} from '../lib/store';

const TYPE_STYLE = {
  course:  'border-beam/40 text-beam',
  paper:   'border-amber/40 text-amber',
  project: 'border-mint/40 text-mint',
  reference: 'border-line text-mist'
};

export default function Home({ me, milestone, tasks, progress, rows }) {
  const mine = progress?.[me.id] || {};
  const myRow = rows.find((r) => r.id === me.id);
  const p = pace(milestone, myRow?.pct || 0);

  const [streak, setStreak] = useState(0);
  const [checkedToday, setCheckedToday] = useState(false);
  const [minutes, setMinutes] = useState('');

  useEffect(() => listen(`streaks/${me.id}`, (v) => {
    setStreak(streakLength(v));
    setCheckedToday(Boolean(v?.[todayKey()]));
  }), [me.id]);

  const byWeek = useMemo(() => {
    const g = {};
    tasks.forEach((t) => { (g[t.week || 0] ||= []).push(t); });
    return Object.entries(g).sort((a, b) => a[0] - b[0]);
  }, [tasks]);

  const paceLabel = {
    ahead: ['Ahead of pace', 'text-mint'],
    ontrack: ['On pace', 'text-beam'],
    behind: ['Behind pace', 'text-amber']
  };

  return (
    <div className="space-y-6">
      {/* ---- milestone header ------------------------------------------------ */}
      <section className="card p-5">
        <p className="eyebrow">{milestone.subtitle || 'Milestone'}</p>
        <h1 className="font-display text-2xl font-bold mt-1">{milestone.title}</h1>
        <p className="text-mist text-sm mt-2 leading-relaxed">{milestone.description}</p>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-4xl font-semibold text-chalk leading-none">
              {myRow?.pct || 0}<span className="text-mist text-xl">%</span>
            </p>
            <p className="eyebrow mt-2">
              {myRow?.filled || 0} of {tasks.length * DOTS} dots · rank #{myRow?.rank || '—'}
            </p>
            <p className="text-mist text-[11px] mt-1">
              {tasks.filter((t) => !isLocked(t)).length} of {tasks.length} courses open
            </p>
          </div>
          {p && (
            <div className="text-right">
              <p className={`font-display font-semibold ${paceLabel[p.state][1]}`}>
                {paceLabel[p.state][0]}
              </p>
              <p className="eyebrow mt-1">
                {p.daysLeft} days left · target {p.expected}%
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 h-1.5 rounded-full bg-line overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              p?.state === 'behind' ? 'bg-amber' : 'bg-beam'
            }`}
            style={{ width: `${myRow?.pct || 0}%` }}
          />
          {p && (
            <div className="absolute top-0 bottom-0 w-px bg-chalk/70" style={{ left: `${p.expected}%` }} />
          )}
        </div>
        {milestone.reward && (
          <p className="mt-4 text-xs text-mist border-l-2 border-mint/50 pl-3 leading-relaxed">
            <span className="text-mint font-semibold">Reward · </span>{milestone.reward}
          </p>
        )}
      </section>

      {/* ---- daily check-in -------------------------------------------------- */}
      <section className="card p-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="eyebrow">Study streak</p>
          <p className="font-mono text-2xl font-semibold mt-1">
            {streak} <span className="text-mist text-sm">day{streak === 1 ? '' : 's'}</span>
          </p>
        </div>
        {checkedToday ? (
          <p className="text-mint text-sm font-semibold">Logged for today. See you tomorrow.</p>
        ) : (
          <div className="flex gap-2 items-center">
            <input
              className="field !w-24 font-mono" type="number" min="1" placeholder="mins"
              value={minutes} onChange={(e) => setMinutes(e.target.value)}
            />
            <button className="btn-primary" onClick={() => checkIn(me.id, minutes)} disabled={!minutes}>
              Log today
            </button>
          </div>
        )}
      </section>

      {/* ---- tasks ----------------------------------------------------------- */}
      {byWeek.map(([week, list]) => (
        <section key={week}>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="font-display font-semibold text-sm">Week {week}</h2>
            <span className="eyebrow">{list[0]?.stage}</span>
            <div className="flex-1 h-px bg-line" />
            <span className="font-mono text-[11px] text-mist">
              {list.filter((t) => (mine[t.id]?.dots || 0) >= DOTS).length}/{list.length} done
              {list.every(isLocked) && <span className="text-amber ml-2">locked</span>}
            </span>
          </div>
          <div className="space-y-3">
            {list.map((t) => (
              <TaskCard
                key={t.id} task={t} me={me} mid={milestone.id}
                locked={isLocked(t)}
                value={Math.min(mine[t.id]?.dots || 0, DOTS)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function TaskCard({ task, me, mid, value, locked = false }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [draft, setDraft] = useState('');
  const [saveError, setSaveError] = useState('');
  const done = value >= DOTS;

  // The dot track renders whatever the database says. So a rejected write is
  // invisible — the dot just doesn't move, and the student assumes the app is
  // broken. Say what happened instead.
  const save = async (v) => {
    setSaveError('');
    try {
      await setDots(mid, me.id, task.id, v);
    } catch (e) {
      console.error('[setDots]', task.id, e.code, e.message);
      setSaveError(
        e?.message?.includes('permission_denied') || e?.code === 'PERMISSION_DENIED'
          ? 'Could not save — the database refused this. If the course was just unlocked, reload the page.'
          : `Could not save: ${e.message}`
      );
    }
  };

  useEffect(() => {
    if (!open || locked) return;
    return listen(`notes/${mid}/${task.id}`, (v) =>
      setNotes(objToArr(v).sort((a, b) => b.at - a.at))
    );
  }, [open, mid, task.id]);

  const send = () => {
    if (!draft.trim()) return;
    postNote(mid, task.id, { by: me.name, uid: me.id, text: draft.trim() });
    setDraft('');
  };

  return (
    <article className={`card p-4 transition ${done ? 'border-mint/30' : ''} ${locked ? 'border-dashed' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`min-w-0 ${locked ? 'opacity-55' : ''}`}>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`chip ${TYPE_STYLE[task.type] || TYPE_STYLE.reference}`}>{task.type}</span>
            <span className="font-mono text-[10px] text-mist">{task.hours}h</span>
            {locked && (
              <span className="chip border-amber/50 text-amber bg-amber/10 flex items-center gap-1">
                <LockIcon /> locked
              </span>
            )}
          </div>
          <h3 className="font-display font-semibold leading-snug">{task.title}</h3>
          <p className="text-mist text-xs mt-0.5">{task.provider}</p>
          {task.outcome && (
            <p className="text-mist/90 text-xs mt-2 leading-relaxed">{task.outcome}</p>
          )}
        </div>
        {locked ? (
          <span className="btn-ghost !px-3 !py-1.5 text-xs shrink-0 opacity-40 pointer-events-none"
                aria-disabled="true">
            Locked
          </span>
        ) : (
          <a href={task.url} target="_blank" rel="noreferrer"
             className="btn-ghost !px-3 !py-1.5 text-xs shrink-0">
            Open ↗
          </a>
        )}
      </div>

      {locked ? (
        // Deliberately still on screen: seeing the whole road is the point.
        // It just isn't yours to walk yet.
        <p className="mt-4 text-[11px] text-mist border-l-2 border-amber/40 pl-3 leading-relaxed">
          Your admin opens this one when the circle gets here.
        </p>
      ) : (
        <>
          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <DotTrack value={value} onChange={save} />
            <button className="eyebrow hover:text-chalk transition" onClick={() => setOpen(!open)}>
              {open ? 'Hide notes' : 'Notes'}
            </button>
          </div>
          {saveError && <p className="text-rose text-xs mt-2.5 leading-relaxed">{saveError}</p>}
        </>
      )}

      {open && !locked && (
        <div className="mt-4 pt-4 border-t border-line space-y-3">
          <div className="flex gap-2">
            <input
              className="field" placeholder="Ask a doubt, or leave a tip for the circle…"
              value={draft} onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button className="btn-primary !px-3" onClick={send}>Post</button>
          </div>
          {notes.length === 0 && <p className="text-mist text-xs">No notes on this one yet. Start it off.</p>}
          {notes.map((n) => (
            <div key={n.id} className="text-xs">
              <span className="font-mono text-beam">{n.by}</span>
              <span className="text-mist/60 ml-2">{new Date(n.at).toLocaleDateString()}</span>
              <p className="text-chalk/90 mt-0.5 leading-relaxed">{n.text}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}


function LockIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.5" aria-hidden="true">
      <rect x="4" y="10.5" width="16" height="11" rx="2.5" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  );
}
