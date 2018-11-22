import Vue from "vue";
import * as _ from "lodash";
import Model from "../src/base/Model";
import Pagination from "../src/base/Pagination";
// import Model from "ether-mvc";
// import Pagination from "ether-mvc";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
    </div>`,
    data: {
        name: "World"
    }
});
_.padStart("Hello TypeScript!", 20, " ");
console.log(Model);
var m = new Model();
var data ={"code":0,"message":"成功","data":{"params":{"id":{"label":"ID","rules":[],"value":245},"title":{"label":"项目名称","rules":[{"type":"required","options":{"message":"项目名称不能为空。"}},{"type":"width","options":{"message":"项目名称必须是一条字符串。","max":20,"tooLong":"项目名称只能包含至多20个字符。","skipOnEmpty":1}}],"value":"京东"},"vendorId":{"label":"机构","rules":[{"type":"required","options":{"message":"机构不能为空。"}},{"type":"double","options":{"pattern":"\/^\\s*[+-]?\\d+\\s*$\/","message":"机构必须是整数。","skipOnEmpty":1}}],"value":10},"logoUrl":{"label":"Logo Url","rules":[],"value":"http://file.dev.ethercap.com/ether-public/icon/1488433272328.png"},"viewCount":{"label":"View Count","rules":[],"value":"10"},"meetingCount":{"label":"Meeting Count","rules":[],"value":"17"},"interestedCount":{"label":"Interested Count","rules":[],"value":4},"vendorName":{"value":"vendor.name.id:10","label":"机构","rules":[{"type":"required","options":{"message":"机构不能为空。"}},{"type":"double","options":{"pattern":"\/^\\s*[+-]?\\d+\\s*$\/","message":"机构必须是整数。","skipOnEmpty":1}}]},"agents":{"label":"顾问信息","value":["线下测试","侠小然333311"]},"ip":{"label":"Ip","rules":[{"type":"ip","options":{"ipv4Pattern":"\/^(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))$\/","ipv6Pattern":"\/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$\/","messages":{"ipv6NotAllowed":"Ip 必须不是一个IPv6地址。","ipv4NotAllowed":"Ip 必须不是一个IPv4地址。","message":"Ip 必须是一个有效的IP地址。","noSubnet":"Ip 必须指定一个IP地址和子网。","hasSubnet":"Ip 必须不是一个子网。"},"ipv4":true,"ipv6":true,"ipParsePattern":"\/^(\\!?)(.+?)(\\\/(\\d+))?$\/","negation":false,"subnet":false,"skipOnEmpty":1}}],"value":"10.10.11.11"},"updateTime":{"label":"更新时间","rules":[{"type":"date","options":[]}],"value":"2017-06-07 14:52:44"},"bool":{"label":"Bool","rules":[{"type":"boolean","options":{"trueValue":"1","falseValue":"0","message":"Bool的值必须要么为\"1\"，要么为\"0\"。","skipOnEmpty":1}}],"value":false},"compare":{"label":"Compare","rules":[{"type":"compare","options":{"operator":">=","type":"string","compareValue":1000000,"skipOnEmpty":1,"message":"Compare的值必须大于或等于\"1000000\"。"}}],"value":20000},"email":{"label":"Email","rules":[{"type":"email","options":{"pattern":"\/^[a-zA-Z0-9!#$%&'*+\\\/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+\\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$\/","fullPattern":"\/^[^@]*<[a-zA-Z0-9!#$%&'*+\\\/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+\\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?>$\/","allowName":false,"message":"Email不是有效的邮箱地址。","enableIDN":false,"skipOnEmpty":1}}],"value":null},"in":{"label":"In","rules":[{"type":"in","options":{"range":["1","4","7","10","13","16","19","22","25","28","31","34","37","40","43","46","49","52","55","58","61","64","67","70","73","76","79","82","85","88","91","94","97","100"],"not":false,"message":"In是无效的。","skipOnEmpty":1}}],"value":null},"match":{"label":"Match","rules":[{"type":"match","options":{"pattern":"\/^1[3-9]{1}\\d{9}$\/","not":false,"message":"Match是无效的。","skipOnEmpty":1}}],"value":null},"string":{"label":"String","rules":[{"type":"string","options":{"message":"String必须是一条字符串。","max":10,"tooLong":"太长了","skipOnEmpty":1}}],"value":null},"url":{"label":"Url","rules":[{"type":"url","options":{"pattern":"\/^(http|https):\\\/\\\/(([A-Z0-9][A-Z0-9_-]*)(\\.[A-Z0-9][A-Z0-9_-]*)+)(?::\\d{1,5})?(?:$|[?\\\/#])\/i","message":"Url不是一条有效的URL。","enableIDN":false,"skipOnEmpty":1}}],"value":null}}}}
m.load(data.data.params);
console.log(m);

for(let key in m) {
    console.log(key);
    console.log(m[key]);
    console.log(m.getAttributeLabel(key));
}
m["id"] = 0;
m["vendorName"] = 10;
console.log(m.validate());
console.log(m.getErrors());
m["id"] = 0;
console.log(m.validate());
console.log(m.getErrors());
m["email"] = "dadsa";
m["ip"] = "ddd";
m["url"] = "dds";
m["match"]="dasa";
window["m"] = m;
console.log(m);
console.log(m.validate());
console.log(m.getErrors());

m["email"] = "lishipeng@ethercap.com";
m["ip"] = "1.2.2.12";
m["url"] = "http://dsda.com";
m["match"] ="13312312231";
m["bool"] = "dadsa";
m["compare"] = 124124;
m["in"] = "dsda";
console.log(m);
console.log(m.validate());
console.log(m.getErrors());


/*let meta = {"totalCount":2064,"pageCount":104,"currentPage":1,"perPage":20};


let pager = new Pagination();
pager.load(meta);
pager.on(Pagination.EVENT_SETPAGE, function(data, pad, data1){console.log("hello"); console.log(data1);console.log(pad);}, null);
console.log(pager);
console.log(meta);
pager.currentPage = 2;
*/
