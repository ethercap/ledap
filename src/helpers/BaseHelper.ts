import * as lodash from 'lodash';

export default class BaseHelper {

    public static isEmpty(value: any) {
        const valueType = typeof (value);
        if (valueType === 'boolean' || valueType === 'number') {
            return !value;
        }
        if (valueType === 'function') {
            return true;
        }
        return lodash.isEmpty(value);
    }
}
