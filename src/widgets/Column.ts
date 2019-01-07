import BaseObject from "../base/BaseObject";
import Model from "../base/Model";
import * as lodash from "lodash"; 

export default class Column extends BaseObject
{
    public attribute:string;
    public label:string|Function;
    public format:string="text";
    public labelFormat:string="text";
    //默认不可sort
    public useSort:number = 0;
    public value:string|Function;
    //是否可见
    public visible:boolean;
    public headOptions:object;
    public contentOptions:object;

    // 上层容器，可能是vm或者其它组件
    private container:any;

    public getValue(model:Model, index:number, createElement:any=null):any
    {
        if(typeof(this.value) == 'function') {
            return this.value.call(this.container, model, this.attribute, index+1, createElement);
        }
        if(!lodash.isEmpty(this.value)) {
            return this.value;
        } 
        return model[this.attribute];
    }
    
    public getLabel(model:Model, createElement:any=null):string
    {
        if(typeof(this.label) == "function") {
            return this.label.call(this.container, model, this.attribute, 0, createElement);
        }
        if(!lodash.isEmpty(this.label)) {
            return this.label;
        }
        return model.getAttributeLabel(this.attribute)
    }

    public static normalizeColumns(columns:Array<any> = [], container:any=null):Array<Column>
    {
        let fColumns = [];
        for(let index in columns) {
            let column = columns[index];
            if(column == null) {
                throw "column can't be null";
            }
            if(typeof(column) == "string") {
                column = {
                    attribute : column,
                };
            }
            if(typeof(column) != "object") {
                throw "column must be object or string";
            }
            if(!column.hasOwnProperty("attribute") && !column.hasOwnProperty("value")) {
                throw "column must has an attribute key or value";
            }
            if(!column.hasOwnProperty("labelFormat")) {
                column.labelFormat = "text";
            }
            if(!column.hasOwnProperty("format")) {
                column.format = "text";
            }
            let cModel = new Column();
            cModel.load(column);
            cModel.container = container;
            fColumns.push(cModel);
        }
        return fColumns;
    }
}
