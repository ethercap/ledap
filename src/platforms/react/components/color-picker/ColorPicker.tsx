import React from "react";
import {
  ColorPicker as AntColorPicker,
  ColorPickerProps as AntColorPickerProps,
} from "antd";

interface ColorPickerProps extends AntColorPickerProps {
  attr: string;
  model: any;
  onSetValue: Function;
  value: any;
}

function ColorPicker(props: ColorPickerProps) {
  const {
    attr,
    model,
    onSetValue,
    value,
    format = "hex",
    ...resetProps
  } = props;
  const _handleChange = (colorHex) => {
    const _val = typeof colorHex === 'string' ? colorHex : colorHex?.toHexString()
    onSetValue(_val);
  };
  return (
    <AntColorPicker
      onChange={_handleChange}
      format={format}
      value={value}
      {...resetProps}
    />
  );
}
export default ColorPicker;
