import { message, Modal } from "antd";
import { Key, useState } from "react";
import { IDelData } from "./type";
const {confirm} = Modal;

export default function UseDelData (props: IDelData) {
    const [ids, setIds] =useState<Key[]>([])
    const delData = (currentIds?: string[]) => {
        confirm({
            title: props.title || '确认删除该数据吗',
            async onOk() {
                await props.API(currentIds || ids);
                message.success("删除成功")
                props.success && props.success()
            }
        })
    }
    return{
        ids,
        setIds,
        delData
    }
}