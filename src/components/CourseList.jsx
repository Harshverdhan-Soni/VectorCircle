import React, { useEffect, useRef, useState } from 'react';
import { reorderTasks, setTaskLocked, setTasksLocked, isLocked } from '../lib/store';

/**
 * Reorder the syllabus by dragging.
 *
 * Two rules make this behave the way you'd expect:
 *  - Sequence is authoritative. On save every course is renumbered 1..n, so
 *    `order` can never drift out of step with the list you're looking at.
 *  - A course inherits the week of whatever it lands under. Drop something
 *    beneath the Week 3 rows and it becomes a Week 3 course — no second trip
 *    to the edit form. Track groups by week, so the two screens stay identical.
 *
 * HTML5 drag events do not fire on touch, so every row also has ↑ ↓ buttons.
 * Those are the keyboard path too.
 */
export default function CourseList({ mid, tasks, onEdit, onDelete }) {
  const openCount = tasks.filter((t) => !isLocked(t)).length;
  const [list, setList] = useState(tasks);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragId, setDragId] = useState(null);
  const from = useRef(null);

  // Don't let a live database update yank the list out from under a drag.
  useEffect(() => { if (!dirty && !dragId) setList(tasks); }, [tasks, dirty, dragId]);

  const move = (a, b) => {
    if (b < 0 || b >= list.length || a === b) return;
    const next = [...list];
    const [item] = next.splice(a, 1);
    // Inherit the week of the row above; if dropped at the very top, take the
    // week of the row that used to be first.
    const above = next[b - 1];
    const below = next[b];
    item.week = above ? above.week : below ? below.week : item.week;
    next.splice(b, 0, item);
    setList(next);
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      await reorderTasks(mid, list);
      setDirty(false);
    } catch (e) {
      alert(`Could not save the order: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const reset = () => { setList(tasks); setDirty(false); };

  let lastWeek = null;

  // Unlocking a whole week at a time is the move that actually gets used —
  // Monday morning, open week 3, tell the circle.
  const weekTasks = (w) => list.filter((t) => t.week === w);

  return (
    <div className="space-y-2">
      <div className="card p-3 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-mist">
          <span className="text-chalk font-semibold">{openCount}</span> of {tasks.length} open to students
        </p>
        <div className="flex gap-2">
          <button className="btn-ghost !py-1.5 !px-3 text-xs"
                  onClick={() => confirm(`Unlock all ${tasks.length} courses for everyone?`) && setTasksLocked(mid, tasks, false)}>
            Unlock all
          </button>
          <button className="btn-ghost !py-1.5 !px-3 text-xs"
                  onClick={() => confirm('Lock every course? Students keep their dots — they just cannot add more.') && setTasksLocked(mid, tasks, true)}>
            Lock all
          </button>
        </div>
      </div>
      {dirty && (
        <div className="sticky top-16 z-20 card p-3 border-beam/50 flex items-center justify-between gap-3">
          <p className="text-xs text-mist">Sequence changed. Nothing is saved yet.</p>
          <div className="flex gap-2">
            <button className="btn-ghost !py-1.5 !px-3 text-xs" onClick={reset} disabled={saving}>
              Discard
            </button>
            <button className="btn-primary !py-1.5 !px-3 text-xs" onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save order'}
            </button>
          </div>
        </div>
      )}

      {list.map((t, i) => {
        const newWeek = t.week !== lastWeek;
        lastWeek = t.week;
        return (
          <React.Fragment key={t.id}>
            {newWeek && (
              <div className="flex items-center gap-3 pt-3 pb-1">
                <span className="eyebrow">Week {t.week}</span>
                <div className="flex-1 h-px bg-line" />
                <button
                  className="eyebrow hover:text-beam transition"
                  onClick={() => {
                    const wk = weekTasks(t.week);
                    setTasksLocked(mid, wk, !wk.every((x) => !isLocked(x)));
                  }}
                >
                  {weekTasks(t.week).every((x) => !isLocked(x)) ? 'lock week' : 'unlock week'}
                </button>
              </div>
            )}

            <div
              draggable
              onDragStart={(e) => {
                from.current = i; setDragId(t.id);
                e.dataTransfer.effectAllowed = 'move';
                // Firefox refuses to start a drag without payload.
                e.dataTransfer.setData('text/plain', t.id);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                if (from.current === null || from.current === i) return;
                move(from.current, i);
                from.current = i;
              }}
              onDragEnd={() => { from.current = null; setDragId(null); }}
              className={`card p-3 flex items-center gap-2.5 transition
                          ${dragId === t.id ? 'opacity-40 border-beam' : ''}`}
            >
              <span className="cursor-grab active:cursor-grabbing text-mist hover:text-chalk shrink-0 px-0.5"
                    title="Drag to reorder">
                <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor" aria-hidden="true">
                  {[2, 8, 14].map((y) => (
                    <React.Fragment key={y}>
                      <circle cx="3" cy={y} r="1.5" />
                      <circle cx="9" cy={y} r="1.5" />
                    </React.Fragment>
                  ))}
                </svg>
              </span>

              <span className="font-mono text-[11px] text-mist w-6 shrink-0 text-right">{i + 1}</span>

              <div className={`min-w-0 flex-1 ${isLocked(t) ? 'opacity-55' : ''}`}>
                <p className="font-semibold text-sm truncate">{t.title}</p>
                <p className="text-mist text-[11px] truncate">
                  {t.provider} · {t.type} · {t.hours}h
                </p>
              </div>

              <button
                onClick={() => setTaskLocked(mid, t.id, !isLocked(t))}
                title={isLocked(t) ? 'Locked — students can see it but not start it' : 'Open to students'}
                className={`chip !px-2 !py-1 shrink-0 transition ${
                  isLocked(t)
                    ? 'border-amber/50 text-amber bg-amber/10'
                    : 'border-mint/50 text-mint bg-mint/10'
                }`}
              >
                {isLocked(t) ? 'locked' : 'open'}
              </button>

              <div className="flex flex-col shrink-0">
                <button onClick={() => move(i, i - 1)} disabled={i === 0}
                        className="text-mist hover:text-beam disabled:opacity-25 leading-none px-1"
                        aria-label="Move up">▲</button>
                <button onClick={() => move(i, i + 1)} disabled={i === list.length - 1}
                        className="text-mist hover:text-beam disabled:opacity-25 leading-none px-1"
                        aria-label="Move down">▼</button>
              </div>

              <a href={t.url} target="_blank" rel="noreferrer"
                 className="btn-ghost !px-2.5 !py-1 text-xs hidden sm:inline-flex">Open</a>
              <button className="btn-ghost !px-2.5 !py-1 text-xs" onClick={() => onEdit(t)}>Edit</button>
              <button className="btn-danger !px-2.5 !py-1 text-xs" onClick={() => onDelete(t)}>Delete</button>
            </div>
          </React.Fragment>
        );
      })}

      {!list.length && <p className="text-mist text-sm card p-4">No courses yet. Add the first one.</p>}
    </div>
  );
}
