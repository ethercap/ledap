/**
 * 事件
 */
export default class Event {
    /** 监听数组 */
    private static listeners = {};
 
    /** 
     * 注册事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public static on(name: string, callback: Function, context: any) {
        let observers: Observer[] = Event.listeners[name];
        if (!observers) {
            Event.listeners[name] = [];
        }
        Event.listeners[name].push(new Observer(callback, context));
    }

    public static once(name:string, callback:Function, context:any) {
        let on = function(context){
            Event.off(name, on, context);
            callback.apply(context);
        }
        return Event.on(name, on, context);
    }
 
    /**
     * 移除事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public static off(name: string, callback: Function, context: any) {
        let observers: Observer[] = Event.listeners[name];
        if (!observers) return;
        let length = observers.length;
        for (let i = 0; i < length; i++) {
            let observer = observers[i];
            if (observer.compar(context)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete Event.listeners[name];
        }
    }
 
    /**
     * 发送事件
     * @param name 事件名称
     */
    public static emit(name: string, ...args: any[]) {
        let observers: Observer[] = Event.listeners[name];
        if (!observers) return;
        let length = observers.length;
        for (let i = 0; i < length; i++) {
            let observer = observers[i];
            observer.notify(name, ...args);
        }
    }
}
 
/**
 * 观察者
 */
class Observer {
    /** 回调函数 */
    private callback: Function = null;
    /** 上下文 */
    private context: any = null;
 
    constructor(callback: Function, context: any) {
        let self = this;
        self.callback = callback;
        self.context = context;
    }
 
    /**
     * 发送通知
     * @param args 不定参数
     */
    public notify(...args: any[]): void {
        let self = this;
        self.callback.call(self.context, ...args);
    }
 
    /**
     * 上下文比较
     * @param context 上下文
     */
    public compar(context: any): boolean {
        return context == this.context;
    }
}

