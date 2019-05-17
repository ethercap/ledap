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
    },
    computed: {
        nColumns() {
            return Column.normalizeColumns(this.columns, this);
        },
    },
    methods : {
        getValue(value, format, createElement) {
            if (format === 'html') {
                return createElement({
                    template: '<div>' + value + '</div>',
                });
            }
            return value;
        },
    },
    render(createElement, context) {
        const colgroups = [];
        colgroups.push(createElement('col', {attrs: {width: this.labelWidth}}));
        colgroups.push(createElement('col', {attrs: {width: 'auto'}}));

        const contents = [];
        contents.push(createElement('colgroup', colgroups));
        const nColumns = this.nColumns;
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
                this.getValue(column.getLabel(this.dataModel, createElement), column.labelFormat, createElement),
            ]));
            tempArr.push(createElement('td', {
                attrs: lodash.get(column.contentOptions, 'attrs', {}),
                style: lodash.get(column.contentOptions, 'style', {}),
                class: lodash.get(column.contentOptions, 'class', {}),
            }, [
                this.getValue(column.getValue(this.dataModel, i, createElement), column.format, createElement),
            ]));

            contents.push(createElement('tr', tempArr));
        }
        return createElement('table', contents);
    },
};
