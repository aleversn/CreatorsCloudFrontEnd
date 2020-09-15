import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

export default {
    path: "/manage",
    component: () => AsyncLoad(import("@/views/manage")),
    children: [
        {
            path: "",
            name: "Overview",
            component: () => AsyncLoad(import("@/views/manage/overview"))
        },
        {
            path:'/authority/authGroup',
            name:"authGroup",
            component: () => AsyncLoad(import("@/views/manage/authority/authGroup"))
        },
        {
            path:'/authority/button',
            name:"authButton",
            component: () => AsyncLoad(import("@/views/manage/authority/authButton"))
        },
        {
            path:'/authority/menu',
            name:"authMenu",
            component: () => AsyncLoad(import("@/views/manage/authority/authMenu"))
        },
        {
            path:'/authority/user',
            name:"authUser",
            component: () => AsyncLoad(import("@/views/manage/authority/authUser"))
        },
        {
            path:'/trainSet/mySet',
            name:"mySet",
            component: () => AsyncLoad(import("@/views/manage/trainset/index.vue"))
        },
        {
            path:'/model/proxy',
            name:"proxy",
            component: () => AsyncLoad(import("@/views/myModel/proxy"))
        },
        {
            path:'/model/train',
            name:"trainModel",
            component: () => AsyncLoad(import("@/views/myModel/trainModel"))
        },
        {
            path:'/model/manage',
            name:"manageModel",
            component: () => AsyncLoad(import("@/views/myModel/manageModel"))
        },
    ]
};
