import Model from '../base/Model';
import BaseHelper from '../helpers/BaseHelper';
import Validator from './Validator';

export default class EmailValidator extends Validator {
    public validateAttribute(model: Model): void {
        const attribute = this.attribute;
        const options: any = this.options;
        const value = model[attribute];
        if (options.skipOnEmpty && BaseHelper.isEmpty(value)) {
            return;
        }
        let valid = true;
        const regexp = /^((?:"?([^"]*)"?\s)?)(?:\s+)?(?:(<?)((.+)@([^>]+))(>?))$/;
        const matches = regexp.exec(value);

        if (matches === null) {
            valid = false;
        } else {
            const localPart = matches[5];
            const domain = matches[6];

            /*if (options["enableIDN"]) {
                localPart = punycode.toASCII(localPart);
                domain = punycode.toASCII(domain);

                value = matches[1] + matches[3] + localPart + '@' + domain + matches[7];
            }*/

            if (localPart.length > 64) {
                valid = false;
            } else if ((localPart + '@' + domain).length > 254) {
                valid = false;
            } else {
                valid = options.pattern.test(value) || (options.allowName && options.fullPattern.test(value));
            }
        }

        if (!valid) {
            model.addError(attribute, options.message);
        }

    }
}
