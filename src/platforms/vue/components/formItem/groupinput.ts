import * as lodash from 'lodash';
import Model from '@/base/Model';
import BaseInput from './baseinput';

const input = lodash.cloneDeep(BaseInput);
export default lodash.merge(input, {
    name: 'groupinput',
    template: `<group :max="dictOption.max" :excludes="dictOption.excludes" :init-value="model[attr]" :multiple="dictOption.multiple" @change="groupChange" v-on="inputListeners">
    <slot name="default" v-for="key in dictOption.order" :data-key="key" :value="dictOption.list[key]" :disabled="dictOption.excludes.indexOf(key) > -1 ? true : false">
        <tab :canClose="true" :disabled="dictOption.excludes.indexOf(key) > -1 ? true : false" :data-key="key" :key="key">{{dictOption.list[key]}}</tab>
    </slot>
</group>`,
    props: {
        option: {
            type: Object
        }
    },
    data() {
        return {
            dictOption: {}
        };
    },
    created() {
        this.init();
        this.model.on(Model.EVENT_AFTERLOAD, this.init.bind(this));
    },
    methods: {
        init() {
            this.dictOption = this.getDictOption();
            this.initGroup(this);
        },
        groupChange(data, event) {
            this.model[this.attr] = data;
            if (typeof (this.inputListeners.input) === 'function') {
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
        },
        getDictOption() {
            const dictOption: any = this.option || lodash.get(this.model.rules(), [this.attr, 'dict'], {});
            dictOption.list = dictOption.list || {};
            dictOption.order = dictOption.order || Object.keys(dictOption.list);
            return dictOption;
        }
    },
    watch: {
        model() {
            this.init();
        },
    },
    depends: ['group', 'tab', 'form-item'],
});
