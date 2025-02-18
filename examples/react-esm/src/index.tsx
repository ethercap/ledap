import React from "react";
import ReactDOM from "react-dom/client";
import "./ledap-init";
import ModelTestComponent from "./ModelTestComponent";
import "./common/main.css";

function App() {
  return (
    <div className="app">
      this is app
      <ModelTestComponent />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
