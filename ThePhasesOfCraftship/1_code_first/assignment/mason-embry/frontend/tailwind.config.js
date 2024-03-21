/** @type {import('tailwindcss').Config} */

import typographyPlugin from '@tailwindcss/typography';

export default {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [typographyPlugin],
};
