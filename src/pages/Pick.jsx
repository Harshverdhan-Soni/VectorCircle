import React from 'react';
import { APP_NAME } from '../data/seed';
import { objToArr } from '../lib/store';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';

/**
 * Entry screen. Pick the milestone you're enrolled in — that decides which
 * roster you sign in against. Admins skip the roster and sign in separately.
 */
export default function Pick({ milestones, enrollments, onPick, onAdmin }) {
  const live = milestones.filter((m) => m.active !== false);

  return (
    <div className="min-h-dvh flex flex-col px-5 py-10">
      <div className="max-w-lg w-full mx-auto flex-1">
        <div className="flex items-start justify-between gap-4">
          <Logo size={40} tagline />
          <ThemeToggle />
        </div>
        <h1 className="font-display text-3xl font-bold mt-8 leading-tight">
          Which milestone are you<br />running?
        </h1>
        <p className="text-mist text-sm mt-3">
          Pick yours to see your circle and sign in.
        </p>

        <div className="mt-8 space-y-3">
          {live.map((m) => {
            const tasks = objToArr(m.tasks);
            const count = Object.keys(enrollments?.[m.id] || {}).length;
            return (
              <button
                key={m.id}
                onClick={() => onPick(m.id)}
                className="card w-full p-5 text-left hover:border-beam/60 hover:shadow-beam transition group"
              >
                <p className="eyebrow">{m.subtitle || 'Milestone'}</p>
                <p className="font-display text-xl font-bold mt-1 group-hover:text-beam transition">
                  {m.title}
                </p>
                <div className="flex items-center gap-4 mt-3 font-mono text-[11px] text-mist">
                  <span>{tasks.length} courses</span>
                  <span>·</span>
                  <span>{m.durationWeeks || '—'} weeks</span>
                  <span>·</span>
                  <span>{count} enrolled</span>
                </div>
                {/* the milestone's own shape, drawn from its weeks */}
                <div className="flex gap-[3px] mt-4">
                  {tasks.slice(0, 30).map((t, i) => (
                    <span key={i} className="h-1 flex-1 rounded-full bg-line group-hover:bg-beam/40 transition"
                          style={{ transitionDelay: `${i * 15}ms` }} />
                  ))}
                </div>
              </button>
            );
          })}
          {!live.length && (
            <p className="text-mist text-sm">
              No milestone is running yet. An admin can create one below.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-lg w-full mx-auto pt-10">
        <div className="h-px bg-line mb-5" />
        <button onClick={onAdmin} className="btn-ghost w-full">
          Sign in as admin
        </button>
      </div>
    </div>
  );
}
