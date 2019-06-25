import * as lodash from 'lodash';
import BaseInput from './baseinput';

const input = lodash.cloneDeep(BaseInput);
export default lodash.merge(input, {
    name : 'radiogroup',
    template : `<component :is="tag">
    <label>{{showLabel}}</label>
    <group :max="model.getValidatorData(attr, 'dict', 'max', 100)" :excludes="model.getValidatorData(attr, 'dict', 'excludes', [])" :init-value="model[attr]" :multiple="model.getValidatorData(attr, 'dict', 'multiple', false)" @change="groupChange">
        <radio  v-for="(val,key) in model.getValidatorData(attr, 'dict', 'list', {})" :disabled="model.getValidatorData(attr, 'dict', 'excludes', []).indexOf(key) > -1 ? true : false" :data-key="key" :key="key"> {{val}}</radio>
    </group>
    <span v-show="showError">{{showError}}</span>
</component>`,
    depends : ['group', 'radio'],
    methods : {
        groupChange(data, event) {
            this.model[this.attr] = data;
            this.inputValue(null);
        },
    },
});
