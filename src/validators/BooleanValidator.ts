import Validator from "./Validator";
import Model from "../base/Model";
import * as lodash from "lodash";

export default class BooleanValidator extends Validator
{
    public validateAttribute(model:Model):void
    {
        const attribute = this.attribute;
        const value = model[attribute];
        const options = this.options;
        if (options["skipOnEmpty"] && lodash.isEmpty(value)) {
            return;
        }
        let valid = !options["strict"] && (value == options["trueValue"] || value == options["falseValue"])
            || options["strict"] && (value === options["trueValue"] || value === options["falseValue"]);

        if (!valid) {
            model.addError(attribute, options["message"]);
        }
    }
}

