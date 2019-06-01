import * as lodash from 'lodash';
import Model from '../base/Model';
import BaseHelper from '../helpers/BaseHelper';
import Validator from './Validator';

export default class RequiredValidator extends Validator {
    public validateAttribute(model: Model): void {
        const attribute = this.attribute;
        const options: any = this.options;
        const value = model[attribute];
        let valid = false;
        if (options.requiredValue === undefined) {
            const isString = typeof value === 'string' || value instanceof String;
            if (options.strict && value !== undefined || !options.strict && !BaseHelper.isEmpty(isString ? lodash.trim(value) : value)) {
                valid = true;
            }
        // tslint:disable-next-line:triple-equals
        } else if (!options.strict && value == options.requiredValue || options.strict && value === options.requiredValue) {
            valid = true;
        }

        if (!valid) {
            model.addError(attribute, options.message);
        }

    }
}
