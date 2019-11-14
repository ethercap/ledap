import Model from '../base/Model';
import Validator from './Validator';

export default class FnValidator extends Validator {
    public fn: any; 
    
    constructor(attribute: string, fn: any, options: object) {
        super(attribute, 'function', options);
        this.fn = fn;
    }

    public validateAttribute(model: Model): boolean {
        return this.fn.call(model, this.options, this.attribute);
    }
}
