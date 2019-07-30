<template>
    <div id="message">
        <div style="padding:5px">
            <div class="alert alert-danger inner-message" role="alert" v-show="errorTxt">
                {{ errorTxt }}
                <button type="button" class="close" @click="this.onClose">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-success inner-message" role="alert" v-show="successTxt">
                {{ successTxt }}
                <button type="button" class="close" @click="this.onClose">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        // props: {
        //     error: '',
        //     success: ''
        // },
        data: function() {
            return {
                errorTxt: '',
                successTxt: ''
            }
        },
        computed: {
            error() {
                this.errorTxt = this.$store.state.alert.error;
                return this.$store.state.alert.error;
            },
            success() {
                this.successTxt = this.$store.state.alert.success;
                return this.$store.state.alert.success;
            }
        },
        watch: {
            error(newValue, oldValue) {
                if(newValue.length > oldValue.length) {
                    this.errorTxt = newValue;
                    var _self = this;
                    setTimeout(function() {
                        _self.$store.commit('alert/error', '');
                    }, 2000);
                    return newValue;
                }
            },
            success(newValue, oldValue) {
                if(newValue.length > oldValue.length) {
                    this.successTxt = newValue;
                    var _self = this;
                    setTimeout(function() {
                        _self.$store.commit('alert/success', '');
                    }, 2000);
                    return newValue;
                }
            }
        },
        methods: {
            onClose() {
                this.errorTxt = '';
                this.successTxt = '';
                this.$store.commit('alert/error', '');
                this.$store.commit('alert/success', '');
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