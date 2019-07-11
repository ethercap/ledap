import Model from '../base/Model';
import BaseHelper from '../helpers/BaseHelper';
import Validator from './Validator';

export default class RegexValidator extends Validator {
    public validateAttribute(model: Model): void {
        const attribute = this.attribute;
        const options: any = this.options;
        const value = model[attribute];
        if (options.pattern && typeof (options.pattern) === 'string') {
            options.pattern = new RegExp(options.pattern);
        }
        if (options.skipOnEmpty && BaseHelper.isEmpty(value)) {
            return;
        }

        if (!options.not && !options.pattern.test(value) || options.not && options.pattern.test(value)) {
            model.addError(attribute, options.message);
        }

    }
}
