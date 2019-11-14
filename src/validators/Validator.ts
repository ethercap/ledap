import BaseObject from '../base/BaseObject';
import Model from '../base/Model';
import StringHelper from '../helpers/StringHelper';
import BaseHelper from '../helpers/BaseHelper';
import * as lodash from 'lodash';

/* 所有validator的options均有如下约定:
 * options = {
 *    skipOnEmpty: true, //当数据为空时，不校验
 *    message: "xxx", //校验失败时，显示的错误信息
 * },
 *
 */
export default abstract class Validator extends BaseObject {
    public attribute: string;
    public type: string;
    public static defaultOptions: object = {
        skipOnEmpty: true,
    };
    public template: string = '的值不合法';
    public options: object;
    public allowTypes = ['number', 'string'];

    constructor(attribute: string, type: string, options: object) {
        super();
        this.attribute = attribute;
        this.type = type;
        // 默认所有的带pattern名的参数，且以/开头的字符串都认为是正则表达式
        Object.keys(options).forEach(key => {
            const p = /pattern/i;
            if (p.test(key) && typeof (options[key]) === 'string' && options[key][0] === '/') {
                options[key] = StringHelper.toRegExp(options[key]);
            }
        });
        this.options = lodash.merge({}, new.target.defaultOptions, options);
    }

    public  validateAttribute(model: Model): boolean {
        if (!this.options['message']) {
            this.options['message'] = model.getAttributeLabel(this.attribute) + this.template;
        }
        const value = model[this.attribute];
        const valueType = typeof value;
        if (this.options['skipOnEmpty'] && BaseHelper.isEmpty(value)) {
            return false;
        }
        if (this.allowTypes.indexOf(valueType) < 0) {
            model.addError(this.attribute, this.options['message']);
            return false;
        }
        return true;
    }
}
