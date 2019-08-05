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
    import helpers from '~/plugins/helpers';

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

            // Users
            helpers.getUsers(function(users) {
                _self.$store.commit('users/add', users);
            });

            // Listen user online/offline
            var userStatusDatabaseRef = helpers.getRealtimeDB().ref('/status/' + current_login_id);
            var isOfflineForDatabase = {
                state: 'offline',
            };

            var isOnlineForDatabase = {
                state: 'online',
            };

            helpers.getRealtimeDB().ref('.info/connected').on('value', function(snapshot) {
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

            helpers.getUserStatusRef().on('value', function(snapshot) {
                var userStatus = snapshot.val();
                var keys = Object.keys(userStatus);
                if(keys.length) {
                    var userOnline = [];
                    for(var i in keys) {
                        var user_id = keys[i];
                        if(userStatus[user_id].state === 'online' && user_id !== current_login_id) {
                            helpers.getUsersRef().doc(user_id).get().then(function(doc) {
                                var user = doc.data();
                                userOnline.push(user);
                            });
                        }
                    }
                    _self.$store.commit('userOnline/add', userOnline)
                }
            });

            // Sent box
            helpers.getSentContacts(function(contact) {
                if(contact.hasOwnProperty('id')) {
                    helpers.getUserInfo(contact.to_id, function(user) {
                        contact.to_email = user.email;
                        contact.to_name = user.username;
                        _self.$store.commit('contacts/addSent', contact);
                    });
                }
            });
            
            // New contact
            helpers.getNotSeenContact(function(size) {
                _self.$store.commit('contacts/notSeenContact', size);
            });

            // Inbox
            helpers.getInboxContacts(function(contact, message) {
                
                if(contact.hasOwnProperty('id')) {
                    helpers.getUserInfo(contact.from_id, function(user) {
                        contact.from_email = user.email;
                        contact.from_name = user.username;
                        _self.$store.commit('contacts/addInbox', contact);
                    });
                }

                if(message !== undefined && message.length) {
                    _self.$store.commit('alert/success', message);
                }
            });
        },
        methods: {
        }
    }
</script>

<style>
</style>
