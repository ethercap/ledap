import * as lodash from 'lodash';
import BaseGroup from './BaseGroup';
// group组件组
export default class Group extends BaseGroup {
    public static EVENT_DATACHANGED = 'GROUP_CHANGED';
    public _max: number = 1;
    public excludes = [];
    // 默认模式为unstrict, 出现错误会自己处理，strict模式会throw出错误，交给上层处理
    public mode = 'unstrict';

    private _selected = [];
    private _components = {};

    public add(component: any): boolean {
        if (!this.isValid(component)) {
            return false;
        }
        let key;
        if (component.hasOwnProperty('groupKey') && component.groupKey !== null ) {
            key = component.groupKey;
        } else {
            const keys = lodash.keys(this._components);
            key = keys.length + '';
        }
        this._components[key] = component;
        return true;
    }

    // 初始化,将所有的参数都归位
    public init() {
        Object.keys(this._components).forEach(i => {
            const component = this._components[i];
            const key = this.getKey(component);
            if (component.isOpen() && this._selected.indexOf(key) < 0) {
                // 如果组件是打开的，但是要求关闭，则将其关闭
                component.close();
                this.toggle('close', component);
            }
            if (!component.isOpen() && this._selected.indexOf(key) > -1) {
                component.open();
                this.toggle('open', component);
            }
        });
    }

    public toggle(type: string, component: any) {
        const key = this.getKey(component);
        if (key === null) {
            return false;
        }
        if (type === 'open') {
            return this.select(key);
        }
        return this.unSelect(key);
    }

    public unSelect(key: string|number) {
        // 如果已经是未选中了，直接返回
        const index = this._selected.indexOf(key);
        if (index < 0) {
            return true;
        }
        this._selected.splice(index, 1);
        this.emit(Group.EVENT_DATACHANGED, this, {group: this, type:'close'});
        return true;
    }

    public getKey(component: any) {
        let index = null;
        Object.keys(this._components).forEach(i => {
            if (this._components[i] === component) {
                index = i;
                return;
            }
        });
        return index;
    }

    // 选中某个组件
    public select(key: string) {
        if (!this._components.hasOwnProperty(key)) {
            return false;
        }
        const component = this._components[key];
        // 若已经被选中，则直接返回
        if (this._selected.indexOf(key) > -1) {
            return true;
        }
        if (this.excludes.indexOf(key) > -1) {
            component.close();
            if (this.mode === 'strict') {
                throw new Error('该选项不可选');
            }
            return false;
        }
        if (this._selected.length + 1 > this.max && this.max > 1 && this.mode === 'strict') {
            component.close();
            throw new Error('最多只允许选择' + this.max + '项');
        }
        // 选中时,把当前的组件push，然后根据情况pop
        this._selected.push(key);
        if (this._selected.length > this.max) {
            const closeKey = this._selected.shift();
            if (this._components.hasOwnProperty(closeKey)) {
                this._components[closeKey].close();
            }
        }
        this.emit(Group.EVENT_DATACHANGED, this, {group: this, type:'open'});
        return true;
    }

    get selected(): any {
        return this._selected;
    }
    set selected(value: any) {
        if (typeof value === 'string') {
            this._selected = [value];
        }
        if (typeof value === 'number') {
            this._selected = [value + ''];
        }
        if (typeof value === 'object') {
            this._selected = value;
        }
        this.init();
    }

    get max(): number {
        return this._max;
    }

    set max(value: number) {
        if (value < 1) {
            this._max = 1;
            return;
        }
        this._max = lodash.ceil(value);
        while (this._selected.length > this._max) {
            this._selected.pop();
        }
        this.init();
    }

    public getSelectComponent() {
        const arr = this.selected;
        const tempArr = [];
        Object.keys(arr).forEach(i => {
            if (this._components.hasOwnProperty(i)) {
                tempArr.push(this._components[i]);
            }
        });
        return tempArr;
    }
}
