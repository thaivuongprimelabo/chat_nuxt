
<template>
    <Contact>
        <div class="col-md-9">
            <form id="submitForm" @submit.prevent="onSend">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                    <i class="glyphicon glyphicon-envelope"></i>
                    <h6 class="panel-title">Sent</h6>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-hover" style="cursor:pointer">
                                    <colgroup>
                                        <col width="4%" />
                                        <col width="50%" />
                                        <col width="20%" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Subject</th>
                                            <th>To</th>
                                            <th style="text-align: center">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="sentContacts.length > 0">
                                        <tr  v-for="(sc, index) in sentContacts" v-bind:key="index" @click="onClickContact(sc)">
                                            <td>{{ ++index }}</td>
                                            <td>{{ sc.subject }}</td>
                                            <td>{{ sc.to_name }}</td>
                                            <td style="text-align: center">{{ sc.created_at }}</td>
                                        </tr>
                                        
                                    </tbody>
                                    <tbody  v-else>
                                        <tr>
                                            <td colspan="4" style="text-align: center">(No data found)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </Contact>
</template>
<script>
    import firebase from 'firebase';
    import { setTimeout } from 'timers';
    import Contact from '../../../../components/Contact.vue';

    var current_login_id = localStorage.getItem('current_login_id');

    export default {
        layout: 'main',
        middleware: 'auth',
        components: {
            Contact
        },
        data: function() {
          return {
              error: '',
              success: ''
          };
        },
        computed: {
            sentContacts() {
                return this.getSentContacts();
            },
            users() {
                return this.$store.state.users.data;
            }
        },
        watch: {
            sentContacts(newValue, oldValue) {
                if(newValue !== oldValue) {
                    return newValue;
                }
            },
            users(newValue, oldValue) {
                if(newValue !== oldValue) {
                    return newValue;
                }
            }
        },
        mounted() {
        },
        created() {
            var _self = this;
        },
        methods: {
            async onClickContact(contact) {
                this.$store.commit('contacts/setContactData', contact);
                this.$store.commit('contacts/showSendForm', false);
                this.$router.push('/user/contacts/view');
            },
            getSentContacts() {
                var contacts = this.$store.state.contacts.sent;
                var users = this.$store.state.users.data;
                for(var i in contacts) {
                    var contact = contacts[i];
                    for(var j in users) {
                        var user = users[j];
                        if(contact.to_id === user.id) {
                            contact.to_name = user.username;
                            contact.to_email = user.email;
                            break;
                        }
                    }
                }
                return contacts;
            }
        }
    }
</script>
<style>
</style>
