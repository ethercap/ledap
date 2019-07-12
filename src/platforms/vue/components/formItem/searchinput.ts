import * as lodash from 'lodash';
import BaseInput from './baseinput';

const input = lodash.cloneDeep(BaseInput);
const DELAY = 300;

export default lodash.merge(input, {
    name: 'searchinput',
    props: {
        dataProvider: {
            type: Object,
            required: true,
        },
        itemName: {
            type: String,
            default: 'text',
        },
        paramName: {
            type: String,
            default: 'keyword',
        },
    },
    data() {
        return {
            showError: this.model.getFirstError(this.attr),
            isFocus: false,
            isHide: false,
        };
    },
    computed: {
        showList() {
            return this.isFocus && this.model[this.attr] !== '' && this.dataProvider.models.length;
        },
        inputListeners() {
            return Object.assign({}, this.$listeners,  {
                input: e => {
                    this.model[this.attr] = e.target.value;
                    this.request();
                    this.inputValue(e);
                },
                focus: e => {
                    this.isFocus = true;
                    this.focus(e);
                },
                blur: e => {
                    this.isHide = true;
                    setTimeout(() => {
                        this.isHide = false;
                        this.isFocus = false;
                    }, DELAY);
                    this.blur(e);
                },
            });
        },
    },
    methods: {
        request() {
            if (this.model[this.attr]) {
                this.dataProvider.setParams({
                    [this.paramName]: this.model[this.attr],
                });
            }
        },
        choose(model, index, e) {
            if (typeof model[this.itemName] !== 'undefined') {
                this.model[this.attr] = model[this.itemName];
                setTimeout(() => {
                    this.request();
                }, DELAY);
            }
            this.$emit('choose', model, index, e);
        },
    },
    template:
` <component :is="tag" style="position: relative;">
    <label v-bind="labelOptions">{{showLabel}}{{model.isRequired(attr) ? '*' : ''}}</label>
    <input :name="attr" :value="showValue" v-bind="inputOptions" :placeholder="showHint" v-on="inputListeners" autocomplete="off">
    <p v-show="showError">{{showError}}</p>
    <ul v-show="showList" style="position: absolute;" :style="{opacity: isHide ? 0 : 1}">
        <li v-for="(model, index) in dataProvider.models" @click="choose(model, index, $event)">
            <slot :model="model" :index="index">{{model[itemName]}}</slot>
        </li>
    </ul>
</component>`,
});
