import Vue from 'vue'
import App from './App.vue'

import router from "@/router";
import store from "@/store";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'



import VueFluent from "vfluentdesign";

import "vfluentdesign/lib/index.css";

import "@/style/global.scss";

import {BrowserVersion} from "@/js/browserVersion.js";

import api from './api';
import VerifyForm from './js/formVerify.js';
import acrylic from './js/dynamicStyle/acrylic.js';
Vue.use(api);
Vue.use(VerifyForm);
Vue.use(acrylic);

Vue.use(VueFluent);
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    beforeCreate()
    {
        Vue.prototype.$browser = new BrowserVersion();
        Vue.prototype.$Go = str =>
        {
            this.$router.push(str);
        };
        Vue.prototype.$Back = () =>
        {
            this.$router.back();
        };
        Vue.prototype.$Jump = str =>
        {
            window.open(str);
        };
    },
    render: h => h(App)
}).$mount('#app')
