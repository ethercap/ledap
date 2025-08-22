import React from "react";
import {
  Checkbox as AntCheckbox,
  CheckboxProps as AntCheckboxProps,
} from "antd";

interface CheckboxProps extends AntCheckboxProps {
  value: any;
  model: any;
  attr: string;
  children?: any;
}
export default function Checkbox(props: CheckboxProps) {
  const { value, attr, model, children = "", ...reset } = props;
  return (
    <AntCheckbox checked={!!value} {...reset}>
      {children}
    </AntCheckbox>
  );
}
