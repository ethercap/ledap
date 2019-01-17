export default {
    name : 'pager',
    template : `
<div class="ui-pagination">
    <span class="ui-pagination-total">共{{ pagination.totalCount }}条记录</span>
    <span class="ui-pagination-gap"></span>
    <a class="ui-pagination-num" v-show="pagination.hasPrev()" @click="toPrev()">上一页</a>
    <a class="ui-pagination-num" v-show="pagination.hasNext()" @click="toNext()">下一页</a>
    <span class="ui-pagination-summary">第 {{ pagination.currentPage }}/{{ pagination.pageCount }} 页</span>
    <form class="ui-pagination-jumper" @submit.prevent.stop="changePage(jumpPage)">
        <span class="ui-pagination-text">跳至&nbsp;</span>
        <input type="text" class="ui-pagination-input" v-model="jumpPage">
        <span class="ui-pagination-text">&nbsp;页&nbsp;</span>
        <button type="submit" class="ui-pagination-btn">跳转</button>
    </form>
</div>
    `,
    props: {
        dataProvider: {
            type: Object,
        },
    },
    computed: {
        pagination() {
            return this.dataProvider.pager;
        },
    },
    data() {
        return {
            jumpPage : 0,
        };
    },
    methods: {
        changePage(page) {
            const oldPage = this.pagination.currentPage;
            this.pagination.currentPage = page;
            this.$emit('dprefresh', {
                type: 'page',
                old: oldPage,
                new: this.pagination.currentPage,
            });
        },
        toPrev() {
            this.changePage(this.pagination.currentPage + 1);
        },
        toNext() {
            this.changePage(this.pagination.currentPage - 1);
        },
    },
};
