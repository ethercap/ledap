import React from 'react'
import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from 'antd'

interface SwitchProps extends AntSwitchProps {
    onSetValue:Function;
    model:any;
    attr:string;
    validate:Array<string>;
    dp?:any
}
export default function Switch(props:SwitchProps) {
    const { value:propValue,onSetValue,attr,model,validate,dp,...reset } = props
    function onChange(val){
        onSetValue?.(val)
    }
    return <AntSwitch checked={propValue} onChange={onChange} {...reset} />
}