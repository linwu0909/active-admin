import { RouterAPI } from "dva";
import { Router, Route, Switch } from "dva/router";
import Layout from "./layout/layout";
import Login from "./pages/login/login";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";

export default (api?: RouterAPI) => {
  if (api) {
    return (
      <ConfigProvider locale={zhCN}>
        <Router history={api.history}>
          <Switch>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/">
              <Layout></Layout>
            </Route>
          </Switch>
        </Router>
      </ConfigProvider>
    );
  }
  return {};
};
