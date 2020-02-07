import * as lodash from 'lodash';
export default class BaseHelper {

    // 用来判断输入是否为空
    public static isEmpty(value: any) {
        // 包含对象和数组
        if (lodash.isObject(value)) {
            return lodash.isEmpty(value);
        }
        if (value === undefined || value === '' || value === null) return true;
        return false;
    }
}
