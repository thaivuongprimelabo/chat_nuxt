<template>
    <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <div class="row">
              <div class="col-md-12">
                <form id="submitForm" @submit.prevent="onRegister">
                  <div class="panel panel-primary">
                    <div class="panel-heading">
                      <i class="glyphicon glyphicon-user"></i>
                      <h6 class="panel-title">Register</h6>
                    </div>
                    <div class="panel-body">
                      <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                    <input type="text" class="form-control" id="username" v-model="form.username" placeholder="Please input username" required />
                                </div>
                            </div>
                          <div class="form-group">
                              <div class="input-group">
                                  <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                  <input type="email" class="form-control" id="email" v-model="form.email" placeholder="Please input email" required />
                              </div>
                          </div>
                          <div class="form-group">
                              <div class="input-group">
                                  <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                  <input type="password" class="form-control" id="password" v-model="form.password" placeholder="Please input password" required autocomplete="off" />
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="panel-footer">
                        <button class="btn btn-primary" type="submit" id="btnRegister">Submit</button>
                        <button class="btn btn-default" type="button" @click="this.onBack">Back</button>
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
              form:{
                  username: '',
                  email: '',
                  password: '',
                  status: 0,
                  online: 0
              },
              users: []
          };
        },
        mounted() {
            console.log('mounted');
        },
        created() {
            usersRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.users.push(doc.data());
                    console.log(doc.data());
                });
            });
        },
        methods: {
            onBack() {
                this.$router.replace('/user/login');
            },
            onRegister() {
                var length = this.users.length;
                if(length) {
                  for(var i = 0; i < length; i++) {
                    var user = this.users[i];
                    if(user.username === this.form.username) {
                      alert('Your username is exists. Please choose another one.');
                      return false;
                    }

                    if(user.email === this.form.email) {
                      alert('Your email is exists. Please choose another one.');
                      return false;
                    }
                  }
                }
                
                this.form.password = $.md5(this.form.password);

                usersRef.add(this.form).then(function(docRef) {
                    alert('Register succeed!');
                    window.location.reload();
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }
        }
    }
</script>
<style>
</style>
