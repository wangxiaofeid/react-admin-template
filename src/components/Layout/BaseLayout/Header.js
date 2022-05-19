import { useState, useCallback } from "react";
import { Layout } from "antd";

const { Header } = Layout;

export default function HeaderComp({ children }) {
  return <Header className="base-layout-header">{children}</Header>;
}
