import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* ---------------------------------------------------------------------------
   Service worker: production only.

   In dev, a service worker caches your modules and then serves them back
   forever — stale env vars, broken HMR socket, edits that never appear. So we
   don't just skip registration in dev: we actively tear down any worker left
   over from a previous run, because that worker is what's serving this file.
   --------------------------------------------------------------------------- */

if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  } else {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      if (!regs.length) return;
      Promise.all(regs.map((r) => r.unregister()))
        .then(() => caches.keys())
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .then(() => {
          console.warn('[dev] Removed a leftover service worker and its caches. Reloading once.');
          window.location.reload();
        });
    });
  }
}
