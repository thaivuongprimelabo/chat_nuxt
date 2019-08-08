<template>
    <div class="col-md-3">
        <div class="panel panel-primary" v-if="this.$nuxt.$route.name === 'user-chatbox'">
            <div class="panel-heading">
                <i class="glyphicon glyphicon-user"></i>
                <h6 class="panel-title">Online list</h6>
            </div>
            <div class="panel-body">
                <ul id="listOnline" class="list-group">
                    <li class="list-group-item" v-for="user in userOnline" v-bind:key="user.email">{{ user.username }}</li>
                </ul>
            </div>
        </div>
        <Groups v-if="this.$nuxt.$route.name === 'user-chatbox'"></Groups>
        <div v-else>
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <i class="glyphicon glyphicon-user"></i>
                    <h6 class="panel-title">Menu</h6>
                </div>
                <div class="panel-body">
                    <ul id="listOnline" class="list-group">
                        <li class="list-group-item" v-for="fs in functionList" v-bind:key="fs.id"><a href="javascript:void(0)" @click="onClickMenu(fs.path)">{{ fs.name }} ({{ fs.count }})</a><span class="badge badge-danger" v-show="fs.not_seen">{{ fs.not_seen }}</span></li>
                    </ul>
                </div>
                <div class="panel-footer">
                    <button class="btn btn-danger" @click="this.onNewContact"><i class="glyphicon glyphicon-plus"></i> New contact</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Groups from './Groups';

    export default {
        components: {
            Groups
        },
        data: function() {
            return {
                functions: [
                    {
                        id: 1,
                        path: '/user/contacts/inbox',
                        name: 'Inbox',
                        count: 0,
                        not_seen: 0
                    },
                    {
                        id: 2,
                        path: '/user/contacts/sent',
                        name: 'Sent',
                        count: 0
                    }
                ],
                userSelect: {}
            }
        },
        computed: {
            functionList() {
                this.functions[0].count = this.inbox.length;
                this.functions[0].not_seen = this.not_seen;
                this.functions[1].count = this.sent.length;
                return this.functions;
            },
            inbox() {
                return this.$store.state.contacts.inbox;
            },
            sent() {
                return this.$store.state.contacts.sent;
            },
            not_seen() {
                return this.$store.state.contacts.not_seen;
            },
            userOnline() {
                return this.$store.state.userOnline.data;
            },
            users() {
                return this.$store.state.users.data
            }   
        },
        watch: {
            inbox(newValue, oldValue) {
                if(newValue !== oldValue) {
                    return newValue;
                } 
            },
            sent(newValue, oldValue) {
                if(newValue !== oldValue) {
                    return newValue;
                }
            },
            not_seen(newValue, oldValue) {
                if(newValue !== oldValue) {
                    return newValue;
                }
            },
            userOnline(newValue, oldValue) {
                if(newValue !== oldValue) {
                    return newValue;
                }
            }
        },
        mounted() {
        },
        created() {
        },
        created() {
            var _self = this;
            var current_login_id = localStorage.getItem('current_login_id');
        },
        methods: {
            onClickMenu(path) {
                this.$router.replace(path);
                this.$store.commit('userSelect/add', {});
                this.$store.commit('contacts/showSendForm', false);
            },
            onNewContact() {
                this.$store.commit('contacts/setContactData', {});
                this.$store.commit('contacts/showSendForm', true);
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