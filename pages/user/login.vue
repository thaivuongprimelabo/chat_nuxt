
<template>
    <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <div class="row">
              <div class="col-md-12">
                    <form id="submitForm" @submit.prevent="onLogin">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <i class="glyphicon glyphicon-user"></i>
                                <h6 class="panel-title">Login</h6>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                            <input type="email" class="form-control" id="email" v-model="form.email" placeholder="Please input email" required />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                            <input type="password" class="form-control" id="password" v-model="form.password" placeholder="Please input password" required />
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <button class="btn btn-primary" type="submit" id="btnLogin" :disabled="disableButton">Login</button>
                                <button class="btn btn-danger" type="button" @click="this.onRegister">Register</button>
                                <button class="btn btn-danger" type="button" @click="this.onRegister1">Register without confirm</button>
                            </div>
                        </div>
                    </form>
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
        data: function() {
          return {
              disableButton: false,
              form:{
                  email: '',
                  password: ''
              },
              userList: []
          };
        },
        mounted() {
            console.log('mounted');
        },
        created() {
            var _self = this;
            usersRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    _self.userList.push(doc.data());
                });
            });
        },
        methods: {
            onLogin() {
                this.disableButton = true;
                var _self = this;
                usersRef.where("email", "==", this.form.email).where("password", "==", $.md5(this.form.password)).get().then(function(querySnapshot) {
                    if (querySnapshot.empty) {
                        alert('Email or password is not valid.');
                        _self.disableButton = false;
                        return false;
                    }
                    querySnapshot.forEach(function(doc) {
                        if(doc.exists) {
                            var userInfo = doc.data();

                            if(userInfo.status === 0) {
                                alert('Your account is not active.');
                                _self.disableButton = false;
                                return false;
                            }

                            if(userInfo.online) {
                                alert('Your account is using');
                                _self.disableButton = false;
                                return false;
                            }
                            
                            localStorage.setItem('key', doc.id);
                            userInfo.online = 1;
                            usersRef.doc(doc.id).set(userInfo);
                            _self.$router.replace('/user/chatbox');
                        } else {
                            alert('Email or password is not valid.');
                        }
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            },
            onRegister() {
                this.$router.replace('/user/register');
            },
            onRegister1() {
                this.$router.replace('/user/register1');
            }
        }
    }
</script>
<style>
</style>
