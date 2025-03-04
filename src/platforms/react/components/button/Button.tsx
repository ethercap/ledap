import React, { useEffect } from "react";
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";

interface ButtonProps extends AntButtonProps {}
function Button(props: ButtonProps) {
  return <AntButton {...props} />;
}

Button.Group = AntButton.Group;

export default Button;
