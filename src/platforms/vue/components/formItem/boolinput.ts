import * as lodash from 'lodash';
import BaseInput from './baseinput';

const input = lodash.cloneDeep(BaseInput);
export default lodash.merge(input, {
    name: 'boolinput',
    template: `<group :key="model[attr]" :tag="'div'" :max="1" :init-value="getInitValue()" @change="groupChange" v-on="inputListeners" class="btn-group">
        <tab class="btn btn-outline-primary" :data-key="1" :canClose="false">{{trueText}}</tab>
        <tab class="btn btn-outline-primary" :data-key="0" :canClose="false">{{falseText}}</tab>
    </group>`,
    props: {
        trueText: {
            type: String,
            default: '开启'
        },
        falseText: {
            type: String,
            default: '关闭'
        },
        valueType: {
            type: String,
            default: 'number', // 'number' | 'boolean'
            validator: (value: string) => ['number', 'boolean'].includes(value)
        }
    },
    data() {
        return {
            selected: null
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            // 确保model[attr]有初始值
            this.normalizeValue();
            this.initGroup(this);
        },
        handleModelChange(model, key, value) {
            // 当监听的属性发生变化时，强制更新组件
            if (key === this.attr) {
                this.$forceUpdate();
                this.$nextTick(() => {
                    this.initGroup(this);
                });
            }
        },
        normalizeValue() {
            let value = this.model[this.attr];
            // 强制将值转换为支持的格式
            // 如果value是字符串"0"或"false"，将其视为false
            if (value === "0" || value === "false" || value === "False") {
                value = false;
            }
            if (this.valueType === 'number') {
                this.model[this.attr] = value ? 1 : 0;
            } else {
                this.model[this.attr] = !!value;
            }
        },
        getInitValue() {
            // 先调用normalizeValue确保值被规范化
            this.normalizeValue();
            const value = this.model[this.attr];
            // 将model中的值转换为对应的data-key（0或1）
            // 确保始终返回数字，避免传递boolean给tab组件
            return value ? 1 : 0;
        },
        groupChange(data) {
            // data是0或1，先设置到model，然后调用normalizeValue进行规范化
            this.model[this.attr] = data;
            this.normalizeValue();
            if (typeof (this.inputListeners.input) === 'function') {
                // 触发v-model更新，传null是因为值已经通过model[this.attr]传递
                this.inputListeners.input(null);
            }
        },
        initGroup(vm) {
            if (!vm) {
                return;
            }
            Object.keys(vm.$children).forEach( index => {
                const groupComp = vm.$children[index];
                if (groupComp['group'] && groupComp['init']) {
                    this.$nextTick(() => {
                        groupComp['init']();
                    });
                } else {
                    this.initGroup(groupComp);
                }
            });
            return;
        }
},
    watch: {
        model: {
            handler() {
                // 监听model变化，用于初始化和值变化
                this.normalizeValue();
                this.$nextTick(() => {
                    this.initGroup(this);
                });
            },
            deep: true
        }
    },
    depends: ['group', 'tab', 'form-item'],
});