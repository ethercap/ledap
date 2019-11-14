import Model from '../base/Model';
import Validator from './Validator';

/* 比对model的某个属性的值，当compareAttribute存在时，代表与model的该属性进行比较，如果不存在，则代表与options.compareValue进行比较
 * options = {
 *    operator: '',  //可以为==, >, < , >=, <=,===, !=, !==
 *    type: 'number|string',  //可以为"number",
 *    compareValue: '',  
 *    compareAttribute : undefined, // model的另一个属性名
 * },
 */
export default class CompareValidator extends Validator {
    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const attribute = this.attribute;
        const options: any = this.options;
        let value = model[attribute];
        let compareValue;
        let valid = true;
        if (options.compareAttribute === undefined) {
            compareValue = options.compareValue;
        } else {
            compareValue = model[options.compareAttribute];
        }

        if (options.type === 'number') {
            value = parseFloat(value);
            compareValue = parseFloat(compareValue);
        }
        /* eslint-disable eqeqeq */
        switch (options.operator) {
            case '==':
                valid = value == compareValue;
                break;
            case '===':
                valid = value === compareValue;
                break;
            case '!=':
                valid = value != compareValue;
                break;
            case '!==':
                valid = value !== compareValue;
                break;
            case '>':
                valid = value > compareValue;
                break;
            case '>=':
                valid = value >= compareValue;
                break;
            case '<':
                valid = value < compareValue;
                break;
            case '<=':
                valid = value <= compareValue;
                break;
            default:
                valid = false;
                break;
        }

        if (!valid) {
            model.addError(attribute, options.message);
        }
        return valid;
    }
}
