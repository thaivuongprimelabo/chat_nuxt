
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

    var getDate = function(input, format) {
        if(format === undefined && format !== null) {
            format = 'yyyy-mm-dd hh:ii:ss';
        }
        var date = new Date();
        if(input !== undefined && input !== null) {
            var date = new Date(input);
        }

        var year = date.getFullYear();
        var month = date.getMonth() === 11 ? 12 : date.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month.toString();
        var day  = date.getDate();
        day = day.toString().length == 1 ? '0' + day : day.toString();

        var hour = date.getHours();
        hour = hour.toString().length == 1 ? '0' + hour : hour.toString();
        date.setMinutes(date.getMinutes() + 5);
        date = new Date(date);
        var minute = date.getMinutes();
        minute = minute.toString().length == 1 ? '0' + minute : minute.toString();
        var second = date.getSeconds();
        second = second.toString().length == 1 ? '0' + second : second.toString();

        format = format.replace('yyyy', year);
        format = format.replace('mm', month);
        format = format.replace('dd', day);
        format = format.replace('hh', hour);
        format = format.replace('ii', minute);
        format = format.replace('ss', second);

        return format;
    }

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
            },
            contactData() {
                return this.$store.state.contacts.data;
            }
        },
        watch: {
            inboxContacts(newValue, oldValue) {
                return newValue;
            },

        },
        created() {
            var _self = this;
            this.getInboxContacts();
        },
        methods: {
            async onClickContact(contact) {
                if(contact.status <= 1) {
                    var res = await this.$axios.$post('/updateContactStatus', {contact_id: contact.id, status: 2});
                }
                this.$store.commit('contacts/setContactData', contact);
                this.$store.commit('contacts/showSendForm', false);
                this.$store.commit('contacts/setNotSeen', '');
                this.$router.push('/user/contacts/reply');
            },
            async getInboxContacts() {
                for(var i in this.inboxContacts) {
                    if(this.inboxContacts[i].id === this.contactData.id) {
                        this.inboxContacts[i].status = 2;
                    }
                }
            }
        }
    }
</script>
<style>
    .not-seen {
        font-weight: bold;
    }
</style>
