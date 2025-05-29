import React, { useState, useEffect,useContext } from "react";
import { Table as AntTable, TableProps as AntTableProps } from "antd";
import Column from "../../../../widgets/Column";
import { getAntColumns,getSortDir } from "./utils";
import TableContext from './TableContext'


interface TableProps extends AntTableProps {
  dp?: any;
  load?:boolean;
  columns?: Array<any>;
  paginationProp?: any;
  useSelection?: boolean; // 是否使用选择器
  onSelectionChanged?: (strings: string[], models: any[]) => void; // 选中项发生变化的回调
  rowSelection?: any;
  rowKey?: any;
  persistent:boolean;// 是否支持持续选择
  labelKey?:string;// 多选时的label
}

export default function TableBase(props: TableProps) {
  const {
    dp = {},
    columns,
    paginationProp = {},
    useSelection,
    rowSelection: rowSelectionProps,
    onSelectionChanged,
    rowKey = "id",
    load,
    persistent=false,
    labelKey="text",
    ...reset
  } = props;

  

  const { models: data, isLoading, pager,isLoad } = dp;

  const { batchAdd,add,remove,batchRemove,selectedIds } = useContext(TableContext)


    useEffect(() => {
      if(load !== false) {
        dp.refresh()
      }
    },[])
    
  
  const [ledapColumns, setLedapColumns] = useState(
    Column.normalizeColumns(columns)
  );


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
    total: pager.totalCount,
    showQuickJumper: true,
    showSizeChanger: false,
    ...paginationProp,
  };

  let rowSelection = rowSelectionProps;
  if (useSelection) {
    const selectedRowKeys = selectedIds
    rowSelection = {
      onSelect:(record, selected, selectedRows) => {
        if(selected){
          add(record)
        } else {
          remove(record)
        }
      },
      onSelectAll:(selected, selectedRows, changeRows) => {
        if(selected) {
          batchAdd(changeRows)
        } else {
          batchRemove(changeRows)
        }
      },
      selectedRowKeys, // 受控选中状态
      ...(rowSelectionProps || {}),
    };
  }
console.log("当前选中：",rowSelection?.selectedRowKeys)
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
