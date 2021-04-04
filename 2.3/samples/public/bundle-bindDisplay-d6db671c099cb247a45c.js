(self["webpackChunk"] = self["webpackChunk"] || []).push([["bindDisplay"],{

/***/ "./bindDisplay/Application.jw.html":
/*!*****************************************!*\
  !*** ./bindDisplay/Application.jw.html ***!
  \*****************************************/
/***/ (function(module) {

module.exports = "<div jwclass=\"application\"><div><label><input jwid=\"checkbox\" type=\"checkbox\">Show rectangle</label></div><div jwid=\"rect\"></div></div>\n";

/***/ }),

/***/ "../../main/dist/bindDisplay.js":
/*!**************************************!*\
  !*** ../../main/dist/bindDisplay.js ***!
  \**************************************/
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

var DisplayUpdater = /*#__PURE__*/function (_Class_1$default) {
  _inherits(DisplayUpdater, _Class_1$default);

  var _super = _createSuper(DisplayUpdater);

  function DisplayUpdater(el, property) {
    var _this;

    _classCallCheck(this, DisplayUpdater);

    _this = _super.call(this);
    _this.el = el;
    _this.property = property;

    _this._update();

    _this.own(property.onChange.listen(_this._update, _assertThisInitialized(_this)));

    return _this;
  }

  _createClass(DisplayUpdater, [{
    key: "_update",
    value: function _update() {
      this.el.css("display", this.property.get() ? "" : "none");
    }
  }]);

  return DisplayUpdater;
}(Class_1.default);
/**
 * Binds visibility of a DOM element to a boolean `Property`.
 * @param el DOM element.
 * @param property Element visibility.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */


function bindDisplay(el, property) {
  return new DisplayUpdater(el, property);
}

exports.default = bindDisplay;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW5kRGlzcGxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRixJQUFBLE9BQUEsR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBOztJQUdNLGM7Ozs7O0FBQ0wsMEJBQW9CLEVBQXBCLEVBQXVELFFBQXZELEVBQWtGO0FBQUE7O0FBQUE7O0FBQ2pGO0FBRG1CLFVBQUEsRUFBQSxHQUFBLEVBQUE7QUFBbUMsVUFBQSxRQUFBLEdBQUEsUUFBQTs7QUFFdEQsVUFBSyxPQUFMOztBQUNBLFVBQUssR0FBTCxDQUFTLFFBQVEsQ0FBQyxRQUFULENBQWtCLE1BQWxCLENBQXlCLE1BQUssT0FBOUIsZ0NBQVQ7O0FBSGlGO0FBSWpGOzs7O1dBRU8sbUJBQU87QUFDZCxXQUFLLEVBQUwsQ0FBUSxHQUFSLENBQVksU0FBWixFQUF1QixLQUFLLFFBQUwsQ0FBYyxHQUFkLEtBQXNCLEVBQXRCLEdBQTJCLE1BQWxEO0FBQ0E7Ozs7RUFUMkIsT0FBQSxDQUFBLE87QUFZN0I7Ozs7O0FBS0c7OztBQUNILFNBQXdCLFdBQXhCLENBQW9DLEVBQXBDLEVBQStELFFBQS9ELEVBQTBGO0FBQ3pGLFNBQU8sSUFBSSxjQUFKLENBQW1CLEVBQW5CLEVBQXVCLFFBQXZCLENBQVA7QUFDQTs7QUFGRCxPQUFBLENBQUEsT0FBQSxHQUFBLFdBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIxIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgQmluZGFibGUgZnJvbSAnLi9CaW5kYWJsZSc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9DbGFzcyc7XG5pbXBvcnQgRGVzdHJveWFibGUgZnJvbSAnLi9EZXN0cm95YWJsZSc7XG5cbmNsYXNzIERpc3BsYXlVcGRhdGVyIGV4dGVuZHMgQ2xhc3Mge1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBEaXNwbGF5VXBkYXRlckVsZW1lbnQsIHByaXZhdGUgcHJvcGVydHk6IEJpbmRhYmxlPGJvb2xlYW4+KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl91cGRhdGUoKTtcblx0XHR0aGlzLm93bihwcm9wZXJ0eS5vbkNoYW5nZS5saXN0ZW4odGhpcy5fdXBkYXRlLCB0aGlzKSk7XG5cdH1cblxuXHRwcml2YXRlIF91cGRhdGUoKSB7XG5cdFx0dGhpcy5lbC5jc3MoXCJkaXNwbGF5XCIsIHRoaXMucHJvcGVydHkuZ2V0KCkgPyBcIlwiIDogXCJub25lXCIpO1xuXHR9XG59XG5cbi8qKlxuICogQmluZHMgdmlzaWJpbGl0eSBvZiBhIERPTSBlbGVtZW50IHRvIGEgYm9vbGVhbiBgUHJvcGVydHlgLlxuICogQHBhcmFtIGVsIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHByb3BlcnR5IEVsZW1lbnQgdmlzaWJpbGl0eS5cbiAqIEByZXR1cm5zIEJpbmRpbmcgb2JqZWN0LiBZb3UgbXVzdCBkZXN0cm95IGl0IHRvIHN0b3AgdGhlIHN5bmNocm9uaXphdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZERpc3BsYXkoZWw6IERpc3BsYXlVcGRhdGVyRWxlbWVudCwgcHJvcGVydHk6IEJpbmRhYmxlPGJvb2xlYW4+KTogRGVzdHJveWFibGUge1xuXHRyZXR1cm4gbmV3IERpc3BsYXlVcGRhdGVyKGVsLCBwcm9wZXJ0eSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcGxheVVwZGF0ZXJFbGVtZW50IHtcblx0Y3NzKHN0eWxlOiBcImRpc3BsYXlcIiwgdmFsdWU6IFwiXCIgfCBcIm5vbmVcIik6IHZvaWQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9

/***/ }),

/***/ "./bindDisplay/Application.ts":
/*!************************************!*\
  !*** ./bindDisplay/Application.ts ***!
  \************************************/
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

var bindDisplay_1 = __importDefault(__webpack_require__(/*! jwidget/bindDisplay */ "../../main/dist/bindDisplay.js"));

var bindProp_1 = __importDefault(__webpack_require__(/*! jwidget/bindProp */ "../../main/dist/bindProp.js"));

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
    key: "renderRect",
    value: function renderRect(el) {
      // Watch checkbox state
      var checked = bindProp_1.default(this.getElement("checkbox"), "checked"); // Bind rectangle visibility to property value

      bindDisplay_1.default(el, checked);
    }
  }]);

  return Application;
}(Component_1.default);

Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./bindDisplay/Application.jw.html"))], Application);
exports.default = Application;

/***/ }),

/***/ "./bindDisplay/index.ts":
/*!******************************!*\
  !*** ./bindDisplay/index.ts ***!
  \******************************/
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindDisplay/Application.ts"));

__webpack_require__(/*! ./Application.styl */ "./bindDisplay/Application.styl");

jquery_1.default(function () {
  initExample_1.default("bindDisplay", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ }),

/***/ "./bindDisplay/Application.styl":
/*!**************************************!*\
  !*** ./bindDisplay/Application.styl ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_stable_index_js-node_modules_jquery_dist_jquery_js-node_modules_-a4ae47","main_dist_Component_js-main_dist_template_js","main_dist_bindProp_js-common_initExample_ts"], function() { return __webpack_exec__("./bindDisplay/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9iaW5kRGlzcGxheS9BcHBsaWNhdGlvbi5qdy5odG1sIiwid2VicGFjazovLy8uLi9tYWluL2Rpc3QvYmluZERpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vYmluZERpc3BsYXkvQXBwbGljYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vYmluZERpc3BsYXkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vYmluZERpc3BsYXkvQXBwbGljYXRpb24uc3R5bD82NmRjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEscUs7Ozs7Ozs7Ozs7O0FDQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDJCQUEyQiwyRUFBMkUsa0NBQWtDLG1CQUFtQixHQUFHLEVBQUUsT0FBTyxrQ0FBa0MsOEhBQThILEdBQUcsRUFBRSxxQkFBcUI7O0FBRXhYLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFOztBQUUzVCw2REFBNkQsc0VBQXNFLDhEQUE4RCxvQkFBb0I7O0FBRXJOLDBDQUEwQywrREFBK0QsMkVBQTJFLEVBQUUseUVBQXlFLGVBQWUsc0RBQXNELEVBQUUsRUFBRSx1REFBdUQ7O0FBRS9YLGdDQUFnQyw0RUFBNEUsaUJBQWlCLFVBQVUsR0FBRyw4QkFBOEI7O0FBRXhLLGdDQUFnQyw2REFBNkQseUNBQXlDLDhDQUE4QyxpQ0FBaUMsbURBQW1ELHlEQUF5RCxFQUFFLE9BQU8sdUNBQXVDLEVBQUUsaURBQWlELEdBQUc7O0FBRXZhLGlEQUFpRCwwRUFBMEUsYUFBYSxFQUFFLHFDQUFxQzs7QUFFL0ssdUNBQXVDLHVCQUF1Qix1RkFBdUYsRUFBRSxhQUFhOztBQUVwSyxzQ0FBc0Msd0VBQXdFLDBDQUEwQyw4Q0FBOEMsTUFBTSw2RUFBNkUsR0FBRyxhQUFhLEVBQUUsWUFBWSxjQUFjLEVBQUU7O0FBRXZVLDZCQUE2QixnR0FBZ0csZ0RBQWdELEdBQUcsMkJBQTJCOztBQUUzTTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQzs7QUFFRiw4QkFBOEIsbUJBQU8sQ0FBQyx5Q0FBUzs7QUFFL0M7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7QUFDZiwyQ0FBMkMsY0FBYyxtbUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0R3pEOztBQUNBOztBQUNBOztBQUNBOztBQUdBLElBQXFCLFdBQXJCO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxXQUVXLG9CQUFXLEVBQVgsRUFBcUI7QUFDOUI7QUFDQSxVQUFNLE9BQU8sR0FBRyxtQkFBUyxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBVCxFQUFzQyxTQUF0QyxDQUFoQixDQUY4QixDQUk5Qjs7QUFDQSw0QkFBWSxFQUFaLEVBQWdCLE9BQWhCO0FBQ0E7QUFSRjs7QUFBQTtBQUFBLEVBQXlDLG1CQUF6Qzs7QUFBcUIsV0FBVyxlQUQvQixtQkFBUyxtQkFBTyxDQUFDLGdFQUFELENBQWhCLENBQytCLEdBQVgsV0FBVyxDQUFYO2tCQUFBLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnJCOztBQUNBOztBQUNBOztBQUNBOztBQUVBLGlCQUFFLFlBQUs7QUFDTix3QkFBWSxhQUFaLEVBQTJCLENBQUMsZ0JBQUQsRUFBbUIscUJBQW5CLEVBQTBDLGtCQUExQyxFQUE4RCxVQUE5RCxDQUEzQjtBQUNBLE1BQUkscUJBQUosR0FBa0IsUUFBbEIsQ0FBMkIsTUFBM0I7QUFDQSxDQUhELEU7Ozs7Ozs7Ozs7OztBQ0xBIiwiZmlsZSI6ImJ1bmRsZS1iaW5kRGlzcGxheS1kNmRiNjcxYzA5OWNiMjQ3YTQ1Yy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGp3Y2xhc3M9XFxcImFwcGxpY2F0aW9uXFxcIj48ZGl2PjxsYWJlbD48aW5wdXQgandpZD1cXFwiY2hlY2tib3hcXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIj5TaG93IHJlY3RhbmdsZTwvbGFiZWw+PC9kaXY+PGRpdiBqd2lkPVxcXCJyZWN0XFxcIj48L2Rpdj48L2Rpdj5cXG5cIjsiLCJcInVzZSBzdHJpY3RcIjtcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjEgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbnZhciBfX2ltcG9ydERlZmF1bHQgPSB2b2lkIDAgJiYgKHZvaWQgMCkuX19pbXBvcnREZWZhdWx0IHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgcmV0dXJuIG1vZCAmJiBtb2QuX19lc01vZHVsZSA/IG1vZCA6IHtcbiAgICBcImRlZmF1bHRcIjogbW9kXG4gIH07XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQ2xhc3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DbGFzc1wiKSk7XG5cbnZhciBEaXNwbGF5VXBkYXRlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NsYXNzXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoRGlzcGxheVVwZGF0ZXIsIF9DbGFzc18xJGRlZmF1bHQpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoRGlzcGxheVVwZGF0ZXIpO1xuXG4gIGZ1bmN0aW9uIERpc3BsYXlVcGRhdGVyKGVsLCBwcm9wZXJ0eSkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEaXNwbGF5VXBkYXRlcik7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpO1xuICAgIF90aGlzLmVsID0gZWw7XG4gICAgX3RoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcblxuICAgIF90aGlzLl91cGRhdGUoKTtcblxuICAgIF90aGlzLm93bihwcm9wZXJ0eS5vbkNoYW5nZS5saXN0ZW4oX3RoaXMuX3VwZGF0ZSwgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpKTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhEaXNwbGF5VXBkYXRlciwgW3tcbiAgICBrZXk6IFwiX3VwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgICAgdGhpcy5lbC5jc3MoXCJkaXNwbGF5XCIsIHRoaXMucHJvcGVydHkuZ2V0KCkgPyBcIlwiIDogXCJub25lXCIpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBEaXNwbGF5VXBkYXRlcjtcbn0oQ2xhc3NfMS5kZWZhdWx0KTtcbi8qKlxyXG4gKiBCaW5kcyB2aXNpYmlsaXR5IG9mIGEgRE9NIGVsZW1lbnQgdG8gYSBib29sZWFuIGBQcm9wZXJ0eWAuXHJcbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cclxuICogQHBhcmFtIHByb3BlcnR5IEVsZW1lbnQgdmlzaWJpbGl0eS5cclxuICogQHJldHVybnMgQmluZGluZyBvYmplY3QuIFlvdSBtdXN0IGRlc3Ryb3kgaXQgdG8gc3RvcCB0aGUgc3luY2hyb25pemF0aW9uLlxyXG4gKi9cblxuXG5mdW5jdGlvbiBiaW5kRGlzcGxheShlbCwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIG5ldyBEaXNwbGF5VXBkYXRlcihlbCwgcHJvcGVydHkpO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBiaW5kRGlzcGxheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5aWFXNWtSR2x6Y0d4aGVTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN096czdPenM3T3pzN096czdPenM3T3pzN096czdRVUZ6UWtVN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UVVGSFJpeEpRVUZCTEU5QlFVRXNSMEZCUVN4bFFVRkJMRU5CUVVFc1QwRkJRU3hEUVVGQkxGTkJRVUVzUTBGQlFTeERRVUZCT3p0SlFVZE5MR003T3pzN08wRkJRMHdzTUVKQlFXOUNMRVZCUVhCQ0xFVkJRWFZFTEZGQlFYWkVMRVZCUVd0R08wRkJRVUU3TzBGQlFVRTdPMEZCUTJwR08wRkJSRzFDTEZWQlFVRXNSVUZCUVN4SFFVRkJMRVZCUVVFN1FVRkJiVU1zVlVGQlFTeFJRVUZCTEVkQlFVRXNVVUZCUVRzN1FVRkZkRVFzVlVGQlN5eFBRVUZNT3p0QlFVTkJMRlZCUVVzc1IwRkJUQ3hEUVVGVExGRkJRVkVzUTBGQlF5eFJRVUZVTEVOQlFXdENMRTFCUVd4Q0xFTkJRWGxDTEUxQlFVc3NUMEZCT1VJc1owTkJRVlE3TzBGQlNHbEdPMEZCU1dwR096czdPMWRCUlU4c2JVSkJRVTg3UVVGRFpDeFhRVUZMTEVWQlFVd3NRMEZCVVN4SFFVRlNMRU5CUVZrc1UwRkJXaXhGUVVGMVFpeExRVUZMTEZGQlFVd3NRMEZCWXl4SFFVRmtMRXRCUVhOQ0xFVkJRWFJDTEVkQlFUSkNMRTFCUVd4RU8wRkJRMEU3T3pzN1JVRlVNa0lzVDBGQlFTeERRVUZCTEU4N1FVRlpOMEk3T3pzN08wRkJTMGM3T3p0QlFVTklMRk5CUVhkQ0xGZEJRWGhDTEVOQlFXOURMRVZCUVhCRExFVkJRU3RFTEZGQlFTOUVMRVZCUVRCR08wRkJRM3BHTEZOQlFVOHNTVUZCU1N4alFVRktMRU5CUVcxQ0xFVkJRVzVDTEVWQlFYVkNMRkZCUVhaQ0xFTkJRVkE3UVVGRFFUczdRVUZHUkN4UFFVRkJMRU5CUVVFc1QwRkJRU3hIUVVGQkxGZEJRVUVpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktseHVUVWxVSUV4cFkyVnVjMlZjYmx4dVEyOXdlWEpwWjJoMElDaGpLU0F5TURJeElFVm5iM0lnVG1Wd2IyMXVlV0Z6WTJocGFGeHVYRzVRWlhKdGFYTnphVzl1SUdseklHaGxjbVZpZVNCbmNtRnVkR1ZrTENCbWNtVmxJRzltSUdOb1lYSm5aU3dnZEc4Z1lXNTVJSEJsY25OdmJpQnZZblJoYVc1cGJtY2dZU0JqYjNCNVhHNXZaaUIwYUdseklITnZablIzWVhKbElHRnVaQ0JoYzNOdlkybGhkR1ZrSUdSdlkzVnRaVzUwWVhScGIyNGdabWxzWlhNZ0tIUm9aU0JjSWxOdlpuUjNZWEpsWENJcExDQjBieUJrWldGc1hHNXBiaUIwYUdVZ1UyOW1kSGRoY21VZ2QybDBhRzkxZENCeVpYTjBjbWxqZEdsdmJpd2dhVzVqYkhWa2FXNW5JSGRwZEdodmRYUWdiR2x0YVhSaGRHbHZiaUIwYUdVZ2NtbG5hSFJ6WEc1MGJ5QjFjMlVzSUdOdmNIa3NJRzF2WkdsbWVTd2diV1Z5WjJVc0lIQjFZbXhwYzJnc0lHUnBjM1J5YVdKMWRHVXNJSE4xWW14cFkyVnVjMlVzSUdGdVpDOXZjaUJ6Wld4c1hHNWpiM0JwWlhNZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTENCaGJtUWdkRzhnY0dWeWJXbDBJSEJsY25OdmJuTWdkRzhnZDJodmJTQjBhR1VnVTI5bWRIZGhjbVVnYVhOY2JtWjFjbTVwYzJobFpDQjBieUJrYnlCemJ5d2djM1ZpYW1WamRDQjBieUIwYUdVZ1ptOXNiRzkzYVc1bklHTnZibVJwZEdsdmJuTTZYRzVjYmxSb1pTQmhZbTkyWlNCamIzQjVjbWxuYUhRZ2JtOTBhV05sSUdGdVpDQjBhR2x6SUhCbGNtMXBjM05wYjI0Z2JtOTBhV05sSUhOb1lXeHNJR0psSUdsdVkyeDFaR1ZrSUdsdUlHRnNiRnh1WTI5d2FXVnpJRzl5SUhOMVluTjBZVzUwYVdGc0lIQnZjblJwYjI1eklHOW1JSFJvWlNCVGIyWjBkMkZ5WlM1Y2JseHVWRWhGSUZOUFJsUlhRVkpGSUVsVElGQlNUMVpKUkVWRUlGd2lRVk1nU1ZOY0lpd2dWMGxVU0U5VlZDQlhRVkpTUVU1VVdTQlBSaUJCVGxrZ1MwbE9SQ3dnUlZoUVVrVlRVeUJQVWx4dVNVMVFURWxGUkN3Z1NVNURURlZFU1U1SElFSlZWQ0JPVDFRZ1RFbE5TVlJGUkNCVVR5QlVTRVVnVjBGU1VrRk9WRWxGVXlCUFJpQk5SVkpEU0VGT1ZFRkNTVXhKVkZrc1hHNUdTVlJPUlZOVElFWlBVaUJCSUZCQlVsUkpRMVZNUVZJZ1VGVlNVRTlUUlNCQlRrUWdUazlPU1U1R1VrbE9SMFZOUlU1VUxpQkpUaUJPVHlCRlZrVk9WQ0JUU0VGTVRDQlVTRVZjYmtGVlZFaFBVbE1nVDFJZ1EwOVFXVkpKUjBoVUlFaFBURVJGVWxNZ1FrVWdURWxCUWt4RklFWlBVaUJCVGxrZ1EweEJTVTBzSUVSQlRVRkhSVk1nVDFJZ1QxUklSVkpjYmt4SlFVSkpURWxVV1N3Z1YwaEZWRWhGVWlCSlRpQkJUaUJCUTFSSlQwNGdUMFlnUTA5T1ZGSkJRMVFzSUZSUFVsUWdUMUlnVDFSSVJWSlhTVk5GTENCQlVrbFRTVTVISUVaU1QwMHNYRzVQVlZRZ1QwWWdUMUlnU1U0Z1EwOU9Ua1ZEVkVsUFRpQlhTVlJJSUZSSVJTQlRUMFpVVjBGU1JTQlBVaUJVU0VVZ1ZWTkZJRTlTSUU5VVNFVlNJRVJGUVV4SlRrZFRJRWxPSUZSSVJWeHVVMDlHVkZkQlVrVXVYRzRxTDF4dVhHNXBiWEJ2Y25RZ1FtbHVaR0ZpYkdVZ1puSnZiU0FuTGk5Q2FXNWtZV0pzWlNjN1hHNXBiWEJ2Y25RZ1EyeGhjM01nWm5KdmJTQW5MaTlEYkdGemN5YzdYRzVwYlhCdmNuUWdSR1Z6ZEhKdmVXRmliR1VnWm5KdmJTQW5MaTlFWlhOMGNtOTVZV0pzWlNjN1hHNWNibU5zWVhOeklFUnBjM0JzWVhsVmNHUmhkR1Z5SUdWNGRHVnVaSE1nUTJ4aGMzTWdlMXh1WEhSamIyNXpkSEoxWTNSdmNpaHdjbWwyWVhSbElHVnNPaUJFYVhOd2JHRjVWWEJrWVhSbGNrVnNaVzFsYm5Rc0lIQnlhWFpoZEdVZ2NISnZjR1Z5ZEhrNklFSnBibVJoWW14bFBHSnZiMnhsWVc0K0tTQjdYRzVjZEZ4MGMzVndaWElvS1R0Y2JseDBYSFIwYUdsekxsOTFjR1JoZEdVb0tUdGNibHgwWEhSMGFHbHpMbTkzYmlod2NtOXdaWEowZVM1dmJrTm9ZVzVuWlM1c2FYTjBaVzRvZEdocGN5NWZkWEJrWVhSbExDQjBhR2x6S1NrN1hHNWNkSDFjYmx4dVhIUndjbWwyWVhSbElGOTFjR1JoZEdVb0tTQjdYRzVjZEZ4MGRHaHBjeTVsYkM1amMzTW9YQ0prYVhOd2JHRjVYQ0lzSUhSb2FYTXVjSEp2Y0dWeWRIa3VaMlYwS0NrZ1B5QmNJbHdpSURvZ1hDSnViMjVsWENJcE8xeHVYSFI5WEc1OVhHNWNiaThxS2x4dUlDb2dRbWx1WkhNZ2RtbHphV0pwYkdsMGVTQnZaaUJoSUVSUFRTQmxiR1Z0Wlc1MElIUnZJR0VnWW05dmJHVmhiaUJnVUhKdmNHVnlkSGxnTGx4dUlDb2dRSEJoY21GdElHVnNJRVJQVFNCbGJHVnRaVzUwTGx4dUlDb2dRSEJoY21GdElIQnliM0JsY25SNUlFVnNaVzFsYm5RZ2RtbHphV0pwYkdsMGVTNWNiaUFxSUVCeVpYUjFjbTV6SUVKcGJtUnBibWNnYjJKcVpXTjBMaUJaYjNVZ2JYVnpkQ0JrWlhOMGNtOTVJR2wwSUhSdklITjBiM0FnZEdobElITjVibU5vY205dWFYcGhkR2x2Ymk1Y2JpQXFMMXh1Wlhod2IzSjBJR1JsWm1GMWJIUWdablZ1WTNScGIyNGdZbWx1WkVScGMzQnNZWGtvWld3NklFUnBjM0JzWVhsVmNHUmhkR1Z5Uld4bGJXVnVkQ3dnY0hKdmNHVnlkSGs2SUVKcGJtUmhZbXhsUEdKdmIyeGxZVzQrS1RvZ1JHVnpkSEp2ZVdGaWJHVWdlMXh1WEhSeVpYUjFjbTRnYm1WM0lFUnBjM0JzWVhsVmNHUmhkR1Z5S0dWc0xDQndjbTl3WlhKMGVTazdYRzU5WEc1Y2JtVjRjRzl5ZENCcGJuUmxjbVpoWTJVZ1JHbHpjR3hoZVZWd1pHRjBaWEpGYkdWdFpXNTBJSHRjYmx4MFkzTnpLSE4wZVd4bE9pQmNJbVJwYzNCc1lYbGNJaXdnZG1Gc2RXVTZJRndpWENJZ2ZDQmNJbTV2Ym1WY0lpazZJSFp2YVdRN1hHNTlYRzRpWFN3aWMyOTFjbU5sVW05dmRDSTZJaUo5IiwiaW1wb3J0IGJpbmREaXNwbGF5IGZyb20gXCJqd2lkZ2V0L2JpbmREaXNwbGF5XCI7XG5pbXBvcnQgYmluZFByb3AgZnJvbSBcImp3aWRnZXQvYmluZFByb3BcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmUoXCIuL0FwcGxpY2F0aW9uLmp3Lmh0bWxcIikpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cHJvdGVjdGVkIHJlbmRlclJlY3QoZWw6IEpRdWVyeSkge1xuXHRcdC8vIFdhdGNoIGNoZWNrYm94IHN0YXRlXG5cdFx0Y29uc3QgY2hlY2tlZCA9IGJpbmRQcm9wKHRoaXMuZ2V0RWxlbWVudChcImNoZWNrYm94XCIpLCBcImNoZWNrZWRcIik7XG5cblx0XHQvLyBCaW5kIHJlY3RhbmdsZSB2aXNpYmlsaXR5IHRvIHByb3BlcnR5IHZhbHVlXG5cdFx0YmluZERpc3BsYXkoZWwsIGNoZWNrZWQpO1xuXHR9XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL0FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgXCIuL0FwcGxpY2F0aW9uLnN0eWxcIjtcblxuJCgoKSA9PiB7XG5cdGluaXRFeGFtcGxlKFwiYmluZERpc3BsYXlcIiwgW1wiQXBwbGljYXRpb24udHNcIiwgXCJBcHBsaWNhdGlvbi5qdy5odG1sXCIsIFwiQXBwbGljYXRpb24uc3R5bFwiLCBcImluZGV4LnRzXCJdKTtcblx0bmV3IEFwcGxpY2F0aW9uKCkucmVuZGVyVG8oXCJib2R5XCIpO1xufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9