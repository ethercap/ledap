import React, { useState, useRef,useEffect } from "react";
import { Tag as AntTag, TagProps as AntTagProps, Space, Input,Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";

export interface TagListProps {
  model: any;
  attr: string;
  value?: any;
  onSetValue?: Function;
  useSort?: boolean;
  useAdd?: boolean;
  closable?: boolean;
  addText?: string;
  inputType?: string;
  tagProps?: AntTagProps;
}
export default function TagList(props: TagListProps) {
  const {
    model,
    attr,
    value,
    onSetValue,
    useSort = false,
    useAdd = true,
    closable = true,
    addText = "添加",
    inputType="number",
    tagProps={},
  } = props;
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const _value =
    (typeof value === "string" || typeof value === "number") ? [value] : Array.isArray(value) ? value : [];
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && !_value.includes(inputValue)) {
      const newValue = [..._value, inputValue];
      onSetValue(newValue);
    }
    setInputVisible(false);
    setInputValue("");
  };
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const AddFragment = useAdd ? (
    inputVisible ? (
      <Input
        ref={inputRef}
        type={inputType}
        size="small"
        style={{
          width: 140,
          height: 22,
          marginInlineEnd: 8,
          verticalAlign: "top",
        }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    ) : (
      <AntTag
        style={{
          height: 22,
          borderStyle: "dashed",
          cursor: "pointer"
        }}
        icon={<PlusOutlined />}
        onClick={showInput}
      >
        {addText}
      </AntTag>
    )
  ) : null;
  return (
    <Flex wrap style={{rowGap: 8}}>
      {_value.map((item, index) => {
        return (
          <AntTag
            key={index}
            closable={closable}
            onClose={(e) => {
              const newValue = [..._value];
              newValue.splice(index, 1);
              onSetValue?.(newValue);
            }}
            {...tagProps}
          >
            {item}
          </AntTag>
        );
      })}
      {AddFragment}
    </Flex>
  );
}
