import BaseObject from '../base/BaseObject';

interface IGroupItemInterface {
    open();
    close();
    isOpen();
}

export default abstract class BaseGroup extends BaseObject {
    public abstract add(component: any): boolean;
    public abstract init();

    public addList(components: any[]) {
        for (const i in components) {
            const component = components[i];
            this.add(component);
        }
        this.init();
    }

    public isValid(component: any): boolean {
        // component必须存在方法 open, close，本处接口由代码来实现。
        if (!component.hasOwnProperty('open') && !component.hasOwnProperty('close') && !component.hasOwnProperty('isOpen')) {
            return false;
        }
        if (typeof component.open !== 'function') {
            return false;
        }
        if (typeof component.close !== 'function') {
            return false;
        }
        if (typeof component.isOpen !== 'function') {
            return false;
        }
        return true;
    }
}
