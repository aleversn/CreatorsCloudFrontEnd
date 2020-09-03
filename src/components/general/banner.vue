<template>
<div class="cc-banner-container">
    <div class="left-block">
        <img v-show="!manageMenu" draggable="false" class="logo" src="@/assets/CC/Creators_Cloud.svg" alt="">
        <p v-show="manageMenu" class="b-icon ms-Icon ms-Icon--GlobalNavButton"></p>
        <p class="b-title">Creators Cloud</p>
    </div>
    <div class="right-block" ref="right_block">
        <div v-show="!isLogin" class="guest-block" @click="$Go(`/login?return_url=${$route.fullPath}`)">
            登录
        </div>
        <div v-show="isLogin" class="user-block" @click="showProfile ^= true">
            <img class="b-avatar" src="@/assets/logo.png" alt="">
            <p class="user-info" :title="userInfo.email">{{userInfo.email}}</p>
        </div>
        <transition name="el-zoom-in-top">
            <profile-menu v-show="showProfile" class="profile-block"></profile-menu>
        </transition>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex";
import profileMenu from '@/components/general/profileMenu.vue';

export default {
    components: {
        profileMenu
    },
    props: {
        manageMenu: {
            default: false
        }
    },
    data () {
        return {
            showProfile: false,
            timer: {}
        }
    },
    computed: {
		...mapState({
			userInfo: (state) => state.User.info,
        }),
        isLogin () {
            let token = localStorage.getItem('ApiToken');
            if(token)
                return true;
            return false;
        }
    },
    mounted () {
        this.outSideClickInit();
        this.refreshUserInfo();
        this.timerInit();
    },
    methods: {
        timerInit () {
            this.timer = setInterval(() => {
                this.refreshUserInfo();
            }, 300000);
        },
        refreshUserInfo () {
            this.$api.Auth.GetCurrentUserInfo()
                .then(data => {
                    if(data.code === 100000) {
                        let dataInfo = data.data;
                        dataInfo.userid = data.uid;
                        this.$store.commit('setInfo', dataInfo);
                    }
                });
        },
        outSideClickInit() {
            window.addEventListener("click", event => {
                let x = event.target;
                let _self = false;
                while (x.tagName.toLowerCase() != "body") {
                    if (x == this.$refs.right_block) {
                        _self = true;
                        break;
                    }
                    x = x.parentNode;
                }
                if (!_self) this.showProfile = false;
            });
        }
    },
    beforeDestroy () {
        clearInterval(this.timer);
    }
}
</script>

<style lang="scss">
.cc-banner-container
{
    @include W100;
    @include HbetweenVcenter;

    height: 40px;
    background: #484644;

    .left-block
    {
        @include H100;
        @include Vcenter;

        .logo {
            height: 35%;
            margin-left: 8px;
            user-select: none;
        }

        .b-icon
        {
            @include HcenterVcenter;
            @include naive-button;
            
            position: relative;
            width: 50px;
            height: 100%;
            color: whitesmoke;
        }

        .b-title {
            margin-left: 18px;
            font-family: Century;
            font-weight: bold;
            color: whitesmoke;
            user-select: none;
        }
    }

    .right-block
    {
        @include H100;
        @include HendVcenter;

        .guest-block
        {
            @include naive-button;
            @include H100;
            
            font-size: 15px;
            color: whitesmoke;
        }
        
        .user-block
        {
            @include H100;
            @include Vcenter;
            @include naive-button;

            width: auto;
            height: 100%;
            padding: 0px 12px;
            
            .b-avatar {
                @include avatar(30px);
            }

            .user-info {
                @include nowrap;

                max-width: 80px;
                margin: 0px 12px;
                font-size: 15px;
                font-weight: bold;
                color: whitesmoke;
            }
        }

        .profile-block
        {
            position: absolute;
            top: 100%;
            right: 0px;
        }
    }
}
</style>