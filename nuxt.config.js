export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'sga',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/base.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    { src: '@/plugins/vmask', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    'nuxt-breakpoints',
  ],
  breakpoints: {
    // default options
    xs: 0,
    sm: 720,
    md: 1280,
    lg: 1440,
    xl: 1920,
    options: {
      polyfill: true,
      throttle: 200,
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://sga-api.exponential-institute.com/', // Used as fallback if no runtime config is provided
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  auth: {
    redirect: {
      login: '/dashboard',
      logout: '/',
      callback: '/',
      home: '/dashboard',
    },
    watchLoggedIn: true,
    strategies: {
      local: {
        token: {
          property: 'access',
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: { url: 'auth/token/', method: 'post' },
          user: { url: 'constants/entities/', method: 'get' },
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
  serverMiddleware: { '/api': '~/api' },
}
