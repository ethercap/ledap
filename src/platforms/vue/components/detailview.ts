import Column from "../../../widgets/Column"
export default {
    name : 'detail-view',
    props:{
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
         **/
        columns:{
            type: Array,
            default : function() { return [];},
        },
        dataModel:{
            type: Object,
            required: true,
        },
        labelWidth : {
            type: String,
            default : "20%",
        },
        labelOptions : {
            type: Object,
            default: function(){
                return {};
            },
        },
        contentOptions :{
            type : Object,
            default : function(){
                return {};
            },
        }
    },
    computed: {
        nColumns : function(){
            return Column.normalizeColumns(this.columns, this);
        }  
    },
    methods : {
        getValue : function(value, format, createElement) {
            if(format == "html") {
                return createElement({
                    template: '<div>' + value + '</div>',
                });
            }
            return value;
        }
    },
    render: function (createElement, context) {
        let colgroups = [];
        colgroups.push(createElement("col", {"attrs": {"width":this.labelWidth}}));
        colgroups.push(createElement("col", {"attrs":{"width":"auto"}}));
        
        let contents = [];
        contents.push(createElement("colgroup", colgroups));
        let nColumns = this.nColumns;
        for(const i in nColumns) {
            let column = nColumns[i];
            let tempArr = [];
            tempArr.push(createElement("td", {"attrs": this.labelOptions}, [
                this.getValue(column.getLabel(this.dataModel, createElement), column.labelFormat, createElement),
            ]));
            tempArr.push(createElement("td", {"attrs": this.contentOptions}, [
                this.getValue(column.getValue(this.dataModel, i, createElement), column.format, createElement),
            ]));
            
            contents.push(createElement("tr", tempArr));
        }
        return createElement("table", contents);
    },
};
