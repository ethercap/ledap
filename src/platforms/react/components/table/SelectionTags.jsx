import React from 'react'
import { Tag,Flex } from 'antd'

export default function SelectionTags(props){
    const {labelKey,rowKey,onRemove,selectedItems} = props
    if(!selectedItems?.length) {
        return null
    }
    return <div className='selection-tags'>
        <div className='selection-tags-title'>已选数据</div>
        <div className="section-tag-list">
        {
            selectedItems?.map((item) => {
                return <Tag style={{marginBottom:8}} key={item[rowKey]} closable onClose={() => {
                    onRemove(item)
                }}>{item[labelKey]}</Tag>
            })
        }
        </div>
        
    </div>
}