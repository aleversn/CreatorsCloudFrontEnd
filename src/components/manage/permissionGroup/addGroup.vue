<template>
<div class="add-group-container">
    <h3>基本信息</h3>
    <p class="star" style="margin-top: 15px;">名称</p>
    <fv-text-box v-model="name" placeholder="新组" :revealBorder="true" style="width: 90%; box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);"></fv-text-box>
    <p class="star" style="margin-top: 15px;">说明</p>
    <textarea v-model="description" placeholder="请输入新组的说明" style="width: 90%; height: 200px;"></textarea>
    <div class="row">
        <fv-button theme="dark" background="rgba(0, 120, 212, 1)" :disabled="!lock.add" style="width: 90px;" @click="addGroup">确定</fv-button>
        <fv-button style="width: 90px; margin-left: 3px;" @click="$emit('handle-cancel', 'cancel')">取消</fv-button>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            name: "",
            description: "",
            lock: {
                add: true
            }
        }
    },
    methods: {
        async addGroup () {
            if(!this.lock.add)
                return 0;
            if(this.name === '') {
                this.$barWarning('组名称不能为空', {
                    status: "warning",
                });
                return 0;
            }
            this.lock.add = false;
            await this.$api.Auth.AddPermissionGroup(this.name, this.description).then(data => {
                this.lock.add = true;
                if(data.code === 100000) {
                    this.$emit('handle-success', 'success');
                    this.name = '';
                    this.description = '';
                }
                else
                    this.$barWarning(data.message, {
                        status: "warning",
                    });
            }).
            catch(err => {
                this.lock.add = true;
                this.$barWarning(err.message, {
                    status: "warning",
                });
            });
        }
    }
}
</script>

<style lang="scss">
.add-group-container
{
    @include usual-form;
}
</style>