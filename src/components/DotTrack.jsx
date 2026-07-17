import React from 'react';
import { DOTS, isLocked } from '../lib/store';

/**
 * The signature element: ten dots per task. Tap a dot to set progress to that
 * point; tap the dot you're already on to step back one.
 */
export default function DotTrack({ value = 0, onChange, readOnly = false, size = 'md' }) {
  const dim = size === 'sm' ? 'h-2.5 w-2.5' : 'h-5 w-5';
  const gap = size === 'sm' ? 'gap-1' : 'gap-1.5';
  const complete = value >= DOTS;

  return (
    <div className={`flex items-center ${gap}`} role={readOnly ? undefined : 'group'}
         aria-label={`Progress ${value} of ${DOTS}`}>
      {Array.from({ length: DOTS }).map((_, i) => {
        const on = i < value;
        const next = i + 1;
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(value === next ? i : next)}
            aria-label={`Set to ${next} of ${DOTS}`}
            className={[
              dim,
              'rounded-full border transition-all',
              readOnly ? 'cursor-default' : 'hover:scale-125 active:scale-95',
              on
                ? complete
                  ? 'bg-mint border-mint'
                  : 'bg-beam border-beam'
                : 'bg-transparent border-line hover:border-beam/70'
            ].join(' ')}
          />
        );
      })}
      {size !== 'sm' && (
        <span className={`ml-2 font-mono text-xs ${complete ? 'text-mint' : 'text-mist'}`}>
          {value}/{DOTS}
        </span>
      )}
    </div>
  );
}

/** A whole milestone squeezed into one strip — a learner's fingerprint. */
export function Fingerprint({ tasks, progress }) {
  return (
    <div className="flex gap-[3px] items-end h-6" aria-hidden="true">
      {tasks.map((t) => {
        const d = Math.min(progress?.[t.id]?.dots || 0, DOTS);
        const locked = isLocked(t);
        return (
          <div key={t.id}
               className={`w-[5px] rounded-sm h-6 flex flex-col justify-end overflow-hidden
                           ${locked ? 'bg-line/25' : 'bg-line/60'}`}>
            <div
              className={`w-full rounded-sm transition-all ${d >= DOTS ? 'bg-mint' : 'bg-beam'}`}
              style={{ height: `${(d / DOTS) * 100}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
