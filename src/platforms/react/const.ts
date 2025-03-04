// 表单校验时机
export const FormValidateEvent = {
    input:'input',//输入时
    blur:'blur',//失去焦点时
    focus:'focus'//获取焦点时
}

export type FormValidateEventTypes = 'input' | 'blur' | 'focus'