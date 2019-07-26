
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
                        <div class="panel-footer">
                            <button class="btn btn-danger" id="btnLogout" @click="this.onLogout">Log out</button>
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
                                <div class="btn-group btn-group-xs pull-right">
                                    Hello, <span id="txtName">{{ userInfo.username }}</span>
                                </div>
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
    
    var config = {
        apiKey: "AIzaSyBF6T-HeFPb1cLfq-jFfIpj2So7RbwViGo",
        authDomain: "testfirebase9999.firebaseapp.com",
        projectId: "testfirebase9999",
        // databaseURL: "https://testfirebase9999.firebaseio.com",
        // storageBucket: "testfirebase9999.appspot.com",
    };
    
    !firebase.apps.length ? firebase.initializeApp(config) : '';

    var key = localStorage.getItem('key');
    var db = firebase.firestore();
    // var dbRealtime = firebase.database();
    var usersRef = db.collection('users')
    var messagesRef = db.collection('messages');
    // var userStatusDatabaseRef = dbRealtime.ref('/status/' + key);
    // var userStatusRef = dbRealtime.ref('/status');

    export default {
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
              userInfo: {}
          };
        },
        mounted() {
        },
        created() {

            var _self = this;
            
            messagesRef.orderBy('created_at', 'asc').onSnapshot(function(querySnapshot) {
                _self.messages = [];
                querySnapshot.forEach(function(doc) {
                    _self.messages.push(doc.data());
                });
            });

            usersRef.onSnapshot(function(querySnapshot) {
                _self.userOnline = [];
                querySnapshot.forEach(function(doc) {
                    var user = doc.data();
                    if(doc.id === key) {
                        _self.userInfo = user;
                        return;
                    }

                    if(user.online && doc.id !== key) {
                        _self.userOnline.push(user);
                    }
                });
            });

            var isOfflineForDatabase = {
                state: 'offline',
            };

            var isOnlineForDatabase = {
                state: 'online',
            };

            // dbRealtime.ref('.info/connected').on('value', function(snapshot) {
            //     if (snapshot.val() == false) {
            //         return;
            //     };

            //     userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
            //         // The promise returned from .onDisconnect().set() will
            //         // resolve as soon as the server acknowledges the onDisconnect() 
            //         // request, NOT once we've actually disconnected:
            //         // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

            //         // We can now safely set ourselves as 'online' knowing that the
            //         // server will mark us as offline once we lose connection.
            //         userStatusDatabaseRef.set(isOnlineForDatabase);
            //     });
            // });

            // userStatusRef.on('value', function(snapshot) {
            //     var userStatus = snapshot.val();
            //     var keys = Object.keys(userStatus);
            //     if(keys.length) {
            //         for(var i in keys) {
            //             var key1 = keys[i];
            //             var item = userStatus[key1];
                        
            //             if(item.state === 'online') {
            //                 usersRef.doc(key1).update({
            //                     online: 1
            //                 })
            //             } else {
            //                 console.log('offline', (key1));
            //                 usersRef.doc(key1).update({
            //                     online: 0
            //                 })
            //             }
            //         }
            //     }
            // });
        },
        methods: {
            onSend() {
                this.message.name = this.userInfo.username;
                this.message.created_at = new Date().getTime();
                messagesRef.add(this.message).then(function(docRef) {})
            },
            onLogout() {
                var key = localStorage.getItem('key');
                this.userInfo.online = 0;
                usersRef.doc(key).set(this.userInfo);
                localStorage.removeItem('key');
                this.$router.replace('/user/login');
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
