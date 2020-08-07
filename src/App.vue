<template>
<div id="app">
    <router-view></router-view>
</div>
</template>

<script>
export default {
	name: "App",
    components: {}
};
</script>

<style lang="scss">
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

@font-face {
    font-family: "Century";
    src: url("./assets/fonts/GOTHIC.TTF");
}
</style>
