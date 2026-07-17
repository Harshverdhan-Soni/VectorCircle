import React, { useEffect, useMemo, useState } from 'react';
import { APP_NAME } from '../data/seed';
import { Mark } from '../components/Logo';

const FALLBACK = { text: 'Arise, awake, and stop not till the goal is reached.', author: 'Swami Vivekananda' };

export default function Splash({ quotes, onDone }) {
  const [go, setGo] = useState(false);

  // One quote per day, same for everyone in the circle. Shared reference point.
  const quote = useMemo(() => {
    if (!quotes?.length) return FALLBACK;
    const day = Math.floor(Date.now() / 86400000);
    return quotes[day % quotes.length];
  }, [quotes]);

  useEffect(() => {
    const t1 = setTimeout(() => setGo(true), 3000);
    const t2 = setTimeout(onDone, 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      onClick={onDone}
      className={`min-h-dvh grid place-items-center px-8 cursor-pointer transition-opacity duration-500
                  ${go ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-7">
          <Mark size={104} animated className="text-chalk" />
        </div>

        <p className="eyebrow mb-8 animate-riseIn" style={{ animationDelay: '900ms' }}>
          {APP_NAME} · NIT Silchar
        </p>

        <blockquote
          className="font-display text-2xl sm:text-[1.75rem] leading-snug text-chalk animate-riseIn"
          style={{ animationDelay: '1100ms' }}
        >
          {quote.text}
        </blockquote>
        <p className="mt-5 font-mono text-xs text-mist animate-riseIn" style={{ animationDelay: '1300ms' }}>
          — {quote.author}
        </p>

        <p className="mt-14 text-[11px] text-mist/60 animate-riseIn" style={{ animationDelay: '1800ms' }}>
          Tap to continue
        </p>
      </div>
    </div>
  );
}
