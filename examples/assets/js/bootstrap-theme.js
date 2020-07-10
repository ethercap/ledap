// 本示例采用了bootstrap, 为了适应界面展示，对默认模板进行变更。如果要求不高，可以直接使用系统默认模板
// 主题代表一个工程一整个标准的组件的主题设置，一般由UI与前端进行沟通并固化。通过主题，我们能很好地实现某个工程的组件标准化.
var themeConfig = {
    'form-item': {
        template: `<component :is="tag" class="form-group row">
            <slot name="label" :model="model" :attr="attr">
                <label class="col-sm-3 col-form-label text-right"> {{label || model.getAttributeLabel(attr)}}{{model.isRequired(attr) ? '*' : ''}}</label>
            </slot>
            <div class="col-sm-9">
                <slot :model="model" :attr="attr" :validate="validate" :inputListeners="inputListeners">
                    <baseinput :model="model" :attr="attr" :inputListeners="inputListeners" v-bind="$attrs"></baseinput>
                </slot>
                <slot name="error" :model="model" :attr="attr" :showError="showError">
                    <b-form-invalid-feedback :state="!Boolean(showError)">
                    {{showError}}
                    </b-form-invalid-feedback>
                </slot>
            </div>
        </component>`,
    },
    baseinput: {
        template: `<div><template v-if="tag !== 'textarea'">
            <input class="form-control" :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" v-bind="$attrs" :maxlength="cMaxlength">
        </template>
        <template v-else>
            <textarea class="form-control" :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" v-bind="$attrs" :maxlength="cMaxlength">
            </textarea>
        </template></div>`,
    },
    dropdown: {
        template: `<select class="form-control" :name="attr" v-on="inputListeners" v-bind="$attrs">
            <option v-for="key in dictOption.order" :value="key" :selected="key === model[attr]">{{dictOption.list[key]}}</option>
        </select>`,
    },
    groupinput: {
        template: `<group class="btn-group" :max="dictOption.max" :excludes="dictOption.excludes" :init-value="model[attr]" :multiple="dictOption.multiple" @change="groupChange">
            <slot name="default" v-for="key in dictOption.order" :attr="attr" :data-key="key" :value="dictOption.list[key]" :disabled="hasKey(dictOption.excludes, key) ? true : false">
                <tab class="btn btn-outline-primary" :disabled="hasKey(dictOption.excludes, key) ? true : false" :data-key="key" :key="key"> {{dictOption.list[key]}}</tab>
            </slot>
        </group>`,
    },
    searchinput: {
        template: `<div class="position-relative">
        <input class="form-control" :name="attr" :value="value" :placeholder="model.getAttributeHint(attr)" v-on="listeners" autocomplete="off" v-bind="$attrs">
        <ul v-show="showList" class="list-unstyled position-absolute w-100 border bg-light" :class="[isHide ? 'invisible' : 'visible']" style="z-index: 10;">
            <li v-for="(model, index) in models" @mousedown="choose(model, index, $event)" style="padding: 6px 12px; cusor: default;">
                <slot :model="model" :index="index">{{model[itemName]}}</slot>
            </li>
        </ul>
    </div>`,
    },
    select2: {
        template: `<div class="position-relative">
    <div class="form-control d-flex flex-wrap align-items-center" style="height:auto">
        <span v-if="multiple" v-for="model,key in selected" :key="key">
            <button class="btn btn-sm btn-light" @click="choose(model, key, $event)">{{model[itemName]}}{{'  x'}}</button>&nbsp;
        </span>
        <input :name="attr" ref="input" :value="value" :placeholder="model.getAttributeHint(attr)" v-on="listeners" v-bind="$attrs" autocomplete="off" class="border-0 flex-fill mw-100" style="outline-color:white;min-width:0;">
        <b-icon-x v-if="!multiple && value" @click="clear" style="cursor: pointer;"></b-icon-x>
    </div>
    <ul v-show="showList" class="list-unstyled position-absolute w-100 border bg-light" :class="[isHide ? 'invisible' : 'visible']" style="z-index: 10;">
        <div v-if="dataProvider.isLoading" class="text-center py-2">加载中</div>
        <template v-else>
            <template v-if="models.length">
                <li v-for="(model, index) in models" @mousedown="choose(model, index, $event)" style="padding: 6px 12px;cursor: pointer;" :class='{"bg-success": selected.hasOwnProperty(model[keyName])}'>
                    <slot name="tab" :model="model" :index="index" :isActive="selected.hasOwnProperty(model[keyName])">{{model[itemName]}}</slot>
                </li>
            </template>
            <div v-else class="text-center py-2">无数据</div>
        </template>
    </ul>
</div>`,
    },
    pager: {
        template: `<div class="d-flex align-items-center">
        <slot name="total">
            <span>共<span class="text-danger">{{ dataProvider.pager.totalCount }}</span>条记录</span>
            <span class="flex-fill"></span>
        </slot>
        <slot :changePage="changePage">
            <a v-show="dataProvider.pager.hasPrev()" @click="toPrev()" class="text-primary">上一页</a>
            <a v-show="dataProvider.pager.hasNext()" @click="toNext()" class="ml-10 text-primary">下一页</a>
            <span class="mx-3">第 {{ dataProvider.pager.currentPage}}/{{ dataProvider.pager.pageCount }} 页</span>
        </slot>
        <slot name="form" :changePage="changePage">
            <form @submit.prevent.stop="changePage(jumpPage)" class="d-flex align-items-center">
                <span>跳至&nbsp;</span>
                <input type="text" v-model="jumpPage" class="text-center" style="width:45px;outline:0">
                <span>&nbsp;页&nbsp;</span>
                <button type="submit" class="btn btn-primary rounded-0" style="padding:2px 8px">跳转</button>
            </form>
        </slot>
    </div>`,
    },
    step: {
        template: `
        <component :is="tagName" :class="{'active text-success': isOpen()}">
            <slot></slot>
        </component>`,
    },
    checkbox: {
        template: `<component :is="tagName" class="custom-control custom-checkbox" :class="{'active': isOpen()}" @click="click">
            <slot name="input" :isOpen="isOpen" :disabled="disabled">
                <input class="custom-control-input" type="checkbox" :name="attr" :checked="isOpen()" :disabled="disabled" v-bind="$attrs"/>
            </slot>
            <label class="custom-control-label">
                <slot></slot>
            </label>
        </component>`
    },
    radio: {
        template: `
        <component :is="tagName" class="custom-control custom-radio" :class="{'active': isOpen()}" @click="click">
            <slot name="input" :isOpen="isOpen" :disabled="disabled">
                <input type="radio" class="custom-control-input" :disabled="disabled" :checked="isOpen()" :name="attr" v-bind="$attrs"/>
            </slot>
            <label class="custom-control-label">
                <slot></slot>
            </label>
        </component>`
    }
};