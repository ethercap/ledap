import BaseObject from "./BaseObject";
import Model from "./Model";
import Pagination from "./Pagination";
import * as lodash from "lodash"; 

//分页器类,主要是来解决分页的问题
export default class DataProvider extends BaseObject {
    public searchModel:Model;
    public pager:Pagination;
    public models:Array<Model>;
    public sort:string;
  
    private _modelClass:any;

    constructor(searchModel:Model, models:Array<Model>, pager:Pagination, sort:string="") {
        super();
        this.searchModel = searchModel;
        this.pager = pager;
        this.models = models;
        this.sort = sort;
        this._modelClass = null;
        this.init();
    }

    //如果不传参则获取当前的url, params的传参会优先
    public getParams(args:object = null)
    {
        let params = {}; 
        for(const key in this.searchModel) {
            params[key] = this.searchModel[key];
        }
        params["page"] = this.pager.currentPage;
        params["per-page"] = this.pager.perPage;
        params["sort"] = this.sort;
        if(!args) {
            return params;
        }
        for(const key in args) {
            params[key] = args[key];
        }
        return params;
    }

    set modelClass(modelClass:object)
    {
        this._modelClass = modelClass;
    }

    public load(data:object) {
        if(data["params"]) {
            this.searchModel.load(data["params"]);
        }
        if(data["meta"]) {
            this.pager.load(data["meta"]);
        }
        let modelClass = this._modelClass;
        if(!modelClass) {
            modelClass = Model;
        }
        let models = [];
        let items = lodash.get(data, "items", []);
        for(const key in items) {
            let item = data["items"][key];
            let model = new modelClass();
            model.load(item);
            models.push(model);
        }
        this.models = models;
    }


    public static getInstance(data:object, searchModelClass:any = null, modelClass:any=null, paginationClass:any = null):DataProvider{
        let models = [];
        let searchModel, pagination;
        if(!searchModelClass) {
            searchModelClass = Model;
        }
        searchModel = new searchModelClass();
        if(!modelClass) {
            modelClass = Model;
        }
        if(!paginationClass) {
            paginationClass = Pagination;
        }
        pagination = new paginationClass();
        let dp =  new DataProvider(searchModel, models, pagination, "");
        dp.modelClass = modelClass;
        dp.load(data);
        return dp;
    }
}
