import Model from '../../../../base/Model';
export default {
    name: 'form-item',
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
        validate: {
            type: Array,
            default() {
                return ['blur'];
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
                this.model.validate(this.attr, true);
            }
        },
    },
    computed: {
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
        <slot name="label" :model="model" :attr="attr">
            <label> {{model.getAttributeLabel(attr)}}{{model.isRequired(attr) ? '*' : ''}}</label>
        </slot>
        <slot :model="model" :attr="attr" :validate="validate" :inputListeners="inputListeners">
            <input :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" />
        </slot>
        <slot name="error" :model="model" :attr="attr" :showError="showError">
            <p v-show="showError">{{showError}}</p>
        </slot>
    </component>`,
};
