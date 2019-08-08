
<template>
    <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
                <div class="col-md-3">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="glyphicon glyphicon-user"></i>
                            <h6 class="panel-title">Functions list</h6>
                        </div>
                        <div class="panel-body">
                            <ul id="listOnline" class="list-group">
                                <li class="list-group-item" v-for="fs in functions" v-bind:key="fs.id"><nuxt-link :to="{path: fs.path}">{{ fs.name }}</nuxt-link></li>
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
        middleware: 'auth',
        data: function() {
          return {
              functions: [
                  {
                      id: 1,
                      path: '/user/chatbox',
                      name: 'Chatbox'
                  },
                  {
                      id: 2,
                      path: '/user/contacts',
                      name: 'Contacts'
                  }
              ],
              userInfo: {}
          };
        },
        mounted() {
        },
        created() {

            var _self = this;

            _self.getUserInfo();
        },
        methods: {
            async getUserInfo() {
                var res = await this.$axios.$post('/getUserInfo', {current_login_id: current_login_id});
                if(res.status) {
                    this.userInfo = res.data;
                }
            },
            async onLogout() {
                var res = await this.$axios.$post('/updateOnline', {id: current_login_id, online: 0});
                if(res.status) {
                    localStorage.removeItem('current_login_id');
                    this.$router.replace('/user/login');
                }
            }
        }
    }
</script>
<style>
</style>
