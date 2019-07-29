
<template>
    <div class="row">
        <div class="col-md-12">
            <Alert v-bind:error="error" v-bind:success="success"></Alert>
            <form id="submitForm" @submit.prevent="onSend">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                    <i class="glyphicon glyphicon-envelope"></i>
                    <h6 class="panel-title">Sent</h6>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-bordered">
                                    <colgroup>
                                        <col width="4%" />
                                        <col width="50%" />
                                        <col width="20%" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Subject</th>
                                            <th>From</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="sentContacts.length > 0">
                                        <tr  v-for="sc in sentContacts" v-bind:key="sc.id">
                                            <td>1</td>
                                            <td>{{ sc.subject }}</td>
                                            <td>{{ sc.receive_id }}</td>
                                            <td>{{ sc.created_at }}</td>
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
    </div>
</template>
<script>
    import Alert from '../../../../components/Alert.vue';
    import firebase from 'firebase';
    import { setTimeout } from 'timers';
    import Contacts from '../../../../components/Contacts.vue';

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
              sentContacts: [],
              error: '',
              success: ''
          };
        },
        mounted() {
        },
        created() {

            var _self = this;

            _self.getSentContacts();
        },
        methods: {
            async getSentContacts() {
                var res = await this.$axios.$post('/getSentContacts', {current_login_id: current_login_id});
                if(res.status) {
                    this.sentContacts = res.data;
                }
            }
        }
    }
</script>
<style>
</style>
