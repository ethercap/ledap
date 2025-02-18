import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
/******/ var __webpack_modules__ = ({

/***/ 942:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  aE: () => (/* reexport */ BaseInput),
  eI: () => (/* reexport */ formItem_FormItem),
  zG: () => (/* reexport */ contexts_FormItemContext),
  cm: () => (/* reexport */ formItem_FormItemLabel),
  b1: () => (/* reexport */ useLedapModel)
});

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(942);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
;// external "react"
var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
const external_react_namespaceObject = x({ ["createContext"]: () => (__WEBPACK_EXTERNAL_MODULE_react__.createContext), ["default"]: () => (__WEBPACK_EXTERNAL_MODULE_react__["default"]), ["useState"]: () => (__WEBPACK_EXTERNAL_MODULE_react__.useState) });
;// ./src/platforms/react/components/formItem/BaseInput.tsx


var InputEvents = {
  blur: "blur",
  focus: "focus",
  input: "input"
};
function BaseInput(props) {
  var tag = props.tag,
    attr = props.attr,
    model = props.model,
    maxLength = props.maxLength,
    _props$type = props.type,
    type = _props$type === void 0 ? "text" : _props$type,
    _props$validate = props.validate,
    validate = _props$validate === void 0 ? [InputEvents.blur] : _props$validate,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    onInput = props.onInput,
    onSetValue = props.onSetValue,
    _props$value = props.value,
    value = _props$value === void 0 ? "" : _props$value,
    className = props.className;
  function _checkValue(eventType) {
    if (validate.indexOf(eventType) > -1) {
      model.validate(attr, true);
    }
  }
  function _onInput(e) {
    var _e$target;
    var value = e === null || e === void 0 || (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value;
    onSetValue === null || onSetValue === void 0 || onSetValue(value);
    _checkValue(InputEvents.input);
    onInput === null || onInput === void 0 || onInput(e);
  }
  function _onFocus(e) {
    _checkValue(InputEvents.focus);
    onFocus === null || onFocus === void 0 || onFocus(e);
  }
  function _onBlur(e) {
    _checkValue(InputEvents.blur);
    onBlur === null || onBlur === void 0 || onBlur(e);
  }
  return /*#__PURE__*/external_react_namespaceObject["default"].createElement("div", null, tag == "textarea" ? /*#__PURE__*/external_react_namespaceObject["default"].createElement("textarea", {
    className: classnames_default()(className),
    name: attr,
    value: value,
    placeholder: model.getAttributeHint(attr),
    maxLength: maxLength,
    onInput: _onInput,
    onFocus: _onFocus,
    onBlur: _onBlur
  }) : /*#__PURE__*/external_react_namespaceObject["default"].createElement("input", {
    className: classnames_default()(className),
    name: attr,
    value: value,
    placeholder: model.getAttributeHint(attr),
    maxLength: maxLength,
    type: type,
    onChange: _onInput,
    onFocus: _onFocus,
    onBlur: _onBlur
  }));
}
;// ./src/platforms/react/components/formItem/FormItemLabel.tsx


function FormItemLabel(props) {
  var _props$labelComponent = props.labelComponent,
    labelComponent = _props$labelComponent === void 0 ? null : _props$labelComponent,
    _props$model = props.model,
    model = _props$model === void 0 ? null : _props$model,
    _props$attr = props.attr,
    attr = _props$attr === void 0 ? "" : _props$attr,
    _props$label = props.label,
    label = _props$label === void 0 ? "" : _props$label,
    className = props.className;
  return labelComponent ? labelComponent : /*#__PURE__*/external_react_namespaceObject["default"].createElement("label", {
    className: classnames_default()(className)
  }, label || (model === null || model === void 0 ? void 0 : model.getAttributeLabel(attr)), model !== null && model !== void 0 && model.isRequired(attr) ? "*" : "");
}
/* harmony default export */ const formItem_FormItemLabel = (FormItemLabel);
;// ./src/platforms/react/contexts/FormItemContext.js

var FormItemContext = /*#__PURE__*/(0,external_react_namespaceObject.createContext)({});
/* harmony default export */ const contexts_FormItemContext = (FormItemContext);
;// ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

;// ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

;// ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

;// ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

;// ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

;// ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

;// ./src/platforms/react/hooks/useLedapModel.js



/**
 * 实现 react 数据的双向绑定
 * 组件调用 setValue() 触发组件重新渲染和修改model值
 * @param {*} model ledap框架load返回的model对象
 * @returns 
 */
function useLedapModel(model) {
  var _useState = (0,external_react_namespaceObject.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    bool = _useState2[0],
    setbool = _useState2[1];
  function _setValue(attr, val) {
    model[attr] = val;
    setbool(function (bool) {
      return !bool;
    });
  }
  function getValue(attr) {
    return model[attr];
  }
  return {
    setValue: _setValue,
    getValue: getValue
  };
}
;// ./src/platforms/react/components/formItem/style.module.less
// extracted by mini-css-extract-plugin
var _1 = "_formitem_wNmvp";


;// ./src/platforms/react/components/formItem/style2.module.css
// extracted by mini-css-extract-plugin
var style2_module_1 = "_formitem2_KlGz2";


;// ./src/platforms/react/components/formItem/FormItem.tsx










function FormItem(props) {
  var _props$tag = props.tag,
    Tag = _props$tag === void 0 ? "div" : _props$tag,
    _props$LabelComponent = props.LabelComponent,
    LabelComponent = _props$LabelComponent === void 0 ? formItem_FormItemLabel : _props$LabelComponent,
    _props$FormComponent = props.FormComponent,
    FormComponent = _props$FormComponent === void 0 ? BaseInput : _props$FormComponent,
    model = props.model,
    attr = props.attr,
    label = props.label,
    validate = props.validate,
    children = props.children,
    className = props.className,
    errorComponent = props.errorComponent;
  var _useLedapModel = useLedapModel(model),
    setValue = _useLedapModel.setValue,
    getValue = _useLedapModel.getValue;
  var error = model.getFirstError(attr);
  var _setValue = function _setValue(val) {
    setValue(attr, val);
  };
  console.log("render formItem value:", model[attr]);
  return /*#__PURE__*/external_react_namespaceObject["default"].createElement(contexts_FormItemContext.Provider, {
    value: {
      getValue: getValue,
      setValue: setValue
    }
  }, /*#__PURE__*/external_react_namespaceObject["default"].createElement(Tag, {
    className: classnames_default()(_1, style2_module_1, className)
  }, /*#__PURE__*/external_react_namespaceObject["default"].createElement(LabelComponent, {
    label: label,
    attr: attr,
    model: model
  }), children ? children : /*#__PURE__*/external_react_namespaceObject["default"].createElement(FormComponent, {
    model: model,
    attr: attr,
    validate: validate,
    onSetValue: _setValue,
    value: model[attr]
  }), errorComponent ? errorComponent : error ? /*#__PURE__*/external_react_namespaceObject["default"].createElement("p", null, error) : null));
}
FormItem.Label = formItem_FormItemLabel;
/* harmony default export */ const formItem_FormItem = (FormItem);
;// ./src/platforms/react/index.ts





var __webpack_exports__BaseInput = __webpack_exports__.aE;
var __webpack_exports__FormItem = __webpack_exports__.eI;
var __webpack_exports__FormItemContext = __webpack_exports__.zG;
var __webpack_exports__FormItemLabel = __webpack_exports__.cm;
var __webpack_exports__useLedapModel = __webpack_exports__.b1;
export { __webpack_exports__BaseInput as BaseInput, __webpack_exports__FormItem as FormItem, __webpack_exports__FormItemContext as FormItemContext, __webpack_exports__FormItemLabel as FormItemLabel, __webpack_exports__useLedapModel as useLedapModel };
