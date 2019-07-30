
<template>
    <Contact>
        <div class="col-md-9">
            <form id="submitForm" @submit.prevent="onSend">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <i class="glyphicon glyphicon-envelope"></i>
                        <h6 class="panel-title">Inbox</h6>
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-danger" @click="this.onNewContact">New contact</button>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-hover" style="cursor:pointer">
                                    <colgroup>
                                        <col width="4%" />
                                        <col width="40%" />
                                        <col width="20%" />
                                        <col width="30%" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Subject</th>
                                            <th>From</th>
                                            <th style="text-align: center">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="inboxContacts.length > 0">
                                        <tr  v-for="(ib, index) in inboxContacts" v-bind:key="index" @click="onClickContact(ib)" v-bind:class="[ib.status <= 1 ? 'not-seen' : '']">
                                            <td>{{ ++index }}</td>
                                            <td>{{ ib.subject }}</td>
                                            <td>{{ ib.from_name }}</td>
                                            <td style="text-align: center">{{ ib.created_at }}</td>
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
            inboxContacts() {
                return this.$store.state.contacts.inbox;
            }
        },
        watch: {
            inboxContacts(newValue, oldValue) {
                return newValue;
            },
        },
        created() {
            var _self = this;
        },
        methods: {
            async onClickContact(contact) {
                if(contact.status <= 1) {
                    var res = await this.$axios.$post('/updateContactStatus', {contact_id: contact.id, status: 2});
                }
                this.$store.commit('contacts/setContactData', contact);
                this.$store.commit('contacts/showSendForm', true);
            },
            onNewContact() {
                this.$store.commit('contacts/setContactData', {});
                this.$store.commit('contacts/showSendForm', true);
            }
        }
    }
</script>
<style>
    .not-seen {
        font-weight: bold;
    }
</style>
