/* eslint-disable import/no-anonymous-default-export */
import request from "./../utils/request";
import { IBanner } from "../pages/bannerManage/bannerManage.type";
import {
  IUser,
  IUserParams,
} from "../pages/registerUserManage/registerUserManage.type";
import { IBasePagination } from "../type";
import { Key } from "antd/es/table/interface";

let list1: IUser[] = [
  {
    id: "1",
    isback: false,
    nickName: "张三",
    remark: "111",
    username: "555",
    checking: "0",
    status: 0,
  },
  {
    id: "2",
    isback: false,
    nickName: "李四",
    remark: "111",
    username: "111",
    checking: "1",
    status: 0,
  },
];
let list2: IUser[] = [
  {
    id: "3",
    isback: false,
    nickName: "王五",
    remark: "111",
    username: "222",
    checking: "2",
    status: 0,
  },
];
let initData = {
  id: "",
  isback: false,
  nickName: "",
  remark: "",
  username: "",
  checking: "2",
  status: 0,
};
let originList = [...list1, ...list2];
export default {
  getUsers(data: IUserParams): Promise<IBasePagination<IUser>> {
    // return request.post<IUserParams, IBasePagination<IUser>>(
    //   "/admin/base/user/page",
    //   data
    // );
    const { page } = data;
    let list = originList.filter((item) => item.status === 0);
    const total = list.length;
    if (page === 2) {
      list = list.filter((item, index) => index > 1);
    } else {
      list = list.filter((item, index) => index < 2);
    }
    return new Promise((resolve) => {
      const res = {
        list: list,
        pagination: {
          size: 2,
          page: 2,
          total: total,
        },
      };
      resolve(res);
    });
  },
  delUser(ids: Key[]): Promise<any> {
    // return request.post<Key[], {}>("/admin/base/user/delete", { ids });
    console.log(originList);
    originList.forEach((item) => {
      if (ids.includes(item.id)) {
        item.status = 1;
      }
    });
    return new Promise((resolve) => {
      const res = "";
      resolve(res);
    });
  },
  checkUser(data: Pick<IUser, "checking" | "id">) {
    // return request.post<Pick<IUser, "checking" | "id">, {}>(
    //   '/admin/base/user/update',
    //   data
    // )
    originList.forEach((item) => {
      if (item.id === data.id) {
        item.checking = data.checking;
      }
    });
  },
  createUser(data: IUser) {
    // return request.post<IUser,{}>('/admin/base/user/add', data)
    const detail: any = { ...initData, ...data, id: "4" };
    list2.push(detail);
    originList.push(detail);
    return new Promise((resolve) => {
      const res = {};
      resolve(res);
    });
  },
  updateUser(data: IUser) {
    // return request.post<IUser, {}>('/admin/base/user/update',data)
    // debugger;
    originList = originList.filter((item) => item.id != data.id);
    originList.push(data);
    // console.log(originList);
    return new Promise((resolve) => {
      const res = {};
      resolve(res);
    });
  },
  getUserDetail(id: string): Promise<IUser> {
    // return request.get<string, IUser>(`/admin/base/user/info?id=${id}`);
    return new Promise((resolve) => {
      let detail: any = originList.filter((item) => item.id === id);
      detail = detail[0];
      resolve(detail);
    });
  },
};
