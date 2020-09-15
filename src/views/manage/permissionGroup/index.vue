<template>
<div class="m-group-block">
    <div class="row">
        <h1 class="main-title">权限组</h1>
    </div>
    <div class="row command-bar">
        <fv-command-bar :options="cmd">
            <template v-slot:right-space>
                <div style="width: auto; height: 100%; margin-right: 5px; display: flex; justify-content: center; align-items: center;">
                    <fv-search-box v-model="searchValue" icon="Search" placeholder="搜索" :revealBorder="true" borderRadius="3" borderWidth="2"></fv-search-box>
                </div>
            </template>
        </fv-command-bar>
    </div>
    <groups-table v-model="groupsList" @revise-info="reviseInfo" @delete-group="deleteGroup"></groups-table>

    <fv-panel v-model="show.addGroup" title="添加权限组" width="550" background="rgba(255, 255, 255, 0.3)" :isAcrylic="true">
        <template v-slot:container>
            <add-group @handle-success="handleAdd" @handle-cancel="show.addGroup = false"></add-group>
        </template>
    </fv-panel>
    <fv-panel v-model="show.reviseGroup" title="修改权限组" width="550" background="rgba(255, 255, 255, 0.3)" :isAcrylic="true">
        <template v-slot:container>
            <revise-group :value="currentReviseGroup" @handle-success="handleRevise" @handle-cancel="show.reviseGroup = false"></revise-group>
        </template>
    </fv-panel>
</div>
</template>

<script>
import groupsTable from '@/components/manage/permissionGroup/table.vue';
import addGroup from '@/components/manage/permissionGroup/addGroup.vue';
import reviseGroup from '@/components/manage/permissionGroup/reviseGroup.vue';

export default {
    components: {
        groupsTable,
        addGroup,
        reviseGroup
    },
    data () {
        return {
            cmd: [
                { name: "刷新", icon: "Refresh", iconColor: "rgba(0, 153, 204, 1)", func: () => { this.getGroups(); } },
                { name: "添加权限组", icon: "Add", iconColor: "rgba(0, 153, 204, 1)", func: () => { this.show.addGroup = true; } }
            ],
            groupsList: [],
            searchValue: "",
            currentReviseGroup: {},
            show: {
                addGroup: false,
                reviseGroup: false
            }
        }
    },
    mounted () {
        this.getGroups();
    },
    methods: {
        async getGroups (name=null, fuzzy=false, withPermission=false, length=100, last=0) {
            await this.$api.Auth.GetPermissionGroupList(name, fuzzy, withPermission, length, last).then(data => {
                if(data.code === 100000)
                    this.groupsList = data.data;
                else
                    this.$barWarning(data.message, {
                        status: "warning",
                    });
            }).
            catch(err => {
                this.$barWarning(err.message, {
                    status: "warning",
                });
            });
        },
        reviseInfo (item) {
            this.currentReviseGroup = item;
            this.show.reviseGroup = true;
        },
        deleteGroup (item) {
            this.$infoBox(`确定删除权限组'${item.pgid}'`, {
                status: 'blocked',
                title: '确认操作',
                theme: 'dark',
                confirm: async () => {
                    await this.$api.Auth.RemovePermissonGroup(item.pgid).then(data => {
                        if(data.code === 100000)
                            this.getGroups();
                        else
                            this.$barWarning(data.message, {
                                status: "warning",
                            });
                    }).
                    catch(err => {
                        this.$barWarning(err.message, {
                            status: "warning",
                        });
                    });
                },
                cancel: () => {}
            });
        },
        handleAdd () {
            this.getGroups();
            this.show.addGroup = false;
        },
        handleRevise () {
            this.getGroups();
            this.show.reviseGroup = false;
        }
    }
}
</script>

<style lang="scss">
.m-group-block
{
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(250, 250, 250, 1);
	box-sizing: border-box;
    overflow: hidden;
    
    display: flex;
    flex-direction: column;

    .row
    {
        position: relative;
        width: 100%;
        height: auto;
        padding: 12px;
        box-sizing: border-box;

        &.command-bar
        {
            padding: 0px 12px;
            z-index: 1;
        }

        &.main-table
        {
            width: calc(100% - 24px);
            flex: 1;
            margin: 8px 12px;
            padding: 0px;
            background: white;
            border-radius: 5px;
            box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
    }

    .main-title
    {
        @include nowrap;
        
        font-size: 18px;
        font-weight: 600;
        color: rgba(172, 89, 101, 0.9);
    }
}
</style>