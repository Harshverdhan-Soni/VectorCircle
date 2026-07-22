import React, { useState } from 'react';
import { objToArr } from '../lib/store';
import CoursePreview from './CoursePreview';

/**
 * A signed-in student browsing courses they are not yet in. Applying here goes
 * through the same Cloud Function — but because they are authenticated, their
 * request carries their uid, so approval enrols the account they already have
 * rather than making a new one.
 */
export default function ExploreCourses({ milestones, enrolledIds, meName, onClose }) {
  const [pick, setPick] = useState(null);
  const live = milestones.filter((m) => m.active !== false);

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
            <p className="eyebrow">Explore</p>
            <h2 className="font-display text-2xl font-bold mt-1">Other courses</h2>
          </div>
          <button onClick={onClose} className="btn-ghost !px-3 !py-1.5 text-sm shrink-0">Close</button>
        </div>
        <p className="text-mist text-sm mt-3">
          Glance a course and ask the admin to add it to your account.
        </p>

        <div className="mt-5 space-y-3">
          {live.map((m) => {
            const enrolled = enrolledIds.has(m.id);
            const count = objToArr(m.tasks).length;
            return (
              <div key={m.id} className="card p-4">
                <p className="eyebrow">{m.subtitle || 'Milestone'}</p>
                <p className="font-display text-lg font-bold mt-1">{m.title}</p>
                <div className="flex items-center gap-3 mt-2 font-mono text-[11px] text-mist">
                  <span>{count} courses</span>
                  <span>·</span>
                  <span>{m.durationWeeks || '—'} weeks</span>
                </div>
                <div className="mt-3">
                  {enrolled ? (
                    <span className="chip !px-2.5 !py-1 border-mint/50 text-mint bg-mint/10">
                      Enrolled
                    </span>
                  ) : (
                    <button className="btn-primary w-full !py-2" onClick={() => setPick(m)}>
                      View &amp; apply
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {!live.length && (
            <p className="text-mist text-sm">No other courses are running yet.</p>
          )}
        </div>
      </div>

      {pick && (
        <CoursePreview
          milestone={pick}
          existing
          prefillName={meName}
          onClose={() => setPick(null)}
        />
      )}
    </div>
  );
}
