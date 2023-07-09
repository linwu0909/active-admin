import { BaseParams } from "../../type";

export interface IUser {
  checking: string;
  id: string;
  isback: boolean;
  nickName: string;
  remark: string;
  username: string;
  status: number;
}

export interface IUserParams extends BaseParams {
  isback: boolean;
  checkStatus: string;
  username: string;
}
