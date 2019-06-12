import * as lodash from 'lodash';
import Column from '../../../widgets/Column';

export default {
    name : 'detail-view',
    props: {
        /**
         *  [
         *      'id',
         *      {
         *          attribute: 'name',
         *          label : '姓名',
         *          labelFormat : 'text',
         *          value : 'lishipeng',
         *          format : 'text',
         *      },
         *      {
         *          attribute: 'phone',
         *      },
         *      {
         *          label: "姓名",
         *          attribute : 'name',
         *          value : function(model, attribute, index) {
         *              return '<p>' + model.name + '</p>';
         *          },
         *          format : 'html',
         *      },
         *
         *  ]
         */
        columns: {
            type: Array,
            default() { return []; },
        },
        dataModel: {
            type: Object,
            required: true,
        },
        labelWidth : {
            type: String,
            default : '20%',
        },
        vm : {
            type : Object,
            default() {
                return this.$parent;
            },
        },
    },
    computed: {
        nColumns() {
            return Column.normalizeColumns(this.columns, this);
        },
    },
    methods : {
        getValue(obj, format, createElement) {
            if (format === 'html') {
                const _this = this;
                return createElement({
                    data() {
                        return {
                            vm : _this.vm,
                            model : obj.model,
                            attribute : obj.column.attribute,
                            value : obj.value,
                            index : obj.index,
                            isLabel : obj.isLabel,
                        };
                    },
                    template: '<div>' + obj.value + '</div>',
                });
            }
            return obj.value;
        },
    },
    render(createElement, context) {
        const colgroups = [];
        colgroups.push(createElement('col', {attrs: {width: this.labelWidth}}));
        colgroups.push(createElement('col', {attrs: {width: 'auto'}}));

        const contents = [];
        contents.push(createElement('colgroup', colgroups));
        const nColumns = this.nColumns;
        const tbody = [];
        for (const i in nColumns) {
            const column = nColumns[i];
            if (!column.visible) {
                continue;
            }
            const tempArr = [];
            tempArr.push(createElement('td', {
                attrs: lodash.get(column.headerOptions, 'attrs', {}),
                style: lodash.get(column.headerOptions, 'style', {}),
                class: lodash.get(column.headerOptions, 'class', {}),
            }, [
                this.getValue({
                    value: column.getLabel(this.dataModel, createElement),
                    model: this.dataModel,
                    index: i,
                    column,
                    isLabel : true,
                }, column.labelFormat, createElement),
            ]));
            tempArr.push(createElement('td', {
                attrs: lodash.get(column.contentOptions, 'attrs', {}),
                style: lodash.get(column.contentOptions, 'style', {}),
                class: lodash.get(column.contentOptions, 'class', {}),
            }, [
                this.getValue({
                    value: column.getValue(this.dataModel, i, createElement),
                    model: this.dataModel,
                    index: i,
                    column,
                    isLabel : false,
                }, column.format, createElement),
            ]));

            tbody.push(createElement('tr', tempArr));
        }
        contents.push(createElement('tbody', tbody));
        return createElement('table', contents);
    },
};
