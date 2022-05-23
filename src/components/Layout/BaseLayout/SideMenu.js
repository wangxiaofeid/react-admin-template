import { useState, useEffect, useCallback } from "react";
import { Menu, Icon } from "antd";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { filter } from "lodash";
import logoImg from "@/resource/images/logo.svg";

const { SubMenu, Item: MenuItem } = Menu;
const menuTree = [
  {
    name: "菜单组1",
    code: "group1",
    icon: "mail",
    children: [
      {
        name: "demo1",
        code: "demo",
        url: "/demo"
      }
    ]
  },
  {
    name: "菜单组2",
    code: "group2",
    icon: "exclamation-circle",
    children: [
      {
        name: "403",
        code: "403",
        url: "/403"
      },
      {
        name: "404",
        code: "404",
        url: "/404"
      }
    ]
  }
];

function SideMenu({ collapsed, location }) {
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const onOpenChange = useCallback((newKeys) => {
    setOpenKeys((openKeys) => {
      return filter(newKeys, (key) => !openKeys.includes(key));
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < menuTree.length; i++) {
      const { code, children } = menuTree[i];
      for (let j = 0; j < children.length; j++) {
        const { url, code: cCode } = children[j];
        if (url === location.pathname) {
          setOpenKeys([code]);
          setSelectedKeys([cCode]);
        }
      }
    }
  }, [location.pathname]);

  return (
    <>
      <div className="logo">
        <img src={logoImg} />
        {!collapsed && "后台管理"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
      >
        {menuTree.map(({ code, name, icon, children }) => (
          <SubMenu
            key={code}
            title={
              <span>
                <Icon type={icon} />
                <span>{name}</span>
              </span>
            }
          >
            {children?.map(({ code, name, url }) => (
              <MenuItem key={code}>
                <NavLink to={url}>{name}</NavLink>
              </MenuItem>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </>
  );
}

export default withRouter(SideMenu);
