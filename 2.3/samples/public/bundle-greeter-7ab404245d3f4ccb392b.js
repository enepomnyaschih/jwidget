(self["webpackChunk"] = self["webpackChunk"] || []).push([["greeter"],{

/***/ "../../main/dist/bindText.js":
/*!***********************************!*\
  !*** ../../main/dist/bindText.js ***!
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

var TextUpdater = /*#__PURE__*/function (_Class_1$default) {
  _inherits(TextUpdater, _Class_1$default);

  var _super = _createSuper(TextUpdater);

  function TextUpdater(el, property) {
    var _this;

    _classCallCheck(this, TextUpdater);

    _this = _super.call(this);
    _this.el = el;
    _this.property = property;

    _this._update();

    _this.own(property.onChange.listen(_this._update, _assertThisInitialized(_this)));

    return _this;
  }

  _createClass(TextUpdater, [{
    key: "_update",
    value: function _update() {
      this.el.text(this.property.get());
    }
  }]);

  return TextUpdater;
}(Class_1.default);
/**
 * Binds inner text of a DOM element to a string %Property.
 * @param el DOM element.
 * @param property Text value.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */


function bindText(el, property) {
  return new TextUpdater(el, property);
}

exports.default = bindText;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW5kVGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRixJQUFBLE9BQUEsR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBOztJQUdNLFc7Ozs7O0FBQ0wsdUJBQW9CLEVBQXBCLEVBQW9ELFFBQXBELEVBQThFO0FBQUE7O0FBQUE7O0FBQzdFO0FBRG1CLFVBQUEsRUFBQSxHQUFBLEVBQUE7QUFBZ0MsVUFBQSxRQUFBLEdBQUEsUUFBQTs7QUFFbkQsVUFBSyxPQUFMOztBQUNBLFVBQUssR0FBTCxDQUFTLFFBQVEsQ0FBQyxRQUFULENBQWtCLE1BQWxCLENBQXlCLE1BQUssT0FBOUIsZ0NBQVQ7O0FBSDZFO0FBSTdFOzs7O1dBRU8sbUJBQU87QUFDZCxXQUFLLEVBQUwsQ0FBUSxJQUFSLENBQWEsS0FBSyxRQUFMLENBQWMsR0FBZCxFQUFiO0FBQ0E7Ozs7RUFUd0IsT0FBQSxDQUFBLE87QUFZMUI7Ozs7O0FBS0c7OztBQUNILFNBQXdCLFFBQXhCLENBQWlDLEVBQWpDLEVBQXlELFFBQXpELEVBQW1GO0FBQ2xGLFNBQU8sSUFBSSxXQUFKLENBQWdCLEVBQWhCLEVBQW9CLFFBQXBCLENBQVA7QUFDQTs7QUFGRCxPQUFBLENBQUEsT0FBQSxHQUFBLFFBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIxIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgQmluZGFibGUgZnJvbSAnLi9CaW5kYWJsZSc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9DbGFzcyc7XG5pbXBvcnQgRGVzdHJveWFibGUgZnJvbSAnLi9EZXN0cm95YWJsZSc7XG5cbmNsYXNzIFRleHRVcGRhdGVyIGV4dGVuZHMgQ2xhc3Mge1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBUZXh0VXBkYXRlckVsZW1lbnQsIHByaXZhdGUgcHJvcGVydHk6IEJpbmRhYmxlPHN0cmluZz4pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdHRoaXMub3duKHByb3BlcnR5Lm9uQ2hhbmdlLmxpc3Rlbih0aGlzLl91cGRhdGUsIHRoaXMpKTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZSgpIHtcblx0XHR0aGlzLmVsLnRleHQodGhpcy5wcm9wZXJ0eS5nZXQoKSk7XG5cdH1cbn1cblxuLyoqXG4gKiBCaW5kcyBpbm5lciB0ZXh0IG9mIGEgRE9NIGVsZW1lbnQgdG8gYSBzdHJpbmcgJVByb3BlcnR5LlxuICogQHBhcmFtIGVsIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHByb3BlcnR5IFRleHQgdmFsdWUuXG4gKiBAcmV0dXJucyBCaW5kaW5nIG9iamVjdC4gWW91IG11c3QgZGVzdHJveSBpdCB0byBzdG9wIHRoZSBzeW5jaHJvbml6YXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRUZXh0KGVsOiBUZXh0VXBkYXRlckVsZW1lbnQsIHByb3BlcnR5OiBCaW5kYWJsZTxzdHJpbmc+KTogRGVzdHJveWFibGUge1xuXHRyZXR1cm4gbmV3IFRleHRVcGRhdGVyKGVsLCBwcm9wZXJ0eSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dFVwZGF0ZXJFbGVtZW50IHtcblx0dGV4dCh0ZXh0OiBzdHJpbmcpOiB2b2lkO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==

/***/ }),

/***/ "./greeter/index.ts":
/*!**************************!*\
  !*** ./greeter/index.ts ***!
  \**************************/
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

__webpack_require__(/*! core-js/stable */ "../../node_modules/core-js/stable/index.js");

__webpack_require__(/*! regenerator-runtime/runtime */ "../../node_modules/regenerator-runtime/runtime.js");

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js"));

var jwidget_1 = __webpack_require__(/*! jwidget */ "../../main/dist/index.js");

var bindText_1 = __importDefault(__webpack_require__(/*! jwidget/bindText */ "../../main/dist/bindText.js"));

var bindVal_1 = __importDefault(__webpack_require__(/*! jwidget/bindVal */ "../../main/dist/bindVal.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var Property_1 = __importDefault(__webpack_require__(/*! jwidget/Property */ "../../main/dist/Property.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var Greeter = /*#__PURE__*/function (_Component_1$default) {
  _inherits(Greeter, _Component_1$default);

  var _super = _createSuper(Greeter);

  function Greeter() {
    var _this;

    _classCallCheck(this, Greeter);

    _this = _super.apply(this, arguments);
    _this.name = new Property_1.default("guest");
    return _this;
  }

  _createClass(Greeter, [{
    key: "renderNameField",
    value: function renderNameField(el) {
      // Bind element value to property
      bindVal_1.default(el, this.name, jwidget_1.TWOWAY);
    }
  }, {
    key: "renderGreeting",
    value: function renderGreeting(el) {
      // Build greeting message
      var text = this.name.map(function (name) {
        return "Hello, ".concat(name, "!");
      }); // Bind element text to message

      bindText_1.default(el, text);
    }
  }]);

  return Greeter;
}(Component_1.default);

Greeter = __decorate([template_1.default("<div class=\"greeter\">\n             <p>Your name: <input jwid=\"name-field\" type=\"text\"></p>\n             <div jwid=\"greeting\"></div>\n           </div>")], Greeter);
jquery_1.default(function () {
  new Greeter().renderTo("body");
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_stable_index_js-node_modules_jquery_dist_jquery_js-node_modules_-a4ae47","main_dist_Component_js-main_dist_template_js","main_dist_bindVal_js"], function() { return __webpack_exec__("./greeter/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbWFpbi9kaXN0L2JpbmRUZXh0LmpzIiwid2VicGFjazovLy8uL2dyZWV0ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDJCQUEyQiwyRUFBMkUsa0NBQWtDLG1CQUFtQixHQUFHLEVBQUUsT0FBTyxrQ0FBa0MsOEhBQThILEdBQUcsRUFBRSxxQkFBcUI7O0FBRXhYLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFOztBQUUzVCw2REFBNkQsc0VBQXNFLDhEQUE4RCxvQkFBb0I7O0FBRXJOLDBDQUEwQywrREFBK0QsMkVBQTJFLEVBQUUseUVBQXlFLGVBQWUsc0RBQXNELEVBQUUsRUFBRSx1REFBdUQ7O0FBRS9YLGdDQUFnQyw0RUFBNEUsaUJBQWlCLFVBQVUsR0FBRyw4QkFBOEI7O0FBRXhLLGdDQUFnQyw2REFBNkQseUNBQXlDLDhDQUE4QyxpQ0FBaUMsbURBQW1ELHlEQUF5RCxFQUFFLE9BQU8sdUNBQXVDLEVBQUUsaURBQWlELEdBQUc7O0FBRXZhLGlEQUFpRCwwRUFBMEUsYUFBYSxFQUFFLHFDQUFxQzs7QUFFL0ssdUNBQXVDLHVCQUF1Qix1RkFBdUYsRUFBRSxhQUFhOztBQUVwSyxzQ0FBc0Msd0VBQXdFLDBDQUEwQyw4Q0FBOEMsTUFBTSw2RUFBNkUsR0FBRyxhQUFhLEVBQUUsWUFBWSxjQUFjLEVBQUU7O0FBRXZVLDZCQUE2QixnR0FBZ0csZ0RBQWdELEdBQUcsMkJBQTJCOztBQUUzTTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQzs7QUFFRiw4QkFBOEIsbUJBQU8sQ0FBQyx5Q0FBUzs7QUFFL0M7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7QUFDZiwyQ0FBMkMsY0FBYyxtOEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0R3pEOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQU1BLElBQU0sT0FBTjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7OztBQUVTLGlCQUFPLElBQUksa0JBQUosQ0FBYSxPQUFiLENBQVA7QUFGVDtBQWdCQzs7QUFoQkQ7QUFBQTtBQUFBLFdBSVcseUJBQWdCLEVBQWhCLEVBQTBCO0FBQ25DO0FBQ0Esd0JBQVEsRUFBUixFQUFZLEtBQUssSUFBakIsRUFBdUIsZ0JBQXZCO0FBQ0E7QUFQRjtBQUFBO0FBQUEsV0FTVyx3QkFBZSxFQUFmLEVBQXlCO0FBQ2xDO0FBQ0EsVUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFMLENBQVUsR0FBVixDQUFjLGNBQUk7QUFBQSxnQ0FBYyxJQUFkO0FBQUEsT0FBbEIsQ0FBYixDQUZrQyxDQUlsQzs7QUFDQSx5QkFBUyxFQUFULEVBQWEsSUFBYjtBQUNBO0FBZkY7O0FBQUE7QUFBQSxFQUFzQixtQkFBdEI7O0FBQU0sT0FBTyxlQUpaLHNMQUlZLEdBQVAsT0FBTyxDQUFQO0FBa0JOLGlCQUFFLFlBQUs7QUFDTixNQUFJLE9BQUosR0FBYyxRQUFkLENBQXVCLE1BQXZCO0FBQ0EsQ0FGRCxFIiwiZmlsZSI6ImJ1bmRsZS1ncmVldGVyLTdhYjQwNDI0NWQzZjRjY2IzOTJiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIxIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkgeyB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTsgcmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVTdXBlckludGVybmFsKCkgeyB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksIHJlc3VsdDsgaWYgKGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QpIHsgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjsgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTsgfSBlbHNlIHsgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTsgfTsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7IGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7IGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7IHRyeSB7IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChCb29sZWFuLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG52YXIgX19pbXBvcnREZWZhdWx0ID0gdm9pZCAwICYmICh2b2lkIDApLl9faW1wb3J0RGVmYXVsdCB8fCBmdW5jdGlvbiAobW9kKSB7XG4gIHJldHVybiBtb2QgJiYgbW9kLl9fZXNNb2R1bGUgPyBtb2QgOiB7XG4gICAgXCJkZWZhdWx0XCI6IG1vZFxuICB9O1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIENsYXNzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2xhc3NcIikpO1xuXG52YXIgVGV4dFVwZGF0ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9DbGFzc18xJGRlZmF1bHQpIHtcbiAgX2luaGVyaXRzKFRleHRVcGRhdGVyLCBfQ2xhc3NfMSRkZWZhdWx0KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKFRleHRVcGRhdGVyKTtcblxuICBmdW5jdGlvbiBUZXh0VXBkYXRlcihlbCwgcHJvcGVydHkpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGV4dFVwZGF0ZXIpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICBfdGhpcy5lbCA9IGVsO1xuICAgIF90aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cbiAgICBfdGhpcy5fdXBkYXRlKCk7XG5cbiAgICBfdGhpcy5vd24ocHJvcGVydHkub25DaGFuZ2UubGlzdGVuKF90aGlzLl91cGRhdGUsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVGV4dFVwZGF0ZXIsIFt7XG4gICAga2V5OiBcIl91cGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZSgpIHtcbiAgICAgIHRoaXMuZWwudGV4dCh0aGlzLnByb3BlcnR5LmdldCgpKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVGV4dFVwZGF0ZXI7XG59KENsYXNzXzEuZGVmYXVsdCk7XG4vKipcclxuICogQmluZHMgaW5uZXIgdGV4dCBvZiBhIERPTSBlbGVtZW50IHRvIGEgc3RyaW5nICVQcm9wZXJ0eS5cclxuICogQHBhcmFtIGVsIERPTSBlbGVtZW50LlxyXG4gKiBAcGFyYW0gcHJvcGVydHkgVGV4dCB2YWx1ZS5cclxuICogQHJldHVybnMgQmluZGluZyBvYmplY3QuIFlvdSBtdXN0IGRlc3Ryb3kgaXQgdG8gc3RvcCB0aGUgc3luY2hyb25pemF0aW9uLlxyXG4gKi9cblxuXG5mdW5jdGlvbiBiaW5kVGV4dChlbCwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIG5ldyBUZXh0VXBkYXRlcihlbCwgcHJvcGVydHkpO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBiaW5kVGV4dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5aWFXNWtWR1Y0ZEM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRnpRa1U3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdRVUZIUml4SlFVRkJMRTlCUVVFc1IwRkJRU3hsUVVGQkxFTkJRVUVzVDBGQlFTeERRVUZCTEZOQlFVRXNRMEZCUVN4RFFVRkJPenRKUVVkTkxGYzdPenM3TzBGQlEwd3NkVUpCUVc5Q0xFVkJRWEJDTEVWQlFXOUVMRkZCUVhCRUxFVkJRVGhGTzBGQlFVRTdPMEZCUVVFN08wRkJRemRGTzBGQlJHMUNMRlZCUVVFc1JVRkJRU3hIUVVGQkxFVkJRVUU3UVVGQlowTXNWVUZCUVN4UlFVRkJMRWRCUVVFc1VVRkJRVHM3UVVGRmJrUXNWVUZCU3l4UFFVRk1PenRCUVVOQkxGVkJRVXNzUjBGQlRDeERRVUZUTEZGQlFWRXNRMEZCUXl4UlFVRlVMRU5CUVd0Q0xFMUJRV3hDTEVOQlFYbENMRTFCUVVzc1QwRkJPVUlzWjBOQlFWUTdPMEZCU0RaRk8wRkJTVGRGT3pzN08xZEJSVThzYlVKQlFVODdRVUZEWkN4WFFVRkxMRVZCUVV3c1EwRkJVU3hKUVVGU0xFTkJRV0VzUzBGQlN5eFJRVUZNTEVOQlFXTXNSMEZCWkN4RlFVRmlPMEZCUTBFN096czdSVUZVZDBJc1QwRkJRU3hEUVVGQkxFODdRVUZaTVVJN096czdPMEZCUzBjN096dEJRVU5JTEZOQlFYZENMRkZCUVhoQ0xFTkJRV2xETEVWQlFXcERMRVZCUVhsRUxGRkJRWHBFTEVWQlFXMUdPMEZCUTJ4R0xGTkJRVThzU1VGQlNTeFhRVUZLTEVOQlFXZENMRVZCUVdoQ0xFVkJRVzlDTEZGQlFYQkNMRU5CUVZBN1FVRkRRVHM3UVVGR1JDeFBRVUZCTEVOQlFVRXNUMEZCUVN4SFFVRkJMRkZCUVVFaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SXZLbHh1VFVsVUlFeHBZMlZ1YzJWY2JseHVRMjl3ZVhKcFoyaDBJQ2hqS1NBeU1ESXhJRVZuYjNJZ1RtVndiMjF1ZVdGelkyaHBhRnh1WEc1UVpYSnRhWE56YVc5dUlHbHpJR2hsY21WaWVTQm5jbUZ1ZEdWa0xDQm1jbVZsSUc5bUlHTm9ZWEpuWlN3Z2RHOGdZVzU1SUhCbGNuTnZiaUJ2WW5SaGFXNXBibWNnWVNCamIzQjVYRzV2WmlCMGFHbHpJSE52Wm5SM1lYSmxJR0Z1WkNCaGMzTnZZMmxoZEdWa0lHUnZZM1Z0Wlc1MFlYUnBiMjRnWm1sc1pYTWdLSFJvWlNCY0lsTnZablIzWVhKbFhDSXBMQ0IwYnlCa1pXRnNYRzVwYmlCMGFHVWdVMjltZEhkaGNtVWdkMmwwYUc5MWRDQnlaWE4wY21samRHbHZiaXdnYVc1amJIVmthVzVuSUhkcGRHaHZkWFFnYkdsdGFYUmhkR2x2YmlCMGFHVWdjbWxuYUhSelhHNTBieUIxYzJVc0lHTnZjSGtzSUcxdlpHbG1lU3dnYldWeVoyVXNJSEIxWW14cGMyZ3NJR1JwYzNSeWFXSjFkR1VzSUhOMVlteHBZMlZ1YzJVc0lHRnVaQzl2Y2lCelpXeHNYRzVqYjNCcFpYTWdiMllnZEdobElGTnZablIzWVhKbExDQmhibVFnZEc4Z2NHVnliV2wwSUhCbGNuTnZibk1nZEc4Z2QyaHZiU0IwYUdVZ1UyOW1kSGRoY21VZ2FYTmNibVoxY201cGMyaGxaQ0IwYnlCa2J5QnpieXdnYzNWaWFtVmpkQ0IwYnlCMGFHVWdabTlzYkc5M2FXNW5JR052Ym1ScGRHbHZibk02WEc1Y2JsUm9aU0JoWW05MlpTQmpiM0I1Y21sbmFIUWdibTkwYVdObElHRnVaQ0IwYUdseklIQmxjbTFwYzNOcGIyNGdibTkwYVdObElITm9ZV3hzSUdKbElHbHVZMngxWkdWa0lHbHVJR0ZzYkZ4dVkyOXdhV1Z6SUc5eUlITjFZbk4wWVc1MGFXRnNJSEJ2Y25ScGIyNXpJRzltSUhSb1pTQlRiMlowZDJGeVpTNWNibHh1VkVoRklGTlBSbFJYUVZKRklFbFRJRkJTVDFaSlJFVkVJRndpUVZNZ1NWTmNJaXdnVjBsVVNFOVZWQ0JYUVZKU1FVNVVXU0JQUmlCQlRsa2dTMGxPUkN3Z1JWaFFVa1ZUVXlCUFVseHVTVTFRVEVsRlJDd2dTVTVEVEZWRVNVNUhJRUpWVkNCT1QxUWdURWxOU1ZSRlJDQlVUeUJVU0VVZ1YwRlNVa0ZPVkVsRlV5QlBSaUJOUlZKRFNFRk9WRUZDU1V4SlZGa3NYRzVHU1ZST1JWTlRJRVpQVWlCQklGQkJVbFJKUTFWTVFWSWdVRlZTVUU5VFJTQkJUa1FnVGs5T1NVNUdVa2xPUjBWTlJVNVVMaUJKVGlCT1R5QkZWa1ZPVkNCVFNFRk1UQ0JVU0VWY2JrRlZWRWhQVWxNZ1QxSWdRMDlRV1ZKSlIwaFVJRWhQVEVSRlVsTWdRa1VnVEVsQlFreEZJRVpQVWlCQlRsa2dRMHhCU1Uwc0lFUkJUVUZIUlZNZ1QxSWdUMVJJUlZKY2JreEpRVUpKVEVsVVdTd2dWMGhGVkVoRlVpQkpUaUJCVGlCQlExUkpUMDRnVDBZZ1EwOU9WRkpCUTFRc0lGUlBVbFFnVDFJZ1QxUklSVkpYU1ZORkxDQkJVa2xUU1U1SElFWlNUMDBzWEc1UFZWUWdUMFlnVDFJZ1NVNGdRMDlPVGtWRFZFbFBUaUJYU1ZSSUlGUklSU0JUVDBaVVYwRlNSU0JQVWlCVVNFVWdWVk5GSUU5U0lFOVVTRVZTSUVSRlFVeEpUa2RUSUVsT0lGUklSVnh1VTA5R1ZGZEJVa1V1WEc0cUwxeHVYRzVwYlhCdmNuUWdRbWx1WkdGaWJHVWdabkp2YlNBbkxpOUNhVzVrWVdKc1pTYzdYRzVwYlhCdmNuUWdRMnhoYzNNZ1puSnZiU0FuTGk5RGJHRnpjeWM3WEc1cGJYQnZjblFnUkdWemRISnZlV0ZpYkdVZ1puSnZiU0FuTGk5RVpYTjBjbTk1WVdKc1pTYzdYRzVjYm1Oc1lYTnpJRlJsZUhSVmNHUmhkR1Z5SUdWNGRHVnVaSE1nUTJ4aGMzTWdlMXh1WEhSamIyNXpkSEoxWTNSdmNpaHdjbWwyWVhSbElHVnNPaUJVWlhoMFZYQmtZWFJsY2tWc1pXMWxiblFzSUhCeWFYWmhkR1VnY0hKdmNHVnlkSGs2SUVKcGJtUmhZbXhsUEhOMGNtbHVaejRwSUh0Y2JseDBYSFJ6ZFhCbGNpZ3BPMXh1WEhSY2RIUm9hWE11WDNWd1pHRjBaU2dwTzF4dVhIUmNkSFJvYVhNdWIzZHVLSEJ5YjNCbGNuUjVMbTl1UTJoaGJtZGxMbXhwYzNSbGJpaDBhR2x6TGw5MWNHUmhkR1VzSUhSb2FYTXBLVHRjYmx4MGZWeHVYRzVjZEhCeWFYWmhkR1VnWDNWd1pHRjBaU2dwSUh0Y2JseDBYSFIwYUdsekxtVnNMblJsZUhRb2RHaHBjeTV3Y205d1pYSjBlUzVuWlhRb0tTazdYRzVjZEgxY2JuMWNibHh1THlvcVhHNGdLaUJDYVc1a2N5QnBibTVsY2lCMFpYaDBJRzltSUdFZ1JFOU5JR1ZzWlcxbGJuUWdkRzhnWVNCemRISnBibWNnSlZCeWIzQmxjblI1TGx4dUlDb2dRSEJoY21GdElHVnNJRVJQVFNCbGJHVnRaVzUwTGx4dUlDb2dRSEJoY21GdElIQnliM0JsY25SNUlGUmxlSFFnZG1Gc2RXVXVYRzRnS2lCQWNtVjBkWEp1Y3lCQ2FXNWthVzVuSUc5aWFtVmpkQzRnV1c5MUlHMTFjM1FnWkdWemRISnZlU0JwZENCMGJ5QnpkRzl3SUhSb1pTQnplVzVqYUhKdmJtbDZZWFJwYjI0dVhHNGdLaTljYm1WNGNHOXlkQ0JrWldaaGRXeDBJR1oxYm1OMGFXOXVJR0pwYm1SVVpYaDBLR1ZzT2lCVVpYaDBWWEJrWVhSbGNrVnNaVzFsYm5Rc0lIQnliM0JsY25SNU9pQkNhVzVrWVdKc1pUeHpkSEpwYm1jK0tUb2dSR1Z6ZEhKdmVXRmliR1VnZTF4dVhIUnlaWFIxY200Z2JtVjNJRlJsZUhSVmNHUmhkR1Z5S0dWc0xDQndjbTl3WlhKMGVTazdYRzU5WEc1Y2JtVjRjRzl5ZENCcGJuUmxjbVpoWTJVZ1ZHVjRkRlZ3WkdGMFpYSkZiR1Z0Wlc1MElIdGNibHgwZEdWNGRDaDBaWGgwT2lCemRISnBibWNwT2lCMmIybGtPMXh1ZlZ4dUlsMHNJbk52ZFhKalpWSnZiM1FpT2lJaWZRPT0iLCJpbXBvcnQgXCJjb3JlLWpzL3N0YWJsZVwiO1xuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5cbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCB7VFdPV0FZfSBmcm9tIFwiandpZGdldFwiO1xuaW1wb3J0IGJpbmRUZXh0IGZyb20gXCJqd2lkZ2V0L2JpbmRUZXh0XCI7XG5pbXBvcnQgYmluZFZhbCBmcm9tIFwiandpZGdldC9iaW5kVmFsXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IFByb3BlcnR5IGZyb20gXCJqd2lkZ2V0L1Byb3BlcnR5XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKGA8ZGl2IGNsYXNzPVwiZ3JlZXRlclwiPlxuICAgICAgICAgICAgIDxwPllvdXIgbmFtZTogPGlucHV0IGp3aWQ9XCJuYW1lLWZpZWxkXCIgdHlwZT1cInRleHRcIj48L3A+XG4gICAgICAgICAgICAgPGRpdiBqd2lkPVwiZ3JlZXRpbmdcIj48L2Rpdj5cbiAgICAgICAgICAgPC9kaXY+YClcbmNsYXNzIEdyZWV0ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByaXZhdGUgbmFtZSA9IG5ldyBQcm9wZXJ0eShcImd1ZXN0XCIpO1xuXG5cdHByb3RlY3RlZCByZW5kZXJOYW1lRmllbGQoZWw6IEpRdWVyeSkge1xuXHRcdC8vIEJpbmQgZWxlbWVudCB2YWx1ZSB0byBwcm9wZXJ0eVxuXHRcdGJpbmRWYWwoZWwsIHRoaXMubmFtZSwgVFdPV0FZKTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJHcmVldGluZyhlbDogSlF1ZXJ5KSB7XG5cdFx0Ly8gQnVpbGQgZ3JlZXRpbmcgbWVzc2FnZVxuXHRcdGNvbnN0IHRleHQgPSB0aGlzLm5hbWUubWFwKG5hbWUgPT4gYEhlbGxvLCAke25hbWV9IWApO1xuXG5cdFx0Ly8gQmluZCBlbGVtZW50IHRleHQgdG8gbWVzc2FnZVxuXHRcdGJpbmRUZXh0KGVsLCB0ZXh0KTtcblx0fVxufVxuXG4kKCgpID0+IHtcblx0bmV3IEdyZWV0ZXIoKS5yZW5kZXJUbyhcImJvZHlcIik7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=