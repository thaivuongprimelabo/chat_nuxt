<template>
    <div id="reply_contact" class="col-md-9">
        <div class="row">
            <div class="col-md-12">
                <form id="submitForm">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="glyphicon glyphicon-envelope"></i>
                            <h6 class="panel-title">View contact</h6>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>To</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                            <input type="text" class="form-control" placeholder="Please input email" v-model="contact.to_email" required disabled />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Subject</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                                            <input type="text" class="form-control" placeholder="Please input subject" v-model="contact.subject" required disabled />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Content</label>
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                                            <textarea  class="form-control" placeholder="Please input subject" rows="8" v-model="contact.content" required disabled></textarea>
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
                            <button class="btn btn-warning" type="button" id="btnBack" @click="onBack">Back</button>
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
                }
          };
        },
        computed: {
            contactData() {
                if(this.$store.state.contacts.data.hasOwnProperty('id')) {
                    this.contact = this.$store.state.contacts.data
                }
                return this.$store.state.contacts.data;
            }
        },
        watch: {
            contactData(newValue, oldValue) {
                return newValue;
            }
        },
        mounted() {
            if(!this.contactData.hasOwnProperty('id')) {
                this.$router.back();
            }
        },
        created() {
            
        },
        methods: {
            onBack() {
                this.$router.back();
            }
        }
    }
</script>
<style>
</style>
