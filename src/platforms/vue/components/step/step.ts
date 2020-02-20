import * as lodash from 'lodash';
import Tab from '../group/tab';

const step = lodash.cloneDeep(Tab);

export default lodash.merge(step, {
    name: 'step',
    inheritAttrs: false,
    props: {
        tag: {
            type: String,
            default: 'div',
        },
    },
    methods: {
        click() {
            return false;
        }
    },
    template: `
    <component :is="tagName" :class="{'active': isOpen()}">
        <slot></slot>
    </component>`
});
