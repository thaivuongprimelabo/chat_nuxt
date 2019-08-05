
<template>
    <Contact>
        <div class="col-md-9">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="glyphicon glyphicon-user"></i>
                            <h6 class="panel-title">Chat box</h6>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12 scollDiv" id="scollDiv">
                                    <table class="table table-hover" id="messageContainer">
                                        <colgroup>
                                            <col width="20%" />
                                            <col width="80%" />
                                        </colgroup>
                                        <tbody>
                                            <tr v-for="msg in messages" v-bind:key="msg.created_at">
                                                <td><i class="glyphicon glyphicon-user"></i> {{msg.name}}</td>
                                                <td>{{msg.text}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <form>
                                <div class="input-group input-group-sm">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-pencil"></i>
                                </span>
                                <input type="text" class="form-control" id="txtText" v-model="text" placeholder="Type your message here ..">
                                <span class="input-group-btn">
                                    <button class="btn btn-primary" type="button" id="btnSend" @click="this.onSend" :disabled="disableButton">Send</button>
                                </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Contact>
</template>
<script>
    import Contact from '../../components/Contact.vue';
    import firebase from 'firebase';
    import helpers from '~/plugins/helpers';

    export default {
        layout: 'main',
        middleware: 'auth',
        components: {
            Contact
        },
        data: function() {
          return {
                message: {
                    text: '',
                    name: '',
                    user_id: '',
                    created_at: ''
                },
                text: '',
                messages: [],
                disableButton: true
          };
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo.data;
            }
        },
        watch: {
            text(newValue, oldValue) {
                if(!newValue.length) {
                    this.disableButton = true;
                } else {
                    this.disableButton = false;
                }
            }
        },
        mounted() {
        },
        created() {
            var _self = this;
            helpers.getMessages(function(messages) {
                _self.messages = messages;
            })
        },
        methods: {
            onSend() {
                var _self = this;
                _self.message.user_id = _self.userInfo.id;
                _self.message.text = _self.text;
                _self.message.name = _self.userInfo.username;
                _self.message.created_at = new Date().getTime();
                helpers.sendMessage(_self.message, function(id) {
                    if(id) {
                        _self.messages.push(message);
                    }
                });
            }
        }
    }
</script>
<style>
.scollDiv {
    height: 400px;
    overflow-y: scroll;
}
</style>
