<template>
<div class="login-container">
    <router-view></router-view>
</div>
</template>

<style lang="scss" scoped>
.login-container {
	@include app;
	@include HcenterVcenterC;

	background: rgba(249, 250, 255, 1);
}
</style>

<script>
export default {};
</script>
