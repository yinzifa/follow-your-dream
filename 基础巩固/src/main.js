import Vue from "vue";
import router from "./router"
import App from "./App.vue"


new Vue({
    router,
    /*render(h) {
        return h('div',
            {
                // on: {
                //     click: ()=> {
                //         alert(1)
                //     }
                // },
                class: {
                    'container': true
                }
                // domProps: {
                //     innerHTML: "哈哈哈哈111哈哈哈"
                // }
            },
            [
                h('h3', {
                    // domProps: {
                    //     innerText: "去about页"
                    // },
                        on: {
                            click: ()=> {
                                this.$router.push({
                                    path: "/about",
                                    query: {
                                        test: 1
                                    }
                                })
                            }
                        }
                    },
                    "去about page页"
                ),
                h('h4', {
                    domProps: {
                        innerText: "去my page页"
                    },
                    on: {
                        click: ()=> {
                            this.$router.push({
                                name: "MyPage",
                                params: {
                                    test: 2
                                }
                            })
                        }
                    }
                }),
            ]
            )
    }*/
    render: h => h(App)
}).$mount("#app")
