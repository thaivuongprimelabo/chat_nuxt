const functions = require('firebase-functions');
const api = require('./modules/api');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.login = functions.https.onRequest((req, res) => {
    api.onLogin(req, res);
});

exports.updateOnline = functions.https.onRequest((req, res) => {
    api.onUpdateOnline(req, res);
});

exports.register = functions.https.onRequest((req, res) => {
    api.onRegister(req, res);
});

exports.confirmRegister = functions.https.onRequest((req, res) => {
    api.onConfirmRegister(req, res);
});

exports.addMessage = functions.https.onRequest((req, res) => {
    api.addMessage(req, res);
});

exports.getUsersOnline = functions.https.onRequest((req, res) => {
    api.getUsersOnline(req, res);
});

exports.getUserInfo = functions.https.onRequest((req, res) => {
    api.getUserInfo(req, res);
});

exports.getUsers = functions.https.onRequest((req, res) => {
    api.getUsers(req, res);
});

exports.updateContactStatus = functions.https.onRequest((req, res) => {
    api.updateContactStatus(req, res);
});

exports.addContact = functions.https.onRequest((req, res) => {
    api.addContact(req, res);
});

exports.getInboxContacts = functions.https.onRequest((req, res) => {
    api.getInboxContacts(req, res);
});