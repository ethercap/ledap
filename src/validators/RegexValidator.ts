import Model from '../base/Model';
import Validator from './Validator';

export default class RegexValidator extends Validator {
    public template = '格式不正确';
    public allowTypes = ['string'];
    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const attribute = this.attribute;
        const options: any = this.options;
        const value = model[attribute];

        if (!options.not && !options.pattern.test(value) || options.not && options.pattern.test(value)) {
            model.addError(attribute, options.message);
            return false;
        }
        return true;
    }
}
