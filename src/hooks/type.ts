import { FormInstance } from "antd";
import { Key } from "react";
import { IBasePagination } from "../type";

export interface IFetchListProps<Response> {
  API: (params: any) => Promise<IBasePagination<Response>>;
}

export interface IDelData {
  API: (ids: Key[]) => Promise<{}>;
  title?: string;
  success?: () => void;
}

export interface IInsert<T> {
  form: FormInstance<T>;
  convertData?: (data: T) => T;
  updateData?: (data: T) => void;
  createData: (data: T) => void;
  success?: () => void;
  getDetail?: (id: string) => Promise<T>;
  convertDetailData?: (data: T) => T;
}
