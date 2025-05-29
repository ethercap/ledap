import React from 'react'
/**
 * 将自定义的column格式转为antd识别的columns格式
 * @param {Array} ledapColumns
 * @param {Object} { onSort,onFilter... }
 */
export function getAntColumns(ledapColumns, dp) {
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
        ...column,
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
  
  export function getSortDir(dp, attribute) {
    return dp.isSortAsc(attribute)
      ? "ascend"
      : dp.isSortDesc(attribute)
      ? "descend"
      : null;
  }
  