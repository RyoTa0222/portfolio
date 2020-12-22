require('dotenv').config()


export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'RyoTa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: process.env.BASE_URL + 'favicon.ico'
      },
      {
        rel: 'icon alternate',
        type: 'image/png',
        href: process.env.BASE_URL + 'favicon.png'
      },
      // apple touch icon
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: process.env.BASE_URL + 'img/apple-touch-icon.png'
      },
      // android
      {
        rel: 'icon',
        type: 'image/png',
        href: process.env.BASE_URL + 'img/android-chrome-192x192.png'
      }
    ],
    script: [
      {
        src: 'https://use.typekit.net/kpd0goc.js',
      },
    ],
  },
  loading: false,
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],
  styleResources: {
    scss: ['~/assets/scss/variables.scss'],
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~/plugins/window.ts', mode: 'client'}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/@nuxtjs/dotenv
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
