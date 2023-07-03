/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Input,
  Radio,
  Space,
  Image,
  Form,
  Modal,
  DatePicker,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import UseFetchList from "../../hooks/use-fetch-list";
import { IActivity } from "./activityManage.type";
import API from "./../../api";
import UseDelData from "../../hooks/use-del-data";
import UseInsert from "../../hooks/use-insert";
import { formatDate } from "../../utils/formatData";
import { useState } from "react";
import moment from "moment";

const { RangePicker } = DatePicker;

export default function activityManage() {
  const [form] = Form.useForm();

  const activityStatus = [
    {
      value: "",
      label: "全部",
    },
    {
      value: "0",
      label: "未开始",
    },
    {
      value: "1",
      label: "进行中",
    },
    {
      value: "2",
      label: "已结束",
    },
  ];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { dataSource, total, filterParams, setFilterParams } =
    UseFetchList<IActivity>({
      API: API.getActivitys,
    });
  const { ids, setIds, delData } = UseDelData({
    API: API.delActivity,
    success: () => {
      setFilterParams({ ...filterParams, page: 1 });
    },
  });
  const columns: ColumnsType<IActivity> = [
    {
      title: "活动名称",
      dataIndex: "activityName",
      key: "id",
      width: 300,
    },
    {
      title: "活动封面",
      dataIndex: "activityImg",
      key: "activityImg",
      width: 100,
      render: (text) => {
        return <Image width={100} src={text} />;
      },
    },
    {
      title: "活动状态",
      dataIndex: "activityStatus",
      key: "activityStatus",
      width: 100,
      render: (text) => {
        return getActivityStatusName(text);
      },
    },
    {
      title: "活动上限",
      dataIndex: "activityMax",
      key: "activityMax",
      width: 100,
    },
    {
      title: "报名人数",
      dataIndex: "activityRegistered",
      key: "activityRegistered",
      width: 100,
    },
    {
      title: "活动时间",
      dataIndex: "activityDate",
      key: "activityDate",
      width: 100,
      render: (text, item) => {
        return `${item.activityStartDate}-${item.activityEndDate}`;
      },
    },
    {
      title: "主办方",
      dataIndex: "business",
      key: "business",
      width: 100,
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
      width: 100,
      render: (text, item) => {
        return (
          <Space>
            <Button type="primary" onClick={() => setDataInfo(item.id)}>
              编辑
            </Button>
            <Button danger onClick={() => delData([item.id])}>
              删除
            </Button>
            <Button>查看报名人数</Button>
          </Space>
        );
      },
    },
  ];
  const getActivityStatusName = (text: string) => {
    switch (text) {
      case "0":
        return "未开始";
      case "1":
        return "进行中";
      case "2":
        return "已结束";
    }
  };
  const { handleOk, setIsModal, isModal, setDataInfo } = UseInsert({
    form,
    convertData: (data) => {
      if (data.activityDate) {
        data.activityStartDate = formatDate(data.activityDate[0]);
        data.activityEndDate = formatDate(data.activityDate[1]);
      }
      return data;
    },
    updateData: API.updateActivity,
    createData: API.createActivity,
    success: () => {
      setFilterParams({ ...filterParams, page: 1 });
    },
    getDetail: API.getActivityDetail,
    convertDetailData: (data) => {
      // if (data.activityStartDate && data.activityEndDate) {
      //   data.activityDate = [
      //     moment(data.activityStartDate),
      //     moment(data.activityEndDate),
      //   ];
      //   console.log(data.activityDate);
      // }

      return data;
    },
  });
  const handleCancel = () => {
    setIsModal(false);
  };
  return (
    <div>
      <Space>
        <Button>刷新</Button>
        <Button type="primary" onClick={() => setIsModal(true)}>
          新增
        </Button>
        <Button danger onClick={() => delData()}>
          删除
        </Button>
        <Radio.Group
          defaultValue=""
          size="large"
          onChange={(e) => {
            setFilterParams({
              ...filterParams,
              page: 1,
              activityStatus: e.target.value,
            } as any);
          }}
        >
          {activityStatus.map((item, index) => {
            return (
              <Radio.Button key={index} value={item.value}>
                {item.label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
        <Input
          placeholder="请输入活动名称"
          onChange={(e) => {
            setFilterParams({
              ...filterParams,
              page: 1,
              activityName: e.target.value,
            } as any);
          }}
        ></Input>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        style={{ marginTop: "20px" }}
        scroll={{
          x: 1500,
        }}
        rowKey={(record) => record.id}
        pagination={{
          total,
          pageSize: filterParams.size,
          current: filterParams.page,
          onChange: (page) => {
            setFilterParams({
              ...filterParams,
              page,
            });
          },
        }}
        rowSelection={{
          type: "checkbox",
          onChange: (keys) => {
            setIds(keys);
          },
        }}
      ></Table>
      <Modal
        title="新增"
        open={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
        forceRender
      >
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item
            label="活动名"
            name="activityName"
            rules={[{ required: true, message: "请输入活动名" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item label="活动上限" name="activityMax">
            <Input></Input>
          </Form.Item>
          <Form.Item label="活动时间" name="activityDate">
            <RangePicker />
          </Form.Item>
          <Form.Item label="主办方" name="business">
            <Input></Input>
          </Form.Item>
          <Form.Item label="活动封面"></Form.Item>
          <Form.Item label="活动详情" name="activityDesc">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
