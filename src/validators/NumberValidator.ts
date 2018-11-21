import Validator from "./Validator";
import Model from "../base/Model";
import * as lodash from "lodash";

export default class NumberValidator extends Validator
{
    public validateAttribute(model:Model):void
    {
        const attribute = this.attribute;
        const value = model[attribute];
        const options = this.options;
        if(options["pattern"] && typeof(options["pattern"]) === "string") {
            options["pattern"] = new RegExp(options["pattern"]);
        }
        if (options["skipOnEmpty"] && lodash.isEmpty(value)) {
            return;
        }

        if (typeof value === 'string' && !options["pattern"].test(value)) {
            model.addError(attribute, options["message"]);
            return;
        }

        if (options["min"] !== undefined && value < options["min"]) {
            model.addError(attribute, options["tooSmall"]);
        }
        if (options["max"] !== undefined && value > options["max"]) {
            model.addError(attribute, options["tooBig"]);
        }
    }
}
