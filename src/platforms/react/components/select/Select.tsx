import React from "react";
import { Select as AntSelect } from "antd";
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
    formatOptions,
    ...resetProps
    // style={width:120}
  } = props;

  function _onChange(e) {
    onSetValue?.(e);
  }
  const dictOptions = lodash.get(model.rules(), [attr, "dict"], {});
  const maxCount = dictOptions?.multiple ? dictOptions.max : undefined;
  const mode = dictOptions?.multiple ? "multiple" : undefined;
  const _options = formatSelectOptions(model, attr);
  let _value = value;
  if (mode === undefined) {
    _value = _options.find((o) => o.value == _value);
  }
  return (
    <AntSelect
      allowClear
      mode={mode}
      defaultValue={value}
      value={_value}
      options={_options}
      maxCount={maxCount}
      onChange={_onChange}
      {...resetProps}
    />
  );
}
