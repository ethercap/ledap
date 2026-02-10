import React,{useState,useEffect} from 'react'
import WebDataProvider from '../../../../base/WebDataProvider'


export function useSelectionStore({dp,useSelection, rowKey, persistent,onSelectionChanged}){
    const [selectedItems,setSelectedItems] = useState([])

    function _setSelectedItems(list){
      setSelectedItems(list)
    }

    useEffect(() => {
      if(!persistent) {
        dp?.models?.forEach((model) => {
          if(selectedItems.findIndex(sm => sm[rowKey] == model[rowKey]) > -1) {
            model.is_checked = true
          } else {
            model.is_checked = false
          }
        })
      }
    }, [dp,selectedItems])

    useEffect(() => {
      onSelectionChanged && onSelectionChanged(selectedItems)
    },[selectedItems])

    useEffect(() => {
      function onAfterGetData() {
        if(!persistent) {
          _setSelectedItems([])
        }
      }
      dp?.on?.(WebDataProvider.EVENT_AFTERGETDATA, onAfterGetData)
      return () => {
          dp?.off?.(WebDataProvider.EVENT_AFTERGETDATA, onAfterGetData)
      }
  }, [dp])
  
    function _add(_model){
      let addModels = Array.isArray(_model) ? _model : [_model]
      if(!useSelection) {
        return
      }
      if(!persistent) {
        addModels = addModels.filter(_m => dp?.models?.findIndex(m => m[rowKey] == _m[rowKey]) > -1)
      }
      addModels = addModels.filter(_m => selectedItems.findIndex(sm => sm[rowKey] == _m[rowKey]) === -1)
      _setSelectedItems([...selectedItems, ...addModels])
      
    }
    function _remove(_model) {
      const removeModels = Array.isArray(_model) ? _model : [_model]
      const newList = selectedItems.filter(m => removeModels.findIndex(_m => _m[rowKey] == m[rowKey]) === -1)
      _setSelectedItems(newList)
    }
    function batchAdd(models){
      _add(models)
    }
    function add(model){
      _add(model)
    }
    function remove(model){
      _remove(model)
    }
    function batchRemove(models){
      _remove(models)
      
    }
    const selectedIds = selectedItems.map(i => i[rowKey])
    return {
      selectedItems,
      batchAdd,
      add,
      remove,
      batchRemove,
      setSelectedItems:_setSelectedItems,
      selectedIds
    }
  }