import * as ledap from "./common/ledap.min";

var request = function (httpOptions, suc, fail) {
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
}

ledap.App.config({
    themeConfig: {},
    request: request,
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