import Model from '../../../../base/Model';

export default {
    name: 'baseinput',
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        model: {
            type: Object,
        },
        attr: {
            type: String,
        },
        label: {
            type: String,
            default: null,
        },
        hint: {
            type: String,
            default: null,
        },
        validate: {
            type: Array,
            default() {
                return ['blur'];
            },
        },
        labelOptions: {
            type: Object,
            default() {
                return {};
            },
        },
        inputOptions: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            showError: this.model.getFirstError(this.attr),
        };
    },
    updated() {
        this.$nextTick(() => {
            this.model.on(Model.EVENT_AFTER_VALIDATE, this.syncError);
        });
    },
    methods: {
        syncError() {
            this.showError = this.model.getFirstError(this.attr);
        },
        inputValue(event) {
            if (event) {
                this.model[this.attr] = event.target.value;
            }
            this.checkValue('input');
            this.$emit('input', this.model[this.attr], event);
        },
        blur(event) {
            this.checkValue('blur');
            this.$emit('blur', event);
        },
        focus(event) {
            this.checkValue('focus');
            this.$emit('focus', event);
        },
        checkValue(index) {
            if (this.validate.indexOf(index) > -1) {
                this.model.validate();
            }
        },
    },
    computed: {
        showLabel() {
            return this.label || this.model.getAttributeLabel(this.attr);
        },
        showValue() {
            return this.model[this.attr];
        },
        showHint() {
            return this.hint || this.model.getAttributeHint(this.attr);
        },
        inputListeners() {
            return Object.assign({}, this.$listeners,  {
                input: this.inputValue,
                focus: this.focus,
                blur: this.blur,
            });
        },
    },
    template: `
    <component :is="tag">
        <label v-bind="labelOptions">{{showLabel}}{{model.isRequired(attr) ? '*' : ''}}</label>
        <input :name="attr" :value="showValue" v-bind="inputOptions" :placeholder="showHint" v-on="inputListeners" />
        <p v-show="showError">{{showError}}</p>
    </component>`,
};
