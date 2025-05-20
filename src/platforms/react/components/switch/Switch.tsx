import React from 'react'
import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from 'antd'
interface SwitchProps extends AntSwitchProps {
    onSetValue:Function;
    model:any;
    attr:string
}
export default function Switch(props:SwitchProps) {
    const { value:propValue,...reset } = props
    return <AntSwitch checked={propValue} {...reset} />
}