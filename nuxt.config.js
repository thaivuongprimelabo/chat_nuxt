
import express from 'express'
import nodemailer from 'nodemailer'
const app = express()

app.get('/', (req, res) => {
    // Validate, sanitize and send
    var transporter =  nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: 'shopxeom90@gmail.com',
            pass: 'nuzmgnanjfseyygs'
        }
    });
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Vuong Luu',
        to: 'thai.vuong@primelabo.com.vn',
        subject: 'Test Nodemailer',
        text: 'You recieved message from Vuong Luu',
        html: '<p>You have got a new message</b><ul><li></ul>'
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.write(err)
            res.end()
        } else {
            console.log('Message sent: ' +  info.response);
            res.write(info.response)
            res.end()
        }
    });
})

export default {
  mode: 'spa',
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
    { path: '/api/test', handler: app },
  ],
}
