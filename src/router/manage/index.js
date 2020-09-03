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
            path: "user",
            name: "User",
            component: () => AsyncLoad(import("@/views/manage/user"))
        },
        {
            path: "group",
            name: "Group",
            component: () => AsyncLoad(import("@/views/manage/group"))
        }
    ]
};
