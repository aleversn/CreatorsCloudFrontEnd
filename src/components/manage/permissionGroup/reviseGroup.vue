<template>
<div class="add-group-container">
    <h3>修改信息</h3>
    <p>权限组: {{value.pgid}}</p>
    <p class="star" style="margin-top: 15px;">名称</p>
    <fv-text-box v-model="name" placeholder="权限组名称" :revealBorder="true" style="width: 90%; box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);"></fv-text-box>
    <p class="star" style="margin-top: 15px;">说明</p>
    <textarea v-model="description" placeholder="请输入权限组的说明" style="width: 90%; height: 200px;"></textarea>
    <div class="row">
        <fv-button theme="dark" background="rgba(0, 120, 212, 1)" :disabled="!lock.revise" style="width: 90px;" @click="reviseGroup">确定</fv-button>
        <fv-button style="width: 90px; margin-left: 3px;" @click="$emit('handle-cancel', 'cancel')">取消</fv-button>
    </div>
</div>
</template>

<script>
export default {
    props: {
        value: {
            default: () => {
                return {};
            }
        }
    },
    data () {
        return {
            name: "",
            description: "",
            lock: {
                revise: true
            }
        }
    },
    watch: {
        value (val) {
            this.name = val.name;
            this.description = val.description;
        }
    },
    methods: {
        async reviseGroup () {
            if(!this.lock.revise)
                return 0;
            if(!this.value.pgid) {
                this.$barWarning('当前PGID未定义', {
                    status: "warning",
                });
                return 0;
            }
            if(this.name === '') {
                this.$barWarning('组名称不能为空', {
                    status: "warning",
                });
                return 0;
            }
            this.lock.revise = false;
            await this.$api.Auth.UpdatePermissionGroup(this.value.pgid, this.name, this.description).then(data => {
                this.lock.revise = true;
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
                this.lock.revise = true;
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