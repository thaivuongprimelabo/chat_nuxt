
<template>
    <Contact>
        <div class="col-md-9">
            <form id="submitForm" @submit.prevent="onSend">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                    <i class="glyphicon glyphicon-envelope"></i>
                    <h6 class="panel-title">Inbox</h6>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-bordered table-hover" style="cursor:pointer">
                                    <colgroup>
                                        <col width="4%" />
                                        <col width="40%" />
                                        <col width="20%" />
                                        <col width="10%" />
                                        <col width="30%" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Subject</th>
                                            <th>From</th>
                                            <th>Status</th>
                                            <th style="text-align: center">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="inboxContacts.length > 0">
                                        <tr  v-for="(ib, index) in inboxContacts" v-bind:key="index" @click="onClickContact(ib)">
                                            <td>{{ ++index }}</td>
                                            <td>{{ ib.subject }}</td>
                                            <td>{{ ib.from_email }}</td>
                                            <td>
                                                <span class="label label-primary" v-show="ib.status == 1 || ib.status == 0">New</span>
                                                <span class="label label-success" v-show="ib.status == 2">Seen</span>
                                            </td>
                                            <td style="text-align: center">{{ ib.created_at }}</td>
                                        </tr>
                                        
                                    </tbody>
                                    <tbody  v-else>
                                        <tr>
                                            <td colspan="5" style="text-align: center">(No data found)</td>
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
            async onClickContact(row) {
                var contact = {
                    id: row.id,
                    email: row.to_email,
                    username: row.to_name,
                    subject: row.subject,
                    content: row.content
                }
                var res = await this.$axios.$post('/updateContactStatus', {contact_id: contact.id, status: 2});
                if(res.status) {
                    this.$store.commit('userSelect/add', contact);
                }
            }
        }
    }
</script>
<style>
</style>
