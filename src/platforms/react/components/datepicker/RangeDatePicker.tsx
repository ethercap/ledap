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
  validate?:any;
  placeholder?:string;
  showTime?:boolean
}

export default function RangeDatePicker(props: RangePickerProps) {
  const {
    model,
    attr,
    value,
    onSetValue,
    format,
    onBlur,
    dp,
    validate,
    placeholder:propPlaceholder,
    showTime,
    ...reset
  } = props;
  const _format = format || (showTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD")
  function _onChange(_val) {
    const val = !_val ? [] : getRangeDataValue(_val);
    onSetValue?.(val);
  }
  const placeholder = model.getAttributeHint(attr) || propPlaceholder  || ["开始时间","结束时间"];
  const _value = getRangeDataValue(value);
  return (
    <AntDatePicker.RangePicker
      format={_format}
      showTime={showTime}
      defaultValue={_value}
      placeholder={placeholder}
      onChange={_onChange}
      value={_value}
      {...reset}
    />
  );
}
