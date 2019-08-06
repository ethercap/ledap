import * as lodash from 'lodash';
import Tab from './tab';

const radio = lodash.cloneDeep(Tab);

export default lodash.merge(radio, {
    name: 'radio',
    props: {
        tag: {
            type: String,
            default: 'div',
        },
    },
    template: `<component :is="tagName" :class="{'active': isOpen()}" @click="click">
        <slot name="input" :isOpen="isOpen" :disabled="disabled"><input type="radio" :checked="isOpen()" /></slot><slot></slot>
    </component>`,
});
