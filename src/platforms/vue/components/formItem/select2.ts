import * as lodash from 'lodash';
import SearchInput from './searchinput';

const input = lodash.cloneDeep(SearchInput);
export default lodash.merge(input, {
    name: 'select2',
    props: {
        keyName: {
            type: String,
            default: 'id',
        },
        multiple: {
            type: Boolean,
            default: false,
        },
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
            selected: {}
        };
    },
    watch: {
        selected() {
            const keys = Object.keys(this.selected);
            if (this.multiple) {
                this.model[this.attr] = keys;
            } else {
                this.model[this.attr] = keys.length > 0 ? keys[0] : '';
            }
        }
    },
    methods: {
        init() {
            // 如果没有selected,先请求
            if (this.model[this.attr] && lodash.isEmpty(this.selected)) {
                this.request({
                    [this.keyName]: this.model[this.attr],
                    [this.paramName]: this.value,
                }, this.syncSelected); 
            }
        },
        syncSelected() {
            const selected = {};
            Object.keys(this.models).forEach(index => {
                const model = this.models[index];
                if (this.multiple) {
                    if (this.model[this.attr].indexOf(model[this.keyName]) > -1) {
                        selected[model[this.keyName]] = model;
                    }
                } else if (model[this.keyName] === this.model[this.attr]) {
                    selected[model[this.keyName]] = model;
                }
            });
            this.selected = selected;
        },
        inputChange(e) {
            this.value = e.target.value;
            this.request({
                [this.paramName]: this.value
            });
            this.inputListeners.input(null);
        },
        // 选择model
        choose(model, index, e) {
            if (typeof model[this.itemName] !== 'undefined') {
                // 已选中
                if (this.selected.hasOwnProperty(model[this.keyName])) {
                    this.$delete(this.selected, model[this.keyName]);
                    this.value = '';
                } else {
                    this.$set(this.selected, model[this.keyName], model);
                    if (this.multiple) {
                        this.value = '';
                        this.listeners.focus();
                        if (this.$refs.input) {
                            this.$refs.input.focus();
                        }
                    } else {
                        this.value = model[this.itemName];
                    }
                }
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
        <span v-for="model,key in selected" :key="key" @click="choose(model, key, $event)">{{model[itemName]}}</span>
        <input ref="input" :name="attr" :value="value" :placeholder="model.getAttributeHint(attr)" v-on="listeners" autocomplete="off">
    </span>
    <ul v-show="showList" style="position: absolute;" :style="{opacity: isHide ? 0 : 1}">
        <li v-for="(model, index) in models" @click="choose(model, index, $event)">
            <slot name="tab" :model="model" :index="index" :isActive="selected.hasOwnProperty(model[keyName])">{{model[itemName]}}</slot>
        </li>
    </ul>
</div>`,
});
