import { useState, useCallback } from "react";
import { Layout, Icon } from "antd";
import { withRouter } from "react-router";
import Header from "./Header";
import SideMenu from "./SideMenu";
import "./index.less";

const { Sider, Content } = Layout;

function BaseLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = useCallback(() => {
    setCollapsed((collapsed) => !collapsed);
  }, []);

  return (
    <Layout className="base-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SideMenu collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header>
          <div onClick={toggle} className="trigger">
            <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
          </div>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(BaseLayout);
