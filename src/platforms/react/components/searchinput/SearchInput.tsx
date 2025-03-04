import React, { useState, useRef, useMemo } from "react";
import { Select as AntSelect, Spin } from "antd";

interface SearchInputProps {
  value: any;
  onSetValue: Function;
  model: any;
  attr: string;
  dp: any;
  paramName?: string;
  fieldNames?: any;
}

export default function SearchInput(props: SearchInputProps) {
  const {
    value,
    onSetValue,
    model,
    attr,
    dp,
    fieldNames,
    paramName = "keyword",
    ...resetProps
  } = props;
  const { models: data, isLoading } = dp;
  const _handleChange = (value) => {
    onSetValue?.(value);
  };
  const _handleSearch = (value) => {
    const searchParams = { [paramName]: value };
    dp.setParams(searchParams);
  };
  return (
    <AntSelect
      showSearch
      allowClear
      value={value}
      placeholder={model.getAttributeHint(attr) || ""}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={_handleSearch}
      onChange={_handleChange}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      fieldNames={fieldNames}
      options={data}
      loading={isLoading}
      {...resetProps}
    />
  );
}
