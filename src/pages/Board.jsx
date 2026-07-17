import React, { useEffect, useState } from 'react';
import { Fingerprint } from '../components/DotTrack';
import { listen, streakLength } from '../lib/store';

const MEDAL = ['', '🥇', '🥈', '🥉'];

export default function Board({ me, milestone, tasks, progress, rows }) {
  const [streaks, setStreaks] = useState({});
  useEffect(() => listen('streaks', (v) => {
    const out = {};
    Object.entries(v || {}).forEach(([uid, days]) => (out[uid] = streakLength(days)));
    setStreaks(out);
  }), []);

  const champion = rows.find((r) => r.finishedAt);

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Leaderboard</p>
        <h1 className="font-display text-2xl font-bold mt-1">{milestone.title}</h1>
        <p className="text-mist text-sm mt-1">
          Ranked on dots filled. Ties go to whoever got there first.
        </p>
      </div>

      {champion && (
        <div className="card p-5 border-mint/40 bg-mint/5">
          <p className="eyebrow text-mint">Milestone cleared</p>
          <p className="font-display text-lg font-bold mt-1">{champion.name}</p>
          <p className="text-mist text-xs mt-1">
            Finished {new Date(champion.finishedAt).toLocaleDateString()} · takes the Specialist badge.
          </p>
        </div>
      )}

      <div className="space-y-2">
        {rows.map((r) => {
          const isMe = r.id === me.id;
          return (
            <div
              key={r.id}
              className={`card p-4 flex items-center gap-4 transition ${
                isMe ? 'border-beam/60 shadow-beam' : ''
              }`}
            >
              <div className="w-8 text-center shrink-0">
                {r.rank <= 3 && r.filled > 0
                  ? <span className="text-lg">{MEDAL[r.rank]}</span>
                  : <span className="font-mono text-sm text-mist">{r.rank}</span>}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-display font-semibold truncate">{r.name}</p>
                  {isMe && <span className="chip border-beam/50 text-beam">you</span>}
                  {streaks[r.id] > 2 && (
                    <span className="font-mono text-[10px] text-amber">🔥{streaks[r.id]}</span>
                  )}
                </div>
                <p className="eyebrow mt-0.5">
                  {r.branch || 'NIT Silchar'} · {r.done}/{tasks.length} tasks
                </p>
                <div className="mt-2">
                  <Fingerprint tasks={tasks} progress={progress[r.id]} />
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-mono text-xl font-semibold">{r.pct}%</p>
                <p className="eyebrow">{r.filled} dots</p>
              </div>
            </div>
          );
        })}
        {!rows.length && <p className="text-mist text-sm">No members yet.</p>}
      </div>

      <p className="text-mist/60 text-[11px] leading-relaxed">
        Each bar in the strip is one task, filled to the dots logged. The whole strip is the milestone.
      </p>
    </div>
  );
}
