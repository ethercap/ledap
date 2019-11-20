import * as lodash from 'lodash';
export default class BaseHelper {

    // 用来判断输入是否为空
    public static isEmpty(value: any) {
        if (value === '' || value === null || value === undefined) {
            return true; 
        }
        if (lodash.isArray(value) && value.length === 0) {
            return true;
        }
        return false;
    }
}
