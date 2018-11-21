import Validator from "./Validator";
import Model from "../base/Model";
import * as lodash from "lodash";

export default class RangeValidator extends Validator
{
    public validateAttribute(model:Model):void
    {
        const attribute = this.attribute;
        const options = this.options;
        const value = model[attribute];
        if (options["skipOnEmpty"] && lodash.isEmpty(value)) {
            return;
        }

        if (!options["allowArray"] && lodash.isArray(value)) {
            model.addError(attribute, options["message"]);
            return;
        }

        let inArray = true;

        lodash.each(lodash.isArray(value) ? value : [value], function (i, v) {
            if (lodash.indexOf(options["range"], v) == -1) {
                inArray = false;
                return false;
            } else {
                return true;
            }
        });

        if (options["not"] === undefined) {
            options["not"] = false;
        }

        if (options["not"] === inArray) {
            model.addError(attribute, options["message"]);
        }

    }
}

