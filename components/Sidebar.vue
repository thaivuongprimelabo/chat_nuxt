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

    export default {
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
                
                // for(var i in this.functions) {
                //     var fs = this.functions[i];
                //     if(fs.id === 1) {
                //         var inbox = this.$store.state.contacts.inbox;
                //         fs.count = inbox.length;
                //         var count = 0;
                //         for(var i in inbox) {
                //             if(inbox[i].status <= 1) {
                //                 count++;
                //             }
                //         }
                //         fs.new_contact = count;
                //     }

                //     if(fs.id === 2) {
                //         fs.count = this.$store.state.contacts.sent.length
                //     }
                // }
                // console.log(this.inbox);
                this.functions[0].count = this.inbox.length;
                // var count = 0;
                // for(var i in this.inbox) {
                //     if(this.inbox[i].status <= 1) {
                //         count++;
                //     }
                // }
                console.log(this.not_seen);
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
            // sentCount() {
            //     return this.$store.state.contacts.sent.length;
            // },
            // inboxCount() {
            //     console.log(this.$store.state.contacts.inbox.length);
            //     return this.$store.state.contacts.inbox.length;
            // },
            // newContactCount() {
            //     return this.$store.state.contacts.new_contact.length;
            // },
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
            // sentCount(newValue, oldValue) {
            //     return newValue.length;
            // },
            // inboxCount(newValue, oldValue) {
            //     console.log(newValue.length);
            //     return newValue.length;
            // },
            // newContactCount(newValue, oldValue) {
            //     return newValue.length;
            // },
            // userOnline(newValue, oldValue) {
            //     return newValue;
            // },
            // users(newValue, oldValue) {
            //     return newValue;
            // }
        },
        mounted() {
        },
        created() {
        },
        created() {
            var _self = this;
            var current_login_id = localStorage.getItem('current_login_id');
            // _self.getUsers(current_login_id);
        },
        methods: {
            // async getUsers(current_login_id) {
            //     var res = await this.$axios.$post('/getUsers', {current_login_id: current_login_id});
            //     if(res.status) {
            //         this.users = res.data;
            //     }
            // },
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