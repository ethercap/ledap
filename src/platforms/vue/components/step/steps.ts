import Steps from '../../../../widgets/Steps';

export default {
    name: 'steps',
    props: {
        lists: {
            type: Array,
            required: true
        },
        currentIndex: {
            default: 0,
            required: true
        },
        tag: {
            type: String,
            default: 'div',
        },
        mode: {
            type: String,
            default: 'unstrict',
        }
    },
    data() {
        return {
            steps: null
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.init();
        });
    },
    watch: {
        currentIndex(newIndex) {
            this.steps.currentIndex = newIndex;
        },
    },
    methods: {
        init() {
            this.steps = new Steps(),
            this.steps.mode = this.mode;
            this.steps.addList(this.$children);
            this.steps.currentIndex = this.currentIndex;
        }
    },
    template: `<component :is="tag">
        <slot v-for="(step, index) in lists" :data-key="index" :step="step">
            <step :canClose="false" :data-key="index" :key="index">{{step.name}}</step>
        </slot>
    </component>`,
    depends: ['step'],
};
