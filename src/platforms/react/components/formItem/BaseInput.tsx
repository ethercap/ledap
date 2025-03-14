import classnames from "classnames";
import React, { useState, useEffect, useContext } from "react";
import { Input, InputNumber } from "antd";

const InputEvents = {
  blur: "blur",
  focus: "focus",
  input: "input",
};

type inputTags = "textarea" | "input";

type inputType = "text" | "password" | "textarea" | "number";

interface BaseInputProps {
  model: any;
  tag?: inputTags;
  attr: string;
  type?: inputType;
  validate?: Array<string>;
  onFocus?: Function;
  onBlur?: Function;
  onInput?: Function;
  onSetValue?: Function;
  value?: string;
}

const getControlConponent = (tag, type) => {
  if (tag == "textarea") {
    return Input.TextArea;
  }
  if (type == "text") {
    return Input;
  }
  if (type == "password") {
    return Input.Password;
  }
  if (type == "number") {
    return InputNumber;
  }
  if (type == "textarea") {
    return Input.TextArea;
  }
};
export default function BaseInput(props: BaseInputProps) {
  const {
    tag,
    attr,
    model,
    type = "text",
    validate = [InputEvents.blur],
    onFocus,
    onBlur,
    onInput,
    onSetValue,
    value = "",
    ...reset
  } = props;

  function _checkValue(eventType) {
    if (validate.indexOf(eventType) > -1) {
      const validateRes = model.validate(attr, true);
      const error = model.getFirstError(attr);
      // console.log("call validate", { model, attr, validateRes, error });
    }
  }
  function _onInput(e) {
    const value =
      typeof e == "number" || typeof e == "string" ? e : e?.target?.value;

    onSetValue?.(value);
    _checkValue(InputEvents.input);
    onInput?.(e);
  }
  function _onFocus(e) {
    _checkValue(InputEvents.focus);
    onFocus?.(e);
  }
  function _onBlur(e) {
    _checkValue(InputEvents.blur);
    onBlur?.(e);
  }
  const ControlComponent = getControlConponent(tag, type);
  const maxLength = model.getValidatorData(attr, "string", "max");
  return (
    <ControlComponent
      value={value}
      placeholder={model.getAttributeHint(attr)}
      maxLength={maxLength}
      onChange={_onInput}
      onFocus={_onFocus}
      onBlur={_onBlur}
      {...reset}
    />
  );
}
