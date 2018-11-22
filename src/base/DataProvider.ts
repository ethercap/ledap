import BaseObject from "./BaseObject";
import Model from "./Model";
import Pagination from "./Pagination";
import * as lodash from "lodash"; 

//分页器类,主要是来解决分页的问题
export default class DataProvider extends BaseObject {
    public url:string;
    public searchModel:Model;
    public pager:Pagination;
    public models:Array<Model>;
    public sort:string;
   
    constructor(url:string, searchModel:Model, pager:Pagination, models:Array<Model>, sort:string="") {
        super();
        this.searchModel = searchModel;
        this.pager = pager;
        this.models = models;
        this.sort = sort;
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
}
