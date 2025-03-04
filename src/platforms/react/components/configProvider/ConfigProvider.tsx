import React from "react";
import { ConfigProvider as AntConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { LedapAppContext } from "./LedapAppContext";

dayjs.locale("zh-cn");

dayjs.extend(weekday);
dayjs.extend(localeData);

function ConfigProvider(props: any = {}) {
  const { theme = {}, ledapConfig, children, ...reset } = props;
  console.log("ledapConfig:", ledapConfig);
  // return null;
  return (
    <LedapAppContext.Provider value={{ ...ledapConfig }}>
      <AntConfigProvider
        locale={zhCN}
        theme={{ cssVar: true, ...theme }}
        {...reset}
      >
        {children}
        <div id="ledap-modal-root"></div>
      </AntConfigProvider>
    </LedapAppContext.Provider>
  );
}
export default ConfigProvider;
