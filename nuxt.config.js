
import sendmail from './api/sendmail';
import test from './api/test';

require('dotenv').config()

export default {
  mode: 'spa',
  generate: {
    dir: 'public'
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
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
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' }
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js', type: 'text/javascript'},
      { src: '/jquery.md5.js', type: 'text/javascript'},
      { src: 'https://www.gstatic.com/firebasejs/6.3.1/firebase-app.js', type: 'text/javascript'},
      { src: 'https://www.gstatic.com/firebasejs/6.3.1/firebase-auth.js', type: 'text/javascript'},
      { src: 'https://www.gstatic.com/firebasejs/6.3.1/firebase-firestore.js', type: 'text/javascript'},
      { src: 'https://www.gstatic.com/firebasejs/6.3.1/firebase-database.js', type: 'text/javascript'},
      { src: 'https://www.gstatic.com/firebasejs/3.1.0/firebase-storage.js', type: 'text/javascript'}
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
    { path: '/api/sendmail', handler: sendmail },
    { path: '/api/test', handler: test },
  ],

  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3000'
  },
  // srcDir: 'client/'
}
