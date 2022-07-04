import Vue from 'vue'
import VueRouter from "vue-router"
import AboutPage from "pages/AboutPage.vue";
import MyPage from "pages/MyPage.vue";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: "/",
            redirect: "/about"
        },
        {
            path: "/about",
            name: "AboutPage",
            component: AboutPage
        },
        {
            path: "/my",
            name: "MyPage",
            component: MyPage
        }
    ]
})
