import * as lodash from 'lodash';
import BaseInput from './baseinput';

const dropdown = lodash.cloneDeep(BaseInput);
dropdown.name = 'dropdown';
dropdown.template = `
<component :is="tag">
    <label>{{showLabel}}</label>
    <select @change="inputValue">
        <option v-for="(val,key) in model.getValidatorData(attr, 'dict', 'list', {})" :value="key" :selected="key === model[attr]">{{val}}</option>
    </select>
    <span v-show="showError">{{showError}}</span>
</component>`;

export default dropdown;
