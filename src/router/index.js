import Vue from "vue";
import VueRouter from "vue-router";

import tool from "./tools";

import login from './login';
import manage from './manage';

Vue.use(VueRouter);

const AsyncLoad = tool.AsyncLoad;

const routes = [
    {
        path:'/',
        redirect:"/login"
    },
    {
        // path: "/",
        path:"/Home",
        name: "Home",
        component: () => AsyncLoad(import("@/views/home"))
    },
    login,
    manage
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;