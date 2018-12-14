import Validator from "./Validator";
import * as lodash from "lodash";
import BooleanValidator from "./BooleanValidator";
import StringValidator from "./StringValidator";
import NumberValidator from "./NumberValidator";
import RequiredValidator from "./RequiredValidator";
import TrimValidator from "./TrimValidator";
import RegexValidator from "./RegexValidator";
import CompareValidator from "./CompareValidator";
import EmailValidator from "./EmailValidator";
import RangeValidator from "./RangeValidator";
import UrlValidator from "./UrlValidator";
import IpValidator from "./IpValidator";
import DictValidator from "./DictValidator";

export default class ValidatorFactory
{
    static typeList = {
        "boolean"  : BooleanValidator,
        "string"   : StringValidator,
        "int"      : NumberValidator,
        "double"   : NumberValidator,
        "required" : RequiredValidator,
        "trim"     : TrimValidator,
        "match"    : RegexValidator,
        "compare"  : CompareValidator,
        "email"    : EmailValidator,
        "filter"   : TrimValidator,
        "in"       : RangeValidator,
        "url"      : UrlValidator,
        "ip"       : IpValidator,
        "dict"     : DictValidator,
        "array"    : DictValidator,
    };

    //静态方法
    public static getInstance(attribute:string, type:string, options:object):Validator{
        if(lodash.isEmpty(attribute) || lodash.isEmpty(type)) {
            throw  "数据格式错误"; 
        } 
        const classObj = lodash.get(ValidatorFactory.typeList, type, null);
    
        if(classObj === null) {
            return null;
        }
        let validator = new classObj(attribute, type, options);
        return validator;
    };   
}
