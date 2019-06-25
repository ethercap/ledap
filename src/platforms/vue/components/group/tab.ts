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
        canClose: {
            type : Boolean,
            default: false,
        },
        disabled : {
            type : Boolean,
            default : false,
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
            const isOpen = this.isOpen();
            let type = 'open';
            if (this.canClose) {
                type = isOpen ? 'close' : 'open';
            }
            this[type]();
            this.$emit('toggle', {
                type,
                vm : this,
            });
        },
    },
    template : `
    <component :is="tagName" :class="{'active': isOpen()}" :disabled="disabled" @click="click">
        <slot></slot>
   </component>`,
};
