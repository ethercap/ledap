import * as lodash from 'lodash';
import BaseInput from './baseinput';

const input = lodash.cloneDeep(BaseInput);
export default lodash.merge(input, {
    name : 'checkboxgroup',
    template : `<component :is="tag">
    <label>{{showLabel}}</label>
    <group :max="dictOption.max" :excludes="dictOption.excludes" :init-value="model[attr]" :multiple="dictOption.multiple" @change="groupChange">
        <checkbox  v-for="(val,key) in dictOption.list" :disabled="dictOption.excludes.indexOf(key) > -1 ? true : false" :data-key="key" :key="key"> {{val}}</checkbox>
    </group>
    <span v-show="showError">{{showError}}</span>
</component>`,
    depends : ['group', 'checkbox'],
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
});
