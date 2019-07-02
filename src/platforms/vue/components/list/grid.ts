import * as lodash from 'lodash';
import Column from '../../../../widgets/Column';

export default {
    name : 'grid',
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
         *          'value' : function(model, attribute, index) {
         *              return '<p>' + model.name + '</p>';
         *          },
         *          format : 'raw',
         *      },
         *
         *  ]
         */
        columns: {
            type: Array,
            default() {return []; },
        },
        dataProvider: {
            type: Object,
            required : true,
        },
        labelOptions : {
            type: Object,
            default() {
                return {};
            },
        },
        contentOptions : {
            type : Object,
            default() {
                return {};
            },
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
                        };
                    },
                    template: '<div>' + obj.value + '</div>',
                });
            }
            return obj.value;
        },
    },
    render(createElement) {
        const colgroups = [];
        const headers = [];
        let model = null;
        if (this.dataProvider.models.length > 0) {
            model = this.dataProvider.models[0];
        } else {
            model = new this.dataProvider.modelClass();
        }

        for (const index in this.nColumns) {
            const column =  this.nColumns[index];
            if (column.visible) {
                colgroups.push(createElement('col', {
                    attrs : {
                        width: column.width,
                    },
                }));
                headers.push(createElement('th', {
                    attrs: lodash.get(column.labelOptions, 'attrs', {}),
                    style: lodash.get(column.labelOptions, 'style', {}),
                    class: lodash.get(column.labelOptions, 'class', {}),
                }, [
                    this.getValue({
                        value: column.getLabel(model, createElement),
                        model: null,
                        index: null,
                        column,
                    }, column.labelFormat, createElement),
                ]));
            }
        }
        const contents = [];
        contents.push(createElement('colgroup', colgroups));
        contents.push(createElement('thead', [createElement('tr', headers)]));
        const tbodys = [];
        for (const i in this.dataProvider.models) {
            model = this.dataProvider.models[i];
            const tempArr = [];
            for (const j in this.nColumns) {
                const column = this.nColumns[j];
                if (column.visible) {
                    tempArr.push(createElement('td', {
                        attrs: lodash.get(column.contentOptions, 'attrs', {}),
                        style: lodash.get(column.contentOptions, 'style', {}),
                        class: lodash.get(column.contentOptions, 'class', {}),
                    }, [
                        this.getValue({
                            value: column.getValue(model, i, createElement),
                            model,
                            index: i,
                            column,
                        }, column.format, createElement),
                    ]));
                }
            }
            tbodys.push(createElement('tr', tempArr));
        }
        contents.push(createElement('tbody', tbodys));
        return createElement('table', contents);
    },
};
