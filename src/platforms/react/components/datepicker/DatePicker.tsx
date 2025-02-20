import React from "react";
import { DatePicker as AntDatePicker } from "antd";
import dayjs from "dayjs";

interface DatePickerProps {
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
  function _onChange(dayObj) {
    const val = dayObj.format(format);
    onSetValue?.(val);
  }
  const placeholder = model.getAttributeHint(attr);
  return (
    <AntDatePicker
      format={format}
      defaultValue={value}
      placeholder={placeholder}
      onChange={_onChange}
      value={dayjs(value)}
      {...reset}
    />
  );
}
