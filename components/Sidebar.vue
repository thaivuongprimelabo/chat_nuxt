<template>
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
</template>
<script>
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
                userSelect: {}
            }
        },
        created() {
            this.getUsers();
        },
        methods: {
            async getUsers() {
                var res = await this.$axios.$post('/getUsers', {});
                if(res.status) {
                    this.users = res.data;
                }
            },
            onClickUser(user) {
                this.$store.commit('userSelect/add', user);
            },
        }
    }
</script>