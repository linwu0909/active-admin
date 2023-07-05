/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Space, Image, Table, Form, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import API from "../../api";
import UseDelData from "../../hooks/use-del-data";
import UseFetchList from "../../hooks/use-fetch-list";
import UseInsert from "../../hooks/use-insert";
import { IBanner } from "./bannerManage.type";

export default function bannerManage() {
  const [form] = Form.useForm<IBanner>();
  const { dataSource, total, filterParams, setFilterParams, getData } =
    UseFetchList<IBanner>({ API: API.getBanners });
  const { ids, setIds, delData } = UseDelData({
    API: API.delBanners,
    success: () => {
      setFilterParams({
        ...filterParams,
        page: 1,
      });
    },
  });
  const { handleOk, isModal, setIsModal } = UseInsert({
    form,
    createData: API.createBanners,
    success: () => {
      setFilterParams({ ...filterParams, page: 1 });
    },
  });
  const columns: ColumnsType<IBanner> = [
    {
      title: "图片",
      dataIndex: "img",
      key: "id",
      render: (text) => {
        return <Image width={100} src={text} />;
      },
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (text, item) => {
        return (
          <Space>
            <Button danger onClick={() => delData([item.id])}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Space>
        <Button onClick={() => getData()}>刷新</Button>
        <Button type="primary" onClick={() => setIsModal(true)}>
          新增
        </Button>
        <Button danger onClick={() => delData()}>
          删除
        </Button>
      </Space>
      <Table
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
        columns={columns}
        dataSource={dataSource}
      ></Table>
      <Modal
        open={isModal}
        title="新增"
        onOk={handleOk}
        onCancel={() => setIsModal(false)}
      >
        <Form form={form}>
          <Form.Item label="图片" name="img"></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
