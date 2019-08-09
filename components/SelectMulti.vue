<template>
    <select class="form-control" v-model="selectOption">
        <option value="">Select a group</option>
        <option v-for="(group,index) in options" :key="index" :value="group.id">|{{ group.spacing }} {{ group.name }}</option>
    </select>
</template>
<script>
    export default {
        components: {
        },
        data: function() {
            return {
                options: [],
                selectOption: ''
            }
        },
        computed: {
            groups() {
                return this.$store.state.groups.data;
            }
        },
        watch: {
            groups(newValue, oldValue) {
                var groups = newValue;
                this.options = [];
                this.makeSelectOption(groups, '', '');
                return newValue;
            },
            selectOption(newValue, oldValue) {
                this.$emit('setSelectValue', newValue);
            }
        },
        created() {
            var _self = this;
        },
        methods: {
            makeSelectOption(groups, parent_id, spacing) {
                for(var i in groups) {
                    var group = groups[i];
                    if(group.parent_id === parent_id) {
                        var current_spacing = spacing + '--';
                        group.spacing = current_spacing;
                        this.options.push(group);
                        if(this.hasChild(groups, group.id)) {
                            this.makeSelectOption(groups, group.id, current_spacing);
                        }
                    }
                }   
            },
            hasChild(groups, id) {
                for(var i in groups) {
                    var group = groups[i];
                    if(group.parent_id === id) {
                        return true;
                    }
                }
                return false;
            },
            clear() {
                this.selectOption = ''; 
            }
        }
    }
</script>

