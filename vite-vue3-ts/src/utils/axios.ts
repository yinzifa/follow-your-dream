import axios from "axios";
import store from '@/store/index.ts';
import router from '@/router/index.ts'
import { collapseItemProps } from "element-plus";
if (process.env.NODE_ENV === 'development') {
axios.defaults.baseURL = '/api' //测试
} else if (process.env.NODE_ENV === 'production') {
axios.defaults.baseURL = '/api'  //正式
}
//post请求头
axios.defaults.headers.post["Content-Type"] ="application/x-www-form-urlencoded;charset=UTF-8";
//设置超时
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
    config => {
        // const localToken = store.state.user.userData.token
        // config.headers['Authorization'] = '';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            if(response.data.code == 2005||response.data.code == 2003){
            //强制退出
            router.replace({
                path: '/login',
             })
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        alert(`异常请求：${JSON.stringify(error.message)}`)
    }
);
export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            });
        })
    },

    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: data,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    delete(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url,
                data,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    put(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url,
                data,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
};

