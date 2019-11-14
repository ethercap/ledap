import Model from '../base/Model';
import Validator from './Validator';
import  * as punycode from 'punycode';
/*
 * options = {
 *     pattern: /^$/,  //邮箱的正则表达式， 形如:john@example.com
 *     fullPattern : /^$/, //邮箱全称的正则表达式，形如: john <john@example.com>
 *     allowName : false, //是否使用带名字的邮箱，为true时，会使用fullPattern
 *     enableIDN: false, //是否支持IDN(internationalized domain names)
 * },
 *
 * */

export default class EmailValidator extends Validator {
    public static defaultOptions: object = {
        skipOnEmpty: true,
        // 默认的email正则
        pattern: /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
        fullPattern: /^[^@]*<[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?>$/,
    };
    public template = '不是一个合法的邮箱格式';
    public allowTypes = ['string'];
    
    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const attribute = this.attribute;
        const options: any = this.options;
        let value = model[attribute];
        let valid = true;
        const regexp = /^((?:"?([^"]*)"?\s)?)(?:\s+)?(?:(<?)((.+)@([^>]+))(>?))$/;
        const matches = regexp.exec(value);

        if (matches === null) {
            valid = false;
        } else {
            let localPart = matches[5];
            let domain = matches[6];

            if (options['enableIDN']) {
                localPart = punycode.toASCII(localPart);
                domain = punycode.toASCII(domain);

                value = matches[1] + matches[3] + localPart + '@' + domain + matches[7];
            }

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
        return valid;
    }
}
