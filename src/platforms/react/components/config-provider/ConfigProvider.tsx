import React from "react";
import { ConfigProvider as AntConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.locale("zh-cn");

dayjs.extend(weekday);
dayjs.extend(localeData);

function ConfigProvider(props: any = {}) {
  const { theme = {} } = props;
  return (
    <AntConfigProvider
      locale={zhCN}
      theme={{ cssVar: true, ...theme }}
      {...props}
    />
  );
}
export default ConfigProvider;
