import * as lodash from 'lodash';
import GroupInput from './groupinput';

const input = lodash.cloneDeep(GroupInput);
export default lodash.merge(input, {
    name : 'checkboxgroup',
    props: {
        optionConfig : {
            type: Object,
            default() {
                return {
                    tag : 'checkbox',
                    canClose: false,
                };
            },
        },
    },
    depends: ['group', 'checkbox'],
});
