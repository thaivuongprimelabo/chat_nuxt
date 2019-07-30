<template>
    <div class="container">
        <Alert></Alert>
        <div class="row">
          <div class="col-md-12">
            <div class="row">
                <Sidebar></Sidebar>
                <SendContact v-if="showSendForm"></SendContact>
                <slot v-else @clickContact="clickContact"></slot>
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
            
            contactsRef.where('from_id', '==', current_login_id).onSnapshot(function(querySnapshot) {
                var sent = [];
                querySnapshot.forEach(function(doc) {
                    var contact = doc.data();
                    contact.id = doc.id;
                    sent.push(contact);
                });
                _self.$store.commit('contacts/addSent', sent)
            })
            
            
            contactsRef.where('to_id', '==', current_login_id).orderBy('created_at', 'desc').onSnapshot(function(querySnapshot) {
                var inbox = [];
                var new_contact = [];

                querySnapshot.forEach(function(doc) {
                    var contact = doc.data();
                    contact.id = doc.id;
                    inbox.push(contact);
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
