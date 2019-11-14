import Model from '../base/Model';
import * as lodash from 'lodash';
import Validator from './Validator';
/** DictValidator代表model的属性值是dict中的某一个或多个。
 * options = {
 *     list: {1=> 'a',...} //一个object
 *     multiple: false,  // 是否为多选
 *     excludes: [],  // 不可选的项
 *     min: '',    // 最小的项数，仅在multiple时有效，若不符合，显示tooSmall
 *     tooSmall: '',
 *     max: '',    // 最大的项数，仅在multiple时有效，若不符合，显示tooMuch
 *     tooMuch: '',
 * }
 * */
export default class DictValidator extends Validator {
    public static defaultOptions = {
        excludes: [],
        tooSmall: '选项过少',
        tooMuch: '选项过多',
        skipOnEmpty: true,
    };
    public allowTypes = ['number', 'string', 'object'];

    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const attribute = this.attribute;
        const options: any = this.options;
        let value = model[attribute];

        if (!lodash.isArray(value)) {
            value = [value];
        }

        if (options.multiple) {
            model[attribute] = value;
        } else {
            model[attribute] = value[0];
        }

        if (options.min !== undefined && value.length < options.min) {
            model.addError(attribute, options.tooSmall);
            return false;
        }
        if (options.max !== undefined && value.length > options.max) {
            model.addError(attribute, options.tooMuch);
            return false;
        }
        let valid = true;
        Object.keys(value).forEach(index => {
            const val = value[index];
            if ( (!options.list.hasOwnProperty(val)) || options.excludes.indexOf(val) > -1) {
                model.addError(attribute, options.message);
                valid = false;
            }
        });
        return valid;
    }
}
