import React from "react";
import { Radio as AntRadio, RadioProps as AntRadioProps } from "antd";

interface RadioProps extends AntRadioProps {
  children?: any;
  checked?: boolean;
  disabled?: boolean;
}
function Radio(props: RadioProps) {
  const {
    checked = false,
    disabled = false,
    onChange,
    children,
    ...reset
  } = props;
  const _onChange = (e) => {
    onChange?.(e);
  };
  return (
    <AntRadio
      checked={checked}
      disabled={disabled}
      onChange={_onChange}
      {...reset}
    >
      {children}
    </AntRadio>
  );
}
export default Radio;
