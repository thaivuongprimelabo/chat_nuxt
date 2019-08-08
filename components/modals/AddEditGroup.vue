<template>
    <div id="myModal" class="modal fade" role="dialog" ref="myModal">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">{{ title }}</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                            <input type="text" class="form-control" placeholder="Please input group name" v-model="group.name" required />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                            <SelectMulti v-model="group.parent_id" @setSelectValue="setSelectValue($event)"></SelectMulti>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"  data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="onDone" :disabled="disableButton">Done</button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import SelectMulti from '../SelectMulti';
    import helpers from '~/plugins/helpers';

    export default {
        components: {
            SelectMulti
        },
        props: {
            title: ''
        },
        data: function() {
            return {
                group: {
                    name: '',
                    parent_id: '',
                    created_by: '',
                    created_at: ''
                },
                disableButton: false
            }
        },
        methods: {
            show() {
                $(this.$refs.myModal).modal('show');
                this.clear();
            },
            hide() {
                $(this.$refs.myModal).modal('hide');
            },
            clear() {
                this.group.name = '';
                this.group.parent_id = '';
            },
            setSelectValue(event) {
                this.group.parent_id = event;
            },
            onDone() {
                var _self = this;
                _self.disableButton = true;
                _self.group.created_at = new Date().getTime();
                _self.group.created_by = helpers.getCurrentLoginId();
                helpers.newGroup(_self.group, function(new_group, message) {
                    if(new_group) {
                        _self.$store.commit('alert/success', message);
                        _self.$store.commit('groups/add', new_group);
                        _self.disableButton = false;
                        _self.hide();
                    }
                });
            }
        }   
    }
</script>

