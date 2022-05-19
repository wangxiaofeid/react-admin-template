import ReactDOM from "react-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import { BaseLayout } from "@/components/Layout";
import stores from "./stores";
import RouterArr from "./router";
import "./styles/index.less";

const history = createBrowserHistory();

ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <Provider {...stores}>
      <Router history={history}>
        <BaseLayout>
          <RouterArr />
        </BaseLayout>
      </Router>
    </Provider>
  </ConfigProvider>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept();
}
