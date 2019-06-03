/**
 * 字符串处理函数
 */
export default class StringHelper {

    // 将一个字符串转化为正则
    public static toRegExp(str: string) {
        let from = str.indexOf('/');
        from = from < 0 ? 0 : from + 1;
        let to = str.lastIndexOf('/');
        if (to < from) {
            to = str.length;
        }
        const pattern = str.slice(from, to);
        let attributes = '';
        if (to < str.length) {
            attributes = str.slice(to + 1);
        }
        const reg =  new RegExp(pattern, attributes);
        return reg;
    }
}
