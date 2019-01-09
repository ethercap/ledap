import * as lodash from 'lodash';
import Model from '../base/Model';
import Validator from './Validator';

export default class TrimValidator extends Validator {
    public validateAttribute(model: Model): void {
        const attribute = this.attribute;
        model[attribute] = lodash.trim(model[attribute]);
    }
}
