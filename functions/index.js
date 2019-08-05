const functions = require('firebase-functions');
const sm = require('./modules/sendmail');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendmail = functions.https.onRequest((req, res) => {
    sm.sendMail(req, res);
});