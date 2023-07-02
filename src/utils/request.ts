import { message } from "antd"
import axios, {AxiosResponse} from "axios"
import { IBaseResponse } from "../type"

/**
 * AxiosResponse接收两个泛型
 * 第一个是业务层的请求体类型，所以用统一的返回结构IBaseResponse
 * IBaseResponse也接收一个类型 这个类型指具体业务
 */
axios.interceptors.response.use((response: AxiosResponse<IBaseResponse<any>>) => {
    if(response.data.code !== 100) {
        message.error(response.data.message)
        throw new Error(response.data.message)
    }
    return response.data.data
})
axios.interceptors.request.use(config => {
    if (config.headers) {
        const globalLocal = JSON.parse(localStorage.getItem("global") || "{}")
        config.headers["Authorization"] = globalLocal.token;
    }
    return config
})
export default axios;