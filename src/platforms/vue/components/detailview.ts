import * as lodash from 'lodash';
import Column from '../../../widgets/Column';

export default {
    name: 'detail',
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
            default() {return [];},
        },
        model: {
            type: Object,
            required: true,
        },
        labelWidth: {
            type: String,
            default: '20%',
        },
        vm: {
            type: Object,
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
    methods: {
        getValue(obj, format, createElement) {
            if (format === 'html') {
                const _this = this;
                return createElement({
                    data() {
                        return {
                            vm: _this.vm,
                            model: obj.model,
                            attribute: obj.column.attribute,
                            value: obj.value,
                            index: obj.index,
                            isLabel: obj.isLabel,
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
        const nColumns = this.nColumns;
        const tbody = [];
        for (const i in nColumns) {
            const column = nColumns[i];
            if (!column.visible) {
                continue;
            }
            const value = this.getValue({
                value: column.getValue(this.model, i, createElement),
                model: this.model,
                index: i,
                column,
                isLabel: false,
            }, column.format, createElement);
            const label = this.getValue({
                value: column.getLabel(this.model, createElement),
                model: this.model,
                index: i,
                column,
                isLabel: true,
            }, column.labelFormat, createElement);
            if (this.$scopedSlots.default) {
                tbody.push(this.$scopedSlots.default({
                    model: this.model,
                    column,
                    label,
                    value,
                    index: i,
                }));
            } else {
                const tempArr = []; 
                tempArr.push(createElement('td', {
                    attrs: lodash.get(column.headerOptions, 'attrs', {}),
                    style: lodash.get(column.headerOptions, 'style', {}),
                    class: lodash.get(column.headerOptions, 'class', {}),
                }, [label]));
                tempArr.push(createElement('td', {
                    attrs: lodash.get(column.contentOptions, 'attrs', {}),
                    style: lodash.get(column.contentOptions, 'style', {}),
                    class: lodash.get(column.contentOptions, 'class', {}),
                }, [value]));
                tbody.push(createElement('tr', tempArr));
            }
        }
       
        const propsObj = {
            model: this.model,
            columns: this.columns
        };
        if (this.$scopedSlots.header) {
            contents.push(this.$scopedSlots.header(propsObj));
        } else {
            contents.push(createElement('colgroup', colgroups));
        }
        if (this.$scopedSlots.tbody) {
            contents.push(this.$scopedSlots.tbody(propsObj));
        } else {
            contents.push(createElement('tbody', tbody));
        }

        if (this.$scopedSlots.footer) {
            contents.push(this.$scopedSlots.footer(propsObj));
        }
        return createElement('table', contents);
    },
};
