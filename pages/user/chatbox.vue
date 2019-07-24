
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
                                                <tr v-for="message in messages" v-bind:key="message.created_at">
                                                    <td><i class="glyphicon glyphicon-user"></i> {{message.name}}</td>
								                    <td>{{message.text}}</td>
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

    var db = firebase.firestore();
    var usersRef = db.collection('users')
    var messagesRef = db.collection('messages')

    


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

            // User login
            var key = localStorage.getItem('key');

            var _self = this;
            
            messagesRef.orderBy('created_at', 'asc').onSnapshot(function(querySnapshot) {
                _self.messages = [];
                querySnapshot.forEach(function(doc) {
                    _self.messages.push(doc.data());
                });
            });

            
            usersRef.doc(key).get().then(function(doc) {
                if (doc.exists) {
                    _self.userInfo = doc.data();
                    _self.message.name = _self.userInfo.username;

                    // List online
                    usersRef.where('online', '==', 1).onSnapshot(function(querySnapshot) {
                        _self.userOnline = [];
                        querySnapshot.forEach(function(doc) {
                            var userOnline = doc.data();
                            console.log(userOnline.email, _self.userInfo.email)
                            if(userOnline.email !== _self.userInfo.email) {
                                _self.userOnline.push(doc.data());
                            }
                        });
                    });
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
        methods: {
            onSend() {
                this.message.created_at = new Date().getTime();
                    messagesRef.add(this.message).then(function(docRef) {
                })
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
