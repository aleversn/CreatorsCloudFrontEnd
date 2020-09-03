import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

export default {
  path: "/",
  component: () => AsyncLoad(import("@/views/login")),
  children: [
    {
      path: "/login",
      name: "Login",
      component: () => AsyncLoad(import("@/views/login/login.vue"))
    },
    {
      path: "apply",
      name: "Apply",
      component: () => AsyncLoad(import("@/views/login/apply.vue"))
    }
  ]
};
