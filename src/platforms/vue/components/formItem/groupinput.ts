import * as lodash from 'lodash';
import BaseInput from './baseinput';

const input = lodash.cloneDeep(BaseInput);
export default lodash.merge(input, {
    name: 'groupinput',
    template: `<group :max="dictOption.max" :excludes="dictOption.excludes" :init-value="model[attr]" :multiple="dictOption.multiple" @change="groupChange" v-on="inputListeners">
    <slot name="default" v-for="(val,key) in dictOption.list" :data-key="key" :value="val" :disabled="dictOption.excludes.indexOf(key) > -1 ? true : false">
        <tab :canClose="true" :disabled="dictOption.excludes.indexOf(key) > -1 ? true : false" :data-key="key" :key="key"> {{val}}</tab>
    </slot>
</group>`,
    methods: {
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
    },
    computed: {
        dictOption() {
            return lodash.get(this.model.rules(), [this.attr, 'dict'], {});
        },
    },
    watch: {
        model() {
            this.initGroup(this);
        },
    },
    depends: ['group', 'tab', 'form-item'],
});
