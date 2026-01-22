import React from "react";
import {
  TimePicker as AntTimePicker,
  TimePickerProps as AntTimePickerProps,
} from "antd";
import { getTimeValue } from './utils'

interface TimePickerProps extends AntTimePickerProps {
  value: any;
  onSetValue: Function;
  model: any;
  attr: string;
  format?: string;
  dp?:any;
  onBlur?:Function;
  validate?:any
}

export default function DatePicker(props: TimePickerProps) {
  const {
    model,
    attr,
    value,
    onSetValue,
    format = "HH:mm",
    dp,
    validate,
    onBlur,
    ...reset
  } = props;
  function _onChange(_val) {
    const val = _val ? _val.format(format) : null;
    onSetValue?.(val);
  }
  const placeholder = model.getAttributeHint(attr);
  const _value = getTimeValue(value,format);
  return (
    <AntTimePicker
      format={format}
      defaultValue={value}
      placeholder={placeholder}
      onChange={_onChange}
      value={_value}
      {...reset}
    />
  );
}
