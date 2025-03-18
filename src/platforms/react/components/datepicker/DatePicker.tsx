import React from "react";
import {
  DatePicker as AntDatePicker,
  DatePickerProps as AntDatePickerProps,
} from "antd";
import dayjs from "dayjs";
import { getDateValue } from './utils'

interface DatePickerProps extends AntDatePickerProps {
  value: any;
  onSetValue: Function;
  model: any;
  attr: string;
  format?: string;
}

export default function DatePicker(props: DatePickerProps) {
  const {
    model,
    attr,
    value,
    onSetValue,
    format = "YYYY-MM-DD",
    ...reset
  } = props;
  function _onChange(_val) {
    const val = _val ? _val.format(format) : undefined;
    onSetValue?.(val);
  }
  const placeholder = model.getAttributeHint(attr);
  const _value = getDateValue(value);
  return (
    <AntDatePicker
      format={format}
      defaultValue={value}
      placeholder={placeholder}
      onChange={_onChange}
      value={_value}
      {...reset}
    />
  );
}
