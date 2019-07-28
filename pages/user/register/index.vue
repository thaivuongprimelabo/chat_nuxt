<template>
    <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <div class="row">
              <div class="col-md-12">
                <Alert v-bind:error="error" v-bind:success="success"></Alert>
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
    import Alert from '../../../components/Alert';
    export default {
        components: {
            Alert
        },
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
                  expired_at: '',
                  role_id: 2
              },
              users: [],
              error: '',
              success: ''
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
            async onRegister() {
                this.disableButton = true;
                this.form.expired_at = this.getExpired(5);
                this.form.token = this.generateToken(64);
                var params = {
                    form: this.form,
                    configMail: {
                        from: 'Administrator',
                        to: this.form.email,
                        subject: '【App】 Confirm email',
                        html: './email_template/confirm.html'
                    },
                    confirm_link: process.env.baseUrl + "/user/confirm?token=" + this.form.token
                }
                var res = await this.$axios.$post('/register', params);
                if(res.status) {
                    this.$router.replace('/user/register/success');
                } else {
                    this.error = res.error;
                }
                this.disableButton = false;
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
