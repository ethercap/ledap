import Validator from "./Validator";
import Model from "../base/Model";
import * as lodash from "lodash";

export default class CompareValidator extends Validator
{
    public validateAttribute(model:Model):void
    {
        const attribute = this.attribute;
        const options = this.options;
        let value = model[attribute];
        if (options["skipOnEmpty"] && lodash.isEmpty(value)) {
            return;
        }

        let compareValue,
            valid = true;
        if (options["compareAttribute"] === undefined) {
            compareValue = options["compareValue"];
        } else {
            compareValue = model[options["compareAttribute"]];
        }

        if (options["type"] === 'number') {
            value = parseFloat(value);
            compareValue = parseFloat(compareValue);
        }
        switch (options["operator"]) {
            case '==':
                valid = value == compareValue;
                break;
            case '===':
                valid = value === compareValue;
                break;
            case '!=':
                valid = value != compareValue;
                break;
            case '!==':
                valid = value !== compareValue;
                break;
            case '>':
                valid = value > compareValue;
                break;
            case '>=':
                valid = value >= compareValue;
                break;
            case '<':
                valid = value < compareValue;
                break;
            case '<=':
                valid = value <= compareValue;
                break;
            default:
                valid = false;
                break;
        }

        if (!valid) {
            model.addError(value, options["message"]);
        }

    }
}

