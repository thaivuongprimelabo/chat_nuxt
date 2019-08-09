<template>
    <div>
        <div class="panel panel-primary">
            <div class="panel-heading">
                <i class="glyphicon glyphicon-user"></i>
                <h6 class="panel-title">Groups</h6>
            </div>
            <div class="panel-body">
                <ul class="list-group">
                    <GroupItem v-for="(group,index) in groupItems" :key="index" :groupItem="group" :groups="groups"></GroupItem>
                </ul>
            </div>
            <div class="panel-footer">
                <button class="btn btn-danger" @click="onNewGroup"><span class="glyphicon glyphicon-plus"></span> New group</button>
            </div>
        </div>
        <AddEditGroup :title="'New group'" ref="myModal"></AddEditGroup>
    </div>
    
</template>
<script>
    import helpers from '~/plugins/helpers';
    import GroupItem from './GroupItem';
    import AddEditGroup from './modals/AddEditGroup';

    export default {
        components: {
            GroupItem,
            AddEditGroup
        },
        data: function() {
            return {
                groupItems: []
            }
        },
        computed: {
            groups() {
                return this.$store.state.groups.data;
            }
        },
        watch: {
            groups(newValue, oldValue) {
                // console.log('Groups:watch')
                this.groupItems = this.makeGroupItem(newValue);
                return newValue;
            }
        },
        created() {
            var _self = this;
            
        },
        methods: {
            makeGroupItem(groups) {
                var groupItems = [];
                for(var i in groups) {
                    var group = groups[i];
                    if(group.parent_id === '') {
                        groupItems.push(group);
                    }
                }
                return groupItems;
            },
            onNewGroup() {
                this.$refs.myModal.show();
            }
        }
    }
</script>
