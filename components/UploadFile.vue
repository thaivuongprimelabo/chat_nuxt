<template>
    <div class="form-group">
        <button type="button" class="btn btn-primary" @click="onOpenDialog">Attach files</button> (Max size: 200KB)
        <ul class="mt-1">
            <li v-for="(attach, index) in attachments" v-bind:key="index">{{ attach.name }} ({{ attach.size }})</li>
        </ul>
        <input type="file" ref="myFiles" style="display:none" @change="onChange" />
    </div>
</template>
<script>

    import firebase from 'firebase';
    import { sprintf } from 'sprintf-js';
    var config = {
        apiKey: "AIzaSyBF6T-HeFPb1cLfq-jFfIpj2So7RbwViGo",
        authDomain: "testfirebase9999.firebaseapp.com",
        projectId: "testfirebase9999",
        databaseURL: "https://testfirebase9999.firebaseio.com",
        storageBucket: "testfirebase9999.appspot.com",
    };
    
    !firebase.apps.length ? firebase.initializeApp(config) : '';

    var storageRef = firebase.storage().ref();
    var contactRef = firebase.firestore().collection('contacts');

    export default {
        data: function() {
            return {
                fileUploads: [],
                attachments: [],
                maxSize: 200 * 1024
            }
        },
        methods: {
            onOpenDialog() {
                this.$refs.myFiles.click();
            },
            onChange() {
                
                if(this.$refs.myFiles.files[0].size > this.maxSize) {
                    this.$store.commit('alert/error', 'Your file is too large. Please select another file');
                } else {
                    var file = {
                        name: this.$refs.myFiles.files[0].name,
                        size: this.formatMemory(this.$refs.myFiles.files[0].size)
                    }
                    this.attachments.push(file);
                }
            },
            getFileObject() {
                return this.$refs.myFiles.files[0];
            },
            clear() {
                this.$refs.myFiles.files[0].value = "";
                this.attachments = [];
            },
            async doUpload(contact) {
                var _self = this;
                if(_self.$refs.myFiles.files.length) {
                    var fileObject = _self.$refs.myFiles.files[0];
                    var fileRef = storageRef.child(_self.$refs.myFiles.files[0].name);
                    fileRef.put(fileObject).then(function(snapshot) {
                        storageRef.child(_self.$refs.myFiles.files[0].name).getDownloadURL().then(function(url) {
                            
                        });
                    });
                }
            },
            formatMemory($memory) {
                if ($memory >= 1024 * 1024 * 1024) {
                    return sprintf('%.1f GB', $memory / 1024 / 1024 / 1024);
                }
                
                if ($memory >= 1024 * 1024) {
                    return sprintf('%.1f MB', $memory / 1024 / 1024);
                }
                
                if ($memory >= 1024) {
                    return sprintf('%d KB', $memory / 1024);
                }
                
                return sprintf('%d B', $memory);
            }
        }
    }
</script>
<style>
    .mt-1 {
        margin-top: 10px;
    }
</style>

