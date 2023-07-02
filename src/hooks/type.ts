import { Key } from "react";
import { IBasePagination } from "../type";

export interface IFetchListProps<Response> {
    API: (params: any) => Promise<IBasePagination<Response>>;
}

export interface IDelData {
    API: (ids: Key[] ) => Promise<{}>;
    title?: string;
    success?: () => void;
}