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
import { Route } from "dva/router";

import { MenuInfo } from "rc-menu/lib/interface";
import { useHistory, useSelector } from "dva";
import { IGlobalState } from "../model/type";
import useLayout from "./layout.hooks";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const history = useHistory();

  const { currentMenus } = useLayout();

  const routerRender = (menuArr = currentMenus) => {
    return menuArr.map((item) => (
      <Route component={item.component} path={item.key + ""} key={item.key}>
        {item.children && routerRender(item.children)}
      </Route>
    ));
  };

  const linkPage = ({ key }: MenuInfo) => {
    history.push(key);
  };
  const logout = () => {
    localStorage.removeItem("global");
    history.push("/login");
  };

  return (
    <Layout id="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">活动管理平台</div>
        <Menu
          theme="dark"
          mode="inline"
          items={currentMenus}
          onClick={linkPage}
        />
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
          <div className="header-box">
            <Button type="link" className="header-btn" onClick={logout}>
              退出登录
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {routerRender()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
