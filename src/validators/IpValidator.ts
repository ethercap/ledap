import Model from '../base/Model';
import BaseHelper from '../helpers/BaseHelper';
import Validator from './Validator';

export default class IpValidator extends Validator {
    public validateAttribute(model: Model): void {
        const options: any = this.options;
        const attribute = this.attribute;
        let value = model[attribute];
        if (options.skipOnEmpty && BaseHelper.isEmpty(value)) {
            return;
        }

        let negation = null;
        let cidr = null;
        const matches = new RegExp(options.ipParsePattern).exec(value);
        if (matches) {
            negation = matches[1] || null;
            value = matches[2];
            cidr = matches[4] || null;
        }

        if (options.subnet === true && cidr === null) {
            model.addError(attribute, options.messages.noSubnet);
            return;
        }
        if (options.subnet === false && cidr !== null) {
            model.addError(attribute, options.messages.hasSubnet);
            return;
        }
        if (options.negation === false && negation !== null) {
            model.addError(attribute, options.messages.message);
            return;
        }

        const ipVersion = value.indexOf(':') === -1 ? 4 : 6;
        if (ipVersion === 6) {
            if (!(new RegExp(options.ipv6Pattern)).test(value)) {
                model.addError(attribute, options.messages.message);
            }
            if (!options.ipv6) {
                model.addError(attribute, options.messages.ipv6NotAllowed);
            }
        } else {
            if (!(new RegExp(options.ipv4Pattern)).test(value)) {
                model.addError(attribute, options.messages.message);
            }
            if (!options.ipv4) {
                model.addError(attribute, options.messages.ipv4NotAllowed);
            }
        }

    }
}
