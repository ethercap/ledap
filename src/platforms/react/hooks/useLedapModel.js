import React, { useState, useEffect } from 'react'

/**
 * 实现 react 数据的双向绑定
 * 组件调用 setValue() 触发组件重新渲染和修改model值
 * @param {*} model ledap框架load返回的model对象
 * @returns 
 */
export default function useLedapModel(model) {
    const [bool, setbool] = useState(false)

    function _setValue(attr, val) {
        model[attr] = val
        setbool((bool) => !bool)
    }
    function getValue(attr) {
        return model[attr]
    }
    function updateView() {
        setbool((bool) => !bool)
    }
    return {
        setValue: _setValue,
        getValue,
        updateView,
        model
    }
}