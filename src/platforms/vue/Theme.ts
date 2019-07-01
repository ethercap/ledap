import * as lodash from 'lodash';
import BaseObject from '../../base/BaseObject';
import {default as EtherVue} from './index';

export default class Theme extends BaseObject {
    public static themes = {};

    // 全局的一些配置
    public static getInstance(config: object = {}, key='default') {
        let  theme =  null;
        if (Theme.themes.hasOwnProperty(key)) {
            theme = Theme.themes[key];
        } else {
            theme = new Theme();
            theme.key = key;
            Theme.themes[key] = theme;
        }
        Object.keys(EtherVue).forEach(index => {
            const obj = EtherVue[index];
            if (obj.hasOwnProperty('name')) {
                theme.components[obj['name']] = obj;
            }
        });
        theme.components = lodash.merge(theme.components, config);
        return theme;
    }
    public key = 'default';
    public components = {};
    private _registerComps = {};

    public getComponentByName(name: string) {
        return lodash.get(this.components, name, null);
    }

    public addComponent(comp: object, cloneFrom=null) {
        let parentComp = null;
        if (cloneFrom) {
            parentComp = this.getComponentByName(cloneFrom);
        }

        if (parentComp) {
            comp = lodash.merge(lodash.cloneDeep(parentComp), comp);
        }
        if (!comp.hasOwnProperty('name')) {
            throw new Error('组件必须有name字段');
        }
        if (this.components.hasOwnProperty(comp['name'])) {
            throw new Error('该组件名已经被占用，请重新设置组件名');
        }
        this.components[comp['name']] = comp;
        return comp;
    }

    // 注册组件, 循环遍历整棵树
    public register(name, vue) {
        const objs = [];
        if (typeof name === 'string') {
            const comp = this.getComponentByName(name);
            if (comp) {
                objs.push(comp);
            }
        } else {
            Object.keys(name).forEach(key => {
                const comp = this.getComponentByName(name[key]);
                if (comp) {
                    objs.push(comp);
                }
            });
        }

        Object.keys(objs).forEach(key => {
            const obj = objs[key];
            // 如果有depend先register depend组件
            if (obj.hasOwnProperty('depends') && !this._registerComps.hasOwnProperty(obj.name)) {
                this.register(obj['depends'], vue);
            }
            vue['component'](this.getName(obj.name), obj);
            this._registerComps[obj.name] = true;
        });
    }

    public getName(name) {
        const suffix = this.key === 'default' ? '' : this.key;
        return name + suffix;
    }
}
