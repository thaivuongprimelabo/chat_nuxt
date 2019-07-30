<template>
    <div id="send_contact" class="col-md-6">
        <div class="row">
            <div class="col-md-12">
                <form id="submitForm" @submit.prevent="onSend" v-show="showSendForm">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="glyphicon glyphicon-envelope"></i>
                            <h6 class="panel-title">{{ contactData.hasOwnProperty('id') ? 'View contact' : 'New contact' }}</h6>
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
                                            <input type="text" class="form-control" placeholder="Please input subject" v-model="contact.subject" required  :disabled="contactData.hasOwnProperty('id')" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Content</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                                            <textarea  class="form-control" placeholder="Please input subject" rows="8" v-model="contact.content" required :disabled="contactData.hasOwnProperty('id')"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <button class="btn btn-primary" type="submit" id="btnSend" :disabled="disableButton || contactData.hasOwnProperty('id')">Send</button>
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
            contactData() {
                if(this.$store.state.contacts.data.hasOwnProperty('id')) {
                    this.contact = this.$store.state.contacts.data
                }
                return this.$store.state.contacts.data;
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
            contactData(newValue, oldValue) {
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
            async onSend() {
                var _self = this;
                if(this.select.length) {
                    _self.disableButton = true;
                    this.contact.from_id =this.userInfo.id;
                    this.contact.to_id = this.select;
                    this.contact.created_at = new Date().getTime();
                    var res = await this.$axios.$post('/addContact', {contact: this.contact});
                    if(res.status) {
                        this.contact.subject = '';
                        this.contact.content = '';
                        this.$store.commit('alert/success', 'Send contact successfully.');
                    }

                    _self.disableButton = false;
                    
                } else {
                    this.$store.commit('alert/error', 'Please select an user to contact.');
                    
                }
                
                return false;
            },
            onClear() {
                this.contact.subject = '';
                this.contact.content = '';
            },
            onClose() {
                this.$store.commit('contacts/showSendForm', false);
            },
            getDate(input, format) {
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
        }
    }
</script>
<style>
    #send_contact {
        position: fixed;
        bottom:-20px;
        right:0px;
    }
</style>
