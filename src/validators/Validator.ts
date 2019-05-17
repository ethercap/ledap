import * as lodash from 'lodash';
import BaseObject from '../base/BaseObject';
import Model from '../base/Model';

export default abstract class Validator extends BaseObject {
    public attribute: string;
    public type: string;
    public options: object;

    constructor(attribute: string, type: string, options: object) {
        super();
        this.attribute = attribute;
        this.type = type;
        // 默认所有的带pattern名的参数，且以/开头的字符串都认为是正则表达式
        Object.keys(options).forEach(key => {
            const p = /pattern/i;
            if (p.test(key) && typeof(options[key]) === 'string' && options[key][0] === '/') {
                // tslint:disable-next-line:no-eval
                options[key] = eval(options[key]);
            }
        });
        this.options = options;
    }

    public abstract validateAttribute(model: Model): void;
}
