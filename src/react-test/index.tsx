import * as ledap from "./lib/ledap";
import * as core from "./lib/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "@/platforms/react";
import "./ledap-init";
import "./style.less";
import ModelTestComponent from "./ModelTest";
import TableTest from "./TableTest";
import Uploader from "./uploader";

function LedapUploader(file) {
  return new Promise((resolve, reject) => {
    Uploader({
      url: "/mis-api/file/upload-resources",
      data: {
        [file.name]: file,
      },
      onSuccess: ({ data }) => {
        const [url] = data.url;
        url && resolve(url);
      },
      onError: (e) => {
        reject(e);
      },
    });
  });
}

function App() {
  return (
    <ConfigProvider ledapConfig={{ uploader: LedapUploader }}>
      <div className="app">
        this is react app
        <div className="react-form">
          {/* <ModelTestComponent /> */}
          <TableTest />
        </div>
      </div>
    </ConfigProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
