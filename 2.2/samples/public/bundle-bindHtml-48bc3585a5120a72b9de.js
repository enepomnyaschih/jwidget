(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bindHtml"],{

/***/ "../../main/dist/bindHtml.js":
/*!********************************************!*\
  !*** C:/jwidget/git/main/dist/bindHtml.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));
class HtmlUpdater extends Class_1.default {
    /**
     * @param el DOM element.
     * @param property Source property.
     */
    constructor(el, property) {
        super();
        this.el = el;
        this.property = property;
        this._update();
        this.own(property.changeEvent.listen(this._update, this));
    }
    _update() {
        this.el.html(this.property.get());
    }
}
/**
 * Watches string property modification and updates inner HTML of the DOM element.
 * @param el DOM element.
 * @param property HTML value.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
function bindHtml(el, property) {
    return new HtmlUpdater(el, property);
}
exports.default = bindHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZEh0bWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYmluZEh0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBc0JFOzs7OztBQUdGLG9EQUE0QjtBQUc1QixNQUFNLFdBQVksU0FBUSxlQUFLO0lBQzlCOzs7T0FHRztJQUNILFlBQW9CLEVBQVUsRUFBVSxRQUF1QjtRQUM5RCxLQUFLLEVBQUUsQ0FBQztRQURXLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFlO1FBRTlELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyxPQUFPO1FBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDRDtBQUVEOzs7OztHQUtHO0FBQ0gsU0FBd0IsUUFBUSxDQUFDLEVBQVUsRUFBRSxRQUF1QjtJQUNuRSxPQUFPLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBRkQsMkJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgQmluZGFibGUgZnJvbSAnLi9CaW5kYWJsZSc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9DbGFzcyc7XG5pbXBvcnQgRGVzdHJveWFibGUgZnJvbSAnLi9EZXN0cm95YWJsZSc7XG5cbmNsYXNzIEh0bWxVcGRhdGVyIGV4dGVuZHMgQ2xhc3Mge1xuXHQvKipcblx0ICogQHBhcmFtIGVsIERPTSBlbGVtZW50LlxuXHQgKiBAcGFyYW0gcHJvcGVydHkgU291cmNlIHByb3BlcnR5LlxuXHQgKi9cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbDogSlF1ZXJ5LCBwcml2YXRlIHByb3BlcnR5OiBCaW5kYWJsZTxhbnk+KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl91cGRhdGUoKTtcblx0XHR0aGlzLm93bihwcm9wZXJ0eS5jaGFuZ2VFdmVudC5saXN0ZW4odGhpcy5fdXBkYXRlLCB0aGlzKSk7XG5cdH1cblxuXHRwcml2YXRlIF91cGRhdGUoKSB7XG5cdFx0dGhpcy5lbC5odG1sKHRoaXMucHJvcGVydHkuZ2V0KCkpO1xuXHR9XG59XG5cbi8qKlxuICogV2F0Y2hlcyBzdHJpbmcgcHJvcGVydHkgbW9kaWZpY2F0aW9uIGFuZCB1cGRhdGVzIGlubmVyIEhUTUwgb2YgdGhlIERPTSBlbGVtZW50LlxuICogQHBhcmFtIGVsIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHByb3BlcnR5IEhUTUwgdmFsdWUuXG4gKiBAcmV0dXJucyBCaW5kaW5nIG9iamVjdC4gWW91IG11c3QgZGVzdHJveSBpdCB0byBzdG9wIHRoZSBzeW5jaHJvbml6YXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRIdG1sKGVsOiBKUXVlcnksIHByb3BlcnR5OiBCaW5kYWJsZTxhbnk+KTogRGVzdHJveWFibGUge1xuXHRyZXR1cm4gbmV3IEh0bWxVcGRhdGVyKGVsLCBwcm9wZXJ0eSk7XG59XG4iXX0=

/***/ }),

/***/ "./bindHtml/Application.jw.html":
/*!**************************************!*\
  !*** ./bindHtml/Application.jw.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"application\"><div>HTML:</div><textarea jwid=\"input\" rows=\"5\" cols=\"80\"></textarea><div>Output:</div><div jwid=\"output\"></div></div>\n";

/***/ }),

/***/ "./bindHtml/Application.ts":
/*!*********************************!*\
  !*** ./bindHtml/Application.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var bindHtml_1 = __importDefault(__webpack_require__(/*! jwidget/bindHtml */ "../../main/dist/bindHtml.js"));

var bindVal_1 = __importDefault(__webpack_require__(/*! jwidget/bindVal */ "../../main/dist/bindVal.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var Application =
/** @class */
function () {
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
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./bindHtml/index.ts":
/*!***************************!*\
  !*** ./bindHtml/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

},[["./bindHtml/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","bindAttr~bindCss~bindHtml~bindRadio1~bindText~bindVal1~bindVal2~greeter~router"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRIdG1sLmpzIiwid2VicGFjazovLy8uL2JpbmRIdG1sL0FwcGxpY2F0aW9uLmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9iaW5kSHRtbC9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2JpbmRIdG1sL2luZGV4LnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvY29tbW9uL2luaXRFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsZ0NBQWdDLG1CQUFPLENBQUMseUNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxtN0c7Ozs7Ozs7Ozs7O0FDdkQzQyxpTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTtBQUFBO0FBQUE7QUFBQSxNQUFxQixXQUFyQjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsbUNBRXdCLEVBRnhCLEVBRWtDO0FBQ2hDLFlBQU0sS0FBSyxHQUFHLEtBQUssVUFBTCxDQUFnQixPQUFoQixDQUFkO0FBQ0EsYUFBSyxDQUFDLElBQU4sQ0FBVyxlQUFYLEVBRmdDLENBSWhDOztBQUNBLFlBQU0sSUFBSSxHQUFHLGtCQUFRLEtBQVIsQ0FBYixDQUxnQyxDQU9oQzs7QUFDQSwyQkFBUyxFQUFULEVBQWEsSUFBYjtBQUNBO0FBWEY7O0FBQUE7QUFBQSxJQUF5QyxtQkFBekM7O0FBQXFCLGFBQVcsZUFEL0IsbUJBQVMsbUJBQU8sQ0FBUyw2REFBVCxDQUFoQixDQUMrQixHQUFYLFdBQVcsQ0FBWDtBQVlyQjtBQUFDLENBWkQ7O2tCQUFxQixXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOckI7O0FBQ0E7O0FBQ0E7O0FBRUEsaUJBQUUsWUFBSztBQUNOLHdCQUFZLFVBQVosRUFBd0IsQ0FBQyxnQkFBRCxFQUFtQixxQkFBbkIsRUFBMEMsVUFBMUMsQ0FBeEI7QUFDQSxNQUFJLHFCQUFKLEdBQWtCLFFBQWxCLENBQTJCLE1BQTNCO0FBQ0EsQ0FIRCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7QUFDQTs7QUFDQTs7QUFFQSxTQUF3QixXQUF4QixDQUFvQyxJQUFwQyxFQUFrRCxLQUFsRCxFQUFpRTtBQUNoRSxNQUFNLEVBQUUsR0FBRyxpQkFBRSwrREFBRixDQUFYO0FBQ0EsTUFBSSxLQUFLLEdBQUcsSUFBWjtBQUNBLE9BQUssQ0FBQyxPQUFOLENBQWMsVUFBQyxJQUFELEVBQVM7QUFDdEIsUUFBSSxLQUFKLEVBQVc7QUFDVixXQUFLLEdBQUcsS0FBUjtBQUNBLEtBRkQsTUFFTztBQUNOLFFBQUUsQ0FBQyxNQUFILENBQVUsSUFBVjtBQUNBOztBQUNELE1BQUUsQ0FBQyxNQUFILENBQVUsaUJBQUUseUJBQUYsRUFBNkIsSUFBN0IsQ0FBa0MsSUFBbEMsRUFBd0MsSUFBeEMsQ0FBNkMsTUFBN0MsZ0JBQTRELElBQTVELGNBQW9FLElBQXBFLFVBQVY7QUFDQSxHQVBEO0FBUUEsbUJBQUUsTUFBRixFQUFVLE9BQVYsQ0FBa0IsZ0hBQWxCLEVBQW9JLE9BQXBJLENBQTRJLEVBQTVJO0FBQ0E7O0FBWkQsOEIiLCJmaWxlIjoiYnVuZGxlLWJpbmRIdG1sLTQ4YmMzNTg1YTUxMjBhNzJiOWRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDbGFzc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NsYXNzXCIpKTtcclxuY2xhc3MgSHRtbFVwZGF0ZXIgZXh0ZW5kcyBDbGFzc18xLmRlZmF1bHQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXHJcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgU291cmNlIHByb3BlcnR5LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlbCwgcHJvcGVydHkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZWwgPSBlbDtcclxuICAgICAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5vd24ocHJvcGVydHkuY2hhbmdlRXZlbnQubGlzdGVuKHRoaXMuX3VwZGF0ZSwgdGhpcykpO1xyXG4gICAgfVxyXG4gICAgX3VwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmVsLmh0bWwodGhpcy5wcm9wZXJ0eS5nZXQoKSk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFdhdGNoZXMgc3RyaW5nIHByb3BlcnR5IG1vZGlmaWNhdGlvbiBhbmQgdXBkYXRlcyBpbm5lciBIVE1MIG9mIHRoZSBET00gZWxlbWVudC5cclxuICogQHBhcmFtIGVsIERPTSBlbGVtZW50LlxyXG4gKiBAcGFyYW0gcHJvcGVydHkgSFRNTCB2YWx1ZS5cclxuICogQHJldHVybnMgQmluZGluZyBvYmplY3QuIFlvdSBtdXN0IGRlc3Ryb3kgaXQgdG8gc3RvcCB0aGUgc3luY2hyb25pemF0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gYmluZEh0bWwoZWwsIHByb3BlcnR5KSB7XHJcbiAgICByZXR1cm4gbmV3IEh0bWxVcGRhdGVyKGVsLCBwcm9wZXJ0eSk7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gYmluZEh0bWw7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVltbHVaRWgwYld3dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZZbWx1WkVoMGJXd3VkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk96czdPenM3T3pzN096czdPenM3T3pzN096czdPMFZCYzBKRk96czdPenRCUVVkR0xHOUVRVUUwUWp0QlFVYzFRaXhOUVVGTkxGZEJRVmtzVTBGQlVTeGxRVUZMTzBsQlF6bENPenM3VDBGSFJ6dEpRVU5JTEZsQlFXOUNMRVZCUVZVc1JVRkJWU3hSUVVGMVFqdFJRVU01UkN4TFFVRkxMRVZCUVVVc1EwRkJRenRSUVVSWExFOUJRVVVzUjBGQlJpeEZRVUZGTEVOQlFWRTdVVUZCVlN4aFFVRlJMRWRCUVZJc1VVRkJVU3hEUVVGbE8xRkJSVGxFTEVsQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJRenRSUVVObUxFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRMRmRCUVZjc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRek5FTEVOQlFVTTdTVUZGVHl4UFFVRlBPMUZCUTJRc1NVRkJTU3hEUVVGRExFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eERRVUZETzBsQlEyNURMRU5CUVVNN1EwRkRSRHRCUVVWRU96czdPenRIUVV0SE8wRkJRMGdzVTBGQmQwSXNVVUZCVVN4RFFVRkRMRVZCUVZVc1JVRkJSU3hSUVVGMVFqdEpRVU51UlN4UFFVRlBMRWxCUVVrc1YwRkJWeXhEUVVGRExFVkJRVVVzUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXp0QlFVTjBReXhEUVVGRE8wRkJSa1FzTWtKQlJVTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUl2S2x4dVRVbFVJRXhwWTJWdWMyVmNibHh1UTI5d2VYSnBaMmgwSUNoaktTQXlNREl3SUVWbmIzSWdUbVZ3YjIxdWVXRnpZMmhwYUZ4dVhHNVFaWEp0YVhOemFXOXVJR2x6SUdobGNtVmllU0JuY21GdWRHVmtMQ0JtY21WbElHOW1JR05vWVhKblpTd2dkRzhnWVc1NUlIQmxjbk52YmlCdlluUmhhVzVwYm1jZ1lTQmpiM0I1WEc1dlppQjBhR2x6SUhOdlpuUjNZWEpsSUdGdVpDQmhjM052WTJsaGRHVmtJR1J2WTNWdFpXNTBZWFJwYjI0Z1ptbHNaWE1nS0hSb1pTQmNJbE52Wm5SM1lYSmxYQ0lwTENCMGJ5QmtaV0ZzWEc1cGJpQjBhR1VnVTI5bWRIZGhjbVVnZDJsMGFHOTFkQ0J5WlhOMGNtbGpkR2x2Yml3Z2FXNWpiSFZrYVc1bklIZHBkR2h2ZFhRZ2JHbHRhWFJoZEdsdmJpQjBhR1VnY21sbmFIUnpYRzUwYnlCMWMyVXNJR052Y0hrc0lHMXZaR2xtZVN3Z2JXVnlaMlVzSUhCMVlteHBjMmdzSUdScGMzUnlhV0oxZEdVc0lITjFZbXhwWTJWdWMyVXNJR0Z1WkM5dmNpQnpaV3hzWEc1amIzQnBaWE1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMQ0JoYm1RZ2RHOGdjR1Z5YldsMElIQmxjbk52Ym5NZ2RHOGdkMmh2YlNCMGFHVWdVMjltZEhkaGNtVWdhWE5jYm1aMWNtNXBjMmhsWkNCMGJ5QmtieUJ6Ynl3Z2MzVmlhbVZqZENCMGJ5QjBhR1VnWm05c2JHOTNhVzVuSUdOdmJtUnBkR2x2Ym5NNlhHNWNibFJvWlNCaFltOTJaU0JqYjNCNWNtbG5hSFFnYm05MGFXTmxJR0Z1WkNCMGFHbHpJSEJsY20xcGMzTnBiMjRnYm05MGFXTmxJSE5vWVd4c0lHSmxJR2x1WTJ4MVpHVmtJR2x1SUdGc2JGeHVZMjl3YVdWeklHOXlJSE4xWW5OMFlXNTBhV0ZzSUhCdmNuUnBiMjV6SUc5bUlIUm9aU0JUYjJaMGQyRnlaUzVjYmx4dVZFaEZJRk5QUmxSWFFWSkZJRWxUSUZCU1QxWkpSRVZFSUZ3aVFWTWdTVk5jSWl3Z1YwbFVTRTlWVkNCWFFWSlNRVTVVV1NCUFJpQkJUbGtnUzBsT1JDd2dSVmhRVWtWVFV5QlBVbHh1U1UxUVRFbEZSQ3dnU1U1RFRGVkVTVTVISUVKVlZDQk9UMVFnVEVsTlNWUkZSQ0JVVHlCVVNFVWdWMEZTVWtGT1ZFbEZVeUJQUmlCTlJWSkRTRUZPVkVGQ1NVeEpWRmtzWEc1R1NWUk9SVk5USUVaUFVpQkJJRkJCVWxSSlExVk1RVklnVUZWU1VFOVRSU0JCVGtRZ1RrOU9TVTVHVWtsT1IwVk5SVTVVTGlCSlRpQk9UeUJGVmtWT1ZDQlRTRUZNVENCVVNFVmNia0ZWVkVoUFVsTWdUMUlnUTA5UVdWSkpSMGhVSUVoUFRFUkZVbE1nUWtVZ1RFbEJRa3hGSUVaUFVpQkJUbGtnUTB4QlNVMHNJRVJCVFVGSFJWTWdUMUlnVDFSSVJWSmNia3hKUVVKSlRFbFVXU3dnVjBoRlZFaEZVaUJKVGlCQlRpQkJRMVJKVDA0Z1QwWWdRMDlPVkZKQlExUXNJRlJQVWxRZ1QxSWdUMVJJUlZKWFNWTkZMQ0JCVWtsVFNVNUhJRVpTVDAwc1hHNVBWVlFnVDBZZ1QxSWdTVTRnUTA5T1RrVkRWRWxQVGlCWFNWUklJRlJJUlNCVFQwWlVWMEZTUlNCUFVpQlVTRVVnVlZORklFOVNJRTlVU0VWU0lFUkZRVXhKVGtkVElFbE9JRlJJUlZ4dVUwOUdWRmRCVWtVdVhHNHFMMXh1WEc1cGJYQnZjblFnUW1sdVpHRmliR1VnWm5KdmJTQW5MaTlDYVc1a1lXSnNaU2M3WEc1cGJYQnZjblFnUTJ4aGMzTWdabkp2YlNBbkxpOURiR0Z6Y3ljN1hHNXBiWEJ2Y25RZ1JHVnpkSEp2ZVdGaWJHVWdabkp2YlNBbkxpOUVaWE4wY205NVlXSnNaU2M3WEc1Y2JtTnNZWE56SUVoMGJXeFZjR1JoZEdWeUlHVjRkR1Z1WkhNZ1EyeGhjM01nZTF4dVhIUXZLaXBjYmx4MElDb2dRSEJoY21GdElHVnNJRVJQVFNCbGJHVnRaVzUwTGx4dVhIUWdLaUJBY0dGeVlXMGdjSEp2Y0dWeWRIa2dVMjkxY21ObElIQnliM0JsY25SNUxseHVYSFFnS2k5Y2JseDBZMjl1YzNSeWRXTjBiM0lvY0hKcGRtRjBaU0JsYkRvZ1NsRjFaWEo1TENCd2NtbDJZWFJsSUhCeWIzQmxjblI1T2lCQ2FXNWtZV0pzWlR4aGJuaytLU0I3WEc1Y2RGeDBjM1Z3WlhJb0tUdGNibHgwWEhSMGFHbHpMbDkxY0dSaGRHVW9LVHRjYmx4MFhIUjBhR2x6TG05M2JpaHdjbTl3WlhKMGVTNWphR0Z1WjJWRmRtVnVkQzVzYVhOMFpXNG9kR2hwY3k1ZmRYQmtZWFJsTENCMGFHbHpLU2s3WEc1Y2RIMWNibHh1WEhSd2NtbDJZWFJsSUY5MWNHUmhkR1VvS1NCN1hHNWNkRngwZEdocGN5NWxiQzVvZEcxc0tIUm9hWE11Y0hKdmNHVnlkSGt1WjJWMEtDa3BPMXh1WEhSOVhHNTlYRzVjYmk4cUtseHVJQ29nVjJGMFkyaGxjeUJ6ZEhKcGJtY2djSEp2Y0dWeWRIa2diVzlrYVdacFkyRjBhVzl1SUdGdVpDQjFjR1JoZEdWeklHbHVibVZ5SUVoVVRVd2diMllnZEdobElFUlBUU0JsYkdWdFpXNTBMbHh1SUNvZ1FIQmhjbUZ0SUdWc0lFUlBUU0JsYkdWdFpXNTBMbHh1SUNvZ1FIQmhjbUZ0SUhCeWIzQmxjblI1SUVoVVRVd2dkbUZzZFdVdVhHNGdLaUJBY21WMGRYSnVjeUJDYVc1a2FXNW5JRzlpYW1WamRDNGdXVzkxSUcxMWMzUWdaR1Z6ZEhKdmVTQnBkQ0IwYnlCemRHOXdJSFJvWlNCemVXNWphSEp2Ym1sNllYUnBiMjR1WEc0Z0tpOWNibVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUlHSnBibVJJZEcxc0tHVnNPaUJLVVhWbGNua3NJSEJ5YjNCbGNuUjVPaUJDYVc1a1lXSnNaVHhoYm5rK0tUb2dSR1Z6ZEhKdmVXRmliR1VnZTF4dVhIUnlaWFIxY200Z2JtVjNJRWgwYld4VmNHUmhkR1Z5S0dWc0xDQndjbTl3WlhKMGVTazdYRzU5WEc0aVhYMD0iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBqd2NsYXNzPVxcXCJhcHBsaWNhdGlvblxcXCI+PGRpdj5IVE1MOjwvZGl2Pjx0ZXh0YXJlYSBqd2lkPVxcXCJpbnB1dFxcXCIgcm93cz1cXFwiNVxcXCIgY29scz1cXFwiODBcXFwiPjwvdGV4dGFyZWE+PGRpdj5PdXRwdXQ6PC9kaXY+PGRpdiBqd2lkPVxcXCJvdXRwdXRcXFwiPjwvZGl2PjwvZGl2PlxcblwiOyIsImltcG9ydCBiaW5kSHRtbCBmcm9tIFwiandpZGdldC9iaW5kSHRtbFwiO1xuaW1wb3J0IGJpbmRWYWwgZnJvbSBcImp3aWRnZXQvYmluZFZhbFwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiandpZGdldC90ZW1wbGF0ZVwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9BcHBsaWNhdGlvbi5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByb3RlY3RlZCByZW5kZXJPdXRwdXQoZWw6IEpRdWVyeSkge1xuXHRcdGNvbnN0IGlucHV0ID0gdGhpcy5nZXRFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0aW5wdXQuaHRtbCgnPGI+SGVsbG8hPC9iPicpO1xuXG5cdFx0Ly8gV2F0Y2ggaW5wdXQgdmFsdWVcblx0XHRjb25zdCBodG1sID0gYmluZFZhbChpbnB1dCk7XG5cblx0XHQvLyBCaW5kIGlubmVyIEhUTUwgdG8gaHRtbCBwcm9wZXJ0eSB2YWx1ZVxuXHRcdGJpbmRIdG1sKGVsLCBodG1sKTtcblx0fVxufVxuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IGluaXRFeGFtcGxlIGZyb20gXCIuLi9jb21tb24vaW5pdEV4YW1wbGVcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9BcHBsaWNhdGlvblwiO1xuXG4kKCgpID0+IHtcblx0aW5pdEV4YW1wbGUoXCJiaW5kSHRtbFwiLCBbXCJBcHBsaWNhdGlvbi50c1wiLCBcIkFwcGxpY2F0aW9uLmp3Lmh0bWxcIiwgXCJpbmRleC50c1wiXSk7XG5cdG5ldyBBcHBsaWNhdGlvbigpLnJlbmRlclRvKFwiYm9keVwiKTtcbn0pO1xuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IFwiY29yZS1qcy9zdGFibGVcIjtcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0RXhhbXBsZShuYW1lOiBzdHJpbmcsIGxpbmtzOiBzdHJpbmdbXSkge1xuXHRjb25zdCBlbCA9ICQoJzxkaXYgc3R5bGU9XCJmbG9hdDogcmlnaHQ7IHdpZHRoOiA2MDBweFwiPjxiPlNvdXJjZTo8L2I+IDwvZGl2PicpO1xuXHRsZXQgZmlyc3QgPSB0cnVlO1xuXHRsaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG5cdFx0aWYgKGZpcnN0KSB7XG5cdFx0XHRmaXJzdCA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5hcHBlbmQoJywgJyk7XG5cdFx0fVxuXHRcdGVsLmFwcGVuZCgkKCc8YSB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+JykudGV4dChsaW5rKS5hdHRyKFwiaHJlZlwiLCBgc3JjLyR7bmFtZX0vJHtsaW5rfS50eHRgKSk7XG5cdH0pO1xuXHQkKFwiYm9keVwiKS5wcmVwZW5kKCc8ZGl2PjxiPkV4YW1wbGU8L2I+PC9kaXY+PGRpdj48YSBocmVmPVwiamF2YXNjcmlwdDpsb2NhdGlvbi5yZWxvYWQoKVwiPlJlZnJlc2g8L2E+PC9kaXY+PGhyIHN0eWxlPVwiY2xlYXI6IGJvdGhcIj4nKS5wcmVwZW5kKGVsKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=