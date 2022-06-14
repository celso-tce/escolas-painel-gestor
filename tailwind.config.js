const colors = require('tailwindcss/colors');

// Fonte: https://gist.github.com/Merott/d2a19b32db07565e94f10d13d11a8574
const exposeColorsAsVariables = function ({ addBase, theme }) {
  function extractColorVars(colorObj, colorGroup = '') {
    return Object.keys(colorObj).reduce((vars, colorKey) => {
      const value = colorObj[colorKey];

      const newVars =
        typeof value === 'string'
          ? { [`--color${colorGroup}-${colorKey}`]: value }
          : extractColorVars(value, `-${colorKey}`);

      return { ...vars, ...newVars };
    }, {});
  }

  addBase({
    ':root': extractColorVars(theme('colors')),
  });
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1800px',
      },
      colors: {
        'tce-blue': {
          '4': '#2b68ab',
          '5': '#1c4c80',
        },
        'tce-yellow': {
          '3': '#ffd044',
          '4': '#f9c533',
        },
        'highlight': '#ff3658',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    exposeColorsAsVariables,
  ],
};
