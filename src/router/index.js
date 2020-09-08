import Vue from "vue";
import VueRouter from "vue-router";

import tool from "./tools";

import login from './login';
import manage from './manage';

Vue.use(VueRouter);

const AsyncLoad = tool.AsyncLoad;

export const constantRouterMap = [
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
    { path: '/404', component: () => AsyncLoad(import('@/views/404')), hidden: true },
    { path: '/401', component: () => AsyncLoad(import('@/views/401')), hidden: true },
    login,
    manage,
    
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes:constantRouterMap
});

export default router;