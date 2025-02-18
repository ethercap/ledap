import React, { useContext } from "react";
import classnames from "classnames";
import BaseInput from "./BaseInput";
import FormItemContext from "../../contexts/FormItemContext";
import useLedapModel from "../../hooks/useLedapModel";
import "./style.less";
import "./utils.css";
import { _module_formitem } from "./form-item.module.less";
import { Row, Col, Form, FormItemProps as AntFormItemProps } from "antd";
import FormContext from "../../contexts/FormContext";

interface FormItemProp {
  model?: any;
  attr: string;
  label?: string | number;
  FormComponent?: any;
  validate?: Array<string>;
  children?: any;
  antProps?: AntFormItemProps;
  FormComponentProps?: any;
  dp?: any;
}

function FormItem(props: FormItemProp) {
  const {
    FormComponent = BaseInput,
    model: propModel,
    attr,
    label,
    validate,
    children,
    antProps = {},
    dp,
    FormComponentProps,
  } = props;
  const { labelCol = { span: 8 }, wrapperCol = { span: 16 } } = antProps;
  const { setValue, getValue, updateView, model } = propModel
    ? useLedapModel(propModel)
    : useContext(FormContext);

  const _setValue = (val) => {
    console.log("form item set val:", val);
    setValue(attr, val);
  };

  const required = model?.isRequired(attr);

  console.log("render formItem:", {
    value: model[attr],
    hasError: model.hasErrors(attr),
    error: model.getFirstError(attr),
  });

  return (
    <FormItemContext.Provider value={{ getValue, setValue }}>
      <div className={classnames(_module_formitem, { required })}>
        <Form.Item
          label={label || model?.getAttributeLabel(attr)}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          validateStatus={model.hasErrors(attr) ? "error" : null}
          help={model.getFirstError(attr)}
          {...antProps}
        >
          <FormComponent
            model={model}
            attr={attr}
            validate={validate}
            onSetValue={_setValue}
            value={model[attr]}
            onBlur={updateView}
            dp={dp}
            {...FormComponentProps}
          />
          {children}
        </Form.Item>
      </div>
    </FormItemContext.Provider>
  );
}

export default FormItem;
