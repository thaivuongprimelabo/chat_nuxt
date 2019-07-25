<template>
    <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="glyphicon glyphicon-info-sign"></i>
                            <h6 class="panel-title">Alert</h6>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h4 v-html="message"></h4>
                                    <nuxt-link to="/user/login">Login</nuxt-link> | <nuxt-link to="/user/register">Register</nuxt-link>
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

    export default {
        middleware: 'token',
        data: function() {
          return {
              message: ''
          };
        },
        mounted() {
        },
        created() {
            var _self = this;
            var query = this.$route.query;

            usersRef.where("token", "==", query.token).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if(doc.exists) {
                        var userInfo = doc.data();
                        if(!userInfo.status) {
                            var expired_at = userInfo.expired_at;
                            var d1 = new Date();
                            if(d1.getTime() > expired_at) {
                                _self.message = '<p>Your link is exipred. Thank you!</p>'
                            } else {
                                _self.message = '<p>You have successfully verify email address and your account is working. Thank you!</p>';
                                userInfo.status = 1;
                                usersRef.doc(doc.id).set(userInfo)
                            }
                        } else {
                            _self.message = '<p>Your account is actived. Thank you!</p>'
                        }
                        
                    }
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        },
        methods: {
            moveLogin() {
                this.$router.replace('/user/login');
            }
        }
    }
</script>
<style>
</style>
