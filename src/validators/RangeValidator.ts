import * as lodash from 'lodash';
import Model from '../base/Model';
import BaseHelper from '../helpers/BaseHelper';
import Validator from './Validator';

export default class RangeValidator extends Validator {
    public validateAttribute(model: Model): void {
        const attribute = this.attribute;
        const options: any = this.options;
        const value = model[attribute];
        if (options.skipOnEmpty && BaseHelper.isEmpty(value)) {
            return;
        }

        if (!options.allowArray && lodash.isArray(value)) {
            model.addError(attribute, options.message);
            return;
        }

        let inArray = true;

        lodash.each(lodash.isArray(value) ? value : [value], (i, v) => {
            if (lodash.indexOf(options.range, v) === -1) {
                inArray = false;
                return false;
            } else {
                return true;
            }
        });

        if (options.not === undefined) {
            options.not = false;
        }

        if (options.not === inArray) {
            model.addError(attribute, options.message);
        }

    }
}
