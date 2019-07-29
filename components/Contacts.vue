<template>
    <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
                <div class="col-md-3">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="glyphicon glyphicon-user"></i>
                            <h6 class="panel-title">Menu</h6>
                        </div>
                        <div class="panel-body">
                            <ul id="listOnline" class="list-group">
                                <li class="list-group-item" v-for="fs in functions" v-bind:key="fs.id"><nuxt-link :to="{path: fs.path}">{{ fs.name }}</nuxt-link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="glyphicon glyphicon-user"></i>
                            <h6 class="panel-title">User list</h6>
                        </div>
                        <div class="panel-body">
                            <ul id="listOnline" class="list-group">
                                <li class="list-group-item" v-for="ur in users" v-bind:key="ur.id"><a href="javascript:void(0)" @click="onClickUser(ur)"><i class="glyphicon glyphicon-user"></i> {{ ur.username }}<br/>({{ ur.email }})</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <slot userSelect="userSelect"></slot>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
    import Alert from '../components/Alert.vue';
    import { setTimeout } from 'timers';

    var current_login_id = localStorage.getItem('current_login_id');

    export default {
        data: function() {
            return {
                functions: [
                  {
                      id: 1,
                      path: '/user/contacts/inbox',
                      name: 'Inbox'
                  },
                  {
                      id: 2,
                      path: '/user/contacts/sent',
                      name: 'Sent'
                  }
                ],
                users: [],
                userInfo: {},
                userSelect: {}
            }
        },
        created() {
            this.getUsers();
            this.getUserInfo();
        },
        methods: {
            async getUsers() {
                var res = await this.$axios.$post('/getUsers', {});
                if(res.status) {
                    this.users = res.data;
                }
            },
            async getUserInfo() {
                var res = await this.$axios.$post('/getUserInfo', {current_login_id: current_login_id});
                if(res.status) {
                    this.userInfo = res.data;
                }
            },
            onClickUser(user) {
                this.userSelect = user;
            },
        }
    }
</script>

<style>
</style>
