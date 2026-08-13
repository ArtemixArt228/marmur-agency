import "@marmus-flowers/env/web";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "latest",
  devtools: { enabled: true },
  experimental: {
    payloadExtraction: "client",
  },
  modules: ["evlog/nuxt", "@nuxt/ui", "motion-v/nuxt", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: { lang: "uk" },
      link: [
        // Шрифти дизайн-системи (tokens/fonts.css у Claude Design).
        // Підключені як <link>, а не @import у CSS — щоб не робити водоспад
        // запитів. Замінити на self-hosted @font-face, коли прийдуть ліцензії.
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Manrope:wght@400..800&display=swap",
        },
      ],
    },
  },
  // Прототип — лише світла тема; темний режим ламав читабельність
  ui: {
    colorMode: false,
  },
  icon: {
    serverBundle: {
      collections: ["lucide"],
    },
  },
  devServer: {
    port: 3001,
  },
  evlog: {
    env: { service: "marmus-flowers-web" },
  },
  nitro: {
    externals: {
      external: ["pg", "pg-pool"],
    },
  },
  vite: {
    ssr: {
      external: ["pg", "pg-pool"],
    },
  },
});
