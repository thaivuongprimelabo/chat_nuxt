<template>
    <div class="form-group">
        <button type="button" class="btn btn-primary" @click="onOpenDialog">Attach files</button> (Max size: 200KB)
        <ul class="mt-1">
            <li v-for="(attach, index) in attachments" v-bind:key="index">{{ attach.name }} ({{ attach.sizeFormat }})</li>
        </ul>
        <div id="upload_control">
            <input type="file" ref="myFiles" @change="onChange" style="display:none" multiple />
        </div>
    </div>
</template>
<script>
    import helpers from '~/plugins/helpers';

    export default {
        data: function() {
            return {
                attachments: [],
                maxSize: 200 * 1024
            }
        },
        methods: {
            onOpenDialog() {
                this.$refs.myFiles.click();
            },
            onChange(index) {
                var fileList = this.$refs.myFiles.files;
                if(fileList.length) {
                    for(var i = 0; i < fileList.length; i++) {
                        var fileItem = fileList[i];
                        if(fileItem.size > this.maxSize) {
                            this.$store.commit('alert/error', 'File ' + fileItem.name + ' is too large. Please select another file');
                        } else {
                            fileItem.sizeFormat = helpers.formatMemory(fileItem.size);
                            this.attachments.push(fileItem);
                        }
                    }
                }
            },
            clear() {
                this.$refs.myFiles.value = "";
                this.attachments = [];
            },
            getAttachments() {
                return this.attachments;
            }
        }
    }
</script>
<style>
    .mt-1 {
        margin-top: 10px;
    }
</style>

