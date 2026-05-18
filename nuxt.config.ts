// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image', '@nuxt/icon', 'nuxt-gtag'],
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID,
  },
  router: {
    options: {
      linkActiveClass: 'link-active'
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 5,
        }
      }
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      title: 'Manos Miras',
      meta: [
        { name: 'description', content: 'Manos Miras - Portfolio' },
        { name: 'keywords', content: 'Manos Miras, Portfolio, Software Engineer, Game Developer' },
      ],
    },
  },
})