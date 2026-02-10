import React, { useState, useRef, useMemo, useEffect } from "react";
import { Select as AntSelect, Spin } from "antd";
import { useDpEvent } from "../../hooks/useLedapDataProvider";
import { useModelEvent } from "../../hooks/useLedapModel";
import { uniqBy } from "lodash";


interface SearchInputProps {
  value: any;
  onSetValue: Function;
  model: any;
  attr: string;
  dp: any;
  load?:boolean;
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
    load,
    fieldNames = { label: "text", value: "id" },
    paramName = "keyword",
    ...resetProps
  } = props;

  const searchedRef = useRef(false)

  const _handleChange = (value) => {
    const _value = value === undefined ? null : value
    onSetValue?.(_value);

  };

  const { loading, isLoad, models: data } = useDpEvent(dp)

  useEffect(() => {
    if (model?.[attr]) {
      const searchParamName = fieldNames?.value
      if (searchParamName) {
        dp?.setParams({
          [searchParamName]: model?.[attr]
        });
        searchedRef.current = searchParamName
      }

    } else {
      if(load!== false) {
        dp?.refresh()
      }
      
    }
  }, [])

  const _handleSearch = (value) => {
    if (searchedRef.current) {
      if (dp?.searchModel) {
        dp.searchModel[searchedRef.current] = ''
      }
      searchedRef.current = null
    }
    const searchParams = { [paramName]: value };
    dp.setParams(searchParams);
  };

  const _onListScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    const isBottom = (scrollTop + clientHeight + 20) >= scrollHeight
    if (isBottom) {
      dp.refresh('footer')
    }
  }
  const _options = uniqBy(data, (v) => v[fieldNames.value]);
  const selOpt = _options?.find(o => o[fieldNames.value] == value)
  const _value = selOpt !== undefined ? selOpt?.[fieldNames.value] : value

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
      onClear={() => {
        _handleSearch('')
      }}
      onChange={_handleChange}
      notFoundContent={loading ? <Spin size="small" /> : null}
      options={_options}
      loading={loading}
      onPopupScroll={_onListScroll}
      {...resetProps}
    />
  );
}
