import React from "react";
import { Select as AntSelect } from "antd";
import useLedapDataProvider from "../../hooks/useLedapDataProvider";
import formatSelectOptions from "../../utils/formatSelectOptions";
import lodash from "lodash";

interface SelectProps {
  model: any;
  attr: string;
  value?: any;
  onSetValue?: Function;
  options?: any;
  formatOptions?: Function;
}
export default function Select(props: SelectProps) {
  const {
    model,
    attr,
    value,
    onSetValue,
    options,
    formatOptions,
    ...resetProps
    // style={width:120}
  } = props;

  function _onChange(e) {
    console.log("on change:", e);
    onSetValue?.(e);
  }
  const dictOptions = lodash.get(model.rules(), [attr, "dict"], {});
  console.log("dictOptions:", dictOptions);

  const maxCount = dictOptions?.multiple ? dictOptions.max : undefined;

  const mode = dictOptions?.multiple ? "multiple" : undefined;
  return (
    <AntSelect
      mode={mode}
      defaultValue={value}
      value={value}
      options={formatSelectOptions(model, attr)}
      maxCount={maxCount}
      onChange={_onChange}
      {...resetProps}
    />
  );
}
