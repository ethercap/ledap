import React, { useState, useRef, useMemo, useEffect } from "react";
import { Select as AntSelect, Spin } from "antd";
import { useDpEvent } from "../../hooks/useLedapDataProvider";
import { useModelEvent } from "../../hooks/useLedapModel";

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
    fieldNames={label: "text", value: "id"},
    paramName = "keyword",
    ...resetProps
  } = props;

  const _handleChange = (value) => {
    onSetValue?.(value);

  };

  const { loading,isLoad,models: data } = useDpEvent(dp)
  


  const _handleSearch = (value) => {
    const searchParams = { [paramName]: value };
    dp.setParams(searchParams);
  };

  const _onListScroll = (e) => {
    const { scrollTop,scrollHeight,clientHeight } = e.target
    const isBottom = (scrollTop + clientHeight + 20) >= scrollHeight
    if(isBottom) {
      dp.refresh('footer')
    }
  }
  const _options = data;
  const _value = value;

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
      notFoundContent={loading ? <Spin size="small" /> : null}
      options={_options}
      loading={loading}
      onPopupScroll={_onListScroll}
      {...resetProps}
    />
  );
}
