import React from "react";
import { ConfigProvider as AntConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

function ConfigProvider(props = {}) {
  return (
    <AntConfigProvider locale={zhCN} theme={{ cssVar: true }} {...props} />
  );
}
export default ConfigProvider;
