import React, { useContext } from "react";
import classNames from "classnames";

interface FormItemLabelProps {
  label?: string | number; // 覆盖的label显示
  labelComponent?: any; // 覆盖的label实例
  model: any;
  attr: string;
  className?: string;
}

function FormItemLabel(props: FormItemLabelProps) {
  const {
    labelComponent = null,
    model = null,
    attr = "",
    label = "",
    className,
  } = props;
  return labelComponent ? (
    labelComponent
  ) : (
    <label className={classNames(className)}>
      {label || model?.getAttributeLabel(attr)}
      {model?.isRequired(attr) ? "*" : ""}
    </label>
  );
}

export default FormItemLabel;
