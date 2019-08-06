export default {
    name: 'baseinput',
    props: {
        model: {
            type: Object,
        },
        attr: {
            type: String,
        },
        checkValue: {
            type: Function,
            default() {},
        },
        inputListeners: {
            type: Object,
            default() {
                return {};
            },
        },
   
    },
    template: `<input :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" />
    `,
};
