
export default {
    name : 'list',
    template : `
<component :is="tagName">
    <slot name="header"></slot>
    <slot v-for="model in dataProvider.models" :datamodel="model"></slot>
    <slot name="footer"></slot>
</component>
    `,
    props: {
        dataProvider: {
            type: Object,
        },
        tagName : {
            type: String,
            default : 'div',
        },
    },
    methods: {
    },
};
