import type { Config } from 'tailwindcss';

export default {
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        page: 'var(--bg-page-color)',
        tag: 'var(--bg-tag-color)'
      },
      textColor: {
        page: 'var(--text-page-color)'
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)'
      }
    },
  },
  plugins: [],

} satisfies Config
