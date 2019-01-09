import * as lodash from 'lodash';
import Model from '../base/Model';
import Validator from './Validator';

export default class BooleanValidator extends Validator {
    public validateAttribute(model: Model): void {
        const attribute = this.attribute;
        const value = model[attribute];
        const options: any = this.options;
        if (options.skipOnEmpty && lodash.isEmpty(value)) {
            return;
        }
        // tslint:disable-next-line:triple-equals
        const valid = !options.strict && (value == options.trueValue || value == options.falseValue)
            || options.strict && (value === options.trueValue || value === options.falseValue);

        if (!valid) {
            model.addError(attribute, options.message);
        }
    }
}
