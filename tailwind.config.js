/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Bold grotesk display for headlines, clean humanist sans for UI/body
        display: ['Sora', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        heading: ['Sora', 'system-ui', 'sans-serif'],
        // Legacy alias kept so any not-yet-migrated markup still resolves to display
        serif: ['Sora', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ---- New monochrome (black -> white) system ----
        ink: {
          DEFAULT: '#0A0A0B', // page base
          900: '#08080A',
          800: '#101012',
          700: '#18181B',
          600: '#232327',
          500: '#2E2E33',
        },
        chalk: {
          DEFAULT: '#F5F5F7', // primary text on dark
          dim: '#C8C8CE',     // secondary text
        },
        ash: {
          DEFAULT: '#8A8A93', // muted text
          dark: '#5A5A61',    // faint text / disabled
        },

        // ---- Legacy tokens remapped to the dark system ----
        // (so components still using gold/forest/cream render coherently
        //  until each is hand-migrated to the tokens above)
        gold: {
          DEFAULT: '#E8E8EC', // was accent -> now platinum/white highlight
          light: '#FFFFFF',
          dark: '#B9B9C0',
        },
        forest: {
          DEFAULT: '#0E0E10', // was deep green bg -> now near-black surface
          light: '#18181B',
          dark: '#09090B',
        },
        cream: '#EDEDEF', // was warm off-white -> now cool off-white
      },
      letterSpacing: {
        'widest-xl': '0.25em',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'scroll-bob': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-3%,0) scale(1.05)' },
        },
      },
      animation: {
        'scroll-bob': 'scroll-bob 2s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'drift': 'drift 22s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
