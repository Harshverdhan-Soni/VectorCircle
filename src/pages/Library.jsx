import React, { useMemo, useState } from 'react';
import { objToArr, addMaterial, deleteMaterial } from '../lib/store';

const TYPES = ['paper', 'reference', 'tool', 'video'];

export default function Library({ milestone, isAdmin }) {
  const items = useMemo(() => objToArr(milestone.materials), [milestone]);
  const [form, setForm] = useState({ title: '', url: '', type: 'reference', note: '' });

  const add = () => {
    if (!form.title.trim() || !form.url.trim()) return;
    addMaterial(milestone.id, form);
    setForm({ title: '', url: '', type: 'reference', note: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Study material</p>
        <h1 className="font-display text-2xl font-bold mt-1">Library</h1>
        <p className="text-mist text-sm mt-1">
          Not tracked, not scored. Read it when a course leaves you with a question.
        </p>
      </div>

      {isAdmin && (
        <div className="card p-4 space-y-3">
          <p className="eyebrow">Add material</p>
          <input className="field" placeholder="Title"
                 value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="field" placeholder="https://…"
                 value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <div className="flex gap-3">
            <select className="field !w-36" value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <input className="field" placeholder="Why it matters"
                   value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </div>
          <button className="btn-primary w-full" onClick={add}>Add material</button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((m) => (
          <div key={m.id} className="card p-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="chip border-line text-mist">{m.type}</span>
              <a href={m.url} target="_blank" rel="noreferrer"
                 className="block font-display font-semibold mt-1.5 hover:text-beam transition">
                {m.title} ↗
              </a>
              {m.note && <p className="text-mist text-xs mt-1 leading-relaxed">{m.note}</p>}
            </div>
            {isAdmin && (
              <button className="btn-danger !px-2.5 !py-1 text-xs shrink-0"
                      onClick={() => confirm(`Remove "${m.title}"?`) && deleteMaterial(milestone.id, m.id)}>
                Remove
              </button>
            )}
          </div>
        ))}
        {!items.length && <p className="text-mist text-sm">Nothing here yet.</p>}
      </div>
    </div>
  );
}
