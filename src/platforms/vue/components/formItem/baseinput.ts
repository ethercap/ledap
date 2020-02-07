export default {
    name: 'baseinput',
    inheritAttrs: false,
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
        maxlength: {
            type: [Number, String],
            default: 99999
        }
    },
    computed: {
        cMaxlength() {
            return this.model.getValidatorData(this.attr, 'string', 'max') || this.maxlength;
        }
    },
    template: `<div><template v-if="tag !== 'textarea'">
            <input :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" v-bind="$attrs" :maxlength="cMaxlength">
        </template>
        <template v-else>
            <textarea :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" v-bind="$attrs" :maxlength="cMaxlength">
            </textarea>
        </template></div>
    `,
};
