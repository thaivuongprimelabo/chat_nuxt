
<template>
    <Contact>
        <ReplyContact></ReplyContact>
    </Contact>
</template>
<script>
    import firebase from 'firebase';
    import { setTimeout } from 'timers';
    import Contact from '../../../../components/Contact.vue';
    import ReplyContact from '../../../../components/ReplyContact.vue';

    var current_login_id = localStorage.getItem('current_login_id');

    export default {
        layout: 'main',
        middleware: 'auth',
        components: {
            Contact,
            ReplyContact
        },
        data: function() {
          return {
          };
        },
        computed: {
        },
        watch: {
        },
        created() {
        },
        methods: {
        }
    }
</script>
<style>
    .not-seen {
        font-weight: bold;
    }
</style>
