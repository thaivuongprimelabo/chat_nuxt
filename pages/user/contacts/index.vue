
<template>
    <Contacts>
        <div class="row">
            <div class="col-md-12">
                <Alert v-bind:error="error" v-bind:success="success"></Alert>
                <form id="submitForm" @submit.prevent="onSend">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                        <i class="glyphicon glyphicon-envelope"></i>
                        <h6 class="panel-title">Send contact</h6>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>To</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                            <input type="email" class="form-control" placeholder="Please input email" v-model="contact.to" disabled />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Subject</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                                            <input type="text" class="form-control" placeholder="Please input subject" v-model="contact.subject" required />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Content</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                                            <textarea  class="form-control" placeholder="Please input subject" rows="15" v-model="contact.content" required ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <button class="btn btn-primary" type="submit" id="btnSend">Send</button>
                            <button class="btn btn-default" type="button" id="btnClear" @click="onClear">Clear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Contacts>
</template>
<script>
    import Alert from '../../../components/Alert.vue';
    import firebase from 'firebase';
    import Contacts from '../../../components/Contacts.vue';
    import { setTimeout } from 'timers';

    var current_login_id = localStorage.getItem('current_login_id');

    export default {
        layout: 'main',
        middleware: 'auth',
        components: {
            Alert,
            Contacts
        },
        data: function() {
          return {
              contact: {
                  receive_id: 0,
                  subject: '',
                  to: '',
                  content: '',
                  created_at: ''
              },
              error: '',
              success: ''
          };
        },
        mounted() {
        },
        created() {

            var _self = this;
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
            }
        }
    }
</script>
<style>
</style>
