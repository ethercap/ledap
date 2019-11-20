import Model from '../base/Model';
import Validator from './Validator';

/* 
 * options = {
 *     ipv4: true, //是否可以为ipv4地址
 *     ipv6: true, //是否可以为ipv6地址
 *     ipv4Pattern: //, //ipv4的正则
 *     ipv6Pattern: //, //ipv6的正则
 *     ipParsePattern: //, // 获取ip的正则，可以将否定符等提出来来 
 *     negation: false,  //ip地址前是否有一个否定符，如 !192.168.1.1
 *     subnet: false, // 是否带CIDR子网掩码，如192.168.10.0/24   
 *     messages: {
 *         ipv6NotAllowed: '',
 *         ipv4NotAllowed: '',
 *         message: '',
 *         noSubnet: '',
 *         hasSubnet: '',
 *     },
 * },
 **/
export default class IpValidator extends Validator {
    public static defaultOptions = {
        skipOnEmpty: true,
        ipv4: true,
        ipv6: true,
        ipv4Pattern: /^(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))$/,
        ipv6Pattern: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
        ipParsePattern: /^(!?)(.+?)(\/(\d+))?$/,
        messages: {
            ipv6NotAllowed: '地址不能是ipv6地址',
            ipv4NotAllowed: '地址不能是ipv4地址',
            message: 'ip地址不正确',
            noSubnet: 'ip地址必须带掩码',
            hasSubnet: 'ip地址不能带掩码',
        },
    };
    public allowTypes = ['string'];
    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const options: any = this.options;
        const attribute = this.attribute;
        let value = model[attribute];
        let negation = null;
        let cidr = null;
        const matches = new RegExp(options.ipParsePattern).exec(value);
        if (matches) {
            negation = matches[1] || null;
            value = matches[2];
            cidr = matches[4] || null;
        }

        if (options.subnet && cidr === null) {
            model.addError(attribute, options.messages.noSubnet);
            return false;
        }
        if (!options.subnet && cidr !== null) {
            model.addError(attribute, options.messages.hasSubnet);
            return false;
        }
        if (!options.negation && negation !== null) {
            model.addError(attribute, options.messages.message);
            return false;
        }

        const ipVersion = value.indexOf(':') === -1 ? 4 : 6;
        if (ipVersion === 6) {
            if (!(new RegExp(options.ipv6Pattern)).test(value)) {
                model.addError(attribute, options.messages.message);
                return false;
            }
            if (!options.ipv6) {
                model.addError(attribute, options.messages.ipv6NotAllowed);
                return false;
            }
        } else {
            if (!(new RegExp(options.ipv4Pattern)).test(value)) {
                model.addError(attribute, options.messages.message);
                return false;
            }
            if (!options.ipv4) {
                model.addError(attribute, options.messages.ipv4NotAllowed);
                return false;
            }
        }
        return true;
    }
}
