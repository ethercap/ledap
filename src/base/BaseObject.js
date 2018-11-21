"use strict";
exports.__esModule = true;
var BaseObject = /** @class */ (function () {
    function BaseObject() {
        this.init();
    }
    BaseObject.prototype.load = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        this.init();
    };
    BaseObject.prototype.init = function () {
        for (var key in this) {
            if (key.substr(0, 1) == '_') {
                Object.defineProperty(this, key, {
                    enumerable: false,
                    value: this[key],
                    configurable: true,
                    writable: true
                });
            }
            if (typeof (this[key]) === 'function') {
                Object.defineProperty(this, key, {
                    enumerable: false,
                    value: this[key],
                    configurable: true,
                    writable: true
                });
            }
        }
    };
    return BaseObject;
}());
exports["default"] = BaseObject;
