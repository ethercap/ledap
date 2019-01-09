import Column from "../../../widgets/Column"
export default {
    name : 'grid',
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
         *          'value' : function(model, attribute, index) {
         *              return '<p>' + model.name + '</p>';
         *          },
         *          format : 'raw',
         *      },
         *
         *  ]
         **/
        columns:{
            type: Array,
            default : function() {return [];},
        },
        dataProvider:{
            type: Object,
            required : true,
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
            return Column.normalizeColumns(this.columns);
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
    render: function (createElement) {
        let colgroups = [];
        let headers = [];
        let model = null;
        if(this.dataProvider.models.length > 0) { 
            model = this.dataProvider.models[0];
        }else {
            model = new this.dataProvider.modelClass();
        }
        
        for(const index in this.nColumns) {
            let column =  this.nColumns[index];
            colgroups.push(createElement("col"));
            headers.push(createElement("th", {}, [
                this.getValue(column.getLabel(model, createElement), column.labelFormat, createElement),
            ]));
        }
        let contents = [];
        contents.push(createElement("colgroup", colgroups));
        contents.push(createElement("tr", headers));
        for(const i in this.dataProvider.models) {
            let model = this.dataProvider.models[i];
            let tempArr = [];
            for(const j in this.nColumns) {
                let column = this.nColumns[j];
                tempArr.push(createElement("td", {"attrs": this.contentOptions}, [
                    this.getValue(column.getValue(model, i, createElement), column.format, createElement),
                ]));
            }
            contents.push(createElement("tr", tempArr));
        }
        return createElement("table", contents);
    },
};
