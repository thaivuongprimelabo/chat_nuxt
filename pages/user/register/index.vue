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
                        <button class="btn btn-primary" type="submit" id="btnRegister" :disabled="disableButton">Submit</button>
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
              disableButton: false,
              form:{
                  username: '',
                  email: '',
                  password: '',
                  status: 0,
                  online: 0,
                  token: '',
                  expired_at: ''
              },
              users: []
          };
        },
        mounted() {
            console.log('mounted');
        },
        created() {
        },
        methods: {
            onBack() {
                this.$router.replace('/user/login');
            },
            onRegister() {
                this.disableButton = true;

                usersRef.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.users.push(doc.data());
                    });

                    for(var i in this.users) {
                        var userInfo = this.users[i];
                        if(userInfo.username === this.form.username) {
                            alert('Your username is exists. Please choose another one.');
                            this.disableButton = false;
                            return false;
                        }

                        if(userInfo.email === this.form.email) {
                            alert('Your email is exists. Please choose another one.');
                            this.disableButton = false;
                            return false;
                        }
                    }

                    this.form.expired_at = this.getExpired(5);
                    this.form.token = this.generateToken(64);
                    this.sendMail(this.form);
                });
                
                
            },
            async sendMail(form) {
                var _self = this;
                var params = {
                    form: form,
                    configMail: {
                        from: 'Administrator',
                        to: form.email,
                        subject: '【App】 Confirm email',
                        html: './email_template/confirm.html'
                    },
                    confirm_link: process.env.baseUrl + "/user/confirm?token=" + form.token
                }

                var res = await this.$axios.$post('api/sendmail', params);
                if(res.status) {
                    form.password = $.md5(form.password);
                    usersRef.add(form).then(function(docRef) {
                        _self.$router.replace('/user/register/success');
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
                }
            },
            generateToken(length) {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                
                for (var i = 0; i < length; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                
                return text;
            },
            getExpired(minute) {
                var date = new Date();
                date.setMinutes(date.getMinutes() + minute);
                date = new Date(date);
                return date.getTime();
                // var year = date.getFullYear();
                // var month = date.getMonth() === 11 ? 12 : date.getMonth() + 1;
                // month = month.toString().length == 1 ? '0' + month : month.toString();
                // var day  = date.getDate();
                // day = day.toString().length == 1 ? '0' + day : day.toString();

                // var hour = date.getHours();
                // hour = hour.toString().length == 1 ? '0' + hour : hour.toString();
                // date.setMinutes(date.getMinutes() + minute);
                // date = new Date(date);
                // var minute = date.getMinutes();
                // minute = minute.toString().length == 1 ? '0' + minute : minute.toString();
                // var second = date.getSeconds();
                // second = second.toString().length == 1 ? '0' + second : second.toString();
            },
            getDate(input, format) {
                if(format === undefined) {
                    format = 'dd/mm/yyyy hh:ii:ss';
                }
                var date = new Date();
                if(input !== undefined) {
                    var date = new Date(input);
                }

                var year = date.getFullYear();
                var month = date.getMonth() === 11 ? 12 : date.getMonth() + 1;
                month = month.toString().length == 1 ? '0' + month : month.toString();
                var day  = date.getDate();
                day = day.toString().length == 1 ? '0' + day : day.toString();

                var hour = date.getHours();
                hour = hour.toString().length == 1 ? '0' + hour : hour.toString();
                date.setMinutes(date.getMinutes() + 5);
                date = new Date(date);
                var minute = date.getMinutes();
                minute = minute.toString().length == 1 ? '0' + minute : minute.toString();
                var second = date.getSeconds();
                second = second.toString().length == 1 ? '0' + second : second.toString();

                format = format.replace('yyyy', year);
                format = format.replace('mm', month);
                format = format.replace('dd', day);
                format = format.replace('hh', hour);
                format = format.replace('ii', minute);
                format = format.replace('ss', second);

                return format;
            }
        }
    }
</script>
<style>
</style>
