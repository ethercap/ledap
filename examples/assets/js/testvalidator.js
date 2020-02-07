let model = ledap.App.getModel({});

function assert($value1, $value2) {
    if ($value1 !== $value2) {
        throw Error("测试不通过");
    } else {
        console.log("ok");
    }
}

function processTestCase(testCases, attr = "a") {
    for (let i = 0; i < testCases.length; i++) {
        model[attr] = testCases[i]["value"];
        assert(model.validate(attr), testCases[i]["ret"]);
    }
}


console.log("开始测试BooleanValidator");
model.addValidator("a", "boolean");

testCases = [
        { value: "", ret: true },
        { value: true, ret: true },
        { value: false, ret: true },
        { value: 1, ret: true },
        { value: 0, ret: true },
        { value: "dadf", ret: false },
    ],
    processTestCase(testCases);

console.log("严格模式");
model._validators = [];
model.addValidator("a", "boolean", { strict: true });
testCases = [
        { value: "", ret: true },
        { value: true, ret: true },
        { value: false, ret: true },
        { value: 1, ret: false },
        { value: 0, ret: false },
        { value: "dadf", ret: false },
    ],
    processTestCase(testCases);

console.log("开始测试EmailValidator");
model._validators = [];
model.addValidator("a", "email");

testCases = [
        { value: "", ret: true },
        { value: "test@example.com", ret: true },
        { value: "test@example", ret: false },
        { value: "test@测试.com", ret: false },
        { value: "test", ret: false },
        { value: "@example.com", ret: false },
        { value: "test <test@example.com>", ret: false },
    ],
    processTestCase(testCases);

console.log("测试IDN模式");
model._validators = [];
model.addValidator("a", "email", { enableIDN: true });
testCases = [
        { value: "", ret: true },
        { value: "test@example.com", ret: true },
        { value: "test@example", ret: false },
        { value: "test@测试.com", ret: true },
        { value: "test", ret: false },
        { value: "@example.com", ret: false },
        { value: "test <test@example.com>", ret: false },
    ],
    processTestCase(testCases);



console.log("测试allowName模式");
model._validators = [];
model.addValidator("a", "email", { allowName: true });
testCases = [
        { value: "", ret: true },
        { value: "test@example.com", ret: true },
        { value: "test@example", ret: false },
        { value: "test@测试.com", ret: false },
        { value: "test", ret: false },
        { value: "@example.com", ret: false },
        { value: "test <test@example.com>", ret: true },
    ],
    processTestCase(testCases);

console.log("测试NumberValidator");
model._validators = [];
model.addValidator("a", "number");
testCases = [
        { value: "", ret: true },
        { value: 1, ret: true },
        { value: 5, ret: true },
        { value: 10, ret: true },
        { value: 112.21, ret: true },
        { value: 1.021e5, ret: true },
        { value: "1", ret: true },
        { value: "5", ret: true },
        { value: "10", ret: true },
        { value: "112.21", ret: true },
        { value: "1.021e5", ret: true },
        { value: "ss1.021e5", ret: false },
        { value: "1.021e5ss", ret: false },
    ],
    processTestCase(testCases);

console.log("测试int");
model._validators = [];
model.addValidator("a", "int");
testCases = [
        { value: "", ret: true },
        { value: 1, ret: true },
        { value: 5, ret: true },
        { value: 10, ret: true },
        { value: 112.21, ret: false },
        { value: 1.021e5, ret: true },
        { value: 1.021121212e5, ret: false },
        { value: "1", ret: true },
        { value: "5", ret: true },
        { value: "10", ret: true },
        { value: "112.21", ret: false },
        { value: "1.021e5", ret: true },
        { value: "1.021121212e5", ret: false },
        { value: "ss1.021e5", ret: false },
        { value: "1.021e5ss", ret: false },
    ],
    processTestCase(testCases);

console.log("测试大小");
model._validators = [];
model.addValidator("a", "number", { min: 1, max: 5 });
testCases = [
    { value: "", ret: true },
    { value: 0, ret: false },
    { value: 1, ret: true },
    { value: 4, ret: true },
    { value: 5, ret: true },
    { value: 10, ret: false },
    { value: 112.21, ret: false },
    { value: 1.021e5, ret: false },
    { value: "0", ret: false },
    { value: "1", ret: true },
    { value: "4", ret: true },
    { value: "5", ret: true },
    { value: "10", ret: false },
    { value: "112.21", ret: false },
    { value: "1.021e5", ret: false },
    { value: "ss1.021e5", ret: false },
    { value: "1.021e5ss", ret: false },
];
processTestCase(testCases);


console.log("开始测试RequiredValidate");
model._validators = [];
model.addValidator("a", "required");
testCases = [
    { value: "", ret: false },
    { value: 0, ret: false },
    { value: 1, ret: true },
    { value: "dsds", ret: true },
    { value: "0", ret: true },
    { value: null, ret: false },
    { value: undefined, ret: false },
    { value: [], ret: false },
    { value: [1], ret: true }
];
processTestCase(testCases);


console.log("严格模式");
model._validators = [];
model.addValidator("a", "required", { strict: true, requiredValue: "0" });
testCases = [
    { value: "", ret: false },
    { value: 0, ret: false },
    { value: "dsds", ret: false },
    { value: "0", ret: true },
    { value: null, ret: false },
    { value: undefined, ret: false },
    { value: [], ret: false },
    { value: [1], ret: false }
];
processTestCase(testCases);

console.log("开始测试UrlValidator");
model._validators = [];
model.addValidator("a", "url");
testCases = [
    { value: "", ret: true },
    { value: 0, ret: false },
    { value: "dsds", ret: false },
    { value: "0", ret: false },
    // skip了
    { value: null, ret: true },
    { value: undefined, ret: true },
    { value: [], ret: true },
    { value: [1], ret: false },
    { value: "http://www.baidu.com", ret: true },
    { value: "ftp://www.baidu.com", ret: false },
    { value: "https://www.baidu.com", ret: true },
    { value: "www.baidu.com", ret: false },
    { value: "www.企鹅.com", ret: false },
    { value: "http://www.企鹅.com", ret: false },
];
processTestCase(testCases);

console.log("测试IDN");

model._validators = [];
model.addValidator("a", "url", { enableIDN: true, defaultScheme: "http" });
testCases = [
    { value: "", ret: true },
    { value: 0, ret: false },
    { value: "dsds", ret: false },
    { value: "0", ret: false },
    // skip了
    { value: null, ret: true },
    { value: undefined, ret: true },
    { value: [], ret: true },
    { value: [1], ret: false },
    { value: "http://www.baidu.com", ret: true },
    { value: "ftp://www.baidu.com", ret: false },
    { value: "https://www.baidu.com", ret: true },
    { value: "www.baidu.com", ret: true },
    { value: "www.企鹅.com", ret: true },
    { value: "http://www.企鹅.com", ret: true },
];
processTestCase(testCases);

console.log("开始测试CompareValidator");
model._validators = [];
model.addValidator("a", "compare", { type: "number", operator: '>', compareValue: 5 });
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: undefined, ret: true },
    { value: 0, ret: false },
    { value: 5, ret: false },
    { value: 6, ret: true },
    { value: "6", ret: true },
];
processTestCase(testCases);

console.log("测试compare attribute");
model._validators = [];
model.addValidator("a", "compare", { type: "number", operator: '>', compareValue: 5, compareAttribute: "b" });
model.b = 10;
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: undefined, ret: true },
    { value: 0, ret: false },
    { value: 5, ret: false },
    { value: 6, ret: false },
    { value: "6", ret: false },
    { value: 15, ret: true },
];
processTestCase(testCases);

console.log("测试FnValidate");
model._validators = [];
model.addValidator("a", function(options, attribute) {
    console.log(options);
    console.log(attribute);
    if (this[attribute] > 5) {
        this.addError(attribute, "数据需要<5");
    }
    if (this[attribute] < 3) {
        this.addError(attribute, "数据需要>3");
    }

});
testCases = [
    { value: 2, ret: false },
    { value: 4, ret: true },
    { value: 6, ret: false },
];
processTestCase(testCases);

console.log("测试model.fn模式");

model._validators = [];
model.testFn = function(options, attribute) {
    console.log(options);
    console.log(attribute);
    if (this[attribute] > 5) {
        this.addError(attribute, "数据需要<5");
    }
    if (this[attribute] < 3) {
        this.addError(attribute, "数据需要>3");
    }
}
model.addValidator("a", "testFn");
testCases = [
    { value: 2, ret: false },
    { value: 4, ret: true },
    { value: 6, ret: false },
];
processTestCase(testCases);



console.log("测试RangeValidator");
model._validators = [];
model.addValidator("a", "in", { range: ["1", "a", 0] });
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: "1", ret: true },
    { value: "a", ret: true },
    { value: 0, ret: true },
    { value: "dadsf", ret: false },
    { value: ["1", "a"], ret: false },
    { value: ["1", "b"], ret: false },
    { value: ["b"], ret: false },
];
processTestCase(testCases);

console.log("测试Not");
model._validators = [];
model.addValidator("a", "in", { range: ["1", "a", 0], not: true, });
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: "1", ret: false },
    { value: "a", ret: false },
    { value: 0, ret: false },
    { value: "dadsf", ret: true },
];
processTestCase(testCases);

console.log("测试Array");
model._validators = [];
model.addValidator("a", "in", { range: ["1", "a", 0], allowArray: true });
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: [], ret: true },
    { value: "a", ret: true },
    { value: 0, ret: true },
    { value: "dadsf", ret: false },
    { value: ["1", "a"], ret: true },
    { value: ["1", "b"], ret: false },
    { value: ["b"], ret: false },
];
processTestCase(testCases);


console.log("测试StringValidator");
model._validators = [];
model.addValidator("a", "string");
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: "1", ret: true },
    { value: "abbdsccdsfd", ret: true },
    { value: 10, ret: false },
    { value: "dadsf", ret: true },
    { value: ["1", "a"], ret: false },
];
processTestCase(testCases);

console.log("测试长度");
model._validators = [];
model.addValidator("a", "string", { is: 5 });
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: "1", ret: false },
    { value: "abbdsccdsfd", ret: false },
    { value: 10, ret: false },
    { value: "dadsf", ret: true },
    { value: ["1", "a"], ret: false },
];
processTestCase(testCases);

console.log("测试长度");
model._validators = [];
model.addValidator("a", "string", { min: 2, max: 5 });
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: "1", ret: false },
    { value: "abbdsccdsfd", ret: false },
    { value: 10, ret: false },
    { value: "dadsf", ret: true },
    { value: ["1", "a"], ret: false },
];
processTestCase(testCases);



console.log("测试DictValidator");
model._validators = [];
model.addValidator("a", "dict", { list: { 5: 12, 6: 1, "a": "a1", "b": "b1", "c": "c1" }, excludes: ["a"] });
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: "a", ret: false },
    { value: 5, ret: true },
    { value: "5", ret: true },
    { value: "b", ret: true },
    { value: "b1", ret: false },
    { value: ["b"], ret: true },
    { value: ["b", "a"], ret: false },
];
processTestCase(testCases);


console.log("测试multiple");
model._validators = [];
model.addValidator("a", "dict", { list: { 5: 12, 6: 1, "a": "a1", "b": "b1", "c": "c1" }, excludes: ["a"], multiple: true });
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: "a", ret: false },
    { value: 5, ret: true },
    { value: "5", ret: true },
    { value: "b", ret: true },
    { value: "b1", ret: false },
    { value: ["b"], ret: true },
    { value: ["b", "a"], ret: false },
    { value: ["b", "5", "c"], ret: true },
];
processTestCase(testCases);

console.log("测试multiple,长度");
model._validators = [];
model.addValidator("a", "dict", { list: { 5: 12, 6: 1, "a": "a1", "b": "b1", "c": "c1" }, excludes: ["a"], multiple: true, min: 2, max: 2 });
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: "a", ret: false },
    { value: 5, ret: false },
    { value: "5", ret: false },
    { value: "b", ret: false },
    { value: "b1", ret: false },
    { value: ["b"], ret: false },
    { value: ["b", "a"], ret: false },
    { value: ["b", "5"], ret: true },
    { value: ["b", "5", "c"], ret: false },
];
processTestCase(testCases);

console.log("测试IpValidator");
model._validators = [];
model.addValidator("a", "ip");
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: "a", ret: false },
    { value: "192.168.1.1", ret: true },
    { value: "!192.168.1.1", ret: false },
    { value: "122.16.12.256", ret: false },
    { value: "10.1.28.1", ret: true },
    { value: "192.168.1.1/22", ret: false },
    { value: 192, ret: false },
    { value: "CDCD:910A:2222:5498:8475:1111:3900:2020", ret: true },
    { value: "CDCG:910A:2222:5498:8475:1111:3900:2020", ret: false },
    { value: "!CDCD:910A:2222:5498:8475:1111:3900:2020", ret: false },
    { value: "2000:0:0:0:0:0:0:1", ret: true },

];
processTestCase(testCases);



console.log("测试RegexValidator");
model._validators = [];
model.addValidator("a", "match", { pattern: /^1[3-9]{1}\d{9}$/ });
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: "a", ret: false },
    { value: "13312341234", ret: true },
    { value: "12312341234", ret: false },
    { value: "13312sdffsd", ret: false },
];
processTestCase(testCases);

console.log("测试RegexValidator");
model._validators = [];
model.addValidator("a", "match", { pattern: /^1[3-9]{1}\d{9}$/, not: true });
testCases = [
    { value: "", ret: true },
    { value: null, ret: true },
    { value: "a", ret: true },
    { value: "13312341234", ret: false },
    { value: "12312341234", ret: true },
    { value: "13312sdffsd", ret: true },
];
processTestCase(testCases);