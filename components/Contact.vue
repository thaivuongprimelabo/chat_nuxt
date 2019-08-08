<template>
    <div class="container">
        <Alert></Alert>
        <div class="row">
          <div class="col-md-12">
            <div class="row">
                <Sidebar></Sidebar>
                <slot @clickContact="clickContact"></slot>
                <SendContact></SendContact>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
    import Sidebar from './Sidebar.vue';
    import SendContact from './SendContact.vue';
    import Alert from './Alert.vue';
    import { setTimeout } from 'timers';
    import firebase from 'firebase';
    var config = {
        apiKey: "AIzaSyBF6T-HeFPb1cLfq-jFfIpj2So7RbwViGo",
        authDomain: "testfirebase9999.firebaseapp.com",
        projectId: "testfirebase9999",
        databaseURL: "https://testfirebase9999.firebaseio.com",
        storageBucket: "testfirebase9999.appspot.com",
    };
    
    !firebase.apps.length ? firebase.initializeApp(config) : '';

    var current_login_id = localStorage.getItem('current_login_id');

    // Firestore
    var db = firebase.firestore();
    var contactsRef = db.collection('contacts');
    var usersRef = db.collection('users');

    // Realtime database (using for check online/offline)
    var dbRealtime = firebase.database();
    var userStatusRef = dbRealtime.ref('/status');

    var getDate = function(input, format) {
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
    }

    export default {
        components: {
            Sidebar,
            Alert,
            SendContact
        },
        data: function() {
            return {
                error: '',
                success: '',
                showSendForm: false
            }
        },
        computed: {
            userSelect() {
                return this.$store.state.userSelect.data;
            }
        },
        watch: {
            userSelect(newValue, oldValue) {
                if(newValue.hasOwnProperty('to_id') || newValue.hasOwnProperty('id')) {
                    this.showSendForm = true;
                } else {
                    this.showSendForm = false;
                }
            }
        },
        created() {
            var _self = this;

            // Users
            usersRef.where('status', '==', 1).onSnapshot(function(querySnapshot) {
                var users = [];
                querySnapshot.forEach(function(doc) {
                    var user = doc.data();
                    if(doc.id !== current_login_id) {
                        user.id = doc.id;
                        users.push(user);
                    }
                })

                _self.$store.commit('users/add', users);
            });

            // Listen user online/offline
            var userStatusDatabaseRef = dbRealtime.ref('/status/' + current_login_id);
            var isOfflineForDatabase = {
                state: 'offline',
            };

            var isOnlineForDatabase = {
                state: 'online',
            };

            dbRealtime.ref('.info/connected').on('value', function(snapshot) {
                if (snapshot.val() == false) {
                    return;
                };

                userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
                    // The promise returned from .onDisconnect().set() will
                    // resolve as soon as the server acknowledges the onDisconnect() 
                    // request, NOT once we've actually disconnected:
                    // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

                    // We can now safely set ourselves as 'online' knowing that the
                    // server will mark us as offline once we lose connection.
                    userStatusDatabaseRef.set(isOnlineForDatabase);
                });
            });

            userStatusRef.on('value', function(snapshot) {
                var userStatus = snapshot.val();
                var keys = Object.keys(userStatus);
                if(keys.length) {
                    var userOnline = [];
                    for(var i in keys) {
                        var user_id = keys[i];
                        if(userStatus[user_id].state === 'online' && user_id !== current_login_id) {
                            _self.getUserInfo(user_id).then(res => {
                                userOnline.push(res);
                            });
                        }
                    }
                    _self.$store.commit('userOnline/add', userOnline)
                }
            });
            
            // Sent box
            contactsRef.where('from_id', '==', current_login_id).orderBy('created_at', 'desc').onSnapshot(function(querySnapshot) {
                var sent = [];
                querySnapshot.docChanges().forEach(function(change) {
                    var contact = change.doc.data();
                    contact.id = change.doc.id;
                    contact.created_at = getDate(contact.created_at);
                    _self.$store.commit('contacts/addSent', contact);
                });
                
            });
            
            // Inbox
            contactsRef.where('to_id', '==', current_login_id).orderBy('created_at', 'desc').onSnapshot(function(querySnapshot) {
                var inbox = [];
                var new_contact = [];

                querySnapshot.docChanges().forEach(function(change) {
                    var contact = change.doc.data();
                    
                    contact.id = change.doc.id;
                    contact.created_at = getDate(contact.created_at);
                    _self.$store.commit('contacts/addInbox', contact);

                    if(contact.status === 0) {
                        _self.$store.commit('alert/success', 'You got a new message');
                        contactsRef.doc(contact.id).update({status: 1});
                    }
                });
            })
        },
        methods: {
            async getUserInfo(user_id) {
                var res = await this.$axios.$post('/getUserInfo', {current_login_id: user_id});
                if(res.status) {
                    return res.data;
                }
            }
        }
    }
</script>

<style>
</style>
