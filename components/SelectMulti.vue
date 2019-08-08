<template>
    <select class="form-control" v-model="selectOption">
        <option v-for="(group,index) in options" :key="index" :value="group.id">{{ group.spacing }}{{ group.name }}</option>
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
                this.makeSelectOption(groups, '', '', '|');
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
            makeSelectOption(groups, parent_id, spacing, first) {
                for(var i in groups) {
                    var group = groups[i];
                    if(group.parent_id === parent_id) {
                        group.spacing = group.hasOwnProperty('spacing') ? group.spacing + spacing : spacing;
                        this.options.push(group);
                        if(this.hasChild(groups, group.id)) {
                            var child_spacing = spacing.indexOf('|') < 0 ? first + spacing + '--' : spacing + '--';
                            this.makeSelectOption(groups, group.id, child_spacing, first);
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
            }
        }
    }
</script>

