import * as lodash from 'lodash';
import BooleanValidator from './BooleanValidator';
import CompareValidator from './CompareValidator';
import DictValidator from './DictValidator';
import EmailValidator from './EmailValidator';
import IpValidator from './IpValidator';
import NumberValidator from './NumberValidator';
import RangeValidator from './RangeValidator';
import RegexValidator from './RegexValidator';
import RequiredValidator from './RequiredValidator';
import StringValidator from './StringValidator';
import TrimValidator from './TrimValidator';
import UrlValidator from './UrlValidator';
import FnValidator from './FnValidator';
import Validator from './Validator';
import App from '../App';

export default class ValidatorFactory {
    public static typeList = {
        boolean: BooleanValidator,
        string: StringValidator,
        int: NumberValidator,
        double: NumberValidator,
        number: NumberValidator,
        required: RequiredValidator,
        trim: TrimValidator,
        match: RegexValidator,
        regex: RegexValidator,
        compare: CompareValidator,
        email: EmailValidator,
        filter: TrimValidator,
        in: RangeValidator,
        range: RangeValidator,
        url: UrlValidator,
        ip: IpValidator,
        dict: DictValidator,
        array: DictValidator,
    };

    // 静态方法
    public static getInstance(attribute: string, type: any, options: object): Validator {
        if (!attribute || !type) {
            throw  new Error('数据格式错误');
        }
        let validator = null;
        if (typeof type === 'string') {
            const list = lodash.merge({}, ValidatorFactory.typeList, App.validators);
            const classObj = lodash.get(list, type, null);
            if (classObj) {
                validator = new classObj(attribute, type, options);
            }
        } else if (typeof type === 'function') {
            // 说明是函数，因此创建函数调用
            validator = new FnValidator(attribute, type, options);
        }
        return validator;
    }
}
