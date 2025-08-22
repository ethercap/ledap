import * as ledap from './lib/ledap'
import React from 'react'
import ReactDOM from "react-dom";
import { message } from 'antd'

const {
    WebDataProvider,
    App
} = ledap

App.config({
    themeConfig: {},
    request: function (httpOptions, suc, fail) {

        fail = fail || function (data) { console.log('request failed msg:', data.message); };
        const _originHeaders = httpOptions.headers || {}
        httpOptions.headers = {
            'X-Requested-With': 'XMLHttpRequest',
            ..._originHeaders
        }
        App.axios.request(httpOptions).then(function (response) {
            var result = response.data;
            if (result.code === 0) {
                suc(result);
            } else {
                if (typeof result.message == 'string') {
                    App.message?.(result.message, { variant: 'error' })
                }
                fail(result);
            }
        }).catch(function (error) {
            console.log('request err:', error)
            const errorMsg = error?.response?.data || error.message
            if (typeof errorMsg == 'string') {
                App.message?.(errorMsg, { variant: 'error' })
            }
            fail({
                code: 1,
                message: errorMsg,
                data: error,
            });
        });
    },
    webDpConfig: {
        primaryKey: "",
        httpRequest: function (httpOptions, suc, fail) {
            App.request(httpOptions, function (res) {
                suc(res.data);
            }, function (data) {
                console.log('request failed msg:', data.message);
                if (typeof data.message == 'string') {
                    App.message?.(data.message, { variant: 'error' })
                }
                fail(data);
            })
        }
    },
});

App.useWebDp = (dpConfig) => {
    const dpRef = React.useRef(App.getWebDp(dpConfig))
    const dp = dpRef.current
    const [bool, setBool] = React.useState(false)

    React.useEffect(() => {
        console.log('bind event!!')
        function onBeforeGetData() {
            console.log('dp on before loading')
            setBool((bool) => !bool)
        }
        function onAfterGetData() {
            console.log('dp on after loading')
            setBool((bool) => !bool)
        }
        dp.refresh()
        dp?.on?.(WebDataProvider.EVENT_BEFOREGETDATA, onBeforeGetData)
        dp?.on?.(WebDataProvider.EVENT_AFTERGETDATA, onAfterGetData)
        return () => {
            dp?.off?.(WebDataProvider.EVENT_BEFOREGETDATA, onBeforeGetData)
            dp?.off?.(WebDataProvider.EVENT_AFTERGETDATA, onAfterGetData)
        }
    }, [])
    // console.log('render dp models:', dp?.models)
    return dp
}

App.useModel = (requestParams) => {
    const [model, setModel] = React.useState(null)
    React.useEffect(() => {
        App.request(requestParams,
            (data) => {
                const model = App.getModel(data.data);
                setModel(model);
            },
            (error) => { }
        );
    }, [])
    return model
}

App.post = (url, params, options) => {
    return new Promise((resolve, reject) => {
        ledap.App.request({
            url,
            method: 'POST',
            data: params
        }, function (res) {
            resolve(res)
        }, function (res) {
            reject(res)
        })
    })
}

App.get = (url, params, options) => {
    return new Promise((resolve, reject) => {
        ledap.App.request({
            url,
            method: 'GET',
            data: params
        }, function (res) {
            resolve(res)
        }, function (res) {
            reject(res)
        })
    })
}

App.message = (content, options = {}) => {
    const { variant = 'info', duration, ...reset } = options
    const action = ['open', 'success', 'error', 'info', 'warning', 'loading'].includes(variant) ? variant : 'info'

    message[action]({
        content,
        duration,
        ...reset
    })
}
