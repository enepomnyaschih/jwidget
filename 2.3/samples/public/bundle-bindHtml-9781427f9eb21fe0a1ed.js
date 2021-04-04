(self["webpackChunk"] = self["webpackChunk"] || []).push([["bindHtml"],{

/***/ "./bindHtml/Application.jw.html":
/*!**************************************!*\
  !*** ./bindHtml/Application.jw.html ***!
  \**************************************/
/***/ (function(module) {

module.exports = "<div jwclass=\"application\"><div>HTML:</div><textarea jwid=\"input\" rows=\"5\" cols=\"80\"></textarea><div>Output:</div><div jwid=\"output\"></div></div>\n";

/***/ }),

/***/ "../../main/dist/bindHtml.js":
/*!***********************************!*\
  !*** ../../main/dist/bindHtml.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));

var HtmlUpdater = /*#__PURE__*/function (_Class_1$default) {
  _inherits(HtmlUpdater, _Class_1$default);

  var _super = _createSuper(HtmlUpdater);

  function HtmlUpdater(el, property) {
    var _this;

    _classCallCheck(this, HtmlUpdater);

    _this = _super.call(this);
    _this.el = el;
    _this.property = property;

    _this._update();

    _this.own(property.onChange.listen(_this._update, _assertThisInitialized(_this)));

    return _this;
  }

  _createClass(HtmlUpdater, [{
    key: "_update",
    value: function _update() {
      this.el.html(this.property.get());
    }
  }]);

  return HtmlUpdater;
}(Class_1.default);
/**
 * Binds inner HTML of a DOM element to a string `Property`.
 * @param el DOM element.
 * @param property HTML value.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */


function bindHtml(el, property) {
  return new HtmlUpdater(el, property);
}

exports.default = bindHtml;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW5kSHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRixJQUFBLE9BQUEsR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBOztJQUdNLFc7Ozs7O0FBQ0wsdUJBQW9CLEVBQXBCLEVBQW9ELFFBQXBELEVBQThFO0FBQUE7O0FBQUE7O0FBQzdFO0FBRG1CLFVBQUEsRUFBQSxHQUFBLEVBQUE7QUFBZ0MsVUFBQSxRQUFBLEdBQUEsUUFBQTs7QUFFbkQsVUFBSyxPQUFMOztBQUNBLFVBQUssR0FBTCxDQUFTLFFBQVEsQ0FBQyxRQUFULENBQWtCLE1BQWxCLENBQXlCLE1BQUssT0FBOUIsZ0NBQVQ7O0FBSDZFO0FBSTdFOzs7O1dBRU8sbUJBQU87QUFDZCxXQUFLLEVBQUwsQ0FBUSxJQUFSLENBQWEsS0FBSyxRQUFMLENBQWMsR0FBZCxFQUFiO0FBQ0E7Ozs7RUFUd0IsT0FBQSxDQUFBLE87QUFZMUI7Ozs7O0FBS0c7OztBQUNILFNBQXdCLFFBQXhCLENBQWlDLEVBQWpDLEVBQXlELFFBQXpELEVBQW1GO0FBQ2xGLFNBQU8sSUFBSSxXQUFKLENBQWdCLEVBQWhCLEVBQW9CLFFBQXBCLENBQVA7QUFDQTs7QUFGRCxPQUFBLENBQUEsT0FBQSxHQUFBLFFBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIxIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgQmluZGFibGUgZnJvbSAnLi9CaW5kYWJsZSc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9DbGFzcyc7XG5pbXBvcnQgRGVzdHJveWFibGUgZnJvbSAnLi9EZXN0cm95YWJsZSc7XG5cbmNsYXNzIEh0bWxVcGRhdGVyIGV4dGVuZHMgQ2xhc3Mge1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBIdG1sVXBkYXRlckVsZW1lbnQsIHByaXZhdGUgcHJvcGVydHk6IEJpbmRhYmxlPHN0cmluZz4pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdHRoaXMub3duKHByb3BlcnR5Lm9uQ2hhbmdlLmxpc3Rlbih0aGlzLl91cGRhdGUsIHRoaXMpKTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZSgpIHtcblx0XHR0aGlzLmVsLmh0bWwodGhpcy5wcm9wZXJ0eS5nZXQoKSk7XG5cdH1cbn1cblxuLyoqXG4gKiBCaW5kcyBpbm5lciBIVE1MIG9mIGEgRE9NIGVsZW1lbnQgdG8gYSBzdHJpbmcgYFByb3BlcnR5YC5cbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cbiAqIEBwYXJhbSBwcm9wZXJ0eSBIVE1MIHZhbHVlLlxuICogQHJldHVybnMgQmluZGluZyBvYmplY3QuIFlvdSBtdXN0IGRlc3Ryb3kgaXQgdG8gc3RvcCB0aGUgc3luY2hyb25pemF0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kSHRtbChlbDogSHRtbFVwZGF0ZXJFbGVtZW50LCBwcm9wZXJ0eTogQmluZGFibGU8c3RyaW5nPik6IERlc3Ryb3lhYmxlIHtcblx0cmV0dXJuIG5ldyBIdG1sVXBkYXRlcihlbCwgcHJvcGVydHkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEh0bWxVcGRhdGVyRWxlbWVudCB7XG5cdGh0bWwoaHRtbDogc3RyaW5nKTogdm9pZDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=

/***/ }),

/***/ "./bindHtml/Application.ts":
/*!*********************************!*\
  !*** ./bindHtml/Application.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var bindHtml_1 = __importDefault(__webpack_require__(/*! jwidget/bindHtml */ "../../main/dist/bindHtml.js"));

var bindVal_1 = __importDefault(__webpack_require__(/*! jwidget/bindVal */ "../../main/dist/bindVal.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var Application = /*#__PURE__*/function (_Component_1$default) {
  _inherits(Application, _Component_1$default);

  var _super = _createSuper(Application);

  function Application() {
    _classCallCheck(this, Application);

    return _super.apply(this, arguments);
  }

  _createClass(Application, [{
    key: "renderOutput",
    value: function renderOutput(el) {
      var input = this.getElement("input");
      input.html('<b>Hello!</b>'); // Watch input value

      var html = bindVal_1.default(input); // Bind inner HTML to html property value

      bindHtml_1.default(el, html);
    }
  }]);

  return Application;
}(Component_1.default);

Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./bindHtml/Application.jw.html"))], Application);
exports.default = Application;

/***/ }),

/***/ "./bindHtml/index.ts":
/*!***************************!*\
  !*** ./bindHtml/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js"));

var initExample_1 = __importDefault(__webpack_require__(/*! ../common/initExample */ "./common/initExample.ts"));

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindHtml/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("bindHtml", ["Application.ts", "Application.jw.html", "index.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ }),

/***/ "./common/initExample.ts":
/*!*******************************!*\
  !*** ./common/initExample.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js"));

__webpack_require__(/*! core-js/stable */ "../../node_modules/core-js/stable/index.js");

__webpack_require__(/*! regenerator-runtime/runtime */ "../../node_modules/regenerator-runtime/runtime.js");

function initExample(name, links) {
  var el = jquery_1.default('<div style="float: right; width: 600px"><b>Source:</b> </div>');
  var first = true;
  links.forEach(function (link) {
    if (first) {
      first = false;
    } else {
      el.append(', ');
    }

    el.append(jquery_1.default('<a target="_blank"></a>').text(link).attr("href", "src/".concat(name, "/").concat(link, ".txt")));
  });
  jquery_1.default("body").prepend('<div><b>Example</b></div><div><a href="javascript:location.reload()">Refresh</a></div><hr style="clear: both">').prepend(el);
}

exports.default = initExample;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_stable_index_js-node_modules_jquery_dist_jquery_js-node_modules_-a4ae47","main_dist_Component_js-main_dist_template_js","main_dist_bindVal_js"], function() { return __webpack_exec__("./bindHtml/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9iaW5kSHRtbC9BcHBsaWNhdGlvbi5qdy5odG1sIiwid2VicGFjazovLy8uLi9tYWluL2Rpc3QvYmluZEh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vYmluZEh0bWwvQXBwbGljYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vYmluZEh0bWwvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL2luaXRFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsaUw7Ozs7Ozs7Ozs7O0FDQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDJCQUEyQiwyRUFBMkUsa0NBQWtDLG1CQUFtQixHQUFHLEVBQUUsT0FBTyxrQ0FBa0MsOEhBQThILEdBQUcsRUFBRSxxQkFBcUI7O0FBRXhYLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFOztBQUUzVCw2REFBNkQsc0VBQXNFLDhEQUE4RCxvQkFBb0I7O0FBRXJOLDBDQUEwQywrREFBK0QsMkVBQTJFLEVBQUUseUVBQXlFLGVBQWUsc0RBQXNELEVBQUUsRUFBRSx1REFBdUQ7O0FBRS9YLGdDQUFnQyw0RUFBNEUsaUJBQWlCLFVBQVUsR0FBRyw4QkFBOEI7O0FBRXhLLGdDQUFnQyw2REFBNkQseUNBQXlDLDhDQUE4QyxpQ0FBaUMsbURBQW1ELHlEQUF5RCxFQUFFLE9BQU8sdUNBQXVDLEVBQUUsaURBQWlELEdBQUc7O0FBRXZhLGlEQUFpRCwwRUFBMEUsYUFBYSxFQUFFLHFDQUFxQzs7QUFFL0ssdUNBQXVDLHVCQUF1Qix1RkFBdUYsRUFBRSxhQUFhOztBQUVwSyxzQ0FBc0Msd0VBQXdFLDBDQUEwQyw4Q0FBOEMsTUFBTSw2RUFBNkUsR0FBRyxhQUFhLEVBQUUsWUFBWSxjQUFjLEVBQUU7O0FBRXZVLDZCQUE2QixnR0FBZ0csZ0RBQWdELEdBQUcsMkJBQTJCOztBQUUzTTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQzs7QUFFRiw4QkFBOEIsbUJBQU8sQ0FBQyx5Q0FBUzs7QUFFL0M7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7QUFDZiwyQ0FBMkMsY0FBYyxtOEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0R3pEOztBQUNBOztBQUNBOztBQUNBOztBQUdBLElBQXFCLFdBQXJCO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxXQUVXLHNCQUFhLEVBQWIsRUFBdUI7QUFDaEMsVUFBTSxLQUFLLEdBQUcsS0FBSyxVQUFMLENBQWdCLE9BQWhCLENBQWQ7QUFDQSxXQUFLLENBQUMsSUFBTixDQUFXLGVBQVgsRUFGZ0MsQ0FJaEM7O0FBQ0EsVUFBTSxJQUFJLEdBQUcsa0JBQWdCLEtBQWhCLENBQWIsQ0FMZ0MsQ0FPaEM7O0FBQ0EseUJBQVMsRUFBVCxFQUFhLElBQWI7QUFDQTtBQVhGOztBQUFBO0FBQUEsRUFBeUMsbUJBQXpDOztBQUFxQixXQUFXLGVBRC9CLG1CQUFTLG1CQUFPLENBQUMsNkRBQUQsQ0FBaEIsQ0FDK0IsR0FBWCxXQUFXLENBQVg7a0JBQUEsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOckI7O0FBQ0E7O0FBQ0E7O0FBRUEsaUJBQUUsWUFBSztBQUNOLHdCQUFZLFVBQVosRUFBd0IsQ0FBQyxnQkFBRCxFQUFtQixxQkFBbkIsRUFBMEMsVUFBMUMsQ0FBeEI7QUFDQSxNQUFJLHFCQUFKLEdBQWtCLFFBQWxCLENBQTJCLE1BQTNCO0FBQ0EsQ0FIRCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBOztBQUNBOztBQUNBOztBQUVBLFNBQXdCLFdBQXhCLENBQW9DLElBQXBDLEVBQWtELEtBQWxELEVBQWlFO0FBQ2hFLE1BQU0sRUFBRSxHQUFHLGlCQUFFLCtEQUFGLENBQVg7QUFDQSxNQUFJLEtBQUssR0FBRyxJQUFaO0FBQ0EsT0FBSyxDQUFDLE9BQU4sQ0FBYyxVQUFDLElBQUQsRUFBUztBQUN0QixRQUFJLEtBQUosRUFBVztBQUNWLFdBQUssR0FBRyxLQUFSO0FBQ0EsS0FGRCxNQUVPO0FBQ04sUUFBRSxDQUFDLE1BQUgsQ0FBVSxJQUFWO0FBQ0E7O0FBQ0QsTUFBRSxDQUFDLE1BQUgsQ0FBVSxpQkFBRSx5QkFBRixFQUE2QixJQUE3QixDQUFrQyxJQUFsQyxFQUF3QyxJQUF4QyxDQUE2QyxNQUE3QyxnQkFBNEQsSUFBNUQsY0FBb0UsSUFBcEUsVUFBVjtBQUNBLEdBUEQ7QUFRQSxtQkFBRSxNQUFGLEVBQVUsT0FBVixDQUFrQixnSEFBbEIsRUFBb0ksT0FBcEksQ0FBNEksRUFBNUk7QUFDQTs7QUFaRCw4QiIsImZpbGUiOiJidW5kbGUtYmluZEh0bWwtOTc4MTQyN2Y5ZWIyMWZlMGExZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBqd2NsYXNzPVxcXCJhcHBsaWNhdGlvblxcXCI+PGRpdj5IVE1MOjwvZGl2Pjx0ZXh0YXJlYSBqd2lkPVxcXCJpbnB1dFxcXCIgcm93cz1cXFwiNVxcXCIgY29scz1cXFwiODBcXFwiPjwvdGV4dGFyZWE+PGRpdj5PdXRwdXQ6PC9kaXY+PGRpdiBqd2lkPVxcXCJvdXRwdXRcXFwiPjwvZGl2PjwvZGl2PlxcblwiOyIsIlwidXNlIHN0cmljdFwiO1xuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMSBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuZnVuY3Rpb24gX2NyZWF0ZVN1cGVyKERlcml2ZWQpIHsgdmFyIGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCk7IHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHsgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLCByZXN1bHQ7IGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7IHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7IHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7IH0gZWxzZSB7IHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7IH07IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxudmFyIF9faW1wb3J0RGVmYXVsdCA9IHZvaWQgMCAmJiAodm9pZCAwKS5fX2ltcG9ydERlZmF1bHQgfHwgZnVuY3Rpb24gKG1vZCkge1xuICByZXR1cm4gbW9kICYmIG1vZC5fX2VzTW9kdWxlID8gbW9kIDoge1xuICAgIFwiZGVmYXVsdFwiOiBtb2RcbiAgfTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBDbGFzc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NsYXNzXCIpKTtcblxudmFyIEh0bWxVcGRhdGVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQ2xhc3NfMSRkZWZhdWx0KSB7XG4gIF9pbmhlcml0cyhIdG1sVXBkYXRlciwgX0NsYXNzXzEkZGVmYXVsdCk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihIdG1sVXBkYXRlcik7XG5cbiAgZnVuY3Rpb24gSHRtbFVwZGF0ZXIoZWwsIHByb3BlcnR5KSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEh0bWxVcGRhdGVyKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgX3RoaXMuZWwgPSBlbDtcbiAgICBfdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuXG4gICAgX3RoaXMuX3VwZGF0ZSgpO1xuXG4gICAgX3RoaXMub3duKHByb3BlcnR5Lm9uQ2hhbmdlLmxpc3RlbihfdGhpcy5fdXBkYXRlLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSkpO1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEh0bWxVcGRhdGVyLCBbe1xuICAgIGtleTogXCJfdXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgICB0aGlzLmVsLmh0bWwodGhpcy5wcm9wZXJ0eS5nZXQoKSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEh0bWxVcGRhdGVyO1xufShDbGFzc18xLmRlZmF1bHQpO1xuLyoqXHJcbiAqIEJpbmRzIGlubmVyIEhUTUwgb2YgYSBET00gZWxlbWVudCB0byBhIHN0cmluZyBgUHJvcGVydHlgLlxyXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSBwcm9wZXJ0eSBIVE1MIHZhbHVlLlxyXG4gKiBAcmV0dXJucyBCaW5kaW5nIG9iamVjdC4gWW91IG11c3QgZGVzdHJveSBpdCB0byBzdG9wIHRoZSBzeW5jaHJvbml6YXRpb24uXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGJpbmRIdG1sKGVsLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gbmV3IEh0bWxVcGRhdGVyKGVsLCBwcm9wZXJ0eSk7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGJpbmRIdG1sO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlpYVc1a1NIUnRiQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UVVGelFrVTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRkhSaXhKUVVGQkxFOUJRVUVzUjBGQlFTeGxRVUZCTEVOQlFVRXNUMEZCUVN4RFFVRkJMRk5CUVVFc1EwRkJRU3hEUVVGQk96dEpRVWROTEZjN096czdPMEZCUTB3c2RVSkJRVzlDTEVWQlFYQkNMRVZCUVc5RUxGRkJRWEJFTEVWQlFUaEZPMEZCUVVFN08wRkJRVUU3TzBGQlF6ZEZPMEZCUkcxQ0xGVkJRVUVzUlVGQlFTeEhRVUZCTEVWQlFVRTdRVUZCWjBNc1ZVRkJRU3hSUVVGQkxFZEJRVUVzVVVGQlFUczdRVUZGYmtRc1ZVRkJTeXhQUVVGTU96dEJRVU5CTEZWQlFVc3NSMEZCVEN4RFFVRlRMRkZCUVZFc1EwRkJReXhSUVVGVUxFTkJRV3RDTEUxQlFXeENMRU5CUVhsQ0xFMUJRVXNzVDBGQk9VSXNaME5CUVZRN08wRkJTRFpGTzBGQlNUZEZPenM3TzFkQlJVOHNiVUpCUVU4N1FVRkRaQ3hYUVVGTExFVkJRVXdzUTBGQlVTeEpRVUZTTEVOQlFXRXNTMEZCU3l4UlFVRk1MRU5CUVdNc1IwRkJaQ3hGUVVGaU8wRkJRMEU3T3pzN1JVRlVkMElzVDBGQlFTeERRVUZCTEU4N1FVRlpNVUk3T3pzN08wRkJTMGM3T3p0QlFVTklMRk5CUVhkQ0xGRkJRWGhDTEVOQlFXbERMRVZCUVdwRExFVkJRWGxFTEZGQlFYcEVMRVZCUVcxR08wRkJRMnhHTEZOQlFVOHNTVUZCU1N4WFFVRktMRU5CUVdkQ0xFVkJRV2hDTEVWQlFXOUNMRkZCUVhCQ0xFTkJRVkE3UVVGRFFUczdRVUZHUkN4UFFVRkJMRU5CUVVFc1QwRkJRU3hIUVVGQkxGRkJRVUVpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktseHVUVWxVSUV4cFkyVnVjMlZjYmx4dVEyOXdlWEpwWjJoMElDaGpLU0F5TURJeElFVm5iM0lnVG1Wd2IyMXVlV0Z6WTJocGFGeHVYRzVRWlhKdGFYTnphVzl1SUdseklHaGxjbVZpZVNCbmNtRnVkR1ZrTENCbWNtVmxJRzltSUdOb1lYSm5aU3dnZEc4Z1lXNTVJSEJsY25OdmJpQnZZblJoYVc1cGJtY2dZU0JqYjNCNVhHNXZaaUIwYUdseklITnZablIzWVhKbElHRnVaQ0JoYzNOdlkybGhkR1ZrSUdSdlkzVnRaVzUwWVhScGIyNGdabWxzWlhNZ0tIUm9aU0JjSWxOdlpuUjNZWEpsWENJcExDQjBieUJrWldGc1hHNXBiaUIwYUdVZ1UyOW1kSGRoY21VZ2QybDBhRzkxZENCeVpYTjBjbWxqZEdsdmJpd2dhVzVqYkhWa2FXNW5JSGRwZEdodmRYUWdiR2x0YVhSaGRHbHZiaUIwYUdVZ2NtbG5hSFJ6WEc1MGJ5QjFjMlVzSUdOdmNIa3NJRzF2WkdsbWVTd2diV1Z5WjJVc0lIQjFZbXhwYzJnc0lHUnBjM1J5YVdKMWRHVXNJSE4xWW14cFkyVnVjMlVzSUdGdVpDOXZjaUJ6Wld4c1hHNWpiM0JwWlhNZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTENCaGJtUWdkRzhnY0dWeWJXbDBJSEJsY25OdmJuTWdkRzhnZDJodmJTQjBhR1VnVTI5bWRIZGhjbVVnYVhOY2JtWjFjbTVwYzJobFpDQjBieUJrYnlCemJ5d2djM1ZpYW1WamRDQjBieUIwYUdVZ1ptOXNiRzkzYVc1bklHTnZibVJwZEdsdmJuTTZYRzVjYmxSb1pTQmhZbTkyWlNCamIzQjVjbWxuYUhRZ2JtOTBhV05sSUdGdVpDQjBhR2x6SUhCbGNtMXBjM05wYjI0Z2JtOTBhV05sSUhOb1lXeHNJR0psSUdsdVkyeDFaR1ZrSUdsdUlHRnNiRnh1WTI5d2FXVnpJRzl5SUhOMVluTjBZVzUwYVdGc0lIQnZjblJwYjI1eklHOW1JSFJvWlNCVGIyWjBkMkZ5WlM1Y2JseHVWRWhGSUZOUFJsUlhRVkpGSUVsVElGQlNUMVpKUkVWRUlGd2lRVk1nU1ZOY0lpd2dWMGxVU0U5VlZDQlhRVkpTUVU1VVdTQlBSaUJCVGxrZ1MwbE9SQ3dnUlZoUVVrVlRVeUJQVWx4dVNVMVFURWxGUkN3Z1NVNURURlZFU1U1SElFSlZWQ0JPVDFRZ1RFbE5TVlJGUkNCVVR5QlVTRVVnVjBGU1VrRk9WRWxGVXlCUFJpQk5SVkpEU0VGT1ZFRkNTVXhKVkZrc1hHNUdTVlJPUlZOVElFWlBVaUJCSUZCQlVsUkpRMVZNUVZJZ1VGVlNVRTlUUlNCQlRrUWdUazlPU1U1R1VrbE9SMFZOUlU1VUxpQkpUaUJPVHlCRlZrVk9WQ0JUU0VGTVRDQlVTRVZjYmtGVlZFaFBVbE1nVDFJZ1EwOVFXVkpKUjBoVUlFaFBURVJGVWxNZ1FrVWdURWxCUWt4RklFWlBVaUJCVGxrZ1EweEJTVTBzSUVSQlRVRkhSVk1nVDFJZ1QxUklSVkpjYmt4SlFVSkpURWxVV1N3Z1YwaEZWRWhGVWlCSlRpQkJUaUJCUTFSSlQwNGdUMFlnUTA5T1ZGSkJRMVFzSUZSUFVsUWdUMUlnVDFSSVJWSlhTVk5GTENCQlVrbFRTVTVISUVaU1QwMHNYRzVQVlZRZ1QwWWdUMUlnU1U0Z1EwOU9Ua1ZEVkVsUFRpQlhTVlJJSUZSSVJTQlRUMFpVVjBGU1JTQlBVaUJVU0VVZ1ZWTkZJRTlTSUU5VVNFVlNJRVJGUVV4SlRrZFRJRWxPSUZSSVJWeHVVMDlHVkZkQlVrVXVYRzRxTDF4dVhHNXBiWEJ2Y25RZ1FtbHVaR0ZpYkdVZ1puSnZiU0FuTGk5Q2FXNWtZV0pzWlNjN1hHNXBiWEJ2Y25RZ1EyeGhjM01nWm5KdmJTQW5MaTlEYkdGemN5YzdYRzVwYlhCdmNuUWdSR1Z6ZEhKdmVXRmliR1VnWm5KdmJTQW5MaTlFWlhOMGNtOTVZV0pzWlNjN1hHNWNibU5zWVhOeklFaDBiV3hWY0dSaGRHVnlJR1Y0ZEdWdVpITWdRMnhoYzNNZ2UxeHVYSFJqYjI1emRISjFZM1J2Y2lod2NtbDJZWFJsSUdWc09pQklkRzFzVlhCa1lYUmxja1ZzWlcxbGJuUXNJSEJ5YVhaaGRHVWdjSEp2Y0dWeWRIazZJRUpwYm1SaFlteGxQSE4wY21sdVp6NHBJSHRjYmx4MFhIUnpkWEJsY2lncE8xeHVYSFJjZEhSb2FYTXVYM1Z3WkdGMFpTZ3BPMXh1WEhSY2RIUm9hWE11YjNkdUtIQnliM0JsY25SNUxtOXVRMmhoYm1kbExteHBjM1JsYmloMGFHbHpMbDkxY0dSaGRHVXNJSFJvYVhNcEtUdGNibHgwZlZ4dVhHNWNkSEJ5YVhaaGRHVWdYM1Z3WkdGMFpTZ3BJSHRjYmx4MFhIUjBhR2x6TG1Wc0xtaDBiV3dvZEdocGN5NXdjbTl3WlhKMGVTNW5aWFFvS1NrN1hHNWNkSDFjYm4xY2JseHVMeW9xWEc0Z0tpQkNhVzVrY3lCcGJtNWxjaUJJVkUxTUlHOW1JR0VnUkU5TklHVnNaVzFsYm5RZ2RHOGdZU0J6ZEhKcGJtY2dZRkJ5YjNCbGNuUjVZQzVjYmlBcUlFQndZWEpoYlNCbGJDQkVUMDBnWld4bGJXVnVkQzVjYmlBcUlFQndZWEpoYlNCd2NtOXdaWEowZVNCSVZFMU1JSFpoYkhWbExseHVJQ29nUUhKbGRIVnlibk1nUW1sdVpHbHVaeUJ2WW1wbFkzUXVJRmx2ZFNCdGRYTjBJR1JsYzNSeWIza2dhWFFnZEc4Z2MzUnZjQ0IwYUdVZ2MzbHVZMmh5YjI1cGVtRjBhVzl1TGx4dUlDb3ZYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpQmlhVzVrU0hSdGJDaGxiRG9nU0hSdGJGVndaR0YwWlhKRmJHVnRaVzUwTENCd2NtOXdaWEowZVRvZ1FtbHVaR0ZpYkdVOGMzUnlhVzVuUGlrNklFUmxjM1J5YjNsaFlteGxJSHRjYmx4MGNtVjBkWEp1SUc1bGR5QklkRzFzVlhCa1lYUmxjaWhsYkN3Z2NISnZjR1Z5ZEhrcE8xeHVmVnh1WEc1bGVIQnZjblFnYVc1MFpYSm1ZV05sSUVoMGJXeFZjR1JoZEdWeVJXeGxiV1Z1ZENCN1hHNWNkR2gwYld3b2FIUnRiRG9nYzNSeWFXNW5LVG9nZG05cFpEdGNibjFjYmlKZExDSnpiM1Z5WTJWU2IyOTBJam9pSW4wPSIsImltcG9ydCBiaW5kSHRtbCBmcm9tIFwiandpZGdldC9iaW5kSHRtbFwiO1xuaW1wb3J0IGJpbmRWYWwgZnJvbSBcImp3aWRnZXQvYmluZFZhbFwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiandpZGdldC90ZW1wbGF0ZVwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZShcIi4vQXBwbGljYXRpb24uancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRwcm90ZWN0ZWQgcmVuZGVyT3V0cHV0KGVsOiBKUXVlcnkpIHtcblx0XHRjb25zdCBpbnB1dCA9IHRoaXMuZ2V0RWxlbWVudChcImlucHV0XCIpO1xuXHRcdGlucHV0Lmh0bWwoJzxiPkhlbGxvITwvYj4nKTtcblxuXHRcdC8vIFdhdGNoIGlucHV0IHZhbHVlXG5cdFx0Y29uc3QgaHRtbCA9IGJpbmRWYWw8c3RyaW5nPihpbnB1dCk7XG5cblx0XHQvLyBCaW5kIGlubmVyIEhUTUwgdG8gaHRtbCBwcm9wZXJ0eSB2YWx1ZVxuXHRcdGJpbmRIdG1sKGVsLCBodG1sKTtcblx0fVxufVxuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IGluaXRFeGFtcGxlIGZyb20gXCIuLi9jb21tb24vaW5pdEV4YW1wbGVcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9BcHBsaWNhdGlvblwiO1xuXG4kKCgpID0+IHtcblx0aW5pdEV4YW1wbGUoXCJiaW5kSHRtbFwiLCBbXCJBcHBsaWNhdGlvbi50c1wiLCBcIkFwcGxpY2F0aW9uLmp3Lmh0bWxcIiwgXCJpbmRleC50c1wiXSk7XG5cdG5ldyBBcHBsaWNhdGlvbigpLnJlbmRlclRvKFwiYm9keVwiKTtcbn0pO1xuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IFwiY29yZS1qcy9zdGFibGVcIjtcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0RXhhbXBsZShuYW1lOiBzdHJpbmcsIGxpbmtzOiBzdHJpbmdbXSkge1xuXHRjb25zdCBlbCA9ICQoJzxkaXYgc3R5bGU9XCJmbG9hdDogcmlnaHQ7IHdpZHRoOiA2MDBweFwiPjxiPlNvdXJjZTo8L2I+IDwvZGl2PicpO1xuXHRsZXQgZmlyc3QgPSB0cnVlO1xuXHRsaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG5cdFx0aWYgKGZpcnN0KSB7XG5cdFx0XHRmaXJzdCA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5hcHBlbmQoJywgJyk7XG5cdFx0fVxuXHRcdGVsLmFwcGVuZCgkKCc8YSB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+JykudGV4dChsaW5rKS5hdHRyKFwiaHJlZlwiLCBgc3JjLyR7bmFtZX0vJHtsaW5rfS50eHRgKSk7XG5cdH0pO1xuXHQkKFwiYm9keVwiKS5wcmVwZW5kKCc8ZGl2PjxiPkV4YW1wbGU8L2I+PC9kaXY+PGRpdj48YSBocmVmPVwiamF2YXNjcmlwdDpsb2NhdGlvbi5yZWxvYWQoKVwiPlJlZnJlc2g8L2E+PC9kaXY+PGhyIHN0eWxlPVwiY2xlYXI6IGJvdGhcIj4nKS5wcmVwZW5kKGVsKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=