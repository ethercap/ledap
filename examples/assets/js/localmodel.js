// 构建一个本地model。model本质上是后端逻辑的聚合，model的label, hint, rules一般情况下是可以在多个页面间复用的。
function LocalModel() {
    this.city = "北京";
    this.phone = "";
    this.password = "";
    this.stayCity = "上海";
    this.sex = 1;
}
cityOptions = {
    "list": {
        "北京": "北京",
        "上海": "上海",
        "杭州": "杭州",
        "成都": "成都",
        "武汉": "武汉",
        "南京": "南京",
        "厦门": "厦门",
        "其他": "其他"
    },
    "multiple": false,
    "excludes" : [],
    "message": "城市的值不正确",
    "skipOnEmpty": 1
};

LocalModel.prototype = new ledap.Model();

LocalModel.prototype.attributeLabels = function(){
    return {
        "city" : "城市",
        "phone" : "手机号",
        "stayCity" : "常驻城市",
        "sex" : "性别",
        "password" : "密码",
    };
};
LocalModel.prototype.attributeHints = function(){
    return {
        "phone" : "请输入手机号"
    }; 
};

//具体格式参见validator的说明, 表单需要规则校验就写，不需要可省略
LocalModel.prototype.rules = function() {
    return {
        "city" : {
            "dict" : cityOptions,
        },
        "stayCity" : {
            //使用dict规则，代表值是dict中的一个key
            "dict" : cityOptions,
        },
        "phone" : {
            match : {
                "pattern": "/^1[3-9]{1}\\d{9}$/",
                "message": "手机号格式不正确。",
                "skipOnEmpty": 1
            } 
        },
        "sex" : {
            dict : {
                "list": {
                    "1": "男",
                    "2": "女"
                },
                "multiple": false,
                "excludes" : [],
                "message": "性别不正确",
                "skipOnEmpty": 1
            },
        },
        "password" : {
            //使用required规则，代表密码必须填写
            "required" : {"message" : "密码必须填写",},
            //使用match规则，规定password的格式
            "match" : {
                "pattern": "/(?=^.{8,16}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/",
                "message": "密码必须8-16位且包含大小写字母，数字或特殊字符。",
                "skipOnEmpty": 1
            },
        },
    };
};
