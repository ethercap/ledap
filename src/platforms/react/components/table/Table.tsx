import React, { useState, useEffect } from "react";
import { Table as AntTable, TableProps as AntTableProps } from "antd";
import Column from "../../../../widgets/Column";

interface TableProps extends AntTableProps {
  dp?: any;
  columns?: Array<any>;
  paginationProp?: any;
  useSelection?: boolean; // 是否使用选择器
  onSelectionChanged?: (strings: string[], models: any[]) => void; // 选中项发生变化的回调
  rowSelection?: any;
  rowKey?: any;
}

export default function Table(props: TableProps) {
  const {
    dp = {},
    columns,
    paginationProp = {},
    useSelection,
    rowSelection: rowSelectionProps,
    onSelectionChanged,
    rowKey = "id",
    ...reset
  } = props;

  const { models: data, isLoading, pager } = dp;
  const [ledapColumns, setLedapColumns] = useState(
    Column.normalizeColumns(columns)
  );
  const [, setBool] = useState(false);
  const _updateView = () => {
    setBool((b) => !b);
  };

  useEffect(() => {
    setLedapColumns(Column.normalizeColumns(columns));
  }, [columns]);
  const _onChange = (pagination, filters, sorter) => {
    if (pagination.current !== pager.page) {
      dp.changePage(pagination.current);
      return;
    }
    let shouldRefresh = false;
    // 判断排序变更
    if (sorter?.column?.sorter) {
      const sortOrder = sorter.column;
      if (sortOrder !== getSortDir(dp, sorter.column.key)) {
        dp.toggleSort?.(sorter.column.key);
        shouldRefresh = true;
      }
    }
    shouldRefresh && dp.refresh();
  };

  const antColumns = getAntColumns(ledapColumns, dp);
  const pagination = {
    disabled: false,
    defaultCurrent: pager.page,
    defaultPageSize: pager.perPage,
    pageSize: pager.perPage,
    current: pager.page,
    hideOnSinglePage: true,
    // onShowSizeChange: _onShowSizeChange,
    total: pager.totalCount,
    showQuickJumper: true,
    showSizeChanger: false,
    ...paginationProp,
  };

  const onRowSelectionChanged = (selectedRowKeys, selectedRows) => {
    for (let i = 0; i < data.length; i++) {
      const model = data[i];
      if (selectedRowKeys.indexOf(model[rowKey]) > -1) {
        model.is_checked = true;
      } else {
        if (model.is_checked === true) {
          model.is_checked = undefined;
          delete model.is_checked;
        }
      }
    }
    _updateView();
    onSelectionChanged && onSelectionChanged(selectedRowKeys, selectedRows);
  };
  let rowSelection = rowSelectionProps;
  if (useSelection) {
    const selectedRowKeys = dp?.models
      ?.filter((m) => m.is_checked === true)
      .map((m) => m[rowKey]);
    rowSelection = {
      onChange: onRowSelectionChanged,
      selectedRowKeys, // 受控选中状态
      ...(rowSelectionProps || {}),
    };
  }

  return (
    <AntTable
      rowKey={rowKey}
      rowSelection={rowSelection}
      columns={antColumns}
      onChange={_onChange}
      dataSource={data}
      loading={isLoading}
      pagination={pagination}
      {...reset}
    />
  );
}
/**
 * 将自定义的column格式转为antd识别的columns格式
 * @param {Array} ledapColumns
 * @param {Object} { onSort,onFilter... }
 */
function getAntColumns(ledapColumns, dp) {
  const targetColumns = [];
  for (let i = 0; i < ledapColumns.length; i++) {
    const column = ledapColumns[i];
    const {
      label,
      value,
      attribute,
      visible,
      useSort, // 是否可排序
      labelOptions, // label dom上的属性，可能包括 attrs,style,class 弃用
      labelFormat,
    } = column;
    // 不可见
    // if (visible == false) {
    //   continue;
    // }
    const antdColumn: any = {
      hidden: visible === false,
      title: getTableTitle(column),
    };
    if (attribute) {
      antdColumn.dataIndex = attribute;
      antdColumn.key = attribute;
    } else {
      // 没有属性为操作
      antdColumn.key = "action";
    }
    // 排序
    if (attribute && useSort) {
      antdColumn.showSorterTooltip = { target: "sorter-icon" };
      const sortOrder = getSortDir(dp, attribute);
      antdColumn.sortOrder = sortOrder;
      antdColumn.sortDirections = ["ascend", "descend", "ascend"];
      antdColumn.defaultSortOrder = sortOrder;
      antdColumn.sorter = true;
    }
    if (typeof value == "function") {
      antdColumn.render = (val, item, index) => value(item, val, index);
    }
    targetColumns.push(antdColumn);
  }
  return targetColumns;
}

function getTableTitle(column) {
  const { labelFormat, label, attribute } = column;
  if (typeof label == "function") {
    if (labelFormat == "html") {
      return <span dangerouslySetInnerHTML={{ __html: label() }}></span>;
    }
    return label();
  }
  return label || attribute;
}

function getSortDir(dp, attribute) {
  return dp.isSortAsc(attribute)
    ? "ascend"
    : dp.isSortDesc(attribute)
    ? "descend"
    : null;
}
