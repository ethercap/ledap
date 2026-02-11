HttpModel
---

`HttpModel` 用于把单条资源的 HTTP CRUD（查看/创建/更新/删除）封装成和 `Model` 一致的操作方式。

## 使用场景

- 详情页：根据主键查询一条记录
- 表单页：创建新记录、更新当前记录
- 操作页：删除当前记录

## 配置项

```javascript
import { HttpModel } from 'ledap';

const config = {
  // 必填：请求方法
  // 形参：(httpOptions, success, fail)
  httpRequest(httpOptions, success, fail) {
    axios.request(httpOptions)
      .then(resp => success(resp.data))
      .catch(err => fail(err));
  },

  // 必填：接口基础路径
  basePath: '/api/user',

  // 可选：主键名，默认 id
  primaryKey: 'id',

  // 可选：路径后缀
  viewPath: '/view',
  createPath: '/create',
  updatePath: '/update',
  deletePath: '/delete',
};

const model = new HttpModel(config);
```

## 快速获取（推荐）

可以通过 `App.getHttpModel` 直接拿到服务端返回并 `load` 后的模型。

```javascript
const ret = await ledap.App.getHttpModel({
  basePath: '/api/user',
  httpRequest: ledap.App.request,
  primaryKey: 'id',
}, { id: 1 });

const model = ret.model;
console.log(model.name);
```

## 常用方法

### 1) 查询单条数据

```javascript
const ret = await HttpModel.find(config, { id: 1 });
const model = ret.model;
```

### 2) 创建数据

```javascript
const model = new HttpModel(config);
model.load({ name: 'Alice', age: 18 });

const ret = await model.createModel();
console.log(ret.model.id);
```

### 3) 更新数据

`updateModel()` 仅提交变更字段；若尝试修改主键会抛错。

```javascript
const ret = await HttpModel.find(config, { id: 1 });
const model = ret.model;

model.name = 'Alice-Updated';
await model.updateModel();
```

### 4) 删除数据

```javascript
const ret = await HttpModel.find(config, { id: 1 });
await ret.model.deleteModel();
```

## 返回格式约定

`HttpModel` 默认从 `success` 回调参数中读取 `data.data` 并执行 `model.load(data.data)`。

```javascript
success({
  data: {
    id: 1,
    name: 'Alice'
  }
});
```

如果你的后端返回格式不同，建议在 `httpRequest` 里先做一次适配，再回调给 `HttpModel`。

## 说明

- `HttpModel` 继承 `Model`，因此支持 `validate/getErrors/getChangeData` 等能力。
- 发送请求时会自动过滤私有字段（`_` 开头）。
- `find` 中若传了 `withConfig`，会被规范为布尔值。
- 示例可参考：`examples/vue/httpModel.html`
