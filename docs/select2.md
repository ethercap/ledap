# Select2 组件

Select2 是一个可搜索的下拉选择组件，支持单选和多选模式，基于LEDAP框架构建。

## 功能特性

- 支持单选和多选模式
- 内置搜索功能，可根据关键词过滤选项
- 支持自定义数据源和搜索参数
- 支持placeholder文本设置
- 支持清空选择
- 与model数据双向绑定
- 集成form-item验证
- 支持插槽自定义选项显示

## 使用方法

### 基础用法

```vue
<template>
  <form-item :model="model" attr="city" label="城市">
    <select2 :model="model" attr="city" :data-provider="dp"></select2>
  </form-item>
</template>

<script>
export default {
  data() {
    return {
      model: ledap.App.getModel({city: ''}),
      dp: ledap.getDataProvider({
        api: '/api/cities',
        searchParam: 'keyword'
      })
    };
  }
};
</script>
```

### 多选模式

```vue
<template>
  <form-item :model="model" attr="tags" label="标签">
    <select2 
      :model="model" 
      attr="tags" 
      :data-provider="dp"
      :multiple="true">
    </select2>
  </form-item>
</template>

<script>
export default {
  data() {
    return {
      model: ledap.App.getModel({tags: []}),
      dp: ledap.getDataProvider({
        api: '/api/tags',
        searchParam: 'keyword'
      })
    };
  }
};
</script>
```

### 自定义placeholder

```vue
<template>
  <form-item :model="model" attr="province" label="省份">
    <select2 
      :model="model" 
      attr="province" 
      :data-provider="dp"
      placeholder="请选择省份">
    </select2>
  </form-item>
</template>

<script>
export default {
  data() {
    return {
      model: ledap.App.getModel({province: ''}),
      dp: ledap.getDataProvider({
        api: '/api/provinces',
        searchParam: 'keyword'
      })
    };
  }
};
</script>
```

### 自定义选项显示

```vue
<template>
  <form-item :model="model" attr="user" label="用户">
    <select2 :model="model" attr="user" :data-provider="dp" item-name="name" key-name="id">
      <template #tab="{model}">
        <span>{{model.name}} ({{model.email}})</span>
      </template>
    </select2>
  </form-item>
</template>

<script>
export default {
  data() {
    return {
      model: ledap.App.getModel({user: ''}),
      dp: ledap.getDataProvider({
        api: '/api/users',
        searchParam: 'keyword'
      })
    };
  }
};
</script>
```

### 监听事件

```vue
<template>
  <form-item :model="model" attr="category" label="分类">
    <select2 
      :model="model" 
      attr="category" 
      :data-provider="dp"
      @choose="onChoose"
      @clear="onClear">
    </select2>
  </form-item>
</template>

<script>
export default {
  data() {
    return {
      model: ledap.App.getModel({category: ''}),
      dp: ledap.getDataProvider({
        api: '/api/categories',
        searchParam: 'keyword'
      })
    };
  },
  methods: {
    onChoose(model, index, event) {
      console.log('选择了:', model);
    },
    onClear() {
      console.log('已清空选择');
    }
  }
};
</script>
```

### 完整的示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>Select2示例</title>
    <link rel="stylesheet" href="../assets/lib/bootstrap/bootstrap.min.css">
  </head>
  <body>
    <div id="app" class="container">
      <h3>Select2组件示例</h3>
      
      <div class="form-group">
        <label>单选-select2:</label>
        <form-item :model="model" attr="city" label="城市">
          <select2 
            :model="model" 
            attr="city" 
            :data-provider="dp"
            placeholder="请选择城市"
            item-name="name"
            key-name="id">
          </select2>
        </form-item>
        <div>当前值: {{model.city}}</div>
      </div>

      <div class="form-group">
        <label>多选-select2:</label>
        <form-item :model="model2" attr="tags" label="标签">
          <select2 
            :model="model2" 
            attr="tags" 
            :data-provider="dp2"
            :multiple="true"
            placeholder="请选择标签"
            item-name="name"
            key-name="id">
          </select2>
        </form-item>
        <div>当前值: {{model2.tags}}</div>
      </div>
    </div>
    
    <script src="../assets/lib/vue/vue.js"></script>
    <script src="../dist/ledap.js"></script>
    <script>
      const ledap = window["ledap"];
      ledap.App.register(['form-item', 'select2'], Vue);

      var app = new Vue({
        el: '#app',
        data: () => {
          return {
            model: ledap.App.getModel({city: ''}),
            model2: ledap.App.getModel({tags: []}),
            dp: ledap.getDataProvider({
              api: '/api/cities',
              searchParam: 'keyword'
            }),
            dp2: ledap.getDataProvider({
              api: '/api/tags',
              searchParam: 'keyword'
            })
          };
        }
      });
    </script>
  </body>
</html>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| model | Object | - | LEDAP Model实例 |
| attr | String | - | Model属性名 |
| dataProvider | Object | - | 数据提供者对象 |
| keyName | String | 'id' | 选项数据中作为唯一标识的字段名 |
| itemName | String | 'name' | 选项数据中作为显示文本的字段名 |
| multiple | Boolean | false | 是否支持多选 |
| placeholder | String | 'placeholder' | 占位文本，优先使用传入的值，否则使用model.getAttributeHint(attr) |

## 数据绑定

- **双向绑定**：选择或取消选择时，model[attr] 的值会自动更新；在JS中直接修改 model[attr] 也会触发UI更新
- 单选模式下，model[attr] 存储选中项的key值（字符串）
- 多选模式下，model[attr] 存储选中项key值的数组
- 支持 form-item 的验证机制

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| choose | model, index, event | 当选中某个选项时触发 |
| clear | - | 当清空选择时触发 |

## 方法

- **clear()**: 清空所有选择

## 插槽

### tab 插槽

用于自定义选项的显示内容。

**作用域插槽参数：**
| 参数 | 说明 |
|------|------|
| model | 当前选项的数据对象 |
| index | 当前选项的索引 |
| isActive | 当前选项是否被选中 |

**示例：**
```vue
<select2 :model="model" attr="city" :data-provider="dp">
  <template #tab="{model, isActive}">
    <span :style="{fontWeight: isActive ? 'bold' : 'normal'}">
      {{model.name}}
    </span>
  </template>
</select2>
```

## 注意事项

1. 必须使用 `ledap.App.getModel()` 创建模型，以确保双向绑定正常工作
2. dataProvider 需要通过 `ledap.getDataProvider()` 创建，并配置正确的API地址和搜索参数
3. 单选模式下，点击已选中的选项会取消选择
4. 多选模式下，选择新选项后会保持输入框聚焦状态，方便连续选择
5. placeholder 优先使用传入的值，如果未传入则使用 model.getAttributeHint(attr) 作为后备

## 样式

- 下拉列表使用绝对定位，样式简洁
- 选中项以标签形式显示，支持点击移除
- 加载状态显示"加载中"提示
- 无数据时显示"无数据"提示
