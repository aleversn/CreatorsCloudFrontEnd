<template>
<div class="m-user-block">
    <div class="row">
        <h1 class="main-title">活动用户</h1>
    </div>
    <div class="row command-bar">
        <fv-command-bar :options="cmd">
            <template v-slot:right-space>
                <div style="width: auto; height: 100%; margin-right: 5px; display: flex; justify-content: center; align-items: center;">
                    <fv-search-box v-model="searchValue" :options="searchResult" icon="Search" placeholder="搜索用户" :revealBorder="true" borderRadius="3" borderWidth="2"></fv-search-box>
                </div>
            </template>
        </fv-command-bar>
    </div>
    <user-table v-model="usersList"></user-table>
</div>
</template>

<style lang="scss">
.m-user-block
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

<script>
import userTable from '@/components/manage/user/table.vue';

export default {
    components: {
        userTable
    },
    props: {

    },
    data () {
        return {
            cmd: [
                { name: "刷新", icon: "Refresh", iconColor: "rgba(0, 153, 204, 1)", func: () => { this.getUsers() } },
                { name: "管理角色", icon: "AccountManagement", iconColor: "rgba(0, 153, 204, 1)"},
                { name: "显示范围", icon: "Filter", iconColor: "rgba(0, 153, 204, 1)", secondary: [
                    { name: "10", icon: "LineSpacing", func: () => { this.filterLength = 10 } },
                    { name: "50", icon: "LineSpacing", func: () => { this.filterLength = 50 } },
                    { name: "100", icon: "LineSpacing", func: () => { this.filterLength = 100 } }
                ]}
            ],
            filterLength: 100,
            searchValue: "",
            usersList: [],
            searchUsers: []
        }
    },
    watch: {
        filterLength () {
            this.getUsers();
        },
        searchValue (val, old) {
            if(val === old)
                return 0;
            this.getUsers(val, val, 0);
        }
    },
    computed: {
        searchResult () {
            let arr = [];
            this.usersList.forEach((item, index) => {
                arr.push({
                    key: index,
                    name: item.email,
                    icon: "Contact"
                });
                if(index > 8)
                    return arr;
            });
            return arr;
        }
    },
    mounted () {
        this.getUsers();
    },
    methods: {
        async getUsers (email=null, phone=null, last=0) {
            await this.$api.Auth.GetUserList(email, phone, this.filterLength, last).then(data => {
                if(data.code === 100000)
                    this.usersList = data.data;
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
        }
    }
}
</script>