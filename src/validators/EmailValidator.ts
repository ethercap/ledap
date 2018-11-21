import Validator from "./Validator";
import Model from "../base/Model";
import * as lodash from "lodash";

export default class EmailValidator extends Validator
{
    public validateAttribute(model:Model):void
    {
        const attribute = this.attribute;
        const options = this.options;
        const value = model[attribute];
        if (options["skipOnEmpty"] && lodash.isEmpty(value)) {
            return;
        }
        let valid = true,
            regexp = /^((?:"?([^"]*)"?\s)?)(?:\s+)?(?:(<?)((.+)@([^>]+))(>?))$/,
            matches = regexp.exec(value);

        if (matches === null) {
            valid = false;
        } else {
            let localPart = matches[5],
                domain = matches[6];

            /*if (options["enableIDN"]) {
                localPart = punycode.toASCII(localPart);
                domain = punycode.toASCII(domain);

                value = matches[1] + matches[3] + localPart + '@' + domain + matches[7];
            }*/

            if (localPart.length > 64) {
                valid = false;
            } else if ((localPart + '@' + domain).length > 254) {
                valid = false;
            } else {
                valid = options["pattern"].test(value) || (options["allowName"] && options["fullPattern"].test(value));
            }
        }

        if (!valid) {
            model.addError(attribute, options["message"]);
        }

    }
}
