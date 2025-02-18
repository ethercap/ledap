import React, { useState, useEffect } from "react";
import * as ledap from "./lib/ledap";
import {
  Form,
  FormItem,
  Button,
  FormValidateEvent,
  RadioGroup,
  CheckboxGroup,
  Select,
} from "@/platforms/react";

export default function ModelTestComponent() {
  const [model1, setModel1] = useState(null);
  const [search1Dp, setSearch1Dp] = useState(null);
  useEffect(() => {
    // 表单model
    ledap.App.request(
      {
        url: "/data/model.json",
      },
      (data) => {
        const model1 = ledap.App.getModel(data.data);
        setModel1(model1);
      },
      (error) => {}
    );
    // 搜索框1的dp数据
  }, []);

  if (!model1) {
    return "loading...";
  }

  return (
    <Form model={model1}>
      {/*使用默认input*/}
      <FormItem attr="name" />
      {/* 使用Number类型Input */}
      <FormItem attr="age" FormComponentProps={{ type: "number" }} />
      {/* textarea */}
      <FormItem
        attr="introduce"
        FormComponentProps={{ type: "textarea", antProps: { rows: 8 } }}
      />
      {/* 手机号 (增加前置标签) */}
      <FormItem
        attr="phone"
        FormComponentProps={{ antProps: { addonBefore: "+86" } }}
      />
      {/* 手机号 (实时校验+[todo]地区选择) */}
      <FormItem
        attr="phone"
        validate={[FormValidateEvent.input]}
        FormComponentProps={{ antProps: { addonBefore: "+86" } }}
      />
      {/* 邮箱 */}
      <FormItem attr="email" />
      {/* 单选框 */}
      <FormItem attr="sex" FormComponent={RadioGroup} />
      {/* 按钮单选框 */}
      <FormItem
        attr="sex"
        FormComponent={RadioGroup}
        FormComponentProps={{ antProps: { optionType: "button" } }}
      />
      {/* 多选框 */}
      <FormItem attr="city" FormComponent={CheckboxGroup} />
      {/* 多选框 */}
      <FormItem attr="stayCity" FormComponent={CheckboxGroup} />

      {/* 选择框（单选） */}
      <FormItem attr="city" FormComponent={Select} />
      {/* 选择框（多选） */}
      <FormItem attr="stayCity" FormComponent={Select} />

      <Button>123</Button>
    </Form>
  );
}
