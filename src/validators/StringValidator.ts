import Validator from "./Validator";
import Model from "../base/Model";
import * as lodash from "lodash";

export default class StringValidator extends Validator
{
    public validateAttribute(model:Model):void
    {
        const attribute = this.attribute;
        const options = this.options;
        const value = model[attribute];
        if (options["skipOnEmpty"] && lodash.isEmpty(value)) {
            return;
        }

        if (typeof value !== 'string') {
            model.addError(attribute, options["message"]);
            return;
        }

        if (options["is"] !== undefined && value.length != options["is"]) {
            model.addError(attribute, options["notEqual"]);
            return;
        }
        if (options["min"] !== undefined && value.length < options["min"]) {
            model.addError(attribute, options["tooShort"]);
        }
        if (options["max"] !== undefined && value.length > options["max"]) {
            model.addError(attribute, options["tooLong"]);
        }
    }
}

