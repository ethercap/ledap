import React from "react";
import {
  Checkbox as AntCheckbox,
  CheckboxProps as AntCheckboxProps,
} from "antd";

interface CheckboxProps extends AntCheckboxProps {
  children?: any;
  checked?: boolean;
  disabled?: boolean;
}
export default function Checkbox(props: CheckboxProps) {
  const {
    children = "",
    checked = false,
    disabled = false,
    onChange,
    ...reset
  } = props;
  const _onChange = (e) => {
    onChange?.(e);
  };
  return (
    <AntCheckbox
      checked={checked}
      disabled={disabled}
      onChange={_onChange}
      {...reset}
    >
      {children}
    </AntCheckbox>
  );
}
