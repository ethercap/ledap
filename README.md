# Ledap

由于 Vue、AngularJs、React 的出现，使得前端能够很方便地实现页面上的侦听和 Dom 操作，然而却带来一个新的问题：将后端数据渲染为 HTML，该问题极大地加剧了整个前端开发的复杂度，并且前端带了特别多的问题：

- 业务问题：前端需要跟据业务逻辑来展示不同的页面，而业务逻辑部分在后端实现了一次，而在前端往往需要再实现一次，而且维护起来极为复杂；
- 分层问题：目前的前端框架没有清晰的分层，使得代码逻辑散乱，不容易维护；

Ledap 致力于解决这些问题，我们使用了以下策略：

- 引入了 Model，将数据的操作与业务逻辑解耦，解决常见的数据操作，如表单验证；
- 引入了 DataProvider，解决列表场景下的数据操作；
- 引入了数据适配层（即逻辑组件）的概念，为实现跨平台组件提供了可能，由于时间有限，目前仅支持 Vue 组件；
- 实现了代码自动生成，[yii2-ledap](https://ethercap.gitbook.io/ledap/zh-cn/yii2-ledap)；

## 安装

```bash
npm install ledap -D
```

## 使用

```javascript
import * as Ledap form 'ledap';

const model = new Ledap.Model();
model.load({
    // some property
});
```

## 编译 （支持同时输出 umd 和 esm 模块）

```
npm run build
```

## 调试(umd)

```bash
npm run dev
```

## react 组件调试

```bash
npm run dev:react
```

## 文档

[文档](http://zhiyuancap.com/ledap.org/)
[示例网站](https://widget.ethercap.com/ledap/default/index)
