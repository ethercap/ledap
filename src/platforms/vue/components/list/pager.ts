export default {
    name : 'pager',
    template : `
<div class="ui-pagination">
    <span class="ui-pagination-total">共{{ dataProvider.pager.totalCount }}条记录</span>
    <span class="ui-pagination-gap"></span>
    <a class="ui-pagination-num" v-show="dataProvider.pager.hasPrev()" @click="toPrev()">上一页</a>
    <a class="ui-pagination-num" v-show="dataProvider.pager.hasNext()" @click="toNext()">下一页</a>
    <span class="ui-pagination-summary">第 {{ dataProvider.pager.currentPage}}/{{ dataProvider.pager.pageCount }} 页</span>
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
            required : true,
        },
    },
    data() {
        return {
            jumpPage : this.dataProvider.pager.currentPage,
        };
    },
    methods: {
        changePage(page) {
            const pagination = this.dataProvider.pager;
            const oldPage = pagination.currentPage;
            this.$emit('dprefresh', {
                type: 'page',
                old: oldPage,
                new: pagination.currentPage,
            });
            if ('changePage' in this.dataProvider && typeof this.dataProvider.changePage === 'function') {
                this.dataProvider.changePage(page);
            } else {
                pagination.currentPage = page;
            }
        },
        toPrev() {
            this.changePage(this.dataProvider.pager.currentPage - 1);
        },
        toNext() {
            this.changePage(this.dataProvider.pager.currentPage + 1);
        },
    },
};
