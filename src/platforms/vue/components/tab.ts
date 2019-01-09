export default {
    name : 'tab',
    props: {
        dataKey : {
            type: String,
            default : null,
        },
    },
    data() {
        return {
            status : false,
            groupKey : this.dataKey,
        };
    },
    methods : {
        open() {
            this.status = true;
        },
        close() {
            this.status = false;
        },
        isOpen() {
            return this.status === true;
        },
        click() {
            const type = 'open';
            this.open();
            this.$emit('toggle', {
                type,
                vm : this,
            });
        },
    },
    template : `
    <a class="ui-tab" :class="{'active': isOpen()}" @click="click">
        <slot></slot>
   </a>`,
};
