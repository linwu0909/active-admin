/* eslint-disable import/no-anonymous-default-export */
import { Key } from "react";
import {
  IActivity,
  IActivityParams,
} from "../pages/activityManage/activityManage.type";
import { IBanner } from "../pages/bannerManage/bannerManage.type";
import { ILoginParams, ILoginResponse } from "../pages/login/login.type";
import { BaseParams, IBasePagination } from "../type";
import request from "./../utils/request";
import Activity from "./activity";
import Banner from "./banner";
import User from "./user";

const {
  getActivitys,
  delActivity,
  createActivity,
  updateActivity,
  getActivityDetail,
} = Activity;
const { getBanners, delBanners, createBanners } = Banner;
const { getUsers, delUser, checkUser, createUser, updateUser, getUserDetail } =
  User;

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
        roles: ["activityManage", "userManage"],
      };
      resolve(data);
    });
  },
  getActivitys,
  delActivity,
  createActivity,
  updateActivity,
  getActivityDetail,
  getBanners,
  delBanners,
  createBanners,
  getUsers,
  delUser,
  checkUser,
  createUser,
  updateUser,
  getUserDetail,
};
