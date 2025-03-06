import React, { useState, useRef, useMemo, useEffect } from "react";
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
    // console.log("_handleChange:", value);
    onSetValue?.(value);
  };

  // useEffect(() => {
  //   console.log("search input loaded", { dp, attr, value, model });
  //   if (dp && attr && value) {
  //     dp.setParams({ [attr]: value });
  //   }
  // }, [dp]);

  const _handleSearch = (value) => {
    const searchParams = { [paramName]: value };
    dp.setParams(searchParams);
  };
  const _options = data;
  const _value = value;
  // const { label: _showLabel = "name", value: _showValue = "id" } = fieldNames;
  // const options = data.map((model) => ({
  //   label: model[_showLabel],
  //   value: String(model[_showValue]),
  // }));
  // const _value = Array.isArray(value) ? value.map((v) => `${v}`) : `${value}`;
  // console.log("searchInput", { data, value, options, _value });
  return (
    <AntSelect
      fieldNames={fieldNames}
      showSearch
      allowClear
      value={_value}
      placeholder={model.getAttributeHint(attr) || ""}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={_handleSearch}
      onChange={_handleChange}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      options={_options}
      loading={isLoading}
      {...resetProps}
    />
  );
}
