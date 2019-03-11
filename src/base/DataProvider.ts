import * as lodash from 'lodash';
import BaseObject from './BaseObject';
import Model from './Model';
import Pagination from './Pagination';

// 分页器类,主要是来解决分页的问题
export default class DataProvider extends BaseObject {

    get sort(): string|object {
        const arr = [];
        if (lodash.isEmpty(this._sort)) {
            this._sort = {};
        }
        Object.keys(this._sort).forEach((key) => {
            const value = this._sort[key];
            if (value === DataProvider.SORT_DESC) {
                arr.push('-' + key);
            } else {
                arr.push(key);
            }
        });
        return arr.join(',');
    }

    set sort(sort: string|object) {
        if (typeof(sort) === 'string') {
            const arr = sort.split(',');
            this._sort = {};
            Object.keys(arr).forEach((i) => {
                const str = arr[i];
                if (str.slice(0, 1) === '-') {
                    const temp = str.slice(1, str.length);
                    this._sort[temp] = DataProvider.SORT_DESC;
                } else {
                    this._sort[str] = DataProvider.SORT_ASC;
                }
            });
        }

        if (typeof(sort) === 'object') {
            this._sort = sort;
        }
    }
    public static SORT_ASC = 3;
    public static SORT_DESC = 4;

    public static getInstance(data: object, searchModelClass: any = null, modelClass: any= null, paginationClass: any = null): DataProvider {
        const models = [];
        let searchModel;
        let pagination = null;
        if (!searchModelClass) {
            searchModelClass = Model;
        }
        searchModel = new searchModelClass();
        if (!modelClass) {
            modelClass = Model;
        }
        if (!paginationClass) {
            paginationClass = Pagination;
        }
        pagination = new paginationClass();
        const dp =  new DataProvider(searchModel, models, pagination, '');
        dp.modelClass = modelClass;
        if (!lodash.isEmpty(data)) {
            dp.load(data);
        }
        return dp;
    }
    public searchModel: Model;
    public pager: Pagination;
    public models: Model[];
    public  isLoad: boolean = false;

    private _sort: object;
    private modelClass: any;

    constructor(searchModel: Model, models: Model[], pager: Pagination, sort: object|string = {}) {
        super();
        this.searchModel = searchModel;
        this.pager = pager;
        this.models = models;
        this.sort = sort;
        this.modelClass = null;
        this.init();
    }

    // 如果不传参则获取当前的url, params的传参会优先
    public getParams(args: object = {}) {
        const params = {};
        Object.keys(this.searchModel).forEach((key) => {
            params[key] = this.searchModel[key];
        });
        params['page'] = this.pager.currentPage;
        params['per-page'] = this.pager.perPage;
        params['sort'] = this.sort;
        if (!args) {
            return params;
        }
        Object.keys(args).forEach((key) => {
            params[key] = args[key];
        });
        return params;
    }

    public load(data: object, append: boolean = false) {
        const params = lodash.get(data, 'params', {});
        this.searchModel.load(params);

        const meta = lodash.get(data, 'meta', {});
        this.pager.load(meta);

        let modelClass = this.modelClass;
        if (!modelClass) {
            modelClass = Model;
        }
        let models = this.models;
        if (lodash.isEmpty(models) || !append) {
            models = [];
        }
        const items = lodash.get(data, 'items', []);
        Object.keys(items).forEach((key) => {
            const item = data['items'][key];
            const model = new modelClass();
            model.load(item);
            models.push(model);
        });
        this.models = models;
        this.isLoad = true;
    }
}
