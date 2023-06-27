import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import "./layout.css";
import { menus } from "./layout.config";
import { Route } from "dva/router";
import BannerManage from "../pages/bannerManage/bannerManage";
import ActivityManage from "../pages/activityManage/activityManage";
import BackendUserManage from "../pages/backendUserManage/backendUserManage";
import RegisterUserManage from "../pages/registerUserManage/registerUserManage";
import { MenuInfo } from "rc-menu/lib/interface";
import { useHistory } from "dva";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const history = useHistory();
  const linkPage = ({ key }: MenuInfo) => {
    history.push(key);
  };

  return (
    <Layout id="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">活动管理平台</div>
        <Menu theme="dark" mode="inline" items={menus} onClick={linkPage} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Route path="/bannerManage">
            <BannerManage></BannerManage>
          </Route>
          <Route path="/activityManage">
            <ActivityManage></ActivityManage>
          </Route>
          <Route path="/userManage/backendUserManage">
            <BackendUserManage></BackendUserManage>
          </Route>
          <Route path="/userManage/registerUserManage">
            <RegisterUserManage></RegisterUserManage>
          </Route>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
