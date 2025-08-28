// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image', '@nuxt/icon', 'nuxt-gtag'],
  gtag: {
    id: 'G-5D2M9QNVFZ',
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
})