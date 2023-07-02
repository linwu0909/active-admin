import { Button, Card, Form, Input } from "antd";
import "./login.scss";
import { ILoginParams } from "./login.type";
import API from "./../../api";
import { useDispatch, useSelector } from "dva";
import { omit } from "lodash";
import { IGlobalState } from "../../model/type";

export default function Login() {
  const dispatch = useDispatch();
  const globalState = useSelector<{ global: IGlobalState }>(
    ({ global }) => global
  );
  const login = async (values: ILoginParams) => {
    const data: any = await API.login(values);
    console.log("data=", data);
    dispatch({
      type: "global/setUserInfo",
      payload: {
        ...omit(data, ["checking"]),
      },
    });
  };
  return (
    <div id="login">
      <Card style={{ width: 300 }}>
        <h2 className="title">活动管理平台</h2>
        <Form
          onFinish={login}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="login-btn">
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
