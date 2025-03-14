import React,{useState} from 'react'

export default function useTableSelection(initialKeys){
    const [selecteds,setSelecteds] = useState(initialKeys)

    return {
        selecteds,setSelecteds
    }
}