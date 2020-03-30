import * as lodash from 'lodash';
import Model from '@/base/Model';
import BaseInput from './baseinput';

const input = lodash.cloneDeep(BaseInput);
export default lodash.merge(input, {
    name: 'dropdown',
    template: `<select v-on="inputListeners" v-bind="$attrs" :name="attr">
        <option v-for="key in dictOption.order" :value="key" :selected="key === model[attr]">{{dictOption.list[key]}}</option>
    </select>`,
    data() {
        return {
            dictOption: {}
        };
    },
    created() {
        this.init();
        this.model.on(Model.EVENT_AFTERLOAD, this.init.bind(this));
    },
    watch: {
        model() {
            this.init();
        },
    },
    methods: {
        init() {
            this.dictOption = this.getDictOption();
        },
        getDictOption() {
            const dictOption: any = lodash.get(this.model.rules(), [this.attr, 'dict'], {});
            dictOption.list = dictOption.list || {};
            dictOption.order = dictOption.order || Object.keys(dictOption.list);
            return dictOption;
        }
    }
});
