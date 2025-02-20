import * as lodash from 'lodash';
import BaseObject from './base/BaseObject';
import Model from './base/Model';
import WebDataProvider from './base/WebDataProvider';
import Theme from './platforms/vue/Theme';
import axios from 'axios';
export default class App extends BaseObject {

    // 将包提供出去供外部使用
    public static axios = axios;
    public static lodash = lodash;

    // webDp的http请求
    public static webDpConfig;
    // 常规的http请求
    public static request;

    // 主题
    public  static themeConfig;
    private static _theme;

    // 全局的validators
    public static validators = {
    };

    // 全局的一些配置
    public static config(config = {}) {
        App.themeConfig  = lodash.get(config, 'themeConfig', {});
        App.request = lodash.get(config, 'request', null);
        if (App.request === null) {
            App.request = function (httpOptions, success, fail) {
                axios.request(httpOptions).then(response => {
                    success(response.data);
                }).catch(error => {
                    fail(error);
                });
            };
        }
        App.webDpConfig = lodash.get(config, 'webDpConfig', {});
        if (App.webDpConfig.httpRequest === undefined) {
            App.webDpConfig.httpRequest = App.request;
        }
        App.validators = lodash.get(config, 'validators', {});
    }

    public static getModel(data: object = {}, modelClass: any = null) {
        if (modelClass === null) {
            modelClass = Model;
        }
        const model = new modelClass();
        return model.load(data);
    }

    public static getWebDp(config) {
        config = lodash.merge({}, App.webDpConfig, config);
        const webDp = new WebDataProvider(config);
        return webDp;
    }

    /**
     * 注册组件（仅vue组件可注册）
     * @param name 
     * @param vue 
     */
    public static register(name, vue) {
        App.getTheme().register(name, vue);
    }

    public static getTheme() {
        if (App._theme) {
            return App._theme;
        }
        App._theme = Theme.getInstance(App.themeConfig);
        return App._theme;
    }

    public static setTheme(theme) {
        App._theme = theme;
    }

    public static extend(a, b) {
        return lodash.extend(a, b)
    }
}