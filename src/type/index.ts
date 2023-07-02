import {AnyAction} from "redux"
export interface IBaseResponse<T> {
    code: number;
    message: string;
    data: T
}
export enum Role {
    USERMANAGE = 'userManage',
    ACTIVITYMANAGE = 'activityManage'
}

export interface IPayload<T extends Partial<AnyAction>> {
    payload: T
}