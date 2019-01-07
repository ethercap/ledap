import Group from "../../../widgets/Group"

export default {
    name : 'group',
    props:{
        "tag" : {
            type: String,
            default : "div", 
        },
        "multiple" : {
            type : Boolean, 
            default : false,
        },
        "max" : {
            type: Number,
            default : 1,
        },
        "excludes" : {
            type: Array,
            default : function(){
                return [];
            },
        },
        "mode" : {
            type: String,
            default: "unstrict",
        },
        initValue : {
            default : 0,
        },
    },
    data:function(){
        return {
            selected : this.initValue, 
        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.init();
        });
    },
    computed: {
    },
    watch: {
        'multiple' : function(){this.init();},
        'max': function(){ this.init(); },
        'mode': function(){ this.init(); },
        'excludes': function(){ this.init(); },
    },
    methods : {
        init : function(){
            this.group = new Group();
            this.group.max = this.multiple ? this.max : 1;
            this.group.excludes = this.excludes;
            this.group.mode = this.mode;
            this.group.addList(this.$children);
            for(const i in this.$children) {
                let vm = this.$children[i];
                let _this = this;
                vm.$on("toggle", function(obj){
                    _this.change(obj); 
                });
            }
            this.group.selected = this.selected;
            this.setSelected();
        },
        change : function(obj){
            this.group.toggle(obj["type"], obj["vm"]);
            this.setSelected();
            this.$emit("change", this.selected);
        },
        setSelected : function(){
            let selected = this.group.selected;
            if(this.multiple) {
                this.selected = selected;
            } else {
                this.selected = selected.length > 0 ? selected[0] : null; 
            }
        }
    },
    template : `<component :is="tag"><slot></slot></component>`,
};
