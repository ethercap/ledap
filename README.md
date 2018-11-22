# ether-mvc前端框架使用说明

---

  本文针对前端数据分层问题，参照yii2框架，给前端加上model层，方便后续使用。

1. Model
  Model是底层数据的表现，它可能是orm，也可能是form表单，目前并不做区分。

1.1 后端返回的数据可以直接通过model.load来生成model
```javascript     
    var data = {};
    var model = Model.load(data);
```
1.2 获取model之后，可以使用model的一些特性了：
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
2. Event
事件是类中的一类重要的行为，为我们提供一些事件观测的机制。
```javascript
    //事件通知
    Event.emit("string", "any");
    //事件处理
    Event.on("string", function(){}, "context");
    // 其它方法基本与vue一致，once，off等
```
所有的类基本都实现了Event的方法，因此,可以直接model.on方法.

3. DataProvider
   
4. Pagination





