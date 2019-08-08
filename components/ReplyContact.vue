<template>
    <div id="reply_contact" class="col-md-9">
        <div class="row">
            <div class="col-md-12">
                <form id="submitForm" @submit.prevent="onSend">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="glyphicon glyphicon-envelope"></i>
                            <h6 class="panel-title">Reply contact</h6>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>From</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                            <input type="text" class="form-control" placeholder="Please input email" v-model="contactData.from_name" required disabled />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Subject</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                                            <input type="text" class="form-control" placeholder="Please input subject" v-model="contactData.subject" required disabled />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Content</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                                            <textarea  class="form-control" placeholder="Please input subject" rows="8" v-model="contactData.content" required disabled></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Reply Content</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                                            <textarea  class="form-control" placeholder="Please input subject" rows="8" v-model="reply_content"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Attach files</label>
                                        <ul class="mt-1">
                                            <li><a v-bind:href="contactData.file_link" target="_block">{{ contactData.filename }}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <button class="btn btn-primary" type="submit" id="btnSend" :disabled="disableButton">Send</button>
                            <button class="btn btn-default" type="button" id="btnClear" @click="onClear">Clear</button>
                            <div class="btn-group btn-group pull-right">
                                <button class="btn btn-warning" type="button" id="btnBack" @click="onBack">Back</button>
                            </div>
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
                reply_content: '',
                current_login_id: '',
                disableButton: false
          };
        },
        computed: {
            contactData() {
                // if(this.$store.state.contacts.data.hasOwnProperty('id')) {
                //     this.contact = this.$store.state.contacts.data
                //     this.contact.reply_id = this.$store.state.contacts.data.id;
                // }
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
            if(!this.contactData.hasOwnProperty('id')) {
                this.$router.back();
            }
        },
        created() {
            
        },
        methods: {
            async onSend() {
                var _self = this;
                if(this.reply_content.length) {
                    _self.disableButton = true;
                    var subject = this.contactData.subject.replace('[Reply from: ' + this.contactData.from_name + '] ', '');
                    var contact = {
                        from_id: this.userInfo.id,
                        to_id: this.contactData.from_id,
                        subject: '[Reply from: ' + this.userInfo.username + '] ' + subject,
                        content: this.reply_content,
                        reply_contact_id: this.contactData.id,
                        created_at: new Date().getTime(),
                        status: 0
                    }

                    var res = await this.$axios.$post('/addContact', {contact: contact});
                    if(res.status) {
                        
                        this.$store.commit('alert/success', 'Reply contact successfully.');
                    }

                    _self.disableButton = false;
                    
                } else {
                    this.$store.commit('alert/error', 'Please input reply content.');
                    
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
            onBack() {
                this.$router.back();
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
</style>
