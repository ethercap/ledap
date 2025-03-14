import React from "react";
import { Checkbox as AntCheckbox } from "antd";

interface CheckboxProps {
  children?: any;
  checked?: boolean;
  disabled?: boolean;
  antProps?: any;
  onChange?: Function;
}
export default function Checkbox(props: CheckboxProps) {
  const {
    children = "",
    checked = false,
    disabled = false,
    onChange,
    antProps = {},
  } = props;
  const _onChange = (e) => {
    onChange?.(e);
    antProps?.onChange?.(e);
  };
  return (
    <AntCheckbox
      checked={checked}
      disabled={disabled}
      onChange={_onChange}
      {...antProps}
    >
      {children}
    </AntCheckbox>
  );
}
