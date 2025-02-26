import React, { useContext, useEffect, useState } from "react";
import FormContext from "../../contexts/FormContext";
import { Form as AntForm, FormProps as AntFormProps } from "antd";
import { _form } from "./form.module.less";
import classnames from "classnames";

interface FormProps extends AntFormProps {
  model: any;
  children?: any;
  className?: string;
  inline?: boolean;
  onSubmit?: (data: any, json: any) => void;
  enctype?: string;
}

export default function Form(props: FormProps) {
  const {
    model,
    className,
    inline,
    onSubmit,
    enctype = "application/json",
    ...reset
  } = props;
  const [bool, setBool] = useState(false);
  function getValue(attr) {
    return model[attr];
  }
  function setValue(attr, val) {
    model[attr] = val;
    setBool((bool) => !bool);
  }
  function updateView() {
    setBool((bool) => !bool);
  }
  function _onFinish(e) {
    const json = { ...model };
    let data = json;
    switch (enctype.toLocaleLowerCase()) {
      case "multipart/form-data": {
        var formData = new FormData();
        Object.keys(json).forEach((key) => {
          if (json[key] === null) {
            return;
          }
          formData.append(key, json[key]);
        });
        data = formData;
        break;
      }
      default: {
        break;
      }
    }
    // console.log("form on filish json:", data, json);
    model?.validate?.();
    onSubmit?.(data, model.getFirstError());
    updateView();
  }
  return (
    <FormContext.Provider value={{ getValue, setValue, updateView, model }}>
      <AntForm
        className={classnames(_form, className, inline && "inline")}
        onFinish={_onFinish}
        {...reset}
      >
        {props.children}
      </AntForm>
    </FormContext.Provider>
  );
}
