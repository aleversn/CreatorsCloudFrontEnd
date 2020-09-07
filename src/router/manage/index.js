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
        // {
        //     path: "user",
        //     name: "User",
        //     component: () => AsyncLoad(import("@/views/manage/user"))
        // },
        // {
        //     path: "group",
        //     name: "Group",
        //     component: () => AsyncLoad(import("@/views/manage/group"))
        // }
    ]
};
