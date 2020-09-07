import Vue from "vue";
import Vuex from "vuex";
import getters from './getters'
import User from "./user/index";

Vue.use(Vuex);




const store = new Vuex.Store({
    state: {
        netWorkStatus: true
    },
    modules: {
        User
    },
    mutations: {
        setNetwork(state, val) {
            state.netWorkStatus = val;
        }
    },
    getters
});

export default store