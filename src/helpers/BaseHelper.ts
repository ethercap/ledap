import * as lodash from 'lodash';

export default class BaseHelper {

    public static isEmpty(value: any) {
        const valueType = typeof (value);
        if (valueType === 'boolean' || valueType === 'number') {
            return false;
        }
        if (valueType === 'function') {
            return true;
        }
        return lodash.isEmpty(value);
    }
}
