<template>
    <div class="col-md-3">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <i class="glyphicon glyphicon-user"></i>
                <h6 class="panel-title">Menu</h6>
            </div>
            <div class="panel-body">
                <ul id="listOnline" class="list-group">
                    <li class="list-group-item" v-for="fs in functions" v-bind:key="fs.id"><a href="javascript:void(0)" @click="onClickMenu(fs.path)">{{ fs.name }} ({{ fs.count }})</a><span class="badge badge-danger" v-show="fs.new_contact">{{ fs.new_contact }}</span></li>
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
                    <li v-bind:class="[ur.selected ? 'list-group-item select-user': 'list-group-item']"  v-for="(ur, index) in users" v-bind:key="index"><a href="javascript:void(0)" @click="onClickUser(index)"> {{ ur.username }}<br/>({{ ur.email }})</a></li>
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
                        name: 'Inbox',
                        count: 0,
                        new_contact: 0
                    },
                    {
                        id: 2,
                        path: '/user/contacts/sent',
                        name: 'Sent',
                        count: 0
                    }
                ],
                users: [],
                userSelect: {},
                isActive: false
            }
        },
        computed: {
            sentCount() {
                this.functions[1].count = this.$store.state.contacts.sent.length;
            },
            inboxCount() {
                this.functions[0].count = this.$store.state.contacts.inbox.length;
            },
            newContactCount() {
                this.functions[0].new_contact = this.$store.state.contacts.new_contact.length;
            }   
        },
        watch: {
            sentCount(newValue, oldValue) {
                this.functions[1].count = newValue;
            },
            inboxCount(newValue, oldValue) {
                this.functions[0].count = newValue;
            },
            newContactCount(newValue, oldValue) {
                this.functions[0].new_contact = newValue;
            }
        },
        mounted() {
        },
        created() {
            
        },
        created() {
            var _self = this;
            var current_login_id = localStorage.getItem('current_login_id');
            _self.getUsers(current_login_id);
        },
        methods: {
            async getUsers(current_login_id) {
                var res = await this.$axios.$post('/getUsers', {current_login_id: current_login_id});
                if(res.status) {
                    this.users = res.data;
                }
            },
            onClickUser(index) {
                var selected = !this.users[index].selected;
                this.users[index].selected = selected;
                if(selected) {
                    var user = this.users[index];
                    this.$store.commit('userSelect/add', user);
                }
                
            },
            onClickMenu(path) {
                this.$router.replace(path);
                this.$store.commit('userSelect/add', {});
            }
        }
    }
</script>
<style>
    .badge-danger {
        background-color: #DE3442;
    }
    .select-user {
        background-color:#f0f0f0;
    }
</style>