import lodash from 'lodash'

export default function formatSelectOptions(model,attr){
    const dictOption: any =  lodash.get(model.rules(), [attr, 'dict'], {});
    const listObj = dictOption.list || {}
    const { excludes = [] } = dictOption
    const orderObj = dictOption.order || Object.keys(listObj);
    return orderObj.reduce((total,keyItem) => {
        // const disabled = excludes.indexOf(keyItem) > -1
        const disabled = Boolean(excludes.find(i => i == keyItem))
        const option = {
            label:listObj[keyItem],
            value: keyItem,
            disabled
        }
        total.push(option)
        return total
    },[])
}

export function formatDropDownOptions(model,attr){
    const dictOption: any =  lodash.get(model.rules(), [attr, 'dict'], {});
    const listObj = dictOption.list || {}
    const { excludes = [] } = dictOption
    const orderObj = dictOption.order || Object.keys(listObj);
    return orderObj.reduce((total,keyItem) => {
        const disabled = Boolean(excludes.find(i => i == keyItem))
        const option = {
            label:listObj[keyItem],
            key: keyItem,
            disabled
        }
        total.push(option)
        return total
    },[])
}