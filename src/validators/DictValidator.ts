import Validator from "./Validator";
import Model from "../base/Model";
import * as lodash from "lodash";

export default class DictValidator extends Validator
{
    public validateAttribute(model:Model):void
    {
        const attribute = this.attribute;
        const options = this.options;
        let value = model[attribute];
        if (options["skipOnEmpty"] && lodash.isEmpty(value)) {
            return;
        }
        
        if(!options["multiple"]) {
            value = [value];
        }
        
        if(typeof value != "object") {
            model.addError(attribute, options["message"]); 
            return;
        }
        
        if (options["min"] !== undefined && value.length < options["min"]) {
            model.addError(attribute, options["tooSmall"]);
        }
        if (options["max"] !== undefined && value.length > options["max"]) {
            model.addError(attribute, options["tooMuch"]);
        }
        for(let index in value) {
            let val = value[index];
            if( (!options["list"].hasOwnProperty(val)) || options["excludes"].hasOwnProperty(val)) {
                model.addError(attribute, options["message"]);
            }
        }
    }
}

