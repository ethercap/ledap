import React from "react";
import { ConfigProvider as AntConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

function ConfigProvider(props = {}) {
  return (
    <AntConfigProvider locale={zhCN} theme={{ cssVar: true }} {...props} />
  );
}
export default ConfigProvider;
