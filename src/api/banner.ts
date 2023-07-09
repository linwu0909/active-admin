/* eslint-disable import/no-anonymous-default-export */
import { Key } from "react";
import { IBanner } from "../pages/bannerManage/bannerManage.type";
import { BaseParams, IBasePagination } from "../type";
export default {
  getBanners(data: BaseParams): Promise<any> {
    // return request.post<BaseParams, IBasePagination<IBanner>>('/admin/base/banner/page')
    return new Promise((resolve) => {
      resolve({
        list: [
          { img: "", id: 1 },
          { img: "", id: 2 },
        ],
        pagination: { total: 2, size: 2, page: 1 },
      });
    });
  },
  delBanners(ids: Key[]): Promise<any> {
    // return request.post<string[],{}>('/admin/base/banner/delete', {ids})
    return new Promise((resolve) => {
      resolve("操作成功");
    });
  },
  createBanners(data: IBanner): Promise<any> {
    // return request.post<IBanner, {}>('/admin/base/banner/add', data)
    return new Promise((resolve) => {
      resolve("操作成功");
    });
  },
};
