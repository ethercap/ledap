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
}

export default function Form(props: FormProps) {
  const { model, className, inline, ...reset } = props;
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
      <AntForm
        className={classnames(_form, className, inline && "inline")}
        {...reset}
      >
        {props.children}
      </AntForm>
    </FormContext.Provider>
  );
}
