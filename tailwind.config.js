const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8c7dd8',
          DEFAULT: '#705DCF',
          dark: '#4e4190',
        },
        background: '#111111',
        gray: colors.gray,
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.400'),
            a: {
              color: theme('colors.primary.light'),
              borderRadius: '0.25rem',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: {
              color: '#fff',
              textShadow: '2px 8px 30px #705dcf',
            },
            h2: {
              color: '#fff',
              textShadow: '2px 8px 30px #705dcf',
            },
            h3: {
              color: '#fff',
              textShadow: '2px 8px 30px #705dcf',
            },
            h4: {
              color: '#fff',
              textShadow: '2px 8px 30px #705dcf',
            },
            h4: {
              color: '#fff',
              textShadow: '2px 8px 30px #705dcf',
            },
            h6: {
              color: '#fff',
              textShadow: '2px 8px 30px #705dcf',
            },
            '.lead': {
              color: theme('colors.gray.400'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
