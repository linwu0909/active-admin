import {Model, routerRedux} from 'dva';
import { ILoginResponse } from '../pages/login/login.type';
import { IPayload } from '../type';
// 存放全局状态
export default {
    namespace: "global",
    state: {
        roles: ["activityManage","userManage"],
        token: ""
    },
    /**
     * 可以做异步操作
     * 不能直接修改state
     * 要修改state必须使用put方法调用reducers里面的方法
     */
    effects: {
        // 所有参数都在payload中
        *setUserInfo({payload}: Partial<IPayload<ILoginResponse>>, {put}) {
            yield put({
                type: 'save',
                payload
            })
            yield put(routerRedux.push('/activityManage'))
            // 接收到参数后，赋值给state
            console.log(payload)
        }
    },
    /**
     * 只能放纯函数
     */
    reducers: {
        save(state, action: Partial<IPayload<any>>) {
            return {...state, ...action.payload}
        }
    },
    subscriptions: {
        setup({history}) {
            history.listen(router => {
                const global = JSON.parse(localStorage.getItem("global") || "{}")
                const ignoreUrls = ["/login"]
                if (!global.token && !ignoreUrls.includes(router.pathname)) {
                    history.push("/login")
                }
            })
        }
    }
} as Model;