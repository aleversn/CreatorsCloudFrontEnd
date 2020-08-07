<template>
<div class="profile-menu-container">
    <div class="row-item n1">
        <div class="logo-info-block">
            <img draggable="false" class="logo" src="@/assets/CC/Creators_Cloud.svg" alt="">
            <p class="l-title">Creators Cloud</p>
        </div>
        <p class="profile-n-button">注销</p>
    </div>
    <div class="row-item n2">
        <img class="avatar" src="@/assets/CC/Creators_Cloud.svg" alt="">
        <div class="info-container">
            <p class="user-name">UserName</p>
            <p class="email">email@example.com</p>
            <p class="label">我的账户信息</p>
            <p class="label">切换目录</p>
        </div>
    </div>
    <hr style="opacity: 0.3;">
    <div class="row-item click-item">
        <div class="icon-block">
            <p class="c-icon ms-Icon ms-Icon--AdminALogo32"></p>
        </div>
        <p class="c-title">管理中心</p>
    </div>
    <div class="row-item click-item">
        <div class="icon-block">
            <p class="c-icon ms-Icon ms-Icon--TestUserSolid"></p>
        </div>
        <p class="c-title">开发中心</p>
    </div>
</div>
</template>

<script>
export default {
    mounted () {
        this.$acrylic(this.$el, {
            rgba: 'rgba(255, 255, 255, 1)',
            opacity: 0.6
        });
    }
}
</script>

<style lang="scss">
.profile-menu-container
{
    @include FlexC;

    position: relative;
    width: 320px;
    height: auto;
    box-shadow: $ms-depth-shadow-16;

    .row-item
    {
        @include item-row(8px);

        &.n1
        {
            padding: 0px 0px;
            height: 50px;
            justify-content: space-between;

            .logo-info-block
            {
                @include FullRelative;
                @include Vcenter;

                .logo
                {
                    height: 35%;
                    margin-left: 8px;
                }

                .l-title
                {
                    margin-left: 18px;
                    font-family: Century;
                    user-select: none;
                }
            }

            .profile-n-button
            {
                @include naive-button;
                @include hover-decoration;

                font-size: 13.8px;
            }
        }

        &.n2
        {
            height: auto;
            padding: 12px;

            .avatar
            {
                @include avatar(96px);
            }

            .info-container
            {
                @include nowrap;
                @include FlexC;

                padding: 15px 15px;
                line-height: 1.8;

                .user-name
                {
                    font-size: 18px;
                    font-weight: bold;
                }

                .email
                {
                    @include color_50(1);

                    font-size: 15px;
                }

                .label
                {
                    @include label;
                }
            }
        }

        &.click-item
        {
            @include bg_245(0.6);

            height: 60px;
            padding: 0px 15px;

            &:hover
            {
                @include bg_239(0.8);
            }

            .icon-block
            {
                @include HcenterVcenter;

                width: 40px;
                height: 40px;
                border: rgba(95, 95, 95, 1) solid thin;
                border-radius: 50%;

                .c-icon
                {
                    margin: 0px;
                    padding: 0px;
                    font-size: 16px;
                }
            }

            .c-title
            {
                @include color-cc;
                
                margin-left: 18px;
                font-size: 15px;
                font-weight: lighter;
                user-select: none;
            }
        }
    }
}
</style>