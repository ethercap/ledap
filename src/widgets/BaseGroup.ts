import BaseObject from "../base/BaseObject";

interface GroupItemInterface {
    open(),
    close(),
    isOpen(),
}


export default abstract class BaseGroup extends BaseObject
{
    abstract add(component:any):boolean;
    abstract init();
    
    public addList(components:Array<any>) 
    {
        for(const i in components) {
            let component = components[i];
            this.add(component);
        }
        this.init();
    }
    
    public isValid(component:any):boolean 
    {
        //component必须存在方法 open, close，本处接口由代码来实现。
        if(!component.hasOwnProperty("open") && !component.hasOwnProperty("close") && !component.hasOwnProperty("isOpen")) {
            return false;
        }
        if(typeof component["open"] != "function") {
            return false;
        }
        if(typeof component["close"] != "function") {
            return false;
        }
        if(typeof component['isOpen'] != "function") {
            return false;
        }
        return true;  
    }
}
