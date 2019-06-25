import * as lodash from 'lodash';
import BaseObject from './BaseObject';
// 分页器类,主要是来解决分页的问题
export default class Pagination extends BaseObject {

    get currentPage() {
        return this.page;
    }
    set currentPage(value) {
        // page不允许超出范围
        if (value > this.pageCount) {
            value = this.pageCount;
        }
        if (value <= 0) {
            value = 1;
        }
        this.emit(Pagination.EVENT_SETPAGE, value, this.page, this);
        this.page = value;
    }

    public static EVENT_SETPAGE = 'page_setpage';
    public totalCount: number = 0;
    public pageCount: number = 0;
    public perPage: number = 20;
    public page: number = 1;

    public hasPrev() {
        return this.currentPage > 1;
    }

    public hasNext() {
        return this.currentPage < this.pageCount;
    }
}
