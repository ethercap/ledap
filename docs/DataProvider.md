DataProvider
---

## DataProvider概念
对于一个list页面来说，整个页面的数据会比较复杂，如何良好的进行处理数据将会变得极为麻烦，正常情况下，一个list页面会有如下的内容：

* 数据。一般为一个Array
* 分页器。主要需要记录当前数据的页码，以及每页的大小。
* 排序器。主要记录当前数据排序的规则。

对于大部分的list页面来说，仅有上面的内容还不够，同时还需要要一个新的内容——Url和params。因为页面的数据是通过ajax来获取的，同时，用户可以通过修改params来调整下面数据的展示。整个数据的管理和操作都极为麻烦，而且容易非标准化。因此归一化的操作和处理对于后端来说很重要，同时也能极大地减化前端的操作。

在本框架中，DataProvider主要分为两层：

* DataProvider : 底层基类，主要负责将数据，分页器，排序器打包管理，交不负责数据怎么获取。
* WebDataProvider : 负责将数据从web中获取，并打包为DataProvider。

## 使用

dp主要由如下几部分组成：

* **dp.searchModel** ：列表页的筛选参数
* **dp.pager**： 列表页底部的分页管理
* **dp.sort** : 列表页的排序管理
* **dp.models** : 列表页的详细数据

```javascript
import { WebDataProvider } from 'ether-mvc';

var dp = new WebDataProvider({
    httpOptions:{
        "url":"/xxx",
        "params" : {},
    },
    // 该配置尽量配置在全局，因为每个项目的http请求方式应该是一致的。如下为axios的示例，用户可以根据实际的情况，配置自己的ajax请求方式
    httpRequest: function(httpOption, success, failure) {
        axios.request(httpOption).then(data => {
            success(data);
            //其它自己想做的处理
        }).catch(error => {
            failure(error);
            //其它自己想做的处理
        });
    },
    // 默认使用id做为key来判重数据，如果不需要判重，可以设置为null或""
    primaryKey: "id",
});


// 通过dp来获取列表数据，数据在dp.models中
dp.refresh();
// 在网页中，我们经常会需要翻页，如下为翻页的方法，dp.models的数据会跟着变化
dp.changePage(1);
// 下一页
dp.nextPage();
// 上一页
dp.prePage();
// 同理，在移动端，h5时，会有上拉和下拉请求，如下为上下拉时的方法
dp.refresh('header'); //顶部，下拉
dp.refresh('footer'); //底部，上拉

/* 在页面上，我们经常会需要用户点击，修改筛选条件。
  reload代表是否重新发起http请求。
  changePage代表重新发起时，是否要将page置为1。
  默认reload=true, changePage=true。
*/
dp.setParams(params, reload, changePage);


// dp是否在加载中，用户可以通过该变量来显示"加载中..."
console.log(dp.isLoading);
// 当前是否有前一页
dp.pager.hasPre();
// 当前是否有下一页
dp.pager.hasNext();
// 当前页
dp.pager.currentPage

```

