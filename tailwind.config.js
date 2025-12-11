// tailwind.config.js
export default {
  content: ["./*.{html,js}"], // scan all .html and .js files in root
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1e40af',
          light: '#3b82f6',
          dark: '#1e3a8a',
        },
      },
      spacing: {
        128: '32rem', // generates class `p-128`, `m-128`, etc.
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
      },
    },
  },
  /* This way, you can use classes like bg-brand, bg-brand-dark, p-128, or font-display. */
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
  /* Now you can use rotate-y-180 or hover:perspective-1000. */
}
