<template>
    <li class="list-group-item">
        <a href="#">{{ groupItem.name }}</a>
        <ul class="list-group" v-if="childrens.length">
            <GroupItemA v-for="(group,index) in childrens" :key="index" :groupItem="group"></GroupItemA>
        </ul>
    </li>
</template>
<script>

    var GroupItem = {
        components: {

        },
        props: {
            groupItem: null,
            groups: null
        },
        data: function() {
            return {
                childrens: []
            }
        },
        computed: {
            groups1() {
                this.childrens = this.makeGroupItem(this.$store.state.groups.data);
                return this.$store.state.groups.data;
            }
        },
        watch: {
            groups1(newValue, oldValue) {
                this.childrens = this.makeGroupItem(newValue);
                return newValue;
            }
        },
        created() {
        },
        methods: {
            makeGroupItem(groups) {
                var childrens = [];
                for(var i in groups) {
                    var group = groups[i];
                    if(group.parent_id === this.groupItem.id) {
                        childrens.push(group);
                    }
                }
                return childrens;
            }
        }
    }

    var GroupItemA = GroupItem;
    GroupItem.components['GroupItemA'] = GroupItemA;

    export default GroupItem;
</script>
