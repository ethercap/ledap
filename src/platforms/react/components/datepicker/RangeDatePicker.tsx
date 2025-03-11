import React from "react";
import {
  DatePicker as AntDatePicker,
  DatePickerProps as AntDatePickerProps,
  RangePickerProps as AntRangePickerProps,
} from "antd";
import { getRangeDataValue } from './utils'


interface RangePickerProps extends AntRangePickerProps {
  value: any;
  onSetValue: Function;
  model: any;
  attr: string;
  format?: string;
  onBlur?:Function;
  dp?:any;
  validate?:any
}

export default function RangeDatePicker(props: RangePickerProps) {
  const {
    model,
    attr,
    value,
    onSetValue,
    format = "YYYY-MM-DD",
    onBlur,
    dp,
    validate,
    ...reset
  } = props;
  function _onChange(_val) {
    const val = !_val ? [] : getRangeDataValue(_val);
    onSetValue?.(val);
  }
  const placeholder = model.getAttributeHint(attr);
  const _value = getRangeDataValue(value);
  return (
    <AntDatePicker.RangePicker
      format={format}
      defaultValue={_value}
      placeholder={placeholder}
      onChange={_onChange}
      value={_value}
      {...reset}
    />
  );
}
