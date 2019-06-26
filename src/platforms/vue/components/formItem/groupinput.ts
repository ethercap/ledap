import * as lodash from 'lodash';
import BaseInput from './baseinput';

const input = lodash.cloneDeep(BaseInput);
export default lodash.merge(input, {
    name : 'groupinput',
    props: {
        optionConfig : {
            type: Object,
            default() {
                return {
                    tag : 'a',
                    canClose: true,
                };
            },
        },
    },
    template : `<component :is="tag">
    <label v-bind="labelOptions">{{showLabel}}{{model.isRequired(attr) ? '*' : ''}}</label>
    <group v-bind="inputOptions" :max="dictOption.max" :excludes="dictOption.excludes" :init-value="model[attr]" :multiple="dictOption.multiple" @change="groupChange">
        <tab :is="optionConfig.tag" :canClose="optionConfig.canClose" :class="optionConfig.class"  v-for="(val,key) in dictOption.list" :disabled="dictOption.excludes.indexOf(key) > -1 ? true : false" :data-key="key" :key="key"> {{val}}</tab>
    </group>
    <span v-show="showError">{{showError}}</span>
</component>`,
    methods : {
        groupChange(data, event) {
            this.model[this.attr] = data;
            this.inputValue(null);
        },
    },
    computed : {
        dictOption () {
            return lodash.get(this.model.rules(), [this.attr, 'dict'], {});
        },
    },
   watch:{
        model() {
            Object.keys(this.$children).forEach( index => {
                const groupComp = this.$children[index];
                if (groupComp['group'] && groupComp['init']) {
                    this.$nextTick(() => {
                        groupComp['init']();
                    });
                }
            });
        },
    },
    depends: ['group', 'tab'],
});
