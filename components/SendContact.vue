<template>
    <div class="col-md-9">
        <div class="row">
            <div class="col-md-12">
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
                                        <label>Email</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                            <input type="email" class="form-control" placeholder="Please input email" v-model="contact.to_email" />
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
                                            <textarea  class="form-control" placeholder="Please input subject" rows="15" v-model="contact.content" required wrap="hard"></textarea>
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

    export default {
        components: {
        },
        data: function() {
          return {
                contact: {
                    from_id: '',
                    from_email: '',
                    to_id: '',
                    to_name: '',
                    to_email: '',
                    subject: '',
                    content: '',
                    created_at: '',
                    status: 0
                },
                current_login_id: '',
                disableButton: false
          };
        },
        computed: {
            userSelect() {
                return this.$store.state.userSelect.data;
            },
            userInfo() {
                return this.$store.state.userInfo.data;
            }   
        },
        watch: {
            userSelect(newValue, oldValue) {
                this.contact.to_id = this.$store.state.userSelect.data.id;
                if(this.$store.state.userSelect.data.email !== undefined && this.$store.state.userSelect.data.username !== undefined) {
                    this.contact.to_email = this.$store.state.userSelect.data.username + ';';
                }
                this.contact.to_name = this.$store.state.userSelect.data.username;
                this.contact.subject = this.$store.state.userSelect.data.subject;
                this.contact.content = this.$store.state.userSelect.data.content;
            },
            userInfo(newValue, oldValue) {
                this.contact.from_id = this.$store.state.userInfo.data.id;
                this.contact.from_email = this.$store.state.userInfo.data.email;
            }
        },
        mounted() {
        },
        created() {
            
        },
        methods: {
            async onSend() {
                var _self = this;
                if(this.contact.to_id !== undefined) {
                    _self.disableButton = true;
                    this.contact.created_at = this.getDate();
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
