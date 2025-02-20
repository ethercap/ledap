import lodash from 'lodash'

export default function formatSelectOptions(model,attr){
    const dictOption: any =  lodash.get(model.rules(), [attr, 'dict'], {});
    const listObj = dictOption.list || {}
    const orderObj = dictOption.order || Object.keys(listObj);
    return orderObj.reduce((total,keyItem) => {
        const option = {
            label:listObj[keyItem],
            value: keyItem
        }
        total.push(option)
        return total
    },[])
}