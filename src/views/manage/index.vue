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
        //获取菜单表,保存到vuex中
        this.$store.dispatch("GetMenu")    
        //获取菜单列表
        this.getMenuList()
    },
    data () {
        return {
            navList: [
                { key: "", name: "", icon: "", url: "" },
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
           //vuex action是异步的,因此menu可能还没被初始化
           if(this.$store.getters.menu.size==undefined){
                let intervalID = setInterval(() => {
                    try{
                        this.getVuexMenuList()
                        // 清空触发器
                        if(this.$store.getters.buttonMap.size != undefined) {
                            clearInterval(intervalID);
                        }
                    } catch (e) {
                        console.log(e)
                    }
                },500);               
            }else{
                //已经初始化了
                  this.getVuexMenuList()
            }
        },
        getVuexMenuList(){
                var data=this.$store.getters.menu
                var index=0;
                var parentList=data.parentList;
                var sonList=data.sonList;
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