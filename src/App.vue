<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "App",
	components: {},
};
</script>

<style lang="scss">
* {
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
}

#app {
    @include app;
}

@font-face {
	font-family: "Century";
	src: url("./assets/fonts/GOTHIC.TTF");
}

.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
	opacity: 1;
	transform: scaleY(1);
	transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1),
		opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
	transform-origin: center top;
}
.el-zoom-in-top-enter,
.el-zoom-in-top-leave-active {
	opacity: 0;
	transform: scaleY(0);
}

.el-zoom-in-center-enter-active,
.el-zoom-in-center-leave-active {
	transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.el-zoom-in-center-enter,
.el-zoom-in-center-leave-active {
	opacity: 0;
	transform: scaleX(0);
}

.el-zoom-in-bottom-enter-active,
.el-zoom-in-bottom-leave-active {
	opacity: 1;
	transform: scaleY(1);
	transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1),
		opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
	transform-origin: center bottom;
}
.el-zoom-in-bottom-enter,
.el-zoom-in-bottom-leave-active {
	opacity: 0;
	transform: scaleY(0);
}
</style>
