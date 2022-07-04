import Axios,{ AxiosRequestConfig } from "axios";

const client = Axios.create({

})

export async function request(url, config) {
    const response = await client.request({ url, ...config })
    const result = response.data
    // 你的业务判断逻辑
    return result
}

export default client;
