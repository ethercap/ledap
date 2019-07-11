import * as lodash from 'lodash';
import Tab from './tab';

const tab = lodash.cloneDeep(Tab);

export default lodash.merge(tab, {
    name: 'checkbox',
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        canClose: {
            type: Boolean,
            default: true,
        },
    },
    template: `<component :is="tagName" :class="{'active': isOpen()}" @click="click">
        <input type="checkbox" :checked="isOpen()" :disabled="disabled"/><slot></slot>
    </component>`,
});
