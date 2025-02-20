import React from "react";
import { Radio as AntRadio } from "antd";

interface RadioProps {
  children?: any;
  checked?: boolean;
  disabled?: boolean;
  antProps?: any;
  onChange?: Function;
}
function Radio(props: RadioProps) {
  const {
    checked = false,
    disabled = false,
    onChange,
    children,
    antProps = {},
  } = props;
  const _onChange = (e) => {
    onChange?.(e);
    antProps?.onChange?.(e);
  };
  return (
    <AntRadio
      checked={checked}
      disabled={disabled}
      onChange={_onChange}
      {...antProps}
    >
      {children}
    </AntRadio>
  );
}
export default Radio;
