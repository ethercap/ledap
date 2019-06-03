export default {
    name : 'tab',
    props: {
        tag : {
            type: String,
            default : 'a',
        },
        dataKey : {
            type: String,
            default : null,
        },
    },
    data() {
        return {
            status : false,
            groupKey : this.dataKey,
            tagName : this.tag,
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
    <component :is="tagName" :class="{'active': isOpen()}" @click="click">
        <slot></slot>
   </component>`,
};
