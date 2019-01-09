import * as lodash from 'lodash';
import BaseObject from './BaseObject';
import Model from './Model';
import Pagination from './Pagination';

// 分页器类,主要是来解决分页的问题
export default class DataProvider extends BaseObject {

    set modelClass(modelClass: object) {
        this._modelClass = modelClass;
    }

    get modelClass() {
        return this._modelClass;
    }

    public static getInstance(data: object, searchModelClass: any = null, modelClass: any= null, paginationClass: any = null): DataProvider {
        const models = [];
        let searchModel;
        let pagination;
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
        dp.load(data);
        return dp;
    }
    public searchModel: Model;
    public pager: Pagination;
    public models: Model[];
    public sort: string;

    private _modelClass: any;

    constructor(searchModel: Model, models: Model[], pager: Pagination, sort: string= '') {
        super();
        this.searchModel = searchModel;
        this.pager = pager;
        this.models = models;
        this.sort = sort;
        this._modelClass = null;
        this.init();
    }

    // 如果不传参则获取当前的url, params的传参会优先
    public getParams(args: object = null) {
        const params = {};
        for (const key in this.searchModel) {
            params[key] = this.searchModel[key];
        }
        params['page'] = this.pager.currentPage;
        params['per-page'] = this.pager.perPage;
        params['sort'] = this.sort;
        if (!args) {
            return params;
        }
        for (const key in args) {
            params[key] = args[key];
        }
        return params;
    }

    public load(data: object) {
        const params = lodash.get(data, 'params', {});
        this.searchModel.load(params);

        const meta = lodash.get(data, 'meta', {});
        this.pager.load(meta);

        let modelClass = this._modelClass;
        if (!modelClass) {
            modelClass = Model;
        }
        const models = [];
        const items = lodash.get(data, 'items', []);
        for (const key in items) {
            const item = data['items'][key];
            const model = new modelClass();
            model.load(item);
            models.push(model);
        }
        this.models = models;
    }
}
