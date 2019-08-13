import * as lodash from 'lodash';
import BaseInput from './baseinput';

const input = lodash.cloneDeep(BaseInput);
export default lodash.merge(input, {
    name: 'searchinput',
    props: {
        dataProvider: {
            type: Object,
            required: true,
        },
        paramName: {
            type: String,
            default: 'keyword',
        },
        delay: {
            type: Number,
            default: 300,
        },
        
        itemName: {
            type: String,
            default: 'text',
        },
        dataFilter: {
            type: Function,
            default: null,
        },
    },
    created() {
        if (this.filter === null) {
            this.filter = (model, index, collection) => {
                if (this.value) {
                    return model[this.itemName].search(this.value) > -1;
                }
                return true;
                
            };
        }
        this.init();
    },
    data() {
        return {
            showError: this.model.getFirstError(this.attr),
            isFocus: false,
            isHide: false,
            // input的值
            value: '',
            models: this.dataProvider.models || [],
            filter: this.dataFilter,
        };
    },
    computed: {
        showList() {
            return this.isFocus && this.value !== '' && this.dataProvider.models.length;
        },
        listeners() {
            return Object.assign({}, this.$listeners,  {
                input: e => {
                    this.inputChange(e);
                },
                focus: e => {
                    this.isFocus = true;
                    this.focusChange(e);
                },
                blur: e => {
                    this.isHide = true;
                    setTimeout(() => {
                        this.isHide = false;
                        this.isFocus = false;
                    }, this.delay);
                    this.blurChange(e);
                },
            });
        },
    },
    methods: {
        request(params, callback = key => {}) {
            if (this.isWebDp()) {
                this.dataProvider.callback = data => {
                    this.models = this.dataProvider.models;
                    callback(this.models);
                };
                this.dataProvider.setParams(params);
            } else {
                this.models = lodash.filter(this.dataProvider.models, this.filter);
                callback(this.models);
            }
        },
        isWebDp() {
            return this.dataProvider.refresh && typeof (this.dataProvider.refresh) === 'function';
        },
        // 上层履盖
        init() {
            this.value = this.model[this.attr];
        },
        // 上层履盖
        inputChange(e) {
            this.value = e.target.value;
            if (this.value) {
                this.request({
                    [this.paramName]: this.value
                });
            }
            this.inputListeners.input(e);
        },
        focusChange(e) {
            this.inputListeners.focus(e);
        },
        blurChange(e) {
            this.inputListeners.blur(e);
        },
        // 选择model
        choose(model, index, e) {
            if (typeof model[this.itemName] !== 'undefined') {
                this.value = model[this.itemName];
                setTimeout(() => {
                    this.request({
                        [this.paramName]: this.value
                    });
                }, this.delay);
            }
            this.$emit('choose', model, index, e);
        },
    },
    template:
`<div style="position: relative;">
    <span>
        <input :name="attr" :value="value" :placeholder="model.getAttributeHint(attr)" v-on="listeners" autocomplete="off">
    </span>
    <ul v-show="showList" style="position: absolute;" :style="{opacity: isHide ? 0 : 1}">
        <li v-for="(model, index) in models" @click="choose(model, index, $event)">
            <slot name="tab" :model="model" :index="index">{{model[itemName]}}</slot>
        </li>
    </ul>
</div>`,
    depends: ['form-item'],
});
