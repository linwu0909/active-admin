import { useEffect, useState } from "react";
import { BaseParams } from "../type";
import { IFetchListProps } from "./type";

export default function UseFetchList<Response>(props: IFetchListProps<Response>) {
    const [dataSource, setDataSource] = useState<Response []>([])
    const [total, setTotal] = useState(0)
    const [filterParams, setFilterParams] = useState(new BaseParams())
    useEffect(() => {
        getData();
    }, [filterParams])
    const getData = async () => {
        const {list, pagination} = await props.API(filterParams);
        list.forEach((item: any) => {
            item.key = item.id
        })
        setDataSource(list);
        setTotal(pagination.total)
    }
    return {
        dataSource,
        total,
        filterParams,
        setFilterParams
    }
}