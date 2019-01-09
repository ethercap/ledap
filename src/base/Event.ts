/**
 * 事件
 */
export default class Event {

    /**
     * 注册事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public static on(name: string, callback: Function, context: any) {
        const observers: Observer[] = Event.listeners[name];
        if (!observers) {
            Event.listeners[name] = [];
        }
        Event.listeners[name].push(new Observer(callback, context));
    }

    public static once(name: string, callback: Function, context: any) {
        const on = (ctx) => {
            Event.off(name, on, ctx);
            callback.apply(ctx);
        };
        return Event.on(name, on, context);
    }

    /**
     * 移除事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public static off(name: string, callback: Function, context: any) {
        const observers: Observer[] = Event.listeners[name];
        if (!observers) { return; }
        const length = observers.length;
        for (let i = 0; i < length; i++) {
            const observer = observers[i];
            if (observer.compare(context)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length === 0) {
            delete Event.listeners[name];
        }
    }

    /**
     * 发送事件
     * @param name 事件名称
     */
    public static emit(name: string, ...args: any[]) {
        const observers: Observer[] = Event.listeners[name];
        if (!observers) { return; }
        const length = observers.length;
        for (let i = 0; i < length; i++) {
            const observer = observers[i];
            observer.notify(name, ...args);
        }
    }
    /** 监听数组 */
    private static listeners = {};
}

/* tslint:disable:max-classes-per-file */

/**
 * 观察者
 */
class Observer {
    /** 回调函数 */
    private callback: Function = null;
    /** 上下文 */
    private context: any = null;

    constructor(callback: Function, context: any) {
        const self = this;
        self.callback = callback;
        self.context = context;
    }

    /**
     * 发送通知
     * @param args 不定参数
     */
    public notify(...args: any[]): void {
        const self = this;
        self.callback.call(self.context, ...args);
    }

    /**
     * 上下文比较
     * @param context 上下文
     */
    public compare(context: any): boolean {
        return context === this.context;
    }
}
