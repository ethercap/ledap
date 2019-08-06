import * as lodash from 'lodash';
import Column from '../../../../widgets/Column';

export default {
    name: 'grid',
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
            default() {return [];},
        },
        dataProvider: {
            type: Object,
            required: true,
        },
        labelOptions: {
            type: Object,
            default() {
                return {};
            },
        },
        contentOptions: {
            type: Object,
            default() {
                return {};
            },
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
                            dataProvider: _this.dataProvider,
                        };
                    },
                    methods: {
                        sort(attr) {
                            _this.dataProvider.toggleSort(attr);
                            if (typeof (_this.dataProvider.refresh) === 'function') {
                                _this.dataProvider.refresh();
                            } else {
                                _this.dataProvider.localSort();
                            }
                        },
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
                    attrs: {
                        width: column.width,
                    },
                }));
                let label = column.getLabel(model, createElement);
                if (column.useSort && typeof (column.label) === 'string' && column.attribute) {
                    column.labelFormat = 'html';
                    let arrow = '';
                    if (this.dataProvider.isSortAsc(column.attribute)) {
                        arrow = '&#8679;';
                    } else if (this.dataProvider.isSortDesc(column.attribute)) {
                        arrow = '&#8681;';
                    }
                    label = '<a @click="sort(\'' + column.attribute + '\')">' + label + arrow + '</a>';
                }
                const obj = {
                    value: label,
                    model,
                    index: null,
                    column,
                };
                if (this.$scopedSlots.label) {
                    headers.push(this.$scopedSlots.label(obj));
                } else {
                    headers.push(createElement('th', {
                        attrs: lodash.get(column.labelOptions, 'attrs', {}),
                        style: lodash.get(column.labelOptions, 'style', {}),
                        class: lodash.get(column.labelOptions, 'class', {}),
                    }, [
                        this.getValue(obj, column.labelFormat, createElement),
                    ]));
                }
            }
        }
        const contents = [];
        const tbody = [];
        for (const i in this.dataProvider.models) {
            model = this.dataProvider.models[i];
            const tempArr = [];
            for (const j in this.nColumns) {
                const column = this.nColumns[j];
                if (column.visible) {
                    const obj = {
                        value: column.getValue(model, i, createElement),
                        model,
                        index: i,
                        column,
                    };
                    if (this.$scopedSlots.default) {
                        tempArr.push(this.$scopedSlots.default(obj)); 
                    } else {
                        tempArr.push(createElement('td', {
                            attrs: lodash.get(column.contentOptions, 'attrs', {}),
                            style: lodash.get(column.contentOptions, 'style', {}),
                            class: lodash.get(column.contentOptions, 'class', {}),
                        }, [
                            this.getValue(obj, column.format, createElement),
                        ]));
                    }
                }
            }
            tbody.push(createElement('tr', tempArr));
        }

        const propsObj = {
            dataProvider: this.dataProvider,
            columns: this.columns,
        };
        if (this.$scopedSlots.header) {
            contents.push(this.$scopedSlots.header(propsObj));
        } else {
            contents.push(createElement('colgroup', colgroups));
            contents.push(createElement('thead', [createElement('tr', headers)]));
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
