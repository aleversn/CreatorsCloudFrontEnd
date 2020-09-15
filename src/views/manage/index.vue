<template>
<div class="cc-manage-container">
    <banner class="banner-block" :manageMenu="true"></banner>
    <div class="manage-view-container">
        <fv-navigation-view
            v-model="navCurrent"
            :title="'管理中心'"
            :options="navList"
            foreground="#9f3a8c"
            settingTitle="设置"
            style="height: 100%;"
            @back="$Back"
        ></fv-navigation-view>
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import banner from '@/components/general/banner.vue';

export default {
    components: {
        banner
    },
    data () {
        return {
            navList: [
                { key: 0, name: "概览", icon: "WebComponents", url: "/manage" },
                { key: 1, name: "用户", type: "header" },
                { key: 2, name: "用户", icon: "Contact", url: "/manage/user" },
                { key: 3, name: "权限", type: "header" },
                { key: 4, name: "权限组", icon: "Group", url: "/manage/permissionGroup" }
            ],
            navCurrent: {}
        }
    },
    watch: {
        $route () {
            this.correctNav(this.$route, {});
        },
        navCurrent (to) {
            if(this.$route.fullPath != to.url)
                this.$Go(to.url);
        }
    },
    mounted () {
        this.correctNav(this.$route, {});
    },
    methods: {
        switchNav (item) {
            if(this.$route.fullPath != item.url)
                this.$Go(item.url);
        },
        correctNav (to, from) {
            if(to.fullPath !== from.fullPath && this.$route.fullPath != this.navCurrent.url) {
                let to_item = this.navList.find(item => this.$route.fullPath == item.url);
                if(!to_item) this.navList.find(item => this.$route.fullPath.startsWith(item.url));
                this.navCurrent = to_item;
            }
        }
    }
}
</script>

<style lang="scss">
.cc-manage-container
{
    @include app;
    @include FlexC;

    .banner-block
    {
        z-index: 5;
    }

    .manage-view-container
    {
        position: relative;
        flex: 1;
        display: flex;
        overflow: hidden;
    }
}
</style>