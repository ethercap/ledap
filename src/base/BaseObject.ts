import Event from './Event';

export default class BaseObject {
    public _event = null;

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

    public isHideKey(key: string) {
        if (key.substr(0, 1) === '_') {
            return true;
        }
        if (typeof (this[key]) === 'function') {
            return true;
        }
        return false;
    }

    public init() {
        Object.getOwnPropertyNames(this).forEach(key => {
            if (this.isHideKey(key)) {
                const property = Object.getOwnPropertyDescriptor(this, key);
                if (property && property.configurable === false) {
                    return;
                }
                if (!property) {
                    return;
                }
                property['enumerable'] = false;
                Object.defineProperty(this, key, property);
            }
        });
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
        Event.emit(name, ...args);
    }
}
