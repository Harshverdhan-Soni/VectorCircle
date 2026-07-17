import { signInWithCustomToken, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { auth, fns } from './firebase';

/**
 * The PIN is checked on the server, never in the browser. What comes back is a
 * signed token — the client cannot forge one, so the database rules can trust
 * auth.uid and auth.token.admin absolutely.
 */
export async function signIn(memberId, pin) {
  const login = httpsCallable(fns, 'login');
  const { data } = await login({ memberId, pin });
  await signInWithCustomToken(auth, data.token);
  return { id: memberId, name: data.name, role: data.role };
}

/** Change your own PIN. The server checks the current one; we never see it. */
export async function changePin(currentPin, newPin) {
  const fn = httpsCallable(fns, 'changePin');
  await fn({ currentPin, newPin });
}

export const signOut = () => fbSignOut(auth);

export function watchAuth(cb) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) return cb(null);
    const { claims } = await user.getIdTokenResult();
    cb({ id: user.uid, role: claims.admin ? 'admin' : 'member' });
  });
}
