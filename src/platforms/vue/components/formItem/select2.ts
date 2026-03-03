import * as lodash from 'lodash';
import SearchInput from './searchinput';
import ArrayHelper from '@/helpers/ArrayHelper';

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
        placeholder: {
            type: String,
            default: '',
        },
        webFocusSearch: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        if (this.filter === null) {
            this.filter = (model, index, collection) => {
                const keyword = String(this.value || '').toLowerCase();
                if (!keyword) {
                    return true;
                }
                const text = String(model[this.itemName] || '').toLowerCase();
                return text.indexOf(keyword) > -1;
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
            selected: {}
        };
    },
    computed: {
        showList() {
            return this.isFocus;
        },
        listeners() {
            return lodash.assign({}, this.$listeners,  {
                input: e => {
                    this.inputChange(e);
                },
                focus: e => {
                    this.isFocus = true;
                    this.focusChange(e);
                    if (!this.isWebDp() || this.webFocusSearch) {
                        this.request({
                            [this.keyName]: [],
                            [this.paramName]: this.value
                        });
                    }
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
        // 这里的formValue是表单里提交给后端的值
        formValue() {
            return this.model[this.attr];
        }
    },
    watch: {
        formValue(newValue: any, oldValue: any) {
            this.init();
        },
        selected(value) {
            const keys = Object.keys(value);
            if (this.multiple) {
                // 为了防止死循环，只有当值不同的时候才进行赋值
                if (!lodash.isEqual(this.model[this.attr], keys)) this.model[this.attr] = keys;
            } else {
                this.model[this.attr] = keys.length > 0 ? keys[0] : '';
                this.value = keys.length > 0 ? value[keys[0]][this.itemName] : '';
            }
        }
    },
    methods: {
        isWebDp() {
            return this.dataProvider.refresh && typeof (this.dataProvider.refresh) === 'function';
        },
        init() {
            // 如果没有selected,先请求
            if (this.model[this.attr] && lodash.isEmpty(this.selected)) {
                return this.request({
                    [this.keyName]: this.model[this.attr],
                    [this.paramName]: this.value,
                }, this.syncSelected);
            }
            this.syncSelected();
        },
        request(params, callback = key => {}) {
            if (this.isWebDp()) {
                this.dataProvider.callback = data => {
                    this.models = this.dataProvider.models;
                    callback(this.models);
                };
                this.dataProvider.setParams(params);
            } else {
                if (!this.value) {
                    this.models = this.dataProvider.models || [];
                    callback(this.models);
                    return;
                }
                this.models = lodash.filter(this.dataProvider.models || [], this.filter);
                callback(this.models);
            }
        },
        focusChange(e) {
            if (this.$listeners.focus) {
                this.$listeners.focus(e);
            }
        },
        syncSelected() {
            if (this.multiple && typeof (this.model[this.attr]) != 'object') {
                return this.model[this.attr] = [this.model[this.attr]];
            }
            const selected = {};
            const _this = this;
            Object.keys(this.models).forEach(index => {
                const model = _this.models[index];
                if (_this.multiple) {
                    if (ArrayHelper.hasKey(_this.model[_this.attr], model[_this.keyName])) {
                        selected[model[_this.keyName]] = model;
                    }
                } else if (String(model[_this.keyName]) === String(_this.model[_this.attr])) {
                    selected[model[_this.keyName]] = model;
                }
            });
            return this.selected = selected;
        },
        inputChange(e) {
            this.value = e.target.value;
            if (!this.isWebDp() || this.value) {
                this.request({
                    [this.keyName]: [],
                    [this.paramName]: this.value
                });
            }
            if (this.$listeners.input) {
                this.$listeners.input(null);
            }
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
            if (this.$listeners.blur) {
                this.$listeners.blur(e);
            }
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
            if (!this.isWebDp()) {
                this.request({
                    [this.keyName]: [],
                    [this.paramName]: this.value
                });
            }
            this.$emit('clear');
        }
    },
    template:
`<div style="position: relative;">
    <span>
        <span v-if="multiple" v-for="model,key in selected" :key="key" @click="choose(model, key, $event)">{{model[itemName]}}</span>
        <input ref="input" :name="attr" :value="value" :placeholder="placeholder || model.getAttributeHint(attr)" v-on="listeners" autocomplete="off" v-bind="$attrs">
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
