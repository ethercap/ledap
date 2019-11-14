import * as lodash from 'lodash';
import Model from '../base/Model';
import Validator from './Validator';

/*
 * 检查数据是否为range中的数值，not代表不在range中。allowArray代表值是否允许为一个子数组。
 * options = {
 *     allowArray  : false, //是否允许为数组
 *     range : ['1xx', '2xx'], 
 *     not : false,
 * },
 *
 **/
export default class RangeValidator extends Validator {
    public allowTypes = ['number', 'string', 'object'];
    
    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const attribute = this.attribute;
        const options: any = this.options;
        const value = model[attribute];

        if (!options.allowArray && lodash.isArray(value)) {
            model.addError(attribute, options.message);
            return false;
        }

        let inArray = true;

        lodash.each(lodash.isArray(value) ? value : [value], (v, i) => {
            if (lodash.indexOf(options.range, v) === -1) {
                inArray = false;
                return false;
            } 
            return true;
            
        });

        if (options.not === undefined) {
            options.not = false;
        }

        if (options.not === inArray) {
            model.addError(attribute, options.message);
            return false;
        }
        return true;
    }
}
