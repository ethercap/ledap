# Ledap
Ledap 是一个好用的前后端解耦方案，具有以下特点：
- 引入了 Model，将数据的操作与业务逻辑解耦，如表单验证；
- 引入了 DataProvider，解决列表场景下的数据操作；
- 引入了数据适配层的概念，为实现跨平台组件提供了可能，由于时间有限，目前仅支持 Vue 组件；
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

## 文档
[文档](http://zhiyuancap.com/ledap.org/)
