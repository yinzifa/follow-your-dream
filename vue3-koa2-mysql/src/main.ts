import { createApp } from 'vue';
import router from "./router/router";
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import "normalize.css"

const app = createApp(App);

//全局配置
app.config.errorHandler = (err,vm,info)=> {
    console.log(err)
    console.log(vm)
    console.log(info)
}
app.config.globalProperties.xxx = "xxx"

app.use(router).use(ElementPlus).mount('#app');


