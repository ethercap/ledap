import * as lodash from 'lodash';
import Model from '../../../../base/Model';
export default {
    name : 'baseinput',
    props: {
        tag : {
            type: String,
            default : 'div',
        },
        model : {
            type: Object,
        },
        attr : {
            type : String,
        },
        label : {
            type: String,
            default : null,
        },
        hint : {
            type: String,
            default : null,
        },
        validate : {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            showError : this.model.getFirstError(this.attr),
        };
    },
    methods : {
        syncError() {
            this.showError = this.model.getFirstError(this.attr);
        },
        inputValue(event) {
            this.model.on(Model.EVENT_AFTER_VALIDATE, this.syncError);
            if (event) {
                this.model[this.attr] = event.target.value;
            }
            if (this.validate.indexOf('input') > -1) {
                this.model.validate(this.attr);
            }
        },
        blur() {
            if (this.validate.indexOf('blur') > -1) {
                this.model.validate(this.attr);
            }
            this.$emit('blur', {
                vm : this,
            });
        },
        focus() {
            if (this.validate.indexOf('focus') > -1) {
                this.model.validate(this.attr);
            }
            this.$emit('focus', {
                vm: this,
            });
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
    },
    template : `
    <component :is="tag">
        <label>{{showLabel}}{{model.isRequired(attr) ? '*' : ''}}</label>
        <input :name="attr" :value="showValue" :placeholder="showHint" @input="inputValue"/>
        <p v-show="showError">{{showError}}</p>
    </component>`,
};
