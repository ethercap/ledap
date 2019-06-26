Model
----

Model是后台数据的前端映射，是整个前端的业务汇聚地，它将散落在view, controller中的业务逻辑全部集中于Model中，同时，本框架也提供了便利的方法，使得后端可以直接将部分业务逻辑传给前端。


## 获取Model 

后端返回的数据可以直接通过model.load来生成model

```javascript     
var data = {};
var model = new Model();
model.load(data);
```

##  model的特性

获取model之后，可以使用model的一些特性了：

```javascript
//获取某一个字段的label
model.getAttributeLabel("xxx");
//获取某一个字段的hint
model.getAttributeHint("xxx");
// 获取校验器的一些内容
model.getValidatorData("attr", "dict", "list");
// model是会集成后端的规则的，如果使用validate，会判断model是否符合规则
model.validate(); //如果有错误，返回false，没有则返回true
model.getErrors(); //返回所有的错误列表
```


