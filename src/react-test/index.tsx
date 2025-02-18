import * as ledap from "./lib/ledap";
import * as core from "./lib/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "@/platforms/react";
import "./ledap-init";
import "./style.less";
import ModelTestComponent from "./ModelTest";

console.log("react-test", ledap, core);

function App() {
  return (
    <ConfigProvider>
      <div className="app">
        this is app
        <div className="react-form">
          <ModelTestComponent />
        </div>
      </div>
    </ConfigProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
