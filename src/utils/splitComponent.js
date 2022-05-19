import React, { Suspense } from "react";
import { Spin } from "antd";
import { Provider } from "mobx-react";

const Loading = () => {
  return (
    <Spin tip="加载中..." size="large">
      <div style={{ minHeight: "calc(100vh - 50px)" }} />
    </Spin>
  );
};

export default function SplitComponent(Comp, stores = {}) {
  const LazyComp = React.lazy(Comp);
  return (props) => (
    <Provider {...stores}>
      <Suspense fallback={<Loading />}>
        <LazyComp {...props} />
      </Suspense>
    </Provider>
  );
}
