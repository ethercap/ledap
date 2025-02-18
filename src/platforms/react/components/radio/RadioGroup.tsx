import React from "react";
import useInputGroup from "../../hooks/useInputGroup";
import classnames from "classnames";
import Radio from "./Radio";
import { Radio as AntRadio } from "antd";

interface RadioGroupProps {
  model: any;
  attr: string;
  className?: string;
  antProps?: any;
  onSetValue?: Function;
  value?: any;
}
export default function RadioGroup(props: RadioGroupProps) {
  const { model, attr, antProps = {}, value: propValue, onSetValue } = props;
  const { value, getValue, itemList, getItemOpen, open, close } = useInputGroup(
    model,
    attr
  );
  const _onChangeRadio = (checked, value) => {
    if (checked) {
      open?.(value);
    } else {
      close?.(value);
    }
    const newVal = getValue();
    console.log("new Value:", newVal);
    onSetValue?.(newVal);
  };
  const _onChangeGroup = (e) => {
    console.log("_onChangeGroup", e);
    const { checked, value } = e.target;
    _onChangeRadio(checked, value);
  };
  console.log("valueArr propValue:", value, propValue);
  const targetValue =
    typeof propValue == "string" || typeof propValue == "number"
      ? `${propValue}`
      : Array.isArray(propValue)
      ? propValue[0]
      : propValue;
  console.log({
    targetValue,
    itemList,
    antProps,
  });
  return (
    <AntRadio.Group
      defaultValue={targetValue}
      value={targetValue}
      options={itemList}
      onChange={_onChangeGroup}
      {...antProps}
    ></AntRadio.Group>
  );
  // return (
  //   <div className={classnames("radio-group")}>
  //     {itemList.map(({ label, value, disabled }) => {
  //       return (
  //         <React.Fragment key={value}>
  //           <Radio
  //             label={label}
  //             disabled={disabled}
  //             checked={getItemOpen(value)}
  //             onChange={(e) => {
  //               _onChangeRadio(e?.target?.checked, value);
  //             }}
  //           />
  //         </React.Fragment>
  //       );
  //     })}
  //   </div>
  // );
}
