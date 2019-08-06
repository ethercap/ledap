/**
 * 观察者
 */
class Observer {
    /** 回调函数 */
    public callback: Function = null;
    /** 上下文 */
    public context: any = null;

    constructor(callback: Function, context: any) {
        this.callback = callback;
        this.context = context;
    }

    /**
     * 发送通知
     * @param args 不定参数
     */
    public notify(...args: any[]): void {
        this.callback.apply(this.context, args);
    }

    /**
     * 上下文比较
     * @param context 上下文
     */
    public compare(callback: Function, context: any): boolean {
        return context === this.context && callback === this.callback;
    }
}

/**
 * 事件
 */
export default class Event {
    public static instance = null;

    public static getInstance() {
        if (Event.instance) {
            return Event.instance;
        }
        Event.instance = new Event();
        return Event.instance;
    }
    public static once(name: string, callback: Function, context: any) {
        Event.getInstance().once(name, callback, context);
    }

    public static off(name: string, callback: Function, context: any) {
        Event.getInstance().off(name, callback, context);
    }

    public static emit(name: string, ...args: any[]) {
        Event.getInstance().emit(name, ...args);
    }

    public static on(name: string, callback: Function, context: any) {
        Event.getInstance().on(name, callback, context);
    }

    /** 监听数组 */
    public  listeners = {};

    public once(name: string, callback: Function, context: any) {
        if (typeof callback !== 'function') return;

        const on = (...args) => {
            this.off(name, on, context);
            callback.apply(context, args);
        };

        return this.on(name, on, context);
    }

    /**
     * 移除事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public off(name: string, callback: Function, context: any) {
        // 未制定name则清空所有事件
        if (typeof name === 'undefined') {
            this.listeners = {};
            return;
        }

        const observers: Observer[] = this.listeners[name];
        if (!observers) return;

        // 未指定callback则清空所有回调
        if (typeof callback !== 'function') {
            this.listeners[name] = [];
        } else {
            const length = observers.length;
            for (let i = 0; i < length; i++) {
                const observer = observers[i];
                if (observer.compare(callback, context)) {
                    observers.splice(i, 1);
                    break;
                }
            }
        }

        if (!observers.length) {
            delete this.listeners[name];
        }
    }

    /**
     * 发送事件
     * @param name 事件名称
     */
    public emit(name: string, ...args: any[]) {
        if (typeof name === 'undefined') return;
        const observers: Observer[] = this.listeners[name];
        if (!observers) return;

        const length = observers.length;
        for (let i = 0; i < length; i++) {
            const observer = observers[i];
            observer.notify(...args);
        }
    }

    /**
     * 注册事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public on(name: string, callback: Function, context: any) {
        if (typeof callback !== 'function') return;

        let observers: Observer[] = this.listeners[name];
        if (!observers) {
            this.listeners[name] = observers = [];
        }

        const length = observers.length;
        for (let i = 0; i < length; i++) {
            const observer = observers[i];
            if (observer.compare(callback, context)) return;
        }

        this.listeners[name].push(new Observer(callback, context));
    }
}
