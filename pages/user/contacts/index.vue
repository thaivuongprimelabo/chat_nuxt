
<template>
    <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
                <Sidebar></Sidebar>
                <SendContact></SendContact>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
    import Sidebar from '../../../components/Sidebar.vue';
    import SendContact from '../../../components/SendContact.vue';
    import firebase from 'firebase';
    import { setTimeout } from 'timers';

    export default {
        layout: 'main',
        middleware: 'auth',
        components: {
            SendContact,
            Sidebar
        },
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
                contact: {
                    from_id: '',
                    from_email: '',
                    to_id: '',
                    to_email: '',
                    subject: '',
                    content: '',
                    created_at: ''
                },
                error: '',
                success: '',
                users: [],
                userInfo: {},
                userSelect: {}
          };
        },
        mounted() {
        },
        created() {

            var _self = this;

            _self.getUsers();
        },
        methods: {
            async onSend() {
                var _self = this;
                if(this.contact.to.length) {
                    var res = await this.$axios.$post('/addContact', {contact: this.contact});
                    if(res.status) {
                        this.success = "Send contact successfully.";
                        this.contact.subject = '';
                        this.contact.content = '';
                        
                        setTimeout(function() {
                            _self.success = '';
                        }, 2000);
                    }
                } else {
                    this.error = "Please select an user to contact";
                    setTimeout(function() {
                        _self.error = '';
                    }, 2000);
                }
                
                return false;
            },
            onClear() {
                this.contact.subject = '';
                this.contact.content = '';
            },
            async getUsers() {
                var res = await this.$axios.$post('/getUsers', {});
                if(res.status) {
                    this.users = res.data;
                }
            },
            onClickUser(user) {
                this.$refs.send_contact.updateSendContact(user);
            }
        }
    }
</script>
<style>
</style>
