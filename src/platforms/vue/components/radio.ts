import * as lodash from 'lodash';
import Tab from './tab';

const radio = lodash.cloneDeep(Tab);

radio.name = 'radio';
radio.props.tag = {
    type: String,
    default : 'div',
};
radio.template = `<component :is="tagName" :class="{'active': isOpen()}" @click="click">
    <input type="radio" :checked="isOpen()" /><slot></slot>
</component>`;

export default radio;
