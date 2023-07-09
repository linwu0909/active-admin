import { Button, Input, Radio, Space, Table, Modal, message } from "antd";
import UseFetchList from "../../hooks/use-fetch-list";
import API from "../../api";
import { ColumnsType } from "antd/es/table";
import { IUser } from "./registerUserManage.type";
import UseDelData from "../../hooks/use-del-data";

const { confirm } = Modal;

export default function registerUserManage() {
  const { dataSource, total, filterParams, setFilterParams, getData } =
    UseFetchList({
      API: API.getUsers,
      defaultParams: {
        isback: false,
      },
    });
  const { ids, setIds, delData } = UseDelData({
    API: API.delUser,
    success: () => {
      setFilterParams({ ...filterParams, page: 1 });
    },
  });
  const checkStatus = [
    {
      value: "",
      label: "全部",
    },
    {
      value: "0",
      label: "审核中",
    },
    {
      value: "1",
      label: "已通过",
    },
    {
      value: "2",
      label: "未通过",
    },
  ];
  const columns: ColumnsType<IUser> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
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
    // {
    //   title: "密码",
    //   dataIndex: "password",
    //   key: "password",
    // },
    {
      title: "审核状态",
      dataIndex: "checking",
      key: "checking",
      render: (text) => {
        const data = checkStatus.find((item) => item.value === text);
        return data?.label;
      },
    },
    {
      title: "审核",
      dataIndex: "checking",
      key: "checking",
      render: (text, item) => {
        return (
          <Space>
            <Button
              type="primary"
              disabled={text !== "0"}
              onClick={() => checkUser("1", item.id)}
            >
              通过
            </Button>
            <Button
              danger
              disabled={text !== "0"}
              onClick={() => checkUser("2", item.id)}
            >
              拒绝
            </Button>
          </Space>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (text, item) => {
        return <Button onClick={() => delData([item.id])}>删除</Button>;
      },
    },
  ];
  const checkUser = async (checking: string, id: string) => {
    const checkingText = checking === "1" ? "通过" : "拒绝";
    confirm({
      title: `确认${checkingText}吗？此操作不可逆`,
      async onOk() {
        await API.checkUser({ checking, id });
        message.success(`${checkingText}成功`);
        setFilterParams({ ...filterParams, page: 1 });
      },
    });
  };
  return (
    <div>
      <Space>
        <Button onClick={() => getData()}>刷新</Button>
        <Button disabled={ids.length === 0} danger onClick={() => delData()}>
          删除
        </Button>
        <Radio.Group
          defaultValue=""
          size="large"
          onChange={(e) => {
            setFilterParams({
              ...filterParams,
              page: 1,
              checkStatus: e.target.value,
            } as any);
          }}
        >
          {checkStatus.map((item, index) => {
            return (
              <Radio.Button key={index} value={item.value}>
                {item.label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
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
        style={{ marginTop: "20px" }}
        rowSelection={{
          type: "checkbox",
          onChange: (keys) => {
            setIds(keys);
          },
        }}
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
    </div>
  );
}
