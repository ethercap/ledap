Event
----

Event本质上是一个订阅对列，上下游可以通过一个主题，进行消息通知和处理。本框架参照vue的实现，提供了一个事件机制，来方便业务方的使用。

```javascript
// 业务方A关心主题为orderPay的事件，每次收到通知都处理一次
const orderPayNotify = function(orderObj) {
    console.log(orderObj);
} 
Event.on("orderPay", orderPayNotify);
// 业务方B关心主题为orderCancel的事件，收到通知它只处理一次 
Event.once("orderCancel", function(){
    console.log("oderCancel");
});

//下游事件通知
Event.emit("orderPay", orderObj);
// 清空orderCancel主题，所有的observer将会被移除
Event.off("orderCancel");
// 清空orderPay主题中的，orderPaynotify观察者
Event.off("orderPay", orderPaynotify);
```

另外，基本所有的类都实现了Event的方法，因此,可以直接xxObj.on()方法。


