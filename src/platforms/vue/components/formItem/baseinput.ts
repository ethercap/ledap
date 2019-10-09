export default {
    name: 'baseinput',
    props: {
        tag: {
            type: String,
            default: 'input',
        },
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
    template: `<component :is="tag" :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" ></component>
    `,
};
