import React from "react";
import useInputGroup from "../../hooks/useInputGroup";
import classnames from "classnames";
import {
  Segmented as AntSegmented,
  SegmentedProps as AntSegmentedProps,
} from "antd";
import formatSelectOptions from "../../utils/formatSelectOptions";

interface SegmentedProps extends AntSegmentedProps {
  model: any;
  attr: string;
  className?: string;
  onSetValue?: Function;
  value?: any;
}
export default function Segmented(props: SegmentedProps) {
  const { model, attr, value: propValue, onSetValue, ...resetProps } = props;
  const itemList = formatSelectOptions(model, attr);

  function _onChange(val) {
    onSetValue?.(val);
  }
  return (
    <AntSegmented
      defaultValue={propValue}
      value={propValue}
      options={itemList}
      onChange={_onChange}
      {...resetProps}
    ></AntSegmented>
  );
}
