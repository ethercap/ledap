import Model from '../base/Model';
import Validator from './Validator';

/*
 * 检查数据是否为布尔型。如果为严格模式，必须保持true,false的值严格等于trueValue, falseValue。
 * options = {
 *      trueValue : true,
 *      falseValue : false,
 *      strict : false,
 * }
 **/

export default class BooleanValidator extends Validator {
    public static defaultOptions = {
        skipOnEmpty: true,
        trueValue: true,
        falseValue: false,
    };
    public allowTypes = ['number', 'string', 'boolean'];
    
    public template = '应该为布尔型';
    
    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const attribute = this.attribute;
        const value = model[attribute];
        const options: any = this.options;
        /* eslint-disable eqeqeq */
        const valid = (!options.strict && (value == options.trueValue || value == options.falseValue))
            || (options.strict && (value === options.trueValue || value === options.falseValue));

        if (!valid) {
            model.addError(attribute, options.message);
        }
        return valid;
    }
}
