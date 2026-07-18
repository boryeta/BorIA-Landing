import type { Config } from 'tailwindcss';

/**
 * Tokens custom de BorIA. Sin paleta por defecto de Tailwind.
 * La dualidad humano + IA es el eje: terracota = humano / hecho a mano / pulido,
 * índigo = IA / técnico / en construcción, sobre una base cálida tipo papel.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Reemplazamos la paleta entera: solo nuestros tokens.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Base cálida tipo papel
      paper: {
        DEFAULT: '#f4efe6', // papel cálido
        50: '#faf7f1',
        100: '#f4efe6',
        200: '#e9e1d2',
        300: '#d9cdb7',
      },
      // Grafito: texto casi negro, nunca negro puro
      graphite: {
        DEFAULT: '#1c1a17',
        900: '#141210',
        800: '#1c1a17',
        700: '#2b2823',
        600: '#3d3831',
        500: '#5c554b',
        400: '#847b6e',
      },
      // Terracota / arcilla — lo humano, lo hecho a mano, lo terminado
      terracotta: {
        DEFAULT: '#c65f3c',
        light: '#e08a63',
        deep: '#a2492c',
        glow: '#f0a883',
      },
      // Índigo eléctrico frío — la IA, lo técnico, lo en construcción
      indigo: {
        DEFAULT: '#4b52e6',
        light: '#7b81f0',
        deep: '#2f34a8',
        glow: '#9aa0ff',
      },
    },
    extend: {
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"SFMono-Regular"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        content: '78rem',
      },
      transitionTimingFunction: {
        // Easings custom — nada de ease-in-out por defecto
        assemble: 'cubic-bezier(0.16, 1, 0.3, 1)',
        settle: 'cubic-bezier(0.22, 1, 0.36, 1)',
        drift: 'cubic-bezier(0.65, 0.05, 0.36, 1)',
      },
      keyframes: {
        'construction-scan': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 -32px' },
        },
        'caret-blink': {
          '0%,49%': { opacity: '1' },
          '50%,100%': { opacity: '0' },
        },
      },
      animation: {
        'construction-scan': 'construction-scan 1.2s linear infinite',
        'caret-blink': 'caret-blink 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
