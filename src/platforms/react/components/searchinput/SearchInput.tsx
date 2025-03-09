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
    // console.log("_handleChange:", value);
    onSetValue?.(value);
    dp?.setParams({[paramName]: value || undefined})

  };

  const { loading,isLoad,models: data } = useDpEvent(dp)
  const { loaded:ModelLoaded } = useModelEvent(model, attr)

  useEffect(() => {
    if(!dp || isLoad) {
      return
    }
    // console.log('ModelLoaded:',{model, ModelLoaded})
    // if(!ModelLoaded) {
    //   return
    // }
    if (!loading) {
      console.log('model attr:', model?.[attr])
      const ModelValue = model?.[attr]
      // if(ModelValue) {
      //   dp?.setParams({[paramName]: ModelValue})
      // }
      // dp.refresh()
    }
  }, [isLoad, loading,ModelLoaded]);

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
      notFoundContent={loading ? <Spin size="small" /> : null}
      options={_options}
      loading={loading}
      {...resetProps}
    />
  );
}
