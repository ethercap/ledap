import Validator from "./Validator";
import Model from "../base/Model";
import * as lodash from "lodash";

export default class RequiredValidator extends Validator
{
    public validateAttribute(model:Model):void
    {
        const attribute = this.attribute;
        const options = this.options;
        const value = model[attribute];
        let valid = false;
        if (options["requiredValue"] === undefined) {
            let isString = typeof value == 'string' || value instanceof String;
            if (options["strict"] && value !== undefined || !options["strict"] && !lodash.isEmpty(isString ? lodash.trim(value) : value)) {
                valid = true;
            }
        } else if (!options["strict"] && value == options["requiredValue"] || options["strict"] && value === options["requiredValue"]) {
            valid = true;
        }

        if (!valid) {
            model.addError(attribute, options["message"]);
        }

    }
}

