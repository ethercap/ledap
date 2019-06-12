import * as lodash from 'lodash';
import DataProvider from './DataProvider';

// 数据提供器
export default class WebDataProvider extends DataProvider {

    public static EVENT_BEFOREGETDATA = 'DP_BEFORE_GETDATA';
    public static EVENT_AFTERGETDATA = 'DP_AFTER_GETDATA';
    // 是否为加载中...
    public isLoading = false;
    // 正常需要加载配置数据，此标签来判断是否应该加载配置数据
    public isLoad = false;
    // 配置的标志位，指示后端是否传递配置过来
    public configName = 'withConfig';
    /* http回调，主要处理参数为httpOption, success回调, failure回调
     * 示例： {
     *    httpRequest: function(httpOption, success, failure) {
     *      axios.request(httpOption).then(data => {
     *          success(data);
     *          //其它自己想做的处理
     *      }).catch(error => {
     *          failure(error);
     *          //其它自己想做的处理
     *      })
     *    }
     * }
     * */
    public httpRequest;
    // http参数
    public httpOptions;

    public append = false;
    // 默认为id
    public primaryKey = 'id';

    constructor(config: object) {
        super(config);
        this.httpRequest = lodash.get(config, 'httpRequest', null);
        this.httpOptions = lodash.get(config, 'httpOptions', null);
        this.primaryKey = lodash.get(config, 'primaryKey', 'id');
        this.configName = lodash.get(config, 'configName', 'withConfig');
        if (!this.httpRequest) {
            throw new Error('httpRequest必须配置');
        }
    }

    public refresh(refreshType: string= 'refresh') {
        if (refreshType === 'header') {
            this.append = false;
            // 头部下拉刷新会将page置为1
            this.changePage(1, true);
        } else if (refreshType === 'footer') {
            this.append = true;
            this.changePage(this.pager.currentPage + 1, true);
        } else {
            this.append = false;
            this.changePage(this.pager.currentPage, true);
        }
    }

    // 正常修改参数之后，会导致页码变更。为了防止出现不好的用户体验，正常会将page置为1
    public setParams(params: object, reload: boolean = true, changePage: boolean = true) {
        // 设置参数
        this.searchModel.load(params);
        const page = changePage ? 1 : this.pager.currentPage;
        this.changePage(page, reload);
    }

    // 用于网页的页码点击中
    public changePage(page: number, reload: boolean = true) {
        this.pager.currentPage = page;
        if (reload) {
            this.loadData();
        }
    }

    public nextPage(page: number, reload: boolean = true) {
        return this.changePage(this.pager.currentPage + 1, reload);
    }

    public prePage(page: number, reload: boolean = true) {
        return this.changePage(this.pager.currentPage - 1, reload);
    }

    // 发起请求
    public loadData() {
        if (!this.beforeGetData()) {
            return;
        }
        this.httpRequest(this.httpOptions, data => {
            this.processData(data);
            this.afterGetData(true, data);
        }, error => {
            this.afterGetData(false, error);
        });
    }

    // 获取数据之前
    public beforeGetData() {
        this.isLoading = true;
        let reqData = lodash.get(this.httpOptions, 'params', {});
        // 已经load过了，数据用searchModel的数据, 仅第一次用用户传过来的参数
        if (this.isLoad) {
            reqData = this.getParams({});
        }
        reqData[this.configName] = !this.isLoad;
        this.httpOptions['params'] = reqData;
        this.emit(WebDataProvider.EVENT_BEFOREGETDATA, this, {dp: this});
        return true;
    }

    // 获取数据
    public processData(data) {
        this.load(data, this.append, this.primaryKey);
    }

    // 获取数据之后
    public afterGetData(success: boolean, data: object) {
        if (success) {
            this.isLoad = true;
        }
        this.isLoading = false;
        this.append = false;
        this.emit(WebDataProvider.EVENT_AFTERGETDATA, this, {dp: this, success, data});
    }
}
