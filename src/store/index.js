import Vue from "vue";
import Vuex from "vuex";

import User from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        netWorkStatus: true
    },
    mutations: {
        setNetwork(state, val) {
            state.netWorkStatus = val;
        }
    },
    actions: {},
    modules: {
        User
    }
});