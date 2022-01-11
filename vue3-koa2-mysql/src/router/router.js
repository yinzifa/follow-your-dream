import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            component: ()=> import("../views/Login")
        },
        {
            path: "/home",
            component: ()=> import("../views/Home"),
            children: [
                {
                    path: "/index",
                    component: ()=> import("../views/Index")
                },
            ]
        }
    ]
});

export default router
