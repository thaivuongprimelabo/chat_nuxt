import firebase from 'firebase';
import md5 from 'md5';

var config = {
    apiKey: "AIzaSyBF6T-HeFPb1cLfq-jFfIpj2So7RbwViGo",
    authDomain: "testfirebase9999.firebaseapp.com",
    projectId: "testfirebase9999",
    databaseURL: "https://testfirebase9999.firebaseio.com",
    storageBucket: "testfirebase9999.appspot.com",
};
!firebase.apps.length ? firebase.initializeApp(config) : '';

var firestore = firebase.firestore();
var realtimeDB = firebase.database();

var usersRef = firestore.collection('users');
var messagesRef = firestore.collection('messages');
var contactsRef = firestore.collection('contacts');
var userStatusRef = realtimeDB.ref('/status');

var helpers = {
    getCurrentLoginId: function() {
        return localStorage.getItem('current_login_id');
    },
    getFirestore: function() {
        return firestore;
    },
    getRealtimeDB: function() {
        return realtimeDB;
    },
    getUsersRef: function() {
        return usersRef;
    },
    getMessagesRef: function() {
        return messagesRef;
    },
    getContactsRef: function() {
        return contactsRef;
    },
    getUserStatusRef: function() {
        return userStatusRef;
    },
    getDate: function(input, format) {
        if(format === undefined && format !== null) {
            format = 'yyyy-mm-dd hh:ii:ss';
        }
        var date = new Date();
        if(input !== undefined && input !== null) {
            var date = new Date(input);
        }

        var year = date.getFullYear();
        var month = date.getMonth() === 11 ? 12 : date.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month.toString();
        var day  = date.getDate();
        day = day.toString().length == 1 ? '0' + day : day.toString();

        var hour = date.getHours();
        hour = hour.toString().length == 1 ? '0' + hour : hour.toString();
        date.setMinutes(date.getMinutes() + 5);
        date = new Date(date);
        var minute = date.getMinutes();
        minute = minute.toString().length == 1 ? '0' + minute : minute.toString();
        var second = date.getSeconds();
        second = second.toString().length == 1 ? '0' + second : second.toString();

        format = format.replace('yyyy', year);
        format = format.replace('mm', month);
        format = format.replace('dd', day);
        format = format.replace('hh', hour);
        format = format.replace('ii', minute);
        format = format.replace('ss', second);

        return format;
    },
    login(_self, callback) {
        usersRef.where('email', '==', _self.form.email).
            where('password', '==', md5(_self.form.password)).get().then(function(querySnapshot) {
        if(querySnapshot.empty) {
            callback(false, 'Your email or password is invalid');
            return;
        }

        querySnapshot.forEach(function(doc) {
            var user = doc.data();
            if(!user.status) {
                callback(false, 'Your account is not active');
                return;
            }

            realtimeDB.ref('/status/' + doc.id).once('value').then(function(snapshot) {
                var userStatus = snapshot.val();
                if(userStatus !== null && userStatus.state === 'online') {
                    callback(false, 'Your account is using by another person');
                    return;
                }

                localStorage.setItem('current_login_id', doc.id);
                callback(true, 'Login succeed');
            });
        });
    });
    },
    register(_self, callback) {
        usersRef.where('username', '==', _self.form.username).get().then(function(querySnapshot) {
            if(querySnapshot.size) {
                callback(false, 'Your username is already register');
                return;
            }

            usersRef.where('email', '==', _self.form.email).get().then(function(querySnapshot) {
                if(querySnapshot.size) {
                    callback(false, 'Your email is already register');
                    return;
                }
                
                _self.form.password = md5(_self.form.password);
                usersRef.add(_self.form).then(function(doc) {
                    if(doc.id) {
                        callback(true);
                    }
                });
            });
        })
    },
    confirm(token, callback) {
        usersRef.where('token', '==', token).get().then(function(querySnapshot) {
            querySnapshot.forEach((doc) => {
                var user = doc.data();
                var expired_at = user.expired_at;
                var dt = new Date();
                if(dt.getTime() > expired_at) {
                    callback(false, 'Your link is expired. Thank you!');
                    return;
                }

                if(user.status) {
                    callback(false, 'Your account is actived. Thank you!');
                    return;
                }

                usersRef.doc(doc.id).update({status: 1, expired_at: '', token: ''}).then(function(doc) {
                    callback(true, 'You have successfully verify email address and your account is working. Thank you!');
                });
            });
        });
    },
    generateToken(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return text;
    },
    getExpired(minute) {
        var date = new Date();
        date.setMinutes(date.getMinutes() + minute);
        date = new Date(date);
        return date.getTime();
    },
    sendMessage(message, callback) {
        messagesRef.add(message).then(function(doc) {
            callback(doc.id);
        });
    },
    getMessages(callback) {
        messagesRef.orderBy('created_at', 'asc').onSnapshot(function(querySnapshot) {
            var messages = [];
            querySnapshot.forEach(function(doc) {
                messages.push(doc.data());
            });
            callback(messages);
        });
    },
    getUsers(callback) {
        usersRef.where('status', '==', 1).onSnapshot(function(querySnapshot) {
            var users = [];
            querySnapshot.forEach(function(doc) {
                var user = doc.data();
                if(doc.id !== helpers.getCurrentLoginId()) {
                    user.id = doc.id;
                    users.push(user);
                }
            })
            callback(users);
        });
    },
    getUserInfo(id, callback) {
        usersRef.doc(id).get().then(function(doc) {
            if(doc.exists) {
                var user = doc.data();
                callback(user);
            }
        });
    },
    getNotSeenContact(callback) {
        contactsRef.where('to_id', '==', helpers.getCurrentLoginId()).where('status', '<=', 1).onSnapshot(function(querySnapshot) {
            callback(querySnapshot.size);
        });
    },
    getInboxContacts(callback) {
        contactsRef.where('to_id', '==', helpers.getCurrentLoginId()).orderBy('created_at', 'desc').onSnapshot(function(querySnapshot) {
            querySnapshot.docChanges().forEach(function(change) {
                var contact = change.doc.data();
                contact.id = change.doc.id;
                contact.created_at = helpers.getDate(contact.created_at);

                var new_contact_msg = '';
                if(contact.status === 0) {
                    contactsRef.doc(contact.id).update({status: 1});
                    new_contact_msg = 'You got a new message';
                }
                
                if(change.type === 'added' || change.type === 'modified') {
                    callback(contact, new_contact_msg);
                }
            });
        })
    },
    getSentContacts(callback) {
        contactsRef.where('from_id', '==', helpers.getCurrentLoginId()).orderBy('created_at', 'desc').onSnapshot(function(querySnapshot) {
            querySnapshot.docChanges().forEach(function(change) {
                var contact = change.doc.data();
                contact.id = change.doc.id;
                contact.created_at = helpers.getDate(contact.created_at);
                callback(contact);
            });
            
        });
    }
}

export default helpers;