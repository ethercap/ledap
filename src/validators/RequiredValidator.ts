import * as lodash from 'lodash';
import Model from '../base/Model';
import Validator from './Validator';

/* 该值必须存在。如果设置了requiredValue，则值应该==requiredValue.如果为strict模式，则代表===
 * options = {
 *     requiredValue: '',
 *     strict : false,
 * }
 **/
export default class RequiredValidator extends Validator {
    public static defaultOptions: object = {};
    public template = '不能为空';
    public allowTypes = ['number', 'string', 'object'];
    
    constructor(attribute: string, type: string, options: object) {
        super(attribute, type, options);
        options['skipOnEmpty'] = false;
    }

    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const attribute = this.attribute;
        const options: any = this.options;
        const value = model[attribute];
        let valid = false;
        if (options.requiredValue === undefined) {
            const isString = typeof value === 'string' || value instanceof String;
            if ((options.strict && value !== undefined) || (!options.strict && !lodash.isEmpty(isString ? lodash.trim(value) : value))) {
                valid = true;
            }
        /* eslint-disable eqeqeq */
        } else if (!options.strict && value == options.requiredValue || options.strict && value === options.requiredValue) {
            valid = true;
        }

        if (!valid) {
            model.addError(attribute, options.message);
        }
        return valid;
    }
}
