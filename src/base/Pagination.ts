import * as lodash from 'lodash';
import BaseObject from './BaseObject';
// 分页器类,主要是来解决分页的问题
export default class Pagination extends BaseObject {

    get currentPage() {
        return this._page;
    }
    set currentPage(value) {
        // page不允许超出范围
        if (value > this.pageCount) {
            value = this.pageCount;
        }
        if (value <= 0) {
            value = 1;
        }
        this.emit(Pagination.EVENT_SETPAGE, this, {oldValue: this._page, value});
        this._page = value;
    }

    public static EVENT_SETPAGE = 'page_setpage';
    public totalCount: number;
    public pageCount: number;
    public perPage: number;
    private _page: number;

    constructor() {
        super();
        this.totalCount = 0;
        this.pageCount = 0;
        this._page = 1;
        this.perPage = 20;
        this.init();
    }

    public hasPrev() {
        return this.currentPage > 1;
    }

    public hasNext() {
        return this.currentPage < this.pageCount;
    }
}
