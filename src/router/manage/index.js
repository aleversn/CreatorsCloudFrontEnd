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
            path: "user",
            name: "User",
            component: () => AsyncLoad(import("@/views/manage/user"))
        },
        {
            path: "permissionGroup",
            name: "Group",
            component: () => AsyncLoad(import("@/views/manage/permissionGroup"))
        }
    ]
};
