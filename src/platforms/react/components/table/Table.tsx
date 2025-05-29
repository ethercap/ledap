import React, { useContext } from "react";
import TableContext from "./TableContext";
import TableBase from "./TableBase";
import { useSelectionStore } from './hooks'
import SelectionTags from './SelectionTags'
import './style.less'


export default function Table(props) {
  const { dp,useSelection, rowKey="id",labelKey="text", persistent=false,childrn,onSelectionChanged,SelectionPreview=SelectionTags } = props
  const { selectedItems,batchAdd,add,remove,batchRemove,selectedIds } = useSelectionStore({dp,useSelection, rowKey, persistent,onSelectionChanged})
  return (
    <TableContext.Provider value={{ selectedItems,batchAdd,add,remove,batchRemove,selectedIds }}>
      {persistent ? <SelectionPreview labelKey={labelKey} rowKey={rowKey} onRemove={remove} selectedItems={selectedItems}  /> : null}
      <TableBase {...props} />
      {childrn}
      
    </TableContext.Provider>
  );
}


Table.useTableContext = () => useContext(TableContext)
