// 本示例采用了bootstrap, 为了适应界面展示，对默认模板进行变更。如果要求不高，可以直接使用系统默认模板
// 主题代表一个工程一整个标准的组件的主题设置，一般由UI与前端进行沟通并固化。通过主题，我们能很好地实现某个工程的组件标准化.
window.Theme1 = window['ether-mvc'].Theme.getInstance({
    "baseinput" : {
        template : `<component :is="tag" :class="{'has-error':showError}">
            <label class="col-sm-2 control-label">{{showLabel}}{{model.isRequired(attr) ? '*' : ''}}</label>
            <div class="col-sm-10">
                <input class="form-control" :name="attr" :value="showValue" :placeholder="showHint" @input="inputValue"/>
                <span v-show="showError"  class="help-block">{{showError}}</span>
            </div>
        </component>`,
    },
    "dropdown" : {
        template : `<component :is="tag" :class="{'has-error':showError}">
            <label class="col-sm-2 control-label">{{showLabel}}</label>
            <div class="col-sm-10">
                <select @change="inputValue" class="form-control">
                    <option v-for="(val,key) in model.getValidatorData(attr, 'dict', 'list', {})" :value="key" :selected="key === model[attr]">{{val}}</option>
                </select>
                <span v-show="showError"  class="help-block">{{showError}}</span>
            </div>
        </component>`
    },
    "checkboxgroup" : {
        template : `<component :is="tag" :class="{'has-error':showError}">
    <label class="col-sm-2 control-label">{{showLabel}}</label>
    <group class="checkbox col-sm-10"  :max="model.getValidatorData(attr, 'dict', 'max', 100)" :excludes="model.getValidatorData(attr, 'dict', 'excludes', [])" :init-value="model[attr]" :multiple="model.getValidatorData(attr, 'dict', 'multiple', false)" @change="groupChange">
        <checkbox  v-for="(val,key) in model.getValidatorData(attr, 'dict', 'list', {})" :disabled="model.getValidatorData(attr, 'dict', 'excludes', []).indexOf(key) > -1 ? true : false" :data-key="key" :key="key"> {{val}}</checkbox>
    </group>
    <span v-show="showError" class="help-block">{{showError}}</span>
</component>`,
    },
    "radiogroup" : {
        template : `<component :is="tag" :class="{'has-error':showError}">
    <label class="col-sm-2 control-label">{{showLabel}}</label>
    <group class="checkbox col-sm-10"  :max="model.getValidatorData(attr, 'dict', 'max', 100)" :excludes="model.getValidatorData(attr, 'dict', 'excludes', [])" :init-value="model[attr]" :multiple="model.getValidatorData(attr, 'dict', 'multiple', false)" @change="groupChange">
        <radio  v-for="(val,key) in model.getValidatorData(attr, 'dict', 'list', {})" :disabled="model.getValidatorData(attr, 'dict', 'excludes', []).indexOf(key) > -1 ? true : false" :data-key="key" :key="key"> {{val}}</radio>
    </group>
    <span v-show="showError" class="help-block">{{showError}}</span>
</component>`,
    }
});


// 我们也可以添加自己的组件，如下我们添加了一个叫buttongroup的组件，继承自checkboxgroup
window.Theme1.addComponent({
    name : "buttongroup",
    template : `<component :is="tag" :class="{'has-error':showError}">
        <label class="col-sm-2 control-label">{{showLabel}}</label>
        <group class="btn-group col-sm-10"  :max="model.getValidatorData(attr, 'dict', 'max', 100)" :excludes="model.getValidatorData(attr, 'dict', 'excludes', [])" :init-value="model[attr]" :multiple="model.getValidatorData(attr, 'dict', 'multiple', false)" @change="groupChange">
            <tab class="btn btn-default"  v-for="(val,key) in model.getValidatorData(attr, 'dict', 'list', {})" :disabled="model.getValidatorData(attr, 'dict', 'excludes', []).indexOf(key) > -1 ? true : false" :data-key="key" :key="key"> {{val}}</tab>
        </group>
        <span v-show="showError" class="help-block">{{showError}}</span>
    </component>`,
    "depends" : ['tab', 'group'],
}, 'checkboxgroup');
