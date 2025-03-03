import React from "react";
import {
  Dropdown as AntDropdown,
  DropDownProps as AntDropDownProps,
  Space,
} from "antd";
import { formatDropDownOptions } from "../../utils/formatSelectOptions";
import { CaretDownOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { _module_dropdown } from "./dropdown.module.less";

export interface DropDownProps extends AntDropDownProps {
  model: any;
  attr: string;
  value?: any;
  onSetValue?: Function;
  options?: any;
  formatOptions?: Function;
  placeholder?: string;
  menuProps?: any;
  Icon?: any;
  children?: any;
}
export default function DropDown(props: DropDownProps) {
  const {
    model,
    attr,
    value,
    onSetValue,
    formatOptions,
    placeholder,
    Icon = CaretDownOutlined,
    menuProps = {},
    children = null,
    ...resetProps
  } = props;

  function _onClick(e) {
    console.log("e:", e);
    onSetValue?.(e?.key);
    model?.validate?.(attr);
  }

  const items = formatDropDownOptions(model, attr);
  const currentLabel = items.find((i) => i.key == value)?.label;
  const disabled = resetProps.disabled === true;
  return (
    <AntDropdown
      trigger="click"
      menu={{
        items,
        onClick: _onClick,
        selectedKeys: [`${value || ""}`],
        ...menuProps,
      }}
      {...resetProps}
      className={classNames(_module_dropdown, resetProps.className, {
        disabled,
      })}
    >
      <Space>
        {children ||
          currentLabel ||
          placeholder ||
          model.getAttributeHint(attr) ||
          "请选择"}
        <Icon />
      </Space>
    </AntDropdown>
  );
}
