import { Route, Redirect, Switch } from "react-router-dom";
import SplitComponent from "@/utils/splitComponent";

const authCheckHOC = (path, component) => {
  return component;
};

export const menus = [
  {
    path: "/demo",
    component: SplitComponent(() => import("@/pages/Demo")),
    title: "检索首页"
  },
  {
    path: "/403",
    component: SplitComponent(() => import("@/components/Exception/403")),
    title: "403"
  },
  {
    path: "/404",
    component: SplitComponent(() => import("@/components/Exception/404")),
    title: "404"
  }
];

export default function Router() {
  return (
    <Switch>
      {menus.map(({ path, component }) => {
        return <Route key={path} path={path} component={authCheckHOC(path, component)} />;
      })}
      <Redirect to="/demo" />
    </Switch>
  );
}
