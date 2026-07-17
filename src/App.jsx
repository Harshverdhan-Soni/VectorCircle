import React, { useEffect, useMemo, useState } from 'react';
import { listen, objToArr, seedIfEmpty, rank, rosterOf } from './lib/store';
import { watchAuth, signOut as authSignOut } from './lib/auth';
import { APP_NAME, APP_TAGLINE } from './data/seed';
import { Mark } from './components/Logo';
import ThemeToggle from './components/ThemeToggle';
import ChangePin from './components/ChangePin';
import Splash from './pages/Splash';
import Pick from './pages/Pick';
import Login from './pages/Login';
import Home from './pages/Home';
import Board from './pages/Board';
import Chat from './pages/Chat';
import Library from './pages/Library';
import Admin from './pages/Admin';

const TABS = [
  { id: 'home', label: 'Track', icon: '◉' },
  { id: 'board', label: 'Board', icon: '▲' },
  { id: 'chat', label: 'Circle', icon: '❝' },
  { id: 'library', label: 'Library', icon: '❑' },
  { id: 'admin', label: 'Admin', icon: '⚙', adminOnly: true }
];

/* Flow: splash → pick milestone → login (roster) → app
         splash → pick → "Sign in as admin" → login (admins) → app */

export default function App() {
  const [phase, setPhase] = useState('splash');   // splash | pick | login | app
  const [authReady, setAuthReady] = useState(false);
  const [mode, setMode] = useState('member');     // member | admin
  const [me, setMe] = useState(null);
  const [tab, setTab] = useState('home');

  const [members, setMembers] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [enrollments, setEnrollments] = useState({}); // { mid: { uid: {canChat} } }
  const [progress, setProgress] = useState({});
  const [quotes, setQuotes] = useState([]);
  const [mid, setMid] = useState(null);
  const [installEvt, setInstallEvt] = useState(null);
  const [mustChange, setMustChange] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ---------------------------------- boot -------------------------------- */
  useEffect(() => {
    const a = listen('members', (v) => setMembers(objToArr(v)));
    const b = listen('milestones', (v) => setMilestones(objToArr(v)));
    const c = listen('quotes', (v) => setQuotes(objToArr(v)));
    const d = listen('enrollments', (v) => setEnrollments(v || {}));
    return () => { a?.(); b?.(); c?.(); d?.(); };
  }, []);

  // Firebase holds the session now. It survives reloads on its own and, more
  // to the point, it cannot be edited from devtools the way localStorage could.
  useEffect(() => watchAuth((u) => {
    setMe(u);
    if (u) {
      setMode(u.role === 'admin' ? 'admin' : 'member');
      setPhase('app');
      const savedMid = localStorage.getItem('vc.mid');
      if (savedMid) setMid(savedMid);
    }
    setAuthReady(true);
  }), []);

  // Only an admin can write the seed, so it waits for one to sign in.
  useEffect(() => { if (me?.role === 'admin') seedIfEmpty().catch(() => {}); }, [me]);

  // Readable only by this uid or an admin, so it never advertises which
  // accounts are still sitting on the default PIN.
  useEffect(() => {
    if (!me) { setMustChange(false); return; }
    return listen(`mustChange/${me.id}`, (v) => setMustChange(Boolean(v)));
  }, [me]);

  useEffect(() => {
    if (!mid) return;
    return listen(`progress/${mid}`, (v) => setProgress(v || {}));
  }, [mid]);

  // An admin signs in without picking a milestone, so default them into the
  // first running one. Without this, Admin opens with nothing selected and
  // reads as though no data exists.
  useEffect(() => {
    if (me?.role !== 'admin' || mid || !milestones.length) return;
    setMid((milestones.find((m) => m.active !== false) || milestones[0]).id);
  }, [me, mid, milestones]);

  useEffect(() => {
    const h = (e) => { e.preventDefault(); setInstallEvt(e); };
    window.addEventListener('beforeinstallprompt', h);
    return () => window.removeEventListener('beforeinstallprompt', h);
  }, []);

  /* Keep the session honest: if an admin removes you, or un-enrols you from the
     milestone you're sitting in, drop back to the picker. */
  useEffect(() => {
    if (!me || !members.length) return;
    const fresh = members.find((m) => m.id === me.id);
    if (!fresh) return signOut();                       // account deleted
    if (me.name !== fresh.name) setMe({ ...me, name: fresh.name });
    // Un-enrolled from the milestone you're sitting in? Back to the picker.
    const stillIn = me.role === 'admin' || Boolean(enrollments?.[mid]?.[me.id]);
    if (mid && !stillIn && me.role !== 'admin') signOut();
  }, [members, enrollments, me, mid]);

  useEffect(() => { if (mid) localStorage.setItem('vc.mid', mid); }, [mid]);

  const milestone = useMemo(() => milestones.find((m) => m.id === mid) || null, [milestones, mid]);
  const tasks = useMemo(
    () => objToArr(milestone?.tasks).sort((a, b) => (a.order || 0) - (b.order || 0)),
    [milestone]
  );
  const roster = useMemo(
    () => rosterOf(members, enrollments[mid]),
    [members, enrollments, mid]
  );
  const admins = useMemo(() => members.filter((m) => m.role === 'admin'), [members]);
  // Only enrolled students appear on the board. Admins run it, they don't race in it.
  const rows = useMemo(() => rank(roster, tasks, progress), [roster, tasks, progress]);
  const isAdmin = me?.role === 'admin';

  // Login.jsx signs in through the Cloud Function; watchAuth picks it up.
  const onSignedIn = (member) => {
    setTab(member.role === 'admin' ? 'admin' : 'home');
    setPhase('app');
  };

  const signOut = async () => {
    await authSignOut();
    setMe(null); setMid(null); setMode('member'); setTab('home');
    localStorage.removeItem('vc.mid');
    setPhase('pick');
  };

  const install = async () => {
    if (!installEvt) return;
    installEvt.prompt();
    await installEvt.userChoice;
    setInstallEvt(null);
  };

  /* --------------------------------- render -------------------------------- */

  if (phase === 'splash' || !authReady) {
    return <Splash quotes={quotes} onDone={() => authReady && setPhase(me ? 'app' : 'pick')} />;
  }

  if (!me) {
    if (phase === 'pick') {
      return (
        <Pick
          milestones={milestones}
          enrollments={enrollments}
          onPick={(id) => { setMid(id); setMode('member'); setPhase('login'); }}
          onAdmin={() => { setMid(null); setMode('admin'); setPhase('login'); }}
        />
      );
    }
    return (
      <Login
        mode={mode}
        milestone={milestone}
        roster={roster}
        admins={admins}
        onSignedIn={onSignedIn}
        onBack={() => { setMid(null); setPhase('pick'); }}
      />
    );
  }

  // Forced change sits in front of the whole app — there is no route around it.
  if (mustChange) {
    return <ChangePin me={me} forced onDone={() => setMustChange(false)} />;
  }
  if (pinOpen) {
    return <ChangePin me={me} onDone={() => setPinOpen(false)} onCancel={() => setPinOpen(false)} />;
  }

  const visibleTabs = TABS.filter((t) => !t.adminOnly || isAdmin).filter((t) => milestone || t.id === 'admin');

  return (
    <div className="min-h-dvh pb-24">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-ink/80 border-b border-line">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Mark size={26} className="text-chalk shrink-0" />
            <div className="min-w-0">
              <p className="font-display font-bold tracking-tight leading-none">{APP_NAME}</p>
              <p className="eyebrow truncate mt-0.5">
                {milestone ? milestone.title : APP_TAGLINE}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {installEvt && (
              <button onClick={install} className="btn-ghost !py-1.5 !px-3 text-xs">Install</button>
            )}
            <ThemeToggle />
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`h-8 w-8 rounded-full border font-mono text-xs transition ${
                  isAdmin ? 'bg-amber/15 border-amber/50 text-amber' : 'bg-panel2 border-line hover:border-beam'
                }`}
                title={me.name}
              >
                {me.name?.[0]?.toUpperCase() || '·'}
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 card p-1.5 z-50 shadow-lift">
                    <p className="px-3 py-2 text-xs text-mist truncate border-b border-line mb-1">
                      {me.name}
                    </p>
                    <button
                      className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-beam/10 transition"
                      onClick={() => { setMenuOpen(false); setPinOpen(true); }}
                    >
                      Change PIN
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm rounded-xl text-rose hover:bg-rose/10 transition"
                      onClick={() => { setMenuOpen(false); signOut(); }}
                    >
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 animate-riseIn">
        {!milestone && tab !== 'admin' && (
          <p className="text-mist text-sm">Pick a milestone from the Admin tab to view it.</p>
        )}
        {milestone && tab === 'home' && (
          isAdmin
            ? <p className="text-mist text-sm card p-5">
                Admins don't track dots. Use Board to watch the circle, or Admin to change the course list.
              </p>
            : <Home me={me} milestone={milestone} tasks={tasks} progress={progress} rows={rows} />
        )}
        {milestone && tab === 'board' && (
          <Board me={me} milestone={milestone} tasks={tasks} progress={progress} rows={rows} />
        )}
        {milestone && tab === 'chat' && (
          <Chat me={me} milestone={milestone} roster={roster} isAdmin={isAdmin} />
        )}
        {milestone && tab === 'library' && <Library milestone={milestone} isAdmin={isAdmin} />}
        {tab === 'admin' && isAdmin && (
          <Admin
            milestones={milestones} milestone={milestone} mid={mid} setMid={setMid}
            tasks={tasks} members={members} quotes={quotes} roster={roster}
          />
        )}
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-30 border-t border-line bg-ink/90 backdrop-blur-xl
                      pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-3xl mx-auto grid"
             style={{ gridTemplateColumns: `repeat(${visibleTabs.length},1fr)` }}>
          {visibleTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`py-3 flex flex-col items-center gap-1 transition ${
                tab === t.id ? 'text-beam' : 'text-mist hover:text-chalk'
              }`}
            >
              <span className="text-base leading-none">{t.icon}</span>
              <span className="text-[11px] font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
