import React, { useEffect, useRef, useState } from 'react';
import { listen, objToArr, sendMessage, deleteMessage } from '../lib/store';

/**
 * One room per milestone. Only enrolled students see it. `canChat` is set per
 * student by an admin — a muted student still reads everything, they just
 * can't post. Silent removal would be worse than an honest lock.
 */
export default function Chat({ me, milestone, roster, isAdmin }) {
  const [msgs, setMsgs] = useState([]);
  const [draft, setDraft] = useState('');
  const endRef = useRef(null);

  const mine = roster.find((r) => r.id === me.id);
  const canChat = isAdmin || mine?.canChat !== false;

  useEffect(() => listen(`chat/${milestone.id}`, (v) =>
    setMsgs(objToArr(v).sort((a, b) => a.at - b.at).slice(-200))
  ), [milestone.id]);

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [msgs.length]);

  const send = () => {
    const text = draft.trim();
    if (!text || !canChat) return;
    sendMessage(milestone.id, { uid: me.id, name: me.name, text, admin: isAdmin || null });
    setDraft('');
  };

  const sameDay = (a, b) =>
    a && new Date(a.at).toDateString() === new Date(b.at).toDateString();

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100dvh - 10rem)' }}>
      <div className="mb-4">
        <p className="eyebrow">Community · {milestone.title}</p>
        <h1 className="font-display text-2xl font-bold mt-1">Circle chat</h1>
        <p className="text-mist text-sm mt-1">
          {roster.length} student{roster.length === 1 ? '' : 's'} in this room. Course-specific doubts
          belong on the course card in Track — keep this for the wider conversation.
        </p>
      </div>

      <div className="flex-1 space-y-3 pb-4">
        {!msgs.length && (
          <p className="text-mist text-sm card p-5">
            Nothing said yet. Someone has to go first.
          </p>
        )}
        {msgs.map((m, i) => {
          const isMe = m.uid === me.id;
          const showDay = !sameDay(msgs[i - 1], m);
          const grouped = sameDay(msgs[i - 1], m) && msgs[i - 1]?.uid === m.uid;
          return (
            <React.Fragment key={m.id}>
              {showDay && (
                <div className="flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-line" />
                  <span className="eyebrow">{new Date(m.at).toLocaleDateString()}</span>
                  <div className="flex-1 h-px bg-line" />
                </div>
              )}
              <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}>
                <div className="max-w-[80%]">
                  {!grouped && (
                    <p className={`text-[11px] mb-1 font-mono ${isMe ? 'text-right text-mist' : 'text-beam'}`}>
                      {isMe ? 'You' : m.name}
                      {m.admin && <span className="ml-1.5 text-amber">admin</span>}
                    </p>
                  )}
                  <div
                    className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed border ${
                      isMe
                        ? 'bg-beam/15 border-beam/40 rounded-br-sm'
                        : 'bg-panel border-line rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                    <span className="block font-mono text-[10px] text-mist/60 mt-1">
                      {new Date(m.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => deleteMessage(milestone.id, m.id)}
                      className="text-[10px] text-rose/70 hover:text-rose mt-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={endRef} />
      </div>

      <div className="sticky bottom-20 bg-ink/90 backdrop-blur-xl pt-3 -mx-4 px-4 border-t border-line">
        {canChat ? (
          <div className="flex gap-2">
            <input
              className="field" placeholder="Say something to the circle…" value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button className="btn-primary !px-4" onClick={send} disabled={!draft.trim()}>Send</button>
          </div>
        ) : (
          <p className="text-xs text-amber border border-amber/30 bg-amber/5 rounded-xl px-3.5 py-3 leading-relaxed">
            Posting is switched off for your account in this milestone. You can still read everything.
            Ask an admin to turn it back on.
          </p>
        )}
      </div>
    </div>
  );
}
