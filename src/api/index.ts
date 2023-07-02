import { ILoginParams, ILoginResponse } from "../pages/login/login.type"
import request from "./../utils/request"

export default {
    login(data: ILoginParams) {
        // 第一个是接收的参数类型 第二个是响应的参数类型
    //    return request.post<ILoginParams, ILoginResponse>('/admin/base/open/login', data)
        return new Promise(resolve => {
            const data = {
                // code: 1000,
                // data: {
                //     name: "张三"
                // },
                // msg: "success"
                token: "66666666666666",
                roles: ["activityManage"],
            }
            resolve(data)
        })
    }
}