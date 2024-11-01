// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ["@vuestic/nuxt", "@pinia/nuxt", "@nuxtjs/i18n"],
  vuestic: {
    config: {
      colors: {
        variables: {
          primary: "#002c85",
          secondary: "#002c85",
          success: "#40e583",
          info: "#2c82e0",
          danger: "#e34b4a",
          warning: "#ffc200",
          gray: "#babfc2",
          dark: "#34495e",

          // Custom colors
          yourCustomColor: "#d0f55d",
        },
      },
    },
  },
    ssr :true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ]
  


})