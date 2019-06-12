import * as lodash from 'lodash';
import Event from './Event';

export default class BaseObject {
    private _event = null;

    public getEvent(): Event {
        if (!this._event) {
            this._event = new Event();
        }
        return this._event;
    }

    public load(data: object = {}) {
        Object.keys(data).forEach(key => {
            this[key] = data[key];
        });
        this.init();
        return this;
    }

    public clone(deep: Boolean = false) {
        let obj;
        if (deep) {
            obj = lodash.clone(this);
        } else {
            obj = lodash.cloneDeep(this);
        }
        // 无法clone不可编历的属性
        Object.getOwnPropertyNames(this).forEach(key => {
            if (this.isHideKey(key)) {
                obj[key] = this[key];
            }
        });
        obj.init();
        return obj;
    }

    public isHideKey(key: string) {
        if (key.substr(0, 1) === '_') {
            return true;
        }
        if (typeof(this[key]) === 'function') {
            return true;
        }
        return false;
    }

    public init() {
        for (const key in this) {
            if (this.isHideKey(key)) {
                Object.defineProperty(this, key, {
                    enumerable: false,
                    value: this[key],
                    configurable: true,
                    writable: true,
                });
            }
        }
    }

    public on(name: string, callback: Function, context: any = null) {
        this.getEvent().on(name, callback, context);
    }

    public once(name: string, callback: Function, context: any = null) {
        this.getEvent().once(name, callback, context);
    }

    public off(name: string, callback: Function, context: any = null) {
        this.getEvent().off(name, callback, context);
    }

    public emit(name: string, ...args: any[]) {
        this.getEvent().emit(name, ...args);
    }
}
