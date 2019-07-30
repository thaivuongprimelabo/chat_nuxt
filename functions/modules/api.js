const firebase = require('firebase');
const md5 = require('md5');
const sm = require('./sendmail');

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBF6T-HeFPb1cLfq-jFfIpj2So7RbwViGo",
        authDomain: "testfirebase9999.firebaseapp.com",
        projectId: "testfirebase9999",
    });
}

var db = firebase.firestore();
var usersRef = db.collection('users');
var messagesRef = db.collection('messages');
var contactsRef = db.collection('contacts');

exports.onLogin = function(req, res) {
    var output = {
        status: true,
        data: [],
        error: null,
        success: null,
    }

    var email = req.body.form.email;
    var password = req.body.form.password;
    usersRef.where('email', '==', email).where('password', '==', md5(password)).get().then((querySnapshot) => {
        if(querySnapshot.empty) {
            output.status = false;
            output.error = 'Email or password is not valid.';
            return res.status(200).json(output);
        }

        querySnapshot.forEach((doc) => {
            var user = doc.data();
            if(!user.status) {
                output.status = false;
                output.error = 'Your account is not active. Please confirm email to verify';
                return;
            }

            if(!user.online) {
                user.id = doc.id;
                output.data.push(user);
                output.success = 'Login successfully.';
            } else {
                output.status = false;
                output.error = 'Your account is using.';
            }
        });
        return res.status(200).json(output);
    })
    .catch(function(error) {
        
        output.status = false;
        output.error = error;
        return res.status(200).json(output);
    });
}

exports.onUpdateOnline = function(req, res) {
    var output = {
        status: true,
    }
    usersRef.doc(req.body.id).update({online: req.body.online});
    return res.status(200).json(output);
}

exports.onRegister = function(req, res) {
    var output = {
        status: true,
        data: [],
        error: null,
        success: null,
    }

    var form = req.body.form;

    usersRef.where('username', '==', form.username).get().then(function(querySnapshot) {

        // Check username exists
        if(!querySnapshot.empty) {
            output.status = false;
            output.error = 'Your username is exist. Please choose another one.';
            return res.status(200).json(output);
        }

        // Check email exists
        usersRef.where('email', '==', form.email).get().then(function(querySnapshot) {
            if(!querySnapshot.empty) {
                output.status = false;
                output.error = 'Your email is exist. Please choose another one.';
                return res.status(200).json(output);
            }

            // Register
            sm.sendMail(req, res, function(rs) {
                if(rs.status) {
                    form.password = md5(form.password);
                    usersRef.add(form).then(function(docRef) {});
                    output.success = "Register successfully."
                }
                
                return res.status(200).json(output);
            });
        });
    });
}

exports.onConfirmRegister = function(req, res) {
    var output = {
        status: true,
        message: ''
    }

    usersRef.where('token', '==', req.body.token).get().then(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
            var user = doc.data();
            var expired_at = user.expired_at;
            var dt = new Date();
            if(dt.getTime() > expired_at) {
                output.message = '<p>Your link is expired. Thank you!</p>';
                return;
            }

            if(user.status) {
                output.message = '<p>Your account is actived. Thank you!</p>';
                return;
            }

            usersRef.doc(doc.id).update({status: 1, expired_at: '', token: ''});
            output.message = '<p>You have successfully verify email address and your account is working. Thank you!</p>';
            
        });
        return res.status(200).json(output);
    });
    
}

exports.getUsersOnline = function(req, res) {
    var output = {
        status: true,
        data: []
    }

    var user_online_list = req.body.user_online_list;

    usersRef.get().then(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
            for(var i in user_online_list) {
                var user_online_id = user_online_list[i];
                if(user_online_id === doc.id) {
                    output.data.push(doc.data());
                }
            }
        });
        return res.status(200).json(output);
    });
}

exports.getUserInfo = function(req, res) {
    var output = {
        status: true,
        data: {}
    }

    var current_login_id = req.body.current_login_id;

    usersRef.doc(current_login_id).get().then(function(doc) {
        var userInfo = doc.data();
        userInfo.id = doc.id;
        output.data = userInfo;
        return res.status(200).json(output);
    });
}

exports.getUsers = function(req, res) {
    var output = {
        status: true,
        data: []
    }

    var current_login_id = req.body.current_login_id;

    usersRef.get().then(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
            var user = doc.data();
            user.id = doc.id;
            user.selected = false;
            if(user.status && user.id !== current_login_id) {
                output.data.push(user);
            }
        });
        return res.status(200).json(output);
    });
}

// exports.getMessages = function(req, res) {
//     var output = {
//         status: true,
//         data: []
//     }

//     messagesRef.orderBy('created_at', 'asc').get().then(function(querySnapshot) {
//         querySnapshot.forEach((doc) => {
//             var message = doc.data();
//             output.data.push(message);
//         });
//         return res.status(200).json(output);
//     });
// }

exports.getSentContacts = function(req, res) {
    var output = {
        status: true,
        data: []
    }

    var current_login_id = req.body.current_login_id;

    contactsRef.where('from_id', '==', current_login_id).get().then(function(querySnapshot) {
        if(querySnapshot.empty) {
            return res.status(200).json(output);
            return;
        }

        querySnapshot.forEach((doc) => {
            var contact = doc.data();
            contact.id = doc.id;
            output.data.push(contact);
        });
        return res.status(200).json(output);
    });
}

exports.getInboxContacts = function(req, res) {
    var output = {
        status: true,
        data: []
    }

    var current_login_id = req.body.current_login_id;

    contactsRef.where('to_id', '==', current_login_id).get().then(function(querySnapshot) {
        if(querySnapshot.empty) {
            return res.status(200).json(output);
            return;
        }

        querySnapshot.forEach((doc) => {
            var contact = doc.data();
            contact.id = doc.id;
            output.data.push(contact);
        });
        return res.status(200).json(output);
    });
}

exports.updateContactStatus = function(req, res) {
    var output = {
        status: true,
        data: []
    }
    
    var status = req.body.status;
    var contact_id = req.body.contact_id
    contactsRef.doc(contact_id).update({status: status});
    return res.status(200).json(output);
}

exports.addContact = function(req, res) {
    var output = {
        status: true,
        data: []
    }
    
    var contact = req.body.contact;
    contactsRef.add(contact).then(function() {});
    return res.status(200).json(output);
}

exports.addMessage = function(req, res) {
    var output = {
        status: true,
        data: []
    }
    
    var message = req.body.message;
    messagesRef.add(message).then(function() {});
    return res.status(200).json(output);
}