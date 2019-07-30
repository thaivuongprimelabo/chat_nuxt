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
            
            contactsRef.where('from_id', '==', current_login_id).orderBy('created_at', 'desc').onSnapshot(function(querySnapshot) {
                var sent = [];
                querySnapshot.forEach(function(doc) {
                    var contact = doc.data();
                    contact.id = doc.id;

                    usersRef.doc(contact.to_id).get().then(function(snapshot) {
                        contact.to_email = snapshot.data().email;
                        contact.to_name = snapshot.data().username;
                        sent.push(contact);
                    });
                    
                });
                _self.$store.commit('contacts/addSent', sent)
            })
            
            
            contactsRef.where('to_id', '==', current_login_id).orderBy('created_at', 'desc').onSnapshot(function(querySnapshot) {
                var inbox = [];
                var new_contact = [];

                querySnapshot.forEach(function(doc) {
                    var contact = doc.data();
                    contact.id = doc.id;
                    usersRef.doc(contact.from_id).get().then(function(snapshot) {
                        contact.from_email = snapshot.data().email;
                        contact.from_name = snapshot.data().username;
                        inbox.push(contact);
                    });
                    
                    if(contact.status === 0) {
                        _self.$store.commit('alert/success', 'You got a new message');
                        contactsRef.doc(doc.id).update({status: 1});
                    }

                    if(contact.status === 1) {
                        new_contact.push(contact);
                    }
                });
                _self.$store.commit('contacts/addInbox', inbox);
                _self.$store.commit('contacts/addNewContact', new_contact);
                
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
