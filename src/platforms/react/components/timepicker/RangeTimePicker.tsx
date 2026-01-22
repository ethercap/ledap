import React from "react";
import {
  TimePicker as AntTimePicker,
  TimePickerProps as AntTimePickerProps,
  TimeRangePickerProps as AntRangePickerProps,
} from "antd";
import { getRangeTimeValue } from "./utils";
import dayjs from "dayjs";

interface RangePickerProps extends AntRangePickerProps {
  value: any;
  onSetValue: Function;
  model: any;
  attr: string;
  format?: string;
  onBlur?: Function;
  dp?: any;
  validate?: any;
  placeholder?: string;
  showTime?: boolean;
}

export default function RangeTimePicker(props: RangePickerProps) {
  const {
    model,
    attr,
    value,
    onSetValue,
    format="HH:mm",
    onBlur,
    dp,
    validate,
    placeholder: propPlaceholder,
    showTime,
    ...reset
  } = props;
  function getVal(val) {
    if (Array.isArray(val)) {
      return val.map((v) => dayjs(v).format(format));
    }
    return []
  }
  function _onChange(_val) {
    const val = !_val ? [] : getVal(_val);
    onSetValue?.(val);
  }
  const placeholder = model.getAttributeHint(attr) ||
    propPlaceholder || ["开始时间", "结束时间"];
  const _value = getRangeTimeValue(value,format);
  return (
    <AntTimePicker.RangePicker
      format={format}
      showTime={showTime}
      defaultValue={_value}
      placeholder={placeholder}
      onChange={_onChange}
      value={_value}
      {...reset}
    />
  );
}
