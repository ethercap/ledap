import Model from '../base/Model';
import Validator from './Validator';
import * as punycode from 'punycode';

/* 检查值是否是一个Url
 * options = {
 *     pattern: //, url的正则
 *     enableIDN: false, 是否支持IDN
 *     defaultScheme : '', //如果有,在validate时，会自动加上。示例：如果defaultScheme为http, 用户输入www.xx.com在validate之后会变为http://www.xx.com
 * }
 * */
export default class UrlValidator extends Validator {
    public static defaultOptions = {
        pattern: /^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(?::\d{1,5})?(?:$|[?/#])/i,
        skipOnEmpty: true,
    };
    public allowTypes = ['string'];
    
    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const attribute = this.attribute;
        const options: any = this.options;
        let value = model[attribute];

        if (options.defaultScheme && !/:\/\//.test(value)) {
            value = model[attribute] = options.defaultScheme + '://' + value;
        }

        let valid = true;

        if (options['enableIDN']) {
            const matches = /^([^:]+):\/\/([^/]+)(.*)$/.exec(value);
            if (matches === null) {
                valid = false;
            } else {
                value = matches[1] + '://' + punycode.toASCII(matches[2]) + matches[3];
            }
        }

        if (!valid || !options.pattern.test(value)) {
            model.addError(attribute, options.message);
            return false;
        }
        return true;

    }
}
