// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  vite: {
    server: {
      watch: {
        ignored: ["**/.git/**", "**/node_modules/**"],
      },
    },
  },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "Mi tienda de servicios",
      meta: [
        {
          name: "description",
          content: "Bienvenido a mi tienda de servicios generales.",
        },
      ],
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "nuxt-auth-utils",
  ],

  nitro: {
    prerender: {
      routes: ["/", "/about", "/contact", "/pricing", "/products"],
      ignore: ["/dashboard", "/dashboard/**"],
      crawlLinks: true,
    },
  },
});