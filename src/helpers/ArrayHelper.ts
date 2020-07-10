export default class ArrayHelper {

    // 对象的key会自动转为字符串，要实现数字格式的key和字符串格式的key是等价的，如groupinput 的 exclude中的判断
    public static hasKey(arr: any[], key: string | number) {
        const numberKey = Number(key);
        const stringKey = String(key);
        let flag = false;
        for (let i = 0, l = arr.length; i < l; i++) {
            if (arr[i] === numberKey || arr[i] === stringKey) {
                flag = true;
                break;
            }
        }
        return flag;
    }
}
