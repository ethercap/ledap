import Group from '../../../widgets/Group';

export default {
    name : 'group',
    props: {
        tag : {
            type: String,
            default : 'div',
        },
        multiple : {
            type : Boolean,
            default : false,
        },
        max : {
            type: Number,
            default : 1,
        },
        excludes : {
            type: Array,
            default() {
                return [];
            },
        },
        mode : {
            type: String,
            default: 'unstrict',
        },
        initValue : {
            default : 0,
        },
    },
    data() {
        return {
            selected : this.initValue,
        };
    },
    mounted() {
        this.$nextTick(function() {
            this.init();
        });
    },
    computed: {
    },
    watch: {
        multiple() {this.init(); },
        max() { this.init(); },
        mode() { this.init(); },
        excludes() { this.init(); },
    },
    methods : {
        init() {
            this.group = new Group();
            this.group.max = this.multiple ? this.max : 1;
            this.group.excludes = this.excludes;
            this.group.mode = this.mode;
            this.group.addList(this.$children);
            for (const i in this.$children) {
                const vm = this.$children[i];
                const _this = this;
                vm.$on('toggle', (obj) => {
                    _this.change(obj);
                });
            }
            this.group.selected = this.selected;
            this.setSelected();
        },
        change(obj) {
            this.group.toggle(obj.type, obj.vm);
            this.setSelected();
            this.$emit('change', this.selected);
        },
        setSelected() {
            const selected = this.group.selected;
            if (this.multiple) {
                this.selected = selected;
            } else {
                this.selected = selected.length > 0 ? selected[0] : null;
            }
        },
    },
    template : `<component :is="tag"><slot></slot></component>`,
};
