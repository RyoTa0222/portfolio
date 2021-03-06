require('dotenv').config()
import createClient from './plugins/contentful'

const client = createClient()

const mkHead = (environment = 'production') => {
  const meta = [
    { charset: 'utf-8' },
    { 'http-equiv': 'http-equiv', content: 'text/html; charset=UTF-8' },
    {
      name: 'viewport',
      content:
        'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5'
    },
    { hid: 'description', name: 'description', content: 'RyoTaのポートフォリオサイトです。UXを意識したサイトの制作を意識しております。Twitterで発信をしておりますのでご気軽にフォローしてください！' },
    { hid: 'og:site_name', property: 'og:site_name', content: 'RyoTa.' },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:url', property: 'og:url', content: process.env.SITE_URL },
    { hid: 'og:title', property: 'og:title', content: 'RyoTa.' },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'RyoTa.のポートフォリオサイトです。UXを意識したサイトの制作を意識しております。Twitterで発信をしておりますのでご気軽にフォローしてください！'
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: process.env.SITE_URL + '/img/ogp.png'
    },
    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
    { hid: 'twitter:image', name: 'twitter:image', content: process.env.SITE_URL + '/img/ogp.png'},
    { hid: 'twitter:site', name: 'twitter:site', content: '@RyoTa___0222' },
  ]
  if (environment === 'development') {
    meta.push({ hid: 'robots', name: 'robots', content: 'noindex,nofollow' })
  }
  return meta
}

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  // env
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    BASE_URL: process.env.BASE_URL,
    SITE_URL: process.env.SITE_URL,
    ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME || 'production'
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    title: 'RyoTa.',
    meta: mkHead(process.env.ENVIRONMENT_NAME || 'production'),
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
    scss: ['~/assets/scss/variable.scss'],
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~/plugins/window.ts'},
    {src: '~/plugins/theme.ts', ssr: false},
    {src: '~/plugins/prism.ts'}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-typed-vuex'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/@nuxtjs/dotenv
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/sentry',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  router: {
    trailingSlash: true,
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.SITE_URL,
    trailingSlash: true,
    routes(callback) {
      return Promise.all([
        client.getEntries({
          content_type: 'blog'
        })
      ]).then(([blogEntries]) => {
        const l = []
        const _blogDetail = blogEntries.items.map(blogEntry => {
          const categoryId = blogEntry.fields.category.sys.id
          const categoryItem = blogEntries.includes.Entry.find((item) => item.sys.id === categoryId)
          if (l.includes(categoryItem.fields.categoryId) !== -1) {
            l.push(categoryItem.fields.categoryId)
          }
          return `blog/${categoryItem.fields.categoryId}/${blogEntry.fields.id}/`
        })
        const _blogCategory = l.map(category => {
          return `blog/${category}/`
        })
        // 今後ルート追加時routesに結合
        const routes = _blogDetail.concat(_blogCategory)
        callback(null, routes)
      }).catch(callback)
    }
  },
  robots: {
    UserAgent: '*',
    Sitemap: `${process.env.SITE_URL}/sitemap.xml`
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [
      /typed-vuex/
    ]
  },
  generate: {
    fallback: true,
    routes() {
      return client.getEntries({
        content_type: 'blog'
      }).then(entries => {
        const l = []
        const _blogDetail = entries.items.map(entry => {
          const categoryId = entry.fields.category.sys.id
          const categoryItem = entries.includes.Entry.find((item) => item.sys.id === categoryId)
          return {
            route: `blog/${categoryItem.fields.categoryId}/${entry.fields.id}/`,
            payload: {
              entry,
              includes: entries.includes
            }
          }
        })
        const _blogCategory = l.map(category => {
          return `blog/${category}/`
        })
        return _blogDetail.concat(_blogCategory)
      })
    }
  }
}
