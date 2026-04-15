// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css:[
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      title: 'My service market',
      meta:[
        {
          name:'description',
          content: 'Welcome to mi service market'
        }
      ]
    }
  },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image'],

  // ssr: false,
  // nitro: {
  //   preset: 'static',
  //   static: true
  // }


  //Prerender - All the site

  nitro: {
    prerender: {
      routes: ['/', '/about', '/contact', '/pricing', '/pricing/about', '/products'],
      ignore: ['/dashboard', '/dashboard/**'],

      //Habilitar el crawling para descubrir enlaces autamticamente
      crawlLinks: true
    }
  }
})
