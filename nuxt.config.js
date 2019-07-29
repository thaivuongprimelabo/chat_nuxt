
import sendmail from './api/sendmail';
import login from './api/login';
import updateOnline from './api/updateOnline';
import confirmRegister from './api/confirmRegister';
import register from './api/register';
import getUserInfo from './api/getUserInfo';
import getUsersOnline from './api/getUsersOnline';
import getMessages from './api/getMessages';
import getUsers from './api/getUsers';
import addMessage from './api/addMessage';
import addContact from './api/addContact';
import getSentContacts from './api/getSentContacts';

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
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' }
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js', type: 'text/javascript'},
      // { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', type: 'text/javascript'},
      { src: '/jquery.md5.js', type: 'text/javascript'},
      // { src: 'https://www.gstatic.com/firebasejs/6.3.1/firebase-app.js', type: 'text/javascript'},
      // { src: 'https://www.gstatic.com/firebasejs/6.3.1/firebase-auth.js', type: 'text/javascript'},
      // { src: 'https://www.gstatic.com/firebasejs/6.3.1/firebase-firestore.js', type: 'text/javascript'},
      // { src: 'https://www.gstatic.com/firebasejs/6.3.1/firebase-database.js', type: 'text/javascript'},
      // { src: 'https://www.gstatic.com/firebasejs/3.1.0/firebase-storage.js', type: 'text/javascript'}
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
    // { path: '/api/sendmail', handler: sendmail },
    { path: '/api/login', handler: login },
    { path: '/api/updateOnline', handler: updateOnline },
    { path: '/api/register', handler: register },
    { path: '/api/confirmRegister', handler: confirmRegister },
    { path: '/api/getUserInfo', handler: getUserInfo },
    { path: '/api/getUsersOnline', handler: getUsersOnline },
    // { path: '/api/getMessages', handler: getMessages },
    { path: '/api/getSentContacts', handler: getSentContacts},
    { path: '/api/addContact', handler: addContact},
    { path: '/api/getUsers', handler: getUsers},
    { path: '/api/addMessage', handler: addMessage }
  ],

  axios: {
    // baseURL: 'https://testfirebase9999.firebaseapp.com/api'
    // baseURL: 'http://localhost:5000/testfirebase9999/us-central1/api'
    baseURL: 'http://localhost:3000/api'
  },
  // srcDir: 'client/'
}
