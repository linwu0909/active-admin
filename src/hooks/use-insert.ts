import { message } from "antd";
import { useEffect, useState } from "react";
import { IInsert } from "./type";

export default function UseInsert<T>(props: IInsert<T>) {
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    if (!isModal) {
      props.form.resetFields();
    }
  }, [isModal]);
  const handleOk = async () => {
    let data = props.form.getFieldsValue(true);
    data = props.convertData ? props.convertData(data) : data;
    console.log(data.activityDate);
    data.id
      ? props.updateData && (await props.updateData(data))
      : props.createData && (await props.createData(data));
    props.success && props.success();
    message.success(data.id ? "更新成功" : "创建成功");
    setIsModal(false);
  };
  const setDataInfo = async (id: string) => {
    // !非空断言 代表一定有值
    let data = await props.getDetail!(id);
    if (props.convertDetailData) {
      (data as any) = props.convertDetailData(data);
    }
    props.form.setFieldsValue(data as any);
    setIsModal(true);
  };
  return {
    handleOk,
    setIsModal,
    isModal,
    setDataInfo,
  };
}
