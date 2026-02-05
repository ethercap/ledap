# BoolInput 组件

BoolInput 是一个用于布尔值选择的Vue组件，显示两个按钮来选择 true/false 值。

## 功能特性

- 基于LEDAP的group和tab组件构建
- 支持自定义true/false文本（默认为"开启"/"关闭"）
- 样式与groupInput保持一致（使用Bootstrap按钮样式）
- 支持model数据双向绑定（点击按钮和JS修改都会触发UI更新）
- 集成form-item验证
- 自动值规范化：强制转换为支持的格式（0/1 或 true/false）
- 支持两种数据类型模式
- 支持字符串类型的布尔值自动转换（"0"、"false"、"False"会被视为false）

## 使用方法

### 基础用法

```vue
<template>
  <form-item :model="model" attr="isActive" label="是否激活">
    <boolinput :model="model" attr="isActive" value-type="boolean"></boolinput>
  </form-item>
</template>

<script>
export default {
  data() {
    return {
      model: ledap.App.getModel({isActive: false})
    };
  }
};
</script>
```

### 自定义文本

```vue
<template>
  <form-item :model="model" attr="isEnabled" label="是否启用">
    <boolinput 
      :model="model" 
      attr="isEnabled" 
      value-type="boolean"
      true-text="是" 
      false-text="否">
    </boolinput>
  </form-item>
</template>

<script>
export default {
  data() {
    return {
      model: ledap.App.getModel({isEnabled: true})
    };
  }
};
</script>
```

### 指定数据类型

```vue
<template>
  <!-- 使用数值类型 (0/1) -->
  <form-item :model="model" attr="status" label="状态">
    <boolinput 
      :model="model" 
      attr="status" 
      value-type="number"
      true-text="启用" 
      false-text="禁用">
    </boolinput>
  </form-item>
  
  <!-- 使用布尔类型 (true/false) -->
  <form-item :model="model" attr="enabled" label="启用状态">
    <boolinput 
      :model="model" 
      attr="enabled" 
      value-type="boolean"
      true-text="开" 
      false-text="关">
    </boolinput>
  </form-item>
</template>

<script>
export default {
  data() {
    return {
      model: ledap.App.getModel({status: 1}),
      model2: ledap.App.getModel({enabled: false})
    };
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
    <title>BoolInput示例</title>
    <link rel="stylesheet" href="../assets/lib/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/bootstrap-theme.css">
  </head>
  <body>
    <div id="app" class="container">
      <h3>BoolInput组件示例</h3>
      
      <div class="form-group">
        <label>基础BoolInput (boolean类型):</label>
        <form-item :model="model" attr="isActive" label="是否激活">
          <boolinput :model="model" attr="isActive" value-type="boolean"></boolinput>
        </form-item>
        <div>当前值: {{model.isActive}} (类型: {{typeof model.isActive}})</div>
      </div>

      <div class="form-group">
        <label>使用0/1数值类型的BoolInput:</label>
        <form-item :model="model2" attr="status" label="状态">
          <boolinput :model="model2" attr="status" value-type="number" true-text="启用" false-text="禁用"></boolinput>
        </form-item>
        <div>当前值: {{model2.status}} (类型: {{typeof model2.status}})</div>
      </div>
    </div>
    
    <script src="../assets/lib/vue/vue.js"></script>
    <script src="../dist/ledap.js"></script>
    <script>
      const ledap = window["ledap"];
      ledap.App.register(['form-item', 'boolinput'], Vue);

      var app = new Vue({
        el: '#app',
        data: () => {
          return {
            model: ledap.App.getModel({isActive: false}),
            model2: ledap.App.getModel({status: 1})
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
| trueText | String | '开启' | true值的显示文本 |
| falseText | String | '关闭' | false值的显示文本 |
| valueType | String | 'number' | 数据类型，可选值：'number'(0/1) 或 'boolean'(true/false) |

## 数据绑定

- **双向绑定**：当用户点击按钮时，model[attr] 的值会自动更新；在JS中直接修改 model[attr] 也会触发UI更新
- 根据 `valueType` 属性，值会被自动转换为：
  - `number` 类型：0 或 1（默认）
  - `boolean` 类型：false 或 true
- 组件会根据当前值显示对应的激活状态
- 支持 form-item 的验证机制
- **字符串值处理**：支持 "true"/"false"/"0"/"1" 等字符串自动转换为对应的布尔值或数字
- **自动值规范化**：在初始化时会将任何支持的值强制转换为指定数据类型的格式

## 注意事项

1. 必须使用 `ledap.App.getModel()` 创建模型，以确保双向绑定正常工作
2. valueType默认为'number'，如果需要布尔类型，请显式设置 `value-type="boolean"`
3. 字符串值 "0"、"false"、"False" 会被视为false，其他字符串值（如 "1"、"true"）会被视为true

## 样式

- 使用Bootstrap的 `btn-group` 和 `btn btn-outline-primary` 类
- 与其他LEDAP组件保持一致的视觉风格
