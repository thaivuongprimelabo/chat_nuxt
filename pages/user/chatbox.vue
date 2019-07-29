
<template>
    <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
                <div class="col-md-3">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="glyphicon glyphicon-user"></i>
                            <h6 class="panel-title">Online list</h6>
                        </div>
                        <div class="panel-body">
                            <ul id="listOnline" class="list-group">
                                <li class="list-group-item" v-for="user in userOnline" v-bind:key="user.email">{{ user.username }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-primary">
                                <div class="panel-heading">
                                <i class="glyphicon glyphicon-user"></i>
                                <h6 class="panel-title">Chat box</h6>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-sm-12 scollDiv" id="scollDiv">
                                            <table class="table table-hover" id="messageContainer">
                                                <colgroup>
                                                    <col width="20%" />
                                                    <col width="80%" />
                                                </colgroup>
                                                <tbody>
                                                    <tr v-for="msg in messages" v-bind:key="msg.created_at">
                                                        <td><i class="glyphicon glyphicon-user"></i> {{msg.name}}</td>
                                                        <td>{{msg.text}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-footer">
                                    <form>
                                        <div class="input-group input-group-sm">
                                        <span class="input-group-addon">
                                            <i class="glyphicon glyphicon-pencil"></i>
                                        </span>
                                        <input type="text" class="form-control" id="txtText" v-model="message.text" placeholder="Type your message here ..">
                                        <span class="input-group-btn">
                                            <button class="btn btn-primary" type="button" id="btnSend" @click="this.onSend">Send</button>
                                        </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
          </div>
        </div>
    </div>
</template>
<script>
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
    var db = firebase.firestore();
    var dbRealtime = firebase.database();
    var usersRef = db.collection('users')
    var messagesRef = db.collection('messages');
    var userStatusDatabaseRef = dbRealtime.ref('/status/' + current_login_id);
    var userStatusRef = dbRealtime.ref('/status');

    export default {
        layout: 'main',
        middleware: 'auth',
        data: function() {
          return {
              message: {
                  text: '',
                  name: '',
                  created_at: ''
              },
              userOnline: [],
              messages: [],
              userInfo: {},
              groups: []
          };
        },
        mounted() {
        },
        created() {
            
            // this.online();
            var _self = this;

            _self.getUserInfo();
            
            messagesRef.orderBy('created_at', 'asc').onSnapshot(function(querySnapshot) {
                _self.messages = [];
                querySnapshot.forEach(function(doc) {
                    _self.messages.push(doc.data());
                });
            });

            // usersRef.onSnapshot(function(querySnapshot) {
            //     _self.userOnline = [];
            //     querySnapshot.forEach(function(doc) {
            //         var user = doc.data();
            //         if(doc.id === current_login_id) {
            //             _self.userInfo = user;
            //             return;
            //         }

            //         if(user.online && doc.id !== current_login_id) {
            //             _self.userOnline.push(user);
            //         }
            //     });
            // });

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
                    var user_online_list = [];
                    for(var i in keys) {
                        var user_id = keys[i];
                        var user_online = userStatus[user_id];
                        
                        if(user_online.state === 'online' && user_id !== current_login_id) {
                            
                            user_online_list.push(user_id);
                        }
                    }
                    _self.getUsersOnline(user_online_list);
                }
            });
        },
        methods: {
            async online() {
                await this.$axios.$post('/updateOnline', {id: current_login_id, online: 1});
            },
            async offline() {
                await this.$axios.$post('/updateOnline', {id: current_login_id, online: 0});
            },
            async getUserInfo() {
                var res = await this.$axios.$post('/getUserInfo', {current_login_id: current_login_id});
                if(res.status) {
                    this.userInfo = res.data;
                }
            },
            async getUsersOnline(user_online_list) {
                if(user_online_list.length) {
                    var res = await this.$axios.$post('/getUsersOnline', {user_online_list: user_online_list});
                    if(res.status) {
                        this.userOnline = res.data;
                    }
                } else {
                    this.userOnline = [];
                }
                
            },
            async getMessages() {
                var res = await this.$axios.$post('/getMessages', {});
                if(res.status) {
                    this.messages = res.data;
                }
            },
            async onSend() {
                this.message.name = this.userInfo.username;
                this.message.created_at = new Date().getTime();
                var res = await this.$axios.$post('/addMessage', {message: this.message});
                if(res.status) {
                    this.messages.push(this.message);
                }
            },
            async onLogout() {
                var res = await this.$axios.$post('/updateOnline', {id: current_login_id, online: 0});
                if(res.status) {
                    localStorage.removeItem('current_login_id');
                    this.$router.replace('/user/login');
                }
            },
            onBack() {
                this.$router.replace('/user/dashboard');
            }
        }
    }
</script>
<style>
.scollDiv {
    height: 400px;
    overflow-y: scroll;
}
</style>
