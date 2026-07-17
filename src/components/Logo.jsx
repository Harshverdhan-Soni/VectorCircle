import React, { useId } from 'react';
import { APP_NAME } from '../data/seed';

/**
 * The mark: fourteen vectors, one per student, each a line running inward from
 * a dot on the ring toward a shared core. Lengths differ — nobody is at the
 * same place. The core is the knowledge base: it only exists because the ring
 * points at it.
 *
 * Read it as an embedding cluster, or as people sitting in a circle. Both are
 * the same picture.
 */

const N = 14;
// Deterministic length variation. Each student is somewhere different on the
// way in — that's the whole premise of the app.
const REACH = [0.94, 0.62, 0.78, 1.0, 0.55, 0.86, 0.7, 0.98, 0.6, 0.82, 0.74, 0.9, 0.66, 0.5];

const R_OUT = 27;
const R_CORE = 11;

function spokes() {
  return REACH.map((reach, i) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    const cos = Math.cos(a), sin = Math.sin(a);
    const x1 = 32 + cos * R_OUT, y1 = 32 + sin * R_OUT;
    const len = (R_OUT - R_CORE) * reach;
    const x2 = 32 + cos * (R_OUT - len), y2 = 32 + sin * (R_OUT - len);
    return { x1, y1, x2, y2, i, arrived: reach > 0.9 };
  });
}

export function Mark({ size = 40, animated = false, className = '' }) {
  const id = useId();
  const rings = spokes();

  return (
    <svg
      width={size} height={size} viewBox="0 0 64 64" fill="none"
      className={className} role="img" aria-label={`${APP_NAME} logo`}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--grad-a)" />
          <stop offset="1" stopColor="var(--grad-b)" />
        </linearGradient>
        <radialGradient id={`${id}-core`}>
          <stop offset="0" stopColor="var(--grad-b)" />
          <stop offset="1" stopColor="var(--grad-a)" />
        </radialGradient>
      </defs>

      {/* the circle they sit in */}
      <circle cx="32" cy="32" r={R_OUT} stroke="currentColor" strokeOpacity=".22" strokeWidth="1" />

      {/* each student, pointed inward, at their own distance */}
      {rings.map((s) => (
        <g key={s.i}>
          <line
            x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke={`url(#${id}-g)`} strokeWidth="1.6" strokeLinecap="round"
            strokeOpacity={s.arrived ? 1 : 0.6}
            className={animated ? 'animate-drawIn' : ''}
            style={animated ? { strokeDasharray: 40, animationDelay: `${300 + s.i * 55}ms` } : undefined}
          />
          <circle
            cx={s.x1} cy={s.y1} r="2.4" fill={`url(#${id}-g)`}
            className={animated ? 'animate-drawIn' : ''}
            style={animated ? { animationDelay: `${s.i * 55}ms` } : undefined}
          />
        </g>
      ))}

      {/* the knowledge base — held up by the ring, not by itself */}
      <circle
        cx="32" cy="32" r={R_CORE} fill="currentColor" fillOpacity=".08"
        stroke={`url(#${id}-g)`} strokeWidth="1.2" strokeOpacity=".55"
      />
      <circle
        cx="32" cy="32" r="5" fill={`url(#${id}-core)`}
        className={animated ? 'animate-breathe' : ''}
        style={{ transformOrigin: '32px 32px' }}
      />
    </svg>
  );
}

export default function Logo({ size = 34, animated = false, tagline = false }) {
  return (
    <div className="flex items-center gap-3">
      <Mark size={size} animated={animated} className="text-chalk shrink-0" />
      <div className="min-w-0">
        <p className="font-display font-bold tracking-tight leading-none" style={{ fontSize: size * 0.5 }}>
          {APP_NAME}
        </p>
        {tagline && <p className="eyebrow mt-1.5">NIT Silchar</p>}
      </div>
    </div>
  );
}
