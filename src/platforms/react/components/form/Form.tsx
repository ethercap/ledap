import React, { useContext, useEffect, useState } from "react";
import FormContext from "../../contexts/FormContext";
// import { Form as AntForm } from "antd";
import { _form } from "./form.module.less";
import classnames from "classnames";

interface FormProps {
  model: any;
  children?: any;
  className?: string;
  tag?: string;
  inline?: boolean;
}

export default function Form(props: FormProps) {
  const { model, tag: Tag = "div", className, inline, ...reset } = props;
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
  return (
    <FormContext.Provider value={{ getValue, setValue, updateView, model }}>
      <Tag
        className={classnames(_form, className, inline && "inline")}
        {...reset}
      >
        {props.children}
      </Tag>
    </FormContext.Provider>
  );
}
