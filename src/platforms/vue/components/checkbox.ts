import * as lodash from 'lodash';
import Tab from './tab';

const checkbox = lodash.cloneDeep(Tab);

checkbox.name = 'checkbox';
checkbox.props.tag = {
    type: String,
    default : 'div',
};
checkbox.props.canClose = {
    type: Boolean,
    default : true,
};

checkbox.template = `<component :is="tagName" :class="{'active': isOpen()}" @click="click">
    <input type="checkbox" :checked="isOpen()" :disabled="disabled"/><slot></slot>
</component>`;

export default checkbox;
