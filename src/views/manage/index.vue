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
import {getMenu} from '@/api/auth.js'
export default {
    components: {
        banner
    },
    created(){
        this.getMenuList()
    },
    data () {
        return {
            navList: [
                { key: 0, name: "概览", icon: "WebComponents", url: "/manage" },
                { key: 1, name: "用户和权限", type: "header" },
                { key: 2, name: "用户", icon: "Contact", url: "/manage/user" },
                { key: 3, name: "组", icon: "Group", url: "/manage/group" },
                { key: 1, name: "测试", type: "header" },
                { key: 1, name: "ss", icon: "Group", url: "/auth/info" }
            ],
            navCurrent: {}
        }
    },
    watch: {
        navCurrent (to) {
            if(this.$route.fullPath != to.url)
                this.$Go(to.url);
        }
    },
    mounted () {
        this.correctNav(this.$route, {});
    },
    methods: {
        getMenuList(){
           getMenu().then(res=>{
             var index=0;
             var parentList=res.data.parentList;
             var sonList=res.data.sonList;
             var list=[];
             for(var i=0;i<parentList.length;i++){
                var parent={}
                var parentUid=parentList[i].uid
                parent.name=parentList[i].name
                parent.type="header"
                list.push(parent)
                for(var j=0;j<sonList.length;j++){
                    if(sonList[j].parentUid==parentUid){
                        //这里需要换成别的图标
                        sonList[j].icon="Group"
                        list.push(sonList[j])
                    }
                }
             }
              this.navList=list
           })
        },
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