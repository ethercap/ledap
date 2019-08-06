import * as lodash from 'lodash';
import BaseHelper from '../helpers/BaseHelper';
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
import Validator from './Validator';
import App from '../App';

export default class ValidatorFactory {
    public static typeList = {
        boolean: BooleanValidator,
        string: StringValidator,
        int: NumberValidator,
        double: NumberValidator,
        required: RequiredValidator,
        trim: TrimValidator,
        match: RegexValidator,
        compare: CompareValidator,
        email: EmailValidator,
        filter: TrimValidator,
        in: RangeValidator,
        url: UrlValidator,
        ip: IpValidator,
        dict: DictValidator,
        array: DictValidator,
    };

    // 静态方法
    public static getInstance(attribute: string, type: string, options: object): Validator {
        if (BaseHelper.isEmpty(attribute) || BaseHelper.isEmpty(type)) {
            throw  new Error('数据格式错误');
        }
        const list = lodash.merge({}, ValidatorFactory.typeList, App.validators);
        const classObj = lodash.get(list, type, null);

        if (classObj === null) {
            return null;
        }
        const validator = new classObj(attribute, type, options);
        return validator;
    }
}
