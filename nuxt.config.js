
import sendmail from './api/sendmail';

require('dotenv').config()

export default {
  mode: 'spa',
  generate: {
    dir: 'public'
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    // baseUrl: 'https://testfirebase9999.firebaseapp.com'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.10/css/bootstrap-select.css.map'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.10/css/bootstrap-select.min.css' }

      
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js', type: 'text/javascript'},
      { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', type: 'text/javascript'},
      { src: '/jquery.md5.js', type: 'text/javascript'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.10/js/bootstrap-select.min.js', type: 'text/javascript'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.10/js/bootstrap-select.min.js.map', type: 'text/javascript'},
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
      '@nuxtjs/axios',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },
  serverMiddleware: [
    { path: '/api/sendmail', handler: sendmail }
  ],

  axios: {
    // baseURL: 'https://testfirebase9999.firebaseapp.com/api'
    // baseURL: 'http://localhost:5000/testfirebase9999/us-central1/api'
    baseURL: 'http://localhost:3000/api'
  },
  // srcDir: 'client/'
}
