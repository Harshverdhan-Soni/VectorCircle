import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * A native <select> renders an OS widget that ignores the app's theme entirely
 * — grey on white in the middle of a dark card. This is the same control, in
 * our own colours, with room to show a branch under each name.
 *
 * Keyboard: ↑ ↓ to move, Enter to pick, Esc to close, type to jump.
 */
export default function PersonSelect({ people, value, onChange, placeholder = 'Select…' }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef(null);
  const listRef = useRef(null);
  const typed = useRef({ term: '', at: 0 });

  const selected = useMemo(() => people.find((p) => p.id === value), [people, value]);

  useEffect(() => {
    if (!open) return;
    const i = people.findIndex((p) => p.id === value);
    setActive(i >= 0 ? i : 0);
  }, [open, people, value]);

  // Keep the highlighted row in view when arrowing through a long roster.
  useEffect(() => {
    if (!open || !listRef.current) return;
    listRef.current.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  const pick = (p) => { onChange(p.id); setOpen(false); boxRef.current?.focus(); };

  const onKeyDown = (e) => {
    if (!open) {
      if (['Enter', ' ', 'ArrowDown'].includes(e.key)) { e.preventDefault(); setOpen(true); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(i + 1, people.length - 1)); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); return; }
    if (e.key === 'Enter') { e.preventDefault(); people[active] && pick(people[active]); return; }

    // Type-ahead: with forty names on screen, scrolling is the slow way.
    if (e.key.length === 1 && /\S/.test(e.key)) {
      const now = Date.now();
      typed.current.term = now - typed.current.at > 800 ? e.key : typed.current.term + e.key;
      typed.current.at = now;
      const i = people.findIndex((p) => p.name?.toLowerCase().startsWith(typed.current.term.toLowerCase()));
      if (i >= 0) setActive(i);
    }
  };

  return (
    <div className="relative">
      <button
        ref={boxRef}
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center gap-3 bg-field border rounded-2xl px-3 py-2.5 text-left
                    transition ${open ? 'border-beam' : 'border-line hover:border-beam/60'}`}
      >
        {selected ? (
          <>
            <Avatar name={selected.name} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-chalk truncate">{selected.name}</span>
              {selected.branch && (
                <span className="block text-[11px] text-mist truncate">{selected.branch}</span>
              )}
            </span>
          </>
        ) : (
          <span className="flex-1 text-sm text-mist/70 py-[3px]">{placeholder}</span>
        )}
        <Chevron open={open} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul
            ref={listRef}
            role="listbox"
            className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto card p-1.5 shadow-lift"
          >
            {people.map((p, i) => {
              const isSel = p.id === value;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    data-active={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => pick(p)}
                    role="option"
                    aria-selected={isSel}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left transition
                                ${i === active ? 'bg-beam/10' : ''}`}
                  >
                    <Avatar name={p.name} highlight={isSel} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-chalk truncate">{p.name}</span>
                      {p.branch && <span className="block text-[11px] text-mist truncate">{p.branch}</span>}
                    </span>
                    {isSel && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                           strokeWidth="3" strokeLinecap="round" className="text-beam shrink-0">
                        <path d="M5 12.5l4.5 4.5L19 7" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
            {!people.length && (
              <li className="px-3 py-4 text-xs text-mist text-center">Nobody enrolled yet.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

function Avatar({ name, highlight = false }) {
  const initials = (name || '?')
    .trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <span
      className={`h-8 w-8 shrink-0 grid place-items-center rounded-full font-mono text-[11px] font-semibold
                  border ${highlight
                    ? 'bg-beam/15 border-beam/50 text-beam'
                    : 'bg-panel2 border-line text-mist'}`}
    >
      {initials}
    </span>
  );
}

function Chevron({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round"
         className={`text-mist shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  );
}
