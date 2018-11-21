import Event from "./Event";

export default class BaseObject
{
    constructor()
    {
        this.init(); 
    }
    
    public load(data:object) 
    {
        for (var key in data) {
            this[key] = data[key];
        }
        this.init();
    }
    
    public init() 
    {
        for (var key in this) {
            if (key.substr(0, 1) == '_') {
                Object.defineProperty(this, key, {
                    enumerable: false,
                    value: this[key],
                    configurable:true,
                    writable:true,
                });
            }
            if (typeof(this[key]) === 'function') {
                Object.defineProperty(this, key, {
                    enumerable: false,
                    value: this[key],
                    configurable:true,
                    writable:true
                });
            }
        }
    }
    
    public on(name: string, callback: Function, context: any = null) 
    {
        Event.on(name, callback, context);
    }
    
    public once(name: string, callback: Function, context: any = null) 
    {
        Event.once(name, callback, context);
    }

    public off(name: string, callback: Function, context: any = null) 
    {
        return Event.off(name, callback, context);
    }
    
    public emit(name: string, ...args: any[]) 
    {
        Event.emit(name, ...args); 
    }
}