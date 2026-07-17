import React, { useEffect, useState } from 'react';
import {
  saveMilestone, createMilestone, deleteMilestone,
  addTask, saveTask, deleteTask,
  addMember, updateMember, removeMember, setPin, resetPinToDefault, DEFAULT_PIN,
  enroll, unenroll, setChatRight, clearChat, listen
} from '../lib/store';
import { ref, push, remove } from 'firebase/database';
import { db } from '../lib/firebase';
import CourseList from '../components/CourseList';

const BLANK_TASK = {
  title: '', provider: '', url: '', type: 'course',
  hours: 2, week: 1, stage: '', order: 99, outcome: ''
};

const SECTIONS = ['students', 'courses', 'milestone', 'quotes'];

export default function Admin({ milestones, milestone, mid, setMid, tasks, members, quotes, roster }) {
  const [section, setSection] = useState('students');

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Admin</p>
        <h1 className="font-display text-2xl font-bold mt-1">Run the circle</h1>
      </div>

      {/* Always visible, even with one milestone. Admins have no milestone of
          their own, so this control is the only thing that says what they're
          editing. Hiding it was how "0 courses" happened. */}
      {milestones.length > 0 && (
        <div className="card p-4">
          <label className="eyebrow block mb-2">Working on</label>
          <select className="field" value={mid || ''} onChange={(e) => setMid(e.target.value)}>
            <option value="">Select a milestone…</option>
            {milestones.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}{m.active === false ? ' · archived' : ''}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {SECTIONS.map((s) => (
          <button
            key={s} onClick={() => setSection(s)}
            className={`chip !text-[11px] !px-3 !py-1.5 capitalize transition ${
              section === s ? 'border-beam text-beam bg-beam/10' : 'border-line text-mist hover:text-chalk'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {section === 'students' && (
        <Students mid={mid} milestone={milestone} members={members} roster={roster} />
      )}
      {section === 'courses' && <Courses mid={mid} milestone={milestone} tasks={tasks} />}
      {section === 'milestone' && <MilestoneForm milestone={milestone} setMid={setMid} />}
      {section === 'quotes' && <Quotes quotes={quotes} />}
    </div>
  );
}

/* --------------------------------- students -------------------------------- */
/* Accounts and enrolment on one screen. Adding a student puts them straight
   into the milestone you're working on — no second step to forget. */

function Students({ mid, milestone, members, roster }) {
  const [f, setF] = useState({ name: '', pin: '', branch: '', role: 'member' });
  const [showOthers, setShowOthers] = useState(false);
  const [pins, setPins] = useState({});

  // Only an admin token can read this path — students get permission denied.
  useEffect(() => listen('pins', (v) => setPins(v || {})), []);

  // Both paths mark the PIN temporary: the student must choose their own
  // before they can get into the app.
  const resetDefault = (m) => {
    if (confirm(`Reset ${m.name}'s PIN to ${DEFAULT_PIN}?\n\nThey will have to choose a new PIN when they next sign in.`)) {
      resetPinToDefault(m.id);
    }
  };

  const resetCustom = (m) => {
    const next = prompt(`Set a temporary PIN for ${m.name} (4–6 digits)`, '');
    if (!next) return;
    if (/^\d{4,6}$/.test(next)) setPin(m.id, next);
    else alert('PIN must be 4 to 6 digits.');
  };

  const enrolledIds = new Set(roster.map((r) => r.id));
  const admins = members.filter((m) => m.role === 'admin');
  const others = members.filter((m) => m.role !== 'admin' && !enrolledIds.has(m.id));

  const add = async () => {
    if (!f.name.trim() || String(f.pin).length < 4) return;
    const created = await addMember({ ...f, pin: String(f.pin) });
    if (f.role === 'member' && mid) await enroll(mid, created.key);
    setF({ name: '', pin: '', branch: '', role: 'member' });
  };

  return (
    <div className="space-y-5">
      <div className="card p-4 space-y-3">
        <p className="eyebrow">
          Add a student{milestone ? ` to “${milestone.title}”` : ''}
        </p>
        <input className="field" placeholder="Full name" value={f.name}
               onChange={(e) => setF({ ...f, name: e.target.value })} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input className="field font-mono" placeholder="4-digit PIN" inputMode="numeric" maxLength={6}
                 value={f.pin} onChange={(e) => setF({ ...f, pin: e.target.value.replace(/\D/g, '') })} />
          <input className="field" placeholder="Branch / year" value={f.branch}
                 onChange={(e) => setF({ ...f, branch: e.target.value })} />
          <select className="field" value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })}>
            <option value="member">student</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button className="btn-primary w-full" onClick={add}
                disabled={!f.name.trim() || String(f.pin).length < 4 || (f.role === 'member' && !mid)}>
          {f.role === 'admin' ? 'Add admin' : 'Add and enrol'}
        </button>
        {f.role === 'member' && !mid && (
          <p className="text-amber text-xs">Select a milestone above first — students are added into one.</p>
        )}
        <p className="text-mist text-xs leading-relaxed">
          Give them their name and PIN. They pick the milestone, pick their name, type the PIN.
        </p>
      </div>

      {/* enrolled */}
      <div>
        <p className="eyebrow mb-2.5">
          {roster.length} in {milestone ? `“${milestone.title}”` : 'this milestone'}
        </p>
        <div className="space-y-2">
          {roster.map((m) => (
            <div key={m.id} className="card p-3.5 flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate">{m.name}</p>
                <p className="text-mist text-[11px] flex items-center gap-2 flex-wrap">
                  <span>{m.branch || '—'} · PIN {pins[m.id] ?? '••••'}</span>
                  <button onClick={() => resetDefault(m)} className="text-beam hover:underline">
                    reset to {DEFAULT_PIN}
                  </button>
                  <button onClick={() => resetCustom(m)} className="text-mist hover:text-chalk hover:underline">
                    set…
                  </button>
                </p>
              </div>
              <button
                onClick={() => setChatRight(mid, m.id, !m.canChat)}
                title={m.canChat ? 'Stop this student posting in Circle chat' : 'Let this student post again'}
                className={`chip !px-2.5 !py-1 transition ${
                  m.canChat ? 'border-mint/50 text-mint bg-mint/10' : 'border-amber/50 text-amber bg-amber/10'
                }`}
              >
                {m.canChat ? 'can post' : 'muted'}
              </button>
              <button
                className="btn-danger !px-2.5 !py-1 text-xs"
                onClick={() =>
                  confirm(`Remove ${m.name} from this milestone and delete their progress in it?\n\nTheir account stays — un-enrol only.`) &&
                  unenroll(mid, m.id)
                }
              >
                Remove
              </button>
            </div>
          ))}
          {!roster.length && (
            <p className="text-mist text-sm card p-4">
              Nobody yet. Until you add someone, this milestone's login screen is empty.
            </p>
          )}
        </div>
      </div>

      {/* accounts that exist but sit in other milestones */}
      {others.length > 0 && (
        <div>
          <button className="eyebrow hover:text-chalk transition" onClick={() => setShowOthers(!showOthers)}>
            {showOthers ? '− ' : '+ '}{others.length} student{others.length === 1 ? '' : 's'} in other milestones
          </button>
          {showOthers && (
            <div className="space-y-2 mt-2.5">
              {others.map((m) => (
                <div key={m.id} className="card p-3.5 flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">{m.name}</p>
                    <p className="text-mist text-[11px]">{m.branch || '—'}</p>
                  </div>
                  <button className="btn-ghost !px-2.5 !py-1 text-xs" disabled={!mid}
                          onClick={() => enroll(mid, m.id)}>
                    Add to this one
                  </button>
                  <button className="btn-danger !px-2.5 !py-1 text-xs"
                          onClick={() => confirm(`Delete ${m.name}'s account entirely?`) && removeMember(m.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* admins */}
      <div>
        <p className="eyebrow mb-2.5">{admins.length} admin{admins.length === 1 ? '' : 's'}</p>
        <div className="space-y-2">
          {admins.map((m) => (
            <div key={m.id} className="card p-3.5 flex items-center gap-3 border-amber/25">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate">{m.name}</p>
                <p className="text-mist text-[11px]">{m.branch || '—'} · PIN {m.pin}</p>
              </div>
              <select className="field !w-28 !py-1.5 text-xs" value={m.role}
                      onChange={(e) => updateMember(m.id, { role: e.target.value })}>
                <option value="admin">admin</option>
                <option value="member">student</option>
              </select>
              <button className="btn-danger !px-2.5 !py-1 text-xs" disabled={admins.length < 2}
                      title={admins.length < 2 ? 'Keep at least one admin' : ''}
                      onClick={() => confirm(`Delete ${m.name}'s account?`) && removeMember(m.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- courses --------------------------------- */

function Courses({ mid, milestone, tasks }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK_TASK);

  if (!mid) return <p className="text-mist text-sm card p-4">Select a milestone above to see its courses.</p>;

  // Match the students' Track screen exactly — week first, then order. Sorting
  // by order alone is what let W2 rows appear above W1 rows.
  const ordered = [...tasks].sort(
    (a, b) => (a.week || 0) - (b.week || 0) || (a.order || 0) - (b.order || 0)
  );

  const startNew = () => {
    setForm({ ...BLANK_TASK, order: tasks.length + 1, week: tasks[tasks.length - 1]?.week || 1 });
    setEditing('new');
  };
  const startEdit = (t) => { setForm({ ...BLANK_TASK, ...t }); setEditing(t.id); };

  const save = () => {
    if (!form.title.trim() || !form.url.trim()) return;
    const { id, ...data } = form;
    data.hours = Number(data.hours) || 0;
    data.week = Number(data.week) || 1;
    data.order = Number(data.order) || 99;
    if (editing === 'new') addTask(mid, data); else saveTask(mid, editing, data);
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">
            {tasks.length} course{tasks.length === 1 ? '' : 's'} in {milestone?.title || 'this milestone'}
          </p>
          <p className="text-mist text-[11px] mt-1">
            Drag to reorder. A course takes the week of whatever it lands under.
          </p>
        </div>
        <button className="btn-primary !py-2" onClick={startNew}>Add course</button>
      </div>

      {editing && (
        <div className="card p-4 space-y-3 border-beam/50">
          <p className="eyebrow">{editing === 'new' ? 'New course' : 'Edit course'}</p>
          <input className="field" placeholder="Course title"
                 value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="field" placeholder="Provider (e.g. DeepLearning.AI)"
                 value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} />
          <input className="field" placeholder="https://…"
                 value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <textarea className="field" rows="2" placeholder="What they should walk away able to do"
                    value={form.outcome} onChange={(e) => setForm({ ...form, outcome: e.target.value })} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <select className="field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {['course', 'paper', 'project', 'reference'].map((t) => <option key={t}>{t}</option>)}
            </select>
            <input className="field" type="number" placeholder="Week"
                   value={form.week} onChange={(e) => setForm({ ...form, week: e.target.value })} />
            <input className="field" type="number" placeholder="Hours"
                   value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} />
            <input className="field" type="number" placeholder="Order"
                   value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
          </div>
          <input className="field" placeholder="Stage label (e.g. Retrieval core)"
                 value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} />
          <div className="flex gap-2">
            <button className="btn-primary flex-1" onClick={save}>Save course</button>
            <button className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}

      <CourseList
        mid={mid}
        tasks={ordered}
        onEdit={startEdit}
        onDelete={(t) =>
          confirm(`Delete "${t.title}"? Everyone's dots for it are removed too.`) && deleteTask(mid, t.id)
        }
      />
    </div>
  );
}

/* -------------------------------- milestone -------------------------------- */

function MilestoneForm({ milestone, setMid }) {
  const [f, setF] = useState(milestone || {});
  React.useEffect(() => setF(milestone || {}), [milestone?.id]);

  const create = async () => {
    const snap = await createMilestone({
      title: 'New milestone', subtitle: '', description: '', reward: '',
      startDate: new Date().toLocaleDateString('en-CA'),
      endDate: new Date(Date.now() + 56 * 864e5).toLocaleDateString('en-CA')
    });
    setMid(snap.key);
  };

  if (!milestone) {
    return (
      <div className="card p-5 space-y-3">
        <p className="text-mist text-sm">No milestone selected. Pick one above, or start a new one.</p>
        <button className="btn-primary" onClick={create}>Create milestone</button>
      </div>
    );
  }

  return (
    <div className="card p-4 space-y-3">
      <input className="field" placeholder="Title" value={f.title || ''}
             onChange={(e) => setF({ ...f, title: e.target.value })} />
      <input className="field" placeholder="Subtitle" value={f.subtitle || ''}
             onChange={(e) => setF({ ...f, subtitle: e.target.value })} />
      <textarea className="field" rows="3" placeholder="Description" value={f.description || ''}
                onChange={(e) => setF({ ...f, description: e.target.value })} />
      <textarea className="field" rows="2" placeholder="Reward for finishing first" value={f.reward || ''}
                onChange={(e) => setF({ ...f, reward: e.target.value })} />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="eyebrow block mb-1.5">Starts</label>
          <input className="field" type="date" value={f.startDate || ''}
                 onChange={(e) => setF({ ...f, startDate: e.target.value })} />
        </div>
        <div>
          <label className="eyebrow block mb-1.5">Ends</label>
          <input className="field" type="date" value={f.endDate || ''}
                 onChange={(e) => setF({ ...f, endDate: e.target.value })} />
        </div>
      </div>
      <p className="text-mist text-xs">These dates drive the pace line on everyone's Track screen.</p>

      <div className="flex gap-2 pt-1 flex-wrap">
        <button className="btn-primary flex-1" onClick={() => {
          const { id, tasks, materials, ...data } = f;
          saveMilestone(milestone.id, data);
        }}>Save milestone</button>
        <button className="btn-ghost" onClick={create}>New milestone</button>
      </div>
      <div className="flex gap-2 pt-2 border-t border-line flex-wrap">
        <button className="btn-ghost !text-xs" onClick={() =>
          confirm('Clear every message in this milestone’s Circle chat?') && clearChat(milestone.id)
        }>Clear chat history</button>
        <button className="btn-danger !text-xs" onClick={() => {
          if (confirm(`Delete "${milestone.title}", its courses and everyone's progress on it?`)) {
            deleteMilestone(milestone.id); setMid(null);
          }
        }}>Delete milestone</button>
      </div>
    </div>
  );
}

/* ---------------------------------- quotes --------------------------------- */

function Quotes({ quotes }) {
  const [f, setF] = useState({ text: '', author: '' });
  return (
    <div className="space-y-4">
      <div className="card p-4 space-y-3">
        <p className="eyebrow">Add quote — one shows on the splash each day</p>
        <textarea className="field" rows="2" placeholder="Quote" value={f.text}
                  onChange={(e) => setF({ ...f, text: e.target.value })} />
        <input className="field" placeholder="Author" value={f.author}
               onChange={(e) => setF({ ...f, author: e.target.value })} />
        <button className="btn-primary w-full" onClick={() => {
          if (!f.text.trim()) return;
          push(ref(db, 'quotes'), f); setF({ text: '', author: '' });
        }}>Add quote</button>
      </div>
      <div className="space-y-2">
        {quotes.map((q) => (
          <div key={q.id} className="card p-3.5 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm leading-relaxed">{q.text}</p>
              <p className="eyebrow mt-1">— {q.author}</p>
            </div>
            <button className="btn-danger !px-2.5 !py-1 text-xs shrink-0"
                    onClick={() => remove(ref(db, `quotes/${q.id}`))}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
