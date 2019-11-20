import Model from '../base/Model';
import Validator from './Validator';

/* 
 * options = {
 *     pattern: //, 数字的正则表达式
 *     max: '', // 值须小于max，否则显示tooBig错误
 *     min: '', // 值须小于min, 否则显示tooSmall错误。
 *     tooBig: '',
 *     tooSmall: '',
 * }
 **/

export default class NumberValidator extends Validator {
    public static defaultOptions: object = {
        skipOnEmpty: true,
        // 默认的正则
        pattern: /^\s*[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\s*$/,
        tooSmall: '数据太小',
        tooBig: '数据太大',
    }
    public template = '不是一个合法的数字'
    public allowTypes = ['number', 'string'];
    
    constructor(attribute: string, type: string, options: object) {
        super(attribute, type, options);
        if (type === 'int' && this.options['pattern'] === new.target.defaultOptions['pattern']) {
            this.options['pattern'] = /^\s*[+-]?\d+\s*$/;
        }
    }

    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const attribute = this.attribute;
        const value = new Number(model[attribute]);
        const options: any = this.options;
        if (isNaN(value.valueOf())) {
            model.addError(attribute, options.message);
            return false;
        }
        if (!options.pattern.test(new String(value))) {
            model.addError(attribute, options.message);
            return false;
        }
        
        if (options.min !== undefined && value < options.min) {
            model.addError(attribute, options.tooSmall);
            return false;
        }
        if (options.max !== undefined && value > options.max) {
            model.addError(attribute, options.tooBig);
            return false;
        }
        return true;
    }
}
