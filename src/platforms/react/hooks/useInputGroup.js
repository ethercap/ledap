import React, { useState, useRef, useEffect } from 'react'
import GroupWidget from '../../../widgets/Group'
export default function useInputGroup(model, attr) {
    const [bool, setBool] = useState(false)
    const { current: groupWidget } = useRef(createGroupWigtht(model, attr))

    const _updateView = () => {
        setBool((bool) => !bool)
    }
    function open(key) {
        groupWidget.select(key)
        _updateView()
    }
    function close(key) {
        groupWidget.unSelect(key)
        _updateView()
    }
    function getItemOpen(key) {
        return groupWidget.selected.indexOf(key) > -1
    }
    function setValue(valArr) {
        groupWidget.selected = valArr
        _updateView()
    }
    function getValue() {
        const arr = groupWidget.selected
        if (model.rules?.()[attr]?.dict?.multiple) {
            return arr
        }
        return arr[0]
    }
    return {
        value: groupWidget.selected,
        itemList: formatItemList(model.rules()[attr]?.dict),
        getItemOpen,
        open,
        close,
        getValue,
        setValue
    }
}
function formatItemList(dict = {}) {
    const list = []
    const { excludes = [] } = dict
    const listObj = dict.list || {}
    for (let key in listObj) {
        const value = listObj[key]
        const disabled = excludes.indexOf(key) > -1
        list.push({
            label: value,
            value: key,
            disabled
        })
    }
    return list
}
function createGroupWigtht(model, attr) {
    const modelValue = model[attr]
    const dict = model.rules()[attr]?.dict || {}
    const obj = new GroupWidget()
    // 构造组件
    const listObj = dict?.list || {}
    // 添加组件
    for (let key in listObj) {
        const isOpen = modelValue?.indexOf?.(key) > -1
        const component = new WidgetGroupComponent(key, isOpen)
        obj.add(component)
    }
    // 设置最大选中值
    if (dict.max && dict.multiple) {
        obj.max = dict.max
    }
    // 设置选中
    obj.selected = modelValue

    return obj
}

class WidgetGroupComponent {
    constructor(groupKey, isOpen = false) {
        this.groupKey = groupKey
        this._isOpen = isOpen
    }
    isOpen = () => {
        return this._isOpen
    }
    open = () => {
        this._isOpen = true
    }
    close = () => {
        this._isOpen = false
    }
}
