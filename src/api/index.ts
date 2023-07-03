/* eslint-disable import/no-anonymous-default-export */
import { Key } from "react";
import {
  IActivity,
  IActivityParams,
} from "../pages/activityManage/activityManage.type";
import { ILoginParams, ILoginResponse } from "../pages/login/login.type";
import { IBasePagination } from "../type";
import request from "./../utils/request";

const list1: IActivity[] = [
  {
    activityMax: 10,
    activityName: "aaa",
    activityRegistered: 10,
    activityStartDate: "20230506",
    activityEndDate: "20230508",
    activityDesc: "",
    activityStatus: "0",
    address: "",
    business: "",
    id: "1",
    wx: "",
    activityImg: "",
    status: 0,
  },
  {
    activityMax: 10,
    activityName: "bbb",
    activityRegistered: 10,
    activityStartDate: "2023-5-8",
    activityEndDate: "2023-5-10",
    activityDesc: "",
    activityStatus: "1",
    address: "",
    business: "",
    id: "2",
    wx: "",
    activityImg: "",
    status: 0,
  },
];
const list2: IActivity[] = [
  {
    activityMax: 10,
    activityName: "ccc",
    activityRegistered: 10,
    activityStartDate: "2023-5-10",
    activityEndDate: "2023-5-12",
    activityDesc: "",
    activityStatus: "2",
    address: "",
    business: "",
    id: "3",
    wx: "",
    activityImg: "",
    status: 0,
  },
];
let initData = {
  activityMax: 10,
  activityName: "",
  activityRegistered: 0,
  activityStartDate: "",
  activityEndDate: "",
  activityDesc: "",
  activityStatus: "2",
  address: "",
  business: "",
  id: "",
  wx: "",
  activityImg: "",
  status: 0,
};
let originList = [...list1, ...list2];

export default {
  login(data: ILoginParams) {
    // 第一个是接收的参数类型 第二个是响应的参数类型
    //    return request.post<ILoginParams, ILoginResponse>('/admin/base/open/login', data)
    return new Promise((resolve) => {
      const data = {
        // code: 1000,
        // data: {
        //     name: "张三"
        // },
        // msg: "success"
        token: "66666666666666",
        roles: ["activityManage"],
      };
      resolve(data);
    });
  },
  getActivitys(data: IActivityParams): Promise<IBasePagination<IActivity>> {
    // return request.post<IActivityParams, IBasePagination<IActivity>>(
    //     "/admin/base/activityManage/page",
    //     data
    // )
    console.log("调用获取方法");
    const { page, size, activityName, activityStatus } = data;
    let list = originList.filter((item) => item.status === 0);
    if (activityName) {
      list = list.filter((item) => {
        return item.activityName.indexOf(activityName) > -1;
      });
    } else if (activityStatus) {
      list = list.filter((item) => {
        return item.activityStatus === activityStatus;
      });
    }
    const total = list.length;
    if (page === 2) {
      list = list.filter((item, index) => index > 1);
    } else {
      list = list.filter((item, index) => index < 2);
    }
    let res = {
      list: list,
      pagination: {
        total,
        size,
        page,
      },
    };
    return new Promise((resolve) => {
      resolve(res);
    });
  },
  delActivity(ids: Key[]): Promise<{}> {
    // return request.post<Key[], {}>(
    //     "/admin/base/activityManage/delete",
    //     ids
    // )
    console.log(ids);
    debugger;
    originList.forEach((item) => {
      if (ids.includes(item.id)) {
        item.status = 1;
      }
    });
    console.log(originList);
    return new Promise((resolve) => {
      const res = "";
      resolve(res);
    });
  },
  createActivity(data: IActivity) {
    // return request.post<IActivity, {}>("/admin/base/activityManage/add", data)
    const result = { ...initData, ...data };
    originList.push(result);
  },
  updateActivity(data: IActivity) {
    // return request.post<IActivity, {}>("/admin/base/activityManage/update", data)
  },
  getActivityDetail(id: string): Promise<IActivity> {
    // return request.get<string, IActivity>(`/admin/base/activityManage/info?id=${id}`)
    return new Promise((resolve) => {
      const res = originList.filter((item) => item.id == id);
      resolve(res[0]);
    });
  },
};
