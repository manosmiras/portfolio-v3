import type { Config } from 'tailwindcss';

export default {
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        page: 'var(--bg-page-color)',
        tag: 'var(--bg-tag-color)',
        header: 'var(--bg-header-color)',
      },
      textColor: {
        page: 'var(--text-page-color)',
        pageAlt: 'var(--text-page-alt-color)',
        paragraph: 'var(--text-paragraph-color)'
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)'
      }
    },
  },
  plugins: [],

} satisfies Config
