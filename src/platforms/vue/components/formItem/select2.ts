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
                this.value = keys.length > 0 ? this.selected[keys[0]][this.itemName] : '';
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
            if (this.multiple && typeof (this.model[this.attr]) != 'object') {
                this.model[this.attr] = [this.model[this.attr]];
            }
            const selected = {};
            const _this = this;
            Object.keys(this.models).forEach(index => {
                const model = _this.models[index];
                if (_this.multiple) {
                    if (_this.model[_this.attr].indexOf(model[_this.keyName]) > -1) {
                        selected[model[_this.keyName]] = model;
                    }
                } else if (String(model[_this.keyName]) === String(_this.model[_this.attr])) {
                    selected[model[_this.keyName]] = model;
                }
            });
            this.selected = selected;
        },
        inputChange(e) {
            this.value = e.target.value;
            if (this.value) {
                this.request({
                    [this.keyName]: [],
                    [this.paramName]: this.value
                });
            }
            this.inputListeners.input(null);
        },
        blurChange(e) {
            if (!this.multiple) {
                const index = this.model[this.attr];
                if (this.selected[index]) {
                    this.value = this.selected[index][this.itemName];
                } else {
                    this.value = '';
                }
            }
            this.inputListeners.blur(e);
        },
        // 选择model
        choose(model, index, e) {
            if (typeof model[this.itemName] !== 'undefined') {
                // 已选中
                if (this.selected.hasOwnProperty(model[this.keyName])) {
                    this.$delete(this.selected, model[this.keyName]);
                    this.value = '';
                } else {
                    if (this.multiple) {
                        this.value = '';
                        this.listeners.focus();
                        if (this.$refs.input) {
                            this.$refs.input.focus();
                        }
                    } else {
                        this.value = model[this.itemName];
                        this.selected = {};
                    }
                    this.$set(this.selected, model[this.keyName], model);
                }
                setTimeout(() => {
                    this.request({
                        [this.keyName]: [],
                        [this.paramName]: this.value
                    });
                }, this.delay);
            }
            this.$emit('choose', model, index, e);
        },
        clear() {
            this.selected = {};
            this.value = '';
            this.models = [];
            this.$emit('clear');
        }
    },
    template:
`<div style="position: relative;">
    <span>
        <span v-if="multiple" v-for="model,key in selected" :key="key" @click="choose(model, key, $event)">{{model[itemName]}}</span>
        <input ref="input" :name="attr" :value="value" :placeholder="model.getAttributeHint(attr)" v-on="listeners" autocomplete="off" v-bind="$attrs">
        <span v-if="!multiple && value" @click="clear">X</span>
    </span>
    <ul v-show="showList" style="position: absolute;" :style="{opacity: isHide ? 0 : 1}">
        <div v-if="dataProvider.isLoading">加载中</div>
        <template v-else>
            <template v-if="models.length">
                <li v-for="(model, index) in models" @click="choose(model, index, $event)">
                    <slot name="tab" :model="model" :index="index" :isActive="selected.hasOwnProperty(model[keyName])">{{model[itemName]}}</slot>
                </li>
            </template>
            <div v-else>无数据</div>
        </template>
    </ul>
</div>`,
});
