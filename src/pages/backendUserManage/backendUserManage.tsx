/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Form, Input, Modal, Table, Space } from "antd";
import UseFetchList from "../../hooks/use-fetch-list";
import { IUser } from "../registerUserManage/registerUserManage.type";
import API from "../../api";
import UseDelData from "../../hooks/use-del-data";
import { ColumnsType } from "antd/es/table";
import UseInsert from "../../hooks/use-insert";

export default function backendUserManage() {
  const [form] = Form.useForm<IUser>();
  const { dataSource, total, filterParams, setFilterParams, getData } =
    UseFetchList({
      API: API.getUsers,
      defaultParams: {
        isback: true,
      },
    });
  const { ids, setIds, delData } = UseDelData({
    API: API.delUser,
    success: () => {
      setFilterParams({ ...filterParams, page: 1 });
    },
  });
  const columns: ColumnsType<IUser> = [
    {
      title: "昵称",
      dataIndex: "nickName",
      key: "nickName",
    },
    {
      title: "用户号",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
      render: (text, item) => {
        return (
          <Space>
            <Button onClick={() => setDataInfo(item.id)}>编辑</Button>
            <Button danger onClick={() => delData([item.id])}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  const { handleOk, setIsModal, isModal, setDataInfo } = UseInsert({
    form,
    createData: API.createUser,
    updateData: API.updateUser,
    getDetail: API.getUserDetail,
    success: () => {
      setFilterParams({ ...filterParams, page: 1 });
    },
  });
  return (
    <div>
      <Space>
        <Button onClick={() => getData()}>刷新</Button>
        <Button onClick={() => setIsModal(true)} type="primary">
          新增
        </Button>
        <Button disabled={ids.length === 0} danger onClick={() => delData()}>
          删除
        </Button>
        <Input
          placeholder="请输入用户名"
          onChange={(e) => {
            setFilterParams({
              ...filterParams,
              page: 1,
              userName: e.target.value,
            } as any);
          }}
        ></Input>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
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
      ></Table>
      <Modal
        title="新增"
        onOk={handleOk}
        onCancel={() => setIsModal(false)}
        open={isModal}
      >
        <Form form={form}>
          <Form.Item label="昵称" name="nickName">
            <Input></Input>
          </Form.Item>
          <Form.Item label="用户名" name="username">
            <Input></Input>
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
