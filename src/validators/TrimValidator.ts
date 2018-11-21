import Validator from "./Validator";
import Model from "../base/Model";
import * as lodash from "lodash";

export default class TrimValidator extends Validator
{
    public validateAttribute(model:Model):void
    {
        const attribute = this.attribute;
        model[attribute] = lodash.trim(model[attribute]);
    }
}
