import React, { useEffect, useState } from 'react'
import WebDataProvider from '../../../base/WebDataProvider'


export default function useLedapDataProvider(dpConfig) {
    const dpRef = useRef(new WebDataProvider(dpConfig))
    const dp = dpRef.current
    const { loading,models,isLoad  } = useDpEvent(dp)
    // const [loading, setLoading] = useState(dp?.loading)

    // useEffect(() => {
    //     function onBeforeGetData() {
    //         console.log('dp on before loading')
    //         setLoading(true)
    //     }
    //     function onAfterGetData() {
    //         console.log('dp on after loading')
    //         setLoading(false)
    //     }
    //     dp?.on?.(WebDataProvider.EVENT_BEFOREGETDATA, onBeforeGetData)
    //     dp?.on?.(WebDataProvider.EVENT_AFTERGETDATA, onAfterGetData)
    //     return () => {
    //         dp?.off?.(WebDataProvider.EVENT_BEFOREGETDATA, onBeforeGetData)
    //         dp?.off?.(WebDataProvider.EVENT_AFTERGETDATA, onAfterGetData)
    //     }
    // }, [])
    return {
        isLoading: loading,
        data: models,
        setParams: dp?.setParams,
        isLoad
    }
}

export function useDpEvent(dp){
    const [loading, setLoading] = useState(dp?.loading)

    useEffect(() => {
        function onBeforeGetData() {
            setLoading(true)
        }
        function onAfterGetData() {
            setLoading(false)
        }
        dp?.on?.(WebDataProvider.EVENT_BEFOREGETDATA, onBeforeGetData)
        dp?.on?.(WebDataProvider.EVENT_AFTERGETDATA, onAfterGetData)
        return () => {
            dp?.off?.(WebDataProvider.EVENT_BEFOREGETDATA, onBeforeGetData)
            dp?.off?.(WebDataProvider.EVENT_AFTERGETDATA, onAfterGetData)
        }
    }, [])
    return {
        loading,
        models: dp?.models,
        isLoad:dp?.isLoad
    }
}