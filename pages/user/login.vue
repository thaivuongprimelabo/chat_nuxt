
<template>
    <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <div class="row" id="loginForm">
              <div class="col-md-12">
                    <Alert v-bind:error="error" v-bind:success="success"></Alert>
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
    import Alert from '../../components/Alert';
    export default {
        components: {
            Alert
        },
        data: function() {
          return {
              disableButton: false,
              form:{
                  email: '',
                  password: ''
              },
              userList: [],
              error: '',
              success: ''
          };
        },
        mounted() {
        },
        created() {
            var _self = this;
        },
        methods: {
            async onLogin() {
                this.disableButton = true;

                var params = {
                    form: this.form
                }

                var res = await this.$axios.$post('/login', params);
                if(res.status) {
                    var userInfo = res.data[0];
                    this.error = '';
                    this.success = res.success;
                    localStorage.setItem('current_login_id', userInfo.id);
                    this.$router.replace('/user/chatbox');
                } else {
                    this.success = '';
                    this.error = res.error;
                }
                this.disableButton = false;
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
#loginForm {
    margin-top: 150px;
}
</style>
