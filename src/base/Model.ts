import * as lodash from 'lodash';
import Validator from '../validators/Validator';
import ValidatorFactory from '../validators/ValidatorFactory';
import BaseObject from './BaseObject';

export default class Model extends BaseObject {
    public static SCENARIO_DEFAULT = 'default';
    public static EVENT_BEFORELOAD = 'MODEL_BEFORE_LOAD';
    public static EVENT_LOAD = 'MODEL_LOAD';
    public static EVENT_AFTERLOAD = 'MODEL_AFTER_LOAD';

    // 当前的错误
    private _errors: object;
    // 当前的场景
    private _scenario: string;
    // 当前的校验器
    private _validators: Validator[];

    constructor() {
        super();
        this._errors = {};
        this._scenario = '';
        this._validators = [];
    }

    /* 规则, 规则的格式为
     *  {
     *      'attribute1' : {
     *        'type1' : {...},
     *        'type2' : {...},
     *       },
     *      'attribute2' : {...}
     *  }
     */
    public rules(): object {
        return {};
    }

    // 返回相应的规则数据
    public getValidatorData(attribute: string, type: string, key: string, defaultVal = ''): any {
        const rules = this.rules();
        return lodash.get(rules, [attribute, type, key], defaultVal);
    }

    public getValidators() {
        if (lodash.isEmpty(this._validators)) {
            this._validators = this.createValidators();
        }
        return this._validators;
    }

    public createValidators() {
        this._validators = [];
        const rules = this.rules();
        Object.keys(rules).forEach(attribute => {
            Object.keys(rules[attribute]).forEach(type => {
                const validator = ValidatorFactory.getInstance(attribute, type, rules[attribute][type]);
                if (validator) {
                    this._validators.push(validator);
                }
            });
        });
        return this._validators;
    }

    // 只load数据
    public load(data: object) {
        this.emit(Model.EVENT_BEFORELOAD, this);
        Object.keys(data).forEach(key => {
            if (typeof(data[key]) === 'object' && data[key] !== null && data[key].hasOwnProperty('value')) {
                const rules = this.rules();
                const attrLabels = this.attributeLabels();
                const attrHints = this.attributeHints();
                const obj = data[key];
                if (obj.hasOwnProperty('label')) {
                    attrLabels[key] = obj.label;
                }
                if (obj.hasOwnProperty('hint')) {
                    attrHints[key] = obj.hint;
                }
                if (obj.hasOwnProperty('rules')) {
                    // 依次将rule规则存入到model中
                    Object.keys(obj.rules).forEach(i => {
                        const rule = obj.rules[i];
                        if (rule.hasOwnProperty('type') && rule.hasOwnProperty('options')) {
                            lodash.set(rules, [key, rule.type], rule.options);
                        }
                    });
                }
                this.attributeHints = () => {
                    return attrHints;
                };
                this.attributeLabels = () => {
                    return attrLabels;
                };
                this.rules = () => {
                    return rules;
                };
            }
            this.emit(Model.EVENT_LOAD, this, key, data[key]);
            this[key] = data[key];
        });
        this.init();
        this.emit(Model.EVENT_AFTERLOAD, this);
        return this;
    }

    /*返回所有的scenarios,格式
     * {
     *    "scenarios1" : {'field1','field2'},
     *    "scenarios2" => {},
     * }
     */
    public scenarios() {
        const scenarios = {};
        scenarios[Model.SCENARIO_DEFAULT] = [];
        // 将所有的字段填充到DEFAULT中
        Object.keys(this).forEach(key => {
            scenarios[Model.SCENARIO_DEFAULT].push(key);
        });
        return scenarios;
    }

    public beforeValidate() {
        return true;
    }

    public afterValidate(): void {
        // TODO: emit events
        return;
    }

    // validate方法，判断model的数据是否合法,如果返回false代表不合法
    public validate(attributes = [], clearErrors = true) {
        if (clearErrors) {
            this.clearErrors();
        }
        if (!this.beforeValidate()) {
            return false;
        }
        const scenarios = this.scenarios();
        const scenario = this.scenario;
        if (!scenarios.hasOwnProperty(scenario)) {
            return false;
        }
        // 调用validator去验证
        if (lodash.isEmpty(attributes)) {
            attributes = scenarios[scenario];
        }
        attributes = lodash.intersection(attributes, scenarios[scenario]);

        const validators = this.getValidators();
        Object.keys(validators).forEach(index => {
            const validator = validators[index];
            if (attributes.indexOf(validator.attribute) > -1) {
                validator.validateAttribute(this);
            }
        });

        this.afterValidate();
        return !this.hasErrors();
    }

    // 判断当前attribute是否有错误
    public hasErrors(attribute = null) {
        // 如果没有传attribute
        if (!attribute) {
            return !lodash.isEmpty(this._errors);
        }
        return !lodash.isEmpty(this._errors.hasOwnProperty(attribute));
    }

    // 获取所有的错误
    public getErrors(attribute = null) {
        if (!attribute) {
            return this._errors;
        }
        return lodash.get(this._errors, attribute, []);
    }

    // 添加错误
    public addError(attribute, error = '') {
        if (!attribute) {
            return;
        }
        if (lodash.isEmpty(this._errors[attribute])) {
            this._errors[attribute] = [];
        }
        this._errors[attribute].push(error);
    }

    public clearErrors(attribute: string = ''): void {
        if (!attribute) {
            this._errors = {};
        } else {
            this._errors[attribute] = [];
        }
    }

    // model的所有的字段的hint,需要上层覆盖
    public attributeHints() {
        return {};
    }
    public getAttributeHint(attribute) {
        const hints = this.attributeHints();
        if (hints.hasOwnProperty(attribute)) {
            return hints[attribute];
        }
        return '';
    }

    // model的所有的字段的意义,需要上层覆盖
    public attributeLabels() {
        return {};
    }
    // 根据attribute获取label
    public getAttributeLabel(attribute) {
        const attrLabels = this.attributeLabels();
        if (attrLabels.hasOwnProperty(attribute)) {
            return attrLabels[attribute];
        }
        return attribute;
    }

    get scenario(): string {
        if (!this._scenario) {
            this._scenario = Model.SCENARIO_DEFAULT;
        }
        return this._scenario;
    }
    set scenario(value: string) {
        this._scenario = value;
    }
}
