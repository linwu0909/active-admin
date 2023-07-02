import { BaseParams } from "../../type";

export interface IActivity {
    // 活动人数上限
    activityMax: number;
    activityName: string;
    // 活动人数
    activityRegistered: number;
    activityStartDate: string;
    activityDesc: string;
    activityEndDate: string;
    activityStatus: string;
    address: string;
    business: string;
    id: string;
    wx: string;
    activityImg: string;
    status: number;
}

export interface IActivityParams extends BaseParams {
    activityStatus: string;
    activityName: string;
}