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
  SearchInput,
  DatePicker,
  Table,
} from "@/platforms/react";

export default function ModelTestComponent() {
  const model1 = ledap.App.useModel({
    url: "/data/model.json",
  });
  const search1Dp = ledap.App.useWebDp({
    httpOptions: {
      url: "/data/dp_1.json",
      params: {
        "per-page": 10,
      },
    },
  });
  const search2Dp = ledap.App.useWebDp({
    httpOptions: {
      url: "/data/dp_2.json",
      params: {
        "per-page": 10,
      },
    },
  });

  if (!model1) {
    return "loading...";
  }

  return (
    <Form model={model1} layout="horizontal">
      {/*使用默认input*/}
      <FormItem attr="name" />
      <FormItem attr="age" FormComponentProps={{ type: "number" }} />
      <FormItem attr="password" FormComponentProps={{ type: "password" }} />
      <FormItem
        attr="introduce"
        FormComponentProps={{ type: "textarea", rows: 8 }}
      />
      <FormItem attr="phone" FormComponentProps={{ addonBefore: "+86" }} />
      <FormItem
        attr="phone"
        validate={[FormValidateEvent.input]}
        FormComponentProps={{ addonBefore: "+86", style: { width: 200 } }}
      >
        实时校验
      </FormItem>
      <FormItem attr="email" />
      <FormItem attr="sex" FormComponent={RadioGroup} />
      <FormItem
        attr="sex"
        FormComponent={RadioGroup}
        FormComponentProps={{ optionType: "button" }}
      />
      <FormItem attr="city" FormComponent={CheckboxGroup} />
      <FormItem attr="stayCity" FormComponent={CheckboxGroup} />
      <FormItem attr="city" FormComponent={Select} />
      <FormItem attr="stayCity" FormComponent={Select} />
      <FormItem
        attr="search1"
        FormComponent={SearchInput}
        dp={search1Dp}
        FormComponentProps={{
          fieldNames: { label: "name", value: "id" },
        }}
      />
      <FormItem
        attr="search2"
        FormComponent={SearchInput}
        dp={search2Dp}
        FormComponentProps={{
          mode: "multiple",
          fieldNames: { label: "name", value: "id" },
        }}
      />
      <FormItem attr="birthDate" FormComponent={DatePicker} />
      <Table
        columns={[
          { attribute: "id", label: "ID", useSort: true },
          { attribute: "name", label: "名字" },
        ]}
        dp={search1Dp}
      />
    </Form>
  );
}
