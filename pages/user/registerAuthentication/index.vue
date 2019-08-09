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
                      <h6 class="panel-title">Register by firebase</h6>
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
                helpers.createUserAuthentication(this.form, function(res) {
                    console.log(res);
                });
            }
        }
    }
</script>
<style>
</style>
