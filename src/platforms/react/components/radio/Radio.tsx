import React from "react";
import { Radio as AntRadio, RadioProps as AntRadioProps } from "antd";

interface RadioProps extends AntRadioProps {
  model?: any;
  value?: any;
  attr: string;
  children?: any;
}
function Radio(props: RadioProps) {
  const { value, model, attr, children, ...reset } = props;

  return (
    <AntRadio checked={!!value} {...reset}>
      {children}
    </AntRadio>
  );
}
export default Radio;
