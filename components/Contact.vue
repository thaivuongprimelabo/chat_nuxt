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

    var db = firebase.firestore();
    var contactsRef = db.collection('contacts');
    var usersRef = db.collection('users');

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
            var current_login_id = localStorage.getItem('current_login_id');
            
            usersRef.onSnapshot(function(querySnapshot) {
                var userOnline = [];
                var users = [];
                querySnapshot.forEach(function(doc) {
                    var user = doc.data();
                    if(!user.status) {
                        return;
                    }
                    user.id = doc.id;
                    if(user.online && user.id !== current_login_id) {
                        userOnline.push(user);
                    }

                    if(user.id !== current_login_id) {
                        users.push(user);
                    }
                });
                _self.$store.commit('userOnline/add', userOnline);
                _self.$store.commit('users/add', users);
            })
            
            // Sent box
            contactsRef.where('from_id', '==', current_login_id).orderBy('created_at', 'desc').onSnapshot(function(querySnapshot) {
                var sent = [];
                querySnapshot.docChanges().forEach(function(change) {
                    var contact = change.doc.data();
                    contact.id = change.doc.id;
                    contact.created_at = getDate(contact.created_at);
                    usersRef.doc(contact.to_id).get().then(function(snapshot) {
                        contact.to_email = snapshot.data().email;
                        contact.to_name = snapshot.data().username;
                        if(change.type === 'added') {
                            var current_sent = _self.$store.state.contacts.sent;

                            if(current_sent.length) {
                                var exists = false;
                                for(var i in current_sent) {
                                    var st = current_sent[i];
                                    if(st.id === contact.id) {
                                        exists = true;
                                        break;
                                    }
                                }

                                if(!exists) {
                                    _self.$store.commit('contacts/addSent', contact)
                                }
                            } else {
                                _self.$store.commit('contacts/addSent', contact)
                            }

                            
                        }
                    });
                    
                });
                
            })
            
            // Inbox
            contactsRef.where('to_id', '==', current_login_id).orderBy('created_at', 'desc').onSnapshot(function(querySnapshot) {
                var inbox = [];
                var new_contact = [];

                querySnapshot.docChanges().forEach(function(change) {
                    var contact = change.doc.data();
                    
                    contact.id = change.doc.id;
                    contact.created_at = getDate(contact.created_at);
                    usersRef.doc(contact.from_id).get().then(function(snapshot) {
                        contact.from_email = snapshot.data().email;
                        contact.from_name = snapshot.data().username;
                        if(change.type === 'added') {
                            var current_inbox = _self.$store.state.contacts.inbox;
                            if(current_inbox.length) {
                                var exists = false;
                                for(var i in current_inbox) {
                                    var ib = current_inbox[i];
                                    if(ib.id === contact.id) {
                                        exists = true;
                                        break;
                                    }
                                }

                                if(!exists) {
                                    _self.$store.commit('contacts/addInbox', contact);
                                }
                            } else {
                                _self.$store.commit('contacts/addInbox', contact);
                            }
                        }
                    });

                    
                    
                    if(contact.status === 0) {
                        _self.$store.commit('alert/success', 'You got a new message');
                        contactsRef.doc(contact.id).update({status: 1});
                    }
                });

                
            })
        },
        methods: {
            // clickMenu() {
            //     this.showSendForm = false;
            // },
            // clickUser() {
            //     this.showSendForm = true;
            // }
        }
    }
</script>

<style>
</style>
