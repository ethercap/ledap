import React, { useState, useEffect } from "react";
import { Model, App } from "./common/ledap.min";
import { BaseInput, FormItem } from "./common/react";
export default function ModelTestComponent() {
  const [model1, setModel1] = useState(new Model());
  useEffect(() => {
    //数据可以从任何地方来，也可以是本地的
    App.request(
      {
        url: "/data/model.json",
      },
      (data) => {
        const model1 = App.getModel(data.data);
        setModel1(model1);
      },
      (error) => {}
    );
  }, []);
  return (
    <div>
      {/*使用默认input*/}
      <FormItem attr="name" model={model1} FormComponent={BaseInput}></FormItem>
    </div>
  );
}
