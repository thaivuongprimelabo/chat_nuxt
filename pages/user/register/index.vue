<template>
    <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <div class="row">
              <div class="col-md-12">
                <Alert></Alert>
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
    import helpers from '~/plugins/helpers';
import { async } from 'q';

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
              config: {}
          };
        },
        mounted() {
        },
        created() {
        },
        methods: {
            onBack() {
                this.$router.replace('/user/login');
            },
            onRegister() {
                var _self = this;
                _self.disableButton = true;
                _self.form.expired_at = helpers.getExpired(5);
                _self.form.token = helpers.generateToken(64);
                var config = {
                    from: 'Administrator',
                    to: _self.form.email,
                    subject: '【App】 Confirm email',
                    html: './email_template/confirm.html',
                    data: {
                        username: _self.form.username,
                        email: _self.form.email,
                        password: _self.form.password,
                        confirm_link: process.env.baseUrl + "/user/confirm?token=" + _self.form.token
                    }
                }
                helpers.register(_self, async function(status, message) {
                    if(status) {
                        var res = await _self.$axios.$post('/sendmail', {config: config});
                        if(res.status) {
                            _self.$router.replace('/user/register/success');
                        } else {
                            _self.$store.commit('alert/error', 'Server error');
                        }
                    } else {
                        _self.$store.commit('alert/error', message);
                    }
                     _self.disableButton = false;
                });
            }
        }
    }
</script>
<style>
</style>
