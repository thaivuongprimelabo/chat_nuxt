<template>
    <div>
        <nav class="navbar navbar-inverse nav-bar-sample" >
            <div class="container-fluid">
                <div class="navbar-header">
                <a class="navbar-brand" href="#">Sample App</a>
                </div>
                <ul class="nav navbar-nav">
                    <li v-for="fs in functions" v-bind:key="fs.id"><nuxt-link :to="{path: fs.path }">{{ fs.name }}</nuxt-link></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="javascript:void(0)"><span class="glyphicon glyphicon-user"></span> {{ userInfo.username }}</a></li>
                    <li><a href="javascript:void(0)" @click="this.onLogout"><span class="glyphicon glyphicon-log-in" ></span> Logout</a></li>
                </ul>
            </div>
        </nav>
        <nuxt />
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import firebase from 'firebase';
    var config = {
        apiKey: "AIzaSyBF6T-HeFPb1cLfq-jFfIpj2So7RbwViGo",
        authDomain: "testfirebase9999.firebaseapp.com",
        projectId: "testfirebase9999",
        databaseURL: "https://testfirebase9999.firebaseio.com",
        storageBucket: "testfirebase9999.appspot.com",
    };
    
    !firebase.apps.length ? firebase.initializeApp(config) : '';

    var current_login_id = localStorage.getItem('current_login_id');
    var db = firebase.firestore();
    var dbRealtime = firebase.database();
    var usersRef = db.collection('users')
    var messagesRef = db.collection('messages');
    var userStatusDatabaseRef = dbRealtime.ref('/status/' + current_login_id);
    var userStatusRef = dbRealtime.ref('/status');

    export default {
        data: function() {
          return {
              userInfo: {},
              functions: [
                  {
                      id: 1,
                      path: "/user/chatbox",
                      name: "Chatbox"
                  },
                  {
                      id: 2,
                      path: "/user/contacts",
                      name: "Contacts"
                  }
              ],
              current_login_id: null
          };
        },
        mounted() {

        },
        created() {
            this.current_login_id = localStorage.getItem('current_login_id');
            this.getUserInfo();
        },
        methods: {
            async getUserInfo() {
                var res = await this.$axios.$post('/getUserInfo', {current_login_id: this.current_login_id});
                if(res.status) {
                    this.userInfo = res.data;
                    this.$store.commit('userInfo/add', this.userInfo);
                }
            },
            async onLogout() {
                var isOfflineForDatabase = {
                    state: 'offline',
                };
                userStatusDatabaseRef.set(isOfflineForDatabase);
                localStorage.removeItem('current_login_id');
                this.$router.replace('/user/login');
            },
        }
    }
</script>

<style>
body {
    background-color:#ccc;
}
.nav-bar-sample {
    background-color: #3179B5;
    border: 1px solid #3179B5;
    border-radius: 0px;
}

.nav-bar-sample a {
    color:#f0f0f0 !important;
}

.nav-bar-sample .active a {
    background-color: #296596 !important;
}
.panel-title {
    display:inline;
}
tr td:first-child {
    font-weight: bold;
    width: 100px;
}
#scollDiv {
    max-height: 500px;
    overflow-y: scroll;
}
.container {
    margin-top: 20px;
}
</style>
