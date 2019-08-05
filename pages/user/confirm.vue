<template>
    <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                    <div class="panel panel-primary" v-show="message">
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
    import helpers from '~/plugins/helpers';

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
            this.confirmAccount();
        },
        methods: {
            confirmAccount() {
                var _self = this;
                var token = _self.$route.query.token;
                helpers.confirm(token, function(status, message) {
                    _self.message = message;
                });
            },
            moveLogin() {
                this.$router.replace('/user/login');
            }
        }
    }
</script>
<style>
</style>
