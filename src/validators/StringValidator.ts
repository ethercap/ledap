import Model from '../base/Model';
import Validator from './Validator';

/* model[attribute]的值为一个字符串
 * options = {
 *     is: 0, // 若设置，代表字符串的长度等于is, 若不符合，显示notEqual
 *     notEqual : '',
 *     min: 0, //若设置，代表字符串长度的最小长度为min,若不符合，显示tooShort
 *     tooShort: '',
 *     max : 0, //若设置，代表字符串长度的最大长度为max,若不符合显示tooLong
 *     tooLong : '',
 * }
 **/
export default class StringValidator extends Validator {
    public static defaultOptions = {
        skipOnEmpty: true,
        notEqual: '文本内容长度不匹配',
        tooShort: '文本内容过短',
        tooMax: '文本内容过长',
    };
    public allowTypes = ['string'];
    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const attribute = this.attribute;
        const options: any = this.options;
        const value = model[attribute];

        /* eslint-disable eqeqeq */
        if (options.is !== undefined && value.length != options.is) {
            model.addError(attribute, options.notEqual);
            return false;
        }
        if (options.min !== undefined && value.length < options.min) {
            model.addError(attribute, options.tooShort);
            return false;
        }
        if (options.max !== undefined && value.length > options.max) {
            model.addError(attribute, options.tooLong);
            return false;
        }
        return true;
    }
}
