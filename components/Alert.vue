<template>
    <div>
        <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
            <button type="button" class="close" @click="this.onClose">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="alert alert-success" role="alert" v-show="success">
            {{ success }}
            <button type="button" class="close" @click="this.onClose">
                <span aria-hidden="true">&times;</span>
            </button>
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