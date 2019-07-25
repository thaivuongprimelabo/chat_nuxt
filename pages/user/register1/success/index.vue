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
                                    <h4>You have successfully created an account. Thank you!</h4>
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
    export default {
        mounted() {
        },
        created() {
        },
        methods: {
        }
    }
</script>
<style>
</style>
