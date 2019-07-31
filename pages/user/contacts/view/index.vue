
<template>
    <Contact>
        <ViewContact></ViewContact>
    </Contact>
</template>
<script>
    import firebase from 'firebase';
    import { setTimeout } from 'timers';
    import Contact from '../../../../components/Contact.vue';
    import ViewContact from '../../../../components/ViewContact.vue';

    var current_login_id = localStorage.getItem('current_login_id');

    export default {
        layout: 'main',
        middleware: 'auth',
        components: {
            Contact,
            ViewContact
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
