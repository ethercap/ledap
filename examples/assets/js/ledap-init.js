// 本示例采用了bootstrap, 为了适应界面展示，对默认模板进行变更。如果要求不高，可以直接使用系统默认模板
// 主题代表一个工程一整个标准的组件的主题设置，一般由UI与前端进行沟通并固化。通过主题，我们能很好地实现某个工程的组件标准化.
var themeConfig = {
    "form-item": {
        template: `<component :is="tag" :class="{'has-error':showError}">
            <slot name="label" :model="model" :attr="attr">
                <label class="col-sm-2 control-label"> {{model.getAttributeLabel(attr)}}{{model.isRequired(attr) ? '*' : ''}}</label>
            </slot>
            <div class="col-sm-10">
                <slot :model="model" :attr="attr" :validate="validate" :inputListeners="inputListeners">
                    <baseinput :model="model" :attr="attr" :inputListeners="inputListeners" v-bind="$attrs"></baseinput>
                </slot>
                <slot name="error" :model="model" :attr="attr" :showError="showError">
                    <p v-show="showError" class="help-block">{{showError}}</p>
                </slot>
            </div>
        </component>`,
    },
    "baseinput": {
        template: `<div><template v-if="tag !== 'textarea'">
                <input class="form-control" :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" v-bind="$attrs" :maxlength="cMaxlength">
            </template>
            <template v-else>
                <textarea class="form-control" :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" v-bind="$attrs" :maxlength="cMaxlength">
                </textarea>
            </template></div>`,
    },
    "dropdown": {
        template: `<select class="form-control" v-on="inputListeners">
            <option v-for="(val,key) in model.getValidatorData(attr, 'dict', 'list', {})" :value="key" :selected="key === model[attr]">{{val}}</option>
        </select>`,
    },
    "groupinput": {
        template: `<group class="btn-group" :max="dictOption.max" :excludes="dictOption.excludes" :init-value="model[attr]" :multiple="dictOption.multiple" @change="groupChange">
            <slot name="default" v-for="key in dictOption.order" :data-key="key" :value="dictOption.list[key]" :disabled="dictOption.excludes.indexOf(key) > -1 ? true : false">
                <tab class="btn btn-default" :disabled="dictOption.excludes.indexOf(key) > -1 ? true : false" :data-key="key" :key="key">{{dictOption.list[key]}}</tab>
            </slot>
        </group>`,
    },
    searchinput: {
        template: `<div style="position: relative;">
        <input class="form-control" :name="attr" :value="value" :placeholder="model.getAttributeHint(attr)" v-on="listeners" autocomplete="off" v-bind="$attrs">
        <ul v-show="showList" class="list-unstyled" style="position: absolute; width: 100%; border:1px solid rgb(221, 221, 221); background-color:rgb(245, 245, 245); z-index: 10;" :style="{opacity: isHide ? 0 : 1}">
            <li v-for="(model, index) in models" @mousedown="choose(model, index, $event)" style="padding: 6px 12px; cusor: default;">
                <slot :model="model" :index="index">{{model[itemName]}}</slot>
            </li>
        </ul>
    </div>`,
    },
    select2: {
        template: `<div style="position: relative;">
    <div class="form-control" style="display: flex;height:auto">
        <span v-if="multiple" v-for="model,key in selected" :key="key">
            <a class="btn btn-xs btn-default" @click="choose(model, key, $event)">{{model[itemName]}}{{'  x'}}</a>&nbsp;
        </span>
        <input :name="attr" ref="input" :value="value" :placeholder="model.getAttributeHint(attr)" v-on="listeners" v-bind="$attrs" autocomplete="off" style="border-width: 0px;outline-color:white;flex:1;max-width:100%;min-width:0">
        <span v-if="!multiple && value" @click="clear" style="cursor: pointer;margin-left:0.5em">X</span>
    </div>
    <ul v-show="showList" class="list-unstyled" style="position: absolute; width: 100%; border:1px solid rgb(221, 221, 221); background-color:rgb(245, 245, 245); z-index: 10;" :style="{opacity: isHide ? 0 : 1}">
        <div v-if="dataProvider.isLoading" style="text-align: center; padding: 6px 0">加载中</div>
        <template v-else>
            <template v-if="models.length">
                <li v-for="(model, index) in models" @mousedown="choose(model, index, $event)" style="padding: 6px 12px; cursor: pointer;" :class='{"bg-success": selected.hasOwnProperty(model[keyName])}'>
                    <slot name="tab" :model="model" :index="index" :isActive="selected.hasOwnProperty(model[keyName])">{{model[itemName]}}</slot>
                </li>
            </template>
            <div v-else style="text-align: center; padding: 6px 0">无数据</div>
        </template>
    </ul>
</div>`,
    },
    pager: {
        template: `<div style="display:flex;align-items: center;">
        <slot name="total">
            <span>共{{ dataProvider.pager.totalCount }}条记录</span>
            <span style="flex:1"></span>
        </slot>
        <slot :changePage="changePage">
            <a v-show="dataProvider.pager.hasPrev()" @click="toPrev()">上一页</a>
            <a v-show="dataProvider.pager.hasNext()" @click="toNext()" style="margin-left: 10px">下一页</a>
            <span style="margin: 0 15px">第 {{ dataProvider.pager.currentPage}}/{{ dataProvider.pager.pageCount }} 页</span>
        </slot>
        <slot name="form" :changePage="changePage">
            <form @submit.prevent.stop="changePage(jumpPage)" style="display:flex;align-items:center">
                <span>跳至&nbsp;</span>
                <input type="text" v-model="jumpPage" style="width:45px;outline:0">
                <span>&nbsp;页&nbsp;</span>
                <button type="submit" class="btn btn-success" style="padding:2px 8px;border-radius: 0">跳转</button>
            </form>
        </slot>
    </div>
        `
    }
};
var request = function(httpOptions, suc, fail) {
    ledap.App.axios.request(httpOptions).then(function(res) {
        suc(res.data);
    }).catch(function(error) {
        fail(error);
    });
};

ledap.App.config({
    themeConfig: themeConfig,
    request: request,
    webDpConfig: {
        primaryKey: "",
        httpRequest: function(httpOptions, suc, fail) {
            request(httpOptions, function(data) {
                //由于接口格式问题，将其整形为标准格式
                let tempData = {
                    items: data,
                    sort: {},
                    meta: {
                        //由于没有后端逻辑，本处采用前端逻辑来模拟后端
                        currentPage: httpOptions.url === "/data/dp_1.json" ? 1 : 2,
                        pageCount: 2,
                        perPage: 20,
                        totalCount: httpOptions.url === "/data/dp_1.json" ? 40 : 50,
                    }
                };

                suc(tempData);
            }, fail);
        }
    },
});

// 有时候我们有几套相似的组件，我们从form-item继承出来，做一个form-item1组件，把label放在尾部
ledap.App.getTheme().addComponent({
    name: "form-item1",
    template: `<component :is="tag" :class="{'has-error':showError}">
        <div class="col-sm-10">
            <slot :model="model" :attr="attr" :checkValue="checkValue" :inputListeners="inputListeners">
                <input class="form-control" :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" />
            </slot>
            <slot name="error" :model="model" :attr="attr" :showError="showError">
                <p v-show="showError" class="help-block">{{showError}}</p>
            </slot>
        </div>
        <slot name="label" :model="model" :attr="attr">
            <label class="col-sm-2 control-label"> {{model.getAttributeLabel(attr)}}{{model.isRequired(attr) ? '*' : ''}}</label>
        </slot>
    </component>`,
}, 'form-item');