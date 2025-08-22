import React from "react";
import useInputGroup from "../../hooks/useInputGroup";
import { Checkbox } from "antd";

interface CheckboxGroupProps {
  tag?: any;
  model: any;
  attr: string;
  className?: string;
  checkboxProps?: any;
  onSetValue?: Function;
  value?: any;
}
export default function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    model,
    attr,
    checkboxProps,
    value: propValue,
    onSetValue,
    tag: Tag = React.Fragment,
  } = props;
  const { getValue, itemList, open, close } = useInputGroup(model, attr);

  const _getModelValue = () => {
    if (!propValue) {
      return [];
    }
    return typeof propValue == "string" ? [propValue] : propValue;
  };

  const _changeCheckbox = ({ target }, value) => {
    const { checked } = target;
    if (checked) {
      open(value);
    } else {
      close(value);
    }
    const valueList = getValue();
    onSetValue?.(valueList);
    model?.validate?.(attr);
  };
  const targetValue = _getModelValue();
  return (
    <Tag>
      {itemList.map(({ value, label, disabled }) => {
        const checked = targetValue.find((v) => v == value);
        return (
          <Checkbox
            key={value}
            {...checkboxProps}
            disabled={disabled}
            checked={checked}
            onChange={(e) => {
              _changeCheckbox(e, value);
            }}
          >
            {label}
          </Checkbox>
        );
      })}
    </Tag>
  );
}
