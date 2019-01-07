export default {
    name : 'tab',
    props:{
        dataKey : {
            type: String,
            default : null,
        },
    },
    data:function(){
        return {
            "status" : false,
            "groupKey" : this.dataKey,
        };
    },
    created: function(){
    },
    methods : {
        open: function(){
            this.status = true;
        },
        close: function() {
            this.status = false;
        },
        isOpen : function() {
            return this.status == true;
        },
        click: function(){
            let type = "open";
            this.open();
            this.$emit("toggle", {
                "type" : type,
                "vm" : this,
            });
        },
    },
    template : `
    <a class="ui-tab" :class="{'active': isOpen()}" @click="click">
        <slot></slot>
   </a>`,
};
