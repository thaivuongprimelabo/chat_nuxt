
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-3">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <i class="glyphicon glyphicon-th-list"></i>
                                <h6 class="panel-title">Manage</h6>
                            </div>
                            <div class="panel-body">
                                <ul id="listOnline" class="list-group">
                                    <li class="list-group-item" v-for="item in list" v-bind:key="item.id"><nuxt-link to="">{{ item.name }}</nuxt-link></li>
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
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="panel-footer">
                                    
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
    // var dbRealtime = firebase.database();
    var usersRef = db.collection('users')

    export default {
        middleware: 'auth',
        data: function() {
          return {
              disableButton: false,
              form:{
                  email: '',
                  password: ''
              },
              list: [
                  {
                      id: 0,
                      route: '/chatbox',
                      name: 'Chatbox'
                  },
                  {
                      id: 1,
                      route: '/group',
                      name: 'Group management'
                  },
                  {
                      id:2,
                      route: '/user',
                      name: 'User management'
                  }
              ],
              userInfo: {}
          };
        },
        mounted() {
        },
        created() {
            var key = localStorage.getItem('key');
            var _self = this;
            usersRef.doc(key).get().then(function(doc) {
                if (doc.exists) {
                    _self.userInfo = doc.data();
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
        methods: {
            onLogout() {
                var key = localStorage.getItem('key');
                // this.userInfo.online = 0;
                // usersRef.doc(key).set(this.userInfo);
                localStorage.removeItem('key');
                this.$router.replace('/user/login');
            }
        }
    }
</script>
<style>
</style>
