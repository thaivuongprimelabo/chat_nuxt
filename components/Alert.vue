<template>
    <div id="message">
        <div style="padding:5px">
            <div class="alert alert-danger inner-message" role="alert" v-show="error">
                {{ error }}
                <button type="button" class="close" @click="this.onClose">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-success inner-message" role="alert" v-show="success">
                {{ success }}
                <button type="button" class="close" @click="this.onClose">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            error: '',
            success: ''
        },
        methods: {
            onClose() {
                this.error = '';
                this.success = '';
            }
        }
    }
</script>
<style>
    #message {
        position: fixed;
        top: 0;
        right: 0;
        width: 40%;
        z-index: 9999;
    }
    .inner-message {
        margin: 0 auto;
    }
</style>