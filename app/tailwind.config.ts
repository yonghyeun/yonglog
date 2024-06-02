import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'left-double-arrow': 'url(/asset/arr_left_d.svg)',
        'left-arrow': 'url(/asset/arr_left.svg)',
        'right-double-arrow': 'url(/asset/arr_right_d.svg)',
        'right-arrow': 'url(/asset/arr_right.svg)',
      },
    },
  },
  plugins: [],
};
export default config;
