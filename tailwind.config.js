const colors = require('tailwindcss/colors');

module.exports = {
 content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './pages/**/*.{js,ts,jsx,tsx,mdx}', './layouts/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
 theme: {
  colors: {
   ...colors,
   theme: {
    mainColor: 'rgba(30, 31, 53, 0.8)',
    mainbold: 'rgba(30, 31, 53, 0.8)',
    green: '#70D6BC',
    blueBold: '#6D4AFE',
    gray: '#303143',
    blueLight: 'rgba(84, 160, 253, 1)',
   },
  },
 },
 plugins: [],
};
