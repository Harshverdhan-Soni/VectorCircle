/** @type {import('tailwindcss').Config} */

// Tokens resolve to CSS variables, so one class on <html> flips the whole app.
const token = (v) => ({ opacityValue }) =>
  opacityValue === undefined ? `rgb(var(${v}))` : `rgb(var(${v}) / ${opacityValue})`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:     token('--ink'),      // page — sky
        panel:   token('--panel'),    // card — white
        panel2:  token('--panel2'),   // raised / tinted surface
        field:   token('--field'),    // input wells
        line:    token('--line'),     // borders
        mist:    token('--mist'),     // muted text
        chalk:   token('--chalk'),    // primary text
        beam:    token('--beam'),     // blue — structure, links, progress
        flame:   token('--flame'),    // orange — the one primary action
        onflame: token('--onflame'),  // label colour that sits on flame
        mint:    token('--mint'),     // complete
        amber:   token('--amber'),    // behind pace
        rose:    token('--rose')      // destructive
      },
      fontFamily: {
        // Poppins carries both display and body, the way Bhanzu runs it.
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
        // Kept for data only — dot counts and dates need tabular alignment,
        // which a geometric sans will not give you.
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace']
      },
      borderRadius: { '4xl': '1.75rem' },
      boxShadow: {
        beam: 'var(--shadow-beam)',
        lift: 'var(--shadow-lift)',
        pop:  'var(--shadow-pop)'
      },
      keyframes: {
        pulseDot: { '0%,100%': { opacity: '.3' }, '50%': { opacity: '1' } },
        riseIn: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
        drawIn: { from: { strokeDashoffset: '40', opacity: '0' }, to: { strokeDashoffset: '0', opacity: '1' } },
        breathe: { '0%,100%': { transform: 'scale(1)', opacity: '.85' }, '50%': { transform: 'scale(1.06)', opacity: '1' } }
      },
      animation: {
        pulseDot: 'pulseDot 2s ease-in-out infinite',
        riseIn: 'riseIn .35s ease-out both',
        drawIn: 'drawIn .5s ease-out both',
        breathe: 'breathe 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
