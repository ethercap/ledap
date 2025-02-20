const { React, ledap } = window

const { App } = ledap


ledap.App.config({
    themeConfig: {},
    request: function (httpOptions, suc, fail) {
        fail = fail || function (data) { console.log('request failed msg:', data.message); };
        httpOptions = Object.assign({
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        }, httpOptions);
        ledap.App.axios.request(httpOptions).then(function (response) {
            var result = response.data;
            if (result.code === 0) {
                suc(result);
            } else {
                fail(result);
            }
        }).catch(function (error) {
            fail({
                code: 1,
                message: error.message,
                data: error,
            });
        });
    },
    webDpConfig: {
        primaryKey: "",
        httpRequest: function (httpOptions, suc, fail) {
            ledap.App.request(httpOptions, function (res) {
                suc(res.data);
            }, function (data) {
                console.log('request failed msg:', data.message);
                fail(data);
            })
        }
    },
});

(() => {
    const { App } = ledap
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

})();

