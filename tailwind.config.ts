import type { Config } from 'tailwindcss';

export default {
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        page: 'var(--bg-page-color)'
      },
      textColor: {
        page: 'var(--text-page-color)'
      },
      colors: {
        primary: 'var(--primary-color)'
      }
    },
  },
  plugins: [],

} satisfies Config
