<template>
    <div id="send_contact" class="col-md-6">
        <div class="row">
            <div class="col-md-12">
                <form id="submitForm" @submit.prevent="onSend" v-show="showSendForm">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="glyphicon glyphicon-envelope"></i>
                            <h6 class="panel-title">New contact</h6>
                            <div class="btn-group btn-group-xs pull-right">
                                <a href="javascript:void(0)" style="color:#ffffff" @click="onClose"><i class="glyphicon glyphicon-remove"></i></a>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>To</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                            <select class=" form-control selectpicker" data-live-search="true" ref="select" v-model="select">
                                                <option data-tokens=""></option>
                                                <option v-for="(user, index) in users" v-bind:key="index" :value="user.id">{{ user.username }} ({{ user.email }})</option>
                                            </select>

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
                                            <textarea  class="form-control" placeholder="Please input subject" rows="8" v-model="contact.content" required></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <button class="btn btn-primary" type="submit" id="btnSend" :disabled="disableButton">Send</button>
                            <button class="btn btn-default" type="button" id="btnClear" @click="onClear">Clear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'
    import { mapState } from 'vuex';
    import helpers from '~/plugins/helpers';

    export default {
        components: {
        },
        data: function() {
          return {
                contact: {
                    from_id: '',
                    to_id: '',
                    subject: '',
                    content: '',
                    created_at: '',
                    status: 0
                },
                select: '',
                current_login_id: '',
                disableButton: false
          };
        },
        computed: {
            showSendForm() {
                return this.$store.state.contacts.showSendForm;
            },
            userInfo() {
                return this.$store.state.userInfo.data;
            },
            users() {
                return this.$store.state.users.data;
            }   
        },
        watch: {
            showSendForm(newValue, oldValue) {
                return newValue;
            },
            userInfo(newValue, oldValue) {
                return newValue;
            },
            users(newValue) {
                return newValue;
            }
        },
        updated() {
            $(this.$refs.select).selectpicker('refresh');
        },
        mounted() {
        },
        created() {
            
        },
        methods: {
            onSend() {
                var _self = this;
                if(_self.select.length) {
                    _self.disableButton = true;
                    _self.contact.from_id = _self.userInfo.id;
                    _self.contact.to_id = _self.select;
                    _self.contact.created_at = new Date().getTime();
                    helpers.getContactsRef().add(_self.contact).then(function() {
                        _self.contact.subject = '';
                        _self.contact.content = '';
                        _self.$store.commit('alert/success', 'Send contact successfully.');
                        _self.disableButton = false;
                    });
                } else {
                    _self.$store.commit('alert/error', 'Please select an user to contact.');
                    _self.disableButton = false;
                }
                
                return false;
            },
            onClear() {
                this.contact.subject = '';
                this.contact.content = '';
            },
            onClose() {
                this.$store.commit('contacts/showSendForm', false);
            }
        }
    }
</script>
<style>
    #send_contact {
        position: fixed;
        bottom:-20px;
        right:0px;
        z-index: 9999;
    }
</style>
