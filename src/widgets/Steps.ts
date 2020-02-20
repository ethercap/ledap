import BaseGroup from './BaseGroup';

// steps是一种特殊组件，只允许顺序选择，栈的模式
export default class Steps extends BaseGroup {
    // 默认模式为unstrict, 出现错误会自己处理，strict模式会throw出错误，交给上层处理
    public mode = 'unstrict';

    // 组件需要id
    public _components = [];
    public _currentIndex = 0;

    public add(component: any) {
        if (!this.isValid(component)) {
            return false;
        }
        this._components.push(component);
        return true;
    }

    public init() {
        // 先将所有的清空，走到当前步骤(防止有些组件不合规范的错乱)
        const step = this._currentIndex;
        this._components.forEach(component => {
            component.close();
        });
        this._currentIndex = 0;
        this.forward(step);
    }

    public next() {
        return this.forward(1);
    }

    public prev() {
        return this.backward(1);
    }

    // 获取当前到component的步数
    public getStep(component: any) {
        let index = -1;
        Object.keys(this._components).forEach(i => {
            if (component === this._components[i]) {
                index = parseInt(i, 10);
                return;
            }
        });
        // 假设没有找到,则不跳转，因此step = 0
        if (index === -1) {
            return 0;
        }
        return index - this.currentIndex;
    }

    // 判断步骤是否有效
    public _validateIndex(index) {
        if (index >= this._components.length || index < 0) return false;
        return true;
    }

    // 向前走step步
    public forward(step: number = 1) {
        if (step < 0) {
            return this.backward(-1 * step);
        }
        const index = this._currentIndex + step;
        // if (index > this._components.length) {
        //     if (this.mode === 'strict') {
        //         throw new Error('不能走到该步');
        //     }
        //     return false;
        // }
        let i;
        for (i = this._currentIndex; i <= index; i++) {
            const component = this._components[i];
            component.open();
        }
        // 此处不用index是因为调用的用户如果传的step为float可能不正确
        this._currentIndex = i;
    }

    // 向后走step步
    public backward(step: number = 1) {
        if (step <= 0) {
            return this.forward(-1 * step);
        }
        const index = this._currentIndex - step;
        // if (index < 0) {
        //     if (this.mode === 'strict') {
        //         throw new Error('不能走到该步');
        //     }
        //     return false;
        // }
        let i;
        for (i = this._currentIndex; i > index; i--) {
            const component = this._components[i];
            component.close();
        }
        this._currentIndex = i;
    }

    get currentIndex(): number {
        return this._currentIndex;
    }

    set currentIndex(index: number) {
        if (!this._validateIndex(index)) {
            if (this.mode === 'strict') {
                throw new Error('不能走到该步');
            }
            return;
        }
        this._currentIndex = index;
        this.init();
    }
}
