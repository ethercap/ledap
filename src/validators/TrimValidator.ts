import * as lodash from 'lodash';
import Model from '../base/Model';
import Validator from './Validator';

export default class TrimValidator extends Validator {
    public allowTypes = ['string'];
    public validateAttribute(model: Model): boolean {
        const ret = super.validateAttribute(model);
        if (!ret) {
            return ret;
        }
        const attribute = this.attribute;
        model[attribute] = lodash.trim(model[attribute]);
        return true;
    }
}
