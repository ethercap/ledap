import * as lodash from 'lodash';
import BaseInput from './baseinput';

const input = lodash.cloneDeep(BaseInput);
export default lodash.merge(input, {
    name: 'dropdown',
    template: `
<component :is="tag">
    <label  v-bind="labelOptions">{{showLabel}}</label>
    <select v-bind="inputOptions" v-on="inputListeners">
        <option v-for="(val,key) in model.getValidatorData(attr, 'dict', 'list', {})" :value="key" :selected="key === model[attr]">{{val}}</option>
    </select>
    <span v-show="showError">{{showError}}</span>
</component>`,
});
