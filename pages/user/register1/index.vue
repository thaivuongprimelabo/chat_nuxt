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
                  status: 1,
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
                var params = {
                    form: this.form,
                    configMail: {
                        from: 'Administrator',
                        to: this.form.email,
                        subject: '【App】 Register successfully',
                        html: './email_template/register_success.html'
                    }
                }
                var res = await this.$axios.$post('/register', params);
                if(res.status) {
                    this.$router.replace('/user/register1/success');
                } else {
                    this.error = res.error;
                }
                this.disableButton = false;
            }
        }
    }
</script>
<style>
</style>
