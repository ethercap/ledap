export default {
    name: 'pager',
    template: `<div>
    <slot name="total">
        <span>共{{ dataProvider.pager.totalCount }}条记录</span>
        <span>|</span>
    </slot>
    <slot :changePage="changePage">
        <a v-show="dataProvider.pager.hasPrev()" @click="toPrev()">上一页</a>
        <a v-show="dataProvider.pager.hasNext()" @click="toNext()">下一页</a>
        <span>第 {{ dataProvider.pager.currentPage}}/{{ dataProvider.pager.pageCount }} 页</span>
    </slot>
    <slot name="form" :changePage="changePage">
        <form @submit.prevent.stop="changePage(jumpPage)">
            <span>跳至&nbsp;</span>
            <input type="text" v-model="jumpPage">
            <span>&nbsp;页&nbsp;</span>
            <button type="submit">跳转</button>
        </form>
    </slot>
</div>
    `,
    props: {
        dataProvider: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            jumpPage: this.dataProvider.pager.currentPage,
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
