import * as lodash from 'lodash';
import BaseObject from '../base/BaseObject';
import Model from '../base/Model';

export default class Column extends BaseObject {

    public static normalizeColumns(columns: any[] = [], container: any= null): Column[] {
        const fColumns = [];
        Object.keys(columns).forEach((index) => {
            let column = columns[index];
            if (column == null) {
                throw new Error('column can\'t be null');
            }
            if (typeof(column) === 'string') {
                column = {
                    attribute : column,
                };
            }
            if (typeof(column) !== 'object') {
                throw new Error('column must be object or string');
            }
            if (!column.hasOwnProperty('attribute') && !column.hasOwnProperty('value')) {
                throw new Error('column must has an attribute key or value');
            }
            if (!column.hasOwnProperty('labelFormat')) {
                column.labelFormat = 'text';
            }
            if (!column.hasOwnProperty('format')) {
                column.format = 'text';
            }
            const cModel = new Column();
            cModel.load(column);
            cModel.container = container;
            fColumns.push(cModel);
        });
        return fColumns;
    }
    public attribute: string;
    public label: string|Function;
    public format: string = 'text';
    public labelFormat: string = 'text';
    // 默认不可sort
    public useSort: number = 0;
    public value: string|Function;
    // 是否可见
    public visible: boolean = true;
    public width: string = 'auto';
    public headOptions: object = {};
    public contentOptions: object = {};

    // 上层容器，可能是vm或者其它组件
    private container: any;

    public getValue(model: Model, index: string, createElement: any= null): any {
        if (typeof(this.value) === 'function') {
            return this.value.call(this.container, model, this.attribute, parseInt(index, 10) + 1, createElement);
        }
        if (!lodash.isEmpty(this.value)) {
            return this.value;
        }
        return model[this.attribute];
    }

    public getLabel(model: Model, createElement: any= null): string {
        if (typeof(this.label) === 'function') {
            return this.label.call(this.container, model, this.attribute, 0, createElement);
        }
        if (!lodash.isEmpty(this.label)) {
            return this.label;
        }
        return model.getAttributeLabel(this.attribute);
    }
}
