// global @types helper Vscode
import Vue from 'vue'
import api from './src/api'
import store from './src/store/'
import router from './src/router/'

declare module 'vue/types/vue' {
    interface Vue {
        $api: typeof api,
        $store: typeof store,
        $router: typeof router
    }
}