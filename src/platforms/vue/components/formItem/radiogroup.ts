import * as lodash from 'lodash';
import GroupInput from './groupinput';

const input = lodash.cloneDeep(GroupInput);
export default lodash.merge(input, {
    name : 'radiogroup',
    props: {
        optionConfig : {
            type: Object,
            default() {
                return {
                    tag : 'radio',
                    canClose: false,
                };
            },
        },
    },
    depends: ['group', 'radio'],
});
